# AeroIQ

AeroIQ is a demo monitoring tool for engineering teams who run APIs and services in production. It gives you a single place to watch traffic, latency, and errors across every endpoint, and to triage incidents when something goes wrong.

> Fictional product — all numbers, alerts, and endpoints are sample data. Nothing connects to a real backend.

## What you can do

- **See the health of your whole API at a glance.** The overview shows total requests, error rate, p95 latency, and availability, with a grid of endpoint health cards that put problem endpoints first.
- **Drill into a single endpoint.** Open any endpoint to see its request volume, latency percentiles, error rate over time, sample failing requests, and the services it talks to.
- **Triage active alerts.** The alerts center lists what's firing, who owns it, and how long it's been open. You can assign alerts to teammates, silence noisy ones, or disable a rule.
- **Browse every endpoint.** The endpoints page gives you a searchable, filterable list of all 32 monitored endpoints.
- **Trace dependencies.** The services map shows how your services talk to each other; click a node to see all of that service's endpoints.

## How to use it

Open `index.html` in any modern browser — no install or server needed. Use the top bar to switch environments (Production / Staging / Dev) and time range (5 min, 1 hour, 24 hours, 7 days). Click any endpoint card to dive into its detail page, or jump straight to **Alerts**, **Endpoints**, or **Services** from the left rail. The bell icon shows active alerts wherever you are. There's a light/dark theme toggle in the top bar.

Destructive actions (silencing alerts, disabling rules) ask for confirmation before they go through.

## What was changed in this version

- The time-range buttons (5m / 1h / 24h / 7d) now actually change the charts. Switching ranges updates the chart labels and redraws the lines, instead of just changing the active button.
- The alerts page filters all work. You can now filter by rule, by assignee, by status, and type into the search box to narrow the list. The page also shows a running count like "Showing 4 of 16 alerts" and a friendly "No alerts match" message if nothing matches.
- The endpoints page now also shows "Showing X of Y" when you filter, and an empty-state message when no endpoints match your search.
- The search box in the top bar now opens a working command palette. You can also press Ctrl+K (or Cmd+K on Mac) to open it. Type to jump to any endpoint, service, alert, or page; use the up/down arrows and Enter to navigate.
- The "Logs", "Integrations", and "Settings" items in the left rail are now clearly marked as "SOON" and can no longer be clicked, so you don't get stuck on broken links.
- The service map page now works on a phone or narrow window. A tap-list of services appears below the diagram, and tapping a node (or pressing Enter when it's focused) opens its detail pane. There's also a new environment switcher on this page that tells you which environment's topology you're looking at.
- The whole app now has a mobile menu. On a narrow window, tap the menu button in the top bar to slide the left navigation in and out.
- The "SLO" tile on an endpoint's detail page now turns red and shows a clear warning icon when the endpoint is breaching its target, so problems are easier to spot.

## How to test the changes

1. Open `index.html`. Click 5m / 1h / 24h / 7d above the dashboard and watch the bottom "Global latency" chart relabel its axis and redraw.
2. Press Ctrl+K (or click the search box at the top). Type "checkout" or "auth" and use the arrow keys to jump to a result.
3. Open `alerts.html`. Try each dropdown filter and type in the search box — the table and the "Showing X of Y" counter update as you go.
4. Open `endpoints.html`. Filter by service or health, or search for a path — the row count updates and you get an empty-state if nothing matches.
5. Open `services.html`. Switch the Production / Staging / Dev tabs, click a service node in the diagram (or use the new list below it on a small window), and confirm the right panel updates.
6. Shrink the browser window to phone width on any page — a menu button appears at the top left and slides the navigation in and out.
7. On any endpoint detail page where the error rate is high, the SLO tile shows a red "Breached" state.
