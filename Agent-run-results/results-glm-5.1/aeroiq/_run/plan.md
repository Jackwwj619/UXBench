# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full AeroIQ system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by validating the primary dashboard and its global controls, then drill down into the critical endpoint detail page for an unhealthy endpoint. Next, it will assess the alert management and triage flow, followed by evaluating the endpoints list and service map views. Finally, it will verify responsive behavior and accessibility across the identified risk hotspots.

## Coverage Targets

- pages: `visit all 5 known HTML pages, attempt placeholder pages (#) to confirm dead-ends`
- features: `exercise all visible filters, tabs, search inputs, theme toggle, and environment/time switches`
- mobile: `repeat critical checks (dashboard, endpoint detail, alert filters) on mobile viewport`

## Planned Phases

### Dashboard Overview & Global Controls

- Objective: Validate the primary landing experience, data density, and functionality of global controls.
- Target pages: index.html
- Key checks:
  - Verify KPI sparklines and period-over-period deltas render correctly.
  - Interact with environment tabs (Production, Staging, Dev) and time range selectors (5m, 1h, 24h, 7d) to check for UI updates.
  - Test the ⌘K search input for focus, typing, and clearing behavior.
  - Click the theme toggle (🌓) to ensure light/dark mode switches smoothly.
  - Click the alert bell (🔔 8) to see if it opens a dropdown or navigates.
  - Interact with 'Assign' and 'Silence' buttons on the Active Alerts panel.
- Exit criteria:
  - All top-level KPIs verified.
  - Global controls (env, time, theme, search) exercised.
  - Alert side panel actions interacted with.

### Endpoint Drill-down & Triage

- Objective: Validate the critical flow from the dashboard to a failing endpoint's detailed view and error analysis.
- Target pages: index.html, endpoint-detail.html
- Key checks:
  - Click the worst-performing endpoint card (POST /v1/payments) from the dashboard grid to navigate to endpoint-detail.html.
  - Verify endpoint health badge, SLO status, and owner avatars render correctly.
  - Check the three trend charts (Request volume, Latency, Error rate) for visibility and legend clarity.
  - Interact with the Error breakdown tabs (By status code, By client version, By region).
  - Validate the Recent error samples table for readability and horizontal scrolling behavior.
  - Ensure global controls (env, time) on the detail page function consistently.
- Exit criteria:
  - Navigated successfully from dashboard to endpoint detail.
  - Charts and error breakdown tabs interacted with.
  - Data hierarchy and triage information validated.

### Alert Center & Filtering

- Objective: Assess the alert management experience, focusing on filtering capabilities and alert status transitions.
- Target pages: alerts.html
- Key checks:
  - Navigate to Alerts via the left rail nav and verify the 4 KPIs (Active, New today, Avg response, MTTR).
  - Test the filter bar: interact with severity, rules, assignees, and status dropdowns.
  - Use the search input to filter alerts by keyword.
  - Attempt to change an alert's status or interact with row-level actions if available.
  - Verify navigation back to dashboard or endpoint detail from an alert row if linked.
- Exit criteria:
  - Alert KPIs verified.
  - All filter dropdowns exercised.
  - Search functionality validated.

### Endpoints List & Service Map

- Objective: Evaluate the secondary navigation pages for inventory management and architectural visualization.
- Target pages: endpoints.html, services.html
- Key checks:
  - Navigate to Endpoints page and test service/health/tag filter dropdowns.
  - Use the 'Search method or path...' input to filter the endpoint table.
  - Navigate to Service Map and verify the dependency graph renders.
  - Click on a service node in the Service Map to check for detail popups or navigation.
  - Switch between Production and Staging environments on the Service Map.
- Exit criteria:
  - Endpoints table filtered and searched.
  - Service map rendered and nodes clicked.
  - Environment switching validated on service map.

### Mobile Responsiveness & Accessibility Audit

- Objective: Identify layout breakage, touch target issues, and accessibility barriers on smaller viewports.
- Target pages: index.html, endpoint-detail.html, alerts.html
- Key checks:
  - Switch to mobile viewport and check the left rail navigation (hamburger menu behavior).
  - Validate tap target sizes for environment tabs, time ranges, and alert actions per layout warnings.
  - Check if the endpoint detail charts and tables are horizontally scrollable or responsively resized.
  - Verify the alert filter bar stacks correctly or remains usable on mobile.
  - Assess color contrast and missing label for the org switcher dropdown.
- Exit criteria:
  - Mobile layout tested on dashboard, detail, and alerts pages.
  - Tap target and accessibility warnings from prescan visually confirmed.
  - Navigation and core flows remain functional on mobile.

## Prescan Summary

### AeroIQ — Know before your users do.

- Page: `index.html`
- Headings: Endpoint health, Global latency (p50 / p95 / p99) · 1h, Active Alerts 8
- Interactables: `28` buttons, `9` links, `2` inputs
- Notable controls:
  - clickable:a:AeroIQ
  - clickable:a:📊 Dashboard
  - clickable:a:🔗 Endpoints
  - clickable:a:🚨 Alerts 8
  - clickable:a:🌐 Service Map
  - clickable:a:📜 Logs
  - clickable:a:🔌 Integrations
  - clickable:a:⚙️ Settings

### Alerts — AeroIQ

- Page: `alerts.html`
- Headings: Alerts
- Interactables: `1` buttons, `8` links, `7` inputs
- Notable controls:
  - clickable:a:AeroIQ
  - clickable:a:📊 Dashboard
  - clickable:a:🔗 Endpoints
  - clickable:a:🚨 Alerts 8
  - clickable:a:🌐 Service Map
  - clickable:a:📜 Logs
  - clickable:a:🔌 Integrations
  - clickable:a:⚙️ Settings

### Endpoint detail — AeroIQ

- Page: `endpoint-detail.html`
- Headings: /v1/payments, Request volume, Latency p50 / p95 / p99, Error rate, Error breakdown, Recent error samples, Related traces
- Interactables: `15` buttons, `8` links, `2` inputs
- Notable controls:
  - clickable:a:AeroIQ
  - clickable:a:📊 Dashboard
  - clickable:a:🔗 Endpoints
  - clickable:a:🚨 Alerts 8
  - clickable:a:🌐 Service Map
  - clickable:a:📜 Logs
  - clickable:a:🔌 Integrations
  - clickable:a:⚙️ Settings

### Endpoints — AeroIQ

- Page: `endpoints.html`
- Headings: Endpoints
- Interactables: `1` buttons, `8` links, `6` inputs
- Notable controls:
  - clickable:a:AeroIQ
  - clickable:a:📊 Dashboard
  - clickable:a:🔗 Endpoints
  - clickable:a:🚨 Alerts 8
  - clickable:a:🌐 Service Map
  - clickable:a:📜 Logs
  - clickable:a:🔌 Integrations
  - clickable:a:⚙️ Settings

### Service map — AeroIQ

- Page: `services.html`
- Headings: Service map
- Interactables: `3` buttons, `8` links, `2` inputs
- Notable controls:
  - clickable:a:AeroIQ
  - clickable:a:📊 Dashboard
  - clickable:a:🔗 Endpoints
  - clickable:a:🚨 Alerts 8
  - clickable:a:🌐 Service Map
  - clickable:a:📜 Logs
  - clickable:a:🔌 Integrations
  - clickable:a:⚙️ Settings

