# Project Governance & Engineering Rules

**Project:** ApnaWeb Lead Platform  
**Document Version:** 2.0.0  
**Scope:** Universal Standards for Code, Architecture, UI/UX, and Operations  

---

## 1. Product & Architecture Principles

1. **Practical Utility Over Complexity:** Build features that serve local businesses and generate revenue. Do not engineer speculative abstractions or unnecessary microservices.
2. **Functionality Before Decoration:** Every interactive element, animation, or 3D visual must support user comprehension and conversion. Aesthetics must never impede usability.
3. **Dual Runtime Integrity:**
   - Any modifications to the Next.js production stack must not break the standalone Express prototype runtime (`server.js` + `public/`).
   - Standard routes (`/`, `/portfolio`, `/dashboard`, `/api/submit`, `/api/leads`) must remain backwards compatible.

---

## 2. Lead Intake & Request Form Rules

1. **Single-Flow Intake:** The customer lead capture form must remain unified on a single page or seamless progressive disclosure. Never introduce bloated multi-step pagination that increases drop-off.
2. **Strict Indian Phone Validation:** All phone inputs must enforce the Indian 10-digit mobile pattern (`^[6-9]\d{9}$`). Reject international formatting or incomplete digits.
3. **Flexible Budgeting:** Allow prospective clients to enter a custom numeric budget rather than forcing rigid, predefined brackets.
4. **Deterministic Request IDs:**
   - Request IDs must begin at `#1000` and increment sequentially (`1000`, `1001`, `1002`, ...).
   - Never use random UUIDs or hashed strings for client-facing reference IDs.
5. **Initial State Invariant:** Every submitted lead enters the system exclusively with the status `New`.

---

## 3. Workflow & State Machine Rules

The platform strictly enforces a **4-stage linear workflow**. No intermediate or custom statuses may be created without formal product approval.

```
┌─────────┐      ┌───────────┐      ┌─────────────┐      ┌───────────┐
│   New   │ ───> │ Contacted │ ───> │ In Progress │ ───> │ Delivered │
└─────────┘      └───────────┘      └─────────────┘      └───────────┘
```

| State | Explicit Definition | Trigger Event |
| :--- | :--- | :--- |
| **`New`** | Lead submitted by client; awaiting agency review. | Default state upon form submission. |
| **`Contacted`** | Agency has reached out to customer via WhatsApp or phone call. | Owner clicks "Mark Contacted" or updates status in dashboard. |
| **`In Progress`** | Scope agreed; website design and code actively underway. | Owner transitions lead during active build. |
| **`Delivered`** | Website live on custom domain; project concluded. | Owner transitions lead upon project sign-off. |

---

## 4. Customer Tracking Experience Rules

1. **Zero Authentication Friction:** Tracking requires only the 4-digit `Request ID`. Never demand customer passwords, OTPs, or user registration.
2. **Data Privacy Guard:** Tracking views must only display:
   - Request ID
   - Business Name
   - City
   - Current Status & 4-Stage Visual Timeline
   - Submission Timestamp
3. **Zero Information Leak:** Internal agency notes (`internal_notes`), assignees, spam flags, and private contact phone numbers must **never** be exposed via public tracking endpoints.

---

## 5. Owner Dashboard & Triage Rules

1. **Mandatory Authentication:** All dashboard routes and management API endpoints (`GET /api/leads`, `PATCH /api/leads/:id`, `DELETE /api/leads/:id`) require active token authorization.
2. **Non-Destructive Filtering:** Client-side searches, date sorts, and status filters must operate strictly on cached memory and must never mutate server records.
3. **Safe Deletion Protocol:** Permanent lead deletion must always trigger a confirmation dialog with clear warnings to prevent accidental data loss.
4. **Responsive Parity:** The dashboard must remain fully functional on mobile viewports (card layouts) as well as desktop viewports (full data tables).

---

## 6. Security, Privacy & Secret Management

1. **Zero Secret Leaks:**
   - Never commit `.env` or `.env.local` to Git.
   - Never hardcode production database passwords or service-role keys in client bundles or public repositories.
2. **Server-Side Validation:** Never rely on client-side HTML validation alone. All writes must undergo server-side sanitization.
3. **XSS Defense:** User-supplied strings (business names, requirements, notes) must be escaped via `textContent` or framework sanitizers before being injected into the DOM.
4. **Rate Limiting:** Public submission and login endpoints must be throttled to prevent spam and credential brute-forcing.

---

## 7. Motion, 3D & Accessibility Rules

1. **Accessibility First (`prefers-reduced-motion`):**
   - When a user has reduced motion enabled in their operating system, all 3D tilt effects, smooth parallax, and animated entrance transitions must be completely disabled.
2. **Subtle & Restrained Motion:**
   - Micro-interactions must not exceed `200ms`–`400ms`.
   - Avoid aggressive page shakes, disorienting 3D camera sweeps, or animations that block user interaction.
3. **Hardware Fallback:**
   - Any WebGL or Three.js element must feature an automatic 2D fallback for devices with disabled or low-power GPUs.

---

## 8. Brand & Content Integrity

1. **Authentic Representation:** Avoid generic marketing buzzwords or unrealistic promises (e.g., *"guaranteed 10x revenue in 24 hours"*).
2. **Local Business Relevance:** Use realistic Indian business archetypes (Kirana, Medical Stores, Unisex Salons, Cafés) in all demos and copy.
3. **Founder Attribution:** The portfolio and direct contact channels represent **Darshan / ApnaWeb Studio** with verified social connections ([@darshan_auradi_06](https://www.instagram.com/darshan_auradi_06/)).

---

## 9. Code Quality & Version Control Rules

1. **Maintain Documentation Integrity:** When technical implementations change, update the 6 core architectural documents (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md`, `MEMORY.md`) simultaneously.
2. **Atomic Git Commits:** Write clean, conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
3. **Preserve Working Routes:** Never deprecate or break active routes without an explicit migration path.