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

- **The top-bar search now actually filters the overview.** Type a method, path, or service name into the search box on the overview and the endpoint cards immediately narrow down. If nothing matches, you get a clear "No endpoints match" message instead of an empty grid.
- **The bell and account icons are now real menus.** Click the bell to see a small panel with "View all alerts", "Snooze for 1 hour", and "Notification settings"; click the avatar for profile, settings, appearance, and sign-out shortcuts. Either menu closes if you click outside, press Escape, or open the other one.
- **The alerts page filters all work.** The rule, assignee, and status drop-downs are now populated with the real options used in the table, and the search box filters by rule, endpoint, or description. The status pill (Open / Assigned / Resolved) stays consistent for each row instead of flickering on every refresh, and an empty state appears when no alerts match.
- **Bigger, easier-to-tap controls on phones.** Environment tabs, time-range buttons, icon buttons, drop-downs, the search field, and side-nav items are all larger and more comfortable to tap on a small screen.
- **The pop-up menus adapt to small screens too.** On a phone-width window the bell and account menus stretch to fit the available space instead of overflowing the screen.
- **Better screen-reader labels.** Environment tabs, time-range buttons, search fields, filter drop-downs, and the alert/account buttons now announce themselves clearly to assistive technology.

## How to test the changes

1. Open `index.html`. Type something like `/users` or `payments` into the top-bar search box — the endpoint cards on the overview should narrow as you type. Clear the box and they all come back.
2. On any page, click the bell icon in the top right. A small menu should pop up showing "View all alerts", "Snooze for 1 hour", and "Notification settings". Click the account avatar — the bell menu should close and the account menu should open instead. Press Escape to close it, or click anywhere outside.
3. Go to the Alerts page. Try each of the four filters (severity, rule, assignee, status) and the search box — the table should react every time. Refresh the page a few times: each alert's status badge and owner should stay the same, not change at random.
4. With strict filters set so that nothing matches, the table should show a centred "No alerts match the current filters." message.
5. Shrink the browser to phone width. Tap the environment tabs, time-range buttons, and side-nav items — each should feel like a comfortably large tap area, and the bell/account menus should stay inside the screen.
