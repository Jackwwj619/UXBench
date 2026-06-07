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

- **"Save view" actually saves now.** Clicking it tucks away the current month, year, species selection, and display toggles, and shows a small confirmation at the bottom of the screen so you know it worked.
- **"Cite this view" opens a citation pop-up.** A dialog appears with a ready-made citation line covering the year, month, species, and access date, plus a one-click "Copy citation" button.
- **Changing the study year updates the page.** Picking 2024, 2025, or 2026 from the Study year dropdown now updates the title at the top of the map and shows a brief confirmation toast.
- **Individual animals are easier to click on the map.** Each trail line, monthly dot, and tag label now has an invisible wider hit area, so a small wiggly track is no longer pixel-hunting to select.
- **Tag labels are easier to read.** Each ID label now sits on a soft cream background so it stays legible over continent outlines and overlapping trails.
- **Bigger tap targets on phones.** Species checkboxes, the trail/dots/stop-overs toggles, and other controls in the left rail are now sized for thumbs, with a subtle hover highlight on the rows.

## How to test the changes

1. Open `index.html`. Click "Save view" in the top right — a small message should slide up from the bottom saying the view was saved with the current month, year, and species count.
2. Click "Cite this view" — a pop-up should appear with a citation line that mentions the current month, year, and selected species. Click "Copy citation" — the toast should confirm the copy. Press Escape or click outside to close.
3. In the left rail, change "Study year" from 2025 to 2024 or 2026 — the page title above the map should update, and a small confirmation should slide up.
4. Try clicking on any narrow trail line, monthly dot, or animal ID label on the map — selecting should be forgiving and the right rail should load that animal's details.
5. Shrink the browser to phone width — species checkboxes and display toggles should be comfortably tap-sized with a clear hover highlight.
