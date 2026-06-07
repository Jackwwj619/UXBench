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

- Quick destinations, recent places, and saved tiles now actually carry their destination through. Tapping "Work", "PDX Airport", or a recent place updates the route card on the next screen with that address instead of always showing "Bella Suora · 1142 NW Marshall".
- The "Edit" button on the vehicle picker now returns to the home screen and focuses the destination input, so you can change where you're going without back-tracking by hand.
- The "Cancel ride" button on the tracking screen now actually cancels: it returns you to the home screen and shows a confirmation toast.
- The "+ Tip" pill on the receipt now opens a real tip panel with $2 / $3 / $5 and Custom options. Picking an amount confirms the tip with a polite live message; the toggle pill also reflects its open/closed state with `aria-expanded`.
- All the emoji icons (menu, search, bell, share, phone, chat, back arrows, tab bar) were replaced with proper SVG icons so they render consistently across browsers and operating systems instead of falling back to platform-specific glyphs.
- Icon-only buttons (menu, notifications, share, message driver, call driver, back, share) now have descriptive `aria-label`s so screen readers announce what each does.
- The tag pills no longer fire two clicks at once — the "+ Tip" toggle is wired up separately from the generic feedback pills, so opening the tip panel doesn't accidentally also mark the chip as selected.

## How to test the changes

1. Open `index.html`. Tap "Work" or "PDX Airport" from the home sheet — the next screen's route card now reads "Halcyon Studio · 2200 NW Pettygrove" or "PDX Airport · 7000 NE Airport Way" instead of the default Bella Suora address.
2. From the vehicle picker, tap "Edit" on the route card — you return to home with the "Where to?" input focused.
3. Start a ride, then on the tracking screen tap "Cancel" — you go back to home and a small toast at the bottom reads "Ride canceled".
4. On the receipt screen, tap the "+ Tip" pill — a tip panel slides in with $2 / $3 / $5 / Custom. Pick "$3" and a live status line confirms "$3.00 tip added — thanks!". Pick "Custom" to type an amount.
5. Hover or focus any icon button (menu, notifications, share, phone) — the tooltip / screen-reader text now names the action.
6. Compare any screen on Windows vs macOS — the bell, search, back arrow, and tab-bar icons render identically because they're SVGs, not emoji.
