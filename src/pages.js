import { company as c, services, serviceGroups, objectTypes, intervals, generalFaq, audiencePage, regularPage } from './data.js';
import { icon } from './icons.js';
import { tel, wa, mail, pageHero, ctaBand, faqList, isPlaceholder, ownerName } from './layout.js';

const serviceOptions = (selected = '') => serviceGroups.map(g => `<optgroup label="${g.title}">${services.filter(s => s.group === g.id).map(s => `<option value="${s.slug}"${s.slug === selected ? ' selected' : ''}>${s.title}</option>`).join('')}</optgroup>`).join('') + `<option value="sonstiges">Sonstiges / Mehrere Leistungen</option>`;
const options = list => list.map(o => `<option>${o}</option>`).join('');
const byGroup = id => services.filter(s => s.group === id);
const bySlug = slug => services.find(s => s.slug === slug);

const faqSchema = items => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const site = c.siteUrl.replace(/\/$/, '');
const breadcrumb = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [['Start', '/'], ...items].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site + path })),
});

const trust = [
  ['search', 'Kostenlose Besichtigung', 'Wir kommen zu Ihnen'],
  ['euro', 'Festpreis-Angebot', 'Transparent, ohne Überraschungen'],
  ['user', 'Feste Ansprechperson', 'Direkt erreichbar'],
  ['calendar', 'Flexible Zeiten', 'Passend zu Ihrem Betrieb'],
];

const steps = [
  ['Anfragen', 'Per Formular, Telefon oder WhatsApp – in wenigen Minuten erledigt.'],
  ['Besichtigen', 'Wir schauen uns Ihr Objekt an und besprechen Ihre Wünsche.'],
  ['Festpreis erhalten', 'Sie bekommen ein klares, unverbindliches Angebot.'],
  ['Sauber starten', 'Wir legen los – pünktlich, gründlich, zuverlässig.'],
];

const audiences = [
  {
    icon: 'home',
    title: 'Hausverwaltungen & Eigentümergemeinschaften',
    text: 'Wir halten Ihre Wohnanlagen dauerhaft gepflegt – verlässlich für Sie und Ihre Mieter.',
    points: ['Treppenhaus-, Keller- und Außenflächenreinigung', 'Mülltonnenservice nach Abfuhrkalender', 'Abrechnung je Objekt – passend für die Betriebskostenabrechnung', 'Mehrere Objekte, eine feste Ansprechperson'],
    services: ['treppenhausreinigung', 'muelltonnenservice', 'kellerreinigung', 'grundreinigung'],
  },
  {
    icon: 'building',
    title: 'Unternehmen, Büros & Praxen',
    text: 'Saubere Räume für Ihr Team und Ihre Kunden – gereinigt dann, wenn es zu Ihrem Betrieb passt.',
    points: ['Reinigung vor oder nach Ihren Öffnungszeiten', 'Schriftlicher Reinigungsplan mit festen Intervallen', 'Glas-, Fenster- und Grundreinigung aus einer Hand', 'Planbare monatliche Kosten'],
    services: ['buero-und-praxisreinigung', 'glasreinigung', 'fensterreinigung', 'bauendreinigung'],
  },
];

const benefits = [
  ['user', 'Feste Ansprechperson', 'Ein direkter Draht statt Hotline – jemand, der Ihr Objekt kennt.'],
  ['list', 'Schriftlicher Reinigungsplan', 'Klar festgehalten: welche Bereiche, wie oft, wann.'],
  ['euro', 'Planbare Kosten', 'Festpreis bzw. monatliche Pauschale – ohne Überraschungen.'],
  ['file', 'Übersichtliche Abrechnung', 'Auf Wunsch je Objekt getrennt ausgewiesen.'],
  ['clock', 'Flexible Zeiten', 'Früh morgens, abends oder am Wochenende.'],
  ['key', 'Sorgfältiger Umgang mit Schlüsseln', 'Übergabe gegen Quittung, sichere Verwahrung.'],
];

const b2bFaq = [
  ['Betreuen Sie auch mehrere Objekte?', 'Ja. Ob eine Wohnanlage oder mehrere Standorte – Sie haben eine feste Ansprechperson und erhalten die Abrechnung auf Wunsch je Objekt.'],
  ['Sind die Reinigungskosten auf Mieter umlegbar?', 'Die Kosten der Gebäudereinigung zählen in der Regel zu den umlagefähigen Betriebskosten nach § 2 BetrKV. Wir weisen die Leistungen auf Wunsch je Objekt getrennt aus.'],
  ['Wie lange läuft ein Reinigungsvertrag?', 'Laufzeit und Kündigungsfrist vereinbaren wir individuell und halten sie transparent im Angebot fest.'],
  ['Wie wird der Zugang zum Objekt geregelt?', 'Schlüssel oder Zugangsmedien übernehmen wir gegen Quittung und verwahren sie sorgfältig. Bei Vertragsende geben wir sie vollständig zurück.'],
];

const regularIntervals = [
  ['Täglich', 'Täglich & mehrmals wöchentlich', 'Für Büros, Praxen und stark genutzte Bereiche.'],
  ['Wöchentlich', 'Wöchentlich', 'Für Treppenhäuser, kleinere Büros und Ladenlokale.'],
  ['14-täglich', '14-täglich', 'Für Wohnanlagen mit normaler Nutzung.'],
  ['Monatlich', 'Monatlich', 'Für Keller, Fenster, Glas und Außenflächen.'],
];

const regularSteps = [
  ['Besichtigung', 'Wir sehen uns Ihr Objekt an und klären Ihre Anforderungen.'],
  ['Reinigungsplan', 'Wir halten fest, welche Bereiche wie oft gereinigt werden.'],
  ['Feste Termine', 'Gereinigt wird zu festen Zeiten – mit fester Ansprechperson.'],
  ['Laufende Abstimmung', 'Ändert sich Ihr Bedarf, passen wir den Plan gemeinsam an.'],
];

const regularFaq = [
  ['Kann ich den Rhythmus später ändern?', 'Ja. Ändert sich Ihr Bedarf, passen wir Intervalle und Leistungsumfang gemeinsam an.'],
  ['Wie wird abgerechnet?', 'In der Regel über eine feste monatliche Pauschale auf Basis des vereinbarten Leistungsumfangs – so bleiben Ihre Kosten planbar.'],
  ['Was passiert, wenn ein Termin auf einen Feiertag fällt?', 'Dann stimmen wir rechtzeitig einen Ersatztermin mit Ihnen ab.'],
  ['Wie lange läuft ein Reinigungsauftrag?', 'Laufzeit und Kündigungsfrist vereinbaren wir individuell und halten sie transparent im Angebot fest.'],
];

// ── Bausteine ───────────────────────────────────────────────
const serviceCard = (s, h = 'h3') => `
  <a href="/leistungen/${s.slug}" class="svc reveal">
    <span class="svc__icon">${icon(s.icon)}</span>
    <${h} class="svc__title">${s.title}</${h}>
    <p class="svc__text">${s.short}</p>
    <span class="svc__more">Mehr erfahren ${icon('arrow', 'i i--sm')}</span>
  </a>`;

const regularFeatureCard = () => `
  <a href="${regularPage.path}" class="svc svc--feature reveal">
    <span class="svc__icon">${icon('repeat')}</span>
    <div class="svc--feature__body">
      <p class="svc__eyebrow">Für dauerhaft gepflegte Objekte</p>
      <h4 class="svc__title">Regelmäßige Reinigung</h4>
      <p class="svc__text">Täglich, wöchentlich oder monatlich – mit festem Reinigungsplan, fester Ansprechperson und planbaren Kosten.</p>
      <span class="svc__more">So funktioniert's ${icon('arrow', 'i i--sm')}</span>
    </div>
  </a>`;

