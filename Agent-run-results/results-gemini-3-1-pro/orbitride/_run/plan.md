# UXAgent Exploration Plan

## Goal

Exhaustively evaluate the OrbitRide booking flow from initial search to confirmation, with a strong emphasis on cross-page state persistence (passenger count, total price) and mobile usability.

## Plan Summary

The exploration will start on the landing page to test the search inputs, paying special attention to the datalist autocomplete and date pickers. It will then navigate to the routes page to test filtering logic, proceed to the SVG seat map to validate seat selection rules based on passenger count, and finish by passing through the passenger details, extras, and payment pages to verify the checkout flow.

## Coverage Targets

- pages: `Visit all 7 HTML pages defined in the site structure.`
- features: `Exercise search autocomplete, route filters, SVG seat selection, and dynamic pricing.`
- mobile: `Evaluate navigation tap targets, filter sidebar layout, and SVG seat map scaling.`

## Planned Phases

### Search and Landing Setup

- Objective: Verify the search widget inputs, datalist interactions, and mobile navigation.
- Target pages: index.html
- Key checks:
  - Type partial city names into FROM/TO to trigger autocomplete.
  - Set PASSENGERS to a value > 1 to track it later.
  - Attempt to submit an empty form to check validation.
  - Verify top navigation links on mobile viewport.
- Exit criteria:
  - Successfully filled the search form and navigated to routes.html.

### Routes and Filtering

- Objective: Ensure the routes page accurately updates based on filters and displays correctly on mobile.
- Target pages: routes.html
- Key checks:
  - Toggle 'Departure time' select, 'Max price' slider, and 'Amenities' checkboxes.
  - Verify that the route list updates or behaves correctly with filters.
  - Click a 'Select' button for a specific trip.
- Exit criteria:
  - Filters have been interacted with and the user has successfully navigated to seats.html.

### Seat Selection Logic

- Objective: Validate the SVG seat map interactions and passenger count enforcement.
- Target pages: seats.html
- Key checks:
  - Attempt to select more seats than the passenger count.
  - Attempt to proceed with fewer seats than the passenger count.
  - Interact with different seat types (priority vs standard) to see price updates.
- Exit criteria:
  - Successfully selected the exact number of required seats and progressed to passengers.html.

### Checkout Flow Completion

- Objective: Walk through passenger details, extras, and payment to reach confirmation.
- Target pages: passengers.html, extras.html, payment.html, confirmation.html
- Key checks:
  - Verify the number of passenger forms matches the initial count.
  - Add an extra (e.g., baggage) and check if the total price updates.
  - Complete payment form with mock data.
  - Verify final confirmation details reflect the choices.
- Exit criteria:
  - Reached confirmation.html with no blocking errors.

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

