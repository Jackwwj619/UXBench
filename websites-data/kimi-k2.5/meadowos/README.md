# MeadowOS

MeadowOS is a demo marketing site for a fictional self-hosted home operating system — the kind of "small, calm, owns-your-own-stuff" software that sits on a NAS or a small home server. It's a long-scroll, magazine-style read with chapters, illustrations, and a (fake) download at the bottom.

> Fictional product — the .iso download triggers a fake progress animation; nothing actually downloads.

## What you can do

- **Read the story behind it.** Five numbered chapters (Roman numerals I–V) of magazine-style prose, each with pull quotes and an illustration, lay out what MeadowOS is and why it exists.
- **See what's in "the Garden."** Six small first-party apps — Nextfile, Bramble, Cottage, Smithy, Hearth, and Postcard — are described with a card and a short summary.
- **Read what reviewers say.** A row of pull-quoted reviewer cards.
- **"Download" it.** A terminal-style download block lets you pick a platform; clicking download pops up a fake progress bar that fills to 100% and then verifies the SHA256.
- **Skim the manifesto.** Six numbered principles at the bottom describe how the project is run.

## How to use it

Open `index.html` in any modern browser. Scroll from top to bottom — the progress bar across the top tracks how far through the long read you are, and the top nav's anchor links jump between chapters.

## What was changed in this version

- The big "Get the .iso" link in the hero now does two things in one click: it smoothly scrolls down to the download section and then kicks off the fake download progress, instead of just jumping to the section and stopping.
- The "GitHub" and "Matrix room" links in the footer now open the real project pages in a new tab, and they sit in bigger, easier-to-tap pill-shaped areas, instead of being dead links.
- On phones and small screens, the top navigation no longer disappears entirely — the "Get the .iso" call-to-action stays visible, and the layout adjusts so the hero title, download block, and footer line up cleanly in one column.

## How to test the changes

1. Open `index.html`. Scroll back to the top, then click "Get the .iso" in the hero — the page smoothly slides down to the download block and the fake progress bar immediately starts filling.
2. Scroll to the very bottom of the page. Click "GitHub" or "Matrix room" — each opens in a new tab.
3. Resize the browser narrow (phone width). The "Get the .iso" link in the top bar should still be visible, the hero title and download block should fit without sideways scrolling, and the footer items should stack neatly under each other.
