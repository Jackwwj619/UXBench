# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The pricing flow is largely functional: matrix selections stay synchronized with the sticky quote card, and add-ons recalculate the estimate correctly. However, the page has clear mobile usability issues, including horizontal overflow and very small tap targets, which make key pricing controls harder to use on touch devices. Several secondary links also behave like placeholders with no meaningful destination or feedback, which weakens trust and navigation clarity. Coverage is strong on the main pricing matrix, but some adjacent controls and destinations remain only partially exercised.

## Issues (7)

### [HIGH] the-pricing-page-overflows-the-mobile — mobile usability
- **Page**: `pricing.html`
- **Problem**: The pricing page overflows the mobile viewport horizontally, so the matrix and lower controls extend beyond the screen and require extra scrolling/panning.
- **Evidence**: On mobile, the layout warning reports page width 475px vs 390px viewport, and the observation notes the pricing matrix extends off-screen to the right.
- **Suggested fix**: Reflow the matrix into a narrower stacked layout on small screens, or reduce columns/enable a more mobile-friendly comparison pattern so all pricing cells fit within the viewport.

### [HIGH] the-add-on-checkboxes-are-extremely — forms
- **Page**: `pricing.html`
- **Problem**: The add-on checkboxes are extremely small touch targets, making them difficult to tap reliably on mobile.
- **Evidence**: Multiple add-on inputs are 13x13px in the layout warnings, and mobile reflections repeatedly call out the 13x13 checkbox targets as below guidance.
- **Suggested fix**: Increase the hit area around each checkbox and label to at least mobile guidance, ideally by making the entire row clickable and adding more vertical spacing.

### [MEDIUM] the-how-we-got-this-number — feedback
- **Page**: `pricing.html`
- **Problem**: The 'How we got this number' / 'Overview' disclosure appears to do nothing when tapped, so users do not get visible calculation details.
- **Evidence**: Clicking Overview only changed the URL fragment to # with no visible expansion on desktop and mobile; the recent trajectory says the disclosure did not visibly expand and explanation content remained hidden.
- **Suggested fix**: Make the disclosure open with a clear animation/state change and ensure the expanded explanation is visible and scannable immediately below the selected quote.

### [MEDIUM] several-prominent-links-behave-like-placeholders — trust
- **Page**: `index.html / pricing.html`
- **Problem**: Several prominent links behave like placeholders or dead ends rather than real navigation, including Book demo, Docs, About, Architecture, Customers, and some footer items.
- **Evidence**: Book demo stayed on the same URL with no visible change on mobile and desktop; Docs and Customers only appended #; About and Architecture also produced no visible page change.
- **Suggested fix**: Replace placeholder hashes with real destinations, or disable/label unfinished links clearly so users do not think they missed a page load.

### [MEDIUM] the-book-demo-control-looks-prominent — navigation
- **Page**: `pricing.html`
- **Problem**: The Book demo control looks prominent but does not provide a booking flow or even clear feedback after activation.
- **Evidence**: On mobile, Book demo remained on the same pricing URL after tap with no visible-text or navigation change; desktop testing also found it only changed the URL to pricing.html#.
- **Suggested fix**: Route Book demo to a real booking/contact flow or convert it to a clearly labeled placeholder if it is not ready.

### [LOW] top-navigation-links-are-also-below — accessibility
- **Page**: `pricing.html`
- **Problem**: Top navigation links are also below mobile tap-size guidance, so the header is harder to use precisely on small screens.
- **Evidence**: Layout warnings flag small tap targets such as Lattice DB 123x28, Pricing 45x21, and Book demo 105x41; trajectory notes also mention several header links below the 44px mobile guidance.
- **Suggested fix**: Increase header link padding, add more spacing between items, and ensure the brand/CTA are comfortably tappable on phones.

### [LOW] the-pricing-page-s-tier-explainer — goal completion
- **Page**: `pricing.html`
- **Problem**: The pricing page’s tier explainer is present, but the interaction model is not very discoverable on mobile because the selected cell and explanation are separated by a long, dense scroll.
- **Evidence**: The final observation shows the selected cell and quote near the middle of a tall page, with the tier explainer, feature matrix, and FAQ much farther below; prior chunks note scrolling is needed to reach the lower explanation sections.
- **Suggested fix**: Bring the tier explanation closer to the selected quote on mobile, or add a compact inline summary that explains the selected tier without requiring a long scroll.
