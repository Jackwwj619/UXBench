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

- The period selector on the Stats tab now actually works — picking "Last 30 days" or "This year" changes all four stat tiles (brews, average score, coffee used, estimated cost), and a small line below confirms which range you're viewing.
- The Beans tab now has a working search box — type "Ethiopia" or "Pearl" and the bean list filters live, with a status line showing "X of 5 beans match" and a friendly empty state when nothing matches.
- Tapping "Brew" on any bean now jumps straight to the Add a brew screen instead of doing nothing.
- The "+ New" button on the Beans tab and the "Reorder" button on a finished bean now show a small confirmation toast instead of being silent.
- The 1-10 score row on the Add screen is now arranged in two rows of five with bigger, easier-to-tap buttons.
- The tasting-note tag grid on the Add screen has bigger, taller pills that are easier to tap on a phone.
- The brewing method cards on the Add screen are taller with bigger icons, and the Bean dropdown is now properly labelled.
- The Period dropdown on Stats now has a clear "PERIOD" label above it so it's obvious what it controls.
- Tap targets across the back button, cancel button, "+ New" button, header buttons, the bottom tab bar, and the Brew buttons in the beans list are all bigger and easier to hit.

## How to test the changes

1. Open `index.html`. Tap the Stats tab in the bottom bar. Change the Period dropdown to "Last 30 days" — the four big numbers update (64 brews, 1,024 g, $112.80…) and the line below changes to "Showing last 30 days".
2. Tap the Beans tab. Type "ethiopia" into the search box — only the Yirgacheffe row stays, and the status line says "1 of 5 beans match". Clear it; the count returns to "5 beans". Type "zzz" — a "No matches" message appears.
3. On any bean row, tap "Brew" — the app jumps to the Add a brew screen.
4. Tap "+ New" in the Beans header — a small toast "New bean form — coming soon" appears at the bottom of the phone frame. Tap "Reorder" on the dimmed Decaf bean — a "Added to reorder list" toast appears.
5. Open the Add tab. The score buttons are now arranged in two rows of five and are noticeably bigger. The tasting-note pills are taller.
6. On the Stats tab, look above the period dropdown — there's a "PERIOD" label.
7. On a phone-sized window, the Back, Cancel, +New, and bottom tab buttons all feel easier to tap than before.
