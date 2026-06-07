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

- The **Run security check** button on the overview page now does something. Click it and a green status banner appears confirming the scan, calling out anything that needs attention (like an unverified recovery email).
- The **verify now** link next to "Recovery email not verified" now sends a confirmation banner and changes itself to "resend" — instead of being a dead link.
- The **All categories** dropdown on the Connected apps page now actually filters the list. Pick "Developer tools" and only developer apps stay visible.
- The **Sort** dropdown on Connected apps now sorts the cards properly (e.g. Name A→Z reorders them alphabetically).
- The **Remove** button on each passkey now opens a clear confirmation dialog naming exactly which passkey will be deleted, rather than removing silently.
- The **Re-pair** button on the authenticator-app card now opens a confirmation explaining that old codes will stop working, then shows a brief "Pairing…" state.
- The **Reveal & download** backup-codes button now opens a confirmation, then shows the ten codes in a grid (with already-used codes crossed out) and turns into a real "Download .txt" button.
- The **Send verification** link on the recovery-email card now confirms the email was sent and changes to "Resend verification".
- The whole interface is friendlier on phones: buttons and sidebar links are taller (44 px) for easier tapping, the alerts on the overview reflow into a single column, and the toggle for "freeze" is now reachable with a screen reader instead of being a hidden input.

## How to test the changes

1. Open `index.html`. Click **Run security check** in the top-right — a green banner should appear summarising what the scan found.
2. Still on the overview, find "Recovery email not verified" and click **verify now** — a confirmation banner appears and the link relabels itself "resend".
3. Open `connected-apps.html`. Change the **All categories** dropdown to "Developer tools" — only developer apps stay visible. Then change **Sort** to "Name A→Z" — the visible cards reorder alphabetically. Type into the search box and the list narrows further.
4. Open `passkeys.html`. Click **Remove** on any passkey — a confirmation dialog appears naming that exact device. Click cancel and the passkey stays; confirm and it disappears.
5. On the same page, click **Re-pair** next to the authenticator app — confirm the warning, and the button briefly shows "Pairing…".
6. Click **Reveal & download** on the backup-codes card — confirm, and the ten codes appear in a grid (two crossed out). The button now reads "Download .txt"; click it to actually download the file.
7. Scroll down to the recovery-email card and click **Send verification** — a green confirmation appears and the link changes to "Resend verification".
8. Shrink the browser to phone width — buttons, sidebar links, and the issue-list actions should all be large and easy to tap.
