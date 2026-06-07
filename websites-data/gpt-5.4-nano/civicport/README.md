# CivicPort

CivicPort is a demo online permit portal for the fictional City of Avalon Bay. Residents and contractors use it to apply for a building permit, track open applications, and pay fees. It models a long, multi-section government form with branching steps and an estimated fee that updates as you fill things in.

> Fictional product — applications are saved only in your browser's local storage; no permits are actually filed.

## What you can do

- **Start at the portal home.** Three big buttons let you apply for a permit, track an existing application, or pay fees. A bulletin lists recent service announcements.
- **Apply for a permit.** A guided six-section form walks you through project details: address and parcel lookup, project type and scope, dates, ownership, contractor info, file uploads, neighbor signatures (when required), affidavits, and a final review before submitting. The step tree on the left shows where you are, marks completed steps with a check, and lets you jump back to revise.
- **See what materials you need, as you need them.** A panel on the right keeps a running checklist of documents required for your specific application, ticking items off as you fill them in.
- **See the fee as it adds up.** The estimated-fee breakdown updates whenever you change the project type, square footage, or extras. There's an expedited toggle that adds a surcharge.
- **Track past applications and look up fees.** *My applications* shows the status of your three sample applications; *Fees* explains the fee schedule by project type, plus how expedited processing works.

## How to use it

Open `index.html` in any modern browser. Click **Apply** to start the permit form. The form branches based on what you enter — choosing exterior changes adds a neighbor step, a historic parcel adds a historic-district step, and so on. Your progress is saved between visits in the same browser.

## What was changed in this version

- If you click **Continue** on a step without filling in the required fields, a yellow banner now appears at the top of the step listing exactly what's missing — instead of letting you skip forward silently.
- The expedited-processing toggle is now a large clearly-bordered box that highlights when turned on, and a small green "Updated" badge briefly flashes on the fee card so you can see the price actually changed.
- The file upload buttons are bigger, easier to click, and the Remove button on an uploaded file is now an outlined red button instead of plain underlined text.
- Form labels are now properly linked to their inputs, so clicking the label puts the cursor in the field, and phone keyboards now bring up the number pad for cost and square-footage fields.
- Date fields show a small "Format: YYYY-MM-DD" hint, and the form will tell you if your end date is before your start date.
- Browsers can now auto-fill the street address, city, and zip fields from your saved address book.
- Radio buttons and checkboxes are larger and easier to tap on phones.
- On narrow screens the top toolbar (Save / Cancel / progress text) wraps nicely instead of getting squished off the edge.

## How to test the changes

1. Open `index.html` and click **Apply**. On the first step (Project location), leave the Street address blank and click **Continue** — a yellow banner should appear telling you to enter the street address.
2. Fill in a street address, move to "Project type", and click **Continue** again without picking one — the banner should now list "Select a project type".
3. Continue to the Dates step. Pick an end date earlier than the start date and click **Continue** — the banner should tell you the end date must be on or after the start date.
4. Go to a Documents step. Click the big blue **Choose file** button to upload, then click **Remove** — the Remove button should now look like a red outlined button.
5. Find the **Expedite processing** toggle in the fee panel. Click it — the toggle should fill with a tinted background and the bordered box should highlight, and a green "Updated" badge should briefly appear next to "Estimated fees".
6. On a phone or narrow window, try tapping the radio buttons and checkboxes — they should be noticeably easier to hit than before.
7. Click directly on a field's label text (not the input) — the cursor should jump into the matching input.
