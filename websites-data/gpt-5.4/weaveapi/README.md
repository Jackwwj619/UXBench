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

- The try-it panel now shows clear status messages: a "Sending…" spinner while it works, a green "200 OK · response received" on success, and a red error code on failure.
- When a charge fails because the currency isn't supported, a red helper box appears below the Send button explaining you must use `usd`, `eur`, `gbp`, or `jpy`. The currency field also shows that hint right below the input.
- The Send button is disabled and shows "Sending…" while a request is in flight, so you can't fire it twice by accident.
- The recent-requests list now shows a green check or red cross next to each call so you can see at a glance which ones succeeded.
- The theme toggle button now flips between a moon and a sun icon to match the current mode, and a small "Dark mode on / Light mode on" toast confirms each switch.
- The search box now has a much better dropdown: when you type something with no matches it suggests terms to try (charges, customers, webhooks, etc.), and pressing Enter jumps to the first result. The dropdown sits right under the search field instead of floating at a fixed spot on the page.
- On phones and tablets, the left documentation menu collapses into a hamburger button at the top; tapping it slides the menu in over a dim backdrop and tapping a link or the backdrop closes it.
- Long parameter, attribute, and error tables now scroll sideways on narrow screens instead of stretching the page.
- Long code samples now scroll horizontally on their own and the copy button stays accessible.
- The fake API keys in every code sample now read `sk_test_EXAMPLE_DO_NOT_USE_REAL_KEY`, and the quickstart "Make your first charge" step has a green "Example test key only" badge plus a sentence reminding you to swap in your own key.
- The "Payment methods" section in the left navigation now includes a short note explaining all payment methods share the Charge object, and "Bank" was renamed to the clearer "Bank debits".
- Buttons, links, and form fields throughout the docs are taller and easier to tap.

## How to test the changes

1. Open `charges.html`, scroll to the "Create a charge" section, and click **Send →** in the right-hand try-it panel. You'll see a brief "Sending…" message, then a green "200 OK · response received".
2. In the same try-it panel, change the `currency` field to "xyz" and press **Send →**. You get a red error message and a red helper box explaining the four supported currencies.
3. In the top right of any docs page, click the moon icon — it switches to a sun and a small "Dark mode on" toast appears at the bottom. Click again to switch back.
4. Click into the search box at the top of any page and type "xyz" — instead of an empty dropdown, you see suggestions like charges, customers, webhooks. Type "charge", press Enter, and you jump to the first match.
5. Resize the browser to phone width on any docs page. The left menu disappears and a ☰ button appears next to the search box — tap it to slide the menu in, then tap a link or the dim area to close it.
6. Open `charges.html` on a narrow window and look at the 18-field Charge object table — it now scrolls sideways inside its own box.
7. Open `quickstart.html` and scroll to step 2 — there's a green "Example test key only" badge next to the heading and a note about replacing the example key.
8. In the left navigation, scroll to "Payment methods" — there's a small italic note about the Charge object, and the second item now reads "Bank debits" instead of "Bank".
