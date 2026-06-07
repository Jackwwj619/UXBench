# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full codekite system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The CodeKite pricing page features a functional usage calculator but suffers from critical accessibility and mobile usability issues. The primary friction points are tiny tap targets for runner checkboxes (13x13px) on mobile, missing accessible labels for all calculator inputs, and broken conversion paths where key CTAs lead to dead ends (#). Additionally, the calculator logic exhibits inconsistencies, recommending high-tier plans even when usage is zeroed out.

## Issues (5)

### [HIGH] the-checkboxes-for-selecting-specialized-runners — mobile usability
- **Page**: `pricing.html: ux-13, ux-14, ux-15`
- **Problem**: The checkboxes for selecting specialized runners have tap targets of only 13x13px, significantly below the recommended 44x44px minimum for touch interfaces.
- **Evidence**: Layout warnings in steps-67-72 and final_observation identify 'Linux ARM runners' (ux-13), 'macOS runners' (ux-14), and 'GPU runners' (ux-15) as having 13x13px bounding boxes. This makes them extremely difficult to hit accurately on touch screens, leading to frustration and mis-taps.
- **Suggested fix**: Increase the clickable area of the checkbox labels to at least 44x44px. Ensure the text label itself is part of the clickable target, not just the small visual box.

### [HIGH] all-range-sliders-and-number-inputs — accessibility
- **Page**: `pricing.html: ux-7 to ux-12`
- **Problem**: All range sliders and number inputs in the 'Estimate your monthly cost' section lack associated labels, aria-labels, or placeholders.
- **Evidence**: Multiple layout warnings (final_observation, steps-01-06) flag 'missing_input_label' for ux-7 through ux-12. Screen reader users would hear generic input types without context (e.g., 'edit text' instead of 'Build minutes per month').
- **Suggested fix**: Add visible <label> elements linked via 'for' attributes to each input, or include descriptive aria-labels (e.g., aria-label='Build minutes per month') for each slider and number field.

### [HIGH] primary-call-to-action-buttons-start — goal completion
- **Page**: `pricing.html: ux-3, ux-5, ux-6`
- **Problem**: Primary Call-to-Action buttons ('Start free trial', 'Start trial', 'Talk to sales') have href='#' or lead to no action, resulting in dead-end clicks.
- **Evidence**: Steps-19-24 noted that clicking 'Start trial' (ux-8) resulted in no navigation. Final observation shows 'Start free trial' (ux-3) and 'Talk to sales' (ux-6) also point to '#' or have no valid destination. This breaks the core conversion funnel.
- **Suggested fix**: Connect these buttons to actual sign-up flows, contact forms, or calendar scheduling tools. If the feature is coming soon, disable the button or provide a clear 'Coming Soon' tooltip.

### [MEDIUM] the-calculator-recommends-enterprise-or-team — feedback
- **Page**: `pricing.html: Calculator Logic / Recommended Plan Badge`
- **Problem**: The calculator recommends 'Enterprise' or 'Team' plans even when all usage inputs (minutes, concurrency, storage) are set to 0.
- **Evidence**: In steps-73-78, after setting all inputs to 0, the reflection notes the calculator still recommended 'Enterprise' with the message 'workload over Team caps', which is logically inconsistent for zero usage. The expected behavior is a recommendation for the 'Free' plan.
- **Suggested fix**: Review the recommendation logic to ensure that 0 usage correctly maps to the 'Free' tier. Provide clear tooltips explaining exactly which metric triggered the upgrade recommendation.

### [LOW] global-navigation-links-docs-pricing-have — navigation
- **Page**: `pricing.html: ux-2, index.html: nav links`
- **Problem**: Global navigation links ('Docs', 'Pricing') have tap targets smaller than 44px height (e.g., 21px height).
- **Evidence**: Layout warnings in steps-01-06 and final_observation highlight 'Docs' (ux-2) and other nav links as having heights around 21px, failing mobile touch target guidelines.
- **Suggested fix**: Add padding to the navigation link containers to ensure the total clickable height is at least 44px.
