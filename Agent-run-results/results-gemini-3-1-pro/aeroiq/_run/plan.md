# UXAgent Exploration Plan

## Goal

Thoroughly explore the AeroIQ dashboard ecosystem, validating global state controls, drilling down into endpoint details, exercising table filters, and ensuring a robust mobile experience.

## Plan Summary

The exploration will begin on the main dashboard to verify global context switchers (environment, time range) and quick actions like silencing alerts. It will then drill into a specific endpoint's details to interact with data breakdowns. Next, it will cover the list pages (Alerts, Endpoints) to extensively test sorting and filtering mechanisms. The run will conclude with a mobile viewport pass to check the responsiveness of complex data grids and validate flagged small tap targets.

## Coverage Targets

- pages: `Visit all 5 distinct HTML pages identified in the prescan.`
- features: `Exercise filtering dropdowns, global state toggles, inline alert actions, and tabbed content.`
- mobile: `Ensure data-dense tables and charts are usable on small screens and tap targets are accessible.`

## Planned Phases

### Dashboard & Global Controls

- Objective: Verify the main dashboard layout, global context switchers, and inline alert actions.
- Target pages: index.html
- Key checks:
  - Toggle between environments (Production, Staging, Dev) and time ranges (5m, 1h, 24h, 7d).
  - Click 'Assign' or 'Silence' on an active alert in the right panel and observe state changes.
  - Interact with the theme toggle (🌓).
  - Click the ⌘K search input to verify if a search modal appears.
- Exit criteria:
  - Global controls have been clicked and any resulting state changes observed.
  - Alert action buttons have been exercised.

### Endpoint Drill-down

- Objective: Navigate to and explore the detailed view of a specific unhealthy endpoint.
- Target pages: index.html, endpoint-detail.html
- Key checks:
  - Click on a red (unhealthy) endpoint card from the dashboard grid.
  - On the detail page, switch between the 'By status code', 'By client version', and 'By region' tabs in the Error breakdown section.
  - Verify the presence of related traces and recent error samples.
- Exit criteria:
  - Endpoint detail page loaded successfully.
  - All tabs in the error breakdown section have been clicked and content verified.

### List Pages & Filtering

- Objective: Test the complex filtering and search capabilities on the Alerts and Endpoints pages.
- Target pages: alerts.html, endpoints.html
- Key checks:
  - Navigate to Endpoints page and use the 'All services', 'All health', and 'tag: any' dropdowns.
  - Type a query into the 'Search method or path...' input on the Endpoints page.
  - Navigate to Alerts page and exercise the severity, rule, assignee, and status dropdown filters.
- Exit criteria:
  - Both list pages visited.
  - Multiple filter combinations applied and search inputs tested on both pages.

### Service Map Validation

- Objective: Check the interactive service topology visualization.
- Target pages: services.html
- Key checks:
  - Navigate to the Service Map.
  - Toggle between Production and Staging views on this specific page.
  - Attempt to click a service node (e.g., 'checkout-api') to see if details load as instructed by the page text.
- Exit criteria:
  - Service map page loaded and interaction with nodes/toggles attempted.

### Mobile Responsive Audit

- Objective: Re-evaluate critical paths and layouts on a mobile viewport.
- Target pages: index.html, endpoints.html, endpoint-detail.html
- Key checks:
  - Verify navigation menu behavior (e.g., hamburger menu).
  - Check usability of the small tap target top-bar buttons (Time range, Env).
  - Inspect the Endpoints list table to ensure it doesn't break the horizontal viewport.
  - Check how the side-by-side charts on the endpoint detail page stack on mobile.
- Exit criteria:
  - Mobile layout verified for the dashboard, a list page, and a detail page.

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

