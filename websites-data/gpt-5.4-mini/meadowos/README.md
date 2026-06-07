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

- The top nav now has a real "Docs" target — clicking it jumps to a new "Docs & Download" heading right above the terminal block, instead of going nowhere.
- The download button now has a short helper line underneath ("Starts download & SHA256 verification in a dialog.") so it's clear what clicking it does.
- The fake download dialog is much friendlier — there's a green spinning circle while it's running, the progress bar is taller and gradient-filled, and when it finishes the spinner becomes a green checkmark, the heading changes to "Download complete," and the button changes from "Cancel" to "Done."
- You can now close the download dialog by pressing the Escape key, and keyboard focus is sent back to the download button after closing.
- The "GitHub" and "Matrix room" links in the footer are now styled as proper outlined buttons with a small "demo" badge, and clicking either shows a friendly toast explaining they aren't wired up in this prototype, instead of silently doing nothing.
- The footer stacks neatly on phones, with the demo links arranged in a single full-width column.
- On phones, the top nav no longer disappears — it wraps to a second row of evenly sized tap targets so all chapter links remain reachable.
- Top-nav links and the download button have larger tap areas, clearer hover states, and a yellow keyboard-focus outline.

## How to test the changes

1. Open `index.html` and click **Docs** in the top nav — the page should smoothly scroll to a new "Docs & Download" heading just above the terminal panel.
2. Click the green **Download · meadowos-0.7.iso · 1.2 GB** button. A dialog should open with a green spinning circle, a thicker gradient progress bar, and the button labelled "Cancel." Watch it run to 100% — the spinner should turn into a green checkmark, the heading changes to "Download complete," and the button reads "Done."
3. With the dialog open, press the Escape key — it should close and focus should return to the download button.
4. Scroll to the dark footer and click **GitHub** or **Matrix room** — instead of nothing happening, a small dark toast should appear at the bottom of the screen explaining the link is not wired up.
5. Shrink the browser window to phone width — the top nav links should wrap into a tidy row of evenly sized buttons rather than disappearing, and the footer's GitHub/Matrix buttons should stack into a single column.
6. Use the Tab key to step through the top nav and the download button — each should show a visible yellow or green focus outline.
