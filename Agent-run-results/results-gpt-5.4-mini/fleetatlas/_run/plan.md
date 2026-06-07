# UXAgent Exploration Plan

## Goal

Exhaustively explore the core fleet management dashboard flow and verify the main adjacent pages, with emphasis on map/list switching, vehicle/alert drill-downs, and destructive action handling.

## Plan Summary

Start on the dashboard because it is the primary entry point and contains the richest interactive surface: org switching, view tabs, status filters, search, notification dropdown, map vehicle selection, and the bottom vehicle drawer. Then cover the standalone pages (Vehicles, Alerts, Analytics) to validate cross-page consistency, filtering/search behavior, and table/detail workflows. Finish with deeper validation of high-risk states such as alert handling, vehicle detail actions, and mobile viewport usability where small tap targets and unlabeled controls are most likely to regress.

## Coverage Targets

- pages: `visit all known HTML pages and verify navigation between them from the dashboard entry point`
- features: `exercise most visible controls per key page, including search, filters, tabs, row actions, dropdowns, and the destructive reassign flow`
- mobile: `repeat critical checks on mobile viewport, prioritizing tap-target-sensitive controls and dense table/list layouts`

## Planned Phases

### Dashboard orientation and navigation

- Objective: Validate the main landing experience and the top-level navigation controls before digging into deeper workflows.
- Target pages: index.html
- Key checks:
  - Confirm the default dashboard state loads with map view selected, status chips visible, and vehicle list drawer available
  - Exercise org switcher selection and verify the page updates consistently or remains stable
  - Check the notification bell dropdown contents and whether the count matches the visible alert badge
  - Try the top-level view toggles (Map view, List view, Analytics view) and note which ones change state versus navigate
  - Verify the status filter strip changes the visible vehicle set or highlights filtered state
- Exit criteria:
  - All visible top-bar controls on the dashboard have been clicked or at least state-checked once
  - Navigator behavior is understood for map/list/analytics tabs and alert dropdown
  - No blocking rendering or interaction issues are observed in the initial dashboard state

### Vehicle discovery and detail panel

- Objective: Exercise the primary fleet workflow: finding a vehicle, opening details, and validating the vehicle-specific actions and history widgets.
- Target pages: index.html
- Key checks:
  - Use the search box with at least two query styles (plate and driver/route terms) to confirm filtering or matching behavior
  - Click representative vehicles from the map and from the drawer list, including at least one running vehicle and one non-running vehicle
  - Validate the right detail panel fields: basic info, driver info, current task, and historical track display
  - Switch the 24h/7d/30d history toggle and confirm the chart updates or the selected state changes
  - Check the four action buttons: Send command, Contact driver, Maintenance record, and Reassign task
  - Open Reassign task and verify the second-confirmation modal appears and is dismissible
  - Observe whether live map positions or status counts visibly change over time for running vehicles
- Exit criteria:
  - At least two distinct vehicle detail views have been opened successfully
  - The history toggle and all vehicle action buttons have been exercised or inspected
  - The destructive reassign confirmation path has been confirmed

### Vehicle list and filtering page

- Objective: Validate the dedicated Vehicles page as the structured list/search/filter counterpart to the dashboard drawer.
- Target pages: vehicles.html
- Key checks:
  - Open the Vehicles page and confirm the table/list is populated with vehicle rows and details actions
  - Test the status filter, fleet filter, and vehicle search field with representative inputs
  - Check whether selecting filters narrows the visible table rows and whether row counts remain sensible
  - Open at least one vehicle row detail action if available from the list
  - Confirm the page’s many inputs render and remain usable without overlap or truncation
- Exit criteria:
  - Search and both major filter types have been tried
  - At least one vehicle row has been inspected beyond the table summary
  - The page remains readable with dense data and no obvious layout collapse

### Alert triage workflow

- Objective: Validate alert management, prioritization, and row-level actions on the Alerts page.
- Target pages: alerts.html
- Key checks:
  - Confirm KPI cards and the alert table are visible and coherent with the alert counts in navigation
  - Test the alert search field and the time, severity, type, and status filters individually
  - Exercise both Assign and Details actions on at least one high-severity alert row
  - Check that the filtered views still show plausible alert records and that row metadata updates accordingly
  - Look for any mismatch between alert severity/status filters and row contents
- Exit criteria:
  - All major filter categories have been interacted with
  - At least one alert row action has been triggered
  - The page behavior matches the expected alert triage pattern without broken controls

### Analytics verification

- Objective: Confirm the analytical reporting page loads cleanly and the key dashboard metrics, heatmap, and ranking table are legible.
- Target pages: analytics.html
- Key checks:
  - Validate the headline KPIs and the fleet utilization heatmap render correctly
  - Inspect the driver performance ranking table for sorting/readability issues if sortable behavior exists
  - Exercise the visible search/control on this page and the org selector if it appears
  - Verify that the page remains stable on navigation from the dashboard analytics tab if that route is used
- Exit criteria:
  - The analytics page has been fully loaded and reviewed
  - Any visible control has been checked at least once
  - No data-visualization rendering issues are observed

### Mobile recheck of critical paths

- Objective: Repeat the most important interactions in a mobile viewport to validate tap usability and responsive behavior.
- Target pages: index.html, vehicles.html, alerts.html, analytics.html
- Key checks:
  - Recheck dashboard navigation, search, status chips, and notification/org controls on mobile
  - Verify that vehicle selection and detail opening still works without precision issues
  - Confirm the Vehicles and Alerts page filters remain operable and readable on smaller screens
  - Look for tap-target failures, clipped text, or hidden controls around the dense table/list layouts
- Exit criteria:
  - Critical dashboard, vehicle, and alert interactions have been attempted in mobile viewport
  - Any mobile-specific breakage is documented with page and control context
  - Coverage includes the controls already flagged as small tap targets in prescan

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

