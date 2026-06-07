# UXAgent Exploration Plan

## Goal

Exhaustively explore the core docs/tutorial flow for WeaveAPI, with emphasis on the Quickstart-to-Charges onboarding path, adjacent reference pages, and validation of interactive code samples, right-rail try-it behavior, and mobile usability issues.

## Plan Summary

Start on the docs home and Quickstart flow to confirm the primary onboarding story, then branch into the full Charges and Customers references, where most interactive controls and validation risk live. Use Errors and Webhooks to cover recovery, signatures, and event semantics, and verify that code tabs, copy controls, anchor navigation, and the Charges try-it panel behave consistently. Repeat the critical navigation and interaction checks in mobile viewport, prioritizing tap target and horizontal overflow issues already indicated by prescan.

## Coverage Targets

- pages: `visit all known HTML pages: index.html, quickstart.html, charges.html, customers.html, errors.html, webhooks.html`
- features: `exercise the visible navigation, section anchors, code language tabs, Copy actions, and the Charges try-it panel; inspect the main reference tables on Charges, Customers, and Errors`
- mobile: `repeat the primary onboarding path and the Charges/Customers/Webhooks risk checks in mobile viewport, with explicit attention to small tap targets and horizontal overflow`

## Planned Phases

### Orient on docs home and primary onboarding

- Objective: Validate the landing page hierarchy, the onboarding narrative, and the main navigation paths into the docs.
- Target pages: index.html, quickstart.html
- Key checks:
  - Confirm the home page presents the expected core sections: Quickstart, Authentication, Idempotency, Pagination, Errors, and Popular guides.
  - Open Quickstart from the left nav and verify the two-step getting-started flow is coherent and easy to follow.
  - Test the code sample controls on home/quickstart, including language tabs and Copy behavior if available.
  - Confirm that primary guide links from the home page lead to the intended adjacent pages.
- Exit criteria:
  - Home page and Quickstart have been visited in desktop view, with the main sections and guide links confirmed.
  - At least one code sample interaction and one navigation transition from the landing page have been validated.

### Validate core API reference on Charges

- Objective: Exercise the most feature-rich page, including object reference, endpoint sections, and the try-it panel.
- Target pages: charges.html
- Key checks:
  - Review the Charge object table for clarity, field naming, and scannability.
  - Step through each endpoint section: create, retrieve, capture, refund, and list.
  - Interact with the endpoint code blocks and any tabs/buttons to ensure the visible snippet matches the selected language/state.
  - Use the try-it panel for the create-charge flow, vary currency among supported values, and confirm supported vs unsupported behavior.
  - Verify that endpoint scrolling keeps the right-rail try-it panel synchronized to the current section.
- Exit criteria:
  - All five Charges endpoint sections have been reached or scrolled through.
  - At least one supported mock response and one unsupported currency/error response have been observed in the try-it panel.
  - Code sample controls and the sync behavior of the right rail have been checked.

### Cover adjacent resource management flow

- Objective: Validate customer lifecycle docs as the main adjacent flow to charges, focusing on data model and CRUD navigation.
- Target pages: customers.html
- Key checks:
  - Review the Customer object table for completeness and readability.
  - Open each CRUD section: create, retrieve, update, delete, and list.
  - Check whether code tabs and copy actions behave consistently with Charges.
  - Look for any page-width or table overflow issues in desktop and mobile layouts.
- Exit criteria:
  - Customer object and all CRUD sections have been inspected.
  - Any visible overflow or alignment issues have been confirmed or ruled out in at least one viewport.

### Validate failure and recovery guidance

- Objective: Check how the docs explain errors, retries, and webhook verification for real-world integration recovery.
- Target pages: errors.html, webhooks.html
- Key checks:
  - Review the error code table for severity, messages, and handling advice.
  - Confirm that the page surfaces key payment-failure cases such as card_declined, insufficient_funds, processing_error, fraud_blocked, and 3DS-required handling.
  - On Webhooks, inspect event type coverage and verify the sections for signing and retries.
  - Test anchor navigation to page sections from the left nav and on-page right rail where present.
  - Confirm code sample/tab behavior on these pages if interactive snippets are shown.
- Exit criteria:
  - The error reference and webhook guidance have each been opened and the main section structure verified.
  - At least one or two section anchors on Webhooks have been used successfully.

### Mobile viewport regression pass

- Objective: Repeat the most important navigation and interaction checks on mobile to catch tap target, overflow, and sticky-rail issues.
- Target pages: index.html, quickstart.html, charges.html, customers.html, errors.html, webhooks.html
- Key checks:
  - Verify that left-nav items remain usable despite the prescan's small-tap-target warnings.
  - Check whether horizontal overflow appears on Charges, Customers, and Webhooks in mobile width.
  - Retest the Quickstart and Charges code sample controls, plus the Charges try-it panel if it remains accessible.
  - Confirm that anchor-based navigation still lands on the intended section when using the mobile viewport.
- Exit criteria:
  - All known pages have at least a lightweight mobile pass, with emphasis on the high-risk pages.
  - The run has recorded whether the known tap-target and overflow issues are present or only desktop artifacts.

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

