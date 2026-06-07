const STORAGE = "orbit-booking-v1";
let booking = JSON.parse(sessionStorage.getItem(STORAGE) || "{}");

function save(){ sessionStorage.setItem(STORAGE, JSON.stringify(booking)); }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return [...(r||document).querySelectorAll(s)]; }
function fmt(n){ return "$" + n.toFixed(2); }

const TRIPS = [
  {id:"t1", car:"OrbitRide Express",  dep:"06:40", arr:"13:00", dur:"6h 20m", stops:1, amen:["wifi","power"],          price:34, seatsLeft:14},
  {id:"t2", car:"Comet Coach",        dep:"08:15", arr:"14:55", dur:"6h 40m", stops:2, amen:["wifi","restroom"],       price:29, seatsLeft:6},
  {id:"t3", car:"OrbitRide Direct",   dep:"10:00", arr:"16:00", dur:"6h 00m", stops:0, amen:["wifi","power","express"],price:44, seatsLeft:9},
  {id:"t4", car:"OrbitRide Express",  dep:"12:30", arr:"19:10", dur:"6h 40m", stops:1, amen:["wifi"],                  price:32, seatsLeft:22},
  {id:"t5", car:"Nightline",          dep:"14:50", arr:"21:15", dur:"6h 25m", stops:1, amen:["wifi","restroom","power"],price:38, seatsLeft:11},
  {id:"t6", car:"Comet Coach",        dep:"17:30", arr:"00:05", dur:"6h 35m", stops:2, amen:["wifi"],                  price:26, seatsLeft:3},
  {id:"t7", car:"OrbitRide Direct",   dep:"19:00", arr:"01:00", dur:"6h 00m", stops:0, amen:["wifi","power","express"],price:48, seatsLeft:18},
  {id:"t8", car:"Nightline Sleeper",  dep:"23:15", arr:"05:55", dur:"6h 40m", stops:1, amen:["wifi","restroom"],       price:42, seatsLeft:8},
];

const PROMOS = {
  "STUDENT10": {label:"Student 10% off", apply: t => t * 0.9},
  "FIRSTRIDE": {label:"$5 off first ride", apply: t => Math.max(0, t - 5)},
  "FAMILYPACK": {label:"Family 15% off (3+ passengers)", apply: (t, ctx) => ctx.pax >= 3 ? t * 0.85 : t},
};

function readSearch(){
  const qs = new URLSearchParams(window.location.search);
  const obj = {from:qs.get("from"), to:qs.get("to"), date:qs.get("date"), passengers:+qs.get("passengers") || 2};
  if(!obj.from){ const s = new URLSearchParams(sessionStorage.getItem("orbit-search") || ""); obj.from=s.get("from");obj.to=s.get("to");obj.date=s.get("date");obj.passengers=+s.get("passengers")||2; }
  return obj;
}

