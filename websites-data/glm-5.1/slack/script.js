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

    // Feature tabs nav (features page) — set active state and scroll to section
    document.querySelectorAll('.ftab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const href = tab.getAttribute('href') || '';
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', href);
                }
            }
        });
    });

    // On-load hash scroll: if URL has #anchor, scroll to it once layout is settled
    if (window.location.hash) {
        const hash = window.location.hash;
        const target = document.querySelector(hash);
        if (target) {
            // Defer to after layout/paint so sticky nav offset is honored
            requestAnimationFrame(() => {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Sync ftab active state if relevant
                    const matchingTab = document.querySelector('.ftab[href="' + hash + '"]');
                    if (matchingTab) {
                        document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
                        matchingTab.classList.add('active');
                    }
                }, 60);
            });
        }
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
