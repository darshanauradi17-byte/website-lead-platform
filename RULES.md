# Project Governance & Engineering Rules

**Project:** ApnaWeb Lead Platform  
**Document Version:** 2.1.0  
**Scope:** Universal Standards for Code, Architecture, UI/UX, and Operations  

---

## 1. Product & Architecture Principles

1. **Practical Utility Over Complexity:** Build features that serve local businesses and generate revenue. Do not engineer speculative abstractions or unnecessary microservices.
2. **Functionality Before Decoration:** Every interactive element, animation, or visual must support user comprehension and conversion. Aesthetics must never impede usability.
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

## 7. Strict Anti-Vibe-Coding Prohibitions (Zero Aesthetic Gimmicks)

1. **NEVER Use Purple Gradients:**
   - Zero purple, violet, indigo, or magenta gradients in any stylesheet, button, card, or modal.
   - Use warm, grounded tones (off-white, deep navy `#07111f`, slate, warm amber `#F0640D`, terracotta, or emerald).
2. **NEVER Use Pill-Shaped Buttons:**
   - Zero `border-radius: 9999px` or pill-shaped buttons.
   - All buttons must use human-designed, crisp rectangular corners with subtle `6px` to `8px` radii.
3. **NO Fake Reviews, Fake Ratings, or Fake Metrics:**
   - Zero fabricated 5-star testimonials ("John Doe said...", fake Google star ratings).
   - Zero fabricated awards (no fake AWWARDS, FWA, or Webby badges).
   - Only state verifiable, honest build standards and capabilities.
4. **NO Vague Hero Copy:**
   - Zero generic AI buzzwords ("Transform your digital frontier", "Next-gen synergy", "Visualise your mind in motion").
   - Headlines must be specific, direct, plain-spoken Indian local business copy:
     *"Websites for local businesses in India that bring phone calls and WhatsApp orders. Delivered in 2 to 5 days."*
5. **NO Emoji Icons:**
   - Zero emojis in headings, cards, navigation, or buttons. Use crisp vector SVGs or Lucide icons only.
6. **NO Em Dashes (`—`):**
   - Use standard hyphens `-` or colons `:` instead of pretentious em dashes.
7. **NO Over-The-Top Scroll Animations or Cursor Animations:**
   - Zero custom cursor followers or trailing dots.
   - Zero page-shaking effects, dizzying 3D camera sweeps, or scroll-blocking animations.
8. **NO AI Slop Photos or AI Slop Copy:**
   - Zero plastic-looking AI-generated faces or unrealistic mockups.
   - Use realistic Indian local business archetypes (Kirana, Medical Stores, Unisex Salons, Cafés).
9. **NO Fake Custom Counters:**
   - Zero fake animated tickers claiming fake numbers ("500+ clients", "$1M generated").
   - Counters in the owner dashboard reflect only real, live database submissions.

---

## 8. Production Launch Gate Invariants

The platform **MUST NOT LAUNCH** to production until all three conditions are satisfied:
1. **Custom Domain Connected:** Production DNS must be routed to a verified custom domain (e.g. `apnaweb.in`).
2. **Official Favicon Active:** Crisp SVG / ICO favicon (`favicon.svg`) linked and rendering on all pages.
3. **Zero AI / Template Tags:** All "Made with AI", 21st.dev, v0, or external template references completely eradicated from copy, code comments, and metadata.

---

## 9. Code Quality & Version Control Rules

1. **Maintain Documentation Integrity:** When technical implementations change, update the 6 core architectural documents (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md`, `MEMORY.md`) simultaneously.
2. **Atomic Git Commits:** Write clean, conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
3. **Preserve Working Routes:** Never deprecate or break active routes without an explicit migration path.
4. **Make NO MISTAKES:** Triple-check every change against these governance invariants before shipping.