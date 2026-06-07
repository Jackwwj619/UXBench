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
      save(b);
      location.href = 'restaurants.html';
    });
  }

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
    document.getElementById('rbEdit')?.addEventListener('click', () => location.href = 'index.html');

    const restaurants = [
      { id: 'bella',  name: 'Bella Suora',           emoji: '🍝', cuisine: 'italian',       price: 3, hood: 'pearl',       feats: ['quiet','bar'], stars: '★★★★★', rating: 4.7, reviews: 1284, blurb: 'Hand-rolled Roman pastas, wood-burning oven you can see from every seat. The carbonara uses guanciale aged on premise.', tags: ['Wine list', 'Counter seats', 'Birthday'], slots: ['6:00', '6:30', '7:00', '8:15'] },
      { id: 'tonari', name: 'Tonari',                emoji: '🍣', cuisine: 'japanese',      price: 2, hood: 'pearl',       feats: ['bar','quiet'], stars: '★★★★½', rating: 4.6, reviews: 932, blurb: '12-seat omakase + a la carte sushi counter run by Chef Ren Nakai. Limited reservations Wed–Sun.', tags: ['Omakase', 'Counter', 'Solo-friendly'], slots: ['5:45', '6:00', '8:30'] },
      { id: 'field',  name: 'Field & Hearth',        emoji: '🌿', cuisine: 'newamerican',   price: 3, hood: 'alberta',     feats: ['outdoor','vegan'], stars: '★★★★★', rating: 4.8, reviews: 2104, blurb: 'Northwest produce, six-seat chefs counter, eight-seat dining room, twenty-seat patio.', tags: ['Vegan menu', 'Patio', 'Counter'], slots: ['7:15', '8:00'] },
      { id: 'lupinus',name: 'Lupinus & Roma',        emoji: '🍷', cuisine: 'italian',       price: 3, hood: 'mississippi', feats: ['outdoor','late'], stars: '★★★★½', rating: 4.5, reviews: 678, blurb: 'Family-style Roman dinners and a wine program of 280 small-producer Italian bottles.', tags: ['Wine list', 'Family-style', 'Late'], slots: ['6:00', '6:30', '9:00'] },
      { id: 'pier',   name: 'Old Pier Smokehouse',   emoji: '🔥', cuisine: 'bbq',           price: 2, hood: 'hawthorne',   feats: ['outdoor','kid'], stars: '★★★★', rating: 4.3, reviews: 1453, blurb: '12-hour brisket, salt-cured pastrami, and a back patio with a long shared table.', tags: ['Brisket', 'Patio', 'Kid-friendly'], slots: ['5:30', '7:30'] },
      { id: 'saffron',name: 'Saffron & Stone',       emoji: '🥗', cuisine: 'mediterranean', price: 3, hood: 'division',    feats: ['quiet','vegan'], stars: '★★★★½', rating: 4.6, reviews: 980, blurb: 'A tasting-menu Mediterranean spot with a great vegetarian path. Reservations open 30 days out.', tags: ['Tasting menu', 'Quiet', 'Vegetarian'], slots: ['6:00', '7:00', '8:00'] },
      { id: 'siam',   name: 'Siam Floating Cart',    emoji: '🍛', cuisine: 'thai',          price: 1, hood: 'downtown',    feats: ['kid','late'], stars: '★★★★', rating: 4.2, reviews: 1812, blurb: 'Bangkok-style noodles in a bright corner room. Open until midnight Friday and Saturday.', tags: ['Noodles', 'Late'], slots: ['5:30', '6:00', '7:00', '8:30', '10:00'] },
      { id: 'hot',    name: 'Hot Numb Wok',          emoji: '🌶️', cuisine: 'sichuan',       price: 2, hood: 'downtown',    feats: ['late','bar'], stars: '★★★★½', rating: 4.5, reviews: 1130, blurb: 'A serious Sichuan room. Order the dry-fried green beans and the dan dan.', tags: ['Spicy', 'Late', 'Counter'], slots: ['6:30', '7:30', '9:00'] },
      { id: 'olive',  name: 'Olivewood',             emoji: '🌳', cuisine: 'mediterranean', price: 4, hood: 'pearl',       feats: ['quiet'], stars: '★★★★★', rating: 4.9, reviews: 540, blurb: 'Tasting menu only — six courses, wine pairings optional. Booking opens 60 days out.', tags: ['Tasting menu', 'Special occasion'], slots: [] },
      { id: 'green',  name: 'Greenheart Kitchen',    emoji: '🥬', cuisine: 'vegan',         price: 2, hood: 'hawthorne',   feats: ['vegan','kid','outdoor'], stars: '★★★★', rating: 4.4, reviews: 745, blurb: 'Plant-forward neighborhood spot with a backyard garden and weekend brunch.', tags: ['Vegan', 'Brunch', 'Family-friendly'], slots: ['5:30', '6:30', '7:30'] },
    ];

    let sortBy = 'relevance';
    const filterState = { cuisine: new Set(), price: new Set(), hood: new Set(), feat: new Set() };

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

      filtered.forEach((r) => {
        const row = document.createElement('div');
        row.className = 'r-row' + (r.slots.length ? '' : ' unavail');
        row.innerHTML = `
          <div class="r-photo" data-emoji="${r.emoji}"></div>
          <div class="r-body">
            <h3 class="r-name">${r.name}</h3>
            <div class="r-meta"><span class="r-stars">${r.stars}</span> ${r.rating} · ${r.reviews.toLocaleString()} reviews · ${'$'.repeat(r.price)} · ${capCuisine(r.cuisine)} · ${capHood(r.hood)}</div>
            <p class="r-blurb">${r.blurb}</p>
            <div class="r-tags">${r.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          </div>
          <div class="r-slots">
            <div class="r-slots-label">Available · ${niceDate(b.date)}</div>
            <div class="slot-grid">
              ${r.slots.length
                ? r.slots.map((s) => {
                    const targetMin = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
                    const [h, m] = s.split(':').map(Number);
                    const slotMin = h * 60 + m;
                    const cls = Math.abs(slotMin - targetMin) < 30 ? 'slot' : 'slot muted';
                    return `<button class="${cls}" data-slot="${s}">${niceTime(s)}</button>`;
                  }).join('')
                : '<button class="slot disabled" disabled>No tables</button>'}
            </div>
          </div>`;
        row.querySelectorAll('button[data-slot]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const cur = load();
            cur.restId = r.id; cur.restName = r.name; cur.restCuisine = capCuisine(r.cuisine);
            cur.restHood = capHood(r.hood); cur.restEmoji = r.emoji; cur.restStars = r.stars;
            cur.restRating = r.rating; cur.restPrice = '$'.repeat(r.price);
            const [h, m] = btn.dataset.slot.split(':');
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
      renderResults();
    });
    document.getElementById('sortBy')?.addEventListener('change', (e) => { sortBy = e.target.value; renderResults(); });

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
      partySel.addEventListener('change', () => { const cur = load(); cur.party = parseInt(partySel.value, 10); save(cur); });
    }

    // Generate slots around chosen time
    const baseSlots = ['17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
    const target = b.time || '19:00';
    slotsEl.innerHTML = '';
    baseSlots.forEach((s) => {
      const btn = document.createElement('button');
      const targetMin = parseInt(target.split(':')[0]) * 60 + parseInt(target.split(':')[1]);
      const slotMin = parseInt(s.split(':')[0]) * 60 + parseInt(s.split(':')[1]);
      const close = Math.abs(slotMin - targetMin) <= 30;
      const isUnavail = (s === '17:00' || s === '21:30') && b.restName === 'Bella Suora';
      btn.className = 'slot' + (close ? '' : ' muted') + (isUnavail ? ' disabled' : '');
      btn.textContent = niceTime(s);
      if (isUnavail) btn.disabled = true;
      btn.addEventListener('click', () => {
        const cur = load(); cur.time = s; save(cur); location.href = 'guest.html';
      });
      slotsEl.appendChild(btn);
    });

    // Tabs
    document.querySelectorAll('.rt').forEach((t) => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.rt').forEach((x) => x.classList.toggle('active', x === t));
        document.querySelectorAll('.tab-panel').forEach((p) => p.hidden = (p.dataset.panel !== t.dataset.tab));
      });
    });

    // Favorite
    const favBtn = document.getElementById('favBtn');
    favBtn?.addEventListener('click', () => {
      favBtn.classList.toggle('on');
      favBtn.textContent = favBtn.classList.contains('on') ? '♥' : '♡';
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

    guestForm.addEventListener('submit', (e) => {
      e.preventDefault();
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
    set('walletHoldAmt', `$${holdAmt}`);
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

    function showFieldError(input, errId, show) {
      const err = document.getElementById(errId);
      if (err) err.hidden = !show;
      input.classList.toggle('invalid', !!show);
      input.setAttribute('aria-invalid', show ? 'true' : 'false');
    }

    function validateCardFields() {
      const method = (document.querySelector('input[name="method"]:checked') || {}).value;
      if (method !== 'card') return true;
      const checks = [
        ['cardNum', 'cardNumErr', (v) => /^(\d[ ]?){13,19}$/.test(v) && v.replace(/\D/g, '').length >= 13],
        ['cardExp', 'cardExpErr', (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v)],
        ['cardCvc', 'cardCvcErr', (v) => /^\d{3,4}$/.test(v)],
        ['cardZip', 'cardZipErr', (v) => /^[A-Za-z0-9 \-]{3,10}$/.test(v.trim())],
      ];
      let firstInvalid = null;
      checks.forEach(([id, errId, ok]) => {
        const input = document.getElementById(id);
        if (!input) return;
        const valid = ok(input.value);
        showFieldError(input, errId, !valid);
        if (!valid && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }

    ['cardNum','cardExp','cardCvc','cardZip'].forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          const errId = id + 'Err';
          showFieldError(input, errId, false);
        }
      });
    });

    holdForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCardFields()) return;
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

    const modal = document.getElementById('cfModal');
    const modalTitle = document.getElementById('cfModalTitle');
    const modalBody = document.getElementById('cfModalBody');
    const modalConfirm = document.getElementById('cfModalConfirm');
    const cancelBtn = document.getElementById('cfCancelBtn');
    const modifyBtn = document.getElementById('cfModifyBtn');
    let mode = null;

    const openModal = (kind) => {
      if (!modal) return;
      mode = kind;
      if (kind === 'cancel') {
        modalTitle.textContent = 'Cancel reservation?';
        modalBody.textContent = `This will release your table at ${b.restName || 'Bella Suora'} on ${niceDate(b.date)} at ${niceTime(b.time)}. Cancelling now is free — your card hold will be released within 5 business days.`;
        modalConfirm.textContent = 'Cancel reservation';
        modalConfirm.classList.remove('btn-primary');
        modalConfirm.classList.add('btn-danger');
      } else {
        modalTitle.textContent = 'Modify reservation';
        modalBody.textContent = 'You can change your party size, date, or time. We\'ll take you back to the time picker — your guest details and add-ons stay saved.';
        modalConfirm.textContent = 'Continue to edit';
        modalConfirm.classList.remove('btn-danger');
        modalConfirm.classList.add('btn-primary');
      }
      modal.hidden = false;
      document.body.classList.add('cf-modal-open');
    };
    const closeModal = () => {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove('cf-modal-open');
    };

    cancelBtn?.addEventListener('click', () => openModal('cancel'));
    modifyBtn?.addEventListener('click', () => openModal('modify'));
    modal?.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && !modal.hidden) closeModal(); });
    modalConfirm?.addEventListener('click', () => {
      if (mode === 'cancel') {
        sessionStorage.removeItem(KEY);
        modalTitle.textContent = 'Reservation cancelled';
        modalBody.textContent = 'Your table has been released and your card hold will drop off within 5 business days. A confirmation has been emailed.';
        modalConfirm.textContent = 'Back to discover';
        mode = 'cancelled';
      } else if (mode === 'modify') {
        location.href = 'restaurant.html';
      } else if (mode === 'cancelled') {
        location.href = 'index.html';
      }
    });
  }
})();
