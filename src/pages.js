import { company as c, services, serviceGroups, objectTypes, intervals, generalFaq, audiencePage, regularPage } from './data.js';
import { icon } from './icons.js';
import { picture } from './images.js';
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

const steps = [
  ['Anfrage stellen', 'Per Formular, Telefon oder WhatsApp – ein paar Angaben zum Objekt genügen.'],
  ['Objekt besichtigen', 'Wir kommen vorbei und klären, was gereinigt werden soll und wie oft.'],
  ['Festpreis erhalten', 'Sie bekommen ein schriftliches Angebot mit festem Preis.'],
  ['Reinigung starten', 'Wir beginnen zum vereinbarten Termin und nach festem Plan.'],
];

const facts = [
  ['Kostenlose Besichtigung', 'Wir sehen uns Ihr Objekt vor Ort an, bevor wir ein Angebot machen.'],
  ['Transparente Festpreise', 'Sie erhalten einen festen Preis für den vereinbarten Leistungsumfang.'],
  ['Fester Ansprechpartner', 'Sie sprechen direkt mit dem Inhaber – ohne Umwege über eine Hotline.'],
  ['Flexible Reinigungszeiten', 'Früh morgens, abends oder am Wochenende – passend zu Ihrem Betrieb.'],
];

const homeServices = [
  { title: 'Treppenhausreinigung', text: 'Treppen, Podeste, Eingänge und Briefkastenanlagen – im festen Rhythmus.', href: '/leistungen/treppenhausreinigung', image: 'treppenhaus' },
  { title: 'Büro- und Praxisreinigung', text: 'Arbeitsplätze, Sanitärräume und Küchen – vor oder nach Ihren Öffnungszeiten.', href: '/leistungen/buero-und-praxisreinigung', image: 'buero' },
  { title: 'Gebäudereinigung', text: 'Laufende Unterhaltsreinigung für Wohnanlagen und Gewerbeobjekte.', href: '/leistungen/gebaeudereinigung', image: 'gebaeude' },
  { title: 'Grund- und Sonderreinigung', text: 'Grundreinigung, Bauendreinigung, Fenster- und Glasreinigung – einmalig oder nach Bedarf.', href: '/leistungen#sonderreinigung', image: 'sonderreinigung' },
];

const audiences = [
  {
    id: 'hausverwaltungen',
    image: 'hausverwaltung',
    title: 'Hausverwaltungen & Eigentümergemeinschaften',
    text: 'Für Wohnanlagen übernehmen wir die laufende Pflege der Gemeinschaftsflächen. Sie geben den Rahmen vor, wir halten uns an den vereinbarten Plan – und Mieter haben einen gepflegten Eingang.',
    points: ['Treppenhaus-, Keller- und Außenflächenreinigung', 'Mülltonnenservice nach Abfuhrkalender', 'Abrechnung auf Wunsch je Objekt – für die Betriebskostenabrechnung', 'Mehrere Objekte, ein Ansprechpartner'],
    services: ['treppenhausreinigung', 'muelltonnenservice', 'kellerreinigung', 'grundreinigung'],
  },
  {
    id: 'unternehmen',
    image: 'buero',
    title: 'Unternehmen, Büros & Praxen',
    text: 'In Büros und Praxen reinigen wir dann, wenn der Betrieb ruht. Was wann gereinigt wird, legen wir gemeinsam in einem Reinigungsplan fest.',
    points: ['Reinigung vor oder nach Ihren Öffnungszeiten', 'Schriftlicher Reinigungsplan mit festen Intervallen', 'Glas-, Fenster- und Grundreinigung aus einer Hand', 'Feste monatliche Kosten'],
    services: ['buero-und-praxisreinigung', 'glasreinigung', 'fensterreinigung', 'bauendreinigung'],
  },
];

const deliverables = [
  ['Reinigungsplan', 'Welche Bereiche wie oft gereinigt werden, halten wir schriftlich fest. Änderungen stimmen wir gemeinsam ab.'],
  ['Ansprechpartner', `${ownerName()} ist als Inhaber Ihr direkter Kontakt – telefonisch, per WhatsApp oder vor Ort.`],
  ['Kosten', 'Festpreis für einmalige Leistungen, monatliche Pauschale für regelmäßige Aufträge.'],
  ['Abrechnung', 'Eine Rechnung für alle Leistungen. Bei mehreren Objekten auf Wunsch getrennt ausgewiesen.'],
  ['Reinigungszeiten', 'Früh morgens, abends oder am Wochenende – so, dass Ihr Betrieb nicht gestört wird.'],
  ['Zugang & Schlüssel', 'Übergabe gegen Quittung, sorgfältige Verwahrung, vollständige Rückgabe bei Vertragsende.'],
];

