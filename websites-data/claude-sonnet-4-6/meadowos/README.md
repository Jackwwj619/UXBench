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

- Added a working **hamburger menu** button so the top nav and "Get the .iso" link are usable on phones and narrow windows.
- The hero now has a big **"Download .iso · 1.2 GB"** button right at the top, so you don't have to scroll all the way down to start a download.
- The fake download pop-up has a proper progress bar that you can dismiss with the **Esc** key, or by clicking outside it, and keyboard focus stays trapped inside while it's open.
- After the download finishes, the section at the bottom now shows a green "Downloaded." confirmation with the SHA256 hash and a hint to write the file to a USB stick — so it's clear the action succeeded.
- Clicking nav links like "Story", "Garden", "Docs", or "Get the .iso" now smoothly scrolls to the right section (and closes the mobile menu automatically).
- The download button changes to "Downloaded · meadowos-0.7.iso" once finished, so you can see the state has changed without re-clicking.

## How to test the changes

1. Open `index.html`. At the top of the hero, click the **Download .iso · 1.2 GB** button — a centered pop-up appears with a moving progress bar. Press **Esc** to close it once it reaches 100%.
2. Scroll to the bottom **Download** section — you should now see a green "Downloaded." confirmation with the SHA256 hash and instructions to write the file to USB.
3. Shrink the window narrow (or open on a phone). A three-line menu button appears top-right; tap it to open the nav, tap a link, and it should scroll and auto-close.
4. Click the "Story" / "Garden" / "Get the .iso" nav links — the page should scroll smoothly to each section.
5. While the download pop-up is open, press **Tab** repeatedly — focus stays inside the pop-up and doesn't wander to the page behind it.
