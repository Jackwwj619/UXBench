# UXAgent Exploration Plan

## Goal

Critique the UX of the full WeaveAPI developer docs by validating the primary learning flow (Quickstart → Charges → Customers → Webhooks → Errors) and adjacent recovery/edge paths (search, anchors/scroll syncing, Try-it parameterization, error handling, and mobile usability).

## Plan Summary

Start at index.html to verify global navigation, search, and the anchor-based “On this page” jump behavior. Then exercise the three-column doc experience across quickstart.html, charges.html, customers.html, webhooks.html, and errors.html—especially the “Try-it” style panel behavior on the Charges page. Finish by validating error reference clarity and repeat the most critical checks on a mobile viewport, focusing on small tap targets and any horizontal overflow.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, quickstart.html, charges.html, customers.html, webhooks.html, errors.html.`
- features: `Exercise most visible controls per key page: Search docs (ctrl+K), theme toggle (🌙), language tabs (CURL/PYTHON/NODE/GO) where present, Copy buttons on code blocks, anchor navigation, and the Charges Try-it panel Send behavior across multiple endpoints.`
- mobile: `Repeat critical checks on mobile viewport: index anchor navigation + search, plus Charges Try-it panel Send with at least one supported and one unsupported currency case. Also verify resilience against small tap targets and horizontal_overflow.`

## Planned Phases

### Global navigation & docs entry points (Index)

- Objective: Validate that the entry page provides clear pathways into the docs, including search, anchors, and global navigation to adjacent flows.
- Target pages: index.html
- Key checks:
  - Use Search docs… (ctrl+K): type a query like “idempotency” or “pagination”, then select a result to confirm correct navigation/scroll.
  - Click primary section links (Quickstart, Authentication, Idempotency, Pagination, Errors) and verify the page scrolls to the correct section headings.
  - Click left-nav items to jump to other major pages (Charges, Customers, Error codes) and confirm full page navigation works.
  - Toggle the theme control (🌙) to ensure it doesn’t break readability or interactive controls.
- Exit criteria:
  - Search successfully navigates to relevant content on index.html.
  - At least 3 anchor clicks (e.g., Quickstart, Idempotency, Errors) land on the intended sections.
  - At least 2 left-nav page navigations (to charges.html/customers.html or errors.html) load correctly without layout breakage.

### Quickstart comprehension & copy-to-snippet UX

- Objective: Check that the quickest path to value is understandable, with correct code snippets, language tabs, and copy controls.
- Target pages: quickstart.html
- Key checks:
  - Verify step order: “1. Install the SDK” followed by “2. Make your first charge” is visually and semantically clear.
  - Use the code-language selectors (CURL/PYTHON/NODE/GO) and confirm displayed snippet updates appropriately.
  - Use the Copy button on the Quickstart snippets and verify it provides feedback (e.g., toast/state change).
  - Navigate back to the other major flows from visible links (e.g., Charges reference) and confirm continuity.
- Exit criteria:
  - Language switching changes the code block content without breaking layout.
  - Copy action works at least once and provides visible confirmation.
  - User can reach the Charges reference from Quickstart via link.

### Charges API: Try-it sync + endpoint parameterization

- Objective: Exercise the Charges doc’s right-column Try-it panel behavior across multiple endpoints and validate edge-case responses.
- Target pages: charges.html
- Key checks:
  - Scroll through endpoint sections in order: Create a charge, Retrieve a charge, Capture a charge, Refund a charge, List charges; verify the right Try-it panel updates to match the current endpoint.
  - For Create: enter currency values shown as supported (usd/eur/gbp/jpy) and confirm Send returns a charge-like JSON object.
  - For Create: enter an unsupported currency and confirm Send returns currency_not_supported (as described in the prescan summary).
  - For List charges: set cursor/pagination-related parameters (as visible in the panel) and verify response includes paging fields like has_more/next_cursor (as described).
  - Validate at least one Copy action for code blocks in the Charges page.
- Exit criteria:
  - Try-it panel clearly tracks the active endpoint section while scrolling.
  - Send produces correct mock responses for both supported and unsupported currency cases.
  - At least one pagination/list interaction results in a response containing pagination indicators.

### Customers & Webhooks: object understanding, anchors, and overflow resilience

- Objective: Validate adjacent resource docs and ensure the 3-column layout remains usable with tables/code blocks and interactive controls.
- Target pages: customers.html, webhooks.html
- Key checks:
  - Customers: verify the Charge/Customer object framing is clear (“The Customer object” section) and navigate through Create/Retrieve/Update/Delete/List sections via scroll/anchors.
  - Customers: exercise Copy and any language tabs if present, ensuring code blocks remain readable.
  - Webhooks: confirm the presence and comprehension of event types list (e.g., charge.succeeded/charge.failed) and anchors for “Verifying signatures” and “Retries”.
  - Webhooks: validate any signature verification instructions are readable without horizontal scrolling breaking layout; address any horizontal_overflow warnings by checking code/table legibility and button accessibility.
- Exit criteria:
  - Users can successfully locate and read key sections (object description + CRUD/list on customers; event types + verifying/retries on webhooks).
  - No unusable horizontal overflow: code/tables and controls remain accessible without clipping.

### Errors reference clarity & mobile regression pass

- Objective: Confirm errors are easy to interpret programmatically and display-wise, then repeat critical UX checks on mobile viewport.
- Target pages: errors.html, index.html, charges.html
- Key checks:
  - Errors: locate at least 3 specific error codes listed in the prescan (e.g., card_declined, insufficient_funds, expired_card, fraud_blocked) and verify the mapping includes CODE, HTTP status, and how-to-handle guidance.
  - Errors: use Search docs on this page (if available globally) to jump directly to an error code by name.
  - Mobile viewport: repeat index anchor navigation (Quickstart/Idempotency/Errors) and verify tap targets are usable despite small tap target warnings.
  - Mobile viewport: on charges.html, verify Try-it panel is still usable for at least one endpoint and that Send/currency edge-case behavior still works.
- Exit criteria:
  - Error codes table provides clear code + HTTP status + actionable handling for at least 3 codes.
  - Mobile: critical navigation (search/anchors) works without mis-taps or clipped controls.
  - Mobile: Charges Try-it remains functional for at least one endpoint (supported vs unsupported currency).

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

