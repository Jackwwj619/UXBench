// Tablerose — restaurant reservation flow
// Carries booking state across pages via sessionStorage.

(function () {
  const KEY = 'tablerose:booking';
  const load = () => {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  };
  const save = (b) => sessionStorage.setItem(KEY, JSON.stringify(b));
  const initBooking = () => {
    const b = load();
    if (!b.party) b.party = 2;
    if (!b.city) b.city = 'Portland, OR';
    if (!b.time) b.time = '19:00';
    if (!b.date) {
      const d = new Date(); d.setDate(d.getDate() + 1);
      b.date = d.toISOString().slice(0, 10);
    }
    return b;
  };

  const niceDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  const niceTime = (hhmm) => {
    if (!hhmm) return '';
    const [h, m] = hhmm.split(':').map(Number);
    const ap = h >= 12 ? 'pm' : 'am';
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${m.toString().padStart(2, '0')} ${ap}`;
  };

  // Build slot windows centered on the user's chosen time
  function slotsAroundTime(targetHhmm, count = 4, step = 30) {
    const [h, m] = (targetHhmm || '19:00').split(':').map(Number);
    const targetMin = h * 60 + m;
    const out = [];
    const start = -Math.floor(count / 2);
    for (let i = 0; i < count; i++) {
      let mins = targetMin + (start + i) * step;
      if (mins < 0) mins = 0;
      if (mins > 24 * 60 - 1) mins = 24 * 60 - 1;
      const hh = Math.floor(mins / 60);
      const mm = mins % 60;
      out.push(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`);
    }
    return out;
  }

  // Lightweight toast
  function showToast(msg, opts = {}) {
    let host = document.getElementById('toastHost');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toastHost';
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    const t = document.createElement('div');
    t.className = 'toast' + (opts.kind === 'error' ? ' toast-err' : '');
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.textContent = msg;
    host.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, opts.duration || 2400);
  }

  // ============== INDEX PAGE ==============
  const searchForm = document.getElementById('searchForm');
  const dateInput = document.getElementById('dateInput');
  if (dateInput) {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().slice(0, 10);
    dateInput.min = new Date().toISOString().slice(0, 10);
  }
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const b = initBooking();
      b.city = document.getElementById('cityInput').value.trim() || 'Portland, OR';
      b.party = parseInt(document.getElementById('partyInput').value, 10);
      b.date = document.getElementById('dateInput').value;
      b.time = document.getElementById('timeInput').value;
      // Clear any prior intent so a fresh search shows everything
      b.intent = null;
      b.intentLabel = null;
      save(b);
      location.href = 'restaurants.html';
    });
  }

  // Wire suggestion pills + guide cards to carry intent into results
  document.querySelectorAll('[data-intent]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const b = initBooking();
      b.intent = el.dataset.intent || null;
      b.intentLabel = el.dataset.intentLabel || el.textContent.trim();
      // Some intents imply a different time-of-day (brunch)
      const intentTime = el.dataset.intentTime;
      if (intentTime) b.time = intentTime;
      const intentDate = el.dataset.intentDate;
      if (intentDate === 'tomorrow') {
        const d = new Date(); d.setDate(d.getDate() + 1);
        b.date = d.toISOString().slice(0, 10);
      }
      save(b);
    });
  });

  // Trending grid on index
  const trendingGrid = document.getElementById('trendingGrid');
  if (trendingGrid) {
    const trends = [
      { name: 'Bella Suora', cuisine: 'Italian · $$$', hood: 'Pearl District', stars: '★★★★★', rating: 4.7, emoji: '🍝', slots: ['6:30', '7:00', '8:15'] },
      { name: 'Tonari', cuisine: 'Japanese · $$', hood: 'Pearl District', stars: '★★★★½', rating: 4.6, emoji: '🍣', slots: ['5:45', '6:00', '8:30'] },
      { name: 'Field & Hearth', cuisine: 'New American · $$$', hood: 'Alberta Arts', stars: '★★★★★', rating: 4.8, emoji: '🌿', slots: ['7:15', '8:00'] },
      { name: 'Lupinus & Roma', cuisine: 'Italian · $$$', hood: 'Mississippi Ave', stars: '★★★★½', rating: 4.5, emoji: '🍷', slots: ['6:00', '6:30', '9:00'] },
      { name: 'Old Pier Smokehouse', cuisine: 'BBQ · $$', hood: 'Hawthorne', stars: '★★★★', rating: 4.3, emoji: '🔥', slots: ['5:30', '7:30'] },
      { name: 'Saffron & Stone', cuisine: 'Mediterranean · $$$', hood: 'Division St', stars: '★★★★½', rating: 4.6, emoji: '🥗', slots: ['6:00', '7:00', '8:00'] },
    ];
    trends.forEach((r) => {
      const card = document.createElement('a');
      card.href = 'restaurant.html'; card.className = 'rest-card';
      card.addEventListener('click', () => {
        const b = load(); b.restName = r.name; b.restCuisine = r.cuisine; b.restHood = r.hood; b.restEmoji = r.emoji; b.restStars = r.stars; b.restRating = r.rating; save(b);
      });
      card.innerHTML = `
        <div class="rc-photo" data-emoji="${r.emoji}"></div>
        <div class="rc-body">
          <div class="rc-name">${r.name}</div>
          <div class="rc-meta">${r.cuisine} · ${r.hood}</div>
          <div class="rc-meta"><span class="rc-stars">${r.stars}</span> ${r.rating} · 1k+ reviews</div>
        </div>
        <div class="rc-slots">
          ${r.slots.map((s) => `<span class="rc-slot">${s}</span>`).join('')}
          <span class="rc-slot unavail">9:30 ✕</span>
        </div>`;
      trendingGrid.appendChild(card);
    });
  }

  // ============== RESTAURANTS PAGE ==============
  const resultsList = document.getElementById('resultsList');
  if (resultsList) {
    const b = initBooking();
    const rb = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
    rb('rbWhere', b.city);
    rb('rbParty', `${b.party} guest${b.party > 1 ? 's' : ''}`);
    rb('rbDate', niceDate(b.date));
    rb('rbTime', niceTime(b.time));

    const restaurants = [
      { id: 'bella',  name: 'Bella Suora',           emoji: '🍝', cuisine: 'italian',       price: 3, hood: 'pearl',       feats: ['quiet','bar'], stars: '★★★★★', rating: 4.7, reviews: 1284, blurb: 'Hand-rolled Roman pastas, wood-burning oven you can see from every seat. The carbonara uses guanciale aged on premise.', tags: ['Wine list', 'Counter seats', 'Birthday'] },
      { id: 'tonari', name: 'Tonari',                emoji: '🍣', cuisine: 'japanese',      price: 2, hood: 'pearl',       feats: ['bar','quiet'], stars: '★★★★½', rating: 4.6, reviews: 932, blurb: '12-seat omakase + a la carte sushi counter run by Chef Ren Nakai. Limited reservations Wed–Sun.', tags: ['Omakase', 'Counter', 'Solo-friendly'] },
      { id: 'field',  name: 'Field & Hearth',        emoji: '🌿', cuisine: 'newamerican',   price: 3, hood: 'alberta',     feats: ['outdoor','vegan'], stars: '★★★★★', rating: 4.8, reviews: 2104, blurb: 'Northwest produce, six-seat chefs counter, eight-seat dining room, twenty-seat patio.', tags: ['Vegan menu', 'Patio', 'Counter'] },
      { id: 'lupinus',name: 'Lupinus & Roma',        emoji: '🍷', cuisine: 'italian',       price: 3, hood: 'mississippi', feats: ['outdoor','late'], stars: '★★★★½', rating: 4.5, reviews: 678, blurb: 'Family-style Roman dinners and a wine program of 280 small-producer Italian bottles.', tags: ['Wine list', 'Family-style', 'Late'] },
      { id: 'pier',   name: 'Old Pier Smokehouse',   emoji: '🔥', cuisine: 'bbq',           price: 2, hood: 'hawthorne',   feats: ['outdoor','kid'], stars: '★★★★', rating: 4.3, reviews: 1453, blurb: '12-hour brisket, salt-cured pastrami, and a back patio with a long shared table.', tags: ['Brisket', 'Patio', 'Kid-friendly'] },
      { id: 'saffron',name: 'Saffron & Stone',       emoji: '🥗', cuisine: 'mediterranean', price: 3, hood: 'division',    feats: ['quiet','vegan'], stars: '★★★★½', rating: 4.6, reviews: 980, blurb: 'A tasting-menu Mediterranean spot with a great vegetarian path. Reservations open 30 days out.', tags: ['Tasting menu', 'Quiet', 'Vegetarian'] },
      { id: 'siam',   name: 'Siam Floating Cart',    emoji: '🍛', cuisine: 'thai',          price: 1, hood: 'downtown',    feats: ['kid','late'], stars: '★★★★', rating: 4.2, reviews: 1812, blurb: 'Bangkok-style noodles in a bright corner room. Open until midnight Friday and Saturday.', tags: ['Noodles', 'Late'] },
      { id: 'hot',    name: 'Hot Numb Wok',          emoji: '🌶️', cuisine: 'sichuan',       price: 2, hood: 'downtown',    feats: ['late','bar'], stars: '★★★★½', rating: 4.5, reviews: 1130, blurb: 'A serious Sichuan room. Order the dry-fried green beans and the dan dan.', tags: ['Spicy', 'Late', 'Counter'] },
      { id: 'olive',  name: 'Olivewood',             emoji: '🌳', cuisine: 'mediterranean', price: 4, hood: 'pearl',       feats: ['quiet'], stars: '★★★★★', rating: 4.9, reviews: 540, blurb: 'Tasting menu only — six courses, wine pairings optional. Booking opens 60 days out.', tags: ['Tasting menu', 'Special occasion'], noSlots: true },
      { id: 'green',  name: 'Greenheart Kitchen',    emoji: '🥬', cuisine: 'vegan',         price: 2, hood: 'hawthorne',   feats: ['vegan','kid','outdoor'], stars: '★★★★', rating: 4.4, reviews: 745, blurb: 'Plant-forward neighborhood spot with a backyard garden and weekend brunch.', tags: ['Vegan', 'Brunch', 'Family-friendly'] },
    ];

    let sortBy = 'relevance';
    const filterState = { cuisine: new Set(), price: new Set(), hood: new Set(), feat: new Set() };

    // Pre-apply intent from suggestion pill / guide
    function applyIntent() {
      const intent = b.intent;
      if (!intent) return;
      // Map intent -> filter
      const cuisineMap = { italian: 'italian', sushi: 'japanese', japanese: 'japanese', sichuan: 'sichuan', thai: 'thai', vegan: 'vegan', bbq: 'bbq', mediterranean: 'mediterranean', newamerican: 'newamerican' };
      const featMap = { quiet: 'quiet', solo: 'bar', date: 'quiet', birthday: 'quiet', brunch: null };
      if (cuisineMap[intent]) {
        filterState.cuisine.add(cuisineMap[intent]);
        const cb = document.querySelector(`input[data-filter="cuisine"][value="${cuisineMap[intent]}"]`);
        if (cb) cb.checked = true;
      } else if (featMap[intent]) {
        filterState.feat.add(featMap[intent]);
        const cb = document.querySelector(`input[data-filter="feat"][value="${featMap[intent]}"]`);
        if (cb) cb.checked = true;
      }
      // Show the active intent chip
      const chipHost = document.getElementById('rbIntent');
      if (chipHost) {
        const label = b.intentLabel || intent;
        chipHost.innerHTML = `<span class="intent-chip">Filtered: <strong>${label}</strong> <button type="button" class="intent-x" aria-label="Clear filter">×</button></span>`;
        chipHost.querySelector('.intent-x').addEventListener('click', () => {
          const cur = load(); cur.intent = null; cur.intentLabel = null; save(cur);
          // Clear all checkboxes and rerender
          Object.values(filterState).forEach((s) => s.clear());
          document.querySelectorAll('input[data-filter]').forEach((cb) => (cb.checked = false));
          chipHost.innerHTML = '';
          renderResults();
        });
      }
    }

    function renderResults() {
      const filtered = restaurants.filter((r) => {
        if (filterState.cuisine.size && !filterState.cuisine.has(r.cuisine)) return false;
        if (filterState.price.size && !filterState.price.has(String(r.price))) return false;
        if (filterState.hood.size && !filterState.hood.has(r.hood)) return false;
        if (filterState.feat.size && !r.feats.some((f) => filterState.feat.has(f))) return false;
        return true;
      });

      if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);

      document.getElementById('resultsCount').textContent = `${filtered.length} restaurant${filtered.length === 1 ? '' : 's'}`;
      const empty = document.getElementById('resultsEmpty');
      resultsList.innerHTML = '';
      if (!filtered.length) { empty.hidden = false; return; } else empty.hidden = true;

      // Slots are generated around the chosen time so the results stay
      // consistent with the search summary.
      const slotWindow = slotsAroundTime(b.time, 4, 30);

      filtered.forEach((r) => {
        const row = document.createElement('div');
        row.className = 'r-row' + (r.noSlots ? ' unavail' : '');
        const slotsHtml = r.noSlots
          ? '<button class="slot disabled" disabled>No tables</button>'
          : slotWindow.map((s) => {
              const isTarget = s === b.time;
              return `<button class="slot${isTarget ? ' slot-target' : ''}" data-slot="${s}"${isTarget ? ' aria-label="Originally requested time"' : ''}>${niceTime(s)}${isTarget ? ' <span class="slot-badge">Your time</span>' : ''}</button>`;
            }).join('');
        row.innerHTML = `
          <div class="r-photo" data-emoji="${r.emoji}"></div>
          <div class="r-body">
            <h3 class="r-name">${r.name}</h3>
            <div class="r-meta"><span class="r-stars">${r.stars}</span> ${r.rating} · ${r.reviews.toLocaleString()} reviews · ${'$'.repeat(r.price)} · ${capCuisine(r.cuisine)} · ${capHood(r.hood)}</div>
            <p class="r-blurb">${r.blurb}</p>
            <div class="r-tags">${r.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          </div>
          <div class="r-slots">
            <div class="r-slots-label">Near ${niceTime(b.time)} · ${niceDate(b.date)}</div>
            <div class="slot-grid">${slotsHtml}</div>
          </div>`;
        row.querySelectorAll('button[data-slot]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const cur = load();
            cur.restId = r.id; cur.restName = r.name; cur.restCuisine = capCuisine(r.cuisine);
            cur.restHood = capHood(r.hood); cur.restEmoji = r.emoji; cur.restStars = r.stars;
            cur.restRating = r.rating; cur.restPrice = '$'.repeat(r.price);
            cur.time = btn.dataset.slot;
            save(cur);
            location.href = 'restaurant.html';
          });
        });
        resultsList.appendChild(row);
      });
    }

    function capCuisine(c) { return ({italian:'Italian', japanese:'Japanese', thai:'Thai', sichuan:'Sichuan', mediterranean:'Mediterranean', newamerican:'New American', vegan:'Plant-based', bbq:'BBQ & smoke'}[c]) || c; }
    function capHood(h) { return ({pearl:'Pearl District', mississippi:'Mississippi Ave', alberta:'Alberta Arts', division:'Division St', hawthorne:'Hawthorne', downtown:'Downtown'}[h]) || h; }

    document.querySelectorAll('input[data-filter]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const k = cb.dataset.filter;
        if (cb.checked) filterState[k].add(cb.value); else filterState[k].delete(cb.value);
        renderResults();
      });
    });
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      Object.values(filterState).forEach((s) => s.clear());
      document.querySelectorAll('input[data-filter]').forEach((cb) => (cb.checked = false));
      const chipHost = document.getElementById('rbIntent');
      if (chipHost) chipHost.innerHTML = '';
      const cur = load(); cur.intent = null; cur.intentLabel = null; save(cur);
      renderResults();
    });
    document.getElementById('sortBy')?.addEventListener('change', (e) => { sortBy = e.target.value; renderResults(); });

    // Inline edit panel for the search summary
    const editPanel = document.getElementById('rbEditPanel');
    const editBtn = document.getElementById('rbEdit');
    if (editBtn && editPanel) {
      // Pre-fill the inline form
      const epCity = document.getElementById('epCity');
      const epParty = document.getElementById('epParty');
      const epDate = document.getElementById('epDate');
      const epTime = document.getElementById('epTime');
      if (epCity) epCity.value = b.city;
      if (epParty) epParty.value = String(b.party);
      if (epDate) {
        epDate.value = b.date;
        epDate.min = new Date().toISOString().slice(0, 10);
      }
      if (epTime) epTime.value = b.time;

      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const open = editPanel.hasAttribute('hidden');
        if (open) {
          editPanel.removeAttribute('hidden');
          editBtn.setAttribute('aria-expanded', 'true');
        } else {
          editPanel.setAttribute('hidden', '');
          editBtn.setAttribute('aria-expanded', 'false');
        }
      });
      const epForm = document.getElementById('rbEditForm');
      epForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const cur = load();
        cur.city = epCity.value.trim() || cur.city;
        cur.party = parseInt(epParty.value, 10);
        cur.date = epDate.value || cur.date;
        cur.time = epTime.value || cur.time;
        save(cur);
        // Update the in-page summary, no full reload needed
        b.city = cur.city; b.party = cur.party; b.date = cur.date; b.time = cur.time;
        rb('rbWhere', b.city);
        rb('rbParty', `${b.party} guest${b.party > 1 ? 's' : ''}`);
        rb('rbDate', niceDate(b.date));
        rb('rbTime', niceTime(b.time));
        editPanel.setAttribute('hidden', '');
        editBtn.setAttribute('aria-expanded', 'false');
        renderResults();
        showToast('Search updated.');
      });
    }

    applyIntent();
    renderResults();
  }

  // ============== RESTAURANT DETAIL ==============
  const slotsEl = document.getElementById('slots');
  if (slotsEl) {
    const b = initBooking();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    if (b.restName) set('rhName', b.restName);
    if (b.restCuisine && b.restPrice && b.restHood) set('rhCat', `${b.restCuisine} · ${b.restPrice} · ${b.restHood}`);
    if (b.restRating) set('rhRating', b.restRating);
    if (b.restStars) set('rhStars', b.restStars);

    set('bDate', niceDate(b.date));
    const partySel = document.getElementById('bParty');
    if (partySel) {
      partySel.value = `${b.party} guest${b.party > 1 ? 's' : ''}`;
      partySel.addEventListener('change', () => {
        const cur = load();
        cur.party = parseInt(partySel.value, 10);
        save(cur);
        // Refresh hold note + show feedback
        const holdAmt = 50 * cur.party;
        const note = document.getElementById('holdNote');
        if (note) {
          note.innerHTML = `Holds the table free of charge — your card is only charged a $50/seat fee if you no-show. Estimated card hold for ${cur.party} guest${cur.party > 1 ? 's' : ''}: <strong>$${holdAmt}</strong>.`;
        }
        showToast(`Updated to ${cur.party} guest${cur.party > 1 ? 's' : ''}.`);
      });
    }

    // Generate slots around chosen time — anchor to the user's selection
    // so dinner searches show dinner slots and morning searches show morning.
    const target = b.time || '19:00';
    const [th, tm] = target.split(':').map(Number);
    const targetMin = th * 60 + tm;
    const baseSlots = [];
    for (let i = -4; i <= 5; i++) {
      let mins = targetMin + i * 30;
      if (mins < 0) mins = 0;
      if (mins > 24 * 60 - 1) mins = 24 * 60 - 1;
      const hh = Math.floor(mins / 60);
      const mm = mins % 60;
      baseSlots.push(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`);
    }
    slotsEl.innerHTML = '';
    baseSlots.forEach((s) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const slotMin = parseInt(s.split(':')[0]) * 60 + parseInt(s.split(':')[1]);
      const close = Math.abs(slotMin - targetMin) <= 30;
      const isTarget = s === target;
      const isUnavail = (Math.abs(slotMin - targetMin) > 120) && b.restName === 'Bella Suora';
      btn.className = 'slot' + (close ? '' : ' muted') + (isTarget ? ' slot-target' : '') + (isUnavail ? ' disabled' : '');
      btn.textContent = niceTime(s);
      if (isTarget) btn.setAttribute('aria-label', `${niceTime(s)} — your selected time`);
      if (isUnavail) btn.disabled = true;
      btn.addEventListener('click', () => {
        const cur = load(); cur.time = s; save(cur); location.href = 'guest.html';
      });
      slotsEl.appendChild(btn);
    });

    // Tabs — scroll into view on mobile so the change is visible.
    const tabs = document.querySelectorAll('.rt');
    const panels = document.querySelectorAll('.tab-panel');
    tabs.forEach((t) => {
      t.addEventListener('click', () => {
        tabs.forEach((x) => x.classList.toggle('active', x === t));
        panels.forEach((p) => p.hidden = (p.dataset.panel !== t.dataset.tab));
        const active = document.querySelector(`.tab-panel[data-panel="${t.dataset.tab}"]`);
        if (active && window.matchMedia('(max-width: 1000px)').matches) {
          // Smooth-scroll just below the topnav so users see the new content.
          const top = active.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // Favorite
    const favBtn = document.getElementById('favBtn');
    favBtn?.addEventListener('click', () => {
      favBtn.classList.toggle('on');
      favBtn.textContent = favBtn.classList.contains('on') ? '♥' : '♡';
      showToast(favBtn.classList.contains('on') ? 'Saved to favorites.' : 'Removed from favorites.');
    });
  }

  // ============== GUEST PAGE ==============
  const guestForm = document.getElementById('guestForm');
  if (guestForm) {
    const b = initBooking();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('smRest', b.restName || 'Bella Suora');
    set('smDate', niceDate(b.date));
    set('smTime', niceTime(b.time));
    set('smParty', `${b.party} guest${b.party > 1 ? 's' : ''}`);
    // Cancel-by = 90min before
    const [h, m] = (b.time || '19:00').split(':').map(Number);
    const totalMin = h * 60 + m - 90;
    const ch = Math.floor(totalMin / 60), cm = totalMin % 60;
    set('smCancel', `${niceTime(`${ch}:${String(cm).padStart(2, '0')}`)} ${niceDate(b.date).split(',')[0]}`);

    const note = guestForm.querySelector('textarea[name="note"]');
    const charCount = document.getElementById('charCount');
    note?.addEventListener('input', () => {
      const len = note.value.length;
      if (len > 240) note.value = note.value.slice(0, 240);
      charCount.textContent = `${Math.min(len, 240)} / 240`;
    });

    // Disable native inline validation so we can show all errors at once
    guestForm.setAttribute('novalidate', '');

    const errSummary = document.getElementById('guestErrors');
    function validateAll() {
      const required = [
        { name: 'first', label: 'First name' },
        { name: 'last', label: 'Last name' },
        { name: 'phone', label: 'Phone' },
        { name: 'email', label: 'Email' },
      ];
      const missing = [];
      required.forEach(({ name, label }) => {
        const input = guestForm.querySelector(`[name="${name}"]`);
        if (!input) return;
        const val = (input.value || '').trim();
        const wrap = input.closest('.field');
        let valid = !!val;
        if (valid && name === 'email') {
          valid = /.+@.+\..+/.test(val);
        }
        if (!valid) {
          missing.push({ label, name });
          if (wrap) wrap.classList.add('has-error');
          input.setAttribute('aria-invalid', 'true');
        } else {
          if (wrap) wrap.classList.remove('has-error');
          input.removeAttribute('aria-invalid');
        }
      });
      return missing;
    }

    // Clear an individual error as the user fixes it
    guestForm.querySelectorAll('input[name="first"], input[name="last"], input[name="phone"], input[name="email"]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const wrap = inp.closest('.field');
        if (wrap && wrap.classList.contains('has-error') && (inp.value || '').trim()) {
          if (inp.name === 'email' && !/.+@.+\..+/.test(inp.value.trim())) return;
          wrap.classList.remove('has-error');
          inp.removeAttribute('aria-invalid');
        }
      });
    });

    guestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const missing = validateAll();
      if (missing.length) {
        if (errSummary) {
          errSummary.hidden = false;
          errSummary.innerHTML = `<strong>Please complete the highlighted ${missing.length === 1 ? 'field' : 'fields'}:</strong> ${missing.map((x) => x.label).join(', ')}.`;
          errSummary.focus?.();
          errSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      if (errSummary) errSummary.hidden = true;
      const fd = new FormData(guestForm);
      const cur = load();
      cur.first = fd.get('first'); cur.last = fd.get('last');
      cur.phone = fd.get('phone'); cur.email = fd.get('email');
      cur.diet = fd.getAll('diet');
      cur.note = fd.get('note');
      cur.occasion = fd.get('occasion');
      cur.optin = fd.get('optin') === 'on';
      save(cur);
      location.href = 'payment.html';
    });
  }

  // ============== PAYMENT / HOLD PAGE ==============
  const holdForm = document.getElementById('holdForm');
  if (holdForm) {
    const b = initBooking();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('smRest', b.restName || 'Bella Suora');
    set('smDate', niceDate(b.date));
    set('smTime', niceTime(b.time));
    set('smParty', `${b.party} guest${b.party > 1 ? 's' : ''}`);
    const holdAmt = 50 * b.party;
    set('holdAmount', `$${holdAmt}`);
    set('smHold', `$${holdAmt}`);
    const [h, m] = (b.time || '19:00').split(':').map(Number);
    const totalMin = h * 60 + m - 90;
    const ch = Math.floor(totalMin / 60), cm = totalMin % 60;
    set('holdCancelBy', `${niceTime(`${ch}:${String(cm).padStart(2, '0')}`)} ${niceDate(b.date).split(',')[0]}`);

    // Method tabs
    document.querySelectorAll('.method').forEach((m) => {
      m.querySelector('input').addEventListener('change', () => {
        document.querySelectorAll('.method').forEach((x) => x.classList.remove('active'));
        m.classList.add('active');
        const isCard = m.querySelector('input').value === 'card';
        document.getElementById('cardFields').hidden = !isCard;
        document.getElementById('walletFields').hidden = isCard;
      });
    });

    // Card formatting
    const cardNum = document.getElementById('cardNum');
    cardNum?.addEventListener('input', () => {
      const v = cardNum.value.replace(/\D/g, '').slice(0, 16);
      cardNum.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
    const cardExp = document.getElementById('cardExp');
    cardExp?.addEventListener('input', () => {
      let v = cardExp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      cardExp.value = v;
    });

    // Add-ons total
    function recalcAddons() {
      let total = 0;
      const lines = [];
      const cake = document.getElementById('addCake').checked;
      const flowers = document.getElementById('addFlowers').checked;
      const bub = document.getElementById('addBubbly').checked;
      if (cake) { total += 8; lines.push(['Birthday cake plating', '$8.00']); }
      if (flowers) { total += 5; lines.push(['Single rose', '$5.00']); }
      if (bub) { total += 12 * b.party; lines.push([`Prosecco × ${b.party}`, `$${(12 * b.party).toFixed(2)}`]); }
      const sm = document.getElementById('smAddons');
      sm.innerHTML = lines.length ? lines.map(([k, v]) => `<div class="sm-row"><span>${k}</span><strong>${v}</strong></div>`).join('') : '<span class="sm-fine">No add-ons</span>';
      document.getElementById('smTotal').textContent = `$${total.toFixed(2)}`;
    }
    document.querySelectorAll('#addCake, #addFlowers, #addBubbly').forEach((cb) => cb.addEventListener('change', recalcAddons));
    recalcAddons();

    holdForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cur = load();
      cur.addCake = document.getElementById('addCake').checked;
      cur.addFlowers = document.getElementById('addFlowers').checked;
      cur.addBubbly = document.getElementById('addBubbly').checked;
      cur.confirmRef = 'TR-' + Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
      save(cur);
      location.href = 'confirmation.html';
    });
  }

  // ============== CONFIRMATION ==============
  const cfRef = document.getElementById('cfRef');
  if (cfRef) {
    const b = load();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('cfRest', b.restName || 'Bella Suora');
    set('cfDate', niceDate(b.date));
    set('cfTime', niceTime(b.time));
    set('cfParty', `${b.party} guest${b.party > 1 ? 's' : ''}`);
    cfRef.textContent = b.confirmRef || 'TR-784521';
    if (b.email && b.phone) {
      const em = b.email;
      const ph = b.phone;
      set('cfContact', `${em} · ${ph}`);
    }
    set('cfDiet', (b.diet && b.diet.length) ? b.diet.join(', ') : 'none');
    set('cfNote', b.note ? b.note : 'no special request');

    // Wire the calendar buttons + resend so they actually do something
    function setActionStatus(id, msg) {
      const status = document.getElementById(id);
      if (!status) return;
      status.textContent = msg;
      status.hidden = false;
    }

    document.querySelectorAll('[data-cal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const which = btn.dataset.cal;
        btn.classList.add('busy');
        const orig = btn.textContent;
        btn.textContent = 'Adding…';
        btn.disabled = true;
        setTimeout(() => {
          btn.classList.remove('busy');
          btn.classList.add('done');
          btn.textContent = '✓ ' + orig;
          btn.disabled = false;
          setActionStatus('calStatus', `Added to ${which} calendar — check your inbox for the invite.`);
          showToast(`${which} calendar event ready.`);
        }, 700);
      });
    });

    const resendBtn = document.getElementById('resendBtn');
    resendBtn?.addEventListener('click', () => {
      resendBtn.disabled = true;
      const orig = resendBtn.textContent;
      resendBtn.textContent = 'Sending…';
      setTimeout(() => {
        resendBtn.textContent = '✓ Sent';
        setActionStatus('emailStatus', 'Confirmation email re-sent. Allow a minute to arrive.');
        showToast('Confirmation email re-sent.');
        setTimeout(() => {
          resendBtn.textContent = orig;
          resendBtn.disabled = false;
        }, 6000);
      }, 700);
    });

    document.getElementById('modifyBtn')?.addEventListener('click', () => {
      showToast('Opening your booking… (demo)');
      setActionStatus('modifyStatus', 'Modify is available up to 90 minutes before. (Demo — no real change made.)');
    });
    document.getElementById('cancelBtn')?.addEventListener('click', () => {
      const ok = window.confirm('Cancel this reservation? You can rebook anytime.');
      if (ok) {
        showToast('Reservation cancelled. (Demo)');
        setActionStatus('modifyStatus', 'Reservation cancelled. A confirmation email is on the way. (Demo)');
      }
    });
  }
})();
