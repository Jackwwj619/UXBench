# UXAgent Report

## Target

- Site: `harborwallet-mobile`
- Page type: `settings/privacy`
- Target: `file:///Users/timchef/UXBench/websites/harborwallet-mobile/index.html`
- Run directory: `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run`

## Explored User Goal

Autonomously explore and critique the UX of the full harborwallet-mobile system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.

## Exploration Summary

Harbor Wallet’s mobile shell looks polished and the main dashboard, Send, Receive, and Account areas are easy to reach, but several important controls behave like dead ends or give unclear state feedback. The privacy/settings area is visible, yet core adjacent actions such as the Account gear, notifications, Top up, Send continuation, and Sign out often produce no response, which weakens trust. The biggest usability issue is navigation clarity: the Activity screen appears blank/sparse, and the tab bar can show Activity as active while Home content is on screen.

## Execution Plan

The run should start from the Home screen and map the SPA's reachable screens through the bottom tab bar and the prominent wallet actions (Send, Receive, Swap, Top up, notifications, and recent activity entry points). Once the screen model is understood, focus deeper on the Account area to locate and validate settings/privacy-related content, including any toggles, lists, or nested detail screens, then verify that users can return safely to prior states. Because this is a single-page mobile fixture, emphasis should be on state transitions, active-tab feedback, scroll behavior, tap-target usability, and viewport-specific presentation rather than multi-page navigation.

### Map reachable screens and navigation model

- Objective: Identify all major in-app screens/states reachable from the initial Home view and confirm how navigation works in this single-page mobile fixture.
- Target pages: index.html
- Key checks:
  - Use the bottom tab bar to visit Home, Send, Receive, Activity, and Account, confirming each changes the visible screen content.
  - Record visible headings, unique content blocks, and whether URL/hash/history changes or the app remains on a pure in-page state model.
  - Check whether tab selection is visually persistent and whether returning to Home restores the initial balance/assets/activity layout.
  - Probe the visible Home entry points: notification button, Send, Receive, Swap, Top up, and See all.
- Exit criteria:
  - All 5 bottom tabs have been activated at least once and their resulting states documented.
  - All prominent Home actions have been tested enough to know whether they open distinct screens, overlays, or no-op states.
  - A reliable mental model exists for how the SPA transitions between screens and how users get back.

### Validate primary wallet task flows

- Objective: Exercise the most important transactional/action-oriented screens adjacent to the settings flow and check clarity, completion paths, and recovery paths.
- Target pages: index.html
- Key checks:
  - Open Send and Receive flows and inspect the first screen state, available controls, and whether users can back out cleanly.
  - Open Swap and Top up from Home and evaluate whether they present dedicated task screens, sheets, or placeholder behavior.
  - If any input field is present in these flows, test focus, placeholder/label clarity, and whether the keyboard-safe layout remains usable in mobile viewport.
  - Check whether task flows preserve context when canceled or when switching tabs mid-flow.
- Exit criteria:
  - Each visible primary action from Home has been opened and its initial UX quality assessed.
  - At least one recovery path has been tested for each reachable action flow (back, close, tab switch, or Home return).
  - Any broken, ambiguous, or dead-end action states have been captured.

### Deep dive Account and settings/privacy discovery

- Objective: Locate the settings/privacy area from Account and validate the structure, comprehensibility, and statefulness of any privacy-related controls.
- Target pages: index.html
- Key checks:
  - Enter the Account tab and enumerate visible sections, rows, toggles, buttons, and any settings-related navigation items.
  - Prioritize any items labeled settings, privacy, security, notifications, visibility, personal info, or similar wording actually found in the UI.
  - For each privacy-related control discovered, test whether its state changes, whether the change is visually confirmed, and whether the label clearly communicates impact.
  - Check nested navigation depth: can users tell where they are, return to Account, and recover from exploratory changes without confusion?
  - If multiple account/settings subsections exist, validate which path feels primary for privacy and which paths are adjacent but lower priority.
- Exit criteria:
  - A complete path from Home to Account to the privacy-relevant area has been identified and traversed.
  - All visible privacy/settings controls found in the Account area have been interacted with at least once where safe.
  - Back-navigation and state persistence for the privacy path have been verified.

### Review activity, notifications, and secondary discovery paths

- Objective: Assess adjacent informational flows that may affect trust, findability, and account oversight around the primary settings/privacy experience.
- Target pages: index.html
- Key checks:
  - Open Activity via the tab bar and compare it with the Home-screen recent activity preview and 'See all' entry point.
  - Check whether tapping recent activity items or the See all link reveals more detail, a full ledger, or a dead-end.
  - Open the notification badge/button and inspect whether alerts are readable, actionable, and dismissible.
  - Verify whether secondary informational views maintain consistent navigation patterns with the Account/settings area.
- Exit criteria:
  - Activity and notification-related states have been reached and documented.
  - The relationship between Home preview content and full-detail views is understood.
  - Any discoverability or trust issues in informational flows have been identified.

### Mobile-specific regression and usability verification

