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

- The hamburger and bell icons in the top of the home screen are no longer decorative — tapping them now slides up a real menu sheet (Profile / Trip history / Promotions / Settings / Help) or a notifications sheet, with a dimmed backdrop you can tap to dismiss. The bell also shows a small red dot indicating unread notifications.
- The "+ Add place" tile in the saved-places grid now opens a sheet listing options (Home / Work / School / Custom address) instead of doing nothing.
- The "Edit" button on the vehicle picker now opens an edit-trip sheet showing pickup, destination, "Leave now", and "Add a stop", instead of doing nothing.
- The share button on the receipt screen now opens a share sheet (Email / Messages / Copy link / Download PDF) instead of doing nothing.
- The "Payment" and "Account" tabs at the bottom of the screen now react when tapped — they highlight as active and show a quick toast confirming what they would do, instead of being silent dead buttons.
- The active tab in the bottom bar now has a clear lime-green pill background, not just a slight colour shift, so the current section is obvious.
- The star rating and tag pills on the receipt now show a small confirmation line ("Rated 4 stars · saved" or "Selected: Polite, Clean car") so you know your tap registered.
- The "Done" button on the receipt now shows a quick "Trip saved · Thanks for riding!" toast before bouncing you back to the home screen.
- All the small round buttons (back arrow, share, hamburger, bell, "›" arrows on recent places) are now bigger, with subtle hover and press animations so they feel tappable instead of static.
- The star buttons are larger and easier to tap, and the rating-tag pills have more padding so you don't mis-tap them.

## How to test the changes

1. Open `index.html`. On the home screen, tap the hamburger (☰) in the top-left — a "Menu" sheet should slide up from the bottom with Profile / Trip history / Promotions / Settings / Help. Tap the dimmed area outside the sheet to close it.
2. Tap the bell icon (top-right) — it should show a small red dot, and tapping it should open a "Notifications" sheet.
3. Scroll the bottom sheet on the home screen and tap "+ Add place" in the saved grid — an "Add a saved place" sheet should slide up.
4. Tap the search box "Where to?" — you should go to the vehicle picker. Tap the "Edit" button next to the trip points — an "Edit trip" sheet should appear.
5. Pick a vehicle (e.g. Comfort) and tap Confirm to go to tracking, then tap the Activity tab at the bottom to view the receipt.
6. On the receipt, tap the share button (⤴) in the header — a "Share receipt" sheet should slide up with Email / Messages / Copy link / Download PDF.
7. Tap any of the 5 stars on the "Rate driver" card — a small line below the tags should say "Rated N star(s) · saved". Tap a few tag pills (Polite, Smooth ride, Great convo) — the same line should update to "Selected: Polite, Smooth ride, …".
8. Tap "Done" at the bottom — a brief "Trip saved · Thanks for riding!" toast should appear before you're returned to the home screen.
9. Tap the Payment and Account tabs at the bottom — each should highlight as the active tab (with a lime background) and show a brief toast describing what it would do.
