Product Requirements Document (PRD)

1. Product overview

This product is a local-business website lead platform. Its purpose is to let business owners request a website through a public website, while the owner/operator receives those requests in a private dashboard and manages each request through a simple four-stage workflow.

The platform is intentionally practical rather than feature-heavy.

2. Primary business flow

A local business owner visits the public website.

They read about the website service and view portfolio examples.

They submit a website request.

The server validates the request and stores it.

The system generates a sequential Request ID beginning at 1000.

The customer receives the Request ID after submission.

The owner logs into the owner dashboard.

The owner reviews requests, searches/filters them, opens details, contacts customers, updates status, edits information, or deletes a request.

The customer can later use the Request ID to check progress.

Status changes are reflected in the tracking experience.

3. Target customers

Initial target businesses include:

Local shops

Bakeries / cake shops

Restaurants

Medical stores

Salons

Other local businesses

The business-type field should provide useful common choices plus Other.

4. Customer request data

Required:

Customer/owner name

Business name

City

Business type

Indian 10-digit phone number

Website requirements

Budget

Optional:

Email

Business logo

Business photos

Instagram/Facebook

Preferred website style

The requirements are collected in a large text area rather than a complicated multi-step form.

The customer can enter a custom budget amount rather than selecting a fixed range.

5. Submission result

After a successful submission:

The request is persisted.

Status starts as New.

A sequential Request ID is generated, beginning at 1000.

The customer is shown the Request ID only.

6. Customer tracking

Customer tracking uses Request ID only.

The tracking experience shows:

Request ID

Business name

City

Four-stage progress timeline

Current status

Statuses:

New — request has been submitted

Contacted — owner has contacted the customer

In Progress — website development has started

Delivered — website has been completed and delivered

The customer should see the latest state whenever the request is checked again.

7. Owner dashboard

Authentication:

Username + password

Dashboard capabilities:

Login/logout

View requests

Search requests

Filter by status

View statistics

Open request details

Mark a request as Contacted

Change status

Edit request information

Delete request with confirmation/warning

Refresh/sync requests

Responsive desktop/mobile layout

Current implementation exposes a Node/Express API and a browser dashboard.

8. Portfolio

The portfolio initially contains:

Medical Clinic

Restaurant

Local Business

Portfolio examples should support interactive website previews with subtle 3D browser presentation.

9. Design goals

The product should feel:

Professional

Modern

Trustworthy

Realistic

Business-oriented

Original rather than template-like

Motion and 3D are supporting elements, not the product itself.

10. Explicit non-goals

Do not add:

Unnecessary AI

Excessive animation

Excessive 3D

Unnecessary dashboards

Chat system

Payment system

Customer accounts

Pricing is currently not finalized.
Payments are a later consideration.
Analytics are a later consideration.
SEO is not a current requirement.

11. Performance and accessibility

The visual system should use balanced visuals and performance.

3D should have a lightweight fallback where appropriate, and motion should respect reduced-motion preferences.

The public interface should remain usable without depending on visual effects.

12. Success criteria

The current product is successful when:

The public site loads from the Node server.

A customer can submit a valid request.

A unique sequential Request ID is returned.

The request appears in the owner dashboard.

The owner can authenticate.

The owner can manage request status.

The customer can track the request by ID.

The dashboard works on desktop and mobile.

The visual layer remains professional without excessive effects.