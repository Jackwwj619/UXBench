# UXAgent Exploration Plan

## Goal

Exhaustively explore GreenGrove’s primary quote/onboarding flow, then validate adjacent informational and claims paths, with special attention to step navigation, conditional inputs, summary correctness, and mobile tap-target issues.

## Plan Summary

Start on the marketing landing page to confirm the main conversion entry points and then drive deep through the 6-step quote wizard, exercising each step’s visible controls and any branching behaviors. After the quote flow, validate recovery/navigation patterns via the step indicator and Back/Continue controls, then inspect the claims form and FAQ accordion as adjacent support flows. Repeat the critical quote and landing-page checks in a mobile viewport, paying attention to the small-tap-target warnings already seen on the top navigation.

## Coverage Targets

- pages: `Visit all 4 known HTML pages: index.html, quote.html, claims.html, faq.html.`
- features: `Exercise the primary CTA path, all 6 quote steps, the quote wizard’s branching controls, the claims form fields/upload, and multiple FAQ accordion items.`
- mobile: `Repeat the landing-page navigation, quote entry and at least one deep wizard interaction, plus claims and FAQ interaction checks in mobile viewport.`

## Planned Phases

### Landing page entry and mobile sanity

- Objective: Validate the marketing entry point, primary quote CTA, supporting links, and the mobile usability risk already flagged on the header navigation.
- Target pages: index.html
- Key checks:
  - Open the hero CTA 'Start a free quote' and confirm it lands on the quote wizard.
  - Open the FAQ teaser link and confirm it lands on FAQ content.
  - Check the header links for Claims and FAQ, and note whether Sign in is inert or placeholder.
  - Repeat the same navigation checks in a mobile viewport and verify the small tap targets are still usable.
- Exit criteria:
  - Quote, FAQ, and Claims navigation have each been reached at least once from the landing page.
  - The mobile viewport has reproduced the header tap-target issue or confirmed the controls remain operable despite the warning.

### Quote wizard core path

- Objective: Exercise the full onboarding flow from step 1 through step 6, validating the default path and the main state transitions.
- Target pages: quote.html
- Key checks:
  - Select each pet type option enough to confirm the step reacts correctly and Continue enables progression.
  - Advance through the wizard in order and verify each step title/state updates correctly.
  - Check that the step dots and floating Back/Continue bar move the user predictably through the flow.
  - At the summary step, verify the displayed monthly fee, annual total, inclusions, and 14-day price lock messaging.
- Exit criteria:
  - The run has reached the final quote summary state at least once.
  - All six steps have been visited in a normal forward flow.

### Quote wizard branching and edge states

- Objective: Stress the controls that are most likely to have complex logic, conditional rendering, or keyboard accessibility issues.
- Target pages: quote.html
- Key checks:
  - Use the breed combobox/search dropdown with keyboard navigation, selection, and escape/cancel behavior.
  - Toggle age between year and month and test the stepper for minimum/maximum or boundary behavior.
  - Select several condition chips, then test the None toggle and confirm mutual exclusivity or reset behavior.
  - Pick different tier cards and change the deductible dropdown to see if quote values update consistently.
  - Open and close the comparison table if present, ensuring it reflects the selected tier/deductible.
- Exit criteria:
  - At least one non-default state has been exercised for steps 2, 3, 4, and 5.
  - Any dynamic quote recalculation or summary update has been observed and compared across selections.

### Recovery, navigation, and persistence

- Objective: Validate that users can jump back, recover from mistakes, and retain or reset state sensibly across the wizard.
- Target pages: quote.html
- Key checks:
  - Use the 6-step dot indicator to jump backward and forward, checking whether earlier choices persist.
  - Use the floating Back button from later steps and confirm it returns to the expected prior step.
  - Change an earlier choice after reaching a later step and verify downstream values update or invalidate appropriately.
  - Test whether the Continue button is blocked when required inputs are missing or contradictory.
- Exit criteria:
  - At least one backward navigation path and one non-linear step-jump path have been validated.
  - The flow’s handling of edited prior answers has been observed.

### Claims form and FAQ support flows

- Objective: Cover the adjacent support pages for form behavior and disclosure patterns outside the quote wizard.
- Target pages: claims.html, faq.html
- Key checks:
  - On claims.html, inspect required-field behavior for pet name, date, reason, amount, and invoice upload.
  - Attempt a submission with missing or partial fields to see validation and feedback behavior.
  - Exercise the invoice input with both image/PDF selection paths if possible.
  - On faq.html, expand and collapse multiple <details> items to confirm accordion behavior and readability.
- Exit criteria:
  - The claims form has been tested for visible validation and submission behavior.
  - Multiple FAQ items have been expanded and collapsed successfully.

### Mobile regression pass on critical interactions

- Objective: Repeat the most important conversion and support checks under mobile viewport constraints, emphasizing touch usability.
- Target pages: index.html, quote.html, claims.html, faq.html
- Key checks:
  - Re-test the landing-page CTA and top navigation on mobile for tap-target usability.
  - Walk at least the quote wizard entry and one deeper quote step on mobile to check whether the workflow remains usable.
  - Open the claims form and verify the input stack and submit control are still operable on a narrow viewport.
  - Confirm FAQ accordions remain easy to expand on mobile.
- Exit criteria:
  - Critical entry and form controls have been checked in mobile viewport.
  - Any mobile-specific usability regressions have been noted against the desktop behavior.

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

