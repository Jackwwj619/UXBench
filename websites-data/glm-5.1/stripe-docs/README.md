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

Open `index.html` in any modern browser. Click any language tab on a code block to switch every language on the page at once. Use the right outline to jump between steps; the copy button on any block flashes "Copied" when used.

## What was changed in this version

- Switching the code language now pops up a brief toast saying "Switched code samples to Python." (for example), so you can tell at a glance that every block on the page just updated.
- The "Showing Python" label above the first code block now has a small green dot in front of it and reads "Showing Python example", making the current language easier to spot.
- The active language tab and "Was this helpful? Yes/No" buttons now have a strong purple gradient background instead of looking like every other tab, so it's obvious which one is selected.
- Pressing Enter in the search box now opens the first result instead of doing nothing.
- On the customization page, the "Pay" button under the checkout preview no longer takes you to a generic "preview only" toast — it now shows a clear in-page note that no real payment was processed, with a link to Stripe's official customization docs.
- After clicking a preview button (Pay / Submit / Handoff), the button itself changes to "Hide demo notice" so you can collapse the explanation again.
- Buttons, language tabs, copy buttons, and feedback buttons throughout the pages are taller and easier to tap on a phone.
- On phone-width screens, opening the left navigation now dims the rest of the page behind it and adds a clear close button at the top, so it feels like a proper slide-in menu instead of overlapping the content.
- Horizontal scrolling on phones is suppressed, so the page no longer jiggles sideways when you scroll vertically.

## How to test the changes

1. Open `index.html`, scroll to any code block, and click "Python" (or any other language tab). A toast should briefly appear in the corner saying "Switched code samples to Python." The "Showing …" label above the first block should now have a small green dot and say "example".
2. Press Tab through the language tabs — the active one should be clearly highlighted in purple, and the focus ring should be visible.
3. Click the search button or icon in the top nav, type a few letters, and press Enter — the first result in the dropdown should open automatically.
4. Open `customization.html`, scroll to the live "Checkout preview" card, and click the "Pay" button. You should see a clear in-page message stating it's a demo and a link to the real Stripe docs, and the button label should change to "Hide demo notice". Click it again to collapse.
5. On `index.html`, find the "Was this helpful?" buttons at the bottom and click "Yes" — the button should turn purple with a check mark in front of "Yes".
6. Resize the browser to phone width on any page, open the left navigation, and confirm the rest of the page is dimmed and a close button is visible at the top of the menu. Tap outside or use the close button to dismiss it.
