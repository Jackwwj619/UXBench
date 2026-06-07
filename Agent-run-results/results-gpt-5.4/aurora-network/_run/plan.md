# UXAgent Exploration Plan

## Goal

Exhaustively explore Aurora Network’s privacy settings experience, centered on the Privacy & Audience overview and the four linked management surfaces, while validating key state changes, destructive/recovery paths, and responsive usability.

## Plan Summary

Start from the Privacy & Audience overview to confirm the hub, cross-links, and snapshot framing of the privacy system. Then work through each linked page in order of user impact: default audience, tag review, past post visibility, and muted words, exercising visible controls and checking whether feedback, summaries, and navigation stay coherent. Reserve extra attention for bulk/destructive actions and pages with many controls, then repeat critical paths on mobile because the prescan already shows multiple undersized tap targets.

## Coverage Targets

- pages: `Visit all 5 known HTML pages, with at least one return to index.html to compare overview state against deeper-page actions.`
- features: `Exercise most visible controls on each key page: overview links and snapshot links; all audience radio options plus save/discard and custom-list affordances; tag-review item and bulk actions; past-post filters plus one bulk apply; muted-word add/remove plus import/export and scope/duration controls.`
- mobile: `Repeat the overview navigation and at least one representative action on each of the four management pages in a mobile viewport, with special attention to prescan-reported small tap targets.`

## Planned Phases

### Map the privacy hub and navigation model

- Objective: Validate the overview page as the entry point, including card links, left-side privacy navigation, snapshot summary, and any directly actionable 'Change' links.
- Target pages: index.html
- Key checks:
  - Open each privacy destination from the overview cards: Default audience, Tag review, Past post visibility, Muted words
  - Compare left-nav privacy links against the card links to confirm they reach the same pages and use consistent naming/count cues
  - Inspect the 'Snapshot of your current privacy' section and test visible 'Change' links, noting which are actionable versus placeholder # links
  - Check whether overview copy correctly distinguishes new-post settings from retroactive controls such as Past post visibility
  - Record whether tag-review count ('7 pending') appears consistently in card and left-nav badge
- Exit criteria:
  - All overview-originating privacy links have been followed at least once
  - Any dead, placeholder, or inconsistent 'Change' links are identified with evidence
  - The relationship between overview summary content and deeper settings pages is understood before deeper interaction

### Exercise default audience and tagging preferences

- Objective: Test the primary settings flow for choosing who can see new posts, including save/discard behavior, custom-list affordances, and adjacent tag-permission settings.
- Target pages: audience.html
- Key checks:
  - Cycle through the four audience radio options: Public, Friends, Custom list…, Only me, observing helper/explanatory text changes
  - Use 'Save default' after changing audience and verify whether the selected state and any explanation remain stable
  - Use 'Discard changes' after making a different selection to confirm recovery to the prior state
  - Choose the 'Custom list…' path and inspect visible custom-list affordances including '+ New list' and the listed saved lists with recent-use metadata
  - Check whether selecting different audience options affects visible explanation text such as search-indexing implications or friend visibility wording
  - Exercise the 'Who can tag you?' radio block and note whether labels and resulting state are understandable alongside the separate Tag review page
  - Navigate back to the overview after a save, if possible, to see whether snapshot/default audience indicators update
- Exit criteria:
  - At least one successful save and one discard path have been attempted
  - All four audience options have been selected and observed
  - Custom-list management affordances and tag-permission controls have been inspected enough to assess discoverability and clarity

### Validate moderation queue actions in tag review

