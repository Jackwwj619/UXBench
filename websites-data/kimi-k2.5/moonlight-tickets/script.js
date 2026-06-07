const STORAGE = "mt-cart-v1";
let cart = JSON.parse(sessionStorage.getItem(STORAGE) || "{}");
const $ = (s,r) => (r||document).querySelector(s);
const $$ = (s,r) => [...(r||document).querySelectorAll(s)];
const fmt = n => "$" + n.toFixed(2);
const save = () => sessionStorage.setItem(STORAGE, JSON.stringify(cart));

const EVENTS = [
  {id:"e1", artist:"Sea Glass Sextet",   when:"Tonight · 9:00 PM", doors:"Doors 8:00 PM", venue:"The Foundry",     genre:"Indie rock",  date:"2026-05-12", from:22},
  {id:"e2", artist:"Northern Brushfires", when:"Tonight · 10:00 PM", doors:"Doors 9:00 PM", venue:"Halo Room",      genre:"Folk",        date:"2026-05-12", from:18},
  {id:"e3", artist:"Halcyon Dial",       when:"Tonight · 11:00 PM", doors:"Doors 10:00 PM", venue:"Velvet Pier",    genre:"Electronic",  date:"2026-05-12", from:28},
  {id:"e4", artist:"Telegraph Bay",      when:"Tonight · 8:30 PM",  doors:"Doors 7:30 PM",  venue:"Coppergate Hall",genre:"Jazz",        date:"2026-05-12", from:34},

  {id:"e5", artist:"Marisol & the Verses",      when:"Tue · May 13", doors:"Doors 8 PM", venue:"The Foundry",   genre:"Folk",         date:"2026-05-13", from:22},
  {id:"e6", artist:"Pale Cartography",          when:"Wed · May 14", doors:"Doors 7 PM", venue:"Halo Room",     genre:"Experimental", date:"2026-05-14", from:25},
  {id:"e7", artist:"Coast Static",              when:"Thu · May 15", doors:"Doors 9 PM", venue:"Velvet Pier",   genre:"Indie rock",   date:"2026-05-15", from:30},
  {id:"e8", artist:"Borrowed Owls",             when:"Fri · May 16", doors:"Doors 8 PM", venue:"Coppergate Hall",genre:"Folk",        date:"2026-05-16", from:24},
  {id:"e9", artist:"Cendrillon (DJ set)",       when:"Fri · May 16", doors:"Doors 11 PM", venue:"Velvet Pier",  genre:"Electronic",   date:"2026-05-16", from:35},
  {id:"e10", artist:"Tide Engine Trio",         when:"Sat · May 17", doors:"Doors 8 PM", venue:"Halo Room",     genre:"Jazz",         date:"2026-05-17", from:38},
  {id:"e11", artist:"Foxglove Bio (live A/V)",  when:"Sat · May 17", doors:"Doors 10 PM", venue:"The Foundry",  genre:"Experimental", date:"2026-05-17", from:28},
  {id:"e12", artist:"Bracken Six",              when:"Sun · May 18", doors:"Doors 7 PM", venue:"Coppergate Hall",genre:"Hip-hop",     date:"2026-05-18", from:26},
  {id:"e13", artist:"Northbank Confederation",  when:"Mon · May 19", doors:"Doors 8 PM", venue:"Halo Room",     genre:"Indie rock",   date:"2026-05-19", from:20},
  {id:"e14", artist:"Quanta Gospel Choir",      when:"Tue · May 20", doors:"Doors 7:30 PM", venue:"The Foundry",genre:"Folk",         date:"2026-05-20", from:24},
];

function tiersForEvent(e){
  const base = e.from;
  return [
    {id:"early", name:"Early Bird", price: base, perks:["Doors open at posted time","Standing GA"], left: 32, max:6},
    {id:"std",   name:"Standard",   price: base + 6, perks:["Doors open at posted time","Standing GA","No add'l fees"], left: 84, max:6},
    {id:"vip",   name:"VIP — Soundcheck + Signed Poster", price: base + 30, perks:["Early entry @ 7:00 PM","Soundcheck access","Signed poster (limit 1)","Standing GA"], left: 12, max:4},
  ];
}

