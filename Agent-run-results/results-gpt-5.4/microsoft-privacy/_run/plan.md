# UXAgent Exploration Plan

## Goal

Autonomously explore the full Microsoft privacy management experience, centered on the privacy dashboard and the linked data-management flows for browse history, ad settings, and data download, including destructive actions, save feedback, filtering, and responsive behavior.

## Plan Summary

Start on the privacy dashboard to validate the main information architecture, linked destinations, and the inline privacy-setting controls with their save states. Then follow the strongest adjacent flows exposed by the prescan: browse history management, ad personalization controls, and the download-your-data request flow. Reserve dedicated attention for destructive or stateful interactions such as clear/delete confirmations, master-detail toggle dependencies, and any mobile usability issues already hinted by the prescan's small tap target warnings.

## Coverage Targets

- pages: `Visit all 4 known HTML pages and return to the dashboard from at least two detail pages to verify hub-and-spoke navigation.`
- features: `Exercise the main visible controls on each key page: dashboard toggles and clear/download actions, browse-history filters/search/per-row delete/clear-all modal, ad-settings master and service toggles plus topic selections, and most major download-data form inputs and final submission.`
- mobile: `Repeat critical task checks on a mobile viewport for all known pages, with special focus on header/nav tap targets, modals, toggles, filter controls, and form usability.`

## Planned Phases

### Dashboard baseline and primary entry points

- Objective: Validate the privacy dashboard as the hub page, including content hierarchy, visible controls, and the main outbound paths into deeper privacy tasks.
- Target pages: index.html
- Key checks:
  - Confirm the dashboard loads with the expected major sections: hero, activity cards, privacy settings, and manage-your-data areas
  - Open the known working destinations from the dashboard: Download your data and Manage browse activity
  - Look for an entry to ad settings from the dashboard and use it if present; otherwise navigate directly later
  - Test visible hero/support actions that appear to use href="#" and note whether they do nothing, scroll, or mislead
  - Check whether the current Privacy tab in the account nav is clearly indicated and whether surrounding nav links appear interactive but nonfunctional
- Exit criteria:
  - Main dashboard structure and major sections are observed
  - All known linked destination pages have confirmed entry paths from the dashboard where available
  - Placeholder or dead-end links on the dashboard are identified with evidence

### Dashboard settings and destructive controls

- Objective: Exercise the dashboard's inline stateful controls and destructive data-management actions, focusing on feedback clarity and reversibility.
- Target pages: index.html
- Key checks:
  - Toggle each of the 6 privacy settings at least once and verify visible state change plus the promised "Saving…/Saved" feedback
  - Toggle a setting repeatedly or in quick succession to see whether feedback stacks, stalls, or becomes ambiguous
  - Use the manage-data download tile/action and confirm it routes consistently to download-data.html
  - Trigger the dashboard clear-data flow if exposed, inspect the second-confirmation modal, and validate both cancel and confirm paths
  - After any destructive confirmation, verify whether surrounding copy, counts, or empty messaging reflect the action
- Exit criteria:
  - Most or all dashboard toggles have been exercised with save feedback observed
  - Destructive clear flow has both cancel and confirm coverage
  - Any post-action confirmation, state persistence, or mismatch issues are documented

### Browse history management flow

- Objective: Validate the detailed activity-management experience for browse history, including filtering, item deletion, bulk clearing, and empty/no-results states.
- Target pages: browse-history.html
- Key checks:
  - Verify breadcrumb/back navigation to the privacy dashboard
  - Change Time range and Device selections and observe whether the table contents or visible state updates coherently
  - Use the search box with matching and likely non-matching terms to probe filtering and no-results behavior
  - Delete at least one individual history row using the trash icon and verify animation, row removal, and any count/state update
  - Trigger Clear all browse history and validate modal wording, cancel path, confirm path, and resulting empty state
  - Check whether the page still communicates browse-history saving status and the Change this setting link behavior
- Exit criteria:
  - Filter controls and search input have been exercised with observable results
  - Single-item delete and bulk clear have both been tested
  - An empty or cleared state has been reached or the inability to reach it has been explicitly noted

### Ad personalization controls

- Objective: Assess the clarity and behavior of ad-personalization settings, especially global-versus-local control relationships and topic selection affordances.
- Target pages: ad-settings.html
- Key checks:
  - Toggle the master "See ads that interest you" control and observe effects on service-level toggles/cards
  - Test at least two service-specific toggles both when the master setting is on and after changing the master setting
  - Check whether LinkedIn/Xbox/service cards communicate dependencies, disabled states, or contradictory combinations clearly
  - Interact with multiple ad-topic options and verify selection feedback for add/remove or multi-select behavior
  - Use breadcrumb/dashboard return navigation to confirm recoverability from this detail page
- Exit criteria:
  - Master toggle behavior relative to service-level controls is understood
  - Multiple service toggles and topic selections have been exercised
  - Any dependency confusion, unclear copy, or state inconsistency has been captured

### Download-your-data request and responsive pass

- Objective: Complete the data export flow coverage and then repeat the highest-value interactions on mobile to assess responsiveness and tap usability.
- Target pages: download-data.html, index.html, browse-history.html, ad-settings.html
- Key checks:
  - On download-data.html, test category selection patterns such as all/default versus a custom subset
  - Change the time-range option and delivery choice if multiple options are present
  - Proceed through the final confirmation/request action and verify any success, acknowledgement, or summary state
  - Check whether the form prevents invalid/incomplete submission if required selections are missing
  - Repeat critical mobile checks on all four pages: top navigation/header usability, dashboard toggles, browse-history filters/search/delete or clear modal, ad-settings master toggle, and download form controls
  - On mobile, specifically inspect controls already flagged in prescan for small tap targets and watch for wrapping, overlap, clipping, or horizontal scroll
- Exit criteria:
  - The download request flow has been taken as far as the UI allows with completion or validation feedback observed
  - A focused mobile pass has covered the main hub and each major detail flow
  - Responsive issues affecting task completion, readability, or tap accuracy are documented

## Prescan Summary

### Privacy dashboard | Microsoft account

- Page: `index.html`
- Headings: Privacy dashboard, Your activity data, Browse history, Search history, Location activity, Voice activity, Media activity, App and service activity, Xbox & gaming activity, Ad settings
- Interactables: `3` buttons, `42` links, `6` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Ad settings | Privacy dashboard | Microsoft account

- Page: `ad-settings.html`
- Headings: Ad settings, Personalization by service, Microsoft consumer apps, Bing & Microsoft Edge, LinkedIn, Xbox, Ad topics
- Interactables: `2` buttons, `18` links, `13` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Browse history | Privacy dashboard | Microsoft account

- Page: `browse-history.html`
- Headings: Browse history, Clear all browse history?
- Interactables: `15` buttons, `19` links, `3` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

### Download your data | Privacy dashboard | Microsoft account

- Page: `download-data.html`
- Headings: Download your data, 1 · What to include, 2 · Time range, 3 · How to deliver it, 4 · Confirm
- Interactables: `1` buttons, `22` links, `16` inputs
- Notable controls:
  - clickable:a:Microsoft
  - clickable:a:Support
  - clickable:a:Software
  - clickable:a:Devices
  - clickable:a:Gaming
  - clickable:a:Sign out
  - clickable:a:Home
  - clickable:a:Subscriptions

