# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full fred-unrate system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core visualization flow is reasonably usable: chart/table toggling, range presets, manual date edits, and mobile download/share menus all provide understandable in-context behavior. However, trust and clarity are undermined by a large number of prominent links and menu items that look actionable but only point to '#' and often respond with no navigation or a toast-only pseudo-success. Mobile usability also feels cramped, with many undersized tap targets and dense controls, and coverage is only partial (42% of visible features exercised), so some adjacent utilities remain unverified.

## Issues (7)

### [HIGH] many-prominent-discovery-and-trust-building — trust
- **Page**: `index.html; metadata links, breadcrumbs, related content, release tables`
- **Problem**: Many prominent discovery and trust-building links appear clickable but do not actually navigate anywhere, creating a misleading experience and weakening confidence in the page.
- **Evidence**: Multiple tested links stayed on the same URL and often have href '#': 'U.S. Bureau of Labor Statistics', 'Employment Situation', 'Categories', 'Current Population Survey (Household Survey)', 'Gross Domestic Product', 'All Employees, Total Nonfarm', 'Real Gross Domestic Product', and release-table links all produced no navigation or visible page change across chunks steps-19-24, 25-30, 31-36, 43-48, and 49-54.
- **Suggested fix**: Either wire these links to real destinations or restyle/remove them so they do not present as primary navigation. For items meant to stay in-page, provide clear panel expansion, inline details, or another visible outcome instead of a no-op.

### [HIGH] the-fullscreen-state-appears-to-trap — error recovery
- **Page**: `index.html; #fullscreenLayer / Fullscreen flow`
- **Problem**: The fullscreen state appears to trap interaction and block recovery, with the overlay intercepting pointer events and preventing normal controls from being used.
- **Evidence**: In steps-37-42, a full-page '#fullscreenLayer' intercepted pointer events during hover and close attempts. The attempt to click 'Close maintenance notice' repeatedly failed because elements inside '#fullscreenLayer' blocked interaction, and the notes say 'the blocking layer can trap users trying to dismiss it.'
- **Suggested fix**: Ensure fullscreen has an obvious, always-available close control, trap focus correctly within the overlay, and allow Escape/tap-out dismissal where appropriate. Prevent hidden page-layer controls from appearing interactable while blocked.

### [MEDIUM] the-mobile-layout-packs-many-controls — mobile usability
- **Page**: `index.html mobile; header controls, range controls, breadcrumbs, tabs`
- **Problem**: The mobile layout packs many controls into small targets, making common actions harder to tap accurately.
- **Evidence**: Final observation reports 79 layout warnings on mobile. Specific undersized targets include the 36x36 maintenance close button, 38x38 nav/search/apps/account buttons, 30px-tall chart/data-table tabs, 54x30px range presets, and many 22px-tall breadcrumb links. Chunks 31-36, 55-60, 61-66, and 67-72 repeatedly flag sub-44px targets.
- **Suggested fix**: Increase target sizes and spacing for the mobile header, breadcrumb trail, range presets, and utility controls. Consider collapsing secondary actions behind fewer, larger controls on small screens.

### [MEDIUM] date-range-editing-relies-on-plain — forms
- **Page**: `index.html; From and To inputs`
- **Problem**: Date range editing relies on plain text entry rather than a date picker, so users must type exact YYYY-MM-DD values manually.
- **Evidence**: In steps-67-72, the tester notes 'There is some mobile input friction because the From and To fields are plain text inputs rather than native date pickers.' The visible controls are labeled From/To and successful edits required manually entering values like 2023-01-01.
- **Suggested fix**: Use native date inputs or a date picker, while still supporting direct typing for advanced users. Preserve the current inline validation message as a fallback.

### [MEDIUM] several-utilities-rely-on-brief-toast — feedback
- **Page**: `index.html; download/share/account/tools/app menus`
- **Problem**: Several utilities rely on brief toast messages without a persistent result, and some imply a successful open action even though nothing actually opens.
- **Evidence**: Examples include 'FRED API opened.' with no navigation (steps-61-66), 'ALFREDVintage data opened.' with no URL change (steps-79-79), 'Save Graph is ready after sign in.' as a temporary toast (steps-73-78), and 'Custom Graph Link copied.' only via snackbar (steps-78). The tool often detected no visible URL/text change despite these actions.
- **Suggested fix**: Prefer durable confirmations tied to the action: copied-state labels, persistent status text, opened panels, or actual navigation. Avoid wording like 'opened' when the result is only a toast.

### [MEDIUM] the-data-table-surfaces-at-least — clarity
- **Page**: `index.html; View as data table`
- **Problem**: The data table surfaces at least one blank UNRATE value without explanation, which can look like a rendering or data-quality bug.
- **Evidence**: In steps-01-06, after selecting 'View as data table,' the visible table included row '2025-10-01' with a blank UNRATE value, and the notes explicitly call this a data-quality edge case that could confuse users if unexplained.
- **Suggested fix**: Render missing values with an explicit placeholder such as 'N/A' or em dash plus a short note explaining missing or not-yet-available observations.

### [LOW] after-dismissing-the-maintenance-banner-there — accessibility
- **Page**: `index.html; maintenance notice close button #closeBanner`
- **Problem**: After dismissing the maintenance banner, there is no evident focus recovery or announcement confirming where keyboard/screen-reader focus moved.
- **Evidence**: Session memory notes that clicking the maintenance notice close button removed the banner cleanly, but 'there is no visible focus indicator or announcement confirming where keyboard/screen-reader focus moved after dismissal.'
- **Suggested fix**: Move focus to the next logical heading or main content landmark after dismissal and announce the dismissal in an accessible live region.
