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

    // Modal system
    let lastFocusedTrigger = null;

    function closeModal(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            try { lastFocusedTrigger.focus(); } catch (_) {}
        }
    }

    function bindOverlayDismiss(overlay) {
        // Close button (delegated so it survives DOM swaps)
        overlay.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('.modal-close');
            if (closeBtn) {
                e.preventDefault();
                e.stopPropagation();
                closeModal(overlay);
                return;
            }
            // Backdrop click
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    }

    function createModal(id, title, content) {
        if (document.getElementById(id)) return;
        const overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="modal-box" role="document">
                <button type="button" class="modal-close" aria-label="Close dialog">&times;</button>
                <h2 class="modal-title">${title}</h2>
                ${content}
            </div>`;
        document.body.appendChild(overlay);
        bindOverlayDismiss(overlay);
    }

    // Global ESC handler closes the topmost open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const open = document.querySelector('.modal-overlay.active');
            if (open) {
                e.preventDefault();
                closeModal(open);
            }
        }
    });

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
        input.addEventListener('input', () => clearError(input), { once: true });
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
        const companyInput = form.querySelector('input[placeholder="Company name"]');
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
            <button type="button" class="modal-close" aria-label="Close dialog">&times;</button>
            <div class="modal-success-state" role="alert" tabindex="-1">
                <div class="modal-success-icon" aria-hidden="true">&#10003;</div>
                <p class="modal-success">${message}</p>
                <button type="button" class="btn btn-dark btn-block modal-success-done" style="margin-top:16px;">Done</button>
            </div>`;
        const doneBtn = box.querySelector('.modal-success-done');
        if (doneBtn) doneBtn.addEventListener('click', () => closeModal(overlay));
        const successEl = box.querySelector('.modal-success-state');
        if (successEl) successEl.focus();
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

    function openModal(id, trigger) {
        const m = document.getElementById(id);
        if (m) {
            lastFocusedTrigger = trigger || document.activeElement || null;
            m.classList.add('active');
            m.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            const firstInput = m.querySelector('input');
            if (firstInput) {
                try { firstInput.focus(); } catch (_) {}
            } else {
                const closeBtn = m.querySelector('.modal-close');
                if (closeBtn) try { closeBtn.focus(); } catch (_) {}
            }
        }
    }

    document.querySelectorAll('a[href="javascript:void(0)"]').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text.includes('get notion') || text.includes('sign up') || text.includes('get started')) {
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('signupModal', link); });
        } else if (text.includes('request a demo') || text.includes('contact sales')) {
            link.addEventListener('click', (e) => { e.preventDefault(); openModal('demoModal', link); });
        }
    });
});
