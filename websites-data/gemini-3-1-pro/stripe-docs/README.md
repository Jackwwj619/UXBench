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

- The active language and theme tabs are now clearly distinguishable from the inactive ones. The selected tab gets a solid purple background with white text and a subtle shadow, instead of looking identical to the hover state.
- Clicking a language tab now smooth-scrolls the matching code block into view, so when you switch from "Node" to "Python" you can see your new code block instead of looking at empty space mid-page.
- The mobile sidebar drawer now opens with a dark backdrop behind it. Tapping the backdrop closes the sidebar, as does pressing Escape.
- The sidebar's mobile "Close" button now works reliably — it's wired up via event delegation, so the dismiss action still triggers if the drawer markup is re-rendered.
- When the sidebar is closed on a small screen it is now fully hidden from focus and pointer events, so keyboard tabbing no longer lands on invisible links behind the page.
- Language and theme tabs now expose their selected state to screen readers via `aria-pressed`, so assistive tech announces which language is active.
- On phones the docs logo, breadcrumb links, language tabs, sidebar close button, and footer links now all meet a 44px tap-target minimum, and the footer links stack vertically so they aren't crammed onto one row.

## How to test the changes

1. Open `index.html` and click any language tab (e.g. Node, Python, Ruby) on a code block — every block on the page switches to that language and the selected tab is clearly highlighted in solid purple.
2. Click a different language tab while scrolled mid-page — the page smoothly scrolls the corresponding code block into view rather than leaving you above or below it.
3. Shrink the browser to phone width and tap the menu button to open the left sidebar — a dark backdrop appears behind the drawer. Click the backdrop, press Escape, or tap "Close"; each one dismisses it.
4. With the sidebar closed on a narrow window, press Tab repeatedly — focus skips over the hidden sidebar links instead of landing on them.
5. On a phone-width window, check the docs logo, breadcrumb links, language tabs, and footer links — each has comfortable padding and the footer links stack vertically.
6. Use a screen reader and click between language tabs — each tab announces its selected/unselected state.
