# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Climate Almanac explorer, validating the main multi-variable chart workflow, adjacent controls, and responsive usability on both desktop and mobile.

## Plan Summary

The run should focus on index.html as the only known page and treat the chart explorer as the core experience. Start by validating the default state and the main variable-selection flow, then expand into region, smoothing, axis, layer, note, share, download, and source-link behaviors. Because the prescan shows hover-dependent inspection, overlaid series, removable layers, and several small tap targets, the run should include deliberate state changes, recovery/reset checks, and a mobile pass over the most interaction-heavy controls.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and revisit it under both desktop and mobile viewports while exercising multiple internal states.`
- features: `Exercise all visible variable checkboxes, both selectors, both y-axis radio options, layer removal, chart inspection, reset, note, share, download, top-nav items, and source links; attempt reorder only if draggable behavior is actually present.`
- mobile: `Repeat the default state, variable selection/removal, one full compare flow (region + smoothing + axis), chart inspection attempt, and header actions on a mobile viewport.`

## Planned Phases

### Baseline explorer state

- Objective: Confirm the default desktop experience, initial selections, and visible information architecture before changing state.
- Target pages: index.html
- Key checks:
  - Verify default active variables match the visible chart and layer list (Surface temperature anomaly and Atmospheric CO₂)
  - Confirm page title, chart title, subtitle metadata, axes, sources, Inspector placeholder, and existing annotations are coherent on load
  - Check whether top navigation items with href="#" do nothing, scroll, or open in-page UI
  - Record whether Reset zoom, + Note, Share view, and Download .csv are immediately available and visually understandable
- Exit criteria:
  - Default selections, chart content, and side panels are documented
  - Initial behavior of header/nav actions is observed without losing the starting state

### Primary data exploration flow

- Objective: Exercise the main workflow of choosing variables, comparing series, and reading values from the chart.
- Target pages: index.html
- Key checks:
  - Toggle each of the six variable checkboxes at least once and confirm the chart, title, legend/layers, and sources update accordingly
  - Build multiple overlays up to the stated maximum of four variables and verify the cap is enforced with clear feedback
  - Remove active series using the layer-list × control and confirm the chart and title recover correctly
  - Hover across several years on the chart and verify tooltip behavior plus Inspector updates for the same year
  - Check whether annotations remain pinned and understandable while different variables are active
- Exit criteria:
  - All visible variable controls have been exercised
  - At least one 1-variable, 2-variable, and 4-variable configuration has been validated
  - Inspector synchronization has been confirmed or a reproducible issue has been captured

### Comparative controls and state transitions

- Objective: Validate that region, smoothing, and axis options produce understandable and internally consistent chart states.
- Target pages: index.html
- Key checks:
  - Change REGION across all visible options: Global, Northern Hemisphere, Southern Hemisphere, Tropics, and Arctic, confirming chart and subtitle updates
  - Cycle through all SMOOTHING options and verify the plotted lines, title/subtitle text, and inspector interpretation remain coherent
  - Switch between Dual axes and Single (z-scored) and check for scale relabeling, legend clarity, and sensible comparison across mixed-unit variables
  - Combine control changes (for example region + smoothing + axis) and confirm state persists without losing selected variables
  - Use any visible chart range/brush interaction if available, then test Reset zoom to ensure clean recovery
- Exit criteria:
  - Every visible select/radio option has been tested at least once
  - A compounded state change has been validated and successfully reset

### Secondary actions and edge behaviors

- Objective: Probe non-core but important actions that affect sharing, export, notes, sources, and recoverability.
- Target pages: index.html
- Key checks:
  - Click Share view and determine whether it exposes a URL/state-sharing mechanism, copies something, or fails silently
  - Click Download .csv and verify whether a file downloads, a data export is generated, or an error/blocked behavior occurs in the local environment
  - Open or trigger + Note if possible and assess whether note creation UI appears and whether it can be dismissed or saved
  - Activate the visible source links and observe whether they open inline, navigate, or act as inert placeholders
  - If drag handles are operable, attempt a simple layer reorder and confirm plotted/legend ordering changes predictably
- Exit criteria:
  - Each visible secondary action has been attempted once
  - Any no-op, placeholder, or broken behavior has been distinguished from intentional local-demo limitations

### Mobile critical-path verification

- Objective: Repeat the most important explorer tasks on mobile to assess layout resilience, tapability, and accessibility of key interactions.
- Target pages: index.html
- Key checks:
  - Inspect mobile layout of the three-panel explorer and determine whether controls, chart, inspector, and annotations remain reachable in a sensible order
  - Repeat core variable selection and removal tasks on mobile, paying special attention to the tiny checkbox and × tap targets flagged in prescan
  - Repeat one region change, one smoothing change, and one axis toggle on mobile and confirm controls are operable without accidental taps
  - Attempt chart inspection on mobile and note whether hover-dependent information has an equivalent interaction or becomes inaccessible
  - Retest Share view, Download .csv, Reset zoom, and + Note on mobile if visible
- Exit criteria:
  - The primary exploration flow has been revalidated on mobile
  - Major mobile blockers, especially around tap targets and chart inspection, are documented

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

