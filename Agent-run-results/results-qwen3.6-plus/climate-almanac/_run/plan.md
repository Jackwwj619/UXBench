# UXAgent Exploration Plan

## Goal

Evaluate the usability, responsiveness, and data integrity of the Climate Almanac explorer, focusing on the multi-variable overlay logic, chart interactivity, and mobile accessibility.

## Plan Summary

The run will proceed by first validating the core visualization loop (selecting variables, changing regions/smoothing) to ensure the chart updates correctly. It will then test edge cases like maximum variable limits and axis toggling. Finally, it will switch to mobile viewport to assess the critical tap-target issues identified in the prescan and verify layout adaptability.

## Coverage Targets

- pages: `100% of visible interactive states within index.html`
- features: `All 6 variables, 5 regions, 4 smoothing options, 2 axis modes, and export functions`
- mobile: `Full layout reflow validation and critical path interaction test`

## Planned Phases

### Core Visualization & Control Loop

- Objective: Validate that the primary inputs (Variables, Region, Smoothing) correctly update the central chart and metadata.
- Target pages: index.html
- Key checks:
  - Toggle all 6 variable checkboxes individually to verify series appear/disappear.
  - Attempt to select a 5th variable to test the 'up to four' constraint enforcement.
  - Change 'Region' dropdown (e.g., to Arctic) and verify chart title/data updates.
  - Change 'Smoothing' (e.g., to No smoothing) and observe chart granularity changes.
  - Verify the 'Layers' list updates dynamically when variables are toggled.
- Exit criteria:
  - All 6 variables have been toggled on/off at least once.
  - At least 2 different Regions and Smoothing options have been applied.
  - Chart renders without console errors after each change.

### Chart Interaction & Data Inspection

- Objective: Test the fidelity of the data visualization, including tooltips, zooming, and axis configuration.
- Target pages: index.html
- Key checks:
  - Hover over multiple points on the chart to trigger tooltips; verify values match the Inspector panel.
  - Toggle Y-Axis between 'Dual axes' and 'Single (z-scored)' to check axis label and scale changes.
  - Use 'Reset zoom' button after interacting with the chart (if zoom functionality exists via scroll/drag).
  - Click '+ Note' to test annotation creation flow (if interactive) or inspect modal behavior.
  - Inspect existing Annotations in the right rail; click 'x' to dismiss one and verify chart marker removal.
- Exit criteria:
  - Tooltips display valid numerical data for hovered years.
  - Inspector panel updates synchronously with chart hover.
  - Y-Axis toggle visibly changes the chart's vertical scale/labels.

### Export, Sharing & Navigation

- Objective: Validate secondary actions and global navigation elements.
- Target pages: index.html
- Key checks:
  - Click 'Download .csv' and verify a file download is initiated (or blob created).
  - Click 'Share view' and check for URL update or clipboard notification.
  - Click top-nav links (Datasets, Stories, Methods, About) to determine if they are functional placeholders or broken.
  - Click Source links in the left rail (e.g., 'Berkeley Earth...') to verify external linking behavior.
- Exit criteria:
  - Download action triggers browser download prompt or equivalent.
  - Navigation links either route to content or clearly indicate 'coming soon' state without crashing.

### Mobile Responsiveness & Accessibility

- Objective: Assess layout adaptation and usability on small screens, specifically targeting known tap-target risks.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Verify the three-panel layout collapses into a stacked or drawer-based layout.
  - Attempt to toggle variables using the small checkboxes; note difficulty or need for zoom.
  - Check if the chart remains readable and interactive on narrow widths.
  - Verify the Inspector panel is accessible (does it move below chart or become a modal?).
  - Test touch interactions for chart hovering (tap-to-inspect vs hover).
- Exit criteria:
  - No horizontal scrolling required for main content.
  - Critical controls (variable toggles) are usable, even if difficult due to size.
  - Chart text labels do not overlap illegibly.

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

