// ─────────────────────────────────────────────────────────────
//  Zentrale Firmendaten – hier einmal ändern, gilt auf allen Seiten.
//  Werte in [eckigen Klammern] sind Platzhalter.
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
  taxId: '[Steuernummer / USt-IdNr.]',

  region: 'Bielefeld & Umgebung · OWL',
  towns: ['Bielefeld', 'Gütersloh', 'Herford', 'Bad Salzuflen', 'Halle (Westf.)', 'Oerlinghausen', 'Leopoldshöhe', 'Steinhagen', 'Werther', 'Verl'],

  // Live-Domain – aktiviert Sitemap, Canonical-Links & Vorschaubilder
  siteUrl: 'https://www.ostwestglanz.de',
  // Serverseitiger Versand der Kontaktanfragen (siehe api/contact.js)
  formEndpoint: '/api/contact',
};

export const objectTypes = ['Mehrfamilienhaus / Wohnanlage', 'Büro / Gewerbe', 'Arztpraxis', 'Parkhaus / Parkplatz', 'Sonstiges'];
export const intervals = ['Einmalig', 'Wöchentlich', '14-täglich', 'Monatlich', 'Nach Absprache'];

export const services = [
  {
    slug: 'treppenhausreinigung',
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
    slug: 'kellerreinigung',
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
    slug: 'fensterreinigung',
    icon: 'window',
    title: 'Fensterreinigung',
    short: 'Streifenfreie Fenster, Rahmen und Glasflächen – innen und außen.',
    intro: 'Saubere Fenster lassen Räume heller und gepflegter wirken. Wir reinigen Glasflächen, Rahmen und Falze gründlich und streifenfrei.',
    includes: [
      'Glasflächen innen und außen',
      'Rahmen, Falze und Fensterbänke',
      'Schaufenster und Glastüren',
      'Treppenhausfenster',
      'Trennwände und Glaselemente im Büro',
    ],
    audience: ['Büros', 'Ladenlokale', 'Wohnanlagen', 'Praxen'],
    rhythm: ['Monatlich', 'Quartalsweise', 'Halbjährlich', 'Einmalig'],
    faq: [
      ['Wie oft sollten Fenster gereinigt werden?', 'Für Büros und Ladenlokale empfehlen sich meist monatliche bis quartalsweise Intervalle, für Wohnanlagen zwei- bis viermal im Jahr.'],
      ['Werden auch die Rahmen gereinigt?', 'Ja. Rahmen, Falze und Fensterbänke gehören bei uns standardmäßig dazu.'],
    ],
  },
  {
    slug: 'buero-und-praxisreinigung',
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
    slug: 'parkhaus-und-parkplatzreinigung',
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
  {
    slug: 'muelltonnenservice',
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
    slug: 'gebaeudereinigung',
    icon: 'sparkle',
    title: 'Allgemeine Gebäudereinigung',
    short: 'Unterhalts-, Grund- und Sonderreinigung für Ihr gesamtes Objekt.',
    intro: 'Von der regelmäßigen Unterhaltsreinigung bis zur gründlichen Grundreinigung: Wir übernehmen die Reinigung Ihres Objekts – alles aus einer Hand.',
    includes: [
      'Unterhaltsreinigung nach festem Plan',
      'Grundreinigung',
      'Reinigung nach Renovierung oder Umbau',
      'Bodenpflege',
      'Sanitärreinigung',
      'Sonderreinigungen nach Absprache',
    ],
    audience: ['Hausverwaltungen', 'Gewerbe', 'Büros', 'Praxen'],
    rhythm: ['Regelmäßig', 'Einmalig'],
    faq: [
      ['Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?', 'Die Unterhaltsreinigung findet regelmäßig statt und hält das Objekt sauber. Die Grundreinigung ist eine intensive Komplettreinigung – etwa ein- bis zweimal im Jahr oder nach Renovierungen.'],
      ['Kann ich mehrere Leistungen kombinieren?', 'Ja. Sie erhalten alles aus einer Hand – mit einer festen Ansprechperson und einer Rechnung.'],
    ],
  },
];

export const generalFaq = [
  ['Ist die Besichtigung wirklich kostenlos?', 'Ja. Wir schauen uns Ihr Objekt kostenlos an und erstellen Ihnen ein unverbindliches Festpreis-Angebot.'],
  ['In welchen Orten sind Sie tätig?', 'Unser Sitz ist in Bielefeld. Wir sind in Bielefeld und der Umgebung in Ostwestfalen-Lippe im Einsatz – fragen Sie gern auch für Ihren Ort an.'],
  ['Kann ich mehrere Leistungen kombinieren?', 'Ja. Viele Kunden kombinieren z. B. Treppenhausreinigung und Mülltonnenservice – mit einer Ansprechperson und einer Rechnung.'],
  ['Wie schnell erhalte ich ein Angebot?', 'Nach der Besichtigung erhalten Sie zeitnah ein schriftliches Angebot mit transparentem Festpreis.'],
];
