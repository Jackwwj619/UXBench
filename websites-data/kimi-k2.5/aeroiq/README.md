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

- Switching environments at the top (Production / Staging / Dev) now actually changes the numbers everywhere on the dashboard — totals, error rates, latency, sparklines, and endpoint cards all update to match the environment you picked. Staging and Dev show lower traffic and slightly worse error rates than Production, as you'd expect.
- The "Logs" link in the left rail now opens a real Logs page (instead of going nowhere) with a stream of recent log entries.
- On the Alerts page, you can now filter alerts by status (Open / Assigned / Resolved) and search by text. Each alert keeps the same status and owner instead of jumping around every time the table redraws. If your filters match no alerts, you see a clear "No alerts match" message.
- The Endpoints page also now shows a "No endpoints match" message when filters return nothing, and each row shows the health word (Healthy / Degraded / Unhealthy) next to the colored dot.
- The Service Map now lets you switch environments too. Service nodes are easier to click (the clickable area is bigger), can be selected with the keyboard, and the detail panel on the right now shows upstream and downstream services plus total traffic.
- Every dropdown and search box in the app now has a hidden label so screen readers can announce them properly.

## How to test the changes

1. Open `index.html`. At the top of the page, click **Staging**. The four big numbers (total requests, error rate, p95, availability) and every endpoint card should change. Click **Dev** — numbers drop again. Click back to **Production**.
2. Click **Logs** in the left rail — it should open a Logs page, not a dead link.
3. Click **Alerts** in the left rail. Use the "Status" dropdown to pick "Open" — only open alerts remain. Type in the search box — the table filters as you type. Set the filters to something that matches nothing — you should see "No alerts match the current filters."
4. Reload the Alerts page and confirm each alert keeps the same status and owner instead of changing.
5. Click **Endpoints** in the left rail. Type something nonsense into the search — you should see "No endpoints match the current filters." Notice the health column now shows "Healthy", "Degraded", or "Unhealthy" next to the colored dot.
6. Click **Service Map** in the left rail. Click **Staging** and watch the lines and nodes update. Click a service node — the right panel shows endpoints plus Upstream and Downstream services. Press Tab to a service node, then Enter — the same details appear.
