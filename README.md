# ApnaWeb — website requests for local businesses

A small working prototype of your idea:

1. A landing page explains the service and lists business types (medical store, bakery, shop keeper, and others).
2. Visitors fill in a form with their business details and contact info.
3. Every submission is saved and instantly visible on your **owner dashboard**.
4. You log in to the dashboard, see new requests, call the customer within 2 days, and track progress (New → Contacted → In Progress → Delivered).

## What's inside

```
website-lead-platform/
├── server.js              Backend (Express) — handles form submissions + dashboard API
├── package.json
├── .env.example            Copy to .env and set your own login/port
├── data/submissions.json   Where leads are stored (simple JSON file, no database needed)
└── public/
    ├── index.html          Landing page + request form
    ├── dashboard.html       Owner login + dashboard
    ├── css/style.css
    ├── css/dashboard.css
    ├── js/main.js           Form submit logic
    └── js/dashboard.js      Dashboard logic (login, table, status updates)
```

## Running it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
cd website-lead-platform
cp .env.example .env       # then edit .env and set your own ADMIN_USER / ADMIN_PASS
npm install
npm start
```

Then open:
- `http://localhost:3000` — the public landing page and form
- `http://localhost:3000/dashboard.html` — your owner dashboard (log in with the username/password from `.env`)

Submit a test request on the landing page, then check the dashboard — it should appear immediately.

## How data is stored

Every submitted form is appended to `data/submissions.json` as one entry with a unique id, timestamp, and status. This is fine for getting started and for a handful of requests a day. If you start getting a lot of traffic, swap this file for a real database (e.g. SQLite, PostgreSQL, or MongoDB) — the `readSubmissions()` / `writeSubmissions()` functions in `server.js` are the only place you'd need to change.

## Security notes before you go live

This is a working MVP, not a production-hardened app. Before you put it on the internet with real customer data, you should:

- Set a strong, unique `ADMIN_PASS` in `.env` (never commit `.env` to git).
- Serve the site over HTTPS (most hosts like Render, Railway, or a VPS with Caddy/Nginx do this for you).
- Replace the in-memory login tokens with a proper session library (e.g. `express-session`) if you expect the server to restart often or want tokens to survive a restart.
- Add basic rate-limiting to `/api/submit` so the form can't be spammed.
- Consider adding a simple CAPTCHA (e.g. Google reCAPTCHA) to the request form.

## Deploying

This is a standard Node/Express app, so it runs on almost any host:

- **Render / Railway / Fly.io** — connect your git repo, set the environment variables from `.env.example`, deploy.
- **A VPS (DigitalOcean, Hostinger, etc.)** — install Node, copy the files, run `npm install && npm start` behind a process manager like `pm2`, and put Nginx in front for HTTPS.

## Customizing

- Edit the categories, copy, and colors in `public/index.html` and `public/css/style.css`.
- Add/remove form fields in `index.html` (the `<form id="leadForm">`) and `server.js` (`app.post('/api/submit', ...)`) together, so both sides match.
- Add more status stages in `server.js` (`allowed` array in the PATCH route) and `dashboard.js` if "New / Contacted / In Progress / Delivered" doesn't match your workflow.