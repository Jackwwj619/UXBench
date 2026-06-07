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

- The top-nav links **Studies**, **Submit a track**, **Methods**, and **About** now actually open friendly pop-ups with real explanatory content instead of going nowhere.
- A new **Individuals (tap to inspect)** list now appears below the map, showing every animal currently on screen as a tappable row with a colour swatch — handy when the map is too crowded to click a single trail.
- Trails and dots on the map are now much easier to click (a wider invisible hit-zone surrounds each one), and the currently selected animal's trail thickens and its dot gets a dark outline so you can tell which one you picked.
- Selecting an animal also pops a small confirmation message at the bottom of the screen and, on phones, automatically scrolls the right-hand inspector into view.
- The **Save view** button now actually saves your current filters, month, and selected animal into the page address, so you can copy the link or come back later and see the same view.
- The **Cite this view** button now opens a pop-up with a ready-made citation and a share link, both with **Copy** buttons that copy to your clipboard.
- The play/pause button, the month slider, the species checkboxes, and the speed selector are all bigger and easier to tap on phones, with clearer focus highlights for keyboard users.

## How to test the changes

1. Open `index.html`. Click **Studies** in the top nav — a pop-up should appear listing the seven seed studies. Close it with the × or by pressing Escape, then try **Methods** and **About**.
2. Scroll below the month-slider player — the new **Individuals (tap to inspect)** list appears, with one row per animal currently filtered in. Click any row.
3. The right-hand inspector fills in with that animal's details, the matching trail on the map thickens, and a small "Selected …" message briefly appears at the bottom of the screen.
4. Click **Save view** in the top-right corner — the page address bar should change to include your current month, species, and selection. Copy the address and paste it into a new tab to confirm the view is restored.
5. Click **Cite this view** — a pop-up appears with a citation paragraph and a share link, each with a **Copy** button that puts the text on your clipboard.
6. Shrink the window to phone width — the species checkboxes, the play button, and the slider should all stay easy to tap.
