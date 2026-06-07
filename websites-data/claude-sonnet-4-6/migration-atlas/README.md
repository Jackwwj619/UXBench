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

- The **Save view** button now actually saves: it puts your current species/month/year picks into the page address, copies a shareable link to the clipboard, and shows a confirmation toast.
- The **Cite this view** button now generates a citation line ("Cite as: Migration Atlas (2025 season), accessed 2026-05-22") and shows it in a toast you can read.
- The **Studies**, **Submit a track**, **Methods** and **About** nav links now show a friendly "coming soon" toast instead of jumping the page to the top.
- A new **hamburger menu** appears on narrow windows so the top nav and species filters are usable on a phone.
- The map now shows a helpful **"Select at least one species to see migration tracks"** message in the middle when you've unchecked everything, instead of going blank.
- The **Play / Pause** button now changes its icon and label as it toggles, so you can tell which state it's in.
- Changing the **Study year** dropdown updates the title above the map, and selecting "2026 (in progress)" pops a toast warning that only Jan–May data is available.

## How to test the changes

1. Open `index.html`. Toggle a couple of species in the left rail, then click **Save view** in the top-right — a toast confirms a shareable link was copied, and you can see the address bar has updated.
2. Click **Cite this view** in the top-right — a toast pops up with the citation text.
3. Click any of the **Studies / Submit a track / Methods / About** links in the top nav — each shows a "coming soon" toast.
4. In the left rail, uncheck **every** species — the map area shows a centered message instead of an empty map.
5. Click the big **▶** button below the map — it changes to a pause icon while the year animates, and back when you click again.
6. Change the **Study year** dropdown to "2026 season (in progress)" — the title updates and a toast warns about partial data.
7. Shrink the window narrow — a menu button appears in the top bar, and tapping a nav link auto-closes the menu.
