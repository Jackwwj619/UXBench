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
            var emailInput = this.querySelector('input[type="email"]');
            var email = emailInput ? emailInput.value.trim() : '';
            if (emailInput && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                emailInput.classList.add('input-error');
                emailInput.focus();
                var existing = this.querySelector('.form-error');
                if (!existing) {
                    var p = document.createElement('p');
                    p.className = 'form-error';
                    p.textContent = 'Please enter a valid email address.';
                    this.appendChild(p);
                }
                return;
            }
            var btn = this.querySelector('[type="submit"]');
            if (!btn) return;
            btn.disabled = true;
            btn.textContent = 'Starting...';
            btn.style.opacity = '0.7';
            var action = this.getAttribute('action');
            setTimeout(function() {
                btn.textContent = 'Redirecting...';
                if (action) {
                    var url = action;
                    if (email) url += (action.indexOf('?') === -1 ? '?' : '&') + 'email=' + encodeURIComponent(email);
                    window.location.href = url;
                }
            }, 600);
        });
    });

    // Pre-fill email from URL on free-trial-form
    var trialEmail = document.getElementById('trialEmail');
    if (trialEmail) {
        var params = new URLSearchParams(window.location.search);
        var prefill = params.get('email');
        if (prefill) trialEmail.value = prefill;
    }

    // Help-page client-side search (filters in-page sections + jumps to match)
    var helpSearch = document.querySelector('.help-header input[type="text"]');
    if (helpSearch) {
        helpSearch.setAttribute('aria-label', 'Search help articles');
        var wrap = document.createElement('div');
        wrap.className = 'help-search-wrap';
        helpSearch.parentNode.insertBefore(wrap, helpSearch);
        wrap.appendChild(helpSearch);
        var results = document.createElement('div');
        results.className = 'help-search-results';
        results.setAttribute('role', 'listbox');
        wrap.appendChild(results);

        var sections = Array.prototype.map.call(
            document.querySelectorAll('.help-content h2[id], .help-content h3'),
            function(h) { return { id: h.id || '', text: h.textContent || '', el: h }; }
        );

        function render(q) {
            results.innerHTML = '';
            if (!q) { results.classList.remove('open'); return; }
            var matches = sections.filter(function(s) { return s.text.toLowerCase().indexOf(q) !== -1; });
            if (!matches.length) {
                results.innerHTML = '<div class="empty">No results for "' + q.replace(/[<>]/g,'') + '"</div>';
            } else {
                matches.slice(0, 8).forEach(function(s) {
                    var a = document.createElement('a');
                    a.href = s.id ? '#' + s.id : '#';
                    a.textContent = s.text;
                    a.addEventListener('click', function() { results.classList.remove('open'); });
                    results.appendChild(a);
                });
            }
            results.classList.add('open');
        }

        helpSearch.addEventListener('input', function() {
            render(this.value.trim().toLowerCase());
        });
        helpSearch.addEventListener('focus', function() {
            if (this.value.trim()) render(this.value.trim().toLowerCase());
        });
        document.addEventListener('click', function(e) {
            if (!wrap.contains(e.target)) results.classList.remove('open');
        });
    }
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
