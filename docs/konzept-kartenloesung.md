# Konzeptpapier: Kartenloesung WIFAM Jubilaeumskarte

**Projekt:** Interaktive Stadtkarte — 35 Jahre Wirtschaftsfoerderung Amberg
**Erstellt:** 05.03.2026
**Fuer:** WIFAM-Team zur Abstimmung

---

## Ausgangslage

Die WIFAM moechte zum 35-jaehrigen Jubilaeum eine interaktive Stadtkarte praesentieren, die 35 Jahre Wirtschaftsfoerderung in Amberg sichtbar macht. Die Karte zeigt Bauprojekte, Erschliessungen, Events, Foerderprojekte und Netzwerke auf einer Karte von Amberg. Einsatz: (1) Touchscreen-Display auf dem Jubilaeumsabend, (2) danach dauerhafte Einbindung auf wifam.de.

## Ziel

- Besucher koennen Stationen der WIFAM-Geschichte auf der Karte entdecken
- Zoom-Funktion: Reinzoomen zeigt exakte Lage, rauszoomen zeigt Gesamtbild
- Touch-optimiert fuer grosses Display am Event
- Spaetere Einbindung auf wifam.de (WordPress)

---

## Drei Optionen

### Option A: Echte Karte (OpenStreetMap)

Standard-Kartendarstellung mit Leaflet.js. Besucher sehen eine echte Strassenkarte von Amberg mit farbigen Markern. Zoom und Navigation wie bei Google Maps, aber auf Amberg begrenzt.

**Vorteile:** Sofortige Orientierung, Strassennamen sichtbar, bereits als MVP gebaut, einfache Wartung (neue Station = ein Datensatz), kostenlos.
**Nachteile:** Sieht generisch aus (wie jede Online-Karte), kein individueller Markenauftritt, braucht Internetverbindung.
**Aufwand:** Gering — bereits vorhanden, nur Feinschliff.

### Option B: Illustrierte Karte (Custom Design)

Ein Grafiker/eine Agentur gestaltet eine eigene Amberg-Illustration im WIFAM-Stil. Die Karte wird als Vektorgrafik umgesetzt, Marker werden darauf platziert.

**Vorteile:** Einzigartiger Look, hoher Wiedererkennungswert, perfekt fuer Corporate Design, offline-faehig.
**Nachteile:** Hoher Aufwand (Grafik-Auftrag, mehrere Iterationen), Zoom auf Illustration kann unnatuerlich wirken, schwer erweiterbar bei neuen Stadtteilen, Orientierung fuer Besucher schwieriger.
**Aufwand:** Hoch — externer Grafik-Auftrag noetig.

### Option C: Echte Karte mit eigenem Stil (Empfehlung)

Leaflet.js mit einem **angepassten Kartenstil**: reduzierte Farben, WIFAM-Magenta als Akzent, elegante Typografie. Die Karte ist echt (Strassennamen, Zoom, Navigation), sieht aber nicht wie Standard-Google-Maps aus, sondern gebrandet und hochwertig.

**Vorteile:** Echte Orientierung + eigenstaendiger Look, Zoom funktioniert natuerlich, einfache Wartung, WordPress-Integration einfach, verschiedene Stil-Optionen kostenlos verfuegbar.
**Nachteile:** Braucht Internetverbindung (Offline-Fallback moeglich), weniger individuell als eine Illustration.
**Aufwand:** Gering bis mittel — aufbauend auf dem bestehenden MVP.

---

## Empfehlung

**Wir empfehlen Option C** — die echte Karte mit eigenem Stil.

Gruende:
1. **Orientierung ist entscheidend**: Besucher wollen erkennen wo ein Projekt liegt ("Das ist ja bei mir um die Ecke!"). Eine echte Karte mit Strassennamen leistet das sofort.
2. **Budget-realistisch**: Keine externen Grafik-Kosten, kein wochenlanges Design-Ping-Pong.
3. **Zukunftssicher**: Neue Stationen einfach hinzufuegen, keine Illustration nachzeichnen.
4. **Website-tauglich**: Identische Loesung fuer Event-Display und wifam.de.
5. **Touch-optimiert**: Leaflet ist bewaehrt auf Touch-Geraeten.

Der angepasste Kartenstil gibt der Karte einen eigenen Look, ohne den Vorteil der echten Karte aufzugeben. Beispiele fuer Stile: helle, reduzierte Karte mit WIFAM-Magenta-Akzenten, oder dunkler eleganter Stil fuer den Event-Abend.

---

## Naechste Schritte

1. **WIFAM entscheidet**: Option A, B oder C?
2. Bei Option C: Wir zeigen 2-3 Stil-Varianten zur Auswahl
3. Marker-Daten vervollstaendigen (aktuell 12 Stationen, Ziel: 20-35)
4. Bilder/Fotos fuer alle Stationen sammeln
5. Event-Display klären: Groesse, Internetverbindung, Betriebssystem

## Offene Fragen an WIFAM

1. Wie viele Stationen sollen am Ende auf der Karte sein? (aktuell 12)
2. Hat die WIFAM einen Grafiker/eine Agentur, die Option B umsetzen koennte?
3. Gibt es am Event-Ort WLAN/Internet fuer das Display?
4. Welche Display-Groesse ist geplant? (z.B. 55 Zoll, 75 Zoll)
5. Soll die Karte nur Deutsch sein oder auch Englisch?
6. Gibt es CI-Vorgaben (Schriften, Logo als Datei)?
