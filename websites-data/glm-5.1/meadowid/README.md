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

- The Sort dropdown on the Connected Apps page now actually re-orders the list — picking "Name A→Z" alphabetises the cards, and "Date added" reverses the order. Before it did nothing.
- The Data Export wizard now shows a live "Estimated total" size that updates as you tick or untick categories, so you know roughly how big your download will be before kicking it off.
- On step 1 of the Data Export wizard, the "Back" button is replaced with "Cancel" so it's clear pressing it on the first step takes you out of the wizard back to the overview, not somewhere unexpected.
- The "Request deletion" button on the Freeze page now actually works — clicking it pops a confirmation that requires you to type "DELETE", then shows a status message about the confirmation email and a 7-day cool-off.
- The "Re-pair" button next to the authenticator app on the Passkeys page now actually responds, with a confirmation dialog warning that your existing TOTP codes will stop working, and a "last verified just now" status afterwards.
- Search boxes, sort and category dropdowns on the Connected Apps page now have proper screen-reader labels, so assistive tech describes them instead of just reading "combobox".
- Buttons, checkbox rows, radio rows, and the search field across the dashboard are bigger and easier to tap on phones; hovering or focusing a checkbox row now highlights the whole row.

## How to test the changes

1. Open `connected-apps.html`. Use the right-hand "Sort: Recently used" dropdown and pick "Sort: Name A→Z" — the app cards should reorder alphabetically (Calendar Sync, GitHub, Figma, etc.). Switch to "Sort: Date added" and the order should reverse.
2. Open `data-export.html`. On step 1, watch the "Estimated total" line under the checkboxes — tick "Security audit log" and the number should jump up to roughly 1.4 MB; untick "Account profile" and "Connected apps & tokens" and it should drop. The leftmost button at the bottom should read "Cancel" on step 1, then become "Back" once you advance.
3. Open `freeze.html` and scroll to the bottom. Click **Request deletion** — a confirmation modal should appear that won't let you confirm until you type "DELETE". Confirm, and a small status line appears below the button announcing the confirmation email and 7-day cool-off; the button itself disables and reads "Deletion requested".
4. Open `passkeys.html`. Find the authenticator app row and click **Re-pair** — the button shows "Re-pairing…", a confirmation modal pops up, and on confirming you see a green "Re-pairing complete · last verified just now" line.
5. Shrink the browser to phone width on any page — buttons, checkboxes, and the app search box should all feel comfortably large under your thumb. Hovering over a checkbox row in the export wizard or app search should subtly highlight the whole row.
