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

- The "GitHub" and "Matrix room" links in the footer now actually go to real-looking URLs instead of being dead "#" links.
- Top-nav links, the "Get the .iso" button, footer links, and the modal close button are taller and have more padding, so they're much easier to tap on a phone or tablet.
- On phone screens the top nav no longer disappears entirely. The chapter links now wrap onto a second row under the logo so you can still jump between chapters.
- The "12 min read" badge on the top bar is hidden on phone screens to keep the header tidy.
- The footer stacks neatly into a column on small screens instead of being squashed together.

## How to test the changes

1. Open `index.html` and scroll all the way to the bottom. The footer should show "GitHub" and "Matrix room" links — hover over them and they should point to real github.com / matrix.to URLs instead of "#".
2. Shrink the browser window to phone width (or open in mobile view). The top nav should still be visible — the chapter links should wrap onto a second row below the logo. The "12 min read" badge should disappear.
3. On the same narrow view, tap each of the chapter links and the "Get the .iso" button — every tap target should feel large and comfortable, not tiny.
4. Scroll to the download block, click "Download .iso", and then click the **Close** button on the modal — the button should be tall enough to tap easily.
5. Resize the browser back to desktop width — the nav and footer should return to a single horizontal row.
