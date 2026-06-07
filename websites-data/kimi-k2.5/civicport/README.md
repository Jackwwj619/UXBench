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

- The **Next** button now actually checks the current step before letting you move on. If you skipped a required field — like the project type, the scope, a required file upload, or the final attestation — a red banner appears at the top of the step listing exactly what's missing, instead of letting you sail through with blank answers.
- The estimated start and end date fields now show the expected format ("YYYY-MM-DD") right under the box, and submitting an end date earlier than the start date is caught with a clear error.
- The parcel lookup now tells you when the box is empty ("Please enter a parcel number first") and, when you type a parcel that doesn't exist, lists every valid sample parcel by name. When a parcel is found, a green "Parcel verified" check appears above the details.
- The **Previous** button is now greyed out on the very first step so it can't be clicked when there's nowhere to go back to.
- All form controls — radio buttons, checkboxes, file upload buttons, the parcel "Look up" button — are now larger and easier to tap on a phone, and the dashed file-upload boxes have more vertical space so the "Upload" button is comfortable to hit.

## How to test the changes

1. Open `index.html` and click **Apply**. On the very first step, try clicking **Next** without filling in a street address — a red banner appears saying "Street address is required."
2. Continue to "Project type" and click Next without choosing one — again, a clear error appears.
3. Navigate to "Dates". Look under the start and end date boxes for the "Format: YYYY-MM-DD" hint. Pick an end date earlier than the start date and click Next — you should see "End date cannot be before start date."
4. Go to "Parcel lookup". Click "Look up" with an empty box — red error. Type "XX-9999" and click Look up — the error lists the three valid sample parcels. Type one of those (e.g. AB-2401-0117) and click Look up — a green "Parcel verified" appears.
5. Look at the **Previous** button on the very first step — it's greyed out. After moving to step two, Previous becomes clickable.
6. On a phone-sized window, tap any radio button, checkbox, or the parcel "Look up" button — they're noticeably bigger and easier to hit than before.
