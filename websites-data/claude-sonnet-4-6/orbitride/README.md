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

- Trips that arrive after midnight now show a "+1" marker next to the arrival time and the words "arrives next day", so it's obvious you'll cross into the next day.
- Filters on the routes page now have a "Clear all" link and a count badge showing how many filters are active. On narrow screens, filters collapse behind a "Filters" toggle button.
- The Wi-Fi filter is no longer pre-ticked, so you see every available trip by default.
- The luggage steppers on the extras page have bigger +/- buttons and the number is editable directly with the keyboard, with clear screen-reader labels like "Increase checked bags for Passenger 2".
- The "Copy contact from passenger 1" button now stands out as a proper button (with a border) and clearly says it copies both email and phone.
- Required fields on the passenger and payment pages are now marked with a red asterisk. Submitting an incomplete form shows a red banner at the top and highlights the exact fields that are missing, instead of a generic browser alert.
- The card form on payment now hides itself when you choose PayLite or Apple-Pay-like, with a friendly note explaining the next step.
- Email validation is now stricter on the booking-contact field, so typos like "alice@" are caught.
- Buttons, radio buttons, and checkboxes throughout the flow are larger and easier to tap on phones, and many small layouts now stack into a single column on small screens.

## How to test the changes

1. Open `index.html`, search any route, and on `routes.html` look at any trip whose arrival is "earlier" than its departure — it now shows a "+1" badge.
2. Adjust the price slider or tick a couple of amenities — the new badge next to the Filters heading should show the count. Click "Clear all" to reset. Shrink the browser to phone width and the filters should collapse behind a "Filters" button.
3. Pick a trip and a seat, continue to `extras.html`. Use the +/- buttons on Checked bags, and try typing a number directly into the box.
4. Go through to `passengers.html`. Try to click Continue with the first/last name blank — you should now see a red banner and red field highlights instead of a popup alert. Add a second passenger and use the new outlined "Copy contact from passenger 1" button.
5. On `payment.html`, switch between Card, PayLite, and Apple-Pay-like — the credit-card form should hide for the wallet options. Try paying with empty fields to see field-level error messages.
