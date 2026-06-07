# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the Climate Almanac data-explorer, focusing on the primary variable-to-chart-to-inspector interaction and the adjacent flows (sharing, downloading, and navigation).

## Plan Summary

Run begins on index.html and exercises the core loop: add/remove overlay variables, change region/smoothing/y-axis mode, and verify that hovering the chart updates the right-rail inspector consistently. Then validate secondary controls: annotations (pinned notes and close controls), zoom/reset, ordering via drag, and finally Share view and Download .csv. Complete coverage by repeating critical checks on mobile viewport.

## Coverage Targets

- pages: `visit all known HTML pages (only index.html from prescan)`
- features: `exercise most visible controls per key page: all variable checkboxes, REGION dropdown, SMOOTHING dropdown, Y-AXIS radios, drag-to-reorder, Reset zoom, + Note, annotation dismiss, Share view, and Download .csv`
- mobile: `repeat critical checks on mobile viewport for: variable toggles + chart hover/inspector sync, access to inspector/annotations, and Share/Download actions`

## Planned Phases

### Establish primary interaction loop (desktop)

- Objective: Confirm that the variable selection and chart hover interaction work as designed and that the right-rail inspector reflects the hovered year consistently.
- Target pages: index.html
- Key checks:
  - With default selected layers, hover multiple distinct years on the chart and verify the tooltip year/value and Inspector values update in sync
  - Toggle variable checkboxes on/off one at a time (Surface temperature anomaly, Precipitation, Atmospheric CO₂, Global mean sea level, Arctic sea-ice extent, ENSO index) and validate the chart series visibility and legend/labels
  - Add up to 4 layers (as UI promises) and verify readability/scale handling remains stable
- Exit criteria:
  - Hovering across at least 3 different years updates tooltip and Inspector consistently
  - At least 3 variable toggles are validated with visible chart changes and no UI errors
  - A 4-layer overlay scenario is reached and remains interactive

### Validate configuration controls (region, smoothing, y-axis)

- Objective: Ensure that dropdowns/radios correctly recompute chart rendering and that y-axis mode changes affect labeling/scale as expected.
- Target pages: index.html
- Key checks:
  - Change REGION via the dropdown (Global → Northern Hemisphere → Southern Hemisphere → Tropics → Arctic) and verify chart updates without breaking hover/tooltips
  - Change SMOOTHING (No smoothing, 3-year, 10-year, 30-year normal) and verify the chart shape changes and Inspector hover still maps to the same year system
  - Toggle Y-AXIS between Dual axes and Single (z-scored) and verify axis/scale behavior is consistent with the labeling (e.g., absolute vs unit-less)
- Exit criteria:
  - All dropdown/radio options are exercised at least once
  - After each option change, hovering still updates the Inspector correctly
  - No visual overlap or missing series occurs after y-axis mode switches

### Layer ordering, zoom, notes, and annotations

- Objective: Test stateful interactions that can change rendering order or add persistent UI elements, including error-prone dismissal and reset behaviors.
- Target pages: index.html
- Key checks:
  - Use drag-to-reorder in the LAYERS area to change layer order; verify chart legend/stack order and that hover values still correspond to the correct series
  - Use + Note (ux-25) to add at least one note; verify the note appears in Annotations area and remains visible after subsequent hover/setting changes
  - Use the × close control on pinned annotations (e.g., ux-18 shown) and verify the note is removed and layout remains intact
  - Test zoom controls: apply zoom (e.g., via chart interaction) then click Reset zoom (ux-24); verify chart returns to full range and hover/Inspector mapping works again
- Exit criteria:
  - At least one drag reorder is validated with correct hover/series association
  - A note can be added and dismissed without breaking the inspector or chart
  - Zoom then Reset zoom returns the chart to baseline and hover mapping remains correct

### Secondary actions: Share view and Download .csv (desktop)

- Objective: Validate whether share/download reflect the current explorer state (selected layers, region, smoothing, y-axis, and ordering) and can be used without errors.
- Target pages: index.html
- Key checks:
  - Click Share view (ux-6) and verify the expected share UI/behavior appears (e.g., link/copy) and includes current configuration
  - Change the explorer state (e.g., toggle one variable and switch smoothing) then share again to confirm the shared state differs appropriately
  - Click Download .csv (ux-7) and verify the download starts and contains columns/rows consistent with currently selected variables and year range shown in the chart header
- Exit criteria:
  - Share view produces a usable output (link or copy) tied to the current configuration
  - At least one CSV download is generated and inspected for schema alignment with active layers

### Mobile critical path validation

- Objective: Re-run the highest-impact checks on a mobile viewport, emphasizing small tap targets and chart/side-rail interactions.
- Target pages: index.html
- Key checks:
  - Repeat variable toggle + hover sync validation (from Phase 1) to ensure interaction remains possible with small checkbox targets
  - Verify scroll/access to Inspector and Annotations panels and that chart hover (or equivalent touch interaction) updates values
  - Test Share view and Download .csv tap targets are reachable and actions succeed on mobile
- Exit criteria:
  - Core loop (select variable(s) → chart inspect → inspector updates) works on mobile
  - Share view and Download .csv can be triggered successfully on mobile without UI trapping

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

