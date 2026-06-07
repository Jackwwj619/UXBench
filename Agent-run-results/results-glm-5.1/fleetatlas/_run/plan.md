# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full FleetAtlas system, prioritizing the primary dashboard flow, adjacent pages, interactive states, and recovery paths.

## Plan Summary

The exploration will proceed through five phases, starting with the primary dashboard map and its dynamic elements, then moving to the vehicle detail panel and its destructive actions. Next, it will validate the alerts center and its filtering capabilities, followed by the analytics and vehicles pages. Finally, it will assess responsive behavior and mobile-specific UX issues across critical flows.

## Coverage Targets

- pages: `visit all 4 known HTML pages`
- features: `exercise all visible filters, search inputs, view tabs, and action buttons; trigger the destructive action modal`
- mobile: `repeat dashboard map interaction, detail panel opening, and alerts filtering on mobile viewport`

## Planned Phases

### Dashboard Map & Global Controls

- Objective: Validate the primary dashboard view, map interactions, global controls, and dynamic updates.
- Target pages: index.html
- Key checks:
  - Switch between Map, List, and Analytics view tabs
  - Interact with the org switcher dropdown
  - Click the alert bell to verify the recent alerts dropdown appears
  - Apply status filters (All, Running, Idle, Maintenance, Offline, Alert) and verify map/list updates
  - Observe SVG map for vehicle jitter and click a vehicle icon to trigger the detail panel
- Exit criteria:
  - All view tabs have been switched
  - Alert dropdown has been opened and closed
  - Status filters have been applied and cleared
  - At least one vehicle icon clicked on the map

### Vehicle Detail Panel & Actions

- Objective: Validate the right detail panel, its data display, and action buttons, especially the destructive 'Reassign task' flow.
- Target pages: index.html
- Key checks:
  - Open detail panel via bottom drawer vehicle list row click
  - Verify detail panel content: basic info, driver info, current task, historical track toggle (24h/7d/30d)
  - Click 'Send command', 'Contact driver', and 'Maintenance record' buttons
  - Click 'Reassign task' and validate the second-confirmation modal appears
  - Dismiss the confirmation modal without confirming, then close the detail panel
- Exit criteria:
  - Detail panel opened via both map icon and list row
  - Historical track toggles exercised
  - Confirmation modal for 'Reassign task' triggered and safely dismissed
  - Detail panel closed successfully

### Alerts Center & Filtering

- Objective: Validate the alerts page, KPI cards, and multi-faceted filtering capabilities.
- Target pages: alerts.html
- Key checks:
  - Navigate to alerts page and verify KPI cards are visible
  - Interact with time range selector (Last 24 hours, 7 days, 30 days)
  - Apply severity, type, and status filters individually and in combination
  - Click 'Assign' and 'Details' action buttons on alert rows
  - Use the alert search input
- Exit criteria:
  - All filter dropdowns interacted with
  - Action buttons on at least one alert clicked
  - Search input validated

### Analytics & Vehicles Pages

- Objective: Validate the analytics dashboard data visualizations and the vehicles list page interactions.
- Target pages: analytics.html, vehicles.html
- Key checks:
  - Navigate to analytics page and verify heatmap and charts render
  - Review driver performance table
  - Navigate to vehicles page and use status/fleet filter dropdowns
  - Use the vehicle search input and interact with checkboxes
  - Click 'Details' button on a vehicle row
- Exit criteria:
  - Analytics page visualizations verified
  - Vehicles page filters and search exercised
  - Vehicle details action clicked

### Mobile Viewport & Accessibility Checks

- Objective: Validate critical flows and layout behavior on a mobile viewport, focusing on identified risk hotspots.
- Target pages: index.html, alerts.html
- Key checks:
  - Switch to mobile viewport and check left rail nav behavior (hamburger menu?)
  - Validate tap target sizing for view tabs and nav items on index.html
  - Open vehicle detail panel on mobile and check for overlap or overflow issues
  - Check alerts page filter layout and usability on small screens
  - Verify org switcher accessibility on mobile
- Exit criteria:
  - Mobile layout assessed on dashboard and alerts pages
  - Detail panel opens and closes cleanly on mobile
  - Tap target and layout warnings visually confirmed

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

