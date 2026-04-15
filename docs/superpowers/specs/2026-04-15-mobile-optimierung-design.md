# WIFAM v6: Mobile-Optimierung & Refactoring

## Zusammenfassung

Neue Version v6 der WIFAM Jubilaeumskarte mit Fokus auf mobile Nutzung (Handy + Tablet/Event-Display). Kernveraenderungen: 3-Stufen Bottom-Sheet, minimaler Mobile-Header, aufgeteilte Dateistruktur. Desktop-Layout bleibt im Kern unveraendert.

## Kontext

- **Projekt:** Interaktive Stadtkarte fuer 35 Jahre WIFAM Amberg
- **Einsatz:** Touchscreen-Display auf Event + Website wifam.de (beides gleich wichtig)
- **Aktueller Stand:** v5.html (Single-File, 930 Zeilen), rudimentaerer Mobile-Breakpoint
- **Probleme:** Bottom-Sheet unflexibel (feste Hoehe, kein Drag), Header verschwendet Platz auf Mobile
- **Tech-Stack:** Vanilla HTML/CSS/JS, Leaflet.js, kein Build-Step

## Dateistruktur

```
WIFAM/
├── v6.html                  # Schlankes HTML-Geruest (nur Markup + externe Referenzen)
├── css/
│   └── style.css            # Alle Styles (Desktop + Mobile)
├── js/
│   └── app.js               # Alle Logik (Map, Filter, Sheet, Touch)
├── data/
│   └── markers.json         # Unveraendert
├── assets/                  # Unveraendert (images, icons)
└── v5.html                  # Bleibt als Fallback
```

v6.html enthaelt kein inline CSS oder JS. Nur HTML-Struktur mit `<link>` und `<script>` Referenzen.

## 3-Stufen Bottom-Sheet (Mobile < 768px)

### Zustaende

| Zustand | Hoehe | Inhalt | Ausloeser |
|---------|-------|--------|-----------|
| **Peek** | ~80px | Drag-Handle + Titel + Zaehler | Start, Tap auf Karte |
| **Half** | ~45vh | + Filter-Chips + Kartenliste (scrollbar) | Erstes Oeffnen, Zurueck aus Detail |
| **Full** | ~92vh | Detail-Ansicht einer Station | Tap auf Station/Marker |

### Interaktion

- **Drag am Handle:** Smoothes Mitziehen per `touchstart/move/end`, beim Loslassen Snap zum naechsten Zustand
- **Snap-Schwelle:** >30% des Wegs zum naechsten Zustand = dahin snappen, sonst zurueck
- **Marker-Tap:** Oeffnet Full-Zustand mit Detail der Station
- **Karten-Tap:** Minimiert zu Peek
- **Zurueck-Button in Detail:** Sheet geht zu Half (Kartenliste)
- **Minimum:** Sheet ist immer mindestens im Peek-Zustand sichtbar (kein komplettes Wegwischen)

### Scroll-Verhalten

- Kartenliste im Half-Zustand scrollt intern, Sheet bleibt an Position
- Wenn Liste ganz oben und Nutzer nach unten wischt: Sheet geht zu Peek
- Wenn Liste gescrollt und Nutzer nach oben wischt: Normales internes Scrollen
- Detail-View im Full-Zustand scrollt ebenfalls intern

### Technische Umsetzung

- CSS `transform: translateY()` fuer Sheet-Position (GPU-beschleunigt)
- `will-change: transform` fuer 60fps
- CSS `transition` fuer Snap-Animation, waehrend Drag keine Transition (direkte Manipulation)
- `map.invalidateSize()` nach jedem Zustandswechsel
- Drag-Handle: Neues HTML-Element im Sidebar-Header, nur mobil sichtbar via CSS

### Desktop (>= 768px)

Bottom-Sheet-Logik greift nicht. Sidebar mit Toggle-Button bleibt wie in v5.

## Minimaler Mobile-Header

| Element | Desktop | Mobile |
|---------|---------|--------|
| Header-Hoehe | 60px | 36px |
| Logo | 52px | 28px Hoehe |
| "35 Jahre"-Badge | Sichtbar (Center) | Kompakt neben Logo, kleinere Schrift |
| Jubilee-Label | Sichtbar | Ausgeblendet |
| Rechte Seite | Sichtbar | Ausgeblendet |
| Das Band | 18px | Entfaellt (`display: none`) |

**Ergebnis Mobile:** 36px Header statt 64px (Header + Band). Zusammen mit Peek-Zustand (~80px) hat der Nutzer ca. 85% des Screens als Karte.

## Touch-Verbesserungen

- **Filter-Chips:** Minimum 44px Hoehe (aktuell ~32px), konform mit Apple/Google Touch-Target-Richtlinien
- **Zurueck-Button:** Groessere Tap-Area
- **Zoom-Buttons:** 48x48px (statt 40x40px), Position links unten (rechts unten kollidiert mit Bottom-Sheet)
- **Pinch-to-Zoom:** Bleibt aktiv
- **Attribution:** Kleiner oder hinter Info-Icon

## app.js Struktur

Logische Bloecke (kein Modulsystem, kein Build-Step):

1. **Config & State** -- Kategorie-Definitionen, Kartenkoordinaten, globaler State
2. **Map-Setup** -- Leaflet-Initialisierung, Tiles, Controls
3. **Filter-Chips** -- Chip-Rendering, Toggle-Logik
4. **Card List** -- Kartenliste rendern, Counter aktualisieren
5. **Detail View** -- Station-Detail befuellen, Ein-/Ausblenden
6. **Bottom-Sheet Touch-Handler** (neu) -- Drag, Snap, Zustandswechsel
7. **Sidebar Toggle** (Desktop) -- Bestehende Toggle-Logik
8. **Select/Deselect** -- Station auswaehlen, Map-Fly, Marker-Highlight
9. **Init** -- Alles zusammenfuegen

## Nicht im Scope (Ansatz 3 Kandidaten fuer spaetere Iteration)

- Landscape-Modus / Tablet-spezifisches Layout
- Offline-Faehigkeit (Service Worker)
- Animierte Stationen-Uebergaenge
- WordPress-Integration

Diese koennen spaeter ergaenzt werden, ohne die v6-Architektur aendern zu muessen.

## Deployment & URLs

Beide Versionen muessen parallel auf GitHub Pages erreichbar sein:

- **v5 (Fallback):** `https://sfleischmann-3steps2.github.io/WIFAM/v5.html`
- **v6 (Neu):** `https://sfleischmann-3steps2.github.io/WIFAM/v6.html`

v6.html referenziert `css/style.css` und `js/app.js` relativ -- funktioniert auf GitHub Pages ohne Konfiguration. Am Ende muss alles gepusht werden, damit beide URLs live sind.

## Erfolgskriterien

1. v6 funktioniert auf iPhone/Android-Handy: Bottom-Sheet laesst sich fluessig draggen, Stationen oeffnen und schliessen
2. v6 funktioniert auf Tablet/Event-Display: Touch-Bedienung intuitiv
3. v6 funktioniert auf Desktop: Verhalten identisch zu v5 (Sidebar + Toggle)
4. v5 bleibt als Fallback unveraendert
5. Karte nimmt auf Mobile mindestens 80% des Screens ein (Peek-Zustand)
6. Alle 32 sichtbaren Stationen funktionieren wie bisher
