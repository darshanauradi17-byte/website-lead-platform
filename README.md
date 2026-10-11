# ApnaWeb — website requests for local businesses

A small working prototype of your idea:

1. A landing page explains the service and lists business types (medical store, bakery, shop keeper, and others).
2. Visitors fill in a form with their business details and contact info.
3. Every submission is saved and instantly visible on your **owner dashboard**.
4. You log in to the dashboard, see new requests, call the customer within 2 days, and track progress (New → Contacted → In Progress → Delivered).

## What's inside

There are two apps in this folder:

**Next.js web app (`src/`) — the current frontend, connected to Supabase**

```
src/
├── app/
│   ├── page.tsx, services/, portfolio/, get-website/, contact/   Public pages
│   ├── admin/login/        Owner dashboard (AdminDashboard)
│   ├── portal/login/       Customer tracking portal (CustomerPortal)
│   └── api/                Backend routes the frontend calls
│       ├── admin/login/        POST — admin sign-in (issues HMAC token)
│       ├── leads/              POST (public form) / GET (admin list)
│       ├── leads/[id]/         PATCH (admin update status/notes/fields)
│       ├── leads/lookup/       GET — public ref-ID/WhatsApp lookup
│       ├── leads/[id]/messages/ GET+POST — portal chat
│       └── portal/lead/        PATCH — customer edits own notes
├── lib/
│   ├── lead-store.ts       Frontend data layer (calls the API routes)
│   ├── admin-auth.ts       Server-side admin token sign/verify
│   ├── api-helpers.ts      Shared validation / sanitizing / rate limiting
│   └── supabase/server.ts  Server-only Supabase client (service role)
supabase/schema.sql         Database schema, RLS policies & seed data
```

**Legacy Express app (`server.js` + `public/`) — the original JSON-file prototype, still runnable**

```
server.js              Backend (Express) — handles form submissions + dashboard API
data/submissions.json   Where leads are stored (simple JSON file, no database needed)
public/                 Original landing page, portfolio & dashboard (vanilla HTML/JS)
```

## Running the Next.js app (recommended)

You'll need [Node.js](https://nodejs.org) 18 or newer and a [Supabase](https://supabase.com) project.

1. Create a Supabase project, open the SQL editor and run `supabase/schema.sql` (creates tables, RLS policies and seed leads like APW-KIRANA).
2. Configure environment variables:

```bash
cd website-lead-platform
cp .env.example .env.local   # then fill in your Supabase keys + admin password
```

3. Install and run:

```bash
npm install
npm run dev:web       # Next.js dev server on http://localhost:3000
# npm run build:web && npm run start:web   for production
```

Then open:
- `http://localhost:3000` — public site; submit a request at `/get-website`
- `http://localhost:3000/admin/login` — owner dashboard (ADMIN_USER / ADMIN_PASS from `.env.local`)
- `http://localhost:3000/portal/login` — customer tracking by ref ID (try `APW-KIRANA`)

Every lead, status change, and portal message is stored in Supabase, so the dashboard and portal always show the real server state — on any device.

## Running the legacy Express app

```bash
cp .env.example .env       # then edit .env and set your own ADMIN_USER / ADMIN_PASS
npm install
npm start
```

- `http://localhost:3000` — the public landing page and form
- `http://localhost:3000/dashboard.html` — the owner dashboard

## How data is stored (Next.js app)

Leads, messages and the activity log live in Supabase tables (`public.leads`, `public.lead_messages`, `public.lead_activity`). The frontend never talks to Supabase directly — it calls the Next.js API routes, which use the **service role key on the server only** and validate every input. Public lookups return sanitized fields so owner-only notes never reach the customer portal.

## Security notes before you go live

- Set a strong `ADMIN_PASS` and a unique `ADMIN_SESSION_SECRET` in `.env.local` (never commit `.env`).
- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security — keep it server-side only.
- Serve the site over HTTPS (Vercel, Render, or a VPS with Caddy/Nginx).
- Login and form submission have basic in-memory rate limiting; add a CAPTCHA if spam becomes a problem.

## Deploying

This is a standard Node/Express app, so it runs on almost any host:

- **Render / Railway / Fly.io** — connect your git repo, set the environment variables from `.env.example`, deploy.
- **A VPS (DigitalOcean, Hostinger, etc.)** — install Node, copy the files, run `npm install && npm start` behind a process manager like `pm2`, and put Nginx in front for HTTPS.

## Customizing

- Edit the categories, copy, and colors in `public/index.html` and `public/css/style.css`.
- Add/remove form fields in `index.html` (the `<form id="leadForm">`) and `server.js` (`app.post('/api/submit', ...)`) together, so both sides match.
- Add more status stages in `server.js` (`allowed` array in the PATCH route) and `dashboard.js` if "New / Contacted / In Progress / Delivered" doesn't match your workflow.