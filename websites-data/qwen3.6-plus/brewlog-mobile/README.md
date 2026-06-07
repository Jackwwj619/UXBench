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

- **A confirmation toast pops up after each save.** When you save a brew, a small brown "Brew saved" pill slides up briefly at the bottom of the phone, so you have an extra visual confirmation beyond the green flash.
- **The Beans tab's "Brew" buttons now actually pre-fill the Add form.** Tapping **Brew** on a bean row jumps to the Add screen with that bean already selected in the bean dropdown, and a toast says something like "Logging brew with Yirgacheffe".
- **The "Reorder" action on a finished bean shows a friendly note** ("Reorder noted — bean is finished") instead of doing nothing.
- **A "+ New" button on the Beans tab takes you to the Add screen** with the "Add new bean" option already chosen in the dropdown, so you can register a new bean by logging a brew with it.
- **Bean search now filters the list as you type.** Typing in the search box at the top of the Beans tab hides any bean rows that don't match the origin or roaster.
- **Bigger, easier-to-tap controls throughout.** The "+ Log" / "+ New" header buttons, the Stats range dropdown, the score pills (1–10), the tasting-note tags, the small **Brew** buttons on bean rows, and the back arrow are all sized to be comfortably tappable with a thumb.
- **Better screen-reader labels.** The dose, yield, brew-time (minutes/seconds), Stats range, bean search, "+ Log", "+ New", and back-arrow controls now have proper spoken labels for assistive tech.

## How to test the changes

1. Open `index.html` and tap the **Add** tab. Fill in any brew (or just keep the defaults) and tap **Save**. The button briefly flashes green, then a small brown pill saying "Brew saved" appears near the bottom of the phone for about a second.
2. Tap the **Beans** tab. On any bean row that's in stock (e.g. "Yirgacheffe"), tap **Brew** — the app jumps to the Add screen with that bean's name preselected in the bean dropdown, and a toast confirms "Logging brew with [bean name]".
3. On the Beans tab, find the finished/dimmed bean row and tap its **Reorder** action — a toast saying "Reorder noted — bean is finished" should appear instead of nothing happening.
4. Still on the Beans tab, tap **+ New** in the header. You should jump to the Add screen with "Add new bean" preselected and a helpful toast.
5. Type a few letters in the search box at the top of the Beans tab (e.g. "Brazil") — non-matching bean rows should hide as you type, and reappear when you clear the box.
6. Shrink the browser to phone width and walk through Today → Add → Stats → Beans. The header pill buttons, score row, tasting-note pills, and small Brew buttons should all feel comfortably sized for tapping.
