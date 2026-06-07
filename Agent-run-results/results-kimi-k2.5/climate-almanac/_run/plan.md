# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the climate-almanac system, focusing on the primary data visualization flow, adjacent states, and recovery paths.

## Plan Summary

The exploration will start with validating the primary data visualization flow on the index.html page, including variable selection, region and smoothing changes, and chart interactions. Then, it will check adjacent flows like sharing, downloading, and annotation management. Mobile viewport checks will be done for critical controls. High-risk areas like small tap targets and complex chart interactions will be validated.

## Coverage Targets

- pages: `Visit and fully explore the only known HTML page (index.html).`
- features: `Exercise all visible controls (variables, region, smoothing, y-axis, chart interactions, share, download, annotations) on index.html.`
- mobile: `Repeat critical checks (variable selection, chart interactions, key buttons) on mobile viewport.`

## Planned Phases

### Primary Data Visualization Flow

- Objective: Validate the core data exploration flow: variable selection, region/smoothing/y-axis changes, and chart interactions.
- Target pages: index.html
- Key checks:
  - Select/deselect variables (e.g., Precipitation, Global mean sea level) and observe chart updates.
  - Change region (e.g., Northern Hemisphere) and smoothing (e.g., 10-year running mean) and check chart responsiveness.
  - Interact with the chart (hover for tooltip, drag to reorder layers, reset zoom) and verify inspector/annotation updates.
- Exit criteria:
  - All variable selection combinations (up to four) are tested.
  - Region, smoothing, and y-axis changes are validated with chart updates.
  - Chart interactions (hover, layer reorder, zoom) work as expected.

### Adjacent Flows and Recovery Paths

- Objective: Validate secondary flows: sharing, downloading, annotation management, and error recovery (if applicable).
- Target pages: index.html
- Key checks:
  - Click 'Share view' and 'Download .csv' to check functionality (even if downloads are dummy for demo).
  - Add/remove annotations (e.g., '+ Note', delete existing annotations) and verify inspector updates.
  - Test recovery paths (e.g., reset zoom after manual zoom, clear all variables to start over).
- Exit criteria:
  - Sharing and downloading actions are triggered (no errors).
  - Annotation management (add/delete) works with inspector updates.
  - Recovery paths (reset zoom, clear variables) restore initial state.

### Mobile Viewport Checks

- Objective: Validate critical controls and layout on mobile viewport (smaller screen).
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and check visibility/accessibility of key controls (variable checkboxes, navigation links, chart interactions).
  - Test variable selection, region/smoothing changes, and chart interactions on mobile.
  - Verify that small tap targets (e.g., navigation links, checkboxes) are usable (even if below 44px, check for responsiveness).
- Exit criteria:
  - Critical controls are visible and accessible on mobile.
  - Variable selection, region/smoothing changes, and chart interactions work on mobile.
  - Small tap targets are responsive (even if visually small, interactions trigger as expected).

### High-Risk Hotspot Validation

- Objective: Validate high-risk areas: small tap targets and complex chart interactions for usability and error handling.
- Target pages: index.html
- Key checks:
  - Test small tap targets (e.g., variable checkboxes, navigation links) on mobile for touch usability (multiple taps if needed, but check if they work).
  - Validate complex chart interactions (e.g., simultaneous multi-variable overlay, dual-axis vs single) for clarity and error handling.
  - Check for error states (e.g., selecting more than four variables, invalid combinations) and recovery.
- Exit criteria:
  - Small tap targets are usable (even with workarounds) on mobile.
  - Complex chart interactions are clear and error-free.
  - Error states (if any) have proper recovery mechanisms.

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

