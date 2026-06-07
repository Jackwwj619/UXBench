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

- The four "Reports" cards at the bottom of the page (Internet trends, AI bot traffic, Global outages, Year in Review) now actually open a side drawer with a short summary and key stats, instead of being dead links.
- Pop-up windows like "Run query", "Citation", and the report drawers now have a clear **Close** button at the bottom, alongside their main action — so it's obvious how to dismiss them. The close button is now larger and easier to hit.
- The drawer header sticks to the top while you scroll a long drawer, so the title and close button stay visible.
- If you've typed a domain into the lookup box at the top, the small confirmation message that appears when you change the time-range filter now mentions that domain — making it clearer which set of data refreshed.
- The confirmation message itself now reads "Filter applied" instead of "Date range set", so it covers region changes too.

## How to test the changes

1. Open `index.html` and scroll to the bottom of the page to the "Reports" row. Click any of the four cards (e.g. "AI bot traffic and crawler behavior") — a side drawer should slide in with a description and a few key stats.
2. While the drawer is open, scroll its content — the title and the ✕ close button should stay pinned at the top.
3. At the top of the page, type a domain (e.g. `example.com`) into the lookup box, then click any of the time-range filters (24h, 7d, 30d). The small toast at the bottom should mention both the time range and the domain.
4. Click any other card's "View more" link to open a modal. You should now see a **Close** button alongside the main action (Run query / Copy citation / etc.).
5. Click the **Close** button on any modal or drawer — it should dismiss cleanly.
