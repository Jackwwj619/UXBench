document.addEventListener('DOMContentLoaded', () => {
    // Compare-features mobile/desktop toggle: open by default on desktop
    const compareDetails = document.getElementById('compareToggle');
    if (compareDetails) {
        const syncCompare = () => {
            if (window.matchMedia('(min-width: 769px)').matches) {
                compareDetails.open = true;
            }
        };
        syncCompare();
        window.addEventListener('resize', syncCompare);
    }


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
    const comparisonTabs = document.querySelectorAll('.comparison-tabs .tab');
    if (comparisonTabs.length) {
        const tabsContainer = document.querySelector('.comparison-tabs');
        let statusEl = document.querySelector('.filter-status');
        if (!statusEl && tabsContainer) {
            statusEl = document.createElement('div');
            statusEl.className = 'filter-status';
            statusEl.setAttribute('role', 'status');
            statusEl.setAttribute('aria-live', 'polite');
            tabsContainer.parentNode.insertBefore(statusEl, tabsContainer.nextSibling);
        }
        comparisonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                comparisonTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.dataset.tab;
                const label = tab.textContent.trim();
                const visibleRows = [];
                document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
                    const match = (category === 'all') || (row.dataset.category === category);
                    row.style.display = match ? '' : 'none';
                    if (match) visibleRows.push(row);
                });
                if (statusEl) {
                    statusEl.textContent = (category === 'all')
                        ? 'Showing all features'
                        : 'Showing ' + label + ' features';
                }
                visibleRows.forEach(r => {
                    r.classList.remove('filter-flash');
                    void r.offsetWidth;
                    r.classList.add('filter-flash');
                });
            });
        });
    }

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

    // Feature tabs nav (features page)
    document.querySelectorAll('.ftab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const href = tab.getAttribute('href') || '';
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
                    window.scrollTo({ top, behavior: 'smooth' });
                    target.classList.remove('tab-target-flash');
                    void target.offsetWidth;
                    target.classList.add('tab-target-flash');
                }
            }
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
