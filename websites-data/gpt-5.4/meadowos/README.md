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

- The "Docs" link in the top nav now actually goes somewhere — a new Docs section with three cards covers the five-step install, minimum/recommended system requirements, and where the handbook lives.
- The Garden grid now has a clear heading above it ("Garden · the apps you can plant") so it's obvious what the row of plant cards is for.
- As you scroll, the top-nav link for the section you're currently reading is highlighted, and a small floating chapter pill ("Story" / "Garden" / "Docs" / "Download") shows which area you're in.
- The download dialog can now be closed with an Escape key press, a click on the dim background, or a new × button in the top-right corner — and clicking Close also returns the focus to the Download button you came from.
- The Close button inside the download dialog is now a clearly styled green primary button instead of a faint outlined one, and it's a comfortable tap size.
- After you close the download dialog, a green confirmation strip appears under the Download button saying the .iso is "saved" and the SHA256 is verified, and the main Download button changes to say "Download again", so it's clear the simulated download finished.
- The footer "GitHub" and "Matrix room" links are now visibly marked "soon" and no longer jump the page to the top when you click them, because they were never real links.
- Page anchors (Story / Garden / Docs / Download) now stop scrolling a bit lower so the sticky top bar doesn't cover the chapter heading, and the URL updates as you jump between sections.
- On phones, the top nav now wraps onto a second row and scrolls sideways so all four links are reachable, instead of disappearing entirely; nav links and footer links are also at least 44 pixels tall.
- Background scrolling is locked while the download dialog is open, so the page doesn't drift behind it.

## How to test the changes

1. Open `index.html`. Click **Docs** in the top nav — the page now jumps to a new Docs section with three cards (Install in five steps, System requirements, Where the docs live), instead of doing nothing.
2. Scroll slowly down the page. As you cross each section, the matching link in the top nav lights up (Story / Garden / Docs / Download) and a small floating "chapter" pill briefly shows the area's name.
3. Above the row of plant cards, you'll see a new italic heading "Garden · the apps you can plant".
4. Click **Download · meadowos-0.7.iso · 1.2 GB**. While the progress bar runs, press the Escape key — the dialog closes. Click the button again to reopen and try the new × in the corner and clicking outside the dialog.
5. Let the progress reach "Done. SHA256 matches." then click **Close**. A green confirmation strip appears under the Download button saying the file is saved, and the button label now reads "Download again · meadowos-0.7.iso · 1.2 GB".
6. Scroll to the footer. The "GitHub" and "Matrix room" links now have small "soon" pills next to them, and clicking them does nothing instead of jumping to the top of the page.
7. Shrink the browser to phone width. The top nav now wraps to its own row across the bottom of the header and can be scrolled left/right; each link is comfortably tappable. The floating chapter pill moves to the bottom of the screen.
