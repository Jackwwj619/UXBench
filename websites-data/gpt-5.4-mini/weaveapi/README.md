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

- The search box at the top of every doc page now shows suggestions as soon as you click into it (a list of popular pages) instead of staying blank until you start typing.
- If your search doesn't match anything, the dropdown now says "No matches for …" instead of just disappearing silently.
- Pressing **Escape** closes the search dropdown.
- When you switch the code language (curl / python / node / go) on any code block, every code block on the page briefly flashes so you can see which ones changed, and the active language tab gets a clearer highlighted style.
- The "Copy" button on each code block is bigger and has a visible outline when you focus it with the keyboard, instead of being a small grey hint.
- On a phone, the left-side navigation no longer disappears — it folds in above the page content as a scrollable list with large tap targets, so you can still jump between docs sections.
- On a phone, code blocks are no longer cut off at the side: the language tabs wrap onto multiple rows, the **Copy** button drops below the code as a full button, and wide tables scroll sideways instead of breaking the page.
- The search box no longer triggers iOS auto-zoom when you tap it, and now has a soft purple glow when focused so it's clearer it's active.

## How to test the changes

1. Open `charges.html`. Click into the search box at the top — a list of suggested pages should appear immediately, before you've typed anything.
2. Type something nonsense like `zzzzz` into the search — the dropdown should now say `No matches for "zzzzz"` instead of vanishing.
3. Press **Escape** — the search dropdown should close.
4. Scroll to any code example on the page. Click **python** in the language tabs at the top of the block — every code block on the page should briefly flash purple, and the **python** tab should look clearly selected.
5. Hover the **Copy** button on a code block — it should now have a visible border and look like a proper button. Tab to it with the keyboard to see the focus outline.
6. Shrink the browser to phone width (or open on a phone). The left navigation should appear at the top of the page as a list of links with large tap targets, instead of disappearing. The code blocks should fit the screen — language tabs wrap, the Copy button moves below the code, and any wide tables scroll sideways.
7. Tap the search box on a phone — it should not zoom in, and you should see a soft purple glow around the box when it's focused.
