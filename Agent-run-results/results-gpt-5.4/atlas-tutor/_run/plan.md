# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Atlas Tutor chat experience, with emphasis on the primary settings/privacy entry point and adjacent conversation, practice, navigation, and responsive states visible in the prescan.

## Plan Summary

The run should treat index.html as a dense app-like surface rather than a multi-page site, starting with baseline verification of the three-column desktop layout and then exercising the core learning flow: history/navigation, active conversation tools, composer/suggestions, and the right-rail practice workflow. Because only one HTML page is known, coverage should focus on state changes and overlays that may be triggered in-page, especially the settings gear, practice controls, concept links, and message actions. Repeat the most important interaction paths on mobile, where the prescan already shows many undersized tap targets.

## Coverage Targets

- pages: `Visit the only known HTML page (index.html) and explore all major in-page states, panels, and overlays it exposes.`
- features: `Exercise most visible controls on the shell, conversation, composer, navigation/history, and practice rail; prioritize settings/privacy, top tools, search, new chat, concept links, and multi-state practice interactions.`
- mobile: `Repeat the highest-value checks on a mobile viewport, especially settings access, a basic chat interaction, history/navigation access, and at least one practice interaction, with special attention to the prescan's small tap targets.`

## Planned Phases

### Desktop baseline and app structure

- Objective: Confirm the initial desktop information architecture, sticky regions, and visible affordances before changing state.
- Target pages: index.html
- Key checks:
  - Verify the three-column layout is present: left rail, central conversation, right practice rail
  - Inspect sticky behavior of the conversation header and bottom composer during scroll
  - Record the default selected thread, selected subject, and visible right-rail lesson alignment with the active conversation
  - Check whether the left footer profile mini and settings gear remain accessible while scrolling
  - Note any initially hidden content below the fold, including full practice panel and concepts/progress cards
- Exit criteria:
  - Initial desktop structure and major regions have been visually confirmed
  - At least one full-page scroll validates sticky header/composer behavior and reveals lower right-rail content

### Settings/privacy and top-level controls

- Objective: Prioritize discovery of the settings/privacy flow and validate related global controls exposed from the shell.
- Target pages: index.html
- Key checks:
  - Activate the ⚙ settings control and inspect whether it opens a settings/privacy panel, modal, menu, or navigates within the page
  - If settings opens, explore privacy-relevant sections, toggles, close behavior, focus handling, and return path to the conversation
  - Open the ⋯ overflow control to discover hidden global actions if present
  - Toggle or open ⌥ Steps and ▶ Practice from the header to understand whether they switch modes, scroll the page, or reveal supplemental UI
  - Validate keyboard or pointer dismissal paths for any overlay, drawer, or modal opened from these controls
- Exit criteria:
  - The settings/privacy entry path has been either exercised or conclusively determined absent/inert
  - All visible top header/global controls have been clicked once and their outcomes documented

### Conversation and composer workflow

- Objective: Test the core tutoring interaction flow around existing messages, quick prompts, and reply actions.
- Target pages: index.html
- Key checks:
  - Use one or more suggestion chips to confirm whether they populate the composer, send immediately, or alter topic context
  - Type into the main textarea and use the send button to test message submission and any loading/reply state that appears
  - Try the attachment and mic controls to determine whether they open menus, show permissions messaging, or remain inert
  - Inspect the model selector near the composer if interactive and verify whether model choice changes visible state
  - Exercise message actions on the assistant response: thumbs up, thumbs down, Share, Copy, and Try again
  - Check whether Copy provides feedback, Share opens a native/custom share flow, and Try again duplicates/regenerates content without breaking scroll position
- Exit criteria:
  - At least one composer-originated interaction and at least three message-level actions have been exercised
  - Observed outcomes for chips, send flow, and auxiliary composer controls are captured

### Navigation, history, and lesson context switching

- Objective: Validate how users move across subjects, prior threads, search results, and concept links without losing orientation.
- Target pages: index.html
- Key checks:
  - Use the Search chats input to filter history and then clear/recover the full list
  - Open several history threads across Today, Last 7 days, and Earlier to verify selected-state updates and conversation/context changes
  - Switch among subject categories such as Mathematics, Programming, Physics, Statistics, and Linear algebra to see whether they filter or navigate
  - Click the Atlas Tutor brand/home affordance to see whether it resets the current state
  - Open the concept links card items (Chain rule, Derivatives of trig functions, Composing functions, Notation: f', dy/dx, ḟ) and observe whether they scroll, replace context, or open subviews
  - Use + New chat and assess whether it clears the conversation, creates a draft state, or changes the right rail
- Exit criteria:
  - Search, history switching, subject switching, and concept-link behavior have each been tested at least once
  - A recovery path back to the original or a stable conversation state has been verified

### Practice workflow and progress tracking

- Objective: Deeply validate the right-rail problem-solving experience and its integration with progress/state.
- Target pages: index.html
- Key checks:
  - Inspect all visible practice cards, including difficulty pills and problem numbering, for consistency and readability
  - Use Hint on at least one easy and one harder problem to verify hint reveal behavior and repeatability
  - Exercise the Solve control on multiple problems and confirm the documented 3-state Solve → Submit → Correct sequence if implemented
  - Check whether solved/submitted states update the Your progress card and progress bar
  - Confirm that practice interactions do not unexpectedly reset the main conversation or cause layout jumps
  - Test whether the header ▶ Practice button synchronizes with the right-rail panel or moves focus to it
- Exit criteria:
  - At least two practice problems have been interacted with through meaningful state changes
  - Progress behavior and any coupling between practice and conversation have been observed

### Mobile responsive validation

- Objective: Repeat critical flows on mobile to assess navigation, density, discoverability, and tap-target risks already indicated by the prescan.
- Target pages: index.html
- Key checks:
  - Verify how the three-column desktop layout collapses on mobile and whether left/right rail content remains discoverable
  - Repeat access to settings/privacy from the ⚙ control on mobile
  - Repeat one conversation action path: open a thread, type or use a suggestion chip, and send or attempt send
  - Repeat one practice interaction and confirm whether hints/solve states are usable in the mobile layout
  - Inspect tap usability of small controls including header buttons, overflow, reactions, Share, Copy, Try again, and settings
  - Check for clipped text, overlap, off-screen drawers, hidden sticky composer issues, and horizontal scrolling
- Exit criteria:
  - Critical settings/chat/practice flows have each been attempted once on mobile
  - Responsive issues and mobile-specific blockers have been identified for the highest-risk controls

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

