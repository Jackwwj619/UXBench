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

- The top nav links (Story / Garden / Docs / Download) now scroll smoothly to the right chapter and gently flash that section in yellow when it arrives, so you can see where you landed. The URL also updates with the chapter name.
- The fake download pop-up is now much easier to dismiss — there's a clear "×" button in the top-right corner, the main **Close** button is a large, easy-to-read green button at the bottom, pressing Escape closes it, and clicking outside the pop-up closes it too.
- When the download pop-up is open, the page behind it no longer scrolls, and once you close it the focus returns to wherever you were so keyboard users don't lose their place.
- Reopening the download pop-up no longer leaves a half-finished progress bar — it always restarts cleanly at 0%.
- The top nav links, footer links, and the **Get the .iso** call-to-action have larger, easier-to-tap areas with a visible outline when focused with the keyboard.
- On phone-sized screens the top nav now wraps neatly under the logo instead of disappearing, and the **Close** button on the download pop-up is bigger and easier to tap.

## How to test the changes

1. Open `index.html`. Click the **Story**, **Garden**, **Docs**, and **Download** links in the top nav — the page smoothly scrolls to each section, the destination briefly flashes yellow, and the address bar updates with the section name (e.g. `#docs`).
2. Scroll to the bottom and click **Download .iso**. The pop-up appears and the progress bar fills to 100%. Press Escape — the pop-up closes and the page behind it can scroll again.
3. Reopen the pop-up and click outside the white card — it closes the same way.
4. Reopen it once more and click the large green **Close** button at the bottom of the pop-up. Then click **Download .iso** again — the progress starts cleanly from 0%, not from where it left off.
5. Resize the window to a phone width. The top nav now wraps to a second row under the logo instead of vanishing, and the buttons are all noticeably bigger and easier to tap.
