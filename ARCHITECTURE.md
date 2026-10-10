Architecture

1. Current stack

Node.js

Express 4.19.2

dotenv 16.4.5

Vanilla HTML/CSS/JavaScript

JSON file persistence

Three.js for the customer 3D environment

Browser-side interaction engines for motion and 3D tilt

The package configuration defines server.js as the application entry point and uses node server.js for both development and start scripts.

2. Runtime structure

Browser
  |
  +-- Public customer website
  |      |
  |      +-- POST /api/submit
  |      |
  |      +-- Request tracking UI
  |      |
  |      +-- Portfolio
  |
  +-- Owner dashboard
         |
         +-- POST /api/login
         +-- GET  /api/submissions
         +-- PATCH /api/submissions/:requestId
         +-- DELETE /api/submissions/:requestId
         +-- POST /api/logout
                 |
                 v
              Express
                 |
                 v
          data/submissions.json

3. Server

The Express server:

Serves the public directory.

Creates the data directory if missing.

Creates data/submissions.json if missing.

Reads and writes submissions as JSON.

Serves customer, portfolio, and dashboard pages.

Exposes the request-management API.

The current server defines:

/

/portfolio

/portfolio.html

/dashboard

/dashboard.html

4. Persistence

Current persistence is:

data/submissions.json

The server uses synchronous filesystem reads/writes for the submission store.

Submission creation:

Reads the JSON array.

Finds the highest numeric request ID.

Starts from 999 so the first generated ID is 1000.

Adds the new submission.

Writes the complete array back.

This is suitable for the current prototype/small deployment scope but is not a high-concurrency data architecture.

5. API

POST /api/submit

Creates a website request.

Current server-side required checks include owner name and business name. The intended product rules additionally require client-side validation for the complete required form.

Initial status:

New

POST /api/login

Authenticates the owner and returns a random token.

The current implementation keeps active tokens in an in-memory Set.

GET /api/submissions

Requires authentication and returns stored submissions.

PATCH /api/submissions/

Requires authentication.

Allowed statuses:

New

Contacted

In Progress

Delivered

The server updates updatedAt.

DELETE /api/submissions/

Requires authentication and removes the request from the JSON array.

POST /api/logout

Requires authentication and removes the bearer token from the active-token set.

6. Authentication architecture

Current authentication is token-based:

Browser submits username/password.

Server validates credentials.

Server generates a random token.

Browser stores the token in local storage.

Dashboard API requests send Authorization: Bearer <token>.

Server checks the token against the in-memory active token set.

Logout removes the token.

Important security limitation

The current source contains a hard-coded owner credential and an in-memory session store. The credential itself should not be copied into documentation or committed to source control.

Before production deployment:

move credentials to environment variables;

never commit .env;

use a production-grade password hash/authentication system;

use secure, appropriately scoped sessions/tokens;

add rate limiting to login;

validate and sanitize all input server-side.

7. Frontend dashboard architecture

The owner dashboard JavaScript:

Maintains allSubmissions.

Normalizes server data.

Renders statistics.

Searches and filters requests.

Opens request detail modals.

Updates status through authenticated API calls.

Deletes through authenticated API calls.

Handles login/logout.

Escapes displayed values before inserting them into HTML.

The dashboard uses the following status model:

New
  -> Contacted
  -> In Progress
  -> Delivered

The current UI can also normalize Submitted to New.

8. Visual interaction architecture

Customer 3D engine

The customer page has a Three.js scene with:

fog

perspective camera

ambient light

cyan/electric-blue key lighting

warm amber fill lighting

mouse-following point light

glass orb

metallic ring

floating octahedron/diamond

It also contains a Canvas 2D fallback when Three.js is unavailable.

3D interaction engine

The dashboard/login interaction engine provides:

floating browser tilt

dashboard browser-stage tilt

desktop/mobile viewport switch

stat-card micro-tilt

Motion engine

The motion engine provides:

IntersectionObserver reveals

stagger delays

magnetic buttons

ripple buttons

Website preview engine

The website preview uses pointer-based browser-frame rotation and disables the effect when reduced motion is requested.

9. Data ownership

The server is the source of truth for request state.

The browser may update its local display immediately after a successful API response, but persistent state must come from the server.

10. Deployment constraint

The current application contains a Node/Express backend, so a static-only host is not sufficient for the complete application.

The deployment plan should use a platform capable of running Node/Express, or split the frontend and backend deliberately. Do not document GitHub Pages as the sole host for the complete system.

11. Future-safe boundaries

Do not introduce a database, staff/admin role system, payments, customer accounts, or chat system into the current architecture unless explicitly requested later.