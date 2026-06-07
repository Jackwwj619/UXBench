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

- Switching the language on a code block (e.g. from Node to Python) now shows a quick "Showing Python examples." confirmation at the bottom of the screen, so it's obvious every block has changed.
- Switching the preview theme on the customization page now confirms the change with a "[Theme name] preset applied to the preview." message at the bottom.
- Clicking any external link (one that opens in a new tab) now briefly highlights the link and shows a "Opening … in a new tab" notice, so you don't think nothing happened when the new tab opens behind the current one.
- The mobile menu button now changes from "Menu" to "Close" when the side navigation is open, and gets a filled purple background, so its state is unmistakable.
- The copy buttons, language tabs, theme tabs, and feedback buttons are now bigger and easier to tap, and gently shrink for a moment when pressed, giving clear "I was clicked" feedback.
- On a phone or narrow window, the top search box, sidebar links, on-this-page outline links, breadcrumbs, and footer links all get larger tap targets so they're easier to hit with a finger.

## How to test the changes

1. Open `index.html`. On any code block, click between the language tabs (e.g. Node, Python, Ruby) — every code block on the page should change at once, and a short confirmation message should appear at the bottom of the screen each time.
2. Click any link in the body of the docs that opens in a new tab — the link should briefly highlight in purple and a "Opening … in a new tab" toast should appear.
3. Shrink the browser to phone width. Tap the "Menu" button in the header — the side navigation should slide open, the button should turn purple, and its label should change to "Close". Tap it again to close.
4. Still on a narrow window, try tapping sidebar links, on-this-page outline links, and footer links — they should all feel taller and easier to hit than before.
5. Open `customization.html`. Click between the theme preset tabs in the preview — each one should briefly confirm "[Theme name] preset applied to the preview." at the bottom.
6. Press the copy button on a code block — besides the existing "Copied" flash, the button itself should briefly shrink when clicked.
