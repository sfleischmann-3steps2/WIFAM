# WIFAM Jubiläumskarte

## Projekt
Interaktive Stadtkarte für das 35-jährige Jubiläum der WIFAM Amberg.
Touchscreen-Display auf dem Event, danach Integration auf wifam.de.

**Live:** https://sfleischmann-3steps2.github.io/WIFAM/
**Status:** MVP live, wartet auf Kunden-Feedback

## Kunde
Wirtschaftsförderungsgesellschaft Amberg mbH (WIFAM)
Emailfabrikstraße 15, 92224 Amberg
https://wifam.de

## Tech-Stack
- Leaflet.js 1.9.4 + OpenStreetMap (kein API-Key nötig)
- Vanilla HTML/CSS/JS — kein Build-Step, maximale Portierbarkeit
- Daten in `data/markers.json` (per fetch geladen)
- Bilder in `assets/images/`
- GitHub Pages Deployment (public repo)

## Corporate Design
- Primärfarbe: Magenta #E5007D
- Text: Schwarz #1A1A1A
- Hintergrund: Weiß #FFFFFF
- Sekundär: Hellgrau #F5EFF8
- Fonts: Barlow Condensed (Headlines), Barlow (Body)

## Kategorien
| Kategorie | Farbe | Key |
|-----------|-------|-----|
| Bauprojekt | #E5007D | bauprojekt |
| Erschließung | #00A67E | erschliessung |
| Event | #F59E0B | event |
| Förderung | #6366F1 | foerderung |
| Netzwerk | #0EA5E9 | netzwerk |

## Dateien
- `index.html` — Hauptdatei (HTML + CSS + JS), Leaflet-Karte mit 3 Stil-Optionen
- `data/markers.json` — 12 Marker-Stationen (3 aus Excel, 9 recherchiert)
- `assets/images/` — 3 Referenzbilder, 9 Stationen noch ohne Bild
- `docs/konzept-kartenloesung.md` — Konzeptpapier mit 3 Optionen für Kunden
- `WifAm_Referenzen_Erfassung.xlsx` — Original-Erfassungsvorlage vom Kunden

## Karten-Features
- Zoombar (Pinch-to-Zoom + Buttons), auf Amberg begrenzt (maxBoundsViscosity: 1.0)
- 3 Kartenstile umschaltbar: Standard, Elegant, Hell (CSS-Filter auf OSM-Tiles)
- Filter-Chips nach Kategorie
- Detail-Panel mit Bild, Beschreibung, Kennzahlen, Partner, Status-Badge
- Responsive (Desktop + Mobile)

## Konventionen
- Kein Framework, kein Build-Step
- Bilder: kebab-case, .jpg (z.B. gewerbegebiet-theuern.jpg)
- Texte in markers.json mit echten Umlauten (ä, ö, ü, ß)
- Touch-optimiert (keine Hover-only Interaktionen)

## Nächste Schritte (wartet auf Kunden-Feedback)
- Kartenstil-Entscheidung (Option A/B/C aus Konzeptpapier)
- Weitere Stationen + Bilder vom Kunden
- Event-Display-Details klären (Größe, Internet)
- WordPress-Integration auf wifam.de
