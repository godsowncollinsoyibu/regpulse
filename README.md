# RegPulse — Regulatory Compliance Management System

A project built during placement at Opex Consulting, inspired by their RegTech365 product line.

## What it does

RegPulse helps an organization track regulatory requirements, assign compliance tasks to staff, monitor deadlines, and generate compliance reports — replacing manual spreadsheet tracking.

## Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth
- **Frontend:** React (Vite), Tailwind CSS v4, React Router, Recharts, Lucide icons

## Project structure

```
regpulse/
├── backend/     → Express API (see backend/README or .env.example)
└── frontend/    → React app
```

## Running it locally

**Backend:**
```
cd backend
npm install
cp .env.example .env   # fill in your MongoDB URI + JWT secret
npm run seed             # optional: loads demo data
npm run dev
```

**Frontend:**
```
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `http://localhost:5000`, so run the backend first.

## Demo login (after seeding)

- Admin: `admin@regpulse.com` / `admin123`
- Officer: `officer@regpulse.com` / `officer123`

## Design system

- **Colors:** Ink Navy, Signal Teal, Pulse Violet, Alert Coral, Amber Flag
- **Type:** Space Grotesk (headings), Inter (body), JetBrains Mono (data/dates)
- **Signature element:** Animated pulse-line logo, reflecting real-time compliance monitoring