- Objective: Repeat the most important checks in a true mobile viewport and inspect touch ergonomics, framing, scrolling, and visual stability.
- Target pages: index.html
- Key checks:
  - Re-run critical navigation: Home, Account/privacy path, one transactional flow, Activity/See all, and notifications on mobile viewport.
  - Verify edge-to-edge rendering at mobile width and compare against desktop fixture presentation for clipping, extra chrome, or spacing shifts.
  - Specifically retest the small tap targets already flagged: notification badge button and See all link.
  - Check whether long content in Account/settings or Activity scrolls cleanly without the tab bar obscuring actionable controls.
  - Observe status bar time updates and whether any live UI updates cause layout jitter or distracting movement.
- Exit criteria:
  - Critical flows have been confirmed in mobile viewport, not just desktop.
  - Known tap-target risks have been directly evaluated on mobile.
  - Any viewport-specific regressions or improvements have been captured.

## Exploration Coverage

- Status: `near_complete`
- Confidence: `high`
- Page coverage: `100%`
- Feature coverage: `77%`
- Action success rate: `100%`
- Viewports exercised: `desktop, mobile`

Coverage gaps:
- 44% of actions produced no visible URL/text change; this may indicate dead controls or repeated probes.

Visible but not directly exercised:
- `index.html`: 3
- `index.html`: 4
- `index.html`: 5
- `index.html`: 6
- `index.html`: 7
- `index.html`: 8
- `index.html`: 9
- `index.html`: ✓ Copied
- `index.html`: ⤴

## Top UX Feedback

1. **[HIGH] The bottom tab bar can indicate the wrong active section after navigation, so the visible content and selected tab do not match.** (navigation)
2. **[HIGH] The Activity destination appears mostly blank/sparse, leaving users without clear history content, explanation, or next steps.** (goal completion)
3. **[HIGH] Several prominent controls appear tappable but produce no visible response, making important actions feel broken or unreliable.** (feedback)
4. **[MEDIUM] The send flow gives good amount-entry feedback, but after entering a valid amount the primary CTA does not advance or explain what is missing.** (goal completion)
5. **[MEDIUM] Multiple important controls are below recommended mobile tap-target size, especially in high-frequency or high-risk areas.** (accessibility)

## High Severity Findings

### The bottom tab bar can indicate the wrong active section after navigation, so the visible content and selected tab do not match.

- UX area: `navigation`
- User goal: Understand which section of the wallet is currently open and move confidently between Home, Activity, and Account.
- Evidence: After tapping Home from the sparse Activity state, the dashboard content returned (greeting, total balance, assets, recent activity), but the tab bar still showed Activity highlighted. This was observed in the final mobile state and called out in steps 55-56.
- Why it matters: When navigation state is inconsistent, users lose orientation and may think they are still in Activity or that the app failed to switch screens correctly. In a finance app, this creates uncertainty and lowers confidence in every next action.
- Suggested change: Ensure tab highlighting is always derived from the currently visible screen state, and verify recovery flows like Activity → Home update both content and selected-tab styling together.
- Source hint: `index.html bottom tab bar; screenshot /Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-56-click-mobile.png`

### The Activity destination appears mostly blank/sparse, leaving users without clear history content, explanation, or next steps.

- UX area: `goal completion`
- User goal: Review transaction history from Recent Activity or the Activity tab.
- Evidence: Clicking the Activity tab changed the view and highlighted Activity, but the resulting screen appeared blank in prior screenshots/chunks. On mobile, tapping 'See all' changed the view to Activity, yet visible text was reduced to essentially the status bar and tab bar ('8:29 ⌂ Home ↑ Send ↓ Receive 📊 Activity ◉ Account').
- Why it matters: A history screen is a core wallet task. Landing on an empty-looking screen without explanatory empty-state messaging or visible transactions can make users think content failed to load or disappeared.
- Suggested change: Provide a real activity list or, if intentionally empty, add a clear empty-state message with context such as 'No recent activity yet' plus a recovery/action prompt.
- Source hint: `index.html Activity screen; screenshot /Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-55-click-mobile.png`

### Several prominent controls appear tappable but produce no visible response, making important actions feel broken or unreliable.

- UX area: `feedback`
- User goal: Use common wallet actions like notifications, Top up, account settings, sign out, or continue sending money.
- Evidence: No visible state change was observed after tapping the notification badge ('3 🔔'), '+ Top up', the Account gear, 'Sign out', or the Send screen's 'Continue →' button after entering a valid amount. Repeated checks showed same URL, same visible content, and no dialog/sheet in DOM summaries.
- Why it matters: Users expect immediate feedback from high-priority actions, especially in a banking context. Silent non-response undermines trust and makes people hesitate before using other controls that might also fail.
- Suggested change: For each primary action, either complete the next step or provide immediate system feedback such as navigation, a sheet, a confirmation dialog, loading state, disabled-state rationale, or inline error/help text.
- Source hint: `index.html Home, Account, and Send screens; controls: notification badge, + Top up, ⚙, Sign out, Continue →`

## Medium Severity Findings

### The send flow gives good amount-entry feedback, but after entering a valid amount the primary CTA does not advance or explain what is missing.

