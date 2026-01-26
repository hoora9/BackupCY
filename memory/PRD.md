# Climate Yield Advisory - Product Requirements Document

## Original Problem Statement
Build a high-end, agency-quality website for "Climate Yield Advisory" inspired by Tikehau Capital website, featuring professional, modern aesthetic with complex animations.

## Architecture
- **Frontend**: React with GSAP animations, CSS scroll-driven effects
- **Styling**: Monolithic App.css with CSS variables, Flexbox, Grid
- **Data**: Centralized in `/app/frontend/src/data/mock.js`
- **No Backend**: Frontend-only with mocked data

## Pages
- Homepage
- Company
- Mission  
- Manifesto
- Expertise
- Services
- Contact

## What's Been Implemented

### Session - January 2026

#### Manifesto Page Enhancements
- Single unified bento box for "A Decisive Decade" section with multi-colored text
- Cascading geometric shapes animation before bento boxes
- Images fade in AND fade out with scroll (smooth ease transitions)
- Text lines ease in as user scrolls
- Different colors for text hierarchy (white title, teal subtitle, green content, sandy subcontent)

#### Previous Session Work
- Contact Page: Phone number removed, two dropdown menus added
- Expertise Page: Bento grid for values, team photos updated, LinkedIn links
- Services Page: Video replaced with static text, accordion closed by default
- Manifesto Page: Bento box layout, single background color
- Impact Page: Deleted completely
- Homepage: Centered and capitalized tagline
- Standardized header emblem styling across pages

## Tech Stack
- React with React Router
- GSAP (ScrollTrigger)
- Splitting.js
- Three.js (limited use)
- CSS Custom Properties

## Backlog
- P2: Scroll-to-Top on page navigation
- P3: Backend for functional contact form
- P3: 3D text animation on Services page
- P3: Refactor App.css into modular CSS files

## Key Files
- `/app/frontend/src/App.css` - All styles
- `/app/frontend/src/pages/ManifestoPage.jsx` - Manifesto with animations
- `/app/frontend/src/data/mock.js` - All site content
