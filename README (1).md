# WIFAM Jubiläumskarte — 35 Jahre Wirtschaftsförderung Amberg

Interaktive Karte für den 35-Jahres-Jubiläums-Event der WIFAM Amberg.  
Besucher können auf einem Touchscreen-Display Stationen der WIFAM in Amberg entdecken.

---

## Projektübersicht

**Kunde:** Wirtschaftsförderungsgesellschaft Amberg mbH (WIFAM)  
**Anlass:** 35-jähriges Jubiläum  
**Einsatzzweck:** Touchscreen-Installation auf dem Jubiläums-Event + anschließende Integration auf wifam.de  
**Status:** MVP / Konzeptphase

---

## Was die Anwendung macht

Eine interaktive Stadtkarte von Amberg, auf der verschiedene Marker gesetzt sind. Jeder Marker steht für eine Station der WIFAM-Geschichte — eine Referenz, eine Neueröffnung, ein Event oder ein Förderprojekt. Besucher tippen auf einen Marker und sehen Bild, Text und weiterführende Infos. Über eine Filterleiste lassen sich Kategorien ein- und ausblenden.

---

## Technischer Stack

| Was | Womit |
|---|---|
| Karte | Leaflet.js 1.9.4 + OpenStreetMap |
| Frontend | Vanilla HTML / CSS / JavaScript (kein Build-Step) |
| Fonts | Google Fonts — Barlow Condensed + Barlow |
| Hosting (geplant) | GitHub Pages oder wifam.de WordPress-Integration |

**Bewusste Entscheidungen:**
- Kein Framework (React, Vue etc.) — maximale Portierbarkeit, einfache WordPress-Integration
- OpenStreetMap statt Google Maps — kostenlos, keine API-Keys nötig
- Karte auf Amberg beschränkt (`maxBounds`) — kein versehentliches Rauszoomen auf dem Touchscreen

---

## Projektstruktur

```
wifam-karte/
├── index.html          # Hauptdatei — alles in einer Datei (HTML + CSS + JS)
├── README.md           # Diese Datei
├── CLAUDE.md           # Briefing für KI-Agenten (Claude Code)
├── assets/
│   ├── images/         # Bilder der Referenzen / Marker
│   └── logo/           # WIFAM Logo-Dateien
└── data/
    └── markers.json    # Marker-Daten (ausgelagert sobald Inhalt steht)
```

---

## Marker-Kategorien

| Kategorie | Farbe | Bedeutung |
|---|---|---|
| Referenz | Magenta `#E5007D` | Unternehmen / Projekte, die WIFAM begleitet hat |
| Neueröffnung | Grün `#00A67E` | Neueröffnungen in Amberg |
| Event | Amber `#F59E0B` | Veranstaltungen der WIFAM |
| Förderung | Indigo `#6366F1` | Geförderte Projekte & Gründungen |
| Netzwerk | Cyan `#0EA5E9` | Netzwerkpartner & Kooperationen |

---

## Lokale Entwicklung

Keine Installation nötig. Einfach `index.html` im Browser öffnen —  
oder mit einem lokalen Server für saubere Pfade:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Dann im Browser: `http://localhost:8080`

---

## Nächste Schritte

### Inhalt
- [ ] Echte Marker-Daten von WIFAM erfassen (Titel, Jahr, Text, Koordinaten)
- [ ] Fotos der Referenzen / Projekte sammeln
- [ ] Marker-Daten in `data/markers.json` auslagern

### Technisch
- [ ] `markers.json` per `fetch()` laden statt hardcoded
- [ ] Bildergalerie im Panel (mehrere Fotos pro Marker)
- [ ] Video-Unterstützung im Panel (YouTube embed)
- [ ] Entscheidung: Leaflet beibehalten oder SVG-Karte von Amberg nachbauen
- [ ] Touch-Optimierung testen auf Ziel-Display (Größe klären)
- [ ] GitHub Pages Deployment einrichten

### Design
- [ ] Echtes WIFAM-Logo als SVG einbinden
- [ ] Corporate Fonts prüfen (falls WIFAM eigene Schriften hat)
- [ ] Farbpalette mit WIFAM abstimmen

### Integration
- [ ] WordPress Shortcode oder iFrame für wifam.de
- [ ] Responsiveness für Mobile testen

---

## Corporate Design

WIFAM Amberg — Wirtschaftsförderungsgesellschaft Amberg mbH

| | |
|---|---|
| Primärfarbe | Magenta `#E5007D` |
| Textfarbe | Schwarz `#1A1A1A` |
| Hintergrund | Weiß `#FFFFFF` |
| Sekundär | Hellgrau `#F5EFF8` |

---

## Kontakt / Auftraggeber

**WIFAM — Wirtschaftsförderung Amberg**  
Emailfabrikstraße 15, 92224 Amberg  
[wifam.de](https://wifam.de) · mail@wifam.de · 09621 916 40-0

---

## Entwicklung

Dieses Projekt wird mit Claude Code im Terminal entwickelt.  
Alle größeren Planungsschritte werden im Chat vorbereitet, die Umsetzung erfolgt im Terminal.
