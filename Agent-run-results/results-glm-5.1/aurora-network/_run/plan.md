# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Aurora Network privacy and audience settings, validating all interactive controls, state changes, and cross-page consistency across desktop and mobile viewports.

## Plan Summary

The exploration will proceed from the central privacy hub (index.html) outwards to each specific privacy setting page. It will validate the primary flows of changing default audiences, reviewing pending tags, bulk-editing past post visibility, and managing muted words. Finally, it will assess cross-cutting concerns like navigation consistency, layout warnings (especially small tap targets), and mobile responsiveness.

## Coverage Targets

- pages: `visit and interact with all 5 known HTML pages`
- features: `exercise all visible controls: radio groups, filters, bulk actions, list management, import/export`
- mobile: `repeat critical checks (navigation, audience selection, tag approval) on mobile viewport to validate layout warnings`

## Planned Phases

### Hub & Snapshot Validation

- Objective: Verify the index.html hub layout, card navigation, and snapshot panel accuracy.
- Target pages: index.html
- Key checks:
  - Verify all four privacy cards correctly navigate to their respective pages.
  - Check if 'Change' links in the Snapshot panel navigate to the correct sub-pages.
  - Validate that the snapshot accurately reflects the default states (e.g., Default post audience: Friends).
  - Test global navigation stubs (Home, Discover, etc.) to confirm they do not break the flow.
- Exit criteria:
  - All card links and snapshot 'Change' links clicked and verified.
  - Snapshot state recorded for later comparison.

### Audience & Custom Lists

- Objective: Test the default audience radio group, dynamic explanations, and custom list management.
- Target pages: audience.html
- Key checks:
  - Select each radio option (Public, Friends, Custom list, Only me) and verify the dynamic explanation text updates correctly.
  - Interact with the custom list manager: attempt to view members of 'Close friends', and attempt to create a '+ New list'.
  - Test 'Save default' and 'Discard changes' buttons for clear feedback.
  - Verify the 'Who can tag you?' radio block functionality.
- Exit criteria:
  - All radio options selected and explanations verified.
  - Custom list interaction attempted.
  - Save/Discard behavior observed.

### Tag Review Queue

- Objective: Validate the tag review queue interactions, including individual and bulk actions.
- Target pages: tag-review.html
- Key checks:
  - Approve and Hide individual tags, verifying they are removed from the pending queue.
  - Test the 'Block user' action for a tag from a non-followed account.
  - Execute 'Approve all' and 'Hide all' bulk actions and check for confirmation prompts or immediate execution.
  - Verify the count in the heading (7 tags) updates as actions are taken.
- Exit criteria:
  - Individual approve/hide tested.
  - Bulk actions tested.
  - Queue count changes observed.

### Past Post Visibility & Muted Words

- Objective: Test bulk editing of past posts and the muted words list management.
- Target pages: past-posts.html, blocked-words.html
- Key checks:
  - On past-posts.html: Use year and audience filters, verify the post list updates accordingly.
  - On past-posts.html: Change the bulk audience selector and click 'Apply to visible', checking for warnings or confirmations.
  - On blocked-words.html: Add a new muted word via the input field and 'Mute' button.
  - On blocked-words.html: Remove an existing muted word using the '×' button.
  - On blocked-words.html: Test 'Import .txt' and 'Export .txt' buttons for expected behavior.
  - On blocked-words.html: Toggle the 'Where do these apply?' checkboxes.
- Exit criteria:
  - Past post filters and bulk apply tested.
  - Muted word added and removed successfully.
  - Import/Export attempted.
  - Application scope checkboxes toggled.

### Mobile & Cross-Cutting Review

- Objective: Re-evaluate critical flows and layout warnings on a mobile viewport to ensure responsiveness and tap-target usability.
- Target pages: index.html, audience.html, tag-review.html, blocked-words.html
- Key checks:
  - Switch to mobile viewport and check if the sidebar navigation collapses or adapts correctly.
  - Verify that the small tap targets flagged in the prescan (e.g., nav links, sidebar items) are usable or cause layout issues on mobile.
  - Re-test the audience radio selection and tag review approvals on mobile to ensure controls are not obscured.
  - Check for horizontal scrolling or overflow issues on all pages.
- Exit criteria:
  - All pages viewed on mobile viewport.
  - Critical interactions (audience change, tag approval) successfully executed on mobile.
  - Layout and tap target issues documented.

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

