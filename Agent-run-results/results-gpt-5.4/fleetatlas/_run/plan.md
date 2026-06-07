# UXAgent Exploration Plan

## Goal

Explore the full FleetAtlas dashboard experience end-to-end, centered on monitoring and inspecting vehicles from the map home, then validating adjacent operational pages, filters, detail states, and destructive/recovery interactions on both desktop and mobile.

## Plan Summary

Start on the map dashboard because it is the primary operational flow and contains the richest set of interactive states: nav, org switcher, view toggles, alert bell, status filters, vehicle map/list coordination, detail panel, history toggles, and action buttons. Then branch into the dedicated Vehicles, Alerts, and Analytics pages to confirm that navigation, filtering, search, table interactions, and detail dialogs behave consistently with the home page context. Reserve extra depth for risky states already indicated by prescan: live-updating vehicle positions, the right-side detail panel, alert assignment/details, and the destructive Reassign task confirmation modal. Repeat the most critical navigation, filtering, panel, and table checks on mobile where several controls already look undersized.

## Coverage Targets

- pages: `Visit all 4 known HTML pages, with deepest coverage on index.html and moderate coverage on vehicles.html and alerts.html; analytics.html can be lighter unless issues emerge.`
- features: `Exercise nearly all visible controls on index.html, all primary filters/search controls on vehicles.html and alerts.html, and at least one representative action/detail flow per operational page.`
- mobile: `Repeat critical checks on mobile viewport for index.html plus focused filter/table/action checks on vehicles.html and alerts.html, emphasizing tap targets, overflow, panel/modal usability, and navigation discoverability.`

## Planned Phases

### Map dashboard orientation and global navigation

- Objective: Validate the home dashboard shell, global navigation, and top-level controls before drilling into vehicle details.
- Target pages: index.html
- Key checks:
  - Confirm left rail navigation reaches vehicles.html, analytics.html, and alerts.html, and that Dashboard returns to index.html
  - Check placeholder nav items with href '#' do not misleadingly appear broken or cause disruptive jumps
  - Exercise the organization switcher and observe whether visible context changes
  - Use Map view, List view, and Analytics view buttons and verify whether each changes state/content as implied by the labels
  - Open and close the alert bell dropdown and verify recent alerts appear
  - Use the top search box with a known plate/driver fragment from the visible list and observe filtering/highlighting behavior
  - Inspect the status chips All / Running / Idle / Maintenance / Offline / Alert and verify counts/content alignment with the visible list
- Exit criteria:
  - Global nav behavior is confirmed for all non-placeholder destinations
  - Top-bar controls have been exercised at least once each with observed outcomes recorded
  - At least three status filters have been validated against visible vehicle list changes

### Vehicle drill-down from dashboard

- Objective: Test the core operational flow of selecting a vehicle and acting from the detail panel.
- Target pages: index.html
- Key checks:
  - Open vehicle details from a map icon and from a vehicle list row; verify both target the expected vehicle
  - Validate the detail panel content structure: vehicle info, driver info, current task, historical track, and sparklines are present and readable
  - Switch historical track range among 24h, 7d, and 30d and confirm the selected state/content changes
  - Trigger Send command, Contact driver, and Maintenance record to see whether each opens a dialog, toast, panel, or other response
  - Exercise Reassign task through the second-confirmation modal and verify cancel vs confirm affordances and clarity of destructive messaging
  - Close the detail panel and reopen a different vehicle to check state reset and selection clarity
  - Observe whether live map jitter causes accidental deselection, panel mismatch, or unstable hit targets while a vehicle is selected
- Exit criteria:
  - At least two different vehicles have been opened from different entry points
  - All four action buttons in the detail panel have been exercised, with the destructive flow explicitly tested via cancel and confirm path if possible
  - Historical track toggles and panel close/reopen behavior are confirmed

### Vehicles inventory and filter consistency

- Objective: Validate the dedicated vehicle list page as the adjacent management flow and compare its behavior to the dashboard list/search model.
- Target pages: vehicles.html
- Key checks:
  - Load vehicles.html from navigation and confirm page identity and vehicle count context
  - Use status filter, fleet filter, and search by plate/driver/VIN in combination to verify coherent result narrowing
  - Check whether checkboxes support row selection without unintended page jumps or selection loss
  - Open at least one vehicle Details action and assess whether detail depth matches or diverges from the dashboard drill-down model
  - Compare a known vehicle from index.html (for example NY-H2X05 or TX-5SH71) across pages for naming/status consistency
  - Scan for sorting, sticky headers, truncation, or horizontal overflow issues in the dense table layout
- Exit criteria:
  - All primary filters on vehicles.html have been exercised individually and at least one combined-filter scenario has been tested
  - At least one row detail interaction has been completed
  - Cross-page consistency has been checked for at least one known vehicle record

### Alerts triage workflow

- Objective: Assess the alerts center as the main adjacent action flow for triaging fleet issues.
- Target pages: alerts.html
- Key checks:
  - Verify KPI cards and filter controls are understandable and reflect the table context
  - Use time range, severity, type, and status filters plus alert search to narrow the alert table
  - Test Assign on at least one open critical alert and verify feedback/state change
  - Test Details on at least one alert and inspect any dialog/panel for clarity and actionable information
  - Cross-check whether alerts visible on index.html (alert count/status vehicles) correspond to rows on alerts.html where possible
  - Look for empty, no-match, or reset behavior after aggressive filter combinations
- Exit criteria:
  - Each alert filter dimension has been used at least once
  - Both Assign and Details actions have been exercised
  - At least one filter combination leading to a narrowed or empty result set has been validated

### Analytics read-only comprehension and responsive pass

- Objective: Confirm the analytics page is navigable and understandable, then repeat critical end-to-end checks on mobile for usability risks.
- Target pages: analytics.html, index.html, vehicles.html, alerts.html
- Key checks:
  - Open analytics.html and validate core content readability: KPI summary, daily active vehicles chart, utilization heatmap, and driver performance table
  - Use any visible global search/profile/org controls on analytics page and verify they behave consistently with other pages
  - On mobile viewport, revisit index.html and test left-nav accessibility or responsive replacement, top-bar controls, status chips, map/list visibility, and vehicle detail panel usability
  - On mobile viewport, revisit vehicles.html and alerts.html to test filter controls, search fields, row actions, and any overflow in tables
  - Specifically verify previously flagged small tap targets and the unlabeled organization select in mobile conditions
  - Check whether critical dialogs/dropdowns remain usable on mobile, especially alert bell dropdown and Reassign confirmation
- Exit criteria:
  - Analytics page has been visually and interactively spot-checked
  - Critical desktop flow has been replayed in mobile on index.html
  - At least one meaningful mobile check has been completed on both vehicles.html and alerts.html

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

