# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the AeroIQ observability workflow end-to-end, centering on the dashboard-to-investigation path and covering adjacent monitoring pages, filters, and responsive behavior.

## Plan Summary

Start on the overview dashboard and validate the primary triage flow: scan KPIs, inspect the endpoint health grid, use the active alerts panel, and move into a problematic endpoint for deeper diagnosis. Then cover the adjacent operational pages—Endpoints, Alerts, and Service Map—by exercising their visible filters, navigation, and state toggles. Finish with focused mobile checks on the top navigation, dense controls, and alert/endpoint triage surfaces, since the prescan already shows likely tap-target and labeling issues.

## Coverage Targets

- pages: `Visit all 5 known HTML pages, with repeated visits to index.html and endpoint-detail.html for the main triage flow.`
- features: `Exercise most visible controls on the dashboard, endpoint detail, endpoints filters, alerts filters/actions, service-map environment toggles, and global nav/search/theme controls where present.`
- mobile: `Repeat the critical triage flow and dense-control pages on a mobile viewport, prioritizing nav access, top-bar controls, endpoint cards/table filters, and alerts interactions.`

## Planned Phases

### Dashboard triage and primary navigation

- Objective: Validate the overview dashboard as the main entry point for detecting issues and choosing the next investigative step.
- Target pages: index.html
- Key checks:
  - Confirm left-rail navigation reaches all known real pages: Dashboard, Endpoints, Alerts, Service Map
  - Inspect KPI cards and verify time-range controls (5m, 1h, 24h, 7d) visibly update selection and remain understandable
  - Inspect environment tabs (Production, Staging, Dev) for clear active state and any page-level data/state changes
  - Exercise org switcher and confirm whether changing org affects visible context without breaking layout
  - Use the search input and assess discoverability, placeholder clarity, and whether entered queries produce visible feedback
  - Open or interact with the bell/profile/theme controls if possible and note any overlays, dead controls, or ambiguous affordances
  - Assess whether the dashboard makes the most urgent unhealthy endpoints and active alerts obvious at a glance
- Exit criteria:
  - Dashboard top-bar controls have been exercised at least once each where possible
  - All known primary nav links from the dashboard have been verified
  - A clear next-step path from dashboard triage into either alerts or endpoint investigation has been identified

### Issue drill-down from dashboard to endpoint detail

- Objective: Follow the most critical monitoring flow from a problematic dashboard card or alert into detailed endpoint diagnosis.
- Target pages: index.html, endpoint-detail.html
- Key checks:
  - Attempt entry into endpoint-detail.html from the unhealthy endpoint cards or alerts-related affordances, preferring POST /v1/payments or POST /v1/webhooks/stripe if reachable
  - On endpoint detail, verify the page header communicates method, path, health, service ownership, and severity clearly
  - Exercise time-range controls again on the detail page and check whether chart labels/selected states stay coherent
  - Review request volume, latency, and error rate charts for readability and whether comparative signals are easy to interpret
  - Switch error breakdown tabs (By status code, By client version, By region) and confirm content changes are obvious and useful
  - Inspect recent error samples and related traces for scanability, truncation, and connection to the error-breakdown context
  - Judge whether a user can move from symptom to probable cause quickly on this page
- Exit criteria:
  - At least one full dashboard-to-detail investigative path has been completed
  - All major content regions on endpoint-detail.html have been interacted with or reviewed
  - Potential confusion points in charts, tabs, or error diagnostics have been captured

### Endpoints inventory and filtering workflow

- Objective: Validate the endpoint catalog as a secondary investigation and monitoring surface.
- Target pages: endpoints.html, endpoint-detail.html
- Key checks:
  - Open endpoints.html from navigation and assess first-glance scanability of the 32-endpoint table
  - Exercise visible filters: service, health, tag, and search method/path
  - Try filter combinations that isolate unhealthy/breached endpoints and confirm whether the table remains understandable
  - Inspect whether service names, health, SLO, last deploy, and owner columns support prioritization
  - Attempt to open an endpoint from the table into endpoint-detail.html and compare the transition quality against the dashboard entry path
  - Check whether global search and page-level search are differentiated clearly enough
- Exit criteria:
  - Each visible filter on endpoints.html has been used at least once
  - At least one filtered state and one cleared/default state have been reviewed
  - A table-to-detail navigation path has been validated or clearly identified as missing

### Alerts triage and recovery actions

- Objective: Evaluate the dedicated alerts workflow for prioritization, assignment, silencing, and finding specific incidents.
- Target pages: alerts.html, index.html
- Key checks:
  - Open alerts.html from nav and compare the full alerts center against the dashboard side panel summary
  - Review KPI cards (active, new today, avg response time, MTTR) for clarity and usefulness
  - Exercise filter bar controls: severity, rules, assignees, status, and search
  - Try common triage views such as Critical only, Open only, or a specific assignee if options allow
  - Inspect the alert rows for readability of time, rule, endpoint, severity, status, and owner
  - Use any visible Assign/Silence actions where available and note whether feedback/state change is clear
  - Confirm whether 'view all' from the dashboard lands users in the expected alerts context
- Exit criteria:
  - All visible alert filters have been exercised at least once
  - At least one alert action has been attempted where actionable controls are exposed
  - The relationship between dashboard alerts summary and full alerts center has been assessed

### Service map comprehension and responsive validation

- Objective: Check the service topology page and then repeat critical flows on mobile to surface layout and touch issues.
- Target pages: services.html, index.html, alerts.html, endpoints.html
- Key checks:
  - Open services.html and verify whether Production/Staging toggles visibly affect the map
  - Attempt interaction with service nodes, since the page explicitly invites clicking a node to view details
  - Assess whether service relationships, traffic weighting, and labels are understandable without zoom or hover-only cues
  - Repeat high-priority checks on mobile viewport for index.html: nav access, top-bar controls, search, time ranges, endpoint cards, and alert panel
  - Repeat focused mobile checks on alerts.html and endpoints.html filters/search because these pages have dense controls and unlabeled selects
  - Check for clipped content, overlap, hidden controls, off-canvas nav issues, and usability problems caused by small tap targets
- Exit criteria:
  - services.html has been visited and its visible interactive promises have been validated
  - Critical dashboard, alerts, and endpoints interactions have been rechecked on mobile
  - Mobile-specific issues around tap targets, labels, and crowded control bars have been documented

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

