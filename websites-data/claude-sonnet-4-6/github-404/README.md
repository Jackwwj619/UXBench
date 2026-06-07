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

- The GitHub logo at the top now has a proper "GitHub home" label and a bigger, easier click area.
- On the search results page, if you change the search box and don't press **Search** again, the old results dim and a yellow banner reminds you to press **Search** to update — so it's obvious the list isn't matching what you've typed.
- Searching for "404", "500", "not found", and similar error terms now shows a helpful tip pointing you toward the Support FAQ and GitHub Status pages.
- The Support contact form prevents double-clicks: once you submit it, the button shows "Submitted" and gently turns it off, and focus jumps to the success message.
- The status-page email subscribe form now lets you **Change email** or **Unsubscribe** after subscribing, instead of stranding you with a locked-out form.
- Incident accordions on the status page open and close more reliably (keyboard users can press Enter or Space on any incident).
- Buttons, links, and inputs are sized to be comfortable to tap on a phone.

## How to test the changes

Open `index.html` in any modern browser.

- Hover the GitHub logo at the top-left and notice it lights up; tab to it and you should see a clear focus outline.
- Click **Search GitHub** from the recovery links, run a search, then type something new in the box without clicking Search again — the previous results should fade and a banner should appear telling you to press Search.
- In the search box, try searching for "404 error" — a yellow tip should suggest the Support FAQ and Status pages.
- Open the **Contact support** page from the bottom links, fill the form, and click Submit twice in a row — only one submission should be accepted and the button should clearly disable.
- Open the **Status** page, scroll to the subscribe box, enter an email, and subscribe — then click **Change email** or **Unsubscribe** below the confirmation to confirm they work.
- On the Status page, click any "Past incident" row to expand it, or tab to it and press Enter.
