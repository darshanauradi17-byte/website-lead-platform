# Implementation Roadmap & Task Tracker

**Project:** ApnaWeb Lead Platform  
**Roadmap Version:** 2.0.0  
**Repository:** [github.com/darshanauradi17-byte/website-lead-platform](https://github.com/darshanauradi17-byte/website-lead-platform)  
**Tracking Status:** Production Ready / Deployed  

---

## 1. Roadmap Overview & Status Summary

| Workstream | Priority | Status | Description |
| :--- | :---: | :---: | :--- |
| **P0: Core Platform Architecture** | Highest | ✅ Completed | Dual runtime setup (Next.js 14 + Standalone Express) |
| **P1: Lead Capture & Tracking UI** | High | ✅ Completed | Single-flow intake form and zero-login Request ID tracking |
| **P2: Owner Management Dashboard** | High | ✅ Completed | Authenticated lead triage workspace with status progression |
| **P3: Elena Voss Portfolio Replica** | High | ✅ Completed | Luxury obsidian portfolio showcase with live preview switcher |
| **P4: Security & Data Hardening** | Medium | ✅ Completed | Input validation, XSS prevention, and secret encapsulation |
| **P5: Git & Deployment Sync** | Medium | ✅ Completed | Clean Git repository, .gitignore, and GitHub synchronization |
| **P6: Post-Launch Enhancements** | Low | 📋 Backlog | WhatsApp automated alerts, custom domain automation |

---

## 2. Priority 0 — Core Platform Foundation

- [x] **Dual Runtime Architecture**
  - Next.js 14 App Router stack in `src/` for full production capability.
  - Zero-dependency standalone Express server in `server.js` for instant local demos.
- [x] **Deterministic Request ID Sequence**
  - Generator starts at `#1000` and increments sequentially (`1000`, `1001`, `1002`, ...).
  - Synchronous file persistence safeguard in `data/submissions.json`.
- [x] **Standardized Routing**
  - `/` — Core customer landing and request intake.
  - `/portfolio.html` (and `/portfolio`) — Creative showcase.
  - `/dashboard.html` (and `/dashboard`) — Authenticated agency management dashboard.

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
    `New` ➔ `Contacted` ➔ `In Progress` ➔ `Delivered`
  - Real-time server synchronization reflecting latest progress.

---

## 4. Priority 2 — Owner Dashboard & Workflow Management

- [x] **Secured Access & Session Control**
  - Protected admin login gateway with token authorization.
  - Session persistence and clean logout handler.
- [x] **Lead Triage Workspace**
  - Real-time search across business names, phone numbers, and locations.
  - Status filter buttons (`All`, `New`, `Contacted`, `In Progress`, `Delivered`).
  - One-click customer actions: Instant WhatsApp message trigger and telephone dialer.
  - Safe deletion workflow with confirmation modal.
- [x] **Responsive Parity**
  - Full desktop table view paired with mobile-optimized lead cards.

---

## 5. Priority 3 — Luxury Elena Voss Portfolio Replica

- [x] **Elena Voss Visual Aesthetic (`public/portfolio.html`)**
  - Deep obsidian canvas (`#070707`), radiant ambient glow (`#F0640D` to `#B01205`), and editorial typography (*Host Grotesk* + *Playfair Display*).
  - Sticky frosted navigation bar with smooth anchor links.
- [x] **Founder Photo Spotlight**
  - Built-in photo container (`#hero-owner-photo`) ready for founder photo insertion.
- [x] **Interactive Live Preview Switcher**
  - Dynamic preview stage displaying realistic Indian business case studies:
    - *Apex Pharmacy & Surgical Store* (e-commerce & prescription ordering)
    - *Royal Heritage Unisex Salon* (online appointment booking)
    - *Mahalaxmi Supermarket / Kirana* (daily essentials catalogue)
    - *Artisan Brew Café & Bistro* (digital QR menu)
    - *Pulse Multi-Speciality Clinic* (doctor appointment system)
    - *IronForge Fitness Gym* (membership management)
- [x] **Founder Social Integration**
  - Direct Instagram profile link ([@darshan_auradi_06](https://www.instagram.com/darshan_auradi_06/)).

---

## 6. Priority 4 — Security & Production Hardening

- [x] **Secret Encapsulation**
  - Configuration extracted to `.env.example` and `.env.local`.
  - Database service-role keys encapsulated strictly in server-side handlers.
- [x] **Data Privacy & Public Route Sanitization**
  - Public tracking endpoints scrub internal agency notes, operator IDs, and private flags.
  - XSS defense through DOM `textContent` escaping on dynamic table rendering.
- [x] **Accessible Motion Physics**
  - Automatic detection and respect for `prefers-reduced-motion: reduce`.
  - WebGL fallback to 2D canvas for low-power mobile devices.

---

## 7. Priority 5 — Version Control & Repository Sync

- [x] **Git Repository Initialization**
  - Standardized root `.gitignore` excluding `node_modules/`, `.next/`, and environment secrets.
  - Default branch set to `main`.
- [x] **GitHub Remote Synchronization**
  - Synced to remote: [github.com/darshanauradi17-byte/website-lead-platform](https://github.com/darshanauradi17-byte/website-lead-platform).

---

## 8. Priority 6 — Future Considerations & Backlog

- [ ] **Automated WhatsApp Business Notification:** Automatic WhatsApp alert sent to agency phone upon new lead arrival.
- [ ] **Automated Client Invoicing:** PDF proposal and invoice generation directly from the owner dashboard.
- [ ] **Custom Domain Setup Guide:** Interactive DNS step-by-step assistant for clients launching their delivered websites.
- [ ] **Founder Photo Asset Insertion:** Insert high-resolution founder photo into `public/portfolio.html`.