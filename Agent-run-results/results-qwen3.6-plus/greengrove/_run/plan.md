# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the GreenGrove pet insurance system, focusing on the 6-step quote wizard's usability, accessibility, and error handling, while validating adjacent support pages (Claims, FAQ) and mobile responsiveness.

## Plan Summary

The run will begin by auditing the landing page for layout issues and navigation entry points. It will then execute a comprehensive walkthrough of the 6-step quote wizard, testing complex interactions like the breed combobox, condition chips, and tier comparison logic. Finally, it will validate the Claims form and FAQ accordion before repeating critical path checks on a mobile viewport to address known tap-target risks.

## Coverage Targets

- pages: `Visit all 4 HTML files (index, quote, claims, faq)`
- features: `Exercise all 6 steps of the quote wizard, including edge cases in breed selection and condition toggles`
- mobile: `Repeat Phase 1 and Phase 2 key checks on mobile viewport`

## Planned Phases

### Landing Page & Navigation Audit

- Objective: Validate entry points, visual hierarchy, and identify immediate layout/accessibility blockers.
- Target pages: index.html
- Key checks:
  - Verify 'Start a free quote' CTA leads to quote.html
  - Check 'See the FAQ' deep link scrolls or navigates correctly
  - Document small tap target warnings in header nav
  - Verify responsive behavior of hero illustration and value props
- Exit criteria:
  - Navigation map confirmed
  - Entry to quote wizard successful
  - Layout warnings documented

### Quote Wizard: Input & Logic (Steps 1-3)

- Objective: Test the initial data capture flow, focusing on the complex breed selector and age inputs.
- Target pages: quote.html
- Key checks:
  - Step 1: Verify pet type icons are selectable and update state
  - Step 2: Test Breed combobox with keyboard (Up/Down/Enter/Esc) and mouse
  - Step 2: Verify auto-switch logic when changing species (e.g., Dog to Cat)
  - Step 3: Validate Age stepper bounds and year/month toggle functionality
  - Test 'Back' button persistence of data from Step 3 to Step 1
- Exit criteria:
  - Successfully reach Step 4 with valid data
  - Keyboard navigation verified for combobox
  - Data persistence confirmed on backward navigation

### Quote Wizard: Selection & Pricing (Steps 4-6)

- Objective: Validate complex selection states, pricing calculations, and final summary accuracy.
- Target pages: quote.html
- Key checks:
  - Step 4: Test multi-select chips for conditions
  - Step 4: Verify 'None' toggle clears other selections
  - Step 5: Compare Sprout/Sapling/Oak tiers
  - Step 5: Check collapsible side-by-side comparison table
  - Step 5: Verify deductible dropdown affects monthly/annual totals
  - Step 6: Validate final summary matches previous inputs
- Exit criteria:
  - Final quote generated successfully
  - Pricing logic appears consistent with inputs
  - All wizard steps accessible via top dot indicator

### Support Pages & Recovery Flows

- Objective: Ensure users can access help and file claims without breaking the primary flow context.
- Target pages: faq.html, claims.html
- Key checks:
  - FAQ: Expand/collapse all 12 accordion items
  - FAQ: Check for content overflow in long answers
  - Claims: Validate form field labels and required states
  - Claims: Test file upload input (visual feedback only)
  - Verify global nav links work from these sub-pages
- Exit criteria:
  - FAQ accordion fully functional
  - Claims form structure validated
  - No dead ends from support pages

### Mobile Viewport Validation

- Objective: Repeat critical checks on mobile to address prescan tap-target warnings and layout shifts.
- Target pages: index.html, quote.html
- Key checks:
  - Re-test header nav tap targets (expect failures based on prescan)
  - Verify Quote Wizard steps stack vertically without horizontal scroll
  - Test Breed combobox overlay on small screens
  - Verify Tier cards are readable and selectable on narrow viewports
- Exit criteria:
  - Mobile-specific UX issues documented
  - Critical path (Quote) usable on mobile despite layout warnings

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

