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

- The "Auto-saved · just now" status at the top of the application form is now a clear green pill with a check mark, and it briefly flashes after every change so it's obvious your work was saved.
- Form fields now show helpful example text inside them (e.g., "e.g., 148 Coppergate St." for the street address, "e.g., 25000" for the cost, "e.g., AB-CON-12345" for the contractor license) so you know what to type.
- Every checkbox option (exterior changes, asbestos, lead-paint acknowledgement, attestation, request-by-mail, etc.) is now a properly sized clickable row with a hover highlight — you can click anywhere on the row instead of having to hit the tiny box.
- The expedited-processing toggle in the fee panel now looks like a real boxed control with a noticeable background, instead of a barely-visible inline checkbox.
- Buttons (Next, Back, Save and exit, Look up, Submit), radio cards (project type, ownership), and checkboxes are larger and easier to tap on phones and tablets.
- The top navigation bar links now have generous padding so they're comfortable to tap on touch screens.
- Screen readers now announce meaningful names for the project-type, ownership, lead-paint, and other radio button groups, plus the address, scope, cost, dates, parcel, and license inputs.

## How to test the changes

1. Open `index.html` and click **Apply**. At the top of the page, find the "Auto-saved · just now" indicator — it should be a green pill with a check mark. Type something into the street address field and watch the indicator briefly flash.
2. On the first step, notice the placeholder text inside the Street address, City, and Zip fields ("e.g., 148 Coppergate St." and so on). Move to the Project type step and confirm the description, cost, and square footage fields also have example hints inside them.
3. On any step with a checkbox (for example the exterior-changes box on the Scope step, or the "I attest" box on the final Review step), try clicking on the label text itself, not the tiny box — the whole row should toggle, with a soft hover highlight.
4. Scroll down to the **Estimated fee** panel on the right side. The "Expedite processing (+50%, ~3 business days)" toggle should be a proper bordered box, not a thin inline line — click anywhere in the box to flip it on.
5. Shrink the browser to phone width. The Next / Back / Save buttons, project-type cards, and top-nav links (Apply / Track / Fees) should all be comfortably tap-sized and stay clickable.
