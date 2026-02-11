# Climate Yield Advisory - Product Requirements Document

## Original Problem Statement
Build a high-end, agency-quality website for "Climate Yield Advisory" inspired by Tikehau Capital website, featuring professional, modern aesthetic with complex animations.

## Architecture
- **Frontend**: React with GSAP animations, CSS scroll-driven effects
- **Backend**: FastAPI with HubSpot CRM integration
- **Styling**: Monolithic App.css with CSS variables, Flexbox, Grid
- **Data**: Frontend content from `/app/frontend/src/data/mock.js`
- **CRM**: HubSpot (contacts created on form submission)

## Pages
- Homepage
- Company
- Mission  
- Manifesto
- Expertise
- Services
- Contact (with HubSpot integration)

## What's Been Implemented

### February 11, 2026 - HubSpot Integration

#### Backend Refactoring Complete
- **Removed MongoDB** - Server no longer depends on MongoDB
- **HubSpot Contact Creation** - Working! Contacts are successfully created in HubSpot CRM
- **Contact Form API** - `/api/contact` endpoint accepts form data and creates HubSpot contacts
- **Health Check** - `/api/health` returns HubSpot and email configuration status

#### Current Limitations (Require User Action)
1. **HubSpot Ticket/Deal Creation** - The provided API token only has Contact scope. To create Tickets or Deals, the user must:
   - Go to HubSpot Settings > Integrations > Private Apps
   - Edit the private app and add scopes: `crm.objects.deals.write` or `tickets` scope
   - Copy the new access token to `backend/.env`

2. **Email Notifications** - Office 365 SMTP Client Authentication is disabled at the tenant level. The user must:
   - Contact their Office 365 admin to enable SMTP AUTH for the mailbox
   - OR use a different email service (SendGrid, Mailgun, etc.)
   - Reference: https://aka.ms/smtp_auth_disabled

### Previous Work (January 2026)
- Contact Page: Phone number removed, two dropdown menus added
- Expertise Page: Bento grid for values, team photos updated, LinkedIn links
- Services Page: Video replaced with static text, accordion closed by default
- Homepage: Centered and capitalized tagline
- Manifesto Page: Horizontal accordion design with scroll animations
- Mobile responsiveness with hamburger menu
- Standardized header emblem styling across pages

## Tech Stack
- React with React Router
- FastAPI (Python)
- HubSpot CRM API (hubspot-api-client)
- GSAP (ScrollTrigger)
- Splitting.js
- Three.js (limited use)
- CSS Custom Properties

## Backlog
- P1: Enable HubSpot Ticket/Deal creation (requires token scope update)
- P1: Enable email notifications (requires Office 365 admin action)
- P2: Scroll-to-Top on page navigation
- P3: 3D text animation on Services page
- P3: Refactor App.css into modular CSS files

## Key Files
- `/app/backend/server.py` - API endpoints with HubSpot integration
- `/app/backend/.env` - Configuration (HubSpot token, SMTP settings)
- `/app/frontend/src/pages/ContactPage.jsx` - Contact form UI
- `/app/frontend/src/App.css` - All styles
- `/app/frontend/src/data/mock.js` - All site content

## API Endpoints
- `GET /api/health` - Health check with integration status
- `POST /api/contact` - Submit contact form (creates HubSpot contact)

## Environment Variables (backend/.env)
```
HUBSPOT_ACCESS_TOKEN - HubSpot private app token
SMTP_SERVER - Email server (smtp.office365.com)
SMTP_PORT - Email port (587)
SMTP_USERNAME - Email username
SMTP_PASSWORD - Email App Password
SMTP_FROM_EMAIL - Sender email
SMTP_TO_EMAIL - Recipient email
```

## Testing Status
- HubSpot Contact Creation: WORKING (verified with multiple test submissions)
- HubSpot Ticket Creation: NOT WORKING (missing API scopes)
- Email Notifications: NOT WORKING (SMTP AUTH disabled at tenant)
- Frontend Form: WORKING (submits successfully, shows success message)
