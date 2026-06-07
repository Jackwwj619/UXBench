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

- The theme toggle button now swaps its icon (moon for light, sun for dark) so you can see which mode you'll switch into, and the icon updates correctly when the page loads.
- On narrow screens (phones and small tablets), a new menu button (☰) opens the left navigation as a slide-in panel with a dimmed background. Tapping a link or the background closes it.
- The try-it panel now checks your input as you type. If you enter an unsupported currency like "xyz", you'll see a red message under the field. The Send button shows a clear error instead of sending an invalid request.
- Wide tables for parameters, attributes, and error codes now scroll sideways on small screens instead of squashing the layout off the edge.
- Code blocks, language tabs, and copy buttons are now larger and easier to tap on phones, and the copy button moves below the code on small screens so it doesn't overlap.
- Buttons and form fields throughout the site now show clear blue outlines when you tab to them with the keyboard.

## How to test the changes

1. Open `index.html`. Click the moon icon at the top-right — it should switch to dark mode and the icon should change to a sun. Refresh the page and the theme should stick.
2. Shrink the browser window to phone width. A "☰" button should appear at the top. Tap it to open the left navigation, then tap a link or the dimmed area to close it.
3. Open `charges.html` and find the try-it panel on the right. Type "xyz" into the currency field — a red error message should appear under it. Click **Send** and the response box should show an "invalid_request_error" telling you to fix the field.
4. Clear the currency field and type "usd" instead — the error should disappear and Send should return a mock charge object.
5. Open `errors.html` on a narrow screen — the 25-row error table should scroll sideways without making the whole page overflow.
6. Press Tab through the page — each button and link should show a clear blue outline when focused.
