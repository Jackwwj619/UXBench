# UXAgent Exploration Plan

## Goal

Exhaustively explore Tablerose’s reservation journey from discovery through confirmation, while also validating adjacent discovery/results/detail interactions and key recovery/edit states on both desktop and mobile.

## Plan Summary

Start from the homepage and confirm the primary discovery-to-booking funnel works: search or browse into results, open a restaurant, choose a time, provide guest details, complete the card-hold step, and land on confirmation. Along the way, probe adjacent entry points such as quick suggestion pills, trending cards, editorial guides, filters, sorting, restaurant tabs, favorites, and confirmation actions. Reserve extra attention for time-slot availability rules, summary persistence between steps, and the many small tap targets already hinted at in prescan for mobile usability.

## Coverage Targets

- pages: `Visit all 6 known HTML pages, with repeated visits to restaurants.html and restaurant.html via different entry points.`
- features: `Exercise most visible controls on core pages: homepage search and browse links; results filters, reset, sort, and time slots; restaurant tabs, save toggle, booking card; guest form options; payment methods and add-ons; confirmation actions.`
- mobile: `Repeat the critical discovery-to-booking flow on mobile with emphasis on small tap targets, dense result rows, sticky booking controls, and long-form completion.`

## Planned Phases

### Discovery and entry-point mapping

- Objective: Validate the homepage as a clear starting point for finding a table and identify which entry points feed the booking flow most effectively.
- Target pages: index.html
- Key checks:
  - Exercise the main search card: inspect WHERE, PARTY, DATE, TIME controls and submit via Find tables
  - Open at least one quick suggestion pill and confirm it lands in results with a coherent reservation context
  - Open at least one trending restaurant card and confirm it deep-links into restaurant detail
  - Open at least one editor guide card and confirm it routes into results rather than a dead end
  - Inspect top-nav items that point to real pages versus '#' placeholders; avoid spending run budget on clearly inert header links
  - Note first-impression clarity around the promise of card hold/no-show policy before booking begins
- Exit criteria:
  - Main search successfully reaches restaurants.html
  - At least three distinct homepage entry types have been exercised: search, suggestion/editorial link, and restaurant card
  - Observed whether discovery entry points preserve or ignore chosen search context

### Results refinement and restaurant selection

- Objective: Validate that results are understandable, refinable, and actionable enough to choose a reservation without confusion.
- Target pages: restaurants.html
- Key checks:
  - Verify top summary bar shows city, party size, date, and time, and inspect the Edit affordance if it exposes a way to revise search context
  - Apply a small mix of filters across different groups (for example cuisine + price + feature) and confirm visible results/count updates sensibly
  - Use Reset filters and confirm the list returns to baseline
  - Change sort order at least twice and check whether ordering/labels respond clearly
  - Inspect highlighted versus muted per-row time slots for availability cues and click one slot to enter restaurant detail or continue selection
  - Open at least two different restaurant rows to compare consistency of information scent from results to detail
- Exit criteria:
  - Multiple filter groups and reset behavior have been exercised
  - Sort has been changed and observed
  - At least one selection path from results into restaurant detail has been validated

### Restaurant detail and time selection

- Objective: Validate that a diner can evaluate a restaurant and confidently choose a reservation time from the detail page.
- Target pages: restaurant.html
- Key checks:
  - Review the hero information for clarity and consistency with results data: cuisine, price, area, rating, hours, address, and booking popularity
  - Switch through all four tabs (Overview, Menu, Photos, Reviews) and confirm content changes appropriately without losing context
  - Test the save/favorite heart toggle for visible state change and reversibility
  - Use the booking card controls for date and party size if available, then select several time-slot states: available, highlighted-near-target, and disabled
  - Explicitly verify Bella Suora’s disabled slots (17:00 and 21:30) are visually distinct and non-actionable
  - Check whether the sticky booking card remains usable while scrolling through long content
  - Proceed from a chosen slot into guest.html and verify the selected restaurant/date/time/party carry forward
- Exit criteria:
  - All detail tabs have been visited
  - Save toggle and booking controls have been exercised
  - A valid time selection has successfully advanced into guest.html

### Guest details and hold step

- Objective: Validate form completion UX, reservation-summary continuity, and transparency of payment/hold policies before finalizing the booking.
- Target pages: guest.html, payment.html
- Key checks:
  - On guest.html, complete key personal fields and interact with optional controls: at least one dietary option, one occasion option, and special request text entry
  - Observe the special request character counter behavior while typing
  - Check the reservation summary card on guest.html for correctness and readability, including cancel-by timing and card-hold messaging
  - Use the back link once if practical to verify users can recover without losing critical selections, then continue forward again
  - On payment.html, switch between Card, Apple Pay, and Google Pay options if those controls change the UI
  - Fill visible card fields and inspect whether add-ons update the reservation summary or total clearly
  - Verify the no-show fee explanation, authorization amount, and cancellation deadline are understandable and consistent with previous steps
  - Submit Hold the table to reach confirmation.html
- Exit criteria:
  - Guest form has been meaningfully completed and advanced
  - Payment method options and at least one add-on have been exercised
  - Hold submission successfully reaches confirmation.html

### Confirmation and recovery actions

- Objective: Validate booking completion, post-booking reassurance, and recovery options such as modify/cancel/resend.
- Target pages: confirmation.html
- Key checks:
  - Confirm booking success messaging and verify all summary fields render correctly; explicitly inspect the prescan-suspect text around restaurant/time/guest count
  - Try calendar actions (Apple, Google, Outlook) and note whether they behave as visible affordances or dead-end controls
  - Use Resend email and check for immediate confirmation feedback
  - Exercise Modify and Cancel actions to assess whether recovery paths are presented clearly
  - Inspect before-you-go guidance and special-request/dietary recap for consistency with entered data
  - Use recommendation links or Back to discover only after core confirmation actions have been validated
- Exit criteria:
  - Confirmation summary integrity has been checked
  - At least two post-booking actions have been exercised
  - One recovery/control path from confirmation has been inspected

### Mobile-critical pass

- Objective: Repeat the most important booking interactions on mobile to uncover responsiveness, tap-target, and sticky-layout issues.
- Target pages: index.html, restaurants.html, restaurant.html, guest.html, payment.html, confirmation.html
- Key checks:
  - Revisit index.html on mobile and retest search card entry plus at least one suggestion pill, paying attention to stacked layout and already-flagged small tap targets in the header and quick pills
  - On restaurants.html mobile, verify filter rail/access, sort usability, density of result rows, and time-slot tapability
  - On restaurant.html mobile, verify tab navigation, sticky booking card behavior, save toggle access, and disabled slot clarity
  - On guest.html and payment.html mobile, inspect form field spacing, checkbox/radio tap sizes, keyboard flow, and whether the reservation summary crowds primary actions
  - On confirmation.html mobile, validate readability of post-booking actions and any truncation/overlap in summary content
- Exit criteria:
  - Critical booking path has been spot-checked on mobile from discovery through confirmation
  - Known small-tap-target areas from prescan have been visually confirmed or disproven in mobile layout
  - At least one mobile-specific usability issue or reassurance point has been documented for each major funnel stage

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

