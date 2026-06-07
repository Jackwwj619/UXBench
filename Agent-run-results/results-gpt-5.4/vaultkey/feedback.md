# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full vaultkey system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Vaultkey’s core browse-to-pricing flow works on both desktop and mobile, and the plan cards communicate the offer quickly. However, several prominent actions that look like primary next steps are dead-end placeholders, which creates a trust and goal-completion problem. The pricing experience also has clarity and accessibility issues on mobile, including contradictory billing copy, an unlabeled seat-count field, horizontal overflow, and undersized tap targets.

## Issues (7)

### [HIGH] multiple-prominent-ctas-and-nav-actions — goal completion
- **Page**: `index.html and pricing.html header/hero/plan CTA links with href="#"`
- **Problem**: Multiple prominent CTAs and nav actions appear clickable but do nothing meaningful, leaving users at a dead end with no confirmation, error message, or next step.
- **Evidence**: Across both pages and viewports, clicking 'Get Vaultkey', 'Sign in', 'Download free', 'Get Personal', 'Start free 30-day trial', 'Start 14-day trial', 'Talk to sales →', 'Help', 'Enterprise', and 'Security' either kept the same page or only changed the URL to a trailing '#'. Examples: mobile 'Sign in' changed `index.html` to `index.html#` with unchanged content; pricing-page 'Get Vaultkey' stayed at `pricing.html#`; desktop 'Download free' and 'Get Personal' produced no visible change.
- **Suggested fix**: Ensure every primary CTA and header utility link leads to a real destination or disable/hide it until implemented. If an action is intentionally unavailable, provide explicit feedback and an alternate next step instead of a silent no-op.

### [HIGH] billing-state-messaging-becomes-contradictory-after — clarity
- **Page**: `pricing.html billing toggle and Business/Family plan cards`
- **Problem**: Billing-state messaging becomes contradictory after switching cadence, so users can no longer trust which prices and billing terms are active.
- **Evidence**: After switching to Monthly, the UI showed monthly prices like 'Family $4.99 / month' and 'Business $6.99 / seat / month', but Family still said 'Billed yearly · for the whole household'. Business also continued to show both monthly and yearly totals simultaneously. In the mobile pricing screenshot, yearly mode still shows '$3.99 / month' plus 'Billed yearly', which mixes monthly display with annual framing.
- **Suggested fix**: Tie all supporting copy, totals, and cadence labels to the selected billing mode so every visible price explanation stays internally consistent. If both monthly and annual equivalents must be shown, label them unmistakably and subordinate the secondary number.

### [MEDIUM] the-business-pricing-logic-and-sales — clarity
- **Page**: `pricing.html Business card, enterprise strip, and FAQ`
- **Problem**: The Business pricing logic and sales messaging conflict at the upper end, making the enterprise threshold feel arbitrary or incorrect.
- **Evidence**: The Business seat slider caps at 200 seats, and the FAQ says 'Volume discounts kick in automatically at 25, 50, 100, and 200 seats.' But the enterprise strip on the page says 'Volume discounts kick in at 250 seats.' At 200 seats the helper text changed to '200 seats · talk to us for more,' while the card still showed '$4.99 / seat / month' in one tested state.
- **Suggested fix**: Align the slider limits, tier table, helper text, enterprise strip, and FAQ so they describe the same thresholds and escalation point. If 200 seats is the max self-serve tier, say that consistently everywhere.

### [MEDIUM] the-seat-count-number-input-has — forms
- **Page**: `pricing.html target ux-9 number input beside Business team-size slider`
- **Problem**: The seat-count number input has no visible label or accessible name beyond its current numeric value, so its purpose is ambiguous and less usable for assistive technologies.
- **Evidence**: The mobile observation reports `missing_input_label` for target `ux-9`. The interactable shows a number input with name '12', empty label, and empty placeholder. Session notes also flag that the number input appeared out of sync in labeling versus the range control.
- **Suggested fix**: Give the number input a persistent label such as 'Team size' and associate it programmatically with the same pricing-control context as the slider. Keep the visible text and accessible name synchronized when values change.

### [MEDIUM] several-important-mobile-controls-are-below — mobile usability
- **Page**: `pricing.html and index.html mobile header/toggle targets`
- **Problem**: Several important mobile controls are below recommended touch size, making them harder to hit accurately.
- **Evidence**: Layout warnings on mobile flag 'Sign in' at 44x16px, 'Get Vaultkey' at 125x34px, 'Yearly · save 20%' at 153x32px, 'Monthly' at 90x32px, 'Vaultkey' at 106x30px, and 'Talk to sales →' at 143x35px. Session notes specifically called out these undersized targets as an early mobile-accessibility risk.
- **Suggested fix**: Increase tap area height to at least common mobile guidance and add more spacing between neighboring header actions. Prioritize the utility links and billing toggle since they affect navigation and pricing comprehension.

### [MEDIUM] the-mobile-pricing-page-slightly-overflows — mobile usability
- **Page**: `pricing.html mobile layout`
- **Problem**: The mobile pricing page slightly overflows horizontally, which can cause subtle side-scrolling and make dense comparison content feel cramped.
- **Evidence**: Final mobile observation reports `horizontal_overflow` with page width 395px on a 390px viewport. This overflow was observed repeatedly in mobile steps near the pricing hero and FAQ/comparison regions.
- **Suggested fix**: Audit mobile widths, paddings, and any fixed-size elements in the pricing layout so content fits within the viewport without horizontal scrolling. Recheck the comparison table and pricing controls first, since they are the densest sections.

### [LOW] the-faq-sometimes-gives-weak-or — feedback
- **Page**: `pricing.html FAQ accordion, especially first question`
- **Problem**: The FAQ sometimes gives weak or easy-to-miss expansion feedback, particularly on the first item, which can make users think the accordion is broken.
- **Evidence**: On both desktop and mobile, clicking 'What happens if I forget my master key?' initially produced no detected visible change and remained shown with a down-caret in observations, while other FAQ items did expand. The session notes repeatedly describe a mismatch where FAQ expansion worked in screenshots but felt subtle enough that change detection often missed it.
- **Suggested fix**: Strengthen accordion state feedback with clearer caret/state change, more obvious answer reveal animation, and stronger contrast or spacing changes when a row opens. Verify the first item behaves identically to the others.