const b2bFaq = [
  ['Betreuen Sie auch mehrere Objekte?', 'Ja. Ob eine Wohnanlage oder mehrere Standorte – Sie haben einen Ansprechpartner und erhalten die Abrechnung auf Wunsch je Objekt.'],
  ['Sind die Reinigungskosten auf Mieter umlegbar?', 'Die Kosten der Gebäudereinigung zählen in der Regel zu den umlagefähigen Betriebskosten nach § 2 BetrKV. Wir weisen die Leistungen auf Wunsch je Objekt getrennt aus.'],
  ['Wie lange läuft ein Reinigungsvertrag?', 'Laufzeit und Kündigungsfrist vereinbaren wir individuell und halten sie im Angebot fest.'],
  ['Wie wird der Zugang zum Objekt geregelt?', 'Schlüssel oder Zugangsmedien übernehmen wir gegen Quittung und verwahren sie sorgfältig. Bei Vertragsende geben wir sie vollständig zurück.'],
];

const regularIntervals = [
  ['Täglich', 'Täglich / mehrmals pro Woche', 'Büros, Praxen und stark genutzte Bereiche'],
  ['Wöchentlich', 'Wöchentlich', 'Treppenhäuser, kleinere Büros, Ladenlokale'],
  ['14-täglich', 'Alle 14 Tage', 'Wohnanlagen mit normaler Nutzung'],
  ['Monatlich', 'Monatlich', 'Keller, Fenster, Glas und Außenflächen'],
];

const regularSteps = [
  ['Besichtigung', 'Wir sehen uns das Objekt an und klären Ihre Anforderungen.'],
  ['Reinigungsplan', 'Wir halten fest, welche Bereiche wie oft gereinigt werden.'],
  ['Feste Termine', 'Gereinigt wird zu festen Zeiten – Sie wissen immer, wann wir da sind.'],
  ['Anpassung', 'Ändert sich Ihr Bedarf, passen wir den Plan gemeinsam an.'],
];

const regularFaq = [
  ['Kann ich den Rhythmus später ändern?', 'Ja. Ändert sich Ihr Bedarf, passen wir Intervalle und Leistungsumfang gemeinsam an.'],
  ['Wie wird abgerechnet?', 'In der Regel über eine feste monatliche Pauschale auf Basis des vereinbarten Leistungsumfangs – so bleiben Ihre Kosten planbar.'],
  ['Was passiert, wenn ein Termin auf einen Feiertag fällt?', 'Dann stimmen wir rechtzeitig einen Ersatztermin mit Ihnen ab.'],
  ['Wie lange läuft ein Reinigungsauftrag?', 'Laufzeit und Kündigungsfrist vereinbaren wir individuell und halten sie im Angebot fest.'],
];

const workingPrinciples = [
  ['Erst ansehen, dann anbieten', 'Ein Angebot erstellen wir nach einer Besichtigung. So passt der Preis zum tatsächlichen Aufwand.'],
  ['Schriftlich festgehalten', 'Leistungsumfang, Intervalle und Preis stehen im Angebot – und daran halten wir uns.'],
  ['Ein direkter Draht', 'Sie erreichen den Inhaber persönlich, statt bei einer Zentrale anzurufen.'],
  ['Nachbessern, wenn etwas nicht passt', 'Melden Sie uns Mängel – wir kommen und bessern nach.'],
];

// ── Bausteine ───────────────────────────────────────────────
const serviceRow = s => `
  <article class="srow reveal">
    ${s.image ? `<a href="/leistungen/${s.slug}" class="srow__media" tabindex="-1" aria-hidden="true">${picture(s.image, { sizes: '160px' })}</a>` : `<span class="srow__media srow__media--icon">${icon(s.icon)}</span>`}
    <div class="srow__body">
      <h3 class="srow__title"><a href="/leistungen/${s.slug}">${s.title}</a></h3>
      <p>${s.short}</p>
      <p class="srow__includes">${s.includes.slice(0, 3).join(' · ')}</p>
    </div>
    <a href="/leistungen/${s.slug}" class="srow__arrow" aria-label="${s.title} ansehen">${icon('arrow')}</a>
  </article>`;