function renderRoutes(){
  const search = readSearch();
  booking.search = search; save();
  const pill = $("#searchPill");
  if(pill) pill.textContent = `${search.from} → ${search.to} · ${search.date} · ${search.passengers} passenger${search.passengers>1?"s":""}`;

  const baseDate = new Date(search.date || Date.now());
  const strip = $("#dateStrip");
  for(let i=-3;i<=3;i++){
    const d = new Date(baseDate); d.setDate(d.getDate()+i);
    const iso = d.toISOString().slice(0,10);
    const dayShort = d.toLocaleDateString("en-US",{weekday:"short", month:"short", day:"numeric"});
    const active = iso === search.date;
    strip.innerHTML += `<div class="date-pill ${active?"active":""}" data-d="${iso}"><strong>${dayShort}</strong><span class="d">from $${22+Math.abs(i)*3}</span></div>`;
  }
  $$(".date-pill").forEach(p => p.addEventListener("click", () => {
    booking.search.date = p.dataset.d; save();
    const q = new URLSearchParams({...search, date:p.dataset.d});
    window.location.search = "?" + q;
  }));

  const time = $("#timeFilter");
  const price = $("#priceFilter");
  const amCheckboxes = $$("[data-am]");

  function isNextDay(dep, arr){
    const dh = +dep.split(":")[0];
    const ah = +arr.split(":")[0];
    return ah < dh;
  }

  function activeFilterCount(){
    let n = 0;
    if(time.value !== "any") n++;
    if(+price.value < +price.max) n++;
    n += amCheckboxes.filter(c => c.checked).length;
    return n;
  }

  function applyFilters(){
    const timeVal = time.value;
    const priceMax = +price.value; $("#priceLbl").textContent = "$" + priceMax;
    const ams = amCheckboxes.filter(c => c.checked).map(c => c.dataset.am);
    const list = TRIPS.filter(t => {
      const h = +t.dep.split(":")[0];
      if(timeVal === "morning" && (h < 5 || h >= 12)) return false;
      if(timeVal === "afternoon" && (h < 12 || h >= 18)) return false;
      if(timeVal === "evening" && (h < 18)) return false;
      if(t.price > priceMax) return false;
      if(!ams.every(a => t.amen.includes(a))) return false;
      return true;
    });
    $("#resultsList").innerHTML = list.length === 0 ? `<p style="padding:20px;color:#5A5266">No trips match these filters.</p>` :
      list.map(t => {
        const nextDay = isNextDay(t.dep, t.arr);
        const arrLabel = nextDay ? `${t.arr}<sup class="next-day" title="Arrives next day">+1</sup>` : t.arr;
        return `
      <div class="result-row">
        <div class="car">${t.car}<small>${t.stops === 0 ? "Direct" : t.stops + " stop"+(t.stops>1?"s":"")}</small></div>
        <div class="times">${t.dep} → ${arrLabel}<span class="dur">${t.dur}${nextDay ? " · arrives next day" : ""}</span></div>
        <div class="am">${t.amen.map(a => `<span>${a}</span>`).join("")}</div>
        <div class="price-col">
          <div class="p">$${t.price}</div>
          ${t.seatsLeft < 8 ? `<div class="left">${t.seatsLeft} seats left</div>` : ""}
          <button class="btn-primary" data-pick="${t.id}">Select</button>
        </div>
      </div>`;
      }).join("");
    $$("[data-pick]").forEach(b => b.addEventListener("click", () => {
      const t = TRIPS.find(x => x.id === b.dataset.pick);
      booking.trip = t; save();
      window.location.href = "seats.html";
    }));
    const fc = $("#filterCount");
    if(fc){
      const n = activeFilterCount();
      if(n > 0){ fc.hidden = false; fc.textContent = n; }
      else { fc.hidden = true; }
    }
  }
  time.addEventListener("change", applyFilters);
  price.addEventListener("input", applyFilters);
  amCheckboxes.forEach(c => c.addEventListener("change", applyFilters));

  const reset = $("#resetFilters");
  if(reset) reset.addEventListener("click", () => {
    time.value = "any";
    price.value = price.max;
    amCheckboxes.forEach(c => c.checked = false);
    applyFilters();
  });

  const ft = $("#filterToggle");
  const fp = $("#filtersPanel");
  if(ft && fp){
    ft.addEventListener("click", () => {
      const open = fp.classList.toggle("open");
      ft.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  applyFilters();
}

function buildSeatLayout(){
  const seats = [];
  const occupied = new Set(["3A","5B","6C","9A","12D","14B","18C","20A","P2","B3"]);
  for(let row=1; row<=11; row++){
    ["A","B"].forEach(c => seats.push({id:`${row}${c}`, row, col:c, side:"left", win:c==="A", occupied:occupied.has(`${row}${c}`)}));
    ["C","D"].forEach(c => seats.push({id:`${row}${c}`, row, col:c, side:"right", win:c==="D", occupied:occupied.has(`${row}${c}`)}));
  }
  return seats;
}

function renderSeats(){
  if(!booking.trip){ window.location.href = "index.html"; return; }
  startLockTimer();
  const pax = booking.search.passengers;
  $("#needSeats").textContent = pax;
  $("#base").textContent = fmt(booking.trip.price * pax);

  booking.seats = booking.seats || [];

  const seats = buildSeatLayout();
  const svg = $("#busSvg");
  const seatW = 38, seatH = 30, gap = 6;
  const colXs = {A:36, B:90, C:226, D:280};
  let svgHtml = `<rect x="20" y="14" width="340" height="40" rx="10" fill="#FFF" stroke="#5B2C6F" stroke-width="1.6"/>
    <text x="180" y="38" text-anchor="middle" class="driver">— Driver —</text>
    <text x="48" y="38" class="driver">↓ FRONT</text>`;
  ["P1","P2"].forEach((id, i) => {
    const x = colXs.A + i * 60;
    const occ = id === "P2";
    svgHtml += seatSvg(id, x, 70, true, occ);
  });
  seats.forEach(s => {
    const y = 110 + (s.row - 1) * (seatH + gap);
    svgHtml += seatSvg(s.id, colXs[s.col], y, false, s.occupied);
  });
  ["B1","B2","B3","B4","B5"].forEach((id, i) => {
    svgHtml += seatSvg(id, 36 + i * 60, 480, false, id === "B3");
  });
  svgHtml += `<text x="180" y="528" text-anchor="middle" class="driver">— Back row —</text>`;
  svg.innerHTML = svgHtml;
  function seatSvg(id, x, y, priority, occupied){
    const cls = ["seat"]; if(priority) cls.push("priority"); if(occupied) cls.push("occupied"); if(booking.seats.includes(id)) cls.push("selected");
    return `<g class="${cls.join(" ")}" data-id="${id}" transform="translate(${x},${y})">
      <rect width="${seatW}" height="${seatH}" rx="4"/>
      <text x="${seatW/2}" y="${seatH/2 - 4}" class="lab">${id}</text>
      <text x="${seatW/2}" y="${seatH/2 + 8}" class="lab" style="font-size:7px">${priority?"P":(["A","D"].includes(id.slice(-1)) ? "W" : "A")}</text>
    </g>`;
  }
  $$(".seat", svg).forEach(g => g.addEventListener("click", () => {
    if(g.classList.contains("occupied")) return;
    const id = g.dataset.id;
    const idx = booking.seats.indexOf(id);
    if(idx >= 0){ booking.seats.splice(idx, 1); g.classList.remove("selected"); }
    else {
      if(booking.seats.length >= pax){ alert(`You can select up to ${pax} seats.`); return; }
      booking.seats.push(id); g.classList.add("selected");
    }
    save(); updateSeatSide();
  }));
  updateSeatSide();
}

function updateSeatSide(){
  const pax = booking.search.passengers;
  const ul = $("#selSeats");
  ul.innerHTML = booking.seats.length === 0 ? "<li>No seats selected</li>" : booking.seats.map(id => `<li>Seat ${id}</li>`).join("");
  const seatFee = booking.seats.length * 4;
  $("#seatsCost").textContent = fmt(seatFee);
  $("#subtotal").textContent = fmt(booking.trip.price * pax + seatFee);
  const btn = $("#continueBtn");
  btn.disabled = booking.seats.length !== pax;
  btn.onclick = () => { window.location.href = "extras.html"; };
}

function renderExtras(){
  if(!booking.trip){ window.location.href = "index.html"; return; }
  startLockTimer();
  const pax = booking.search.passengers;
  booking.luggage = booking.luggage || Array.from({length:pax}, () => ({carryOn:1, checked:0, oversized:0}));
  booking.addons = booking.addons || {};

  const FIELD_LABEL = {carryOn:"Carry-on bags", checked:"Checked bags", oversized:"Oversized bags"};
  $("#luggageBlock").innerHTML = booking.luggage.map((l, i) => `
    <div class="lug-row"><div class="name">Passenger ${i+1}</div>
      <div class="label">Carry-on (free)</div>${stepper(`carryOn-${i}`, l.carryOn, 0, 1, i+1)}
    </div>
    <div class="lug-row"><div></div><div class="label">Checked bags</div>${stepper(`checked-${i}`, l.checked, 0, 4, i+1)}<div class="label">$9 / $14 / $14…</div></div>
    <div class="lug-row"><div></div><div class="label">Oversized</div>${stepper(`oversized-${i}`, l.oversized, 0, 2, i+1)}<div class="label">$24 each</div></div>
  `).join("");
  function stepper(key, val, min, max, paxIdx){
    const [field] = key.split("-");
    const lbl = `${FIELD_LABEL[field]} for Passenger ${paxIdx}`;
    return `<div class="lug-stepper" data-key="${key}">
      <button type="button" data-d="-1" aria-label="Decrease ${lbl}">−</button>
      <input type="number" value="${val}" min="${min}" max="${max}" data-min="${min}" data-max="${max}" aria-label="${lbl}" inputmode="numeric">
      <button type="button" data-d="1" aria-label="Increase ${lbl}">+</button>
    </div>`;
  }
  $$(".lug-stepper").forEach(s => {
    const inp = s.querySelector("input");
    function commit(v){
      v = Math.max(+inp.dataset.min, Math.min(+inp.dataset.max, isNaN(v) ? 0 : v));
      inp.value = v;
      const [field, idx] = s.dataset.key.split("-");
      booking.luggage[+idx][field] = v;
      save(); updateExtrasSummary();
    }
    s.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      commit(+inp.value + +b.dataset.d);
    }));
    inp.addEventListener("input", () => commit(parseInt(inp.value, 10)));
    inp.addEventListener("blur", () => commit(parseInt(inp.value, 10)));
  });
  $$("[data-ad]").forEach(c => {
    c.checked = !!booking.addons[c.dataset.ad];
    c.addEventListener("change", () => { booking.addons[c.dataset.ad] = c.checked; save(); updateExtrasSummary(); });
  });

  $("#continueBtn").addEventListener("click", () => { window.location.href = "passengers.html"; });
  updateExtrasSummary();
}

