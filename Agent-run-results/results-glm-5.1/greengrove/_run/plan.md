# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the GreenGrove pet insurance site, focusing on the 6-step quote wizard, adjacent flows (claims, FAQ), and recovery paths across desktop and mobile viewports.

## Plan Summary

The run will start by assessing the landing page and navigating to the primary 6-step quote wizard, validating complex interactions like the ARIA combobox, age toggles, and tier comparisons. It will then test form validation and recovery on the claims page, followed by evaluating the FAQ accordion. Finally, critical flows will be re-validated on a mobile viewport to check responsiveness and tap-target issues identified in the prescan.

## Coverage Targets

- pages: `visit all 4 known HTML pages (index, quote, claims, faq)`
- features: `exercise all 6 quote wizard steps, claims form submission, FAQ accordion, and all navigation links`
- mobile: `repeat critical checks on mobile viewport, specifically targeting known small tap targets and responsive form layouts`

## Planned Phases

### Landing Page & Navigation

- Objective: Validate the entry point, value propositions, and global navigation to adjacent flows.
- Target pages: index.html
- Key checks:
  - Verify hero section content and 'Start a free quote' call-to-action visibility
  - Test all navigation links (Get a quote, Claims, FAQ, Sign in, Logo)
  - Check layout warnings for small tap targets on navigation links
- Exit criteria:
  - All navigation links confirmed functional
  - Hero section and value props visually verified
  - Moved to quote.html via primary CTA

### Quote Wizard Steps 1-3

- Objective: Validate the initial pet type selection, breed combobox accessibility, and age input logic.
- Target pages: quote.html
- Key checks:
  - Step 1: Select different pet types (Dog, Cat, Rabbit) and verify UI updates
  - Step 2: Test ARIA combobox keyboard navigation (up/down/Enter/Esc) and search filtering for dogs/cats
  - Step 2: Verify breed list dynamically changes based on pet type selection
  - Step 3: Test year/month toggle and age stepper increment/decrement limits
  - Test dot indicator to jump back to step 1 from step 3
- Exit criteria:
  - Successfully navigated steps 1-3 with different pet types
  - Keyboard navigation confirmed working on breed combobox
  - Age stepper bounds and toggle verified

### Quote Wizard Steps 4-6

- Objective: Validate condition selection, tier comparison, and final quote generation.
- Target pages: quote.html
- Key checks:
  - Step 4: Select multiple pre-existing condition chips and verify 'None' toggle clears selections
  - Step 5: Select different tiers (Sprout/Sapling/Oak), verify deductible dropdown updates
  - Step 5: Expand/collapse side-by-side comparison table, verify live per-tier quote updates
  - Step 6: Verify quote summary displays correct monthly/annual totals, inclusions, and 14-day price lock
  - Test floating Back/Continue bar behavior across steps
- Exit criteria:
  - Full quote completed end-to-end with verified calculations
  - Comparison table and 'None' toggle logic validated
  - Step 6 summary confirmed accurate against previous step inputs

### Claims Form & FAQ Accordion

- Objective: Validate adjacent flows: claims submission validation and FAQ interaction.
- Target pages: claims.html, faq.html
- Key checks:
  - claims.html: Attempt to submit empty form to trigger validation errors
  - claims.html: Fill valid data and interact with file upload input
  - faq.html: Expand and collapse multiple <details> accordion items
  - faq.html: Verify content visibility and state changes on toggle
- Exit criteria:
  - Claims form validation triggered and file upload interacted with
  - FAQ accordion items successfully toggled open and closed

### Mobile Viewport Checks

- Objective: Re-validate critical flows and layout warnings on a mobile viewport.
- Target pages: index.html, quote.html, claims.html
- Key checks:
  - Verify navigation menu adapts to mobile viewport (hamburger menu or stacked links)
  - Re-check small tap targets identified in prescan (FAQ, Claims, Get a quote links)
  - Validate quote wizard step transitions and floating bar on smaller screens
  - Check claims form layout and input usability on mobile
- Exit criteria:
  - Mobile navigation confirmed usable
  - Tap target issues visually verified on mobile
  - Quote wizard and claims form confirmed responsive and functional

## Prescan Summary

### GreenGrove Pet Insurance — Care that grows with your companion

- Page: `index.html`
- Headings: Care that grows with your companion., Common questions
- Interactables: `0` buttons, `7` links, `0` inputs
- Notable controls:
  - clickable:a:GreenGrove
  - clickable:a:Get a quote
  - clickable:a:Claims
  - clickable:a:FAQ
  - clickable:a:Sign in
  - clickable:a:Start a free quote
  - clickable:a:See the FAQ →

### File a claim — GreenGrove

- Page: `claims.html`
- Headings: File a claim
- Interactables: `1` buttons, `4` links, `5` inputs
- Notable controls:
  - clickable:a:GreenGrove
  - clickable:a:Get a quote
  - clickable:a:Claims
  - clickable:a:FAQ
  - typeable:input:Pet name
  - typeable:input:Visit date
  - typeable:input:Condition / reason for visit
  - typeable:input:Total paid (USD)

### FAQ — GreenGrove

- Page: `faq.html`
- Headings: Frequently asked
- Interactables: `0` buttons, `4` links, `0` inputs
- Notable controls:
  - clickable:a:GreenGrove
  - clickable:a:Get a quote
  - clickable:a:Claims
  - clickable:a:FAQ

### Get a quote — GreenGrove

- Page: `quote.html`
- Headings: Start with the basics — who are we covering?, What breed?, How old?, Any known conditions?, Pick a coverage tier, Sprout, Sapling, Oak, Your quote, Rate locked!
- Interactables: `6` buttons, `1` links, `9` inputs
- Notable controls:
  - clickable:a:GreenGrove
  - clickable:button:Continue

