// ─────────────────────────────────────────────────────────────
//  Zentrale Firmendaten – hier einmal ändern, gilt auf allen Seiten.
//  Werte in [eckigen Klammern] sind Platzhalter und werden im
//  Impressum/Datenschutz/AGB deutlich markiert angezeigt.
// ─────────────────────────────────────────────────────────────
export const company = {
  name: 'OstWest Glanz',
  legalName: 'OstWest Glanz Gebäudereinigung',
  tagline: 'Sauber. Zuverlässig. Professionell.',
  owner: '[Vorname Nachname]',
  ownerInitials: 'OG',
  ownerRole: 'Inhaber',

  phone: '+4917671216622',         // für tel:-Links, ohne Leerzeichen
  phoneDisplay: '0176 71216622',    // so wird die Nummer angezeigt
  whatsapp: '4917671216622',        // für wa.me – Ländervorwahl ohne +
  email: 'info@ostwestglanz.de',

  street: '[Straße Hausnummer]',
  zip: '[PLZ]',
  city: 'Bielefeld',
  hours: 'Mo–Fr 07:00–18:00 Uhr',

  // Rechtliches (Impressum)
  vatId: '[USt-IdNr. gemäß § 27a UStG – oder Hinweis auf Kleinunternehmerregelung]',
  chamber: '[ggf. zuständige Handwerkskammer, z. B. Handwerkskammer Ostwestfalen-Lippe zu Bielefeld]',
  legalUpdated: 'Oktober 2026',

  region: 'Bielefeld & Umgebung · OWL',
  towns: ['Bielefeld', 'Gütersloh', 'Herford', 'Bad Salzuflen', 'Halle (Westf.)', 'Oerlinghausen', 'Leopoldshöhe', 'Steinhagen', 'Werther', 'Verl'],

  // Live-Domain – aktiviert Sitemap, Canonical-Links & Vorschaubilder
  siteUrl: 'https://www.ostwestglanz.de',
  // Serverseitiger Versand der Kontaktanfragen (siehe api/contact.js)
  formEndpoint: '/api/contact',
};

export const objectTypes = ['Mehrfamilienhaus / Wohnanlage', 'Büro / Gewerbe', 'Arztpraxis', 'Ladenlokal', 'Neubau / Baustelle', 'Parkhaus / Parkplatz', 'Sonstiges'];
export const intervals = ['Einmalig', 'Täglich', 'Mehrmals wöchentlich', 'Wöchentlich', '14-täglich', 'Monatlich', 'Nach Absprache'];

export const serviceGroups = [
  { id: 'laufend', title: 'Laufende Reinigung', text: 'Regelmäßig nach festem Plan – damit Ihr Objekt dauerhaft gepflegt bleibt.' },
  { id: 'sonder', title: 'Sonder- & Intensivreinigung', text: 'Einmalig oder nach Bedarf – wenn es gründlicher sein muss.' },
];

