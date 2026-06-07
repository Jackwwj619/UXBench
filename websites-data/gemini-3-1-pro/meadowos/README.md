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

- The top navigation now collapses into a hamburger menu on phones, so the chapter links don't simply disappear on narrow windows like they used to.
- The active chapter is now highlighted in the top nav as you scroll, with a wavy yellow underline that tracks where you are in the long read.
- The footer's "GitHub" and "Matrix room" links no longer pretend to be real — clicking either one shows a small "Coming soon" tooltip instead of silently jumping back to the top of the page.
- Every link and button now has a clear yellow keyboard focus ring, so you can tab through the page and always see where you are.
- Footer links and the hamburger button are now at least 44px tall, making them comfortable to tap on a phone.
- Animations and smooth scrolling now respect the operating-system "reduce motion" preference, so the page stays still for people who need it to.

## How to test the changes

1. Open `index.html` and shrink the browser to phone width — the top nav collapses behind a hamburger button. Tap it to slide the chapter links in and out, then click one to jump and watch the menu auto-close.
2. Scroll slowly from top to bottom on a wide window — each chapter link (Story, Garden, Docs, Reviews, Download) lights up with a yellow wavy underline as that section enters view.
3. Scroll to the footer and click "GitHub" or "Matrix room" — a small dark "Coming soon" tip appears for a moment instead of the page jumping.
4. Press Tab repeatedly from the top of the page — each link, button, and the download form fields show a clear focus outline.
5. Turn on "Reduce motion" in your OS accessibility settings and reload — smooth-scroll jumps to chapters happen instantly with no animation.
