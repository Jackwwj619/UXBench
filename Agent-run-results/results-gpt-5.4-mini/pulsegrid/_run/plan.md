# UXAgent Exploration Plan

## Goal

Explore PulseGrid’s main operator dashboard and verify the adjacent fleet, forecast, and alarm workflows across desktop and mobile, with emphasis on state changes, filtering, and recovery paths.

## Plan Summary

Start on the Overview dashboard to confirm the top-level operational picture, then branch into the generator list, forecast view, and alarms queue using the visible navigation and in-page links. Focus on how the dashboard’s controls behave (BA selector, Production/Replay/Plan tabs, time-range toggles, status filters, search, and alarm actions), and use those pages to check whether detail/state transitions are clear and consistent. Repeat the most important interactions on mobile viewport because several navigation and header controls were flagged as small tap targets, and the BA selector lacks an input label. Avoid assuming hidden topology/events functionality beyond the placeholder links seen in the prescan.

## Coverage Targets

- pages: `Visit all known HTML pages (4/4) and validate the main entry, list, planning, and triage flows.`
- features: `Exercise most visible controls on each key page, including navigation, selectors, filters, chart horizon toggles, search, and at least one row-level or action-level interaction where present.`
- mobile: `Repeat the highest-value interactions on mobile viewport, prioritizing the header/nav controls and one primary workflow per page.`

## Planned Phases

### Baseline dashboard verification

- Objective: Validate the Overview page as the primary operator landing surface and confirm the visible cross-system status, charts, and summary cards behave coherently.
- Target pages: index.html
- Key checks:
  - Inspect the five KPI cards for readable state, trend indicators, and consistency with the visible alarm/demand/generation context.
  - Switch the system load chart between 24h, 48h, and 7d and confirm the chart and NOW marker update without layout breakage.
  - Review generator-status summary tiles, active alarms preview, fuel mix, and interchange table for internal consistency and drill-in affordances.
  - Check the BA selector, Production/Replay/Plan tabs, clock/theme/bell/command button, and note whether any of them visibly change state.
- Exit criteria:
  - All major visible Overview regions have been inspected at least once.
  - At least one time-range toggle and one top-bar control have been exercised.
  - Any obvious accessibility or interaction anomalies on the landing page have been recorded.

### Generator fleet navigation and filtering

- Objective: Validate the fleet list as the main drill-down from the dashboard and verify filtering, search, and row-level information density.
- Target pages: generators.html
- Key checks:
  - Open the generator list from the left nav and/or the 'View all 312 →' link to confirm consistent routing.
  - Exercise the status pills (All, Online, Ramping, Tripped, Maintenance) and verify the table contents respond appropriately.
  - Use the fuel and zone selectors plus the search field to narrow the list and observe whether counts/table rows update predictably.
  - Inspect a sample of rows across different states, especially tripped and maintenance units, to check clarity of status, capacity, output, operator, and details affordance.
- Exit criteria:
  - At least three filter combinations have been tested, including one search-driven narrowing.
  - A representative sample of generator states has been inspected.
  - The page’s table and controls are confirmed usable at desktop and then rechecked on mobile viewport.

### Forecast scenario and horizon checks

- Objective: Validate the forecast page’s model context, horizon controls, and hourly breakdown interactions for planning-style review.
- Target pages: forecast.html
- Key checks:
  - Confirm the model metadata, day-ahead/hour-ahead/real-time selector, and peak/reserve context are visible and understandable.
  - Toggle the 12h, 24h, and 7d horizon buttons and verify the chart and summary figures remain coherent.
  - Interact with several hourly breakdown rows to see whether row selection/overlay behavior is discoverable and stable.
  - Check the reserve adequacy warnings around higher forecast hours and whether they are legible at a glance.
- Exit criteria:
  - At least one model selector state and one horizon state have been exercised.
  - Multiple hourly rows have been inspected for interaction clarity.
  - No chart/control rendering issues appear when switching horizons.

### Alarm triage and recovery workflow

- Objective: Validate the alarms queue as the main operational recovery path, including filtering, selection, and acknowledge flows.
- Target pages: alarms.html
- Key checks:
  - Open the alarms page and verify the active/critical/resolved summary counts and mean-handle-time KPI.
  - Test severity, status, and time filters, plus the free-text filter input, to confirm the list can be narrowed in a controlled way.
  - Select one or more alarms and evaluate whether 'Acknowledge selected' reflects the current selection state appropriately.
  - Inspect row-level actions and status labels for open, acked, and resolved alarms, especially the critical COL-3 and WND-12 entries.
- Exit criteria:
  - All visible filter classes have been tried at least once.
  - At least one selection-based action path has been tested.
  - The alarm list’s triage workflow is understandable without hidden behavior.

### Mobile viewport regression pass

- Objective: Repeat the most critical task flows in a narrow viewport to validate touch usability and responsive stability.
- Target pages: index.html, generators.html, forecast.html, alarms.html
- Key checks:
  - Revisit the left navigation, top bar controls, and primary filters to confirm the small-tap-target warnings are user-impacting on mobile.
  - Repeat one high-value action per page: chart range toggle on Overview, filter/search on Generators, horizon toggle on Forecast, and alarm filtering/selection on Alarms.
  - Check whether any control labels, tables, or charts overflow or become difficult to operate in mobile layout.
- Exit criteria:
  - Critical interactions have been replayed in mobile viewport on all known pages.
  - Responsive issues are categorized by impact rather than only recorded as generic warnings.
  - Any unusable control on mobile is tied to its exact page and interaction.

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

