# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full meadowid system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

MeadowID’s core security and privacy flows are generally understandable: users can reach active sessions, connected apps, passkeys, data export, and freeze controls, and destructive actions are usually guarded with confirmation. The biggest UX weaknesses are mobile touch friction, several unlabeled controls, and weak interaction feedback on some high-impact actions. Coverage is substantial but not complete, so a few untested areas remain, especially some dashboard links and connected-app/export edge cases.

## Issues (7)

### [HIGH] some-prominent-actions-appear-to-do — feedback
- **Page**: `index.html / freeze.html`
- **Problem**: Some prominent actions appear to do nothing or give no immediate confirmation, which makes them feel unreliable even when they may be wired up.
- **Evidence**: The dashboard’s "Run security check" click produced no visible state change or text update. On the freeze page, clicking the freeze switch also produced no visible state change, confirmation, or URL change, and "Request deletion" only changed the hash without revealing any dialog or state change.
- **Suggested fix**: Show an immediate state change or inline confirmation for each high-impact action, and if the action is not implemented, disable it or explain what will happen before users click.

### [HIGH] the-export-wizard-contains-unlabeled-or — forms
- **Page**: `data-export.html`
- **Problem**: The export wizard contains unlabeled or hard-to-identify inputs, making a multi-step sensitive form harder to complete and verify.
- **Evidence**: The session memory reports unlabeled form fields on connected-apps.html, passkeys.html, and data-export.html. In the export flow, the mobile review step shows the delivery email, but earlier the email field was still missing a visible label/aria-label.
- **Suggested fix**: Add visible labels to all form fields and ensure every control has an accessible name; avoid relying on placeholder-only or implicit labeling in any sensitive flow.

### [MEDIUM] multiple-primary-nav-links-and-action — mobile usability
- **Page**: `global nav / connected-apps.html / data-export.html / freeze.html`
- **Problem**: Multiple primary nav links and action buttons fall below mobile tap-target guidance, increasing mis-taps in security settings.
- **Evidence**: Layout warnings repeatedly flagged sidebar links at 40–41px tall on index.html, devices.html, connected-apps.html, data-export.html, and freeze.html. The connected-apps revoke buttons were also reported at 80x41px, and the export modal buttons were 134x41px and 77x41px.
- **Suggested fix**: Increase the height/padding of sidebar links, revoke buttons, and modal actions to at least 44px on touch layouts, and add spacing so adjacent controls are easier to hit.

### [MEDIUM] the-export-wizard-s-checkboxes-and — forms
- **Page**: `data-export.html`
- **Problem**: The export wizard’s checkboxes and radio buttons are very small touch targets, which makes a long sensitive form harder to use on mobile.
- **Evidence**: The export checklist used checkbox targets around 13x36px, and the schedule radios were described as very small touch targets (13x13px) on mobile. The observations also note that the controls are usable but not comfortable.
- **Suggested fix**: Enlarge the clickable area for checkboxes/radios, allow the full row/label to toggle the control, and provide a larger visual hit area on mobile.

### [MEDIUM] some-list-controls-change-state-without — feedback
- **Page**: `connected-apps.html`
- **Problem**: Some list controls change state without clear confirmation, so users may not know whether the action took effect.
- **Evidence**: Typing "Aurora" into search narrowed the connected-apps list immediately, but the filter/sort selects were described as unlabeled and the sort control accepted "Name A→Z" without a visibly changed list order or explicit feedback. The notes repeatedly say the change was only visible through the resulting list, not through any status text.
- **Suggested fix**: Show a visible active-filter/sort state, and add a clear result count or “sorted by…” chip so changes are obvious after interaction.

### [MEDIUM] destructive-or-irreversible-actions-are-sometimes — trust
- **Page**: `connected-apps.html / freeze.html / data-export.html`
- **Problem**: Destructive or irreversible actions are sometimes framed as simple buttons or links without enough perceived protection or consequence emphasis in the trigger itself.
- **Evidence**: On connected-apps, Revoke is a direct per-app action that opens confirmation, which is good, but the freeze page’s "Request deletion" is visually just a simple link. The export request similarly becomes a confirmation modal only after tapping the final CTA, and the dialog buttons are small on mobile.
- **Suggested fix**: Visually differentiate destructive actions with stronger affordance, such as a clearly styled danger button and explicit pre-click context about what will happen next.

### [LOW] the-export-review-step-preserves-selections — clarity
- **Page**: `data-export.html`
- **Problem**: The export review step preserves selections well, but the resulting summary can be a little opaque about scope and format changes after navigation.
- **Evidence**: On mobile, the review step shows categories, format, frequency, and delivery address, but the modal after Request export says it will prepare a CSV archive of 2 categories even though the review step showed JSON. Earlier notes also said the selected-risk feedback for a sensitive category was not immediate or clear.
- **Suggested fix**: Keep the final review summary and confirmation dialog wording perfectly aligned, and surface a clearer recap of selected categories and file format before the final click.
