# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full codekite system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The pricing experience communicates its value proposition clearly, and the calculator provides immediate live feedback with a recommended plan and detailed breakdown. However, several key conversion controls are styled like primary actions but behave as dead ends, which undermines trust and makes the page feel less actionable than it looks. The calculator also has accessibility and touch-target issues, especially on mobile, and lower-page disclosure/FAQ interactions appear non-functional from the tested states. Coverage is broad across index, pricing, and docs, but a few adjacent links and some calculator features remain untested, so there may be additional navigation dead-ends beyond those observed.

## Issues (8)

### [HIGH] primary-pricing-ctas-on-the-free — goal completion
- **Page**: `pricing.html; CTA links with href="#"`
- **Problem**: Primary pricing CTAs on the Free and Team plans look like real conversion actions but do nothing when tapped or clicked.
- **Evidence**: On mobile, clicking "Get started" and "Start trial" caused no visible text or URL change; both stayed on `pricing.html#` with no state change. The final observation also shows these CTAs use `href="#"`.
- **Suggested fix**: Make the plan CTAs navigate to a real signup/trial flow, or if they are intentionally placeholders, label them clearly and replace the button styling with a non-clickable or explanatory pattern.

### [HIGH] faq-accordion-style-rows-appear-interactive — feedback
- **Page**: `pricing.html; FAQ section around `ux-16` / `ux-19``
- **Problem**: FAQ/accordion-style rows appear interactive, but clicking them only changes the URL fragment and does not visibly expand content.
- **Evidence**: On mobile, clicking "Overview" changed the URL to `pricing.html#` with no answer text or state change. Earlier trajectory chunks show the same behavior for "Overview" and "Changelog", with no visible disclosure after clicking.
- **Suggested fix**: Ensure each FAQ row expands in place with a clear open/closed state, or if these are anchor links, label them as such and scroll to substantive content.

### [MEDIUM] the-core-calculator-inputs-lack-labels — forms
- **Page**: `pricing.html; calculator inputs `ux-7`–`ux-12``
- **Problem**: The core calculator inputs lack labels/accessible names, making the main pricing tool hard to understand and use with assistive tech or on small screens.
- **Evidence**: Layout warnings flagged multiple "missing_input_label" issues for the range and number fields, and the trajectory notes that the calculator inputs lack visible labels/accessible names in the DOM summary.
- **Suggested fix**: Add explicit labels for each slider/number pair and ensure labels are programmatically associated so the values and controls are understandable to screen readers and sighted users alike.

### [MEDIUM] several-top-nav-and-footer-header — mobile usability
- **Page**: `pricing.html; header nav and add-on checkboxes `ux-13`–`ux-15``
- **Problem**: Several top-nav and footer/header targets are below mobile tap-target guidance, and the add-on checkboxes are extremely small.
- **Evidence**: The mobile observation lists low tap-target sizes for Pricing (47x21), Start free trial (125x41), and brand/nav items such as CodeKite. The calculator add-on checkboxes are only 13x13px, and the page shows repeated small-target warnings in the layout summary.
- **Suggested fix**: Increase hit areas to at least mobile guidance sizes, add padding around nav links, and make checkbox rows tap-friendly by enlarging the clickable label area.

### [MEDIUM] the-page-visually-emphasizes-conversion-actions — goal completion
- **Page**: `pricing.html; CTAs `ux-3`, `ux-4`, `ux-5``
- **Problem**: The page visually emphasizes conversion actions, but several of them are dead-end placeholders rather than real destinations.
- **Evidence**: The Team CTA "Start trial" and the Free CTA "Get started" both failed to navigate or change visible state. The same `href="#"` pattern appears on the sticky top CTA as well.
- **Suggested fix**: Replace placeholder links with actual destinations, or clearly mark them as demo-only if they are not meant to convert users yet.

### [LOW] some-non-primary-links-behave-like — navigation
- **Page**: `index.html footer About; related placeholder links in nav/footer`
- **Problem**: Some non-primary links behave like placeholders, which weakens the sense that the footer/navigation is reliable.
- **Evidence**: The footer About link on the homepage only changed the URL to `index.html#` without any content change, and the session memory notes other placeholder-like routes such as Careers, Security, Blog, and Status on different pages.
- **Suggested fix**: Either route these links to substantive pages or visually mark them as unavailable so users do not expect real content.

### [LOW] multiple-key-interactive-elements-are-below — accessibility
- **Page**: `pricing.html; top navigation`
- **Problem**: Multiple key interactive elements are below comfortable mobile touch sizes, even when the layout is otherwise readable.
- **Evidence**: The mobile screenshot and layout warnings show the Pricing link at 47x21px, the brand link at 28x21px, and the start trial button at 125x41px; earlier chunks also flagged header items below 44px guidance.
- **Suggested fix**: Rework the header into a more touch-friendly mobile pattern with larger vertical spacing and fewer compressed inline links.

### [LOW] the-page-is-strong-on-content — clarity
- **Page**: `pricing.html; FAQ section`
- **Problem**: The page is strong on content density, but some lower sections remain partially clipped while scrolling, which can interrupt scanning on mobile.
- **Evidence**: The recent mobile scroll notes say the FAQ accordion cards were visible but still partially extending below the viewport, and the sticky header remains present while users scroll lower content.
- **Suggested fix**: Give lower sections more vertical breathing room or reduce sticky header intrusion so the FAQ and comparison table can be scanned without partial clipping.
