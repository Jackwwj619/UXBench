# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full stratabox system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Stratabox presents a polished single-page marketing experience with strong section anchoring and an interactive builder that generally reflects edits well. However, the pricing/conversion flow is undermined by many high-intent links that look actionable but do nothing, and the integrations search becomes untrustworthy when counts and visible results disagree. Mobile usability is also weakened by cramped controls, small tap targets, and unlabeled builder selects.

## Issues (8)

### [HIGH] many-of-the-most-important-conversion — goal completion
- **Page**: `index.html; hero CTAs, header actions, SDK CTA, footer links`
- **Problem**: Many of the most important conversion and navigation actions are dead ends, so users can repeatedly click prominent CTAs without getting anywhere.
- **Evidence**: Multiple tested links resolved to href '#' and produced no URL, dialog, scroll, or page change: hero 'Book a demo', hero 'Start free →', header 'Sign in', SDK 'Read the API reference →', footer links including 'API reference', 'CLI', 'Docs', 'Assets', 'Security', 'Schema', 'Pricing', 'Contact', 'Careers', and 'Changelog'. This is documented across chunks steps-19-24, 25-30, 31-36, 37-42, and 49-54.
- **Suggested fix**: Ensure every prominent CTA and footer/header nav item either navigates to a real destination or is clearly presented as non-interactive. Prioritize making 'Start free', 'Book a demo', 'Sign in', pricing, and docs paths functional first.

### [HIGH] the-integrations-search-can-report-zero — trust
- **Page**: `index.html integrations search; screenshot agentic-57-scroll-mobile.png`
- **Problem**: The integrations search can report zero results while still displaying many integration cards, which makes the filtering behavior feel broken and unreliable.
- **Evidence**: On desktop, typing 'cms' showed '0 of 24' while cards like Vercel, Netlify, Cloudflare, and Next.js remained visible (steps-13-18). On mobile, the final screenshot /Users/timchef/UXBench/results-gpt-5.4/stratabox/_run/screenshots/agentic-57-scroll-mobile.png shows query 'cms' with '0 of 24' while many cards remain visible underneath.
- **Suggested fix**: Keep result count, card visibility, and empty-state messaging synchronized. If there are zero matches, hide non-matching cards and show a clear empty state with a reset/clear action.

### [HIGH] the-pricing-nav-link-does-not — navigation
- **Page**: `index.html sticky header Pricing link`
- **Problem**: The Pricing nav link does not land on the pricing section, so users trying to compare plans are sent to the wrong part of the page.
- **Evidence**: In steps-19-24, clicking the sticky header Pricing link landed around the integrations section showing 'Plays well with your stack.' instead of the pricing teaser 'Start free. Scale to thousands of editors.' The URL also stayed at index.html# rather than updating to a pricing anchor.
- **Suggested fix**: Fix the Pricing anchor so it scrolls directly to the pricing teaser and updates the URL fragment consistently. Verify it works with the sticky header on both desktop and mobile.

### [MEDIUM] many-mobile-controls-are-undersized-making — mobile usability
- **Page**: `mobile header and builder controls; layout warnings for ux-2, ux-3, ux-6 to ux-10, ux-13`
- **Problem**: Many mobile controls are undersized, making taps error-prone in navigation and especially in the builder.
- **Evidence**: Layout warnings repeatedly flag mobile targets below 44px guidance: header 'Sign in' 45x17, header 'Start free' 100x35, builder add buttons around 69-95x26, and delete controls only 21x22. These warnings appear in session memory, steps-43-48, steps-49-54, and final observations.
- **Suggested fix**: Increase hit areas for header actions, builder add buttons, and delete controls to at least recommended touch sizes. Preserve visual compactness if needed by expanding invisible padding around controls.

### [MEDIUM] the-builder-s-type-select-controls — accessibility
- **Page**: `index.html builder select controls; selectors ux-50 and ux-53`
- **Problem**: The builder's type select controls have no label, aria-label, or placeholder, so their purpose is not clearly announced.
- **Evidence**: Layout warnings report missing input labels for builder select controls, including target ux-50 and ux-53, described as 'A form field has no label, aria-label, or placeholder.' This also appears in candidate findings and mobile chunk notes.
- **Suggested fix**: Add explicit visible labels or at minimum accessible names (aria-label/aria-labelledby) that describe the control as block type selection.

### [MEDIUM] save-feedback-exists-but-it-is — feedback
- **Page**: `index.html builder toolbar/status area`
- **Problem**: Save feedback exists, but it is subtle and easy to miss during editing, especially on mobile where it appears as small inline status text.
- **Evidence**: During mobile edits, status changed to small inline messages like '5 blocks · saving...' and was noted as easy to miss in steps-43-48 and recent step 55. Desktop testing also noted that users may need to notice a small status label to understand persistence in steps-31-36.
- **Suggested fix**: Make save state more noticeable with stronger contrast, clearer placement, and brief affirmative confirmation after edits. Consider pairing text with a more distinct status treatment or transient toast near the edited field.

### [MEDIUM] the-mobile-builder-rows-feel-cramped — forms
- **Page**: `index.html mobile builder rows around block controls`
- **Problem**: The mobile builder rows feel cramped, packing drag handle, type selector, truncated content, and tiny delete controls into a narrow strip.
- **Evidence**: Recent step 55 notes the paragraph row packs drag handle, type selector, truncated text, and a 21x22 delete control into a narrow horizontal strip. Steps-49-54 also observed the delete action works but the affordance is hard to target safely.
- **Suggested fix**: Reflow mobile builder rows into a taller stacked layout, separate destructive controls, and give edited content more room so users can scan and act without precision tapping.

### [LOW] when-search-returns-zero-matches-the — feedback
- **Page**: `index.html integrations section search state`
- **Problem**: When search returns zero matches, the only visible feedback can be the count, with no explicit empty-state explanation or recovery cue.
- **Evidence**: In steps-55-56, typing 'cms' on mobile updated the visible count to '0 of 24', but no empty-state message was shown in the visible viewport; users had to infer what happened. The issue is compounded by the later mismatch showing cards still visible.
- **Suggested fix**: Add a visible zero-results state beneath the search field with language like 'No integrations match “cms”' plus a clear reset/clear search action.
