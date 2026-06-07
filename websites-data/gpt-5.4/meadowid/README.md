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

- The "Run security check" button on the overview now actually does something: it shows "Running checks…", briefly disables itself, and then updates the page to say "Verified just now. No new issues found", along with a small confirmation message at the bottom of the screen.
- The "Review" link next to the unfamiliar Reykjavík session now jumps you straight to that session on the Devices page, highlights its row, and shows a yellow warning panel explaining why it was flagged.
- On the Devices page, ending a session or ending all other sessions now shows a confirmation message at the bottom of the screen, and "End all other sessions" also shows a dismissable green banner saying how many were ended.
- If you click "End all other sessions" but there are no other sessions left, it now tells you so instead of doing nothing.
- The Connected apps page now has working Category and Sort dropdowns. You can filter by category (Productivity, Developer tools, Media, Finance) and sort by Recently used, Name A→Z, or Date added.
- When a search or category filter on Connected apps matches nothing, an empty-state message appears with the reason and a "Clear filters" button.
- Revoking an app now shows a small confirmation message and re-checks the list, instead of silently removing the row.
- On the Passkeys page, the Recovery section is now a proper form with a "Save changes" button. Saving is disabled until you actually edit something, and a "Send verification email" button only becomes active once changes are saved. After sending, the status text says where the email was sent and that the link expires in 30 minutes.
- The data-export wizard now shows a live summary at the top (categories, format, frequency) that updates as you tick boxes, and the Review step lists exactly what you selected. Trying to continue with no categories selected now warns you.
- The Freeze page now uses a clearer pill — "Not frozen" turns into a red "❄ Frozen — since [time]" when active, and turning the switch off pops an "Unfreeze account?" confirmation. The "Request deletion" button now asks for confirmation (typing "DELETE") and then shows a message about the 7-day cool-off with a "Cancel deletion request" link.
- Buttons, dropdowns, checkboxes, radio buttons, and sidebar links are larger and easier to tap on phones; the Connected apps toolbar and Passkeys recovery form stack into a single column on small screens.

## How to test the changes

1. Open `index.html`. Click "Run security check" — the button label changes to "Running checks…", and after a moment the heading text changes to "Verified just now" and a green message pops up at the bottom of the screen.
2. On the same page, find the unfamiliar Reykjavík session alert and click "Review". The Devices page opens with that row already selected, highlighted in yellow, with a yellow "⚠ Flagged session" explanation panel above the details.
3. On `devices.html`, click "End all other sessions" and confirm. A green banner appears at the top counting how many sessions were ended, with a "Dismiss" link.
4. Open `connected-apps.html`. Pick "Developer tools" from the Category dropdown — the list shortens to just developer apps. Switch Sort to "Name A→Z" — the cards reorder alphabetically. Search for "xyz" — an empty-state message with "Clear filters" appears.
5. Revoke any app and confirm — a small green confirmation message appears at the bottom.
6. Open `passkeys.html` and scroll to the Recovery section. The "Save changes" button is disabled. Edit the recovery email — it becomes active and a "You have unsaved changes" hint appears. Click Save — the buttons reset; now "Send verification email" can be clicked and the status updates to show where the email went.
7. Open `data-export.html`. Tick a couple of categories and pick a format — the green summary panel at the top updates immediately. Advance to step 4 — the Review list matches what you picked.
8. Open `freeze.html`. Flip the toggle, type "FREEZE", and confirm — the status pill turns red and reads "❄ Frozen — since [time]". Flip it back off — an "Unfreeze account?" confirmation appears.
9. Still on `freeze.html`, click "Request deletion", type "DELETE", confirm — a yellow note appears saying a confirmation email was sent, with a "Cancel deletion request" link.
10. Resize the browser to phone width on `connected-apps.html` — the search and dropdowns stack vertically and grow taller. On `passkeys.html` the recovery email and trusted contact stack into one column.
