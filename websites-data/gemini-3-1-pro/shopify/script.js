document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion with ARIA
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
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
        function setBillingMode(yearly) {
            toggle.classList.toggle('yearly', yearly);
            if (monthlyLabel) monthlyLabel.classList.toggle('active', !yearly);
            if (yearlyLabel) yearlyLabel.classList.toggle('active', yearly);
            document.querySelectorAll('.plan-price').forEach(function(el) {
                var price = yearly ? el.dataset.yearly : el.dataset.monthly;
                el.innerHTML = price + '<span>/mo</span>';
            });
        }
        toggle.addEventListener('click', function() {
            var isYearly = this.classList.toggle('yearly');
            setBillingMode(isYearly);
        });
        if (monthlyLabel) {
            monthlyLabel.style.cursor = 'pointer';
            monthlyLabel.addEventListener('click', function() {
                setBillingMode(false);
            });
        }
        if (yearlyLabel) {
            yearlyLabel.style.cursor = 'pointer';
            yearlyLabel.addEventListener('click', function() {
                setBillingMode(true);
            });
        }
    }

    // Onboarding option selection (supports both <button> and legacy divs)
    document.querySelectorAll('.onboarding-option').forEach(function(opt) {
        function toggleOption() {
            var multi = opt.getAttribute('role') === 'checkbox';
            if (multi) {
                var pressed = opt.classList.toggle('selected');
                opt.setAttribute('aria-checked', pressed ? 'true' : 'false');
            } else {
                // single-select radio behavior within the same group
                var group = opt.closest('.onboarding-options');
                if (group) {
                    group.querySelectorAll('.onboarding-option').forEach(function(o) {
                        o.classList.remove('selected');
                        if (o.hasAttribute('aria-checked')) o.setAttribute('aria-checked', 'false');
                    });
                }
                opt.classList.add('selected');
                if (opt.hasAttribute('aria-checked')) opt.setAttribute('aria-checked', 'true');
            }
        }
        opt.addEventListener('click', toggleOption);
        opt.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleOption();
            }
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
                    if (helpLinks[i]) helpLinks[i].classList.add('active');
                }
            });
        });
    }

    // Help Center search submission
    var helpSearch = document.querySelector('.help-header form, .help-header input[type="text"], .help-header input[type="search"]');
    var helpSearchForm = document.querySelector('.help-header form');
    if (helpSearchForm) {
        helpSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var input = helpSearchForm.querySelector('input');
            var q = input ? input.value.trim() : '';
            var results = document.getElementById('helpSearchResults');
            if (results) {
                if (q) {
                    results.innerHTML = '<p style="font-size:14px;color:var(--text-light);margin-bottom:8px">No exact matches for &ldquo;' + q.replace(/[<>&"]/g, function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];}) + '&rdquo;. Browse popular topics:</p><ul style="margin-left:20px"><li><a href="#initiate">Initiate the free trial</a></li><li><a href="#setup">Setting up your store</a></li><li><a href="#choosing-plan">Choosing a paid plan</a></li><li><a href="#troubleshooting">Troubleshooting</a></li></ul>';
                    results.style.display = 'block';
                } else {
                    results.style.display = 'none';
                }
            }
        });
    }

    // Mobile menu toggle
    var mobileBtn = document.querySelector('.nav-mobile-btn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            this.classList.toggle('open');
            var expanded = mobileMenu.classList.contains('open');
            this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
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

    // Form submission feedback - redirect to action URL
    document.querySelectorAll('[data-form-feedback]').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var action = this.getAttribute('action');
            if (!action) return;
            e.preventDefault();
            var btn = this.querySelector('[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Starting...';
                btn.style.opacity = '0.7';
            }
            // Redirect quickly so users aren't stuck on the page
            window.location.href = action;
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
