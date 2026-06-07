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

- The Logs, Integrations, and Settings entries in the left sidebar are now clearly marked with a small "Soon" tag and dimmed, and clicking one pops up a "… is coming soon." message instead of silently doing nothing.
- The active environment tab (Production / Staging / Dev) now stands out in solid blue with white text, so it's obvious which environment you're looking at. Switching environments and time ranges also shows a quick confirmation message at the bottom.
- Toggling between light and dark theme now shows a "Theme: Light/Dark" confirmation so you know it took effect.
- The organization dropdown in the top bar now has a small "Organization" label above it, so it's clear what the dropdown picks.
- Endpoint cards on the dashboard now show a small "›" arrow in the corner and behave as proper links — you can right-click to open one in a new tab, and they have a clear focus outline for keyboard users. Hovering a health dot now reveals a tooltip saying "Healthy", "Degraded", or "Unhealthy".
- The Alerts page filters now actually work: assignee and status dropdowns are populated, search filters by rule or endpoint, and each active filter highlights in blue. A count like "5 of 12 alerts" sits at the end of the toolbar, and an empty result shows "No alerts match the current filters." instead of a blank table.
- Alert rows now show a stable status and owner each time you visit, instead of shuffling randomly on every render.
- The Endpoints page now also shows a live "X of 32 endpoints" count, highlights active filters, and shows an empty-state message when no rows match.
- All the small icon buttons in the top bar (theme, bell, account) are now bigger, easier to tap, and show a clear blue outline when reached with the keyboard.
- On a phone or narrow window, the side rail collapses into a horizontal scrolling strip across the top, tables scroll sideways instead of being cut off, and the endpoint cards stack into a single column.

## How to test the changes

1. Open `index.html`. In the left sidebar, click "Logs", "Integrations", or "Settings" — each should pop up a "… is coming soon." message at the bottom of the screen, and each item should look dimmed with a "Soon" tag.
2. In the top bar, click between Production / Staging / Dev — the selected one should turn solid blue and a "Environment: …" message should appear briefly. Do the same with the 5m / 1h / 24h / 7d time-range buttons.
3. Click the moon icon (theme toggle) in the top bar — the colour scheme should flip and a "Theme: Light" or "Theme: Dark" toast should appear.
4. Hover one of the coloured dots on an endpoint card — a tooltip should say "Healthy", "Degraded", or "Unhealthy". Right-click any endpoint card and you should be able to "Open in new tab".
5. Click "Alerts" in the sidebar. Try the Assignee dropdown (it should now list people), the Status dropdown (Open / Assigned / Resolved), and type into the search box. Each active filter should turn blue and the count "X of 12 alerts" at the end of the toolbar should update. Set filters that match nothing — the table should say "No alerts match the current filters."
6. Reload the Alerts page a few times — the status and owner for each row should stay the same instead of shuffling.
7. Click "Endpoints" in the sidebar and try the Service, Health, and Search filters. The "X of 32 endpoints" badge and empty-state message should behave the same way as Alerts.
8. Press Tab repeatedly from the address bar — each top-bar icon button and sidebar link should show a visible blue focus outline.
9. Shrink the browser window to phone width — the left sidebar should collapse into a scrolling strip at the top, the endpoint card grid should stack into one column, and tables should scroll sideways.
