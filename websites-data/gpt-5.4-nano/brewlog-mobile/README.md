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

- The "Brew method" heading now shows the name of the currently selected method next to it (e.g. "Brew method  V60"), so you always know which one is picked.
- Each brewing-method card now has a small check mark in the corner when chosen, and selected cards stand out more strongly with a thicker border and a soft glow.
- The "Score" heading now shows the currently picked number (e.g. "Score  8 / 10") and the score pills are larger and easier to tap.
- The big Save button is bigger, more prominent, and briefly turns green and disables itself for a moment after you tap it, so you can't double-save by accident.
- The small back arrow and Cancel button at the top of the Add screen are larger and easier to tap on phones.
- Tapping anywhere on a method card now reliably picks it (previously the click target was a bit smaller than the card).

## How to test the changes

1. Open `index.html` and tap the **Add** tab at the bottom.
2. Look at the "Brew method" heading — it should read "Brew method  Espresso". Tap the V60 card — the heading should change to "V60", the card should fill with a darker border, a brown background, and a small check mark in the top-right corner.
3. Tap any corner of a method card (not the icon) — it should still select that method.
4. Look at the "Score" heading — it should read "Score  8 / 10". Tap the "5" pill — the heading should change to "5 / 10" and the active pill should lift slightly.
5. Tap **Save brew** — the button should turn green and become unclickable for about a second before returning you to the Today tab.
6. Try tapping the small back arrow in the top left and the Cancel button in the top right — both should be easier to hit than before.
