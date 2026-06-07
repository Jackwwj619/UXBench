# UXAgent Exploration Plan

## Goal

Execute a comprehensive UX audit of the OrbitRide booking flow, validating the end-to-end journey from search to confirmation while identifying usability friction points and mobile responsiveness issues.

## Plan Summary

The run will simulate a user booking a multi-passenger trip, starting with the landing page search, moving through route filtering, interactive seat selection, passenger details, and payment. It will specifically target high-risk interactions like the SVG seat map and date carousel, ensuring state persistence across steps. Finally, it will repeat critical path checks on a mobile viewport to address known tap-target warnings.

## Coverage Targets

- pages: `Visit all 7 HTML files in the site directory.`
- features: `Interact with search autocomplete, route filters, seat map SVG, and payment form inputs.`
- mobile: `Repeat Phase 1 and Phase 2 interactions on mobile viewport to check for layout shifts and touch target issues.`

## Planned Phases

### Search & Discovery

- Objective: Validate entry points, search form functionality, and result listing filters.
- Target pages: index.html, routes.html
- Key checks:
  - Test autocomplete/datalist behavior on FROM/TO inputs.
  - Click a 'Popular route' card to verify pre-filled search state.
  - On routes.html, toggle at least two filters (e.g., 'Wi-Fi', 'Morning') and observe list updates.
  - Navigate the 7-day date carousel to ensure price/route updates.
- Exit criteria:
  - Successfully filtered results and selected a specific trip via the 'Select' button.

### Seat Selection Logic

- Objective: Verify the core differentiator: the interactive seat map and selection constraints.
- Target pages: seats.html
- Key checks:
  - Identify and select seats matching the passenger count from Phase 1.
  - Attempt to select an 'occupied' seat to verify it is disabled.
  - Toggle selection on/off to verify price box updates dynamically.
  - Verify the 'Continue' button is disabled until the correct number of seats are chosen.
- Exit criteria:
  - Correct number of seats selected and transitioned to passenger details page.

### Checkout Flow & Validation

- Objective: Test data entry forms, upsell opportunities, and payment processing UI.
- Target pages: passengers.html, extras.html, payment.html
- Key checks:
  - Submit passenger form with empty required fields to trigger validation errors.
  - Review 'Extras' page (if present) and toggle an add-on service.
  - Enter mock payment details and verify input masking/formatting.
  - Check for clear summary of total cost before final submission.
- Exit criteria:
  - Reached confirmation page with a valid booking reference.

### Mobile Responsiveness & Recovery

- Objective: Re-evaluate critical flows on mobile viewport and test navigation recovery.
- Target pages: index.html, routes.html, seats.html
- Key checks:
  - Switch to mobile viewport (approx 375px width).
  - Verify header navigation collapses into a hamburger menu or remains accessible.
  - Re-test the 'Find rides' button and filter toggles for touch accessibility.
  - Check if the SVG seat map scales correctly or becomes unusable on small screens.
  - Use browser back-button from payment page to ensure cart/state isn't lost unexpectedly.
- Exit criteria:
  - Critical paths verified on mobile; layout breaks or unclickable elements documented.

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

