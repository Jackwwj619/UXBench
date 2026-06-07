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

- **A real Payment methods section on the Charges page.** Cards, Bank (ACH/SEPA), and Wallets (Apple Pay, Google Pay, Link) each have their own short write-up describing how they behave — capture windows, settlement timing, refund limits, and so on. The left-nav links under "Payment methods" now jump straight to those sections instead of all landing on the same generic anchor.
- **Mobile-friendly navigation.** On narrow screens a hamburger button appears at the top. Tapping it slides the left navigation in from the side over a dark backdrop; tapping the backdrop, picking any link, or pressing Escape closes it again.
- **Theme toggle is clearer.** The sun / moon button in the header now shows the icon for the mode you'd switch to, has a proper accessible label that updates ("Switch to light mode" / "Switch to dark mode"), and the whole page colour transition is gentler. The toggle has a bigger tap area and a clear pressed-state.
- **Wide tables scroll cleanly on phones.** The object, parameter, and error tables now sit inside a horizontal scroll area so you can swipe through wide columns on a small screen without the page itself overflowing. Long words wrap instead of pushing layout out of shape.
- **Code blocks and the try-it panel are easier to use on mobile.** The language tabs wrap to a second line when needed, the Copy button is bigger, the try-it form fields and Send button are taller, and on small screens the try-it panel sticks to the bottom of the screen with a little drag-handle hint instead of disappearing.
- **Bigger tap targets across the docs.** Left-nav links, on-page anchor links, search results, the search box itself, and the history toggle all have comfortable touch heights.

## How to test the changes

1. Open `charges.html` and scroll down to "Payment methods" — you should see three sub-sections (Cards, Bank, Wallets) with their own headings and descriptions. In the left nav, click "Cards", then "Bank", then "Wallets" — each should jump to its own section.
2. Resize the browser to phone width (or open on a phone). A hamburger button should appear at the top. Tap it — the left navigation should slide in over a dimmed backdrop. Tap the backdrop or press Escape to close it; pick any link and the drawer should close too.
3. Click the sun/moon button in the top bar. The page colours should fade between light and dark, and the icon should swap to show the other mode. Hover over the button — its label should describe which mode it will switch to.
4. On a phone-width window, scroll to any table (for example the 18-row charge object table) — you should be able to swipe sideways within just the table to see the rest of the columns, while the rest of the page stays put.
5. Still on a phone-width window, look at any code block — switch between language tabs (they should wrap to a second row if there isn't space), tap Copy (which should now be finger-sized), then scroll to the try-it panel at the bottom of the screen and tap Send.
