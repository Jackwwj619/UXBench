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

- The **Brew** button on each bean in the Beans tab now actually does something: it jumps to the Add screen, pre-selects that bean in the dropdown, and shows a small "Starting a brew" toast.
- The **Reorder** button on a finished bean now opens a clean confirmation dialog ("Reorder this bean?") instead of doing nothing.
- The **+ New** button at the top of the Beans tab now opens a small dialog where you can type a bean name, roaster, and roast level.
- The time-range dropdown on the Stats tab now actually updates the numbers. Switching between "Last 7 days", "Last 30 days", and "This year" changes the total brews, average score, coffee used, cost, the method-mix bars, and the trend chart, with a subtle highlight pulse on the stat tiles so you notice the change.
- All the small action buttons on the bean rows, the "+ New" button, the back arrow, and the dropdown picker are bigger and easier to tap on a phone.
- Brewlog now uses neat toast notifications at the bottom of the phone for confirmations instead of pop-up dialogs you have to dismiss.

## How to test the changes

1. Open `index.html`. Tap the **Beans** tab in the bottom bar. On the row for "Ethiopia Yirgacheffe" (or any non-empty bean), tap **Brew** — the app jumps to the Add screen and a toast briefly appears at the bottom.
2. Back on the Beans tab, find the dimmed bean labelled "finished" and tap **Reorder** — a confirmation dialog appears. Pick "Confirm reorder" and a toast says "Reorder requested".
3. At the top of the Beans tab, tap **+ New** — a dialog opens with three fields (origin, roaster, roast level). Fill in any name and click "Add bean" — a toast says "Added".
4. Switch to the **Stats** tab. Open the time-range dropdown at the top right and pick "Last 30 days" — the four big numbers (brews / avg / coffee / cost), the method-mix bars, and the trend chart all change, and the stat tiles briefly flash. Switch to "This year" — they change again.
