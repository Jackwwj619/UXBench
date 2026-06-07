# UXAgent Exploration Plan

## Goal

Critique the UX of the migration-atlas system, focusing on the primary data visualization flow (map, player, filters) and adjacent states/recovery paths.

## Plan Summary

Explore the index.html page in desktop and mobile viewports. Validate filter interactions, player functionality, map visualization, and recovery paths. Check small tap targets and responsive layout.

## Coverage Targets

- pages: `Visit index.html (only known page).`
- features: `Exercise all visible controls (filters, player, map interactions, buttons) on index.html.`
- mobile: `Repeat critical checks (filters, player, map) in mobile viewport.`

## Planned Phases

### Filter Interactions (Desktop)

- Objective: Validate species, year, and display filter functionality.
- Target pages: index.html
- Key checks:
  - Toggle species checkboxes (e.g., Western osprey, Monarch butterfly) and verify map updates.
  - Change study year via dropdown and verify map/player updates.
  - Toggle display checkboxes (Show trail, Show monthly positions, Show stop-over polygons) and verify map updates.
  - Use species search input to filter and verify results.
- Exit criteria:
  - All filter interactions update the map/player as expected.

### Player Functionality (Desktop)

- Objective: Validate player (slider, play/pause, speed) functionality.
- Target pages: index.html
- Key checks:
  - Scrub the month slider and verify map/individual stats update.
  - Click play/pause button and verify animation (trail extension, month update).
  - Change speed via selector (0.5×, 1×, 2×, 4×) and verify animation cadence.
  - Verify player resets correctly after filter changes.
- Exit criteria:
  - Player controls update the map/individual stats as expected.

### Map & Inspector (Desktop)

- Objective: Validate map visualization and individual inspector interaction.
- Target pages: index.html
- Key checks:
  - Click a trail/dot/tag on the map and verify individual inspector updates.
  - Verify trail, monthly position, and stop-over polygon rendering based on display filters.
  - Check map responsiveness to filter/player changes (e.g., trail extension during animation).
  - Verify aggregate stats update with filter/player changes.
- Exit criteria:
  - Map and inspector interactions update correctly with filter/player actions.

### Responsive Layout (Mobile Viewport)

- Objective: Validate responsive layout and mobile interactions.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify responsive layout (column reflow, tap target sizes).
  - Repeat critical filter/player checks (e.g., toggle a species, scrub slider) in mobile view.
  - Check small tap targets (checkboxes, links) for usability (e.g., can they be tapped easily).
  - Verify map/player/inspector readability in mobile view.
- Exit criteria:
  - Mobile layout is usable, critical interactions work, and tap targets are acceptable.

### Recovery Paths & Edge Cases

- Objective: Test state recovery and edge cases (e.g., all filters off, max speed, small species counts).
- Target pages: index.html
- Key checks:
  - Reset all filters (uncheck species, default year, hide all display) and verify map/player state.
  - Set player to max speed (4×) and scrub quickly; verify no errors/crashes.
  - Select a species with small count (e.g., Wandering albatross, n=4) and verify map rendering.
  - Test 'Cite this view' and 'Save view' buttons (even if dummy actions) for feedback.
- Exit criteria:
  - System recovers from extreme states, no errors, and buttons provide feedback.

## Prescan Summary

### Migration Atlas — global animal tracking

- Page: `index.html`
- Headings: Filters, SPECIES, STUDY YEAR, DISPLAY, NOTES, Migration Atlas — 2025 season, Individual, Aggregate stats
- Interactables: `3` buttons, `5` links, `14` inputs
- Notable controls:
  - clickable:a:Explore
  - clickable:a:Studies
  - clickable:a:Submit a track
  - clickable:a:Methods
  - clickable:a:About
  - clickable:button:Cite this view
  - clickable:button:Save view
  - typeable:input:Filter species…

