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

- The GitHub logo at the top left now sits in a bigger, easier-to-click area with a visible "Home" label, lights up when you hover it, and shows a clear blue outline when you tab to it with the keyboard.
- The top navigation links are now taller and easier to tap, the current page is highlighted with a darker background, and tabbing to any link shows a clear focus outline.
- On the Support page, the contact form now shows red error messages directly under any field you forgot to fill in, plus a red summary box at the top listing all the missing fields, and the cursor jumps straight to the first one needing attention.
- The Support contact form also checks that the email address contains "@" and "." and shows "Please enter a valid email address" if not.
- The red error highlight on each field clears the moment you start typing or pick an option, so you can see your fix is recognised.
- The FAQ accordion now opens and closes more reliably, the open question is highlighted in blue, and keyboard users can tab to a question and read it cleanly with screen readers (proper open/closed announcements).
- Past-incident rows on the Status page now show a small chevron arrow that flips when the row is open, and the open row is highlighted blue so you can see at a glance which one you've expanded.
- On a phone-sized screen the "Home" label next to the GitHub logo hides itself to save space, but the logo itself stays comfortably tappable.

## How to test the changes

1. Open `index.html` in any modern browser.
2. Hover the GitHub logo at the top left — you should see a subtle background appear and the word "Home" next to it. Tab to it with the keyboard and a blue outline should appear.
3. Click any of the top nav links (Home, Search, Status, Support) — the current page should now show with a dark highlighted background. Tab between them and a blue outline should appear on each.
4. Open the **Support** page from the recovery links, scroll to the contact form, leave everything blank, and click **Submit Request**. A red summary banner should appear at the top listing the missing fields, each empty field's label should turn red with an error line beneath it, and the cursor should jump straight to the first missing field.
5. Type a clearly invalid email like `abc` and submit again — the email field should show "Please enter a valid email address."
6. Start typing into a field that was marked red — the red highlight should clear as soon as you have something in it.
7. Open the **FAQ** section on the Support page, click a question — it should open with a blue highlight and the chevron should flip. Click it again to close.
8. Open the **Status** page, click any past-incident row — it should expand, the row should turn blue, and a small arrow on the right should rotate. Tab to a row and press Enter or Space — same thing should happen.
9. Resize to a phone width — the "Home" label next to the GitHub logo should disappear but the logo should remain comfortably large to tap.
