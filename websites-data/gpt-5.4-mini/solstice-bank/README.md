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

- The top-nav links "Why Solstice", "Pricing", and "Help" on the landing page now actually jump to the matching sections instead of going nowhere when clicked.
- Radio choices (Rent / Own / Other for residence, the international-wires question, the crypto question) now look like proper selectable cards with a border and a highlighted "checked" state, instead of plain dots in a row.
- After you submit a step with mistakes, the red error summary at the top is now clickable in a friendlier way: clicking any error scrolls that field into the center of the screen, focuses it, and gives it a brief orange pulse so you can't miss it.
- Errors clear themselves as you fix them. Type a valid email and the inline "Enter a valid email" message disappears immediately, instead of waiting for the next submit.
- The "Save & continue later" button now reads "Save & email a resume link", and the popup it opens explains that your progress is already saved on this device and that the email is just for switching devices.
- All buttons, checkboxes, and radio cards across the apply flow are bigger and easier to tap (at least 44 pixels tall), and the page now scrolls with extra top padding so anchored fields aren't hidden behind the sticky header.
- On a phone, the Back / Continue / Save row wraps neatly instead of squishing, the radio cards stretch to full width, and the side margins are tighter so nothing overflows.

## How to test the changes

1. Open `index.html` and click "Why Solstice" in the top nav — the page should scroll down to the three value-prop cards. Try "Pricing" and "Help" too.
2. Click **Open an account** to start the application. On step 3 (Contact & Address), look at the Residence type row — Rent / Own / Other should now be bordered cards. Click one and it should highlight with an orange border and tinted background.
3. On step 2 (Personal info), click Continue without filling anything. A red error summary appears at the top. Click any error link in that summary — the matching field should smoothly scroll to the middle of the screen, gain focus, and pulse orange briefly.
4. Type a clearly bad email like "bob@" — you get an inline error. Now finish the email properly; the inline error should vanish right away without needing to click Continue.
5. On step 6 (Risk questionnaire), the "international wires" and "crypto exchange" answers should also display as bordered cards.
6. Click the top-right "Save & email a resume link" button — the dialog now explains progress is saved on this device and the email is only needed for resuming elsewhere.
7. Resize your browser to phone width. The bottom Back / Continue buttons should wrap to a second row, radio cards should stack to full width, and tapping any of them should still feel comfortable.
