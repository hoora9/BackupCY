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

#### Manifesto Page - Cascading Emblem Design (Latest)
- **New scroll-driven layout**: Image on one side, emblem on opposite side
- **Emblem transforms to text**: As user scrolls, bracket emblem fades out and text content fades in
- **Alternating sides**: Image/text positions alternate (left/right) through sections
- **Cascading emblem positions**: Each emblem appears at different vertical/horizontal positions for organic flow
- **Clean text styling**: Removed bento boxes - text appears without colored backgrounds
- **Smooth GSAP animations**: Images fade in → emblem appears → emblem fades → text reveals
- **5 content sections** with this effect, plus conviction block and closing tagline

#### Previous Work
- Contact Page: Phone number removed, two dropdown menus added
- Expertise Page: Bento grid for values, team photos updated, LinkedIn links
- Services Page: Video replaced with static text, accordion closed by default
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
- `/app/frontend/src/App.css` - All styles (including new cascade styles)
- `/app/frontend/src/pages/ManifestoPage.jsx` - Cascading emblem design with GSAP
- `/app/frontend/src/data/mock.js` - All site content
