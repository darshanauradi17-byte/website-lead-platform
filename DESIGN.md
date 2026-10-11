# Design System Specification

**Project:** ApnaWeb Lead Platform  
**Specification Version:** 2.1.0  
**Design Philosophy:** Human-Crafted, Grounded, High-Trust, and Anti-Vibe-Coding  

---

## 1. Visual Identity & Design Philosophy

The ApnaWeb design system explicitly rejects "vibe-coded" tropes (purple gradients, pill buttons, fake counters, fake reviews, and floaty cursor followers) in favor of **authentic, conversion-focused, and human-designed local business interfaces**.

The platform maintains two cohesive environments:
1. **The Creative Showcase (`public/portfolio.html`):** An obsidian-dark luxury editorial experience with warm ember/orange backlight (`#F0640D`), custom typography, and real Indian business case studies.
2. **The Business Workspace (`dashboard.html` & `index.html`):** A deep navy (`#07111f`) and slate-blue environment designed for instant data readability and rapid lead triaging.

---

## 2. Color Palettes & Strict Color Invariants

### 2.1 The Anti-Purple Invariant
* **Strict Prohibition:** ZERO purple, violet, magenta, or indigo gradients anywhere across stylesheets, buttons, badges, or backgrounds.

### 2.2 ApnaWeb Showcase Palette (`public/portfolio.html`)
| Token Name | Hex / CSS Value | Semantic Purpose |
| :--- | :--- | :--- |
| `--bg-black` | `#070707` | Core canvas background |
| `--bg-hero-glow` | `#180d08` | Ambient radial hero backlight |
| `--accent-orange` | `#F0640D` | Primary accent highlight and active indicators |
| `--accent-red` | `#B01205` | Deep ember accent glow |
| `--accent-gradient` | `linear-gradient(135deg, #F16B0D 0%, #E61416 100%)` | Accent borders and featured titles |
| `--text-white` | `#ffffff` | Primary headings and prominent titles |
| `--text-muted` | `rgba(255, 255, 255, 0.70)` | Secondary descriptive text and body copy |
| `--text-dim` | `rgba(255, 255, 255, 0.40)` | Captions, dates, and subtle borders |
| `--border-line` | `rgba(255, 255, 255, 0.15)` | Card separators and subtle outlines |

### 2.3 Business Workspace & Dashboard Palette (`dashboard.html` & `index.html`)
| Token Name | Hex Value | Semantic Purpose |
| :--- | :--- | :--- |
| `--surface-canvas` | `#07111f` | Deep navy foundational background |
| `--surface-panel` | `#0a1728` | Container card and data table surface |
| `--surface-border` | `rgba(255, 255, 255, 0.08)` | Structural hairline borders |
| `--brand-blue` | `#60a5fa` | Primary interactive links, icons, and focus rings |
| `--text-primary` | `#f8fafc` | Maximum contrast typography (WCAG AAA) |
| `--text-secondary` | `#a9b8ca` | Readable secondary metadata |

### 2.4 Status Indicator Badges (Zero Purple)
* **`New`:** Sky Blue (`#38bdf8`) - Pulse dot indicates newly arrived lead.
* **`Contacted`:** Amber / Warm Orange (`#f59e0b`) - Indicates client outreach completed.
* **`In Progress`:** Royal Blue / Sky (`#0284c7`) - Indicates active development underway.
* **`Delivered`:** Emerald Green (`#10b981`) - Indicates project deployed live to production.

---

## 3. Typography Hierarchy (Zero Em Dashes)

* **Prohibition:** Zero em dashes (`—`) in copy. Use clean hyphens `-` or colons `:`.
* **Primary Display & Body:** `Host Grotesk` / `Inter` (Weights: 400, 500, 600, 700, 800) for navigation, lead form, table data, and buttons.
* **Editorial Accent:** `Playfair Display` (Weights: 400, 600, 700) for case study titles and serif headlines.
* **Monospace / Telemetry:** `JetBrains Mono` for Request IDs (`#1004`), timestamps, and status codes.

---

## 4. Surfaces, Radii & The Anti-Pill Invariant

* **Strict Prohibition:** NO pill-shaped buttons (`border-radius: 9999px` is strictly banned).
* **Button & Chip Radius:** Crisp rectangular with subtle radius (`6px` to `8px`).
* **Container Radii:**
  - Cards & Mockup Viewports: `16px` to `24px`.
  - Inputs & Modals: `8px` to `12px`.
* **Translucent Panels:** Backdrop blur (`backdrop-filter: blur(16px)`) with dark alpha layers (`rgba(7, 7, 7, 0.65)` to `rgba(10, 23, 40, 0.85)`).

---

## 5. Button Architecture & Interactive States

Buttons utilize the **ApnaWeb Tactile Button System** (`public/css/gradient-button.css`):
1. **Primary Action (`.gradient-button`):** Solid charcoal `#0f172a` with warm amber/orange border glow on hover (`#ea580c`). NO purple.
2. **Secondary Action (`.gradient-button-variant`):** Translucent navy with subtle sky blue border on hover.
3. **WhatsApp Connect (`.gradient-button-whatsapp`):** Emerald green styling (`#16a34a`) for instant WhatsApp ordering.
4. **Destructive Action (`.gradient-button-danger`):** Crimson red (`#991b1b`) used exclusively for lead deletion in the admin dashboard.

---

## 6. Motion Standards & Prohibitions

### 6.1 Prohibited Gimmicks
* **NO Cursor Animations:** Native OS cursors only. Zero custom trailing dots or cursor-following circles.
* **NO Fake Counters:** Only real, live database counts in the owner dashboard. No animated tickers faking stats.
* **NO Over-The-Top Scroll Effects:** Subtle reveals (`200ms`–`300ms`) only. Zero page shaking or scroll jacking.

### 6.2 Accessibility Compliance (`prefers-reduced-motion`)
* When `prefers-reduced-motion: reduce` is detected, all transitions resolve immediately and 3D depth tilts are completely disabled.

---

## 7. Branding, Favicon & Launch Requirements

* **Official Favicon:** `public/favicon.svg` linked via `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` across all HTML entry points.
* **Custom Domain Requirement:** Platform will only launch to production after connecting a verified custom domain.
* **Zero AI Badges:** Zero "Made with AI", 21st.dev, or template tags anywhere in customer-facing UI or metadata.