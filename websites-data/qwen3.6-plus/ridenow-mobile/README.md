# RideNow

RideNow is a demo iOS-style rideshare app — the kind of app you'd use to hail a car, watch the driver come to you, and rate them after you're dropped off. The screen simulates a phone (390 × 844) on a desktop and goes edge-to-edge on a real phone.

> Fictional product — the city map, vehicles, driver, and trip are all scripted.

## What you can do

- **Pick where you're going.** The home screen shows a full-bleed dark city map with avenues, a river, a park, your pickup pin (pulsing), and four nearby cars. The bottom sheet has quick destinations (Home / Work / Airport), recent places, and a saved grid.
- **Choose a ride.** Tap the search box to move to the vehicle picker. Four ride options (RideNow / Comfort / XL / Eco) show ETA and price; selecting one updates the dark **Confirm** button at the bottom with the amount in lime green.
- **Watch your driver come.** The tracking screen shows a partially-progressed route with the driver's portion in lime. The car icon nudges every couple of seconds so it feels live. A driver card (initials avatar, 4.96 stars) sits above the chat/call row, with car make and license plate in mono. A four-step progress strip (assigned → on-the-way → trip → drop-off) updates as the trip unfolds. Safety, share, and cancel controls are right there.
- **See your receipt and rate the driver.** A receipt screen shows the trip ID, a from/to summary (with times and 15 min / 5.8 mi / $12.40), a 5-star rating preset to 5 (click any star to change), five tag pills you can toggle, an itemized cost breakdown, and the payment method used.

## How to use it

Open `index.html` in any modern browser. Tap **"Where to?"** to start the flow, pick a vehicle, hit confirm, and watch the tracking screen. Tap a star on the receipt to change your rating; the tag pills toggle independently.

## What was changed in this version

- **Cancelling a ride now asks you to confirm.** Tapping "Cancel" on the tracking screen used to jump straight to the receipt. It now slides up a confirmation sheet asking why, with reason options (driver taking too long, wrong pickup, booked by mistake, other), a warning about a possible cancellation fee, and "Keep ride" / "Cancel ride" buttons. Tapping outside the sheet or "Keep ride" dismisses it.
- **The "Home" and "Work" shortcuts on the bottom sheet now do something.** Tapping a saved place jumps you straight into the vehicle picker, just like typing into the search box.
- **"+ Add place" gives clear feedback.** Instead of doing nothing silently, it now shows a small "Add place — coming soon" message at the bottom of the screen.
- **The Payment and Account tabs at the bottom are visibly disabled.** They're now greyed out and tapping them surfaces a small "Payment is coming soon" / "Account is coming soon" message, so it's obvious they're placeholders rather than broken.
- **Friendly toast messages.** A small dark pill briefly appears near the bottom of the screen to confirm actions like "Ride cancelled" or "Glad you're staying", instead of changes happening silently.
- **Bigger, easier-to-tap controls everywhere.** Back buttons, share buttons, the safety/share/cancel row on the tracking screen, ride-type pills, saved-place cards, the map's search bar and round map buttons, and the bottom tabs are all sized to be comfortable to tap on a touchscreen.
- **Better screen-reader labels.** The bottom tabs and the cancel dialog now describe themselves clearly to assistive technology.

## How to test the changes

1. Open `index.html`. On the home screen, tap the "Home" or "Halcyon Studio" saved place under the search bar — you should land on the vehicle picker straight away. Tap "+ Add place" and a small "Add place — coming soon" message should briefly appear near the bottom of the screen.
2. From the vehicle picker, tap Confirm to reach the tracking screen, then tap "Cancel". A sheet should slide up from the bottom asking you to confirm. Pick a reason (the chosen one highlights in lime), then tap "Keep ride" — the sheet closes and a small "Glad you're staying" message appears.
3. Open the cancel sheet again and this time tap the red "Cancel ride" button — you should see a "Ride cancelled" message and the receipt screen should appear.
4. On any screen, look at the bottom tab bar. "Payment" and "Account" should look dimmed. Tap them — they should not switch screens but should show "Payment is coming soon" / "Account is coming soon" messages.
5. Try tapping the small round buttons (back arrow on the vehicle picker, share button on tracking, the safety/share/cancel buttons, the round map icons on the home screen) — each should feel comfortably large to tap, especially on a touchscreen or narrow window.
