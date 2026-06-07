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

- The "Cite this view" and "Save view" buttons in the top bar now actually do something. "Cite this view" copies a formatted citation string (including the current year and month) to your clipboard, and both buttons confirm with a brief dark toast at the bottom of the screen.
- The "Studies", "Submit a track", "Methods", and "About" links in the top nav no longer pretend to be real — clicking one shows a "coming soon" toast instead of silently reloading the page.
- The big "Migration Atlas — 2025 season" heading now updates to match whichever study year you pick in the left rail, instead of staying stuck on 2025.
- The play/pause button now updates its screen-reader label as well as its icon, so assistive tech announces "Pause" while playing and "Play" while paused.
- The species checkboxes, display toggles, and dropdowns are now properly labeled and bigger — each row is at least 44px tall with a hover highlight, so they're easy to use on touch screens and reachable with a keyboard.
- The month timeline now adapts to phones: it wraps below the play button, and the Jan/Feb/Mar tick labels thin out so they don't crash into each other on a narrow window.

## How to test the changes

1. Open `index.html`. Click "Cite this view" in the top right — a dark toast appears at the bottom saying "Citation copied to clipboard" (paste somewhere to see the formatted citation with the current year and month).
2. Click "Save view" — a "View saved" toast confirms the action.
3. Click any of "Studies", "Submit a track", "Methods", or "About" in the top nav — a "coming soon" toast appears instead of the page silently jumping.
4. Change the "Study year" dropdown in the left rail — the big "Migration Atlas — …" heading above the map updates to match.
5. Press the play button and confirm the icon flips to a pause symbol; tab to it and a screen reader announces "Pause". Press again to revert.
6. Tab through the left rail — each species checkbox and display toggle is reachable, has a visible focus state, and each row is comfortably tall.
7. Shrink the browser to phone width — the timeline slider drops below the play button and only every other month label is shown so the ticks stay readable.
