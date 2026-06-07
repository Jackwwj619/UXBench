# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the greengrove system, focusing on the 6-step quote wizard (primary flow) and adjacent pages (landing, claims, FAQ), validating interactions, accessibility, and mobile responsiveness.

## Plan Summary

Start with the landing page (index.html) to assess hero and navigation. Then enter the quote wizard (quote.html) to test all 6 steps, including complex controls (combobox, multi-select, stepper, tier comparison). Check claims.html form and faq.html accordions. Repeat critical checks in mobile viewport.

## Coverage Targets

- pages: `Visit all 4 known HTML pages (index, quote, claims, faq)`
- features: `Exercise all quote wizard steps (6), claims form (5 fields + file upload), FAQ accordions (12), and navigation links`
- mobile: `Repeat quote wizard steps, claims form, FAQ accordions, and navigation checks in mobile viewport`

## Planned Phases

### Landing Page (index.html) Exploration

- Objective: Validate hero section, navigation links, and FAQ entry on desktop. Check small tap targets for mobile readiness.
- Target pages: index.html
- Key checks:
  - Click 'Start a free quote' to ensure it leads to quote.html
  - Click 'See the FAQ →' to ensure it leads to faq.html
  - Inspect navigation links (GreenGrove, Get a quote, Claims, FAQ, Sign in) for functionality and small tap targets (mobile viewport)
- Exit criteria:
  - All navigation links and CTAs function correctly. Small tap targets identified for mobile validation.

### Quote Wizard Step 1-3 (quote.html)

- Objective: Test pet type selection (step 1), breed combobox (step 2, ARIA with searchable dropdown), and age selection (step 3, year/month toggle + stepper) on desktop.
- Target pages: quote.html
- Key checks:
  - Select 'Dog' (step 1) and click 'Continue' to step 2
  - Interact with breed combobox (step 2): search, select with keyboard (up/down/Enter/Esc), ensure auto-switch for species
  - Toggle age to 'month' (step 3), use stepper to adjust age, click 'Continue' to step 4
- Exit criteria:
  - Steps 1-3 complete with correct navigation and control functionality.

### Quote Wizard Step 4-6 (quote.html)

- Objective: Test pre-existing conditions (step 4, multi-select + None toggle), tier selection (step 5, three tier cards + deductible dropdown + comparison table), and quote summary (step 6) on desktop.
- Target pages: quote.html
- Key checks:
  - Select pre-existing conditions (step 4) or 'None', click 'Continue' to step 5
  - Select 'Oak' tier (step 5), interact with deductible dropdown, expand comparison table, check live quote, click 'Continue' to step 6
  - Review quote summary (step 6), check 14-day price lock mock, use dot indicator to jump back to step 3, then forward to step 6
- Exit criteria:
  - Steps 4-6 complete with correct navigation and control functionality. Tier comparison and live quote validated.

### Claims Page (claims.html) Exploration

- Objective: Test claims form (pet name, visit date, condition, total paid, file upload) on desktop.
- Target pages: claims.html
- Key checks:
  - Fill pet name, visit date, condition, total paid (step 1-4), interact with 'Vet invoice' file upload, click 'Submit claim' (test functionality, no actual submission)
  - Check navigation links (GreenGrove, Get a quote, Claims, FAQ) for functionality
- Exit criteria:
  - Claims form fields and file upload interact correctly. Navigation links function.

### FAQ Page (faq.html) Exploration

- Objective: Test accordion functionality (12 common questions) on desktop.
- Target pages: faq.html
- Key checks:
  - Expand/collapse multiple <details> accordions (e.g., 'What's the waiting period?', 'What counts as a pre-existing condition?')
  - Check navigation links (GreenGrove, Get a quote, Claims, FAQ) for functionality
- Exit criteria:
  - All accordions expand/collapse correctly. Navigation links function.

### Mobile Viewport Validation

- Objective: Repeat critical checks (quote wizard steps, claims form, FAQ accordions) in mobile viewport. Validate small tap targets and responsive design.
- Target pages: index.html, quote.html, claims.html, faq.html
- Key checks:
  - Test quote wizard steps 1-6 in mobile: pet type, breed combobox (touch + keyboard), age stepper, pre-existing conditions, tier selection, quote summary
  - Test claims form (pet name, visit date, file upload) in mobile
  - Test FAQ accordions in mobile
  - Validate small tap targets for navigation links (GreenGrove, Get a quote, etc.) in mobile
- Exit criteria:
  - Critical flows (quote, claims, FAQ) function in mobile. Small tap targets validated for usability.

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

