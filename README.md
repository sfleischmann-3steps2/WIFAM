# WIFAM Jubilaeumskarte – 35 Jahre Wirtschaftsfoerderung Amberg

Interaktive Referenzkarte fuer das 35-jaehrige Jubilaeum der WIFAM Amberg.
Touchscreen-Display auf dem Event, danach Integration auf wifam.de.

## Live-URL

**https://sfleischmann-3steps2.github.io/WIFAM/**

## Versionen

| Datei | Beschreibung |
|-------|-------------|
| `index.html` + `css/style.css` + `js/app.js` | **Aktuell (v6)** – Mobile-optimiert, Tablet-Layout, Marker-Clustering |
| `offline/` | **Offline-Version** – fuer USB-Stick, kein Internet noetig |
| `v6.html` | Kopie der aktuellen Version |
| `v5.html` | Fallback – Single-File, Split-Layout |
| `v4.html` | 45 Referenzen, 6 Kategorien, SVG-Icons |
| `v3.html` | CD-konformes Redesign |
| `v2.html` | Sidebar auf 600px |

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
├── index.html                  # Aktuelle Version (= v6, HTML-Geruest)
├── css/
│   └── style.css               # Styles (Desktop + Tablet + Mobile)
├── js/
│   └── app.js                  # Logik (Map, Filter, Bottom-Sheet, Clustering)
├── data/
│   └── markers.json            # 45 Referenzen mit Koordinaten
├── assets/
│   ├── images/                 # Referenzbilder (39 vorhanden)
│   └── icons/                  # CD-konforme SVG-Icons
├── offline/                    # Offline-Version (USB-Stick)
│   ├── v6-offline.html         # Startseite (lokale Pfade)
│   ├── js/app-offline.js       # JS mit eingebetteten Markerdaten
│   ├── lib/                    # Leaflet, MarkerCluster, Montserrat (lokal)
│   ├── tiles/                  # Vorgeladene Kartenkacheln (.gitignore)
│   ├── START-Mac.command       # Doppelklick-Starter macOS
│   └── START-Windows.bat       # Doppelklick-Starter Windows
├── scripts/
│   └── download_tiles.py       # Kartenkacheln herunterladen
├── docs/
│   ├── konzept-kartenloesung.md
│   └── Corporate_Design_Wifam_06_2025.pdf
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

45 Referenzen eingepflegt, 39 mit Bild sichtbar, 6 ohne Bild ausgeblendet.
Koordinaten am 15.04.2026 per OSM-Geocoding verifiziert und korrigiert.

## Offline-Version

Fuer Events ohne WLAN liegt eine vollstaendig offline-faehige Version im `offline/`-Ordner.
Alle Abhaengigkeiten (Leaflet, MarkerCluster, Montserrat-Font, Kartenkacheln) sind lokal gebuendelt.

**Nutzung:**
1. `python3 scripts/download_tiles.py` ausfuehren (einmalig, laedt Kartenkacheln)
2. `offline/`-Ordner auf USB-Stick kopieren
3. `START-Mac.command` (macOS) oder `START-Windows.bat` (Windows) doppelklicken
4. Browser oeffnet sich automatisch mit der Karte

## Kunde

**WIFAM – Wirtschaftsfoerderung Amberg**
Emailfabrikstrasse 15, 92224 Amberg
[wifam.de](https://wifam.de)
