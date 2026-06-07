# Brewlog

Brewlog is a demo iOS-style mobile app for coffee enthusiasts who want to keep notes on every cup they brew at home — dose, yield, grind, time, score, and tasting notes. The screen is laid out as a phone, so use it on your laptop and it'll show you the device frame; open it on a real phone and it goes edge-to-edge.

> Fictional app — entries you create aren't saved between sessions.

## What you can do

- **See today's brews.** The Today tab shows a summary card ("2 brews · 32g coffee · avg 8.2") and stacked cards for every brew today and yesterday with dose, yield, time, temp, score, and tasting-note pills.
- **Log a new brew.** Pick a brewing method (Espresso, V60, Aeropress, Chemex, Moka, French press), choose which bean you used, enter dose and yield (the brew ratio updates live), set time, grind size, score, and check off any tasting notes you picked up. Save and you're back on the Today tab.
- **See your trends.** The Stats tab shows total brews, average score, coffee used, and estimated cost over a range you choose, plus a 14-brew trend chart, the mix of methods you've been using, a tag cloud of tasting notes, and which beans you reach for most.
- **Manage your beans.** The Beans tab lists what you have on hand with stock levels, roast dates, days since roast, and a star rating. Low-stock beans get a "running low" warning; finished beans show a Reorder action; fresh beans get a "new" badge. Tap **Brew** on any bean to start a new entry with it pre-filled.

## How to use it

Open `index.html` in any modern browser. Use the bottom tab bar (Today / Add / Stats / Beans) to move around. On the Add screen, the dose and yield fields update the brew ratio as you type, and the score row only lets you pick one number at a time. The Save button flashes green when an entry's recorded.

## What was changed in this version

- The Stats tab's "Last 7 days / 30 days / This year" dropdown now actually changes the numbers and the trend chart, instead of just being decorative.
- The search box on the Beans tab now actually filters the list. As you type, beans that don't match fade away, a small line shows "X of 5 beans match", and an empty card appears if nothing matches.
- The **Brew** and **Reorder** buttons on each bean now visibly respond when tapped — they turn green and briefly show "Started" or "Added" so you can see it worked. Tapping **Brew** also jumps you to the Log-a-brew screen.
- The Save button on the brew form now goes through a clear "Saving…" → green "✓ Saved" sequence (and disables itself in the middle so you can't double-tap), instead of switching states instantly.
- The score row (1–10) is now a proper grid of larger, two-row buttons that are much easier to tap on a phone, and the chosen score is more obviously highlighted with a soft shadow.
- Tasting-note chips now flip to a clear filled-brown style with a check mark when ticked, so it's obvious which notes you've selected — not just a subtle outline change.
- Method tiles (Espresso, V60, etc.), the back button, score pills, tasting-note chips, and the tab bar at the bottom are all bigger, with more tap area and a visible "pressed" state.
- Form fields like Dose, Yield, Time, and Bean now have proper text labels for screen readers, and the time field is clearly labelled "minutes : seconds".

## How to test the changes

1. Open `index.html` and tap the **Stats** tab. Change the dropdown in the top-right from "Last 7 days" to "Last 30 days" and then "This year" — the four tiles (brews, avg score, coffee used, est. cost) and the trend chart underneath should change each time.
2. Tap the **Beans** tab. Type `Brazil` into the search box — only beans matching that origin should remain visible, and the small grey line under the search box should read e.g. "1 of 5 beans match 'Brazil'". Clear the box and try `xyz` — you should see a friendly "No matching beans" card.
3. On any bean row, tap the **Brew** button — it should briefly flash green showing "✓ Started", and then jump you to the Log a brew screen. On a finished bean, tap **Reorder** — it should flash green with "✓ Added" but stay on the Beans tab.
4. Tap the **Add** tab. Tap any number in the score row (1–10) — the chosen number should be brown / white with a clear shadow. Tap a few tasting-note chips ("Cocoa", "Caramel"…) — they should turn fully brown with a tick.
5. Fill out a brew and tap the big brown Save button — watch it change to a brown "Saving…" state, then a green "✓ Saved", before returning to the Today tab. Try tapping it twice quickly to confirm the second tap is ignored.
6. On the Log a brew screen, try clicking the small round back-arrow at the top-left — it should be noticeably larger and easier to hit than before.
