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

- The destination you pick (Home, Work, Airport, a recent place, or a saved spot) now actually carries through to the route card, the tracking screen, and the receipt — instead of always saying "Bella Suora".
- The ride tier you choose (RideNow / Comfort / XL / Eco) and its price now show up on the tracking screen and the final receipt total, instead of always showing the default.
- The Cancel button on the tracking screen now opens a confirmation sheet explaining there's no fee and what happens next. Confirming jumps you to a "Trip canceled" receipt variant with a red banner, no rating section, and "not charged" instead of "charged on completion".
- The Safety button now opens a real safety toolkit sheet with Call 911, the RideNow Safety Line, ride verification details, and "Share live location".
- The Share trip button (and the share icon in the tracking header) now opens a sheet to send your live trip to a contact like Alex or Sam, or copy a link.
- The Share button on the receipt now opens a sheet to email the receipt or copy a link.
- The chat (💬) and call (📞) buttons on the driver card now open sheets — chat offers quick replies like "I'm coming out now"; call explains numbers are masked and lets you confirm.
- The Edit button on the vehicle-picker route card now lets you switch destination from a list (Bella Suora, Powell's Books, Mt. Tabor, PDX Airport), with a checkmark next to the current one.
- The Visa and Promo cards on the vehicle picker now open sheets — Visa lets you see other saved cards; Promo explains the active code.
- The "+ Tip" pill on the receipt now opens a tip picker ($2 / $3 / $5 / Other) and the pill updates to show the tip you added.
- The Payment and Account tabs in the bottom tab bar now open content sheets instead of doing nothing.
- The hamburger menu (top-left on home) and the bell icon now open menu and notifications sheets.
- Most actions (rating a star, toggling a tag pill, adding a tip, sharing) now show a brief toast confirming what just happened.
- Buttons across the app are larger and have a satisfying press-down feedback when you tap them.

## How to test the changes

1. Open `index.html`. On the home screen, tap the "Home" quick-destination button — you're taken to the vehicle picker and the route card reads "3617 NE Going St" → "Home". Pick XL — the confirm button shows "Confirm XL · $22.80".
2. Tap Confirm. The tracking screen now shows "XL · $22.80 · to Home" in lime under the ETA.
3. Tap the cancel button at the bottom of the tracking screen. A sheet slides up explaining there's no fee and what happens. Tap "Cancel ride" — you're taken to a "Trip canceled" receipt with a red banner; no rating section, no bill.
4. Back to home. Tap "PDX Airport" then pick Comfort. Continue to tracking. Tap the 🛡 Safety button at the bottom — a sheet appears with Call 911, Safety Line, ride verification, and Share live location.
5. On the tracking screen, tap the 💬 button on the driver card. A sheet appears with quick replies. Tap one — a toast confirms it was sent.
6. Tap the 📞 button. A sheet explains the call is masked. Cancel or call.
7. Tap "📍 Share trip". A sheet lets you pick a contact or copy a link.
8. Tap the up-arrow share button in the top-right of the tracking header — it opens the same share sheet.
9. Go back to the vehicle picker (left arrow). Tap Edit on the route card — a list of destinations appears with a checkmark next to the current one. Pick another — the route card updates and a toast confirms.
10. On the vehicle picker, tap the Visa card and then the Promo card — each opens a small sheet with details.
11. Go through to a normal receipt. Tap "+ Tip" — a picker opens with $2 / $3 / $5 / Other. Pick one — the pill becomes "Tip: $3" and a toast confirms.
12. Tap the up-arrow on the receipt header — a sheet lets you email or copy the receipt.
13. Tap the Payment tab in the bottom tab bar — a sheet shows payment methods, promos, and recent charges. Tap the Account tab — a sheet shows your profile.
14. On the home screen, tap the hamburger button (top-left) — a menu sheet opens. Tap the bell — a notifications sheet opens.
15. Tap any star on the receipt — a toast confirms how many stars you submitted.