const audienceCard = (a, detailed = false) => `
  <article class="aud reveal">
    <div class="aud__head">
      <span class="aud__icon">${icon(a.icon)}</span>
      <h3 class="aud__title">${a.title}</h3>
    </div>
    <p class="aud__text">${a.text}</p>
    <ul class="checks aud__points">${a.points.map(p => `<li>${icon('check', 'i i--sm')}${p}</li>`).join('')}</ul>
    ${detailed ? `<div class="aud__services"><p class="aud__label">Passende Leistungen</p><div class="aud__links">${a.services.map(bySlug).map(s => `<a href="/leistungen/${s.slug}">${icon(s.icon, 'i i--sm')} ${s.title}</a>`).join('')}</div></div>` : ''}
  </article>`;

const stepList = list => `
  <ol class="steps">
    ${list.map(([t, d], i) => `<li class="steps__item reveal"><span class="steps__num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
  </ol>`;

const towns = () => `
  <ul class="towns">
    ${c.towns.map((t, i) => `<li${i === 0 ? ' class="is-home"' : ''}>${i === 0 ? icon('pin', 'i i--sm') + ' ' : ''}${t}</li>`).join('')}
  </ul>`;

const personCard = () => `
  <aside class="person">
    <div class="person__avatar" aria-hidden="true">${c.ownerInitials}</div>
    <div class="person__body">
      <p class="person__role">${isPlaceholder(c.owner) ? 'Persönlich für Sie da' : `${c.ownerRole} · Ihr Ansprechpartner`}</p>
      <p class="person__name">${ownerName()}</p>
      <p class="person__quote">„Bei uns haben Sie eine feste Person, die Ihr Objekt kennt und für Sie erreichbar ist.“</p>
      <div class="person__links">
        <a href="${tel}">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
        <a href="${wa}" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp</a>
      </div>
    </div>
  </aside>`;

const featureLinks = () => `
  <div class="feature-links">
    <a href="${audiencePage.path}" class="feature-link feature-link--navy reveal">
      <span class="feature-link__icon">${icon('building')}</span>
      <span><b>${audiencePage.title}</b><small>Ein Partner für Gewerbe, Praxen und Wohnanlagen.</small></span>
      ${icon('arrow', 'i feature-link__arrow')}
    </a>
    <a href="${regularPage.path}" class="feature-link reveal">
      <span class="feature-link__icon">${icon('repeat')}</span>
      <span><b>${regularPage.title}</b><small>Feste Intervalle, fester Plan, planbare Kosten.</small></span>
      ${icon('arrow', 'i feature-link__arrow')}
    </a>
  </div>`;

// ── Startseite ──────────────────────────────────────────────
const home = () => ({
  path: '/', file: 'index.html', active: 'start',
  title: `Gebäudereinigung Bielefeld & OWL | ${c.name}`,
  description: 'Gebäudereinigung in Bielefeld & OWL: Unterhalts-, Grund- & Bauendreinigung, Treppenhaus, Büro, Glas & Fenster. Kostenlose Besichtigung, Festpreis.',
  body: `
  <section class="hero">
    <svg class="hero__swoosh" viewBox="0 0 900 360" aria-hidden="true"><path d="M-40 300C180 400 700 380 940 90" fill="none" stroke="#1a6fd1" stroke-width="26" stroke-linecap="round"/><path d="M60 345C300 405 720 360 930 180" fill="none" stroke="#4aa52e" stroke-width="14" stroke-linecap="round"/></svg>
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="pill"><span class="pill__dot"></span> Kostenlose Besichtigung · Festpreis-Angebot</p>
        <h1 class="hero__title"><span class="hero__kicker">Gebäudereinigung in Bielefeld &amp; OWL</span>Sauber.<br>Zuverlässig.<br><span class="text-green">Professionell.</span></h1>
        <p class="lead">Laufende Reinigung und Sonderreinigung für Hausverwaltungen, Unternehmen und Praxen in Bielefeld und ganz Ostwestfalen-Lippe – mit fester Ansprechperson und fairen Festpreisen.</p>
        <div class="actions">
          <a href="/kontakt" class="btn btn--primary btn--lg">Kostenloses Angebot ${icon('arrow', 'i i--sm')}</a>
          <a href="/leistungen" class="btn btn--ghost btn--lg">Unsere Leistungen</a>
        </div>
        <div class="hero__contact">
          <a href="${tel}">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
          <a href="${wa}" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp schreiben</a>
        </div>
      </div>

      <form class="quote" action="/kontakt" method="get">
        <div class="quote__head">
          <img src="/assets/logo-mark.png" alt="" width="56" height="38">
          <div>
            <p class="quote__title">Angebot anfordern</p>
            <p class="quote__sub">Kostenlos & unverbindlich</p>
          </div>
        </div>
        <label class="field"><span>Welche Leistung benötigen Sie?</span>
          <select name="leistung">${serviceOptions()}</select>
        </label>
        <label class="field"><span>Art des Objekts</span>
          <select name="objekt">${options(objectTypes)}</select>
        </label>
        <label class="field"><span>PLZ oder Ort</span>
          <input name="ort" placeholder="z. B. 33602 Bielefeld" autocomplete="postal-code">
        </label>
        <button class="btn btn--primary btn--block btn--lg" type="submit">Weiter zur Anfrage ${icon('arrow', 'i i--sm')}</button>
        <p class="quote__note">${icon('shield', 'i i--sm')} Ihre Angaben nutzen wir nur für Ihr Angebot.</p>
      </form>
    </div>
  </section>

  <section class="trust" aria-label="Unsere Versprechen">
    <div class="container trust__grid">
      ${trust.map(([i, t, d]) => `<div class="trust__item"><span class="trust__icon">${icon(i)}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--row">
        <div>
          <p class="eyebrow">Leistungen</p>
          <h2>Alles für ein gepflegtes Objekt</h2>
        </div>
        <p class="section-head__text">Einzeln buchbar oder kombiniert – mit einer Ansprechperson und einer Rechnung.</p>
      </div>
      ${serviceGroups.map(g => `
      <div class="svc-group">
        <div class="svc-group__head">
          <h3 class="svc-group__title">${g.title}</h3>
          <p>${g.text}</p>
        </div>
        <div class="svc-grid">
          ${byGroup(g.id).map(s => serviceCard(s, 'h4')).join('')}
          ${g.id === 'laufend' ? regularFeatureCard() : ''}
        </div>
      </div>`).join('')}
      <p class="svc-note">Individuelle Anforderungen? <a href="/kontakt">Sprechen Sie uns an</a> – wir finden eine passende Lösung.</p>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--row">
        <div>
          <p class="eyebrow">${audiencePage.title}</p>
          <h2>Ein Partner für Ihre Objekte</h2>
        </div>
        <p class="section-head__text">Ob eine Wohnanlage oder mehrere Standorte – wir übernehmen die Reinigung zuverlässig und planbar.</p>
      </div>
      <div class="audience">${audiences.map(a => audienceCard(a)).join('')}</div>
      <div class="actions actions--center"><a href="${audiencePage.path}" class="btn btn--primary btn--lg">Lösungen für Unternehmen &amp; Hausverwaltungen ${icon('arrow', 'i i--sm')}</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container why">
      <div class="why__visual reveal">
        <img src="/assets/logo-full.png" alt="${c.legalName} Logo" width="720" height="482" loading="lazy">
      </div>
      <div class="why__content reveal">
        <p class="eyebrow">Warum ${c.name}</p>
        <h2>Ein Partner, auf den Sie sich verlassen können.</h2>
        <p class="muted-lg">Als Bielefelder Unternehmen sind wir schnell vor Ort und kennen die Region. Für uns zählt, dass Sie sich um Sauberkeit nicht mehr kümmern müssen.</p>
        <ul class="features">
          <li><span class="features__icon">${icon('user')}</span><div><b>Persönlich statt anonym</b><span>Eine feste Ansprechperson, die Ihr Objekt kennt.</span></div></li>
          <li><span class="features__icon">${icon('euro')}</span><div><b>Klare Festpreise</b><span>Sie wissen vorher genau, was Sie erwartet.</span></div></li>
          <li><span class="features__icon">${icon('shield')}</span><div><b>Gründlich & pünktlich</b><span>Feste Abläufe und verbindliche Termine.</span></div></li>
        </ul>
        <a href="/ueber-uns" class="link-arrow">Mehr über uns ${icon('arrow', 'i i--sm')}</a>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Ablauf</p>
        <h2>In vier Schritten zum sauberen Objekt</h2>
      </div>
      ${stepList(steps)}
    </div>
  </section>

  <section class="section">
    <div class="container region">
      <div class="reveal">
        <p class="eyebrow">Einsatzgebiet</p>
        <h2>Zuhause in Bielefeld.<br>Im Einsatz in ganz OWL.</h2>
        <p class="muted-lg">Kurze Wege, schnelle Reaktion: Wir betreuen Objekte in Bielefeld und der Umgebung.</p>
      </div>
      <div class="reveal">
        ${towns()}
        <p class="small-muted">Ihr Ort ist nicht dabei? <a href="/kontakt">Fragen Sie einfach an.</a></p>
      </div>
    </div>
  </section>

  ${ctaBand()}`,
});

