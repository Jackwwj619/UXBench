# UXAgent Exploration Plan

## Goal

Evaluate the UX of the 'Brewlog' mobile fixture, focusing on the data visualization hierarchy, the efficiency of the logging flow, and the responsiveness of the tab navigation.

## Plan Summary

The exploration will begin by validating the 'Today' dashboard's information density and readability. It will then proceed to exercise the primary '+ Log' action to test form usability and input validation. Finally, it will traverse the 'Stats' and 'Beans' tabs to verify data consistency and layout integrity across different views.

## Coverage Targets

- pages: `Full coverage of index.html states (all 4 tabs).`
- features: `Exercise all 24 buttons and critical subset of the 29 inputs.`
- mobile: `Repeat Phase 1 and Phase 2 on mobile viewport (390px width) to specifically test the '+ Log' tap target and touch interactions.`

## Planned Phases

### Dashboard & Navigation Baseline

- Objective: Validate the initial state, readability of brew cards, and stability of the bottom tab bar.
- Target pages: index.html
- Key checks:
  - Verify 'Today' vs 'Yesterday' section separation is visually distinct.
  - Check that brew cards display all key metrics (ratio, temp, score) without truncation.
  - Click each bottom tab (Today, Add, Stats, Beans) to ensure smooth transitions and correct active states.
- Exit criteria:
  - All 4 tabs accessed successfully.
  - No layout shifts or overlapping elements observed during tab switching.

### Primary Flow: Logging a Brew

- Objective: Test the usability of the '+ Log' interaction and the subsequent data entry form.
- Target pages: index.html
- Key checks:
  - Tap the '+ Log' button (ux-1) and observe the entry method (modal vs. inline).
  - Attempt to fill out a sample brew entry (Method, Bean, Weight, Time).
  - Check for input masks or helpers for numeric fields (e.g., auto-formatting time or weight).
  - Submit the form and verify the new entry appears at the top of the 'Today' list.
- Exit criteria:
  - One successful brew log created.
  - Form validation errors (if any) are clearly visible and actionable.

### Data Visualization & Stats

- Objective: Assess the clarity and utility of the aggregated data views.
- Target pages: index.html
- Key checks:
  - Navigate to the 'Stats' tab.
  - Inspect 'Score over time' and 'Method mix' visuals for label readability.
  - Verify that the stats reflect the data seen on the 'Today' tab (consistency check).
  - Check for empty states or loading indicators if applicable.
- Exit criteria:
  - Stats charts are rendered legibly.
  - Data consistency confirmed between Dashboard and Stats.

### Inventory Management (Beans)

- Objective: Explore the 'Beans' repository and its relationship to the logging flow.
- Target pages: index.html
- Key checks:
  - Navigate to the 'Beans' tab.
  - Review the list of available beans (e.g., Brazil Fazenda Pinhal, Ethiopia Yirgacheffe).
  - Check if there is an 'Add Bean' function and how it integrates with the main log form.
  - Verify search or filter capabilities if present.
- Exit criteria:
  - Bean list is accessible and readable.
  - Relationship between Beans and Log form understood.

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

