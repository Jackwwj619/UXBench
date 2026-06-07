# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the WeaveAPI developer documentation, focusing on navigation, interactive code examples, the try-it panel, and responsive layout behaviors.

## Plan Summary

The exploration will proceed through the primary developer onboarding flow, starting with the home and quickstart pages, then deep-diving into the interactive Charges API try-it panel and adjacent resource pages. It will validate error states, search functionality, and dark mode, before concluding with a focused mobile viewport review to address layout warnings and tap targets.

## Coverage Targets

- pages: `visit all 6 known HTML pages`
- features: `exercise all interactive controls: try-it panel, code toggles, copy buttons, dark mode, search, and nav links`
- mobile: `validate critical flows (nav, try-it panel, code blocks) on mobile viewport to assess layout warnings`

## Planned Phases

### Onboarding & Home Flow

- Objective: Validate the initial landing experience, global navigation, and quickstart guide.
- Target pages: index.html, quickstart.html
- Key checks:
  - Verify left nav and right anchor links work correctly on index.html
  - Test code block language toggles (CURL, PYTHON, NODE, GO) and copy buttons
  - Navigate to quickstart.html and validate the two-step example flow
  - Test the dark mode toggle for visual consistency
- Exit criteria:
  - All index.html sections scrolled and anchor links verified
  - Quickstart page fully read and code interactions tested
  - Dark mode toggled successfully

### Interactive API Try-It Panel

- Objective: Deeply validate the interactive try-it panel on the Charges API page, including success and error states.
- Target pages: charges.html
- Key checks:
  - Scroll through Charge object and endpoints to verify right-column try-it panel syncs correctly
  - Fill valid parameters (e.g., currency=usd) in try-it panel and send to verify mock success response
  - Fill invalid parameters (e.g., currency=xyz) to trigger currency_not_supported error and validate error UX
  - Check horizontal overflow warning on desktop viewport
  - Test code block toggles and copy buttons for multiple endpoints
- Exit criteria:
  - Try-it panel tested for at least 2 different endpoints
  - Both success and error mock responses observed
  - Horizontal overflow investigated

### Adjacent Resources & Webhooks

- Objective: Explore the remaining core resource pages and webhook documentation for consistency and completeness.
- Target pages: customers.html, webhooks.html
- Key checks:
  - Verify Customers API object table and endpoint code blocks render correctly
  - Check Webhooks event types table and signature verification code blocks
  - Investigate horizontal overflow warnings on both pages
  - Validate right-column anchor navigation syncs while scrolling
- Exit criteria:
  - Customers and Webhooks pages fully scrolled and inspected
  - Code copy and toggle interactions verified
  - Overflow issues documented

### Error Reference & Search

- Objective: Validate the error codes reference page and the global search functionality.
- Target pages: errors.html, index.html
- Key checks:
  - Review error codes table for readability and handling hints
  - Click into errors.html from index.html 'Full list →' link
  - Trigger search via input field and ctrl+K shortcut
  - Validate search results UI, keyboard navigation, and link accuracy
- Exit criteria:
  - Error codes page reviewed
  - Search opened via both input click and keyboard shortcut
  - Search results interacted with

### Mobile Viewport Validation

- Objective: Repeat critical checks on a mobile viewport to assess responsive design and tap target issues.
- Target pages: index.html, charges.html
- Key checks:
  - Verify left nav collapses or adapts properly on mobile
  - Check small tap targets (223x31px) on navigation links for usability
  - Test try-it panel layout and interaction on mobile for charges.html
  - Validate code block readability and horizontal scrolling on mobile
- Exit criteria:
  - Mobile navigation tested
  - Try-it panel used successfully on mobile
  - Tap target severity assessed

## Prescan Summary

### WeaveAPI — Threads of value, woven simple

- Page: `index.html`
- Headings: Accept your first payment in 5 minutes., Quickstart, Authentication, Idempotency, Pagination, Errors, Popular guides, Charges API →, Customers API →, Webhooks →
- Interactables: `11` buttons, `24` links, `1` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

### Charges — WeaveAPI

- Page: `charges.html`
- Headings: Charges, The Charge object, Create a charge, Retrieve a charge, Capture a charge, Refund a charge, List charges
- Interactables: `27` buttons, `13` links, `4` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

### Customers — WeaveAPI

- Page: `customers.html`
- Headings: Customers, The Customer object, Create a customer, Retrieve a customer, Update a customer, Delete a customer, List customers
- Interactables: `22` buttons, `13` links, `3` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

### Errors — WeaveAPI

- Page: `errors.html`
- Headings: Error codes
- Interactables: `1` buttons, `13` links, `1` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

### Quickstart — WeaveAPI

- Page: `quickstart.html`
- Headings: Quickstart, 1. Install the SDK, 2. Make your first charge
- Interactables: `11` buttons, `15` links, `1` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

### Webhooks — WeaveAPI

- Page: `webhooks.html`
- Headings: Webhooks, Event types, Verifying signatures, Retries
- Interactables: `6` buttons, `16` links, `1` inputs
- Notable controls:
  - clickable:a:Quickstart
  - clickable:a:Authentication
  - clickable:a:Idempotency
  - clickable:a:Pagination
  - clickable:a:Charges
  - clickable:a:Customers
  - clickable:a:Cards
  - clickable:a:Bank

