// Booking.com Clone - Full Interactive JavaScript
(function() {
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // ===== FILTERING SYSTEM =====
  initLinkRouting();
  initFilters();
  initSort();
  initSearch();
  initCurrency();
  initDatePicker();
  initGuestSelector();
  initGallery();
  initFormValidation();
  initRoomSelection();
  initNavigation();
  initHashTargets();
  initMisc();
});

function initFilters() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const cards = document.querySelectorAll('.hotel-card[data-price]');
  if (cards.length === 0) return;

  const totalCount = cards.length;
  let previousCount = totalCount;

  // Create empty state element
  const main = document.querySelector('main');
  let emptyState = null;
  let filterChipsContainer = null;
  if (main) {
    filterChipsContainer = document.createElement('div');
    filterChipsContainer.className = 'active-filter-chips';
    filterChipsContainer.style.cssText = 'display:none;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;';
    main.insertBefore(filterChipsContainer, main.querySelector('.hotel-card, .hotel-card[data-price]')?.closest('a') || main.children[1]);

    emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.style.cssText = 'display:none;text-align:center;padding:60px 20px;background:#fff;border:1px solid #e0e0e0;border-radius:8px;';
    emptyState.innerHTML = '<div style="font-size:48px;margin-bottom:16px;">&#128269;</div>' +
      '<h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">No properties match your filters</h3>' +
      '<p style="font-size:14px;color:#666;margin-bottom:16px;">Try removing some filters or broadening your search to see more results.</p>' +
      '<button class="btn btn-primary clear-all-filters-btn">Clear all filters</button>';
    main.appendChild(emptyState);
    emptyState.querySelector('.clear-all-filters-btn').addEventListener('click', function() {
      sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) { cb.checked = false; });
      applyFilters();
    });
  }

  sidebar.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      applyFilters();
    }
  });

  function getActiveFilters() {
    var filters = [];
    sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
      var label = cb.closest('label');
      if (label) {
        var text = label.textContent.replace(/\s*\d[\d,]*\s*$/, '').trim();
        if (text) filters.push(text);
      }
    });
    return filters;
  }

  function updateFilterChips() {
    if (!filterChipsContainer) return;
    var active = getActiveFilters();
    filterChipsContainer.innerHTML = '';
    if (active.length === 0) {
      filterChipsContainer.style.display = 'none';
      return;
    }
    filterChipsContainer.style.display = 'flex';
    active.forEach(function(f) {
      var chip = document.createElement('span');
      chip.className = 'filter-chip';
      chip.style.cssText = 'display:inline-flex;align-items:center;gap:4px;background:#f0f6ff;color:#006ce4;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500;border:1px solid #c4d7f2;';
      chip.innerHTML = f + ' <span class="chip-remove" style="cursor:pointer;font-size:14px;line-height:1;margin-left:2px;">&times;</span>';
      chip.querySelector('.chip-remove').addEventListener('click', function() {
        sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
          var label = cb.closest('label');
          if (label && label.textContent.replace(/\s*\d[\d,]*\s*$/, '').trim() === f) {
            cb.checked = false;
          }
        });
        applyFilters();
      });
      filterChipsContainer.appendChild(chip);
    });
    if (active.length > 1) {
      var clearAll = document.createElement('button');
      clearAll.className = 'clear-all-chips-btn';
      clearAll.style.cssText = 'background:none;border:none;color:#006ce4;font-size:12px;cursor:pointer;padding:4px 8px;text-decoration:underline;';
      clearAll.textContent = 'Clear all';
      clearAll.addEventListener('click', function() {
        sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) { cb.checked = false; });
        applyFilters();
      });
      filterChipsContainer.appendChild(clearAll);
    }
  }

  function applyFilters() {
    const budgetChecked = getCheckedValues('Your budget');
    const popularChecked = getCheckedLabels('Popular filters');
    const starsChecked = getCheckedValues('Star rating');
    const districtChecked = getCheckedValues('Neighbourhood');
    const typeChecked = getCheckedValues('Property type');
    const reviewChecked = getCheckedValues('Review score');
    const distanceChecked = getCheckedValues('Distance from Shinjuku');

    let visibleCount = 0;

    cards.forEach(function(card) {
      const wrapper = card.closest('a') || card;
      let show = true;

      // Budget filter
      if (budgetChecked.length > 0) {
        const price = parseInt(card.dataset.price);
        const inBudget = budgetChecked.some(function(range) {
          if (range.includes('0 - 10')) return price <= 10000;
          if (range.includes('10,000 - 20')) return price > 10000 && price <= 20000;
          if (range.includes('20,000 - 40')) return price > 20000 && price <= 40000;
          if (range.includes('40,000 - 80')) return price > 40000 && price <= 80000;
          if (range.includes('80,000+')) return price > 80000;
          return true;
        });
        if (!inBudget) show = false;
      }

      // Popular filters
      if (show && popularChecked.length > 0) {
        popularChecked.forEach(function(filter) {
          if (filter.includes('Breakfast') && card.dataset.breakfast !== 'true') show = false;
          if (filter.includes('Free cancellation') && card.dataset.cancel !== 'true') show = false;
          if (filter.includes('No prepayment') && card.dataset.prepay === 'true') show = false;
          if (filter.includes('Hot spring') && card.dataset.onsen !== 'true') show = false;
        });
      }

      // Star rating
      if (show && starsChecked.length > 0) {
        const stars = parseInt(card.dataset.stars);
        const matchStar = starsChecked.some(function(s) {
          if (s.includes('5')) return stars === 5;
          if (s.includes('4')) return stars === 4;
          if (s.includes('3')) return stars === 3;
          if (s.includes('2')) return stars === 2;
          if (s.includes('Unrated')) return stars === 0;
          return true;
        });
        if (!matchStar) show = false;
      }

      // District
      if (show && districtChecked.length > 0) {
        const district = card.dataset.district || '';
        const matchDistrict = districtChecked.some(function(d) {
          return district.toLowerCase().includes(d.toLowerCase().trim());
        });
        if (!matchDistrict) show = false;
      }

      // Property type
      if (show && typeChecked.length > 0) {
        const type = card.dataset.type || 'hotel';
        const matchType = typeChecked.some(function(t) {
          const tl = t.toLowerCase();
          if (tl.includes('hotel')) return type === 'hotel';
          if (tl.includes('apartment')) return type === 'apartment';
          if (tl.includes('hostel')) return type === 'hostel';
          if (tl.includes('ryokan')) return type === 'ryokan';
          if (tl.includes('capsule')) return type === 'capsule';
          return true;
        });
        if (!matchType) show = false;
      }

      // Review score
      if (show && reviewChecked.length > 0) {
        const rating = parseFloat(card.dataset.rating);
        const matchReview = reviewChecked.some(function(r) {
          if (r.includes('9+')) return rating >= 9;
          if (r.includes('8+')) return rating >= 8;
          if (r.includes('7+')) return rating >= 7;
          if (r.includes('6+')) return rating >= 6;
          return true;
        });
        if (!matchReview) show = false;
      }

      wrapper.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Update results count
    const header = document.querySelector('.results-header h2');
    if (header) {
      const city = header.textContent.split(':')[0];
      header.textContent = city + ': ' + visibleCount + ' properties found';
    }

    // Show/hide empty state
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Update filter chips
    updateFilterChips();

    // Show toast for significant count changes
    if (previousCount > 0 && visibleCount === 0) {
      var active = getActiveFilters();
      if (active.length > 0) {
        showToast('No results found. Try removing: ' + active.join(', '));
      }
    } else if (previousCount > 0 && visibleCount > 0 && (previousCount - visibleCount) > previousCount * 0.5) {
      showToast(previousCount + ' → ' + visibleCount + ' results. Remove filters to see more.');
    }
    previousCount = visibleCount;
  }

  function getCheckedValues(sectionTitle) {
    const values = [];
    const filterCards = sidebar.querySelectorAll('.filter-card');
    filterCards.forEach(function(fc) {
      const h3 = fc.querySelector('h3');
      if (h3 && h3.textContent.includes(sectionTitle)) {
        fc.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
          const label = cb.closest('label');
          if (label) values.push(label.textContent.trim());
        });
      }
    });
    return values;
  }

  function getCheckedLabels(sectionTitle) {
    return getCheckedValues(sectionTitle);
  }
}

