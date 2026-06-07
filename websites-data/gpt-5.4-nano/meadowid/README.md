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

- The "verify now" link on the overview page (for the unverified recovery email) now actually does something — it briefly says "sending…", then shows a green confirmation that the verification email has been sent, plus a small pop-up notice in the corner.
- On the Passkeys & 2FA page, the **Send verification** link next to the recovery email now confirms it was sent and reminds you to click the link within 24 hours.
- The **Reveal & download** backup-codes button now opens a confirmation pop-up first, then actually shows the eight codes in a neat grid with a real "Download .txt" button. You can hide them again afterwards.
- The **Remove** button on the SMS backup factor and the **Re-pair** button on the authenticator app now ask for confirmation, show a brief "Removing…" state, and slide the card away when done.
- Removing a passkey from the list now asks "Are you sure?" first and shows a small pop-up to confirm it worked.
- Freezing the account now shows a "Freezing… signing devices out" status before settling on the frozen timestamp, and unfreezing similarly shows progress. Both actions trigger a small pop-up confirmation.
- On the Freeze page, the **Request deletion** button now actually opens a confirmation pop-up (where you have to type "DELETE"), then shows a clear note that an email was sent and that you have 24 hours to confirm and a 7-day cool-off after that.
- Buttons, links, checkboxes, and the sidebar nav are now big enough to tap comfortably on a phone, and the connected-apps search box and filter dropdowns get spoken labels for screen readers.

## How to test the changes

1. Open `index.html`. In the recovery-readiness list, click **verify now** next to "Recovery email not verified" — you should see "sending…", then a green confirmation, plus a small pop-up in the bottom-right corner.
2. Open `passkeys.html`. Click **Reveal & download** under Backup codes — a confirmation pop-up appears; confirm it, and a grid of eight codes appears with a working **Download .txt** button. Click **Hide codes** to put them away.
3. On the same page, click **Remove** next to the SMS backup factor — confirm in the pop-up, and watch the card fade out. Try **Re-pair** on the authenticator app and confirm.
4. Click **Send verification** next to the recovery email field — a green confirmation message appears below it.
5. Open `freeze.html`. Turn the freeze toggle on, type **FREEZE** when asked, and watch the status change from "Freezing…" to "Frozen — (timestamp)". Turn it back off to see "Unfreezing…".
6. On the same page, click **Request deletion**, type **DELETE** in the pop-up, and confirm — the button label changes to "Resend confirmation email" and a red note appears below explaining the 7-day cool-off.
7. Open the page on a narrow window or phone — buttons, links, and form fields should all be comfortably tappable.
