# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Shopify marketing → free-trial → admin funnel, including adjacent pricing/resources/help/sales flows and key error/edge states.

## Plan Summary

Start on the home page, evaluate the main email-to-trial entry points, and proceed through the free-trial onboarding steps. Then validate adjacent trust and decision surfaces (pricing, resources, help center) and the alternate conversion path (contact sales). Finally, verify the admin login flow, including recovery (forgot password) and OAuth buttons, and repeat critical checks on mobile viewports.

## Coverage Targets

- pages: `Visit all known HTML pages listed in the prescan (index.html, free-trial-form.html, free-trial.html, help-trial.html, pricing.html, resources.html, sales.html, admin.html).`
- features: `Exercise every visible primary CTA on each target page (all 'Start free trial' instances, Pricing toggle, FAQ expansion, Help navigation links, Sales form submit, Admin login + Forgot password + OAuth).`
- mobile: `Repeat critical checks on mobile viewport for: index email + CTA, free-trial-form step navigation and 'Skip all', pricing monthly/yearly toggle + CTA, sales form submit + validation, admin login + recovery/OAuth.`

## Planned Phases

### Home page: value prop + entry points

- Objective: Validate clarity, trust, and usability of the primary trial entry from the marketing home page.
- Target pages: index.html
- Key checks:
  - Focus, typing, and validation on 'Enter your email address' input (email format handling; what happens when empty vs invalid vs valid).
  - Trigger both home CTAs ('Start free trial' button and the submit-style button in the hero) and confirm navigation to free-trial-form.html.
  - Check consent/marketing email notice visibility and whether it is consistently presented near the CTA.
  - Use header navigation (Pricing, Resources, Log in) to confirm correct routes and that back navigation returns to expected scroll position/state.
  - Assess tappability targets on mobile for header links and the hero CTAs (prescan shows multiple small tap targets as a known issue).
- Exit criteria:
  - Demonstrated that email entry + CTA leads into the intended onboarding page without errors or confusion.
  - Validated that header links route correctly and do not break the trial entry path.
  - Captured evidence of any validation or missing-feedback problems surfaced on both desktop and mobile viewports.

### Free trial onboarding: multi-step questionnaire

- Objective: Critique the trial onboarding flow for usability, error prevention, and successful completion messaging.
- Target pages: free-trial-form.html
- Key checks:
  - Proceed through the steps using 'Next' while selecting each option group (e.g., 'What are you planning to sell?' choices; 'Where would you like to sell?'; 'Where is your business located?').
  - Test 'Skip all' behavior: confirm it advances/marks answers appropriately and does not block completion.
  - Verify required/optional field behavior when leaving inputs blank; confirm inline feedback and focus management.
  - Reach and validate the terminal state messaging: 'Your store is ready!' (confirm presence, readability, and next-step actions if any).
  - Check mobile step navigation and whether controls remain reachable without layout breakage.
- Exit criteria:
  - Completed the questionnaire at least once using a full set of selections and once using 'Skip all' (or lowest-effort path available).
  - Observed and recorded any validation errors, confusing labels, or dead-ends on desktop and mobile.
  - Confirmed the final completion state appears and is understandable.

### Trial landing + decision support surfaces

- Objective: Validate how the trial promise is reinforced and how decision-support pages connect to starting or understanding the trial.
- Target pages: free-trial.html, pricing.html
- Key checks:
  - On free-trial.html: verify that 'Start free trial' CTA routes consistently to free-trial-form.html and that key marketing claims are readable and not contradictory.
  - On pricing.html: toggle 'Pay monthly' vs 'Pay yearly (save 25%)' and verify prices/labels update correctly for all tiers.
  - Select/inspect each plan card section (Basic/Grow/Advanced/Plus) and validate that CTAs (e.g., 'Start free trial') behave consistently.
  - Exercise FAQ accordion items related to pricing/trial (ensure expanded/collapsed states are clear and accessible).
  - Check mobile rendering for the pricing toggle, table/plan comparison readability, and CTA tap targets.
- Exit criteria:
  - Verified that pricing and trial landing provide consistent navigation into the trial form.
  - Confirmed plan pricing/toggle state changes are reflected in the UI and no content becomes unreadable on mobile.
  - Documented any inconsistencies between trial claims on free-trial.html and pricing.html.

### Help + Resources: self-serve clarity and matching guidance

- Objective: Ensure help content accurately guides users to the trial/onboarding flow and that resource navigation works.
- Target pages: help-trial.html, resources.html
- Key checks:
  - On help-trial.html: use 'Search help articles...' and validate search UI behavior (even if results are static in this clone).
  - Click key navigation links: 'Initiate the free trial', 'Setting up your store during the free trial', 'Making the most of your free trial', 'Choosing a paid plan', 'Deactivating your store', 'Troubleshooting'—confirm they scroll or navigate appropriately.
  - Follow the instruction: 'Visit the free trial page, enter your email address, and then click Start free trial.' Confirm it matches the actual observed entry path from index.html.
  - On resources.html: click each resource category (Blog, Tools, Events, Shopify Help Center, Shopify Academy, Theme Store, App Store) and verify correct routing or non-dead links.
  - Validate mobile tap targets/spacing on the resource category list (prescan indicates many small tap targets).
- Exit criteria:
  - Evidence that help guidance matches the real onboarding entry and supports troubleshooting paths.
  - Resource category links are not dead ends and remain usable on mobile.
  - Search and navigation controls demonstrate expected behavior (no broken UI states).

