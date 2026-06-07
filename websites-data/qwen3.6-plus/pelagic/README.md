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

- **Navigation and footer links actually go somewhere.** Clicking links like "Docs", "Quickstart", "Benchmarks", or any of the four footer columns now smoothly scrolls you to the matching section of the page instead of jumping to the top. External links (GitHub, Discord, Forum, RFC tracker, View on GitHub, the stars pill) now open in a new tab.
- **Smooth scroll on in-page links.** Jumping between sections via the nav glides instead of snapping, and the page stops just below the sticky header so the destination heading isn't hidden behind it.
- **The benchmark strip is calmer.** Instead of saying "Running benchmark on YFCC-100M…" (which suggested live activity), it now reads "Latest benchmark · YFCC-100M", and hovering over it shows a tooltip explaining the numbers are illustrative.
- **Bigger, easier-to-click controls.** The Get started, View on GitHub, Copy (on the install strip), and the four language tabs (Python / Node / Go / curl) are all noticeably larger, with comfortable padding so they're easier to hit on phones and trackpads.
- **Language tabs feel like tabs.** The active tab now has bold text and a coloured underline, and hovering an inactive tab brightens its label, so it's clearer which language is selected.
- **Tidier "Pricing" handling.** The standalone Pricing link in the top nav was removed (the page has no pricing section), so the nav no longer leads you to nothing.
- **Footer links are easier to tap.** The four footer columns now use taller, more spaced rows so each link has a comfortable touch area.

## How to test the changes

1. Open `index.html`. Click "Docs" in the top nav — the page should smoothly scroll down to the architecture/Pricing area, stopping just below the sticky header rather than tucked underneath it.
2. In the footer, click "Quickstart" — the page should smoothly scroll up to the install / code section. Then click "GitHub" or "Discord" — they should open in a new browser tab.
3. Look at the benchmark numbers in the hero — the label above them should read "Latest benchmark · YFCC-100M". Hover over it and a tooltip explaining the data is illustrative should appear.
4. Click between the Python, Node, Go, and curl tabs above the hero code sample — the selected tab should be bold with a coloured underline, and the other tabs should brighten when you hover over them.
5. Try clicking **Copy** on the `pip install pelagic` strip — the button should be noticeably larger and easier to hit, and the copy-toast still appears.
6. Shrink the browser to phone width and try tapping the Get started and View on GitHub buttons — they should still be comfortably sized to tap.
