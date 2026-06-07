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

- The top-nav and footer links no longer dead-end at `#`. They now point at real section anchors on the page (Product / How it fits / Architecture / Blog) or out to the project's GitHub repo, discussions, and issues pages so each link actually goes somewhere.
- The "Docs" and "Pricing" nav links — which had no targets — have been replaced with the more accurate "How it fits", which scrolls to the matching section.
- The "Quickstart" button in the hero now jumps to the code-tabs panel on the right (anchored on `#quickstart`), so clicking it lands you on the SDK examples instead of doing nothing visible.
- The wide architecture SVG no longer overflows the page on phones — it now sits inside a horizontally scrollable container with a small "↔ Scroll horizontally to view full diagram" hint and a clear focus outline when reached by keyboard.
- The hero's language tabs (Python / Node / Go / curl) and the install-strip Copy button now have 44px tap targets on phones, so they're comfortable to use on touch.
- The GitHub stars pill and the footer links also get bigger tap areas on phones, and external links open in a new tab with `rel="noopener"`.

## How to test the changes

1. Open `index.html` and click "Product" in the top nav — the page scrolls to the feature cards. Click "How it fits" — it scrolls to the three-step diagram. Click "Blog" — it scrolls to the blog/changelog feed.
2. Click the "Quickstart" button in the hero — the page scrolls right to the language-tabs code panel.
3. Click "View on GitHub" in the hero or any of the footer's Community links — they open the (fictional) `github.com/pelagic-db/pelagic` repo in a new tab.
4. Shrink the browser to phone width and scroll to the Architecture section — the diagram is contained in a horizontally scrollable box with a "↔ Scroll horizontally" hint below it.
5. Tab to the architecture diagram on the keyboard — a blue focus outline surrounds the scroll box.
6. On phone width, tap the code-tab buttons (python / node / go / curl) and the green Copy button — each has a comfortable touch area and works without precision tapping.
