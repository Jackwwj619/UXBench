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

- The landing page now shows a "You have an application in progress" banner when you've already started filling things in, and the main button changes from "Start application" to "Resume application".
- The ID verification step starts with a small checklist that tracks what's left to do: front ID uploaded, back ID uploaded (optional), and liveness selfie complete. Items tick off as you finish them.
- The back-of-ID upload is now clearly marked "optional", so you no longer feel forced to upload both sides.
- The liveness selfie no longer ends abruptly — after the 3-2-1 countdown you briefly see a "Selfie captured — verifying…" message inside the popup before it closes, and the button changes to "Retake selfie" once you're verified.
- Error messages on the eligibility checkboxes are now specific (e.g. "Confirm you are a US resident") instead of a generic "This must be checked".
- The error summary at the top of each step is now clickable: clicking a link scrolls to and highlights the exact field, and fields turn briefly green once you fix them so corrections register visually.
- Clicking the Solstice Bank logo in the top bar while you have unsaved progress now opens a small "Leave the application?" dialog instead of silently navigating away.
- On the confirmation page, the "App Store" and "Google Play" badges are now real clickable links and a small note clarifies that downloads will be available after approval.
- Checkboxes, radio options, file pickers, the liveness button, and the step navigation buttons are all noticeably larger and easier to tap on phones, and option rows now stack into one column on small screens.

## How to test the changes

1. Open `apply.html`, fill in a few fields on step 1 or 2, then go back to `index.html` — a soft orange "You have an application in progress" banner appears at the top and the big "Start application" button now reads "Resume application".
2. On step 5 (Identity verification), look just under the heading: a checklist with three items appears. Pick a photo for "Front of ID" and the first item ticks off.
3. Notice the "Back of ID" label now says "(optional)" so you can safely skip it.
4. Click "Start liveness check" — after the countdown, a "Selfie captured — verifying…" line appears briefly before the dialog closes, and the button changes to "Retake selfie".
5. On step 1, click Continue without ticking the eligibility boxes — the error summary lists specific reasons like "Confirm you are 18 years or older" rather than "This must be checked".
6. Click any item in the red error summary at the top — the page scrolls to the field, focuses it, and the field briefly flashes orange. Fix the field and watch it turn briefly green.
7. While mid-application, click the "Solstice Bank" logo in the top bar — a "Leave the application?" dialog appears with Stay/Leave buttons.
8. Submit the application and look at the confirmation page — "App Store" and "Google Play" are now clickable, with a small note that downloads come after approval.
9. Resize the browser to phone width and walk through the steps — checkboxes, radio buttons, file pickers, and the bottom navigation buttons are all bigger and easier to tap.
