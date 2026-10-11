// Mobile-Menü
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Kontaktformular (vorläufig: öffnet das Mail-Programm; später durch echten Versand ersetzen)
const MAIL_TO = 'info@example.de';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!f.reportValidity()) return;
  const body = `Name: ${f.name.value}\nTelefon: ${f.telefon.value}\nE-Mail: ${f.email.value}\n\n${f.nachricht.value}`;
  location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent('Anfrage über die Webseite')}&body=${encodeURIComponent(body)}`;
});
