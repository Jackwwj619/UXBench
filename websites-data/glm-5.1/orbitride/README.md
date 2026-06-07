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

- The "Routes" link in the top bar now actually opens the routes page, and the "Help" and "Sign in" links politely tell you they're coming soon with a small popup instead of doing nothing.
- Checkboxes, radio buttons, and the +/- stepper buttons throughout the flow are bigger and easier to tap, with comfortable spacing so they're friendlier on phones.
- Screen readers now announce things like "Increase Passenger 2 checked bags quantity" when you use the luggage steppers, and the count updates out loud as you change it.
- The "Copy contact from passenger 1" button now lives on its own line, briefly highlights the email and phone boxes in yellow after copying, and shows a small confirmation message at the bottom — or warns you if passenger 1 has no contact details yet.
- The payment form has proper autofill hints (so your browser can fill in card name, number, expiry, CVC, and ZIP), and the expiry/CVC/ZIP boxes now stop you from typing past the right number of digits.
- Submitting the payment form with bad or missing details now shows a clear red message right under the broken field — like "Use MM/YY format" or "Enter a 3 or 4 digit CVC" — instead of a generic browser popup, and the page scrolls to the first problem field.
- If you pick PayLite or the Apple-Pay-style option, the booking now skips the card form and goes straight to confirmation instead of asking for card details.
- The whole flow rearranges itself for small screens — the search box, trip rows, passenger fields, and card form all stack into a single column so nothing gets squashed or scrolls sideways.

## How to test the changes

1. Open `index.html`. Click the "Help" and "Sign in" links in the top bar — each should show a small "coming soon" message at the bottom of the screen. Click "Routes" and it should take you to the routes page.
2. Resize the browser window to phone width on `index.html` and `routes.html` — the search card, trip rows, and filter sidebar should reflow into a single column with comfortable spacing.
3. Pick a trip, choose a seat, and continue to `extras.html`. The +/- buttons on luggage rows should feel large and easy to tap. Tab through them with the keyboard to confirm the labels announce which passenger and bag type they affect.
4. Continue to `passengers.html`, add a second passenger, leave passenger 1's email and phone blank, then click "Copy contact from passenger 1" — you should see a warning message. Fill passenger 1's email and try again — the email/phone fields on passenger 2 should briefly flash yellow and a confirmation message appears.
5. Go to `payment.html` and try to submit with empty card fields — you should see red error messages under each broken field instead of a popup. Then choose PayLite or the Apple-Pay-style option and click pay; you should go straight to the confirmation page without filling in card details.
