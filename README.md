# WIFAM Jubilaeumskarte – 35 Jahre Wirtschaftsfoerderung Amberg

Interaktive Referenzkarte fuer das 35-jaehrige Jubilaeum der WIFAM Amberg.
Touchscreen-Display auf dem Event, danach Integration auf wifam.de.

## Live-URLs

| Version | URL | Beschreibung |
|---------|-----|-------------|
| **v6 (aktuell)** | https://sfleischmann-3steps2.github.io/WIFAM/v6.html | Mobile-optimiert, Tablet-Layout, Marker-Clustering |
| v5 (Fallback) | https://sfleischmann-3steps2.github.io/WIFAM/v5.html | Vorherige Version, Single-File |

## Versionen

| Datei | Beschreibung |
|-------|-------------|
| `v6.html` + `css/style.css` + `js/app.js` | **Aktuell** – Mobile-optimiert, aufgeteilte Dateistruktur |
| `v5.html` | Fallback – Single-File, Split-Layout, 6 Kategorien |
| `v4.html` | 45 Referenzen, 6 Kategorien, SVG-Icons |
| `v3.html` | CD-konformes Redesign |
| `v2.html` | Sidebar auf 600px |
| `index.html` | Erste Version |

## v6 Features (neu)

- **3-Stufen Bottom-Sheet** (Mobile): Peek / Half / Full mit Touch-Drag
- **Kompakter Mobile-Header**: 36px statt 64px, kein Band
- **Tablet-Layout**: Optimiert fuer iPad Landscape + Portrait
- **Marker-Clustering**: Nahe Marker werden bei niedrigem Zoom gruppiert
- **"Alle"-Filter**: Schnelles Ein-/Ausschalten aller Kategorien
- **Chronologische Sortierung**: Kartenliste nach Jahr
- **Puls-Animation**: Aktiver Marker pulsiert sichtbar
- **Lade-Overlay**: Spinner waehrend Map/Daten laden
- **Sticky Zurueck-Button**: "Alle Stationen" bleibt beim Scrollen sichtbar

## Projektstruktur

```
WIFAM/
├── v6.html                     # Aktuelle Version (HTML-Geruest)
├── css/
│   └── style.css               # Styles (Desktop + Tablet + Mobile)
├── js/
│   └── app.js                  # Logik (Map, Filter, Bottom-Sheet, Clustering)
├── data/
│   └── markers.json            # 45 Referenzen mit Koordinaten
├── assets/
│   ├── images/                 # Referenzbilder (32 vorhanden)
│   └── icons/                  # CD-konforme SVG-Icons (8 Stueck)
├── docs/
│   ├── konzept-kartenloesung.md
│   ├── Corporate_Design_Wifam_06_2025.pdf
│   └── superpowers/            # Design-Spec + Implementierungsplan
├── v5.html                     # Fallback-Version (Single-File)
├── CLAUDE.md                   # KI-Agent-Briefing
└── README.md
```

## Tech-Stack

- **Leaflet.js** 1.9.4 + MarkerCluster-Plugin
- **OpenStreetMap** / CartoDB Positron Tiles (kein API-Key)
- **Vanilla HTML/CSS/JS** – kein Build-Step, maximale Portierbarkeit
- Daten in `markers.json` (per fetch geladen)
- Touch-optimiert fuer Event-Display + Mobile

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
Koordinaten am 15.04.2026 per OSM-Geocoding verifiziert und korrigiert.

## Kunde

**WIFAM – Wirtschaftsfoerderung Amberg**
Emailfabrikstrasse 15, 92224 Amberg
[wifam.de](https://wifam.de)
