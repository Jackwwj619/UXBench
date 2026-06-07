# UXAgent Exploration Plan

## Goal

Validate the end-to-end user journey from marketing landing page through trial onboarding, while assessing pricing clarity and mobile accessibility compliance.

## Plan Summary

The run will begin by exploring the marketing entry points (Home, Pricing) to understand value proposition and plan differentiation. It will then execute the primary conversion flow: entering an email on the homepage, navigating the multi-step 'free-trial-form' wizard, and verifying the final success state. Finally, it will audit the 'sales.html' enterprise contact form and check for layout regressions on mobile viewports, specifically targeting the small tap targets identified in the prescan.

## Coverage Targets

- pages: `Visit all 8 HTML files, ensuring deep interaction with the 3 primary flow pages.`
- features: `Exercise all form inputs, dropdowns, and toggles found in pricing and sales pages.`
- mobile: `Repeat Phase 1 and Phase 2 checks on mobile viewport to validate touch targets.`

## Planned Phases

### Marketing & Pricing Discovery

- Objective: Evaluate the clarity of the value proposition and plan comparison before commitment.
- Target pages: index.html, pricing.html
- Key checks:
  - Verify visibility of hero CTA ('Start free trial') and email input on index.html.
  - Test the Monthly/Yearly toggle on pricing.html to ensure prices update correctly.
  - Check that 'Start free trial' buttons on both pages lead to the onboarding flow.
  - Inspect footer links for broken paths to resources/help.
- Exit criteria:
  - Pricing tiers (Basic, Grow, Advanced) are clearly visible and comparable.
  - Navigation to the trial flow is confirmed from multiple entry points.

### Primary Onboarding Flow (Happy Path)

- Objective: Complete the full trial signup wizard to validate the core conversion funnel.
- Target pages: free-trial-form.html
- Key checks:
  - Enter a valid email address on index.html and proceed.
  - Step-through the 'What are you planning to sell?' questions (Physical/Digital/Services).
  - Test the 'Skip all' functionality to bypass detailed setup questions.
  - Verify the final 'Your store is ready!' success state or redirect to admin.
- Exit criteria:
  - User successfully reaches the post-signup confirmation or admin dashboard view.
  - No dead-ends encountered during the step-by-step wizard.

### Admin & Recovery Paths

- Objective: Assess the login experience and help resources for users who already have accounts or need support.
- Target pages: admin.html, help-trial.html
- Key checks:
  - Analyze the admin.html login form: Check for 'Store URL' vs 'Email' confusion.
  - Test social login buttons (Apple, Google, Facebook) for visual feedback (even if non-functional).
  - Browse help-trial.html to verify content readability and link integrity.
  - Check 'Forgot password?' flow visibility.
- Exit criteria:
  - Login form labels are clear and accessible.
  - Help center content is navigable and relevant to the trial phase.

### Enterprise Sales & Forms Audit

- Objective: Validate the complex contact form for Shopify Plus and general form accessibility.
- Target pages: sales.html
- Key checks:
  - Fill out the 'Contact Shopify Plus Sales' form with valid data.
  - Test dropdowns for 'Company size' and 'How can we help?'.
  - Verify error handling or required field indicators if submitted empty.
  - Check for missing labels on inputs as flagged in prescan.
- Exit criteria:
  - Sales form submits successfully or shows expected validation errors.
  - All form inputs have associated accessible labels.

### Mobile Responsiveness & Accessibility

- Objective: Re-evaluate critical flows on mobile viewport to address prescan layout warnings.
- Target pages: index.html, pricing.html, free-trial-form.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Verify that nav links (Solutions, Pricing) are tappable despite <44px height warnings.
  - Ensure the onboarding wizard steps stack correctly without horizontal scroll.
  - Check that the 'Start free trial' sticky header/footer (if present) does not obscure content.
- Exit criteria:
  - Core navigation and CTAs are usable on touch devices.
  - No critical layout breakage on narrow screens.

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

