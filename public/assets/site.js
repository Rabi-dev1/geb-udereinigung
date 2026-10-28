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

// Kontaktformular – Versand serverseitig über /api/contact
const form = document.getElementById('contact-form');
if (form) {
  form.noValidate = true; // eigene, freundlichere Prüfung statt Browser-Blasen
  form.elements._t.value = Date.now();

  // Vorbelegen aus dem Schnellformular / Leistungsseiten (?leistung=…&objekt=…&ort=…)
  for (const [k, v] of new URLSearchParams(location.search)) {
    const el = form.elements[k];
    if (!el || k.startsWith('_') || el.type === 'checkbox') continue;
    if (el.tagName === 'SELECT' && ![...el.options].some(o => (o.value || o.text) === v)) continue;
    el.value = v.slice(0, 200);
  }

  const status = document.getElementById('form-status');
  const success = document.getElementById('form-success');
  const button = form.querySelector('button[type="submit"]');
  const buttonHtml = button.innerHTML;
  const fallback = 'Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.';

  const setStatus = (type, text) => { status.className = `form-status is-${type}`; status.textContent = text; };
  const markInvalid = (el, invalid) => (el.closest('.field') || el.closest('.consent'))?.classList.toggle('is-invalid', invalid);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.dataset.busy) return;

    let first = null;
    for (const el of form.querySelectorAll('[required]')) {
      const valid = el.type === 'checkbox' ? el.checked : el.value.trim() !== '' && el.checkValidity();
      markInvalid(el, !valid);
      if (!valid && !first) first = el;
    }
    if (first) {
      first.focus();
      return setStatus('error', 'Bitte füllen Sie die markierten Pflichtfelder aus.');
    }

    const data = Object.fromEntries(new FormData(form));
    data.consent = form.elements.consent.checked;

    form.dataset.busy = '1';
    button.disabled = true;
    button.textContent = 'Wird gesendet …';
    setStatus('info', '');

    try {
      const res = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        for (const name of Object.keys(result.fields || {})) if (form.elements[name]) markInvalid(form.elements[name], true);
        throw new Error(result.error || fallback);
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      setStatus('error', err instanceof TypeError ? 'Keine Verbindung – bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.' : err.message);
    } finally {
      delete form.dataset.busy;
      button.disabled = false;
      button.innerHTML = buttonHtml;
    }
  });

  form.addEventListener('input', e => e.target.closest('.is-invalid')?.classList.remove('is-invalid'));
  form.addEventListener('change', e => e.target.closest('.is-invalid')?.classList.remove('is-invalid'));
}
