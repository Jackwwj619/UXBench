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

- When you switch the language on a code block, the small "Showing JavaScript / Python / …" badge above the block now briefly pulses, and a short toast pops up confirming the new language — so it's obvious every code block on the page just changed.
- The "Was this helpful?" footer now shows a clear thank-you message right below the Yes/No buttons after you click ("Thanks — recorded 'Yes'. You can change your answer anytime."), the original prompt fades to grey, and a friendlier toast appears instead of the technical "Feedback saved locally" message.
- Closing the search dialog now reliably returns the cursor focus to the search button you clicked to open it, so keyboard users don't lose their place; a small "Search closed" toast confirms it.
- On phones, the slide-out left navigation now appears with a darker dimmed background behind it. Tapping the background, pressing Escape, or tapping any nav link closes the menu, and a "Navigation closed" toast confirms it.
- The Yes/No feedback buttons, language tabs, copy buttons, search box, and menu toggle are all now taller and easier to tap on phones (minimum 44 pixels), so they're comfortable on touch screens.
- The currently selected feedback button (Yes or No) is now visibly highlighted with a soft ring around it, instead of just a tiny colour change.
- The search panel and the mobile menu background now fade in smoothly rather than appearing instantly.

## How to test the changes

1. Open `index.html` in any modern browser.
2. Click any language tab (e.g. Python, Node) on any code block — every code block on the page should switch language, the small "Showing Python" badge above each block should pulse briefly, and a toast should pop up saying "Showing Python code".
3. Scroll to the bottom of the page and click **Yes** or **No** under "Was this helpful?" — the original "Was this helpful?" prompt should fade to grey, your chosen button should get a soft highlight ring, a thank-you message should appear under the buttons, and a friendly toast should appear.
4. Click the search button at the top, then click the close button (or press Escape) — focus should jump back to the search button you originally clicked, and a "Search closed" toast should appear.
5. Resize to a phone-width window, tap the menu (hamburger) button, then tap the dimmed grey area to the right of the menu — the menu should close and a "Navigation closed" toast should appear. Repeat and press Escape — same effect.
6. Tap a link in the slide-out menu — the menu should close and the page should jump to that section.
7. On a phone-width window, check that the Yes/No buttons, language tabs, copy buttons, and search button are all comfortably tap-sized.
