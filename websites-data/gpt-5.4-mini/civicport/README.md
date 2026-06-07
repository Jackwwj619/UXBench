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

- The **Help** link in the top navigation (and on every page) now actually opens a pop-up with phone, email, in-person, and self-service guidance, instead of going nowhere.
- The application form's **Cancel** link is now a clear bordered button labelled "Cancel application", and a new "Help" button sits next to it that opens a quick FAQ tailored to applicants (auto-save behaviour, accepted file types, contact details).
- On the **My applications** page, each row in the table is now clickable. Clicking a row (or pressing Enter on it) opens a details pop-up showing the inspector notes and next steps for that permit, and a new "View details" link appears in the last column.
- The fee panel no longer just says "Pick a project type first" — before you choose one it shows a small preview of typical base fees by project type so you can plan ahead.
- The two conditional upload steps (Elevation drawings, Energy compliance form) now show a yellow "Why now?" tag explaining why they appeared — for example, "This step appears because you selected Addition…".
- Upload boxes are now clearer: each one shows the document name, accepted file types (PDF, JPG, PNG) and a 25 MB size limit, with a larger "Choose file" button that's easier to tap.
- Form fields now have helpful placeholder examples (e.g. "e.g., 25000" for cost, "e.g., AB-CONT-23145" for license number) and proper labels for screen readers.
- On a phone, the apply form's wide buttons and radio choices now stretch full-width with bigger tap targets, and the My applications table reflows into a stack of cards instead of overflowing sideways.

## How to test the changes

1. Open `index.html` and click **Help** in the top navigation. A pop-up with contact and self-service info should appear; click **Got it** to dismiss.
2. Open `my-applications.html`. Click anywhere on the **Bathroom remodel** row — a details pop-up should appear showing "Inspector requested updated venting diagram…". Close it, then press Tab until that row is focused and press Enter to confirm the same pop-up opens.
3. Still on `my-applications.html`, look at the right-hand "Action" column and click the **View details →** link — it should open the same pop-up.
4. Open `apply.html`. The right-hand fee card should show a preview list of typical fees ("Kitchen / Bathroom $240–$320" etc.) with the total shown as "TBD".
5. On step 1.2, pick **Addition** as the project type. Navigate to step 3.3 (Elevation drawings) — you should see a yellow "Why now?" badge next to the title and an explanation referencing your Addition choice.
6. On step 3.1 (Site plan), check the upload box — it should clearly say "Site plan (PDF)", "Choose a PDF, JPG or PNG (max 25 MB)", and offer a "Choose file" button.
7. In the apply page header, look for the new bordered **Help** and **Cancel application** buttons (top right). Click **Help** — a pop-up tailored to applicants should appear (mentions auto-save, file size, phone, email).
8. Resize the browser to phone width on `apply.html` — radio choices should stack one per row, the upload "Choose file" button should fill the row, and the wizard's Save / Continue buttons should be larger and side-by-side.
