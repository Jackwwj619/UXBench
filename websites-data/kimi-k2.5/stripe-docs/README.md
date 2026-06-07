# Stripe Docs Clone

A practice clone of Stripe's Hosted Checkout Quickstart docs — the tutorial area developers walk through to set up payments. It mirrors Stripe's standard three-column docs layout (left nav, center tutorial, right on-this-page outline) and includes the embedded and customization variants.

> Front-end demo only — code samples are illustrative; nothing connects to Stripe.

## What you can do

- **Walk through the quickstart.** The Quickstart page has step-by-step instructions, each with an explanation, a multi-language code block (you can switch between languages on any block — they all stay in sync), a copy button, and Test / Live markers.
- **Read the embedded variant.** A separate page covers the iframe / element integration steps for embedding checkout into your own site.
- **Customize it.** A branding and customization page covers colors, logo, domain, and email settings.
- **Find your place on the page.** The right column shows an on-this-page outline that scroll-spies as you read.
- **Navigate the docs tree.** The left column is the product / section navigation tree, with a Stripe docs nav at the top (Docs / API reference / Search / environment switch).

## How to use it

Open `index.html` in any modern browser. Click any language tab on a code block to switch every block on the page at once. Use the right outline to jump between steps; the copy button on any block flashes "Copied" when used.

## What was changed in this version

- On phones and small tablets, the top bar no longer overlaps the logo and the menu — the spacing has been tightened so everything fits neatly, and the hamburger menu button is now big enough to tap easily.
- Navigation links, footer links, and the feedback buttons at the bottom of each page are now taller and easier to tap on touch screens.
- Wide tables (such as the test cards table) now scroll sideways on small screens instead of pushing the layout off the side of the page.
- Code blocks shrink to a comfortable size on phones, with smaller text and tighter padding so you can still read them without horizontal scrolling.
- The page no longer scrolls sideways when content is wider than the screen — the whole site is now contained within the visible area.

## How to test the changes

1. Open `index.html` in a desktop browser. Everything should look the same as before.
2. Shrink the browser window to phone width (around 375px). The top nav should still fit on one row, with a hamburger menu button on the right that's large enough to tap with a thumb.
3. Open `customization.html` (or any page with a test cards table) at phone width — the table should scroll sideways within its own area rather than making the whole page scroll sideways.
4. Tap the "Yes" / "No" feedback buttons at the bottom of a page on a phone-width screen — they should be tall enough to tap comfortably.
5. Try dragging the page sideways — the page should not scroll horizontally at all.
