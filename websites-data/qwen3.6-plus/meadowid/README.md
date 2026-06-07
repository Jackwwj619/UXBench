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

- **You now see a confirmation message after destructive actions.** Revoking an app or ending a session shows a green check-mark toast at the bottom of the screen so you know it worked.
- **"End all other sessions" tells you how many it ended.** The toast includes the count, and the detail panel updates to explain you're now signed in only on this device.
- **Sensitive permission chips stand out much more.** Scopes like `read:repos`, `payments:read`, and `billing:read` now have a warning icon, a stronger red, and a bold border so risky scopes are unmistakable.
- **The current device gets a clear "Current Device" pill** on the sessions page, instead of just a small dot in the text.
- **Bigger tap targets on phones.** Sidebar items, buttons, search/select boxes, and inputs are all sized so they're easy to hit with a thumb.
- **Better labels for screen readers.** The search and filter controls on the connected-apps page now announce themselves clearly, and sensitive chips are flagged with an accessible description.

## How to test the changes

1. Open `connected-apps.html`. Notice the sensitive scope chips like `read:repos` and `payments:read` — they now have a warning icon and a darker red. Click "Revoke" on any app and confirm — a green toast should appear at the bottom saying which app was revoked.
2. Open `devices.html`. The first session now has a green "Current Device" pill next to it. Click another session in the list, then click "End this session" — a toast should confirm which device was ended.
3. Click "End all other sessions" — a toast should confirm with a count, and the right-hand detail panel should update to say you're only signed in here.
4. Shrink the browser to phone width and walk through the sidebar — items should be comfortably tap-sized; search boxes and dropdowns on the apps page should also be tall enough to tap easily.
