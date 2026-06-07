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

- **Clearer framing on the customization page.** The eyebrow now reads "Stripe product limitations" and the intro paragraph spells out that the limits come from the real Stripe Checkout product (not from this clone), with a link out to the official Stripe docs for the most current feature set.
- **Mobile menu closes when you press Escape.** Open the left navigation drawer on a small screen and you can now dismiss it with the Escape key, not just the close button.
- **Mobile menu closes itself when you make the window wider.** If you open the drawer on a phone-sized window and then resize back to desktop, the drawer tidies up automatically instead of leaving the page in a stuck state.
- **No more accidental horizontal scrolling on phones.** Wide code samples, tables, and images now stay inside the screen, so you don't have to scrub sideways to read the page.
- **Bigger tap targets on phones.** Feedback buttons, breadcrumb links, footer links, and the sidebar close button are larger and more comfortable to tap.
- **Code samples wrap or scroll cleanly on small screens.** Long lines now break or scroll inside their own box without pushing the rest of the page out of shape.

## How to test the changes

1. Open `customization.html` and look at the top of the article. The small label above the title should read "Stripe product limitations" and the intro paragraph should contain a link to the official Stripe Checkout customization docs.
2. Open `index.html` and shrink the browser to phone width. Tap the menu icon to open the left navigation, then press the Escape key — the menu should close.
3. With the menu open at phone width, drag the browser back out to desktop width. The menu should disappear on its own and the page should be usable again without reloading.
4. On a phone-width window, scroll through the Quickstart page and confirm you cannot scroll the whole page sideways. Long code samples should scroll inside their own box.
5. At phone width, try tapping the breadcrumb links at the top, the "Was this page helpful?" buttons, and the footer links — each should feel like a comfortably large tap area.
