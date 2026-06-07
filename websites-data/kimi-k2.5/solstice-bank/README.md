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

- The ID verification step (step 5) now actually checks that you've uploaded the front of your ID. Clicking **Continue** with no photo attached shows a red "Please upload the front of id" error in the page's error summary, instead of letting you skip the step.
- The two photo upload boxes now show a friendly "Click to choose a photo (JPG/PNG)" hint so it's clear what to do, and the boxes glow in your brand color when you hover them.
- Once you pick a photo, the red error and the matching entry in the top error summary disappear right away — no need to re-click Continue.
- The top navigation bar (Solstice logo, Save & continue later) is now bigger and easier to tap, with hover highlighting and clear keyboard focus outlines.
- Dropdown menus and text inputs briefly flash a green outline right after you change them, giving a small "got it" confirmation as you fill in the form.
- The links inside the error summary at the top are now bigger tap targets, so it's easier to jump to a missing field on a phone.

## How to test the changes

1. Open `index.html` and click **Apply**. Click through the first four steps with valid data to reach step 5 (ID verification).
2. On step 5, click **Continue** without choosing any photos. A red error summary should appear at the top listing "Please upload the front of id".
3. Click the "Front of ID" upload box and choose any image file. The "front of id" error should disappear from the summary right away (the summary stays visible if other fields are still missing).
4. Hover the "Back of ID" upload box — its dashed border should change colour to the brand blue and the background should shift slightly.
5. Go back to step 2 (Personal info) and change any dropdown or fill in any field — you should see a brief green outline flash on the input after you change it.
6. Hover or tap **Save & continue later** at the top — it should highlight clearly. Try keyboard-tabbing onto it from another control — it should show a thick focus outline.
