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

- Fields now correct themselves as you type. As soon as you finish typing a valid email, phone, date, or zip, the red error message under the field disappears and a soft green check appears in the corner — you no longer have to click Next again to know you fixed it.
- The error summary at the top of each step now updates live too. As you fix problems, the bullet points in the summary disappear one by one, and the whole summary hides itself once everything is valid.
- The floating **Help** drawer in the bottom-right is much easier to close. You can now click anywhere outside it or press the **Esc** key to dismiss it, instead of having to aim at the small X.
- The Help drawer's close button itself is now a large, comfortable target with a hover highlight, and it no longer overlaps the drawer title.
- Buttons (Continue, Back, Save & continue later, Cancel) and the small numbered step circles at the top are all noticeably bigger, so they're easier to tap on a phone and easier to click on a laptop trackpad.
- On phones, the action row at the bottom of each step now wraps neatly instead of squashing the buttons together, and the "Saved" indicator drops onto its own line so nothing gets cut off.
- The top navigation bar is taller and the "Save & continue later" / "Cancel" links now have a subtle hover background, so it's clearer they're clickable.

## How to test the changes

1. Open `index.html` and click **Apply**.
2. On step 2 (Personal info), click into the email field, type something invalid like `abc`, then move to the next field — you'll see a red error. Now go back and finish typing a valid address like `abc@test.com`; the red error disappears on its own and a small green check appears.
3. Still on step 2, click **Continue** with several fields empty. You'll see the error summary at the top listing each problem. Start filling the fields in correctly — the bullets in the summary vanish one by one, and the summary itself disappears once you've fixed everything.
4. Click the round **?** Help button in the bottom-right corner to open the Help drawer. Try closing it three different ways: click the X, click anywhere outside the drawer, and press the **Esc** key. All three should work.
5. Resize your browser window to phone width (or open the page on a phone). The Continue/Back buttons should stretch to fill the row neatly, and the "Saved" text should sit on its own line rather than being clipped.
6. Hover the **Save & continue later** and **Cancel** links at the top right — they now show a light background to confirm they're clickable.