function calcLuggage(){
  let cost = 0;
  if(!booking.luggage) return 0;
  booking.luggage.forEach(l => {
    if(l.checked === 1) cost += 9;
    else if(l.checked >= 2) cost += 9 + (l.checked - 1) * 14;
    cost += l.oversized * 24;
  });
  return cost;
}
function calcAddons(){
  let cost = 0;
  if(booking.addons?.insurance) cost += 4.5 * booking.search.passengers;
  if(booking.addons?.priority) cost += 3;
  if(booking.addons?.sms) cost += 1.5;
  return cost;
}

function tripSubtotal(){
  const pax = booking.search.passengers;
  const base = (booking.trip?.price || 0) * pax;
  const seats = (booking.seats?.length || 0) * 4;
  return base + seats + calcLuggage() + calcAddons();
}

function summaryLines(){
  const pax = booking.search.passengers;
  const lines = [];
  lines.push([`${booking.trip.car} · ${pax} × $${booking.trip.price}`, fmt(booking.trip.price * pax)]);
  if(booking.seats?.length) lines.push([`Seats (${booking.seats.join(", ")})`, fmt(booking.seats.length * 4)]);
  const lug = calcLuggage(); if(lug > 0) lines.push(["Luggage", fmt(lug)]);
  if(booking.addons?.insurance) lines.push(["Travel insurance", fmt(4.5 * pax)]);
  if(booking.addons?.priority) lines.push(["Priority boarding", fmt(3)]);
  if(booking.addons?.sms) lines.push(["Tracking SMS", fmt(1.5)]);
  return lines;
}

