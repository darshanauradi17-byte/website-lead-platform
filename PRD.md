# Product Requirements Document (PRD)

**Project:** ApnaWeb Lead Platform  
**Document Version:** 2.0.0  
**Status:** Active / Production-Ready  
**Target Market:** Indian Local Businesses & High-Street Retailers  

---

## 1. Executive Summary

**ApnaWeb** is a high-conversion, lead-generation and client-delivery platform built specifically for local Indian business owners (retail shops, clinics, pharmacies, restaurants, salons, bakeries, and fitness centers). 

Many traditional business owners hesitate to hire digital agencies due to technical jargon, opaque pricing, and complex onboarding. ApnaWeb bridges this gap with a frictionless digital experience:
1. **Public Discovery & Portfolio:** A human-designed, hyper-realistic website featuring case studies and an interactive portfolio (based on the Elena Voss luxury editorial aesthetic).
2. **Frictionless Lead Capture:** A single-flow request form capturing business needs, local context, and custom budgets.
3. **Transparent Client Tracking:** A zero-login, sequential **Request ID tracking portal** where customers monitor their project's progress across 4 simple milestones.
4. **Command & Control Admin Dashboard:** A centralized business workspace for the agency owner to review, filter, update, and advance incoming client leads.

---

## 2. Problem Statement & Value Proposition

| Traditional Problem | ApnaWeb Solution |
| :--- | :--- |
| **High Friction Intake:** Long, multi-page questionnaires scare away busy shopkeepers. | **Streamlined Single Intake:** Simple, intuitive form collecting essential business data in under 2 minutes. |
| **Zero Visibility:** Clients are left wondering if anyone received their website request. | **Live Request ID Tracking:** Instant 4-stage tracking timeline (New → Contacted → In Progress → Delivered). |
| **Messy Lead Management:** Agency owners track leads via disorganized WhatsApp chats and notes. | **Unified Owner Dashboard:** Searchable table/card workspace with status transitions, quick notes, and contact actions. |
| **Cookie-Cutter Templates:** Generic Western website themes fail to resonate with local Indian merchants. | **Tailored Local Case Studies:** Realistic demos for Kirana stores, medical pharmacies, unisex salons, and multi-cuisine diners. |

---

## 3. Target Audience & User Personas

### 3.1 Primary Customer: Local Business Owner
* **Who they are:** Owners of high-street retail stores, clinics, gyms, salons, and cafés across Tier 1, 2, and 3 Indian cities.
* **Tech Literacy:** High mobile smartphone comfort (WhatsApp, UPI, Instagram), but low desktop or coding knowledge.
* **Key Needs:** Trustworthy pricing, clear deliverables, mobile-optimized showcase, and fast turnaround (within 2–5 working days).

### 3.2 Internal Operator: Agency Owner / Web Designer
* **Who they are:** Independent digital consultant or web studio operator (Darshan / ApnaWeb Studio).
* **Key Needs:** Rapid lead triaging, immediate contact links (WhatsApp / Call), audit logs, and status progression without backend overhead.

---

