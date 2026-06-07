# GOV.UK Passport Clone

A practice clone of a GOV.UK-style passport application form — the kind of long, multi-step form a UK citizen would fill out to apply for, renew, or replace a passport. Everything lives in a single page, but moves you through one step at a time in the GOV.UK Design System style.

> Front-end demo only — applications go nowhere, and the flow stops before payment.

## What you can do

- **Read what you need before you start.** The opening page explains eligibility, fees, and what materials to have ready.
- **Walk through the application.** Pick the application type (new / renew / replace), then enter your personal information, address, previous passport details, and upload a photo. Each step is its own section with hint text below the labels.
- **See errors clearly when you slip up.** Invalid fields show inline error messages, and a summary at the top of the page lists everything that needs fixing.
- **Save where you are and come back.** Your progress is saved in your browser so you can leave and resume without losing what you've entered.
- **Review before "submitting".** A review step lets you check every section before the form would normally hand you off to payment — the demo stops there.

## How to use it

Open `index.html` in any modern browser. Click **Start** and follow the steps in order. The left/top step indicator shows where you are; use **Save and continue** to move forward or **Cancel** to back out.

## What was changed in this version

- The four "Related content" links on the start page ("Renew an adult passport", "Apply for a child passport", "Report a lost or stolen passport", "Passport fees") now open real information pages instead of jumping straight to the application form.
- The "Help", "Privacy", and "Accessibility statement" links in the footer, the "Help" link in the top nav, and the "feedback" link in the beta banner now go to dedicated Help, Accessibility, and Feedback pages — they used to all land back on the start screen.
- The "Demo result" link in the top nav was replaced by a clearer "Help" link.
- The "Is this page useful? Yes / No" feedback strip now takes you to the feedback page (with your vote in the link) instead of bouncing back to the home page.
- When you click "Back" inside the application, the answers you typed on the current step are saved before you go back, so you don't lose work.
- As soon as you fix a field that had an error (start typing or pick the right option), the red error message under the field and its entry in the error summary at the top both disappear right away, instead of waiting for you to press Continue again.
- Every time you move to a new step or page, the view jumps to the top, so you don't have to scroll up to see the heading or any errors.
- Buttons, links in the header and footer, breadcrumb links, radio buttons, checkboxes, and form fields are all bigger and easier to tap, especially on phones.

## How to test the changes

1. Open `index.html`. On the right of the start page, click each "Related content" link in turn ("Renew an adult passport", "Apply for a child passport", "Report a lost or stolen passport", "Passport fees") — each should open its own information page with a heading and explanation, not jump into the form.
2. Scroll to the very bottom and click "Help", "Privacy", and "Accessibility statement" in the footer — they should open the Help and Accessibility pages, not return you to the home page. Click "Help" in the top nav too.
3. At the top of the page, in the grey beta banner, click "feedback" — you should land on the Give Feedback page. Then go back to the home page and at the bottom click "Yes" or "No" under "Is this page useful?" — same Feedback page should open.
4. Click "Start now" to begin the application. Move forward a couple of steps so you have something to lose. Type some answers, then click "Back" — when you reach the previous step and then come forward again, your earlier answers should still be filled in.
5. Click "Save and continue" without filling in a required field — you'll see the red error summary at the top and red error messages under the empty fields. Now start typing in one of the bad fields (or pick a radio option) — the red error under that field and its line in the summary at the top should disappear immediately.
6. Each time you click "Save and continue" or "Back", or you open one of the new info pages, the page should scroll to the top automatically.
7. On a phone-sized window, tap buttons, radio buttons, checkboxes, header links, and footer links — they should all be comfortably tappable with no fiddly small targets.
