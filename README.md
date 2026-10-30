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
| Fotos (Alt-Texte, Nachweise) | `src/images.js` – Details und Austausch-Anleitung in `BILDER.md` |
| Inhaberfoto | `src/data.js` → `ownerPhoto` |
| Arbeitsbeispiele (Galerie) | `src/data.js` → `gallery` – erscheint erst, wenn Bilder eingetragen sind |

Der Build listet alle noch offenen Platzhalter auf.

## Kontaktformular

Anfragen gehen an `POST /api/contact` (`api/contact.js`) und werden serverseitig an `info@ostwestglanz.de` geschickt.
Antworten auf die Benachrichtigung landen per Reply-To direkt beim Interessenten.
Funktioniert auch ohne JavaScript (Weiterleitung auf `/danke` bzw. `/anfrage-fehlgeschlagen`).

Umgebungsvariablen (in Vercel unter *Settings → Environment Variables*, lokal in `.env.local` – siehe `.env.example`):

| Variable | Pflicht | Beispiel |
|---|---|---|
| `SMTP_USER` | ja* | `info@ostwestglanz.de` |
| `SMTP_PASS` | ja* | Passwort des IONOS-Postfachs |
| `SMTP_HOST` / `SMTP_PORT` | nein | `smtp.ionos.de` / `465` (Standard) |
| `RESEND_API_KEY` | alternativ* | Resend statt SMTP (hat Vorrang) |
| `CONTACT_TO` | nein | Empfänger, Standard `info@ostwestglanz.de` |
| `CONTACT_FROM` | nein | Absender, Standard `OstWest Glanz Website <info@ostwestglanz.de>` |
| `CONTACT_DRY_RUN` | nur lokal | `1` = Mail nur in der Konsole ausgeben |

\* Entweder SMTP oder Resend. Ohne Konfiguration antwortet die API mit einer Fehlermeldung – es wird nie eine falsche Erfolgsmeldung angezeigt.

Schutz: Pflichtfeld-Prüfung, Honeypot-Feld, Zeitsperre gegen Bots, Origin-Prüfung, max. 5 Anfragen je IP in 10 Minuten.

## Deployment

Vercel baut automatisch bei jedem Push (`vercel.json`: Build `npm run build`, Ausgabe `dist/`, saubere URLs).
