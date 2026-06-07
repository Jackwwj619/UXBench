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

- The "Bot traffic", "AI crawlers", and "Email security" links in the left sidebar now scroll directly to the specific row inside the relevant card, instead of just landing at the top of the section.
- The four "Latest reports" cards near the bottom (Internet trends, AI bot traffic, Global outages, Year in Review) now open a side drawer with a real summary and stats, instead of being dead links.
- The sidebar search box now shows a helpful "No results found for '…' — try a domain, ASN, dataset, or report name" message when nothing matches, instead of silently showing an empty list.
- The drawer that opens when you click "Learn more" or a report card now scrolls inside itself when there's a lot of content, so the close/action buttons at the bottom stay visible.
- The filter drawer's checkboxes are larger and the rows around them are taller, so they're easier to tap accurately.
- Top-bar icon buttons (search, theme, language, menu) and sidebar links are larger on phones to make them easier to tap.
- Form fields, dropdowns, and the lookup box in the top bar are taller on phones so they're easier to read and tap.
- The "Latest reports" cards are now real buttons that screen readers and keyboard users can activate, and they highlight properly on hover.

## How to test the changes

1. Open `index.html`. In the left sidebar, click "AI crawlers" (under Traffic) — the page should scroll to the AI crawlers row inside the Traffic-type card, not just to the top of the card.
2. Click "Email security" in the sidebar (under Security) — the page should land exactly on the Email security row inside the Security card.
3. Scroll down to the "Latest reports" section near the bottom and click any of the four report cards (e.g. "Internet trends for the current quarter"). A drawer should slide out with a description and stats, instead of doing nothing.
4. Type a nonsense word like "zzz" into the sidebar search box. A grey dashed box should appear saying "No results found for 'zzz' — try a domain, ASN, dataset, or report name." Clear the box and the message should disappear.
5. Open any "Learn more" or report drawer that has a lot of content — the body should scroll inside the drawer while the action button at the bottom stays pinned in place.
6. Open the filter drawer (top-bar filter button), and try tapping the checkboxes — the rows and boxes should feel comfortably large.
7. Shrink to phone width — icon buttons in the top bar, the sidebar links, and the search/filter inputs should all be noticeably taller and easier to tap.
