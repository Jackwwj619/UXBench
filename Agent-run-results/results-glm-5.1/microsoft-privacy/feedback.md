# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full microsoft-privacy system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Microsoft privacy dashboard provides strong contextual data summaries and clear feedback for some actions, but suffers from severe mobile usability issues and inconsistent filter behavior. Critical interactive elements like checkboxes and navigation links have tap targets far below the 44px minimum, making mobile interaction frustrating. Additionally, broken links, missing form validation messages, and a disconnected time range filter undermine user trust and clarity in managing privacy settings.

## Issues (6)

### [HIGH] checkbox-inputs-for-data-categories-and — mobile usability
- **Page**: `download-data.html input[type=checkbox], ad-settings.html input[type=checkbox]`
- **Problem**: Checkbox inputs for data categories and ad topics are critically small (13x13px), severely violating the 44px mobile tap target guidance and making accurate touch interaction extremely difficult.
- **Evidence**: Layout warnings consistently flag checkboxes (e.g., 'Account profile', 'Browse activity', 'Technology') as 13x13px across download-data.html and ad-settings.html on mobile viewports.
- **Suggested fix**: Increase the clickable area of checkboxes to at least 44x44px using CSS padding or custom styled checkboxes, ensuring the entire label text is also clickable.

### [HIGH] when-the-request-my-data-button — feedback
- **Page**: `download-data.html #submitDownload`
- **Problem**: When the 'Request my data' button is disabled due to unmet form requirements (e.g., no checkboxes selected), there is no visible validation message explaining why the button is disabled.
- **Evidence**: Clicking 'Request my data' when all checkboxes are cleared results in a timeout error because the button is disabled, but no inline text or tooltip explains the disabled state to the user.
- **Suggested fix**: Display an inline validation message near the disabled button or the checkbox section, such as 'Please select at least one data category to download.'

### [MEDIUM] selecting-a-time-range-in-the — clarity
- **Page**: `browse-history.html Time range dropdown`
- **Problem**: Selecting a time range in the filter dropdown does not update the activity table or the hint text, creating a disconnect between the user's action and the displayed data.
- **Evidence**: Selecting 'Last 7 days' in the Time range dropdown did not visibly update the activity table or the hint text, which still read 'This page shows browse activity from the last 30 days'.
- **Suggested fix**: Ensure the activity table and the descriptive hint text dynamically update to reflect the selected time range filter immediately upon selection.

### [MEDIUM] the-about-our-ads-link-acts — trust
- **Page**: `ad-settings.html a[href='#']`
- **Problem**: The 'About our ads' link acts as a dead link (href='#'), providing no information and appending a hash to the URL without any visible UI feedback or navigation.
- **Evidence**: Clicking 'About our ads' (ux-25) only appends '#' to the URL without providing any visible UI feedback, inline expansion, or navigation. Multiple footer links also use href='#'.
- **Suggested fix**: Implement the intended destination page, an inline expandable section, or a modal that provides the promised information about ad practices. Remove or disable the link if the content is not yet available.

### [MEDIUM] top-navigation-ribbon-links-and-secondary — mobile usability
- **Page**: `Global navigation ribbon and secondary nav tabs`
- **Problem**: Top navigation ribbon links and secondary navigation tabs have tap targets well below the 44px mobile guidance (e.g., 19px height for top ribbon, 38px for secondary nav), making them difficult to activate on touch screens.
- **Evidence**: Layout warnings consistently flag top navigation links (Microsoft 58x19px, Support 49x19px) and secondary nav links (Home 66x38px) as failing the 44px mobile tap target guidance.
- **Suggested fix**: Increase the vertical padding of navigation links to meet the 44px minimum touch target size, ensuring adequate spacing between adjacent links.

### [LOW] the-success-toast-message-contains-a — feedback
- **Page**: `ad-settings.html save toast`
- **Problem**: The success toast message contains a minor grammatical error, reading 'Your ad settings were save' instead of 'Your ad settings were saved'.
- **Evidence**: Clicking 'Save changes' successfully persisted the ad settings, as confirmed by the visible success toast '✓ Your ad settings were save' (note: minor grammatical error 'save' instead of 'saved').
- **Suggested fix**: Correct the typo in the success toast copy to read 'Your ad settings were saved.'
