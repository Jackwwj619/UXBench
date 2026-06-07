document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion with ARIA
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.parentElement;
            var wasActive = item.classList.contains('active');
            item.closest('.faq-inner').querySelectorAll('.faq-item').forEach(function(i) {
                i.classList.remove('active');
                var q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            if (!wasActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Pricing Toggle with label click support
    var toggle = document.getElementById('planToggle');
    var monthlyLabel = document.getElementById('monthlyLabel');
    var yearlyLabel = document.getElementById('yearlyLabel');
    if (toggle) {
        toggle.setAttribute('role', 'switch');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-checked', 'false');
        toggle.setAttribute('aria-label', 'Toggle yearly billing');
        function setBillingMode(yearly) {
            toggle.classList.toggle('yearly', yearly);
            toggle.setAttribute('aria-checked', yearly ? 'true' : 'false');
            if (monthlyLabel) monthlyLabel.classList.toggle('active', !yearly);
            if (yearlyLabel) yearlyLabel.classList.toggle('active', yearly);
            document.querySelectorAll('.plan-price').forEach(function(el) {
                var monthly = el.dataset.monthly;
                var yr = el.dataset.yearly;
                if (!monthly || !yr) return;
                var price = yearly ? yr : monthly;
                el.innerHTML = price + '<span>/mo</span>';
                // Flash animation for visible confirmation
                el.style.transition = 'none';
                el.style.transform = 'scale(1.06)';
                el.style.color = 'var(--green)';
                requestAnimationFrame(function() {
                    el.style.transition = 'transform .25s ease, color .4s ease';
                    el.style.transform = 'scale(1)';
                    setTimeout(function() { el.style.color = ''; }, 400);
                });
            });
        }
        toggle.addEventListener('click', function() {
            setBillingMode(!this.classList.contains('yearly'));
        });
        toggle.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setBillingMode(!this.classList.contains('yearly'));
            }
        });
        if (monthlyLabel) {
            monthlyLabel.addEventListener('click', function() { setBillingMode(false); });
        }
        if (yearlyLabel) {
            yearlyLabel.addEventListener('click', function() { setBillingMode(true); });
        }
    }

    // Onboarding option selection
    document.querySelectorAll('.onboarding-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // Help sidebar active state on scroll
    var helpLinks = document.querySelectorAll('.help-sidebar a');
    if (helpLinks.length) {
        window.addEventListener('scroll', function() {
            var sections = document.querySelectorAll('.help-content h2[id]');
            var scrollPos = window.scrollY + 100;
            sections.forEach(function(section, i) {
                if (section.offsetTop <= scrollPos) {
                    helpLinks.forEach(function(l) { l.classList.remove('active'); });
                    helpLinks[i].classList.add('active');
                }
            });
        });
    }

    // Mobile menu toggle
    var mobileBtn = document.querySelector('.nav-mobile-btn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            this.classList.toggle('open');
        });
    }

    // Navbar scroll shadow
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Form submission feedback
    document.querySelectorAll('[data-form-feedback]').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = this.querySelector('[type="submit"]');
            if (!btn) return;
            btn.disabled = true;
            btn.textContent = 'Starting…';
            btn.style.opacity = '0.85';
            var action = this.getAttribute('action');
            setTimeout(function() {
                btn.textContent = 'Redirecting…';
                if (action) {
                    window.location.href = action;
                }
            }, 600);
        });
    });
});

// Onboarding step navigation
function nextStep(step) {
    document.querySelectorAll('.onboarding-card').forEach(function(card) {
        card.style.display = 'none';
    });
    var target = document.getElementById('step' + step);
    if (target) target.style.display = 'block';
    document.querySelectorAll('.onboarding-progress .dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i < step);
    });
}
