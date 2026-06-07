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

- The trip results page now shows a summary line above the list ("3 of 8 trips match") with small clickable chips for each active filter — click a chip to remove that filter.
- When the filters narrow the list, a friendly note appears if every shown trip already includes the amenities you ticked, so you know the filter isn't actually hiding anything.
- The seat picker page now shows your trip details (cities, date, departure/arrival times, carrier) in a colored banner above the seat map, so you can confirm you're booking the right trip.
- The luggage steppers on the extras page have larger plus/minus buttons that are easier to tap, and the number is editable directly from the keyboard.
- The luggage price hint for checked bags now reads "1st $9, then $14 each" instead of the cryptic "$9 / $14 / $14…".
- Required fields on the passenger form (first name, last name, contact email) are now marked with a red asterisk. If you try to continue with anything missing, a red banner lists exactly which fields are blank, and each missing field is outlined in red with an inline "Required" message — no more generic browser pop-up.
- The payment page now shows a row of trust badges (256-bit SSL, PCI-DSS compliant, card details never stored) and a short note about the processing fee.
- The buttons on the confirmation page ("Add to calendar", "Email me a copy", "Manage trip") now actually do something — each one pops up a small toast message confirming the action.
- If you click the OrbitRide logo while in the middle of a booking, you now get a confirmation prompt before being taken back to the home page, so you don't lose your progress by accident.
- Buttons throughout the flow are taller and have larger tap targets, and most pages now stack into a single column on phone-sized screens.

## How to test the changes

1. Open `index.html`, search any route, and on the trip results page tick the Wi-Fi amenity. Above the list you'll see "X of 8 trips match" with a Wi-Fi chip — click the chip's ✕ to remove the filter.
2. On the same page, drag the price slider down and notice a "Max $X" chip appears in the summary; click it to reset.
3. Pick any trip and continue to seat selection — at the top of the seat map you'll see a colored banner with your route, date, times, and carrier.
4. Continue to the extras page. Try the bigger +/- buttons next to "Checked bags", then click into the number and type a value directly.
5. Continue to the passenger details page. Click Continue with the first or last name field blank — a red banner appears at the top listing the missing fields, and each empty field gets a red outline with "Required" underneath.
6. Continue to payment — at the top of the page, look for the green trust badges and the processing-fee note.
7. Finish the booking. On the confirmation page, click "Add to calendar", "Email me a copy", and "Manage trip" — each shows a small dark toast at the bottom of the screen.
8. From any page in the booking flow, click the "OrbitRide" logo in the header — a confirmation dialog asks whether you really want to leave checkout.
9. Shrink the browser window to phone width — search forms, trip rows, and luggage rows should stack into a single column with larger tap targets.