function renderDiscovery(){
  const params = new URLSearchParams(location.search);
  if(params.get("cancelled") === "1"){
    const banner = document.getElementById("cancelBanner");
    if(banner){
      const from = params.get("from");
      const resume = from ? `<a class="banner-link" href="event.html?e=${from}">Resume browsing that event</a>` : "";
      banner.innerHTML = `<strong>Your order was cancelled.</strong> Your cart and reservation have been cleared. ${resume} <button class="banner-close" aria-label="Dismiss">×</button>`;
      banner.hidden = false;
      banner.querySelector(".banner-close").addEventListener("click", () => { banner.hidden = true; });
    }
  }
  $("#tonightGrid").innerHTML = EVENTS.slice(0,4).map(e => `
    <a class="tonight-card" href="event.html?e=${e.id}">
      <span class="genre">${e.genre}</span>
      <h3>${e.artist}</h3>
      <p class="when">${e.venue} · ${e.when}</p>
      <p class="from">from $${e.from}</p>
    </a>`).join("");
  $("#eventGrid").innerHTML = EVENTS.slice(4).map(e => `
    <a class="event-card" href="event.html?e=${e.id}">
      <div class="meta"><span class="genre">${e.genre}</span></div>
      <h4>${e.artist}</h4>
      <p class="venue">${e.venue} · ${e.when}</p>
      <span class="from">from $${e.from}</span>
    </a>`).join("");
}

function getEventId(){ return new URLSearchParams(location.search).get("e") || "e1"; }
function getEvent(){ return EVENTS.find(e => e.id === getEventId()); }

function renderEvent(){
  const e = getEvent(); if(!e) return;
  cart.eventId = e.id; save();
  $("#evTitle").textContent = e.artist;
  $("#evWhen").textContent = e.when + " · " + e.venue;
  $("#evVenue").textContent = e.venue;
  $("#evDoors").textContent = e.doors;
  $("#evBio").textContent = artistBio(e);
  $("#tiersBlock").innerHTML = tiersForEvent(e).map(t => `
    <div class="tier-card ${t.left < 25 ? "selling-fast" : ""}" data-t="${t.id}">
      <h4>${t.name}</h4>
      <div class="price">$${t.price}<small>/ticket</small></div>
      <ul class="perks">${t.perks.map(p => `<li>${p}</li>`).join("")}</ul>
      <div class="stepper">
        <button type="button" class="step-dec" data-d="-1" aria-label="decrease ${t.name} quantity">−</button>
        <span class="qty" aria-live="polite">0</span>
        <button type="button" class="step-inc" data-d="1" aria-label="increase ${t.name} quantity">+</button>
      </div>
      <p class="remaining">${t.left} left at this price</p>
    </div>`).join("");

  cart.lines = cart.lines || {};
  $$(".tier-card").forEach(card => {
    const t = card.dataset.t;
    const qtyEl = card.querySelector(".qty");
    const tier = tiersForEvent(e).find(x => x.id === t);
    const initial = cart.lines[t] || 0;
    qtyEl.textContent = initial;
    card.querySelectorAll(".stepper button").forEach(b => b.addEventListener("click", (ev) => {
      ev.preventDefault();
      let q = +qtyEl.textContent + +b.dataset.d;
      q = Math.max(0, Math.min(tier.max, q));
      qtyEl.textContent = q;
      cart.lines[t] = q; save(); updateOrderSide(e);
    }));
  });

  const fav = $("#favBtn");
  fav.classList.toggle("active", !!cart.favs?.[e.id]);
  fav.addEventListener("click", () => {
    cart.favs = cart.favs || {}; cart.favs[e.id] = !cart.favs[e.id]; save(); fav.classList.toggle("active");
  });

  $("#relatedRow").innerHTML = EVENTS.filter(x => x.id !== e.id).slice(0,3).map(x => `
    <a class="related-card" href="event.html?e=${x.id}"><h5>${x.artist}</h5><span>${x.venue} · ${x.when}</span></a>`).join("");

  $("#checkoutBtn").addEventListener("click", () => { window.location.href = "checkout.html"; });
  updateOrderSide(e);
}

function updateOrderSide(e){
  const tiers = tiersForEvent(e);
  const lines = Object.entries(cart.lines || {}).filter(([k,q]) => q > 0);
  const cont = $("#cartLines");
  if(lines.length === 0){ cont.innerHTML = '<p class="empty">Pick a tier on the left to start.</p>'; $("#cartFees").hidden = true; $("#checkoutBtn").disabled = true; return; }
  let sub = 0; let count = 0;
  cont.innerHTML = lines.map(([k,q]) => {
    const t = tiers.find(x => x.id === k); const ls = t.price * q; sub += ls; count += q;
    return `<div class="line"><span>${q} × ${t.name}</span><span>${fmt(ls)}</span></div>`;
  }).join("");
  const fee = q => count * 3.5 + count * 2 + sub * 0.03 + 0.3;
  const feeVal = count * 3.5 + count * 2 + sub * 0.03 + 0.3;
  $("#feePrev").textContent = fmt(feeVal);
  $("#subt").textContent = fmt(sub);
  $("#totPrev").textContent = fmt(sub + feeVal);
  $("#cartFees").hidden = false;
  $("#checkoutBtn").disabled = false;
}