function updateExtrasSummary(){
  const lines = summaryLines();
  const sum = $("#sumLines");
  if(sum) sum.innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
  const total = tripSubtotal();
  const g = $("#grand"); if(g) g.textContent = fmt(total);
}

function renderPassengers(){
  if(!booking.trip){ window.location.href = "index.html"; return; }
  startLockTimer();
  const pax = booking.search.passengers;
  booking.passengers = booking.passengers || Array.from({length:pax}, () => ({first:"",last:"",dob:"",email:"",phone:"",student:"",notes:""}));
  $("#paxBlock").innerHTML = booking.passengers.map((p, i) => `
    <div class="pax-card" data-i="${i}">
      <h3>Passenger ${i+1}${i===0?" (booking contact)":""}</h3>
      <p class="pax-sub">${i===0?"Required fields are marked with <span class=\"req\">*</span>.":"Required identity fields are marked with <span class=\"req\">*</span>. Contact details are optional and will be copied from Passenger 1 if left blank."}</p>
      <div class="row">
        <label data-field="first">First name <span class="req">*</span><input data-f="first" value="${p.first}" required aria-required="true"><span class="field-error"></span></label>
        <label data-field="last">Last name <span class="req">*</span><input data-f="last" value="${p.last}" required aria-required="true"><span class="field-error"></span></label>
        <label data-field="dob">Date of birth <span class="req">*</span><input type="date" data-f="dob" value="${p.dob}" required aria-required="true"><span class="field-error"></span></label>
        <label>Student ID (optional)<input data-f="student" value="${p.student}"></label>
        ${i===0
          ? `<label data-field="email">Email <span class="req">*</span><input type="email" data-f="email" value="${p.email}" required aria-required="true"><span class="field-error"></span></label><label data-field="phone">Phone <span class="req">*</span><input type="tel" data-f="phone" value="${p.phone}" required aria-required="true"><span class="field-error"></span></label>`
          : `<label>Email (optional)<input type="email" data-f="email" value="${p.email}"></label><label>Phone (optional)<input type="tel" data-f="phone" value="${p.phone}"></label>`
        }
      </div>
      ${i>0?'<button class="copy-link" type="button">Copy contact from passenger 1 (email & phone)</button>':""}
      <label style="display:block;margin-top:8px">Accessibility needs (optional)<textarea data-f="notes" rows="2">${p.notes}</textarea></label>
    </div>
  `).join("");
  const banner = document.createElement("div");
  banner.id = "paxErrorBanner";
  banner.className = "form-error-banner";
  banner.setAttribute("role","alert");
  banner.hidden = true;
  banner.textContent = "Please complete the highlighted required fields.";
  $("#paxBlock").parentNode.insertBefore(banner, $("#paxBlock"));
  $$(".pax-card").forEach(card => {
    const i = +card.dataset.i;
    card.querySelectorAll("[data-f]").forEach(el => el.addEventListener("input", () => {
      booking.passengers[i][el.dataset.f] = el.value; save();
      const lbl = el.closest("label");
      if(lbl){ lbl.classList.remove("has-error"); const err = lbl.querySelector(".field-error"); if(err) err.textContent = ""; }
    }));
    const copy = card.querySelector(".copy-link");
    if(copy) copy.addEventListener("click", () => {
      booking.passengers[i].email = booking.passengers[0].email;
      booking.passengers[i].phone = booking.passengers[0].phone;
      save(); renderPassengers();
    });
  });
  updateExtrasSummary();
  $("#continueBtn").addEventListener("click", () => {
    let firstBad = null;
    booking.passengers.forEach((p, i) => {
      const card = document.querySelector(`.pax-card[data-i="${i}"]`);
      if(!card) return;
      const required = ["first","last","dob"];
      if(i===0) required.push("email","phone");
      required.forEach(f => {
        const lbl = card.querySelector(`label[data-field="${f}"]`);
        if(!lbl) return;
        const inp = lbl.querySelector(`[data-f="${f}"]`);
        const err = lbl.querySelector(".field-error");
        const val = (p[f]||"").trim();
        let ok = !!val;
        if(ok && f === "email") ok = /.+@.+\..+/.test(val);
        if(ok && f === "dob") ok = !!val;
        if(!ok){
          lbl.classList.add("has-error");
          if(err) err.textContent = f === "email" ? "Enter a valid email" : "Required";
          if(!firstBad) firstBad = inp;
        } else {
          lbl.classList.remove("has-error");
          if(err) err.textContent = "";
        }
      });
    });
    const banner = $("#paxErrorBanner");
    if(firstBad){
      if(banner) banner.hidden = false;
      firstBad.focus();
      firstBad.scrollIntoView({behavior:"smooth", block:"center"});
      return;
    }
    if(banner) banner.hidden = true;
    window.location.href = "payment.html";
  });
}

