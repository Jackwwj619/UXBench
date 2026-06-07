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

    // Form submission feedback with inline validation
    document.querySelectorAll('[data-form-feedback]').forEach(function(form) {
        var emailInput = form.querySelector('input[type="email"]');
        var errorEl = form.parentElement.querySelector('.form-error[data-for="' + (emailInput && emailInput.id) + '"]');
        if (emailInput && !errorEl) {
            errorEl = document.createElement('p');
            errorEl.className = 'form-error';
            errorEl.setAttribute('role', 'alert');
            errorEl.style.cssText = 'color:#d72c0d;font-size:13px;margin-top:8px;text-align:left;display:none';
            form.insertAdjacentElement('afterend', errorEl);
        }
        function showError(msg) {
            if (!errorEl) return;
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
            if (emailInput) {
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.style.borderColor = '#d72c0d';
            }
        }
        function clearError() {
            if (!errorEl) return;
            errorEl.style.display = 'none';
            errorEl.textContent = '';
            if (emailInput) {
                emailInput.removeAttribute('aria-invalid');
                emailInput.style.borderColor = '';
            }
        }
        if (emailInput) {
            emailInput.addEventListener('input', clearError);
        }
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var value = emailInput ? emailInput.value.trim() : '';
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput) {
                if (!value) {
                    showError('Please enter your email address.');
                    emailInput.focus();
                    return;
                }
                if (!emailRe.test(value)) {
                    showError('Please enter a valid email address.');
                    emailInput.focus();
                    return;
                }
            }
            clearError();
            var btn = this.querySelector('[type="submit"]');
            var action = this.getAttribute('action');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Starting...';
                btn.style.opacity = '0.7';
            }
            if (action) {
                var sep = action.indexOf('?') === -1 ? '?' : '&';
                var dest = action + (value ? sep + 'email=' + encodeURIComponent(value) : '');
                window.location.href = dest;
            }
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