function initSort() {
  const sortSelect = document.querySelector('.sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', function() {
    const container = document.querySelector('main');
    if (!container) return;

    const cardWrappers = [];
    container.querySelectorAll('.hotel-card[data-price]').forEach(function(card) {
      cardWrappers.push(card.closest('a') || card);
    });

    const sortVal = this.value || this.options[this.selectedIndex].text;

    cardWrappers.sort(function(a, b) {
      const cardA = a.querySelector ? a.querySelector('.hotel-card[data-price]') || a : a;
      const cardB = b.querySelector ? b.querySelector('.hotel-card[data-price]') || b : b;
      const ca = cardA.classList.contains('hotel-card') ? cardA : cardA.querySelector('.hotel-card');
      const cb = cardB.classList.contains('hotel-card') ? cardB : cardB.querySelector('.hotel-card');

      if (!ca || !cb) return 0;

      if (sortVal.includes('Price (lowest')) {
        return parseInt(ca.dataset.price) - parseInt(cb.dataset.price);
      }
      if (sortVal.includes('rating (high')) {
        return parseInt(cb.dataset.stars) - parseInt(ca.dataset.stars);
      }
      if (sortVal.includes('Top reviewed') || sortVal.includes('Best reviewed')) {
        return parseFloat(cb.dataset.rating) - parseFloat(ca.dataset.rating);
      }
      return 0;
    });

    const resultsHeader = container.querySelector('.results-header');
    cardWrappers.forEach(function(wrapper) {
      container.appendChild(wrapper);
    });
  });
}

function initSearch() {
  // Make all search buttons functional
  document.querySelectorAll('.search-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const searchBox = this.closest('.search-box');
      if (!searchBox) return;

      const inputs = searchBox.querySelectorAll('input');
      const destination = (inputs[0] ? inputs[0].value : '').trim().toLowerCase();
      const route = resolveDestinationRoute(destination);
      if (route) {
        window.location.href = route;
      }
    });
  });
}

function initLinkRouting() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;

    const route = resolveBookingLink(link);
    if (!route) return;

    e.preventDefault();
    if (route.startsWith('#')) {
      window.location.hash = route;
      return;
    }
    const current = getCurrentPage();
    const targetPage = route.split('#')[0];
    if (targetPage === current && route.includes('#')) {
      window.location.hash = route.split('#')[1];
      return;
    }
    window.location.href = route;
  });
}

