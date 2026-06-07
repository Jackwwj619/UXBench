# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the WeaveAPI docs system, focusing on the primary docs flow (Quickstart → API references) and adjacent pages/states, including mobile viewport checks.

## Plan Summary

Start with the home page (index.html) to explore core sections, then move to Quickstart (quickstart.html) for the tutorial flow. Next, dive into API reference pages (charges.html, customers.html, webhooks.html, errors.html) to validate content structure, interactables, and mobile responsiveness. Prioritize the 'try-it' panels on charges.html and check error handling guidance.

## Coverage Targets

- pages: `Visit all 6 known HTML pages (index, quickstart, charges, customers, errors, webhooks)`
- features: `Exercise left nav, search, theme toggle, code copy, 'try-it' panel (charges.html), and all major API endpoint sections`
- mobile: `Repeat critical checks (navigation, interactables, code readability) on mobile viewport for at least 3 key pages (index, quickstart, charges)`

## Planned Phases

### Home Page & Core Navigation

- Objective: Validate home page structure, navigation links, and initial interactables (search, theme toggle).
- Target pages: index.html
- Key checks:
  - Click left nav links (Quickstart, Charges, Customers) to verify navigation
  - Interact with search input and theme toggle
  - Check mobile viewport for navigation responsiveness
- Exit criteria:
  - All major nav links are clickable and load correct pages
  - Search and theme toggle are functional
  - Mobile navigation is usable (tap targets, layout)

### Quickstart Tutorial Flow

- Objective: Explore the Quickstart guide to validate tutorial clarity, code examples, and adjacent links.
- Target pages: quickstart.html
- Key checks:
  - Follow Quickstart steps (install SDK, first charge example)
  - Verify code block interactivity (copy button, language tabs)
  - Check links to Charges API reference
  - Validate mobile viewport for code readability
- Exit criteria:
  - Quickstart steps are clear and code examples are copyable
  - Links to API references are functional
  - Mobile code blocks are readable (no overflow)

### Charges API Reference

- Objective: Deep-dive Charges API page: validate object schema, endpoint sections, and 'try-it' panel interaction.
- Target pages: charges.html
- Key checks:
  - Verify Charge object table (fields, descriptions)
  - Interact with 'try-it' panel (fill params, send request, check mock response)
  - Validate endpoint sections (Create, Retrieve, Capture, Refund, List)
  - Check mobile viewport for table readability and panel interaction
- Exit criteria:
  - Charge object schema is complete and accurate
  - 'try-it' panel returns correct mock responses (valid/invalid currency)
  - Endpoint sections have clear parameters and code examples
  - Mobile panel interaction is usable

### API Reference Pages (Customers, Webhooks, Errors)

- Objective: Validate API reference pages (Customers, Webhooks, Errors) for content structure, interactables, and error guidance.
- Target pages: customers.html, errors.html, webhooks.html
- Key checks:
  - Check Customer object schema and endpoint sections (Create, Retrieve, Update, Delete)
  - Verify error code examples and HTTP status mapping
  - Explore Webhooks event types and signature verification guidance
  - Validate mobile viewport for table readability (e.g., Charge/Customer object tables)
- Exit criteria:
  - Customer API reference is complete (object schema, endpoints)
  - Error codes are consistent with API behavior (e.g., card_declined, insufficient_funds)
  - Webhooks documentation includes event types and verification steps
  - Mobile tables are scrollable/readable

### Mobile Usability & Edge Cases

- Objective: Re-validate critical pages in mobile viewport, focusing on small tap targets, code blocks, and error recovery paths.
- Target pages: index.html, charges.html, quickstart.html
- Key checks:
  - Re-test left nav tap targets (mobile guidance compliance)
  - Verify code block readability and copy functionality on mobile
  - Check error handling guidance (errors.html) for mobile accessibility
  - Re-interact with charges.html try-it panel on mobile
- Exit criteria:
  - Mobile tap targets are usable (≥44px or have sufficient spacing)
  - Code blocks are readable and copyable on mobile
  - Error guidance is accessible on mobile
  - Try-it panel is functional on mobile

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

