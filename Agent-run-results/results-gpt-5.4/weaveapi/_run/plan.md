# UXAgent Exploration Plan

## Goal

Explore the full WeaveAPI docs experience end-to-end, validating the primary developer onboarding flow from home to Quickstart to API reference, while also checking adjacent reference pages, navigation patterns, interactive code/examples, mock try-it states, and responsive usability.

## Plan Summary

Start on the docs home and verify the core information architecture: left nav, on-page anchors, search field presence, theme toggle, code language tabs, and popular guide links. Then follow the main onboarding path into Quickstart and Charges, where the deepest interaction surface exists via endpoint sections and the try-it panel with both success and error responses. Finish by covering Customers, Webhooks, and Errors as adjacent reference flows, then repeat the most important navigation and readability checks on mobile because the prescan already shows small tap targets and some horizontal overflow risk.

## Coverage Targets

- pages: `Visit all 6 known HTML pages, with repeated deeper passes on index.html and charges.html.`
- features: `Exercise the shared shell controls on multiple pages (search field presence/interaction, theme toggle, code language tabs, copy buttons), use in-page anchors where available, and fully test the charges try-it with both supported and unsupported currency inputs.`
- mobile: `Repeat critical navigation, code-block readability, theme/search access, and the core Charges try-it check on mobile; spot-check all pages for tap target and overflow issues, prioritizing index.html, charges.html, customers.html, and webhooks.html.`

## Planned Phases

### Home page orientation and global shell

- Objective: Validate the top-level docs IA and the shared controls from the landing page before branching into deeper content.
- Target pages: index.html
- Key checks:
  - Verify left-nav categories and links are visible and understandable from the start page
  - Use right-side 'On this page' anchors to confirm in-page navigation to Quickstart, Authentication, Idempotency, Pagination, and Errors
  - Check the search input for focus behavior, placeholder clarity, and whether typing triggers any visible state without assuming a full search system exists
  - Toggle theme via the moon button and confirm the page visibly changes and remains legible
  - Switch among visible code language tabs (CURL, PYTHON, NODE, GO) in at least one section and verify content changes coherently
  - Use at least one Copy control to confirm it is actionable and gives feedback if any
  - Open each Popular guides card/link destination path from the home page
- Exit criteria:
  - Home page anchors, nav, search field, theme toggle, and at least one code block interaction have all been exercised
  - Destinations for Quickstart, Charges, Customers, Webhooks, and Errors have been confirmed reachable from index.html

### Primary onboarding flow

- Objective: Follow the main developer learning path from Quickstart into the core payments reference, checking whether the docs tell a coherent story and support fast first success.
- Target pages: quickstart.html, charges.html
- Key checks:
  - On quickstart.html, verify the two-step flow is understandable: install SDK, then make first charge
  - Exercise code language tabs and copy controls on Quickstart to see whether examples stay aligned with the step context
  - Follow any read-on links from Quickstart into Charges or Webhooks to confirm flow continuity
  - On charges.html, verify section structure covers Charge object, create, retrieve, capture, refund, and list
  - Use in-page navigation and scrolling to check whether the active endpoint context and right-column try-it panel stay synchronized
  - Confirm that moving between endpoint sections updates the visible try-it content appropriately
- Exit criteria:
  - A user could plausibly move from landing page to Quickstart to Charges without dead ends or confusing transitions
  - Charges page endpoint sections and try-it synchronization behavior have been observed across multiple sections

### Charges interaction and recovery states

- Objective: Deeply validate the highest-risk interactive page by testing realistic happy-path and error-path inputs in the try-it experience.
- Target pages: charges.html
- Key checks:
  - Use the Create charge try-it with a supported currency (usd, eur, gbp, or jpy) and verify a mock charge object response appears
  - Repeat with an unsupported currency value to confirm the documented/mock error path returns currency_not_supported
  - Check whether endpoint-specific inputs, labels, and defaults make sense for create, retrieve, capture, refund, and list sections
  - Verify response examples remain readable and do not visually collide with parameter tables or the right rail
  - Cross-check that code examples, parameter tables, and try-it fields are semantically aligned for at least create and one non-create endpoint
  - Note any friction in editing fields, submitting, or understanding what changed after Send
- Exit criteria:
  - At least one success state and one failure state have been triggered in the try-it panel
  - Most visible controls on charges.html have been exercised, including endpoint changes, inputs, Send, code tabs, and copy where present

### Adjacent API and reference coverage

- Objective: Cover the secondary docs flows to assess consistency, completeness, and cross-page navigation quality beyond the primary payments path.
- Target pages: customers.html, webhooks.html, errors.html
- Key checks:
  - On customers.html, verify the object table and the endpoint sections for create, retrieve, update, delete, and list are discoverable and internally consistent
  - Exercise any visible code tabs/copy controls on customers.html and compare shell consistency with charges.html
  - On webhooks.html, verify anchor navigation to Event types, Verifying signatures, and Retries from the left nav and/or right-side anchors if present
  - Inspect the readability of the event list and signature/retry guidance, especially where long examples may overflow
  - On errors.html, confirm the error table/reference is scannable and that the handling guidance is understandable
  - Traverse between these pages using shared nav to confirm users can move among reference areas without losing orientation
- Exit criteria:
  - Customers, Webhooks, and Errors pages have all been visited and their main sections inspected
  - Cross-page shell consistency and navigation continuity have been assessed across all secondary reference pages

### Responsive and mobile-focused validation

- Objective: Recheck the most important flows and known risk areas on mobile, focusing on navigation, overflow, and touch usability.
- Target pages: index.html, quickstart.html, charges.html, customers.html, webhooks.html, errors.html
- Key checks:
  - On mobile viewport, verify whether the shared navigation remains accessible and whether users can still reach all major pages and sections
  - Specifically inspect the small-tap-target links in the left nav or any collapsed equivalent navigation for usability
  - Revisit index.html to confirm search, theme toggle, and at least one code block remain usable on smaller screens
  - Revisit charges.html to inspect horizontal overflow in code blocks, tables, and the try-it panel, and retry one happy-path submission on mobile if possible
  - Spot-check customers.html and webhooks.html for the overflow warnings seen in prescan
  - Confirm that right-rail/on-page navigation patterns degrade gracefully or remain discoverable on mobile
- Exit criteria:
  - Critical desktop findings have been either reproduced or cleared on mobile for index.html and charges.html
  - Known mobile risks from prescan—small tap targets and overflow—have been explicitly evaluated on the flagged pages

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

