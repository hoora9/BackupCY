from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# SMTP Configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.office365.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM_EMAIL = os.environ.get('SMTP_FROM_EMAIL', '')
SMTP_TO_EMAIL = os.environ.get('SMTP_TO_EMAIL', '')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Model
class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = ""
    contactType: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

# Email sending function
def send_contact_email(form_data: ContactFormData) -> bool:
    """Send contact form email via SMTP"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Contact Form Submission: {form_data.subject}"
        msg['From'] = SMTP_FROM_EMAIL
        msg['To'] = SMTP_TO_EMAIL
        
        # Create HTML email body
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #2a6cae; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; background: #f9f9f9; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #2a6cae; }}
                .value {{ margin-top: 5px; }}
                .message-box {{ background: white; padding: 15px; border-left: 4px solid #4fadb3; margin-top: 10px; }}
                .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">{form_data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value"><a href="mailto:{form_data.email}">{form_data.email}</a></div>
                    </div>
                    <div class="field">
                        <div class="label">Company:</div>
                        <div class="value">{form_data.company or 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="label">Contact Type:</div>
                        <div class="value">{form_data.contactType}</div>
                    </div>
                    <div class="field">
                        <div class="label">Subject:</div>
                        <div class="value">{form_data.subject}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="message-box">{form_data.message}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>This email was sent from the Climate Yield Advisory website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text version
        text_body = f"""
        New Contact Form Submission
        
        Name: {form_data.name}
        Email: {form_data.email}
        Company: {form_data.company or 'Not provided'}
        Contact Type: {form_data.contactType}
        Subject: {form_data.subject}
        
        Message:
        {form_data.message}
        
        ---
        This email was sent from the Climate Yield Advisory website contact form.
        """
        
        # Attach both versions
        msg.attach(MIMEText(text_body, 'plain'))
        msg.attach(MIMEText(html_body, 'html'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_FROM_EMAIL, SMTP_TO_EMAIL, msg.as_string())
        
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Contact form endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(form_data: ContactFormData):
    """Handle contact form submission and send email"""
    logger.info(f"Received contact form submission from {form_data.name} ({form_data.email})")
    
    # Send email
    email_sent = send_contact_email(form_data)
    
    if email_sent:
        logger.info(f"Email sent successfully to {SMTP_TO_EMAIL}")
        return ContactResponse(
            success=True,
            message="Thank you for your message. We'll be in touch shortly."
        )
    else:
        logger.error("Failed to send contact form email")
        raise HTTPException(
            status_code=500,
            detail="Failed to send your message. Please try again later."
        )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()