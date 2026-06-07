# UXAgent Exploration Plan

## Goal

Explore and critique the full OrbitRide booking flow, with emphasis on the primary search-to-results-to-seat-selection path and the main recovery/adjacent controls exposed in the prescan.

## Plan Summary

Start on the landing page and validate the core trip-search form, including the prefilled route/date/passenger state, the search action, and the small mobile tap targets in the header. Then move through results to verify filters, date carousel behavior, and trip selection across multiple result types, before validating the seat map for passenger-count enforcement, occupied/selected states, and continuation into later checkout pages. Finish by covering the remaining booking steps and any confirmation/recovery states, repeating critical checks in a mobile viewport because the prescan already shows tap-target risk on several navigation controls.

## Coverage Targets

- pages: `Visit all 7 known HTML pages, with at least one complete end-to-end path from index.html to confirmation.html if the flow allows it.`
- features: `Exercise the search form, header links, popular routes, results filters, date carousel, trip selection, seat selection constraints, downstream checkout inputs, and final confirmation/recovery actions.`
- mobile: `Repeat the landing-page search, route selection/filtering, and seat-map interactions in mobile viewport, prioritizing controls that already showed small tap-target warnings.`

## Planned Phases

### Landing page and search form

- Objective: Validate the home page entry point, search inputs, and navigation affordances before entering the booking funnel.
- Target pages: index.html
- Key checks:
  - Confirm the From, To, Date, and Passengers controls are editable and submit with the current prefilled state.
  - Try the route header links (Routes, Help, Sign in) and observe whether they navigate, anchor, or remain inert.
  - Enter at least one alternate search combination, including a different passenger count, and submit via Find rides.
  - Check whether popular-route cards are clickable and whether they prefill or route to search results.
  - Repeat the critical header tap-target check in mobile viewport.
- Exit criteria:
  - At least one successful submission from the landing page reaches routes.html with populated trip context.
  - Header links and popular-route cards have been exercised enough to determine whether they navigate or are placeholders.
  - Mobile viewport check has confirmed whether the small tap-target warnings are usability issues or just visual guidance.

### Results discovery and filtering

- Objective: Validate the trip results page, including date navigation, filters, and selection behavior across different trip rows.
- Target pages: routes.html
- Key checks:
  - Verify the results header reflects the selected trip context and note any placeholder or missing values.
  - Test the 7-day date carousel for switching dates and preserving or changing trip availability.
  - Exercise departure-time, max-price, and amenity filters, including combinations rather than single toggles.
  - Select multiple trip rows with different attributes (direct, one-stop, two-stop, low-seat warning) to compare the downstream state.
  - Check whether any trip rows are effectively disabled or behave differently when seats are low.
  - Inspect whether the Select action always routes forward consistently from different filtered states.
- Exit criteria:
  - The page has been tested with at least one filter change and one date change.
  - At least two different trip rows have been selected and compared.
  - Any state mismatch between selected filters, visible rows, and route summary has been noted.

### Seat map and selection constraints

- Objective: Validate seat assignment behavior, passenger-count enforcement, and visual state changes on the bus map.
- Target pages: seats.html
- Key checks:
  - Confirm the seat map distinguishes priority, standard, occupied, and selected seats.
  - Try selecting seats equal to the passenger count, then attempt one extra selection to see whether the UI blocks it.
  - Check whether occupied seats are non-interactive and whether their styling is clear enough.
  - Validate the selected-seat list and price box update as seats are chosen and removed.
  - Use a case with more than one passenger to ensure multi-seat logic is covered.
- Exit criteria:
  - Seat selection rules are confirmed for at least one valid and one invalid interaction path.
  - The selected list and price summary reflect seat changes correctly.
  - Continue behavior is tested in both valid and invalid selection states if possible.

### Downstream checkout steps

- Objective: Traverse the remaining booking pages to verify continuity, form completeness, and state retention after seat selection.
- Target pages: passengers.html, extras.html, payment.html
- Key checks:
  - Verify passenger details entry or review works without losing the selected trip and seats.
  - Inspect extras selection for default choices, optional add-ons, and whether deselection is possible.
  - Validate payment page required fields, error handling, and any card or billing input formatting.
  - Check back-navigation from later pages to ensure state is retained and the user does not need to restart.
- Exit criteria:
  - Each page has been opened at least once in the booking context.
  - Core form controls and primary actions on each page have been exercised.
  - No obvious state loss occurs when moving forward and backward through the flow.

### Confirmation and end-state validation

- Objective: Confirm the final success state and any post-purchase details, including recovery paths if the flow fails.
- Target pages: confirmation.html
- Key checks:
  - Validate the confirmation page displays a completed booking state with itinerary or ticket details.
  - Check for actions such as manage booking, return home, or view trip details if present.
  - If the flow can be broken earlier, confirm whether the app offers a graceful recovery or restart path.
- Exit criteria:
  - A complete end-to-end booking completion state has been observed or its absence has been documented.
  - Any post-purchase actions or recovery controls have been checked.

### Mobile regression sweep

- Objective: Repeat the most important interactions in a mobile viewport to confirm the known tap-target and compact-control risks.
- Target pages: index.html, routes.html, seats.html
- Key checks:
  - Re-test header navigation and Find rides on the landing page at mobile size.
  - Re-test route filters and Select actions to ensure they are usable with touch.
  - Re-test seat picking and Continue on the seat map with the smaller viewport.
- Exit criteria:
  - Critical booking actions have been exercised in mobile viewport.
  - Any touch usability regressions are recorded against the specific compact controls seen in prescan.

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

