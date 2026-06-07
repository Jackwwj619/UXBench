# UXAgent Exploration Plan

## Goal

Explore the Atlas Tutor interface to validate the primary chat flow, the right-rail practice problem interaction, and the settings/privacy configuration (triggered by the gear icon), while identifying mobile usability issues.

## Plan Summary

The run will proceed in three phases: first validating the core chat and navigation interactions; second, exercising the 'Practice Problems' panel state machine (Solve -> Submit -> Correct); and third, accessing the Settings modal via the profile gear icon to check privacy controls. The exploration will conclude with a mobile viewport pass to verify layout responsiveness against the known tap-target risks.

## Coverage Targets

- pages: `100% of index.html interactive regions`
- features: `Chat composition, History navigation, Practice Problem solver, Settings Modal`
- mobile: `Critical path (Chat + Settings) verified on <600px width`

## Planned Phases

### Core Chat & Navigation Validation

- Objective: Verify the primary loop of selecting subjects, viewing history, and composing messages.
- Target pages: index.html
- Key checks:
  - Click 'Mathematics' and 'Programming' in left rail to verify subject filtering/highlighting.
  - Click a historical thread (e.g., 'Big-O of recursive Fibonacci') to verify context switching.
  - Type a query in the composer (ux-25) and verify the 'Send' button (ux-27) becomes active.
  - Test the 'Steps' (ux-5) and 'Practice' (ux-6) header toggles.
- Exit criteria:
  - Confirmed ability to switch between at least two different chat contexts.
  - Verified composer input field accepts text and triggers UI state changes.

### Practice Problem Interaction Flow

- Objective: Validate the state machine of the Right Rail practice problems (Solve → Hint → Submit).
- Target pages: index.html
- Key checks:
  - Select a problem from the Right Rail (e.g., Problem #1 'd/dx sin(3x + 2)').
  - Click 'Hint' to verify tooltip or text expansion.
  - Simulate solving: Click 'Solve' (or type answer if input appears) and then 'Submit'.
  - Verify the 'Correct/Incorrect' feedback state updates visually.
  - Check if the 'Your progress' card updates after completion.
- Exit criteria:
  - Successfully completed one full cycle of a practice problem.
  - Observed visual feedback for both 'Hint' and 'Submission' states.

### Settings & Privacy Configuration

- Objective: Access the settings menu via the profile footer and inspect privacy/data controls.
- Target pages: index.html
- Key checks:
  - Locate and click the Gear icon (ux-4) in the bottom-left profile footer.
  - Identify the resulting modal or drawer.
  - Look for 'Privacy', 'Data Usage', or 'Account' sections.
  - Toggle any available privacy switches (e.g., 'Share data for training').
  - Close the settings modal and verify return to main chat state.
- Exit criteria:
  - Settings modal successfully opened and closed.
  - At least one privacy-related control identified and interacted with.

### Mobile Responsiveness & Risk Check

- Objective: Repeat critical checks on mobile viewport to confirm layout warnings and tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Verify if the Left and Right rails collapse into hamburger menus or drawers.
  - Attempt to tap the Profile Gear icon (ux-4) to check for mis-hit risks.
  - Verify the Composer (ux-25) does not overlap with the keyboard or header.
  - Check if 'Practice' panel content is accessible or hidden on mobile.
- Exit criteria:
  - Confirmed behavior of sidebars on mobile (hidden vs. stacked).
  - Documented any unreachable controls due to screen real estate.

## Prescan Summary

### Atlas Tutor — math & CS tutor

- Page: `index.html`
- Headings: Chain rule — when both functions move, Chain rule
- Interactables: `40` buttons, `5` links, `2` inputs
- Notable controls:
  - clickable:a:Atlas Tutor
  - clickable:button:+ New chat
  - typeable:input:Search chats…
  - clickable:button:⚙
  - clickable:button:⌥ Steps
  - clickable:button:▶ Practice
  - clickable:button:⋯
  - clickable:button:👍

