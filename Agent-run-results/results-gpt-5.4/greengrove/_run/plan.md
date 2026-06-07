# UXAgent Exploration Plan

## Goal

Explore the full GreenGrove pet-insurance experience end to end, with deepest coverage on the 6-step quote wizard and supporting validation of adjacent marketing, FAQ, and claims flows across desktop and mobile.

## Plan Summary

Begin on the landing page to confirm the primary entry points into quoting and the consistency of global navigation. Spend most of the run inside quote.html, exercising forward progress, backward recovery, step-jump behavior, selection widgets, and quote/tier updates. Then validate the adjacent FAQ and claims experiences, including basic form behavior and content reveal states, and finish with targeted mobile checks on the most important entry and conversion paths.

## Coverage Targets

- pages: `Visit all 4 known HTML pages, with repeated visits to quote.html because it is the primary flow and highest-risk interaction surface.`
- features: `Exercise most visible controls on each page, with near-complete state coverage for the quote wizard: pet selection, breed combobox, age controls, conditions chips/None toggle, tier cards, deductible dropdown, comparison table, step indicators, floating nav bar, and final summary.`
- mobile: `Repeat the landing-to-quote critical path and spot-check FAQ and claims on a mobile viewport, prioritizing small tap targets, sticky/floating control overlap, form usability, and readability.`

## Planned Phases

### Entry points and navigation baseline

- Objective: Validate the marketing landing page as the top-of-funnel entry, confirm navigation to all known pages, and identify obvious CTA or affordance issues before deeper flow testing.
- Target pages: index.html, faq.html, claims.html, quote.html
- Key checks:
  - Confirm both quote CTAs on index.html navigate to quote.html and are visually prominent.
  - Use header nav links from index.html to reach quote.html, claims.html, and faq.html.
  - Check whether the Sign in link does nothing or causes confusing behavior because it points to '#'.
  - Observe whether the FAQ teaser on index.html creates a clear bridge to faq.html.
  - Note desktop clarity of hero, trust/value props, review card, and FAQ teaser relative to quote CTA.
  - Capture any navigation inconsistency in header labels/state across pages.
- Exit criteria:
  - All four known HTML pages are reachable through visible navigation or CTA links.
  - Primary quote entry points are verified from the landing page.
  - Any broken/confusing global nav behavior is documented for follow-up.

### Quote wizard happy path

- Objective: Complete the main 6-step quote flow once on desktop, confirming that each step is understandable, selections register correctly, and the final quote summary is coherent.
- Target pages: quote.html
- Key checks:
  - Step 1: select a pet type from the icon cards and verify Continue enables/advances appropriately.
  - Step 2: choose a breed through the searchable combobox and verify the chosen value persists after advancing.
  - Step 3: set age using year/month controls and stepper, then advance.
  - Step 4: select at least one condition state and continue.
  - Step 5: inspect all three tier cards (Sprout, Sapling, Oak), choose one, review deductible dropdown options, and expand/collapse the comparison table.
  - Confirm that live quote amounts are present and appear tied to tier/deductible choices.
  - Step 6: review monthly fee, annual total, inclusions, and the 14-day price-lock messaging.
  - Use Back once from a later step and confirm previously entered answers remain visible.
- Exit criteria:
  - A full quote is reached from step 1 through step 6 on desktop.
  - At least one valid set of pet, breed, age, conditions, tier, and deductible selections is completed.
  - The final summary reflects prior selections without obvious reset or mismatch.

### Quote wizard edge cases and recovery

- Objective: Probe the wizard's riskiest interactive states: validation gating, keyboard support, step jumping, conditional option changes, and edit/recovery behavior.
- Target pages: quote.html
- Key checks:
  - Attempt to continue from at least several steps without making a required selection and observe inline validation or blocked progression.
  - In the breed combobox, test typing to filter results, arrow keys to move, Enter to select, and Esc to dismiss.
  - Switch pet species after interacting with breed and confirm breed options update appropriately for dog/cat/other paths.
  - Check whether non-dog/cat species auto-switch to the alternate species handling described in the prescan.
  - On the age step, test increment/decrement behavior at low values and watch for impossible or confusing states.
  - On the conditions step, select multiple chips, then toggle None to verify exclusivity; reverse the order and verify consistency.
  - Use the top step indicators to jump back to earlier steps, edit answers, and return forward to confirm recalculation and persistence.
  - Change tier and deductible combinations to verify quote values and summary content refresh consistently.
  - Check whether the floating Back/Continue bar ever obscures controls or content during deeper wizard states.
- Exit criteria:
  - Required-field gating has been exercised on multiple steps.
  - Combobox keyboard and filtering behavior has been explicitly tested.
  - At least one backward-edit-forward recovery loop has been completed without data loss.

### Adjacent support flows

- Objective: Validate the non-quote supporting journeys so the overall product ecosystem is covered: FAQ discoverability/content interaction and the claims submission form.
- Target pages: faq.html, claims.html
- Key checks:
  - On faq.html, open and close several <details> items across the list, including first, middle, and last entries.
  - Observe whether multiple FAQ items can stay open simultaneously and whether that creates readability or scrolling issues.
  - Use header navigation from faq.html to return to quote.html or claims.html.
  - On claims.html, inspect all visible fields: pet name, visit date, condition/reason, total paid, invoice upload, and submit.
  - Try submitting the claims form empty or partially completed to discover validation behavior if any exists.
  - Fill the form with plausible values and interact with the file input control to confirm it is operable.
  - Submit a completed claim form and observe confirmation, errors, or page state changes.
- Exit criteria:
  - FAQ accordion behavior is sampled across the page.
  - Claims form has been exercised in both incomplete and more-complete states.
  - Any missing validation, ambiguous feedback, or upload friction is documented.

### Mobile-focused critical path verification

- Objective: Repeat the most important flows on a mobile viewport to catch responsiveness, tap-target, and sticky-control issues already hinted by the prescan.
- Target pages: index.html, quote.html, faq.html, claims.html
- Key checks:
  - Revisit index.html on mobile and verify header/nav usability, CTA prominence, and whether small tap targets are problematic in practice.
  - Open quote.html on mobile and complete at least the key path through pet selection, breed selection, age entry, tier choice, and final quote summary.
  - On mobile quote flow, watch the floating Back/Continue bar for overlap with fields, dropdowns, chips, or comparison content.
  - Recheck the breed combobox and conditions chips on mobile for focus handling, viewport fit, and touch usability.
  - Open several FAQ items on mobile and confirm text remains readable without awkward spacing or clipping.
  - On claims.html mobile, verify field stacking, date entry, file input usability, and submit button reachability.
- Exit criteria:
  - Critical conversion path has been replayed on mobile at least once.
  - Prescan tap-target concerns have been validated or disproven on actual mobile layout.
  - Any mobile-specific overlap, clipping, or interaction failures are captured.

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

