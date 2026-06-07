# UXAgent Exploration Plan

## Goal

Explore and critique the UX of brewlog-mobile, focusing on the primary data visualization (brew logs, stats) and adjacent flows (logging, beans management) across desktop and mobile viewports.

## Plan Summary

Start on the Today screen (index.html), validate the primary brew log visualization flow (Today), explore adjacent flows (Add, Stats, Beans) via bottom tabs, check mobile viewport consistency, and validate interaction hotspots like the +Log button and tab navigation.

## Coverage Targets

- pages: `Visit and validate all sections (Today, Add, Stats, Beans) within index.html.`
- features: `Exercise tab navigation (all 4 tabs), +Log button, brew entry details (if interactive), and Stats/Beans interactivity.`
- mobile: `Repeat critical checks (tab navigation, +Log, brew logs) in mobile viewport to ensure consistency.`

## Planned Phases

### Primary Brew Log Visualization (Today)

- Objective: Validate the Today section: brew log display, data consistency, and basic interactivity (e.g., brew entry details).
- Target pages: index.html
- Key checks:
  - Verify TODAY and YESTERDAY brew logs match visible text.
  - Check brew entry details (e.g., V60 · Brazil Fazenda Pinhal) for interactivity (tap to expand?).
  - Validate average score and extraction summary display.
- Exit criteria:
  - TODAY and YESTERDAY brew logs are verified.
  - Average score and extraction summary match visible text.

### Adjacent Flow: Log a New Brew (+Log Button)

- Objective: Validate the +Log button: interaction (tap to open form/dialog), form fields (if visible), and cancel/submit flow.
- Target pages: index.html
- Key checks:
  - Tap +Log button (ux-1) to open log form.
  - Verify form fields (inputs: 29) are visible and labeled (e.g., coffee type, weight, time).
  - Check cancel/submit functionality (if available).
- Exit criteria:
  - +Log button interaction is validated (opens form).
  - Form fields are visible and labeled (basic validation).

### Adjacent Flow: Tab Navigation (Add, Stats, Beans)

- Objective: Validate bottom tab navigation (Today, Add, Stats, Beans): section switching, content rendering, and consistency.
- Target pages: index.html
- Key checks:
  - Tap + Add tab (ux-3) to switch to Add section: verify content (e.g., log form or brew method selection).
  - Tap 📊 Stats tab (ux-4) to switch to Stats: verify data visualizations (Score over time, Method mix, etc.).
  - Tap 🫘 Beans tab (ux-5) to switch to Beans: verify bean management content (Most-used beans, etc.).
  - Check tab state (active/inactive) visual feedback.
- Exit criteria:
  - All four tabs (Today, Add, Stats, Beans) navigate to their respective sections.
  - Section content (Add: form, Stats: visualizations, Beans: bean list) is rendered correctly.

### Mobile Viewport Validation (Today Section)

- Objective: Validate the Today section in mobile viewport: layout consistency, tap target sizes, and content readability.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (≤460px).
  - Verify TODAY/YESTERDAY brew logs are readable and layout is edge-to-edge.
  - Check +Log button tap target (ux-1) size on mobile (≥44px? If not, note risk).
  - Validate brew entry details are accessible on mobile.
- Exit criteria:
  - Today section layout is consistent on mobile.
  - Critical tap targets (e.g., +Log, brew entries) are accessible (or risks noted).

### Adjacent Flows in Mobile Viewport (Add, Stats, Beans)

- Objective: Validate Add, Stats, and Beans sections in mobile viewport: tab navigation, content rendering, and interactivity.
- Target pages: index.html
- Key checks:
  - Tap +Add tab (ux-3) in mobile view: verify form/dialog layout.
  - Tap 📊 Stats tab (ux-4) in mobile view: verify data visualization (e.g., Score over time, Method mix) rendering.
  - Tap 🫘 Beans tab (ux-5) in mobile view: verify bean list and management options.
- Exit criteria:
  - Tab navigation to Add/Stats/Beans works in mobile view.
  - Content in each section is rendered and readable on mobile.

### Stats and Beans Data Visualization

- Objective: Validate Stats (data visualizations: Score over time, Method mix, etc.) and Beans (bean list, management) sections: rendering, interactivity, and data consistency.
- Target pages: index.html
- Key checks:
  - Tap 📊 Stats tab (ux-4): verify data visualizations (e.g., charts, lists) render correctly.
  - Check interactivity in Stats (e.g., tapping a method in Method mix filters brews?).
  - Tap 🫘 Beans tab (ux-5): verify bean list (Most-used beans, etc.) and management options (e.g., add beans).
- Exit criteria:
  - Stats visualizations render and basic interactivity is validated (if applicable).
  - Beans section content and management options are verified.

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

