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

- The seat map is now fully keyboard-accessible. You can Tab through the seats and press Enter or Space to select or deselect one, each seat announces "Seat 5B, window, available" (or "occupied, unavailable") to screen readers, and the currently focused seat shows a clear purple outline.
- The Pay button on `payment.html` no longer just throws a generic alert when fields are missing. The form now highlights each empty card field in red with a "This field is required" message under it, shows a summary error above the Pay button, and scrolls focus to the first missing field.
- Picking PayLite or Apple-Pay-like on payment now hides the credit-card form and shows a short note explaining you'll be redirected to that wallet after you press Pay — so you don't have to fill in a card number that isn't going to be used.
- The luggage steppers now accept direct keyboard input. You can type a number into the box (or use the arrow buttons), and the value is clamped to the per-bag min/max when you leave the field. The +/− buttons are also bigger (44×44) for comfortable tapping.
- Passenger-details inputs now have proper `autocomplete` hints (given-name, family-name, email, tel), so browser autofill works correctly across the form.
- Passenger inputs all have `for`/`id` pairings, so taps on a label focus the right field and screen readers announce each field correctly.
- The whole booking flow now adapts to phones — trip rows stack vertically with the price/Select button below, the seat map and extras pages stack their columns, and the card form rearranges to a single column on narrow screens.
- The "promo Apply" button now has `type="button"`, so pressing Enter in the promo box doesn't accidentally submit the payment form.

## How to test the changes

1. Open `seats.html` from the booking flow. Tab through the bus diagram — each seat shows a purple focus ring. Press Enter or Space to toggle a seat; press it again to deselect. Tabbing past an occupied seat skips activation cleanly.
2. Open `payment.html` and click "Pay" without filling anything in — the cardholder name, card number, expiry, CVC, and zip fields all turn red with inline error messages, a summary "Please complete the highlighted fields" appears, and focus jumps to the first empty field.
3. On `payment.html`, click "PayLite" — the card form disappears and a purple-tinted box says you'll be redirected to PayLite after pressing Pay. Try Pay — it now submits without complaining about card fields.
4. On `extras.html`, focus a luggage stepper input and type a number directly (try 7) — when you click out, the value clamps to the per-bag maximum.
5. On `passengers.html`, start typing into the First name field — the browser's autofill suggestions for given names appear instead of generic ones.
6. Shrink the browser to phone width on `routes.html` — each trip row stacks: carrier on top, amenities wrapping, then price and the Select button side by side at the bottom.
7. On `payment.html` at phone width, the credit-card grid collapses to a single column and the payment-method tiles stack.
