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

- The GitHub logo in the top bar now sits next to the word "Home" and has a clear highlighted background when you hover or tab to it, so it's obvious it's the way back to the home page.
- Top-bar links (Search, etc.) are taller and easier to tap, with a clear blue outline when you reach them with the keyboard.
- On the search page, the category tabs (Code / Repositories / People) are bigger, and the active tab has a stronger highlighted background so it's easier to tell which one you're on.
- The filter buttons inside search now look like real buttons — the active filter is filled in blue with white text instead of a faint grey, and inactive ones get an outline on focus.
- When a search returns no results, the empty-state message now repeats the keyword you searched for and adds three large action buttons: "Back to home", "Contact support", and "Check GitHub status".
- The suggested keyword chips in the empty state ("react", "python", "node") now look like proper pill-shaped buttons with a border, instead of plain blue text.
- Search result rows now show a small "›" arrow at the end of each title to make it obvious you can click them, and you can also open a result by tabbing to it and pressing Enter or Space.
- On a phone or narrow window, the top-nav links, search tabs, and filter buttons all become wider and taller so they're easier to tap with a finger, and the empty-state action buttons stack into a single full-width column.

## How to test the changes

1. Open `index.html`. Move your mouse over the Octocat logo in the top-left — you should see the word "Home" next to it and a darker rounded background appear.
2. Press Tab a few times from the address bar — each top-nav link should show a blue outline as you reach it.
3. Click "Search" in the top nav. Click between the Code / Repositories / People tabs — the active tab should have a darker filled background as well as the orange underline.
4. Click any of the filter buttons (e.g. a language filter) — the selected one should turn solid blue with white text.
5. In the search box, type something obviously nonsense like `zzzzzzz` and press Enter. The empty-state should mention your keyword in bold and show three buttons underneath: "Back to home", "Contact support", and "Check GitHub status". The "react / python / node" suggestions should look like pill buttons with borders.
6. Run a real search (e.g. `react`). Each result row should have a small "›" arrow after the title. Tab to a result and press Enter — it should open the same detail view as clicking it.
7. Shrink the browser window to phone width and re-check the search page — tabs, filters, and the empty-state buttons should all become larger and stack into a single column.
