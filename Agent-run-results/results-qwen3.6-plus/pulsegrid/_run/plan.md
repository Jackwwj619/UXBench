# UXAgent Exploration Plan

## Goal

Evaluate the UX of PulseGrid, a fictional SCADA/EMS dashboard, focusing on information hierarchy, critical alert handling, and data visualization clarity across desktop and mobile viewports.

## Plan Summary

The exploration will begin with the Overview dashboard to assess high-level situational awareness (KPIs, charts). It will then drill down into specific workflows: managing active alarms, filtering the generator fleet, and analyzing load forecasts. The run will conclude by validating global controls (BA switching, theme toggle) and checking mobile responsiveness for critical tap targets identified in the prescan.

## Coverage Targets

- pages: `Visit all 4 functional HTML files (index, alarms, generators, forecast).`
- features: `Exercise all filter types (dropdowns, pills, search), chart hovers, and global toggles.`
- mobile: `Perform a full pass on index.html and alarms.html using a mobile viewport to check layout shifts and tap targets.`

## Planned Phases

### Overview Dashboard & Global Controls

- Objective: Validate the primary situational awareness view and global navigation elements.
- Target pages: index.html
- Key checks:
  - Verify KPI cards display clear trends (sparklines) and status colors.
  - Test 'Western Interconnect' BA selector dropdown for options (ERCOT, SPP, MISO).
  - Toggle 'Production', 'Replay', and 'Plan' tabs to observe data context changes.
  - Check theme toggle (☾) functionality.
  - Hover over 'System load' chart to verify tooltip data availability.
- Exit criteria:
  - Global nav items respond to interaction.
  - Chart tooltips appear on hover.
  - Theme toggle visually updates the interface.

### Alarm Management Workflow

- Objective: Assess the usability of the alarm list for rapid identification and resolution.
- Target pages: alarms.html
- Key checks:
  - Review default sort order and severity highlighting (Critical vs. Major).
  - Test filtering by Severity (Critical only) and Status (Open/Acked).
  - Attempt to 'Acknowledge' a single alarm and verify state change.
  - Test 'Acknowledge selected' bulk action if checkboxes are present.
  - Verify time-range filters (Last 1h, Last 24h) update the list.
- Exit criteria:
  - Filters correctly narrow the alarm list.
  - Acknowledgement provides immediate visual feedback.
  - Severity colors are distinct and legible.

### Generator Fleet Inspection

- Objective: Evaluate the efficiency of finding specific assets within a large dataset.
- Target pages: generators.html
- Key checks:
  - Use search input to find a specific unit (e.g., 'Palo Verde').
  - Apply combined filters: Status 'Tripped' + Fuel 'Coal'.
  - Check pagination or scrolling behavior for the full list of 38 units.
  - Click 'Details →' on a generator to check for modal or page transition (if available).
- Exit criteria:
  - Search results are accurate and fast.
  - Combined filters do not break the layout.
  - Status pills clearly indicate current fleet health.

### Forecast Analysis & Mobile Responsiveness

- Objective: Validate predictive data visualization and ensure critical controls are usable on mobile.
- Target pages: forecast.html, index.html
- Key checks:
  - On Forecast page: Toggle between 'Day-ahead', 'Hour-ahead', and 'Real-time' models.
  - On Forecast page: Check table/chart synchronization when hovering rows.
  - Switch viewport to Mobile (iPhone SE/Pixel 5).
  - Verify sidebar navigation collapses/expands correctly.
  - Attempt to tap small controls (Theme toggle, BA selector) to identify touch target failures.
- Exit criteria:
  - Forecast model switching updates the chart data.
  - Mobile menu is accessible and navigable.
  - Critical alerts are visible without horizontal scrolling on mobile.

## Prescan Summary

### PulseGrid — Western Interconnect

- Page: `index.html`
- Headings: System load · today, Weather & load drivers, Generator status · 24 of 312, Active alarms, Fuel mix · live, Interchange · neighbouring BAs
- Interactables: `13` buttons, `9` links, `1` inputs
- Notable controls:
  - clickable:a:PulseGrid
  - clickable:a:▦ Overview
  - clickable:a:⚡ Generators
  - clickable:a:📈 Forecast
  - clickable:a:⚠ Alarms 8
  - clickable:a:🌐 Topology
  - clickable:a:📜 Events
  - selectable:select:Western Interconnect ERCOT SPP MISO

### Alarms — PulseGrid

- Page: `alarms.html`
- Headings: Alarms
- Interactables: `14` buttons, `7` links, `17` inputs
- Notable controls:
  - clickable:a:PulseGrid
  - clickable:a:▦ Overview
  - clickable:a:⚡ Generators
  - clickable:a:📈 Forecast
  - clickable:a:⚠ Alarms 8
  - clickable:a:🌐 Topology
  - clickable:a:📜 Events
  - clickable:button:☾

### Forecast — PulseGrid

- Page: `forecast.html`
- Headings: Load forecast, Next 24 hours · MW, Hourly breakdown, Reserve adequacy, Drivers · today vs. yesterday
- Interactables: `4` buttons, `7` links, `1` inputs
- Notable controls:
  - clickable:a:PulseGrid
  - clickable:a:▦ Overview
  - clickable:a:⚡ Generators
  - clickable:a:📈 Forecast
  - clickable:a:⚠ Alarms 8
  - clickable:a:🌐 Topology
  - clickable:a:📜 Events
  - selectable:select:Day-ahead Hour-ahead Real-time

### Generators — PulseGrid

- Page: `generators.html`
- Headings: Generators
- Interactables: `44` buttons, `7` links, `41` inputs
- Notable controls:
  - clickable:a:PulseGrid
  - clickable:a:▦ Overview
  - clickable:a:⚡ Generators
  - clickable:a:📈 Forecast
  - clickable:a:⚠ Alarms 8
  - clickable:a:🌐 Topology
  - clickable:a:📜 Events
  - typeable:input:Search by name, plant, or EMS ID…

