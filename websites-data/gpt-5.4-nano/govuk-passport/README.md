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

- Clicking a link in the error summary at the top of a step (for example "Enter your last name") now takes you straight to the right field — including date-of-birth boxes split into day/month/year — instead of doing nothing or scrolling somewhere unhelpful.
- As soon as you fix a problem in a field, the matching red error message and the line in the summary at the top disappear, so you can see your progress in real time.
- Links in the page footer (Benefits, Departments, Help, Privacy, Accessibility statement, etc.) no longer dump you back to the start page and wipe your work. Instead, while you're filling in the application, they show a polite black banner at the bottom that says the page isn't available in this demo and your progress has been kept.
- The banner can be dismissed with its own button and also fades away on its own after a few seconds.
- On phone-size screens, every button, link, radio option, and checkbox is now big enough to tap comfortably, and the radio dots and tick boxes themselves are larger and easier to hit.

## How to test the changes

1. Open `index.html` and click **Start application**. Move to the personal-details step, leave a couple of required fields blank (and try entering a clearly wrong date of birth like 99 / 99 / 9999), then click **Save and continue**. A red error summary appears at the top — click one of the error links and the matching field is focused and scrolled into view.
2. While red errors are still showing, type a valid value into one of the fields and click out (or move to the next field). The red message underneath the field and the matching line in the top summary both disappear straight away.
3. From any step in the application, scroll to the footer and click **Privacy** or **Accessibility statement**. A black banner slides in at the bottom saying the page isn't available in this demo and your progress was kept. Click **Dismiss** to close it, or wait a few seconds and it closes on its own. Scroll back up — your form is exactly as you left it.
4. Resize the browser to phone width and try the radio buttons on the "What do you need?" step, the checkboxes on the photo step, and the green **Save and continue** button — each one has a comfortable tap area.
