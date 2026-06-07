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

- **Clear demo notice.** A small information banner now appears above the support area letting visitors know the results shown are demo examples, not live GitHub data.
- **Bigger tap targets.** Navigation links, the subscribe email field, the Subscribe button, and the logo all have larger, more comfortable hit areas so they're easier to tap on a phone.
- **Help cards behave like real buttons.** The four "support topic" cards can now be opened with the Enter or Space key as well as a mouse click, and the card you picked stays visually highlighted so you can tell which topic was selected.
- **Smarter email validation when subscribing to status updates.** Empty addresses and obvious typos (like `alice@` or missing a dot) now show a friendly red error message right under the field, instead of silently doing nothing.
- **Focus jumps to the right place.** After picking a support topic, the page scrolls to the contact form and puts your cursor straight into the email box, so you can start typing right away.
- **Better screen-reader labels.** The GitHub logo and the support cards now announce themselves clearly to assistive technology.

## How to test the changes

1. Open `index.html` and scroll to the "Browse help topics" / support area — you should see a blue-bordered note saying the results are for demonstration only.
2. Click any of the four support topic cards (Account, Pages, Repositories, Security). The page should scroll smoothly to the contact form, the email field should be focused, and the card you clicked should stay highlighted with a blue outline.
3. Try opening a support card using only the keyboard: Tab to it, then press Enter or Space — it should behave the same as a click.
4. Scroll to the "Subscribe to status updates" box. Click Subscribe with the email field empty — a red error message should appear under the field. Type something like `alice@` and try again — you should see a clearer "valid email" error.
5. Type a proper address like `you@example.com` and press Subscribe — the success message appears and the button changes to "Subscribed".
6. Shrink the browser to phone width and try tapping the navigation links and the Subscribe button — the tap areas should feel comfortably large.
