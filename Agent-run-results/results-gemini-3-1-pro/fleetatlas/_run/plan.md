# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full FleetAtlas system, prioritizing the primary dashboard flow, adjacent pages, and mobile responsiveness.

## Plan Summary

The exploration will start on the primary map dashboard, validating view toggles, status filters, and the vehicle details panel. It will specifically test the 'Reassign task' modal for recovery paths. Following this, the agent will traverse the adjacent Alerts, Analytics, and Vehicles pages to evaluate data tables and filtering. Finally, a mobile sweep will assess the small tap target warnings and responsive behavior of sliding panels.

## Coverage Targets

- pages: `Visit index.html, vehicles.html, alerts.html, and analytics.html.`
- features: `Exercise map filters, drawer interactions, slide-in panels, modals, and data table filters.`
- mobile: `Validate the index.html map/drawer/panel flow and navigation tap targets on mobile.`

## Planned Phases

### Dashboard Core & Filters

- Objective: Validate primary dashboard controls, view modes, and status filtering.
- Target pages: index.html
- Key checks:
  - Toggle between Map, List, and Analytics views using top buttons.
  - Click various status filter chips (Running, Alert, etc.) and verify map/list updates.
  - Open the alert bell dropdown to view recent alerts.
  - Interact with the Org switcher dropdown.
- Exit criteria:
  - View modes and status filters have been exercised and state changes observed.

### Vehicle Detail & Destructive Action

- Objective: Test the vehicle drill-down flow and the reassign task modal.
- Target pages: index.html
- Key checks:
  - Open the bottom vehicle list drawer.
  - Click a vehicle row (or map icon) to open the right detail panel.
  - Toggle the historical track SVG (24h/7d/30d) inside the detail panel.
  - Click 'Reassign task' and validate the appearance and functionality (cancel/confirm) of the confirmation modal.
  - Close the detail panel.
- Exit criteria:
  - Detail panel opened successfully, modal invoked and dismissed, and panel closed.

### Adjacent Pages (Vehicles, Alerts, Analytics)

- Objective: Explore data-heavy pages for filtering, sorting, and drill-down capabilities.
- Target pages: vehicles.html, alerts.html, analytics.html
- Key checks:
  - Navigate to vehicles.html, use Fleet/Status dropdowns, and test bulk select checkboxes.
  - Click a 'Details' button on vehicles.html.
  - Navigate to alerts.html, use severity/type filters, and click an 'Assign' or 'Details' button.
  - Navigate to analytics.html and verify the presence of the heatmap and performance table.
- Exit criteria:
  - All three pages visited, filters applied, and at least one drill-down action attempted per data table.

### Mobile Responsiveness Sweep

- Objective: Re-run critical flows on mobile viewport to evaluate layout warnings and spatial constraints.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Test the left navigation menu (check tap target sizes).
  - Open the bottom drawer and select a vehicle to trigger the detail panel.
  - Verify that the detail panel is usable on a small screen and can be dismissed.
- Exit criteria:
  - Mobile viewport interactions recorded, specifically testing flagged small tap targets and overlay panels.

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

