# UXAgent Exploration Plan

## Goal

Autonomously explore the full PulseGrid dashboard experience, centered on the overview-to-detail operator workflow, while validating adjacent filtering, monitoring, and alarm-handling states across desktop and mobile.

## Plan Summary

Start on the Overview dashboard to validate the main situational-awareness flow, global navigation, and key top-bar controls that appear shared across pages. Then follow the strongest linked drill-downs into Generators and Alarms, and separately inspect Forecast for planning-oriented workflows and state toggles. Reserve dedicated time for higher-risk filtering and status-state pages, then repeat the most important navigation and control checks on mobile where the prescan already suggests small tap targets and dense layouts.

## Coverage Targets

- pages: `Visit all 4 known HTML pages and validate both nav-based and in-context drill-down access where available.`
- features: `Exercise most visible controls on each key page, with full coverage of dashboard toggles, generator filters/search, forecast horizon/time controls, and alarm selection/filtering/actions.`
- mobile: `Repeat the primary navigation flow plus 1-2 critical interactions per page on mobile viewport, prioritizing controls already flagged as small tap targets.`

## Planned Phases

### Overview baseline and shared shell

- Objective: Validate the primary dashboard landing experience, information hierarchy, and the shared navigation/header controls that anchor the rest of the system.
- Target pages: index.html
- Key checks:
  - Confirm left-rail navigation routes correctly to Overview, Generators, Forecast, and Alarms.
  - Check that Topology and Events nav items behave consistently with their '#' destinations and do not mislead the user.
  - Exercise the BA selector and observe whether the selected balancing area is obvious and whether page content appears to respond.
  - Toggle Production, Replay, and Plan to verify active-state styling, exclusivity, and any content/state changes.
  - Test theme toggle, bell, and ⌘K for visible response, focus behavior, and whether they feel actionable versus decorative.
  - Use 24h / 48h / 7d on the system load card and verify chart-range changes are perceptible.
  - Try generator-status pills (All / Online / Tripped / Maintenance) in the dashboard grid and confirm filtering feedback.
  - Use the direct drill-down links 'View all 312 →' and 'All alarms →' to validate they support the main operator workflow.
- Exit criteria:
  - All shared nav items and visible top-bar controls on the Overview have been exercised at least once.
  - At least one successful drill-down from dashboard summary to generators and alarms has been confirmed.
  - Observed whether major dashboard toggles produce clear, visible state changes or reveal UX ambiguity.

### Generator monitoring and fleet filtering

- Objective: Inspect the fleet-management page as the most likely dense operational work surface, with emphasis on filtering clarity, search, and table usability.
- Target pages: generators.html
- Key checks:
  - Verify landing context from nav and from dashboard drill-down is clear and consistent.
  - Exercise status pills: All, Online, Ramping, Tripped, Maintenance, confirming counts and visible row set changes.
  - Test fuel selector and zone selector separately, then in combination with a status pill, to see whether filtered results remain understandable.
  - Use the search field with a known visible unit or plant term such as COL-3, PVN, or Palo Verde and verify narrowing behavior.
  - Inspect at least several rows across different statuses/fuels for readability, status emphasis, and consistency of columns.
  - Open one or more 'Details →' links or controls if functional, and determine whether they navigate, expand, or do nothing.
  - Assess whether table density, repeated actions, and horizontal content remain scannable without excessive cognitive load.
- Exit criteria:
  - All major generator filters have been sampled, including at least one combined-filter scenario and one search query.
  - A tripped or abnormal unit state has been inspected to judge whether exceptions stand out clearly.
  - Any generator detail affordance has been tested enough to classify it as functional, weak, or placeholder.

### Forecast planning states

- Objective: Validate the forecast page's planning workflow, especially whether chart controls, model horizons, and hourly-breakdown interactions stay synchronized and comprehensible.
- Target pages: forecast.html
- Key checks:
  - Switch among Day-ahead, Hour-ahead, and Real-time modes and verify active-state clarity and content response.
  - Use 12h, 24h, and 7d chart controls and confirm the chart visibly changes range or framing.
  - Inspect the hourly breakdown table for scannability, reserve warnings, and clarity of notes like 'Approaching capacity'.
  - Tap/click one or more hourly rows to verify the promised chart overlay behavior and whether the selected hour is clearly indicated.
  - Review reserve adequacy and drivers sections for hierarchy and whether supporting context feels connected to the main chart.
- Exit criteria:
  - All visible forecast horizon and time-range controls have been exercised.
  - At least one hourly row interaction has been attempted and its response documented.
  - The relationship between forecast chart, table, and supporting panels has been assessed for coherence.

### Alarm triage and recovery path

- Objective: Stress the alarm-management surface, focusing on triage workflows, bulk selection behavior, filtering combinations, and clarity of alarm ownership/status transitions.
- Target pages: alarms.html
- Key checks:
  - Confirm the headline metrics and alarm table establish a clear triage starting point.
  - Test checkbox selection on one or more alarms and observe whether 'Acknowledge selected' changes enabled state or feedback.
  - Exercise Severity, Status, and Time filters independently, then combine at least two filters to evaluate state transparency.
  - Use the text filter with a visible unit, rule, or owner name such as COL-3, Okafor, or lvrt to validate narrowing behavior.
  - Open at least one alarm via 'Open →' and determine whether the action reveals detail, changes state, or simply navigates.
  - Inspect representation of OPEN, UNATTENDED, ACKED, and RESOLVED states for visual differentiation and operational clarity.
- Exit criteria:
  - Bulk-selection and acknowledge behavior has been probed enough to understand whether the workflow is real or superficial.
  - Alarm filters and search have been exercised in multiple combinations.
  - At least one alarm action path has been followed to judge drill-in clarity.

### Cross-page consistency and mobile pass

- Objective: Re-check the most important workflows on mobile viewport, with emphasis on navigation, dense tables/cards, and the small-tap-target issues already surfaced by prescan.
- Target pages: index.html, generators.html, forecast.html, alarms.html
- Key checks:
  - On mobile, verify access to primary navigation and whether left-rail items collapse, overflow, or remain tappable.
  - Repeat critical top-bar interactions on mobile: BA selector, Production/Replay/Plan, theme toggle, bell, and ⌘K if visible.
  - On Overview, confirm KPI cards, system-load chart controls, generator-status grid, and drill-down links remain usable without overlap.
  - On Generators, assess whether filters, search, and the table remain operable or require horizontal scrolling/truncation.
  - On Forecast, test horizon/time controls and at least one hourly-row interaction for touch usability.
  - On Alarms, test checkbox selection, filter controls, and an alarm action for tap reliability and layout crowding.
- Exit criteria:
  - Each known page has been viewed once on mobile.
  - At least one critical task per page has been repeated on mobile.
  - Any mobile-specific failures or severe usability regressions have been documented, especially around small tap targets and dense content.

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

