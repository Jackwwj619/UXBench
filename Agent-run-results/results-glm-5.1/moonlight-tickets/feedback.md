# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full moonlight-tickets system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The MoonlightTickets checkout flow provides strong cost transparency and good destructive action recovery, but suffers from broken core discovery features and significant accessibility barriers. The genre filter on the index page is completely non-functional, and the checkout attendee forms lack proper labels and contain hidden interactive elements. Mobile usability is also a concern due to consistently undersized tap targets across the site, and the confirmation page is unreachable due to a routing error.

## Issues (7)

### [HIGH] selecting-a-genre-e-g-folk — goal completion
- **Page**: `index.html GENRE select`
- **Problem**: Selecting a genre (e.g., 'Folk') from the filter dropdown fails to update the event grid; both the 'Tonight' and 'This week' sections continue to display all events regardless of the selection.
- **Evidence**: Selecting 'Folk' in the Genre filter resulted in no visible change to the event grid, with non-Folk events still displayed. Tool feedback explicitly noted 'No obvious URL or visible-text change was detected after the action'.
- **Suggested fix**: Implement the JavaScript logic to filter the event cards based on the selected genre, and provide a clear active state for the selected filter.

### [HIGH] form-inputs-for-ticket-2-first — accessibility
- **Page**: `checkout.html Ticket 2 attendee inputs`
- **Problem**: Form inputs for Ticket 2 (First name, Last name, Email, VIP name) and the e-delivery checkbox are missing associated labels, aria-labels, or placeholders, making them invisible to screen readers.
- **Evidence**: Layout warnings repeatedly flagged medium-severity accessibility issues for Ticket 2 inputs (ux-6, ux-7, ux-8, ux-9, ux-10) missing proper labels.
- **Suggested fix**: Add explicit <label> elements linked to the inputs or meaningful aria-label attributes to clearly describe each field's purpose.

### [HIGH] the-ticket-2-attendee-form-fields — affordance
- **Page**: `checkout.html Ticket 2 accordion`
- **Problem**: The Ticket 2 attendee form fields and the 'Copy buyer info from ticket 1' button are hidden inside an unexpanded accordion section, making them appear non-interactive or missing entirely.
- **Evidence**: Clicking and typing into Ticket 2 fields (ux-6, ux-11) repeatedly failed with 'element is not visible' errors until the accordion was explicitly expanded.
- **Suggested fix**: Auto-expand the Ticket 2 accordion when a second ticket is added, or provide a much more prominent visual cue (e.g., a badge indicating 'Action required') to draw attention to the collapsed section.

### [HIGH] the-order-confirmation-page-confirmation-html — goal completion
- **Page**: `checkout.html -> confirmation.html redirect logic`
- **Problem**: The order confirmation page (confirmation.html) fails to load after checkout submission due to a URL routing error, breaking the end-to-end purchase flow.
- **Evidence**: Navigation attempts to confirmation.html resulted in net::ERR_FILE_NOT_FOUND. The network error showed the URL was malformed (confirmation.html%3Forder%3D1 instead of confirmation.html?order=1), indicating a bug in how the query parameter is appended.
- **Suggested fix**: Fix the URL routing logic in script.js to correctly append the query parameter using '?' instead of its URL-encoded equivalent '%3F'.

### [MEDIUM] after-confirming-order-cancellation-the-user — feedback
- **Page**: `checkout.html Cancel order flow`
- **Problem**: After confirming order cancellation, the user is redirected to the index page without any success message or toast notification.
- **Evidence**: Clicking 'Yes, cancel' successfully aborted the checkout and redirected to the index page, but 'No cancellation confirmation toast or message is displayed on the index page after redirect'.
- **Suggested fix**: Display a brief, non-intrusive toast or banner on the index page confirming 'Your reservation has been successfully cancelled.'

### [MEDIUM] critical-interactive-elements-such-as-ticket — mobile usability
- **Page**: `event.html steppers, checkout.html payment/checkboxes`
- **Problem**: Critical interactive elements, such as ticket steppers (+/−), payment radio buttons, and the 'Copy buyer info' button, have tap targets well below the 44x44px mobile guidance.
- **Evidence**: Layout warnings flagged stepper buttons (32x32px), payment radio buttons (13x13px), 'Copy buyer info' button (180x27px), and e-delivery checkboxes (550x13px) as undersized.
- **Suggested fix**: Increase the padding around interactive elements to meet the 44x44px minimum tap target size, especially for steppers, checkboxes, and radio buttons.

### [LOW] custom-fonts-inter-space-grotesk-fail — visual hierarchy
- **Page**: `styles.css @font-face declarations`
- **Problem**: Custom fonts (Inter, Space Grotesk) fail to load due to network errors, causing a fallback to system fonts which disrupts the intended dark after-dark visual theme.
- **Evidence**: Network errors consistently show 'ERR_ABORTED' for Inter and Space Grotesk font files across all pages.
- **Suggested fix**: Ensure font files are correctly hosted or use a reliable CDN, and implement font-display: swap to minimize layout shifts during loading.
