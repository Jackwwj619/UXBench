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

- The Social Security Number field is now masked by default (shown as dots) with a **Show / Hide** button so it's safer if someone is glancing at your screen.
- The ID upload step now has clearer "Tap to take a photo or upload an image" prompts with a camera icon, and on phones it can open the camera directly.
- Error messages are much more helpful — instead of generic "This must be checked", they now say things like "Confirm you are 18 or older" or "SSN must be 9 digits in the format XXX-XX-XXXX". The error summary at the top is now styled as a clickable list that jumps you to the offending field.
- The Privacy Notice on step 1 is now highlighted as "required reading" with a soft warning colour and a "(4 min)" read-time, so it's harder to skip past.
- The liveness-check status no longer looks blank before you start — it now says "Not started" in grey, then turns green "✓ Verified" once you complete it.
- The Help drawer in the bottom-right now has a proper dim background behind it, closes when you click outside or press **Esc**, and properly moves keyboard focus.
- Buttons and tappable areas (checkboxes, radio choices, Save & continue later, Cancel, primary actions) are all bigger and easier to hit on phones.
- A side-scroll bug on small screens is fixed, so the page no longer drifts horizontally.

## How to test the changes

Open `index.html` and click **Apply** to start. On step 1, notice the highlighted Privacy Notice. On step 2, the **Social Security Number** field is hidden by dots — click **Show** to reveal it. On step 5, try the new camera-style upload tiles and click **Start liveness check** to see the "Not started" → "✓ Verified" status. On any step, click **Next** with required fields empty to see the new clearer error messages and the clickable error list at the top. Click the floating **Help** button in the bottom-right corner, then click outside the drawer or press **Esc** to close it. Try resizing your browser window narrow (or open on a phone) — the form should fit without horizontal scrolling.
