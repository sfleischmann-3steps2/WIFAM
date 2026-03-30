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

## Kategorien (final)
| Kategorie | Farbe | Key |
|-----------|-------|-----|
| Bauobjekte | #691340 | bauobjekte |
| Baubetreuung | #5B7BB3 | baubetreuung |
| Erschließung | #3D8B6E | erschliessung |
| Ereignisse | #9B59B6 | ereignisse |
| Projekte | #4a90a4 | projekte |
| Events | #eb7d27 | events |

## Dateien
- `v5.html` — Aktuelle Version (Split-Layout, Sidebar, 6 Kategorien, SVG-Icons)
- `data/markers.json` — 45 Referenzen (32 sichtbar, 13 warten auf Bilder)
- `assets/images/` — Referenzbilder
- `assets/icons/` — SVG-Icons (CD-konform, rund)
- `index.html` — V1 (veraltet)
- `docs/konzept-kartenloesung.md` — Konzeptpapier mit 3 Optionen für Kunden

## Karten-Features
- Split-Layout: Sidebar links (Kartenliste + Detailansicht), Karte rechts
- Sidebar ein-/ausklappbar (Toggle-Button)
- Zoombar (Pinch-to-Zoom + Buttons), auf Amberg begrenzt
- CartoDB Positron Tiles (zurückhaltend, hell)
- Filter-Chips mit Haken nach 6 Kategorien
- Detailansicht mit Bild, Beschreibung, Kennzahlen, Partner, Status-Badge
- Marker ohne Bild (`visible: false`) werden ausgeblendet
- Responsive (Desktop + Mobile Bottom-Sheet)

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
