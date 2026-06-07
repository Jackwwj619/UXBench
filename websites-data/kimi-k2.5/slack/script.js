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

    // Feature tabs nav (features page)
    document.querySelectorAll('.ftab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Feature cards: make interactive (expand details on click/keypress)
    document.querySelectorAll('.feature-card').forEach(card => {
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
        if (!card.hasAttribute('role')) card.setAttribute('role', 'button');
        const heading = card.querySelector('h3');
        if (heading && !card.hasAttribute('aria-label')) {
            card.setAttribute('aria-label', 'Learn more about ' + heading.textContent.trim());
        }
        const toggle = () => {
            card.classList.toggle('expanded');
            card.setAttribute('aria-expanded', card.classList.contains('expanded') ? 'true' : 'false');
        };
        card.addEventListener('click', toggle);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Social sign-in buttons: provide visible feedback (static demo, no real auth)
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const original = btn.innerHTML;
            const provider = (btn.textContent || '').trim().replace(/^Continue with\s*/i, '') || 'provider';
            btn.disabled = true;
            btn.innerHTML = 'Connecting to ' + provider + '…';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.disabled = false;
                let note = document.getElementById('socialAuthNote');
                if (!note) {
                    note = document.createElement('p');
                    note.id = 'socialAuthNote';
                    note.style.cssText = 'margin-top:12px;padding:10px 12px;background:#fff7e6;border:1px solid #ecb22e;border-radius:6px;font-size:13px;color:#4a154b;';
                    note.setAttribute('role', 'status');
                    btn.parentNode.insertBefore(note, btn.nextSibling);
                }
                note.textContent = provider + ' sign-in is a demo in this prototype. Use the email field above to continue.';
            }, 700);
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
