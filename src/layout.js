import { company as c, services, serviceGroups, audiencePage, regularPage } from './data.js';
import { icon } from './icons.js';

export const tel = `tel:${c.phone}`;
export const wa = `https://wa.me/${c.whatsapp}`;
export const mail = `mailto:${c.email}`;
export const isPlaceholder = v => !v || /\[.*\]/.test(v);
export const ownerName = () => (isPlaceholder(c.owner) ? c.legalName : c.owner);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Bausteine ───────────────────────────────────────────────

const brand = (light = false) => `
  <a href="/" class="brand${light ? ' brand--light' : ''}" aria-label="${c.name} – zur Startseite">
    <img src="/assets/logo-mark.png" alt="" width="48" height="33">
    <span class="brand__text"><span class="brand__name">OSTWEST <span class="text-green">GLANZ</span></span><span class="brand__sub">Gebäudereinigung</span></span>
  </a>`;

const topbar = () => `
  <div class="topbar">
    <div class="container topbar__inner">
      <span class="topbar__item">${icon('pin')} ${c.region}</span>
      <div class="topbar__links">
        <span class="topbar__item">${icon('clock')} ${c.hours}</span>
        <a class="topbar__item" href="${mail}">${icon('mail')} ${c.email}</a>
      </div>
    </div>
  </div>`;

const header = active => {
  const cur = key => (active === key ? ' aria-current="page"' : '');
  const group = g => `
              <div class="mega__col">
                <p class="mega__heading">${g.title}</p>
                ${services.filter(s => s.group === g.id).map(s => `
                <a href="/leistungen/${s.slug}" class="mega__link">
                  <span class="mega__icon">${icon(s.icon)}</span>
                  <span><b>${s.title}</b></span>
                </a>`).join('')}
              </div>`;
  return `
  <header class="header" id="header">
    <div class="container header__inner">
      ${brand()}
      <nav class="nav" aria-label="Hauptnavigation">
        <div class="nav__item">
          <a href="/leistungen" class="nav__link"${cur('leistungen')} aria-haspopup="true">Leistungen ${icon('chevron', 'i i--sm')}</a>
          <div class="mega">
            <div class="mega__grid">
              ${serviceGroups.map(group).join('')}
              <div class="mega__col mega__col--feature">
                <a href="${audiencePage.path}" class="mega__feature mega__feature--navy">
                  <span class="mega__feature-icon">${icon('building')}</span>
                  <b>${audiencePage.title}</b>
                  <small>Reinigungslösungen für Gewerbe, Praxen und Wohnanlagen.</small>
                  <span class="mega__feature-more">Mehr erfahren ${icon('arrow', 'i i--sm')}</span>
                </a>
                <a href="${regularPage.path}" class="mega__feature">
                  <span class="mega__feature-icon">${icon('repeat')}</span>
                  <b>${regularPage.title}</b>
                  <small>Feste Intervalle, fester Plan, planbare Kosten.</small>
                  <span class="mega__feature-more">Mehr erfahren ${icon('arrow', 'i i--sm')}</span>
                </a>
              </div>
            </div>
            <div class="mega__foot">
              <span>Nicht das Richtige dabei? Wir finden eine Lösung.</span>
              <a href="/leistungen" class="link-arrow">Alle Leistungen ${icon('arrow', 'i i--sm')}</a>
            </div>
          </div>
        </div>
        <a href="${audiencePage.path}" class="nav__link"${cur('unternehmen')}>${audiencePage.navLabel}</a>
        <a href="/ueber-uns" class="nav__link"${cur('ueber-uns')}>Über uns</a>
        <a href="/kontakt" class="nav__link"${cur('kontakt')}>Kontakt</a>
      </nav>
      <div class="header__actions">
        <a href="${tel}" class="header__phone">
          <span class="header__phone-icon">${icon('phone')}</span>
          <span><small>Jetzt anrufen</small>${c.phoneDisplay}</span>
        </a>
        <a href="/kontakt" class="btn btn--primary">Angebot anfragen</a>
      </div>
      <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="drawer">${icon('menu')}</button>
    </div>
  </header>

  <div class="drawer" id="drawer" hidden>
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menü">
      <div class="drawer__head">
        ${brand()}
        <button class="burger" id="drawer-close" aria-label="Menü schließen">${icon('close')}</button>
      </div>
      <nav class="drawer__nav" aria-label="Mobile Navigation">
        <a href="/">Start</a>
        <a href="/leistungen">Leistungen</a>
        ${serviceGroups.map(g => `
        <div class="drawer__sub">
          <p class="drawer__heading">${g.title}</p>
          ${services.filter(s => s.group === g.id).map(s => `<a href="/leistungen/${s.slug}">${icon(s.icon)} ${s.title}</a>`).join('')}
        </div>`).join('')}
        <a href="${audiencePage.path}">${audiencePage.title}</a>
        <a href="${regularPage.path}">${regularPage.title}</a>
        <a href="/ueber-uns">Über uns</a>
        <a href="/kontakt">Kontakt</a>
      </nav>
      <div class="drawer__foot">
        <a href="/kontakt" class="btn btn--primary btn--block">Kostenloses Angebot</a>
        <div class="drawer__contact">
          <a href="${tel}">${icon('phone')} ${c.phoneDisplay}</a>
          <a href="${wa}" target="_blank" rel="noopener">${icon('wa')} WhatsApp</a>
        </div>
      </div>
    </div>
  </div>`;
};

