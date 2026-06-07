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

- The time-range buttons (5m / 1h / 24h / 7d) now actually update the dashboard. The KPI tiles, sparkline trends, and the "Global latency" chart all relabel and redraw when you switch range, and a small toast confirms the change.
- The Production / Staging / Dev tabs now scale the request-volume tile so you can see the obvious gap between environments instead of seeing identical numbers everywhere.
- The top-bar search is now a working dropdown that indexes every endpoint, service, and alert. Type to filter, press Enter to jump to the first match, Escape to close, and Ctrl+K (or Cmd+K) anywhere on the page focuses it.
- The "Silence" and "Assign" buttons on each alert in the right rail now show a proper confirmation dialog, then toast the result and visibly mark the alert as silenced or assigned so you can tell what you've already actioned.
- The whole app now has a working mobile menu. On a narrow window a hamburger button appears in the top bar and slides the left navigation in over a backdrop; tapping the backdrop or a link closes it again.
- The left-rail nav now uses proper SVG icons (instead of emoji glyphs) and exposes each link to screen readers with an `aria-label`.
- Wide tables on the alerts, endpoints, and endpoint-detail pages are wrapped in a horizontal scroll container so they no longer break the layout on phones.
- Top-bar controls (org picker, search box, theme toggle, alerts bell, profile button) now have proper `aria-label`s so screen readers announce them correctly.

## How to test the changes

1. Open `index.html`. Click 5m / 1h / 24h / 7d above the dashboard — the KPI tile values, the trend labels, and the "Global latency" chart all change, and a small toast pops up confirming the new range.
2. Switch between Production / Staging / Dev tabs — the "Total Requests" tile drops sharply for Staging and Dev, and a toast confirms the environment.
3. Click the top-bar search box (or press Ctrl+K). Type "payments" or "billing" and watch results appear grouped under Endpoints / Services / Alerts. Press Enter to jump to the first match; press Escape to close.
4. On `index.html`, click "Silence" on any alert in the right rail — confirm the dialog, and the alert visibly turns into a "Silenced" state with a toast at the bottom. Click "Assign" on another and the button switches to "Assigned".
5. Shrink the window to phone width. A hamburger button appears in the top bar; tap it to slide the navigation in, then tap the dark backdrop or any link to close it.
6. Open `endpoints.html` or `alerts.html` on a narrow window — the wide tables now scroll horizontally inside their card instead of overflowing the page.
