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

- Saving a brew now shows a toast ("Brew saved · added to Today") and clears the form before returning to Today, so the next time you tap Add the form is fresh instead of still holding the previous brew's numbers.
- The time-range dropdown on the Stats tab actually changes the stats. Switching between 7 days / 30 days / All time updates the brews, avg score, coffee used, and estimated cost tiles and redraws the trend chart to match.
- Tapping **Brew** on any bean in the Beans tab now jumps to the Add screen with that bean pre-selected in the bean dropdown.
- Tapping **Reorder** on a finished bean now shows a confirmation toast instead of doing nothing.
- The bean search box in the Beans tab actually filters the list as you type, and a "No beans match your search" message appears when nothing matches.
- The "+ New" button in the Beans header now opens a real "Add new bean" modal (name, roaster, roast level) and inserts the new bean both into the bean list and into the bean dropdown on the Add screen. Tapping the backdrop or Cancel closes it.
- The score row, grind slider, dose/yield inputs, time pickers, bean select, back / cancel buttons, and toast region all have proper `aria-label`s, `role="radiogroup"`, and `aria-live` annotations so screen readers can navigate the form.

## How to test the changes

1. Open `index.html`. Tap Add, change dose to 19 and yield to 41, tap Save — a "Brew saved" toast appears and you land on Today. Tap Add again and the form is reset to its defaults, not still showing 19/41.
2. Open the Stats tab. Change the time-range dropdown from 7 days to 30 days to All time — the four stat tiles (brews / avg score / coffee used / est. cost) update and the trend chart redraws with a different number of points.
3. Open the Beans tab. Type "kenya" into the search box — only the Kenya AA row stays visible. Clear the box and everything comes back.
4. Tap **Brew** on the Ethiopia Yirgacheffe row — you land on Add with the Bean dropdown already set to "Ethiopia Yirgacheffe · light".
5. Tap **Reorder** on the finished Decaf Sumatra Mandheling bean — a toast confirms the reorder request.
6. Tap **+ New** in the Beans header. Add "Guatemala Huehuetenango" and tap "Add bean" — the new bean appears at the top of the list with a "new" badge and also shows up as a selectable option on the Add screen.
