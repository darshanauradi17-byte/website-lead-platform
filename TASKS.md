Tasks

Priority 0 — Keep the current product working

Express server exists.

Public customer page route exists.

Portfolio route exists.

Owner dashboard route exists.

Customer request API exists.

JSON persistence exists.

Request IDs begin from 1000.

New request status exists.

Owner authentication exists.

Protected submission API exists.

Status update API exists.

Delete API exists.

Logout API exists.

Dashboard search/filter behavior exists.

Request detail modal exists.

Customer 3D engine exists.

Owner/dashboard 3D engine exists.

Motion interaction engine exists.

Priority 1 — Correctness and security

Move owner credentials out of source code.

Add environment-based authentication configuration.

Add server-side validation for every required customer field.

Validate Indian 10-digit phone numbers server-side.

Validate budget as a sensible numeric amount.

Validate upload type and file size.

Ensure uploaded assets cannot expose executable content.

Ensure data/submissions.json cannot be served publicly.

Add login rate limiting.

Use HTTPS in production.

Review token/session lifetime and storage.

Do not log passwords or tokens.

Priority 2 — Request form

Keep form single-page.

Add required-field validation.

Add custom budget input.

Add optional logo upload.

Add optional business-photo upload.

Add optional social links.

Add optional preferred website style.

Show Request ID after successful submission.

Preserve clear error messages.

Priority 3 — Customer tracking

Confirm Request ID lookup works reliably.

Display business name.

Display city.

Display four-stage timeline.

Ensure status changes are reflected from server data.

Keep tracking accessible without customer accounts.

Priority 4 — Owner dashboard

Keep username/password login.

Keep responsive desktop/mobile layout.

Keep statistics focused on the four statuses.

Keep search.

Keep status filter.

Keep request details modal.

Keep edit support for all customer fields.

Keep immediate status updates after successful API responses.

Keep delete confirmation/warning.

Keep refresh/sync.

Ensure mobile request presentation is easy to scan.

Priority 5 — Visual system

Consolidate duplicate CSS overrides where possible.

Keep navy/blue professional workspace styling.

Keep glass/depth treatment restrained.

Keep browser-style 3D preview.

Keep customer Three.js environment.

Keep lightweight 3D fallback.

Keep card micro-tilt subtle.

Keep scroll reveals subtle.

Keep magnetic buttons subtle.

Keep ripple feedback subtle.

Test reduced-motion behavior.

Test mobile performance.

Priority 6 — Portfolio

Medical Clinic example.

Restaurant example.

Local Business example.

Interactive preview.

Subtle 3D browser presentation.

Keep portfolio examples realistic.

Priority 7 — Deployment

Choose a Node-capable production host.

Configure production environment variables.

Configure custom domain.

Enable HTTPS.

Test API routes in production.

Test JSON persistence behavior in the selected host environment.

Verify whether the chosen host provides persistent writable storage; if not, do not rely on local JSON persistence for production.

Later / explicitly not current

Pricing decision.

Payments, only if later approved.

Analytics, only if later approved.

Final website name.

Final logo after name decision.

Explicitly out of scope

Do not create tasks for:

unnecessary AI

chat system

customer accounts

excessive 3D

excessive animation

unnecessary dashboards