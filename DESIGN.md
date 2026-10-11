# Design System Specification

**Project:** ApnaWeb Lead Platform  
**Specification Version:** 2.0.0  
**Design Philosophy:** Human-Crafted, Editorial, High-Trust, and Purpose-Driven  

---

## 1. Visual Identity & Design Philosophy

The ApnaWeb platform rejects generic, "AI-generated" templates and noisy glassmorphism in favor of a **human-crafted, trustworthy, and high-conversion aesthetic**.

The system balances two distinct visual environments:
1. **The Creative Showcase (Elena Voss Template Style):** An obsidian-dark luxury editorial experience crafted to convey creative excellence and technical mastery for agency work.
2. **The Business Workspace:** A deep navy and slate-blue environment designed for clarity, data readability, and quick lead triaging.

---

## 2. Color Palettes & Design Tokens

### 2.1 Elena Voss Portfolio Palette (`public/portfolio.html`)
Inspired by the award-winning Elena Voss template from 21st.dev, this palette pairs deep dark backgrounds with energetic ember and flame accents.

| Token Name | Hex / CSS Value | Semantic Purpose |
| :--- | :--- | :--- |
| `--bg-black` | `#070707` | Core canvas background |
| `--bg-hero-glow` | `#180d08` | Ambient radial hero backlight |
| `--accent-orange` | `#F0640D` | Primary accent highlight and active pills |
| `--accent-red` | `#B01205` | Deep ember accent glow |
| `--accent-gradient` | `linear-gradient(135deg, #F16B0D 0%, #E61416 100%)` | CTA button gradients and featured borders |
| `--text-white` | `#ffffff` | Primary headings and prominent titles |
| `--text-muted` | `rgba(255, 255, 255, 0.70)` | Secondary descriptive text and body copy |
| `--text-dim` | `rgba(255, 255, 255, 0.40)` | Captions, dates, and subtle borders |
| `--border-line` | `rgba(255, 255, 255, 0.15)` | Card separators and subtle glass outlines |

### 2.2 Business Workspace & Owner Dashboard Palette (`dashboard.html` & `index.html`)
A calm, authoritative palette engineered for visual comfort and high data contrast during prolonged usage.

| Token Name | Hex Value | Semantic Purpose |
| :--- | :--- | :--- |
| `--surface-canvas` | `#07111f` | Deep navy foundational background |
| `--surface-panel` | `#0a1728` | Container card and data table surface |
| `--surface-border` | `rgba(255, 255, 255, 0.08)` | Structural hairline borders |
| `--brand-blue` | `#60a5fa` | Primary interactive links, icons, and focus rings |
| `--text-primary` | `#f8fafc` | Maximum contrast typography (WCAG AAA) |
| `--text-secondary` | `#a9b8ca` | Readable secondary metadata |

### 2.3 Status Indicator Badges
Status indicators pair distinct semantic colors with subtle pulsing dots to ensure visual clarity without relying on color alone:

* **`New`:** Indigo / Sky Blue (`#38bdf8`) — Pulse dot indicates newly arrived lead.
* **`Contacted`:** Amber / Orange (`#f59e0b`) — Indicates client outreach completed.
* **`In Progress`:** Emerald Green (`#10b981`) — Indicates active design and engineering.
* **`Delivered`:** Violet / Purple (`#8b5cf6`) — Indicates project completed and live.

---

## 3. Typography Hierarchy

The platform employs a dual-font pairing strategy that combines geometric precision with editorial character:

| Role | Font Family | Weights | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Display & Body** | `Host Grotesk` / `Inter` | 400, 500, 600, 700, 800 | Navigation, headlines, lead form, table data, buttons |
| **Editorial Accent** | `Playfair Display` | 400 Italic, 600, 700 | Case study titles, quote accents, serif hero highlights |
| **Monospace / Metrics** | `JetBrains Mono` | 400, 600 | Request IDs (`#1004`), timestamps, status codes, telemetry |

---

## 4. Surfaces, Borders & Glassmorphism

* **Translucent Layering:** Panels use backdrop blur (`backdrop-filter: blur(16px)`) with dark alpha layers (`rgba(7, 7, 7, 0.65)` to `rgba(10, 23, 40, 0.85)`).
* **Border Radii:**
  - Action Buttons & Chips: Fully rounded pill shape (`9999px`).
  - Cards & Mockup Viewports: Smooth modern corners (`16px` to `24px`).
  - Inputs & Modals: Crisp containers (`12px` to `16px`).
* **Subtle Hairline Borders:** `1px` borders with low opacity ensure clean visual separation without visual clutter.

---

## 5. Button Architecture & Interactive States

Buttons utilize the **21st.dev Gradient Button System** with modern `@property` CSS hover sweeps:

1. **Primary Action (`.gradient-button`):** Radiant dark-rose/ember sweep for high-priority user actions ("Request Your Website", "Submit Request").
2. **Secondary Action (`.gradient-button-variant`):** Subtle blue/teal gradient for neutral actions ("Learn More", "View Demo").
3. **WhatsApp Connect (`.gradient-button-whatsapp`):** Emerald green styling (`#25D366`) for instant WhatsApp chat engagement.
4. **Destructive Action (`.gradient-button-danger`):** Red border/glow used exclusively for lead deletion in the admin dashboard.

---

## 6. 3D Interaction Physics & Graphics Subsystem

### 6.1 Three.js WebGL Scene (Customer Experience)
* **Visual Composition:** A dark, moody space featuring a physical glass orb, metallic torus ring, floating octahedron, and warm amber and cyan directional lighting.
* **Lighting Model:** Ambient light paired with a mouse-following point light for interactive depth.
* **Fallback Guarantee:** An automatic 2D Canvas gradient fallback renders seamlessly on devices where WebGL is unavailable or disabled.

### 6.2 Browser Frame Pointer Tilt
* **Physics:** Matrix perspective transformation (`perspective: 1000px`) that smoothly responds to pointer coordinates within a restrained bounding box (`±6deg`).
* **Spring Release:** Smooth CSS transition (`cubic-bezier(0.16, 1, 0.3, 1)`) resets rotation back to flat plane when the pointer exits.

---

## 7. Motion Design System & Micro-Interactions

| Interaction | Implementation | Timing / Easing |
| :--- | :--- | :--- |
| **Scroll Reveal** | `IntersectionObserver` via `data-motion` | `400ms` `ease-out`, staggered by `100ms` |
| **Top Scroll Progress Bar** | Fixed `2px` linear gradient bar at viewport top | Synchronized with native `window.scrollY` |
| **Sticky Header Blur** | Adds frosted background class when scrolled past `40px` | `300ms` smooth transition |
| **Live Showcase Switcher** | GSAP timeline swapping preview iframe / image | `350ms` opacity + slight scale reveal |

### Accessibility Compliance (`prefers-reduced-motion`)
When `prefers-reduced-motion: reduce` is detected in media queries:
* All 3D tilt physics are disabled.
* Staggered entrance animations resolve immediately.
* Parallax decor elements remain fixed.

---

## 8. Responsive Breakpoints

| Viewport Category | Breakpoint | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | Single-column stack, full-width inputs, touch-friendly tap targets (`>= 48px`), compact dashboard cards |
| **Tablet** | `640px – 1024px` | 2-column showcase grids, adaptive horizontal tracking timeline |
| **Desktop / Wide** | `> 1024px` | Full multi-column data table, interactive side-by-side preview stage, 3D ambient canvas |