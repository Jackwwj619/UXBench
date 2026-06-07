# UXAgent Exploration Plan

## Goal

Evaluate the UX of AeroIQ, focusing on the dashboard's information hierarchy, the drill-down flow to endpoint details, and the alert management workflow.

## Plan Summary

The run will start by validating the global controls (environment/time filters) on the Dashboard. It will then simulate an incident response workflow: identifying a failing endpoint from the grid, drilling down into its detail view to analyze error samples, and finally navigating to the Alerts center to manage notifications. The Service Map will be checked for navigational utility.

## Coverage Targets

- pages: `Visit all 5 HTML files provided in the site directory.`
- features: `Exercise all visible filters, tabs, and navigation links. Interact with at least one 'Assign/Silence' action.`
- mobile: `Repeat Phase 1 (Dashboard) and Phase 3 (Alerts) checks on mobile viewport to verify layout shifts.`

## Planned Phases

### Dashboard Global Controls & Overview

- Objective: Validate the primary entry point and global context switching.
- Target pages: index.html
- Key checks:
  - Click through Environment tabs (Production, Staging, Dev) to check for state changes.
  - Interact with Time Range buttons (5m, 1h, 24h, 7d).
  - Verify visibility and layout of the 4 KPI cards and the Endpoint Health grid.
  - Test the 'Search endpoints' input field.
- Exit criteria:
  - All global filters respond to clicks.
  - KPI cards and Endpoint grid are fully rendered.

### Incident Drill-Down Flow

- Objective: Test the core user journey from high-level health to specific error diagnosis.
- Target pages: index.html, endpoint-detail.html
- Key checks:
  - Identify a 'Red' (unhealthy) endpoint card on the Dashboard (e.g., POST /v1/payments).
  - Click the endpoint card to navigate to `endpoint-detail.html`.
  - Analyze the Detail view: Check the 6 KPIs, Trend Charts, and Error Breakdown tabs.
  - Review the 'Recent error samples' table for readability and actionable data.
- Exit criteria:
  - Successful navigation from Dashboard to Detail view.
  - Detail view charts and tables are populated and legible.

### Alert Management Workflow

- Objective: Evaluate how users monitor and resolve active incidents.
- Target pages: index.html, alerts.html
- Key checks:
  - From Dashboard, click 'view all' in the Active Alerts panel or the Alert bell icon.
  - On `alerts.html`, test the filter bar (Severity, Rule, Assignee, Status).
  - Attempt to interact with 'Assign' or 'Silence' actions on an alert row.
  - Check if clicking an alert row links back to the relevant endpoint detail.
- Exit criteria:
  - Filters apply correctly to the alert list.
  - Action buttons provide visual feedback.

### Inventory & Topology Exploration

- Objective: Assess secondary navigation paths for system overview.
- Target pages: endpoints.html, services.html
- Key checks:
  - Navigate to `endpoints.html`: Test sorting/filtering of the full endpoint list.
  - Navigate to `services.html`: Inspect the Service Map visualization.
  - Attempt to click a service node on the map to see if it links to details.
- Exit criteria:
  - Endpoints list is sortable/filterable.
  - Service map nodes are interactive or clearly informational.

### Mobile Responsiveness & Accessibility

- Objective: Validate usability on smaller screens, addressing prescan warnings.
- Target pages: index.html, alerts.html
- Key checks:
  - Switch to mobile viewport.
  - Check sidebar behavior (collapse/hamburger menu).
  - Verify tap targets for Environment/Time filters (prescan noted <44px height).
  - Ensure tables (Endpoints/Alerts) handle horizontal overflow gracefully.
- Exit criteria:
  - Navigation is accessible on mobile.
  - Critical controls are usable despite small touch targets.

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

