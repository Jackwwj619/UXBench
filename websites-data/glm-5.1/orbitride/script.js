const STORAGE = "orbit-booking-v1";
let booking = JSON.parse(sessionStorage.getItem(STORAGE) || "{}");

function save(){ sessionStorage.setItem(STORAGE, JSON.stringify(booking)); }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return [...(r||document).querySelectorAll(s)]; }
function fmt(n){ return "$" + n.toFixed(2); }
function showToast(msg){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

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
      list.map(t => `
      <div class="result-row">
        <div class="car">${t.car}<small>${t.stops === 0 ? "Direct" : t.stops + " stop"+(t.stops>1?"s":"")}</small></div>
        <div class="times">${t.dep} → ${t.arr}<span class="dur">${t.dur}</span></div>
        <div class="am">${t.amen.map(a => `<span>${a}</span>`).join("")}</div>
        <div class="price-col">
          <div class="p">$${t.price}</div>
          ${t.seatsLeft < 8 ? `<div class="left">${t.seatsLeft} seats left</div>` : ""}
          <button class="btn-primary" data-pick="${t.id}">Select</button>
        </div>
      </div>`).join("");
    $$("[data-pick]").forEach(b => b.addEventListener("click", () => {
      const t = TRIPS.find(x => x.id === b.dataset.pick);
      booking.trip = t; save();
      window.location.href = "seats.html";
    }));
  }
  time.addEventListener("change", applyFilters);
  price.addEventListener("input", applyFilters);
  amCheckboxes.forEach(c => c.addEventListener("change", applyFilters));
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

  $("#luggageBlock").innerHTML = booking.luggage.map((l, i) => `
    <div class="lug-row"><div class="name">Passenger ${i+1}</div>
      <div class="label">Carry-on (free)</div>${stepper(`carryOn-${i}`, l.carryOn, 0, 1, `Passenger ${i+1} carry-on quantity`)}
    </div>
    <div class="lug-row"><div></div><div class="label">Checked bags</div>${stepper(`checked-${i}`, l.checked, 0, 4, `Passenger ${i+1} checked bags quantity`)}<div class="label">$9 / $14 / $14…</div></div>
    <div class="lug-row"><div></div><div class="label">Oversized</div>${stepper(`oversized-${i}`, l.oversized, 0, 2, `Passenger ${i+1} oversized bags quantity`)}<div class="label">$24 each</div></div>
  `).join("");
  function stepper(key, val, min, max, label){
    return `<div class="lug-stepper" data-key="${key}">
      <button data-d="-1" type="button" aria-label="Decrease ${label}">−</button>
      <input value="${val}" data-min="${min}" data-max="${max}" readonly aria-label="${label}" aria-live="polite">
      <button data-d="1" type="button" aria-label="Increase ${label}">+</button>
    </div>`;
  }
  $$(".lug-stepper").forEach(s => {
    const inp = s.querySelector("input");
    s.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      const v = Math.max(+inp.dataset.min, Math.min(+inp.dataset.max, +inp.value + +b.dataset.d));
      inp.value = v;
      const [field, idx] = s.dataset.key.split("-");
      booking.luggage[+idx][field] = v;
      save(); updateExtrasSummary();
    }));
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
      <div class="row">
        <label>First name<input data-f="first" value="${p.first}"></label>
        <label>Last name<input data-f="last" value="${p.last}"></label>
        <label>Date of birth<input type="date" data-f="dob" value="${p.dob}"></label>
        <label>Student ID (optional)<input data-f="student" value="${p.student}"></label>
        ${i===0
          ? `<label>Email<input type="email" data-f="email" value="${p.email}"></label><label>Phone<input type="tel" data-f="phone" value="${p.phone}"></label>`
          : `<label>Email (optional)<input type="email" data-f="email" value="${p.email}"></label><label>Phone (optional)<input type="tel" data-f="phone" value="${p.phone}"></label>`}
      </div>
      ${i>0?'<button class="copy-link" type="button">Copy contact from passenger 1</button>':""}
      <label style="display:block;margin-top:8px">Accessibility needs (optional)<textarea data-f="notes" rows="2">${p.notes}</textarea></label>
    </div>
  `).join("");
  $$(".pax-card").forEach(card => {
    const i = +card.dataset.i;
    card.querySelectorAll("[data-f]").forEach(el => el.addEventListener("input", () => {
      booking.passengers[i][el.dataset.f] = el.value; save();
    }));
    const copy = card.querySelector(".copy-link");
    if(copy) copy.addEventListener("click", () => {
      const src = booking.passengers[0];
      if(!src.email && !src.phone){
        showToast("Add an email or phone to passenger 1 first");
        return;
      }
      booking.passengers[i].email = src.email || "";
      booking.passengers[i].phone = src.phone || "";
      save();
      const emailInp = card.querySelector('[data-f="email"]');
      const phoneInp = card.querySelector('[data-f="phone"]');
      if(emailInp) emailInp.value = booking.passengers[i].email;
      if(phoneInp) phoneInp.value = booking.passengers[i].phone;
      [emailInp, phoneInp].filter(Boolean).forEach(el => {
        el.style.transition = "background 0.3s ease";
        el.style.background = "#FEF3C7";
        setTimeout(() => { el.style.background = ""; }, 800);
      });
      showToast("Contact copied from passenger 1");
    });
  });
  updateExtrasSummary();
  $("#continueBtn").addEventListener("click", () => {
    const missing = booking.passengers.find(p => !p.first || !p.last);
    if(missing){ alert("First and last name required for every passenger."); return; }
    if(!booking.passengers[0].email){ alert("Booking contact email is required."); return; }
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
    const el = $("#"+id);
    el.addEventListener("input", e => {
      let v = e.target.value.replace(/[^\d]/g,"");
      if(id === "cNum") v = v.slice(0,16).match(/.{1,4}/g)?.join(" ") || "";
      else if(id === "cExp"){
        v = v.slice(0,4);
        if(v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
      }
      else if(id === "cCvc") v = v.slice(0,4);
      else if(id === "cZip") v = v.slice(0,5);
      e.target.value = v;
      clearFieldError(el);
    });
  });
  ["cName","cNum","cExp","cCvc","cZip"].forEach(id => {
    $("#"+id).addEventListener("input", () => clearFieldError($("#"+id)));
  });

  function clearFieldError(el){
    el.classList.remove("input-error");
    const lab = el.closest("label");
    const err = lab && lab.querySelector(".field-error");
    if(err) err.remove();
  }
  function setFieldError(el, msg){
    el.classList.add("input-error");
    const lab = el.closest("label");
    if(!lab) return;
    let err = lab.querySelector(".field-error");
    if(!err){ err = document.createElement("span"); err.className = "field-error"; lab.appendChild(err); }
    err.textContent = msg;
  }

  $("#payBtn").addEventListener("click", () => {
    const method = document.querySelector('input[name="pm"]:checked')?.value || "card";
    if(method !== "card"){
      booking.ref = "OR-" + Math.random().toString(36).slice(2,8).toUpperCase();
      booking.paidAt = new Date().toISOString();
      save();
      window.location.href = "confirmation.html";
      return;
    }
    let firstBad = null;
    const checks = [
      ["cName", v => v.trim().length >= 2, "Enter the cardholder name"],
      ["cNum",  v => v.replace(/\s/g,"").length >= 13, "Enter a valid card number"],
      ["cExp",  v => /^\d{2}\/\d{2}$/.test(v) && +v.slice(0,2) >= 1 && +v.slice(0,2) <= 12, "Use MM/YY format"],
      ["cCvc",  v => /^\d{3,4}$/.test(v), "Enter a 3 or 4 digit CVC"],
      ["cZip",  v => v.trim().length >= 3, "Enter a billing zip"],
    ];
    checks.forEach(([id, ok, msg]) => {
      const el = $("#"+id);
      if(!ok(el.value)){ setFieldError(el, msg); if(!firstBad) firstBad = el; }
      else clearFieldError(el);
    });
    if(firstBad){ firstBad.focus(); firstBad.scrollIntoView({behavior:"smooth", block:"center"}); return; }
    booking.ref = "OR-" + Math.random().toString(36).slice(2,8).toUpperCase();
    booking.paidAt = new Date().toISOString();
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