function renderPayment(){
  if(!booking.trip){ window.location.href = "index.html"; return; }
  startLockTimer();
  updateExtrasSummary();
  $("#payAmount").textContent = fmt(tripSubtotal());

  const promoMsg = $("#promoMsg");
  $("#applyPromo").addEventListener("click", () => {
    const code = $("#promo").value.trim().toUpperCase();
    const p = PROMOS[code];
    if(!p){ promoMsg.textContent = "Promo code not recognized."; promoMsg.className = "err"; booking.promo = null; save(); updateExtrasSummary(); $("#payAmount").textContent = fmt(tripSubtotal()); return; }
    booking.promo = code;
    promoMsg.textContent = `Applied: ${p.label}`; promoMsg.className = "ok";
    save(); rerenderSummary();
  });
  function rerenderSummary(){
    const base = tripSubtotal();
    const code = booking.promo;
    let total = base, discount = 0;
    if(code){
      const after = PROMOS[code].apply(base, {pax: booking.search.passengers});
      discount = base - after; total = after;
    }
    const lines = summaryLines();
    const fee = total * 0.03 + 0.3;
    if(discount > 0) lines.push([`Promo (${code})`, "−" + fmt(discount)]);
    lines.push(["Processing fee", fmt(fee)]);
    $("#sumLines").innerHTML = lines.map(([l,r]) => `<li><span>${l}</span><span>${r}</span></li>`).join("");
    const grand = total + fee;
    $("#grand").textContent = fmt(grand);
    $("#payAmount").textContent = fmt(grand);
  }
  rerenderSummary();

  ["cExp","cNum","cCvc","cZip"].forEach(id => {
    $("#"+id).addEventListener("input", e => {
      let v = e.target.value.replace(/[^\d]/g,"");
      if(id === "cNum") v = v.slice(0,16).match(/.{1,4}/g)?.join(" ") || "";
      else if(id === "cExp") v = v.slice(0,4).replace(/^(\d{2})(\d{1,2})$/,"$1/$2");
      else if(id === "cCvc") v = v.slice(0,4);
      else if(id === "cZip") v = v.slice(0,5);
      e.target.value = v;
      clearFieldError(id);
    });
  });
  ["cName"].forEach(id => $("#"+id).addEventListener("input", () => clearFieldError(id)));

  function clearFieldError(id){
    const inp = $("#"+id); if(!inp) return;
    inp.classList.remove("invalid");
    const lbl = inp.closest("label"); if(lbl) lbl.classList.remove("has-error");
    const err = $("#err"+id.slice(1)); if(err) err.textContent = "";
  }
  function setFieldError(id, msg){
    const inp = $("#"+id); if(!inp) return;
    inp.classList.add("invalid");
    const lbl = inp.closest("label"); if(lbl) lbl.classList.add("has-error");
    const err = $("#err"+id.slice(1)); if(err) err.textContent = msg;
  }

  function selectedMethod(){
    const r = document.querySelector("input[name=pm]:checked");
    return r ? r.value : "card";
  }
  function updatePaymentMethodUI(){
    const m = selectedMethod();
    const cardForm = $("#cardForm");
    const wallet = $("#walletInfo");
    const wMsg = $("#walletMsg");
    if(m === "card"){
      cardForm.hidden = false;
      wallet.hidden = true;
    } else {
      cardForm.hidden = true;
      wallet.hidden = false;
      wMsg.textContent = m === "paypal"
        ? "You'll be redirected to PayLite to complete payment securely. No card details needed here."
        : "You'll confirm with Apple-Pay-like on the next step. No card details needed here.";
      ["cName","cNum","cExp","cCvc","cZip"].forEach(clearFieldError);
      $("#payErrorBanner").hidden = true;
    }
  }
  $$("input[name=pm]").forEach(r => r.addEventListener("change", updatePaymentMethodUI));
  updatePaymentMethodUI();

  function validateCard(){
    let firstBad = null;
    const checks = [
      ["cName", $("#cName").value.trim().length >= 2, "Cardholder name is required"],
      ["cNum",  $("#cNum").value.replace(/\s/g,"").length >= 13, "Enter a valid card number"],
      ["cExp",  /^\d{2}\/\d{2}$/.test($("#cExp").value), "Expiry must be MM/YY"],
      ["cCvc",  /^\d{3,4}$/.test($("#cCvc").value), "CVC must be 3 or 4 digits"],
      ["cZip",  /^\d{4,5}$/.test($("#cZip").value), "Billing zip is required"],
    ];
    checks.forEach(([id, ok, msg]) => {
      if(ok) clearFieldError(id);
      else { setFieldError(id, msg); if(!firstBad) firstBad = id; }
    });
    return firstBad;
  }

  $("#payBtn").addEventListener("click", () => {
    const m = selectedMethod();
    if(m === "card"){
      const firstBad = validateCard();
      if(firstBad){
        $("#payErrorBanner").hidden = false;
        const el = $("#"+firstBad);
        if(el){ el.focus(); el.scrollIntoView({behavior:"smooth", block:"center"}); }
        return;
      }
      $("#payErrorBanner").hidden = true;
    }
    booking.ref = "OR-" + Math.random().toString(36).slice(2,8).toUpperCase();
    booking.paidAt = new Date().toISOString();
    booking.paymentMethod = m;
    save();
    window.location.href = "confirmation.html";
  });
}

