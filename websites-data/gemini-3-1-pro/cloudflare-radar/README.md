# Cloudflare Radar Clone

A practice clone of the Cloudflare Radar global internet insights dashboard. It's a single-page view of the kinds of internet trends Cloudflare publishes: traffic, browsers, devices, protocols, attacks, outages, top domains, and top networks.

> Front-end demo only — numbers and charts are sample data, not live measurements from any network.

## What you can do

- **Get a sense of global internet activity at a glance.** Cards across the page summarize global traffic trends, top browsers, device types, protocol distribution, attack trends, outages, top domains, and top ASNs, each with its own chart.
- **Filter by time and region.** The top bar lets you switch time range and region; every card updates together.
- **Dig into a category.** Each card has hover tooltips on its chart and a "View more" link if you want to drill in further.

## How to use it

Open `index.html` in any modern browser. Use the filters at the top of the page to change time range or region, then scroll through the cards to compare different signals about the (synthetic) internet.

## What was changed in this version

- Clicking a sidebar link now scrolls the matching card cleanly into view instead of slipping under the sticky top bar — pages have a proper scroll offset so the destination card stays visible.
- The sidebar search now also filters whole nav groups (collapsing groups that have no matches) and auto-expands any group that contains a match, so finding a section by keyword actually works.
- Sidebar "active" highlighting is more reliable — only the link you clicked lights up, and switching routes from elsewhere also updates the sidebar so you can see where you are.
- Changing a dataset, dimension, format, or granularity in the API query builder now flashes an "Updating…" badge on the preview block and a toast confirms what you switched, so the change feels acknowledged.
- Tweaking modal query options (dataset, location, date range, output) now refreshes both the preview snippet and the results table immediately, instead of silently leaving the preview stale.
- Closing the mobile drawer is now wired into route changes — picking a nav link on a phone collapses the drawer instead of leaving it covering the page.
- Touch targets in the top bar (icon buttons, search trigger, mobile menu) and the side nav links are now 44px tall on phone-width windows.
- Dropdowns in the query builder now show a clear orange focus outline, making keyboard navigation visible.

## How to test the changes

1. Open `index.html`. In the left sidebar, click any card link (e.g. "Top browsers"); the matching card scrolls into view well below the sticky top bar instead of being hidden behind it.
2. Type a keyword like "attack" into the sidebar search — nav groups without matches collapse out, and the group containing matches auto-expands.
3. Click a top-nav link and then a sidebar link — only the link you actually clicked stays highlighted as active.
4. Scroll to the API query builder, change the Dataset or Format dropdown — an orange "Updating…" badge appears on the preview block and a toast at the bottom confirms the new value.
5. Open the "Build query" modal, change any of the four dropdowns — both the preview snippet and the results table refresh immediately.
6. Narrow the window to phone width, open the mobile drawer, and tap any nav link — the drawer closes as the page scrolls.
7. Tab through the query builder; each dropdown shows an orange focus ring.
