# WIFAM Jubilaeumskarte - 35 Jahre Wirtschaftsfoerderung Amberg

Interaktive Referenzkarte fuer das 35-jaehrige Jubilaeum der WIFAM Amberg.
Touchscreen-Display auf dem Event, danach Integration auf wifam.de.

**Live:** https://sfleischmann-3steps2.github.io/WIFAM/

## Versionen

| Datei | Beschreibung |
|-------|-------------|
| `v5.html` | **Aktuell** - Feinschliff, UX-Optimierungen |
| `v4.html` | 45 Referenzen, 6 Kategorien, SVG-Icons |
| `v3.html` | CD-konformes Redesign |
| `v2.html` | Sidebar auf 600px |
| `index.html` | Erste Version |

## Projektstruktur

```
WIFAM/
├── v5.html                     # Aktuelle Version (HTML + CSS + JS)
├── data/
│   └── markers.json            # 45 Referenzen mit Koordinaten
├── assets/
│   ├── images/                 # Referenzbilder (32 vorhanden)
│   └── icons/                  # CD-konforme SVG-Icons (8 Stueck)
├── docs/
│   ├── konzept-kartenloesung.md
│   └── Corporate_Design_Wifam_06_2025.pdf
├── CLAUDE.md                   # KI-Agent-Briefing
├── Referenzen WifAm fuer Bildschirm.xlsx  # Referenzdaten
└── WifAm_Referenzen_Erfassung.xlsx        # Original-Erfassung
```

## Tech-Stack

- **Leaflet.js** 1.9.4 + OpenStreetMap (kein API-Key)
- **Vanilla HTML/CSS/JS** - kein Build-Step, maximale Portierbarkeit
- Daten in `markers.json` (per fetch geladen)
- Touch-optimiert fuer Event-Display

## Kategorien (6)

| Kategorie | Farbe | Anzahl |
|-----------|-------|--------|
| Bauobjekte | `#691340` | 19 |
| Baubetreuung | `#5B7BB3` | 7 |
| Erschliessung | `#3D8B6E` | 7 |
| Events | `#eb7d27` | 3 |
| Ereignisse | `#9B59B6` | 4 |
| Projekte | `#4a90a4` | 5 |

## Status

45 Referenzen eingepflegt, 32 mit Bild sichtbar, 13 ohne Bild ausgeblendet.

## Kunde

**WIFAM - Wirtschaftsfoerderung Amberg**
Emailfabrikstrasse 15, 92224 Amberg
[wifam.de](https://wifam.de)