function renderConfirmation(){
  if(!booking.trip){ window.location.href = "index.html"; return; }
  $("#ref").textContent = booking.ref || "OR-XXXXXX";
  const search = booking.search;
  $("#ticketInfo").innerHTML = `<dl>
    <dt>From</dt><dd>${search.from}</dd>
    <dt>To</dt><dd>${search.to}</dd>
    <dt>Date</dt><dd>${search.date}</dd>
    <dt>Departure</dt><dd>${booking.trip.dep} (${booking.trip.car})</dd>
    <dt>Seats</dt><dd>${(booking.seats||[]).join(", ") || "Not assigned"}</dd>
    <dt>Passengers</dt><dd>${(booking.passengers||[]).map(p => `${p.first} ${p.last}`).join(", ")}</dd>
  </dl>`;
}

function startLockTimer(){
  if(window._lockStarted) return;
  window._lockStarted = true;
  let total = 600;
  const tick = () => {
    if(total <= 0){
      alert("Your reservation expired. Prices may have changed — please re-select.");
      window.location.href = "routes.html";
      return;
    }
    const m = Math.floor(total/60), s = total % 60;
    const min = $("#lockMin"), sec = $("#lockSec");
    if(min) min.textContent = String(m).padStart(2,"0");
    if(sec) sec.textContent = String(s).padStart(2,"0");
    total--;
  };
  tick(); setInterval(tick, 1000);
}
