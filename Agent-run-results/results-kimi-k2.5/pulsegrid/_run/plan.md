# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the PulseGrid system, focusing on the primary dashboard flow (index.html) and adjacent pages (generators.html, forecast.html, alarms.html), validating interactions, states, and recovery paths across desktop and mobile viewports.

## Plan Summary

The exploration will proceed in phases: first, validate the primary dashboard (index.html) interactions (nav, KPI cards, charts, generator grid, alarms). Then, explore adjacent pages (generators, forecast, alarms) to test filters, tables, and alarm workflows. Finally, repeat critical checks on mobile viewport. Each phase will validate specific controls and states, with exit criteria based on coverage of key interactions.

## Coverage Targets

- pages: `Visit all 4 known HTML pages (index, generators, forecast, alarms) and validate key interactions on each.`
- features: `Exercise most visible controls: navigation (left rail, top bar), filters (generator, alarm, forecast), charts (system load, forecast), tables (generator list, alarm list), and status transitions (alarm acknowledgment, generator status).`
- mobile: `Repeat critical checks (navigation, filters, charts, tables) on mobile viewport to ensure responsive UX and tap target usability.`

## Planned Phases

### Primary Dashboard (index.html) Exploration

- Objective: Validate key interactions on the main dashboard: navigation, KPI cards, system load chart, generator status grid, active alarms, and top bar controls (BA selector, theme toggle, ⌘K, etc.).
- Target pages: index.html
- Key checks:
  - Click left rail nav items (Overview, Generators, Forecast, Alarms) to confirm navigation and active states.
  - Interact with top bar controls: BA selector (Western/ERCOT/SPP/MISO), Production/Replay/Plan tabs, theme toggle (☾), ⌘K, alert bell, operator avatar.
  - Validate system load chart tabs (24h/48h/7d) and 'NOW' marker interaction.
  - Test generator status grid filters (All/Online/Tripped/Maintenance) and 'View all 312 →' link to generators.html.
  - Check active alarms list and 'All alarms →' link to alarms.html.
  - Verify KPI cards (demand, generation, frequency, renewables share, active alarms) for sparkline and value interactions.
- Exit criteria:
  - All left rail nav items and top bar controls are interacted with.
  - System load chart tabs and generator grid filters are tested.
  - KPI cards and active alarms list interactions are validated.

### Generators Page (generators.html) Exploration

- Objective: Test generator list filters (status pills, fuel, zone, search), sortable table interactions, and unit details links.
- Target pages: generators.html
- Key checks:
  - Interact with status pills (All/Online/Ramping/Tripped/Maintenance) to filter generator list.
  - Test fuel and zone selectors to filter units (e.g., 'Natural gas', 'AZ' zone).
  - Use search input to filter by unit/plant/EMS ID (e.g., 'PVN-1').
  - Validate sortable table interactions (click headers to sort, if applicable) and 'Details →' links for units (e.g., PVN-1).
  - Check 'View all 312 →' link from index.html to generators.html for consistency.
- Exit criteria:
  - All status pills, fuel, and zone filters are tested.
  - Search input and table interactions (sort, details) are validated.

### Forecast Page (forecast.html) Exploration

- Objective: Explore forecast page controls: time range tabs (Day-ahead/Hour-ahead/Real-time), load chart, and hourly breakdown table.
- Target pages: forecast.html
- Key checks:
  - Interact with time range tabs (Day-ahead/Hour-ahead/Real-time) to switch forecast views.
  - Test load chart tabs (12h/24h/7d) and overlay interactions (tap a row in hourly breakdown to overlay on chart).
  - Validate hourly breakdown table for forecast, P10-P90 range, and reserve calculations.
- Exit criteria:
  - Time range tabs and load chart tabs are interacted with.
  - Hourly breakdown table rows are tested for overlay interaction.

### Alarms Page (alarms.html) Exploration

- Objective: Test alarm filtering (severity, status, time), acknowledgment, and resolved workflows.
- Target pages: alarms.html
- Key checks:
  - Interact with severity filters (All/Critical only/Major+/Minor only) and status filters (Open/Acknowledged/Resolved/All).
  - Test time filters (Last 24h/Last 1h/Last 6h/This shift) and search/filter by unit/rule/owner.
  - Validate 'Acknowledge selected' button and alarm status transitions (Open → Acknowledged).
  - Check resolved alarms and auto-cleared logic.
- Exit criteria:
  - All severity, status, and time filters are tested.
  - Alarm acknowledgment and status transitions are validated.
  - Resolved alarms and search functionality are tested.

### Mobile Viewport Validation

- Objective: Repeat critical checks from phases 1-4 on mobile viewport to validate responsive UX and tap target usability.
- Target pages: index.html, generators.html, forecast.html, alarms.html
- Key checks:
  - Test left rail nav (collapsed/expanded state) and top bar controls for tap target size (≥44px).
  - Validate system load chart and generator status grid interactions on mobile (touch targets, responsiveness).
  - Test generator filters (status pills, fuel, zone) and alarm filters on mobile for usability.
  - Check KPI cards and active alarms list for touch interactions on mobile.
- Exit criteria:
  - Critical desktop interactions are successfully repeated on mobile.
  - Tap target issues (per layout warnings) are validated for usability on mobile.

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

