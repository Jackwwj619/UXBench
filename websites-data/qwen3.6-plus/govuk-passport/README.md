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

- **Errors disappear as soon as you fix them.** Once you fill in a field that was flagged red, the inline error message, the red border, and that field's entry in the top summary all clear immediately — you no longer have to press "Save and continue" again just to confirm.
- **A clearer "where am I" line on phones.** On narrow screens the long sidebar progress list collapses into a single tidy line at the top reading, for example, "Step 3 of 7: Your address", so you always know how far through you are without scrolling past the whole list.
- **Easier to click error-summary links.** The clickable items in the red error summary at the top of the page now have a larger, more finger-friendly hit area, making them easier to tap on a phone.
- **Bigger buttons, radio buttons, and checkboxes.** The green Start / Save and continue button is taller, and the round radio buttons and square checkboxes are slightly larger with more breathing room, so they're easier to tap accurately on a touchscreen.
- **Clicking an error summary link for the photo step now opens the file picker.** If you forget to attach your photo and click that link in the red summary, the browser's file-chooser opens directly instead of just scrolling to the field.

## How to test the changes

1. Open `index.html`, click **Start**, choose an application type, and on the personal-info step press **Save and continue** without filling anything in. A red summary appears at the top and red errors appear under each field.
2. Now type a value into one of the red-flagged fields (for example, your first name). The red border, the inline error, and that field's entry in the top summary should vanish straight away.
3. Shrink the browser window to phone width. The step list on the left should collapse into a single line at the top such as "Step 2 of 7: Your details". Widen the window again and the full list returns.
4. On the photo-upload step, click **Save and continue** without selecting a photo, then click the photo entry in the red summary at the top — the file-picker dialog should open.
5. Try tapping the Start button, a radio option, and a checkbox at phone size — they should all be comfortably large to hit.
