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

- Submitting the Contact Support form with empty fields no longer just flashes a red button — each missing field is now highlighted in red with a clear message right under it ("Please enter your email address.", "Please select a topic.", etc.).
- The email box on the support form now also catches typos like "alice@" and tells you to enter a valid address.
- After a failed submit, the cursor automatically jumps to the first field that needs fixing, so you don't have to hunt for it.
- The status-page email signup box now has a proper (invisible to sighted users) label, so screen readers announce what the box is for.
- The GitHub logo in the top-left now announces itself as "GitHub Homepage" to screen readers, and the logo's decorative icon is skipped by screen readers instead of being read aloud as raw SVG markup.
- Buttons, navigation links, search tabs, and the "Did you mean…" suggestion links throughout the page are bigger and easier to tap on a phone.

## How to test the changes

1. Open `index.html`, click the "contact support" link in the body of the 404 page to open the support form.
2. With every field blank, click "Submit Request" — you should see three separate red messages appear beneath the Email, Topic, and Message fields, and the boxes themselves should turn red. The page should also jump focus to the Email field.
3. Type "alice@" into the email box and try submitting again — you should see "Please enter a valid email address." instead of the form being accepted.
4. Open `index.html` on a narrow window or phone view and try tapping the top navigation links, the search tabs, and the "Did you mean…" suggestions under the 404 — each should feel comfortably large.
5. Navigate to the Status page from the footer/contact links and inspect the "Subscribe to updates" email box with a screen reader (or your browser's accessibility inspector) — it should announce "Email address for status updates."
