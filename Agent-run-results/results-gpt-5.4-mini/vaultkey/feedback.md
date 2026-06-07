# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full vaultkey system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The pricing flow is generally understandable and functional, but several high-value controls feel incomplete or misleading because they behave like placeholders or dead links. On mobile, the page also has a real responsiveness problem: horizontal overflow persists, tap targets are small, and the business seat input is unlabeled, reducing usability in the core pricing calculator. I did not fully validate every adjacent nav destination, so there may be additional inert links beyond the ones observed.

## Issues (9)

### [HIGH] the-mobile-sign-in-link-behaves — trust
- **Page**: `index.html header link `Sign in``
- **Problem**: The mobile Sign in link behaves like a placeholder anchor instead of a real destination, changing only the URL to `#` with no page change or feedback.
- **Evidence**: In the mobile viewport, clicking `index.html: Sign in` changed the URL from `index.html` to `index.html#`, and the observed href is `#`. The control is also very small at 44×16px.
- **Suggested fix**: Route Sign in to a real login page or modal, or relabel it as unavailable until implemented. Increase the tap target to a full-height header button.

### [HIGH] the-prominent-download-free-cta-on — trust
- **Page**: `index.html hero CTA `Download free``
- **Problem**: The prominent "Download free" CTA on the homepage appears inert, so a major conversion action does not produce a meaningful result.
- **Evidence**: Clicking `index.html: Download free` caused no URL change and no visible-text change, and the control uses `href="#"` according to the trajectory notes.
- **Suggested fix**: Link the CTA to an actual download or signup step. If it is informational, change the label and styling so it does not promise an action it cannot complete.

### [HIGH] the-personal-plan-cta-is-visually — trust
- **Page**: `pricing.html plan card CTA `Get Personal``
- **Problem**: The Personal plan CTA is visually primary but behaves like a placeholder, undermining the plan card’s main action.
- **Evidence**: Clicking `pricing.html: Get Personal` produced no navigation or visible change in the earlier trajectory, and the control’s href is `#` in the discovered interactables.
- **Suggested fix**: Connect the button to the purchase/signup flow or replace it with a disabled state and explanatory copy until the flow exists.

### [HIGH] the-mobile-pricing-page-overflows-horizontally — mobile usability
- **Page**: `pricing.html mobile layout warning`
- **Problem**: The mobile pricing page overflows horizontally, so the layout is not fully contained within the viewport.
- **Evidence**: Layout warnings repeatedly report `Page width 395px exceeds viewport 390px`, and the final mobile observation still shows horizontal overflow while the pricing content is visible.
- **Suggested fix**: Remove the extra 5px overflow by tightening widths, margins, or flex gaps around the pricing section and header.

### [MEDIUM] the-business-seat-number-input-has — forms
- **Page**: `pricing.html Business seat number input `ux-9``
- **Problem**: The Business seat number input has no visible label, placeholder, or ARIA label, making it hard to discover and interpret.
- **Evidence**: The layout warnings include `missing_input_label` for the number input, and the interactable is shown simply as an unlabeled input with current value `12`/later `50` seats.
- **Suggested fix**: Add a persistent visible label such as "Team size" and an accessible name. Keep the input close to the slider with clear helper text.

### [MEDIUM] the-yearly-monthly-billing-toggle-is — mobile usability
- **Page**: `pricing.html billing toggle `ux-4` / `ux-5``
- **Problem**: The yearly/monthly billing toggle is functional but too small for comfortable touch use, and it contributes to the page’s cramped mobile feel.
- **Evidence**: The mobile viewport flags both tabs as below guidance: `Yearly · save 20%` is 153×32px and `Monthly` is 90×32px. The page also reports horizontal overflow while the toggle is in view.
- **Suggested fix**: Increase the tab height to at least 44px and add more spacing/padding so the toggle feels easier to use on touch devices.

### [MEDIUM] several-top-navigation-items-behave-like — clarity
- **Page**: `pricing.html nav links `Security`, `Product`, `Help``
- **Problem**: Several top navigation items behave like placeholders rather than meaningful destinations, which makes the header feel unreliable.
- **Evidence**: Clicking `pricing.html: Security` changed the URL to a bare hash with no visible content change, and earlier notes also show `Product` and `Help` behaving similarly as self-link or hash placeholders.
- **Suggested fix**: Either wire these links to actual pages/sections or visually mark them as unavailable/development items so users do not expect real navigation.

### [LOW] the-header-contains-several-undersized-touch — mobile usability
- **Page**: `index.html / pricing.html header`
- **Problem**: The header contains several undersized touch targets, increasing the chance of mis-taps on a phone.
- **Evidence**: Mobile layout warnings flag `Sign in` at 44×16px, `Get Vaultkey` at 125×34px, and `Vaultkey` at 106×30px as below the 44px guidance.
- **Suggested fix**: Increase vertical padding and tap area for the header links, or consolidate them into a more mobile-friendly menu.

### [LOW] some-cta-clicks-only-update-the — feedback
- **Page**: `pricing.html CTA `Start free 30-day trial`; index.html `Sign in``
- **Problem**: Some CTA clicks only update the URL fragment to `#`, which is weak feedback for high-importance actions.
- **Evidence**: The mobile `Start free 30-day trial` CTA changed the URL to `pricing.html#`, and the mobile `Sign in` link changed to `index.html#`. These are visible changes, but they do not communicate a real destination or state change.
- **Suggested fix**: Replace fragment-only placeholders with real destinations or richer feedback such as a dialog, page transition, or disabled state with explanation.
