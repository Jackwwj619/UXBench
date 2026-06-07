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

- On the seat-picking page, trying to select more seats than passengers no longer pops up a browser alert. Instead, a friendly red message appears next to the seat list and disappears when you deselect a seat.
- Seats on the bus diagram can now be picked using the keyboard (Tab to a seat, then Enter or Space) and read out their location and status to screen readers.
- The passenger details page now shows a red banner at the top if you try to continue with a missing first name, last name, or email — and jumps your cursor straight to the field that needs fixing, instead of a popup alert.
- The payment page replaces the old browser alert with an inline red error message that tells you exactly which fields (cardholder name, card number) need to be filled before you can pay.
- On the confirmation page, the **Add to calendar** and **Email me a copy** buttons now actually respond: they turn green with a checkmark and show a confirmation message naming the date or email address. **Manage trip** shows a polite note that it isn't available in the demo.
- All form fields (search, passenger details, card, promo) now have proper labels and autofill hints, so your browser's saved info fills in correctly.
- On phone-sized screens, results, the passenger form, the card form, and the confirmation buttons all stack into a single column and the buttons become tall enough to tap comfortably.

## How to test the changes

1. Open `index.html`, search any route, and pick a trip. On the seats page, try to select more seats than the number of passengers — a red message appears beside the seat list instead of a popup.
2. On the seats page, press Tab until a seat is highlighted, then press Enter or Space to select it.
3. Go through to `passengers.html`. Click "Continue to payment" with a blank first or last name — a red banner appears at the top and the empty field is focused.
4. On `payment.html`, leave the cardholder name and card number blank and click Pay. A red message appears under the form telling you what's missing.
5. Complete a booking. On the confirmation page, click **Add to calendar** and **Email me a copy** — each button turns green and a small message confirms the action. Click **Manage trip** to see the demo notice.
6. Shrink the browser window to phone width. The trip rows, passenger cards, card form, and confirmation buttons should each stack vertically with comfortably tall buttons.
