# Solstice Bank

Solstice Bank is a demo account-opening flow for a fictional digital bank targeting freelancers. It's a long, eight-step form covering everything a U.S. bank would normally ask for — identity verification, employment, risk questions, funding — and ends with a confirmation screen.

> Fictional product — nothing you enter is sent anywhere, and the funding step uses a mock bank-link flow.

## What you can do

- **Read the pitch.** The landing page has a hero with two decorative cards, three value props, a "Materials to prepare" checklist, and a top CTA to start applying.
- **Open an account in 8 steps.**
  1. Eligibility and terms.
  2. Personal info (name, DOB, masked SSN).
  3. Contact and U.S. address.
  4. Employment and income (with freelance / self-employed options).
  5. ID verification (front and back photo upload, plus a modal liveness check with a 3-2-1 countdown).
  6. Risk questionnaire (five questions; you'll see a soft warning if your answers seem inconsistent with your income).
  7. Funding choice (link an external bank via mock OAuth, mail a check, or fund later).
  8. Review — every section has an **Edit** button to jump back.
- **Save where you are.** A progress bar and step dots at the top track where you are; completed steps are clickable to revisit, unfinished ones are locked. Save & continue later, and Cancel asks for confirmation.
- **Get help when you need it.** A floating Help drawer in the bottom-right has copy that changes for each step.
- **See the confirmation.** An animated checkmark, a random application number like `SOL-2026-XXXX-XX`, next-steps explanation, and App Store / Play placeholders.

## How to use it

Open `index.html` in any modern browser. Click **Apply** to start the eight-step flow. Inputs auto-format as you type (phone, SSN, DOB, currency); errors show inline and roll up into an error summary at the top. Your progress is saved in your browser between visits.

## What was changed in this version

- Field errors now clear as soon as you start fixing them. Typing in a previously-red input, picking a missing radio option, or selecting a missing dropdown immediately removes its inline error, drops the matching entry from the error summary at the top, and hides the summary when nothing is wrong.
- The Social Security Number field now masks what you type as a password, so your SSN isn't shown in plain text on screen while you fill the form.
- The back-of-ID photo is now required on the ID verification step, matching the front-of-ID requirement. Skipping it now produces a real error instead of silently letting you continue.
- The Help drawer's close button is now a real 44px tappable target placed inside the drawer, rather than a tiny "x" overlapping the drawer's heading. The Help button itself was also enlarged.
- The 8-step form is now usable on a phone. The Back / Continue action row sticks to the bottom of the viewport, the buttons hit 48px, the checkbox controls on the eligibility step grow to 22px, and the floating Help button moves out of the way so it no longer covers the form action buttons.
- Primary, secondary, danger, and top-bar link buttons all meet the 44px tap-target standard across the flow, including the dialog buttons inside the liveness, save-later, and cancel confirmation modals.
- Error-summary links are now padded so they don't all stack on one line and are easier to tap; focused fields scroll to a comfortable position below the sticky progress bar instead of being hidden beneath it.

## How to test the changes

1. Open `apply.html`. Without filling step 2 in, click **Continue** — empty fields turn red and a "Please fix" summary appears at the top. Type a single character into any erroring field and watch its red state and the matching summary line disappear immediately. The summary also disappears entirely once every field is fixed.
2. On step 2, type into the "Social Security Number" field — each digit appears as a dot rather than as the actual numbers.
3. On step 5, upload only the front of your ID and press **Continue** — the back-of-ID box now shows a required-field error too. Upload a back photo and the error clears.
4. Click the floating Help button in the bottom-right of any step, then close it with the X — the close button is a comfortable round 44px target inside the drawer instead of a tiny offset glyph.
5. Shrink the window to phone width (or open the page on a phone). The Back / Continue buttons stay pinned at the bottom of the viewport as you scroll the form; the Help button moves below the top bar so it doesn't cover the actions; checkboxes and radio rows are easy to tap.
6. Trigger the error summary at the top (leave step 2 blank and press Continue), then click any link inside the red box — each link is padded and easy to tap.
