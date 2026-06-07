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

- The dashboard now has a working **menu button** on phones and narrow windows — tap it to open the sidebar, tap outside to close it.
- The overview page **Run security check** button now shows a "Checking…" state and a confirmation message when it finishes, instead of doing nothing.
- The **Dismiss all** link on the overview now asks "Dismiss all 3 alerts?" first, then shows an **Undo** option so you can put them back.
- The unfamiliar Reykjavík session on the Devices page is now called out in a coloured warning banner at the top with a one-click "Review" jump link, so it's easier to spot.
- On the Freeze page, the **Request deletion** button now opens a real confirmation dialog where you must type "DELETE" before the request is sent, and a status note appears afterwards.
- On the Passkeys page, the recovery email field has a clear "Not verified" badge and a new **Send verification email** button that gives feedback when clicked.
- Removing a passkey or backup factor now asks for confirmation and warns you to keep at least one other sign-in factor.
- The Data export wizard's final review step now shows the **actual categories, format and schedule you picked**, rather than fixed placeholder text.

## How to test the changes

1. Open `index.html`. Click **Run security check** in the top-right — the button should show "Checking…" then a toast confirms it's done.
2. Click **Dismiss all** above the alert list — you'll get a confirmation dialog, and after confirming, a toast with an **Undo** button appears.
3. Resize the window narrow (or open on a phone). A **Menu** button appears at the top; tap it to slide the sidebar in.
4. Open `devices.html` — a yellow warning banner about the Reykjavík session appears at the top with a **Review** button.
5. Open `freeze.html`, click **Request deletion** — a dialog asks you to type DELETE. After confirming, a status note appears below.
6. Open `passkeys.html`, click **Send verification email →** under the Recovery email field — the button shows "Sending…" then "Verification sent". Try clicking **Remove** on any passkey or backup factor — you'll be asked to confirm first.
7. Open `data-export.html`, change the format/schedule on earlier steps, then navigate to the final **Review** step — the summary now reflects your actual choices.
