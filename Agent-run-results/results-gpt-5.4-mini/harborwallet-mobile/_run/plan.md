# UXAgent Exploration Plan

## Goal

Explore the Harbor Wallet mobile fixture end-to-end, with emphasis on the home dashboard, primary money actions, the activity feed, and account/settings/privacy behavior, while validating responsive/mobile presentation and recovery states where available.

## Plan Summary

Start from the home dashboard and systematically exercise the visible primary actions: Send, Receive, Swap, Top up, notifications, See all, Activity, and Account. Because the prescan shows a single-page app with multiple in-app screens rather than separate HTML pages, the run should focus on tab/state changes, any overlays or detail views, and whether navigation returns cleanly to home. Repeat the most important checks at mobile viewport size to verify the iOS-style phone fixture, bottom tab bar, and touch targets.

## Coverage Targets

- pages: `visit all known HTML pages; in this fixture, fully explore all reachable in-app screens/state variants from index.html`
- features: `exercise most visible controls on the home dashboard, including the four transaction shortcuts, notifications, See all, and bottom tabs with emphasis on Account`
- mobile: `repeat the home check, one primary action, the activity path, and the Account/privacy path on mobile viewport; specifically verify small-tap targets and the bottom tab bar`

## Planned Phases

### Baseline home dashboard

- Objective: Validate the default landing state, layout, and key affordances on the home screen before branching into secondary flows.
- Target pages: index.html
- Key checks:
  - Confirm the home dashboard loads with balance card, assets list, recent activity, and bottom tab bar visible.
  - Check the status bar, notch, and home indicator rendering in the mobile fixture.
  - Inspect whether any content is clipped or overlaps in desktop and mobile viewport modes.
  - Record the visible action set and whether the notification badge count is presented consistently.
- Exit criteria:
  - Home state is stable with no console/network errors.
  - Primary dashboard sections are visible and readable in both viewport modes.
  - No unexpected layout breakage is observed in the phone frame.

### Primary money actions

- Objective: Exercise the four prominent transaction shortcuts from the dashboard and confirm their resulting states or recoveries.
- Target pages: index.html
- Key checks:
  - Click Send and determine whether it opens a send screen, modal, or no-op state.
  - Click Receive and verify the receive experience or QR/instructions state if present.
  - Click Swap and check whether a swap flow appears and whether it is dismissible.
  - Click Top up and verify the top-up entry point or any funding guidance state.
  - After each action, confirm there is a clear way back to the dashboard.
- Exit criteria:
  - All four primary action controls have been activated at least once.
  - Any opened flow can be exited without losing the home state.
  - No blocking interaction failures are encountered.

### Activity overview and detail drill-in

- Objective: Validate the recent activity preview and the route to fuller transaction history.
- Target pages: index.html
- Key checks:
  - Activate See all and see whether it expands to a full activity view or another state.
  - Open individual recent activity rows if they are clickable, especially sent and received items.
  - Check whether amounts, merchant/contact labels, and timestamps remain legible in the expanded state.
  - Verify back navigation or dismissal returns to the home dashboard without stale state.
- Exit criteria:
  - The activity preview and any expanded history view have been explored.
  - At least one transaction detail path has been tested if available.
  - Return path to the home screen is confirmed.

### Notifications and recovery

- Objective: Probe the notification entry point and any transient UI states that may interfere with the main dashboard.
- Target pages: index.html
- Key checks:
  - Tap the notifications badge/button and inspect the resulting panel or screen.
  - Check whether unread count, notification content, or empty states are shown.
  - Test dismissal behavior and whether focus/state returns correctly to the dashboard.
  - Note any issues caused by the small tap target size on mobile.
- Exit criteria:
  - Notification behavior is understood, including open and close paths.
  - Any overlay or panel can be dismissed cleanly.
  - Mobile usability of the small target has been assessed.

### Account and settings/privacy path

- Objective: Prioritize the user's requested settings/privacy exploration by entering the Account area and checking for related management screens.
- Target pages: index.html
- Key checks:
  - Open the Account tab and inspect the available account/settings/privacy options.
  - Look for privacy controls, security/account management entries, and any profile-related state.
  - Validate navigation depth if the account area contains subpages or panels.
  - Check that returning to Home preserves expected state and does not reset unrelated selections.
- Exit criteria:
  - Account area has been entered and its visible controls have been exercised.
  - Any settings/privacy-related entries found have been validated at least once.
  - The app returns reliably to the dashboard.

### Mobile viewport verification

- Objective: Repeat the most important paths under the mobile viewport to validate touch usability and fixture framing.
- Target pages: index.html
- Key checks:
  - Re-run the home dashboard sanity check at mobile viewport size.
  - Repeat at least one primary action and the Account path on mobile.
  - Re-check the small-tap targets ('3 🔔' and 'See all') for usability issues.
  - Confirm the bottom tab bar remains reachable and the phone chrome does not obscure content.
- Exit criteria:
  - Critical flows have been confirmed on mobile viewport.
  - Any size-related issues are documented.
  - No additional viewport-specific blockers are found.

## Prescan Summary

### Harbor Wallet — mobile fixture

- Page: `index.html`
- Headings: YOUR ASSETS, RECENT ACTIVITY, Send money, Receive money, Account
- Interactables: `39` buttons, `1` links, `1` inputs
- Notable controls:
  - clickable:button:3 🔔
  - clickable:button:↑ Send
  - clickable:button:↓ Receive
  - clickable:button:⇄ Swap
  - clickable:button:+ Top up
  - clickable:a:See all
  - clickable:button:⌂ Home
  - clickable:button:📊 Activity