### Alternate conversion: Sales contact + thank-you state

- Objective: Validate the Shopify Plus sales lead form experience, including form validation and submission feedback.
- Target pages: sales.html
- Key checks:
  - Fill the contact form fields with plausible data (Full name, Work email, Company name, Company size, Phone number, Topic).
  - Test select controls (company size, topic) for correct options display and selection persistence.
  - Submit the form and confirm the 'Thank you!' confirmation state appears and is readable.
  - Validate error handling when required fields are blank (especially for controls with missing/unclear labels—prescan warns 'missing_input_label').
  - Check mobile usability: form scrolling, label visibility, and submit button accessibility.
- Exit criteria:
  - Confirmed successful submission leads to the expected confirmation state.
  - Recorded any validation/labeling issues that could prevent completion.
  - Verified the same core completion path on mobile viewport.

### Admin login: validation + recovery

- Objective: Ensure the admin login page supports common authentication routes and recovery without confusion.
- Target pages: admin.html
- Key checks:
  - Attempt login with empty fields and invalid formats; verify inline feedback and focus handling on the first problematic field.
  - Enter a plausible store URL (e.g., .myshopify.com), email, and password fields and submit (confirm whether it triggers success state indicated by 'Login successful' heading).
  - Click 'Forgot password?' and confirm resulting behavior (route, modal, or instruction) does not dead-end.
  - Click OAuth options (Apple/Google/Facebook) and validate whether they provide a clear next step or a safe fallback.
  - Mobile check for input usability and the visibility of submit + recovery links (prescan indicates small tap targets).
- Exit criteria:
  - Validated form validation and at least one successful login path (or clear non-functional behavior that is consistent and explainable).
  - Confirmed recovery and OAuth controls behave predictably and don’t break navigation.
  - Captured any major mobile accessibility/tappability issues.

## Prescan Summary

### Shopify – Start Your Business

- Page: `index.html`
- Headings: Your business starts
with Shopify, Create a stunning store in seconds, Your plan can pay for itself, Level up with our AI assistant, Getting stuff done? Done., No risk, all rewards. Try Shopify for £1/month., Questions?
- Interactables: `7` buttons, `34` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Log in – Shopify

- Page: `admin.html`
- Headings: Log in to Shopify, Login successful
- Interactables: `4` buttons, `4` links, `3` inputs
- Notable controls:
  - clickable:a:Shopify
  - typeable:input:your-store
  - typeable:input:you@example.com
  - typeable:input:Enter your password
  - clickable:button:Log in
  - clickable:a:Forgot password?
  - clickable:button:Apple
  - clickable:button:Google

### Start Your Free Trial – Shopify

- Page: `free-trial-form.html`
- Headings: What are you planning to sell?, Where would you like to sell?, Where is your business located?, Create your Shopify account, Your store is ready!
- Interactables: `4` buttons, `3` links, `3` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:button:Next

### Start Your Free Trial – Shopify

- Page: `free-trial.html`
- Headings: Your business starts
with Shopify, Create a stunning store in seconds, Your plan can pay for itself, Level up with our AI assistant, Getting stuff done? Done., No risk, all rewards. Try Shopify for £1/month., Questions?
- Interactables: `7` buttons, `34` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Trying Shopify with a free trial – Shopify Help Center

- Page: `help-trial.html`
- Headings: Trying Shopify with a free trial, Available plans for trial, Initiate the free trial, Setting up your store during the free trial, Making the most of your free trial, Choosing a paid plan, Charges incurred during your free trial, Switching between plans during your free trial, Free trial period length and details, Monthly plan promotional pricing
- Interactables: `0` buttons, `18` links, `1` inputs
- Notable controls:
  - clickable:a:Shopify Help Center
  - typeable:input:Search help articles...
  - clickable:a:Available plans for trial
  - clickable:a:Initiate the free trial
  - clickable:a:Setting up your store
  - clickable:a:Making the most of your trial
  - clickable:a:Choosing a paid plan
  - clickable:a:Trial period length

### Shopify Pricing – Plans for Every Business

- Page: `pricing.html`
- Headings: Plans & pricing, What every plan gets you, World's best checkout, In-person selling, Multiple sales channels, In-depth analytics, Commerce apps, 24/7 support, More options for your business, Frequently asked questions
- Interactables: `9` buttons, `36` links, `2` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Enter your email address
  - clickable:button:Start free trial

### Resources – Shopify

- Page: `resources.html`
- Headings: Resources, Explore resources, Blog, Tools, Events, Learn and grow, Ready to start selling?
- Interactables: `2` buttons, `34` links, `1` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Solutions
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - clickable:a:Shopify Help Center Browse step-by-step guides and tutorials on setting up and managing your store.
  - clickable:a:Shopify Academy Free online courses on entrepreneurship, marketing, and ecommerce best practices.

### Contact Shopify Plus Sales

- Page: `sales.html`
- Headings: Contact Shopify Plus Sales, Thank you!
- Interactables: `1` buttons, `7` links, `6` inputs
- Notable controls:
  - clickable:a:Shopify
  - clickable:a:Pricing
  - clickable:a:Resources
  - clickable:a:Log in
  - clickable:a:Start free trial
  - typeable:input:Your full name
  - typeable:input:you@company.com
  - typeable:input:Your company name

