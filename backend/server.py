from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInputForCreate
from hubspot.crm.tickets import SimplePublicObjectInputForCreate as TicketInput


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# SMTP Configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.office365.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM_EMAIL = os.environ.get('SMTP_FROM_EMAIL', '')
SMTP_TO_EMAIL = os.environ.get('SMTP_TO_EMAIL', '')

# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN = os.environ.get('HUBSPOT_ACCESS_TOKEN', '')

# Initialize HubSpot client
hubspot_client = None
if HUBSPOT_ACCESS_TOKEN:
    hubspot_client = HubSpot(access_token=HUBSPOT_ACCESS_TOKEN)
    logger.info("HubSpot client initialized successfully")
else:
    logger.warning("HubSpot access token not configured")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


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
    hubspot_contact_id: Optional[str] = None
    hubspot_ticket_id: Optional[str] = None


def create_hubspot_contact(form_data: ContactFormData) -> Optional[str]:
    """Create a contact in HubSpot CRM"""
    if not hubspot_client:
        logger.warning("HubSpot client not initialized, skipping contact creation")
        return None
    
    try:
        # Split name into first and last name
        name_parts = form_data.name.strip().split(' ', 1)
        firstname = name_parts[0]
        lastname = name_parts[1] if len(name_parts) > 1 else ""
        
        # Prepare contact properties - only using standard HubSpot properties
        properties = {
            "email": form_data.email,
            "firstname": firstname,
            "lastname": lastname,
            "company": form_data.company or "",
            "hs_lead_status": "NEW",  # Valid HubSpot lead status
        }
        
        # Create the contact
        contact_input = SimplePublicObjectInputForCreate(properties=properties)
        contact_response = hubspot_client.crm.contacts.basic_api.create(
            simple_public_object_input_for_create=contact_input
        )
        
        contact_id = contact_response.id
        logger.info(f"HubSpot contact created with ID: {contact_id}")
        return contact_id
        
    except Exception as e:
        error_str = str(e)
        # Check if contact already exists (duplicate email)
        if "409" in error_str or "CONFLICT" in error_str:
            logger.info(f"Contact already exists for email: {form_data.email}")
            # Try to find existing contact
            try:
                search_response = hubspot_client.crm.contacts.search_api.do_search(
                    public_object_search_request={
                        "filterGroups": [{
                            "filters": [{
                                "propertyName": "email",
                                "operator": "EQ",
                                "value": form_data.email
                            }]
                        }],
                        "limit": 1
                    }
                )
                if search_response.results:
                    return search_response.results[0].id
            except Exception as search_err:
                logger.error(f"Failed to search for existing contact: {str(search_err)}")
        else:
            logger.error(f"Failed to create HubSpot contact: {error_str}")
        return None


def create_hubspot_ticket(form_data: ContactFormData, contact_id: Optional[str]) -> Optional[str]:
    """Create a ticket in HubSpot CRM and associate it with the contact"""
    if not hubspot_client:
        logger.warning("HubSpot client not initialized, skipping ticket creation")
        return None
    
    try:
        # Prepare ticket properties
        ticket_content = f"""Contact Type: {form_data.contactType}
Company: {form_data.company or 'Not provided'}
Email: {form_data.email}

Message:
{form_data.message}"""
        
        properties = {
            "subject": f"{form_data.subject} - {form_data.name}",
            "content": ticket_content,
            "hs_pipeline": "0",  # Default support pipeline
            "hs_pipeline_stage": "1",  # New ticket stage
            "hs_ticket_priority": "MEDIUM",
        }
        
        # If we have a contact_id, create the ticket with an association
        if contact_id:
            associations = [
                {
                    "to": {"id": contact_id},
                    "types": [
                        {
                            "associationCategory": "HUBSPOT_DEFINED",
                            "associationTypeId": 16  # Ticket to Contact association
                        }
                    ]
                }
            ]
            ticket_input = TicketInput(properties=properties, associations=associations)
        else:
            ticket_input = TicketInput(properties=properties)
        
        ticket_response = hubspot_client.crm.tickets.basic_api.create(
            simple_public_object_input_for_create=ticket_input
        )
        
        ticket_id = ticket_response.id
        logger.info(f"HubSpot ticket created with ID: {ticket_id}")
        return ticket_id
        
    except Exception as e:
        logger.error(f"Failed to create HubSpot ticket: {str(e)}")
        return None


def send_contact_email(form_data: ContactFormData) -> bool:
    """Send contact form email via SMTP"""
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        logger.warning("SMTP credentials not configured, skipping email")
        return False
    
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
        
        logger.info(f"Email sent successfully to {SMTP_TO_EMAIL}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Climate Yield Advisory API"}


# Contact form endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(form_data: ContactFormData):
    """Handle contact form submission: create HubSpot contact + ticket, and send email"""
    logger.info(f"Received contact form submission from {form_data.name} ({form_data.email})")
    
    # Step 1: Create HubSpot Contact
    contact_id = create_hubspot_contact(form_data)
    
    # Step 2: Create HubSpot Ticket (associated with contact if contact was created)
    ticket_id = create_hubspot_ticket(form_data, contact_id)
    
    # Step 3: Send email notification
    email_sent = send_contact_email(form_data)
    
    # Log summary of operations
    logger.info(f"Form submission results - Contact: {contact_id}, Ticket: {ticket_id}, Email: {email_sent}")
    
    # Determine overall success - contact creation is the primary goal
    if contact_id:
        return ContactResponse(
            success=True,
            message="Thank you for your message. We'll be in touch shortly.",
            hubspot_contact_id=contact_id,
            hubspot_ticket_id=ticket_id
        )
    elif email_sent:
        # Fallback if HubSpot fails but email works
        return ContactResponse(
            success=True,
            message="Thank you for your message. We'll be in touch shortly.",
            hubspot_contact_id=None,
            hubspot_ticket_id=None
        )
    else:
        logger.error("Both HubSpot contact creation and email sending failed")
        raise HTTPException(
            status_code=500,
            detail="Failed to process your message. Please try again later or contact us directly."
        )


@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "hubspot_configured": hubspot_client is not None,
        "email_configured": bool(SMTP_USERNAME and SMTP_PASSWORD)
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
