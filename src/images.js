// Bilder der Website (lokal gehostet unter /assets/img, je zwei Breiten als WebP).
// Alle Fotos stammen von Unsplash (Unsplash-Lizenz, kommerzielle Nutzung erlaubt) und zeigen
// bewusst keine Personen – es sind Symbolbilder, keine Aufnahmen eigener Objekte.
// Sobald echte Fotos vorliegen, hier ersetzen (siehe BILDER.md).
export const images = {
  hero:            { file: 'hero',            sizes: [640, 1000], ratio: [4, 5],  alt: 'Heller Büroflur mit Glaswänden, Pflanzen und sauberem Steinboden', credit: ['Petr', 'mpetrucho', '5shl-NRhPyc'] },
  treppenhaus:     { file: 'treppenhaus',     sizes: [640, 1100], ratio: [4, 3],  alt: 'Gepflegtes Treppenhaus mit Holzhandlauf, von oben fotografiert', credit: ['Declan Sun', 'declansun', 'lXxlpLyEHQU'] },
  buero:           { file: 'buero',           sizes: [640, 1100], ratio: [4, 3],  alt: 'Helles Büro mit großen Fenstern und Besprechungstisch', credit: ['Nastuh Abootalebi', 'sunday_digital', 'eHD8Y1Znfpk'] },
  gebaeude:        { file: 'gebaeude',        sizes: [640, 1100], ratio: [4, 3],  alt: 'Mehrgeschossiges Gebäude mit heller Natursteinfassade', credit: ['Burak Arslan', 'brkarslan', 'uUzBpVxuxf0'] },
  sonderreinigung: { file: 'sonderreinigung', sizes: [640, 1100], ratio: [4, 3],  alt: 'Wischeimer und Warnschild „Rutschgefahr“ auf frisch gereinigtem Boden vor Glastüren', credit: ['Christian R', 'hazelikespollo', 'PkFdlMAl85Q'] },
  hausverwaltung:  { file: 'hausverwaltung',  sizes: [640, 1100], ratio: [4, 3],  alt: 'Fassaden von Mehrfamilienhäusern im Altbaustil', credit: ['jordi', 'jordidimass', '3fPy4IT4mVA'] },
  bauend:          { file: 'bauend',          sizes: [640, 1100], ratio: [4, 3],  alt: 'Leerer, bezugsfertiger Raum mit Holzboden und weißen Wänden', credit: ['Lisa Anna', 'lisaanna195', 'ITA4ysSN8xA'] },
  fenster:         { file: 'fenster',         sizes: [640, 1100], ratio: [4, 3],  alt: 'Sauberes Fenster mit schwarzem Rahmen in einer hellen Fassade', credit: ['Wilhelm Gunkel', 'wilhelmgunkel', 'WhWyHsj9ULQ'] },
  glas:            { file: 'glas',            sizes: [640, 1100], ratio: [4, 3],  alt: 'Geschwungene Glasfassade eines Bürogebäudes vor blauem Himmel', credit: ['Kenrick Baksh', 'kenrick', 'Wm8opOd-MDE'] },
  parkhaus:        { file: 'parkhaus',        sizes: [640, 1100], ratio: [4, 3],  alt: 'Beleuchtete Tiefgarage mit gekennzeichneten Stellflächen', credit: ['Josh Sorenson', 'joshsorenson', '2eWQJJ0CThw'] },
  keller:          { file: 'keller',          sizes: [640, 1100], ratio: [4, 3],  alt: 'Langer, gefliester Flur mit glänzendem Boden', credit: ['Quilia', 'heyquilia', '7ttdoSqHlrI'] },
  sparrenburg:     { file: 'sparrenburg',     sizes: [640, 1100], ratio: [4, 3],  alt: 'Turm der Sparrenburg in Bielefeld zwischen Bäumen', credit: ['InReel UG', 'inreel', 'tkh8nKTEpL4'] },
  bielefeld:       { file: 'bielefeld',       sizes: [800, 1400], ratio: [16, 9], alt: 'Blick über die Dächer von Bielefeld', credit: ['Yannik', 'fennvision', '9SSUTaQINXg'] },
};

// Responsives <img> mit srcset; feste width/height verhindern Layoutverschiebungen.
export const picture = (key, { sizes = '(max-width: 760px) 100vw, 50vw', eager = false, cls = '' } = {}) => {
  const img = images[key];
  if (!img) return '';
  const [small, large] = img.sizes;
  const [rw, rh] = img.ratio;
  return `<img class="${cls}" src="/assets/img/${img.file}-${small}.webp" srcset="/assets/img/${img.file}-${small}.webp ${small}w, /assets/img/${img.file}-${large}.webp ${large}w" sizes="${sizes}" width="${large}" height="${Math.round(large * rh / rw)}" alt="${img.alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};