function initHashTargets() {
  function openHashTarget() {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    if (target.tagName === 'DETAILS') {
      target.open = true;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.addEventListener('hashchange', openHashTarget);
  window.setTimeout(openHashTarget, 0);
}

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function resolveDestinationRoute(destination) {
  if (!destination) return null;
  if (destination.includes('shinjuku')) return 'shinjuku.html';
  if (destination.includes('tokyo') || destination.includes('japan')) return 'tokyo.html';
  if (destination.includes('osaka')) return 'tokyo.html';
  if (destination.includes('kyoto')) return 'tokyo.html';
  return 'tokyo.html';
}

function resolveBookingLink(link) {
  const text = link.textContent.trim().toLowerCase();
  const page = getCurrentPage();

  if (text === 'stays') {
    return page === 'index.html' ? null : 'tokyo.html';
  }

  if (text.includes('manage your trips') || text === 'my trips') return 'my-trips.html';
  if (text.includes('customer service') || text.includes('help') || text.includes('safety resource center') || text.includes('coronavirus (covid-19) faqs')) return 'help.html#contact-support';
  if (text.includes('cancel a booking')) return 'help.html#faq-cancel';
  if (text.includes('payment & refunds')) return 'help.html#faq-refund';
  if (text.includes('change a booking')) return 'help.html#faq-change';
  if (text.includes('account & security')) return 'help.html#contact-support';
  if (text.includes('genius loyalty program') || text.includes('seasonal and holiday deals') || text.includes('travel articles')) return 'deals.html';
  if (text.includes('transport bookings')) return 'airport-taxis.html';
  if (text.includes('privacy & cookies') || text.includes('privacy statement') || text.includes('terms & conditions') || text.includes('msa statement') || text.includes('partner dispute')) return 'help.html#contact-support';
  if (text.includes('extranet login')) return 'signin.html';
  if (text.includes('list your property') || text.includes('partner help') || text.includes('booking.com for business') || text.includes('become an affiliate')) return 'list-property.html';
  if (text.includes('japan') && page !== 'tokyo.html') return 'tokyo.html';
  if (text.includes('tokyo prefecture')) return 'tokyo.html';
  if (text.includes('osaka')) return 'tokyo.html';
  if (text.includes('kyoto')) return 'tokyo.html';
  if (text.includes('hakone')) return 'tokyo.html';
  if (text.includes('yokohama')) return 'tokyo.html';
  if (text.includes('excellent location')) return page === 'hotel-detail.html' ? '#rooms' : null;

  return null;
}

function initCurrency() {
  const rates = { JPY: 1, USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CNY: 0.049 };
  const symbols = { JPY: 'JPY ', USD: '$', EUR: '€', GBP: '£', CNY: '¥' };
  const currencies = ['JPY', 'USD', 'EUR', 'GBP', 'CNY'];

  document.querySelectorAll('.btn-outline, .btn').forEach(function(btn) {
    if (currencies.includes(btn.textContent.trim())) {
      btn.addEventListener('click', function() {
        const idx = currencies.indexOf(this.textContent.trim());
        const next = currencies[(idx + 1) % currencies.length];

        document.querySelectorAll('.btn-outline, .btn').forEach(function(b) {
          if (currencies.includes(b.textContent.trim())) b.textContent = next;
        });

        document.querySelectorAll('.price-amount').forEach(function(el) {
          const raw = el.getAttribute('data-jpy') || el.textContent.replace(/[^0-9]/g, '');
          if (!el.getAttribute('data-jpy')) el.setAttribute('data-jpy', raw);
          const jpy = parseInt(el.getAttribute('data-jpy'));
          const converted = Math.round(jpy * rates[next]);
          el.textContent = symbols[next] + converted.toLocaleString();
        });

        document.querySelectorAll('.price-tax').forEach(function(el) {
          const raw = el.getAttribute('data-jpy') || el.textContent.replace(/[^0-9]/g, '');
          if (!el.getAttribute('data-jpy')) el.setAttribute('data-jpy', raw);
          const jpy = parseInt(el.getAttribute('data-jpy'));
          const converted = Math.round(jpy * rates[next]);
          el.textContent = '+' + symbols[next] + converted.toLocaleString() + ' taxes and fees';
        });

        document.querySelectorAll('.room-price').forEach(function(el) {
          const raw = el.getAttribute('data-jpy') || el.textContent.replace(/[^0-9]/g, '');
          if (!el.getAttribute('data-jpy')) el.setAttribute('data-jpy', raw);
          const jpy = parseInt(el.getAttribute('data-jpy'));
          const converted = Math.round(jpy * rates[next]);
          el.textContent = symbols[next] + converted.toLocaleString();
        });
      });
    }
  });
}

function initDatePicker() {
  document.querySelectorAll('.search-field input').forEach(function(input) {
    const val = input.value || input.placeholder || '';
    if (val.includes('—') || val.includes('Jul 15') || val.includes('Check')) {
      input.style.cursor = 'pointer';
      input.addEventListener('click', function() { showDateModal(this); });
    }
  });

  function showDateModal(input) {
    if (document.querySelector('.date-modal')) return;
    const modal = document.createElement('div');
    modal.className = 'date-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let startDay = 15, startMonth = 6, endDay = 18, endMonth = 6;

    function renderModal() {
      let html = '<div style="background:#fff;border-radius:12px;padding:24px;max-width:640px;width:90%;">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">';
      html += '<h3 style="font-size:16px;font-weight:700;">Select dates</h3>';
      html += '<button class="date-close" style="background:none;border:none;font-size:24px;cursor:pointer;">&times;</button></div>';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">';

      for (let m = 0; m < 2; m++) {
        const cm = 6 + m;
        const daysInMonth = new Date(2025, cm + 1, 0).getDate();
        const firstDay = new Date(2025, cm, 1).getDay();
        html += '<div><div style="text-align:center;font-weight:600;margin-bottom:8px;">' + months[cm] + ' 2025</div>';
        html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;font-size:12px;">';
        html += '<div style="font-weight:600;color:#666;">Su</div><div style="font-weight:600;color:#666;">Mo</div><div style="font-weight:600;color:#666;">Tu</div><div style="font-weight:600;color:#666;">We</div><div style="font-weight:600;color:#666;">Th</div><div style="font-weight:600;color:#666;">Fr</div><div style="font-weight:600;color:#666;">Sa</div>';
        for (let i = 0; i < firstDay; i++) html += '<div></div>';
        for (let d = 1; d <= daysInMonth; d++) {
          const isStart = (cm === startMonth && d === startDay);
          const isEnd = (cm === endMonth && d === endDay);
          const isBetween = endDay && ((cm === startMonth && cm === endMonth && d > startDay && d < endDay) || (cm > startMonth && cm < endMonth) || (cm === startMonth && d > startDay && cm < endMonth) || (cm === endMonth && d < endDay && cm > startMonth));
          let style = 'padding:6px;border-radius:4px;cursor:pointer;';
          if (isStart || isEnd) style += 'background:#006ce4;color:#fff;';
          else if (isBetween) style += 'background:#f0f6ff;';
          html += '<div class="date-day" data-month="' + cm + '" data-day="' + d + '" style="' + style + '">' + d + '</div>';
        }
        html += '</div></div>';
      }
      html += '</div>';
      html += '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">';
      html += '<button class="date-close btn" style="background:#f5f5f5;color:#333;">Cancel</button>';
      html += '<button class="date-apply btn btn-primary">Apply</button></div></div>';
      modal.innerHTML = html;
      attachDateEvents();
    }

    function attachDateEvents() {
      modal.querySelectorAll('.date-close').forEach(function(b) { b.onclick = function() { modal.remove(); }; });
      modal.querySelector('.date-apply').onclick = function() {
        if (startDay && endDay) {
          input.value = monthsShort[startMonth] + ' ' + startDay + ' — ' + monthsShort[endMonth] + ' ' + endDay;
        }
        modal.remove();
      };
      modal.querySelectorAll('.date-day').forEach(function(day) {
        day.onclick = function() {
          const d = parseInt(this.dataset.day), m = parseInt(this.dataset.month);
          if (!endDay || (startDay && endDay)) {
            startDay = d; startMonth = m; endDay = null; endMonth = null;
          } else {
            if (m < startMonth || (m === startMonth && d <= startDay)) {
              startDay = d; startMonth = m;
            } else {
              endDay = d; endMonth = m;
            }
          }
          renderModal();
        };
      });
    }

    document.body.appendChild(modal);
    renderModal();
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
  }
}

function initGuestSelector() {
  document.querySelectorAll('.search-field input').forEach(function(input) {
    const val = input.value || '';
    if (val.includes('adult') || val.includes('child') || val.includes('room')) {
      input.readOnly = true;
      input.style.cursor = 'pointer';
      input.addEventListener('click', function() { showGuestModal(this); });
    }
  });

  function showGuestModal(input) {
    if (document.querySelector('.guest-modal')) return;
    let adults = 2, children = 0, rooms = 1;
    const modal = document.createElement('div');
    modal.className = 'guest-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';

    function render() {
      modal.innerHTML = '<div style="background:#fff;border-radius:12px;padding:24px;width:340px;">' +
        '<h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Guests & rooms</h3>' +
        makeRow('Adults', adults, 1, 10, 'adults') +
        makeRow('Children', children, 0, 6, 'children') +
        makeRow('Rooms', rooms, 1, 5, 'rooms') +
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">' +
        '<button class="guest-close btn" style="background:#f5f5f5;color:#333;">Cancel</button>' +
        '<button class="guest-apply btn btn-primary">Done</button></div></div>';

      modal.querySelectorAll('.guest-minus').forEach(function(b) {
        b.onclick = function() {
          if (this.dataset.type === 'adults' && adults > 1) adults--;
          else if (this.dataset.type === 'children' && children > 0) children--;
          else if (this.dataset.type === 'rooms' && rooms > 1) rooms--;
          render();
        };
      });
      modal.querySelectorAll('.guest-plus').forEach(function(b) {
        b.onclick = function() {
          if (this.dataset.type === 'adults' && adults < 10) adults++;
          else if (this.dataset.type === 'children' && children < 6) children++;
          else if (this.dataset.type === 'rooms' && rooms < 5) rooms++;
          render();
        };
      });
      modal.querySelector('.guest-close').onclick = function() { modal.remove(); };
      modal.querySelector('.guest-apply').onclick = function() {
        input.value = adults + ' adult' + (adults > 1 ? 's' : '') + ' · ' + children + ' child' + (children !== 1 ? 'ren' : '') + ' · ' + rooms + ' room' + (rooms > 1 ? 's' : '');
        modal.remove();
      };
    }

    function makeRow(label, value, min, max, type) {
      const disMin = value <= min, disMax = value >= max;
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0;">' +
        '<span style="font-size:14px;">' + label + '</span>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
        '<button class="guest-minus" data-type="' + type + '" style="width:32px;height:32px;border:1px solid ' + (disMin ? '#e0e0e0' : '#006ce4') + ';border-radius:4px;background:#fff;cursor:pointer;font-size:18px;color:' + (disMin ? '#e0e0e0' : '#006ce4') + ';">-</button>' +
        '<span style="font-size:14px;font-weight:600;min-width:20px;text-align:center;">' + value + '</span>' +
        '<button class="guest-plus" data-type="' + type + '" style="width:32px;height:32px;border:1px solid ' + (disMax ? '#e0e0e0' : '#006ce4') + ';border-radius:4px;background:#fff;cursor:pointer;font-size:18px;color:' + (disMax ? '#e0e0e0' : '#006ce4') + ';">+</button>' +
        '</div></div>';
    }

    document.body.appendChild(modal);
    render();
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
  }
}

function initGallery() {
  const galleryImgs = document.querySelectorAll('.gallery-img');
  if (galleryImgs.length === 0) return;

  galleryImgs.forEach(function(img, idx) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() { showLightbox(idx); });
  });

  function showLightbox(startIdx) {
    let current = startIdx;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;';

    function render() {
      const img = galleryImgs[current];
      overlay.innerHTML = '<div style="position:relative;width:80vw;height:80vh;">' +
        '<div style="width:100%;height:100%;border-radius:8px;' + (img.getAttribute('style') || '') + '"></div>' +
        '<button class="lb-close" style="position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;">&times;</button>' +
        '<button class="lb-prev" style="position:absolute;left:-50px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.2);border:none;color:#fff;font-size:24px;padding:12px 16px;border-radius:4px;cursor:pointer;">&lt;</button>' +
        '<button class="lb-next" style="position:absolute;right:-50px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.2);border:none;color:#fff;font-size:24px;padding:12px 16px;border-radius:4px;cursor:pointer;">&gt;</button>' +
        '<div style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);color:#fff;font-size:13px;">' + (current+1) + ' / ' + galleryImgs.length + '</div></div>';

      overlay.querySelector('.lb-close').onclick = function() { overlay.remove(); };
      overlay.querySelector('.lb-prev').onclick = function() { current = (current - 1 + galleryImgs.length) % galleryImgs.length; render(); };
      overlay.querySelector('.lb-next').onclick = function() { current = (current + 1) % galleryImgs.length; render(); };
    }

    document.body.appendChild(overlay);
    render();
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function handler(e) {
      if (!document.body.contains(overlay)) { document.removeEventListener('keydown', handler); return; }
      if (e.key === 'Escape') overlay.remove();
      if (e.key === 'ArrowLeft') { current = (current - 1 + galleryImgs.length) % galleryImgs.length; render(); }
      if (e.key === 'ArrowRight') { current = (current + 1) % galleryImgs.length; render(); }
    });
  }
}

