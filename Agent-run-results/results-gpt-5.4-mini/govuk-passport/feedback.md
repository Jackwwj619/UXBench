# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full govuk-passport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The prototype gives clear confirmation for the main start-to-form flow, but several ancillary links and controls feel like same-page jumps rather than meaningful navigation, which weakens orientation. On mobile, the biggest issue is touch usability: many header, footer, and related-content links are visibly undersized, and several form controls also sit below mobile tap-target guidance. Coverage is substantial, but some feature signatures remain untested, so the findings below focus on patterns that were directly observed.

## Issues (7)

### [HIGH] many-key-navigation-and-support-links — mobile usability
- **Page**: `index.html footer/header links`
- **Problem**: Many key navigation and support links are too small for reliable touch use, especially in the footer and top nav. Several were measured at 17–20px high, and the Help link was only 33x17px on mobile.
- **Evidence**: Final mobile observation and layout warnings show undersized targets such as Home 43x20, Service 53x20, Demo result 86x20, feedback 65x17, Benefits 58x17, Help 33x17, and several others below the 44px guidance.
- **Suggested fix**: Increase vertical padding and hit areas for header, footer, and related links to meet mobile target size guidance, and consider spacing the footer links into larger touch rows.

### [MEDIUM] primary-form-controls-on-the-mobile — mobile usability
- **Page**: `index.html eligibility/application steps`
- **Problem**: Primary form controls on the mobile flow are also undersized: radio options were observed at 40x40px and the Continue button at 88x40px, both below the usual 44px touch guidance.
- **Evidence**: Mobile observations in the eligibility and application steps repeatedly flagged radios and Continue buttons as small tap targets; e.g. the eligibility step showed radio targets at 40x40px and Continue at 88x40px.
- **Suggested fix**: Make radio hit areas and primary buttons comfortably exceed 44px in height on mobile, with generous spacing between adjacent controls.

### [MEDIUM] several-prominent-related-content-links-act — clarity
- **Page**: `index.html related-content links`
- **Problem**: Several prominent related-content links act like in-page anchors to the same service intro rather than distinct branches, but they provide only subtle feedback and no explanation of what changes.
- **Evidence**: Clicking 'Renew an adult passport', 'Apply for a child passport', and 'Passport fees' changed only the fragment to #service-start, while the visible content remained the same service-start panel. The observations explicitly note that the navigation feels like a same-page jump.
- **Suggested fix**: Either make these links lead to clearly differentiated landing states, or label them more explicitly as anchors to the same service overview so users know what to expect.

### [MEDIUM] support-navigation-links-such-as-help — clarity
- **Page**: `index.html support links`
- **Problem**: Support/navigation links such as Help, Accessibility statement, and feedback behave as simple in-page jumps back to the top/start section rather than opening clearly separate help content.
- **Evidence**: Clicking 'Help' changed the URL from #service-start to #start and left the screenshot on the same top/start content. 'Accessibility statement' similarly jumped to #start, and 'feedback' produced no visible content change beyond anchor movement.
- **Suggested fix**: Present help/support destinations as distinct panels or pages, or add clearer confirmation that the user has reached support content rather than simply being moved within the page.

### [MEDIUM] some-interactions-confirm-only-through-url — feedback
- **Page**: `index.html mobile related links`
- **Problem**: Some interactions confirm only through URL/hash changes, with little or no visible content change, so the feedback is subtle and easy to overlook.
- **Evidence**: The mobile 'Apply for a child passport' tap changed the URL from #start to #service-start, but the screenshot-visible content appeared largely unchanged. Similar behavior was seen for Help and other ancillary links.
- **Suggested fix**: Pair in-page navigation with stronger visual state changes, such as scrolling the target into view, highlighting the destination, or updating section headings more distinctly.

### [LOW] after-changing-the-country-selection-the — feedback
- **Page**: `index.html overseas country step`
- **Problem**: After changing the country selection, the inline and summary errors remained visible until the user clicked Continue, so the validation state did not clear immediately.
- **Evidence**: Selecting Australia in the country dropdown preserved the visible selected value, but the inline error and error-summary item remained on screen. The notes say the validation state did not clear cleanly, even though progression still worked after Continue.
- **Suggested fix**: Clear validation messages immediately once the field becomes valid, or show a lightweight success state so users know the correction has been recognized.

### [LOW] back-navigation-returned-to-the-service — trust
- **Page**: `index.html Back control`
- **Problem**: Back navigation returned to the service-start screen, but the test did not confirm whether previously selected answers were preserved on return, leaving recovery trust partially unverified.
- **Evidence**: The back action was reported as working at a basic level, but the screenshot showed the start/service intro page rather than the prior selection step, so preservation of the previous eligibility choice was not demonstrated.
- **Suggested fix**: Ensure back navigation restores the exact prior step and visibly retains prior selections, with clear state continuity after returning.
