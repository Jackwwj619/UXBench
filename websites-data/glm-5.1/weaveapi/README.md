# WeaveAPI

WeaveAPI is a demo developer-documentation site for a fictional payments API platform (in the Stripe Docs family). It has the full developer-docs shape: a quickstart, API references for Charges and Customers, webhooks, and an error code table, plus a working try-it panel that returns mock responses.

> Fictional product — code examples and try-it responses are illustrative; nothing reaches a real API.

## What you can do

- **Start at the home page.** Quickstart, Authentication, Idempotency, Pagination, and Errors sections, plus four "popular guides" cards.
- **Walk through the quickstart.** An install + first-charge two-step example.
- **Read the Charges API.** An 18-field object table plus five endpoint sections (POST create, GET single, capture, refund, list). Each section has a parameter table, multi-language code blocks, and a JSON response example.
- **Try a call live.** The right column has a try-it panel that follows the endpoint you're reading. Fill in parameters and **Send** to get a mock response — `currency=usd/eur/gbp/jpy` returns a charge object; anything else returns `currency_not_supported`.
- **Read the Customers API.** Object table plus five endpoints (create / retrieve / update / delete / list).
- **Read about webhooks.** A 17-event type table, HMAC signature verification in four languages, and retry strategy notes.
- **Look up errors.** A 25-row error code table with code, HTTP status, message, and how to handle it.
- **Switch language everywhere at once.** Pick a code language and every block on the site switches; your choice is remembered.

## How to use it

Open `index.html` in any modern browser. Use the left nav to move between docs sections. Hit ⌘K (or Ctrl+K) for a search dropdown across the docs. Light/dark theme toggle lives in the top bar.

## What was changed in this version

- The try-it panel's Send button now shows "Sending…" and disables itself for a moment, with the response area showing "Loading…", so it's obvious something is happening.
- Error responses in the try-it panel (like `currency_not_supported`) now show in red so you can tell at a glance the call didn't succeed. If you click Send without picking an endpoint first, a friendly message tells you to scroll to one.
- The site-wide search (Ctrl/Cmd+K) now shows a "No results for …" message when nothing matches, instead of silently closing. Pressing Enter also runs the search, and pressing Escape closes the dropdown.
- The big API parameter tables (Charges, Customers, errors, etc.) now scroll sideways inside their own frame on narrow screens instead of squashing or pushing the page wider than the screen.
- The whole three-column layout reflows better on tablets and phones: the right "try-it" panel drops below the docs on tablets, and the left nav collapses to a horizontal strip at the top on phones, so the docs body always has room.
- Left-nav links, language tabs, and the theme-toggle button have bigger tap areas so they're easier to hit on touch screens.
- The theme-toggle button is now a clear 44 by 44 button with a visible hover state.

## How to test the changes

1. Open `charges.html`, scroll to a "Create a charge" example, and click **Send** in the right-hand try-it panel — the button briefly says "Sending…" and the response box shows "Loading…" before the JSON appears.
2. Still in the try-it panel, set `currency` to something like "zzz" and click Send — the JSON response is shown in red on a darker red background, signalling an error.
3. Open `index.html`, press Ctrl+K (or Cmd+K on Mac), type some gibberish like "asdkfj", and press Enter — the dropdown now says "No results for 'asdkfj'." Press Escape — the dropdown closes.
4. Open `charges.html` on a narrow window (or shrink your browser to phone width) and scroll to the Charge object 18-field table — it scrolls sideways inside its own panel without forcing the whole page to scroll.
5. Resize the browser to tablet width on any docs page — the right try-it panel slides below the docs body. Resize further to phone width — the left navigation moves to a horizontal strip at the top.
6. On `index.html`, click the theme-toggle button in the top-right — its 44-pixel hit area is easy to tap and lightly tints on hover.
