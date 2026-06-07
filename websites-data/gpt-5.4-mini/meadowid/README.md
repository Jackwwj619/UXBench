# MeadowID

MeadowID is a demo identity dashboard — a single place to see what apps have access to your account, what devices are signed in, what factors you can use to log in, and how to export or freeze your data. It's the kind of "security center" most online accounts now ship.

> Fictional product — apps, sessions, and passkeys are sample data.

## What you can do

- **See your account at a glance.** The overview shows four tiles (connected apps, active sessions, passkeys, trust score), a list of issues to look at (unfamiliar session, weak factor, stale app), recent sign-ins, and a recovery-readiness checklist.
- **Audit connected apps.** Browse every third-party app that holds a token, with scope chips (sensitive ones highlighted). Filter and search the list, and revoke access — revoking asks for confirmation.
- **Manage active sessions.** A world map with pinned locations is linked one-to-one with a session list. Click a pin or row to see device details and end that session, or use **End all other sessions** to wipe everything except where you are.
- **Set up passkeys and 2FA.** Add or remove passkeys, manage backup factors (SMS is flagged risky, plus authenticator app and backup codes), and configure recovery contacts.
- **Export your data.** A four-step wizard walks you through picking categories, format and filters, schedule, and review. The final step asks for explicit confirmation before queuing the export.
- **Freeze your account.** A clear explanation of what freeze does and doesn't do, with a toggle that requires typing **FREEZE** before it takes effect. There's also a path to full deletion.

## How to use it

Open `index.html` in any modern browser. Use the sidebar to switch sections. Most destructive actions (revoking apps, ending sessions, freezing, deleting) require an extra confirmation step.

## What was changed in this version

- The **Run security check** button on the overview page now actually runs — it briefly says "Running checks…", then turns into a "✓ Checked just now" state with a sentence describing what was found, and links you to the "Things to look at" list further down the page.
- On the Connected apps page, the category and sort menus now really work: pick "Productivity" or "Developer tools" and only those apps stay. A status line above the list tells you something like "Showing 4 of 10 apps in Productivity · sorted by Name A→Z".
- The Revoke buttons on the Connected apps page are now styled as clear danger-outlined buttons (red tint and outline) so it's obvious they're a destructive action.
- The Data export wizard's review page is now live — as you tick categories, change format, schedule, or delivery email on earlier steps, the Review summary updates immediately to match. The final confirmation also lists each category by name.
- If you try to submit the data export wizard with no categories selected, you now get a clear "Pick at least one category" prompt instead of the button silently doing nothing.
- The freeze toggle now also handles **unfreezing** — switching it off pops a confirmation dialog before lifting the freeze.
- The "Request deletion" link is now a real button. Clicking it opens a confirmation that requires you to type **DELETE**, and on confirm shows a clear "Confirmation email sent" note.
- Checkboxes, radio buttons, and labels throughout the wizard now sit inside large, pill-style tap targets that highlight when selected, instead of being tiny plain inputs.
- On a phone, the sidebar, buttons, search and filter boxes, and modal action buttons are larger and easier to tap.

## How to test the changes

1. Open `index.html` and click **Run security check** in the header. The button should briefly say "Running checks…", then settle on "✓ Checked just now", and the line below should describe findings and link to "Things to look at".
2. Open `connected-apps.html`. Change the category dropdown to "Productivity" — only those apps should remain visible, and the status line above the list should say something like "Showing 4 of 10 apps in Productivity". Change the sort to "Name A→Z" and confirm the cards reorder.
3. On the same page, look at the **Revoke** buttons — they should have a red outline and faint red background. Click one to see the destructive confirmation dialog.
4. Open `data-export.html`. On step 1 untick everything, then click Continue through to step 4 and click **Request export** — you should get a "Pick at least one category" prompt rather than nothing.
5. Go back to step 1, tick a couple of categories, change the format on step 2, and change the email on step 3 — by the time you reach step 4, the Review summary should already reflect every choice (category names, format, schedule, delivery email).
6. Open `freeze.html`. Flip the toggle on, type **FREEZE**, and confirm. Then flip the toggle off — a confirmation dialog should ask whether to unfreeze. Click **Request account deletion** at the bottom, type **DELETE** to confirm, and you should see a "Confirmation email sent" note appear.
7. Shrink the browser to phone width and walk through the wizard — checkboxes and radio buttons should sit inside large pill-style boxes that fill in when selected, and the bottom Continue button should be comfortably tappable.