function artistBio(e){
  return `${e.artist} formed in 2022 around a love of ${e.genre.toLowerCase()} and four-track tape loops. Their first EP, "Northern Brushfires," was recorded in a basement in Coppergate over three weekends and a cold November. Tonight's set is the second-to-last on the spring tour — expect new material from the upcoming LP.`;
}

function renderCheckout(){
  if(!cart.eventId || !cart.lines){ window.location.href = "index.html"; return; }
  const e = EVENTS.find(x => x.id === cart.eventId);
  const tiers = tiersForEvent(e);
  const lines = Object.entries(cart.lines).filter(([k,q]) => q > 0);
  if(lines.length === 0){ window.location.href = "event.html?e=" + e.id; return; }

  startLockTimer();
  let count = 0;
  $("#cartList").innerHTML = lines.map(([k,q]) => {
    const t = tiers.find(x => x.id === k); count += q;
    return `<li><span>${q} × ${t.name}</span><span>${fmt(t.price * q)}</span></li>`;
  }).join("");
  $("#cartCount").textContent = `${count} ticket${count>1?"s":""}`;

  cart.attendees = cart.attendees || [];
  while(cart.attendees.length < count) cart.attendees.push({first:"",last:"",email:"",send:false,poster:""});
  cart.attendees.length = count;

  const isVip = lines.some(([k,q]) => k === "vip" && q > 0);
  $("#attendeeBlocks").innerHTML = cart.attendees.map((a, i) => {
    const idx = i + 1;
    const isVipTicket = i >= (cart.lines.early || 0) + (cart.lines.std || 0);
    return `<details class="attendee-card" data-i="${i}" ${i === 0 ? "open" : ""}>
      <summary>Ticket ${idx}${a.first ? " · " + a.first + " " + a.last : ""}</summary>
      <div class="body">
        <div class="row">
          <label>First name<input data-f="first" value="${a.first}"></label>
          <label>Last name<input data-f="last" value="${a.last}"></label>
        </div>
        <label>Email (optional, to send this ticket directly)<input type="email" data-f="email" value="${a.email}"></label>
        <label><input type="checkbox" data-f="send" ${a.send?"checked":""}> Email this ticket directly to the attendee</label>
        ${isVipTicket ? `<label>Name for signed poster<input data-f="poster" value="${a.poster}"></label>` : ""}
        ${i > 0 ? `<button type="button" class="copy-link" data-c="${i}">Copy buyer info from ticket 1</button>` : ""}
      </div>
    </details>`;
  }).join("");

  $$(".attendee-card").forEach(card => {
    const i = +card.dataset.i;
    card.querySelectorAll("[data-f]").forEach(el => el.addEventListener("input", () => {
      cart.attendees[i][el.dataset.f] = el.type === "checkbox" ? el.checked : el.value; save();
    }));
    const copy = card.querySelector(".copy-link");
    if(copy) copy.addEventListener("click", () => {
      cart.attendees[i].first = cart.attendees[0].first;
      cart.attendees[i].last = cart.attendees[0].last;
      cart.attendees[i].email = cart.attendees[0].email;
      save(); renderCheckout();
    });
  });

  renderFees(e, tiers, lines);

  ["cExp","cNum","cCvc","cZip"].forEach(id => {
    $("#"+id).addEventListener("input", e => {
      let v = e.target.value.replace(/[^\d]/g,"");
      if(id === "cNum") v = v.slice(0,16).match(/.{1,4}/g)?.join(" ") || "";
      else if(id === "cExp") v = v.slice(0,4).replace(/^(\d{2})(\d{1,2})$/,"$1/$2");
      else if(id === "cCvc") v = v.slice(0,4);
      else if(id === "cZip") v = v.slice(0,5);
      e.target.value = v;
    });
  });

  $("#promoApply").addEventListener("click", () => {
    const code = $("#promoCode").value.trim().toUpperCase();
    const PROMOS = { "DOORS5": {label:"$5 off", v: t => Math.max(0, t-5)}, "TONIGHT10": {label:"10% off", v: t => t*0.9} };
    if(!PROMOS[code]){ $("#promoMsg").textContent = "Promo not recognized."; $("#promoMsg").className = "promo-msg err"; cart.promo = null; }
    else { cart.promo = code; $("#promoMsg").textContent = "Applied: " + PROMOS[code].label; $("#promoMsg").className = "promo-msg ok"; }
    save(); renderFees(e, tiers, lines);
  });

  $("#cancelBtn").addEventListener("click", () => $("#cancelDialog").showModal());
  $("#confirmCancel").addEventListener("click", () => {
    const eid = cart.eventId || "";
    sessionStorage.removeItem(STORAGE);
    window.location.href = "index.html?cancelled=1" + (eid ? "&from=" + eid : "");
  });

  $("#placeBtn").addEventListener("click", () => {
    const missing = cart.attendees.find(a => !a.first || !a.last);
    if(missing){ alert("Each ticket needs a first and last name."); return; }
    if(!$("#cName").value){ alert("Cardholder name required."); return; }
    cart.orderRef = "MT-" + Math.random().toString(36).slice(2,10).toUpperCase();
    cart.buyerEmail = $("#cName").value.split(" ")[0].toLowerCase() + "@example.com";
    save();
    window.location.href = "confirmation.html";
  });
}