function initFormValidation() {
  const formMain = document.querySelector('.form-main');
  if (!formMain) return;

  const submitBtn = formMain.querySelector('.btn-cta[disabled], .btn-cta');
  if (!submitBtn) return;

  const requiredGroups = formMain.querySelectorAll('.form-group');
  const requiredInputs = [];

  requiredGroups.forEach(function(group) {
    const label = group.querySelector('label');
    const requiredMark = label && label.querySelector('span[style*="color:red"]');
    if (requiredMark) {
      const input = group.querySelector('input, select');
      if (input) {
        requiredInputs.push(input);
        input._formGroup = group;
      }
    }
  });

  function showError(input, message) {
    clearError(input);
    input.style.borderColor = '#cc0000';
    var err = document.createElement('div');
    err.className = 'field-error';
    err.style.cssText = 'color:#cc0000;font-size:12px;margin-top:4px;';
    err.textContent = message;
    input._formGroup.appendChild(err);
  }

  function clearError(input) {
    input.style.borderColor = '#ccc';
    var existing = input._formGroup.querySelector('.field-error');
    if (existing) existing.remove();
  }

  function fieldLabel(input) {
    var label = input._formGroup && input._formGroup.querySelector('label');
    if (label) {
      return label.textContent.replace(/\*/g, '').trim();
    }
    return input.placeholder || 'Required field';
  }

  function updateMissingSummary(missing) {
    var summary = document.querySelector('.missing-fields-summary');
    var list = document.querySelector('.missing-fields-list');
    if (!summary || !list) return;
    if (missing.length === 0) {
      summary.style.display = 'none';
      list.innerHTML = '';
      return;
    }
    summary.style.display = 'block';
    list.innerHTML = '';
    missing.forEach(function(name) {
      var li = document.createElement('li');
      li.textContent = name;
      list.appendChild(li);
    });
  }

  function validate() {
    var valid = true;
    var missing = [];
    requiredInputs.forEach(function(input) {
      var filled = input.tagName === 'SELECT' ? input.value !== 'Please select' : !!input.value.trim();
      if (!filled) {
        valid = false;
        missing.push(fieldLabel(input));
      } else {
        input.style.borderColor = '#4caf50';
        clearError(input);
      }
    });

    updateMissingSummary(missing);
    submitBtn.disabled = !valid;
    submitBtn.style.opacity = valid ? '1' : '0.6';
    submitBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
  }

  requiredInputs.forEach(function(input) {
    var fieldName = input.placeholder || (input.tagName === 'SELECT' ? 'an option' : 'this field');
    input.addEventListener('blur', function() {
      var filled = input.tagName === 'SELECT' ? input.value !== 'Please select' : !!input.value.trim();
      if (!filled) {
        showError(input, 'Please enter your ' + fieldName.replace(/^(email|First name|Last name|Phone).*/, function(m) { return m.toLowerCase(); }));
      } else {
        clearError(input);
        input.style.borderColor = '#4caf50';
      }
      validate();
    });
    input.addEventListener('focus', function() {
      clearError(input);
    });
    input.addEventListener('input', function() {
      var filled = !!input.value.trim();
      if (filled) {
        clearError(input);
        input.style.borderColor = '#4caf50';
      }
      validate();
    });
    input.addEventListener('change', validate);
  });

  if (submitBtn.hasAttribute('disabled')) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (!this.disabled) {
        window.location.href = 'confirmation.html';
      } else {
        var firstMissing = null;
        requiredInputs.forEach(function(input) {
          var filled = input.tagName === 'SELECT' ? input.value !== 'Please select' : !!input.value.trim();
          if (!filled) {
            var fieldName = input.placeholder || (input.tagName === 'SELECT' ? 'an option' : 'this field');
            showError(input, 'Please enter your ' + fieldName.toLowerCase());
            if (!firstMissing) firstMissing = input;
          }
        });
        if (firstMissing) {
          firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstMissing.focus({ preventScroll: true });
        }
      }
    });
  }

  validate();
}

