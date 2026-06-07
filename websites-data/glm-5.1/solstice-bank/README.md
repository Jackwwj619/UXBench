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

- Step 1 (Eligibility) is shorter: the three separate "I am a US resident", "I am 18+", and "I consent to identity verification" boxes are now combined into a single confirmation checkbox.
- Checkboxes and radio buttons on every step are now displayed as full-width tappable cards with clear borders, and the selected option is highlighted in light blue so you can see your choice at a glance.
- Dropdowns (like state and employment type) show a chevron arrow and visually update once you make a selection, so it's clearer when a value is picked.
- All buttons across the flow are taller and easier to tap on a phone, including the "Save & continue later" and "Cancel" text links.
- The floating Help button in the bottom-right is bigger and its close ("X") button is now a clear round button instead of a small character, making the drawer easier to dismiss.
- The error summary at the top of each step has more breathing room between items, and each error link is a comfortably tappable target.
- Action buttons at the bottom of each step now wrap onto a second line on narrow screens instead of overflowing horizontally.

## How to test the changes

1. Open `index.html` and click **Apply** to reach `apply.html`. On Step 1 you should see only two checkboxes: one combined eligibility statement and one Terms of Service agreement.
2. Tick a checkbox — the whole row should highlight in light blue with a darker border. Try the same on radio buttons (for example on the employment step).
3. On Step 4 (Employment), click the employment-type dropdown and pick an option — the field should visibly update with a chevron and stronger styling.
4. Shrink the browser to phone width and walk through any step. The bottom action buttons (Back / Save & continue later / Continue) should wrap onto multiple lines instead of overflowing.
5. Click the floating "?" Help button in the bottom-right — it should be noticeably larger. Then click the round X in its top-right corner to close it.
6. Try clicking Continue on Step 2 without filling anything — the error summary at the top should appear with each error as a comfortably sized link you can tap.
