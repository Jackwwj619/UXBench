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
