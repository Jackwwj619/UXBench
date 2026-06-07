# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the PulseGrid SCADA/EMS dashboard, validating primary monitoring flows, adjacent detail pages, interactive controls, and responsive mobile layouts.

## Plan Summary

The exploration will start by validating the primary dashboard overview and its high-density data visualizations, then proceed to adjacent detail pages (Generators, Forecast, Alarms) to test filtering and navigation. It will specifically target high-risk interactive controls like the BA selector, mode tabs, and alarm acknowledgement. Finally, critical paths will be re-validated on a mobile viewport to assess responsive layout and tap target issues.

## Coverage Targets

- pages: `visit all 4 known HTML pages`
- features: `exercise all visible filters, selectors, and primary actions on each page`
- mobile: `repeat critical dashboard and alarm checks on mobile viewport`

## Planned Phases

### Dashboard Overview Validation

- Objective: Validate the primary SCADA dashboard layout, KPIs, and core interactive controls on desktop.
- Target pages: index.html
- Key checks:
  - Verify BA selector changes the context (Western / ERCOT / SPP / MISO)
  - Click Production, Replay, and Plan tabs to check for state changes
  - Toggle the ☾ theme to dark mode and verify contrast and readability
  - Click ⌘K to verify command palette/search opens
  - Click 🔔 to check alert/notification panel
  - Interact with chart time ranges (24h, 48h, 7d) and verify visual updates
  - Click generator status pills (All, Online, Tripped, Maintenance) to filter the 24-cell grid
- Exit criteria:
  - All top bar controls have been clicked and responses observed
  - Chart and generator grid filters function without layout breakage
  - Theme toggle successfully switches visual mode

### Generators Deep Dive

- Objective: Validate the generator list page, focusing on filtering, searching, and detail access.
- Target pages: generators.html
- Key checks:
  - Navigate from index.html 'View all 312 →' to generators.html
  - Type in the search input (e.g., 'Palo Verde') and verify table filters
  - Click status pills (Online 30, Ramping 3, Tripped 2, Maintenance 3)
  - Use 'All fuels' and 'All zones' dropdowns to filter the table
  - Click 'Details →' for a tripped unit (e.g., COL-3) to check for detail view/modal
- Exit criteria:
  - Search and all filter combinations yield correct table updates
  - Details link interaction is verified
  - No layout overflow in the wide data table

### Forecast & Alarms Adjacent Flows

- Objective: Validate the forecast model views and the critical alarms management workflow.
- Target pages: forecast.html, alarms.html
- Key checks:
  - On forecast.html, switch Day-ahead / Hour-ahead / Real-time models
  - Click chart time ranges (12h, 24h, 7d) and tap an hourly row to overlay on chart
  - Navigate to alarms.html via the '⚠ Alarms 8' nav link
  - Select a critical alarm checkbox and click 'Acknowledge selected'
  - Use Severity, Status, and Time dropdowns to filter the alarm list
  - Type in the 'Filter by unit, rule, or owner…' input
- Exit criteria:
  - Forecast model and time range switches update the chart and table
  - Alarm acknowledgement action provides clear feedback
  - Alarm filters successfully narrow down the list

### Mobile Responsive & Accessibility Check

- Objective: Re-validate critical flows and layout integrity on a mobile viewport, addressing known tap target and label issues.
- Target pages: index.html, alarms.html
- Key checks:
  - Switch to mobile viewport and check for layout collapse/overflow on index.html KPIs and charts
  - Verify left rail navigation is accessible (e.g., hamburger menu) and usable despite small tap targets
  - Test BA selector accessibility and interaction on mobile
  - Check alarm list readability and checkbox tap targets on alarms.html
- Exit criteria:
  - Mobile layout renders without horizontal scroll on core pages
  - Navigation and critical selectors remain functional
  - Tap target and missing label issues are documented with visual evidence

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

