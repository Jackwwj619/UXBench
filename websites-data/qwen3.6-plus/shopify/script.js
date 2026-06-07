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
    if (target) target.style.display = 'block';
    document.querySelectorAll('.onboarding-progress .dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i < step);
    });
}

function nextStepRequireSelection(step, currentCardId) {
    var card = document.getElementById(currentCardId);
    if (card) {
        var selected = card.querySelectorAll('.onboarding-option.selected');
        if (selected.length === 0) {
            var hint = card.querySelector('.onboarding-hint');
            if (!hint) {
                hint = document.createElement('p');
                hint.className = 'onboarding-hint';
                hint.style.cssText = 'color:#b3261e;font-size:13px;margin-top:8px';
                hint.textContent = 'Please select at least one option to continue.';
                var btn = card.querySelector('.btn-primary');
                if (btn && btn.parentNode) btn.parentNode.insertBefore(hint, btn.nextSibling);
            }
            return;
        }
    }
    nextStep(step);
}
