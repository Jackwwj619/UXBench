# UXAgent Exploration Plan

## Goal

Explore the AeroIQ monitoring SaaS end-to-end with emphasis on the dashboard-to-detail investigation path, alert triage, endpoint filtering/search, and service topology navigation, while validating responsive/mobile usability on the same critical flows.

## Plan Summary

Start on the dashboard and verify the primary operational flow: understand system health, inspect high-risk endpoint cards, and drill into a detailed endpoint view. Then cover the adjacent operational pages—Endpoints, Alerts, and Service Map—using the visible filters, search, time range, environment, theme, and assignment/silence controls to confirm state changes and cross-page consistency. Repeat the most important navigation and triage checks in a mobile viewport, with special attention to small tap targets and unlabeled controls already flagged by prescan.

## Coverage Targets

- pages: `Visit all 5 known HTML pages and validate at least one meaningful interaction on each.`
- features: `Exercise the dashboard state controls, endpoint health drilldown, endpoint list filters/search, alert filters/actions, and service-map environment/node interactions.`
- mobile: `Repeat the highest-value flows on mobile: dashboard controls, one endpoint detail drilldown, alerts filtering/action, and service-map environment toggling.`

## Planned Phases

### Dashboard orientation and state controls

- Objective: Validate the landing dashboard, global navigation, and top-level state controls that anchor the rest of the exploration.
- Target pages: index.html
- Key checks:
  - Confirm the dashboard loads with the KPI row, endpoint health grid, active alerts panel, and global latency chart visible and coherent.
  - Exercise environment tabs (Production, Staging, Dev) and time ranges (5m, 1h, 24h, 7d) to check for visible state change or selected styling.
  - Use org switcher, theme toggle, notification bell, and profile button to confirm they are interactive and do not break layout.
  - Open at least one high-risk endpoint card from the health grid to verify drilldown path into endpoint detail.
- Exit criteria:
  - At least one environment/time-range combination has been toggled and the selected state observed.
  - One endpoint card or equivalent drill-in path has been followed to the detail page.
  - No blocking layout or interaction failures on the dashboard nav or key controls.

### Endpoint drilldown and incident evidence

- Objective: Inspect the unhealthy endpoint detail page for depth of troubleshooting information and tabbed breakdown behavior.
- Target pages: endpoint-detail.html
- Key checks:
  - Validate the header context: method, path, health badge, linked services, owner, and SLO breach state.
  - Review the KPI strip and the three charts for request volume, latency, and error rate to ensure they read as distinct diagnostics.
  - Switch the error breakdown tabs (status code, client version, region) and verify each tab updates the breakdown content.
  - Inspect recent error samples for representative error classes (502, 500, 429, 503) and check truncation/row readability.
  - Open or inspect related traces to confirm the page supports deeper trace-level follow-up.
- Exit criteria:
  - All visible diagnostic sections have been viewed at least once.
  - At least one tab change in error breakdown has been confirmed.
  - The error sample table and trace list are readable and actionable.

### Endpoint catalog filtering and search

- Objective: Validate the endpoints list as the broader navigation and filtering surface for the fleet.
- Target pages: endpoints.html
- Key checks:
  - Confirm the endpoints table/list renders with service, health, RPS, p95, error %, SLO, deploy age, and owner columns or equivalents.
  - Use service, health, tag, and method/path search filters to narrow the list and confirm the results update predictably.
  - Check that unhealthy/degraded rows are distinguishable from healthy rows and that breach indicators are legible.
  - Select at least one row or endpoint path if linked, to verify a second path into endpoint detail or comparable drilldown.
- Exit criteria:
  - At least two different filter types have been exercised.
  - Search or filter results visibly change the list.
  - Row status styling and key columns remain understandable after filtering.

### Alert triage and resolution affordances

- Objective: Validate the alerts center as the core operational triage flow, including filtering, table readability, and row-level actions.
- Target pages: alerts.html
- Key checks:
  - Check the KPI cards for active alerts, new today, mean response time, and MTTR.
  - Use severity, rules, assignee, and status controls to filter the table and confirm the visible alert set updates.
  - Inspect the alerts table for time, rule, endpoint, severity, status, and owner coverage, especially critical vs warning distinctions.
  - Test row-level or summary actions where present, and confirm Assign/Silence behavior is understandable and does not cause accidental loss of context.
  - Verify the visible search input and other controls remain usable and not confusingly labeled.
- Exit criteria:
  - Multiple alert filters have been exercised and reflected in the table.
  - At least one alert action or action affordance has been inspected.
  - Alert severity and status are clearly distinguishable in the filtered view.

### Topology comprehension and service switching

- Objective: Validate the service map as a system-wide navigation aid and inspect whether environment toggles and node interaction are meaningful.
- Target pages: services.html
- Key checks:
  - Confirm the service map loads with node graph labels and the explanatory text about edge width/traffic.
  - Toggle Production and Staging and observe whether the graph changes or the selected state is clear.
  - Click at least one service node if interactive to verify discoverability of node-based drilldown.
  - Check that the map remains interpretable without a legend overload or ambiguous node labeling.
- Exit criteria:
  - At least one environment toggle on the service map has been tested.
  - A node interaction has been attempted or confirmed as non-blocking if unavailable.
  - The page remains readable at both desktop and mobile sizes.

### Mobile recheck of critical flows

- Objective: Repeat the most important dashboard, alerts, and detail interactions in a mobile viewport to validate tap-targets, spacing, and preserved task flow.
- Target pages: index.html, alerts.html, endpoint-detail.html, endpoints.html, services.html
- Key checks:
  - Revisit dashboard navigation, top controls, and at least one endpoint card on mobile.
  - Re-test alerts triage controls and one table row/action on mobile.
  - Re-check endpoint detail tab switching and sample readability on mobile.
  - Assess whether sidebar nav links, environment/time-range buttons, and org selector are still operable despite small tap targets.
  - Confirm whether the missing-label and small-target warnings materially hinder task completion.
- Exit criteria:
  - Critical flows can still be completed on mobile without blockers.
  - The most important small-target or unlabeled control issues have been confirmed as either minor or user-blocking.
  - Mobile results are captured for dashboard, alerts, and one detail page.

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

