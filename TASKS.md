# Implementation Roadmap & Task Tracker

**Project:** ApnaWeb Lead Platform  
**Roadmap Version:** 2.1.0  
**Repository:** [github.com/darshanauradi17-byte/website-lead-platform](https://github.com/darshanauradi17-byte/website-lead-platform)  
**Tracking Status:** Production Ready (Pre-Launch Domain Gate)  

---

## 1. Roadmap Overview & Status Summary

| Workstream | Priority | Status | Description |
| :--- | :---: | :---: | :--- |
| **P0: Core Platform Architecture** | Highest | ✅ Completed | Dual runtime setup (Next.js 14 + Standalone Express) |
| **P1: Lead Capture & Tracking UI** | High | ✅ Completed | Single-flow intake form and zero-login Request ID tracking |
| **P2: Owner Management Dashboard** | High | ✅ Completed | Authenticated lead triage workspace with status progression |
| **P3: Showcase Portfolio** | High | ✅ Completed | Luxury obsidian portfolio showcase with real local case studies |
| **P4: Anti-Vibe-Coding Compliance** | High | ✅ Completed | Purged purple gradients, pill buttons, fake metrics, and AI tags |
| **P5: Favicon & Brand Assets** | High | ✅ Completed | SVG favicon generated and linked across all pages |
| **P6: Pre-Launch Gate (Domain)** | High | ⏳ Pending | Do NOT launch until custom domain is connected |
| **P7: Git & Deployment Sync** | Medium | ✅ Completed | Clean Git repository, .gitignore, and GitHub synchronization |

---

## 2. Priority 0 — Core Platform Foundation

- [x] **Dual Runtime Architecture**
  - Next.js 14 App Router stack in `src/` for full production capability.
  - Zero-dependency standalone Express server in `server.js` for instant local demos.
- [x] **Deterministic Request ID Sequence**
  - Generator starts at `#1000` and increments sequentially (`1000`, `1001`, `1002`, ...).
  - Synchronous file persistence safeguard in `data/submissions.json`.
- [x] **Permanent Port 3000 Enforcement**
  - Locked `server.js` to Port 3000 with automatic process-clearing logic.

---

## 3. Priority 1 — Lead Capture & Customer Experience

- [x] **Single-Flow Request Form**
  - Unified single-page form eliminating high-friction multi-step drop-offs.
  - Required validation for Owner Name, Business Name, City, and Business Category.
- [x] **Strict Phone & Budget Validation**
  - Indian 10-digit mobile number pattern matching (`^[6-9]\d{9}$`).
  - Open custom numeric budget entry (e.g. ₹15,000) instead of restrictive brackets.
- [x] **Zero-Login Customer Tracking Portal**
  - Direct 4-digit Request ID lookup without requiring customer passwords.
  - Interactive 4-stage visual progress timeline:
    `New` -> `Contacted` -> `In Progress` -> `Delivered`

---

## 4. Priority 2 — Owner Dashboard & Lead Management

- [x] **Secured Access & Session Control**
  - Protected admin login gateway with token authorization.
  - Session persistence and clean logout handler.
- [x] **Lead Triage Workspace**
  - Real-time search across business names, phone numbers, and locations.
  - Status filter buttons (`All`, `New`, `Contacted`, `In Progress`, `Delivered`).
  - One-click customer actions: Instant WhatsApp message trigger and telephone dialer.
  - Safe deletion workflow with confirmation modal.

---

## 5. Priority 3 — Anti-Vibe-Coding Refactor (Strict Compliance)

- [x] **Zero Purple Gradients**
  - Purged all purple, violet, and magenta gradients across all stylesheets (`dashboard.css`, `gradient-button.css`, `style.css`).
- [x] **Zero Pill-Shaped Buttons**
  - Banned `border-radius: 9999px`. Enforced crisp rectangular corners with subtle `6px`–`8px` radii.
- [x] **Zero Fake Reviews & Fake Metrics**
  - Removed fake AWWARDS, FWA, and Webby badges. Replaced with authentic build standards.
- [x] **Zero Vague Hero Copy**
  - Replaced generic AI headlines with direct, plain-spoken Indian business value propositions.
- [x] **Zero Emoji Icons**
  - Eradicated all emojis from headers, cards, and buttons. Using clean Lucide/SVG vectors.
- [x] **Zero Em Dashes (`—`)**
  - Replaced all em dashes with standard hyphens `-` and colons `:`.
- [x] **Zero Cursor Animations & Over-The-Top Scroll Effects**
  - Native cursor interaction only. Disabled custom trailing cursors.
- [x] **Zero Fake Custom Counters**
  - Removed fake stat tickers. Counters reflect only live, real database submissions.

---

## 6. Priority 4 — Brand Assets & Launch Gate

- [x] **Official Favicon Active**
  - Created `public/favicon.svg` and linked via `<link rel="icon">` in `index.html`, `portfolio.html`, and `dashboard.html`.
- [x] **Purge AI / Template Badges**
  - Eradicated all "Made with AI", 21st.dev, and template strings from code comments, titles, and metadata.
- [ ] **Custom Domain Connection (Strict Launch Gate)**
  - Do NOT deploy/launch to public traffic until verified custom domain (e.g. `apnaweb.in`) is connected.

---

## 7. Priority 5 — Future Backlog (Post-Launch)

- [ ] **Automated WhatsApp Business Notification:** Instant WhatsApp ping on incoming leads.
- [ ] **Automated Client Invoicing:** PDF proposal and invoice generation directly from the owner dashboard.
- [ ] **Founder Photo Asset Insertion:** Insert high-resolution founder photo into `public/portfolio.html`.