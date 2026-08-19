# Suryavan Solar — Website

A full solar-company website matching the quotation scope, built with:

- **Frontend:** React + Vite, React Router, Tailwind CSS, Framer Motion (animation), lucide-react (icons)
- **Backend:** Node.js + Express — handles the enquiry form (validation, rate limiting, JSON storage, optional email notification)

## Project structure

```
solar-website/
├── frontend/   React app (Home, About, Products, Services, Projects, Contact)
└── backend/    Express API (POST /api/enquiry, GET /api/enquiry)
```

## Running locally

You need Node.js 18+ installed.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # already done for you, edit if needed
npm run dev
```
Runs on **http://localhost:4000**. Enquiries are saved to `backend/data/enquiries.json`.
View them at `http://localhost:4000/api/enquiry?key=change-me` (change `ADMIN_KEY` in `.env` for real use).

To get email notifications on new enquiries, fill in the `SMTP_*` values in `backend/.env`
(e.g. a Gmail app password or any SMTP provider). Without it, enquiries still save fine —
you just won't get an email.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs on **http://localhost:5173** and talks to the backend automatically via Vite's dev proxy.

Open http://localhost:5173 in your browser.

## Building for production

```bash
cd frontend
npm run build       # outputs static site to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, Nginx, etc).
Deploy `backend/` to any Node host (Render, Railway, a VPS with PM2, etc) and set
`VITE_API_URL` in the frontend's environment to your backend's public URL before building
(e.g. `VITE_API_URL=https://api.yourdomain.com/api npm run build`).
Also update `CLIENT_ORIGIN` in the backend's `.env` to your live frontend URL (for CORS).

## What's included (per the quotation scope)

- Responsive design (desktop, tablet, mobile)
- Home, About, Products, Services, Projects/Gallery, Contact pages
- Working enquiry form with validation, loading/success/error states, and real backend submission
- WhatsApp & phone quick-contact, embedded Google Map
- SEO: meta tags, Open Graph tags, JSON-LD LocalBusiness schema, robots.txt, sitemap.xml,
  semantic headings, clean URLs
- Motion: page-load hero animation, animated sun-arc + energy-flow diagram, scroll reveals,
  hover micro-interactions, mobile menu transitions — all respecting `prefers-reduced-motion`

## Customizing content

All copy (products, services, projects, stats, FAQs, company details) lives in one file:
`frontend/src/data/content.js` — edit that to update the site without touching components.
