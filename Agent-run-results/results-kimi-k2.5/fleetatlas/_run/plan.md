# UXAgent Exploration Plan

## Goal

Explore and critique the UX of FleetAtlas, focusing on the primary dashboard flow, adjacent pages (alerts, analytics, vehicles), key interactions (vehicle details, alerts, analytics), and mobile responsiveness.

## Plan Summary

Start with the dashboard (index.html) to validate real-time updates, vehicle interactions, and detail panel actions. Then explore alerts.html, analytics.html, and vehicles.html, checking their unique features and interactions. Repeat critical checks on mobile viewport. Validate high-risk actions like reassigning tasks and alert handling.

## Coverage Targets

- pages: `Visit all 4 known HTML pages (index, alerts, analytics, vehicles).`
- features: `Exercise most visible controls (filters, buttons, search, detail panels) on each key page.`
- mobile: `Repeat critical checks (dashboard interactions, alert handling, vehicle details) on mobile viewport.`

## Planned Phases

### Dashboard (index.html) Exploration

- Objective: Validate dashboard interactions, real-time updates, and detail panel actions.
- Target pages: index.html
- Key checks:
  - Check real-time vehicle position updates (wait 5 seconds for jitter)
  - Click a vehicle icon to open the detail panel
  - Test 'Reassign task' button (check confirmation modal)
  - Interact with status filters (All, Running, etc.)
  - Use the search box
- Exit criteria:
  - All key dashboard interactions tested, real-time updates observed, detail panel and reassign task validated.

### Alerts Center (alerts.html) Exploration

- Objective: Validate alert handling, KPI cards, and filtering.
- Target pages: alerts.html
- Key checks:
  - Check KPI cards (open, new today, etc.)
  - Filter alerts by severity, type, and status
  - Interact with alert actions (Assign, Details)
- Exit criteria:
  - Alert filtering and actions validated, KPI cards reviewed.

### Analytics (analytics.html) Exploration

- Objective: Validate analytics dashboard, KPI cards, and driver performance.
- Target pages: analytics.html
- Key checks:
  - Review KPI cards (total mileage, fuel economy, etc.)
  - Check fleet utilization heatmap
  - Explore driver performance table
- Exit criteria:
  - Analytics dashboard features validated, KPI cards and heatmap reviewed.

### Vehicles (vehicles.html) Exploration

- Objective: Validate vehicle list, filtering, and details.
- Target pages: vehicles.html
- Key checks:
  - Test vehicle list filtering (status, fleet, etc.)
  - Click a vehicle to view details
  - Use the search box
- Exit criteria:
  - Vehicle list filtering and details validated, search functionality tested.

### Mobile Viewport Validation

- Objective: Validate critical interactions on mobile viewport.
- Target pages: index.html, alerts.html, analytics.html, vehicles.html
- Key checks:
  - Repeat critical checks (e.g., vehicle detail panel, alert filtering, analytics KPI cards) on mobile viewport
  - Check small tap targets identified in layout warnings
- Exit criteria:
  - Critical interactions validated on mobile, small tap targets reviewed.

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

