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

- The top-nav links (Product / Docs / Pricing / Blog) and the **Quickstart** button now actually jump down to matching sections on the page instead of just sitting there. Scrolling between sections also animates smoothly.
- The Pelagic logo in the top-left now jumps you back to the top of the page.
- The **GitHub stars** pill and the **View on GitHub** button now open the real Pelagic GitHub URL in a new tab, instead of doing nothing.
- The five blog post cards in the lower feed are now clickable — hovering one highlights the row, and clicking it acts like a link (good for keyboard tabbing too).
- Links in the footer (Product, Resources, Community columns) now point somewhere — internal sections for product info or external URLs for GitHub, Discord, and the forum (with "↗" markers to show they open in a new tab).
- Buttons, links, and tab targets are now sized to be easier to tap on a phone (at least 44 pixels tall), with clear hover states and a visible focus outline when navigating by keyboard.

## How to test the changes

1. Open `index.html`. Click **Docs** in the top nav — the page should smoothly scroll down to the "Ingest → Index → Query" flow section. Click **Pricing** to land on the benchmarks band, and **Blog** to land on the recent posts feed.
2. Click the small Pelagic logo at the top-left — you should glide back up to the top.
3. Click the **GitHub stars** pill in the top-right, or the **View on GitHub** secondary button in the hero. Each should open the Pelagic GitHub page in a new tab.
4. Scroll down to the "Recent posts" column on the lower feed and hover over a post — the row should change background. Click one to act like a link.
5. Tab through the page with the keyboard — every link and button should show a clear blue outline when focused.
6. Open the page in a narrow window — nav and footer links should still be tall enough to tap with a finger.