function renderFees(e, tiers, lines){
  let sub = 0; let count = 0;
  lines.forEach(([k,q]) => { sub += tiers.find(t => t.id === k).price * q; count += q; });
  const serviceFee = count * 3.5;
  const facility = count * 2;
  const processing = sub * 0.03 + 0.3;
  const items = [["Tickets subtotal", sub],[`Service fee · ${count} × $3.50`, serviceFee],[`Facility fee · ${count} × $2.00`, facility],["Processing (3% + $0.30)", processing]];
  let discount = 0;
  if(cart.promo){
    const PROMOS = { "DOORS5": t => Math.max(0, t-5), "TONIGHT10": t => t*0.9 };
    const before = sub + serviceFee + facility + processing;
    const after = PROMOS[cart.promo](before);
    discount = before - after;
    if(discount > 0) items.push([`Promo (${cart.promo})`, -discount]);
  }
  const total = sub + serviceFee + facility + processing - discount;
  $("#feeList").innerHTML = items.map(([l,v]) => `<li><span>${l}</span><span>${v < 0 ? "−" : ""}${fmt(Math.abs(v))}</span></li>`).join("") + `<li class="total"><span>Total</span><span>${fmt(total)}</span></li>`;
  $("#placeTotal").textContent = fmt(total);
}

function startLockTimer(){
  if(window._lockStarted) return; window._lockStarted = true;
  let total = 600;
  const tick = () => {
    if(total <= 0){
      alert("Your reservation expired. Returning to the event page.");
      const eid = cart.eventId || "e1";
      sessionStorage.removeItem(STORAGE);
      window.location.href = "event.html?e=" + eid;
      return;
    }
    const m = Math.floor(total/60), s = total % 60;
    if($("#lockMin")) $("#lockMin").textContent = String(m).padStart(2,"0");
    if($("#lockSec")) $("#lockSec").textContent = String(s).padStart(2,"0");
    const box = $("#lockBox");
    if(box && total < 60) box.classList.add("warn");
    total--;
  };
  tick(); setInterval(tick, 1000);
}

function renderMtConfirmation(){
  if(!cart.orderRef){
    const main = document.querySelector(".confirm-mt");
    if(main){
      main.innerHTML = `
        <h1>No recent order found</h1>
        <p>We couldn't find a confirmed order in this session. If you just placed an order, a copy was emailed to you. Otherwise, you can keep browsing tonight's shows.</p>
        <div class="cta-row">
          <a href="index.html" class="btn-primary">Back to tonight's events</a>
          <a href="#" class="btn-secondary">Look up an order by email</a>
        </div>`;
    }
    return;
  }
  $("#orderRef").textContent = cart.orderRef;
  $("#buyerEmail").textContent = cart.buyerEmail;
  const e = EVENTS.find(x => x.id === cart.eventId);
  const block = $("#ticketsBlock");
  block.innerHTML = cart.attendees.map((a, i) => `
    <div class="mt-ticket">
      <svg class="qr" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#fff"/>
        <g fill="#1A1B2E">
          <rect x="10" y="10" width="22" height="22"/><rect x="14" y="14" width="14" height="14" fill="#fff"/><rect x="17" y="17" width="8" height="8"/>
          <rect x="68" y="10" width="22" height="22"/><rect x="72" y="14" width="14" height="14" fill="#fff"/><rect x="75" y="17" width="8" height="8"/>
          <rect x="10" y="68" width="22" height="22"/><rect x="14" y="72" width="14" height="14" fill="#fff"/><rect x="17" y="75" width="8" height="8"/>
          <rect x="${40 + (i*5)%30}" y="${40 + (i*3)%30}" width="${4 + (i%3)}" height="${4 + (i%3)}"/>
        </g>
      </svg>
      <div class="ti">
        <h4>${a.first} ${a.last}</h4>
        <p>${e.artist} · ${e.when}</p>
        <p>${e.venue} · ${e.doors}</p>
        <p>Ticket ${i+1} of ${cart.attendees.length}</p>
      </div>
    </div>`).join("");
  setTimeout(() => sessionStorage.removeItem(STORAGE), 100);
}
