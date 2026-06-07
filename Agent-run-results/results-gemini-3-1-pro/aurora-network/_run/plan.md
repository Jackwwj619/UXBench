# UXAgent Exploration Plan

## Goal

Exhaustively explore and validate the UX of the Aurora Network privacy settings, interacting with all sub-pages and controls across both desktop and mobile viewports.

## Plan Summary

The run will begin at the privacy overview hub, validating navigation via cards and the sidebar. It will systematically visit each of the four privacy surfaces: Default Audience, Tag Review, Past Post Visibility, and Muted Words. In each surface, the agent will exercise forms, lists, and bulk action controls to document the interactive state and check for usability issues, especially tap target sizes on mobile.

## Coverage Targets

- pages: `Visit all 5 HTML pages identified in the prescan.`
- features: `Exercise the primary form controls (radios, selects, inputs, buttons) on every settings page.`
- mobile: `Ensure all pages are viewed in mobile mode, specifically checking the usability of small tap targets flagged in the prescan.`

## Planned Phases

### Hub Navigation & Layout

- Objective: Verify the structure of the overview page and navigation pathways.
- Target pages: index.html
- Key checks:
  - Verify all 4 privacy cards link to the correct sub-pages.
  - Check that 'Change' links in the Snapshot panel navigate correctly.
  - Evaluate sidebar navigation accessibility and tap target sizes.
- Exit criteria:
  - All primary navigation links have been tested.

### Default Audience Configuration

- Objective: Test the audience selection and custom list management.
- Target pages: audience.html
- Key checks:
  - Interact with the radio group (Public, Friends, Custom list, Only me).
  - Attempt to trigger custom list creation or selection.
  - Test 'Save default' and 'Discard changes' buttons.
- Exit criteria:
  - Audience radio buttons and save actions have been exercised.

### Tag Review Interactions

- Objective: Validate the queue management for pending tags.
- Target pages: tag-review.html
- Key checks:
  - Test bulk actions ('Approve all', 'Hide all').
  - Test individual item actions ('Approve', 'Hide tag', 'Block user').
  - Check mobile layout of the tag queue items.
- Exit criteria:
  - Both bulk and individual tag review actions have been clicked.

### Past Post Visibility Adjustments

- Objective: Test filtering and bulk editing of past posts.
- Target pages: past-posts.html
- Key checks:
  - Change filters for 'All years' and 'Any audience'.
  - Change the audience dropdown for an individual past post.
  - Click the 'Apply to visible' button to test bulk application.
- Exit criteria:
  - Filters have been adjusted and visibility changes attempted.

### Muted Words Management

- Objective: Test adding, removing, and configuring muted words.
- Target pages: blocked-words.html
- Key checks:
  - Type a new word into the input and attempt to add/save it.
  - Click the 'x' buttons to remove existing muted words.
  - Toggle the checkboxes under 'Where do these apply?'.
  - Click Import/Export buttons to check for dialogs or errors.
- Exit criteria:
  - Input, deletion, and scoping of muted words have been tested.

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

