# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Climate Almanac data visualization tool, validating all interactive controls, chart states, and responsive layouts.

## Plan Summary

The exploration will proceed through four phases, starting with the primary data visualization flow by manipulating variables, regions, and smoothing options. Next, it will validate chart interactions like hovering, zooming, and annotations, followed by testing utility actions like sharing and downloading. Finally, the entire flow will be re-validated on a mobile viewport to assess responsive behavior and layout warnings.

## Coverage Targets

- pages: `100% of known pages (index.html)`
- features: `100% of left-rail controls, chart interactions, and top-bar actions exercised`
- mobile: `Full repeat of variable selection, chart interaction, and layout validation on mobile viewport`

## Planned Phases

### Variable Selection and Configuration

- Objective: Validate the left rail controls for selecting climate variables, regions, smoothing, and axis modes.
- Target pages: index.html
- Key checks:
  - Toggle each of the 6 variable checkboxes and verify chart updates accordingly
  - Attempt to select more than 4 variables to test the limit enforcement and user feedback
  - Change the Region dropdown to 'Arctic (60°N–90°N)' and verify data updates
  - Cycle through Smoothing options (3-year, 10-year, 30-year) and observe chart transformations
  - Switch Y-AXIS radio from 'Dual axes' to 'Single (z-scored)' and verify axis scaling changes
- Exit criteria:
  - All 6 variables have been toggled
  - Region and Smoothing dropdowns have been changed and reverted
  - Y-axis mode has been switched successfully

### Chart Interaction and Inspector

- Objective: Validate the central chart area interactions, the right inspector panel, and annotation features.
- Target pages: index.html
- Key checks:
  - Hover over the chart and verify the tooltip appears and the right-rail Inspector updates with year values
  - Click the '+ Note' button and verify an annotation can be added to the chart
  - Dismiss an existing annotation using the '×' button and verify it disappears
  - Click 'Reset zoom' if zoom is applicable, or verify its presence/state
  - Attempt to drag layers to reorder them in the 'LAYERS DRAG TO REORDER' section
- Exit criteria:
  - Inspector panel has been populated via hover
  - Annotation added and removed successfully
  - Layer order changed via drag interaction

### Utility Actions and Navigation

- Objective: Test the top-bar utility actions and secondary navigation links.
- Target pages: index.html
- Key checks:
  - Click 'Share view' and verify the outcome (clipboard copy, modal, or URL update)
  - Click 'Download .csv' and verify a file is downloaded or appropriate action occurs
  - Click the 'Datasets', 'Stories', 'Methods', and 'About' links to check for dead ends or modals
- Exit criteria:
  - Share and Download actions have been triggered
  - All top navigation links have been clicked and behavior observed

### Mobile Viewport Validation

- Objective: Re-test critical flows and assess layout adaptability on a mobile viewport, focusing on identified small tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the three-panel layout adapts (e.g., stacks vertically)
  - Attempt to select variables using the small 13x13px checkboxes on mobile
  - Interact with the chart (hover/tap) to verify Inspector panel updates on mobile
  - Verify dropdowns (Region, Smoothing) are usable on a touch screen
  - Check if drag-to-reorder layers works via touch interactions
- Exit criteria:
  - Mobile layout has been visually verified
  - Primary configuration and interaction flows completed on mobile
  - Tap target usability has been assessed

## Prescan Summary

### Climate Almanac — multi-variable explorer

- Page: `index.html`
- Headings: VARIABLES, REGION, SMOOTHING, Y-AXIS, LAYERS
DRAG TO REORDER, SOURCES, Surface temperature anomaly & Atmospheric CO₂, Inspector, Annotations
- Interactables: `9` buttons, `9` links, `10` inputs
- Notable controls:
  - clickable:a:Explorer
  - clickable:a:Datasets
  - clickable:a:Stories
  - clickable:a:Methods
  - clickable:a:About
  - clickable:button:Share view
  - clickable:button:Download .csv
  - clickable:input:Surface temperature anomaly

