document.documentElement.classList.add('js');

// Header-Schatten beim Scrollen
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile-Menü
const drawer = document.getElementById('drawer');
const burger = document.getElementById('burger');
const setDrawer = open => {
  drawer.hidden = !open;
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) document.getElementById('drawer-close').focus();
};
burger.addEventListener('click', () => setDrawer(true));
document.getElementById('drawer-close').addEventListener('click', () => setDrawer(false));
drawer.addEventListener('click', e => { if (e.target === drawer || e.target.closest('a')) setDrawer(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); burger.focus(); } });

// Sanftes Einblenden
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
} else {
  reveals.forEach(el => el.classList.add('is-in'));
}

// Kontaktformular
const form = document.getElementById('contact-form');
if (form) {
  // Vorbelegen aus dem Schnellformular / Leistungsseiten (?leistung=…&objekt=…&ort=…)
  const params = new URLSearchParams(location.search);
  for (const [k, v] of params) {
    const el = form.elements[k];
    if (!el) continue;
    if (el.tagName === 'SELECT' && ![...el.options].some(o => (o.value || o.text) === v)) continue;
    el.value = v;
  }

  const status = document.getElementById('form-status');
  const label = name => {
    const el = form.elements[name];
    if (el.tagName !== 'SELECT') return el.value.trim();
    return el.options[el.selectedIndex].text;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    for (const el of form.querySelectorAll('[required]')) {
      const valid = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
      (el.closest('.field') || el.closest('.consent')).classList.toggle('is-invalid', !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    }
    if (!ok) {
      status.className = 'form-status is-error';
      status.textContent = 'Bitte füllen Sie die markierten Pflichtfelder aus.';
      return;
    }

    const data = {
      Leistung: label('leistung'), Objekt: label('objekt'), Ort: label('ort'), Rhythmus: label('rhythmus'),
      Name: label('name'), Firma: label('firma'), Telefon: label('telefon'), 'E-Mail': label('email'), Nachricht: label('nachricht'),
    };

    if (form.dataset.endpoint) {
      try {
        const res = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.className = 'form-status is-ok';
        status.textContent = 'Vielen Dank! Ihre Anfrage ist bei uns eingegangen – wir melden uns schnellstmöglich.';
      } catch {
        status.className = 'form-status is-error';
        status.textContent = 'Das hat leider nicht geklappt. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.';
      }
      return;
    }

    // Ohne Endpunkt: E-Mail-Programm mit vorausgefüllter Nachricht öffnen
    const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
    location.href = `mailto:${form.dataset.mail}?subject=${encodeURIComponent(`Anfrage: ${data.Leistung}`)}&body=${encodeURIComponent(body)}`;
    status.className = 'form-status is-ok';
    status.textContent = 'Ihr E-Mail-Programm wurde geöffnet – bitte senden Sie die Nachricht dort ab.';
  });

  form.addEventListener('input', e => e.target.closest('.is-invalid')?.classList.remove('is-invalid'));
}
