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

- The lookup box now suggests matches as you type (try `google`, `AS133`, or `1.1`) and you can click a suggestion to open its detail drawer.
- The four "Report" cards at the bottom now open a detail drawer when clicked instead of going nowhere.
- The search box (open it from the magnifier in the top bar) shows a friendly "No results" message when nothing matches, and you can close it with the Esc key.
- Picking a different dataset in the export panel now updates the available dimensions and briefly flashes the API URL preview so you can see it changed.
- The sidebar link that used to be labelled "Outages" was a duplicate and has been removed; the "1.1.1.1 resolver" link now routes correctly.
- On phones, the side menu has a dimmed backdrop behind it and tapping outside (or the menu button again) closes it.
- The address bar URL now updates as you navigate between sections, so you can copy a link to a specific view and the browser back button works.

## How to test the changes

1. Open `index.html`. Click the lookup field in the header and type `goog` — pick a suggestion and confirm the right-side drawer opens.
2. Scroll down to the "Reports" section and click any of the four cards; a drawer with details should slide in.
3. Click the magnifier in the top bar to open search, type something nonsensical like `zzzz`, and confirm the "No results" message appears. Press Esc to close.
4. In the API/export card, change the dataset dropdown and watch the dimensions list and the highlighted URL preview update.
5. Shrink the window to phone width, open the side menu, then tap the dimmed area outside it to close.
