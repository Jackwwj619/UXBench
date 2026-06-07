# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the aurora-network privacy settings system, covering the primary flow (overview → key subpages) and adjacent states, ensuring mobile responsiveness is validated.

## Plan Summary

Start on the index (privacy overview), explore each main subpage (audience, tag-review, past-posts, blocked-words) in phases, validate interactables and layout on desktop and mobile. Check for consistency, error states, and recovery paths.

## Coverage Targets

- pages: `visit all 5 target pages (index, audience, tag-review, past-posts, blocked-words)`
- features: `exercise all visible controls (links, inputs, buttons, selectors) per page, including batch actions and dynamic content`
- mobile: `repeat critical checks (navigation, batch actions, inputs) on mobile viewport for all pages`

## Planned Phases

### Privacy Overview (index.html)

- Objective: Validate overview page structure, links, and snapshot panel
- Target pages: index.html
- Key checks:
  - Click each main card link (Default audience, Tag review, Past post visibility, Muted words) and verify navigation
  - Check 'Snapshot' panel interactables (Change links) for responsiveness
  - Validate mobile viewport: check small tap targets (links) and layout consistency
- Exit criteria:
  - All main links navigate to correct pages
  - Snapshot interactables are responsive
  - Mobile layout warnings are noted (small tap targets)

### Default Audience (audience.html)

- Objective: Test audience selection, custom lists, and tag permissions
- Target pages: audience.html
- Key checks:
  - Select each audience option (Public, Friends, Custom list, Only me) and verify dynamic explanations
  - Interact with custom list manager (+New list, existing lists) and check state changes
  - Test 'Who can tag you?' radio block
  - Validate mobile viewport: check input/button sizes and layout
- Exit criteria:
  - All audience options update explanations correctly
  - Custom list interactions work as expected
  - Tag permissions radio block is functional
  - Mobile interactables are usable (despite small tap target warnings)

### Tag Review (tag-review.html)

- Objective: Test tag approval/hiding workflows and batch actions
- Target pages: tag-review.html
- Key checks:
  - Approve/Hide individual tags and verify state changes
  - Test 'Approve all' and 'Hide all' batch actions
  - Check 'Block user' action and verify feedback
  - Validate mobile viewport: check button sizes (batch actions) and layout
- Exit criteria:
  - Individual tag actions work
  - Batch actions (Approve all/Hide all) apply to all pending tags
  - Block user action provides feedback
  - Mobile batch action buttons are accessible

### Past Post Visibility (past-posts.html)

- Objective: Test bulk post visibility changes and filtering
- Target pages: past-posts.html
- Key checks:
  - Filter posts by year and audience (selectors) and verify visible posts update
  - Test 'Apply to visible' button (note: simulate action, check feedback)
  - Check post 'Edit' links for individual post changes
  - Validate mobile viewport: check filter selectors and 'Apply' button usability
- Exit criteria:
  - Filters update visible posts correctly
  - 'Apply to visible' provides clear feedback (e.g., confirmation/error)
  - Individual post 'Edit' links work
  - Mobile filters and buttons are usable

### Muted Words (blocked-words.html)

- Objective: Test word muting, import/export, and scope settings
- Target pages: blocked-words.html
- Key checks:
  - Add a new word/phrase (type and press Enter) and verify addition
  - Test 'Import .txt'/'Export .txt' buttons (simulate file actions)
  - Check 'Where do these apply?' section for clarity
  - Validate mobile viewport: check input field and button sizes
- Exit criteria:
  - New words are added successfully
  - Import/Export buttons provide feedback (e.g., file dialog simulation)
  - Scope explanation is clear
  - Mobile input/buttons are usable

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

