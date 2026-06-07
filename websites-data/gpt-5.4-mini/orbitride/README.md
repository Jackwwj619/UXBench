# OrbitRide

OrbitRide is a demo intercity rideshare / bus booking flow — the kind of site you'd use to compare buses between two cities, pick a seat on a bus diagram, add luggage and extras, and "check out". The whole booking flow lives across seven pages, carrying your trip through each step.

> Fictional product — trips, carriers, payments, and the final confirmation are illustrative.

## What you can do

- **Search a route.** Pick from-city and to-city (with autocomplete), a date, and how many passengers. The landing page also shows three value props and six popular routes.
- **Browse trips.** Eight trip rows show carrier, departure and arrival times, duration, stops, amenities, seats left, and price. Filter by time of day, price slider, or amenities; jump days using the 7-day date carousel.
- **Pick your seats.** A bus seat-map lets you select seats up to the number of passengers, with priority and standard rows, occupied and selected states, and a price box on the side.
- **Add extras.** Luggage stepper for carry-on, checked, and oversized bags per passenger; three add-ons (insurance, priority boarding, SMS updates); sticky summary on the right.
- **Enter passenger details.** One card per passenger (last/first/DOB/student ID/email); passengers 2+ get a "Copy contact from passenger 1" button.
- **Pay.** Three payment methods (card with auto-formatting, PayLite, Apple-Pay-style), promo codes (try `STUDENT10`, `FIRSTRIDE`, `FAMILYPACK`), and a fee breakdown.
- **Confirm.** Booking reference `OR-XXXXXX`, a fake QR, ticket download, plus calendar, email, and manage-booking buttons.

## How to use it

Open `index.html` in any modern browser. Search a route to start, then follow the flow through routes → seats → extras → passengers → payment → confirmation. A 10-minute price-lock countdown runs in the background; let it expire and you'll be sent back to the routes page.

## What was changed in this version

- The six "Popular routes" cards on the home page are now clickable. Each card shows a "BOOK THIS ROUTE" label, highlights when you hover, and jumps you straight into the search results for that pair of cities.
- The seat-picking page now shows a friendly yellow helper note ("Tap available seats on the map — select 2 more to continue") that counts down as you pick seats and turns green with a checkmark once you've picked enough.
- Individual seats on the bus diagram now gently tint when you hover over them, making it clearer which seat you're about to tap.
- The +/- buttons on the luggage steppers (extras page) are bigger and easier to tap, and the surrounding checkboxes and payment-method tiles also have larger touch areas.
- On the confirmation page, the "Add to calendar", "Email me a copy", and "Manage trip" buttons now actually do something visible: each pops up a small message at the bottom of the screen confirming the action, and the email button briefly shows "Sending…" then "Email sent" along with the address it was sent to.
- On phones and narrow windows the top navigation no longer disappears — it now wraps under the logo as a row of large, tappable links instead of vanishing entirely.
- The whole booking flow reflows much more cleanly on small screens: trip cards stack into a single column, the price and "Select" button sit side by side, the passenger form drops to one field per row, and the confirmation ticket centers nicely instead of overflowing.

## How to test the changes

1. Open `index.html` and scroll to "Popular routes". Hover over any card — it should highlight in purple and show "BOOK THIS ROUTE". Click it and you should land on the routes page already filtered to that city pair.
2. Pick any trip on the routes page to reach the seat-picker. Look for the yellow helper note in the right-hand panel: it should say how many more seats you still need. Hover over an empty seat to see it tint, then tap to select. Once you've picked enough seats the note turns green with a checkmark.
3. Continue through to `extras.html` and try the +/- buttons next to luggage — they should be noticeably bigger and easy to tap.
4. Finish the booking and on the confirmation page click "Add to calendar", "Email me a copy", and "Manage trip" in turn. Each should pop up a short message at the bottom of the screen; the email button should also briefly say "Sending…" then "Email sent".
5. Shrink the browser window to phone width. The top nav should reflow into a row of large links under the logo, the trip rows should stack vertically, and the confirmation ticket should center on the page.
