# UXAgent Exploration Plan

## Goal

End-to-end exploration and UX critique of Tablerose’s restaurant discovery-to-booking checkout flow, including key recovery/edge states across desktop and mobile.

## Plan Summary

Start at index.html and drive the primary booking path by using the search card to reach restaurants.html, then open restaurant.html from a highlighted result and complete the 4-step booking through guest.html, payment.html, and confirmation.html. In parallel, validate adjacent navigation/editor-guide paths, filtering/sorting behaviors, and critical disabled/required-card-holder rules shown in the prescan. Repeat critical booking and review interactions on mobile viewport to catch tap-target and layout issues.

## Coverage Targets

- pages: `visit all known HTML pages: index.html, restaurants.html, restaurant.html, guest.html, payment.html, confirmation.html.`
- features: `exercise most visible controls per key page: search card inputs + quick pills; filters/sort/reset on results; tabs + favorite toggle + sticky booking card time selection on restaurant detail; guest form diet/occasion/special request; payment card inputs/add-ons; confirmation calendar/modification/cancellation/resend actions.`
- mobile: `repeat the critical booking path (index -> restaurants -> restaurant -> guest -> payment -> confirmation) and verify reachability of sticky booking card + main action buttons; also validate header/quick-pill tap targets flagged as small in prescan.`

## Planned Phases

### Discover & Search Entry (index.html)

- Objective: Validate the primary discovery/search entry points, including quick suggestions and hero search form fields, then confirm navigation into results.
- Target pages: index.html
- Key checks:
  - Use WHERE (city/neighborhood) input (ux-8) and DATE (ux-10) plus PARTY selector to run a search via 'Find tables →' button.
  - Click at least one trending quick suggestion pill (e.g., '🍝 Pasta · 6 nearby', '🍣 Sushi · 9 nearby') and confirm it routes to restaurants.html with coherent parameters.
  - Select a time value in the TIME row (5:30 pm..9:00 pm visible) and ensure it impacts subsequent highlighting on restaurants.html.
  - Exercise top navigation links (Tablerose/Discover/Cities/For restaurants/Help) to ensure they don’t trap the flow; confirm they route as expected or scroll appropriately.
  - Mobile check: ensure tap targets for header links and quick pills are usable; confirm search card is not overlapped.
- Exit criteria:
  - A successful navigation to restaurants.html occurs from both: (1) the search card and (2) at least one quick suggestion click.
  - Chosen DATE/TIME/PARTY selections visibly carry forward (e.g., results page summary bar reflects the selection).

### Results Discovery & Filtering (restaurants.html)

- Objective: Validate results list rendering, time-slot highlighting logic (±30min), and filter/sort interactions with reset behavior.
- Target pages: restaurants.html
- Key checks:
  - Use the 'Edit' control on the top reservation summary bar to ensure it allows returning to adjust search parameters.
  - Toggle multiple filters: one Cuisine, one Price tier, one Neighborhood, and one Feature; verify counts update and results list changes accordingly.
  - Use 'Reset filters' and verify all filters clear to defaults.
  - Use sort dropdown (Relevance/Highest rated/Price low-high/Price high-low/Nearest) and verify ordering changes.
  - Open restaurant.html from at least one listing; prefer a listing whose per-row time slots show both enabled and visually muted/disabled states relative to the search time.
  - Mobile check: validate filter rail usability (small tap targets risk) and that the results list remains readable without clipping.
- Exit criteria:
  - At least one successful navigation from restaurants.html to restaurant.html using a result listing.
  - Filter/sort/reset operations visibly affect the results list without breaking layout or leaving the page in an inconsistent state.

### Restaurant Detail & Booking Slot Selection (restaurant.html)

- Objective: Validate core detail-to-booking transition: tabs, favorite heart, sticky booking card interactions, and handling disabled vs highlighted time slots.
- Target pages: restaurant.html
- Key checks:
  - Click the favorite heart toggle (♡) and confirm it visually changes state (and if applicable persists on return).
  - Switch through the 4 tabs (Overview, Menu, Photos, Reviews) and confirm each tab renders its content area correctly.
  - In the sticky booking card, set or confirm PARTY and choose a time slot that is highlighted as near target (±30min) and then verify navigation readiness.
  - Attempt selecting a disabled time slot example (prescan notes 17:00 and 21:30 disabled for Bella Suora) and confirm the UI prevents selection with an appropriate disabled state.
  - Validate that the mini-map SVG is non-interactive/doesn’t break layout; ensure it doesn’t block booking card controls.
  - Mobile check: confirm sticky booking card remains reachable without covering primary content or causing accidental tap misfires.
- Exit criteria:
  - A time slot is selected successfully from the sticky booking card and leads onward to guest.html (or directly to the next step per flow).
  - Disabled slots cannot be selected; highlighted slots are selectable and lead to booking steps.

### Guest Details Form (guest.html)