// ── Leistungen (Übersicht) ──────────────────────────────────
const leistungen = () => ({
  path: '/leistungen', file: 'leistungen/index.html', active: 'leistungen',
  title: `Leistungen der Gebäudereinigung in Bielefeld | ${c.name}`,
  description: 'Alle Leistungen von OstWest Glanz: Unterhalts-, Treppenhaus-, Büro-, Grund-, Bauend-, Glas- & Fensterreinigung, Mülltonnenservice in Bielefeld & OWL.',
  schema: [breadcrumb([['Leistungen', '/leistungen']])],
  body: `
  ${pageHero({
    crumbs: [['Leistungen']],
    eyebrow: 'Leistungen',
    title: 'Reinigung für jedes Objekt',
    lead: `${services.length} Leistungen, ein Ansprechpartner. Laufend nach festem Plan oder einmalig als Sonderreinigung – einzeln buchbar oder kombiniert.`,
  })}
  ${serviceGroups.map((g, gi) => `
  <section class="section section--tight${gi % 2 ? ' section--soft' : ''}">
    <div class="container">
      <div class="svc-group__head svc-group__head--lg">
        <h2 class="svc-group__title">${g.title}</h2>
        <p>${g.text}</p>
      </div>
      <div class="svc-list">
        ${byGroup(g.id).map((s, i) => `
        <article class="svc-row reveal">
          <span class="svc-row__num">0${i + 1}</span>
          <span class="svc-row__icon">${icon(s.icon)}</span>
          <div class="svc-row__body">
            <h3 class="svc-row__title"><a href="/leistungen/${s.slug}">${s.title}</a></h3>
            <p>${s.short}</p>
            <ul class="checks checks--inline">${s.includes.slice(0, 3).map(x => `<li>${icon('check', 'i i--sm')}${x}</li>`).join('')}</ul>
          </div>
          <a href="/leistungen/${s.slug}" class="btn btn--ghost svc-row__btn">Details ${icon('arrow', 'i i--sm')}</a>
        </article>`).join('')}
      </div>
    </div>
  </section>`).join('')}
  <section class="section section--tight">
    <div class="container">${featureLinks()}</div>
  </section>
  ${ctaBand('Mehrere Leistungen kombinieren?', 'Wir stellen Ihnen ein Paket zusammen – mit einer Ansprechperson und einer Rechnung.')}`,
});

// ── Leistungs-Detailseiten ──────────────────────────────────
const servicePage = s => ({
  path: `/leistungen/${s.slug}`, file: `leistungen/${s.slug}.html`, active: 'leistungen',
  title: `${s.title} in Bielefeld | ${c.name}`,
  description: `${s.title} in Bielefeld & OWL: ${s.short} Kostenlose Besichtigung & Festpreis-Angebot.`,
  schema: [faqSchema(s.faq), breadcrumb([['Leistungen', '/leistungen'], [s.title, `/leistungen/${s.slug}`]]), {
    '@context': 'https://schema.org', '@type': 'Service', serviceType: s.title, name: `${s.title} in Bielefeld & OWL`,
    provider: { '@id': `${site}/#organization` }, areaServed: { '@type': 'AdministrativeArea', name: 'Ostwestfalen-Lippe' }, description: s.intro,
    url: `${site}/leistungen/${s.slug}`,
  }],
  body: `
  ${pageHero({
    crumbs: [['Leistungen', '/leistungen'], [s.title]],
    eyebrow: `${icon(s.icon, 'i i--sm')} ${serviceGroups.find(g => g.id === s.group).title}`,
    title: `${s.title}<span class="h1-sub">in Bielefeld & OWL</span>`,
    lead: s.intro,
    actions: `<a href="/kontakt?leistung=${s.slug}" class="btn btn--primary btn--lg">Angebot anfragen ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
  })}
  <section class="section section--tight">
    <div class="container detail">
      <div class="detail__main">
        <div class="block reveal">
          <h2 class="block__title">Leistungsumfang</h2>
          <ul class="checks checks--grid">${s.includes.map(x => `<li>${icon('check', 'i i--sm')}${x}</li>`).join('')}</ul>
          <p class="small-muted">Der genaue Umfang wird individuell auf Ihr Objekt abgestimmt.</p>
        </div>
        <div class="block block--split reveal">
          <div>
            <h2 class="block__title">Ideal für</h2>
            <ul class="tags">${s.audience.map(a => `<li>${a}</li>`).join('')}</ul>
          </div>
          <div>
            <h2 class="block__title">Intervalle</h2>
            <ul class="tags tags--green">${s.rhythm.map(a => `<li>${icon('calendar', 'i i--sm')} ${a}</li>`).join('')}</ul>
          </div>
        </div>
        ${s.group === 'laufend' ? `
        <a href="${regularPage.path}" class="inline-cta reveal">
          <span class="inline-cta__icon">${icon('repeat')}</span>
          <span><b>Als regelmäßigen Reinigungsauftrag buchen</b><small>Fester Plan, feste Zeiten, planbare monatliche Kosten.</small></span>
          ${icon('arrow', 'i inline-cta__arrow')}
        </a>` : `
        <a href="${audiencePage.path}" class="inline-cta reveal">
          <span class="inline-cta__icon">${icon('building')}</span>
          <span><b>Für Unternehmen &amp; Hausverwaltungen</b><small>Sonderreinigung und laufende Reinigung aus einer Hand.</small></span>
          ${icon('arrow', 'i inline-cta__arrow')}
        </a>`}
        <div class="block reveal">
          <h2 class="block__title">So läuft's ab</h2>
          <ol class="mini-steps">${steps.map(([t, d], i) => `<li><span>${i + 1}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol>
        </div>
        <div class="block reveal">
          <h2 class="block__title">Häufige Fragen</h2>
          ${faqList(s.faq)}
        </div>
      </div>

      <aside class="detail__side">
        <div class="side-card">
          <p class="side-card__eyebrow">Kostenlos & unverbindlich</p>
          <p class="side-card__title">Angebot für ${s.title}</p>
          <ul class="checks checks--compact">
            <li>${icon('check', 'i i--sm')}Kostenlose Besichtigung</li>
            <li>${icon('check', 'i i--sm')}Festpreis-Angebot</li>
            <li>${icon('check', 'i i--sm')}Feste Ansprechperson</li>
          </ul>
          <a href="/kontakt?leistung=${s.slug}" class="btn btn--primary btn--block">Angebot anfragen</a>
          <div class="side-card__or"><span>oder direkt</span></div>
          <a href="${tel}" class="side-card__link">${icon('phone')} <span><small>Anrufen</small>${c.phoneDisplay}</span></a>
          <a href="${wa}" class="side-card__link side-card__link--wa" target="_blank" rel="noopener">${icon('wa')} <span><small>WhatsApp</small>Nachricht schreiben</span></a>
        </div>
        <nav class="side-nav" aria-label="Weitere Leistungen">
          ${serviceGroups.map(g => `
          <p class="side-nav__title">${g.title}</p>
          ${byGroup(g.id).filter(x => x.slug !== s.slug).map(x => `<a href="/leistungen/${x.slug}">${icon(x.icon, 'i i--sm')} ${x.title}</a>`).join('')}`).join('')}
        </nav>
      </aside>
    </div>
  </section>
  ${ctaBand(`Ihr Angebot für ${s.title}`, 'Kostenlose Besichtigung vor Ort und ein transparenter Festpreis – unverbindlich.')}`,
});

