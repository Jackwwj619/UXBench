# UXAgent Exploration Plan

## Goal

Exhaustively explore Aurora Network's privacy and audience settings flow, with emphasis on the overview hub, default audience configuration, tag review queue, past post visibility bulk actions, and muted words management, including mobile usability checks.

## Plan Summary

Start from the Privacy & Audience overview to map how the four privacy surfaces connect and to verify the snapshot panel reflects navigation targets. Then validate each dedicated page in turn, exercising the visible controls and confirming state/explanation changes where the UI suggests them. Treat bulk/privacy-impacting controls as high risk, and repeat the critical interactions on mobile because the prescan shows multiple small tap targets across the settings pages.

## Coverage Targets

- pages: `Visit all known HTML pages in the prescan: index.html, audience.html, tag-review.html, past-posts.html, and blocked-words.html.`
- features: `Exercise the primary controls on each page: overview card navigation, audience radio choices, tag review batch and per-item moderation, past-posts filters plus bulk apply, and muted words add/remove/import/export.`
- mobile: `Repeat the most important interactions on a mobile viewport and explicitly check the small tap targets, navigation reachability, and layout stability.`

## Planned Phases

### Map the privacy hub

- Objective: Confirm index.html acts as the central privacy hub and that the four feature cards and snapshot links route correctly.
- Target pages: index.html
- Key checks:
  - Open each of the four privacy cards from the hub: Default audience, Tag review, Past post visibility, and Muted words.
  - Click the inline 'Change' links in the snapshot panel and verify they lead to the expected destination page or reveal any mismatch.
  - Note whether the snapshot values visually correspond to the current state described in the cards.
  - Check whether the left nav and top nav create duplicate or confusing entry points.
- Exit criteria:
  - All known privacy entry points from the hub have been visited or confirmed.
  - Any mismatched or redundant links from the snapshot/overview are identified.
  - The relationship between the overview and the four subpages is understood well enough to proceed.

### Validate default audience and tagging rules

- Objective: Exercise the main audience selection flow and inspect the adjacent custom list and tag-permission controls on audience.html.
- Target pages: audience.html
- Key checks:
  - Cycle through the visible audience radio options: Public, Friends, Custom list, and Only me.
  - Observe the dynamic explanation text for each selection and confirm it changes in a way that matches the chosen audience.
  - Inspect the custom list section, including the New list control and the visible lists/usage hints, for clarity and obvious interactive affordances.
  - Check the 'Who can tag you?' radio block and confirm it is distinct from the default audience setting.
  - If Save default and Discard changes are active, test both flows to confirm whether unsaved changes are handled consistently.
- Exit criteria:
  - Every visible audience option has been selected at least once.
  - The tag-permission controls and custom list area have been inspected for state/feedback behavior.
  - Any save/discard behavior has been validated or confirmed absent.

### Review pending tags

- Objective: Test the moderation queue and batch/individual actions on tag-review.html.
- Target pages: tag-review.html
- Key checks:
  - Verify the queue count (7 pending) matches the list content shown on the page.
  - Test the page-level actions Approve all and Hide all, if they are enabled, and note how the queue changes afterward.
  - For several individual items, exercise Approve, Hide tag, and Block user to confirm each action has distinct feedback or state impact.
  - Check whether the UI makes it clear that pending tags remain visible in the original post even when the profile tag is hidden.
- Exit criteria:
  - At least one batch action and several per-item actions have been tested.
  - The distinction between approving a tag and hiding/blocking it is clear from observed behavior.
  - The queue/count behavior is validated for consistency.

### Audit historical post restrictions

- Objective: Exercise the bulk historical visibility sweep and the filtering controls on past-posts.html.
- Target pages: past-posts.html
- Key checks:
  - Change the year filter and audience filter to confirm they narrow the visible posts as expected.
  - Inspect the per-post Edit actions to understand whether the page supports item-level changes as well as bulk changes.
  - Use Apply to visible after selecting a filter combination and observe whether the selected visible posts are affected together.
  - Verify that the page communicates the bulk-action risk described on the overview, especially that it is a sweeping historical change.
- Exit criteria:
  - Both filtering dimensions have been used.
  - The bulk apply control has been tested against a visible subset.
  - The page's historical privacy implications are confirmed to be clearly signposted or not.

### Stress-test muted words management

- Objective: Validate phrase management on blocked-words.html, including add/remove and import/export behaviors.
- Target pages: blocked-words.html
- Key checks:
  - Add at least one new phrase via the input and Mute action, then verify whether it appears in the list.
  - Remove one or more existing muted words via the chip delete controls to check deletion clarity and undo absence/presence.
  - Inspect Import .txt and Export .txt for discoverability and any obvious state changes or prompts.
  - Review the scope/explanation section to confirm where muted words apply and whether exceptions are understandable.
  - If duration or other settings are exposed below the fold, scroll to confirm they are present and accessible.
- Exit criteria:
  - List add/remove behavior has been exercised.
  - Import/export controls have been opened or tested enough to confirm their role.
  - Scope/exemption text has been reviewed for clarity.

### Mobile usability pass

- Objective: Repeat the most important interactions in a mobile viewport and confirm the dense privacy UI remains operable.
- Target pages: index.html, audience.html, tag-review.html, past-posts.html, blocked-words.html
- Key checks:
  - Revisit the overview and the four privacy pages at mobile width, with special attention to the small-tap-target warnings.
  - Check whether the sidebar/nav items, top nav, and action controls remain reachable without overlap or accidental taps.
  - Repeat one high-risk action per page on mobile: open a card from the hub, change an audience option, act on one tag, adjust a filter/apply action, and add/remove a muted word.
  - Note any layout shifts that hide content, truncate labels, or make the card grid/side nav difficult to use.
- Exit criteria:
  - Critical interactions have been repeated on mobile for the key pages.
  - Any mobile-specific failures or usability degradations have been captured.
  - Coverage is sufficient to compare desktop vs mobile behavior for the main privacy flows.

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

