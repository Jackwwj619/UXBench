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

- The whole site now has a working mobile layout. A hamburger button appears in the docs top bar on narrow screens and slides the left nav in as a drawer with a dark backdrop; tapping the backdrop, pressing Escape, or tapping any nav link closes it.
- Anchor links to specific sections (e.g. `index.html#authentication` from the sidebar) now scroll the heading into view properly instead of hiding under the sticky docs header.
- The sidebar's "current page" highlight is now accurate. Hash-bearing entries (like "Authentication" and "Idempotency" on the docs home) only light up when the URL hash matches, and the highlight follows you live as you scroll or click between in-page sections.
- The language tab strip ("curl / python / node / go") on every code block now stays in sync as you switch languages. Previously the active highlight could get stuck on the previously selected tab after a re-render.
- The search dropdown now shows a "No results for X" empty state instead of just hiding silently, gets restored when you re-focus the search box with text in it, and dismisses cleanly with Escape.
- The theme toggle now changes its icon (sun / moon) and `aria-label` to reflect the current mode, so it's obvious which way the click will switch.
- The "Send" button in the try-it panel, language tabs, copy buttons, theme toggle, and hamburger toggle all meet a 44px tap target on small screens.
- Wide parameter, attribute, and error tables now scroll horizontally inside their own container on narrow screens instead of stretching the page wider than the viewport. Code blocks also constrain their width and wrap the try-it response panel.
- The brand SVG and the hamburger toggle expose `aria-hidden` / `aria-label` so screen readers describe the chrome correctly.

## How to test the changes

1. Open `charges.html`. Shrink the browser to phone width — a hamburger button (☰) appears at the top of the page. Tap it to slide in the left nav with a dark backdrop. Tap the backdrop, press Escape, or tap a sidebar link to close.
2. From `index.html`, click "Authentication" or "Idempotency" in the sidebar — the page scrolls so the heading sits below the sticky search bar (not hidden behind it). The sidebar's active highlight moves to the section you clicked.
3. Open `charges.html` and click any code block's language tabs (curl / python / node / go) — every block on the page switches and the active tab is highlighted consistently across the page.
4. Hit Ctrl+K (or Cmd+K) and type "zzz" — the dropdown shows "No results for zzz". Type "charges" and click a result; the page navigates. Press Escape with the search box focused — the dropdown closes.
5. Click the theme toggle in the top bar — the icon flips between sun and moon, and a screen reader hears "Switch to light mode" / "Switch to dark mode".
6. On `charges.html`, scroll down — the try-it panel on the right follows the current endpoint, the "Send" button is comfortably large, and the response panel wraps long JSON instead of overflowing.
7. On a phone-width window, scroll to the Charges 18-field attribute table — it scrolls horizontally inside its own container instead of pushing the page wider than the screen.
