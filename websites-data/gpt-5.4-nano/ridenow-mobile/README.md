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

- Tapping any saved place (Home, Halcyon Studio) or recent place (Bella Suora, Powell's Books, Mt. Tabor Park) now writes that name into the destination pill on the next screen and pops up a small "Selected …" confirmation, so it's clear what you picked.
- Buttons that previously did nothing visibly — the hamburger, the bell, the **Edit** destination button, **Add place**, **Safety**, **Share trip**, the message and call icons on the driver card, the share icon on the receipt — now show a short confirmation message at the bottom of the screen so you know your tap was registered.
- The Payment and Account tabs at the bottom now visibly highlight when tapped and show a short "Coming soon" message instead of silently doing nothing. If a popup sheet is in the way they tell you to close it first.
- Tapping a star on the receipt now pops up a "Rated 4 stars" (or however many) confirmation, and the tag pills now show a clear check mark when active plus a "Added: Friendly" or "Removed" message when toggled.
- Every tappable button now responds with a small press animation so it feels physical, and a green chat/call button gives a flash of lime when held.
- All buttons (back, share, message, call, stars, safety, route edit, tag pills) are at least 44 pixels tall and wide — the standard comfortable size for thumbs — so they're much easier to hit without missing.
- The driver chat and call icons now have screen-reader labels ("Message driver", "Call driver") instead of just emoji.

## How to test the changes

1. Open `index.html` in any modern browser, or load it on a phone.
2. On the home screen, tap **Bella Suora** in the recent list — the app should move to the vehicle picker, the destination pill should now read "Bella Suora · saved place", and a small "Selected Bella Suora" toast should briefly appear at the bottom.
3. Go back home and try the same with the saved **Home** and **Halcyon Studio** tiles — same behaviour with the right label.
4. Tap the hamburger (☰) and the bell (🔔) on the home map — each should show a short toast ("Menu" / "No new notifications").
5. On the vehicle picker, tap **Edit** on the route card — a "Edit destination" toast should appear. Pick a vehicle and continue.
6. On the tracking screen, tap the message (💬), call (📞), 🛡 Safety, and 📍 Share trip buttons — each should show a confirmation toast. Tap the up-arrow share button at the top — same thing.
7. Tap the **Payment** or **Account** tab at the bottom — that tab should light up with a lime tint and a "Payment · coming soon" toast should appear (if a sheet is open, it should tell you to close it first).
8. Reach the receipt screen, tap a different star — the stars should fill up to that one and a "Rated 3 stars" toast should appear. Tap a tag pill (e.g. "Friendly") — it should show a check mark and a "Added: Friendly" toast; tap it again to see "Removed".
9. Tap any button anywhere — you should feel a quick "press" animation as it scales down briefly.
10. Try the app on a real phone (or a narrow window) — all buttons should be comfortable to tap without zooming in.
