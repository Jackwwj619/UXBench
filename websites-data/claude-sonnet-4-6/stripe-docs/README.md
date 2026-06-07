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

- The "Was this helpful?" feedback widget now shows a short thank-you message next to the buttons after you click Yes or No, so it's obvious your click did something.
- The fake "Pay" and other preview buttons on the page are now clearly labelled as a demo: each one has a small "Demo" tag in the corner, a hover tooltip, and a brief pulse animation when clicked, plus a clearer toast message reminding you it does not run a real payment.
- The Copy button on every code block now shows a small clipboard icon and turns into a check mark for a moment after you copy, instead of just changing the word.
- The search dialog's Close button is bigger and shows an "Esc" hint; the search box now properly returns focus to the button you clicked when you close it, and tabbing inside the dialog stays inside the dialog.
- Buttons, links, and tabs across the page are taller and easier to tap on phones (no more thin, hard-to-hit targets).
- Long product titles in code-block headers no longer overflow and break the layout on narrow screens.

## How to test the changes

1. Open `index.html` in any browser.
2. Scroll to the bottom of the page and click "Yes" or "No" under "Was this helpful?" — you should see a thank-you line appear under the buttons.
3. Scroll to any "Pay $24.00" or similar purple preview button and click it — note the small "Demo" badge in the top-right corner, the pulse animation, and the toast that appears.
4. Hover over any code block and click the Copy button — the icon should flip to a check mark briefly.
5. Click the Search box at the top, then press Esc — focus should return to the search button. Try Tab repeatedly inside the search dialog to confirm focus stays inside.
6. Resize the browser narrow (or open on a phone) and try tapping the nav links and language tabs — they should be comfortably tap-sized.
