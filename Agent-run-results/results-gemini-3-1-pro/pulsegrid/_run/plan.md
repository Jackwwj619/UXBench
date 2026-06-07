# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full pulsegrid SCADA dashboard, ensuring all interactive widgets, data tables, and filtering mechanisms function correctly across different pages.

## Plan Summary

The exploration will start on the primary Overview dashboard, testing key widgets like the load chart and generator status toggles. It will then proceed systematically through the main adjacent flows: Alarms management, Generators directory, and Forecast details, interacting with specific filters and controls on each. Finally, it will verify global layout consistency, top bar controls (including theme toggles), and responsive behavior on mobile.

## Coverage Targets

- pages: `Visit all 4 functional HTML pages (index, alarms, generators, forecast).`
- features: `Exercise filtering (selects, inputs, pill buttons) on list pages, chart timespan toggles, and global top bar controls.`
- mobile: `Ensure the complex data tables (Generators, Alarms) and main navigation are assessed in the mobile viewport.`

## Planned Phases

### Dashboard Overview

- Objective: Validate the primary overview page widgets and top-level controls.
- Target pages: index.html
- Key checks:
  - Toggle the Load Chart timespans (24h, 48h, 7d)
  - Toggle the Generator status pills in the dashboard widget (Online, Tripped, Maintenance)
  - Change the BA selector dropdown and verify if it triggers a view update
  - Toggle between Production, Replay, and Plan modes
  - Click the theme toggle (☾) and check for visual changes
- Exit criteria:
  - All dashboard interactive elements have been exercised and any state changes or lack thereof recorded.

### Alarms Management

- Objective: Test the filtering and actioning of system alarms.
- Target pages: alarms.html
- Key checks:
  - Navigate to Alarms via the left rail or dashboard widget link
  - Change the Severity, Status, and Time dropdown filters
  - Enter text into the search input
  - Select an alarm checkbox and click 'Acknowledge selected'
  - Click an individual 'Open →' button on an alarm row
- Exit criteria:
  - Alarm filtering combinations tested and alarm action buttons clicked.

### Generators Directory

- Objective: Evaluate the grid layout and multifaceted filtering of generators.
- Target pages: generators.html
- Key checks:
  - Navigate to Generators page
  - Click through the status filter pills (All, Online, Ramping, Tripped, Maintenance)
  - Change the Fuel and Zone dropdown selects
  - Type in the 'Search by name, plant, or EMS ID' input
  - Click a 'Details →' link for a specific generator
- Exit criteria:
  - Generator list filters successfully applied and interactions logged.

### Forecast View

- Objective: Check the forecast charts and data presentation.
- Target pages: forecast.html
- Key checks:
  - Navigate to the Forecast page
  - Change the forecast model dropdown (Day-ahead, Hour-ahead, Real-time)
  - Toggle the chart timespan buttons (12h, 24h, 7d)
  - Attempt to click/tap a row in the Hourly breakdown table (as hinted by 'tap a row to overlay on chart')
- Exit criteria:
  - Forecast controls exercised and table interactivity verified.

### Global Navigation & Mobile Resilience

- Objective: Ensure all navigation paths are tested, including edge cases, and evaluate mobile responsiveness.
- Target pages: index.html, alarms.html, generators.html
- Key checks:
  - Click the 'Topology' and 'Events' links to confirm behavior (expected to stay on page or no-op)
  - Click the ⌘K button to see if a search modal appears
  - Switch to mobile viewport mode
  - Verify if the left rail navigation collapses into a hamburger menu and can be opened
  - Check horizontal scrolling or responsive stacking on the Alarms and Generators tables
- Exit criteria:
  - All main nav links clicked, command palette tested, and critical screens viewed in mobile dimensions.

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

