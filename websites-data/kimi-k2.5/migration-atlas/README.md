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

- The **Studies**, **Submit a track**, **Methods**, and **About** links in the top nav now actually do something. Each one opens a small information dialog explaining the section, instead of leading to a dead "#".
- The **Save view** button in the top-right now writes the current year, month, and visible species into the page address — bookmark or share the URL to come back to the exact same view. The button briefly shows "✓ Saved" and a confirmation banner appears at the bottom.
- The **Cite this view** button now copies a ready-made citation line to your clipboard (with a "Copied" confirmation banner), instead of doing nothing.
- The **Study year** dropdown now updates the title at the top of the map and adjusts the aggregate stats so you can see the year change took effect. Picking the in-progress season shows a "partial data" notice.
- Changing the **playback speed** while the animation is running now takes effect immediately, instead of being ignored until you press pause.
- The Play/Pause button now announces itself correctly to screen readers (it switches between "Play" and "Pause" labels), and the year and speed dropdowns have proper accessibility labels.
- Pressing **Escape** closes the new info dialog, and clicking outside the dialog also dismisses it.

## How to test the changes

1. Open `index.html`. Click **Studies** in the top nav — a dialog opens explaining the studies behind the atlas. Press Escape, or click outside, to close. Try **Submit a track**, **Methods**, and **About** the same way.
2. Click **Save view** in the top-right. The button briefly shows "✓ Saved", a confirmation banner appears at the bottom, and the URL gains a `#view=…` fragment with the current settings. Refresh the page and your view persists.
3. Click **Cite this view** — you should see "✓ Copied" and a banner; paste somewhere to confirm you got a citation string.
4. Change the **Study year** dropdown to 2024 or 2026 — the big "Migration Atlas — 2025 season" heading updates to the new year, the aggregate stats shift, and a banner appears (with "partial data" warning for 2026).
5. Press **Play**. While it's playing, change the speed dropdown from 1× to 4× — the animation should immediately speed up. Press the button again to pause.
