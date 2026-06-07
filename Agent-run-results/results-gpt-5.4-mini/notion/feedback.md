# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full notion system, prioritizing the primary landing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Notion marketing funnel is generally cohesive: the homepage, product pages, and pricing flow all load cleanly, and the core CTAs and FAQ accordions usually provide clear feedback. The biggest issues show up on mobile, where multiple tap targets are too small, the pricing page overflows slightly past the viewport, and several modal/close interactions do not give obvious dismissal feedback. Coverage is substantial but not complete, so some homepage form fields and a few navigation states remain untested.

## Issues (7)

### [HIGH] several-primary-navigation-and-footer-links — mobile usability
- **Page**: `pricing.html mobile header/footer links`
- **Problem**: Several primary navigation and footer links are below mobile touch guidance, making the interface feel difficult to tap accurately on a small screen.
- **Evidence**: On mobile pricing, layout warnings flagged Notion (94x29), Toggle menu (36x32), and footer links like Knowledge Base / Projects / Templates / Pricing at 342x22px, all below the 44px guidance. Session notes also repeatedly mention small tap target warnings on nav and page links across pages.
- **Suggested fix**: Increase the tappable height/padding of nav and footer links to at least 44px on mobile, and add more vertical spacing between adjacent items.

### [MEDIUM] the-mobile-pricing-page-is-slightly — mobile usability
- **Page**: `pricing.html mobile layout`
- **Problem**: The mobile pricing page is slightly wider than the viewport, creating horizontal overflow that can undermine readability and confidence.
- **Evidence**: Final observation reports 'Page width 399px exceeds viewport 390px' and the mobile layout warning remains present across steps 67-80.
- **Suggested fix**: Audit the pricing grid, cards, and FAQ section for fixed widths or margins causing overflow, then constrain them to the viewport with responsive wrapping.

### [MEDIUM] closing-the-modal-does-not-produce — feedback
- **Page**: `pricing.html modal close control`
- **Problem**: Closing the modal does not produce an obvious visible state change, so users may not know whether the dialog actually dismissed.
- **Evidence**: The mobile close action on the pricing request-demo modal produced 'No obvious URL or visible-text change' and the underlying page remained visible; earlier desktop close attempts on pricing/projects also showed no visible change.
- **Suggested fix**: Make dismissal unmistakable with a visible modal exit animation, restore focus to the triggering control, and confirm the overlay is removed immediately.

### [MEDIUM] submitting-the-mobile-request-demo-form — forms
- **Page**: `pricing.html request-demo modal`
- **Problem**: Submitting the mobile request-demo form does not surface clear success or validation feedback right away.
- **Evidence**: After tapping 'Submit request' with fields filled, the step reported no URL or visible-text change; the modal stayed open with preserved inputs and no obvious confirmation. Earlier steps also noted empty submissions only showed inline required-field errors, not a clear submission state.
- **Suggested fix**: Show a clear loading state on submit and a success confirmation or next-step message when the request is accepted; if validation fails, highlight the exact missing/invalid fields inline.

### [LOW] some-interactive-controls-are-visually-compact — affordance
- **Page**: `pricing.html toggle / FAQ rows / mobile header`
- **Problem**: Some interactive controls are visually compact enough that they may not read as comfortably touchable, even when they do work.
- **Evidence**: The mobile pricing toggle is described as compact relative to touch guidance, and FAQ rows plus the menu icon are narrow relative to common touch targets. The browser also flagged the toggle menu and several nav links as small targets.
- **Suggested fix**: Enlarge hit areas for the toggle, FAQ rows, and header controls, and use stronger visual affordances such as more padding or clearer pressed states.

### [LOW] the-bottom-page-cross-links-are — navigation
- **Page**: `projects.html / wikis.html / index.html lower links`
- **Problem**: The bottom-page cross-links are functional but very small and easy to overlook on touch devices.
- **Evidence**: Knowledge Base navigation from Projects and the footer-style links on the homepage/pricing page were repeatedly noted as small tap targets; one lower 'Knowledge Base' link was measured at 258x22px in an earlier step.
- **Suggested fix**: Give these cross-links more vertical space, stronger contrast, or card-like styling so they read as intentional navigation rather than plain text.

### [LOW] the-faq-accordion-is-generally-clear — other
- **Page**: `pricing.html Questions & answers`
- **Problem**: The FAQ accordion is generally clear, but the page depends on plus/minus state changes that could be more explicit for users scanning quickly.
- **Evidence**: Mobile FAQ items such as 'What is a block?' and 'How does Notion AI use my data?' expanded in place and switched to a minus icon, which is good feedback; however, the section remains inside a vertically dense pricing page with some overflow warnings.
- **Suggested fix**: Keep the current state change, but consider adding stronger visual emphasis to the expanded row and ensuring the FAQ area doesn’t compete with overflow or cramped spacing.
