# UXAgent Exploration Plan

## Goal

Critique and validate OrbitRide’s end-to-end booking UX, focusing on the primary search→routes→seat selection→checkout/payment→confirmation flow, plus adjacent navigations and key recovery states.

## Plan Summary

Start from the landing page search form and validate how city/date/passenger inputs behave and how users reach the routes results. From routes, exercise the date carousel, filter controls, and multiple trip rows’ Select actions to reach seats. Then complete booking through payment, extras, passengers management (if separate), and confirm success, validating error/disabled states and back-navigation. Repeat the critical path checks on a mobile viewport to confirm layout and tap targets.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page (index: autocomplete/date/passengers + Find rides; routes: carousel + all filters + multiple Selects; seats: seat click states + Continue gating; payment: validation; extras/passengers: required fields and totals; confirmation: summary correctness)`
- mobile: `repeat critical checks on mobile viewport for index→routes→seats→payment→confirmation`

## Planned Phases

### Landing search & top navigation validation

- Objective: Validate the search form’s inputs and submission behavior, and confirm navigation/header controls route correctly.
- Target pages: index.html
- Key checks:
  - Use FROM and TO typeable fields (city autocomplete/datalist): enter a partial city name and confirm suggestions/selection works without leaving invalid text.
  - Change DATE via the date picker (verify a valid future date is accepted).
  - Change PASSENGERS using the select (1→2 and a higher value like 6 or 7) and verify the selected count is reflected on the UI.
  - Click primary 'Find rides' and confirm it navigates to the routes results contextually (expected results for the chosen params).
  - Top links: click 'Routes', 'Help', and 'Sign in' to confirm they either navigate to the intended page or provide a safe no-op (no broken page/blank state).
- Exit criteria:
  - User can reach routes.html from index.html with at least two distinct passenger counts or dates, without blank/incorrect results.
  - Header links do not lead to dead-ends (no missing navigation or uncaught errors).

### Routes results browsing: carousel, filters, and selecting trips

- Objective: Exercise routes discovery controls and validate trip list updates and correct handoff into seat selection.
- Target pages: routes.html
- Key checks:
  - Use the 7-day date carousel (select at least two different days) and verify trip rows (or their day-based availability/prices) update.
  - Adjust 'Departure time' options (Any time → Morning → Evening) and verify the results list changes accordingly.
  - Set 'Max price $120' to a lower value using the slider/input and verify only trips within range appear.
  - Toggle amenities multi-select (Wi-Fi, Power outlet, Restroom, Express ≤1 stop): verify multi-select logic (add/remove) updates results.
  - Use at least two different trip rows and click 'Select' to reach seats.html with different selections (e.g., one direct/1 stop with different amenities and one with different seats-left count).
- Exit criteria:
  - At least 3 distinct filter combinations or carousel selections result in visible changes to trip rows.
  - Selecting a trip reliably navigates to seats.html and carries forward the passenger count and selected trip context (e.g., pricing/route info shown on seats page).

### Seat map selection & continue gating

- Objective: Validate seat selection constraints, visual state changes (occupied/standard/priority), and proceed rules.
- Target pages: seats.html
- Key checks:
  - Confirm legend/state colors differentiate occupied vs selectable; attempt to click an occupied seat and verify it cannot be selected.
  - With passenger count reflected from routes selection, select exactly N seats (where N = passengers) and confirm they appear in the 'selected list' and price box updates.
  - Try selecting fewer than N seats and click 'Continue'—verify Continue is disabled or shows a clear validation preventing progression.
  - Select a seat from priority rows and verify priority seats are selectable and reflected distinctly (if indicated in UI).
  - Change selection (deselect/reselect where supported) and confirm selected list and price update correctly.
- Exit criteria:
  - Seat selection enforces passenger count (no proceed with insufficient seats).
  - Selected list and price reflect the current selected seats accurately after multiple selection changes.

### Payment flow & validation

- Objective: Complete the booking through payment and validate form correctness and recovery from invalid inputs.
- Target pages: payment.html
- Key checks:
  - Reach payment.html via seats.html 'Continue'.
  - Complete required payment fields (use any available mocked payment method inputs) and proceed.
  - If payment supports error states, attempt to proceed with missing/invalid inputs and confirm inline error messaging and prevention of navigation.
- Exit criteria:
  - A successful payment path reaches the next step without errors.
  - At least one invalid-input attempt triggers visible validation and prevents progression.

### Extras, passenger details, and confirmation

- Objective: Validate completion steps (extras and passenger details) and confirm the final confirmation page displays correct booking summary.
- Target pages: extras.html, passengers.html, confirmation.html
- Key checks:
  - From payment.html, proceed into extras.html; add/remove available extras (if checkboxes/selectors exist) and verify totals/summary update (or that skipping works safely).
  - Proceed to passengers.html if it is a separate step: enter passenger details (names or required fields) and ensure required fields are validated before continuing.
  - Reach confirmation.html and verify it shows a coherent booking summary (route/trip info, selected seats count/ids, and updated total including extras).
  - Navigate back using browser/back controls (if feasible) to ensure state does not break (no missing context or blank steps).
- Exit criteria:
  - Confirmation page consistently reflects the selections made in seats/extras/passengers.
  - Required-field validation works for passenger details/extras, and completion does not allow empty required data.

### Mobile critical path regression

- Objective: Repeat the primary checkout journey on mobile viewport to catch layout/tap-target failures.
- Target pages: index.html, routes.html, seats.html, payment.html, confirmation.html
- Key checks:
  - On index.html, verify FROM/TO/date/passengers inputs and 'Find rides' are usable; confirm header tap targets still work (despite prescan small tap-target warnings).
  - On routes.html, verify filter controls are operable (slider, multi-select, date carousel) and Select buttons are tappable.
  - On seats.html, verify seat map is interactable and that selected list/Continue action are reachable without horizontal/vertical trapping.
  - Complete through to confirmation with the same basic choices and confirm nothing is clipped or inaccessible.
- Exit criteria:
  - User can complete the end-to-end flow on mobile without dead/unclickable controls.
  - No critical elements (Select/Continue) are inaccessible or overlapped on mobile.

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

