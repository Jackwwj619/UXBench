# UXAgent Exploration Plan

## Goal

Explore the complete Shopify marketing, pricing, and onboarding funnel to evaluate user experience across form flows, state transitions, and mobile responsiveness.

## Plan Summary

The run will first execute the primary 'Start free trial' onboarding flow, transitioning from the homepage to the multi-step trial form. It will then test the login and account recovery flows on the admin page. Next, it will evaluate the pricing structures and 'Contact Sales' forms. Finally, it will verify informational resources and repeat key interactable checks in the mobile viewport to assess responsive design and tap target sizes.

## Coverage Targets

- pages: `Visit all 8 identified HTML files.`
- features: `Exercise form flows (onboarding, login, sales) and state toggles (pricing).`
- mobile: `Repeat the primary free trial onboarding and pricing checks in mobile viewport to evaluate responsive layout.`

## Planned Phases

### Trial Onboarding Flow

- Objective: Validate the user journey from landing page to completing the onboarding questionnaire.
- Target pages: index.html, free-trial.html, free-trial-form.html
- Key checks:
  - Email input submission on index.html routing to trial flow
  - Navigation through the multi-step questionnaire in free-trial-form.html using 'Next'
  - Functionality of the 'Skip all' button during onboarding
  - Final success state or redirect upon finishing the questionnaire
- Exit criteria:
  - Successfully navigated through all steps of free-trial-form.html to the final state.

### Authentication & Admin

- Objective: Test the login interface and recovery paths for existing merchants.
- Target pages: admin.html
- Key checks:
  - Validation of email, password, and store URL inputs
  - Functionality of 'Log in' button and success/error states
  - Presence and responsiveness of 'Forgot password?' link
  - Clickability of social login options (Apple, Google, Facebook)
- Exit criteria:
  - Login form interacted with and error/success states observed.

### Pricing and Enterprise Sales

- Objective: Evaluate the plan comparison features and lead generation forms.
- Target pages: pricing.html, sales.html
- Key checks:
  - Toggling between 'Pay monthly' and 'Pay yearly' on pricing.html
  - Checking FAQ accordions on pricing.html
  - Filling out the Contact Sales form on sales.html
  - Validating dropdown selects (company size, topic) on sales.html
- Exit criteria:
  - Pricing toggle changes state and Sales form can be submitted.

### Resources and Help Center

- Objective: Ensure support and marketing content is accessible and well-structured.
- Target pages: resources.html, help-trial.html
- Key checks:
  - Navigation links in resources.html point to correct sections
  - Help center search input functionality in help-trial.html
  - Readability and layout of help center articles
- Exit criteria:
  - Resource links and help center search interacted with.

### Mobile Viewport Validation

- Objective: Verify that critical paths and dense layouts are usable on smaller screens.
- Target pages: index.html, free-trial-form.html, pricing.html
- Key checks:
  - Mobile menu accessibility
  - Tap target sizes for navigation and form buttons
  - Responsiveness of the pricing table and multi-step onboarding form
- Exit criteria:
  - Key pages checked in mobile viewport with layout warnings documented.

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

