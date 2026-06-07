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

- The links in the top navigation (Quickstart, Docs, Benchmarks, Pricing) now actually scroll smoothly down to the matching section of the page instead of doing nothing.
- The **Copy** button next to `pip install pelagic` now briefly changes its own label to "Copied!" and turns green for a couple of seconds, on top of the existing pop-up confirmation, so it's obvious the command was copied.
- A larger, easier-to-read confirmation message with a green tick now appears at the bottom of the screen when you copy.
- On phone-width screens, the top navigation collapses into a hamburger menu button that opens and closes the menu; tapping a link in the menu also closes it.
- The GitHub-stars pill in the top corner now opens the project's GitHub page in a new tab instead of being a dead link, and gives a subtle hover effect.
- Code-language tabs (Python / Node / Go / curl), buttons, and the install Copy button are all bigger and easier to tap on a phone, with clearer hover and pressed-down states.
- The active code-language tab now has a small underline stripe so it's easier to tell at a glance which language you're looking at.

## How to test the changes

1. Open `index.html` on a wide screen and click **Quickstart**, **Docs**, **Benchmarks**, and **Pricing** at the top — the page should glide down to each section.
2. In the hero, click the **Copy** button on the `pip install pelagic` line. The button text changes to "Copied!" and turns green for about two seconds, and a green-tick confirmation message appears at the bottom-right of the screen.
3. Click the language tabs (Python, Node, Go, curl) in the code panel — the active tab has a coloured underline, and switching is comfortable to tap.
4. Click the GitHub-stars pill in the top-right corner — it opens the Pelagic GitHub repo in a new tab.
5. Resize the browser to phone width. The nav links collapse behind a hamburger button on the right. Tap it to open the menu, tap any link — the page scrolls to that section and the menu automatically closes.
6. Still at phone width, copy the install line again — the confirmation message now spans the bottom edge so it's easy to see.
