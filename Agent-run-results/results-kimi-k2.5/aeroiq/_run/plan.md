# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the AeroIQ system, focusing on the primary dashboard flow, adjacent pages (alerts, endpoints, endpoint detail, service map), and validating key interactions and states across desktop and mobile viewports.

## Plan Summary

The exploration will proceed in phases: first, validate the dashboard (index.html) interactions (time range, environment, org switches, alerts panel). Then, explore endpoints.html (filtering, sorting), alerts.html (alert actions, filters), endpoint-detail.html (KPI trends, error breakdown), and services.html (dependency map). Each phase includes specific checks and mobile validation.

## Coverage Targets

- pages: `Visit all 5 target pages (index, alerts, endpoint-detail, endpoints, services) with at least 2 key checks each`
- features: `Exercise 80% of visible controls (filters, tabs, buttons, cards) across pages, prioritizing core workflows (KPI trends, alert management, endpoint navigation)`
- mobile: `Repeat 1-2 critical checks per phase (e.g., environment tab, time range, filter) to validate responsive layout and interactability`

## Planned Phases

### Dashboard (index.html) Validation

- Objective: Validate core dashboard interactions, KPI trends, and alerts panel functionality.
- Target pages: index.html
- Key checks:
  - Click environment tabs (Production → Staging → Dev) and verify KPI updates
  - Click time range buttons (5m → 1h → 24h → 7d) and check KPI trend changes
  - Interact with 3-4 endpoint health cards (e.g., POST /v1/payments, GET /v1/users/:id) to ensure hover/click states work
  - Open/close the active alerts panel (via 'view all' and back) and verify alert actions (Assign, Silence) are clickable
- Exit criteria:
  - All environment/time range interactions work
  - Endpoint cards and alerts panel are interactive
  - Mobile viewport: repeat 2 key checks (e.g., environment tab, time range) to validate responsiveness

### Endpoints (endpoints.html) Exploration

- Objective: Validate endpoint list filtering, sorting, and detail navigation.
- Target pages: endpoints.html
- Key checks:
  - Use service filter (e.g., checkout-api, users-svc) and verify endpoint list updates
  - Use health filter (Healthy → Degraded → Unhealthy) and check endpoint sorting
  - Search via input (⌘K) for a path (e.g., /v1/payments, /v1/users) and verify results
  - Click 2-3 endpoint links (e.g., POST /v1/payments, GET /v1/invoices) to navigate to endpoint-detail.html
  - Sort endpoints by RPS / Error % and verify list order changes
- Exit criteria:
  - Service/health filters and search work
  - Endpoint links navigate to detail page (endpoint-detail.html)
  - Mobile viewport: repeat 2 filter checks (e.g., service filter, search) to validate mobile filtering

### Endpoint Detail (endpoint-detail.html) Deep Dive

- Objective: Validate endpoint detail page KPI trends, error breakdown, and related traces.
- Target pages: endpoint-detail.html
- Key checks:
  - From endpoints.html, click an endpoint (e.g., POST /v1/payments) to open endpoint-detail.html
  - Verify KPI trends (request volume, latency, error rate) update on hover/click (if interactive)
  - Check error breakdown tabs (status-code, client-version, region) and verify content switching
  - Return to endpoints.html and use search (⌘K) for a path (e.g., /v1/invoices) and verify result
- Exit criteria:
  - Endpoint filters and search work
  - Detail page KPI trends and error breakdown are interactive
  - Mobile viewport: check 1 KPI trend (e.g., latency) and 1 error breakdown tab

### Alerts (alerts.html) Validation

- Objective: Validate alert filtering, sorting, and action workflows.
- Target pages: alerts.html
- Key checks:
  - Use severity filter (Critical → Warning) and verify alert list updates
  - Use status filter (Open → Assigned → Resolved) and check alert list changes
  - Interact with 3-4 alert rows (e.g., Error rate > 5%, p95 latency > 1000ms) to verify hover/click states
  - Attempt to assign/silence an alert (e.g., WARNING: Error rate > 3%) and check for confirmation states (if any)
- Exit criteria:
  - All alert filters work
  - Alert actions are interactive
  - Mobile viewport: repeat 2 filter checks (e.g., severity, status)

### Service Map (services.html) and Logs/Integrations (Smoke Test)

- Objective: Validate service map interactions and smoke test remaining pages (logs, integrations).
- Target pages: services.html, logs, integrations
- Key checks:
  - Click service nodes (e.g., edge-gateway, users-svc) and verify node highlighting/info panels (if any)
  - Switch environment (Production → Staging) on services.html and check dependency map updates
  - Navigate to Logs and Integrations pages, verify basic layout (headings, interactables) load
  - Mobile viewport: check service map node interaction and environment switch
- Exit criteria:
  - Service map is interactive
  - Logs/Integrations pages load with basic interactables
  - Mobile responsiveness verified for service map

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