export const ctaBand = (title = 'Lassen Sie uns über Ihr Objekt sprechen.', text = 'Kostenlose Besichtigung und ein unverbindliches Festpreis-Angebot – ganz ohne Risiko.') => `
  <section class="cta">
    <div class="container">
      <div class="cta__box">
        <svg class="cta__swoosh" viewBox="0 0 600 240" aria-hidden="true"><path d="M-20 200C120 260 460 250 640 60" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round"/><path d="M40 230C200 270 480 240 620 120" fill="none" stroke="#4aa52e" stroke-width="12" stroke-linecap="round" opacity=".8"/></svg>
        <div class="cta__text">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
        <div class="cta__actions">
          <a href="/kontakt" class="btn btn--white btn--lg">Angebot anfragen ${icon('arrow', 'i i--sm')}</a>
          <a href="${tel}" class="btn btn--outline-white btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>`;

const footer = () => `
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <img src="/assets/logo-full-white.png" alt="${c.legalName}" width="190" height="127" loading="lazy">
        <p>${c.tagline}<br>Ihr Partner für Gebäudereinigung in Bielefeld und OWL.</p>
      </div>
      ${serviceGroups.map(g => `
      <div>
        <h3 class="footer__title">${g.title}</h3>
        <ul class="footer__list">${services.filter(s => s.group === g.id).map(s => `<li><a href="/leistungen/${s.slug}">${s.title}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div>
        <h3 class="footer__title">Unternehmen</h3>
        <ul class="footer__list">
          <li><a href="${audiencePage.path}">${audiencePage.title}</a></li>
          <li><a href="${regularPage.path}">${regularPage.title}</a></li>
          <li><a href="/leistungen">Alle Leistungen</a></li>
          <li><a href="/ueber-uns">Über uns</a></li>
          <li><a href="/kontakt">Kontakt & Angebot</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">Kontakt</h3>
        <ul class="footer__list footer__list--icons">
          <li>${icon('phone')}<a href="${tel}">${c.phoneDisplay}</a></li>
          <li>${icon('mail')}<a href="${mail}">${c.email}</a></li>
          <li>${icon('wa')}<a href="${wa}" target="_blank" rel="noopener">WhatsApp schreiben</a></li>
          <li>${icon('clock')}<span>${c.hours}</span></li>
          <li>${icon('pin')}<span>${isPlaceholder(c.street) ? `${c.city} &amp; Umgebung · OWL` : `${c.street}<br>${c.zip} ${c.city}`}</span></li>
        </ul>
      </div>
    </div>
    <div class="container footer__bottom">
      <span>© ${new Date().getFullYear()} ${c.legalName}</span>
      <nav aria-label="Rechtliches"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/agb">AGB</a></nav>
    </div>
  </footer>

  <div class="mbar" aria-label="Schnellkontakt">
    <a href="${tel}">${icon('phone')}<span>Anrufen</span></a>
    <a href="${wa}" target="_blank" rel="noopener" class="mbar__wa">${icon('wa')}<span>WhatsApp</span></a>
    <a href="/kontakt" class="mbar__cta">${icon('file')}<span>Angebot</span></a>
  </div>`;

export const pageHero = ({ crumbs = [], title, lead, eyebrow, actions = '', aside = '' }) => `
  <section class="page-hero">
    <svg class="page-hero__swoosh" viewBox="0 0 600 240" aria-hidden="true"><path d="M-20 200C120 260 460 250 640 60" fill="none" stroke="#1a6fd1" stroke-width="18" stroke-linecap="round"/><path d="M40 230C200 270 480 240 620 120" fill="none" stroke="#4aa52e" stroke-width="10" stroke-linecap="round"/></svg>
    <div class="container page-hero__inner${aside ? ' page-hero__inner--aside' : ''}">
      <div>
        ${crumbs.length ? `<nav class="crumbs" aria-label="Brotkrumen"><a href="/">Start</a>${crumbs.map(([label, href]) => href ? `<span>/</span><a href="${href}">${label}</a>` : `<span>/</span><span aria-current="page">${label}</span>`).join('')}</nav>` : ''}
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
        <h1>${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${actions ? `<div class="actions">${actions}</div>` : ''}
      </div>
      ${aside}
    </div>
  </section>`;

export const faqList = items => `
  <div class="faq">
    ${items.map(([q, a]) => `
    <details class="faq__item">
      <summary>${q}<span class="faq__icon">${icon('plus', 'i i--sm')}</span></summary>
      <p>${a}</p>
    </details>`).join('')}
  </div>`;

// ── Seitengerüst ────────────────────────────────────────────

export const layout = ({ path, title, description, active, body, schema = [], noindex = false, v }) => {
  const site = c.siteUrl.replace(/\/$/, '');
  const url = site + (path === '/' ? '/' : path);
  const hasAddress = !isPlaceholder(c.street) && !isPlaceholder(c.zip);
  const business = {
    '@context': 'https://schema.org',
    '@type': 'HousekeepingService',
    '@id': `${site}/#organization`,
    name: c.legalName,
    alternateName: c.name,
    slogan: c.tagline,
    url: `${site}/`,
    logo: `${site}/assets/logo-full.png`,
    image: `${site}/assets/og-image.jpg`,
    telephone: c.phone,
    email: c.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      ...(hasAddress ? { streetAddress: c.street, postalCode: c.zip } : {}),
      addressLocality: c.city, addressRegion: 'Nordrhein-Westfalen', addressCountry: 'DE',
    },
    areaServed: c.towns.map(t => ({ '@type': 'City', name: t })),
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Leistungen',
      itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: `${site}/leistungen/${s.slug}` } })),
    },
    ...(isPlaceholder(c.owner) ? {} : { founder: { '@type': 'Person', name: c.owner } }),
  };
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site}/#website`, name: c.legalName, url: `${site}/`, inLanguage: 'de-DE', publisher: { '@id': `${site}/#organization` } };
  const ld = [business, ...(path === '/' ? [website] : []), ...schema];

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
  <link rel="canonical" href="${url}">
  <meta name="theme-color" content="#0b3a78">
  <meta name="format-detection" content="telephone=no">
  <meta name="geo.region" content="DE-NW">
  <meta name="geo.placename" content="${c.city}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="${esc(c.legalName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${site}/assets/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(c.legalName)} Logo">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/montserrat-800.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/site.css?v=${v}">
  <script>document.documentElement.classList.add('js')</script>
  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\u003c')}</script>
</head>
<body>
  <a class="skip" href="#main">Zum Inhalt springen</a>
  ${topbar()}
  ${header(active)}
  <main id="main">
${body}
  </main>
  ${footer()}
  <script src="/assets/site.js?v=${v}" defer></script>
</body>
</html>
`;
};
