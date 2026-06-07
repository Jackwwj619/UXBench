document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion with ARIA
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        function toggleFaq(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            var item = btn.parentElement;
            var wasActive = item.classList.contains('active');
            item.closest('.faq-inner').querySelectorAll('.faq-item').forEach(function(i) {
                i.classList.remove('active');
                var q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            if (!wasActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        }
        btn.addEventListener('click', toggleFaq);
        btn.addEventListener('touchend', toggleFaq);
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

    // Onboarding option selection (with keyboard support)
    document.querySelectorAll('.onboarding-option').forEach(function(opt) {
        function activate() {
            opt.classList.toggle('selected');
            opt.setAttribute('aria-pressed', opt.classList.contains('selected') ? 'true' : 'false');
            // clear any visible step error once a selection happens
            var card = opt.closest('.onboarding-card');
            if (card) {
                var status = card.querySelector('.step-status');
                if (status) { status.textContent = ''; status.classList.remove('error'); status.classList.remove('success'); }
            }
        }
        opt.addEventListener('click', activate);
        opt.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        });
    });

    // Onboarding Next buttons (with validation feedback)
    document.querySelectorAll('.onboarding-card [data-next]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var card = btn.closest('.onboarding-card');
            var status = card ? card.querySelector('.step-status') : null;
            var target = parseInt(btn.getAttribute('data-next'), 10);

            // Validate input fields if specified
            var fields = btn.getAttribute('data-validate');
            if (fields) {
                var ids = fields.split(',');
                var firstError = null;
                ids.forEach(function(id) {
                    var input = document.getElementById(id.trim());
                    var errEl = card.querySelector('[data-error-for="' + id.trim() + '"]');
                    if (!input) return;
                    var ok = input.checkValidity && input.checkValidity() && input.value.trim() !== '';
                    if (!ok) {
                        input.classList.add('invalid');
                        if (errEl) errEl.textContent = input.validationMessage || 'This field is required.';
                        if (!firstError) firstError = input;
                    } else {
                        input.classList.remove('invalid');
                        if (errEl) errEl.textContent = '';
                    }
                });
                if (firstError) {
                    if (status) {
                        status.textContent = 'Please fill in all required fields before continuing.';
                        status.classList.add('error'); status.classList.remove('success');
                    }
                    firstError.focus();
                    return;
                }
            }

            // Validate option group if marked required
            var optGroup = card ? card.querySelector('.onboarding-options[data-required="true"]') : null;
            if (optGroup && optGroup.querySelectorAll('.onboarding-option.selected').length === 0) {
                if (status) {
                    status.textContent = 'Please choose at least one option, or click Skip to continue without selecting.';
                    status.classList.add('error'); status.classList.remove('success');
                }
                return;
            }

            if (status) {
                status.textContent = 'Saved. Moving to the next step...';
                status.classList.remove('error'); status.classList.add('success');
            }
            nextStep(target);
        });
    });

    // Onboarding Skip buttons — robust, explicit feedback
    document.querySelectorAll('.onboarding-card [data-skip]').forEach(function(btn) {
        function doSkip(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            var card = btn.closest('.onboarding-card');
            var target = parseInt(btn.getAttribute('data-skip'), 10);
            var status = card ? card.querySelector('.step-status') : null;
            if (status) {
                status.textContent = 'Skipped — you can set this up later in your admin.';
                status.classList.remove('error'); status.classList.add('success');
            }
            // brief visible feedback before advancing
            btn.classList.add('skipped');
            setTimeout(function() { nextStep(target); }, 250);
        }
        btn.addEventListener('click', doSkip);
        btn.addEventListener('touchend', doSkip);
    });

    // Inline clearing for required inputs on free-trial-form
    document.querySelectorAll('.onboarding-card input').forEach(function(input) {
        input.addEventListener('input', function() {
            if (input.value.trim() !== '') {
                input.classList.remove('invalid');
                var errEl = document.querySelector('[data-error-for="' + input.id + '"]');
                if (errEl) errEl.textContent = '';
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
            var originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Starting...';
            btn.style.opacity = '0.7';
            var action = this.getAttribute('action');
            setTimeout(function() {
                btn.textContent = 'Redirecting...';
                if (action) {
                    window.location.href = action;
                }
            }, 800);
        });
    });
});

// Onboarding step navigation
function nextStep(step) {
    document.querySelectorAll('.onboarding-card').forEach(function(card) {
        card.style.display = 'none';
    });
    var target = document.getElementById('step' + step);
    if (target) {
        target.style.display = 'block';
        // clear any prior status messages on the new step
        var status = target.querySelector('.step-status');
        if (status) { status.textContent = ''; status.classList.remove('error'); status.classList.remove('success'); }
        // scroll into view for mobile
        try { target.scrollIntoView({behavior: 'smooth', block: 'start'}); } catch (err) {}
    }
    document.querySelectorAll('.onboarding-progress .dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i < step);
    });
}
