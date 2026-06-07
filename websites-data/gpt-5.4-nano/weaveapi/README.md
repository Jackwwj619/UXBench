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

- On phones and narrow windows, a new menu button at the top opens the left navigation as a slide-in panel with a dimmed background, so you're not stuck without a way to move between docs sections.
- The try-it **Send** button now shows clearer feedback: it briefly says "Sending…" and turns off while it works, a short status line appears underneath ("Response updated" in green for a success, "Error" in red for a failed call), and the response box flashes so you can tell the result actually refreshed.
- The recent-calls list under the try-it panel now also shows whether each call succeeded (200) or failed (4xx).
- Rows in the big error-code table are now clickable: tapping or pressing Enter on a row highlights it with a colored bar on the left and scrolls it into view, and the address bar updates so you can share a link to a specific error code.
- The search box at the top now also looks inside the page you're reading. When matches are found on the current page, the dropdown offers a "Jump to … on this page" option and pressing Enter scrolls to the first match and highlights every occurrence.
- Searching for something that doesn't exist now shows a clear "No results for …" message instead of an empty dropdown, and pressing Escape clears the highlights.
- A small floating banner at the top of the page announces what the search did ("Jumped to first match", "No matches", etc.), so it's obvious something happened.
- Wide tables (object fields, parameters, error codes) now scroll sideways on phones instead of pushing the page off-screen, and tap targets in the navigation and tables are taller and easier to hit on touch screens.

## How to test the changes

1. Open `index.html` in any modern browser.
2. Resize the window to a phone width (or open it on a phone). A menu button (☰) should appear at the top — tap it to slide the left navigation in, tap the dark background to close it, or tap any link to close it and jump.
3. Open the Charges API page, fill in the try-it panel on the right, and click **Send**. Watch the button say "Sending…", the response area flash, and a green "Response updated" line appear below the button. Then change the currency to something like `xyz` and send again — the status line should turn red and say "Error".
4. Look at the "Recent calls" list under the try-it panel — each entry should now show `200` or `4xx` next to the action.
5. Open the Errors page and click any row in the error table — it should highlight with a colored stripe on the left and scroll into view, and the URL in the address bar should update to point at that error.
6. Click the search box at the top, type a word that appears on the current page (e.g. "currency"), and press Enter — the page should scroll to the first match and highlight every occurrence, with a small banner at the top confirming the jump.
7. Type something nonsense in search (e.g. "zzzzzz") — the dropdown should show "No results for …" and the banner should say "No matches".
8. Press Escape with the search box focused — the highlights and banner should clear.
9. On a phone-width window, scroll the wide error table sideways — it should scroll horizontally inside its area rather than stretching the whole page.