## 4. End-to-End User Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. PUBLIC DISCOVERY                             │
│  Client visits ApnaWeb → Explores Services → Browses Elena Voss Works  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        2. LEAD CAPTURE                                 │
│  Client completes Request Form → Selects Business Category + Budget    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        3. INSTANT CONFIRMATION                         │
│  System generates sequential Request ID (e.g., #1004)                  │
│  Client is presented with Reference ID & Next Steps                    │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌───────────────────────────────────────┐  ┌─────────────────────────────┐
│       4A. CLIENT TRACKING             │  │    4B. OWNER MANAGEMENT     │
│  Client inputs ID in Tracking Bar     │  │  Owner authenticates        │
│  Views live 4-stage progress timeline │  │  Reviews lead in Dashboard  │
│  Monitors active development stage    │  │  Contacts lead & updates    │
└───────────────────────────────────────┘  └─────────────────────────────┘
```

---

## 5. Feature Specifications

### 5.1 Public Experience & Elena Voss Portfolio
* **Sticky Glassmorphic Navigation:** Smooth anchors (`#services`, `#portfolio`, `#process`, `#tracking`, `#contact`).
* **Luxury Editorial Portfolio:** Dark obsidian theme (`#070707`), radiant ambient glow (`#F0640D` to `#B01205`), and editorial typography (*Host Grotesk* + *Playfair Display*).
* **Interactive Live Preview Stage:** Dynamic preview switcher exhibiting realistic Indian businesses:
  - *Apex Pharmacy & Surgical Store* (e-commerce & prescription ordering)
  - *Royal Heritage Unisex Salon* (online appointment booking)
  - *Mahalaxmi Supermarket / Kirana* (daily essentials catalogue)
  - *Artisan Brew Café & Bistro* (digital QR menu)
  - *Pulse Multi-Speciality Clinic* (doctor appointment system)
  - *IronForge Fitness Gym* (membership management)
* **Owner Photo Frame:** Built-in spotlight container for agency founder photography.
* **Direct Connect Tiles:** Instant WhatsApp launch, phone dialer, and direct social links ([Instagram: @darshan_auradi_06](https://www.instagram.com/darshan_auradi_06/)).

### 5.2 Single-Page Lead Capture Form
* **Core Mandatory Fields:**
  1. Full Name / Owner Name (min 2 characters)
  2. Business Name
  3. City / Town
  4. Business Category (Retail, Salon, Medical, Restaurant, Gym, Clinic, or Custom Other)
  5. Indian 10-digit Phone Number (`+91` format with strict regex validation)
  6. Website Requirements (Open brief describing business needs)
  7. Estimated Budget (Custom numeric rupee entry)
* **Optional Context Fields:** Email Address, Business Logo upload, Store Photos, Social Media handles, Preferred aesthetic style.
* **Deterministic ID Engine:** Auto-assigns an incrementing sequential identifier starting at `#1000`.

### 5.3 Customer Progress Tracker
* **Zero Authentication Barrier:** No password or registration needed—operates strictly on the unique `Request ID`.
* **Standardized 4-Stage State Machine:**
  1. `New` — Application recorded in database.
  2. `Contacted` — Agency has reached out via phone or WhatsApp.
  3. `In Progress` — Wireframes, design, and coding actively underway.
  4. `Delivered` — Site deployed live to production with custom domain.
* **Real-time Server Sync:** Displays business name, city, submission timestamp, and visual active state indicator.

### 5.4 Agency Owner Dashboard
* **Secured Access:** Password-protected workspace with token authorization.
* **Lead Analytics & Metrics:** Total submissions, pending contacts, active builds, and delivered deployments.
* **Lead Control Table:**
  - Real-time search across business names, phone numbers, and cities.
  - Status filtering pills (`All`, `New`, `Contacted`, `In Progress`, `Delivered`).
  - One-click customer actions: Instant WhatsApp message trigger and telephone dialer.
  - Lead Detail Drawer: Full brief inspection, custom notes, and status transition selector.
  - Safe Deletion: Confirmation dialog with safety safeguards to prevent accidental record loss.

---

## 6. Data Dictionary

| Field Name | Type | Required | Constraints / Validation |
| :--- | :--- | :---: | :--- |
| `requestId` | Number | Yes | Primary sequence identifier (starts at 1000) |
| `ownerName` | String | Yes | 2–80 characters, sanitized |
| `businessName` | String | Yes | 2–100 characters |
| `businessType` | Enum | Yes | `Shop`, `Salon`, `Medical`, `Restaurant`, `Gym`, `Clinic`, `Other` |
| `phone` | String | Yes | 10-digit Indian Mobile `^[6-9]\d{9}$` |
| `city` | String | Yes | 2–60 characters |
| `budget` | String/Number | Yes | Custom user figure (e.g. ₹15,000) |
| `requirements` | String | Yes | Detailed project requirements |
| `email` | String | No | Valid email format |
| `status` | Enum | Yes | `New` \| `Contacted` \| `In Progress` \| `Delivered` |
| `createdAt` | ISO Timestamp | Yes | Auto-generated system time |
| `updatedAt` | ISO Timestamp | Yes | Updated upon status modification |

---

## 7. Non-Goals & Out-of-Scope Items

To preserve simplicity and focus on high conversion, the following are strictly excluded from current scope:
* ❌ Mandatory customer account creation or password credentials for lead submission.
* ❌ In-browser automated payment gateways (payments are finalized post-consultation via UPI/invoice).
* ❌ Heavy, blocking WebGL animations that degrade performance on budget mobile devices.
* ❌ Complex multi-step wizard forms that lower submission conversion rates.

---

## 8. Success Metrics & Key Performance Indicators (KPIs)

1. **Submission Completion Rate:** > 80% form completion rate for visitors opening the request section.
2. **Speed to Contact (SLA):** Agency response within 24–48 hours of initial lead generation.
3. **Tracking Accessibility:** 100% of customers able to view real-time build status using their 4-digit ID.
4. **Performance & Lighthouse Score:** > 90 on Desktop and > 85 on Mobile for fast load times over 4G connections.