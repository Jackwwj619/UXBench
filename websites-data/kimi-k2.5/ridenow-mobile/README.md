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

- The **Payment** and **Account** tabs at the bottom of the screen now actually open their own screens instead of doing nothing. Payment shows your saved cards, active promo codes, and recent charges. Account shows your rider profile and settings like Profile, Safety, Notifications, and Language.
- The **+ Add place** button on the home screen now opens a proper dialog where you can type a label and address, then tap Save to confirm — instead of doing nothing.
- The hamburger menu button (☰) at the top-left of the home screen now opens a menu dialog instead of being decorative.
- After saving a place or closing a dialog, a small toast at the bottom of the phone confirms what happened.
- The hamburger and bell icons at the top of the home screen now have proper screen-reader labels.

## How to test the changes

1. Open `index.html`. Look at the four tabs at the bottom (Ride / Activity / Payment / Account). Tap **Payment** — a Payment screen with saved cards and recent charges should appear. Tap **Account** — a profile screen with settings and support links should appear.
2. Use the back arrow (←) at the top-left of either screen to return to the home screen.
3. On the home screen, scroll the bottom sheet down to "Saved" and tap **+ Add place**. A dialog should appear with Label and Address fields. Type "Gym" in the label and tap **Save** — a toast at the bottom should say "Saved 'Gym'".
4. Tap the **Cancel** button on the dialog (or tap the dimmed background) — the dialog should close without saving.
5. Tap the ☰ button at the top-left of the home screen — a Menu dialog should appear. Tap OK to close it.
