# WIFAM Jubiläumskarte — 35 Jahre Wirtschaftsförderung Amberg

Interaktive Karte für das 35-jährige Jubiläum der WIFAM Amberg.
Besucher entdecken auf einem Touchscreen-Display Stationen der WIFAM in Amberg.

**Live:** https://sfleischmann-3steps2.github.io/WIFAM/

## Projektstruktur

```
WIFAM/
├── index.html              # Hauptdatei (HTML + CSS + JS)
├── data/
│   └── markers.json        # Marker-Daten (12 Stationen)
├── assets/
│   └── images/             # Bilder der Referenzen
├── docs/
│   └── konzept-kartenloesung.md  # Konzeptpapier für Kunden
├── CLAUDE.md               # KI-Agent-Briefing
└── WifAm_Referenzen_Erfassung.xlsx  # Erfassungsvorlage
```

## Tech-Stack

- **Leaflet.js** 1.9.4 + OpenStreetMap (kein API-Key)
- **Vanilla HTML/CSS/JS** — kein Build-Step, maximale Portierbarkeit
- Daten in `markers.json` (per fetch geladen)
- Touch-optimiert für Event-Display
- 3 Kartenstile umschaltbar (Standard, Elegant, Hell)

## Kategorien

| Kategorie | Farbe | Anzahl |
|-----------|-------|--------|
| Bauprojekte | Magenta `#E5007D` | 1 |
| Erschließung | Grün `#00A67E` | 1 |
| Events | Amber `#F59E0B` | 3 |
| Förderung | Indigo `#6366F1` | 4 |
| Netzwerk | Cyan `#0EA5E9` | 3 |

## Status

MVP live auf GitHub Pages — wartet auf Kunden-Feedback.

## Kunde

**WIFAM — Wirtschaftsförderung Amberg**
Emailfabrikstraße 15, 92224 Amberg
[wifam.de](https://wifam.de)