export const services = [
  // ── Laufende Reinigung ──
  {
    slug: 'treppenhausreinigung',
    group: 'laufend',
    icon: 'stairs',
    title: 'Treppenhausreinigung',
    short: 'Gepflegte Treppenhäuser und Eingänge – regelmäßig und zuverlässig.',
    intro: 'Das Treppenhaus ist die Visitenkarte jedes Hauses. Wir halten Eingänge, Flure und Treppen in Wohnanlagen dauerhaft sauber – nach festem Plan.',
    includes: [
      'Treppen und Podeste kehren und feucht wischen',
      'Handläufe und Geländer reinigen',
      'Briefkästen und Klingeltableaus abwischen',
      'Eingangstüren und Glasflächen im Eingang',
      'Fensterbänke und Heizkörper abstauben',
      'Spinnweben entfernen',
    ],
    audience: ['Hausverwaltungen', 'Eigentümergemeinschaften', 'Vermieter'],
    rhythm: ['Wöchentlich', '14-täglich', 'Nach Vereinbarung'],
    faq: [
      ['Wie oft sollte ein Treppenhaus gereinigt werden?', 'Bei Mehrfamilienhäusern hat sich eine wöchentliche oder 14-tägliche Reinigung bewährt. Wir richten den Rhythmus nach Nutzung und Größe des Objekts.'],
      ['Können die Kosten auf die Mieter umgelegt werden?', 'Die Kosten der Gebäudereinigung zählen in der Regel zu den umlagefähigen Betriebskosten (§ 2 BetrKV). Wir stellen Ihnen dafür eine übersichtliche Rechnung aus.'],
    ],
  },
  {
    slug: 'buero-und-praxisreinigung',
    group: 'laufend',
    icon: 'office',
    title: 'Büro- und Praxisreinigung',
    short: 'Hygienisch saubere Arbeitsplätze – außerhalb Ihrer Arbeitszeiten.',
    intro: 'Ein sauberes Umfeld ist die Grundlage für gutes Arbeiten und den ersten Eindruck bei Kunden und Patienten. Wir reinigen dann, wenn es zu Ihren Abläufen passt.',
    includes: [
      'Arbeitsplätze und Oberflächen',
      'Böden saugen und wischen',
      'Sanitärräume reinigen, Verbrauchsmaterial auffüllen',
      'Küchen und Sozialräume',
      'Papierkörbe leeren',
      'Kontaktflächen wie Türgriffe und Schalter',
      'Empfang und Wartebereich',
    ],
    audience: ['Büros', 'Arztpraxen', 'Kanzleien', 'Agenturen'],
    rhythm: ['Täglich', 'Mehrmals wöchentlich', 'Wöchentlich'],
    faq: [
      ['Reinigen Sie außerhalb der Öffnungszeiten?', 'Ja. Wir reinigen früh morgens, abends oder am Wochenende – ganz wie es zu Ihrem Betrieb passt.'],
      ['Gibt es einen festen Reinigungsplan?', 'Ja. Gemeinsam legen wir schriftlich fest, welche Bereiche wie oft gereinigt werden – transparent und nachvollziehbar.'],
    ],
  },
  {
    slug: 'gebaeudereinigung',
    group: 'laufend',
    icon: 'sparkle',
    title: 'Allgemeine Gebäudereinigung',
    short: 'Unterhaltsreinigung für Ihr gesamtes Objekt – aus einer Hand.',
    intro: 'Ob Wohnanlage, Bürogebäude oder Gewerbeobjekt: Wir übernehmen die laufende Reinigung Ihres gesamten Objekts nach einem festen Plan – alles aus einer Hand.',
    includes: [
      'Unterhaltsreinigung nach festem Plan',
      'Gemeinschaftsflächen und Eingangsbereiche',
      'Bodenpflege je nach Belag',
      'Sanitärreinigung',
      'Aufzüge und Flure',
      'Sonderreinigungen nach Absprache',
    ],
    audience: ['Hausverwaltungen', 'Gewerbe', 'Büros', 'Praxen'],
    rhythm: ['Täglich', 'Wöchentlich', '14-täglich', 'Monatlich'],
    faq: [
      ['Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?', 'Die Unterhaltsreinigung findet regelmäßig statt und hält das Objekt sauber. Die Grundreinigung ist eine intensive Komplettreinigung – etwa ein- bis zweimal im Jahr oder nach Renovierungen.'],
      ['Kann ich mehrere Leistungen kombinieren?', 'Ja. Sie erhalten alles aus einer Hand – mit einer festen Ansprechperson und einer Rechnung.'],
    ],
  },
  {
    slug: 'kellerreinigung',
    group: 'laufend',
    icon: 'cellar',
    title: 'Kellerreinigung',
    short: 'Keller und Nebenräume sauber, geordnet und wieder nutzbar.',
    intro: 'Gemeinschaftskeller, Wasch- und Trockenräume oder Fahrradkeller: Wir reinigen gründlich, damit die Flächen ordentlich und sicher nutzbar bleiben.',
    includes: [
      'Böden kehren und nass reinigen',
      'Staub und Spinnweben entfernen',
      'Kellergänge, Wasch- und Trockenräume',
      'Fahrrad- und Abstellräume',
      'Türen, Griffe und Lichtschalter',
      'Entsorgung von Kleinmüll nach Absprache',
    ],
    audience: ['Hausverwaltungen', 'Eigentümergemeinschaften', 'Gewerbe'],
    rhythm: ['Monatlich', 'Quartalsweise', 'Einmalig'],
    faq: [
      ['Ist auch eine einmalige Reinigung möglich?', 'Ja – zum Beispiel nach einem Auszug, vor einer Übergabe oder als jährliche Grundreinigung.'],
      ['Übernehmen Sie auch Entsorgungen?', 'Kleinere Entsorgungen sind nach Absprache möglich. Sprechen Sie uns einfach an.'],
    ],
  },
  {
    slug: 'muelltonnenservice',
    group: 'laufend',
    icon: 'bin',
    title: 'Mülltonnenservice',
    short: 'Tonnen raus, Tonnen rein – pünktlich zum Abfuhrtermin.',
    intro: 'Wir kümmern uns darum, dass die Tonnen rechtzeitig an der Straße stehen und danach wieder ordentlich an ihrem Platz sind. Sie müssen an nichts denken.',
    includes: [
      'Bereitstellen der Tonnen am Abfuhrtag',
      'Zurückstellen nach der Leerung',
      'Tonnenstellplätze sauber halten',
      'Hinweis bei Fehlbefüllung',
      'Reinigung der Tonnen nach Absprache',
    ],
    audience: ['Hausverwaltungen', 'Eigentümergemeinschaften', 'Gewerbe'],
    rhythm: ['Nach Abfuhrkalender'],
    faq: [
      ['Woher kennen Sie die Abfuhrtermine?', 'Wir richten uns nach dem Abfuhrkalender Ihres Objekts – Sie müssen sich um nichts kümmern.'],
      ['Lohnt sich der Service auch für kleinere Häuser?', 'Ja. Gerade bei Mehrfamilienhäusern ohne Hausmeister ist der Service eine echte Entlastung.'],
    ],
  },
  {
    slug: 'parkhaus-und-parkplatzreinigung',
    group: 'laufend',
    icon: 'parking',
    title: 'Parkhaus- und Parkplatzreinigung',
    short: 'Saubere Parkflächen – frei von Schmutz, Laub und Müll.',
    intro: 'Gepflegte Parkflächen sind sicherer und hinterlassen bei Kunden, Mietern und Mitarbeitenden einen guten Eindruck. Wir halten sie dauerhaft sauber.',
    includes: [
      'Fahrbahnen und Stellflächen kehren',
      'Müll und Laub entfernen',
      'Ein- und Ausfahrten, Rampen',
      'Treppenhäuser und Aufzüge im Parkhaus',
      'Kassenautomaten und Beschilderung',
      'Papierkörbe leeren',
    ],
    audience: ['Parkhausbetreiber', 'Gewerbe & Handel', 'Wohnanlagen'],
    rhythm: ['Wöchentlich', 'Monatlich', 'Nach Vereinbarung'],
    faq: [
      ['Welche Parkflächen reinigen Sie?', 'Parkhäuser und Tiefgaragen ebenso wie Firmen-, Kunden- und Wohnanlagenparkplätze.'],
      ['Wann wird gereinigt?', 'Zu verkehrsarmen Zeiten, damit der laufende Betrieb möglichst wenig gestört wird.'],
    ],
  },

  // ── Sonder- & Intensivreinigung ──
  {
    slug: 'grundreinigung',
    group: 'sonder',
    icon: 'bucket',
    title: 'Grundreinigung',
    short: 'Intensive Komplettreinigung – für einen echten Neustart Ihrer Räume.',
    intro: 'Wenn die laufende Reinigung nicht mehr reicht: Bei der Grundreinigung entfernen wir hartnäckige Verschmutzungen, Kalk und Ablagerungen gründlich – ideal vor dem Einzug, nach dem Auszug oder ein- bis zweimal im Jahr.',
    includes: [
      'Intensivreinigung der Böden je nach Belag',
      'Entkalken von Sanitärbereichen und Armaturen',
      'Türen, Zargen und Lichtschalter',
      'Heizkörper, Fensterbänke und Sockelleisten',
      'Küchen inklusive Fronten und Geräte außen',
      'Entfernen von Flecken und Ablagerungen',
    ],
    audience: ['Hausverwaltungen', 'Vermieter', 'Büros & Praxen', 'Gewerbe'],
    rhythm: ['Einmalig', 'Halbjährlich', 'Jährlich'],
    faq: [
      ['Wann ist eine Grundreinigung sinnvoll?', 'Vor dem Einzug oder nach dem Auszug, nach längerer Zeit ohne Intensivreinigung oder ein- bis zweimal im Jahr als Ergänzung zur laufenden Unterhaltsreinigung.'],
      ['Wie lange dauert eine Grundreinigung?', 'Das hängt von Größe und Zustand des Objekts ab. Nach der kostenlosen Besichtigung nennen wir Ihnen einen verlässlichen Zeitrahmen und einen Festpreis.'],
    ],
  },
  {
    slug: 'bauendreinigung',
    group: 'sonder',
    icon: 'helmet',
    title: 'Bauendreinigung',
    short: 'Bezugsfertig nach Neubau, Umbau oder Renovierung – sauber übergeben.',
    intro: 'Nach Abschluss der Bauarbeiten bleiben Staub, Farbreste und Rückstände zurück. Mit der Bauendreinigung machen wir Ihr Objekt bezugsfertig – für eine saubere Übergabe an Mieter, Käufer oder Nutzer.',
    includes: [
      'Grobschmutz und Verpackungsreste entfernen',
      'Feinreinigung aller Böden und Oberflächen',
      'Farb-, Mörtel- und Kleberückstände entfernen',
      'Fenster, Rahmen und Glasflächen',
      'Sanitärobjekte und Fliesen',
      'Türen, Zargen, Steckdosen und Schalter',
    ],
    audience: ['Bauträger', 'Handwerksbetriebe', 'Hausverwaltungen', 'Eigentümer'],
    rhythm: ['Einmalig', 'In Bauabschnitten'],
    faq: [
      ['Was ist der Unterschied zwischen Baureinigung und Bauendreinigung?', 'Die Baureinigung findet während der Bauphase statt. Die Bauendreinigung erfolgt nach Abschluss aller Arbeiten und macht das Objekt bezugsfertig.'],
      ['Wann sollte ich die Bauendreinigung beauftragen?', 'Sprechen Sie uns frühzeitig an – wir stimmen den Termin eng mit Ihrem Bauzeitenplan und dem geplanten Übergabetermin ab.'],
    ],
  },
  {
    slug: 'fensterreinigung',
    group: 'sonder',
    icon: 'window',
    title: 'Fensterreinigung',
    short: 'Streifenfreie Fenster mit Rahmen und Falzen – innen und außen.',
    intro: 'Saubere Fenster lassen Räume heller und gepflegter wirken. Wir reinigen Glas, Rahmen und Falze gründlich und streifenfrei.',
    includes: [
      'Glasflächen innen und außen',
      'Rahmen und Falze',
      'Fensterbänke innen und außen',
      'Treppenhausfenster',
      'Dachfenster nach Absprache',
    ],
    audience: ['Büros', 'Wohnanlagen', 'Praxen', 'Vermieter'],
    rhythm: ['Monatlich', 'Quartalsweise', 'Halbjährlich', 'Einmalig'],
    faq: [
      ['Wie oft sollten Fenster gereinigt werden?', 'Für Büros empfehlen sich meist monatliche bis quartalsweise Intervalle, für Wohnanlagen zwei- bis viermal im Jahr.'],
      ['Werden auch die Rahmen gereinigt?', 'Ja. Rahmen, Falze und Fensterbänke gehören bei uns standardmäßig dazu.'],
    ],
  },
  {
    slug: 'glasreinigung',
    group: 'sonder',
    icon: 'glass',
    title: 'Glasreinigung',
    short: 'Schaufenster, Glastüren und Glasfassaden – streifenfrei gepflegt.',
    intro: 'Glas prägt den ersten Eindruck Ihres Gebäudes. Wir reinigen Glasflächen aller Art gründlich und streifenfrei – vom Schaufenster über den Eingangsbereich bis zur Glastrennwand im Büro.',
    includes: [
      'Schaufenster und Glaseingangstüren',
      'Glastrennwände und Glaselemente innen',
      'Glasvordächer und Glasgeländer',
      'Wintergärten',
      'Glasfassaden nach Absprache',
      'Rahmen und Profile',
    ],
    audience: ['Ladenlokale', 'Büros', 'Praxen', 'Hausverwaltungen'],
    rhythm: ['Wöchentlich', 'Monatlich', 'Quartalsweise', 'Einmalig'],
    faq: [
      ['Was ist der Unterschied zur Fensterreinigung?', 'Die Fensterreinigung umfasst klassische Fenster mit Rahmen und Falzen. Die Glasreinigung kümmert sich um alle weiteren Glasflächen – etwa Schaufenster, Glastüren, Trennwände oder Fassadenelemente.'],
      ['Wie oft sollten Schaufenster gereinigt werden?', 'Für einen gepflegten Auftritt empfehlen sich bei Ladenlokalen wöchentliche bis 14-tägliche Intervalle – je nach Lage und Verschmutzung.'],
    ],
  },
];

