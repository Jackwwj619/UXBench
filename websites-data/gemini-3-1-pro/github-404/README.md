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

- The search box on the 404 page no longer navigates to a blank "no results" screen when empty — clicking Search with no text now shows a red "Please enter a search term." message under the field and outlines the input in red. The error clears as soon as you start typing.
- The full-page search bar gives the same kind of feedback: clicking Search without a query briefly turns the button red and labels it "Enter a search term" before reverting, instead of silently routing to an empty results page.
- Incident rows on the status page now show a chevron icon that rotates open when expanded, so it's visually obvious that each row is a toggle. Keyboard users also get correct `aria-expanded` state.
- The GitHub logo in the top nav now actually links to the home page (it used to be a dead `#`) and has a proper "GitHub homepage" aria-label for screen readers.
- Nav links, the logo button, and primary CTAs (Search, Submit, Subscribe, contact form) are now full 44px touch targets across the site, easier to tap on phones.
- Keyboard focus is now visibly outlined on nav links, the logo, and incident toggles with a blue 2px focus ring.

## How to test the changes

1. Open `index.html`. With the search box empty, press Enter or click "Search" — a red "Please enter a search term." message appears under the box and the input border turns red. Type a character and the error clears.
2. Click the green Octocat logo at the top-left — it now navigates to the home page (`index.html`) instead of doing nothing.
3. Navigate to the search page from a link, leave the search box empty, and click Search — the button briefly reads "Enter a search term" in red, then resets.
4. Open the status page and click any incident row — a chevron rotates 180° to show the expand state. Tab to a row and press Enter or Space to toggle it via keyboard.
5. Resize to phone width and tap nav links, the logo, and submit buttons — every target is comfortably tappable.
6. Tab around the page — focus rings appear on nav links, the logo, and incident toggles.
