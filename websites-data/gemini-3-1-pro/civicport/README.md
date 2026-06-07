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

- Clicking **Continue** on any step now validates that step's required fields. If anything's missing or wrong (empty street, zero sqft, end date before start, contractor with no license number, etc.) a red "Please fix the following before continuing" summary appears at the top of the step and the offending field is outlined and scrolled into view.
- The final **Submit** button now runs the same checks across every visible step, so you can't reach the success page with a half-filled application — it tells you exactly which step is incomplete.
- Submitting a permit successfully now hands off to the **My applications** page with a green "Application AB-…-XXXX submitted successfully" banner, and the new application appears at the top of the table with a "Pending review" badge — instead of just clearing the form and sending you back to the home page.
- The CivicPort logo at the top of every page is now a real link back to the portal home, with a proper `aria-label`. The Home / Apply / My applications / Fees nav now appears consistently on every page (Home was missing from several before).
- The project-type radios, applicant role (Owner / Contractor), and lead-paint affidavit have proper `role="radiogroup"` and `aria-label`s so screen readers announce them correctly.
- All form fields now have explicit `<label for="…">` associations so labels click to focus and screen readers can read them.
- Inline field errors clear themselves as soon as you start typing, instead of staying red until you re-submit.
- The Cancel button in the application header is now a proper `type="button"` so it doesn't accidentally submit the form when pressed via Enter.

## How to test the changes

1. Open `apply.html`. Leave step 1.1 blank and click **Continue** — a red summary lists "Street address is required", "City is required", "Zip code is required" and the first empty field gets a red outline. Type a street name and the related error clears.
2. Fill out enough of the form to reach **6.3 Submit** without filling everything (skip 1.3 scope, for example). Click Submit — the error summary lists "Step 1.3 Project scope: Describe the work." and you stay on the review step.
3. Complete every required field, then click Submit on step 6.3. You're redirected to `my-applications.html`, a green success banner shows your new app ID, and the new row appears at the top of the table with a "Pending review" badge.
4. On step 1.4 enter an end date before the start date — Continue is blocked with "End date must be on or after the start date."
5. Click the CivicPort logo on `apply.html`, `fees.html`, or `my-applications.html` — every page goes back to `index.html`. The top nav also exposes a Home link on every page.
6. With a screen reader active, navigate the project-type step (1.2) — it announces "Project type, radio group" and reads each option's label.
