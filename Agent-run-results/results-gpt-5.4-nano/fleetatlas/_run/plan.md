# UXAgent Exploration Plan

## Goal

Autonomously explore and critique FleetAtlas UX across the primary real-time dashboard flow and adjacent pages (Alerts, Analytics, Vehicles), including key interactive controls, state changes, and recovery/destructive-action validation.

## Plan Summary

Start on index.html to validate the end-to-end dashboard interaction model: switching views (Map/List/Analytics tabs), filtering by status, searching, opening the right-side vehicle detail panel, and exercising all visible vehicle actions including the destructive Reassign flow. Then traverse adjacent pages (vehicles.html, alerts.html, analytics.html) via the left rail to confirm consistent navigation, filtering/search behavior, and any table/list interactions. Finish with mobile viewport rechecks of the critical dashboard interactions (nav, search, filters, panel actions, alerts dropdown) and verify no layout-breaking or inaccessible controls.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, vehicles.html, alerts.html, analytics.html)`
- features: `exercise most visible controls per key page: dashboard view tabs, status chips, top search, alert bell dropdown, vehicle detail panel toggles, all detail action buttons; vehicles/alerts filtering + their main table actions; analytics KPIs/sections at least for render correctness`
- mobile: `repeat critical checks on mobile viewport for index.html and alerts.html: nav, filters, search, vehicle detail panel, Reassign destructive flow, and at least one alerts row action`

## Planned Phases

### Dashboard overview + global navigation

- Objective: Validate that the primary dashboard loads correctly and that global navigation/top controls route and update views as expected.
- Target pages: index.html
- Key checks:
  - Use the left rail to confirm navigation: Dashboard (index), Vehicles (vehicles.html), Analytics (analytics.html), Alerts (alerts.html). Validate that Drivers/Routes/Maintenance items either route correctly or have an intended placeholder behavior (href was '#', so confirm no broken navigation).
  - Use the org switcher select in the top bar: confirm it is interactive and changes context/state (even if only visually mocked).
  - Validate the top-bar view tabs (Map view / List view / Analytics view): switch between them and confirm the main content changes accordingly without errors.
  - Validate the alert bell button on index: open dropdown (prescan says it shows 5 most recent alerts on click) and close it; ensure clicking an item behaves predictably (if it routes to alerts.html or highlights an alert).
  - Check close/dismiss control (× in top right): ensure it does not break the page (if it hides a panel).
- Exit criteria:
  - All known HTML pages are reachable from index via left rail without console/network errors
  - Map/List/Analytics tabs change the main content in a way consistent with their labels
  - Alerts bell dropdown opens and dismisses reliably

### Vehicle discovery: filters, search, selection & detail panel

- Objective: Exercise the core dashboard workflow: filter and search the fleet, select a vehicle, and validate that details/actions correspond to the selected vehicle.
- Target pages: index.html
- Key checks:
  - Status filter strip: toggle each status chip (All, Running, Idle, Maintenance, Offline, Alert). Confirm the bottom vehicle list updates counts and visible rows accordingly.
  - Search by plate/driver/route input: type a known plate from the list (e.g., one visible in prescan) and verify results narrow to the correct vehicle; clear the search and confirm the list returns.
  - Vehicle selection from map icons: click a vehicle marker/icon and verify the right detail panel opens and shows the correct plate/driver/task.
  - Vehicle selection from bottom list: click a row and verify the right detail panel switches to that vehicle (cross-check that the same selection is reflected regardless of selection origin).
  - Historical track toggle inside the detail panel (24h/7d/30d): switch between ranges and confirm the track visualization updates.
- Exit criteria:
  - At least one vehicle can be selected via both map and list, with the detail panel content matching the chosen vehicle
  - Status filtering and search both visibly and consistently update the vehicle list and selection context
  - Historical track range toggle shows different states/visuals without UI breakage

### Vehicle actions + destructive flow validation

- Objective: Validate all visible vehicle actions in the right detail panel, including error-prone and destructive operations.
- Target pages: index.html
- Key checks:
  - From the detail panel, click each action button: Send command, Contact driver, Maintenance record, Reassign task. Confirm each results in the intended UI change (modal, drawer, or confirmation).
  - Reassign task destructive flow: trigger Reassign, verify the second-confirmation modal appears, then test both outcomes: cancel and confirm.
  - After confirming or canceling Reassign, verify the selected vehicle remains consistent and the UI returns to a stable state (no stuck modal, no mismatched panel data).
  - If any actions require selecting a route/task/parameters, validate default values or required field behavior before submission.
- Exit criteria:
  - All four action buttons are usable and do not produce console/network errors
  - Reassign task shows a second confirmation and both cancel/confirm outcomes return to a stable detail-panel state

### Adjacent page validation: Vehicles list, Alerts center, Analytics dashboard

- Objective: Confirm that the adjacent pages support their primary tasks (filtering, searching, and viewing data) and maintain navigation consistency.
- Target pages: vehicles.html, alerts.html, analytics.html
- Key checks:
  - vehicles.html: exercise filter controls (status + fleet + model if present) and the search input 'Search by plate / driver / VIN…'. Confirm the vehicle table rows update accordingly and 'Details' (if present as a link/button) opens the expected vehicle context/modal or routes back to index selection (as implemented).
  - alerts.html: use time range filters (Last 24 hours / Last 7 days / Last 30 days), then severity, type, and status filters. Confirm the alerts table count and visible rows update. Click 'Assign Details' for at least one row to validate the row action flow.
  - alerts.html: verify global search 'Search alerts…' narrows results and clearing restores the dataset.
  - analytics.html: validate key KPIs are visible (mileage, fuel economy, utilization, on-time rate) and that the day×hour heatmap and Driver Performance 'Top 10' section render without interaction issues.
  - Across vehicles/alerts/analytics pages: verify left rail navigation and top org select remain consistent and do not lead to broken anchors.
- Exit criteria:
  - At least one meaningful filter/search interaction is completed per adjacent page with visible table/KPI updates
  - At least one row-level action (Assign Details) works on alerts.html
  - No navigation actions cause blank screens or console/network errors

### Mobile critical-path recheck

- Objective: Ensure core dashboard usability on mobile viewport: navigation reachability, tappable controls, panel interactions, and primary actions.
- Target pages: index.html, alerts.html
- Key checks:
  - On index.html at mobile viewport: verify left rail/tap targets remain usable (especially the smaller nav items flagged in prescan).
  - Test status filter chips and search input on mobile: ensure chips are tappable and search results update without overflow/cutoff issues.
  - Select a vehicle and confirm the right detail panel is usable (no off-screen content).
  - Trigger Reassign task on mobile and verify the modal and second confirmation are readable and tappable.
  - On alerts.html mobile: validate the filter dropdowns/selects and 'Assign Details' action remain accessible.
- Exit criteria:
  - Critical interactions (filter/search → select vehicle → action modal) succeed on mobile
  - No major layout break (e.g., panel off-screen, modals not dismissable)

## Prescan Summary

### FleetAtlas — See every vehicle, in real time.

- Page: `index.html`
- Headings: Vehicle details
- Interactables: `14` buttons, `10` links, `2` inputs
- Notable controls:
  - clickable:a:FleetAtlas
  - clickable:a:📊 Dashboard
  - clickable:a:🚛 Vehicles
  - clickable:a:👤 Drivers
  - clickable:a:🛣️ Routes
  - clickable:a:🔧 Maintenance
  - clickable:a:📈 Analytics
  - clickable:a:⚠️ Alerts 12

### Alert Center — FleetAtlas

- Page: `alerts.html`
- Headings: Alert Center
- Interactables: `21` buttons, `9` links, `7` inputs
- Notable controls:
  - clickable:a:FleetAtlas
  - clickable:a:📊 Dashboard
  - clickable:a:🚛 Vehicles
  - clickable:a:👤 Drivers
  - clickable:a:🛣️ Routes
  - clickable:a:🔧 Maintenance
  - clickable:a:📈 Analytics
  - clickable:a:⚠️ Alerts 12

### Analytics — FleetAtlas

- Page: `analytics.html`
- Headings: Analytics dashboard, Daily active vehicles this month, Fleet utilization heatmap (day × hour), Driver Performance — Top 10
- Interactables: `1` buttons, `9` links, `2` inputs
- Notable controls:
  - clickable:a:FleetAtlas
  - clickable:a:📊 Dashboard
  - clickable:a:🚛 Vehicles
  - clickable:a:👤 Drivers
  - clickable:a:🛣️ Routes
  - clickable:a:🔧 Maintenance
  - clickable:a:📈 Analytics
  - clickable:a:⚠️ Alerts 12

### Vehicles — FleetAtlas

- Page: `vehicles.html`
- Headings: Vehicles
- Interactables: `26` buttons, `9` links, `31` inputs
- Notable controls:
  - clickable:a:FleetAtlas
  - clickable:a:📊 Dashboard
  - clickable:a:🚛 Vehicles
  - clickable:a:👤 Drivers
  - clickable:a:🛣️ Routes
  - clickable:a:🔧 Maintenance
  - clickable:a:📈 Analytics
  - clickable:a:⚠️ Alerts 12

