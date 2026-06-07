# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the brewlog-mobile data-visualization fixture, validating the primary “Today/Log/Add” workflow and adjacent “Stats/Beans” navigation plus recovery states.

## Plan Summary

Start from index.html and exercise the bottom navigation (Today/ Add/ Stats/ Beans) and the prominent + Log control. Proceed to any discovered modals/forms to log a brew, then validate that Stats and Beans views update appropriately (or show clear empty/error states). Repeat critical checks on the mobile viewport (≤460px) to confirm layout, tap targets, and state persistence.

## Coverage Targets

- pages: `Visit all known HTML pages (only index.html is present per prescan).`
- features: `Exercise every visible control: bottom tab buttons (4) and top '+ Log' (plus the logging form inputs revealed after interaction).`
- mobile: `Repeat Phase 1 and the full submit check from Phase 2 on a mobile viewport (≤460px), including explicit testing of the '+ Log' small tap target.`

## Planned Phases

### Baseline & navigation sanity on desktop

- Objective: Validate the initial Today view, the tab bar interactions, and that the UI state transitions are coherent.
- Target pages: index.html
- Key checks:
  - Verify initial content corresponds to Today’s brews (cards shown under TODAY and a summary card for 2 brews, avg score 8.2)
  - Tap/click each bottom tab button once: '☕ Today', '+ Add', '📊 Stats', '🫘 Beans' and confirm visible section/content changes
  - Confirm active tab styling (selected indicator) updates appropriately after each switch
  - Use back/return via the tab bar (e.g., switch to Stats then back to Today) and verify content resets or persists as expected
- Exit criteria:
  - All four bottom tab buttons are confirmed to switch the primary view on index.html
  - No console or network errors observed during navigation
  - Active state changes are visually and functionally correct for all tabs

### Brew logging flow from '+ Log' and '+ Add'

- Objective: Exercise the primary brew logging entry point(s), validate the form UX, and ensure successful submission updates the data views.
- Target pages: index.html
- Key checks:
  - Trigger brew logging using '+ Log' (top right) and separately using '+ Add' (tab bar), confirming both entry points lead to the same/compatible logging UI
  - If a form/modal appears: verify fields, labels, and default values (e.g., method/time/weights/score and tasting notes chips)
  - Attempt submission with incomplete data to check validation messages and blocking behavior
  - Complete a valid brew entry and submit; confirm user gets success feedback (toast/banner/state change) and that the new brew appears in the Today list/cards
- Exit criteria:
  - Logging UI can be opened from both '+ Log' and '+ Add'
  - Validation is present for missing/invalid fields (no silent failure)
  - After a successful log, Today content updates to reflect the new entry (or clearly indicates how it will update)

### Data visualization interactions & consistency

- Objective: Validate Stats/Beans visual sections for correctness, interactivity (if any), and resilience to varying data counts.
- Target pages: index.html
- Key checks:
  - Navigate to '📊 Stats' and verify the presence and layout of: 'Score over time', 'Method mix', 'Top tasting notes'
  - Navigate to '🫘 Beans' and verify 'Most-used beans' section renders correctly
  - After logging at least one new brew in Phase 2, re-check Stats and Beans to confirm they update (or verify explicit refresh behavior)
  - If any chart elements are clickable/hoverable: validate that selection changes state predictably and that tooltips/labels are readable
- Exit criteria:
  - Stats and Beans sections render without visual glitches
  - At least one post-log verification confirms visual data consistency with the new brew entry
  - Any interactive chart affordances behave consistently and provide readable feedback

### Recovery & edge states (cancel, empty, and repeat actions)

- Objective: Test recovery paths and edge states for the logging and view switching experiences.
- Target pages: index.html
- Key checks:
  - Open the logging UI, then cancel/close (if available) and verify no unwanted data persists or that it persists intentionally (per UX expectations)
  - Repeat the logging flow multiple times (e.g., log two brews) to validate list growth and scrolling behavior
  - Stress test switching: start logging, switch tabs before submitting (if possible) and confirm state handling (prompt/auto-save/prevent-loss) matches UI cues
  - Look for empty-state handling: if the fixture can be reduced (e.g., via navigation filters), validate empty charts/sections show friendly messaging rather than broken layouts
- Exit criteria:
  - Cancel/close behavior is clear and does not lead to confusing partial state
  - Repeated logs do not break layout (cards/charts remain readable and not overlapped)
  - View switching during logging produces no unexpected data loss without warning

### Mobile viewport re-validation (≤460px)

- Objective: Confirm the same core flows work on mobile layout, with special attention to tap targets and the bottom tab bar.
- Target pages: index.html
- Key checks:
  - Run the same primary checks from Phase 1: switch tabs and verify content transitions on mobile viewport
  - Specifically test tap accuracy on '+ Log' (small tap target flagged) and ensure it reliably triggers the logging UI
  - Validate bottom tab bar ergonomics: buttons are reachable, active state visible, and content isn’t obscured by the tab bar
  - Re-test one full log submission (open form → submit) and confirm resulting Today/Stats/Beans updates are visible without overflow
- Exit criteria:
  - Critical interactions (tab switching, + Log/Add, submit) succeed on mobile without mis-taps
  - No layout overlaps with the tab bar or clipped text in cards/charts
  - Mobile tap target concerns are either resolved or clearly documented as UX issues

## Prescan Summary

### Brewlog — mobile fixture

- Page: `index.html`
- Headings: TODAY, YESTERDAY, Log a brew, Stats, Score over time, Method mix, Top tasting notes, Most-used beans, Beans
- Interactables: `24` buttons, `0` links, `29` inputs
- Notable controls:
  - clickable:button:+ Log
  - clickable:button:☕ Today
  - clickable:button:+ Add
  - clickable:button:📊 Stats
  - clickable:button:🫘 Beans

