from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
import resend
from hubspot import HubSpot
from hubspot.crm.contacts import SimplePublicObjectInputForCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Resend Configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', '')

# Initialize Resend
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    logger.info("Resend email client initialized")
else:
    logger.warning("Resend API key not configured")

# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN = os.environ.get('HUBSPOT_ACCESS_TOKEN', '')

# Initialize HubSpot client
hubspot_client = None
if HUBSPOT_ACCESS_TOKEN:
    hubspot_client = HubSpot(access_token=HUBSPOT_ACCESS_TOKEN)
    logger.info("HubSpot client initialized successfully")
else:
    logger.warning("HubSpot access token not configured")

# Create the main app
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
        
        # Prepare contact properties
        properties = {
            "email": form_data.email,
            "firstname": firstname,
            "lastname": lastname,
            "company": form_data.company or "",
            "hs_lead_status": "NEW",
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


async def send_contact_email(form_data: ContactFormData) -> bool:
    """Send contact form email via Resend"""
    if not RESEND_API_KEY or not RECIPIENT_EMAIL:
        logger.warning("Resend not configured, skipping email")
        return False
    
    try:
        # Create HTML email body
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #2a6cae; color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0;">New Contact Form Submission</h2>
                </div>
                <div style="padding: 20px; background: #f9f9f9;">
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Name:</div>
                        <div style="margin-top: 5px;">{form_data.name}</div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Email:</div>
                        <div style="margin-top: 5px;"><a href="mailto:{form_data.email}">{form_data.email}</a></div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Company:</div>
                        <div style="margin-top: 5px;">{form_data.company or 'Not provided'}</div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Contact Type:</div>
                        <div style="margin-top: 5px;">{form_data.contactType}</div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Subject:</div>
                        <div style="margin-top: 5px;">{form_data.subject}</div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: #2a6cae;">Message:</div>
                        <div style="background: white; padding: 15px; border-left: 4px solid #4fadb3; margin-top: 10px;">{form_data.message}</div>
                    </div>
                </div>
                <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
                    <p>This email was sent from the Climate Yield Advisory website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": f"New Contact Form Submission: {form_data.subject}",
            "html": html_body
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email_response = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Email sent successfully to {RECIPIENT_EMAIL}, ID: {email_response.get('id')}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


@api_router.get("/")
async def root():
    return {"message": "Climate Yield Advisory API"}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(form_data: ContactFormData):
    """Handle contact form submission: create HubSpot contact and send email notification"""
    logger.info(f"Received contact form submission from {form_data.name} ({form_data.email})")
    
    # Step 1: Create HubSpot Contact
    contact_id = create_hubspot_contact(form_data)
    
    # Step 2: Send email notification via Resend
    email_sent = await send_contact_email(form_data)
    
    # Log summary
    logger.info(f"Form submission results - Contact: {contact_id}, Email: {email_sent}")
    
    # Success if contact was created (primary goal)
    if contact_id:
        return ContactResponse(
            success=True,
            message="Thank you for your message. We'll be in touch shortly.",
            hubspot_contact_id=contact_id
        )
    elif email_sent:
        return ContactResponse(
            success=True,
            message="Thank you for your message. We'll be in touch shortly.",
            hubspot_contact_id=None
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
        "resend_configured": bool(RESEND_API_KEY)
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
