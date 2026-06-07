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

- When you pick "Apply for a child" as the application type, there is now an extra "About the child" step asking for the child's name, date of birth, your relationship to them, and a tick to confirm a parent or guardian has given consent.
- The questions about a previous passport now use "the child" wording when you're applying for a child, instead of always saying "the applicant".
- The review step's "What you will need" list now reminds you about the child's birth certificate and written consent when applying for a child.
- The photo upload step now has a "Choose a demo photo file" button that pretends to attach a sample photo, complete with a green confirmation tick — useful because real file pickers don't work in a local demo.
- The "Accessibility statement" link in the footer now opens a real page explaining how this prototype handles accessibility, instead of jumping back to the start page.
- Radio buttons and tick boxes now have a soft grey hover highlight, and the chosen option turns blue with bolder text so it's easier to see what you've selected.
- Buttons, footer links, breadcrumb links, header navigation links, and the "Cancel" link are all bigger and easier to tap on phones.
- The radio and checkbox circles/squares are larger and have a bit more spacing around them so they're easier to hit accurately.

## How to test the changes

1. Open `index.html`, click **Start** and step through to the "Who is the application for?" question. Choose **Apply for a child** and continue — a new "About the child" step should appear asking for the child's details and a consent tick.
2. On the same child journey, continue to the previous-passport question — the wording should ask about "the child" rather than "the applicant".
3. Complete the form to the review step (Check your answers / What you will need) — the list should now mention the child's birth certificate and written consent.
4. On the photo upload step, click the new "Choose a demo photo file" button. A green tick and "Demo photo attached" message should appear, and the field should no longer show an error if it had one.
5. Scroll to the very bottom of any page and click the "Accessibility statement" link in the footer — it should open a full accessibility statement page instead of jumping back to the start.
6. On any step with radio buttons or checkboxes, hover the options — they should highlight grey. Pick one — it should turn blue with bold text.
7. Shrink the browser to phone width and try tapping the header navigation, footer links, and the radio buttons — they should all feel comfortably large under your finger.
