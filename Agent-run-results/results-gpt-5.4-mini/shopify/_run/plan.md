# UXAgent Exploration Plan

## Goal

Thoroughly validate the Shopify marketing-to-trial-to-admin funnel, with emphasis on the primary free-trial onboarding path, pricing entry points, and recovery/help flows across desktop and mobile.

## Plan Summary

Start from the home page and confirm the main conversion path into the trial form, then branch into pricing, help, resources, and sales contact flows to understand adjacent entry points and escape hatches. After covering desktop interactions, repeat the critical onboarding and tap-target checks on mobile because the prescan shows multiple small-tap-target warnings. Prioritize visible controls and states that are already present in the prescan; do not assume hidden functionality beyond the known pages.

## Coverage Targets

- pages: `Visit all known HTML pages listed in the prescan, with repeat visits allowed for key flow pages.`
- features: `Exercise the main hero signup, trial onboarding step(s), pricing toggle, at least one plan CTA per pricing tier group, help navigation, login, and the sales lead form.`
- mobile: `Repeat the home CTA, trial onboarding, pricing toggle/CTA, and sales form checks in mobile viewport, with special attention to the small tap targets flagged in the prescan.`

## Planned Phases

### Home page conversion baseline

- Objective: Validate the main marketing entry point and the primary call to action from index.html, including email capture, nav destinations, and FAQ/accordion behavior.
- Target pages: index.html
- Key checks:
  - Enter an email in the hero field and verify the Start free trial submission path routes into the trial flow.
  - Click the top navigation links for Pricing, Resources, Log in, and Start free trial to confirm the expected page transitions.
  - Expand the visible FAQ/questions section and verify the content reveals correctly without layout breakage.
  - Inspect footer links that route to help or trial-related pages versus placeholder '#' items.
- Exit criteria:
  - Primary CTA path has been exercised at least once successfully.
  - Top-nav destinations for known real pages have been visited or confirmed.
  - At least one FAQ interaction has been validated.
  - Any placeholder or non-functional footer links have been identified.

### Trial entry and onboarding steps

- Objective: Exercise the trial onboarding surface and confirm that the flow supports both guided progression and skipping where offered.
- Target pages: free-trial.html, free-trial-form.html
- Key checks:
  - Verify the free-trial landing page repeats the trial pitch and exposes the Start free trial CTA back into the onboarding form.
  - On free-trial-form.html, test the surfaced question choices for 'What are you planning to sell?' and the Next / Skip all controls.
  - Check that the onboarding copy reflects state transitions between steps without losing context.
  - If additional steps become visible, validate only the revealed step controls and progression behavior, not unobserved hypothetical steps.
- Exit criteria:
  - The trial flow has been entered from at least one marketing entry point.
  - The first onboarding decision step and skip path have both been checked or explicitly observed.
  - Any step progression behavior is documented, including whether state advances cleanly.

### Pricing and plan-routing validation

- Objective: Confirm pricing page structure, the monthly/yearly toggle, plan comparison clarity, and routes into trial or sales for different plan tiers.
- Target pages: pricing.html, sales.html
- Key checks:
  - Toggle between Pay monthly and Pay yearly and verify the pricing labels and savings messaging update as expected.
  - Inspect the Basic, Grow, Advanced, and Plus plan presentations for clarity, CTA consistency, and differences in benefits.
  - Click self-serve plan CTAs and confirm they route into the trial flow or equivalent entry point.
  - Click Contact sales for the Plus tier and verify the sales form page opens correctly.
  - Open pricing FAQ content and check whether it answers the most obvious plan-selection questions.
- Exit criteria:
  - Both pricing modes have been exercised or confirmed.
  - At least one plan CTA and the Contact sales path have been validated.
  - Pricing FAQ or supporting details have been expanded or reviewed.

### Help and recovery paths

- Objective: Validate support-oriented navigation and help content that users would use when they are uncertain during trial or pricing evaluation.
- Target pages: help-trial.html, resources.html
- Key checks:
  - Open the free-trial help article and verify the table of contents / on-page section anchors are navigable.
  - Use the help search field if it is available and confirm it behaves as a search input even if results are mock or static.
  - Click the linked subtopics such as Available plans for trial, Initiate the free trial, and Choosing a paid plan to assess help discoverability.
  - From Resources, inspect key resource cards such as Help Center, Academy, Theme Store, and App Store to confirm adjacency to support and onboarding.
- Exit criteria:
  - At least one help article and one resource hub page have been visited.
  - Section links or resource cards have been tested for destination clarity.
  - The support path feels usable as a recovery route from trial/pricing uncertainty.

### Sales form and login/admin path

- Objective: Check the higher-friction form flows: the mock admin login and the Shopify Plus sales contact form, including success states and validation behavior.
- Target pages: admin.html, sales.html
- Key checks:
  - Fill the login form fields and trigger Log in to confirm the simplified success state or any validation behavior.
  - Use Forgot password or social login buttons if they are visibly present, noting whether they are functional or placeholders.
  - On sales.html, populate required business fields, select company size and topic, and submit the form to verify the thank-you state appears.
  - Observe whether any missing labels, focus issues, or select controls cause usability friction on submission.
- Exit criteria:
  - Login path has been exercised to its visible terminal state.
  - Sales form has been completed through submit and the thank-you state has been observed.
  - Any validation or labeling issues have been captured.

### Mobile usability pass

- Objective: Repeat the most important conversion and form checks under mobile viewport conditions, focusing on the tap-target warnings seen in the prescan.
- Target pages: index.html, free-trial-form.html, pricing.html, sales.html
- Key checks:
  - Re-check the home hero CTA and nav items for tapability and accidental mis-taps.
  - Repeat the first trial onboarding step and ensure Next / Skip all remain usable on a small screen.
  - Verify pricing toggle and plan CTAs remain accessible without cramped touch targets.
  - Confirm sales form controls, especially selects and submit, remain operable and legible on mobile.
- Exit criteria:
  - Critical conversion actions have been repeated on mobile.
  - Known small tap targets have been confirmed as usable or documented as problematic.
  - No mobile-only blocker prevents trial entry, pricing review, or sales submission.

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

