document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
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

    // Template Category Cards (visual filter affordance)
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-pressed', 'false');
        const activate = () => {
            categoryCards.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            card.classList.add('active');
            card.setAttribute('aria-pressed', 'true');
        };
        card.addEventListener('click', activate);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    });

    // Modal system
    function closeModal(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        // Restore the modal's original form contents so reopening yields a clean state
        const original = overlay.dataset.originalContent;
        if (original) {
            const box = overlay.querySelector('.modal-box');
            if (box) {
                box.innerHTML = original;
                wireModalCloseButtons(overlay);
                wireModalForms(overlay);
            }
        }
    }

    function wireModalCloseButtons(overlay) {
        overlay.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => closeModal(overlay));
        });
    }

    function createModal(id, title, content) {
        if (document.getElementById(id)) return;
        const overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML = `
            <div class="modal-box">
                <button class="modal-close" aria-label="Close">&times;</button>
                <h2 class="modal-title">${title}</h2>
                ${content}
            </div>`;
        document.body.appendChild(overlay);
        // Snapshot the inner box content so we can restore after a success state
        overlay.dataset.originalContent = overlay.querySelector('.modal-box').innerHTML;
        wireModalCloseButtons(overlay);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
        // Allow Escape to dismiss
        overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(overlay); });
    }

    // Validation helpers
    function validateEmail(email) {
        // RFC-5321-friendly: allows dots, plus, dashes in local part; requires a TLD
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(email).trim());
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

    function validateSignupForm(form) {
        let valid = true;
        const emailInput = form.querySelector('input[type="email"]');
        const nameInput = form.querySelector('input[type="text"]');
        clearError(emailInput);
        clearError(nameInput);

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your full name.');
            if (valid) nameInput.focus();
            valid = false;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your work email.');
            if (valid) emailInput.focus();
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            if (valid) emailInput.focus();
            valid = false;
        }
        return valid;
    }

    function validateDemoForm(form) {
        let valid = true;
        const companyInput = form.querySelector('#demo-company');
        const emailInput = form.querySelector('input[type="email"]');
        clearError(companyInput);
        clearError(emailInput);

        if (!companyInput.value.trim()) {
            showError(companyInput, 'Please enter your company name.');
            if (valid) companyInput.focus();
            valid = false;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your work email.');
            if (valid) emailInput.focus();
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            if (valid) emailInput.focus();
            valid = false;
        }
        return valid;
    }

    function showSuccessState(modalId, message) {
        const overlay = document.getElementById(modalId);
        if (!overlay) return;
        const box = overlay.querySelector('.modal-box');
        box.innerHTML = `
            <button class="modal-close" aria-label="Close">&times;</button>
            <div class="modal-success-state" role="alert" tabindex="-1">
                <div class="modal-success-icon" aria-hidden="true">&#10003;</div>
                <p class="modal-success">${message}</p>
                <button type="button" class="btn btn-dark btn-block modal-continue">Continue exploring</button>
            </div>`;
        wireModalCloseButtons(overlay);
        const continueBtn = box.querySelector('.modal-continue');
        if (continueBtn) continueBtn.addEventListener('click', () => closeModal(overlay));
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
                <input type="text" id="demo-company" placeholder="Acme Inc." required aria-required="true" class="modal-input">
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

    // Wire up form submissions with validation
    function wireModalForms(overlay) {
        if (overlay.id === 'signupModal') {
            const form = overlay.querySelector('.modal-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (validateSignupForm(form)) {
                        showSuccessState('signupModal', 'Account created! Check your email.');
                    }
                });
            }
        } else if (overlay.id === 'demoModal') {
            const form = overlay.querySelector('.modal-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (validateDemoForm(form)) {
                        showSuccessState('demoModal', "Thanks! We'll be in touch within 24 hours.");
                    }
                });
            }
        }
    }

    const signupModal = document.getElementById('signupModal');
    if (signupModal) wireModalForms(signupModal);
    const demoModal = document.getElementById('demoModal');
    if (demoModal) wireModalForms(demoModal);

    function openModal(id) {
        const m = document.getElementById(id);
        if (m) {
            m.classList.add('active');
            const firstInput = m.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }

    document.querySelectorAll('a[href="javascript:void(0)"]').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text.includes('get notion') || text.includes('sign up') || text.includes('get started')) {
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('signupModal'); });
        } else if (text.includes('request a demo') || text.includes('contact sales')) {
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('demoModal'); });
        }
    });
});
