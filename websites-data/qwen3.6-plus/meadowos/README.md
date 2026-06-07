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

- **The download button is honest about being a demo.** The big call-to-action now reads "Preview the install · meadowos-0.7.iso · 1.2 GB" and a short note underneath explains this is a fictional product, so no real .iso ships. The pop-up that follows also gets a small "Demo preview · no file is being transferred" tag.
- **The download pop-up behaves like a proper dialog.** Screen readers now announce it as a dialog with a title, so people using assistive tech know what's happening.
- **Garden app cards give a friendlier hover.** Hovering one of the six app cards now tints the border green and highlights the "replaces" line, making it easier to spot what each app stands in for.
- **The top navigation works on phones.** Instead of disappearing entirely on small screens, the top nav links now wrap onto a second row with comfortable spacing so you can still jump between chapters.
- **Top nav, footer links, and modal buttons are easier to tap.** Anchor links, the "Get involved" CTA, footer links, and the "Close" button on the download pop-up all have a larger tap area, so the page is usable on a phone.
- **Clearer keyboard focus throughout.** Tabbing through the page now shows a visible green or yellow outline on the focused nav link, footer link, or button, so keyboard users can see where they are.

## How to test the changes

1. Open `index.html` and scroll to the bottom. The big download button should read "Preview the install · meadowos-0.7.iso · 1.2 GB" and the small line under it should explain that this is a fictional product.
2. Click that button — the pop-up should show a small "Demo preview · no file is being transferred" tag above the heading, and the progress animation should still run as before.
3. Hover one of the six Garden cards (Nextfile, Bramble, etc.) — its border should turn green and the small "replaces" line should change colour.
4. Shrink the browser to phone width. The top navigation should still be visible (wrapping onto multiple lines if needed) instead of disappearing.
5. Press Tab from the top of the page — the focused nav link, then the "Get involved" pill, then footer links should each show a clear outline.