function initRoomSelection() {
  const roomSelects = document.querySelectorAll('.room-select');
  if (roomSelects.length === 0) return;

  roomSelects.forEach(function(sel) {
    sel.addEventListener('change', function() {
      const row = this.closest('tr');
      if (!row) return;
      if (parseInt(this.value) > 0) {
        row.style.background = '#f0f6ff';
        row.style.transition = 'background 0.3s';
      } else {
        row.style.background = '';
      }
    });
  });

  // Make reserve buttons work
  document.querySelectorAll('.reserve-btn').forEach(function(btn) {
    if (btn.tagName === 'A') return;
    btn.addEventListener('click', function() {
      window.location.href = 'room-selection.html';
    });
  });

  // Make availability buttons work
  document.querySelectorAll('.availability-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'hotel-detail.html#rooms';
    });
  });
}

function initNavigation() {
  // Sign in buttons
  document.querySelectorAll('.btn-primary').forEach(function(btn) {
    if (btn.textContent.trim() === 'Sign in' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'signin.html'; });
    }
  });

  // Register buttons
  document.querySelectorAll('.btn-outline').forEach(function(btn) {
    if (btn.textContent.trim() === 'Register' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'register.html'; });
    }
  });

  // List your property buttons
  document.querySelectorAll('.btn-outline').forEach(function(btn) {
    if (btn.textContent.trim() === 'List your property' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'list-property.html'; });
    }
  });

  // My trips
  document.querySelectorAll('.btn-outline, .btn').forEach(function(btn) {
    if (btn.textContent.trim() === 'My trips' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'my-trips.html'; });
    }
  });

  // Help buttons
  document.querySelectorAll('.btn-outline').forEach(function(btn) {
    if (btn.textContent.trim() === 'Help' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'help.html'; });
    }
  });

  // Smooth scroll for #anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initMisc() {
  // Hotel card hover + click navigation
  document.querySelectorAll('.hotel-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-2px)'; this.style.transition = 'transform 0.2s, box-shadow 0.2s'; });
    card.addEventListener('mouseleave', function() { this.style.transform = ''; });

    // If card is not inside an <a>, make it clickable
    if (!card.closest('a')) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.closest('.availability-btn') || e.target.closest('button')) return;
        window.location.href = 'hotel-detail.html';
      });
    }
  });

  // Map placeholder click
  document.querySelectorAll('.map-placeholder').forEach(function(map) {
    map.style.cursor = 'pointer';
    map.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;';
      modal.innerHTML = '<div style="background:#fff;border-radius:12px;padding:24px;width:80vw;max-width:800px;height:70vh;display:flex;flex-direction:column;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<h3 style="font-size:16px;font-weight:700;">Map view</h3>' +
        '<button style="background:none;border:none;font-size:24px;cursor:pointer;" onclick="this.closest(\'div[style]\').parentElement.remove()">&times;</button></div>' +
        '<div style="flex:1;background:#e8f0fe;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#006ce4;font-size:16px;">' +
        '<div style="text-align:center;"><div style="font-size:48px;margin-bottom:12px;">&#128506;</div>Interactive map would load here<br><span style="font-size:13px;color:#666;">Shinjuku, Tokyo, Japan</span></div>' +
        '</div></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
    });
  });

  // FAQ accordion (help page)
  document.querySelectorAll('details').forEach(function(detail) {
    detail.addEventListener('toggle', function() {
      if (this.open) {
        document.querySelectorAll('details[open]').forEach(function(d) {
          if (d !== detail) d.open = false;
        });
      }
    });
  });

  // Tab buttons (my-trips page)
  const tabBtns = document.querySelectorAll('[style*="border-radius:20px"]');
  tabBtns.forEach(function(btn) {
    if (btn.classList.contains('btn')) {
      btn.addEventListener('click', function() {
        tabBtns.forEach(function(b) {
          if (b.classList.contains('btn')) {
            b.style.background = '#f5f5f5';
            b.style.color = '#333';
            b.classList.remove('btn-primary');
          }
        });
        this.style.background = '';
        this.style.color = '';
        this.classList.add('btn-primary');
      });
    }
  });

  // Review filter buttons
  document.querySelectorAll('.btn[style*="border-radius:20px"]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const parent = this.parentElement;
      if (!parent) return;
      parent.querySelectorAll('.btn').forEach(function(b) {
        b.style.background = '#f5f5f5';
        b.style.color = '#333';
      });
      this.style.background = '#f0f6ff';
      this.style.color = '#006ce4';
    });
  });

  // "Book now" / "View deal" / "Select" buttons on flights/cars/attractions
  document.querySelectorAll('.btn-primary').forEach(function(btn) {
    const text = btn.textContent.trim();
    if (text === 'Book now' || text === 'View deal' || text === 'Select' || text === 'Book') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Added to your trip! Redirecting to checkout...');
      });
    }
  });

  // Sign in form submission - 2-step flow (email → password)
  if (document.title.includes('Sign in')) {
    const continueBtn = document.querySelector('.signin-continue-btn');
    const emailStep = document.getElementById('signin-step-email');
    const passwordStep = document.getElementById('signin-step-password');
    const emailInput = document.getElementById('signin-email');
    const emailError = document.querySelector('.signin-email-error');
    const emailDisplay = document.querySelector('.signin-email-display');
    const passwordInput = document.getElementById('signin-password');
    const passwordError = document.querySelector('.signin-password-error');
    const submitBtn = document.querySelector('.signin-submit-btn');
    const backBtn = document.querySelector('.signin-back-btn');

    if (continueBtn && emailStep && passwordStep && emailInput) {
      continueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const value = emailInput.value.trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!validEmail) {
          emailInput.style.borderColor = '#cc0000';
          if (emailError) emailError.style.display = 'block';
          emailInput.focus();
          return;
        }
        if (emailError) emailError.style.display = 'none';
        emailInput.style.borderColor = '';
        if (emailDisplay) emailDisplay.textContent = value;
        emailStep.style.display = 'none';
        passwordStep.style.display = 'block';
        if (passwordInput) passwordInput.focus();
      });

      if (backBtn) {
        backBtn.addEventListener('click', function(e) {
          e.preventDefault();
          passwordStep.style.display = 'none';
          emailStep.style.display = '';
          if (emailInput) emailInput.focus();
        });
      }

      if (submitBtn && passwordInput) {
        submitBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (!passwordInput.value.trim()) {
            passwordInput.style.borderColor = '#cc0000';
            if (passwordError) passwordError.style.display = 'block';
            passwordInput.focus();
            return;
          }
          if (passwordError) passwordError.style.display = 'none';
          submitBtn.disabled = true;
          submitBtn.textContent = 'Signing in...';
          setTimeout(function() { window.location.href = 'index.html'; }, 600);
        });
      }
    }
  }

  // Register form submission
  if (document.title.includes('Create Account')) {
    const createBtn = document.querySelector('.btn-primary.btn-lg');
    if (createBtn) {
      createBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('.form-group input');
        let valid = true;
        inputs.forEach(function(inp) {
          if (!inp.value.trim()) { inp.style.borderColor = '#cc0000'; valid = false; }
          else { inp.style.borderColor = '#4caf50'; }
        });
        if (valid) window.location.href = 'index.html';
      });
    }
  }

  // Cancel booking button
  document.querySelectorAll('.btn').forEach(function(btn) {
    if (btn.textContent.trim() === 'Cancel booking') {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const sourceBtn = this;
        const card = sourceBtn.closest('.form-section');
        const modal = document.createElement('div');
        modal.className = 'cancel-booking-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
        modal.innerHTML = '<div role="dialog" aria-modal="true" aria-labelledby="cancelTitle" style="background:#fff;border-radius:12px;padding:24px;max-width:440px;width:100%;box-shadow:0 8px 24px rgba(0,0,0,0.2);">' +
          '<h3 id="cancelTitle" style="font-size:18px;font-weight:700;margin-bottom:12px;color:#262626;">Cancel this booking?</h3>' +
          '<p style="font-size:14px;color:#444;margin-bottom:8px;">You\'re about to cancel <strong>Park Hyatt Tokyo</strong> (Jul 15 — Jul 18, 2025).</p>' +
          '<div style="background:#e6f9e6;color:#008009;padding:10px 12px;border-radius:6px;font-size:13px;margin-bottom:16px;">&#10003; Free cancellation applies until Jul 12, 2025. You will not be charged.</div>' +
          '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;">' +
          '<button class="cancel-keep btn" style="background:#f5f5f5;color:#333;min-height:44px;padding:10px 18px;">Keep booking</button>' +
          '<button class="cancel-confirm btn btn-primary" style="background:#cc0000;border-color:#cc0000;min-height:44px;padding:10px 18px;">Yes, cancel booking</button>' +
          '</div></div>';
        document.body.appendChild(modal);
        modal.querySelector('.cancel-keep').onclick = function() { modal.remove(); };
        modal.addEventListener('click', function(ev) { if (ev.target === modal) modal.remove(); });
        modal.querySelector('.cancel-confirm').onclick = function() {
          this.disabled = true;
          this.textContent = 'Cancelling...';
          setTimeout(function() {
            modal.remove();
            if (card) {
              card.style.opacity = '0.5';
              const status = card.querySelector('[style*="background:#e6f9e6"]');
              if (status) { status.style.background = '#fee'; status.style.color = '#cc0000'; status.textContent = 'Cancelled'; }
              sourceBtn.disabled = true;
              sourceBtn.style.opacity = '0.5';
              sourceBtn.textContent = 'Cancelled';
            }
            showToast('Cancellation request submitted. A confirmation email will be sent.');
          }, 600);
        };
      });
    }
    if (btn.textContent.trim() === 'Modify dates') {
      btn.addEventListener('click', function() {
        showToast('Date modification is available up to 24 hours before check-in.');
      });
    }
    if (btn.textContent.trim() === 'Write a review') {
      btn.addEventListener('click', function() {
        showToast('Review form would open here. Thank you for your feedback!');
      });
    }
    if (btn.textContent.trim() === 'Book again') {
      btn.addEventListener('click', function() {
        window.location.href = 'hotel-detail.html';
      });
    }
  });

  // Help page search
  const helpSearch = document.querySelector('input[placeholder*="Describe your issue"]');
  if (helpSearch) {
    const helpBtn = helpSearch.parentElement.querySelector('.btn-primary');
    if (helpBtn) {
      helpBtn.addEventListener('click', function() {
        const query = helpSearch.value.trim().toLowerCase();
        if (!query) { helpSearch.focus(); return; }
        // Expand matching FAQ
        document.querySelectorAll('details').forEach(function(d) {
          if (d.textContent.toLowerCase().includes(query)) {
            d.open = true;
            d.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    }
  }

  // Chat with us / Call us buttons
  document.querySelectorAll('.btn-primary, .btn').forEach(function(btn) {
    if (btn.textContent.trim() === 'Chat with us') {
      btn.addEventListener('click', function() { showToast('Live chat connecting... An agent will be with you shortly.'); });
    }
    if (btn.textContent.trim() === 'Call us') {
      btn.addEventListener('click', function() { showToast('Call center: +81 3-6743-6580 (24/7, English available)'); });
    }
  });

  // Social login buttons (G, f, Apple icon)
  document.querySelectorAll('button').forEach(function(btn) {
    const t = btn.textContent.trim();
    if (t === 'G' || t === 'f' || t === '' || t.includes('Sign up with Google') || t.includes('Sign up with Facebook')) {
      btn.addEventListener('click', function() {
        showToast('Redirecting to ' + (t === 'G' || t.includes('Google') ? 'Google' : t === 'f' || t.includes('Facebook') ? 'Facebook' : 'Apple') + ' sign-in...');
        setTimeout(function() { window.location.href = 'index.html'; }, 1500);
      });
    }
  });

  // Pagination buttons (reviews page)
  document.querySelectorAll('button').forEach(function(btn) {
    const t = btn.textContent.trim();
    if (/^\d+$/.test(t) || t === '>' || t === '<') {
      if (btn.style.minWidth) { // pagination style
        btn.addEventListener('click', function() {
          document.querySelectorAll('button[style*="min-width:36px"]').forEach(function(b) {
            b.classList.remove('btn-primary');
            b.style.background = '#fff';
            b.style.color = '';
          });
          this.classList.add('btn-primary');
          this.style.background = '';
          this.style.color = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast('Page ' + (t === '>' ? 'next' : t === '<' ? 'previous' : t) + ' loaded');
        });
      }
    }
  });

  // View details button (my-trips)
  document.querySelectorAll('.btn-primary, .btn').forEach(function(btn) {
    if (btn.textContent.trim() === 'View details' && btn.tagName !== 'A') {
      btn.addEventListener('click', function() { window.location.href = 'confirmation.html'; });
    }
  });

  // Catch-all: any remaining <button> without a click handler gets a toast
  document.querySelectorAll('button').forEach(function(btn) {
    if (btn.tagName !== 'BUTTON') return;
    // Skip if already has listeners (we can't detect, but skip known handled ones)
    const t = btn.textContent.trim();
    const handled = ['Search', 'Sign in', 'Register', 'JPY', 'USD', 'EUR', 'GBP', 'CNY',
      'Help', 'List your property', 'My trips', 'Book', 'Book now', 'View deal', 'Select',
      'Chat with us', 'Call us', 'Cancel booking', 'Modify dates', 'Write a review',
      'Book again', 'View details', 'Cancel', 'Apply', 'Done', 'G', 'f', '',
      'Complete booking', 'Continue with email', 'Create account', 'See availability'];
    if (handled.includes(t)) return;
    if (t.includes('Sign up with')) return;
    if (/^\d+$/.test(t) || t === '>' || t === '<' || t === '&gt;') return;
    if (btn.classList.contains('search-btn') || btn.classList.contains('availability-btn') || btn.classList.contains('reserve-btn')) return;
    if (btn.closest('.date-modal') || btn.closest('.guest-modal')) return;
    if (t.includes('(') && t.includes(')')) return; // review filter buttons like "Couples (1,234)"
    if (t === 'Upcoming' || t === 'Completed' || t === 'Cancelled' || t === 'All') return;

    // Only add if no existing click listener (approximate: check data attr)
    if (!btn.dataset.handled) {
      btn.dataset.handled = 'true';
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (t === 'Upcoming' || t === 'Completed' || t === 'Cancelled') {
          // Tab switching already handled
          return;
        }
        showToast(t || 'Action completed');
      });
    }
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#003580;color:#fff;padding:14px 28px;border-radius:8px;font-size:14px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.3);max-width:400px;text-align:center;animation:fadeIn 0.3s;';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}

})();
