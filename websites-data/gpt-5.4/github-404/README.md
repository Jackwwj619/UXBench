# GitHub 404 Clone

A practice clone of GitHub's "page not found" screen — the Octocat error page you land on when a repo or file doesn't exist. Useful as a reference for what a good error page can look like.

> Front-end demo only — the page just shows the 404 design.

## What you can do

- **See the not-found page.** The familiar centered message — "This is not the web page you are looking for." — with the Octocat illustration above it.
- **Click through to recovery options.** Links to the home page, search, and contact support are laid out below the message.
- **Hover the illustration.** A small parallax effect responds to your cursor.

## How to use it

Open `index.html` in any modern browser. There's nothing to configure — the page is meant as a static design reference.

## What was changed in this version

- The Search, Support, and Status links in the top bar now update the address bar (e.g. `#search`, `#support`) and the browser tab title (e.g. "Search · GitHub") so you can bookmark or share a specific view.
- Every inner page (Search, Support, Status) now starts with a "404 › Search" style breadcrumb at the top so you always know how to get back.
- When a search returns nothing, the empty state now reads "No code found for 'xyz'", explains your next steps, and shows three big buttons — Back to home, Contact support, Check GitHub status — instead of only suggesting search terms. The popular-searches row has been expanded to five chips and the chips are now styled as proper pills.
- The Support contact form now shows red inline messages under each empty field if you click Submit, plus a red banner at the top summarising how many fields need attention. Your cursor jumps to the first problem field and the messages clear themselves as you start typing.
- The Status page email subscribe form now shows a specific inline error if you leave the field blank ("Please enter an email address") or type something invalid ("That email address looks invalid"), instead of silently doing nothing.
- The GitHub logo in the top bar now has a clear hover and keyboard focus highlight and a tooltip explaining it returns to the 404 page.
- On phones, the top nav, search box, subscribe form, and filter tabs all stack neatly: the search input takes the full width with the button below it, and the search-type tabs scroll sideways instead of squishing. Empty-state recovery buttons stack vertically full-width.
- Buttons, links, and form fields across the site are now bigger and easier to tap on phones.

## How to test the changes

1. Open `index.html` and click "Search" in the top right. The address bar now ends in `#search` and the browser tab title becomes "Search · GitHub". Hit the browser's back button to return.
2. On the Search page, look just under the top bar — there's now a "404 › Search" breadcrumb you can click to jump back.
3. On the Search page, type "qqqqq" into the box and press Search — the empty state now says "No code found for 'qqqqq'" with three big buttons (Back to home, Contact support, Check GitHub status) and a row of pill-shaped suggestion chips.
4. Click "Support" in the top bar, scroll to "Contact Support", and click Submit Request with the form empty. Each empty field gets a red message under it, a red banner appears at the top, and the email field gets the focus. Start typing in any field — its red message disappears.
5. Click "Status" in the top bar, scroll to "Subscribe to Updates", and click Subscribe without typing anything — a red message appears below the box. Type "abc" and click again — a different message tells you the address looks invalid.
6. Tab to the GitHub logo in the top left with the keyboard — a clear blue focus ring appears around it.
7. Resize the browser to phone width and try the Search box — the input and Search button stack on top of each other, the Code/Repositories/People tabs scroll sideways, and any empty-state buttons stack full-width.
