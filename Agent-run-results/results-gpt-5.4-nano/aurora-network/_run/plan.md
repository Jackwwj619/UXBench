# UXAgent Exploration Plan

## Goal

Critique and validate the full Aurora Network privacy settings experience (overview and management sub-pages), including how users recover from risky/irreversible actions and how pending items are handled.

## Plan Summary

Start from index.html and move through the four privacy-management entry cards to validate the core settings flows: Default audience, Tag review, Past post visibility, and Muted words. For each sub-page, exercise the primary controls shown in the prescan, then return to the Overview snapshot to confirm state presentation. Finally, repeat the most critical checks on mobile viewport focusing on tap targets and control operability.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise most visible controls per key page: radio groups + save/discard (audience), bulk + per-item actions (tag-review), year/audience filters + apply (past-posts), add/remove + import/export (blocked-words)`
- mobile: `repeat critical checks on mobile viewport for navigation, applying changes, and editing operations (at least one action per key control cluster)`

## Planned Phases

### Overview entry + Snapshot consistency

- Objective: Validate that index.html correctly routes to each privacy-management surface and presents the current privacy state snapshot coherently.
- Target pages: index.html
- Key checks:
  - Verify the four privacy cards (Default audience, Tag review 7, Past post visibility, Muted words) navigate to the correct pages via their visible links.
  - Record the initial Snapshot values shown on index.html (Profile visibility, Default post audience, Story audience, Search engine indexing, Show online status, Allow tags from).
  - After returning from each sub-page, confirm the Snapshot values update or remain consistent with what was changed.
- Exit criteria:
  - All four cards successfully navigate to their intended pages (audience.html, tag-review.html, past-posts.html, blocked-words.html).
  - Initial Snapshot values are captured and can be re-checked after sub-page interactions.

### Default audience & custom lists

- Objective: Exercise Default audience selection and custom list management, validating save/discard semantics and the 'Who can tag you?' block presence.
- Target pages: audience.html
- Key checks:
  - Use the radio-group options (Public, Friends, Custom list…, Only me) and confirm the selected option is visually reflected.
  - Test 'Save default' vs 'Discard changes' by changing an option, then discarding—verify whether the Default audience selection and any displayed downstream implications revert.
  - In 'Custom lists' area: select a list from the visible examples (e.g., Close friends, AS BK CY DN, etc.) and verify it becomes the effective default for the 'Custom list…' selection.
  - Use 'New list' (create flow) if present/operable; at minimum, validate the UI allows initiating a new list and returns to a stable state.
  - Verify the 'Defaults to your last used list' helper text aligns with current UI behavior when switching away and back.
  - Validate presence and operability of the 'Who can tag you?' radio block (even if not fully exercised, ensure it is reachable and its options update correctly).
- Exit criteria:
  - Radio selection changes are applied and can be cancelled via Discard without unintended persistence.
  - At least one custom list selection is validated end-to-end (selection -> effective default behavior -> return to index snapshot or visible explanation).

### Tag review: pending queue actions (bulk + per-tag)

- Objective: Validate how pending tags are reviewed, ensuring bulk and per-tag actions apply to the correct items and reflect the described 'approve vs hide' semantics.
- Target pages: tag-review.html
- Key checks:
  - Confirm the pending queue count ('7 tags waiting for review') matches the number of visible tag cards/items at load.
  - Use 'Approve all' and validate that each tag’s state changes consistently (and that the UI no longer treats them as pending).
  - Repeat with 'Hide all' (if possible to restore state within the session) and validate that 'hide' behavior hides tag linking/visibility per description.
  - For at least one individual item: click 'Approve' and verify only that tag is approved.
  - For at least one individual item: click 'Hide tag' and verify only that tag is hidden (pending status/controls update accordingly).
  - For at least one individual item: click 'Block user' and validate resulting UI state (e.g., tag removed/blocked messaging) and no unintended cross-item changes.
- Exit criteria:
  - At least one bulk action and one per-tag action are validated with clear UI state transitions.
  - The interface consistently reflects pending vs reviewed status according to the prescan description.

### Past post visibility sweep (filters + irreversible action handling)

- Objective: Validate the sweep workflow: filters/timeline selection, applying to visible posts, and how irreversible impact is communicated/confirmed.
- Target pages: past-posts.html
- Key checks:
  - Use the 'All years' selector (2019–2026) to filter the timeline (e.g., pick a single year) and confirm visible posts count/list changes.
  - Change 'Any audience' filter (Public only / Friends only / Only me) and validate posts list updates accordingly.
  - Use 'Apply to visible' and validate there is either (a) a confirmation step, or (b) very clear irreversible messaging preventing accidental bulk changes (per index warning).
  - After applying, verify the visible posts/audience labels update to reflect the new restricted audience for the affected visible subset.
  - Attempt a second sweep within the session to ensure filters are still working and state doesn’t desync.
- Exit criteria:
  - Filters correctly narrow 'visible posts' and 'Apply to visible' affects only that set.
  - Irreversible action risk is handled with either confirmation or strong UI safeguards, and the post audience updates are observable.

### Muted words: add/remove/import/export + matching clarity

- Objective: Validate the muted words editor: add via input, remove via chip/x, and import/export actions; ensure matching rules and 'where they apply' are clear and operable.
- Target pages: blocked-words.html
- Key checks:
  - Use the 'Add a word or phrase. Press Enter to save.' input: add a new phrase (e.g., one short phrase) via Enter and verify it appears in 'Your muted words'.
  - Remove the newly added phrase via its delete control (e.g., '×') and verify it is removed.
  - Test one of the matching rule clarifications: add a phrase resembling one of the shown examples (e.g., '#nft' vs 'free crypto') and validate the UI indicates intended matching behavior (or at minimum preserves the entered string faithfully).
  - Use 'Import .txt' flow if operable (ensure file selection UI appears, and the page handles cancel vs success without breaking the list).
  - Use 'Export .txt' and validate it triggers a download or generates export content (or shows a clear stub if demo-only).
  - Verify 'Where do these apply?' section links/explanations are present and scannable (Home feed, Comments, Reels/Discover, DMs, Notifications, Duration).
- Exit criteria:
  - Muted word add/remove works reliably with immediate list updates.
  - Import/export controls are reachable and do not leave the UI in an inconsistent state.

### Mobile critical-path validation

- Objective: Repeat the most critical interactions on mobile viewport, focusing on operability and tap-target usability flagged by the prescan.
- Target pages: index.html, audience.html, tag-review.html, past-posts.html, blocked-words.html
- Key checks:
  - On index.html: tap the four cards to ensure navigation works despite small tap targets in the top bar/sidebar.
  - On audience.html: toggle between at least two Default audience radio options; test Save default vs Discard changes using mobile interactions.
  - On tag-review.html: use 'Approve all' (or a single 'Approve') and verify the action triggers correctly on touch.
  - On past-posts.html: use filters and then 'Apply to visible'; validate confirmation/irreversible messaging is readable and actionable on mobile.
  - On blocked-words.html: add a word via the input (Enter) and remove it; ensure Import/Export buttons are tappable.
- Exit criteria:
  - All critical-path actions (navigate -> set options -> apply changes) complete successfully on mobile without mis-taps.
  - Irreversible warnings and primary action buttons remain readable and tappable.

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

