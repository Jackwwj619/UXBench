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

- **Easier to dismiss the slide-in panels.** When the detail drawer or the filters drawer opens, the rest of the page now dims with a soft overlay. Click anywhere on the dimmed area to close the panel — no more hunting for the small × in the corner.
- **The close button is much bigger and clearer.** The × in the corner of both the detail drawer and the filters drawer is now a proper 44×44 button with a visible border, and a tooltip reminding you that Esc also closes it.
- **Only one panel open at a time.** Opening the filters drawer now properly closes any open detail drawer, and vice versa, so you never get stacked panels you have to close one by one.
- **Clearer "Archive" link in reports.** The "Archive" link in the reports section is now labelled "View all reports", and announces itself the same way to screen readers.
- **Things that act like buttons now look like buttons.** Protocol cards, outage rows, endpoint rows, report cards, legend entries, and the rows of top domains visibly respond to hover — their border brightens and the background shifts — and the cursor turns into a pointer so it's obvious you can click them. Protocol cards also gently lift on hover.
- **Bigger, finger-friendly controls everywhere.** The top-bar filter pills, the search box, the round icon buttons, the mobile menu button, the in-card tabs, and the hero action buttons are all taller and easier to tap, especially on phones.

## How to test the changes

1. Open `index.html` and click any card with a "View more" link (for example, top browsers). The detail drawer slides in from the right and the rest of the page now dims. Click on the dim area outside the drawer — it should close. Open it again and press Esc — it should also close.
2. Click the filter / "Add filter" button in the top bar to open the filters drawer. While it's open, click on any card — the filters drawer should close before the detail drawer opens, so only one panel is showing at a time.
3. Look at the × close button in either drawer — it's now a clearly outlined square button. Hover over it for the "Close (Esc)" tooltip.
4. Scroll to the protocol-distribution card and hover over the protocol tiles — they should gently lift and their border should change colour. Hover over a row in Top domains or Outage Center — the cursor should turn into a pointer and the row should highlight.
5. Scroll to the reports section near the bottom — the old "Archive" button should now read "View all reports".
6. Shrink the browser to phone width and try tapping the hamburger menu, a top-bar filter pill, and the Export button — they should all be comfortably large to tap.
