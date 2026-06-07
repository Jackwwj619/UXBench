# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full booking system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core hotel funnel is generally understandable: search leads to results, hotel detail and room-selection preserve key context, and confirmation gives strong success feedback with booking details and next steps. The biggest UX weaknesses are in result filtering/sorting trust and the mobile checkout layout, where overflow, tiny targets, and weak progress feedback make completion feel brittle. Coverage spans all pages, but only a small share of interactive elements were directly exercised, so some supporting flows remain only partially validated.

## Issues (9)

### [HIGH] multiple-key-mobile-booking-pages-are — mobile usability
- **Page**: `reservation.html / confirmation.html / hotel-detail-granbell.html / room-selection.html`
- **Problem**: Multiple key mobile booking pages are wider than the viewport, causing horizontal overflow and partially off-screen content during the funnel.
- **Evidence**: Observed overflow on hotel-detail-granbell.html (812px content on 390px viewport), room-selection.html (713px on 390px), reservation.html (814px on 390px), and confirmation.html (633px on 390px). Recent screenshots and observations note content/cards cut off to the right and header links extending off-screen.
- **Suggested fix**: Fix responsive layouts for the booking funnel first: ensure containers, cards, headers, and form rows collapse to a single-column mobile layout with no horizontal scroll.

### [HIGH] the-results-pages-present-contradictory-state — feedback
- **Page**: `tokyo.html and shinjuku.html results header / empty-state region`
- **Problem**: The results pages present contradictory state messaging, showing available properties while also surfacing a 'No properties match your filters' heading.
- **Evidence**: Repeated observations on tokyo.html and shinjuku.html report visible hotel cards and counts like 'Tokyo: 6 properties found', 'Tokyo: 4 properties found', 'Tokyo: 3 properties found', and 'Shinjuku: 423 properties found' while the DOM simultaneously contains the heading 'No properties match your filters'.
- **Suggested fix**: Ensure only one state is rendered/announced at a time: either show results with counts and active chips, or a true empty state with recovery actions such as removing filters.

### [HIGH] budget-filters-do-not-match-the — clarity
- **Page**: `tokyo.html filter sidebar and hotel price cards`
- **Problem**: Budget filters do not match the visible prices users see, making the filtering logic hard to understand.
- **Evidence**: After selecting bands such as 'JPY 10,000 - 20,000', 'JPY 20,000 - 40,000', and 'JPY 40,000 - 80,000', visible cards still showed much higher totals like JPY 198,000, JPY 245,000, and JPY 135,000. Observations explicitly flagged this mismatch several times on tokyo.html.
- **Suggested fix**: Label the pricing basis clearly wherever filters and card prices appear, e.g. 'per night' vs '3-night total', and keep filter ranges consistent with displayed card prices.

### [MEDIUM] the-reservation-form-gives-very-weak — forms
- **Page**: `reservation.html form fields and Complete booking button`
- **Problem**: The reservation form gives very weak progress feedback: the primary CTA was disabled without clear explanation, and filling required fields produced little or no visible confirmation until it suddenly became enabled later.
- **Evidence**: On reservation.html, 'Complete booking' was initially disabled and click attempts failed with the native disabled state. Recent mobile steps show phone, email, last name, arrival-time selection, and first name changes produced 'no obvious visible-text or URL change' and no inline guidance, yet the same CTA later became enabled and successfully navigated to confirmation.html.
- **Suggested fix**: Show explicit inline validation and a persistent completion checklist near the CTA, including which required fields are satisfied and which still need attention.

### [MEDIUM] several-important-inputs-are-unlabeled-or — accessibility
- **Page**: `tokyo.html, shinjuku.html, reservation.html, airport-taxis.html form controls`
- **Problem**: Several important inputs are unlabeled or weakly labeled, especially on search and booking forms.
- **Evidence**: The Tokyo and Shinjuku results destination inputs were flagged as missing labels/aria-labels/placeholders. On reservation.html, the Country/region select had a missing-label warning. On airport-taxis.html, the date/time and passenger inputs were also flagged as having no label, aria-label, or placeholder.
- **Suggested fix**: Add persistent visible labels and matching programmatic labels to all core inputs, especially destination, country/region, passenger count, and pickup time fields.

### [MEDIUM] many-mobile-controls-are-too-small — mobile usability
- **Page**: `reservation.html mobile controls; hotel-detail-granbell.html and room-selection.html mobile nav/secondary controls`
- **Problem**: Many mobile controls are too small for comfortable touch interaction, including some important navigation and form choices.
- **Evidence**: Observations repeatedly flagged sub-44px targets such as header nav items, Booking.com brand link, JPY control, breadcrumb links, review links, 'Change your selection', and 13x13px radio/checkbox targets on reservation.html for guest selection and special requests.
- **Suggested fix**: Increase touch target size and spacing for mobile, prioritizing form radios/checkboxes, header actions, breadcrumbs, and secondary controls within the booking funnel.

### [MEDIUM] hotel-cards-appear-to-have-oversized — affordance
- **Page**: `tokyo.html hotel cards near sort controls`
- **Problem**: Hotel cards appear to have oversized clickable areas, making it easy to navigate into a detail page when trying to interact with nearby controls like sorting.
- **Evidence**: During sort testing on tokyo.html, attempts intended for sort-related controls instead activated the Park Hyatt result card and navigated to hotel-detail.html. Reflections note this suggests a broad clickable hotel card area and accidental navigation risk, with recovery only available via '← Back to results'.
- **Suggested fix**: Tighten card hit areas so only explicit card CTAs/titles navigate, and visually separate sorting/filtering controls from clickable result cards.

### [MEDIUM] the-shinjuku-granbell-hotel-detail-page — trust
- **Page**: `hotel-detail-granbell.html hero gallery`
- **Problem**: The Shinjuku Granbell hotel detail page uses placeholder-style hero imagery instead of believable photos.
- **Evidence**: Chunk observations for hotel-detail-granbell.html state the hero gallery shows large colored placeholder tiles with emoji/icons rather than real hotel photography.
- **Suggested fix**: Replace placeholder gallery tiles with real property images or, if unavailable, clearly label the gallery as sample/coming soon rather than presenting it as the main photo area.

### [LOW] several-support-and-footer-links-appear — error recovery
- **Page**: `confirmation.html footer; deals.html / airport-taxis.html / attractions.html footer links`
- **Problem**: Several support and footer links appear to be dead ends, which weakens recovery and site credibility.
- **Evidence**: Across deals, help-adjacent, airport-taxis, attractions, and final confirmation observations, items like 'Manage your trips', 'Contact Customer Service', 'Genius loyalty program', 'Privacy & cookies', 'Terms & conditions', 'Extranet login', and 'List your property' were noted as linking to '#'.
- **Suggested fix**: Prioritize wiring support, legal, and account-management footer links to real destinations, especially on confirmation and promotional pages where reassurance matters most.