- Objective: Validate the multi-field guest information capture, optional dietary and request inputs, occasion selection, and continuation into payment.
- Target pages: guest.html
- Key checks:
  - Fill First name and Last name; ensure required/format expectations are respected.
  - Add Phone and Email; verify that email/phone fields do not clear unexpectedly and that form submission is possible with valid data.
  - Toggle at least two dietary inputs (e.g., Vegetarian + Gluten-free) and confirm selections render as expected.
  - Add a Special request in the textarea and verify the character counter (0 / 240) updates and limits are enforced.
  - Select an occasion chip (e.g., 🎂 Birthday) and verify it appears in the summary.
  - Proceed to the next step and confirm the reservation summary (Restaurant/Date/Time/Party) persists correctly.
  - Mobile check: validate small-tap targets for diet/occasion controls and that keyboard focus is clear.
- Exit criteria:
  - Guest form submits successfully and transitions to payment.html with correct reservation summary and selections.

### Card Hold & Add-ons (payment.html)

- Objective: Validate payment hold messaging, payment method UI, add-on pricing calculation, and final submit into confirmation.
- Target pages: payment.html
- Key checks:
  - Verify the card hold explanation and fee terms are visible: $50/seat no-show fee and $100 card authorization (released if cancel by stated time).
  - Select a payment method option (Card, Apple Pay, Google Pay) and ensure the UI updates appropriately (even if actual payment is mocked).
  - Enter Card number, Expiry, CVC, and Postal code; confirm field masking/formatting and no broken validation indicators.
  - Toggle at least one add-on option (e.g., 🎂 Happy Birthday +$8 or 🥂 prosecco +$12 × seats) and confirm the add-ons total updates correctly.
  - Open the no-show policy link (agreement) and verify it doesn’t break flow (back works).
  - Complete by clicking 'Hold the table' and confirm navigation to confirmation.html.
- Exit criteria:
  - Payment step completes successfully and confirmation.html loads with a consistent reservation/ref details.
  - Add-ons total reflects selected items and seat multiplication behavior.

### Confirmation & Recovery (confirmation.html)

- Objective: Validate that booking success states render correctly and that modify/cancel/help recovery paths work without losing reservation details.
- Target pages: confirmation.html
- Key checks:
  - Verify reservation identifiers and summary (e.g., TR-784521, date/time/party) render without 'undefined' placeholders.
  - Use 'Add to calendar' options (Apple/Google/Outlook) and confirm they trigger expected UI actions (or safe no-op in this environment).
  - Click 'Modify' and ensure the flow returns to an editable booking step without losing core info.
  - Click 'Cancel' and confirm messaging/behavior is consistent (may lead to discover or allow rebooking).
  - Check 'Resend email' to ensure the action is available and doesn’t error in the UI.
  - Mobile check: confirm confirmation actions remain reachable and not overlapped.
- Exit criteria:
  - Confirmation page actions (calendar, resend email, modify/cancel) can be triggered and the UI stays coherent.
  - Reservation details on confirmation are fully populated.

## Prescan Summary

### Tablerose — find a table tonight

- Page: `index.html`
- Headings: Reserve dinner. No phone calls., Reserved most this week, Editor guides, Where to take a first date in Portland, Birthday dinners that won't ruin the budget, Quiet rooms for actual conversation, The best solo-dining counters, Search, Hold the table, Show up
- Interactables: `1` buttons, `23` links, `4` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - typeable:input:WHERE

### Reserved! — Tablerose

- Page: `confirmation.html`
- Headings: You're booked., Add to calendar, Confirmation sent, Modify or cancel, Before you go, You might also like
- Interactables: `6` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - clickable:button:Apple
  - clickable:button:Google
  - clickable:button:Outlook
  - clickable:button:Resend email
  - clickable:button:Modify
  - clickable:button:Cancel

### Guest details — Tablerose

- Page: `guest.html`
- Headings: Who's coming?, Your reservation
- Interactables: `1` buttons, `3` links, `18` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - typeable:input:First name
  - typeable:input:Last name
  - typeable:input:Phone
  - typeable:input:Email
  - clickable:input:Vegetarian
  - clickable:input:Vegan

### Hold the table — Tablerose

- Page: `payment.html`
- Headings: Hold the table, Add anything?, Reservation
- Interactables: `1` buttons, `4` links, `10` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - clickable:input:Card 💳
  - clickable:input:Apple Pay
  - clickable:input:Google Pay G
  - typeable:input:Card number
  - typeable:input:Expiry
  - typeable:input:CVC

### Restaurant — Tablerose

- Page: `restaurant.html`
- Headings: Bella Suora, What people are talking about, About, Highlights, Sample menu, To start, Pasta, From the oven, Make a reservation
- Interactables: `15` buttons, `8` links, `1` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - clickable:button:Save

### Restaurants — Tablerose

- Page: `restaurants.html`
- Headings: FILTER, Bella Suora, Tonari, Field & Hearth, Lupinus & Roma, Old Pier Smokehouse, Saffron & Stone, Siam Floating Cart, Hot Numb Wok, Olivewood
- Interactables: `31` buttons, `7` links, `25` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - clickable:button:Edit

