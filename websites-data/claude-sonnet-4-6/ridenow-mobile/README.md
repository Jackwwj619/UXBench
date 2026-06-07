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

- The top-left menu (☰) button now opens a side drawer with your profile, payment methods, promotions, trip history, settings, and help.
- The **Cancel** button on the tracking screen now pops up a confirmation sheet warning about a $5.00 cancellation fee, so you can't end a ride by accident.
- The **Safety** button now opens a panel with an Emergency / Call 911 option, share-trip-status, and a safety line.
- The **Share trip** button now shows a confirmation that the trip link has been copied.
- The **Message** (💬) button shows a "open chat" confirmation, and the **Call** (📞) button is now a real phone link.
- The Confirm Ride button now shows the original price crossed out next to the discounted price, with an "incl. promo" tag so you can see how much you're saving.
- Saved-place buttons (Home / Halcyon Studio) on the home screen now move you forward to the vehicle picker just like the search box does.
- The bottom **Payment** and **Account** tabs are marked "Soon" and show a small confirmation when tapped (they previously did nothing silently).

## How to test the changes

Open `index.html` in any modern browser. From the home screen, tap the **☰** icon in the top-left to see the new side menu. Tap **"Where to?"** then pick a vehicle to see the new crossed-out original price on the Confirm button. After confirming, on the tracking screen try **Cancel** to see the new confirmation, **Safety** to open the safety panel, and **Share trip** / 💬 / 📞 to see the new feedback messages. Try tapping **Payment** or **Account** in the bottom tab bar to see the "coming soon" hint.
