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

        const switchBilling = () => {
            isAnnual = !isAnnual;
            billingToggle.classList.toggle('active', isAnnual);
            billingToggle.setAttribute('aria-pressed', String(isAnnual));
            document.body.classList.toggle('annual-billing', isAnnual);
            labels.forEach(l => {
                l.classList.toggle('active', l.dataset.billing === (isAnnual ? 'annual' : 'monthly'));
            });

            document.querySelectorAll('.price[data-monthly]').forEach(el => {
                el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
                el.classList.remove('price-flash');
                // re-trigger the animation
                void el.offsetWidth;
                el.classList.add('price-flash');
            });
            document.querySelectorAll('.price-period[data-monthly]').forEach(el => {
                el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
            });
        };

        billingToggle.addEventListener('click', switchBilling);
        // Allow clicking the labels to toggle
        labels.forEach(label => {
            label.addEventListener('click', () => {
                const wantAnnual = label.dataset.billing === 'annual';
                if (wantAnnual !== isAnnual) switchBilling();
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
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

    // Smooth scroll for anchor links (with offset for sticky navbar)
    const scrollToHash = (hash) => {
        if (!hash || hash === '#') return false;
        const target = document.querySelector(hash);
        if (!target) return false;
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
        if (history.replaceState) history.replaceState(null, '', hash);
        return true;
    };
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href && href.length > 1 && scrollToHash(href)) {
                e.preventDefault();
            } else if (href === '#') {
                // Prevent placeholder links from jumping to the top
                e.preventDefault();
            }
        });
    });

    // Feature tabs nav (features page)
    document.querySelectorAll('.ftab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const href = tab.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                if (scrollToHash(href)) e.preventDefault();
            }
        });
    });

    // Demo modal (enterprise page)
    const demoBtn = document.getElementById('watchDemoBtn');
    const demoModal = document.getElementById('demoModal');
    if (demoBtn && demoModal) {
        const openDemo = () => {
            demoModal.hidden = false;
            const closeBtn = demoModal.querySelector('.demo-modal-close');
            if (closeBtn) closeBtn.focus();
        };
        const closeDemo = () => { demoModal.hidden = true; demoBtn.focus(); };
        demoBtn.addEventListener('click', openDemo);
        demoModal.querySelectorAll('[data-close-modal]').forEach(el => {
            el.addEventListener('click', closeDemo);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !demoModal.hidden) closeDemo();
        });
    }

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
