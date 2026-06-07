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

- A new "☰" menu button appears on phones and small tablets, opening the left navigation as a full-screen overlay so you can actually move between docs sections on mobile.
- The dark-mode toggle button now updates its icon (sun / moon) and tooltip to reflect what clicking it will do.
- The try-it panel on the right now shows small hint lines under each input field — for example, the `amount` field explains "Amount in cents (e.g. 2000 = $20.00)" and `currency` lists the supported values. The Send button also gives clearer error responses when you type an invalid amount.
- Wide tables (error codes, parameters, event types) now scroll sideways on narrow screens instead of squashing or breaking the layout.
- The left-nav "Cards / Bank / Wallets" entries now have a small "ref" badge to make clear they jump into the Charge object reference rather than to dedicated pages.
- The Copy button on each code block now keeps a fixed width so the layout doesn't jiggle when it briefly switches to "Copied!".
- The language tab bar on code blocks (curl / Python / Node / Go) is taller and easier to tap, and tabs scroll horizontally on narrow screens instead of wrapping awkwardly.
- The search box (Ctrl/Cmd+K) shows a friendlier "No matches" message and re-runs your last search when you click back into the field.

## How to test the changes

1. Open `index.html` in any browser. Click the moon icon in the top bar — the page should switch to dark mode and the icon should become a sun with a "Switch to light mode" tooltip.
2. Narrow the browser window (or open on a phone). A "☰" button appears in the top bar; clicking it opens the left navigation as a full overlay.
3. Open `charges.html`. Scroll down to the "Create a charge" section and look at the right-hand try-it panel — each parameter has a hint below it. Type `xyz` into `currency` and click Send to see a clear error response.
4. Open `errors.html` and narrow the window — the error code table should scroll sideways inside its own scroll area rather than spilling out of the page.
5. Hover any code block and click the Copy button — it briefly changes to "Copied!" without changing the block's width.
6. Press Ctrl+K (or ⌘K) and try a search that returns nothing (e.g. "asdf") — you should see the new no-matches message with suggested terms.
