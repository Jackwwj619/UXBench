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

- **Live help while you type the parcel number.** As you type the parcel (e.g. `AB-2401-0117`), a small hint underneath tells you whether the format looks right, whether the parcel is in the database, or what the expected format is — so you don't have to guess what "Look up" wants.
- **Verified parcels say so.** After you click **Look up** and a match is found, the hint reads "Verified." in green, confirming the parcel is recognised.
- **License field only appears when it's relevant.** On the ownership step, the "License number" field is now hidden and disabled unless you say the applicant is a contractor — it appears as soon as you pick "Contractor" and goes away if you switch back.
- **Environmental answers feed into your materials checklist.** If you tick the "asbestos disturbance" box, the right-hand "What materials you'll need" panel now adds an abatement-plan reminder. Tree removal and stormwater runoff also pop up as their own checklist items.
- **Bigger, easier-to-tap form controls.** Text fields, dropdowns, radio buttons, checkboxes, file-upload buttons, and Cancel / Save / Submit buttons all have a comfortable size for tapping — including the expedited-review toggle and the parcel **Look up** button.
- **Disabled fields look disabled.** When the license field is hidden behind the "Contractor" choice, or any field is otherwise switched off, it now shows a "blocked" cursor and a greyer background.
- **Better labels for screen readers.** Form fields, the Cancel button, and the neighbor-signature inputs now have proper labels so assistive tech reads out which input is which.

## How to test the changes

1. Open `index.html` and click **Apply** to start the permit form. Jump to the **Parcel & ownership** step (step 2). In the parcel box, start typing `AB-99` — the hint under the input should turn red and say the expected format. Finish typing `AB-2401-0117` — the hint should go green ("Format looks good — click Look up to verify."). Click **Look up** and the hint should read "Verified.".
2. Try typing a properly-formatted parcel that doesn't exist, like `AB-2401-9999`. The hint should now say in orange that the format is fine but the parcel isn't in the database.
3. Still on the ownership step, switch the "Who is applying" radio between **Owner** and **Contractor**. The **License number** field should appear only for Contractor, and disappear (with a greyed-out look) when you switch back.
4. Go to the **Environmental** step (under section 5). Tick the asbestos checkbox — the "What materials you'll need" panel on the right should add a new line about an abatement plan. Tick tree removal or stormwater runoff and the panel should get extra checklist items too.
5. Shrink the browser to phone width and run through a few steps. The text fields, radio buttons, checkboxes, the **Look up** button, and the expedited-review toggle should all feel comfortably large to tap, and the **Cancel** link should still be reachable without zooming.
