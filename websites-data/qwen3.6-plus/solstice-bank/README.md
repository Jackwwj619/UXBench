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

- **The eligibility step now tells you what's left.** As you tick the agreement boxes on step 1, a small message appears showing how many items are still unchecked, and any unchecked rows get a soft yellow highlight so they're easy to spot.
- **The ID-upload boxes are now proper tap targets.** Each upload area is a tall card with a clear blue "Tap to choose file" button; once a photo is attached, the button turns green and says "Replace file" so you know it worked.
- **Missing-ID photos are caught at submit.** If you try to continue from the ID step without attaching both photos, you now see a friendly inline message telling you which photo is still needed, instead of the form silently letting you through.
- **The ID step now clearly says you need both an upload AND the liveness check.** The instructions at the top of step 5 spell out that both are required, so people don't skip the camera step.
- **Error summary links jump you to the right place.** When the page shows the "please fix these fields" summary at the top, clicking a link smoothly scrolls the matching field into view and focuses it, even for the photo upload tiles.
- **Bigger buttons throughout.** Primary, secondary, and danger buttons are taller and easier to tap, especially on phones.
- **Buttons wrap nicely on small screens.** On narrow phones the "Back / Save / Continue" row at the bottom of each step wraps gracefully, with each button getting a fair share of the width.
- **Bigger tick boxes on the eligibility list.** The agreement checkboxes are now larger with more room around them, and the whole row is tappable.

## How to test the changes

1. Open `index.html`, click **Apply**, and on step 1 tick just one of the three agreement boxes. A yellow hint should appear underneath the list telling you how many items are still needed, and the unchecked rows should look softly highlighted.
2. Tick all the boxes and continue through to step 5 (ID verification). Read the lead paragraph — it should explicitly tell you both the upload and the liveness check are required.
3. On step 5, press **Continue** without uploading either photo. You should see an inline error and an error summary at the top. Click the error link — the page should scroll smoothly to the missing upload card and focus it.
4. Tap one of the upload cards — it should look and feel like a big blue button. After choosing a file, the same card should switch to a green "Replace file" button.
5. Shrink the browser to phone width and look at the row of buttons at the bottom of any step — they should wrap onto separate lines instead of overlapping, and each button should be a comfortable size to tap.
