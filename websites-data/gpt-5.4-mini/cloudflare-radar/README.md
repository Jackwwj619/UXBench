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

- The four "Reports" tiles near the bottom ("Internet trends for the current quarter", "AI bot traffic and crawler behavior", "Global outages and network resilience", "Year in Review") are now actual buttons that open a side drawer with that report's title — they used to be dead links.
- When you jump to a section from the left sidebar, the target section briefly glows with an orange ring so you can see where you landed.
- The Radar API popup is much more useful: clicking one of the three example endpoints now highlights it as "Selected" and shows a preview of that endpoint's example response in a panel below the list.
- The Radar API popup now has a clear "Close" button at the bottom in addition to the X in the corner.
- On a phone, when you open the left sidebar with the hamburger button, the rest of the page dims behind it. Tapping the dimmed area, picking a sidebar link, or pressing Escape now closes the sidebar — before, it just stayed open.
- The close button on the API popup is now a proper square button with a border (44 × 44px) instead of a tiny X, easier to find and tap.
- Buttons in the top bar (the menu, search, theme, language buttons), the sidebar links, and the search-modal buttons are all bigger and more comfortable to tap on phones.
- On phones, the popup itself is scrollable when its content is taller than the screen, instead of being cut off.

## How to test the changes

1. Open `index.html`. Scroll down to the four reports tiles ("Internet trends…", "AI bot traffic…", "Global outages…", "Year in Review") and click one — a side drawer should slide in with the report's title.
2. In the left sidebar, click any of the section links (for example "Security & attacks" or "Domains") — the page should scroll to that card and the card should briefly pulse with an orange ring so you can see it.
3. Open the Radar API popup (click any developer/API entry that opens it). Click each of the three `GET …` endpoint rows in turn — the chosen row should highlight in orange with a "Selected" pill on the right, and the preview panel below should update to show that endpoint's example response.
4. With the Radar API popup open, click the new "Close" button at the bottom or the bigger X at the top-right — either should close it. Press Escape — it should also close.
5. Shrink the browser to phone width (or open on a phone). Tap the hamburger menu in the top-left — the sidebar should slide in and the page should dim behind it. Tap the dimmed area, or tap any sidebar link — the sidebar should close. Open it again and press Escape — same result.
6. Still at phone width, open the Radar API popup — if it's taller than the screen you should be able to scroll inside it without losing the top or bottom.
