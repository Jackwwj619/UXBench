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

- The category and sort dropdowns on the Connected Apps page now actually filter and reorder the cards. Pick "Developer tools" or "Sort: Name A→Z" and the list responds; combine the search box, category dropdown, and sort dropdown to narrow things down.
- The "Run security check" button on the overview shows a spinner while it runs and a success toast when it finishes, instead of doing nothing. "Dismiss all" alerts works the same way — a confirmation modal first, then the list is cleared and a toast fires.
- All `#` placeholder links (sidebar Profile/Billing, the recovery-readiness "verify now" links, the passkeys verification link) now show a clear toast explaining what would happen, so you don't get stuck on a dead anchor.
- The 2FA Remove / Re-pair / "Reveal backup codes" buttons all work now. Remove asks for confirmation, Re-pair shows a brief spinner, and Reveal warns you before showing the codes — each ends with a toast.
- The data-export wizard's "Encrypt archive" checkbox reveals a password field with helper text when ticked. The "Save as draft" button shows a spinner and a confirmation toast. The format radios live inside a proper `<fieldset>` and the time-range select and email input got matching `<label for>` associations for screen readers.
- The freeze account toggle is now reachable by keyboard (Space or Enter), announces an `aria-checked` state, and unfreezing also fires a toast and clears the "Frozen — <date>" label.
- A new mobile **Menu** button appears in the sidebar on narrow screens, replacing the previous horizontal-scroll layout with a clean tap-to-expand vertical menu. App cards on the Connected Apps page reflow to a single column on mobile.
- The "Request deletion" button on the freeze page now requires you to type **DELETE** to confirm, matching how the freeze toggle works.

## How to test the changes

1. Open `connected-apps.html`. Pick "Developer tools" in the category dropdown — only Forge Coder, Tessera Docs, and Pelagic Cloud stay visible. Switch the sort to "Name A→Z" and the order changes.
2. Open `index.html` and click **Run security check** — the button shows a spinner for about a second, then a green toast says "Security check complete — no new issues found." Click **Dismiss all** above the Issues list — a confirmation modal asks first; on confirm the list is replaced and another toast fires.
3. Still on the overview, click any of the small "verify now" / "Profile" / "Billing" links — a toast at the bottom explains the link isn't active in the demo (no more silent dead links).
4. Open `passkeys.html` and click **Remove** next to a factor — a confirmation modal appears, then a toast fires. Click **Re-pair** next to the authenticator and watch the spinner.
5. Open `data-export.html`, advance to step 2 and tick "Encrypt archive with a password" — a labelled password field with helper text appears below the checkbox.
6. Open `freeze.html`. Tab to the toggle and press Space — the FREEZE confirmation modal opens. Click **Request deletion** below — a similar modal asks you to type DELETE.
7. Resize the browser to phone width on any MeadowID page. A green **Menu** button appears in the top-left; tap it to expand the vertical sidebar.
