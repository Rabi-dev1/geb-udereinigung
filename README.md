# OstWest Glanz – Website

Statische Firmenwebsite für OstWest Glanz Gebäudereinigung (Bielefeld & OWL).
Ein kleiner Generator ohne Abhängigkeiten baut alle Seiten aus einer Vorlage.

## Befehle

```bash
npm run dev     # lokaler Server auf http://localhost:4180, baut bei Änderungen neu
npm run build   # erzeugt die fertige Seite in dist/
```

## Wo ändere ich was?

| Was | Datei |
|---|---|
| Telefon, E-Mail, Adresse, Inhaber, Orte, Domain | `src/data.js` → `company` |
| Leistungen (Texte, Umfang, FAQ) | `src/data.js` → `services` |
| Seiteninhalte | `src/pages.js` |
| Header, Footer, Navigation | `src/layout.js` |
| Design | `public/assets/site.css` |
| Logo, Bilder, Schriften | `public/assets/` |

Der Build listet alle noch offenen Platzhalter auf.

## Deployment

Vercel baut automatisch bei jedem Push (`vercel.json`: Build `npm run build`, Ausgabe `dist/`, saubere URLs).
