document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (mobileMenu) mobileMenuBtn.setAttribute('aria-controls', mobileMenu.id || 'mobileMenu');
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu ? mobileMenu.classList.toggle('active') : false;
            mobileMenuBtn.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Toggle menu');
        });
        // Close mobile menu when a link inside is clicked
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target.closest('a')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach((btn, index) => {
        const answerId = 'faq-answer-' + index;
        const answer = btn.nextElementSibling;
        if (answer) {
            answer.id = answerId;
            btn.setAttribute('aria-controls', answerId);
        }
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item.active').forEach(i => {
                i.classList.remove('active');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            if (!wasActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Pricing Toggle
    const toggle = document.getElementById('pricingToggle');
    if (toggle) {
        const monthlyLabel = document.getElementById('monthlyLabel');
        const yearlyLabel = document.getElementById('yearlyLabel');
        let isYearly = false;

        toggle.setAttribute('role', 'switch');
        toggle.setAttribute('aria-checked', 'false');
        toggle.setAttribute('aria-label', 'Toggle yearly pricing');

        toggle.addEventListener('click', () => {
            isYearly = !isYearly;
            toggle.classList.toggle('active', isYearly);
            toggle.setAttribute('aria-checked', String(isYearly));
            monthlyLabel.classList.toggle('active', !isYearly);
            yearlyLabel.classList.toggle('active', isYearly);

            document.querySelectorAll('.pricing-card .price[data-monthly]').forEach(el => {
                el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
            });

            document.querySelectorAll('.pricing-card .price-period').forEach(el => {
                el.textContent = isYearly ? 'per member / month, billed yearly' : 'per member / month';
            });
        });
    }

    // Wiki Tabs (visual only)
    document.querySelectorAll('.wiki-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.wiki-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Modal system
    function closeModal(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        const opener = overlay._opener;
        if (opener && typeof opener.focus === 'function') {
            opener.focus();
        }
    }

    function createModal(id, title, content) {
        if (document.getElementById(id)) return;
        const overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', id + '-title');
        overlay.innerHTML = `
            <div class="modal-box" role="document">
                <button class="modal-close" aria-label="Close dialog" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h2 class="modal-title" id="${id}-title" tabindex="-1">${title}</h2>
                ${content}
            </div>`;
        document.body.appendChild(overlay);
        overlay.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal(overlay);
        });
    }

    // Validation helpers
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        clearError(input);
        input.setAttribute('aria-invalid', 'true');
        const err = document.createElement('p');
        err.className = 'modal-error';
        err.setAttribute('role', 'alert');
        err.textContent = message;
        input.parentNode.insertBefore(err, input.nextSibling);
    }

    function clearError(input) {
        input.removeAttribute('aria-invalid');
        const next = input.nextElementSibling;
        if (next && next.classList.contains('modal-error')) {
            next.remove();
        }
    }

    function showFormSummary(form, message) {
        let summary = form.querySelector('.modal-form-summary');
        if (!summary) {
            summary = document.createElement('div');
            summary.className = 'modal-form-summary';
            summary.setAttribute('role', 'alert');
            summary.setAttribute('aria-live', 'assertive');
            form.insertBefore(summary, form.firstChild);
        }
        summary.textContent = message;
    }

    function clearFormSummary(form) {
        const summary = form.querySelector('.modal-form-summary');
        if (summary) summary.remove();
    }

    function validateSignupForm(form) {
        let firstInvalid = null;
        const emailInput = form.querySelector('input[type="email"]');
        const nameInput = form.querySelector('input[type="text"]');
        clearError(emailInput);
        clearError(nameInput);
        clearFormSummary(form);

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your full name.');
            if (!firstInvalid) firstInvalid = nameInput;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your work email.');
            if (!firstInvalid) firstInvalid = emailInput;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            if (!firstInvalid) firstInvalid = emailInput;
        }
        if (firstInvalid) {
            showFormSummary(form, 'Please fix the highlighted fields to continue.');
            firstInvalid.focus();
            return false;
        }
        return true;
    }

    function validateDemoForm(form) {
        let firstInvalid = null;
        const companyInput = form.querySelector('input[placeholder="Company name"], input[name="company"]');
        const emailInput = form.querySelector('input[type="email"]');
        clearError(companyInput);
        clearError(emailInput);
        clearFormSummary(form);

        if (!companyInput.value.trim()) {
            showError(companyInput, 'Please enter your company name.');
            if (!firstInvalid) firstInvalid = companyInput;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your work email.');
            if (!firstInvalid) firstInvalid = emailInput;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            if (!firstInvalid) firstInvalid = emailInput;
        }
        if (firstInvalid) {
            showFormSummary(form, 'Please fix the highlighted fields to continue.');
            firstInvalid.focus();
            return false;
        }
        return true;
    }

    function showSuccessState(modalId, message) {
        const overlay = document.getElementById(modalId);
        if (!overlay) return;
        const box = overlay.querySelector('.modal-box');
        box.innerHTML = `
            <button class="modal-close" aria-label="Close dialog" type="button"><span aria-hidden="true">&times;</span></button>
            <div class="modal-success-state" role="alert" tabindex="-1">
                <div class="modal-success-icon" aria-hidden="true">&#10003;</div>
                <p class="modal-success">${message}</p>
                <button type="button" class="btn btn-dark btn-block modal-success-dismiss">Done</button>
            </div>`;
        box.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
        box.querySelector('.modal-success-dismiss').addEventListener('click', () => closeModal(overlay));
        box.querySelector('.modal-success-state').focus();
    }

    createModal('signupModal', 'Get started with Notion', `
        <p class="modal-desc">Create your free account to get started.</p>
        <form class="modal-form" novalidate>
            <div class="modal-field">
                <label for="signup-email" class="modal-label">Work email <span class="required" aria-hidden="true">*</span></label>
                <input type="email" id="signup-email" placeholder="you@company.com" required aria-required="true" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="signup-name" class="modal-label">Full name <span class="required" aria-hidden="true">*</span></label>
                <input type="text" id="signup-name" placeholder="Jane Doe" required aria-required="true" class="modal-input">
            </div>
            <button type="submit" class="btn btn-dark btn-block">Continue</button>
        </form>
        <p class="modal-footer-text">By continuing, you agree to Notion's Terms of Service.</p>
    `);

    createModal('demoModal', 'Request a demo', `
        <p class="modal-desc">See how Notion can work for your team.</p>
        <form class="modal-form" novalidate>
            <div class="modal-field">
                <label for="demo-company" class="modal-label">Company name <span class="required" aria-hidden="true">*</span></label>
                <input type="text" id="demo-company" name="company" placeholder="Company name" required aria-required="true" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="demo-email" class="modal-label">Work email <span class="required" aria-hidden="true">*</span></label>
                <input type="email" id="demo-email" placeholder="you@company.com" required aria-required="true" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="demo-team" class="modal-label">Team size</label>
                <input type="text" id="demo-team" placeholder="e.g. 10-50" class="modal-input">
            </div>
            <button type="submit" class="btn btn-dark btn-block">Submit request</button>
        </form>
    `);

    createModal('salesModal', 'Contact our sales team', `
        <p class="modal-desc">Tell us about your organization and a sales specialist will be in touch about Enterprise pricing, security, and rollout.</p>
        <form class="modal-form" novalidate>
            <div class="modal-field">
                <label for="sales-company" class="modal-label">Company name <span class="required" aria-hidden="true">*</span></label>
                <input type="text" id="sales-company" name="company" placeholder="Company name" required aria-required="true" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="sales-email" class="modal-label">Work email <span class="required" aria-hidden="true">*</span></label>
                <input type="email" id="sales-email" placeholder="you@company.com" required aria-required="true" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="sales-team" class="modal-label">Company size</label>
                <input type="text" id="sales-team" placeholder="e.g. 500-1000" class="modal-input">
            </div>
            <div class="modal-field">
                <label for="sales-message" class="modal-label">What are you hoping to solve?</label>
                <textarea id="sales-message" rows="3" placeholder="Briefly describe your goals" class="modal-input"></textarea>
            </div>
            <button type="submit" class="btn btn-dark btn-block">Contact Sales</button>
        </form>
    `);

    // Wire up form submissions with validation
    const signupForm = document.querySelector('#signupModal .modal-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateSignupForm(signupForm)) {
                showSuccessState('signupModal', 'Account created! Check your email.');
            }
        });
    }

    const demoForm = document.querySelector('#demoModal .modal-form');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateDemoForm(demoForm)) {
                showSuccessState('demoModal', "Thanks! We'll be in touch within 24 hours.");
            }
        });
    }

    const salesForm = document.querySelector('#salesModal .modal-form');
    if (salesForm) {
        salesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateDemoForm(salesForm)) {
                showSuccessState('salesModal', "Thanks! Our sales team will reach out within one business day.");
            }
        });
    }

    // Live validation: clear errors on input as user fixes them
    document.querySelectorAll('.modal-form .modal-input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') clearError(input);
            const form = input.closest('.modal-form');
            if (form) {
                const stillInvalid = form.querySelector('[aria-invalid="true"]');
                if (!stillInvalid) clearFormSummary(form);
            }
        });
    });

    function openModal(id, opener) {
        const m = document.getElementById(id);
        if (!m) return;
        m._opener = opener || document.activeElement;
        m.classList.add('active');
        document.body.classList.add('modal-open');
        // Move focus to dialog title for clear transition cue
        const title = m.querySelector('.modal-title, .modal-success-state');
        if (title) {
            requestAnimationFrame(() => title.focus());
        }
    }

    document.querySelectorAll('a[href="javascript:void(0)"]').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text.includes('get notion') || text.includes('sign up') || text.includes('get started')) {
            link.setAttribute('role', 'button');
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('signupModal', link); });
        } else if (text.includes('contact sales')) {
            link.setAttribute('role', 'button');
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('salesModal', link); });
        } else if (text.includes('request a demo')) {
            link.setAttribute('role', 'button');
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('demoModal', link); });
        }
    });

    // Global ESC closes any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const open = document.querySelector('.modal-overlay.active');
            if (open) closeModal(open);
        }
    });
});
