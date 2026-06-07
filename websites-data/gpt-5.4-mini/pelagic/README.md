# Pelagic

Pelagic is a demo marketing landing page for a fictional open-source vector database. It's a single-page pitch: what the project is, what code to write against it, and where to find docs, customers, and changelog.

> Fictional product — the GitHub stars counter, benchmarks, and customer logos are all illustrative.

## What you can do

- **Read the elevator pitch.** The hero has the title, dual CTAs, a copy-able `pip install pelagic` line, and benchmark numbers that rotate every few seconds.
- **See what calling it looks like.** A code panel on the right of the hero swaps between Python, Node, Go, and curl examples for the same operation.
- **Skim the core features.** Three feature cards summarize what makes Pelagic different.
- **Understand the flow.** An **Ingest → Index → Query** three-step diagram explains how data moves through it, with an architecture SVG underneath.
- **Read what customers say.** Quote cards from (fictional) users.
- **Catch up.** A dual feed at the bottom: five recent blog posts on the left, five changelog entries on the right.
- **Watch the star counter.** The GitHub-stars pill in the top nav animates in on load.

## How to use it

Open `index.html` in any modern browser. Click the language tabs in the hero to see different SDKs, hit the **Copy** button on `pip install pelagic` to confirm the toast, and scroll through the page from top to bottom.

## What was changed in this version

- The GitHub-stars pill in the top nav and the "View on GitHub" button in the hero now actually go to a GitHub URL, opening in a new tab, instead of staying on the same page.
- The "Discord", "Forum", "RFC tracker", and other community links in the footer now open external pages in a new tab instead of doing nothing.
- The other footer links ("Overview", "Hybrid search", "Quickstart", "Benchmarks", etc.) now jump to the right section of the page (the quickstart code panel, the benchmark numbers strip, the product section) instead of going nowhere.
- The "Quickstart" button in the hero now actually scrolls down to the code panel.
- The Copy button on the `pip install pelagic` strip is much more visible — it has a teal background and is a proper sized button rather than a thin outline.
- The benchmark banner is no longer dressed up as a fake "running benchmark" — it's labelled clearly as "Live benchmark · YFCC-100M" with the numbers in a neat boxed panel.
- Buttons, the stars pill, the language tabs, and the footer links are all bigger and easier to tap.
- On a phone or narrow window, the two hero buttons stack into full-width buttons, the install strip stays on one row but lets you scroll the code horizontally, the code tabs wrap nicely, and the footer columns drop to a two-column grid.

## How to test the changes

1. Open `index.html`. Click the star pill in the top nav (the "★ 0…" badge) — it should open the project's GitHub page in a new tab. Same for the "View on GitHub" button in the hero.
2. In the hero, click "Quickstart" — the page should scroll down so the code panel on the right comes into view.
3. Click the Copy button on the `pip install pelagic` strip — it should be much more prominent (teal background) than before and show a confirmation when clicked.
4. Scroll to the footer. Click "Discord", "Forum", "RFC tracker", and "GitHub" — each should open an external page in a new tab. Click "Quickstart", "Benchmarks", or "Overview" — they should scroll back up to the relevant part of the page.
5. Look at the green "Live benchmark · YFCC-100M" line under the install strip — it should now sit inside a clean white panel rather than reading like a fake "Running benchmark…" status.
6. Shrink the browser to phone width: the two big hero buttons should stack and stretch to full width, the language tabs above the code should wrap to a second row if needed, and the footer should drop to two columns with bigger tap targets.