export const generalFaq = [
  ['Ist die Besichtigung wirklich kostenlos?', 'Ja. Wir schauen uns Ihr Objekt kostenlos an und erstellen Ihnen ein unverbindliches Festpreis-Angebot.'],
  ['In welchen Orten sind Sie tätig?', 'Unser Sitz ist in Bielefeld. Wir sind in Bielefeld und der Umgebung in Ostwestfalen-Lippe im Einsatz – fragen Sie gern auch für Ihren Ort an.'],
  ['Bieten Sie regelmäßige Reinigungsaufträge an?', 'Ja. Wir übernehmen die laufende Reinigung Ihres Objekts im festen Rhythmus – täglich, wöchentlich, 14-täglich oder monatlich, mit festem Reinigungsplan und planbaren Kosten.'],
  ['Kann ich mehrere Leistungen kombinieren?', 'Ja. Viele Kunden kombinieren z. B. Treppenhausreinigung und Mülltonnenservice – mit einer Ansprechperson und einer Rechnung.'],
  ['Wie schnell erhalte ich ein Angebot?', 'Nach der Besichtigung erhalten Sie zeitnah ein schriftliches Angebot mit transparentem Festpreis.'],
];

// Landingpages für Zielgruppen und Auftragsmodelle
export const audiencePage = {
  path: '/fuer-unternehmen-und-hausverwaltungen',
  navLabel: 'Für Unternehmen',
  title: 'Für Unternehmen & Hausverwaltungen',
};
export const regularPage = {
  path: '/regelmaessige-reinigung',
  title: 'Regelmäßige Reinigung',
};