// ── Für Unternehmen & Hausverwaltungen ──────────────────────
const unternehmen = () => ({
  path: audiencePage.path, file: `${audiencePage.path.slice(1)}.html`, active: 'unternehmen',
  title: `Reinigung für Unternehmen & Hausverwaltungen | ${c.name}`,
  description: 'Gebäudereinigung für Hausverwaltungen, WEGs, Unternehmen und Praxen in Bielefeld & OWL: fester Ansprechpartner, Reinigungsplan, planbare Kosten.',
  schema: [faqSchema(b2bFaq), breadcrumb([[audiencePage.title, audiencePage.path]])],
  body: `
  ${pageHero({
    crumbs: [[audiencePage.title]],
    eyebrow: `${icon('building', 'i i--sm')} ${audiencePage.title}`,
    title: `Gebäudereinigung für Unternehmen &amp; Hausverwaltungen<span class="h1-sub">in Bielefeld & OWL</span>`,
    lead: 'Ein fester Partner für die Reinigung Ihrer Objekte: verlässlich, planbar und mit einer Ansprechperson, die Ihre Anforderungen kennt.',
    actions: `<a href="/kontakt?objekt=${encodeURIComponent('Büro / Gewerbe')}" class="btn btn--primary btn--lg">Angebot anfragen ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
  })}
  <section class="section section--tight">
    <div class="container">
      <div class="audience audience--detailed">${audiences.map(a => audienceCard(a, true)).join('')}</div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Ihre Vorteile</p>
        <h2>Darauf können Sie sich verlassen</h2>
      </div>
      <div class="benefits">
        ${benefits.map(([i, t, d]) => `<div class="benefit reveal"><span class="benefit__icon">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--row">
        <div>
          <p class="eyebrow">Leistungen</p>
          <h2>Laufend oder bei Bedarf – alles aus einer Hand</h2>
        </div>
        <a href="${regularPage.path}" class="link-arrow">Wie regelmäßige Reinigung funktioniert ${icon('arrow', 'i i--sm')}</a>
      </div>
      <div class="group-cards">
        ${serviceGroups.map(g => `
        <div class="group-card reveal">
          <h3>${g.title}</h3>
          <p>${g.text}</p>
          <div class="group-card__links">${byGroup(g.id).map(s => `<a href="/leistungen/${s.slug}">${icon(s.icon, 'i i--sm')} ${s.title} ${icon('arrow', 'i i--sm group-card__arrow')}</a>`).join('')}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Ablauf</p>
        <h2>So starten wir zusammen</h2>
      </div>
      ${stepList(steps)}
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <div class="section-head section-head--center">
        <p class="eyebrow">FAQ</p>
        <h2>Häufige Fragen</h2>
      </div>
      ${faqList(b2bFaq)}
    </div>
  </section>
  ${ctaBand('Lassen Sie uns Ihr Objekt besichtigen.', 'Kostenlos und unverbindlich – danach erhalten Sie ein klares Angebot mit festem Preis.')}`,
});

// ── Regelmäßige Reinigung ───────────────────────────────────
const regelmaessig = () => ({
  path: regularPage.path, file: `${regularPage.path.slice(1)}.html`, active: 'leistungen',
  title: `Regelmäßige Reinigung & Unterhaltsreinigung | ${c.name}`,
  description: 'Regelmäßige Reinigung in Bielefeld & OWL: täglich, wöchentlich, 14-täglich oder monatlich – mit festem Reinigungsplan und planbaren Kosten.',
  schema: [faqSchema(regularFaq), breadcrumb([[regularPage.title, regularPage.path]])],
  body: `
  ${pageHero({
    crumbs: [[regularPage.title]],
    eyebrow: `${icon('repeat', 'i i--sm')} ${regularPage.title}`,
    title: `Regelmäßige Reinigung im festen Rhythmus<span class="h1-sub">Unterhaltsreinigung in Bielefeld & OWL</span>`,
    lead: 'Sie legen fest, wie oft – wir sorgen dafür, dass Ihr Objekt dauerhaft gepflegt ist. Mit festem Reinigungsplan, festen Zeiten und planbaren Kosten.',
    actions: `<a href="/kontakt?rhythmus=W%C3%B6chentlich" class="btn btn--primary btn--lg">Angebot anfragen ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
  })}
  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Intervalle</p>
        <h2>Der passende Rhythmus für Ihr Objekt</h2>
      </div>
      <div class="intervals">
        ${regularIntervals.map(([value, t, d]) => `
        <a href="/kontakt?rhythmus=${encodeURIComponent(value)}" class="interval reveal">
          <span class="interval__icon">${icon('calendar')}</span>
          <h3>${t}</h3>
          <p>${d}</p>
          <span class="interval__more">Angebot anfragen ${icon('arrow', 'i i--sm')}</span>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Ablauf</p>
        <h2>So funktioniert ein Reinigungsauftrag</h2>
      </div>
      ${stepList(regularSteps)}
    </div>
  </section>

  <section class="section">
    <div class="container why">
      <div class="why__content reveal">
        <p class="eyebrow">Ihre Vorteile</p>
        <h2>Einmal geregelt – dauerhaft gepflegt.</h2>
        <ul class="features">
          <li><span class="features__icon">${icon('euro')}</span><div><b>Planbare Kosten</b><span>Feste monatliche Pauschale statt Einzelabrechnung.</span></div></li>
          <li><span class="features__icon">${icon('list')}</span><div><b>Klarer Reinigungsplan</b><span>Schriftlich festgehalten, was wann gereinigt wird.</span></div></li>
          <li><span class="features__icon">${icon('user')}</span><div><b>Feste Ansprechperson</b><span>Jemand, der Ihr Objekt und Ihre Wünsche kennt.</span></div></li>
          <li><span class="features__icon">${icon('repeat')}</span><div><b>Flexibel anpassbar</b><span>Intervalle und Umfang wachsen mit Ihrem Bedarf.</span></div></li>
        </ul>
      </div>
      <nav class="side-nav side-nav--card reveal" aria-label="Typische Leistungen">
        <p class="side-nav__title">Typisch im Reinigungsauftrag</p>
        ${byGroup('laufend').map(s => `<a href="/leistungen/${s.slug}">${icon(s.icon, 'i i--sm')} ${s.title}</a>`).join('')}
        <p class="side-nav__title">Ergänzend nach Bedarf</p>
        ${byGroup('sonder').map(s => `<a href="/leistungen/${s.slug}">${icon(s.icon, 'i i--sm')} ${s.title}</a>`).join('')}
      </nav>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container narrow">
      <div class="section-head section-head--center">
        <p class="eyebrow">FAQ</p>
        <h2>Häufige Fragen</h2>
      </div>
      ${faqList(regularFaq)}
    </div>
  </section>
  ${ctaBand('Ihr Objekt – dauerhaft gepflegt.', 'Wir erstellen Ihnen einen Reinigungsplan mit festem Preis. Kostenlos und unverbindlich.')}`,
});

// ── Über uns ────────────────────────────────────────────────
const ueberUns = () => ({
  path: '/ueber-uns', file: 'ueber-uns.html', active: 'ueber-uns',
  title: `Über uns – Reinigungsfirma aus Bielefeld | ${c.name}`,
  description: 'OstWest Glanz ist ein junges Reinigungsunternehmen aus Bielefeld. Persönlich, zuverlässig und mit klaren Festpreisen – für Objekte in ganz OWL.',
  schema: [breadcrumb([['Über uns', '/ueber-uns']])],
  body: `
  ${pageHero({
    crumbs: [['Über uns']],
    eyebrow: 'Über uns',
    title: 'Aus Ostwestfalen.<br>Für Ostwestfalen.',
    lead: 'Ein junges Reinigungsunternehmen aus Bielefeld – mit dem Anspruch, es von Anfang an richtig zu machen.',
  })}
  <section class="section section--tight">
    <div class="container story">
      <div class="story__text reveal">
        <h2>Der Name ist Programm</h2>
        <p class="muted-lg"><b>OstWest</b> steht für Ostwestfalen – unsere Heimat und unser Einsatzgebiet. <b>Glanz</b> für das, was wir hinterlassen.</p>
        <p>Wir haben ${c.name} gegründet, weil wir überzeugt sind: Gute Gebäudereinigung braucht keine großen Versprechen, sondern Verlässlichkeit, Sorgfalt und einen direkten Draht zum Kunden.</p>
        <p>Deshalb arbeiten wir mit festen Abläufen, klaren Festpreisen und einer Ansprechperson, die Ihr Objekt kennt.</p>
      </div>
      ${personCard()}
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Unsere Werte</p>
        <h2>Wofür wir stehen</h2>
      </div>
      <div class="values">
        <div class="value reveal"><span class="value__icon">${icon('clock')}</span><h3>Zuverlässigkeit</h3><p>Vereinbarte Termine sind für uns verbindlich – ohne Wenn und Aber.</p></div>
        <div class="value reveal"><span class="value__icon">${icon('sparkle')}</span><h3>Sorgfalt</h3><p>Wir reinigen so, wie wir es in unseren eigenen Räumen erwarten würden.</p></div>
        <div class="value reveal"><span class="value__icon">${icon('handshake')}</span><h3>Fairness</h3><p>Ehrliche Beratung und transparente Festpreise statt versteckter Kosten.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container region">
      <div class="reveal">
        <p class="eyebrow">Einsatzgebiet</p>
        <h2>Schnell vor Ort in Bielefeld und Umgebung</h2>
        <p class="muted-lg">Von unserem Standort in Bielefeld aus betreuen wir Objekte in ganz Ostwestfalen-Lippe.</p>
      </div>
      <div class="reveal">${towns()}</div>
    </div>
  </section>
  ${ctaBand('Lernen wir uns kennen.', 'Wir schauen uns Ihr Objekt kostenlos an und beraten Sie persönlich.')}`,
});

// ── Kontakt ─────────────────────────────────────────────────
const kontakt = () => ({
  path: '/kontakt', file: 'kontakt.html', active: 'kontakt',
  title: `Kontakt & kostenloses Angebot | ${c.name}`,
  description: 'Jetzt kostenloses Angebot für Ihre Gebäudereinigung in Bielefeld und OWL anfragen – per Formular, Telefon oder WhatsApp.',
  schema: [faqSchema(generalFaq), breadcrumb([['Kontakt', '/kontakt']])],
  body: `
  ${pageHero({
    crumbs: [['Kontakt']],
    eyebrow: 'Kontakt & Angebot',
    title: 'Ihr kostenloses Angebot',
    lead: 'Beschreiben Sie kurz Ihr Objekt – wir melden uns schnellstmöglich und vereinbaren einen Besichtigungstermin.',
  })}
  <section class="section section--tight">
    <div class="container contact">
      <form class="form-card" id="contact-form" action="${c.formEndpoint}" method="post" data-endpoint="${c.formEndpoint}">
        <div class="hp" aria-hidden="true"><label>Bitte leer lassen<input name="_hp" tabindex="-1" autocomplete="off"></label></div>
        <input type="hidden" name="_t" value="">
        <fieldset>
          <legend><span class="legend__num">1</span> Ihr Objekt</legend>
          <div class="form-grid">
            <label class="field"><span>Leistung</span><select name="leistung">${serviceOptions()}</select></label>
            <label class="field"><span>Art des Objekts</span><select name="objekt">${options(objectTypes)}</select></label>
            <label class="field"><span>PLZ / Ort</span><input name="ort" autocomplete="postal-code" placeholder="z. B. 33602 Bielefeld"></label>
            <label class="field"><span>Gewünschter Rhythmus</span><select name="rhythmus">${options(intervals)}</select></label>
          </div>
        </fieldset>
        <fieldset>
          <legend><span class="legend__num">2</span> Ihre Kontaktdaten</legend>
          <div class="form-grid">
            <label class="field"><span>Name *</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>Firma / Hausverwaltung <em>(optional)</em></span><input name="firma" autocomplete="organization"></label>
            <label class="field"><span>Telefon</span><input name="telefon" type="tel" autocomplete="tel"></label>
            <label class="field"><span>E-Mail *</span><input name="email" type="email" required autocomplete="email"></label>
            <label class="field field--full"><span>Nachricht <em>(optional)</em></span><textarea name="nachricht" rows="4" placeholder="z. B. Größe des Objekts, Anzahl Etagen, Besonderheiten"></textarea></label>
          </div>
        </fieldset>
        <label class="consent"><input type="checkbox" name="consent" required><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Mehr in der <a href="/datenschutz">Datenschutzerklärung</a>. *</span></label>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Anfrage absenden ${icon('arrow', 'i i--sm')}</button>
        <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
      </form>
      <div class="form-success" id="form-success" hidden tabindex="-1">
        <span class="form-success__icon">${icon('check')}</span>
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Ihre Nachricht ist bei uns eingegangen. Wir melden uns schnellstmöglich bei Ihnen und vereinbaren einen Termin.</p>
        <p class="small-muted">Eilig? Rufen Sie uns direkt an: <a href="${tel}">${c.phoneDisplay}</a></p>
      </div>

      <aside class="contact__side">
        <div class="contact-card">
          <p class="contact-card__title">Lieber direkt?</p>
          <a href="${wa}" class="contact-opt contact-opt--wa" target="_blank" rel="noopener">${icon('wa')}<span><b>WhatsApp</b>Schnellste Antwort</span>${icon('arrow', 'i i--sm contact-opt__arrow')}</a>
          <a href="${tel}" class="contact-opt">${icon('phone')}<span><b>${c.phoneDisplay}</b>${c.hours}</span>${icon('arrow', 'i i--sm contact-opt__arrow')}</a>
          <a href="${mail}" class="contact-opt">${icon('mail')}<span><b>${c.email}</b>Wir antworten zeitnah</span>${icon('arrow', 'i i--sm contact-opt__arrow')}</a>
        </div>
        ${personCard()}
      </aside>
    </div>
  </section>
  <section class="section section--soft">
    <div class="container narrow">
      <div class="section-head section-head--center">
        <p class="eyebrow">FAQ</p>
        <h2>Häufige Fragen</h2>
      </div>
      ${faqList(generalFaq)}
    </div>
  </section>`,
});

// ── Rechtliches ─────────────────────────────────────────────
// Platzhalter werden sichtbar markiert, bis die echten Angaben in src/data.js stehen.
const ph = v => (isPlaceholder(v) ? `<mark class="ph">${v}</mark>` : v);
const address = (sep = '<br>') => `${ph(c.street)}${sep}${ph(c.zip)} ${c.city}`;
const owner = () => ph(c.owner);
const telLink = `<a href="${tel}">${c.phoneDisplay}</a>`;
const mailLink = `<a href="${mail}">${c.email}</a>`;

const legalPage = ({ path, file, title, description, lead, sections, after = '' }) => ({
  path, file, noindex: true, title: `${title} | ${c.name}`, description,
  schema: [breadcrumb([[title, path]])],
  body: `
  ${pageHero({ crumbs: [[title]], eyebrow: 'Rechtliches', title, lead })}
  <section class="section section--tight">
    <div class="container legal-layout">
      <nav class="legal-toc" aria-label="Inhalt">
        <p class="legal-toc__title">Inhalt</p>
        <ol>${sections.map(([id, h]) => `<li><a href="#${id}">${h}</a></li>`).join('')}</ol>
        <div class="legal-toc__links">
          ${[['/impressum', 'Impressum'], ['/datenschutz', 'Datenschutz'], ['/agb', 'AGB']].filter(([p]) => p !== path).map(([p, t]) => `<a href="${p}">${t} ${icon('arrow', 'i i--sm')}</a>`).join('')}
        </div>
      </nav>
      <div class="legal">
        ${sections.map(([id, h, html]) => `<section id="${id}" class="legal__section"><h2>${h}</h2>${html}</section>`).join('')}
        ${after}
        <p class="legal__stand">Stand: ${c.legalUpdated}</p>
      </div>
    </div>
  </section>`,
});

const impressum = () => legalPage({
  path: '/impressum', file: 'impressum.html', title: 'Impressum',
  description: `Impressum von ${c.legalName}, Bielefeld.`,
  lead: `Anbieterkennzeichnung von ${c.legalName}.`,
  sections: [
    ['angaben', 'Angaben gemäß § 5 DDG', `
      <p><b>${c.legalName}</b><br>Inhaber: ${owner()}<br>${address()}<br>Deutschland</p>`],
    ['kontakt', 'Kontakt', `
      <p>Telefon: ${telLink}<br>E-Mail: ${mailLink}</p>`],
    ['umsatzsteuer', 'Umsatzsteuer-ID', `
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>${ph(c.vatId)}</p>`],
    ['berufsangaben', 'Berufsbezeichnung und Kammer', `
      <p>Tätigkeit: Gebäudereinigung<br>Zuständige Kammer: ${ph(c.chamber)}</p>`],
    ['verantwortlich', 'Verantwortlich für den Inhalt', `
      <p>Gemäß § 18 Abs. 2 MStV:<br>${owner()}, ${address(', ')}</p>`],
    ['streitbeilegung', 'Verbraucherstreitbeilegung', `
      <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).</p>`],
    ['haftung-inhalte', 'Haftung für Inhalte', `
      <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.</p>`],
    ['haftung-links', 'Haftung für Links', `
      <p>Unser Angebot enthält Links zu externen Websites Dritter (z. B. WhatsApp), auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>`],
    ['urheberrecht', 'Urheberrecht', `
      <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten – einschließlich Texten, Logo und Gestaltung – unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>`],
  ],
});

const datenschutz = () => legalPage({
  path: '/datenschutz', file: 'datenschutz.html', title: 'Datenschutzerklärung',
  description: `Datenschutzerklärung von ${c.legalName}: Welche Daten wir verarbeiten und welche Rechte Sie haben.`,
  lead: 'Transparent: welche Daten wir verarbeiten, wofür – und welche Rechte Sie haben.',
  sections: [
    ['ueberblick', '1. Datenschutz auf einen Blick', `
      <p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen oder uns kontaktieren. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
      <p>Wir verarbeiten nur die Daten, die für den Betrieb dieser Website und die Bearbeitung Ihrer Anfragen und Aufträge erforderlich sind. Diese Website verwendet keine Cookies, kein Tracking und keine Werbedienste.</p>`],
    ['verantwortlicher', '2. Verantwortlicher', `
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <p><b>${c.legalName}</b><br>Inhaber: ${owner()}<br>${address()}<br>Telefon: ${telLink}<br>E-Mail: ${mailLink}</p>
      <p>Verantwortlicher ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>`],
    ['hosting', '3. Hosting', `
      <p>Diese Website wird gehostet von der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Beim Aufruf unserer Website werden technische Daten wie Ihre IP-Adresse auf den Servern des Anbieters verarbeitet. Der Anbieter verarbeitet diese Daten ausschließlich zur Erfüllung seiner Leistungspflichten und nach unseren Weisungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer sicheren und effizienten Bereitstellung unseres Onlineangebots.</p>
      <p>Die Datenverarbeitung kann dabei auch in den USA erfolgen. Grundlage der Übermittlung sind die Zertifizierung des Anbieters unter dem EU-US Data Privacy Framework sowie Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO). Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.</p>`],
    ['logfiles', '4. Server-Log-Dateien', `
      <p>Der Provider dieser Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nach kurzer Zeit automatisch gelöscht.</p>
      <p>Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung, der Sicherheit und der Optimierung unserer Website.</p>`],
    ['cookies', '5. Cookies, Tracking und lokale Speicherung', `
      <p>Diese Website setzt keine Cookies und verwendet keinerlei Tracking-, Analyse- oder Werbedienste. Es findet keine Auswertung Ihres Nutzungsverhaltens statt, und es werden keine Daten im lokalen Speicher Ihres Browsers abgelegt. Ein Cookie-Banner ist daher nicht erforderlich.</p>`],
    ['schriftarten', '6. Schriftarten', `
      <p>Zur einheitlichen Darstellung verwenden wir Schriftarten, die direkt von unserem eigenen Server geladen werden. Eine Verbindung zu Servern von Google oder anderen Anbietern findet dabei nicht statt.</p>`],
    ['kontaktformular', '7. Kontakt- und Angebotsformular', `
      <p>Wenn Sie unser Formular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten: Name, E-Mail-Adresse sowie – freiwillig – Telefonnummer, Firma, PLZ/Ort, gewünschte Leistung, Art des Objekts, Reinigungsrhythmus und Ihre Nachricht. Die Angabe von Name und E-Mail-Adresse ist erforderlich, damit wir Ihre Anfrage beantworten können.</p>
      <p>Die Daten werden verschlüsselt an unseren Server übertragen und von dort als E-Mail an unser Postfach weitergeleitet. Eine Speicherung in einer Datenbank der Website findet nicht statt. Zum Schutz vor Missbrauch – etwa automatisierten Spam-Anfragen – wird Ihre IP-Adresse kurzzeitig im Arbeitsspeicher des Servers verarbeitet und nach etwa zehn Minuten verworfen.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss eines Vertrags gerichtet ist. Im Übrigen beruht die Verarbeitung auf unserem berechtigten Interesse an der Beantwortung von Anfragen und am Schutz vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO).</p>`],
    ['email', '8. E-Mail-Postfach und E-Mail-Versand', `
      <p>Für unser E-Mail-Postfach und den Versand der Formularanfragen nutzen wir die Dienste der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland. Die Daten werden in Rechenzentren in der Europäischen Union verarbeitet. Mit IONOS besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO.</p>`],
    ['direktkontakt', '9. Kontakt per E-Mail, Telefon oder WhatsApp', `
      <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zweck der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO.</p>
      <p>Auf unserer Website verlinken wir auf WhatsApp. Es handelt sich um einen einfachen Link – beim bloßen Aufruf unserer Website werden keine Daten an WhatsApp übertragen. Erst wenn Sie den Link aktiv anklicken und uns über WhatsApp schreiben, werden Daten von der WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, verarbeitet; dabei kann auch eine Übermittlung in die USA erfolgen. Es gelten die Datenschutzbestimmungen von WhatsApp. Wenn Sie dies nicht wünschen, erreichen Sie uns jederzeit auch per Telefon, E-Mail oder Formular.</p>`],
    ['auftraege', '10. Kunden- und Auftragsdaten', `
      <p>Wenn Sie uns mit Reinigungsleistungen beauftragen, verarbeiten wir die zur Durchführung erforderlichen Daten – etwa Name, Anschrift, Kontaktdaten, Objektadresse, Angaben zum Objekt, Zugangsinformationen sowie Rechnungs- und Zahlungsdaten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie, soweit gesetzliche Aufbewahrungspflichten bestehen, Art. 6 Abs. 1 lit. c DSGVO.</p>`],
    ['speicherdauer', '11. Speicherdauer', `
      <p>Soweit in dieser Erklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben – etwa handels- oder steuerrechtliche Aufbewahrungsfristen von je nach Art der Unterlagen sechs, acht oder zehn Jahren.</p>`],
    ['widerspruch', '12. Widerspruchsrecht nach Art. 21 DSGVO', `
      <p>Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Wir verarbeiten die betreffenden Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>`],
    ['rechte', '13. Ihre Rechte', `
      <p>Sie haben jederzeit das Recht,</p>
      <ul>
        <li>unentgeltlich Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO),</li>
        <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO),</li>
        <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO),</li>
        <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO),</li>
        <li>Ihre Daten in einem übertragbaren Format zu erhalten (Art. 20 DSGVO),</li>
        <li>der Verarbeitung zu widersprechen (Art. 21 DSGVO) und</li>
        <li>eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO).</li>
      </ul>
      <p>Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.</p>`],
    ['verschluesselung', '14. SSL- bzw. TLS-Verschlüsselung', `
      <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit „https://“ beginnt und ein Schloss-Symbol angezeigt wird. Daten, die Sie über das Formular an uns übermitteln, können so nicht von Dritten mitgelesen werden.</p>`],
    ['fragen', '15. Fragen zum Datenschutz', `
      <p>Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten wenden Sie sich bitte an: ${mailLink}</p>`],
  ],
});

