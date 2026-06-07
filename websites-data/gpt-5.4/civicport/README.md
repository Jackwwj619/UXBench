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

- Required fields throughout the form are now marked with a red asterisk so you can see at a glance which ones you must fill in.
- Pressing Continue with missing or invalid fields now shows a red error box at the top of the step listing exactly what to fix, instead of silently letting you skip ahead.
- The Project scope step now shows a context tip that changes based on the project type you picked (e.g. for Kitchen it suggests mentioning cabinet replacement, gas/water lines, etc.).
- Ticking "Involves changes to the exterior" now immediately shows a confirmation note that the neighbor consent step (4) will be added.
- The parcel lookup now shows a green "Parcel verified" success banner above the result, and lists sample parcel numbers you can try right under the input.
- The Submit step now refuses to submit until every required field across the whole application is complete — the button stays disabled and an error box lists every outstanding item with its step number, instead of opening a browser alert and routing you onward.
- The final-review step (6.1 Summary) now shows either a green "Ready to submit" banner or a red list of items still needing attention before you reach the submit screen.
- Submitting no longer triggers a browser alert popup — instead, a full confirmation page appears with your application ID, address, status badge, next-steps list, and buttons to view My applications or return home.
- The right-hand materials checklist now tracks more items (zip code, dates, owner-vs-contractor choice, lead-paint disclosure, final attestation) and won't tick a step off until it's actually valid.
- Steps you previously completed but later left incomplete are now visually marked differently from finished steps in the left navigation, so you can tell which need another pass.
- Each form field now has a proper visible label connected to it, including the parcel input, license number, neighbor signatures, file-upload buttons, and the radio groups.
- On mobile, the data tables and form rows stack better and the step navigation responds to keyboard (Tab and Enter / Space to jump to a step).

## How to test the changes

1. Open `apply.html`. On step 1.1 Property address, leave Street address and Zip blank and click "Continue" — a red error box lists exactly what's missing, and you stay on the step.
2. Fill in the address and continue to step 1.2 Project type. Pick "Kitchen", then continue to step 1.3 — a "Kitchen tip" appears at the top of the scope step with relevant advice.
3. On step 1.3, tick "Involves changes to the exterior" — a confirmation line immediately appears saying the neighbor consent step will be added. Check the left tree: the neighbor steps (4.1, 4.2) now show.
4. Go to step 2.1 Parcel lookup. Notice the sample parcel numbers shown under the input. Enter "AB-2401-0117" and click "Look up" — a green "Parcel verified" banner appears above the result.
5. Jump to step 6.1 Summary with required items still missing — you'll see a red box listing every outstanding item with its step number (e.g. "Step 1.4 …: Estimated start date is required").
6. Go to step 6.3 Submit while still incomplete — the "Submit application" button is greyed out and the same readiness list is shown. Fix the missing items; the button activates.
7. Submit a fully complete application — instead of a browser alert, a full confirmation page appears with your application ID, status badge, and links to My applications and Home.
8. In the left step tree on `apply.html`, tab through with the keyboard — each step receives focus, and pressing Enter or Space jumps to it.
9. Check the right-hand "What materials you'll need" panel — items like "Lead-paint disclosure" and "Final attestation" now appear and only tick once the answer is actually given.
