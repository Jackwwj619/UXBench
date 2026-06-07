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

- The links in the "There is a problem" error summary now actually take you to the right field. Previously they pointed at element IDs that didn't exist (like date-of-birth, which is split into separate day/month/year inputs); now clicking an error jumps to the correct input and gives it focus.
- Each new step now scrolls back to the top of the page, so you don't land halfway down a long form after pressing **Save and continue**.
- The photo-upload step is no longer a dead end. If you don't have a demo image handy, you can tick a "skip the upload step" checkbox to move on — the form makes it clear this is a demo bypass.
- The progress indicator was repaired so each step lives in its sensible stage. "Parents' details" and "Email" now sit under **Check eligibility** rather than being scattered across photo and personal-details sections.
- On a phone-width window the progress panel now sits above the form as a compact horizontal strip showing the current stage, instead of pushing the start of the form off-screen.
- Radio buttons and checkboxes have larger 44px tap targets on a phone, so it's easier to pick "New / Renew / Replace" or tick a confirmation box with a thumb.
- Footer and breadcrumb links also gained comfortable tap padding on small screens.

## How to test the changes

1. Open `index.html`, click **Start**, and on any step submit the form without filling required fields. In the red "There is a problem" summary at the top, click any link — the page scrolls to that field and focuses it (previously many links were dead).
2. Move through several steps using **Save and continue** — each new step lands at the top of the page.
3. On the photo step, tick the new "I confirm this is a demo photo and want to skip the upload step" checkbox and continue without picking a file. Validation passes.
4. Watch the progress indicator as you advance — "Parents' details" and "Email" now appear under the **Check eligibility** stage rather than mixed in with later stages.
5. Shrink the window to phone width. The progress indicator collapses into a compact strip at the top of the form, and the **New / Renew / Replace** radio buttons each have a generous tap area.