const agb = () => legalPage({
  path: '/agb', file: 'agb.html', title: 'Allgemeine Geschäftsbedingungen',
  description: `Allgemeine Geschäftsbedingungen (AGB) von ${c.legalName} für Reinigungs- und Serviceleistungen.`,
  lead: 'Für alle Reinigungs- und Serviceleistungen – fair, verständlich und transparent.',
  sections: [
    ['geltungsbereich', '§ 1 Geltungsbereich', `
      <p>(1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Reinigungs- und Serviceleistungen zwischen ${c.legalName}, Inhaber ${owner()}, ${address(', ')} (nachfolgend „${c.name}“ oder „wir“) und ihren Auftraggebern.</p>
      <p>(2) Auftraggeber können Verbraucher (§ 13 BGB) oder Unternehmer (§ 14 BGB) sein. Abweichende oder ergänzende Bedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, wir stimmen ihrer Geltung ausdrücklich schriftlich zu.</p>
      <p>(3) Individuelle Vereinbarungen im Angebot oder in der Auftragsbestätigung haben Vorrang vor diesen AGB.</p>`],
    ['vertragsschluss', '§ 2 Angebot und Vertragsschluss', `
      <p>(1) Die Darstellung unserer Leistungen auf dieser Website stellt kein rechtlich verbindliches Angebot dar, sondern eine Aufforderung zur Anfrage.</p>
      <p>(2) Auf Grundlage einer Besichtigung oder Ihrer Angaben erstellen wir ein schriftliches Angebot. Sofern nicht anders angegeben, halten wir uns 30 Tage an dieses Angebot gebunden.</p>
      <p>(3) Der Vertrag kommt zustande, wenn der Auftraggeber das Angebot schriftlich oder in Textform (z. B. per E-Mail) annimmt oder wir den Auftrag schriftlich bzw. in Textform bestätigen.</p>
      <p>(4) Beruht das Angebot auf Angaben des Auftraggebers (z. B. Flächen oder Verschmutzungsgrad) und weichen die tatsächlichen Verhältnisse erheblich davon ab, informieren wir den Auftraggeber vor Beginn der Arbeiten und sind berechtigt, eine angemessene Anpassung der Vergütung zu verlangen.</p>`],
    ['leistungsumfang', '§ 3 Leistungsumfang', `
      <p>(1) Art, Umfang und Intervalle der Leistungen ergeben sich aus dem Angebot bzw. dem vereinbarten Leistungsverzeichnis.</p>
      <p>(2) Zusätzliche Leistungen, die nicht vereinbart sind, erbringen wir nach vorheriger Absprache und berechnen sie gesondert.</p>
      <p>(3) Reinigungsmittel und Arbeitsgeräte stellen wir, soweit nichts anderes vereinbart ist.</p>
      <p>(4) Wir sind berechtigt, zur Ausführung geeignete Mitarbeitende oder Nachunternehmer einzusetzen. Die Verantwortung für die ordnungsgemäße Ausführung bleibt bei uns.</p>`],
    ['mitwirkung', '§ 4 Mitwirkungspflichten des Auftraggebers', `
      <p>(1) Der Auftraggeber ermöglicht zu den vereinbarten Zeiten den Zugang zu den zu reinigenden Räumen und Flächen.</p>
      <p>(2) Wasser und Strom stellt der Auftraggeber in angemessenem Umfang unentgeltlich zur Verfügung. Für regelmäßige Aufträge wird nach Möglichkeit ein abschließbarer Raum für Reinigungsmittel und Geräte bereitgestellt.</p>
      <p>(3) Der Auftraggeber weist uns vor Beginn der Arbeiten auf besonders empfindliche Oberflächen, Materialien oder Gegenstände sowie auf besondere Gefahren im Objekt hin.</p>
      <p>(4) Wertgegenstände, Bargeld und vertrauliche Unterlagen sind vom Auftraggeber sicher zu verwahren.</p>
      <p>(5) Kann eine Leistung aus Gründen, die der Auftraggeber zu vertreten hat, nicht erbracht werden (z. B. kein Zugang zum Objekt), bleibt unser Vergütungsanspruch nach den gesetzlichen Vorschriften bestehen; ersparte Aufwendungen lassen wir uns anrechnen.</p>`],
    ['termine', '§ 5 Termine und Terminabsagen', `
      <p>(1) Termine werden individuell vereinbart. Bei regelmäßigen Aufträgen gelten die im Angebot festgelegten Intervalle und Zeiten.</p>
      <p>(2) Kann ein Termin aus Gründen, die wir nicht zu vertreten haben (z. B. höhere Gewalt oder Witterung bei Außenarbeiten), nicht eingehalten werden, informieren wir den Auftraggeber unverzüglich und vereinbaren einen Ersatztermin.</p>
      <p>(3) Möchte der Auftraggeber einen vereinbarten Termin absagen oder verschieben, bitten wir um Mitteilung mindestens 24 Stunden vorher. Bei späterer Absage können wir die vereinbarte Vergütung abzüglich ersparter Aufwendungen verlangen; dem Auftraggeber bleibt der Nachweis vorbehalten, dass uns kein oder ein geringerer Schaden entstanden ist.</p>`],
    ['preise', '§ 6 Preise und Zahlung', `
      <p>(1) Es gelten die im Angebot vereinbarten Preise. Gegenüber Verbrauchern sind alle Preise Endpreise einschließlich der gesetzlichen Umsatzsteuer, soweit diese anfällt. Gegenüber Unternehmern verstehen sich die Preise zuzüglich der gesetzlichen Umsatzsteuer, soweit diese anfällt.</p>
      <p>(2) Einmalige Leistungen werden nach Ausführung abgerechnet. Regelmäßige Leistungen werden, sofern nichts anderes vereinbart ist, monatlich abgerechnet.</p>
      <p>(3) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug gelten die gesetzlichen Vorschriften.</p>
      <p>(4) Bei regelmäßigen Aufträgen können wir die Preise bei einer Erhöhung der Lohn- oder Sachkosten – insbesondere des Branchenmindestlohns im Gebäudereinigerhandwerk – angemessen anpassen. Wir teilen eine Preisanpassung mindestens einen Monat vor ihrem Inkrafttreten in Textform mit. Der Auftraggeber kann den Vertrag in diesem Fall zum Zeitpunkt des Inkrafttretens der Preisanpassung kündigen.</p>`],
    ['schluessel', '§ 7 Schlüssel und Zugangsmittel', `
      <p>(1) Schlüssel, Transponder oder Zugangscodes übernehmen wir gegen schriftliche Quittung, verwahren sie sorgfältig und verwenden sie ausschließlich zur Ausführung des Auftrags.</p>
      <p>(2) Bei Vertragsende geben wir alle Zugangsmittel unverzüglich und vollständig zurück.</p>
      <p>(3) Für den Verlust von Schlüsseln oder Zugangsmitteln haften wir nach den gesetzlichen Vorschriften und § 9 dieser AGB.</p>`],
    ['beanstandungen', '§ 8 Beanstandungen und Gewährleistung', `
      <p>(1) Der Auftraggeber prüft die Leistung möglichst zeitnah nach der Ausführung. Erkennbare Mängel sollen uns innerhalb von zwei Werktagen mitgeteilt werden – möglichst mit Fotos –, damit wir den Zustand beurteilen und kurzfristig nachbessern können.</p>
      <p>(2) Bei berechtigten Beanstandungen bessern wir kostenlos nach. Schlägt die Nachbesserung fehl, stehen dem Auftraggeber die gesetzlichen Rechte zu.</p>
      <p>(3) Die gesetzlichen Rechte von Verbrauchern werden durch diese Regelung nicht eingeschränkt.</p>`],
    ['haftung', '§ 9 Haftung', `
      <p>(1) Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.</p>
      <p>(2) Bei leichter Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.</p>
      <p>(3) Für Schäden, die auf nicht mitgeteilte, besondere Material- oder Oberflächeneigenschaften zurückzuführen sind (z. B. nicht wasser- oder farbbeständige Oberflächen), haften wir nicht, sofern diese für uns bei Anwendung der üblichen Sorgfalt nicht erkennbar waren.</p>
      <p>(4) Schäden sollen uns unverzüglich nach ihrer Entdeckung mitgeteilt werden.</p>
      <p>(5) Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.</p>`],
    ['laufzeit', '§ 10 Laufzeit und Kündigung regelmäßiger Aufträge', `
      <p>(1) Regelmäßige Reinigungsaufträge laufen auf unbestimmte Zeit, sofern im Angebot keine feste Laufzeit vereinbart ist.</p>
      <p>(2) Sie können von beiden Seiten mit einer Frist von einem Monat zum Monatsende in Textform gekündigt werden, sofern im Angebot nichts anderes vereinbart ist.</p>
      <p>(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>`],
    ['widerruf', '§ 11 Widerrufsrecht für Verbraucher', `
      <p>Verbrauchern steht ein gesetzliches Widerrufsrecht zu, wenn der Vertrag ausschließlich über Fernkommunikationsmittel (z. B. per E-Mail, Telefon oder über unser Kontaktformular) oder außerhalb unserer Geschäftsräume geschlossen wird.</p>
      <div class="legal-box">
        <h3>Widerrufsbelehrung</h3>
        <h4>Widerrufsrecht</h4>
        <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
        <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns – ${c.legalName}, Inhaber ${owner()}, ${address(', ')}, Telefon ${c.phoneDisplay}, E-Mail ${mailLink} – mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</p>
        <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
        <h4>Folgen des Widerrufs</h4>
        <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
        <p>Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>
        <h4>Erlöschen des Widerrufsrechts</h4>
        <p>Das Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren (§ 356 Abs. 4 BGB).</p>
        <p class="legal-box__end">– Ende der Widerrufsbelehrung –</p>
      </div>`],
    ['datenschutz', '§ 12 Datenschutz', `
      <p>Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>`],
    ['schluss', '§ 13 Schlussbestimmungen', `
      <p>(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht der Schutz entzogen wird, der durch zwingende Bestimmungen des Rechts des Staates gewährt wird, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat.</p>
      <p>(2) Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand Bielefeld.</p>
      <p>(3) Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <p>(4) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>`],
    ['widerrufsformular', 'Muster-Widerrufsformular', `
      <div class="legal-form">
        <p class="legal-form__hint">(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
        <p><b>An:</b><br>${c.legalName}<br>Inhaber: ${owner()}<br>${address()}<br>E-Mail: ${c.email}</p>
        <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*)</p>
        <p class="legal-form__line">&nbsp;</p>
        <p>Bestellt am (*) / erhalten am (*):</p><p class="legal-form__line">&nbsp;</p>
        <p>Name des/der Verbraucher(s):</p><p class="legal-form__line">&nbsp;</p>
        <p>Anschrift des/der Verbraucher(s):</p><p class="legal-form__line">&nbsp;</p>
        <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p><p class="legal-form__line">&nbsp;</p>
        <p>Datum:</p><p class="legal-form__line">&nbsp;</p>
        <p class="legal-form__hint">(*) Unzutreffendes streichen.</p>
      </div>`],
  ],
});