- UX area: `goal completion`
- User goal: Send money after entering an amount.
- Evidence: Selecting $100 updated the amount and visibly selected the chip, but tapping 'Continue →' caused no URL or visible-text change; the screen remained on the same keypad/contact-picker state with no review step, recipient prompt, or error.
- Why it matters: A primary CTA that does nothing creates a hard stop in a core financial task. Users cannot tell whether the button is broken, whether recipient selection is required first, or whether the amount entry failed.
- Suggested change: If recipient selection is required before continuing, make that dependency explicit near the CTA or disable the button with a clear reason. Otherwise, advance to the next send step or show inline validation.
- Source hint: `index.html Send money screen; control: Continue →`

### Multiple important controls are below recommended mobile tap-target size, especially in high-frequency or high-risk areas.

- UX area: `accessibility`
- User goal: Tap small controls accurately on a phone-sized interface.
- Evidence: Observed small targets include the notification badge at 38x38px, 'See all' at 42x16px, Account gear at 34x30px, Send back at 36x36px, QR at 45x30px, receive-method tabs at 32px height, and amount chips around 50-57x25px.
- Why it matters: Small touch targets increase mistaps and make the interface harder to use for people with limited dexterity, larger fingers, or motion while mobile. The issue is especially problematic for actions tied to navigation, activity review, and money movement.
- Suggested change: Increase tap areas to at least 44x44px for icon buttons, links, segmented controls, and amount chips, even if the visible icon/text remains small.
- Source hint: `index.html across Home, Send, Receive, and Account screens`

### The privacy entry is clearly visible, but the settings list appears inconsistently exposed to interaction tooling, and a nearby settings affordance (gear) does nothing, which muddies the path to privacy controls.

- UX area: `clarity`
- User goal: Find and open privacy-related settings from Account.
- Evidence: The Account screen visibly includes 'Legal & privacy', 'Personal info', and 'Security & passkeys', but the chunk notes that visible settings rows were absent from the interactables list. A mis-targeted attempt hit 'Sign out' instead, and tapping the gear later showed no visible response.
- Why it matters: If settings rows do not feel obviously actionable or nearby settings affordances are inert, users may not know how to proceed to privacy details. This is especially damaging in a settings/privacy flow where confidence and predictability matter.
- Suggested change: Strengthen row affordance with consistent chevrons, larger hit areas, and reliable tap behavior, and make sure the header gear either opens a meaningful settings destination or is removed to avoid competing dead-end paths.
- Source hint: `index.html Account screen; rows including 'Legal & privacy' and header gear`

## Low Severity Findings

### Feedback quality is inconsistent across receive actions: Copy gives clear confirmation, but related share actions do not.

- UX area: `feedback`
- User goal: Switch receive methods and share payment details with confidence.
- Evidence: Tapping 'Copy' changed the button to a green '✓ Copied' state, while '📨 Send link' produced no visible feedback, no dialog, and no text change. Method switching to Crypto did show a meaningful content update, but other receive controls remained small.
- Why it matters: Users build trust through consistent confirmation patterns. When one share action confirms success and another appears to do nothing, it becomes unclear whether details were actually shared or copied.
- Suggested change: Match the successful 'Copied' pattern across other receive/share actions with immediate inline confirmation, toast feedback, or a visible share sheet.
- Source hint: `index.html Receive money screen; controls: Copy, 📨 Send link`

## Screenshots and Evidence

- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/initial-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/initial-responsive-screenshots-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/initial-responsive-screenshots-mobile.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/initial-after-responsive-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/post-plan-reset-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-01-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-02-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-03-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-04-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-05-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-06-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-07-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-08-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-09-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-10-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-11-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-12-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-13-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-14-scroll-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/harborwallet-mobile/_run/screenshots/agentic-15-click-desktop.png`

## Suggested Fix Priorities

1. Ensure tab highlighting is always derived from the currently visible screen state, and verify recovery flows like Activity → Home update both content and selected-tab styling together.
2. Provide a real activity list or, if intentionally empty, add a clear empty-state message with context such as 'No recent activity yet' plus a recovery/action prompt.
3. For each primary action, either complete the next step or provide immediate system feedback such as navigation, a sheet, a confirmation dialog, loading state, disabled-state rationale, or inline error/help text.
4. If recipient selection is required before continuing, make that dependency explicit near the CTA or disable the button with a clear reason. Otherwise, advance to the next send step or show inline validation.
5. Increase tap areas to at least 44x44px for icon buttons, links, segmented controls, and amount chips, even if the visible icon/text remains small.
6. Strengthen row affordance with consistent chevrons, larger hit areas, and reliable tap behavior, and make sure the header gear either opens a meaningful settings destination or is removed to avoid competing dead-end paths.
7. Match the successful 'Copied' pattern across other receive/share actions with immediate inline confirmation, toast feedback, or a visible share sheet.

## Claude Remediation

_Claude Code fix pass was not requested for this run._

## Trace Summary

- Trace entries: `55`
- Full trace: `trace.json`
- Structured report: `report.json`
