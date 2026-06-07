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

- Clicking a result in the search dialog now jumps you directly to that section on the page and shows a small "Jumped to section" toast, instead of just closing the dialog.
- The search dialog and the mobile navigation menu can no longer be open at the same time — opening one closes the other.
- Pressing Escape now also closes the mobile navigation menu, not just the search dialog.
- A dimmed backdrop appears behind the mobile navigation menu, and clicking outside the menu closes it.
- When you close the search dialog, the keyboard focus returns to the button you used to open it, so keyboard users don't lose their place.
- The "Preview" buttons in the tutorial now act as a toggle — the button label changes to "Hide preview details" once you open a preview, and the preview panel smoothly scrolls into view.
- Clicking any link that opens in a new tab now shows a brief "Opening … in a new tab" toast, so it's clear that a new window is about to appear.
- Buttons across the page (copy, feedback, search/close, menu toggle, sidebar links, footer links, language tabs) are now larger and easier to tap on phones, with clearer focus rings for keyboard users.

## How to test the changes

1. Open `index.html` and click the Search box at the top. Type a couple of letters, then click any result — the page should jump to that section and a small toast should appear at the bottom.
2. Shrink the browser to a phone-sized width. Tap the menu button to open the left navigation — a dark backdrop should appear behind the menu, and tapping that backdrop closes the menu.
3. With the menu open, press Escape on the keyboard — the menu should close.
4. Open the menu, then open the search dialog — the menu should close automatically. Do it the other way around and the search dialog should close when the menu opens.
5. Open the search dialog using the search box, then close it with the X button — the search box at the top should still be focused, ready to use again.
6. On the Quickstart page, click any "Preview" button next to a step. The button label should change to "Hide preview details" and the preview content should slide into view in the middle of the screen.
7. Click any link in the docs that opens in a new tab (for example, an external reference). A "Opening … in a new tab" toast should briefly appear.
8. Shrink the browser to phone size and notice the copy buttons on code blocks, the menu button, and the breadcrumb links are all noticeably larger than before.
