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

- The **Brew** button on each bean now actually takes you to the Add screen (and the "+ New" button on Beans goes there too) — they used to do nothing.
- The back arrow on the Add screen is now a wider "← Back" pill so it's easier to spot and tap with a thumb, instead of a tiny circle.
- Method picker cards (Espresso, V60, Aeropress, etc.) have a thicker border and now show a subtle shadow plus bold colored label when selected, so it's obvious which method is picked.
- Tasting-note tags add a small check mark and bold their text when you tick them on, so it's clearer at a glance which notes you've selected.
- The selected score number on the 1–10 row now slightly pops out (a touch bigger with a soft shadow), making it obvious which score is active.
- Buttons and tappable controls throughout the app — the score buttons, tasting tags, method cards, Log/Brew/Reorder buttons, the time-range dropdown on Stats — are noticeably larger and easier to tap on a real phone.
- Screen readers now announce meaningful names for the dose, yield, brew time, bean picker, and the Log / + New / Brew / Back buttons.

## How to test the changes

1. Open `index.html` and tap the **Beans** tab in the bottom bar. Tap **Brew** on any bean row — the app should jump to the Add screen (it previously did nothing). Also try the **+ New** button at the top right of the Beans screen — it should open Add too.
2. On the Add screen, look at the back button in the top-left corner — it should read "← Back" as a wide pill, not a small circle. Tap it to return to Today.
3. Tap **+ Log** to open Add again. In the method row, tap **V60** — the selected card should clearly stand out with a thicker border, a soft shadow, and bold brown label text.
4. Scroll to the tasting-note grid (Floral, Citrus, Berry, etc.). Tick a few — each selected tag should show a small check mark and bold text. Untick one and it should go back to plain.
5. Pick a score in the 1–10 row — the chosen number should be slightly larger than the others and have a soft drop shadow.
6. Shrink your browser to phone width. The score buttons, tasting tags, method cards, and bottom tab bar should all be comfortably tap-sized.
