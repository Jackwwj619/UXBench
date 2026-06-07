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

- When you search and get no results, the page now suggests example searches you can click ("react", "python", "node", "github") so you have a way forward instead of a dead end.
- Each "Incidents" item on the status page now shows a small chevron that rotates when you open the item, so it's obvious you can expand and collapse it.
- The newsletter sign-up at the bottom of the status page now properly checks your email. If you leave it blank or type something that isn't an email, you get a clear red message under the field; once you start fixing it, the error clears.
- The expanded incident view is now taller so the full text fits without being cut off.
- The GitHub logo at the top now has a focus ring when you tab to it with the keyboard, and buttons and inputs across the page are taller and easier to tap on a phone.

## How to test the changes

1. Open `index.html` and find the search box on the 404 page. Type a word and press Enter — when no results show, you should see a "Try: react, python, node, github" line beneath. Click "react" to run that search.
2. Navigate to the status page (via the link at the bottom of the 404 page) and scroll to the "Recent incidents" section. Click any incident — the chevron arrow on the right should rotate and the full incident details should expand.
3. On the status page, find the "Get status updates" newsletter form. Click **Subscribe** with the email field empty — a red error box appears under the field. Type "abc" and try again — you should see "Please enter a valid email address". Type a proper email and the subscription should succeed.
4. Press Tab from the address bar — the GitHub logo at the top should show a visible outline when focused.