- Objective: Assess single-item and bulk triage flows for pending tags, with emphasis on clarity of consequence, queue updates, and safe handling of higher-risk actions.
- Target pages: tag-review.html
- Key checks:
  - Review the queue header and initial pending count ('7 tags waiting for review') against overview/nav badge counts
  - Use per-item actions on a sample of entries: Approve, Hide tag, and Block user, checking resulting item state/removal and any feedback
  - Inspect entries with additional context such as 'You don't follow this account' to see whether risk cues are prominent enough
  - Test one bulk action path ('Approve all' or 'Hide all') after first understanding whether confirmation or undo exists
  - Check whether action labels distinguish profile-linking effects from original-post visibility, matching the explanatory copy
  - Confirm whether counts update after individual or bulk actions and whether an empty-state appears when the queue is cleared
- Exit criteria:
  - All three per-item action types have been exercised on at least one item if enabled
  - One bulk action path has been explored with its aftermath documented
  - Queue count/update behavior and any confirmation/undo pattern are known

### Probe bulk visibility changes for past posts

- Objective: Test the highest-risk retroactive privacy flow by combining filters with the 'Apply to visible' action and checking whether scope is transparent and recoverable.
- Target pages: past-posts.html
- Key checks:
  - Inspect the timeline/year controls and the year select to understand how narrowing content works
  - Change audience filters (Any audience, Public only, Friends only, Only me) and verify that the visible post list matches the selected filter
  - Change the target audience select (Friends / Only me / Public) and confirm that it is clearly separated from the filter controls
  - Apply changes to a narrowed visible subset using 'Apply to visible' and watch for confirmation, warnings, or post-level updates
  - Compare the on-page instruction 'what you see is what gets changed' against actual behavior after filtering
  - Test whether individual post 'Edit' links are actionable or placeholders, and whether they support recovery or deeper inspection
- Exit criteria:
  - At least one filtered bulk-apply scenario has been executed
  - The distinction between filters and target audience has been validated
  - Any lack of confirmation, undo, or scope clarity for the bulk action is documented

### Stress muted words input and list management

- Objective: Exercise the page with the highest control density by testing add/remove flows, scope messaging, duration/settings controls, and file-related affordances visible on the page.
- Target pages: blocked-words.html
- Key checks:
  - Add a new muted word/phrase using the text input and the visible Enter-to-save pattern, then verify it appears in the list
  - Try edge inputs such as duplicate phrase, hashtag phrase, and multi-word phrase if allowed by the UI, observing validation or silent failure
  - Remove one or more existing muted-word chips using the × affordance and check for immediate feedback or recovery
  - Inspect the 'Where do these apply?' section to verify the included/exempted surfaces are understandable and internally consistent
  - Exercise visible duration-related inputs/options on the page and observe whether scope/duration selections are clear
  - Test 'Import .txt' and 'Export .txt' controls to determine whether they trigger local demo behavior, no-op behavior, or browser file flows
  - Check whether the displayed total entry count changes when words are added or removed
- Exit criteria:
  - At least one add and one remove flow have been completed
  - Import/export affordances have been probed enough to characterize their behavior
  - The page’s scope messaging, count behavior, and control clarity have been assessed

### Repeat critical checks on mobile

- Objective: Re-run the most important navigation and action paths in a mobile viewport, focusing on tap targets, density, wrapping, and whether high-risk controls remain usable.
- Target pages: index.html, audience.html, tag-review.html, past-posts.html, blocked-words.html
- Key checks:
  - Verify mobile access to each privacy page from the overview and/or side navigation equivalent
  - Recheck known small tap-target areas from prescan: top nav items, left-nav privacy links, and overview card links
  - On audience.html, confirm radio options, save/discard buttons, and custom-list controls remain easy to tap and read
  - On tag-review.html, verify repeated per-item action buttons do not crowd or wrap into ambiguous groupings
  - On past-posts.html, confirm filters and the 'Apply to visible' control remain understandable without horizontal overflow or accidental activation
  - On blocked-words.html, verify chip list wrapping, delete × affordances, input usability, and import/export controls under smaller width
- Exit criteria:
  - Critical path pages have each been viewed on mobile
  - At least one key action per major page has been attempted on mobile
  - Mobile-specific usability findings are collected for navigation and high-risk controls

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

