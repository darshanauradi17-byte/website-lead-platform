Project Rules

1. Product rules

The product is a website-request and lead-management platform for local businesses.

Keep the workflow simple.

Do not add features merely because they are technically possible.

Functionality comes before visual effects.

Professional UX comes before 3D.

Performance comes before decorative complexity.

2. Customer form rules

Keep the request form on a single page.

Do not turn it into a multi-step wizard.

Validate required fields before submission.

Phone numbers are Indian 10-digit numbers.

Budget is a customer-entered custom amount.

Requirements use one large text area.

Logo and business photos are optional.

Social links are optional.

Preferred website style is optional.

Generate sequential Request IDs beginning at 1000.

New submissions start with New.

After submission, show the Request ID.

3. Status rules

Only these four statuses are valid:

New
Contacted
In Progress
Delivered

Meaning:

New = request submitted

Contacted = customer contacted

In Progress = development started

Delivered = website completed and delivered

Do not create additional workflow stages without explicit approval.

4. Customer tracking rules

Request ID is the only lookup value.

Do not require customer accounts.

Show business name and city.

Show the four-stage timeline.

Always reflect the latest server state.

Do not expose private owner-dashboard information.

5. Owner dashboard rules

Authentication is required.

All request-management API routes require authentication.

Search and filters should not alter stored data.

Status updates must use the API.

Deletion requires confirmation and a warning.

Editing should support all customer fields.

The dashboard must work on desktop and mobile.

Use table presentation on desktop and an appropriate card presentation on smaller screens.

Keep statistics limited to useful request/status information.

6. Security rules

Never commit plaintext production credentials.

Do not document or expose the current password.

Move owner credentials to environment configuration before production.

Never trust client-side validation alone.

Validate all important fields on the server.

Escape user-provided values before rendering HTML.

Keep authenticated routes protected.

Do not expose data/submissions.json publicly.

Do not log passwords or authentication tokens.

Add login rate limiting before public production use.

Use HTTPS in production.

Do not store unnecessary sensitive customer information.

7. Motion rules

Allowed:

subtle scroll reveal

subtle stagger

restrained magnetic button movement

restrained ripple feedback

subtle card/browser tilt

Not allowed:

constant distracting animation

large page-shaking effects

excessive parallax

animations that block navigation

animation that hides important information

Respect:

prefers-reduced-motion: reduce

8. 3D rules

3D must support the website's professional presentation.

Use realistic, restrained depth.

Do not cover important content with 3D.

Do not use 3D everywhere.

Keep 3D lightweight.

Provide a fallback when possible.

Keep pointer interactions subtle.

On smaller devices, reduce complexity when necessary.

Do not introduce additional Three.js scenes unless there is a clear product reason.

9. Content rules

Do not use the old Carevion name for this project.

Website name can remain a placeholder until branding is finalized.

Do not create a final logo until the name is decided.

Avoid fake claims about guaranteed sales increases.

Keep business language realistic and professional.

10. Scope exclusions

Do not add:

unnecessary AI

chat

customer accounts

payments

unnecessary dashboards

excessive animation

excessive 3D

These are outside the current scope.

11. Code rules

Preserve working routes unless there is a concrete reason to change them.

Avoid duplicate CSS systems that override one another unnecessarily.

Keep JavaScript modules focused.

Use clear IDs/classes for JS dependencies.

Avoid global variables unless necessary.

Do not silently change API response shapes.

Keep Request ID generation deterministic.

Keep status names consistent across backend, dashboard, and tracking UI.