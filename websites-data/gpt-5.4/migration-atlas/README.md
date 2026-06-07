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

- The top-bar links that go nowhere (Studies, Submit a track, Methods, About) are now clearly greyed out and marked "(demo)" so it's obvious only Explore is wired up.
- The "Cite this view" button now opens a small dialog showing a ready-made citation for the current year, month, and species selection, with a "Copy citation" button.
- The "Save view" button now updates the page address so you can share the exact view, and confirms with a brief "View saved ✓" state.
- The Play button now reads "▶ Play" and switches to "⏸ Pause" when running, so it's easy to tell whether the animation is going.
- The month slider now shows a clear "May" (or whichever month) label in big text above it, and the matching month name on the tick row is highlighted while you scrub or play.
- Changing the speed dropdown now briefly highlights the dropdown and pops up a small confirmation ("Playback speed: 2×"), and the animation re-times immediately if it's already playing.
- The 2026 study-year option is now greyed out as "in progress — not yet available" and can't be selected. Switching between 2024 and 2025 shows a brief "Loading season…" overlay on the map.
- The species search box now tells you "Showing X of 7 in list" while you type, and clarifies that searching only filters the visible list — it doesn't change which species are drawn on the map.
- The "species shown" tile is renamed "species selected" and stays in sync with the actual ticked checkboxes (not what the search has hidden).
- Small confirmation messages now pop up at the bottom of the screen for actions like switching season, copying the citation, saving the view, and changing speed.
- On phones and narrow screens, the player, search box, dropdowns, and species checkboxes are larger and easier to tap; the month ticks shrink to just quarter markers so they stop crowding the slider.

## How to test the changes

1. Open `index.html`. In the top bar, click "Studies" or "About" — they're greyed out with "(demo)" next to them and don't do anything.
2. Click "Cite this view" in the top-right — a dialog opens with a ready-made citation that mentions the current year, month, and species. Click "Copy citation" — the button briefly says "Copied ✓" and a small message appears at the bottom of the screen.
3. Close the dialog and click "Save view" — the button briefly turns green and reads "View saved ✓", and the URL in the address bar gets a `#view=...` part you can share.
4. Click the Play button — it switches to "⏸ Pause" and the trails animate forward. Click again to pause; it returns to "▶ Play".
5. Drag the month slider — the big "May" (or current month) text above the slider updates as you drag, and the matching tick on the row below turns orange.
6. Change the Speed dropdown to "2×" — the dropdown flashes and a small message says "Playback speed: 2×". If you're playing, the animation visibly speeds up.
7. Open the Study year dropdown — "2026 season (in progress)" is greyed out and can't be picked. Switch between 2024 and 2025 — a brief "Loading season…" overlay appears on the map and the title updates.
8. Type "alb" in the species search — the list shrinks to one row and a hint reads "Showing 1 of 7 in list. Search filters the list, not the map selection." Clear the search to see all species again.
9. Untick "Boreal caribou" — the right-hand "species selected" tile counts down by one. The label changes to "species selected" instead of "species shown".
10. Resize the browser to phone width — the play button gets bigger and pill-shaped, the speed selector grows, the month ticks collapse to just January/April/July/October/December, and the species checkboxes are easier to tap.
