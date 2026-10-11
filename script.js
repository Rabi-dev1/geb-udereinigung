// Mobile-Menü
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const setMenu = open => {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
};
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Header-Schatten beim Scrollen
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Sanftes Einblenden
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.head, .svc, .steps li, .split > *, .contact > *').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Kontaktformular (vorläufig: öffnet das Mail-Programm; später durch echten Versand ersetzen)
const MAIL_TO = 'info@example.de';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!f.reportValidity()) return;
  const body = `Name: ${f.name.value}\nTelefon: ${f.telefon.value}\nE-Mail: ${f.email.value}\nLeistung: ${f.leistung.value}\n\n${f.nachricht.value}`;
  location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent('Anfrage: ' + f.leistung.value)}&body=${encodeURIComponent(body)}`;
});
