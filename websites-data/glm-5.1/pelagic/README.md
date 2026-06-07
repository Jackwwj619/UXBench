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

- The top navigation links (Product, Docs, Pricing, Blog) and the footer links now actually jump to the matching sections on the page instead of going nowhere.
- The "View on GitHub" button in the hero and the Community footer links (GitHub, Discord, Forum, RFC tracker) now open the relevant real-looking destinations in a new tab.
- On phones, the top navigation now collapses behind a hamburger (☰) button that opens a drop-down menu, instead of hiding the links entirely. The hamburger animates into an X when open.
- After tapping the **Copy** button next to `pip install pelagic`, the button itself briefly changes to "Copied!" in green, so you get visual confirmation in addition to the toast.
- The toast message now reads "Copied: pip install pelagic" instead of "Copied pip install pelagic" — clearer punctuation.
- The Python / Node / Go / curl language tabs in the hero code panel are larger and easier to tap, and wrap onto a second line on narrow screens instead of overflowing.
- Footer link rows now collapse to two columns on phone-width screens instead of one cramped column, and each link is taller and easier to tap.
- Navigation links throughout have larger tap targets, with a hamburger menu icon that screen readers can identify.

## How to test the changes

1. Open `index.html` and click "Docs" or "Pricing" in the top right — the page should scroll to the product or benchmark section instead of staying put.
2. Scroll to the very bottom and click any link in the footer (e.g. "Quickstart", "Benchmarks") — they should jump you to the right section. Click "GitHub" or "Discord" — they should open in a new tab.
3. Click the **Copy** button next to `pip install pelagic`. The button should turn green and say "Copied!" for about two seconds, alongside the toast at the bottom.
4. Shrink the browser to phone width. The top nav links disappear and a hamburger (☰) button appears at the right. Click it — a drop-down menu should slide down with all the links. Click any link — the menu should close.
5. Click the hamburger again — the three bars should animate into an X. Click once more to close.
6. Still at phone width, scroll to the language tabs in the hero (Python / Node / Go / curl) — they should be comfortably large to tap and wrap to a second line if needed.
7. Scroll to the footer at phone width — the link columns should now show two-up instead of one-up, with bigger spacing between each link.
