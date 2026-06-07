# UXAgent Exploration Plan

## Goal

Critique PulseGrid’s UX by exhaustively exploring the primary Overview dashboard flow and validating adjacent operational pages (Generators, Forecast, Alarms), including key state changes, filtering/search, and failure-recovery affordances seen in the UI.

## Plan Summary

Start on index.html and validate the end-to-end “operator snapshot” experience: BA selector, Production/Replay/Plan tabs, clock/shortcuts, theme/alerts, and the interactive dashboard widgets that lead into Generators and Alarms. Then traverse each adjacent page—Generators, Forecast, Alarms—exercising the visible controls (filters, selectors, search, time windows, and acknowledge/resolution actions) and confirm navigation consistency back to Overview. Finish with mobile viewport re-checks for the highest-risk controls flagged in the prescan (small tap targets and unlabeled select/input).

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, generators.html, forecast.html, alarms.html.`
- features: `Exercise most visible controls per key page: index.html (BA selector, Production/Replay/Plan, time-range buttons, ⌘K/theme/alert bell, navigation links to Generators/Alarms); generators.html (status pills, fuel selector, zone selector, search, row details); forecast.html (Day-ahead/Hour-ahead/Real-time, 12h/24h/7d, hourly row overlay); alarms.html (Severity/Status/Time selects, filter input, checkbox selection, acknowledge selected).`
- mobile: `Repeat critical checks on mobile viewport for: left-rail navigation, BA selector, key filters/search, acknowledge workflow, and any shortcut/alert overlays.`

## Planned Phases

### Overview operator snapshot & navigation correctness

- Objective: Validate the primary dashboard experience and confirm navigation paths to Generators and Alarms from the Overview page, including the key global UI controls (BA selector, tabs, clock/refresh, theme, alerts/shortcuts).
- Target pages: index.html
- Key checks:
  - Change BA selector across all visible options (Western / ERCOT / SPP / MISO) and verify the snapshot KPIs + at least one downstream section (weather drivers, active alarms count/list, interchange/table if present) updates without errors.
  - Toggle Production / Replay / Plan tabs and confirm the active state styling changes and the page content/labels correspond to the selected mode.
  - Use the time-range controls on the Overview chart (24h / 48h / 7d) and confirm the load chart and NOW marker/annotations respond accordingly.
  - Click “View all 312 →” and return back to ensure route works and the Overview state is consistent (or confirm expected reset behavior).
  - Click “All alarms →” and confirm the Alarms page opens with the correct context (expected counts/filters). Return and validate no navigation dead-ends.
  - Activate ⌘K and the theme toggle and the alert bell; validate any overlay/menu opens, can be closed, and doesn’t break subsequent navigation.
  - Validate generator status area basic interaction: if cards are clickable (tripped/online/more details), confirm at least one leads to the Generators page or expands details reliably.
- Exit criteria:
  - All visible global controls on index.html have been exercised at least once with observable state changes and no navigation/runtime errors.
  - Confirmed working navigation from Overview to generators.html and alarms.html via the compact links.
  - Chart range switching (24h/48h/7d) shows clear visual/label updates.
  - Any overlays from ⌘K/theme/alert bell can be opened and closed without breaking focus or page operation.

### Generators page: filtering, search, and table integrity

- Objective: Exercise the full filtering/search surface on generators.html and confirm results update correctly under multiple combinations, with no empty-state confusion or control conflicts.
- Target pages: generators.html
- Key checks:
  - Exercise status pills in sequence: All → Online → Ramping → Tripped → Maintenance; after each, verify the header counts update (38 of 38 units and corresponding subgroup counts).
  - Use fuel selector to switch between All fuels and each visible fuel type; confirm the table rows and header counts update.
  - Use zone selector (All zones plus NW/SW/RM/CA-N/CA-S/AZ/NV as visible); verify results change.
  - Use the search input (“Search by name, plant, or EMS ID…”) with: an EMS ID snippet visible on the page (e.g., PVN-1 / TEH-W / WND-12) and a plant name (e.g., Palo Verde / Tehachapi). Confirm the table filters down and clears correctly.
  - Apply multi-dimensional filtering: e.g., set status=Tripped (or Maintenance if none) + fuel=Wind (or Solar/Natural gas) + zone=AZ (as available), then verify the result set remains consistent and does not show mismatched labels.
  - Validate row-level affordances: click at least one “Details →” link; confirm it opens the intended details behavior (page change or inline expansion) and can be closed/returned to the list.
  - Check pagination/expansion behavior if present; if not, validate scrolling performance by interacting near the end of the visible list.
- Exit criteria:
  - Every visible control on generators.html (status pills, fuel selector, zone selector, search) has been used and caused coherent updates to the results.
  - At least two multi-filter combinations were tested without producing inconsistent counts or broken table state.
  - Row “Details →” behavior was validated (opened and returned/closed without error).

### Forecast page: time window controls & row overlay behavior

- Objective: Validate forecast interaction patterns and confirm that forecast mode/time-window toggles adjust the chart and hourly breakdown coherently.
- Target pages: forecast.html
- Key checks:
  - Toggle the forecast horizon modes (Day-ahead / Hour-ahead / Real-time) and confirm the chart and “Next 24 hours · MW” / model info values update.
  - Use the horizon buttons (12h / 24h / 7d) and validate the range labels/axis ticks change.
  - Tap/click an hourly breakdown row (“tap a row to overlay on chart”) and verify the overlay/highlight appears on the chart and is removable/changes when another row is selected.
  - Verify reserve adequacy panel updates in tandem with forecast mode/range (e.g., changing capacity/peak/probabilistic P10/P90 values if present).
  - Navigate back to index.html and ensure the Overview doesn’t end in a broken state (top nav highlights correctly reflect where you came from).
- Exit criteria:
  - All visible forecast selectors/buttons have been used with observable chart/table changes.
  - Hourly row overlay interaction was validated for at least two different rows.
  - Navigation back to index.html works cleanly.

### Alarms page: severity/status/time filtering and acknowledge workflow

- Objective: Validate that operators can accurately find relevant alarms and perform acknowledge actions safely using the page’s selection and batch controls.
- Target pages: alarms.html
- Key checks:
  - Use Severity select: All Critical only and Major+ only (and Minor+ if present); confirm the table filters and the counts in headings update.
  - Use Status select: Open / Acknowledged / Resolved / All and confirm correct rows and header counts.
  - Use Time select: Last 24h / Last 1h / Last 6h / This shift; validate table updates accordingly.
  - Type into “Filter by unit, rule, or owner…” with terms visible on the page (e.g., COL-3, WND-12, Okafor) and confirm matching reduces results.
  - Select one or more alarm rows via checkboxes; confirm selection state (highlighting/checkbox) is visible and batch action becomes applicable.
  - Click “Acknowledge selected”; validate that affected alarms change status (e.g., Open → Acknowledged) and that filters continue to behave.
  - Use the trailing actions “Open →” / “Resolved” / similar status transitions if present and confirm that changes persist within the session.
  - Return to index.html and verify Active alarms count/list is consistent with the changes performed (or document expected lack of persistence).
- Exit criteria:
  - All alarms page filter controls (Severity, Status, Time, and text filter) update the alarm list coherently.
  - Acknowledge workflow successfully transitions alarm status and remains compatible with subsequent filtering.
  - Navigation back to index.html results in either consistent updated counts or clearly expected resets.

### Mobile viewport regression for high-risk controls

- Objective: Repeat the most failure-prone interactions on mobile: small tap targets, unlabeled/select controls, and any overlays from ⌘K/alerts.
- Target pages: index.html, generators.html, alarms.html
- Key checks:
  - On index.html, verify tap accuracy for left rail navigation items (Overview/Generators/Forecast/Alarms) despite small tap targets; confirm no mis-taps or dead clicks.
  - On index.html, interact with BA selector and top tabs using mobile touches; validate selected state persists visually.
  - On generators.html, test status pills and search on mobile; ensure scrolling and control activation work reliably.
  - On alarms.html, test Severity/Status/Time dropdowns and the filter input; validate that the unlabeled/missing label warnings do not translate into unusable controls.
  - If ⌘K/alert bell open an overlay on mobile, validate close/dismiss and focus behavior.
- Exit criteria:
  - Critical navigation and filtering interactions succeed on mobile for the three most important pages without broken state or unusable controls.
  - No hard-blockers encountered due to small tap targets or missing/unclear control labeling.

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

