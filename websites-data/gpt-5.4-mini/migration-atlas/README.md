# Migration Atlas

Migration Atlas is a demo data explorer for animal-migration tracking — the kind of map you'd open to see where seven different species have been over the course of a year, scrub through the months, and click into individual animals to read their tag metadata.

> Fictional product — species, tracks, and tag data are all synthetic.

## What you can do

- **Watch animals move across a world map.** The center map shows where seven species are at the currently selected time. Each species has a per-individual track over 12 monthly waypoints.
- **Filter what you see.** Toggle individual species on or off (each shows its sample size). Choose a study year. Toggle on or off the trail line, monthly position dots, and stop-over polygons.
- **Scrub through the year.** The player below the map has a January→December slider, play/pause, and a speed selector. As you advance, trails extend behind each individual.
- **Inspect any individual.** Click a trail or pin to load that animal into the right rail: ID, age class, sex, logger version, tag deployment date, current position, and last-fix accuracy. Aggregate stats stay in a smaller panel beside it.

## How to use it

Open `index.html` in any modern browser. Pick which species to show in the left rail, hit **Play** to animate the year, or drag the slider to a specific month. Click any individual on the map to load its detail card on the right.

## What was changed in this version

- The **Studies / Submit a track / Methods / About** links in the top nav are now clearly tagged "soon" and no longer pretend to lead somewhere — clicking them shows a "coming soon" note instead of silently doing nothing or jumping the page.
- Ticking a species on or off in the left rail now shows a brief status line under the player like "Added Caspian Tern · 4 species shown", so you can see your change took effect even if the map is busy.
- Changing the **Study year** dropdown now updates the title above the map ("Migration Atlas — 2024 season") and shows a confirming status line — previously the dropdown looked decorative.
- The Play / Pause button now also announces what it's doing ("Playing at 2× speed", "Paused at May") and switching the speed while playing now actually changes the playback speed live, rather than only on the next play.
- Each species row in the left rail is now a much bigger, hover-highlighted tappable area with larger checkboxes, instead of a thin line you had to aim at.
- The Play / Pause button and Speed dropdown are bigger; the Speed selector has a clear "SPEED" label above it.
- On a phone, the left and right rails stack under the map, the species list scrolls naturally, and the player buttons grow to a comfortable tap size.

## How to test the changes

1. Open `index.html` and click **Studies** (or Submit a track / Methods / About) in the top nav — instead of a dead link, you should see a "coming soon" status line near the player.
2. In the left rail, untick **Caspian Tern** (or any species) — a small confirming line under the map player should say something like "Removed Caspian Tern · 6 species shown".
3. Open the **Study year** dropdown and pick "2024 season" — the title above the map should change to "Migration Atlas — 2024 season" and a status line should confirm "Showing 2024 season".
4. Click **Play** — the button should switch to ⏸ and a "Playing at 1× speed" line should appear. While it's playing, change the speed to "4×" — the animation should visibly speed up, and the status should update.
5. Click **Pause** — the status should say "Paused at <month name>".
6. Shrink the browser to phone width — the left and right rails should slide under the map, the species rows should be larger and easier to tap, and the Play button and Speed dropdown should remain comfortable to use.
