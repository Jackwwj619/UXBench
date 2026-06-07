# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Brewlog mobile fixture by validating the primary brew-journal and stats experience, exercising the add/log flow, tab-based screen switching, and key mobile usability behaviors across desktop and true mobile viewports.

## Plan Summary

This run should treat index.html as a multi-screen mobile app embedded in one document, with the main flow centered on reviewing today's brews, switching among Today/Add/Stats/Beans via the bottom tab bar, and using the + Log entry point. Start by mapping which visible sections are true screens or in-page states, then validate each tab and the add form in depth before doing cross-screen recovery and viewport-specific checks. Give extra attention to the dense data cards, chart/summary sections under Stats, and the small + Log target already flagged in prescan.

## Coverage Targets

- pages: `Visit the only known HTML page (index.html) and traverse all reachable in-page screens/sections exposed by Today, Add, Stats, Beans, and + Log.`
- features: `Exercise nearly all visible high-value controls on the active screens: all bottom tabs, + Log, the main add/log form controls, and any interactive cards/charts/bean items that appear.`
- mobile: `Repeat the core navigation, add/log interaction, Today scan, and Stats readability checks in a true mobile viewport, with explicit verification of tap targets, bottom-nav usability, and edge-to-edge behavior.`

## Planned Phases

### Map screens and primary navigation

- Objective: Establish how the single-page mobile fixture is structured, which tabs/screens are available, and how the + Log entry point relates to the Add screen/form.
- Target pages: index.html
- Key checks:
  - Confirm which content is initially active on Today and what changes when tapping Today, Add, Stats, and Beans.
  - Determine whether tab switches show/hide full screens, jump-scroll to sections, or change active panel state within the page.
  - Tap + Log from the initial Today state and record whether it opens the same add form as + Add, a modal-like state, or a different section.
  - Verify tab active-state styling, state persistence, and whether repeated taps on the current tab are harmless.
  - Check whether hidden/inactive sections are still visible, tabbable, or partially overlapping the active screen.
- Exit criteria:
  - All four bottom tabs have been exercised at least once.
  - The relationship between Today, + Add, and + Log is clearly established.
  - A reliable navigation model for the rest of the run is identified.

### Validate Today journal and brew review flow

- Objective: Assess the default journal view for scanability, chronology, summary usefulness, and any interactions available on brew cards or daily groupings.
- Target pages: index.html
- Key checks:
  - Review the Today summary card ('2 brews · 32g coffee', avg score, extraction note) for clarity and hierarchy.
  - Inspect multiple brew cards across TODAY and YESTERDAY for readability of time, method, bean, recipe values, and score.
  - Test whether brew cards, ratings, note chips, or brew rows are tappable and whether any detail state opens.
  - Check for truncation or wrapping issues in longer bean names and tasting-note chips already visible (e.g. 'Brazil Fazenda Pinhal', 'Colombia La Esperanza').
  - Verify chronological grouping and labeling between TODAY and YESTERDAY, including whether scrolling preserves context.
- Exit criteria:
  - At least two Today entries and two Yesterday entries have been visually and interactively checked.
  - It is clear whether brew cards support drill-down or are display-only.
  - Any scanability or hierarchy issues in the journal list are documented.

### Exercise add/log form and input recovery

- Objective: Thoroughly test the brew logging workflow, including default values, input usability, validation/recovery cues, and safe navigation away/back.
- Target pages: index.html
- Key checks:
  - Open the add/log flow from both + Add and + Log if both are functional, and compare whether they land in the same state.
  - Inspect major form sections and field types exposed in the single on-page form; note defaults, placeholders, segmented controls, pickers, or toggles actually present.
  - Enter/edit representative values in a subset of fields to test form responsiveness, focus order, and whether controls are comfortably usable on mobile.
  - Attempt partial completion and then navigate away to another tab and back to see whether draft data is preserved, reset, or lost without warning.
  - If submission/save controls are present, test one happy-path save and one incomplete/edge-path interaction to observe validation messaging or silent failure.
  - Check whether the form causes vertical overflow, clipped controls, or keyboard-obscured fields in mobile viewport.
- Exit criteria:
  - The add/log workflow has been reached through available entry points.
  - A representative set of form controls has been edited.
  - Draft preservation and at least one recovery/validation behavior have been observed if supported by the UI.

### Validate Stats data visualization screen

- Objective: Critique the core analytics experience for clarity, consistency with journal data, and mobile presentation quality.
- Target pages: index.html
- Key checks:
  - Navigate to Stats and verify the presence and visibility of 'Score over time', 'Method mix', 'Top tasting notes', and 'Most-used beans'.
  - Assess whether each stats block is understandable without extra explanation and whether values appear consistent with the brew list shown on Today.
  - Check for any interactive affordances on charts/cards such as tabs, chips, hover substitutes, or selection states if visible.
  - Verify label readability, spacing, and whether chart elements or legends are clipped, crowded, or too subtle on mobile.
  - Scroll through the full Stats area to ensure section transitions are smooth and not mixed with unrelated screen content.
- Exit criteria:
  - All named Stats sections have been viewed.
  - Any interactive elements in Stats have been exercised if present.
  - Major visualization comprehension and mobile legibility issues are identified.

### Validate Beans screen and cross-screen coherence

- Objective: Check the Beans area as an adjacent browsing/reference flow and confirm consistency between bean data, journal entries, and add form selections.
- Target pages: index.html
- Key checks:
  - Open Beans and identify whether it is a list, cards, details panel, or static summary.
  - Test visible bean items or controls for selection/detail behavior if available.
  - Compare bean names shown in Beans with those already referenced in Today entries to evaluate data consistency.
  - If the add/log form contains bean-related inputs, verify whether Beans naming/options align with the form's terminology.
  - Navigate between Beans and other tabs to detect state loss, accidental scroll retention, or confusing backtracking.
- Exit criteria:
  - Beans has been explored to its end state or clear non-interactive limit.
  - Cross-screen naming consistency has been checked.
  - Tab-to-tab movement among Today/Add/Stats/Beans feels predictable or issues are recorded.

### Mobile-first regression and usability sweep

- Objective: Repeat critical interactions in the true mobile viewport and verify that the fixture behaves like an edge-to-edge mobile app, with special focus on touch targets and dense content.
- Target pages: index.html
- Key checks:
  - Repeat the main navigation path on mobile: Today → Add/+Log → Stats → Beans → back to Today.
  - Re-check the + Log button tapability and any other small or tightly packed controls against finger-friendly spacing.
  - Verify whether the phone frame/chrome on desktop transitions appropriately to edge-to-edge presentation at ≤460 px as stated in the site summary.
  - Inspect bottom tab bar safety near the home indicator area, ensuring labels/icons remain visible and tappable.
  - Confirm that long lists, cards, and charts do not overflow horizontally and that no text is clipped by the notch/status chrome simulation.
- Exit criteria:
  - All critical flows have been revalidated in mobile viewport.
  - Known hotspot controls have been specifically checked for touch usability.
  - Responsive differences between desktop fixture view and actual mobile view are understood.

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

