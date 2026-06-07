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

- **Bigger, easier-to-tap seats.** Seats on the bus diagram are larger and have a generous invisible tap area around each one, so they're much easier to hit on a phone. Hovering or tapping a free seat now also gives a subtle colour cue.
- **Friendlier "too many seats" message.** If you try to pick more seats than you have passengers, the page now shows a small floating message at the bottom of the screen instead of a system pop-up.
- **Continue button explains what's missing.** On the seat page, the Continue button stays visible (just dimmed) until you've picked the right number of seats. Tapping it tells you exactly how many more seats to pick (or remove), and the button gently shakes for attention.
- **Smarter "Copy contact" button.** On the passengers page, the "Copy contact from passenger 1" button now has an icon, briefly changes to "Copied ✓" after you click it, and tells you up front if passenger 1 hasn't filled in an email or phone yet.
- **Optional phone field for extra passengers.** Passengers 2 and onward now have an optional Phone field as well as Email, so you can capture both when copying contact details.
- **Phone-friendly trip list.** On narrow screens, each trip in the routes list stacks into a single column with the price and "Select" button on their own row, making everything readable without sideways scrolling.
- **Larger touch targets across the flow.** Top-bar links, checkboxes, the brand logo, and small action links all have bigger tap areas to make the booking flow comfortable on a phone.

## How to test the changes

1. Open `index.html`, search any route, and open the seat-picker. Try tapping seats on a phone-sized window — the seats should feel bigger and easier to hit. Try selecting one more seat than your passenger count; a small dark message should slide up from the bottom instead of an alert pop-up.
2. With fewer seats picked than passengers, click Continue: the button shakes and a message tells you how many more seats to select. Pick the right number and Continue should work normally.
3. Continue through to the passengers page. Add a second passenger, leave passenger 1's email and phone empty, then click "Copy contact from passenger 1" — you should be told to fill in passenger 1 first. Fill them in and click again; the button briefly says "Copied ✓".
4. Resize the browser window to phone width on the routes page — each trip row should stack vertically with the price and Select button on their own line.
5. On a phone-sized window, try tapping links in the top bar and the checkboxes in the filters; the tap targets should feel comfortably large.
