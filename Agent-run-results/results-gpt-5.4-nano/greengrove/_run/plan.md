# UXAgent Exploration Plan

## Goal

Evaluate the end-to-end UX of the GreenGrove onboarding experience: the 6-step quote wizard (primary flow) plus adjacent Claims and FAQ flows, with desktop and mobile coverage.

## Plan Summary

Start from the landing page and enter the quote wizard via the primary CTA. Progress through all 6 wizard steps, exercising keyboard/mouse interactions for the breed search combobox and the conditions multi-select, and validating the tier comparison/table and final quote lock/review state. Then validate the Claims form and FAQ accordion for completeness, navigation back into the quote flow, and mobile usability.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html, quote.html, claims.html, faq.html) on both desktop and mobile viewports.`
- features: `Exercise most visible controls per key page: index CTAs/nav links; quote wizard step dot navigation + Back/Continue; breed combobox keyboard; age toggle/stepper; conditions multi-select + None; tier cards + deductible dropdown; comparison table expand/collapse; claims inputs + submit + file upload; FAQ details accordion.`
- mobile: `Repeat the critical quote flow steps on mobile: Step 2 breed combobox keyboard usability (at least open/type/select/esc), Step 4 multi-select + None, Step 5 tier/deductible updates, and the final Step 6 summary. Additionally verify header CTA tap targets from index.html and navigation links are usable.`

## Planned Phases

### Landing page entry + navigation sanity

- Objective: Confirm primary entry points and top-level navigation to adjacent flows, including touch-size/usability issues noted in prescan.
- Target pages: index.html
- Key checks:
  - Tap/click 'Start a free quote' to reach quote.html and confirm the wizard starts at Step 1
  - Use header links: 'Claims' and 'FAQ' to confirm direct navigation and return paths (header 'Get a quote' back to wizard)
  - Tap header 'Sign in' (href is '#'): confirm it does not break flow (e.g., no dead-end modal/blank state) and check for accessible feedback
  - On mobile viewport, verify small tap targets (GreenGrove / Get a quote / Claims / FAQ / Sign in / 'See the FAQ →') remain usable without mis-taps
- Exit criteria:
  - All three primary destinations (quote.html, claims.html, faq.html) load successfully from index.html
  - Sign in action does not cause navigation failure or unexpected UI state
  - Mobile checks confirm header CTAs are still reliably tappable

### Quote wizard Step 1-2: pet type + searchable breed combobox

- Objective: Validate selection UX, keyboard accessibility, and state persistence before moving deeper into the quote.
- Target pages: quote.html
- Key checks:
  - Step 1 (Pet type): select a species card (try at least Dog, then Cat) and verify Continue becomes meaningful and the step dot indicator highlights
  - Step 2 (Breed): for the selected species, open the searchable dropdown and test keyboard controls: ArrowDown/ArrowUp navigation, Enter selection, Esc to close
  - Type in the breed search, verify filtering behavior and that selected value reflects the typed/selected item
  - Use top dot indicator to jump away and then back to Step 2; verify the chosen breed persists correctly
  - Validate that floating Back returns to the previous step without losing Step 1 selection
- Exit criteria:
  - Pet type and breed selections persist across Back and dot-step navigation
  - Breed combobox supports the described keyboard interaction model (Up/Down/Enter/Esc) without focus loss

### Quote wizard Step 3-4: age toggle + conditions multi-select

- Objective: Validate numeric/stepper controls, age input logic, and complex multi-select interactions including 'None' toggle.
- Target pages: quote.html
- Key checks:
  - Step 3 (Age): use year/month toggle and the stepper(s) to set a non-trivial age; verify visual value updates and Continue accepts it
  - Move to Step 4 and back to Step 3 via Back/dot-stepper; confirm age value remains
  - Step 4 (Pre-existing conditions): select multiple conditions from the 19-item multi-select and verify they appear as selected chips/list items
  - Toggle 'None': verify it clears all selected conditions (or enforces mutual exclusivity) and that selecting a condition clears 'None'
  - Use Back/Continue across Step 4 boundaries to validate selection persistence and that errors (if any) are clear
- Exit criteria:
  - Age control and conditions multi-select behavior are consistent, with correct 'None' mutual exclusivity
  - Selections persist when navigating back and forth between steps

### Quote wizard Step 5-6: tiers, deductible, comparison table, and rate lock summary

- Objective: Validate pricing calculation updates, interactive tier comparison components, and the final summary/rate lock state when navigating.
- Target pages: quote.html
- Key checks:
  - Step 5 (Tier cards): select Sprout, then change to Sapling, then Oak; verify the live per-tier quote updates accordingly
  - Change deductible dropdown and confirm the displayed monthly fee and any tier differences update live
  - Expand/collapse the side-by-side comparison table and verify it remains aligned/legible on both desktop and mobile; ensure expand state is not lost unexpectedly when toggling other controls
  - Continue to Step 6 and confirm summary includes the monthly fee, annual total, and inclusions consistent with the selections
  - Use dot stepper to jump back from Step 6 to Step 5 and modify tier/deductible; return to Step 6 and verify the 'Rate locked!' messaging and values update correctly
- Exit criteria:
  - Tier/deductible changes deterministically affect Step 6 summary values
  - Comparison table expand/collapse works reliably and does not break layout on mobile

### Adjacent flows: Claims form + FAQ accordion

- Objective: Validate critical adjacent pages for form usability, validation cues, and accessible disclosure behavior.
- Target pages: claims.html, faq.html
- Key checks:
  - Claims: attempt Submit claim with empty required fields to confirm presence and clarity of inline validation messages
  - Claims: enter plausible values into Pet name, Visit date, Condition/reason, Total paid; verify input formatting/labels and error behavior
  - Claims: interact with 'Vet invoice (PDF or image)' upload control—check whether it is required, shows selected filename/preview/affordance, and handles invalid file selection UX (if implemented)
  - Claims: after successful-looking completion (even without network), use Back navigation to ensure no client-side state loss beyond typical form behavior
  - FAQ: expand several <details> items; confirm only one or multiple can be open (whatever intended), and that content is readable and navigable via keyboard
  - From FAQ/Claims, use header 'Get a quote' to return to quote wizard and ensure no unintended modal/scroll issues
- Exit criteria:
  - Claims form provides clear validation and behaves sensibly with empty and partially filled inputs
  - FAQ accordion <details> expands/collapses reliably and is accessible
  - Header navigation between pages works without breaking the browsing session

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

