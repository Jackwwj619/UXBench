# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Migration Atlas data visualization, validating the primary temporal playback flow, filter interactions, map inspection, and adjacent UI states across desktop and mobile viewports.

## Plan Summary

The exploration will proceed through five phases, starting with the primary temporal playback flow and map interaction, then moving to left-rail filtering, right-panel inspection, and finally global actions and mobile responsiveness. The run will deeply validate the interplay between the month slider, species toggles, and the SVG map, ensuring state changes are accurately reflected. It will also assess the usability of small tap targets and layout shifts on smaller screens.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `100% of visible controls exercised (all checkboxes, dropdowns, buttons, slider, search, map clicks)`
- mobile: `Repeat phases 1-3 core checks on mobile viewport to validate layout shift and tap targets`

## Planned Phases

### Temporal Playback & Animation

- Objective: Validate the primary time-scrubbing and animation flow, ensuring the map and stats update correctly.
- Target pages: index.html
- Key checks:
  - Scrub the month slider from Jan to Dec and verify trail extension and dot positioning
  - Click the Play button and verify animation starts from the current month
  - Change speed selector to 0.5x, 2x, and 4x during playback and confirm cadence changes
  - Pause the animation mid-playback and confirm slider stops cleanly
  - Verify 'CURRENT MONTH' label and 'Aggregate stats' update as the slider moves
- Exit criteria:
  - Full Jan-Dec scrub completed
  - Play/Pause toggled successfully at multiple speeds
  - Visual confirmation that map elements and stats reflect the active month

### Filter Rail Interactions

- Objective: Test all left-rail filtering controls and ensure they correctly manipulate the map visualization and stats.
- Target pages: index.html
- Key checks:
  - Toggle off all species checkboxes and verify map clears and '0 SPECIES SHOWN' appears
  - Toggle on a single species (e.g., Monarch butterfly) and verify only its tracks appear
  - Use the 'Filter species…' search input to narrow down the visible checkboxes
  - Change 'STUDY YEAR' dropdown to 2024 and 2026, checking for map/slider updates
  - Toggle 'Show trail', 'Show monthly positions', and 'Show stop-over polygons' off and on, verifying map layer visibility
- Exit criteria:
  - All 7 species toggled individually and in combination
  - Study year switched to all 3 options
  - All 3 display toggles exercised
  - Search input successfully filters the species list

### Map Inspection & Detail Panel

- Objective: Validate the interaction between the SVG map elements and the right-side Individual inspector panel.
- Target pages: index.html
- Key checks:
  - Click a visible monthly position dot on the map and verify the Individual panel populates
  - Click a trail line on the map and verify the Individual panel populates
  - Click a tag (e.g., CAR-54) on the map and verify the Individual panel populates
  - Verify the Individual panel clears or reverts to default when clicking empty map space
  - Scrub the timeline while an individual is selected to see if panel data updates
- Exit criteria:
  - Successfully inspected an individual via dot, trail, and tag clicks
  - Individual panel content verified against map selection

### Global Actions & Navigation

- Objective: Test top-bar navigation and action buttons to discover hidden states, modals, or URL changes.
- Target pages: index.html
- Key checks:
  - Click 'Cite this view' and look for modal, toast, or clipboard action
  - Click 'Save view' and look for modal, toast, or URL parameter update
  - Click 'Studies', 'Submit a track', 'Methods', and 'About' links to check for anchor jumps or popups
  - Click 'Explore' to ensure it resets to default view
- Exit criteria:
  - All top-bar buttons and links clicked
  - Any resulting UI changes or lack thereof documented

### Mobile Viewport Validation

- Objective: Repeat critical flows on a mobile viewport to assess responsive layout and tap target usability.
- Target pages: index.html
- Key checks:
  - Verify 3-column layout collapses appropriately on mobile width
  - Attempt to toggle a species checkbox to assess 13x13px tap target difficulty
  - Scrub the month slider and use the play/pause button on mobile
  - Attempt to select an individual on the map via touch
  - Check for horizontal scrolling or overflow issues
- Exit criteria:
  - Primary playback and filtering flows executed on mobile viewport
  - Tap target and layout issues identified

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

