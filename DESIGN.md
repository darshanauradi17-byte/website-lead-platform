Design System

1. Design direction

The visual direction is:

Professional business workspace + calm modern customer experience + restrained 3D depth.

The design should look like a real production service rather than an experimental AI-generated interface.

2. Color direction

The existing implementation contains multiple visual layers. The consolidated professional customer-dashboard layer currently uses a dark navy foundation with blue accents:

Background: #07111f

Secondary background: #0a1728

Panel: translucent dark navy

Accent blue: #60a5fa

Primary text: #f8fafc

Soft text: #a9b8ca

The customer visual layer also contains:

cyan/electric blue

amber

slate/titanium

dark navy

translucent glass

These colors should remain restrained.

3. Surfaces

Use:

dark navy backgrounds for professional workspace screens;

translucent glass panels where depth helps;

subtle borders;

restrained shadows;

high text contrast.

The current CSS uses glass-like panels with blur, borders, and layered shadows.

4. Customer website

The public customer website should emphasize:

clear explanation of the service;

strong request CTA;

portfolio examples;

request tracking;

contact information;

simple website preview;

professional typography and spacing.

Navigation includes the requested core areas:

Home

Services

Our Work

How It Works

Track Request

Contact

Primary CTA:

Request Your Website

5. Request form

Use a single-page form.

Visual structure:

clear section heading;

grouped customer/business information;

large requirements field;

custom budget field;

optional-details section;

clear primary submit button;

inline validation;

success state with Request ID.

Do not visually overload the form with animation.

6. Tracking UI

The tracking area should visually communicate progress.

Timeline:

New → Contacted → In Progress → Delivered

Completed/current timeline circles use a strong blue treatment in the current visual implementation.

The tracking card should prioritize:

Request ID

Business name

City

Current status

Timeline

7. Owner login

The owner login should feel like a premium business workspace.

The current login design includes a browser-style 3D preview with:

browser chrome

floating depth

subtle perspective

workspace copy

Avoid putting a large decorative banner in front of the actual login task.

8. Owner dashboard

Dashboard hierarchy:

Header
  ↓
Dashboard introduction
  ↓
Useful statistics
  ↓
Search/filter controls
  ↓
Requests workspace
  ↓
Request details / actions
  ↓
Workflow guidance

The current dashboard describes itself as:

Website Requests & Pipeline

and is intended to track incoming local-business requests.

9. Dashboard data presentation

Desktop:

structured request table

Mobile:

responsive request cards or equivalent compact layout

Useful request information includes:

Request ID

Owner/customer

Business

Business type

Contact

City

Budget

Requirements

Status

Dates

Actions

10. Status styling

The existing UI uses status-specific visual classes:

status-new
status-contacted
status-in-progress
status-delivered

Pulse-dot colors are already defined for status indication.

The visual distinction should be understandable without relying only on color.

11. 3D system

Customer 3D environment

The current Three.js environment uses:

PerspectiveCamera

WebGLRenderer

ACES filmic tone mapping

fog

ambient light

directional key light

warm fill light

mouse-following point light

physical glass orb

metallic torus ring

octahedron/diamond

The objects float and rotate slowly.

Browser preview 3D

The owner/dashboard preview uses subtle perspective rotation driven by pointer position.

Default rotation is intentionally small and returns smoothly when the pointer leaves.

Card micro-tilt

Cards use small perspective rotations, approximately a few degrees, rather than dramatic 3D movement.

12. Motion system

Scroll reveals

Elements marked with:

data-motion

are revealed using IntersectionObserver.

Optional:

data-motion-delay="0.1"

supports staggered timing.

Magnetic buttons

Buttons using:

.btn-promax
[data-magnetic]

receive subtle pointer attraction.

Ripple

Buttons using .btn-promax or .btn can receive a click ripple.

Motion design layer

An additive layer lives in two files:

css/motion-design.css

js/motion-design.js

It provides:

top scroll progress bar

navbar elevation after scrolling

scrollspy active navigation state (md-active and aria-current)

animated navigation underline

opt-in hero entrance (html.md-hero-intro, JavaScript-gated)

focus-visible rings for links and buttons

back-to-top button

sticky-nav anchor offset via scroll-padding-top

selection, scrollbar and button-press polish

The layer is loaded on the customer homepage and the portfolio page. It does not modify theme colors, layout, or existing behavior, and every animation respects prefers-reduced-motion.

Premium visual layer

A second additive layer lives in two files:

css/premium-layer.css

js/premium-layer.js

It adapts techniques from common design tools without depending on them:

Realtime Colors style role tokens (--pk-*) with documented WCAG contrast ratios

Haikei style hand-generated SVG decor: layered waves (CTA band), organic blob (contact section), circle scatter (request section)

Motion Primitives style word-stagger hero heading reveal (.md-w elements with --w delay index)

Godly style static film-grain overlay (.pk-grain, same technique as the portfolio noise layer)

Decor receives subtle scroll parallax capped at 24px and is hidden on small screens where it would only add noise. The layer respects prefers-reduced-motion and does not alter theme colors, layout, or existing behavior.

13. Accessibility

Respect reduced motion.

The website preview explicitly checks:

prefers-reduced-motion: reduce

and skips the pointer tilt animation when requested.

Important content must remain accessible when motion is disabled.

14. Responsive behavior

The application must work on:

desktop

tablet

mobile

The dashboard already includes a desktop/mobile preview switcher.

On mobile, reduce visual complexity rather than forcing desktop-scale 3D.

15. Design exclusions

Do not add:

giant animated backgrounds

excessive floating objects

continuous camera movement

unnecessary 3D cards everywhere

excessive gradients

noisy glassmorphism

chat UI

payment UI

customer-account UI

16. Branding

The final website name is intentionally undecided.

Use a replaceable brand placeholder until the name is finalized.


17. Button system

All buttons use the Gradient Button component from
https://21st.dev/@serafimcloud/components/gradient-button (Serafim / 21st.dev, MIT):
animated radial-gradient background, glowing 1px border, CSS-only hover animation
via registered @property custom properties.

React app:

Reference component: src/components/ui/gradient-button.tsx

Shared Button: src/components/ui/Button.tsx (all variants render as gradient buttons)

Styles: src/app/globals.css (loaded unlayered so they win over utility overrides)

Static pages (customer site, portfolio, owner dashboard):

Styles: public/css/gradient-button.css, linked after every other stylesheet

Elements receive the gradient-button class in their HTML/JS templates

Palettes:

default — primary actions (dark rose sweep on hover)

gradient-button-variant — secondary actions (blue/teal/lime)

gradient-button-whatsapp — emerald, WhatsApp actions

gradient-button-danger — red, destructive actions

Decorative buttons inside website-preview mockups are content, not UI, and keep
their mock styling.
Do not create a final logo before the name is finalized.