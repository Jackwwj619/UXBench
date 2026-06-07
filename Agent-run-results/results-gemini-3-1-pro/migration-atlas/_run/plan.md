# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by verifying global header actions and navigation links. It will then methodically exercise the left-hand filter panel, testing species selection, search, and display toggles. Next, the focus will shift to the center map's playback controls and timeline slider, followed by interacting with the map itself to trigger the right-hand inspector. Finally, a mobile viewport check will assess layout degradation and tap target sizes.

## Coverage Targets

- pages: `Visit the sole index.html page.`
- features: `Exercise all left-panel filters, bottom playback controls, top header actions, and map inspection clicks.`
- mobile: `Ensure the 3-column desktop layout gracefully degrades and controls remain usable on mobile.`

## Planned Phases

### Header and Global Actions

- Objective: Verify the functionality of top navigation links and utility buttons.
- Target pages: index.html
- Key checks:
  - Click 'Cite this view' and 'Save view' to observe system response (modals, alerts, or no-ops)
  - Click top nav links ('Studies', 'Methods', etc.) to check for page routing or dead links
- Exit criteria:
  - All header links and buttons have been interacted with and their outcomes noted.

### Data Filtering and Display Settings

- Objective: Test the left-hand rail filters to ensure they update the map and aggregate stats.
- Target pages: index.html
- Key checks:
  - Type in 'Filter species…' input and verify if checkbox list filters
  - Toggle various species checkboxes and verify 'SPECIES SHOWN' and 'INDIVIDUALS' counts update
  - Change 'STUDY YEAR' dropdown and observe changes
  - Toggle 'Show trail', 'Show monthly positions', and 'Show stop-over polygons'
- Exit criteria:
  - Filter controls are proven to manipulate the data visualization state and summary metrics.

### Playback Controls

- Objective: Validate the animation and timeline scrubbing functionality.
- Target pages: index.html
- Key checks:
  - Click Play (▶) button and observe the month slider advancing and map trails extending
  - Change playback speed via the dropdown and verify cadence
  - Manually scrub the month slider and verify the 'CURRENT MONTH' text and map trails update accordingly
- Exit criteria:
  - Player controls successfully manipulate the temporal state of the map data.

### Map Interactivity and Inspection

- Objective: Ensure individual tracks can be inspected via map interaction.
- Target pages: index.html
- Key checks:
  - Click on a visible track or pin within the SVG map
  - Verify the right-hand 'Individual' inspector panel populates with specific animal data
- Exit criteria:
  - At least one individual track has been successfully inspected and detailed in the right panel.

### Mobile Viewport Check

- Objective: Evaluate the complex 3-column layout and small tap targets on a mobile screen.
- Target pages: index.html
- Key checks:
  - Verify layout stacking (do filters, map, and inspector stack logically?)
  - Interact with species checkboxes and playback controls to check for tap target difficulties
- Exit criteria:
  - Mobile layout is fully reviewed and any blocking usability issues are logged.

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

