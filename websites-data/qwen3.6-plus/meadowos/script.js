window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const top = doc.scrollTop || document.body.scrollTop;
  const h = doc.scrollHeight - doc.clientHeight;
  const pct = h > 0 ? (top / h) * 100 : 0;
  document.getElementById("scrollbar").style.width = pct + "%";
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    const t = document.getElementById(id);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:"smooth"}); }
  });
});

const modal = document.getElementById("dlModal");
const bar = document.getElementById("progressBar");
const txt = document.getElementById("progressText");

document.getElementById("dlBtn").addEventListener("click", () => {
  modal.hidden = false;
  bar.style.width = "0%";
  txt.textContent = "0%";
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 8 + 2;
    if(p >= 100){ p = 100; clearInterval(t); txt.textContent = "Done. SHA256 matches."; }
    else txt.textContent = Math.floor(p) + "%";
    bar.style.width = p + "%";
  }, 90);
});
document.getElementById("closeModal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", e => { if(e.target === modal) modal.hidden = true; });
