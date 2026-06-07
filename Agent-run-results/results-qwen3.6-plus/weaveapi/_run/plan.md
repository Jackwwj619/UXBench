# UXAgent Exploration Plan

## Goal

Evaluate the UX of the WeaveAPI developer documentation, focusing on the clarity of the primary 'Charges' flow, the usability of the interactive 'Try-it' panel, and mobile responsiveness.

## Plan Summary

The run will proceed from the Index home page through the Quickstart guide to the core Charges API reference. It will heavily exercise the interactive 'Try-it' panel on the Charges page to validate mock response logic (success vs. error states). Finally, it will cover adjacent resources (Customers, Webhooks, Errors) and repeat critical navigation checks on a mobile viewport to address known tap-target risks.

## Coverage Targets

- pages: `100% of listed HTML files (index, quickstart, charges, customers, webhooks, errors)`
- features: `All code block tabs, Copy buttons, Try-it panel inputs (valid/invalid), Sidebar navigation, Dark mode toggle`
- mobile: `Full navigation flow + Charges interaction on mobile viewport`

## Planned Phases

### Onboarding & Home Page Structure

- Objective: Validate the entry point, global navigation consistency, and initial information architecture.
- Target pages: index.html
- Key checks:
  - Verify left sidebar navigation groups (Getting Started, Core Resources, etc.) are visible and clickable.
  - Test 'Search docs' input field focus state.
  - Click 'Quickstart' card/link to verify transition to quickstart.html.
  - Check dark mode toggle (moon icon) functionality if present/visible.
- Exit criteria:
  - Successfully navigated from index.html to quickstart.html.
  - Confirmed sidebar persistence across the transition.

### Quickstart Flow Validation

- Objective: Ensure the '5-minute' setup guide is clear and code examples are accessible.
- Target pages: quickstart.html
- Key checks:
  - Verify step-by-step layout (Install SDK -> First Charge).
  - Interact with code block language tabs (CURL, PYTHON, NODE, GO) to ensure content updates.
  - Click 'Copy' button on a code block to check for visual feedback (tooltip/text change).
  - Follow 'Read on: full Charges reference' link to charges.html.
- Exit criteria:
  - Code tabs switched successfully.
  - Navigated to charges.html via the contextual link.

### Core Resource: Charges API & Interactive Panel

- Objective: Deep dive into the most complex page, validating the 'Try-it' playground and endpoint documentation.
- Target pages: charges.html
- Key checks:
  - Scroll to verify right-column 'Try-it' panel syncs with the active endpoint section (Create, Retrieve, etc.).
  - Interaction A: Submit valid params (currency=usd) in 'Create a charge' panel; expect success JSON.
  - Interaction B: Submit invalid param (currency=xyz); expect 'currency_not_supported' error JSON.
  - Verify parameter tables are readable and aligned with the code examples.
  - Check anchor links in the right-hand 'On this page' TOC scroll to correct sections.
- Exit criteria:
  - Mock API responses received for both success and error cases.
  - TOC anchors function correctly.

### Adjacent Resources & Error Handling

- Objective: Explore secondary pages to ensure consistent layout and discoverability of error states.
- Target pages: customers.html, webhooks.html, errors.html
- Key checks:
  - Navigate to Customers: Verify object attribute table readability.
  - Navigate to Webhooks: Check event type list and signature verification instructions.
  - Navigate to Errors: Validate the table of error codes (e.g., card_declined, insufficient_funds) is scannable.
  - Test breadcrumb or sidebar back-navigation from these deep pages to Index.
- Exit criteria:
  - All secondary HTML files visited.
  - No broken links encountered in sidebar or body content.

### Mobile Responsiveness & Accessibility

- Objective: Re-evaluate critical flows on mobile viewport to address known small tap-target risks.
- Target pages: index.html, charges.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/12).
  - Verify sidebar collapses into a hamburger menu or drawer.
  - Attempt to tap sidebar links (known 31px height risk) to assess miss-rate/difficulty.
  - Check for horizontal scrolling issues on code blocks and parameter tables.
  - Verify 'Try-it' panel on charges.html is usable or gracefully degrades on mobile.
- Exit criteria:
  - Mobile navigation is functional despite small tap targets.
  - Content reflows without breaking layout (no unscrollable overflow).

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

