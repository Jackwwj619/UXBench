# UXAgent Exploration Plan

## Goal

Validate the core data visualization flow of the Migration Atlas, specifically focusing on the interaction between filters, the timeline player, and the map rendering, while assessing mobile usability given identified layout risks.

## Plan Summary

The exploration will proceed by first establishing a baseline view with default filters, then systematically manipulating the timeline (scrubbing and playing) to verify SVG trail updates. Subsequently, it will test filter logic (species toggles, year selection) and display options. Finally, it will validate the 'Individual' inspector panel interactions and repeat critical checks on a mobile viewport to address known tap-target issues.

## Coverage Targets

- pages: `100% of html_files (index.html)`
- features: `All inputs (checkboxes, sliders, selects), buttons (play, save, cite), and map interactions.`
- mobile: `Repeat Phase 1 and Phase 2 key checks on mobile viewport.`

## Planned Phases

### Baseline & Timeline Mechanics

- Objective: Verify the default state renders correctly and the primary time-navigation controls function as expected.
- Target pages: index.html
- Key checks:
  - Confirm initial load shows '2025 season' and 'May' as current month.
  - Scrub the month slider manually from Jan to Dec and observe trail extension/retraction.
  - Click 'Play' and verify the slider advances automatically; click 'Pause' to stop.
  - Change playback speed (0.5x, 2x, 4x) and observe cadence change.
- Exit criteria:
  - Slider moves smoothly across all months.
  - Map trails visually update in sync with the selected month.
  - Play/Pause/Speed controls respond without console errors.

### Filtering & Display Logic

- Objective: Validate that left-rail filters correctly isolate data subsets and toggle visual layers.
- Target pages: index.html
- Key checks:
  - Toggle 'Western osprey' off; verify its trails disappear from the map and count drops.
  - Use 'Filter species...' input to search for 'turtle'; verify only Leatherback remains.
  - Switch 'Study Year' to '2024' and '2026'; verify map data resets/updates accordingly.
  - Toggle 'Show trail', 'Show monthly positions', and 'Show stop-over polygons' individually to verify layer visibility.
- Exit criteria:
  - Map reflects active filters accurately.
  - Species counts in the legend update dynamically.
  - Display toggles show/hide specific SVG elements without layout shift.

### Inspector & Interaction Flow

- Objective: Test the drill-down capability from the global map to individual animal details.
- Target pages: index.html
- Key checks:
  - Click on a visible trail or dot on the map.
  - Verify the 'Individual' panel on the right populates with specific data (ID, stats).
  - Check if the selected individual is highlighted on the map while others dim (if applicable).
  - Attempt to 'Save view' and 'Cite this view' to check for modal dialogs or copy-to-clipboard actions.
- Exit criteria:
  - Inspector panel updates contextually based on map selection.
  - Action buttons ('Save', 'Cite') provide user feedback (toast/modal).

### Mobile Usability & Navigation

- Objective: Assess the interface on a mobile viewport, focusing on the high-risk small tap targets identified in the prescan.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Attempt to toggle a species checkbox (verify if hit-area is sufficient despite small visual size).
  - Test the month slider scrubbing on touch.
  - Check if the three-column layout collapses into a stacked or tabbed view.
  - Verify top navigation links are clickable.
- Exit criteria:
  - Core functionality (filtering, playing timeline) is accessible on mobile.
  - Identify any completely unusable controls due to overlap or size.

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

