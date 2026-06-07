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

- After you save a brew, a clear "Brew saved" toast briefly appears at the bottom of the phone so you know it worked, instead of only the Save button briefly turning green.
- The search box on the Beans tab now actually filters the bean list as you type. If nothing matches, a "No beans match that search" message appears in place of the list.
- The "+ New" button on the Beans tab now opens a bottom sheet where you can enter a new bean's name, roaster, roast level, and roast date. Saving it confirms with a toast.
- On the Add screen, the Bean dropdown now offers an "+ Add new bean..." option that opens the same sheet, so you don't have to leave the screen to add a bean you forgot.
- Tap targets like "+ Log" and "+ New" in the header have been enlarged so they're easier to hit with a thumb.

## How to test the changes

1. Open `index.html`. Tap the "Add" tab at the bottom. Fill in the form and tap "Save brew" — the button briefly says "✓ Saved", and a "Brew saved" toast appears at the bottom while you're taken back to Today.
2. Tap the "Beans" tab. Type "kenya" in the search box — the list narrows to just the Kenya row. Clear the search and try "nope" — a "No beans match" message appears.
3. On the Beans tab, tap "+ New" in the top right. A sheet slides up. Type a name and tap "Save bean" — a toast confirms the addition. Tap Cancel or outside the sheet to dismiss it.
4. Go back to the Add screen and open the Bean dropdown. Pick "+ Add new bean..." — the same sheet opens.
