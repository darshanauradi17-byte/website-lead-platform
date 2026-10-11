# System Architecture Document

**System:** ApnaWeb Website Lead Platform  
**Architecture Version:** 2.0.0  
**Target Environments:** Production (Next.js + Supabase) & Zero-Dependency Standalone (Node.js + Express)

---

## 1. High-Level Architectural Topology

ApnaWeb is architected with a **dual-runtime capability**:
1. **Primary Enterprise Tier (Next.js 14 + Supabase):** A modern App Router stack featuring server-side rendering, Supabase PostgreSQL persistence, Row Level Security (RLS), and HMAC-signed API security.
2. **Standalone Prototype Tier (Node.js + Express):** A self-contained, zero-dependency Node engine (`server.js` + `public/`) providing offline demonstration capabilities and local JSON persistence (`data/submissions.json`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT TIER (BROWSER)                            │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │  Elena Voss Portfolio │  │ Public Landing & Form │  │ Owner Dashboard │  │
│  │   (public/portfolio)  │  │   (public/index.html) │  │  (dashboard.html)│ │
│  └───────────┬───────────┘  └───────────┬───────────┘  └────────┬────────┘  │
└──────────────┼──────────────────────────┼───────────────────────┼───────────┘
               │                          │                       │
               ▼                          ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION & API ROUTING TIER                       │
│                                                                             │
│   Next.js 14 (App Router: src/app/api/**)   OR   Express Engine (server.js) │
│   - Rate Limiting Middleware                     - In-Memory Token Set      │
│   - Indian Phone / Data Sanity Guards            - Request Sanitization     │
│   - Bearer / HMAC Token Verification             - Static Asset Hosting     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             PERSISTENCE TIER                                │
│                                                                             │
│   Primary: Supabase Cloud PostgreSQL       │ Fallback: File Store           │
│   - public.leads                           │ - data/submissions.json        │
│   - public.lead_messages                   │   (Deterministic ID >= 1000)   │
│   - public.lead_activity                   │                                │
│   - public.lead_files                      │                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Dual Runtime Specification

### 2.1 Next.js 14 App Router (Primary Production Engine)
* **Framework:** Next.js 14 with TypeScript and Tailwind CSS.
* **Component Layer:** React 18 with Framer Motion, GSAP animations, Lucide icons, and Recharts.
* **Database Driver:** `@supabase/supabase-js` using server-only service-role credentials.
* **Security Model:** Strict separation between client and database. The service-role key is never exposed to the browser.
* **Launch Command:** `npm run dev:web` or `npm run build:web && npm run start:web`.

### 2.2 Express Engine (Standalone Local Runtime)
* **Runtime:** Node.js 18+ with Express 4.19.2 and `dotenv`.
* **Static Delivery:** Directly serves assets from the `/public` root.
* **Zero-Setup Persistence:** Reads and writes to `data/submissions.json` synchronously with atomic safeguards.
* **Launch Command:** `npm start` (Runs `node server.js` on `http://localhost:3000`).

---

## 3. End-to-End Data Flow

### 3.1 Public Lead Submission Pipeline
```
Customer Browser           API Endpoint (Next.js/Express)            Persistence Store
      │                                   │                                  │
      ├─── POST /api/leads ──────────────>│                                  │
      │    (Payload: Form Data)           ├─── Validate Indian Phone # ─────>│
      │                                   ├─── Calculate Sequential ID ─────>│
      │                                   ├─── Write Record (Status: New) ──>│
      │<── 201 Created (Return RequestID)─┤                                  │
      │                                   │                                  │
```

### 3.2 Owner Dashboard Triage & Mutation Pipeline
```
Owner Browser              API Endpoint (Next.js/Express)            Persistence Store
      │                                   │                                  │
      ├─── POST /api/admin/login ────────>│                                  │
      │    (Credentials)                  ├─── Verify Hash / Env Secrets ───>│
      │<── 200 OK (Signed Bearer Token) ──┤                                  │
      │                                   │                                  │
      ├─── GET /api/submissions ─────────>│                                  │
      │    (Auth: Bearer <Token>)         ├─── Validate Token & Fetch Data ──>│
      │<── 200 OK (Full Leads Array) ─────┤                                  │
      │                                   │                                  │
      ├─── PATCH /api/submissions/:id ───>│                                  │
      │    (New Status: "In Progress")    ├─── Validate Enum & Update Date ──>│
      │<── 200 OK (Updated Object) ───────┤                                  │
```

---

## 4. API Endpoint Specifications

### 4.1 Public Routes

#### `POST /api/leads` (or `/api/submit` on Express)
Submits a new website request from a prospective customer.
* **Request Body (JSON):**
  ```json
  {
    "ownerName": "Rajesh Sharma",
    "businessName": "Sharma General Store",
    "businessType": "Shop",
    "phone": "9876543210",
    "city": "Bengaluru",
    "budget": "15000",
    "requirements": "Need a fast product catalogue and WhatsApp ordering button.",
    "email": "rajesh@example.com"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "requestId": 1004,
    "status": "New",
    "message": "Your website request has been registered. Reference ID #1004."
  }
  ```

#### `GET /api/leads/lookup?q=1004`
Public status lookup for the client tracking widget.
* **Response (200 OK):**
  ```json
  {
    "requestId": 1004,
    "businessName": "Sharma General Store",
    "city": "Bengaluru",
    "status": "Contacted",
    "createdAt": "2026-10-10T14:30:00.000Z",
    "updatedAt": "2026-10-10T16:15:00.000Z"
  }
  ```
  *(Note: Internal notes, owner contact information, and administrative metadata are strictly filtered out).*

---

### 4.2 Protected Admin Routes

All admin endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/admin/login` | Validates credentials, issues session token | No |
| `GET` | `/api/leads` | Fetches complete submission records with search/filter | **Yes** |
| `PATCH` | `/api/leads/:id` | Updates status (`New` → `Contacted` → `In Progress` → `Delivered`) | **Yes** |
| `DELETE` | `/api/leads/:id` | Permanently deletes a submission record | **Yes** |
| `POST` | `/api/admin/logout` | Revokes and clears the active session token | **Yes** |

---

## 5. Database Schema & Persistence

### 5.1 Primary Relational Schema (Supabase PostgreSQL)
```sql
-- Core Leads Table
CREATE TABLE public.leads (
    id BIGSERIAL PRIMARY KEY,
    request_id BIGINT UNIQUE NOT NULL,
    owner_name VARCHAR(120) NOT NULL,
    business_name VARCHAR(160) NOT NULL,
    business_type VARCHAR(60) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    city VARCHAR(80) NOT NULL,
    budget VARCHAR(60),
    requirements TEXT,
    email VARCHAR(120),
    status VARCHAR(30) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Delivered')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Communication & Portal Activity
CREATE TABLE public.lead_messages (
    id BIGSERIAL PRIMARY KEY,
    lead_id BIGINT REFERENCES public.leads(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) CHECK (sender_type IN ('owner', 'customer')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Standalone JSON Persistence Engine
* **Path:** `data/submissions.json`
* **Allocation Strategy:** Scans existing records, computes `MAX(requestId)`, and increments monotonically from base `999` (ensuring the first submission starts at `1000`).
* **Concurrency Protection:** Synchronous serial writes prevent file corruption during multi-request arrivals.

---

## 6. Security & Hardening Architecture

1. **Service-Role Encapsulation:** In the Next.js stack, `SUPABASE_SERVICE_ROLE_KEY` resides strictly in server memory (`src/lib/supabase/server.ts`). It is never bundled into client-side JavaScript.
2. **HMAC-Signed Session Tokens:** Admin session tokens are cryptographically generated and signed with `ADMIN_SESSION_SECRET`.
3. **Data Sanitization & XSS Defense:**
   - Public tracking responses execute `sanitizeLeadForPortal()`, scrubbing internal notes and operator details.
   - Client-side DOM insertion utilizes `textContent` escaping to prevent cross-site scripting.
4. **Input Validation:**
   - Strict regex validation for 10-digit Indian mobile numbers (`^[6-9]\d{9}$`).
   - Strict whitelisting for workflow status transitions (`New`, `Contacted`, `In Progress`, `Delivered`).
5. **Rate Limiting:** In-memory request counters throttle repeated submissions and authentication attempts.

---

## 7. Interactive Graphics & Motion Subsystems

| Subsystem | Library / Mechanism | Purpose | Performance Guard |
| :--- | :--- | :--- | :--- |
| **Elena Voss Showcase** | Vanilla CSS + GSAP + ScrollTrigger | Luxury obsidian presentation and card transitions | CSS variables, hardware-accelerated transforms |
| **Customer 3D Depth** | Three.js WebGL (ACES Tone Mapping) | Floating orb, metallic torus, and ambient lighting | Automatic Canvas 2D fallback for low-power GPUs |
| **Workspace Pointer Tilt** | PointerEvent Matrix Math | Subtle 3D perspective tilt on interactive browser frames | Disabled when `prefers-reduced-motion: reduce` |
| **Motion Design System** | IntersectionObserver | Staggered reveals, scroll progress, back-to-top pill | Zero reflow overhead, unobserved after reveal |