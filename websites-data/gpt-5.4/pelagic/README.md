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

- The "View on GitHub" button in the hero is now clearly marked as unavailable, with a small "soon" tag next to it, so it no longer looks like a dead link.
- The GitHub-stars counter in the top navigation is no longer a clickable link — it's now plainly a stat pill labelled "GitHub stars (demo)" rather than something that looked like it should open a page.
- The community links in the footer (GitHub, Discord, Forum, RFC tracker) and the "Migration guides" link now show a "soon" tag and are visibly inactive, instead of all pointing to nothing. The other footer links now jump to the matching sections on the page (Docs, Quickstart, Benchmarks, Pricing).
- Clicking the Pelagic logo in the top nav now smoothly scrolls you back to the top of the page with a "Top of page" confirmation.
- The **Copy** button on the install command now turns green and shows a "✓ Copied" label for a couple of seconds after you click it, in addition to the toast.
- A new **Pricing** section has been added between the customer quote and the blog feed, with three tiers (Self-hosted, Managed, Enterprise) and a short note that full plans are coming soon.
- A short summary sentence has been added above the "How it fits" steps and above the architecture diagram, so the diagram is explained in words for anyone who can't easily read the picture.
- The architecture diagram now sits in a bordered, horizontally-scrollable panel, so on narrow screens it no longer gets squashed and unreadable.
- The benchmark numbers in the hero now wait until you're actually looking at the hero before they start rotating, and rotate more slowly (every 5 seconds rather than every 2.5), so they're easier to read.
- The page now respects the system "reduced motion" setting — animations like the stars counter, benchmark rotation, and smooth scrolling are turned off for users who prefer it.
- Buttons, nav links, the stars pill, the language tabs, and the footer links are now bigger and easier to tap on phones.

## How to test the changes

1. Open `index.html`. In the hero, the secondary button now reads **View on GitHub soon** in a greyed-out style — hovering shows it's not available yet.
2. Look at the **★ 18.2k** pill in the top navigation — it's no longer underlined or pointing at a link; it just shows the count.
3. Scroll to the footer. The "Community" column shows GitHub, Discord, Forum, and RFC tracker with small "soon" tags. The other footer links (Docs, Quickstart, Benchmarks, Pricing) now smoothly scroll you to those sections of the page.
4. Click the Pelagic logo in the top nav — the page smoothly scrolls back to the top with a "Top of page" toast.
5. In the hero, click **Copy** next to `pip install pelagic` — the button turns teal/green, shows "✓ Copied" for about 2 seconds, and a toast confirms it.
6. Scroll down past the customer quote — a new **Pricing** section appears with three tiers (Self-hosted, Managed, Enterprise) and a "full plan details are coming soon" note.
7. Above the **How it fits** steps and above the **Architecture** diagram, you'll find a sentence summarising the picture in plain text.
8. On the Architecture diagram, shrink the window narrow — the diagram now stays inside a scroll panel rather than getting squashed.
9. Watch the green-dot benchmark line in the hero. It now waits a few seconds before starting to rotate, and only rotates once you've stayed on the hero long enough to see it.
10. Turn on your operating system's "Reduce motion" accessibility setting, then reload — the stars counter jumps to its final value, the benchmark line stops rotating, and scrolling stops being smoothed.
11. Shrink the browser to phone width — header buttons, the stars pill, the language tabs, and footer links are all bigger and easier to tap.
