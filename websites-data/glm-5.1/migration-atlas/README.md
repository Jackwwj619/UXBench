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

- The "Study year" dropdown now actually changes the view — picking a different year updates the page title (e.g. "Migration Atlas — 2024 season") and pops up a toast confirming the load, instead of doing nothing.
- The "Save view" button in the top bar now saves your current filters into the page URL and into the browser, so you can bookmark or share the exact map state. The button briefly flashes green with "Saved".
- The "Cite this view" button now copies a ready-to-paste citation string (including the year, month, retrieval date, and shareable URL) to your clipboard, and confirms with a green "Copied" flash.
- Top-bar links that don't lead anywhere yet (Studies, Submit a track, Methods, About) are now visibly labelled "soon" and tapping them shows a friendly "coming soon" toast instead of silently doing nothing.
- The Play/Pause button is bigger and rounder, and screen readers now correctly announce whether it's currently "Play" or "Pause".
- Species toggles, display-option checkboxes, the month slider, the speed dropdown, and the search box are all larger and easier to tap on phones; rows highlight when you hover over them.
- On phones, the map now appears at the top with the inspector below it and the filter rail at the bottom, and the player sticks to the bottom of the screen so it stays reachable while you scroll.

## How to test the changes

1. Open `index.html`. In the left filter rail, change the "Study year" dropdown to "2024 season" — the big heading at the top should update to "Migration Atlas — 2024 season" and a dark toast should slide in saying "Loaded 2024 season".
2. Toggle a couple of species off and slide the month slider to August. Click **Save view** in the top right — the button briefly flashes green and shows "✓ Saved". Look at the browser address bar — you should now see `?year=...&month=8&species=...` in the URL. Reload and the URL stays.
3. Click **Cite this view** — the button flashes "✓ Copied" and you can paste a citation string like "Migration Atlas (synthetic). 2025 season, August. Retrieved …" into a text editor.
4. Click any of the top-bar links: Studies, Submit a track, Methods, or About — each shows a small "soon" pill and clicking pops a toast like "Studies is coming soon" instead of doing nothing.
5. Shrink the browser to phone width. The map should appear above the inspector, with the filter rail at the bottom. Scroll the page — the play/pause/speed bar should stay stuck to the bottom of the screen. Tap species or display checkboxes — the whole row should feel large and highlight on touch.
