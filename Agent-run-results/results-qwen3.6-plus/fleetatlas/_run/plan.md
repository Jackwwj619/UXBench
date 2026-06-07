# UXAgent Exploration Plan

## Goal

Evaluate the UX of FleetAtlas, focusing on the real-time dashboard interaction model, data consistency across views (Map/List/Analytics), and the efficiency of critical workflows like alert resolution and vehicle reassignment.

## Plan Summary

The exploration will begin with the primary Dashboard flow, validating map interactivity, view switching, and the vehicle detail panel. It will then move to adjacent pages (Vehicles, Alerts, Analytics) to check for data parity and filtering capabilities. Finally, it will stress-test high-risk interactions like destructive actions (Reassign) and mobile responsiveness given the identified layout warnings.

## Coverage Targets

- pages: `Visit all 4 known HTML files (index, vehicles, alerts, analytics).`
- features: `Exercise Map interactions, Detail Panel actions (especially Reassign), Global Search, and Status Filters.`
- mobile: `Repeat Phase 1 and Phase 3 key checks on mobile viewport to validate touch targets.`

## Planned Phases

### Dashboard Core & Map Interaction

- Objective: Validate the primary real-time monitoring experience, including map controls, view switching, and status filtering.
- Target pages: index.html
- Key checks:
  - Click individual vehicle icons on the map to open the Right Detail Panel.
  - Verify content in Detail Panel: Plate, Driver, Current Task, and Sparklines.
  - Toggle between 'Map view', 'List view', and 'Analytics view' tabs within the dashboard.
  - Apply status filters (e.g., 'Running', 'Alert') and verify list/map updates.
  - Interact with the Alert Bell icon to check the dropdown preview.
- Exit criteria:
  - Successfully opened and closed at least 3 different vehicle detail panels.
  - Confirmed that status filters reduce the visible vehicle count appropriately.
  - Verified that 'List view' tab displays the same data structure as the bottom drawer.

### Critical Workflows & Destructive Actions

- Objective: Test complex interactions involving modals and multi-step processes, specifically focusing on safety-critical or destructive actions.
- Target pages: index.html
- Key checks:
  - Open a vehicle detail panel and click 'Reassign task'.
  - Validate the appearance and behavior of the second-confirmation modal.
  - Test 'Cancel' vs. 'Confirm' paths in the modal.
  - Click 'Contact driver' and 'Send command' to check for feedback/toasts (even if simulated).
  - Search for a specific vehicle using the top search bar ('Search by plate / driver...').
- Exit criteria:
  - Confirmation modal for 'Reassign task' appears and functions correctly.
  - Search functionality filters the vehicle list effectively.
  - Action buttons provide some form of UI feedback (modal, toast, or state change).

### Adjacent Pages & Data Consistency

- Objective: Ensure data integrity and consistent filtering/search patterns across the dedicated sub-pages.
- Target pages: vehicles.html, alerts.html, analytics.html
- Key checks:
  - Navigate to 'Vehicles' page: Check table sorting and filtering by fleet/status.
  - Navigate to 'Alerts' page: Verify KPI cards match the dashboard bell count (12).
  - Test alert filtering (Severity, Type, Status) and 'Assign' action.
  - Navigate to 'Analytics' page: Review heatmap and driver performance tables.
  - Cross-reference a vehicle's status on 'Vehicles' page with its status on the Dashboard.
- Exit criteria:
  - Visited all 3 sub-pages.
  - Confirmed that 'Open alerts' count on alerts.html matches the badge on index.html.
  - Verified that filtering controls on sub-pages behave consistently with the dashboard.

### Mobile Responsiveness & Accessibility

- Objective: Identify usability issues on smaller screens, focusing on the tap target warnings found in the prescan.
- Target pages: index.html, alerts.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Attempt to tap sidebar navigation items (identified as < 44px height).
  - Check legibility of the Map view and Vehicle List on mobile.
  - Test the 'Alerts' page filter dropdowns on mobile (often prone to overflow).
  - Verify if the Right Detail Panel becomes a full-screen overlay or bottom sheet on mobile.
- Exit criteria:
  - Documented any unclickable elements due to small size.
  - Verified if the layout breaks or becomes unusable on narrow viewports.
  - Checked if horizontal scrolling is required for tables on mobile.

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

