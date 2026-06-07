# UXAgent Exploration Plan

## Goal

Exhaustively explore and evaluate the UX of the WeaveAPI developer documentation, focusing on navigation, interactive API explorers, and responsiveness.

## Plan Summary

The exploration will start by verifying global elements like the side navigation, search, dark mode, and code snippet tabs on the homepage. It will then proceed to the core API reference pages, specifically testing the interactive 'Try It' panel on the Charges page for state synchronization and mock response handling. Finally, the run will cover supporting pages (Customers, Webhooks, Errors) and perform a dedicated mobile viewport pass to check for layout overflows and tap target sizing.

## Coverage Targets

- pages: `Visit all 6 HTML pages identified in the prescan.`
- features: `Test dark mode, code tabs, and the interactive API console.`
- mobile: `Execute Phase 4 specifically in mobile mode to validate responsiveness of the 3-column layout and data tables.`

## Planned Phases

### Global Navigation & Core UI

- Objective: Validate global controls like dark mode, search, left navigation, and in-page anchor links.
- Target pages: index.html, quickstart.html
- Key checks:
  - Toggle dark mode (🌙 button) and observe color contrast changes.
  - Interact with the 'Search docs' input (trigger ctrl+K if possible).
  - Click through code language tabs (PYTHON, NODE, GO) to verify content switching.
  - Test 'ON THIS PAGE' right-side anchor links for smooth scrolling.
- Exit criteria:
  - Dark mode, search focus, code tabs, and anchor links have been interacted with and their visual states recorded.

### Interactive API Explorer (Charges)

- Objective: Thoroughly test the 'Try It' interactive mock panel on the Charges API page.
- Target pages: charges.html
- Key checks:
  - Scroll through the page to verify if the right panel syncs its state to the visible endpoint.
  - Fill out parameters in the 'Try It' panel and click Send.
  - Test successful mock response (using currency=usd).
  - Test error mock response (using an unsupported currency like 'cad').
- Exit criteria:
  - The 'Try It' panel has been exercised with both success and error inputs, and scrolling synchronization has been observed.

### Reference Pages & Tables

- Objective: Review the layout and readability of data-heavy reference pages.
- Target pages: customers.html, webhooks.html, errors.html
- Key checks:
  - Verify rendering of the Customer object and Webhook events tables.
  - Check for horizontal scrollability on wide tables.
  - Ensure error codes list is readable and well-structured.
- Exit criteria:
  - All secondary reference pages have been visited and captured.

### Mobile Responsiveness Evaluation

- Objective: Switch to a mobile viewport to assess layout adaptations and usability issues.
- Target pages: index.html, charges.html
- Key checks:
  - Check if the left navigation collapses into a hamburger menu or remains accessible.
  - Verify how the three-column layout (nav, content, anchors/try-it) degrades on small screens.
  - Evaluate the severity of horizontal overflows in tables and code blocks.
  - Assess usability of the flagged 'small tap targets' in the navigation.
- Exit criteria:
  - Screenshots and interaction attempts are completed on a mobile viewport for at least the index and charges pages.

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

