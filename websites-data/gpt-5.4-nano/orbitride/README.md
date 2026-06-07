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

- The routes page now shows a count of how many trips match your filters (e.g. "5 trips match"), along with small pill chips listing the filters you currently have on.
- When no trips match, the empty message is friendlier and suggests widening the price range or removing an amenity.
- The result list briefly flashes when filters are reapplied, so it's easy to see the list refreshed.
- On the seat-picker page, a helper line tells you how many more seats you need to pick to continue, and turns green once you're done.
- On the confirmation page, the "Add to calendar", "Email me a copy", and "Manage trip" buttons now actually do something — they pop up small toast notifications, and "Manage trip" opens a panel explaining what you can change.
- Buttons, checkboxes, date pills, and links throughout the site are bigger and easier to tap on a phone, and the routes page now stacks into a single column on narrow screens.

## How to test the changes

1. Open `index.html`, search a route, and go to `routes.html`. Adjust the price slider or tick a couple of amenities — a row above the results now shows pill chips for each active filter and the words "X trips match".
2. Drag the price slider down very low so nothing matches — instead of a flat "no trips" line you'll see a friendlier message suggesting changes.
3. Tick or untick a filter and watch the trip list briefly flash to confirm it refreshed.
4. Pick a trip and go to `seats.html`. The line under the bus reads "Select 2 more seats to continue"; click seats and watch it count down, then turn green when full.
5. Complete the booking through to `confirmation.html`. Click "Add to calendar" and "Email me a copy" — small confirmation toasts appear. Click "Manage trip" — a panel opens explaining what you can change.
6. Resize the browser to phone width on `routes.html` — each trip row now stacks neatly into a single column, and buttons feel comfortably large to tap.
