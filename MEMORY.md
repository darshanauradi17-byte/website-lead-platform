Project Memory

Identity

Project purpose:
A website service platform that collects requests from local businesses that need websites and lets the owner/operator manage those requests.

Final website name:
Not decided yet.

Do not use the old Carevion name for this project.

Logo:
Create only after the final website name is decided.

Business model

Customer:
A local business owner who needs a website.

Initial business examples:

Local shops

Bakeries / cake shops

Restaurants

Medical stores

Salons

Other local businesses

Customer flow:

Visit website
→ Learn about service
→ Submit request
→ Receive Request ID
→ Track progress

Owner flow:

Login
→ Review requests
→ Contact customer
→ Start development
→ Deliver website

Request ID

Request IDs begin at:

1000

The current backend generates the next numeric ID from the highest stored request ID.

Status model

Exactly four stages:

New
Contacted
In Progress
Delivered

Definitions:

New — request has been submitted

Contacted — owner has contacted the customer

In Progress — website development has started

Delivered — website has been completed and delivered

Customer form

Single-page form.

Required information:

Customer/owner name

Business name

City

Business type

Indian 10-digit phone

Requirements

Custom budget

Optional:

Email

Business logo

Business photos

Instagram/Facebook

Preferred website style

The customer gets the Request ID after successful submission.

Tracking

Tracking uses Request ID only.

Customer tracking should show:

Request ID

Business name

City

Four-stage progress timeline

No customer account is required.

Owner dashboard

Authentication:
Username + password.

Dashboard requirements:

Responsive desktop/mobile

Request statistics

Search

Status filter

Request details

Edit request

Status changes

Delete with confirmation/warning

Refresh/sync

Logout

Current frontend stores the authentication token in local storage and sends it as a bearer token.

Current backend

Technology:

Node.js

Express

dotenv

JSON file storage

Data file:

data/submissions.json

Entry point:

server.js

Important API routes:

POST   /api/submit
POST   /api/login
GET    /api/submissions
PATCH  /api/submissions/:requestId
DELETE /api/submissions/:requestId
POST   /api/logout

Pages:

/
 /portfolio
 /portfolio.html
 /dashboard
 /dashboard.html

Current visual system

Customer:

Professional public-facing layout

Dark navy/blue professional visual layer

3D background

Website preview

Tracking timeline

Portfolio

Contact section

Owner:

Premium workspace feel

Browser-style 3D preview

Dashboard statistics

Search/filter workspace

Request details modal

Responsive layout

3D memory

Customer 3D uses Three.js with:

glass orb

metallic ring

floating octahedron/diamond

cyan key light

amber fill light

mouse-following point light

perspective camera

fog

ACES tone mapping

There is a 2D canvas fallback when Three.js is unavailable.

Dashboard 3D:

login browser tilt

dashboard browser-stage tilt

viewport switcher

stat-card micro-tilt

Motion memory

Current motion engine:

IntersectionObserver reveal

stagger delay

magnetic buttons

ripple buttons

Website preview:

pointer-driven subtle tilt

reduced-motion detection

Motion design layer:

scroll progress bar

navbar scroll elevation

scrollspy active nav state with aria-current

animated nav underline

opt-in hero entrance (html.md-hero-intro)

focus-visible rings

back-to-top button

sticky-nav anchor offset (scroll-padding-top)

lives in css/motion-design.css and js/motion-design.js

loaded on / and /portfolio

Premium visual layer:

palette tokens --pk-* with WCAG contrast notes

Haikei-style SVG decor (waves, blob, scatter)

word-stagger hero reveal (.md-w)

film-grain overlay (.pk-grain)

decor parallax capped at 24px, off on mobile and reduced-motion

lives in css/premium-layer.css and js/premium-layer.js

loaded on /

Design priorities

Priority order:

Working functionality

Professional UX/UI

Performance

Subtle motion and 3D

The project should not become visually overloaded.

Explicit exclusions

Do not add:

unnecessary AI

excessive animation

excessive 3D

unnecessary dashboards

chat system

payment system

customer accounts

Future decisions

Not currently finalized:

final website name

logo

public pricing

Later considerations:

payments

analytics

Do not implement these merely because they appear in future planning.

Security memory

The current backend source contains a hard-coded owner credential and uses an in-memory active-token set. Treat this as development/prototype behavior.

Before production:

move credentials to environment variables;

do not expose credentials in documentation;

improve session/token handling;

add rate limiting;

validate all inputs server-side;

protect stored request data;

use HTTPS.

Important implementation caution

The current system uses JSON-file persistence. Production deployment must be checked for persistent writable storage. A hosting platform that provides only ephemeral filesystem storage must not be treated as a reliable production database for customer requests.

Documentation rule

These six files are the source-of-truth planning documents:

PRD.md
ARCHITECTURE.md
RULES.md
DESIGN.md
TASKS.md
MEMORY.md

When the product changes, update the relevant document instead of silently letting the documentation become inconsistent with the code.