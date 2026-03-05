# WIFAM Jubilaeumskarte

## Projekt
Interaktive Stadtkarte fuer das 35-jaehrige Jubilaeum der WIFAM Amberg.
Touchscreen-Display auf dem Event, danach Integration auf wifam.de.

## Kunde
Wirtschaftsfoerderungsgesellschaft Amberg mbH (WIFAM)
Emailfabrikstrasse 15, 92224 Amberg
https://wifam.de

## Tech-Stack
- Leaflet.js 1.9.4 + OpenStreetMap (kein API-Key noetig)
- Vanilla HTML/CSS/JS — kein Build-Step, maximale Portierbarkeit
- Daten in `data/markers.json` (per fetch geladen)
- Bilder in `assets/images/`

## Corporate Design
- Primaerfarbe: Magenta #E5007D
- Text: Schwarz #1A1A1A
- Hintergrund: Weiss #FFFFFF
- Sekundaer: Hellgrau #F5EFF8
- Fonts: Barlow Condensed (Headlines), Barlow (Body)

## Kategorien
| Kategorie | Farbe | Key |
|-----------|-------|-----|
| Bauprojekt | #E5007D | bauprojekt |
| Erschliessung | #00A67E | erschliessung |
| Event | #F59E0B | event |
| Foerderung | #6366F1 | foerderung |
| Netzwerk | #0EA5E9 | netzwerk |

## Dateien
- `index.html` — Hauptdatei (HTML + CSS + JS)
- `data/markers.json` — Marker-Daten (Quelle: Excel + Recherche)
- `assets/images/` — Bilder der Referenzen
- `WifAm_Referenzen_Erfassung.xlsx` — Original-Erfassungsvorlage vom Kunden

## Konventionen
- Kein Framework, kein Build-Step
- Bilder: kebab-case, .jpg (z.B. gewerbegebiet-theuern.jpg)
- Karte auf Amberg beschraenkt (maxBounds)
- Touch-optimiert (keine Hover-only Interaktionen)
