# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of AeroIQ’s core observability workflows—starting from the dashboard, drilling into endpoints, managing alerts, and understanding service dependencies—across desktop and mobile.

## Plan Summary

Run begins on the dashboard to validate global controls (org/environment, time range, theme, search) and the primary triage flow from endpoint health → endpoint detail. Then validate the adjacent alerts flow (filtering, assign/silence recovery actions) and the endpoints list flow (search/filter/sort and drill-in). Finish by checking the service map flow (service node navigation) and perform mobile repeats of the most critical interactions.

## Coverage Targets

- pages: `Visit all known HTML pages provided in the prescan (index.html, endpoints.html, endpoint-detail.html, alerts.html, services.html).`
- features: `Exercise most visible controls per key page: org/env/time/theme/search on dashboard; drill-in from endpoint health cards; error breakdown tabs and recent error samples on endpoint detail; filter/search + Assign/Silence actions on alerts; search + service/health filters + drill-in on endpoints; environment switching and node click on service map.`
- mobile: `Repeat dashboard→endpoint-detail drill-in, alerts filter + Assign/Silence, and service navigation on a mobile viewport.`

## Planned Phases

### Dashboard triage & global controls

- Objective: Validate that users can set the right context (org, environment, time range, theme) and start triage from endpoint health and the alerts panel.
- Target pages: index.html
- Key checks:
  - Switch org using the org select (Acme Cloud Org ↔ Acme Internal) and confirm KPIs + endpoint health grid update.
  - Toggle environment using Production / Staging / Dev buttons and confirm updates propagate to endpoint health cards and alerts count/content.
  - Change time range (5m → 1h → 24h → 7d) and confirm sparklines/deltas + endpoint KPIs and alert panel are consistent with the chosen range.
  - Toggle theme using 🌓 and confirm charts/cards remain readable and layout doesn’t break.
  - Use ⌘K search input to search for an endpoint/service/path term; validate results appear and navigation from search behaves as expected (even if it routes to endpoints.html).
  - Use the alert side panel: click Assign and then Silence for at least one visible alert row; validate the expected state changes (e.g., assigned-to, silenced indicator or row state) and that the dialog/confirmation (if any) closes cleanly.
- Exit criteria:
  - All four dashboard context controls (org, environment, time range, theme) are confirmed to update visible data.
  - At least one successful search interaction is completed, showing the system responds meaningfully.
  - Assign and Silence actions on an alert row result in observable UI/state change without errors.

### Endpoint drill-down accuracy

- Objective: Validate that endpoint health cards lead to correct endpoint detail with preserved context and that key detail sections are navigable.
- Target pages: endpoint-detail.html
- Key checks:
  - From index.html, click an unhealthy endpoint health card (e.g., the card showing highest error rate/latency) and verify you land on endpoint-detail.html for the same method+path/service (e.g., POST /v1/payments checkout-api).
  - On endpoint-detail.html, verify the owner/services shown match the selected endpoint and that 6 KPIs are populated.
  - Switch the time range again on the endpoint detail page (if the top controls persist) and verify trend charts and KPIs update accordingly.
  - Interact with the error-grouping tabs: By status code → By client version → By region, confirming the breakdown content updates.
  - Review the recent error samples table and confirm rows are readable (incl. status codes like 502/500/429/503) and the displayed messages correspond to the endpoint context.
  - If a related traces list exists, click one item (if interactive) and validate the UI reaction (e.g., details expand or navigation).
- Exit criteria:
  - At least one endpoint card successfully opens the correct endpoint detail page with consistent identifiers (method/path/service).
  - Error breakdown tabs update the chart/table content without navigation loss.
  - Charts/tables remain usable after time range changes.

### Alerts center workflows & recovery actions

- Objective: Validate alerts center filtering usability and confirm assign/silence actions work in the full alerts list context.
- Target pages: alerts.html
- Key checks:
  - Use filter bar controls on alerts.html: change severity (Critical/Warning/Info), rule, assignee, and status (Open/Assigned/Resolved) and verify the alert rows update.
  - Use the Alerts center search input to search for a rule or endpoint/path string and confirm it narrows results.
  - Open/perform Assign on an alert row and verify assignment changes in the table.
  - Open/perform Silence on another alert row and verify silenced state/visibility updates.
  - Validate that the navigation back to Dashboard/Endpoints via left rail keeps the correct environment/time context.
- Exit criteria:
  - At least two distinct filters (e.g., severity + status) demonstrably change the set of visible alerts.
  - Assign and Silence actions succeed from alerts.html with visible outcome in-row or via confirmation.
  - Navigation preserves context (org/env/time range).

### Endpoints list search/filter & drill-in

- Objective: Validate the endpoints list as an alternative navigation/recovery entry point and ensure list search routes to correct detail.
- Target pages: endpoints.html, endpoint-detail.html
- Key checks:
  - Use endpoints.html search (⌘K or “Search method or path…”) to filter by method/path; confirm matching rows update.
  - Use filter controls for service scope (“All services” multi/single select) and health tag (Healthy/Degraded/Unhealthy) and verify row health indicators update.
  - Click a filtered endpoint row and confirm endpoint-detail.html opens for the same endpoint and retains the current environment + time range.
  - Verify the “SLO last deploy / Owner” and health label columns are readable and consistent after filtering.
- Exit criteria:
  - Search and at least one filter (service or health tag) visibly change the endpoints list.
  - Drill-in from endpoints.html leads to the correct endpoint detail page consistently.

### Service map dependencies navigation

- Objective: Validate the service map as a context tool and confirm service node navigation leads to appropriate details (if available).
- Target pages: services.html
- Key checks:
  - Switch environment on services.html (Production ↔ Staging) and confirm the dependency graph/edges update (edge density/which services appear).
  - Click a service node (e.g., checkout-api, users-svc) and validate expected UI response (node details panel, navigation, or highlighting).
  - Verify top bar context controls (org/time/theme) still influence displayed content if applicable.
- Exit criteria:
  - Environment switching produces clear graph changes.
  - At least one service node click results in an observable and understandable UI change.

### Mobile critical-path validation

- Objective: Repeat the most failure-prone/critical interactions on mobile viewport: navigation, triage, drill-down, and alerts actions.
- Target pages: index.html, endpoint-detail.html, alerts.html
- Key checks:
  - On mobile, use left-rail navigation or equivalent to open Alerts and Endpoints; confirm tap targets are usable despite prescan small-tap warnings.
  - On dashboard, interact with ⌘K search and time range/environment toggles; confirm controls are not clipped.
  - Perform drill-down from dashboard to endpoint-detail.html and validate charts/tabs are accessible (error breakdown tabs).
  - On alerts.html (mobile), apply at least one filter and attempt Assign/Silence; confirm dialogs are usable and not off-screen.
- Exit criteria:
  - No critical interactions (nav, drill-in, assign/silence) are blocked by layout/tap-target issues on mobile.
  - Filters/search and key UI components remain readable and functional.

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

