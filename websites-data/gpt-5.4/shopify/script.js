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

// Advance with awareness of selection state. If nothing is selected, show
// a soft confirmation that the question was skipped, then advance.
function advanceStep(currentStep, nextStepNum) {
    var card = document.getElementById('step' + currentStep);
    if (!card) { nextStep(nextStepNum); return; }
    var selected = card.querySelectorAll('.onboarding-option.selected').length;
    if (selected === 0) {
        var existing = card.querySelector('.skip-confirm');
        if (!existing) {
            var note = document.createElement('p');
            note.className = 'skip-confirm';
            note.setAttribute('role', 'status');
            note.style.cssText = 'font-size:13px;color:var(--text-light);margin-top:8px';
            note.textContent = "No selection — we'll skip this question. Tap Next again to continue.";
            card.appendChild(note);
            return;
        }
    }
    nextStep(nextStepNum);
}

function skipStep(currentStep, nextStepNum) {
    var card = document.getElementById('step' + currentStep);
    if (card) {
        card.querySelectorAll('.onboarding-option.selected').forEach(function(o){ o.classList.remove('selected'); });
    }
    nextStep(nextStepNum);
}

function submitSignup() {
    var emailEl = document.getElementById('signupEmail');
    var pwEl = document.getElementById('signupPassword');
    var emailErr = document.getElementById('signupEmailError');
    var pwErr = document.getElementById('signupPasswordError');
    var formErr = document.getElementById('signupFormError');
    var email = (emailEl.value || '').trim();
    var pw = pwEl.value || '';
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var pwValid = pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
    emailErr.style.display = emailValid ? 'none' : 'block';
    pwErr.style.display = pwValid ? 'none' : 'block';
    if (!emailValid || !pwValid) {
        formErr.textContent = 'Please fix the highlighted fields to create your store.';
        formErr.style.display = 'block';
        (emailValid ? pwEl : emailEl).focus();
        return;
    }
    formErr.style.display = 'none';
    nextStep(5);
}
