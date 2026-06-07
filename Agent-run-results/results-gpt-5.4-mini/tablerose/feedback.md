# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tablerose system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Tablerose’s core reservation flow is generally coherent: search, results, restaurant detail, guest details, payment, and confirmation all preserve context well and usually give clear progression. The biggest UX risks are on mobile, where many interactive elements are undersized, some controls provide weak or no feedback, and a few support/recovery actions look present but do not reveal useful next steps. Coverage is substantial but not complete, so there are still a few untested confirmation and help-related paths.

## Issues (8)

### [HIGH] the-guest-form-can-look-filled — forms
- **Page**: `guest.html input[type=tel]`
- **Problem**: The guest form can look filled in, but the Phone field still blocks progression with a required-field error, creating a confusing prefill/validation mismatch.
- **Evidence**: In steps 43-48, the phone input visibly showed “(503) 555-0144,” yet submission stayed on guest.html and the browser displayed “Please fill out this field.” The recent mobile observation also shows the Phone field with a placeholder-style number while the form remains blocked.
- **Suggested fix**: Make the field state explicit: either render the number as a true filled value, or visually indicate that it is only a placeholder and must be edited before continuing. Clearer inline validation near the field would help.

### [HIGH] many-mobile-controls-are-far-below — mobile usability
- **Page**: `guest.html dietary needs / occasion controls`
- **Problem**: Many mobile controls are far below touch-target guidance, making the guest step hard to use on small screens.
- **Evidence**: The final mobile observation lists Vegetarian, Vegan, Gluten-free, Dairy-free, Shellfish allergy, Nut allergy, and the occasion radios at 13x13px. The Help link is 30x16px, and the Continue to hold button is the only comfortably sized control on the page.
- **Suggested fix**: Increase hit areas for checkboxes/radios and header links to at least 44px, and add more spacing between adjacent options.

### [MEDIUM] tapping-small-optional-controls-does-not — feedback
- **Page**: `guest.html Vegetarian checkbox`
- **Problem**: Tapping small optional controls does not produce obvious feedback, so users may not know whether the choice registered.
- **Evidence**: In step 80, tapping the mobile Vegetarian checkbox produced no obvious visible state change or text update, and the result reported no changed URL or visible text. The trajectory notes describe weak touch feedback on the 13×13 checkbox.
- **Suggested fix**: Provide stronger selected states and larger visual affordances for checkbox/radio rows, not just the small native control box.

### [MEDIUM] the-help-control-is-present-but — trust
- **Page**: `guest.html Help link`
- **Problem**: The Help control is present but only changes the URL hash, so it does not actually reveal support content or guidance.
- **Evidence**: On mobile in step 79, tapping Help changed the URL to guest.html# but the visible page stayed on the same form. The observation says no support content was revealed.
- **Suggested fix**: Make Help open a real support panel, FAQ, or contact path, and confirm it with visible content change.

### [MEDIUM] some-confirmation-page-actions-appear-interactive — feedback
- **Page**: `confirmation.html calendar/email actions`
- **Problem**: Some confirmation-page actions appear interactive but provide no visible response, so users may not know whether anything happened.
- **Evidence**: Selecting the Apple add-to-calendar button in step 55 produced no visible feedback, navigation, or URL change. Similarly, clicking “Resend email” in step 49-54 caused no visible or URL change.
- **Suggested fix**: Show immediate confirmation states such as a toast, loading indicator, or changed button text after calendar/email actions are triggered.

### [MEDIUM] the-page-repeatedly-exposes-small-header — mobile usability
- **Page**: `restaurant.html / restaurants.html / guest.html header`
- **Problem**: The page repeatedly exposes small header and utility controls that are hard to tap, even when the main booking actions themselves work.
- **Evidence**: Across mobile steps 67-80, the top nav links, Save heart, Help link, and several result/filter controls were repeatedly flagged below 44px. The restaurant page also showed horizontal overflow at 396px content width versus a 390px viewport.
- **Suggested fix**: Rework the mobile header and utility areas into larger, stacked touch targets and ensure content fits within the viewport without overflow.

### [LOW] when-filters-reduce-the-list-sharply — clarity
- **Page**: `restaurants.html filter rail`
- **Problem**: When filters reduce the list sharply, the page does not always give a clear recovery or loading cue, so the state can feel ambiguous.
- **Evidence**: In steps 67-72, filtering on mobile left only one restaurant visible, and the notes say the page still shows a filter rail and a single remaining result rather than a clear recovery from an empty state. Another step notes that a filter interaction did not visibly change the list, even though the checkbox remained selected.
- **Suggested fix**: Add clearer empty-state messaging and feedback when filters narrow the list heavily, plus a visible count or reset prompt.

### [LOW] at-least-one-form-field-is — accessibility
- **Page**: `restaurants.html / restaurant.html form fields`
- **Problem**: At least one form field is missing an accessible label or equivalent, which can make the form harder to understand nonvisually.
- **Evidence**: Session memory lists “restaurants.html: A form field has no label, aria-label, or placeholder” and “restaurant.html: A form field has no label, aria-label, or placeholder.” The trajectory also notes the party select lacking a label on restaurant and guest steps.
- **Suggested fix**: Audit all form controls for explicit labels and accessible names, especially selects in the booking summary card.
