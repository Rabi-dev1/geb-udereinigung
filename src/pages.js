import { company as c, services, objectTypes, intervals, generalFaq } from './data.js';
import { icon } from './icons.js';
import { tel, wa, mail, pageHero, ctaBand, faqList } from './layout.js';

const serviceOptions = (selected = '') => services.map(s => `<option value="${s.slug}"${s.slug === selected ? ' selected' : ''}>${s.title}</option>`).join('') + `<option value="sonstiges">Sonstiges / Mehrere Leistungen</option>`;
const options = list => list.map(o => `<option>${o}</option>`).join('');

const faqSchema = items => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
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

const serviceCard = s => `
  <a href="/leistungen/${s.slug}" class="svc reveal">
    <span class="svc__icon">${icon(s.icon)}</span>
    <h3 class="svc__title">${s.title}</h3>
    <p class="svc__text">${s.short}</p>
    <span class="svc__more">Mehr erfahren ${icon('arrow', 'i i--sm')}</span>
  </a>`;

const towns = () => `
  <ul class="towns">
    ${c.towns.map((t, i) => `<li${i === 0 ? ' class="is-home"' : ''}>${i === 0 ? icon('pin', 'i i--sm') + ' ' : ''}${t}</li>`).join('')}
  </ul>`;

const personCard = () => `
  <aside class="person">
    <div class="person__avatar" aria-hidden="true">${c.ownerInitials}</div>
    <div class="person__body">
      <p class="person__role">${c.ownerRole} · Ihr Ansprechpartner</p>
      <p class="person__name">${c.owner}</p>
      <p class="person__quote">„Bei uns haben Sie eine feste Person, die Ihr Objekt kennt und für Sie erreichbar ist.“</p>
      <div class="person__links">
        <a href="${tel}">${icon('phone', 'i i--sm')} ${c.phoneDisplay}</a>
        <a href="${wa}" target="_blank" rel="noopener">${icon('wa', 'i i--sm')} WhatsApp</a>
      </div>
    </div>
  </aside>`;

// ── Startseite ──────────────────────────────────────────────
const home = () => ({
  path: '/', file: 'index.html', active: 'start',
  title: `${c.legalName} | Gebäudereinigung in Bielefeld & OWL`,
  description: 'Treppenhaus-, Keller-, Fenster-, Büro- und Praxisreinigung, Parkhaus- und Parkplatzreinigung sowie Mülltonnenservice in Bielefeld und OWL. Kostenlose Besichtigung & Festpreis-Angebot.',
  body: `
  <section class="hero">
    <svg class="hero__swoosh" viewBox="0 0 900 360" aria-hidden="true"><path d="M-40 300C180 400 700 380 940 90" fill="none" stroke="#1a6fd1" stroke-width="26" stroke-linecap="round"/><path d="M60 345C300 405 720 360 930 180" fill="none" stroke="#4aa52e" stroke-width="14" stroke-linecap="round"/></svg>
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="pill"><span class="pill__dot"></span> Ihr Reinigungsservice aus Bielefeld</p>
        <h1 class="hero__title">Sauber.<br>Zuverlässig.<br><span class="text-green">Professionell.</span></h1>
        <p class="lead">Wir reinigen Treppenhäuser, Büros, Praxen und Parkflächen in Bielefeld und ganz Ostwestfalen-Lippe – mit fester Ansprechperson und fairen Festpreisen.</p>
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
      <div class="svc-grid">
        ${services.map(serviceCard).join('')}
        <a href="/kontakt" class="svc svc--cta reveal">
          <h3 class="svc__title">Individuelle Lösung?</h3>
          <p class="svc__text">Sie haben besondere Anforderungen? Sprechen Sie uns an – wir finden eine passende Lösung.</p>
          <span class="svc__more">Anfrage stellen ${icon('arrow', 'i i--sm')}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--soft">
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

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow">Ablauf</p>
        <h2>In vier Schritten zum sauberen Objekt</h2>
      </div>
      <ol class="steps">
        ${steps.map(([t, d], i) => `<li class="steps__item reveal"><span class="steps__num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section section--soft">
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
  title: `Leistungen | ${c.legalName} Bielefeld`,
  description: 'Alle Leistungen von OstWest Glanz im Überblick: Treppenhaus-, Keller-, Fenster-, Büro- und Praxisreinigung, Parkhaus- und Parkplatzreinigung, Mülltonnenservice und Gebäudereinigung.',
  body: `
  ${pageHero({
    crumbs: [['Leistungen']],
    eyebrow: 'Leistungen',
    title: 'Reinigung für jedes Objekt',
    lead: 'Sieben Leistungen, ein Ansprechpartner. Einzeln buchbar oder kombiniert zu einem Paket für Ihr Objekt.',
  })}
  <section class="section section--tight">
    <div class="container svc-list">
      ${services.map((s, i) => `
      <article class="svc-row reveal">
        <span class="svc-row__num">0${i + 1}</span>
        <span class="svc-row__icon">${icon(s.icon)}</span>
        <div class="svc-row__body">
          <h2 class="svc-row__title"><a href="/leistungen/${s.slug}">${s.title}</a></h2>
          <p>${s.short}</p>
          <ul class="checks checks--inline">${s.includes.slice(0, 3).map(x => `<li>${icon('check', 'i i--sm')}${x}</li>`).join('')}</ul>
        </div>
        <a href="/leistungen/${s.slug}" class="btn btn--ghost svc-row__btn">Details ${icon('arrow', 'i i--sm')}</a>
      </article>`).join('')}
    </div>
  </section>
  ${ctaBand('Mehrere Leistungen kombinieren?', 'Wir stellen Ihnen ein Paket zusammen – mit einer Ansprechperson und einer Rechnung.')}`,
});

