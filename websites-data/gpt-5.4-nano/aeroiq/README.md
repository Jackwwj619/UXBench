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

- Each endpoint card on the overview now shows a small chevron arrow on hover and behaves like a proper link, so it's obvious you can click it. Keyboard users can also tab to a card and press Enter or Space to open it.
- The Alerts page now has working **Assign** and **Silence** buttons on every row. Clicking either one opens a confirmation prompt; the row updates immediately (status changes to "assigned" or "resolved") and a small confirmation toast pops up in the bottom-right corner.
- The Alerts page filters now actually work — you can filter by Rule, Assignee, or Status, and there's a new search box that matches against rule names, endpoints, and descriptions. A summary above the table shows how many alerts match and which filters are active, with a one-click "Clear filters" button.
- The Endpoints page got the same treatment: active filters now show as pills above the list, with a count of matching endpoints and a clear-filters button. Each row shows a chevron on the right; rows are now keyboard-focusable and open with Enter.
- Wide tables on the Alerts and Endpoints pages now scroll sideways inside their own area on phones rather than pushing the page off-screen.
- When the table comes back empty after filtering, you now see a "No alerts/endpoints match the current filters" message instead of just an empty area.
- The "Last deploy" times on the Endpoints page no longer flicker to random new numbers every time you change a filter — each endpoint keeps the same deploy time across re-renders.
- On a phone-width screen, the navigation rail, top bar, search box, action buttons, and table cells are all sized up so they're comfortable to tap.
- All icon buttons (theme, bell, user menu) now have proper hover labels for screen readers, and the keyboard focus outline is visible across the app.

## How to test the changes

1. Open `index.html` in any modern browser.
2. Hover an endpoint card on the overview — a small arrow should appear on the right; tab to the card and press Enter to confirm it opens the endpoint detail.
3. Click **Alerts** in the left rail. Pick a value from any of the Severity / Rule / Assignee / Status filters, or type in the new Search box. Above the table you should see a count like "**4** of 12 alerts" with a pill for each active filter and a **Clear filters** button.
4. On any alert row, click **Assign** — confirm in the dialog. The row's status should change to "assigned", a small toast should appear in the bottom-right saying "Assigned: …", and the row's owner column should update.
5. On a different row, click **Silence**, confirm, and watch the row become "resolved" with a confirmation toast.
6. Set a filter that matches nothing (e.g. Severity = info plus a Search term like "zzz"). The table should show "No alerts match the current filters." Click **Clear filters** to bring everything back.
7. Click **Endpoints** in the left rail. Use the Service or Health dropdown, or type in Search — the active filter pills and count should appear, and rows should filter live. Click any row, or tab to it and press Enter, to open the endpoint detail.
8. Change a filter on the endpoints list and look at the "Last deploy" column — the deploy time for each row should stay the same across changes (no random shuffling).
9. Resize the browser to a phone width. The wide table should scroll sideways inside its own area rather than stretching the page; the navigation rail, top bar buttons, and search input should all be comfortable to tap.
10. Tab through the page with the keyboard — every button, link, card, and table row should show a visible blue focus outline.
