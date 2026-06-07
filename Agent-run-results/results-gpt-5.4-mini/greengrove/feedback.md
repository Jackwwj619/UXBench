# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full greengrove system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core onboarding and support flows are understandable, but several interactions feel fragile or underexplained. The most consistent issue is mobile usability: header links and primary actions are repeatedly below the 44px tap-target guidance, and the FAQ accordion could not be reliably activated on mobile. The claims form is more legible than the quote wizard, but its submission feedback relies on browser-native validation and the primary submit control is also too short for comfortable touch use; a few adjacent areas remain untested, especially quote-step progression and claims upload feedback.

## Issues (6)

### [HIGH] the-global-header-repeatedly-uses-very — mobile usability
- **Page**: `claims.html header nav / faq.html header nav`
- **Problem**: The global header repeatedly uses very small tap targets on mobile, making core navigation hard to use comfortably.
- **Evidence**: On the mobile claims page, GreenGrove is 135x28px, Get a quote is 73x22px, Claims is 44x22px, and FAQ is 28x22px; the same pattern appears across the FAQ and index pages in the trajectory and layout warnings.
- **Suggested fix**: Increase header hit areas to at least 44px tall and add padding around text links so the nav is easier to tap on mobile.

### [HIGH] the-faq-accordion-is-not-behaving — affordance
- **Page**: `faq.html accordion rows`
- **Problem**: The FAQ accordion is not behaving like a reliable tap target on mobile; repeated clicks on question rows timed out and no answer content appeared.
- **Evidence**: Steps 77–79 on faq.html show click failures for ux-5 and ux-8, with the page remaining on a collapsed list of questions and no answer text revealed; the recent trajectory notes that the disclosure was not operable from these taps.
- **Suggested fix**: Enlarge the accordion row hit area, verify the entire question row is clickable, and provide a clear expanded/collapsed state change when opened.

### [HIGH] the-primary-submit-claim-button-is — forms
- **Page**: `claims.html button[type=submit]`
- **Problem**: The primary 'Submit claim' button is visually present but too short for comfortable touch interaction.
- **Evidence**: Final observation flags the submit button at 292x39px on mobile, below the 44px guidance; earlier observations also repeatedly noted the submit control as a small tap target.
- **Suggested fix**: Increase the button height to 44px or more and add spacing above/below it so the final action is easy to hit.

### [MEDIUM] claim-submission-relies-on-browser-native — feedback
- **Page**: `claims.html form`
- **Problem**: Claim submission relies on browser-native validation with a generic tooltip instead of clearer inline feedback, so the error state is not very instructive.
- **Evidence**: When the form was submitted incomplete, the browser showed 'Please fill out this field.' and focus landed on the first missing field (e.g., Pet name or Visit date), with no custom inline error messaging or broader explanation.
- **Suggested fix**: Add inline field-level errors and a brief summary near the submit button so users can quickly see what is missing and why.

### [MEDIUM] step-1-of-the-quote-flow — goal completion
- **Page**: `quote.html step 1`
- **Problem**: Step 1 of the quote flow does not clearly explain why Continue is inert when no pet is selected, and the attempted pet-card interactions did not produce visible selection feedback.
- **Evidence**: On quote.html, the screen shows six pet-type cards and a Continue button, but clicks on a pet card timed out and clicking Continue produced no URL or visible-text change; the trajectory notes no selected state or confirmation was visible.
- **Suggested fix**: Show an explicit selected state on pet cards and add a short validation hint near Continue when no option has been chosen.

### [MEDIUM] the-claims-page-is-structurally-clear — visual hierarchy
- **Page**: `claims.html top section`
- **Problem**: The claims page is structurally clear, but the hierarchy is dominated by instructional copy above the form, which pushes the actual action lower on the screen.
- **Evidence**: The mobile claims page opens with several informational cards and explanatory sentences before the fields and submit action; the final screenshot shows the submit button near the lower part of the viewport with additional fields still above it.
- **Suggested fix**: Condense the introductory copy or visually separate it from the form so the first required field and submit path stand out more quickly.
