# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tablerose system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Tablerose booking flow is functionally complete from search to confirmation, but suffers from systemic mobile usability issues and several dead-end interactions. Small tap targets (13x13px) on all checkboxes and radio buttons make the guest details form highly frustrating on touch devices. Critical post-booking actions on the confirmation page—Modify, Resend email, and calendar exports—are completely unresponsive, leaving users without expected functionality or feedback. Additionally, misleading filter counts and missing form labels further degrade the user experience.

## Issues (9)

### [HIGH] all-dietary-checkboxes-and-occasion-radio — mobile usability
- **Page**: `guest.html dietary/occasion inputs`
- **Problem**: All dietary checkboxes and occasion radio buttons have tiny 13x13px tap targets, far below the 44px minimum mobile guidance.
- **Evidence**: Layout warnings consistently flag Vegetarian, Vegan, Gluten-free, Dairy-free, Shellfish, Nut allergy checkboxes and Birthday, Anniversary, Date night, Business, Celebration, None radio buttons as 13x13px across desktop and mobile viewports (e.g., steps-37-42, steps-67-72, agentic-80-click).
- **Suggested fix**: Increase the clickable area of checkboxes and radios to at least 44x44px using CSS padding or pseudo-elements, and ensure the visible label text is also clickable.

### [HIGH] the-modify-and-resend-email-buttons — feedback
- **Page**: `confirmation.html Modify and Resend email buttons`
- **Problem**: The 'Modify' and 'Resend email' buttons on the confirmation page are completely unresponsive, acting as dead-end clicks with no navigation, dialog, or visual feedback.
- **Evidence**: Clicking 'Modify' resulted in no visible change, URL navigation, or dialog (steps-19-24). Clicking 'Resend email' produced no visible text change, URL change, or feedback (steps-19-24).
- **Suggested fix**: Implement functional behavior for these buttons. 'Modify' should navigate to an edit flow, and 'Resend email' should trigger an API call and display a success toast/message (e.g., 'Email sent!').

### [HIGH] clicking-the-apple-google-or-outlook — feedback
- **Page**: `confirmation.html Apple/Google/Outlook buttons`
- **Problem**: Clicking the 'Apple', 'Google', or 'Outlook' calendar buttons produces no download, navigation, or visual feedback, failing to deliver the promised functionality.
- **Evidence**: Clicking 'Apple', 'Google', and 'Outlook' buttons resulted in no visible change, URL change, or download (steps-19-24).
- **Suggested fix**: Implement .ics file downloads for Apple/Outlook and a Google Calendar URL for the Google button. Provide visual feedback (e.g., button state change) upon click.

### [MEDIUM] the-cuisine-filter-label-italian-12 — clarity
- **Page**: `restaurants.html Italian filter checkbox`
- **Problem**: The cuisine filter label 'Italian (12)' sets an expectation of 12 results, but applying the filter only shows 2 Italian restaurants on the page.
- **Evidence**: Clicking the 'Italian (12)' filter updated the results list to show only 2 Italian restaurants (Bella Suora, Lupinus & Roma) (steps-01-06).
- **Suggested fix**: Ensure the filter count accurately reflects the number of restaurants that will be displayed when the filter is applied, or clarify if the count refers to total restaurants in the city vs. current search results.

### [MEDIUM] the-party-size-select-dropdown-is — accessibility
- **Page**: `restaurant.html party size select`
- **Problem**: The party size select dropdown is missing a form label, aria-label, or placeholder, making it inaccessible to screen reader users.
- **Evidence**: A medium-severity layout warning indicates the party size select element (ux-13) is missing a form label (steps-31-36, steps-55-60).
- **Suggested fix**: Add a visible <label> element associated with the select, or at minimum an aria-label attribute (e.g., aria-label='Party size').

### [MEDIUM] the-help-link-in-the-navigation — navigation
- **Page**: `guest.html Help link`
- **Problem**: The 'Help' link in the navigation is a dead link (href='#') that provides no assistance, dialog, or feedback.
- **Evidence**: Clicking 'Help' on guest.html only appended a hash to the URL without opening a dialog or providing feedback (steps-61-66). It also has a severely undersized tap target of 30x16px.
- **Suggested fix**: Link the 'Help' button to a valid help center, FAQ page, or open a support chat dialog. Also, increase its tap target size to at least 44x44px.

### [MEDIUM] time-slots-displayed-per-restaurant-on — clarity
- **Page**: `restaurants.html time slot buttons`
- **Problem**: Time slots displayed per restaurant on the results page show unusually early times (e.g., 6:00 am, 6:30 am) for dinner reservations, which appears to be a data display error.
- **Evidence**: Visible times for dinner search results include '6:00 am' and '6:30 am' (steps-01-06, agentic-77-click).
- **Suggested fix**: Review the time formatting logic to ensure times are displayed correctly (e.g., 6:00 pm instead of 6:00 am) and filter out times that don't match the user's searched meal period.

### [LOW] the-cvc-field-uses-input-type — trust
- **Page**: `payment.html CVC input`
- **Problem**: The CVC field uses input_type='text' instead of 'password' or 'tel', exposing the sensitive security code to shoulder surfing.
- **Evidence**: The CVC field accepted text input '123' matching its placeholder, but uses input_type='text' (steps-13-18).
- **Suggested fix**: Change the CVC input type to 'password' to mask the characters, or use 'tel' with a mask to bring up the numeric keypad while obscuring the input.

### [LOW] the-phone-field-accepts-raw-numeric — forms
- **Page**: `guest.html Phone input`
- **Problem**: The phone field accepts raw numeric input without auto-formatting to match its placeholder '(503) 555-0144', leading to inconsistent formatting.
- **Evidence**: Phone field accepted raw numeric input '5035550144' without auto-formatting to match its placeholder (steps-07-12).
- **Suggested fix**: Implement input masking to automatically format the phone number as the user types, matching the placeholder format.
