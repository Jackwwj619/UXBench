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

- The left navigation now slides out from a hamburger button on phones, with a dark scrim behind it and tap-friendly menu rows. Press Escape or tap outside to close.
- The Logs, Integrations, and Settings menu items now display a "soon" pill and don't go anywhere when clicked — making it clear they're not yet available.
- Clicking the bell icon now opens a small dropdown listing the most recent active alerts, with a "View all alerts" link to the Alerts page, instead of doing nothing.
- Switching environments (Production / Staging / Dev) now shows a small banner reading "Showing Production environment data" so it's obvious which environment you're looking at.
- The Alerts page now has working Rule, Assignee, and Status filters plus a working search box, and shows "X of Y alerts" above the table. If no alerts match, you get a clear "No alerts match the current filters." row instead of an empty table.
- The Status column on the Alerts page now uses stable values (open / assigned / resolved) instead of a value that re-rolled randomly every time you tweaked a filter.
- Top-bar dropdowns, search boxes, and icon buttons now have proper screen-reader labels (e.g., "Alerts (8 active)", "Organization", "Search").
- On phones, the top bar reflows, the KPI tiles and endpoint cards stack into a single column, tables can scroll sideways inside their card, and the service map can scroll horizontally so nothing gets clipped.

## How to test the changes

1. Open `index.html` and resize the browser to phone width — a hamburger button appears in the top-left. Tap it, the menu slides in, the rest of the page dims. Tap the scrim or press Escape to close.
2. In the side menu, try clicking "Logs", "Integrations", or "Settings" — each should be greyed out with a "soon" badge and refuse to navigate.
3. Click the bell icon (🔔) in the top bar — a dropdown should appear with the most recent alerts and a "View all alerts →" link.
4. Click the "Staging" environment tab in the top bar — a banner reading "Showing Staging environment data" should appear under the tabs.
5. Open `alerts.html`. Pick a value in the "All rules" dropdown — the table should narrow and the "X of Y alerts" counter should update. Type something nonsense ("zzzz") in the search box — you should see the "No alerts match" message. Clear filters and notice the Status column is consistent each time, rather than re-rolling randomly.
6. Open `services.html` on a narrow window — the service-map SVG should scroll sideways inside its card rather than overflowing the page.
