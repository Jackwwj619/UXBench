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

- The top nav now opens a working mobile menu on phones — previously the small-screen nav links were cut off.
- Two big new sections have been added to the page: a Docs grid (Quickstart, Concepts, SDK reference, Migration guides) and a Pricing section with Self-hosted / Managed / Enterprise plans. The footer links now actually jump to these sections.
- The "View on GitHub" and "GitHub stars" buttons now open a real GitHub-style link in a new tab, instead of going nowhere.
- The benchmark line under the hero now changes the dataset name as well as the metric (for example "Running benchmark on SIFT-1B… p95 latency: 18ms"), so the two halves stay in sync.
- The code-example tabs (python / node / go / curl) can be navigated with the left/right arrow keys, and the active tab is clearly outlined.
- The changelog entries now show the release date next to each version, not just the version number.
- "Coming soon" links in the footer (Discord, Forum) are now marked as such and pop up a brief "Coming soon" toast when clicked, rather than silently going to a dead anchor.

## How to test the changes

1. Open `index.html`. Click the Copy button next to `pip install pelagic` to see the toast.
2. Click the language tabs in the hero (python / node / go / curl); now try the left/right arrow keys with one of them focused — the snippet swaps as you arrow through.
3. Watch the "Running benchmark on…" line under the hero for a few seconds; the dataset label and the metric should change together.
4. Scroll down to the new "Docs" and "Pricing" sections. Click any pricing CTA or the "View on GitHub" button — they should open in a new browser tab.
5. Click "Discord" or "Forum" in the footer Community column to see the "Coming soon" toast.
6. Resize the window to phone width (or use a phone). The top-right hamburger button should open a slide-in menu with the same nav links; tap any link or the dim background to close.
