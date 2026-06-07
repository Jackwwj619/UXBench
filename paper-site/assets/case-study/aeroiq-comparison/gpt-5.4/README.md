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

- Switching the environment (Production / Staging / Dev) or the time range (5m / 1h / 24h / 7d) at the top of the dashboard now actually updates the big numbers, the endpoint cards, and the latency chart — and a small "Switched scope" toast confirms the change.
- A new scope label sits above the dashboard ("Showing Production · last 1h") and the KPI labels and chart titles now include the time window, so you always know what you're looking at.
- Alerts in the side panel now show their status (open / assigned / silenced). "Assign" opens a real dialog where you pick a teammate; "Silence" lets you choose how long. Silenced alerts dim and their buttons grey out.
- The Alerts page now has working filters for severity, rule, assignee, status, and search, with a "Reset" button. A count summary shows "X of Y alerts" and dismissible chips for each active filter.
- The Endpoints page now has the same upgraded filters with labels, a Reset button, and a result count.
- Typing in the top search box now opens a search panel that suggests endpoints, services, and alerts as you type, with keyboard support (Enter to jump to the first result, Escape to close).
- On phones, the Alerts and Endpoints pages switch from a wide table to readable card-style rows, and a hamburger menu opens the left navigation as a slide-in drawer.
- Endpoint cards on the dashboard are now real links (you can right-click to open in a new tab) and reveal a "View details →" hint on hover.
- The endpoint detail page now has a breadcrumb at the top — including a "Back to dashboard" or "Back to endpoints" link depending on where you came from — and the page's stats update when you change the scope in the top bar.
- Items in the left navigation that aren't built yet (Logs, Integrations, Settings) now show a "soon" pill and explain "That section isn't available in this preview" if you click them, instead of silently doing nothing.
- The service map now highlights the node you hover, shows a small tooltip with the service name and health, and the detail panel on the right has clickable endpoint links plus quick stats (endpoint count, total RPS, worst error rate).

## How to test the changes

1. Open `index.html`. At the top, click "Staging" or "Dev" in the environment tabs — the big numbers, the endpoint cards, the chart, and the labels should all change, and a small toast should appear in the bottom corner.
2. Click "24h" in the time range — the labels on the KPI cards and the chart should update to include "24h".
3. In the alerts panel on the right of the dashboard, click "Assign" on any alert. A dialog opens with a dropdown of teammates — pick one and click Assign. The alert updates to "assigned" with that person's name.
4. Click "Silence" on another alert and pick a duration. The alert dims and shows "silenced".
5. Open `alerts.html`. Pick a severity from the Severity dropdown — the table shrinks and a chip like "Severity: critical" appears at the top with a count. Click the × on the chip to clear it. Click "Reset" to clear all filters.
6. Open `endpoints.html`. Try the Service and Health filters and the search box — the table updates live and a result count appears.
7. Click in the top search bar (any page). Start typing "payments" or "stripe" — a dropdown of matching endpoints, services, and alerts appears. Press Enter to jump to the first one.
8. Shrink the browser to a phone-sized width. A hamburger button appears at the top-left; tap it and the left navigation slides in. On `alerts.html` and `endpoints.html`, the wide table is replaced by stacked cards.
9. On the dashboard, hover any endpoint card — a small "View details →" hint appears. Click it (or right-click) to open the detail page.
10. On an endpoint detail page, notice the breadcrumb at the top with a back link. Change the time range in the top bar — the page's stats and charts should update.
11. In the left navigation, click "Logs", "Integrations", or "Settings" — each now shows a small "soon" pill and a toast saying the section isn't available yet.
12. Open `services.html` and hover any service node — a tooltip appears with the name and health. Click a node and the right panel shows endpoint links you can click, plus endpoint count and total traffic.
