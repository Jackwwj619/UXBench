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

- The progress sidebar on the left now highlights the **right** section as you move through the form. Previously the "Email address" step lit up under "Your photo"; it now correctly lives under "Contact and delivery".
- When you reload the page after starting the form, a clear banner appears at the top telling you "We've saved your answers from your last session" with a **Start again** button to wipe the saved progress.
- Error messages now clear themselves as soon as you fix the field. The red outline, the inline error, and the matching item in the error summary at the top all disappear the moment you start typing the correct answer.
- After moving to the next step the page now jumps cleanly back to the top, so you can read the new step from its heading.
- A short explanation has been added on the "New passport" step explaining why a few extra eligibility questions are asked.
- The "Apply for another passport service" page now states up front that all the related links route to the same demo form, so you're not surprised when they don't open separate flows.
- Header links, breadcrumbs, footer links, error-summary links, cookie banner buttons, and form controls have been resized to comfortable tap targets for phones.

## How to test the changes

Open `index.html` in any modern browser.

- Click **Start now**, pick an application type, and click through a few steps. Watch the section labels on the left — the highlighted section should match the step you are on (especially when you reach the "Email address" step, which should highlight "Contact and delivery").
- Fill in a step, click **Save and continue**, then refresh the page in your browser. A grey banner at the top should say your answers were restored. Click **Start again** in the banner to wipe the form.
- On any step, leave a required field empty or invalid and click **Save and continue**. When the red error appears, start typing into that field — the red outline, inline message, and the entry in the error summary should all vanish as soon as you fix it.
- Move from one step to the next and notice the page scrolls back to the top automatically.
- Shrink the window narrow (phone width) and tap around — buttons, links, and radio choices should all feel large enough to use with a thumb.
