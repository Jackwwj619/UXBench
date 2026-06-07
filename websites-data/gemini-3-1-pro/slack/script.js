document.addEventListener('DOMContentLoaded', () => {
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // Comparison table tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.tab;
            document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
                if (category === 'all') {
                    row.style.display = '';
                } else {
                    row.style.display = (row.dataset.category === category) ? '' : 'none';
                }
            });
        });
    });

    // Billing toggle (pricing page)
    const billingToggle = document.getElementById('billingToggle');
    if (billingToggle) {
        let isAnnual = false;
        const labels = document.querySelectorAll('.toggle-label');

        billingToggle.addEventListener('click', () => {
            isAnnual = !isAnnual;
            billingToggle.classList.toggle('active', isAnnual);
            labels.forEach(l => {
                l.classList.toggle('active', l.dataset.billing === (isAnnual ? 'annual' : 'monthly'));
            });

            document.querySelectorAll('.price[data-monthly]').forEach(el => {
                el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
            });
            document.querySelectorAll('.price-period[data-monthly]').forEach(el => {
                el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
            });
        });
    }

    // Contact form: custom inline validation across all fields
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const setFieldError = (input, errorEl, msg) => {
            if (msg) {
                input.classList.add('input-error');
                input.setAttribute('aria-invalid', 'true');
                if (errorEl) errorEl.textContent = msg;
            } else {
                input.classList.remove('input-error');
                input.removeAttribute('aria-invalid');
                if (errorEl) errorEl.textContent = '';
            }
        };

        const fieldRules = [
            { id: 'firstName', errId: 'firstNameError', required: true, msg: 'Please enter your first name.' },
            { id: 'lastName', errId: 'lastNameError', required: true, msg: 'Please enter your last name.' },
            { id: 'email', errId: 'emailError', required: true, msg: 'Please enter your work email.', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), invalidMsg: 'Please enter a valid email address.' },
            { id: 'company', errId: 'companyError', required: true, msg: 'Please enter your company name.' },
            { id: 'companySize', errId: 'companySizeError', required: true, msg: 'Please select a company size.' },
            { id: 'country', errId: 'countryError', required: true, msg: 'Please select your country.' },
        ];

        const validateField = (rule) => {
            const input = document.getElementById(rule.id);
            const errorEl = document.getElementById(rule.errId);
            if (!input) return true;
            const value = (input.value || '').trim();
            if (rule.required && !value) {
                setFieldError(input, errorEl, rule.msg);
                return false;
            }
            if (value && rule.validate && !rule.validate(value)) {
                setFieldError(input, errorEl, rule.invalidMsg);
                return false;
            }
            setFieldError(input, errorEl, '');
            return true;
        };

        fieldRules.forEach(rule => {
            const input = document.getElementById(rule.id);
            if (!input) return;
            const revalidate = () => { if (input.classList.contains('input-error')) validateField(rule); };
            input.addEventListener('input', revalidate);
            input.addEventListener('change', revalidate);
            input.addEventListener('blur', () => validateField(rule));
        });

        const consent = document.getElementById('consent');
        const consentError = document.getElementById('consentError');
        if (consent) {
            consent.addEventListener('change', () => {
                if (consent.checked && consentError) consentError.textContent = '';
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let firstInvalid = null;
            fieldRules.forEach(rule => {
                if (!validateField(rule) && !firstInvalid) firstInvalid = document.getElementById(rule.id);
            });
            if (consent && !consent.checked) {
                if (consentError) consentError.textContent = 'Please agree to receive communications to continue.';
                if (!firstInvalid) firstInvalid = consent;
            }
            const summary = document.getElementById('formSummaryError');
            if (firstInvalid) {
                if (summary) summary.textContent = 'Please fix the highlighted fields and try again.';
                firstInvalid.focus();
                return;
            }
            if (summary) summary.textContent = '';
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                const isOpen = navLinks.classList.toggle('mobile-open');
                mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
                if (isOpen) {
                    const firstLink = navLinks.querySelector('.nav-link');
                    if (firstLink) firstLink.focus();
                }
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (history.pushState) history.pushState(null, '', href);
            }
        });
    });

    // Feature tabs nav (features page)
    document.querySelectorAll('.ftab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });
});