const imageTile = ({ title, text, href, image }, h = 'h3', sizes = '(max-width: 760px) 100vw, 50vw') => `
  <a href="${href}" class="tile reveal">
    <span class="tile__media">${picture(image, { sizes })}</span>
    <span class="tile__body">
      <${h} class="tile__title">${title}</${h}>
      <span class="tile__text">${text}</span>
      <span class="tile__more">Mehr erfahren ${icon('arrow', 'i i--sm')}</span>
    </span>
  </a>`;

const stepLine = (list, cls = '') => `
  <ol class="stepline ${cls}">
    ${list.map(([t, d], i) => `<li class="stepline__item"><span class="stepline__num">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}
  </ol>`;

const towns = () => `
  <ul class="towns">
    ${c.towns.map((t, i) => `<li${i === 0 ? ' class="is-home"' : ''}>${t}</li>`).join('')}
  </ul>`;

const avatar = (cls = '') => (c.ownerPhoto
  ? `<img class="avatar ${cls}" src="${c.ownerPhoto}" alt="${ownerName()}" width="96" height="96" loading="lazy">`
  : `<span class="avatar avatar--initials ${cls}" aria-hidden="true">${c.ownerInitials}</span>`);

const contactList = () => `
  <ul class="contact-list">
    <li><a href="${tel}">${icon('phone')}<span><small>Telefon</small>${c.phoneDisplay}</span></a></li>
    <li><a href="${wa}" target="_blank" rel="noopener" class="is-wa">${icon('wa')}<span><small>WhatsApp</small>Nachricht schreiben</span></a></li>
    <li><a href="${mail}">${icon('mail')}<span><small>E-Mail</small>${c.email}</span></a></li>
  </ul>`;

const gallery = () => (c.gallery.length ? `
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Einblicke in unsere Arbeit</h2>
        <p class="lead">Aufnahmen aus Objekten, die wir betreuen.</p>
      </div>
      <div class="gallery">
        ${c.gallery.map(g => `<figure class="gallery__item reveal"><img src="${g.src}" alt="${g.alt}" loading="lazy" decoding="async">${g.caption ? `<figcaption>${g.caption}</figcaption>` : ''}</figure>`).join('')}
      </div>
    </div>
  </section>` : '');

// ── Startseite ──────────────────────────────────────────────
const home = () => ({
  path: '/', file: 'index.html', active: 'start',
  title: `Gebäudereinigung Bielefeld & OWL | ${c.name}`,
  description: 'Gebäudereinigung in Bielefeld & OWL: Treppenhaus, Büro & Praxis, Unterhalts-, Grund- und Glasreinigung. Kostenlose Besichtigung, fester Preis.',
  body: `
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__content">
        <h1 class="hero__title"><span class="hero__kicker">${icon('pin', 'i i--sm')} Gebäudereinigung in Bielefeld &amp; OWL</span>Saubere Gebäude. <span class="hero__accent">Weniger Aufwand für Sie.</span></h1>
        <p class="lead">Wir übernehmen die regelmäßige Reinigung Ihrer Treppenhäuser, Büros und Gewerbeobjekte – mit festen Abläufen und einem direkten Ansprechpartner.</p>
        <div class="actions">
          <a href="/kontakt" class="btn btn--primary btn--lg">Kostenloses Angebot anfordern ${icon('arrow', 'i i--sm')}</a>
          <a href="#leistungen" class="btn btn--ghost btn--lg">Leistungen ansehen</a>
        </div>
        <p class="hero__contact">Lieber direkt? <a href="${tel}">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a> <a href="${wa}" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp</a></p>
      </div>
      <figure class="hero__media">
        ${picture('hero', { sizes: '(max-width: 980px) 100vw, 42vw', eager: true })}
        <figcaption class="hero__person">
          ${avatar()}
          <span><small>Ihr Ansprechpartner</small><b>${ownerName()}</b><a href="${tel}">${c.phoneDisplay}</a></span>
        </figcaption>
      </figure>
    </div>

    <div class="container">
      <form class="quickbar" id="anfrage" action="/kontakt" method="get" aria-label="Schnellanfrage">
        <p class="quickbar__label"><b>Schnellanfrage</b><span>In drei Angaben zum Angebot</span></p>
        <label class="field"><span>Leistung</span><select name="leistung">${serviceOptions()}</select></label>
        <label class="field"><span>Art des Objekts</span><select name="objekt">${options(objectTypes)}</select></label>
        <label class="field"><span>PLZ oder Ort</span><input name="ort" placeholder="z. B. 33602 Bielefeld" autocomplete="postal-code"></label>
        <button class="btn btn--primary btn--lg" type="submit">Weiter ${icon('arrow', 'i i--sm')}</button>
      </form>
    </div>
  </section>

  <section class="facts" aria-label="Was Sie bei uns bekommen">
    <div class="container facts__grid">
      ${facts.map(([t, d]) => `<div class="facts__item"><b>${icon('check', 'i i--sm')} ${t}</b><span>${d}</span></div>`).join('')}
    </div>
  </section>

  <section class="section" id="leistungen">
    <div class="container">
      <div class="section-head section-head--row">
        <h2>Was wir für Sie übernehmen</h2>
        <a href="/leistungen" class="link-arrow">Alle Leistungen ${icon('arrow', 'i i--sm')}</a>
      </div>
      <div class="tiles">
        ${homeServices.map(t => imageTile(t)).join('')}
      </div>
      <div class="more-services">
        <p><b>Außerdem:</b> ${['kellerreinigung', 'muelltonnenservice', 'parkhaus-und-parkplatzreinigung', 'bauendreinigung', 'fensterreinigung', 'glasreinigung'].map(bySlug).map(s => `<a href="/leistungen/${s.slug}">${s.title}</a>`).join('<span aria-hidden="true"> · </span>')}</p>
        <a href="${regularPage.path}" class="more-services__regular">${icon('repeat')} <span><b>Laufende Betreuung gewünscht?</b> Regelmäßige Reinigung im festen Rhythmus</span> ${icon('arrow', 'i i--sm')}</a>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container story">
      <figure class="story__media reveal">
        ${picture('sparrenburg', { sizes: '(max-width: 980px) 100vw, 45vw' })}
        <figcaption>Die Sparrenburg in Bielefeld</figcaption>
      </figure>
      <div class="story__text reveal">
        <h2>Aus Ostwestfalen. Für Ostwestfalen.</h2>
        <p class="muted-lg">${c.name} ist ein Reinigungsbetrieb aus Bielefeld. Inhaber ${ownerName()} ist Ihr direkter Ansprechpartner – von der ersten Besichtigung bis zur laufenden Betreuung.</p>
        <p>Wir arbeiten mit festen Abläufen und klaren Absprachen: Was gereinigt wird, wie oft und zu welchem Preis, steht vorher schriftlich fest.</p>
        <a href="/ueber-uns" class="link-arrow">Mehr über uns ${icon('arrow', 'i i--sm')}</a>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="section-head">
        <h2>So kommen Sie zu Ihrem Angebot</h2>
      </div>
      ${stepLine(steps)}
    </div>
  </section>

  ${gallery()}

  <section class="contact-end">
    <div class="container contact-end__grid">
      <div>
        <h2>Erzählen Sie uns von Ihrem Objekt.</h2>
        <p class="muted-lg">Wir melden uns, vereinbaren einen Besichtigungstermin und schicken Ihnen danach ein Angebot mit festem Preis.</p>
        <p class="contact-end__region">${icon('pin', 'i i--sm')} Im Einsatz in ${c.towns.slice(0, 5).join(', ')} und Umgebung.</p>
        <a href="/kontakt" class="btn btn--primary btn--lg">Zum Anfrageformular ${icon('arrow', 'i i--sm')}</a>
      </div>
      ${contactList()}
    </div>
  </section>`,
});

// ── Leistungen (Übersicht) ──────────────────────────────────
const groupAnchor = { laufend: 'laufende-reinigung', sonder: 'sonderreinigung' };
const leistungen = () => ({
  path: '/leistungen', file: 'leistungen/index.html', active: 'leistungen',
  title: `Leistungen der Gebäudereinigung in Bielefeld | ${c.name}`,
  description: 'Alle Leistungen von OstWest Glanz: Unterhalts-, Treppenhaus-, Büro-, Grund-, Bauend-, Glas- & Fensterreinigung, Mülltonnenservice in Bielefeld & OWL.',
  schema: [breadcrumb([['Leistungen', '/leistungen']])],
  body: `
  ${pageHero({
    crumbs: [['Leistungen']],
    title: 'Unsere Leistungen',
    lead: 'Laufende Reinigung nach festem Plan oder einmalige Sonderreinigung – für Wohnanlagen, Büros, Praxen und Gewerbeobjekte in Bielefeld und Umgebung.',
    actions: serviceGroups.map(g => `<a href="#${groupAnchor[g.id]}" class="chip-link">${g.title} ${icon('chevron', 'i i--sm')}</a>`).join(''),
  })}

  <section class="section" id="${groupAnchor.laufend}">
    <div class="container split-list">
      <div class="split-list__intro">
        <h2>${serviceGroups[0].title}</h2>
        <p>${serviceGroups[0].text}</p>
        <a href="${regularPage.path}" class="link-arrow">Wie regelmäßige Reinigung funktioniert ${icon('arrow', 'i i--sm')}</a>
      </div>
      <div class="srows">${byGroup('laufend').map(serviceRow).join('')}</div>
    </div>
  </section>

  <section class="section section--soft" id="${groupAnchor.sonder}">
    <div class="container">
      <div class="section-head section-head--row">
        <div>
          <h2>${serviceGroups[1].title}</h2>
          <p class="lead">${serviceGroups[1].text}</p>
        </div>
      </div>
      <div class="tiles tiles--even">
        ${byGroup('sonder').map(s => imageTile({ title: s.title, text: s.short, href: `/leistungen/${s.slug}`, image: s.image }, 'h3', '(max-width: 760px) 100vw, 50vw')).join('')}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <a href="${audiencePage.path}" class="banner-link reveal">
        <span><b>Sie betreuen mehrere Objekte oder ein Unternehmen?</b> So arbeiten wir mit Hausverwaltungen, Büros und Praxen.</span>
        ${icon('arrow')}
      </a>
    </div>
  </section>
  ${ctaBand('Mehrere Leistungen kombinieren?', 'Wir stellen Ihnen ein passendes Paket zusammen – mit einem Ansprechpartner und einer Rechnung.')}`,
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
    eyebrow: serviceGroups.find(g => g.id === s.group).title,
    title: `${s.title}<span class="h1-sub">in Bielefeld & OWL</span>`,
    lead: s.intro,
    actions: `<a href="/kontakt?leistung=${s.slug}" class="btn btn--primary btn--lg">Angebot anfordern ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
    image: s.image,
  })}
  <section class="section section--tight">
    <div class="container detail">
      <div class="detail__main">
        <div class="prose-block reveal">
          <h2>Das gehört dazu</h2>
          <ul class="checks checks--cols">${s.includes.map(x => `<li>${icon('check', 'i i--sm')}${x}</li>`).join('')}</ul>
          <p class="small-muted">Den genauen Umfang stimmen wir bei der Besichtigung auf Ihr Objekt ab.</p>
        </div>
        <div class="prose-block prose-block--split reveal">
          <div>
            <h2>Geeignet für</h2>
            <ul class="tags">${s.audience.map(a => `<li>${a}</li>`).join('')}</ul>
          </div>
          <div>
            <h2>Übliche Intervalle</h2>
            <ul class="tags tags--green">${s.rhythm.map(a => `<li>${a}</li>`).join('')}</ul>
          </div>
        </div>
        ${s.group === 'laufend' ? `
        <a href="${regularPage.path}" class="banner-link banner-link--green reveal">
          <span><b>Als regelmäßigen Auftrag vergeben?</b> Fester Plan, feste Zeiten, monatliche Pauschale.</span>
          ${icon('arrow')}
        </a>` : `
        <a href="${audiencePage.path}" class="banner-link reveal">
          <span><b>Für Hausverwaltungen und Unternehmen:</b> Sonderreinigung und laufende Reinigung aus einer Hand.</span>
          ${icon('arrow')}
        </a>`}
        <div class="prose-block reveal">
          <h2>Häufige Fragen</h2>
          ${faqList(s.faq)}
        </div>
      </div>

      <aside class="detail__side">
        <div class="side-card">
          <p class="side-card__title">Angebot für ${s.title}</p>
          <p class="side-card__text">Kostenlose Besichtigung, danach ein schriftliches Angebot mit festem Preis.</p>
          <a href="/kontakt?leistung=${s.slug}" class="btn btn--primary btn--block">Angebot anfordern</a>
          <div class="side-card__or"><span>oder direkt</span></div>
          <a href="${tel}" class="side-card__link">${icon('phone')} <span><small>Anrufen</small>${c.phoneDisplay}</span></a>
          <a href="${wa}" class="side-card__link side-card__link--wa" target="_blank" rel="noopener">${icon('wa')} <span><small>WhatsApp</small>Nachricht schreiben</span></a>
        </div>
        <nav class="side-nav" aria-label="Weitere Leistungen">
          ${serviceGroups.map(g => `
          <p class="side-nav__title">${g.title}</p>
          ${byGroup(g.id).filter(x => x.slug !== s.slug).map(x => `<a href="/leistungen/${x.slug}">${x.title}</a>`).join('')}`).join('')}
        </nav>
      </aside>
    </div>
  </section>`,
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
    eyebrow: audiencePage.title,
    title: `Reinigung für Wohnanlagen, Büros und Praxen<span class="h1-sub">in Bielefeld & OWL</span>`,
    lead: 'Für Hausverwaltungen, Eigentümergemeinschaften, Unternehmen und Praxen: ein fester Ansprechpartner, ein schriftlicher Reinigungsplan und Kosten, die Sie vorher kennen.',
    actions: `<a href="/kontakt?objekt=${encodeURIComponent('Büro / Gewerbe')}" class="btn btn--primary btn--lg">Besichtigung vereinbaren ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
  })}

  ${audiences.map((a, i) => `
  <section class="section${i % 2 ? ' section--soft' : ''}" id="${a.id}">
    <div class="container feature-row${i % 2 ? ' feature-row--reverse' : ''}">
      <div class="feature-row__media reveal">${picture(a.image, { sizes: '(max-width: 980px) 100vw, 50vw' })}</div>
      <div class="feature-row__text reveal">
        <h2>${a.title}</h2>
        <p class="muted-lg">${a.text}</p>
        <ul class="checks">${a.points.map(p => `<li>${icon('check', 'i i--sm')}${p}</li>`).join('')}</ul>
        <p class="feature-row__links"><b>Passende Leistungen:</b> ${a.services.map(bySlug).map(s => `<a href="/leistungen/${s.slug}">${s.title}</a>`).join(', ')}</p>
      </div>
    </div>
  </section>`).join('')}

  <section class="section">
    <div class="container deliver">
      <div class="deliver__intro">
        <h2>Was Sie konkret bekommen</h2>
        <p>Ob ein Objekt oder mehrere Standorte: Diese Punkte gelten für jeden Auftrag.</p>
        <a href="${regularPage.path}" class="link-arrow">Wie regelmäßige Reinigung abläuft ${icon('arrow', 'i i--sm')}</a>
      </div>
      <dl class="deliver__list">
        ${deliverables.map(([t, d]) => `<div class="deliver__row reveal"><dt>${t}</dt><dd>${d}</dd></div>`).join('')}
      </dl>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container narrow">
      <div class="section-head section-head--center"><h2>Häufige Fragen</h2></div>
      ${faqList(b2bFaq)}
    </div>
  </section>
  ${ctaBand('Der erste Schritt: eine kostenlose Besichtigung.', 'Wir sehen uns Ihr Objekt an und schicken Ihnen danach ein Angebot mit festem Preis – unverbindlich.')}`,
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
    eyebrow: regularPage.title,
    title: `Reinigung im festen Rhythmus<span class="h1-sub">Unterhaltsreinigung in Bielefeld & OWL</span>`,
    lead: 'Sie legen fest, wie oft gereinigt wird – wir kommen zu festen Zeiten, nach schriftlichem Plan und zu einer monatlichen Pauschale.',
    actions: `<a href="/kontakt?rhythmus=W%C3%B6chentlich" class="btn btn--primary btn--lg">Angebot anfordern ${icon('arrow', 'i i--sm')}</a><a href="${tel}" class="btn btn--ghost btn--lg">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>`,
    image: 'keller',
  })}

  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2>Welcher Rhythmus passt?</h2>
        <p class="lead">Als Orientierung – den tatsächlichen Bedarf klären wir bei der Besichtigung.</p>
      </div>
      <ol class="scale">
        ${regularIntervals.map(([value, t, d], i) => `
        <li class="scale__item reveal" style="--step:${i}">
          <span class="scale__bar" aria-hidden="true"></span>
          <h3>${t}</h3>
          <p>${d}</p>
          <a href="/kontakt?rhythmus=${encodeURIComponent(value)}" class="link-arrow">Anfragen ${icon('arrow', 'i i--sm')}</a>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container two-col">
      <div>
        <h2>So läuft ein Reinigungsauftrag</h2>
        ${stepLine(regularSteps, 'stepline--vertical')}
      </div>
      <div class="two-col__aside">
        <h2>Typische Leistungen</h2>
        <ul class="link-list">
          ${byGroup('laufend').map(s => `<li><a href="/leistungen/${s.slug}">${s.title} ${icon('arrow', 'i i--sm')}</a></li>`).join('')}
        </ul>
        <p class="small-muted">Ergänzend nach Bedarf: ${byGroup('sonder').map(s => `<a href="/leistungen/${s.slug}">${s.title}</a>`).join(', ')}.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <div class="section-head section-head--center"><h2>Häufige Fragen</h2></div>
      ${faqList(regularFaq)}
    </div>
  </section>
  ${ctaBand('Ihr Objekt im festen Rhythmus betreuen lassen?', 'Nach der Besichtigung erhalten Sie einen Reinigungsplan mit monatlicher Pauschale.')}`,
});

// ── Über uns ────────────────────────────────────────────────
const ueberUns = () => ({
  path: '/ueber-uns', file: 'ueber-uns.html', active: 'ueber-uns',
  title: `Über uns – Reinigungsfirma aus Bielefeld | ${c.name}`,
  description: `${c.name} ist ein Reinigungsbetrieb aus Bielefeld, geführt von ${ownerName()}. Direkter Ansprechpartner, feste Abläufe, klare Preise.`,
  schema: [breadcrumb([['Über uns', '/ueber-uns']])],
  body: `
  ${pageHero({
    crumbs: [['Über uns']],
    title: `Über ${c.name}`,
    lead: 'Ein Reinigungsbetrieb aus Bielefeld – mit kurzen Wegen und einem Inhaber, der selbst ansprechbar ist.',
  })}

  <section class="section">
    <div class="container intro">
      <div class="intro__person reveal">
        ${c.ownerPhoto ? `<img class="intro__photo" src="${c.ownerPhoto}" alt="${ownerName()}, Inhaber von ${c.name}" loading="lazy">` : `<div class="intro__monogram" aria-hidden="true"><span>${c.ownerInitials}</span></div>`}
        <p class="intro__name"><b>${ownerName()}</b><span>Inhaber</span></p>
      </div>
      <div class="intro__text reveal">
        <h2>Wer hinter ${c.name} steht</h2>
        <p class="muted-lg">${ownerName()} hat ${c.name} in Bielefeld gegründet und ist für Kunden direkt erreichbar – telefonisch, per WhatsApp oder vor Ort beim Besichtigungstermin.</p>
        <p>Der Name steht für die Region: <b>OstWest</b> für Ostwestfalen, wo wir zu Hause und im Einsatz sind – <b>Glanz</b> für das Ergebnis, das Sie nach der Reinigung sehen sollen.</p>
        <p>Wir betreuen Wohnanlagen, Büros, Praxen und Gewerbeobjekte – laufend nach festem Plan oder einmalig als Sonderreinigung.</p>
        <div class="intro__contact">
          <a href="${tel}">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
          <a href="${wa}" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <div class="section-head"><h2>So arbeiten wir</h2></div>
      <ol class="principles">
        ${workingPrinciples.map(([t, d], i) => `<li class="reveal"><span class="principles__num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <figure class="wide-figure reveal">
        ${picture('bielefeld', { sizes: '(max-width: 1240px) 100vw, 1200px' })}
      </figure>
      <div class="region">
        <div>
          <h2>Unser Einsatzgebiet</h2>
          <p class="muted-lg">Von Bielefeld aus betreuen wir Objekte in der Stadt und im Umland. Ihr Ort fehlt in der Liste? <a href="/kontakt">Fragen Sie einfach an.</a></p>
        </div>
        ${towns()}
      </div>
    </div>
  </section>
  ${ctaBand('Lernen wir uns kennen.', 'Bei der kostenlosen Besichtigung klären wir alle Fragen persönlich vor Ort.')}`,
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
    title: 'Angebot anfordern',
    lead: 'Ein paar Angaben zu Ihrem Objekt genügen. Wir melden uns, vereinbaren einen Besichtigungstermin und schicken Ihnen danach ein Angebot mit festem Preis.',
  })}
  <section class="section section--tight">
    <div class="container contact">
      <div class="contact__main">
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
              <label class="field field--full"><span>Nachricht <em>(optional)</em></span><textarea name="nachricht" rows="4" placeholder="z. B. Größe des Objekts, Anzahl der Etagen, Besonderheiten"></textarea></label>
            </div>
          </fieldset>
          <fieldset>
            <legend><span class="legend__num">2</span> Ihre Kontaktdaten</legend>
            <div class="form-grid">
              <label class="field"><span>Name <i class="req" aria-hidden="true">*</i></span><input name="name" required autocomplete="name" aria-describedby="err-name"><small class="field__error" id="err-name"></small></label>
              <label class="field"><span>Firma / Hausverwaltung <em>(optional)</em></span><input name="firma" autocomplete="organization"></label>
              <label class="field"><span>E-Mail <i class="req" aria-hidden="true">*</i></span><input name="email" type="email" required autocomplete="email" aria-describedby="err-email"><small class="field__error" id="err-email"></small></label>
              <label class="field"><span>Telefon <em>(optional, für Rückfragen)</em></span><input name="telefon" type="tel" autocomplete="tel" aria-describedby="err-telefon"><small class="field__error" id="err-telefon"></small></label>
            </div>
          </fieldset>
          <div class="privacy-note">
            <label class="consent"><input type="checkbox" name="consent" required aria-describedby="err-consent"><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. <i class="req" aria-hidden="true">*</i></span></label>
            <small class="field__error" id="err-consent"></small>
            <p>Ihre Angaben gehen per verschlüsselter Verbindung direkt an unser Postfach und werden nur für Ihre Anfrage genutzt. Details in der <a href="/datenschutz#kontaktformular">Datenschutzerklärung</a>.</p>
          </div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">Anfrage senden ${icon('arrow', 'i i--sm')}</button>
          <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
          <p class="form-hint"><i class="req" aria-hidden="true">*</i> Pflichtfeld</p>
        </form>
        <div class="form-success" id="form-success" hidden tabindex="-1">
          <span class="form-success__icon">${icon('check')}</span>
          <h2>Vielen Dank – Ihre Anfrage ist angekommen.</h2>
          <p>Wir melden uns bei Ihnen, um einen Besichtigungstermin zu vereinbaren.</p>
          <p class="small-muted">Eilig? Rufen Sie direkt an: <a href="${tel}">${c.phoneDisplay}</a></p>
        </div>
      </div>

      <aside class="contact__side">
        <div class="contact-card">
          <div class="contact-card__person">
            ${avatar()}
            <p><small>Ihr Ansprechpartner</small><b>${ownerName()}</b></p>
          </div>
          ${contactList()}
          <dl class="contact-card__meta">
            <div><dt>Erreichbar</dt><dd>${c.hours}</dd></div>
            <div><dt>Anschrift</dt><dd>${c.street}, ${c.zip} ${c.city}</dd></div>
            <div><dt>Einsatzgebiet</dt><dd>${c.region.replace(' · ', ', ')}</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  </section>
  <section class="section section--soft">
    <div class="container narrow">
      <div class="section-head section-head--center"><h2>Häufige Fragen</h2></div>
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
    ...(c.vatId ? [['umsatzsteuer', 'Umsatzsteuer-ID', `
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>${c.vatId}</p>`]] : []),
    ['berufsangaben', c.chamber ? 'Berufsbezeichnung und Kammer' : 'Berufsbezeichnung', `
      <p>Tätigkeit: Gebäudereinigung${c.chamber ? `<br>Zuständige Kammer: ${c.chamber}` : ''}</p>`],
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
