# Project Memory & Knowledge Base

**Project:** ApnaWeb Lead Platform  
**Owner / Founder:** Darshan Auradi ([@darshan_auradi_06](https://www.instagram.com/darshan_auradi_06/))  
**Studio Brand:** ApnaWeb Studio  
**Repository:** [github.com/darshanauradi17-byte/website-lead-platform](https://github.com/darshanauradi17-byte/website-lead-platform)  
**Last Updated:** October 2026  

---

## 1. Project Background & Strategic Vision

ApnaWeb is a purpose-built digital agency platform engineered to acquire, convert, and manage website projects for local retail businesses and professionals in India.

### Core Value Proposition
Local business owners (such as kirana merchants, pharmacy owners, and salon managers) frequently find traditional digital agencies unapproachable or confusing. ApnaWeb offers:
* Clear, transparent service offerings.
* Realistic Indian business mockups rather than generic Western templates.
* Zero-friction lead capture.
* Instant project tracking via a simple 4-digit reference number.
* A streamlined owner dashboard for lead triage and client communication.

---

## 2. Technology Stack & Dual Runtime

The platform maintains two synchronized runtimes to ensure both enterprise production capability and lightweight standalone portability:

| Layer | Primary Enterprise Stack | Standalone Prototype Engine |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router, TypeScript) | Node.js 18+ & Express 4.19.2 |
| **Styling** | Tailwind CSS + Custom CSS Variables | Pure Semantic CSS (`public/css/`) |
| **Motion** | Framer Motion & GSAP 3.12 | Vanilla GSAP, ScrollTrigger, & Pointer Math |
| **Persistence** | Supabase Managed PostgreSQL | Atomic JSON File (`data/submissions.json`) |
| **Auth** | HMAC Signed Session Tokens | In-Memory Token Set & Bearer Auth |
| **Icons** | Lucide React | Lucide Vanilla Web Components |
| **Entry Point** | `src/app/` (`npm run dev:web`) | `server.js` (`npm start` on Port 3000) |

---

## 3. Data Schema & Persistence Blueprint

### 3.1 Primary Supabase Relational Model
* **`public.leads`:** Core table storing customer submissions.
  - Columns: `id`, `request_id`, `owner_name`, `business_name`, `business_type`, `phone`, `city`, `budget`, `requirements`, `email`, `status`, `internal_notes`, `created_at`, `updated_at`.
* **`public.lead_messages`:** Two-way portal communication between agency and client.
  - Columns: `id`, `lead_id`, `sender_type` (`owner` | `customer`), `message`, `created_at`.
* **`public.lead_activity`:** Audit trail recording status transitions and modifications.
* **`public.lead_files`:** Metadata for logos and assets uploaded by clients.

### 3.2 Standalone JSON File Store
* Stored at: `data/submissions.json`.
* **ID Allocation:** Scans the array, identifies the highest existing `requestId`, and increments by 1. Base is set to `999` so the first lead always receives `#1000`.

---

## 4. Workflow State Machine

The platform strictly enforces four linear milestone stages:

```
[ New ] ───────> [ Contacted ] ───────> [ In Progress ] ───────> [ Delivered ]
  (Lead in)         (Reached out)          (Coding site)         (Launched live)
```

1. **`New`:** The request has been submitted by the client and logged in the database.
2. **`Contacted`:** The agency operator has reached out to the client via WhatsApp or phone.
3. **`In Progress`:** Design, copy, and development are actively underway.
4. **`Delivered`:** The website has been finalized, deployed live, and handed over to the client.

---

## 5. Visual Identity & Design System Registry

The platform features two curated visual environments tailored to their audiences:

### 5.1 Public Luxury Portfolio (Elena Voss Inspiration)
* **Target:** Creative portfolio showcase located at `public/portfolio.html`.
* **Color Architecture:**
  - Deep Obsidian Black: `#070707`
  - Radial Background Glow: `#F0640D` to `#B01205`
  - Linear Accent Gradient: `linear-gradient(135deg, #F16B0D 0%, #E61416 100%)`
  - Border Highlights: `rgba(255, 255, 255, 0.15)`
* **Typography:** *Host Grotesk* for clean headers/body, paired with *Playfair Display* for editorial accents.
* **Interactive Live Preview:** Real-time business switcher exhibiting realistic case studies (Pharmacy, Salon, Kirana Store, Café, Clinic, Gym).
* **Owner Photo Frame:** Built-in hero slot reserved for founder photography.

### 5.2 Business Workspace & Owner Dashboard
* **Target:** Public lead portal (`public/index.html`) and Owner Dashboard (`public/dashboard.html`).
* **Color Architecture:**
  - Deep Navy Canvas: `#07111f`
  - Secondary Panel Surface: `#0a1728`
  - Radiant Cyan/Blue Accent: `#60a5fa`
  - High-Contrast Body Text: `#f8fafc`
* **3D Depth Engine:** Three.js scene featuring a floating glass orb, metallic torus ring, floating octahedron, and mouse-reactive lighting (with graceful 2D canvas fallback).
* **Interactive Glass Panels:** Subtle blur, border glows, and pointer-driven perspective tilt.

---

## 6. Security Architecture & Credentials

1. **Environment Variables (`.env.local` / `.env`):**
   - `ADMIN_USER`: Administrative username.
   - `ADMIN_PASS`: Administrative secure password.
   - `ADMIN_SESSION_SECRET`: Cryptographic key for signing HMAC session tokens.
   - `SUPABASE_URL`: Cloud PostgreSQL endpoint.
   - `SUPABASE_SERVICE_ROLE_KEY`: Server-only secret key (never exposed to browser bundles).
2. **Data Sanitization:**
   - The public lookup API executes `sanitizeLeadForPortal()`, ensuring internal administrative notes and private credentials are never returned in public responses.
3. **Safety & XSS Defense:**
   - Client scripts use DOM `textContent` escaping when rendering user input in dashboard tables.

---

## 7. Active Component & File Inventory

```
website-lead-platform/
├── ARCHITECTURE.md          # Complete technical system topology & API specs
├── DESIGN.md                # Design system tokens, color palettes, and motion rules
├── MEMORY.md                # Living knowledge base, tech decisions, and registry
├── PRD.md                   # Product requirements, user flows, and specifications
├── RULES.md                 # Engineering governance, safety invariants, and rules
├── TASKS.md                 # Project roadmap, completed tasks, and upcoming backlog
├── server.js                # Express runtime server for standalone zero-dependency run
├── package.json             # Project dependencies and script runner configurations
├── public/                  # Static web assets and client frontend
│   ├── index.html           # Core lead generation website & request form
│   ├── portfolio.html       # Luxury Elena Voss editorial portfolio
│   ├── dashboard.html       # Agency owner management dashboard
│   ├── css/                 # Consolidated style systems and motion layers
│   ├── js/                  # Interaction engines, 3D scripts, and dashboard logic
│   └── photos/              # Local business mockups and case study media
├── src/                     # Next.js 14 App Router enterprise codebase
│   ├── app/                 # Pages, layouts, and API routes
│   ├── components/          # Reusable React components (Framer Motion, UI)
│   └── lib/                 # Database clients, utility functions, and type definitions
└── supabase/
    └── schema.sql           # Production PostgreSQL schema definitions
```