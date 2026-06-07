# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full moonlight-tickets system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

MoonlightTickets presents event details and fee transparency well, and the event-to-checkout handoff is generally clear. The biggest UX risk is at the end of the funnel: the purchase-complete state appears unreachable, and several navigation/filter controls behave in ways that feel inert or ambiguous. Coverage was desktop-only, but repeated layout warnings also suggest meaningful mobile tap-target problems across discovery, event, and checkout.

## Issues (8)

### [HIGH] the-flow-appears-to-lack-a — goal completion
- **Page**: `confirmation.html / index.html; screenshot agentic-80-open_page-desktop.png`
- **Problem**: The flow appears to lack a usable confirmation page, so users may never receive a clear purchase-complete state, receipt context, or next steps.
- **Evidence**: Multiple probes of `confirmation.html` redirected to `index.html` instead of a success screen: in recent step 80, opening confirmation.html from checkout changed the URL to `index.html`, and the visible text was the homepage ('Tonight in your city', event cards, filters) with no success or receipt messaging. Earlier chunks repeat the same behavior and coverage still lists `confirmation.html` as unvisited.
- **Suggested fix**: Provide a distinct confirmation page/state with success messaging, order summary, event details, ticket delivery info, and next actions like download, add to calendar, or contact support. Avoid dropping users back into generic discovery without acknowledgment.

### [HIGH] homepage-filters-give-weak-or-confusing — clarity
- **Page**: `index.html filter row (DATE / GENRE / VENUE / PRICE)`
- **Problem**: Homepage filters give weak or confusing feedback; selections do not visibly narrow results or explain why the listings still look mixed.
- **Evidence**: Session notes show the Genre select reported choosing 'Indie rock' when 'Electronic' was intended, and the page still showed mixed genres afterward. Venue selection similarly reported 'The Foundry' instead of Velvet Pier with no obvious page change. Date and Price filters also produced 'No obvious URL or visible-text change' while the listings remained broad.
- **Suggested fix**: Make filter state and results relationship obvious: visibly update the list, show an active-chip summary, indicate result counts, and provide empty/loading states or explanatory text when no visible cards change.

### [MEDIUM] several-links-behave-like-dead-placeholders — navigation
- **Page**: `index.html header nav; checkout.html 'terms' link`
- **Problem**: Several links behave like dead placeholders, which makes navigation feel unreliable and lowers trust.
- **Evidence**: Clicking 'Calendar' changed the URL only to `index.html#` with no visible content change. The checkout 'terms' link also changed only from `checkout.html` to `checkout.html#` with no modal, content, or navigation. Final observation shows several top-nav links still point to `#` (Tonight, This Week, Calendar, Venues, Artists, Sell tickets, Sign in).
- **Suggested fix**: Either connect these links to real destinations/sections or remove/de-emphasize them until available. For legal links specifically, surface actual terms content in a modal or separate page before the final purchase step.

### [MEDIUM] the-empty-cart-state-is-technically — feedback
- **Page**: `event.html sticky order summary / checkout CTA; screenshot agentic-77-click-desktop.png`
- **Problem**: The empty-cart state is technically blocked, but the primary CTA remains prominently visible while disabled and provides no direct interaction feedback.
- **Evidence**: In recent step 77, clicking 'Continue to checkout' failed because the button was disabled. Reflection notes that the order panel said 'Pick a tier on the left to start,' but the CTA stayed prominent with no click response. The disabled button remained visible on the event page.
- **Suggested fix**: Pair the disabled state with stronger inline explanation near the button, such as 'Select at least 1 ticket to continue,' and visually distinguish the disabled CTA more clearly from its enabled state.

### [MEDIUM] clicking-the-moonlighttickets-logo-from-checkout — navigation
- **Page**: `checkout.html header logo`
- **Problem**: Clicking the MoonlightTickets logo from checkout immediately exits to the homepage with no warning or preservation cue, creating accidental abandonment risk.
- **Evidence**: Chunk steps 73-78 notes that clicking the checkout logo immediately navigated from `checkout.html` to `index.html` with no confirmation or state-preservation cue. The user lands on the homepage, but checkout continuity is lost.
- **Suggested fix**: Warn users before leaving checkout, preserve cart/reservation state on return, or make the logo less of a destructive escape during payment by pairing it with a subtle 'Leave checkout' confirmation.

### [MEDIUM] wallet-like-payment-options-are-visually — clarity
- **Page**: `checkout.html payment method section`
- **Problem**: Wallet-like payment options are visually selectable, but the full card-entry form remains visible with no explanation, making the payment model unclear.
- **Evidence**: After selecting 'Google-Pay-like,' the option was highlighted, but the full card form still remained visible: Cardholder name, Card number, Expiry, CVC, and Zip. The notes explicitly call out the lack of explanatory text about why direct card fields are still required.
- **Suggested fix**: Either switch the form to the correct wallet-specific flow or explain why card details are still needed. If these are demo options, label them clearly so expectations are set before selection.

### [MEDIUM] checkout-can-lose-event-specific-context — trust
- **Page**: `checkout.html cart/order summary`
- **Problem**: Checkout can lose event-specific context and show only generic ticket labels, reducing confidence that the cart still matches the chosen event.
- **Evidence**: Chunk steps 43-48 notes a pricing/context issue on checkout: the basket came from 'Telegraph Bay Early Bird,' but visible checkout text showed only generic '1 × Early Bird' plus an applied promo, without reinforcing the event name.
- **Suggested fix**: Persist event name, venue, and show date/time prominently in checkout and the cart summary, not just the ticket tier label.

### [LOW] many-interactive-targets-are-undersized-including — accessibility
- **Page**: `index.html header, event.html ticket controls, checkout.html payment/actions`
- **Problem**: Many interactive targets are undersized, including critical controls in discovery, event selection, and checkout.
- **Evidence**: Repeated layout warnings flagged sub-44px targets: event steppers at 32x32, favorite/share at 38x38, header links around 20px high, payment radios at 13x13, 'Cancel order' around 79x31, 'terms' 32x15, and promo 'Apply' 73x38. These warnings appear across multiple chunks and in the final observation.
- **Suggested fix**: Increase hit areas for navigation, quantity steppers, radios, links, and small action buttons to meet common 44px touch guidance, while preserving the visual style.
