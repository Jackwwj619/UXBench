# UXAgent Exploration Plan

## Goal

Exhaustively explore the 6-step quote wizard, validate the claims submission form, and check FAQ interactions across desktop and mobile.

## Plan Summary

The exploration will start on the landing page to verify navigation, then dedicate the majority of effort to deeply exercising the 6-step quote wizard (especially the custom breed combobox and multi-select conditions). Afterward, it will validate the claims form and FAQ accordions. A final mobile pass will ensure the complex wizard UI and small tap targets remain usable on smaller screens.

## Coverage Targets

- pages: `Visit all 4 known HTML pages.`
- features: `Exercise all 6 steps of the quote wizard, including edge cases like keyboard nav in combobox and 'None' toggle in conditions.`
- mobile: `Re-run the complete quote flow and test header navigation on mobile viewport.`

## Planned Phases

### Landing & Static Content

- Objective: Verify homepage layout, header navigation, and FAQ accordion functionality.
- Target pages: index.html, faq.html
- Key checks:
  - Click through main navigation links
  - Open and close multiple <details> accordions on the FAQ page
- Exit criteria:
  - Successfully navigated to FAQ and toggled at least two questions.

### Quote Wizard - Steps 1-3

- Objective: Exercise the initial data gathering steps of the quote flow.
- Target pages: quote.html
- Key checks:
  - Select a pet type
  - Interact with the breed combobox (type to filter, use arrow keys to select)
  - Use the age stepper and toggle between years/months
- Exit criteria:
  - Successfully progressed past the age step with valid data.

### Quote Wizard - Steps 4-6

- Objective: Complete the quote flow, testing multi-select, tier cards, and summary.
- Target pages: quote.html
- Key checks:
  - Select multiple pre-existing conditions and test the 'None' toggle
  - Select different coverage tiers and observe live quote updates
  - Toggle the collapsible comparison table
  - Use the dot indicator or 'Back' button to return to a previous step and verify state retention
  - Reach the final quote summary screen
- Exit criteria:
  - Final quote summary screen is reached and backward navigation was proven to retain state.

### Claims Form

- Objective: Validate the inputs and submission of the file a claim form.
- Target pages: claims.html
- Key checks:
  - Fill out text, date, and number inputs
  - Interact with the file upload input
  - Submit the form and observe success or error states
- Exit criteria:
  - Claims form filled and submitted.

### Mobile Responsive Verification

- Objective: Ensure complex components and small tap targets are usable on mobile.
- Target pages: index.html, quote.html
- Key checks:
  - Verify header navigation tap targets
  - Complete a fast-path quote flow on the mobile viewport, focusing on the breed combobox and tier selection layout
- Exit criteria:
  - Completed one full quote flow in mobile mode.

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

