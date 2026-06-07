# UXAgent Exploration Plan

## Goal

Exhaustively explore the OrbitRide booking funnel from landing search through confirmation, while also validating adjacent discovery/filtering behavior, seat-selection constraints, and key recovery/backtracking paths on both desktop and mobile.

## Plan Summary

The run should follow the visible end-to-end purchase flow: landing search on index.html, trip selection on routes.html, seat selection on seats.html, then complete the remaining checkout pages passengers.html, extras.html, payment.html, and confirmation.html. Along the way, it should probe the most consequential stateful controls already seen in the prescan, especially route filters, date carousel, Select actions, and passenger-count-to-seat-count constraints. Mobile validation should focus on the booking-critical path and the prescan’s small tap-target risks in the header/navigation and compact controls.

## Coverage Targets

- pages: `Visit all 7 known HTML pages, with deeper repeat coverage on index.html, routes.html, and seats.html because they expose the most visible interaction complexity.`
- features: `Exercise the full visible booking path plus most visible controls on key pages: landing search fields and submission, route filters/date carousel/Select actions, seat-map selection states and Continue, and at least the main forward actions on passengers/extras/payment/confirmation pages.`
- mobile: `Repeat the critical booking checks on a mobile viewport for index.html, routes.html, seats.html, and one downstream checkout page, with special attention to the already-flagged small header tap targets and dense stateful controls.`

## Planned Phases

### Entry and search initiation

- Objective: Validate that the landing page clearly supports trip search and that users can begin the booking flow with plausible inputs and understandable defaults.
- Target pages: index.html
- Key checks:
  - Review initial clarity of the hero/search module and whether the default-filled or entered values are legible and sensible
  - Exercise FROM and TO inputs using visible route examples where possible
  - Change DATE and PASSENGERS values, including a multi-passenger case to set up downstream seat-count testing
  - Submit via Find rides and confirm navigation to routes.html
  - Check whether header links and brand link behave coherently without derailing the main flow
  - If popular route cards are clickable in execution, test at least one as an alternate route-entry path
- Exit criteria:
  - At least one successful search reaches routes.html
  - One alternate search state or changed passenger count has been attempted
  - Landing-page navigation and top-level controls have been sanity-checked for obvious dead ends or UX confusion

### Route discovery and refinement

- Objective: Validate the results-list browsing experience, the usefulness and reliability of filters, and the ability to choose a trip with confidence.
- Target pages: routes.html
- Key checks:
  - Inspect the search summary at top for preserved origin/destination/date/passenger data and note any null/missing-state defects
  - Use the departure-time select and verify that visible results respond plausibly
  - Adjust the max-price control and confirm pricing/result changes are understandable
  - Toggle each visible amenity filter at least once, plus a multi-filter combination
  - Use the 7-day date carousel to switch dates and verify results/prices or state updates
  - Compare at least two trip rows with different carriers/stops/amenities/seats-left messaging
  - Activate Select from more than one row context if feasible, ensuring the selected trip is the one that advances
- Exit criteria:
  - Filters, date carousel, and at least one Select action have been exercised
  - The run has evidence on whether route context is preserved correctly
  - A chosen trip progresses to seats.html

### Seat-map constraint validation

- Objective: Deeply validate the most stateful interaction in the prescan: seat selection rules, visual states, and progression gating.
- Target pages: seats.html
- Key checks:
  - Inspect legend and seat-map readability across occupied, selected, standard, and priority seats
  - Attempt to select seats up to the passenger-count limit established earlier
  - Attempt over-selection beyond the passenger limit and verify prevention or messaging
  - Test deselection/reselection to ensure state updates and selected-seat list remain synchronized
  - Compare behavior of priority rows versus standard seats, including whether restrictions or pricing differences are communicated
  - Check price box updates as seats are chosen
  - Test Continue with invalid/incomplete selection versus valid selection
- Exit criteria:
  - Seat-count enforcement has been positively validated
  - Seat-state transitions and pricing/summary updates have been observed
  - Continue successfully advances only after a valid seat selection

### Checkout completion pages

- Objective: Traverse and critique the downstream booking steps for continuity, clarity, and data carryover through completion.
- Target pages: passengers.html, extras.html, payment.html, confirmation.html
- Key checks:
  - On passengers.html, verify presence and usability of traveler-detail entry and whether selected trip/seat summary remains visible
  - On extras.html, inspect optional add-on choices and whether opting in/out is clear and reversible
  - On payment.html, verify payment form structure, required-field affordances, and booking-summary consistency
  - Complete the purchase path to confirmation.html if possible using available demo inputs
  - On confirmation.html, check for a clear success state and final trip/passenger/seat/payment recap
- Exit criteria:
  - All remaining known checkout pages have been visited
  - End-to-end booking reaches confirmation.html or a blocking defect is documented with the failing step
  - At least one continuity check has been made at each step for summary/data preservation

### Recovery paths and mobile regression

- Objective: Validate that the flow tolerates backtracking and that the critical journey remains usable on a mobile viewport.
- Target pages: index.html, routes.html, seats.html, payment.html, confirmation.html
- Key checks:
  - Use browser/page backtracking between booking steps and confirm key selections are retained or loss is understandable
  - Repeat the booking-critical interactions on mobile: search initiation, route filtering/selection, seat selection, and at least one checkout form step
  - Re-check header/nav controls on mobile because prescan already flagged small tap targets on index.html
  - Assess whether dense controls on routes.html and the seat map on seats.html remain operable without overlap or accidental taps
  - Confirm any final confirmation/success information is readable on mobile without major clipping
- Exit criteria:
  - Critical path has been spot-checked on mobile through at least seats.html and one downstream checkout page
  - At least one recovery/backtrack scenario has been executed
  - Mobile-specific usability issues and tap-target/layout concerns have been documented

## Prescan Summary

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### Routes — OrbitRide

- Page: `routes.html`
- Headings: FILTERS
- Interactables: `8` buttons, `1` links, `6` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - selectable:select:Departure time Any time Morning (5-12) Afternoon (12-18) Evening (18-24)
  - clickable:input:Max price $120
  - clickable:input:Wi-Fi
  - clickable:input:Power outlet
  - clickable:input:Restroom
  - clickable:input:Express (≤1 stop)
  - clickable:button:Select

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