// ── Leistungs-Detailseiten ──────────────────────────────────
const servicePage = s => ({
  path: `/leistungen/${s.slug}`, file: `leistungen/${s.slug}.html`, active: 'leistungen',
  title: `${s.title} in Bielefeld & OWL | ${c.name}`,
  description: `${s.title} in Bielefeld und OWL: ${s.short} Kostenlose Besichtigung und Festpreis-Angebot von ${c.legalName}.`,
  schema: [faqSchema(s.faq), {
    '@context': 'https://schema.org', '@type': 'Service', serviceType: s.title,
    provider: { '@type': 'HousekeepingService', name: c.legalName }, areaServed: 'Bielefeld, Ostwestfalen-Lippe', description: s.intro,
  }],
  body: `
  ${pageHero({
    crumbs: [['Leistungen', '/leistungen'], [s.title]],
    eyebrow: `${icon(s.icon, 'i i--sm')} Leistung`,
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
          <p class="side-nav__title">Weitere Leistungen</p>
          ${services.filter(x => x.slug !== s.slug).map(x => `<a href="/leistungen/${x.slug}">${icon(x.icon, 'i i--sm')} ${x.title}</a>`).join('')}
        </nav>
      </aside>
    </div>
  </section>
  ${ctaBand(`Ihr Angebot für ${s.title}`, 'Kostenlose Besichtigung vor Ort und ein transparenter Festpreis – unverbindlich.')}`,
});

// ── Über uns ────────────────────────────────────────────────
const ueberUns = () => ({
  path: '/ueber-uns', file: 'ueber-uns.html', active: 'ueber-uns',
  title: `Über uns | ${c.legalName}`,
  description: 'OstWest Glanz ist ein junges Reinigungsunternehmen aus Bielefeld. Persönlich, zuverlässig und mit klaren Festpreisen – für Objekte in ganz OWL.',
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
  title: `Kontakt & Angebot | ${c.legalName}`,
  description: 'Jetzt kostenloses Angebot für Ihre Gebäudereinigung in Bielefeld und OWL anfragen – per Formular, Telefon oder WhatsApp.',
  schema: [faqSchema(generalFaq)],
  body: `
  ${pageHero({
    crumbs: [['Kontakt']],
    eyebrow: 'Kontakt & Angebot',
    title: 'Ihr kostenloses Angebot',
    lead: 'Beschreiben Sie kurz Ihr Objekt – wir melden uns schnellstmöglich und vereinbaren einen Besichtigungstermin.',
  })}
  <section class="section section--tight">
    <div class="container contact">
      <form class="form-card" id="contact-form" novalidate data-endpoint="${c.formEndpoint}" data-mail="${c.email}">
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
const legal = (path, file, title, html) => ({
  path, file, title: `${title} | ${c.legalName}`, description: `${title} von ${c.legalName}.`, noindex: true,
  body: `${pageHero({ crumbs: [[title]], title })}<section class="section section--tight"><div class="container legal">${html}</div></section>`,
});

const impressum = () => legal('/impressum', 'impressum.html', 'Impressum', `
  <p class="notice">Platzhalter – wird vor Veröffentlichung mit den echten Firmendaten ausgefüllt.</p>
  <h2>Angaben gemäß § 5 DDG</h2>
  <p>${c.legalName}<br>Inhaber: ${c.owner}<br>${c.street}<br>${c.zip} ${c.city}</p>
  <h2>Kontakt</h2>
  <p>Telefon: ${c.phoneDisplay}<br>E-Mail: <a href="${mail}">${c.email}</a></p>
  <h2>Steuernummer / Umsatzsteuer-ID</h2>
  <p>${c.taxId}</p>
  <h2>Verbraucherstreitbeilegung</h2>
  <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>`);

const datenschutz = () => legal('/datenschutz', 'datenschutz.html', 'Datenschutz', `
  <p class="notice">Platzhalter – vor Veröffentlichung durch eine vollständige, rechtssichere Datenschutzerklärung ersetzen (z. B. per Generator).</p>
  <h2>1. Verantwortlicher</h2>
  <p>${c.legalName}, ${c.owner}, ${c.street}, ${c.zip} ${c.city}<br>E-Mail: <a href="${mail}">${c.email}</a></p>
  <h2>2. Hosting</h2>
  <p>Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, Browser) in Server-Logfiles verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).</p>
  <h2>3. Kontaktaufnahme</h2>
  <p>Wenn Sie uns per Formular, E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO).</p>
  <h2>4. Schriftarten</h2>
  <p>Die verwendeten Schriftarten werden lokal von unserem Server geladen. Es findet keine Verbindung zu Servern Dritter statt.</p>
  <h2>5. Ihre Rechte</h2>
  <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.</p>`);

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

export const pages = () => [home(), leistungen(), ...services.map(servicePage), ueberUns(), kontakt(), impressum(), datenschutz(), notFound()];
