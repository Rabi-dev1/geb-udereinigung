# Bilder – Herkunft und wo echte Fotos hingehören

Alle aktuellen Fotos sind **Symbolbilder** von [Unsplash](https://unsplash.com) unter der
[Unsplash-Lizenz](https://unsplash.com/de/lizenz) (kostenlose kommerzielle Nutzung, keine Namensnennung nötig,
kein Unsplash+). Sie zeigen bewusst **keine Personen** und **keine Objekte von OstWest Glanz** – es wird
nirgends behauptet, es handle sich um eigene Aufnahmen.

Die Bilder liegen lokal unter `public/assets/img/` (WebP, je zwei Breiten) und werden in `src/images.js`
verwaltet (Alt-Text, Seitenverhältnis, Bildnachweis).

| Schlüssel | Verwendung | Motiv | Fotograf (Unsplash) |
|---|---|---|---|
| `hero` | Startseite, Hero | Heller Büroflur | Petr (@mpetrucho) |
| `treppenhaus` | Startseite, Treppenhausreinigung | Treppenhaus von oben | Declan Sun (@declansun) |
| `buero` | Startseite, Büro & Praxis, Unternehmen | Helles Büro | Nastuh Abootalebi (@sunday_digital) |
| `gebaeude` | Startseite, Gebäudereinigung | Natursteinfassade | Burak Arslan (@brkarslan) |
| `sonderreinigung` | Startseite, Grundreinigung | Wischeimer & Warnschild | Christian R (@hazelikespollo) |
| `hausverwaltung` | Unternehmen, Mülltonnenservice | Altbau-Wohnhäuser | jordi (@jordidimass) |
| `bauend` | Bauendreinigung | Leerer, bezugsfertiger Raum | Lisa Anna (@lisaanna195) |
| `fenster` | Fensterreinigung | Fenster in Fassade | Wilhelm Gunkel (@wilhelmgunkel) |
| `glas` | Glasreinigung | Glasfassade | Kenrick Baksh (@kenrick) |
| `parkhaus` | Parkhaus- & Parkplatzreinigung | Tiefgarage | Josh Sorenson (@joshsorenson) |
| `keller` | Kellerreinigung, Regelmäßige Reinigung | Gefliester Flur | Quilia (@heyquilia) |
| `sparrenburg` | Startseite „Aus Ostwestfalen“ | Sparrenburg, Bielefeld | InReel UG (@inreel) |
| `bielefeld` | Über uns, Einsatzgebiet | Blick über Bielefeld | Yannik (@fennvision) |

## Wo echte Fotos den größten Unterschied machen

1. **Inhaberfoto** – in `src/data.js` → `ownerPhoto` eintragen (z. B. `/assets/img/inhaber.webp`, Hochformat 4:5).
   Erscheint dann auf „Über uns“, im Hero-Kärtchen und auf der Kontaktseite statt der Initialen „NI“.
2. **Arbeitsbeispiele** – in `src/data.js` → `gallery` eintragen. Der Bereich „Einblicke in unsere Arbeit“
   erscheint automatisch auf der Startseite, sobald mindestens ein Bild eingetragen ist.
   Nur echte Fotos eigener Arbeiten und nur mit Erlaubnis des jeweiligen Kunden.
3. **Hero-Bild** – ein echtes Foto eines betreuten Treppenhauses oder Büros (Hochformat) ersetzt `hero`.
4. **Leistungsbilder** – je Leistung ein echtes Foto; gleiche Dateinamen verwenden oder in `src/images.js` umstellen.

Empfehlung: Fotos als WebP in zwei Breiten (640 px und 1100 px) speichern, damit die Seite schnell bleibt.
