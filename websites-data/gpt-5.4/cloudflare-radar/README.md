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

- The search box at the top of the page now actually helps you. As you type, a small hint underneath shows how many matching domains it found and previews a few, or politely says there's no match. Pressing Enter on an empty box no longer pretends to look up "example.com" — it tells you to type something first.
- Switching between sections in the left sidebar now updates the address bar so you can bookmark or reload a specific view, and loading the page with one of those addresses jumps straight to that section.
- The currently-selected item in the left sidebar is now clearly highlighted with a coloured background and a stronger dot, so you can tell at a glance where you are. Inactive items dim their dots.
- Opening the filter drawer, a detail drawer, or a modal now also dims the background, and clicking the dim area or anywhere outside closes them — no more drawers stuck open after you click away.
- The protocol cards (HTTP/3, TLS 1.3, QUIC, IPv6) now show a clear "Selected" badge on the active one and an outline around it.
- The "Apply" button at the bottom of the filter drawer now sticks to the bottom of the drawer as you scroll the filter list, and the "Scope" line at the top of the page updates to show how many filters are currently applied.
- On phones, the top-bar menu icon, search button, drawer close buttons, filter buttons, and sidebar items are now noticeably larger and easier to tap. The sidebar slides in as an overlay and closes automatically when you tap a link or anywhere outside it.
- Modals are easier to close: the **×** button is more prominent and properly sized, and clicking outside the modal closes it.

## How to test the changes

1. Open `index.html`. Click the search box in the top bar and type "go" — a small hint appears underneath showing matching domains and how many were found. Clear the box and the hint switches back to "Press Enter to search…".
2. With the search box empty, press Enter — instead of silently opening "example.com" you'll get a "Enter a search term to look up" toast and the hint changes to a warning colour.
3. In the left sidebar, click **HTTP requests**, then **Internet outages**, then **Bot traffic**. Each time, the address bar updates with a new section name (look at the URL after `#`). Refresh the page — you land back on the same section.
4. Look at the left sidebar — the currently-selected item has a coloured background and the coloured dot next to it is fully filled in. Other dots are slightly dimmed.
5. Click **Filters** in the top bar. The drawer opens and the rest of the screen dims. Click anywhere outside the drawer — the drawer closes by itself.
6. Tick a couple of filter checkboxes and click **Apply Filters** at the bottom of the drawer. The "Scope" line at the top of the page now reads "Worldwide, N filters applied". As you scroll the filter list, the **Apply** button stays pinned at the bottom of the drawer.
7. Scroll down to the **Protocol adoption** card and click any of the four cards (HTTP/3, TLS 1.3, QUIC, IPv6). The clicked one gets an orange outline and a "Selected" tag in the corner.
8. Click "View more" on any chart card to open a side drawer, then click anywhere outside it — the drawer closes by itself. Open a modal (for example **API docs** in the left sidebar) and click outside it — it also closes.
9. Shrink the browser to phone width. The menu icon at the top-left is bigger; tap it to open the sidebar as an overlay. Tap a link or anywhere outside the sidebar — it slides closed automatically. Drawer close (**×**) buttons are also bigger.
