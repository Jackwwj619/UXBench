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

    // Contact form (inline validation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const requiredFields = [
            { id: 'firstName', errorId: 'firstNameError', message: 'Please enter your first name.' },
            { id: 'lastName', errorId: 'lastNameError', message: 'Please enter your last name.' },
            { id: 'email', errorId: 'emailError', message: 'Please enter your work email.', validate: (v) => emailRe.test(v) ? '' : 'Please enter a valid email (e.g., name@company.com).' },
            { id: 'company', errorId: 'companyError', message: 'Please enter your company name.' },
            { id: 'companySize', errorId: 'companySizeError', message: 'Please select a company size.' },
            { id: 'country', errorId: 'countryError', message: 'Please select a country.' },
        ];
        const summary = document.getElementById('formErrorSummary');

        function validateField(field) {
            const el = document.getElementById(field.id);
            const errEl = document.getElementById(field.errorId);
            if (!el || !errEl) return true;
            const v = (el.value || '').trim();
            if (!v) {
                errEl.textContent = field.message;
                el.classList.add('has-error');
                return false;
            }
            if (field.validate) {
                const msg = field.validate(v);
                if (msg) {
                    errEl.textContent = msg;
                    el.classList.add('has-error');
                    return false;
                }
            }
            errEl.textContent = '';
            el.classList.remove('has-error');
            return true;
        }

        requiredFields.forEach((f) => {
            const el = document.getElementById(f.id);
            if (!el) return;
            el.addEventListener('blur', () => validateField(f));
            el.addEventListener('input', () => {
                if (el.classList.contains('has-error')) validateField(f);
            });
            el.addEventListener('change', () => validateField(f));
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let firstInvalid = null;
            requiredFields.forEach((f) => {
                const ok = validateField(f);
                if (!ok && !firstInvalid) firstInvalid = document.getElementById(f.id);
            });
            if (firstInvalid) {
                if (summary) summary.style.display = 'block';
                firstInvalid.focus();
                return;
            }
            if (summary) summary.style.display = 'none';
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
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
