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

- The "Run query" tool further down the page now actually shows results. After you pick a dataset, dimension, and format and click **Run query**, a small loading spinner appears on the button, then a results panel appears underneath with a table, CSV, API URL, or a sample chart depending on which format you picked.
- A small "Current query" summary bar now sits next to the **Run query** button, showing what dataset, dimension, and format are selected and whether the query is still a draft, currently running, or already submitted.
- The summary status flips back to "Draft" the moment you change one of the dropdowns, so it's clear that the results panel underneath is showing an older query.
- The search overlay (opened from the top bar) now closes when you click outside the panel or press Escape, and the close button is large enough to tap easily.
- After you close the search overlay, focus returns to wherever you were before you opened it, which is helpful for keyboard users.

## How to test the changes

1. Open `index.html` and scroll down to the section with the dataset, dimension, and format dropdowns and the **Run query** button. Underneath the button you should see a "Current query" summary that reflects the dropdowns and says "Draft".
2. Click **Run query**. The button briefly shows a spinner and is greyed out, a short message appears at the bottom of the screen, then a results panel appears underneath with a sample chart. The status pill in the summary changes to "Submitted".
3. Change the **Format** dropdown to **Table** and click **Run query** again — the results panel now shows a small table of times and values. Try **CSV** and **API URL** as well — you'll see comma-separated text and an API URL preview respectively.
4. After submitting, change the **Dataset** dropdown — notice the status pill immediately flips back to "Draft" while the older results panel stays visible below until you re-run.
5. Click the magnifying-glass search icon in the top nav. Press Escape — the overlay closes. Open it again and click the dimmed area outside the search panel — it also closes. The page focus returns to the search icon you originally clicked.
