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

- The **Payment** and **Account** tabs at the bottom now actually open their own screens (saved cards, Apple Pay, an active promo, recent charges, and an account profile with referral / saved-places / safety / help / settings rows) instead of doing nothing.
- Tapping **Cancel** on the tracking screen now asks "Cancel this ride?" in a confirmation sheet with "Keep ride" and "Yes, cancel" buttons, so you can't end a ride by accident.
- Tapping **Share trip** now opens a small sheet with Messages, Email, and Copy link options, instead of doing nothing.
- Tapping **Safety** now confirms with a brief "Safety tools opened" message so you know the button worked.
- Tapping **+ Add place** in the saved-places grid now opens a "Save a place" sheet with Label and Address inputs and a Save button, instead of doing nothing.
- Selecting a tag pill on the receipt ("Friendly", "Clean car", etc.) now flashes a brief confirmation like "Friendly added" at the bottom.
- Back buttons, the share button, the route-row arrow, the map icons, and the receipt's tag pills are all larger and easier to tap on a real phone.
- Modals (Cancel / Share / Add place) can be dismissed by tapping the dark area outside them.

## How to test the changes

1. Open `index.html`. Tap the **Payment** tab at the bottom — you should land on a Payment Methods screen with Visa · 4242, Mastercard, Apple Pay, an "+ Add payment method" button, an active WEEKEND5 promo, and three recent charges. Use the back arrow to return.
2. Tap the **Account** tab — you should see "Jamie Moreno · ★ 4.92 rider" and a five-row list (Refer a friend, Saved places, Safety preferences, Help & support, Settings).
3. Tap **"Where to?"** on Home, pick a ride, hit Confirm. On the tracking screen, tap **Cancel** — a sheet should slide up asking "Cancel this ride?" Tap "Keep ride" and the sheet closes. Tap Cancel again, then "Yes, cancel" — a small "Ride canceled" toast appears and you go to the receipt.
4. Go back to tracking. Tap **Share trip** — a sheet with Messages / Email / Copy link opens. Tap any option — it closes and shows "Trip link shared".
5. Tap **Safety** on the tracking screen — a small "Safety tools opened" toast briefly appears.
6. On Home, scroll the bottom sheet to the saved grid and tap **+ Add place**. A sheet appears. Try Save with blank inputs — you get "Add a label and address". Fill in "Gym" and "123 Pine St" and Save — the sheet closes and a "Saved 'Gym'" toast appears.
7. On the receipt screen, tap a tag pill like "Friendly" — a brief "Friendly added" toast confirms it.
8. On any modal sheet, tap the dark area outside it — the sheet should close.