const statusPage = (path, file, title, h1, text, ok) => ({
  path, file, title: `${title} | ${c.name}`, description: title, noindex: true,
  body: `
  <section class="section notfound">
    <div class="container narrow">
      <span class="status-icon${ok ? '' : ' status-icon--error'}">${icon(ok ? 'check' : 'close')}</span>
      <h1>${h1}</h1>
      <p class="lead">${text}</p>
      <div class="actions actions--center">
        <a href="${tel}" class="btn btn--primary">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
        <a href="${wa}" class="btn btn--ghost" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp</a>
        <a href="/" class="btn btn--ghost">Zur Startseite</a>
      </div>
    </div>
  </section>`,
});

const notFound = () => ({
  path: '/404', file: '404.html', noindex: true,
  title: `Seite nicht gefunden | ${c.name}`, description: 'Diese Seite existiert nicht.',
  body: `
  <section class="section notfound">
    <div class="container narrow">
      <p class="notfound__code">404</p>
      <h1>Hier ist leider nichts – aber dafür blitzsauber.</h1>
      <p class="lead">Die gesuchte Seite gibt es nicht (mehr). Vielleicht hilft Ihnen einer dieser Links weiter:</p>
      <div class="actions actions--center"><a href="/" class="btn btn--primary">Zur Startseite</a><a href="/leistungen" class="btn btn--ghost">Leistungen</a><a href="/kontakt" class="btn btn--ghost">Kontakt</a></div>
    </div>
  </section>`,
});

export const pages = () => [
  home(), leistungen(), ...services.map(servicePage), unternehmen(), regelmaessig(), ueberUns(), kontakt(),
  impressum(), datenschutz(), agb(), notFound(),
  statusPage('/danke', 'danke.html', 'Anfrage gesendet', 'Vielen Dank für Ihre Anfrage!', 'Ihre Nachricht ist bei uns eingegangen. Wir melden uns schnellstmöglich bei Ihnen und vereinbaren einen Termin.', true),
  statusPage('/anfrage-fehlgeschlagen', 'anfrage-fehlgeschlagen.html', 'Anfrage nicht gesendet', 'Ihre Anfrage konnte nicht gesendet werden.', 'Bitte prüfen Sie Ihre Angaben oder erreichen Sie uns direkt per Telefon oder WhatsApp.', false),
];
