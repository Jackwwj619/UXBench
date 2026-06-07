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

- The top navigation, footer, breadcrumbs, and "Related content" sidebar no longer pretend to link to real GOV.UK pages. Instead they show short notes explaining that this is a local prototype and point at the real gov.uk site for actual information.
- A small note under the cookie banner now makes clear that no cookies are actually set, and the banner no longer offers a "View cookies" link that went nowhere.
- A blue caption appears above each question summarising the path you've picked so far (for example "Adult applicant • Applying from the UK • Renewal or replacement"), so it's easy to remember what you're answering.
- Each branching question (UK or overseas, adult or child, previous passport, etc.) now shows a one-line preview underneath telling you what the next step will be based on the option you pick.
- The "Application progress" sidebar adds a sub-label under the current step when you're inside a branch (for example "Overseas application route" or "Child passport history") and shows every step as completed on the final confirmation screen.
- Required-field errors now disappear on their own as soon as you fill the field in, instead of waiting until you press Continue again. The matching item is also removed from the error summary at the top.
- Pressing the "Clear" link now asks you to confirm before wiping your answers, and after clearing you see a green "Demo data cleared" banner on the start page.
- The "Is this page useful? Yes / No" feedback strip at the bottom of the start page now responds when clicked, with a "Thanks for the feedback" acknowledgement.
- Buttons, links, radio buttons, and checkboxes are noticeably bigger on phone-sized screens so they're easier to tap accurately.

## How to test the changes

1. Open `index.html`. Look at the top navigation and footer — instead of generic GOV.UK section links you'll see "Demo home", "Restart demo", and a paragraph explaining that real links have been removed.
2. Click **Accept analytics cookies** on the cookie banner — the confirmation no longer offers a broken "Change your cookie settings" link, and a small note underneath confirms no cookies are set.
3. Click **Start now**, choose any application type, and continue. Above each new question you'll see a blue caption summarising what you've picked so far.
4. On a question with several options (for example "Are you applying from the UK or overseas?"), click the radio buttons one at a time — a short sentence underneath the choices changes to preview what comes next.
5. Continue past a couple of steps, then look at the "Application progress" panel — the current step now has a small sub-label describing the branch you're in.
6. On any form step, press **Save and continue** with a required field blank, then start typing into that field — the red highlight and error message clear themselves, and the entry also disappears from the error summary at the top.
7. Click the **Clear** link at the bottom of any step. You'll be asked to confirm before your demo answers are wiped, and the start page then shows a green "Demo data cleared" banner.
8. On the start page, scroll to the bottom and click **Yes** or **No** under "Is this prototype page useful?" — a "Thanks for the feedback" message appears.
9. Shrink the browser to phone width — buttons, navigation links, radio circles, and checkboxes are larger so they're comfortable to tap.
