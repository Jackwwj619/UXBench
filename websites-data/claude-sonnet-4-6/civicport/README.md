# CivicPort

CivicPort is a demo online permit portal for the fictional City of Avalon Bay. Residents and contractors use it to apply for a building permit, track open applications, and pay fees.

## What was changed in this version

- The "Expedited review" toggle now shows the exact dollar amount it will add (for example, "+$240") instead of just "+50%", and explains underneath that it's optional.
- Submitting the permit application now shows a full confirmation screen (with your application number, total fees, and a "What happens next" timeline) instead of a bare browser alert. The new application also shows up on the "My applications" page with a success banner.
- The "My applications" rows are now clickable: clicking any row opens a details popup with inspector notes, payment info, and next steps. There's a clear "View details" link on each row.
- On the "Adjacent parcels" step, neighbor entries with unknown addresses are clearly marked "pending" with a helpful note explaining when they'll be resolved.
- The Fees page now adds an HVAC row to the fee table, plus a prominent warning panel reminding you that fees are non-refundable once a reviewer is assigned.
- The Cancel button on the apply form now opens a confirmation dialog so you don't lose your work by accident.
- Form fields now have placeholder examples (like "e.g., 148 Coppergate St.") and the "exterior changes" checkbox warns you upfront that it adds a neighbor-consent step.

## How to test the changes

1. Open `index.html` and click **Apply**.
2. On step 1.2, pick a project type, then on step 1.3 enter a square footage and tick "exterior changes" — watch the right-hand fee card update and notice the inline hint about neighbor consent.
3. Tick the "Expedited review" box on the right side and confirm the toggle shows a dollar amount (for example, "+$240"), not just "+50%".
4. Click **Cancel** at the bottom — a confirmation dialog should appear before discarding the application.
5. Fill enough fields to reach step 6.3 Submit, check the attestation box, and click **Submit application**. You should see a full confirmation screen with an application number and a "What happens next" list.
6. Go to **My applications**. Your just-submitted application appears at the top with a green success banner. Click any row to open the details popup.
7. Open **Fees** and check the new HVAC row and the orange "Fees are non-refundable" warning callout.
