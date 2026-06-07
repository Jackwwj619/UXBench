# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Aurora Network privacy settings, focusing on the flow from the overview dashboard to specific configuration pages (Audience, Tags, History, Muted Words), validating state changes, feedback loops, and mobile responsiveness.

## Plan Summary

The run will begin at the Privacy Overview hub, verifying the 'Snapshot' panel accuracy. It will then systematically traverse the four primary privacy modules: configuring Default Audience (including custom lists), processing the Tag Review queue, testing Past Post Visibility filters, and managing Muted Words. Each phase includes validation of UI feedback and error states, concluding with a mobile viewport check for touch target accessibility given the prescan warnings.

## Coverage Targets

- pages: `Visit all 5 HTML files (index, audience, tag-review, past-posts, blocked-words).`
- features: `Exercise all radio groups, bulk action buttons, filter dropdowns, and list management controls.`
- mobile: `Repeat Phases 1, 2, and 3 on mobile viewport to validate touch targets.`

## Planned Phases

### Overview & Navigation Baseline

- Objective: Validate the entry point, information architecture, and the accuracy of the 'Snapshot' summary panel.
- Target pages: index.html
- Key checks:
  - Verify all 4 privacy cards link to correct destinations.
  - Check 'Snapshot' panel values match expected defaults (e.g., Audience: Friends).
  - Test 'Change' links in the Snapshot panel for correct routing.
  - Assess visual hierarchy between 'Privacy' and 'Notifications' sections.
- Exit criteria:
  - All primary navigation links verified working.
  - Snapshot panel data points documented.

### Default Audience Configuration

- Objective: Explore the complexity of audience selection, specifically the 'Custom list' logic and radio button interactions.
- Target pages: audience.html
- Key checks:
  - Toggle through all 4 radio options (Public, Friends, Custom, Only Me).
  - Verify dynamic explanation text updates correctly for each option.
  - Interact with 'Custom list' manager: inspect existing lists (Close friends, Work circle).
  - Test 'Who can tag you?' secondary control block.
  - Attempt to save/discard changes to observe feedback mechanisms.
- Exit criteria:
  - All audience options exercised.
  - Custom list inspection completed.
  - Save/Discard behavior understood.

### Tag Review Workflow

- Objective: Evaluate the efficiency of the moderation queue for pending tags.
- Target pages: tag-review.html
- Key checks:
  - Review the 7 pending items for content clarity (who tagged, context).
  - Test individual actions: Approve, Hide tag, Block user.
  - Test bulk actions: 'Approve all' and 'Hide all'.
  - Verify if 'Block user' triggers a confirmation dialog or immediate action.
  - Check for empty state messaging after clearing the queue.
- Exit criteria:
  - At least one individual action performed.
  - Bulk action functionality tested.
  - Queue state updated visually.

### Historical Data & Bulk Actions

- Objective: Assess the safety and clarity of the 'Past post visibility' bulk editing tool.
- Target pages: past-posts.html
- Key checks:
  - Test year filter dropdowns (2019-2026).
  - Test audience filter (Public only, Friends only, etc.).
  - Verify the 'Apply to visible' button state (disabled/enabled) based on selections.
  - Look for warning modals or confirmations before applying bulk changes.
  - Check if the timeline view provides enough context for decision making.
- Exit criteria:
  - Filters tested and results observed.
  - Safety mechanisms for bulk actions identified.

### Muted Words Management

- Objective: Validate the input methods and scope definitions for content filtering.
- Target pages: blocked-words.html
- Key checks:
  - Test adding a new word/phrase via input field.
  - Test removing an existing word (e.g., 'spoiler').
  - Verify 'Import .txt' and 'Export .txt' buttons (file picker interaction).
  - Review the 'Where do these apply?' section for clarity on exemptions (DMs).
  - Check for case-sensitivity or hashtag handling explanations.
- Exit criteria:
  - Add/Remove word flow completed.
  - Import/Export triggers verified.
  - Scope rules reviewed.

### Mobile Responsiveness & Accessibility

- Objective: Re-evaluate critical flows on mobile viewport, specifically targeting the prescan's 'small tap target' warnings.
- Target pages: index.html, audience.html, tag-review.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Attempt to tap 'Change' links in Snapshot panel (verify precision required).
  - Test radio button selection on Audience page (touch friendliness).
  - Check Tag Review card actions (Approve/Hide) for overlap or mis-taps.
  - Verify navigation menu collapse/expansion behavior if applicable.
- Exit criteria:
  - Critical paths usable on mobile despite small targets.
  - Specific usability issues documented for reporting.

## Prescan Summary

### Privacy & Audience — Aurora Network

- Page: `index.html`
- Headings: SETTINGS, Privacy & Audience, Default audience, Tag review 7 pending, Past post visibility, Muted words, Snapshot of your current privacy
- Interactables: `0` buttons, `26` links, `0` inputs
- Notable controls:
  - clickable:a:Aurora
  - clickable:a:Home
  - clickable:a:Discover
  - clickable:a:Messages
  - clickable:a:Settings
  - clickable:a:Profile
  - clickable:a:Account
  - clickable:a:Overview

### Default audience — Aurora Network

- Page: `audience.html`
- Headings: SETTINGS, Default audience, Custom lists, Who can tag you?
- Interactables: `3` buttons, `12` links, `8` inputs
- Notable controls:
  - clickable:a:Aurora
  - clickable:a:Home
  - clickable:a:Discover
  - clickable:a:Messages
  - clickable:a:Settings
  - clickable:a:Profile
  - clickable:a:Account
  - clickable:a:Overview

### Muted words — Aurora Network

- Page: `blocked-words.html`
- Headings: SETTINGS, Muted words, Your muted words, Where do these apply?
- Interactables: `21` buttons, `12` links, `8` inputs
- Notable controls:
  - clickable:a:Aurora
  - clickable:a:Home
  - clickable:a:Discover
  - clickable:a:Messages
  - clickable:a:Settings
  - clickable:a:Profile
  - clickable:a:Account
  - clickable:a:Overview

### Past post visibility — Aurora Network

- Page: `past-posts.html`
- Headings: SETTINGS, Past post visibility
- Interactables: `1` buttons, `20` links, `11` inputs
- Notable controls:
  - clickable:a:Aurora
  - clickable:a:Home
  - clickable:a:Discover
  - clickable:a:Messages
  - clickable:a:Settings
  - clickable:a:Profile
  - clickable:a:Account
  - clickable:a:Overview

### Tag review — Aurora Network

- Page: `tag-review.html`
- Headings: SETTINGS, Tag review
- Interactables: `23` buttons, `12` links, `0` inputs
- Notable controls:
  - clickable:a:Aurora
  - clickable:a:Home
  - clickable:a:Discover
  - clickable:a:Messages
  - clickable:a:Settings
  - clickable:a:Profile
  - clickable:a:Account
  - clickable:a:Overview

