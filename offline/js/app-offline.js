// ── CONFIG (6 Kategorien, CD-Sekundärfarben, SVG-Icons) ──
const CATS = {
  bauobjekte:    { label: "Bauobjekte",     color: "#691340", icon: "assets/icons/Bauobjekte_rund_RGB.svg",    emoji: "\u{1F3D7}\uFE0F" },
  baubetreuung:  { label: "Baubetreuung",   color: "#5B7BB3", icon: "assets/icons/Baubetreuung_rund_RGB.svg",  emoji: "\u{1F4CB}" },
  erschliessung: { label: "Erschließung",   color: "#3D8B6E", icon: "assets/icons/Erschliessung_rund_RGB.svg", emoji: "\u{1F6E4}\uFE0F" },
  events:        { label: "Events",          color: "#eb7d27", icon: "assets/icons/Events_rund_RGB.svg",        emoji: "\u{1F389}" },
  ereignisse:    { label: "Ereignisse",      color: "#9B59B6", icon: "assets/icons/News_rund_RGB.svg",          emoji: "\u{2B50}" },
  projekte:      { label: "Projekte",        color: "#4a90a4", icon: "assets/icons/StartUps_rund_RGB.svg",      emoji: "\u{1F680}" }
};

const AMBERG = [49.4430, 11.8650];
const BOUNDS = L.latLngBounds(L.latLng(49.385, 11.815), L.latLng(49.475, 11.935));

const MARKERS_DATA = [
  {
    "id": 1,
    "title": "Wohnanlage Roseggerstraße",
    "subtitle": "Roseggerstraße 2, Amberg",
    "cat": "bauobjekte",
    "location": "Roseggerstraße 2, Amberg",
    "lat": 49.4408,
    "lng": 11.8478,
    "description": "Erste eigene staatlich geförderte Wohnbaumaßnahme der WiFAM: 22 Eigentumswohnungen mit Garagen, fertiggestellt 1993/1994. Ein Meilenstein als Startprojekt der Wirtschaftsförderung.",
    "year": "1993/1994",
    "status": "abgeschlossen",
    "facts": "22 Eigentumswohnungen mit Garagen",
    "image": null,
    "visible": false
  },
  {
    "id": 2,
    "title": "Büro- & Verwaltungsgebäude Marienstraße 6",
    "subtitle": "Marienstraße 6, Amberg",
    "cat": "bauobjekte",
    "location": "Marienstraße 6, Amberg",
    "lat": 49.4451,
    "lng": 11.8677,
    "description": "Erste eigene Gewerberaumbaumaßnahme der WiFAM: Neubau eines Büro- und Verwaltungsgebäudes mit Tiefgarage. Heute Standort für Arztpraxen, Kanzleien und Einzelhandel auf ca. 2.400 m² Nutzfläche.",
    "year": "1990er",
    "status": "abgeschlossen",
    "facts": "ca. 2.400 m² Nutzfläche. Derzeitige Nutzer: z. B. Geschenkeladen, Apotheke St. Marien, Sanitätshaus Lange, RA Rockenstein Lösche, Praxis Schorr, Praxis Scharl, Steuerberater Jens Wergin, Arztpraxis Merkl/Müller, Büro Klinikum St. Marien, Renner Consult, Zahnarzt Krammer und Kollegen",
    "image": "assets/images/2 - Marienstraße 6 (4).JPG",
    "visible": true
  },
  {
    "id": 3,
    "title": "Fachmarktzentrum Fuggerstraße",
    "subtitle": "Fuggerstraße, Amberg",
    "cat": "erschliessung",
    "location": "Fuggerstraße, Amberg",
    "lat": 49.4348,
    "lng": 11.8415,
    "description": "Erschließung des Gewerbegebiets West mit zentraler Infrastruktur und 361 Parkplätzen auf ca. 14.500 m². Heute Standort von Cube, Hagebaumarkt, Dehner und weiteren Unternehmen.",
    "year": "1990er",
    "status": "abgeschlossen",
    "facts": "Grundstückfläche: ca. 14.500 m². Derzeitige Nutzer: z. B. Cube, Hagebaumarkt, Dehner, Mc Donald's, Tedi, Merkur Spielhalle",
    "image": "assets/images/3- Fachmarktzentrum.JPG",
    "visible": true
  },
  {
    "id": 4,
    "title": "Agentur für Arbeit & Job-Center",
    "subtitle": "Jahnstraße 4, Amberg",
    "cat": "bauobjekte",
    "location": "Jahnstraße 4, Amberg",
    "lat": 49.4462,
    "lng": 11.8681,
    "description": "Neubau in zwei Bauabschnitten: 1997 die Agentur für Arbeit mit Tiefgarage, 2006/2007 das Job-Center. Zusammen rund 2.780 m² Nutzfläche – ein zentraler Anlaufpunkt für den Arbeitsmarkt in Amberg.",
    "year": "1997 / 2006",
    "status": "abgeschlossen",
    "facts": "1. Bauabschnitt: ca. 1.870 m² Nutzfläche. 2. Bauabschnitt: ca. 913 m² Nutzfläche",
    "image": "assets/images/4 - Jahnstraße 4 - 4a (1).JPG",
    "visible": true
  },
  {
    "id": 5,
    "title": "Ärztehaus Marienstraße 9",
    "subtitle": "Marienstraße 9, Amberg",
    "cat": "bauobjekte",
    "location": "Marienstraße 9, Amberg",
    "lat": 49.4448,
    "lng": 11.868,
    "description": "Neubau auf dem ehemaligen Baumannareal mit ca. 2.400 m² Nutzfläche. Heute ein wichtiger Gesundheitsstandort mit HNO, Diabetologie, Lungenärzten, Urologie und weiteren Praxen.",
    "year": "2000er",
    "status": "abgeschlossen",
    "facts": "ca. 2.400 m² Nutzfläche. Derzeitige Nutzer: z. B. HNO-Praxis Dr. Schürfeld, Diabetologikum Amberg-Sulzbach, Lungenärzte Amberg, Urologiezentrum Amberg, Nuklearmedizin Dr. Bock, Zahnarztpraxis Dr. Hage, DAK Servicezentrum",
    "image": "assets/images/5 - Marienstraße 9 (4).JPG",
    "visible": true
  },
  {
    "id": 6,
    "title": "Gewerbegebiet Kastnerstraße",
    "subtitle": "Kastnerstraße, Amberg",
    "cat": "erschliessung",
    "location": "Kastnerstraße, Amberg",
    "lat": 49.4355,
    "lng": 11.8425,
    "description": "Erschließung mit modernstem Standard im Oberzentrum Amberg (2015). Rund 36.000 m² Fläche mit hervorragender Anbindung an B85, B299 und A6. Heute Heimat von Handwerk, Logistik und Dienstleistern.",
    "year": "2015",
    "status": "abgeschlossen",
    "facts": "Grundstücksfläche: ca. 36.000 m². Derzeitige Nutzer: z. B. Bieda Sanitär, Bäckerei Nußstein, Hausmann Immobilien, Paulus Raumausstattung, Steuerberatung Hatosch + Kießkalt, Schlosserei Libricht, Ries Express&Logistik, Stahlbau Schirm",
    "image": "assets/images/6 - GG-West Kastnerstraße.JPG",
    "visible": true
  },
  {
    "id": 7,
    "title": "Gewerbegebiet Kümmersbruck-Theuern",
    "subtitle": "Gewerbegebiet Theuern, Kümmersbruck",
    "cat": "erschliessung",
    "location": "Gewerbegebiet Theuern, Kümmersbruck",
    "lat": 49.392,
    "lng": 11.918,
    "description": "Erste gemeinsame Maßnahme des Wirtschaftsraums Amberg: 18,6 ha Erschließungsfläche, davon 14,6 ha gewerbliche Nutzflächen. Übergabe an die Gemeinde Kümmersbruck im Juli 2023.",
    "year": "2022/2023",
    "status": "abgeschlossen",
    "facts": "Übergabe an die Gemeinde Kümmersbruck im Juli 2023. 18,6 ha Erschließungsfläche, davon 14,6 ha gewerbliche Nutzflächen, ca. 4 ha öffentliche Flächen, Grün- und Ausgleichsflächen",
    "image": "assets/images/7 - GG Theuern 23.08.2024 Foto-Martin Uschold  (37).JPG",
    "visible": true
  },
  {
    "id": 8,
    "title": "Gewerbegebiet Amberg Ost II",
    "subtitle": "Gewerbegebiet Ost, Amberg",
    "cat": "erschliessung",
    "location": "Gewerbegebiet Ost, Amberg",
    "lat": 49.439,
    "lng": 11.887,
    "description": "Erweiterung des Gewerbegebiets Ost mit direkter Anbindung an B85 und Staatsstraße AM30. 6,3 ha Fläche, davon 4,1 ha gewerbliche Nutzflächen. Übergabe an die Stadt Amberg im April 2024.",
    "year": "2024",
    "status": "abgeschlossen",
    "facts": "Übergabe an die Stadt Amberg im April 2024. 6,3 ha Erschließungsfläche, davon 4,1 ha gewerbliche Nutzflächen, ca. 2,2 ha öffentliche Flächen",
    "image": "assets/images/8 - Ost Erweiterung 08.04.2024 Foto-Martin Uschold (1).JPG",
    "visible": true
  },
  {
    "id": 9,
    "title": "Gewerbehof Liebengrabenweg",
    "subtitle": "Liebengrabenweg 11, Amberg",
    "cat": "bauobjekte",
    "location": "Liebengrabenweg 11, Amberg",
    "lat": 49.4289,
    "lng": 11.8602,
    "description": "Umwandlung einer Industriebrache (ehem. Kerb Konus Areal) zum modernen Gewerbestandort: Parzellierung, Sanierung und Neubau einer Lagerhalle. Heute Standort von PI-Concept und Probatec auf insgesamt rund 2.200 m².",
    "year": "1998 / 2017",
    "status": "abgeschlossen",
    "facts": "Nr. 11: ca. 2.900 m² Nutzfläche (Verkauf 2016 an Fa. Probatec). Nr. 11/11a/11b: Umbau/Sanierung für PI-Concept, ca. 800 m² + 800 m² Betriebshalle + 600 m² Lagerhalle",
    "image": "assets/images/9 - Liebengrabenweg 11, 11a, 11b (2).JPG",
    "visible": true
  },
  {
    "id": 10,
    "title": "Büro- & Geschäftshäuser Fleurystraße",
    "subtitle": "Fleurystraße 5, Amberg",
    "cat": "bauobjekte",
    "location": "Fleurystraße 5, Amberg",
    "lat": 49.4462,
    "lng": 11.8463,
    "description": "Zwei Bauabschnitte (2002/2003 und 2008) mit zusammen ca. 4.800 m² Nutzfläche und über 90 Stellplätzen. Heute genutzt von Johanniter, IHK, OTH, Arztpraxen, VR-Bank und vielen weiteren.",
    "year": "2002 / 2008",
    "status": "abgeschlossen",
    "facts": "5/5a: ca. 2.300 m² Nutzfläche, 38 Stellplätze TG, 30 im Freien. Nr. 7: ca. 2.500 m² Nutzfläche, 26 TG-Stellplätze, 59 im Freien. Nutzer: u.a. Johanniter, IHK, VR-Bank, AWO, OTH",
    "image": "assets/images/10 - Fleury 5.jpg",
    "visible": true
  },
  {
    "id": 11,
    "title": "Praxis- & Verwaltungsgebäude Emailfabrikstraße 17+19",
    "subtitle": "Emailfabrikstraße 17, Amberg",
    "cat": "bauobjekte",
    "location": "Emailfabrikstraße 17, Amberg",
    "lat": 49.4453,
    "lng": 11.869,
    "description": "Neubau in zwei Bauabschnitten auf dem ehemaligen Baumannareal mit Tiefgarage. Rund 2.450 m² Nutzfläche für Kinderärzte, Physiotherapie, Steuerberatung und weitere Dienstleister.",
    "year": "2010er",
    "status": "abgeschlossen",
    "facts": "Nr. 17: ca. 1.200 m² Nutzfläche. Nr. 19: ca. 1.250 m² Nutzfläche. Nutzer: u.a. Kinderzahnarzt Raap, Physiomed, Sanitätshaus Haus des Lebens",
    "image": "assets/images/11 - Emailfabrikstraße 17 - 19 (3).JPG",
    "visible": true
  },
  {
    "id": 12,
    "title": "Gewerbepark Heinrich-Hertz-Straße",
    "subtitle": "Heinrich-Hertz-Straße 8a, Amberg",
    "cat": "bauobjekte",
    "location": "Heinrich-Hertz-Straße 8a, Amberg",
    "lat": 49.4297,
    "lng": 11.8617,
    "description": "Nachnutzung der ehemaligen Krones-Immobilie: Erwerb, Aufteilung und Vermietung an verschiedene Gewerbebetriebe. 2004 veräußert. Rund 20.370 m² Grundstücksfläche – ein Beispiel für erfolgreiche Konversion.",
    "year": "2002 / 2004",
    "status": "abgeschlossen",
    "facts": "Grundstücksgröße: ca. 20.370 m²",
    "image": "assets/images/12 - Heinrich Hertz 8a.JPG",
    "visible": true
  },
  {
    "id": 13,
    "title": "Café Rossini am Englischen Garten",
    "subtitle": "Am Englischen Garten 1, Amberg",
    "cat": "bauobjekte",
    "location": "Am Englischen Garten 1, Amberg",
    "lat": 49.4462,
    "lng": 11.8572,
    "description": "Nach der Explosion des Café Eiszeit übernahm die WiFAM die Abbruchimmobilie und errichtete 2003 den Neubau. Seitdem ein beliebter Treffpunkt am Rande der Altstadt mit ca. 100 m² plus Freiterrasse.",
    "year": "2003",
    "status": "abgeschlossen",
    "facts": "ca. 100 m² + Freiterrasse",
    "image": "assets/images/13 - Café Rossini.JPG",
    "visible": true
  },
  {
    "id": 14,
    "title": "Gewerbestandort Regensburger Straße 70",
    "subtitle": "Regensburger Straße 70, Amberg",
    "cat": "bauobjekte",
    "location": "Regensburger Straße 70, Amberg",
    "lat": 49.4365,
    "lng": 11.864,
    "description": "Nachnutzung des ehemaligen Autohaus-Areals durch Teilabbruch, Umbau und Sanierung. Ca. 3.800 m² Nutzfläche, heute Standort von Netto, Bowlingbahn und weiteren Betrieben. 2005 veräußert.",
    "year": "2005",
    "status": "abgeschlossen",
    "facts": "Grundstücksgröße ca. 5.000 m², Nutzfläche ca. 3.800 m². Derzeitige Nutzer: z. B. Netto, Bäckerei Nußstein, Metzger Uschold, Bowlingbahn, Eisdiele",
    "image": null,
    "visible": false
  },
  {
    "id": 15,
    "title": "Neuordnung Barbarastraße / Regensburger Straße",
    "subtitle": "Regensburger Straße 110, Amberg",
    "cat": "bauobjekte",
    "location": "Regensburger Straße 110, Amberg",
    "lat": 49.4332,
    "lng": 11.8655,
    "description": "Nach Aufgabe der Spedition Flierl: Neuordnung des Areals mit Ansiedlung einer Steuerkanzlei sowie Neubau von Burger King und Royal-Casino – ein Beispiel für aktive Standortnachfolge.",
    "year": "2000er",
    "status": "abgeschlossen",
    "facts": null,
    "image": null,
    "visible": false
  },
  {
    "id": 16,
    "title": "August-W.-Behr Haus (ehem. Grammer AG)",
    "subtitle": "Georg-Grammer-Straße 2, Amberg",
    "cat": "bauobjekte",
    "location": "Georg-Grammer-Straße 2, Amberg",
    "lat": 49.4456,
    "lng": 11.8488,
    "description": "Ehemals Konzernzentrale der Grammer AG (Neubau 2004/2005). Nach deren Verlagerung nach Ursensollen ab 2020 umgebaut für neue Nutzungen. Heute Standort von Eckert Schulen, OTH, Kita und weiteren auf ca. 3.900 m².",
    "year": "2004 / 2020",
    "status": "abgeschlossen",
    "facts": "ca. 3.900 m² Nutzfläche. Derzeitige Nutzer: z. B. Eckert Schulen, Dorfner Anzaplan, OTH, Stadt Amberg Kita, EPW",
    "image": "assets/images/16 - Georg-Grammer-Straße 2 (2).JPG",
    "visible": true
  },
  {
    "id": 17,
    "title": "Amberger Tafel & Malteser Hilfsdienst",
    "subtitle": "Sulzbacher Straße 15a, Amberg",
    "cat": "bauobjekte",
    "location": "Sulzbacher Straße 15a, Amberg",
    "lat": 49.4494,
    "lng": 11.8521,
    "description": "Erwerb und Umnutzung der ehemaligen Bäko-Immobilie für soziale Einrichtungen. Ca. 400 m² Nutzfläche, 2025 erweitert um drei Carports. Ein Beitrag der WiFAM zur sozialen Infrastruktur.",
    "year": "2010er / 2025",
    "status": "abgeschlossen",
    "facts": "ca. 400 m² Nutzfläche",
    "image": "assets/images/17 - Sulzbacher Str. 15a (2).JPG",
    "visible": true
  },
  {
    "id": 18,
    "title": "Hochschulcampus – Gebäude A & F",
    "subtitle": "Kaiser-Wilhelm-Ring 23, Amberg",
    "cat": "bauobjekte",
    "location": "Kaiser-Wilhelm-Ring 23, Amberg",
    "lat": 49.4442,
    "lng": 11.8778,
    "description": "Staatlich geförderte Sanierung der Gebäude F (2011) und A (2017) am Hochschulcampus. Zusammen rund 1.120 m² für den Technologie Campus der OTH, Forschungseinrichtungen und innovative Unternehmen.",
    "year": "2011 / 2017",
    "status": "abgeschlossen",
    "facts": "Gebäude F (Kaiser-Wilhelm-Ring 23a): ca. 570 m². Gebäude A (23b): ca. 550 m². Nutzer: Ife, KWK, ATC, Hudson, IAF, OTH Geoinformatik",
    "image": null,
    "visible": false
  },
  {
    "id": 19,
    "title": "Büro-, Ärzte- & Geschäftshaus Marienstraße 1+3",
    "subtitle": "Marienstraße 1, Amberg",
    "cat": "bauobjekte",
    "location": "Marienstraße 1, Amberg",
    "lat": 49.4449,
    "lng": 11.8674,
    "description": "Neubau mit Tiefgarage und Kreisverkehr: ca. 4.400 m² Nutzfläche und 67 Stellplätze. Heute Standort von Sparda Bank, Augenpraxisklinik, Bioladen, Reisebüro und der IFB-IT-Stelle der bayerischen Justiz.",
    "year": "2010er",
    "status": "abgeschlossen",
    "facts": "ca. 4.400 m² Nutzfläche, 30 Stellplätze TG, 37 im Freien. Nutzer: u.a. Riedel Orthopädie, Sparda Bank, Dennree Bioladen, Augenpraxisklinik Amberg, IFB-IT-Stelle der bay. Justiz",
    "image": "assets/images/19 - Marienstraße 1+3 Außenansicht.png",
    "visible": true
  },
  {
    "id": 20,
    "title": "WiFAM-Geschäftssitz Emailfabrikstraße 13+15",
    "subtitle": "Emailfabrikstraße 15, Amberg",
    "cat": "bauobjekte",
    "location": "Emailfabrikstraße 15, Amberg",
    "lat": 49.4455,
    "lng": 11.8685,
    "description": "Neubau des Büro- und Geschäftshauses, seit 2018 Sitz der Wirtschaftsförderung Amberg. Ca. 4.600 m² Nutzfläche mit 130 Tiefgaragen- und 79 Außenstellplätzen. Heimat zahlreicher Praxen, Kanzleien und Dienstleister.",
    "year": "2018",
    "status": "abgeschlossen",
    "facts": "ca. 4.600 m² Nutzfläche, 130 TG-Stellplätze + 79 Außenstellplätze. Nutzer: u.a. Wirtschaftsförderung Amberg, Kinderwunschklinik Dr. Krieg, Stadtwerke, Zweckverband",
    "image": "assets/images/20 - Emailfabrikstraße 13+15.JPG",
    "visible": true
  },
  {
    "id": 21,
    "title": "Ausgleichsflächen Brudersdorf, Augsberg & Winkl",
    "subtitle": "Brudersdorf / Augsberg / Winkl, Region Amberg",
    "cat": "bauobjekte",
    "location": "Brudersdorf / Augsberg / Winkl, Region Amberg",
    "lat": 49.428,
    "lng": 11.845,
    "description": "Rund 11.000 m² ökologische Ausgleichsflächen an drei Standorten – eine wichtige Voraussetzung für künftige Bau- und Erschließungsmaßnahmen und Ausdruck verantwortungsvoller Flächenpolitik.",
    "year": "laufend",
    "status": "laufend",
    "facts": "Insgesamt rund 11.000 m²",
    "image": "assets/images/21 - Ausgleichsflächen (2).JPG",
    "visible": true
  },
  {
    "id": 22,
    "title": "Geschäftshaus Regensburger Straße 11+13",
    "subtitle": "Regensburger Straße 11-13, Amberg",
    "cat": "bauobjekte",
    "location": "Regensburger Straße 11-13, Amberg",
    "lat": 49.4441,
    "lng": 11.8675,
    "description": "Viergeschossiger Neubau mit 16 flexiblen Gewerbeeinheiten, Tiefgarage und 109 Stellplätzen. Schließt eine städtebauliche Lücke an einer der wichtigsten Verbindungsachsen Ambergs. 4.650 m² Nutzfläche.",
    "year": "2022/2024",
    "status": "abgeschlossen",
    "facts": "4.650 m² Nutzfläche, 16 Gewerbeeinheiten, 109 Stellplätze. Nutzer: u.a. Grünwald Augenoptik, Hörluchs Hörgeräte, Klinikum St. Marien, Kieferorthopädie AM.BERG, BBV Steuerberatung",
    "image": "assets/images/22 - Regensburger Straße (2).JPG",
    "visible": true
  },
  {
    "id": 23,
    "title": "OBI Bau- und Gartenfachmarkt",
    "subtitle": "Barbarastraße 2, Amberg",
    "cat": "baubetreuung",
    "location": "Barbarastraße 2, Amberg",
    "lat": 49.4338,
    "lng": 11.8632,
    "description": "Erste Baubetreuungsmaßnahme der WiFAM: Neubau eines OBI-Fachmarktes an der Barbarastraße im Jahr 1995 – der Startschuss für die Baubetreuung als Geschäftsfeld.",
    "year": "1995",
    "status": "abgeschlossen",
    "facts": null,
    "image": null,
    "visible": false
  },
  {
    "id": 24,
    "title": "Cineplex Kino Amberg",
    "subtitle": "Regensburger Straße, Amberg",
    "cat": "baubetreuung",
    "location": "Regensburger Straße, Amberg",
    "lat": 49.4378,
    "lng": 11.8638,
    "description": "Neuordnung des Areals an der Regensburger Straße durch langwierige Grundstücksverhandlungen. Nach Abbruch 2014 entstand das Cineplex Kino mit Parkpalette (rund 100 Stellplätze) – ein Highlight der Innenstadtentwicklung.",
    "year": "2014",
    "status": "abgeschlossen",
    "facts": "Kino + Parkpalette mit rund 100 Stellplätzen",
    "image": null,
    "visible": false
  },
  {
    "id": 25,
    "title": "Schönwerth-Realschule – Generalsanierung",
    "subtitle": "Schönwerth-Realschule, Amberg",
    "cat": "baubetreuung",
    "location": "Schönwerth-Realschule, Amberg",
    "lat": 49.4502,
    "lng": 11.8598,
    "description": "Projektsteuerung für die Generalsanierung und den Neubau an der Franz-Xaver-von-Schönwerth-Realschule. Die WiFAM übernahm Koordination, Kostenkontrolle und EU-weite Ausschreibungen zur Entlastung des städtischen Baureferats.",
    "year": "2010er",
    "status": "abgeschlossen",
    "facts": "Kostenkontrolle, EU-weite Ausschreibungen, Generalsanierung in 4 Bauabschnitten",
    "image": null,
    "visible": false
  },
  {
    "id": 26,
    "title": "Seniorenzentrum Bürgerspital",
    "subtitle": "Schlachthausstraße 10b, Amberg",
    "cat": "baubetreuung",
    "location": "Schlachthausstraße 10b, Amberg",
    "lat": 49.4429,
    "lng": 11.8648,
    "description": "Neuer Standort für das Bürgerspital nach Räumung des ursprünglichen Areals in der Bahnhofstraße. Ca. 5.000 m² Nutzfläche auf 7.600 m² Grundstück – realisiert als Baubetreuung für die Bürgerspitalstiftung.",
    "year": "2000er",
    "status": "abgeschlossen",
    "facts": "ca. 5.000 m² Nutzfläche, Grundstücksgröße: ca. 7.600 m²",
    "image": "assets/images/26 - Seniorenzentrum Schlachthausstraße 10b.jpg",
    "visible": true
  },
  {
    "id": 27,
    "title": "Kurfürstenbad – Sanierung & Erweiterung",
    "subtitle": "Kurfürstenbad, Amberg",
    "cat": "baubetreuung",
    "location": "Kurfürstenbad, Amberg",
    "lat": 49.4435,
    "lng": 11.8595,
    "description": "Baubetreuung für die Stadtwerke Amberg: Komplettsanierung der Dachkonstruktion (1998) und Erweiterung mit Aquafitbecken (2004). Die WiFAM als Partner für kommunale Infrastrukturprojekte.",
    "year": "1998 / 2004",
    "status": "abgeschlossen",
    "facts": null,
    "image": null,
    "visible": false
  },
  {
    "id": 28,
    "title": "Gewerbegebiet Gailoh",
    "subtitle": "Gewerbegebiet Gailoh, Amberg",
    "cat": "erschliessung",
    "location": "Gewerbegebiet Gailoh, Amberg",
    "lat": 49.4382,
    "lng": 11.8448,
    "description": "Erschließung in zwei Bauabschnitten mit Straßen- und Kanalbau, Beleuchtung und Versorgungsleitungen für rund 20 gewerbliche Parzellen mit Wohnhausbebauung.",
    "year": "1990er",
    "status": "abgeschlossen",
    "facts": "ca. 20 gewerbliche Parzellen",
    "image": null,
    "visible": false
  },
  {
    "id": 29,
    "title": "Dekontamination Baumannareal",
    "subtitle": "Marienstraße / Emailfabrikstraße, Amberg",
    "cat": "bauobjekte",
    "location": "Marienstraße / Emailfabrikstraße, Amberg",
    "lat": 49.4452,
    "lng": 11.8682,
    "description": "Umfangreiche Altlastensanierung des ehemaligen Baumannareals in mehreren Abschnitten – Grundlage für die Neubebauung an Marienstraße, Jahnstraße und Emailfabrikstraße. Geschätzte Kosten: ca. 20 Mio. €.",
    "year": "1990er-2010er",
    "status": "abgeschlossen",
    "facts": "Geschätzte Kosten ca. 20 Mio. Euro",
    "image": null,
    "visible": false
  },
  {
    "id": 30,
    "title": "Industriegebiet Nord – Erweiterung",
    "subtitle": "Industriegebiet Nord, Amberg",
    "cat": "erschliessung",
    "location": "Industriegebiet Nord, Amberg",
    "lat": 49.4555,
    "lng": 11.8648,
    "description": "Durch Bebauungsplanerweiterungen wurden große Gewerbeflächen neu ausgewiesen und erschlossen. Heute Standort von Herding Filtertechnik, PIA Automation, Emerson, Kerb Konus und vielen weiteren Industrieunternehmen.",
    "year": "1990er-2000er",
    "status": "abgeschlossen",
    "facts": "Angesiedelte Firmen: z. B. Forum-Plast, AMA, Auer Guss, Herding Filtertechnik, Kerb Konus, Emerson, Jokiel, PIA Automation, Moedel Werk II, Fa. Bieda",
    "image": null,
    "visible": false
  },
  {
    "id": 31,
    "title": "Gewerbegebiet Ost – An den Franzosenäckern",
    "subtitle": "An den Franzosenäckern, Amberg",
    "cat": "erschliessung",
    "location": "An den Franzosenäckern, Amberg",
    "lat": 49.4392,
    "lng": 11.8848,
    "description": "Erschließung in zwei Bauabschnitten (2001 und 2005) mit Fachmarktzentrum und weiteren Gewerbeflächen. Ca. 8.000 m² Nutzfläche im Fachmarktzentrum, heute Standort von Aldi, dm, DHL und vielen weiteren.",
    "year": "2001 / 2005",
    "status": "abgeschlossen",
    "facts": "1. BA: Fachmarktzentrum mit ca. 8.000 m² (u.a. Rofu, Deichmann, AWG, Hervis, Jysk) sowie Aldi, dm, Autec. 2. BA: u.a. Tedi, Tedox, Kostell Sicherheitsdienst",
    "image": "assets/images/31 - Luftbild-GG-Ost (3).JPG",
    "visible": true
  },
  {
    "id": 32,
    "title": "Berufsschulzentrum FOS/BOS",
    "subtitle": "Berufsschulzentrum, Amberg",
    "cat": "baubetreuung",
    "location": "Berufsschulzentrum, Amberg",
    "lat": 49.4428,
    "lng": 11.8702,
    "description": "Projektsteuerung für den Neubau des Berufsschulzentrums Amberg. Koordination zwischen Architekten, Planern und Stadt Amberg mit Kostenkontrolle – zur Entlastung des städtischen Baureferats.",
    "year": "2010er",
    "status": "abgeschlossen",
    "facts": null,
    "image": null,
    "visible": false
  },
  {
    "id": 33,
    "title": "Tiefgarage am Congress Centrum (ACC)",
    "subtitle": "Amberger Congress Centrum, Amberg",
    "cat": "baubetreuung",
    "location": "Amberger Congress Centrum, Amberg",
    "lat": 49.4445,
    "lng": 11.8622,
    "description": "Baubetreuung für die Stadtwerke Amberg: Errichtung einer Tiefgarage mit rund 200 Stellplätzen im Zusammenhang mit dem Neubau des Amberger Congress Centrums.",
    "year": "2000er",
    "status": "abgeschlossen",
    "facts": "Rund 200 Stellplätze",
    "image": null,
    "visible": false
  },
  {
    "id": 34,
    "title": "Bayerischer Qualitätspreis 2001",
    "subtitle": "Amberg",
    "cat": "ereignisse",
    "location": "Amberg",
    "lat": 49.4445,
    "lng": 11.8585,
    "description": "Amberg wurde als wirtschaftsfreundliche Gemeinde ausgezeichnet – eine Würdigung der aktiven Gewerbeentwicklung, der Konversion ehemaliger Militärflächen und der engen Zusammenarbeit mit regionalen Unternehmen.",
    "year": "2001",
    "status": "abgeschlossen",
    "facts": "Amberg überzeugte durch aktive Gewerbeentwicklung und erfolgreiche Nutzung ehemaliger Militärflächen. Auch die enge Zusammenarbeit mit regionalen Unternehmen sowie die Gründung der OTH Amberg-Weiden stärkten das wirtschaftliche Profil der Stadt.",
    "image": "assets/images/34 - Wirtschaftsfreundliche Gemeinde.jpg",
    "visible": true
  },
  {
    "id": 35,
    "title": "Erster Amberger Gründungswettbewerb",
    "subtitle": "Amberg",
    "cat": "events",
    "location": "Amberg",
    "lat": 49.4463,
    "lng": 11.872,
    "description": "2024/2025 gemeinsam mit der VR-Bank ins Leben gerufen: 26 Bewerbungen, 6 Finalisten, Hauptpreis im Wert von 10.000 €. Coaching, Netzwerk und Sichtbarkeit für Gründerinnen und Gründer in Amberg.",
    "year": "seit 2024",
    "status": "laufend",
    "facts": "26 Bewerber, 6 Finalisten, Hauptpreis 10.000 Euro. Zugang zu Coaching, Gründungsberatung und starkem Netzwerk.",
    "image": "assets/images/35 - Gründungswettbewerb.JPG",
    "visible": true
  },
  {
    "id": 36,
    "title": "Gründung des Wirtschaftsraums Amberg",
    "subtitle": "Amberg & 6 Nachbargemeinden",
    "cat": "ereignisse",
    "location": "Amberg & 6 Nachbargemeinden",
    "lat": 49.441,
    "lng": 11.865,
    "description": "Seit 2018 arbeiten sieben Kommunen zusammen, seit 2023 als eingetragener Verein. Gemeinsam werden Fachkräftemangel, Gewerbeflächenentwicklung und nachhaltige Standortentwicklung angegangen.",
    "year": "seit 2018",
    "status": "laufend",
    "facts": "Zweckvereinbarung am 15.03.2018 unterzeichnet. Am 24.01.2023 Gründung des Vereins Wirtschaftsraum Amberg e.V. Der Zusammenschluss stärkt die Region durch gemeinsame Planung, Strategien und Flächenentwicklung.",
    "image": "assets/images/36 - Gründung Wirtschaftsraum Unterschrift - komp.jpg",
    "visible": true
  },
  {
    "id": 37,
    "title": "Masterplan Standortentwicklung 2035",
    "subtitle": "Wirtschaftsraum Amberg",
    "cat": "projekte",
    "location": "Wirtschaftsraum Amberg",
    "lat": 49.443,
    "lng": 11.866,
    "description": "Gemeinsam mit GEO-PLAN entwickelte Zukunftsstrategie für den Wirtschaftsraum, 2025 vorgestellt. Koordiniert Gewerbeflächen, Energie, Mobilität und Wohnen als Grundlage für die regionale Entwicklung.",
    "year": "2025",
    "status": "laufend",
    "facts": "2025 vorgestellt und gemeinsam beschlossen. Koordiniert zentrale Zukunftsthemen wie Gewerbeflächen, Energie, Mobilität und Wohnen. Steigert langfristig die Wettbewerbs- und Zukunftsfähigkeit des Wirtschaftsraums.",
    "image": "assets/images/37 - Masterplan Fotos Kathrin Kammermeier Pressestelle RegOPf (3).JPG",
    "visible": true
  },
  {
    "id": 38,
    "title": "Stadtlabor+ – Mehrfach ausgezeichnet",
    "subtitle": "Drei Höfe, Amberg Altstadt",
    "cat": "ereignisse",
    "location": "Drei Höfe, Amberg Altstadt",
    "lat": 49.4443,
    "lng": 11.8568,
    "description": "Innovationsraum in der Amberger Altstadt, ausgezeichnet mit dem Stadtmarketingpreis und dem Kommunalentwicklungsaward. Plattform für Pop-Ups, Coworking und kreative Innenstadtentwicklung.",
    "year": "2020er",
    "status": "laufend",
    "facts": null,
    "image": "assets/images/38 - Stadtlabor+.JPG",
    "visible": true
  },
  {
    "id": 39,
    "title": "Immobilienplattform Amberg",
    "subtitle": "Amberg",
    "cat": "projekte",
    "location": "Amberg",
    "lat": 49.4438,
    "lng": 11.854,
    "description": "Digitales Portal der WiFAM zur Vermittlung von Gewerbeimmobilien in Amberg – von Büroflächen über Ladenlokale bis zu Produktionshallen. Ein Service für ansiedlungswillige Unternehmen.",
    "year": "laufend",
    "status": "laufend",
    "facts": null,
    "image": "assets/images/39 - Immobilienportal.png",
    "visible": true
  },
  {
    "id": 40,
    "title": "DillyDally Designmarkt",
    "subtitle": "Drei Höfe, Amberg",
    "cat": "events",
    "location": "Drei Höfe, Amberg",
    "lat": 49.4445,
    "lng": 11.8572,
    "description": "Der beliebte Designmarkt aus Regensburg gastierte erstmals in Amberg: 40 ausgewählte Design-Stände, Pop-Up-Gastronomie und Rauminstallationen auf 500 m² in den Drei Höfen. Über 1.000 Besucher beim ersten Markt.",
    "year": "seit 2025",
    "status": "laufend",
    "facts": "40 Design-Stände, 500 m², 1.000+ Besucher",
    "image": "assets/images/40 - Dilly Dally by Franziska 25.05 (4).JPG",
    "visible": true
  },
  {
    "id": 41,
    "title": "Ladies Night Amberg",
    "subtitle": "Altstadt Amberg",
    "cat": "events",
    "location": "Altstadt Amberg",
    "lat": 49.4448,
    "lng": 11.859,
    "description": "Jährliches Innenstadt-Event seit 2024: Über 55 Geschäfte und Lokale mit verlängerten Öffnungszeiten bis 22 Uhr, Prosecco-Shopping, DJs und Beauty-Aktionen. Die 350 limitierten Shopping Bags waren sofort vergriffen.",
    "year": "seit 2024",
    "status": "laufend",
    "facts": "2025: über 55 Läden und Lokale mit verlängerten Öffnungszeiten bis 22 Uhr. 350 limitierte Ladies Night Shopping Bags. Vierstellige Besucherzahl.",
    "image": "assets/images/41 - Ladies Night 2025 by Franziska 19.09 (43).JPG",
    "visible": true
  },
  {
    "id": 42,
    "title": "Amberg Blog",
    "subtitle": "Amberg",
    "cat": "projekte",
    "location": "Amberg",
    "lat": 49.4442,
    "lng": 11.8545,
    "description": "2020 in der Coronakrise als Hilfsmaßnahme gestartet, heute zentraler Reichweitenkanal mit über 16.000 Followern. Berichtet über Neueröffnungen, Bauprojekte, Events und macht lokale Unternehmen sichtbar.",
    "year": "seit 2020",
    "status": "laufend",
    "facts": "Über 16.000 Follower auf Instagram und Facebook. Kostenlose Social-Media-Werbung für lokale Betriebe, speziell für Neueröffnungen, Recruiting und Eventbewerbung.",
    "image": "assets/images/42 - Amberg Blog.png",
    "visible": true
  },
  {
    "id": 43,
    "title": "Azubi-Bustour „Nächste Haltestelle: Traumjob!“",
    "subtitle": "Amberg & Region",
    "cat": "projekte",
    "location": "Amberg & Region",
    "lat": 49.44,
    "lng": 11.853,
    "description": "Jährliches Berufsorientierungsformat, das Jugendliche direkt in Betriebe bringt. 2026 bereits die vierte Runde mit über 400 Schülern und 23 Betrieben. 2025 mit dem Berufsbildungspreis BOBY ausgezeichnet.",
    "year": "seit 2023",
    "status": "laufend",
    "facts": "2026: über 400 Schüler, 23 Betriebe. 2025 mit dem Berufsbildungspreis BOBY ausgezeichnet. Eines der erfolgreichsten Berufsorientierungsangebote der Oberpfalz.",
    "image": "assets/images/43 - Bustour BOBY Wettbewerb 2025, Seitz Alexander (25) klein.jpg",
    "visible": true
  },
  {
    "id": 44,
    "title": "Einzelhandelsentwicklungskonzept",
    "subtitle": "Amberg Altstadt",
    "cat": "ereignisse",
    "location": "Amberg Altstadt",
    "lat": 49.4448,
    "lng": 11.8578,
    "description": "Seit 2011 steuert das Konzept die Sortimentsverteilung zwischen Innenstadt und Peripherie. Es sicherte die Funktionsfähigkeit der Altstadt als Einkaufsstandort – wird aktuell auf den Prüfstand gestellt.",
    "year": "seit 2011",
    "status": "laufend",
    "facts": "2011 eingeführt. Sicherte die Funktionsfähigkeit der Altstadt als Einkaufsstandort. Stärkte Frequenz und Attraktivität der Innenstadt. Überarbeitung wird aktuell diskutiert.",
    "image": "assets/images/44 - Einzelhandelsentwicklungskonzept.png",
    "visible": true
  },
  {
    "id": 45,
    "title": "Amberg Podcast",
    "subtitle": "WifAm, Emailfabrikstraße 15, Amberg",
    "cat": "projekte",
    "location": "WifAm, Emailfabrikstraße 15, Amberg",
    "lat": 49.4455,
    "lng": 11.8685,
    "description": "Seit 2022 stellt der Podcast Gründer, Unternehmer und regionale Projekte vor. Über 50 Episoden, 4,0 Sterne auf Apple Podcasts. Präsentiert vom Amberg Blog auf Spotify, Apple Podcasts und wifam.de.",
    "year": "seit 2022",
    "status": "laufend",
    "facts": "Über 50 veröffentlichte Episoden. 4,0 Sterne auf Apple Podcasts.",
    "image": "assets/images/45 - Podcast Abraham, Silvia Schneider 1.JPG",
    "visible": true
  }
];

const MOBILE_BP = 768;
function isMobile() {
  return window.innerWidth < MOBILE_BP;
}

// ── STATE ──
let markers = [];
let activeFilter = new Set(Object.keys(CATS));
let leafletMarkers = [];
let clusterGroup = null;
let selectedStation = null;
let cardListScrollTop = 0;
let lastSelectTime = 0;
let map;

// ── INIT ──
async function init() {
  markers = MARKERS_DATA;

  buildFilterChips();
  buildCardList();

  map = L.map('map', {
    center: AMBERG,
    zoom: 14,
    minZoom: 13,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: true,
    maxBounds: BOUNDS,
    maxBoundsViscosity: 1.0
  });

  // CartoDB Positron - clean, reduced, editorial style
  L.tileLayer('tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; OSM &copy; CARTO (offline)',
    maxZoom: 18
  }).addTo(map);

  map.zoomControl.setPosition(isMobile() ? 'bottomleft' : 'bottomright');

  // Prevent sidebar scroll from zooming map
  const sidebar = document.getElementById('sidebar');
  L.DomEvent.disableScrollPropagation(sidebar);

  map.on('click', onMapClick);

  if (isMobile()) {
    initBottomSheet();
  }

  window.addEventListener('resize', onResize);

  addMarkers();

  // Hide loading overlay
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.classList.add('loaded');
}

// ── FILTER CHIPS ──
function buildFilterChips() {
  const row = document.getElementById('filterRow');
  row.innerHTML = '';
  const counts = {};
  markers.filter(m => m.visible !== false).forEach(m => { counts[m.cat] = (counts[m.cat] || 0) + 1; });

  // "Alle" chip
  const allBtn = document.createElement('button');
  allBtn.className = 'chip active';
  allBtn.dataset.cat = 'alle';
  allBtn.innerHTML = '<svg class="chip-check" viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg> Alle';
  allBtn.addEventListener('click', () => {
    const allActive = activeFilter.size === Object.keys(counts).length;
    if (allActive) {
      activeFilter.clear();
      row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    } else {
      Object.keys(counts).forEach(k => activeFilter.add(k));
      row.querySelectorAll('.chip').forEach(c => c.classList.add('active'));
    }
    buildCardList();
    addMarkers();
    deselectStation();
  });
  row.appendChild(allBtn);

  Object.entries(CATS).forEach(([key, cfg]) => {
    if (!counts[key]) return;
    const btn = document.createElement('button');
    btn.className = 'chip active';
    btn.dataset.cat = key;
    btn.innerHTML = '<span class="chip-dot"></span>' +
      '<svg class="chip-check" viewBox="0 0 12 12" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg> ' +
      cfg.label + ' <span style="opacity:0.7">(' + counts[key] + ')</span>';
    btn.addEventListener('click', () => {
      if (activeFilter.has(key)) { activeFilter.delete(key); btn.classList.remove('active'); }
      else { activeFilter.add(key); btn.classList.add('active'); }
      // Update "Alle" chip state
      const allChip = row.querySelector('.chip[data-cat="alle"]');
      if (allChip) {
        if (activeFilter.size === Object.keys(counts).length) allChip.classList.add('active');
        else allChip.classList.remove('active');
      }
      buildCardList();
      addMarkers();
      deselectStation();
    });
    row.appendChild(btn);
  });
}

// ── CARD LIST ──
function buildCardList() {
  const list = document.getElementById('cardList');
  list.innerHTML = '';

  const visible = markers.filter(m => m.visible !== false && activeFilter.has(m.cat));
  const totalVisible = markers.filter(m => m.visible !== false).length;

  if (visible.length === 0) {
    list.innerHTML = '<div class="empty-state">' +
      '<div class="empty-state-icon">&#x1F50D;</div>' +
      'Keine Stationen ausgewählt.<br>Aktivieren Sie einen Filter oben.</div>';
    document.getElementById('counterNum').innerHTML = '0 <span style="color:var(--grey-text);font-weight:400">von ' + totalVisible + '</span>';
    return;
  }

  // Sort by year (chronological)
  visible.sort((a, b) => {
    const yearA = parseInt((a.year || '9999').replace(/[^\d]/g, '')) || 9999;
    const yearB = parseInt((b.year || '9999').replace(/[^\d]/g, '')) || 9999;
    return yearA - yearB;
  });

  visible.forEach(data => {
    const cat = CATS[data.cat] || CATS.bauobjekte;
    const card = document.createElement('div');
    card.className = 'station-card';
    card.dataset.id = data.id;

    let thumbHTML = '';
    if (data.image) {
      thumbHTML = '<img class="card-thumb" src="' + data.image + '" alt="" loading="lazy" />';
    }

    card.innerHTML =
      '<div class="card-color-bar" style="background:' + cat.color + '"></div>' +
      '<div class="card-icon"><img src="' + cat.icon + '" alt="" /></div>' +
      '<div class="card-content">' +
        '<div class="card-title">' + data.title + '</div>' +
        '<div class="card-subtitle">' + (data.subtitle || '') + (data.year ? ' · ' + data.year : '') + '</div>' +
      '</div>' +
      thumbHTML;

    card.addEventListener('click', () => selectStation(data));
    list.appendChild(card);
  });

  document.getElementById('counterNum').innerHTML = visible.length + ' <span style="color:var(--grey-text);font-weight:400">von ' + totalVisible + '</span>';
}

// ── MARKERS ──
function createIcon(data) {
  const cat = CATS[data.cat] || CATS.bauobjekte;
  const safeTitle = data.title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  return L.divIcon({
    html: '<div class="pin-wrap" data-id="' + data.id + '">' +
      '<div class="pin-tooltip">' + safeTitle + '</div>' +
      '<div class="pin-head" style="background:' + cat.color + '">' +
        '<span class="pin-icon">' + cat.emoji + '</span>' +
      '</div></div>',
    className: '',
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -52]
  });
}

function addMarkers() {
  // Remove old markers
  if (clusterGroup) {
    map.removeLayer(clusterGroup);
  }
  leafletMarkers = [];

  clusterGroup = L.markerClusterGroup({
    maxClusterRadius: 35,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    iconCreateFunction: function(cluster) {
      var count = cluster.getChildCount();
      return L.divIcon({
        html: '<div class="cluster-icon">' + count + '</div>',
        className: '',
        iconSize: [36, 36]
      });
    }
  });

  const visible = markers.filter(m => m.visible !== false && activeFilter.has(m.cat));

  visible.forEach(data => {
    const layer = L.marker([data.lat, data.lng], {
      icon: createIcon(data),
      riseOnHover: true
    });

    layer.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      selectStation(data);
    });
    clusterGroup.addLayer(layer);
    leafletMarkers.push({ layer, data });
  });

  map.addLayer(clusterGroup);
}

// ── MAP CLICK ──
function onMapClick() {
  // Guard: ignore map clicks that fire immediately after a marker select (touch event race)
  if (Date.now() - lastSelectTime < 300) return;
  if (selectedStation) {
    deselectStation();
  }
  if (isMobile()) {
    setSheetState('peek');
  }
}

// ── SELECT STATION ──
function selectStation(data) {
  const cat = CATS[data.cat] || CATS.bauobjekte;
  selectedStation = data;
  lastSelectTime = Date.now();

  // Save scroll position
  cardListScrollTop = document.getElementById('cardList').scrollTop;

  // Hide onboarding hint on first interaction
  const hint = document.getElementById('onboardingHint');
  if (hint && !hint.classList.contains('hidden')) hint.classList.add('hidden');

  if (isMobile()) {
    // Mobile: show detail via bottom sheet
    setSheetState('full');
  } else {
    // Desktop: open sidebar if hidden
    const main = document.getElementById('mainContent');
    if (main.classList.contains('sidebar-hidden')) {
      main.classList.remove('sidebar-hidden');
      setTimeout(() => { map.invalidateSize(); }, 400);
    }
  }

  // Highlight card and scroll into view
  document.querySelectorAll('.station-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.querySelector('.station-card[data-id="' + data.id + '"]');
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Highlight marker
  document.querySelectorAll('.pin-wrap').forEach(p => p.classList.remove('active'));
  const activePin = document.querySelector('.pin-wrap[data-id="' + data.id + '"]');
  if (activePin) activePin.classList.add('active');

  // Populate detail
  const imgWrap = document.getElementById('detailImgWrap');
  if (data.image) {
    imgWrap.innerHTML = '<img class="detail-img" loading="lazy" src="' + data.image +
      '" alt="' + data.title +
      '" onerror="this.parentElement.innerHTML=\'<div class=\\\'detail-img-placeholder\\\'><img src=\\\'' +
      cat.icon + '\\\' style=\\\'width:60px;height:60px;opacity:0.35;border-radius:50%\\\' /></div>\'" />';
  } else {
    imgWrap.innerHTML = '<div class="detail-img-placeholder">' +
      '<img src="' + cat.icon + '" style="width:60px;height:60px;opacity:0.35;border-radius:50%" />' +
      '<span class="placeholder-text">Bild folgt</span></div>';
  }

  document.getElementById('detailStrip').style.background = cat.color;
  document.getElementById('detailBadgeDot').style.background = cat.color;
  document.getElementById('detailBadgeText').textContent = cat.label;
  document.getElementById('detailBadge').style.color = cat.color;
  document.getElementById('detailTitle').textContent = data.title;

  const subEl = document.getElementById('detailSubtitle');
  subEl.textContent = data.subtitle || '';
  subEl.style.display = data.subtitle ? '' : 'none';

  let yearHTML = data.year || '';
  if (data.status) yearHTML += ' <span class="detail-status ' + data.status + '">' + data.status + '</span>';
  document.getElementById('detailYear').innerHTML = yearHTML;

  document.getElementById('detailText').textContent = data.description;

  const factsEl = document.getElementById('detailFacts');
  if (data.facts) {
    document.getElementById('detailFactsContent').textContent = data.facts;
    factsEl.style.display = '';
  } else { factsEl.style.display = 'none'; }

  const partnersEl = document.getElementById('detailPartners');
  if (data.partners && data.partners.length) {
    document.getElementById('detailPartnersContent').textContent = data.partners.join(', ');
    partnersEl.style.display = '';
  } else { partnersEl.style.display = 'none'; }

  document.getElementById('detailTags').innerHTML =
    (data.tags || []).map(t => '<span class="tag">' + t + '</span>').join('');

  // Show detail view
  document.getElementById('sidebar').classList.add('show-detail');

  // Scroll detail to top
  document.getElementById('detailView').scrollTop = 0;

  // Fly to station
  map.flyTo([data.lat, data.lng], Math.max(map.getZoom(), 16), { duration: 1.2, easeLinearity: 0.25 });
}

// ── DESELECT ──
function deselectStation() {
  if (!selectedStation) return;
  selectedStation = null;

  document.getElementById('sidebar').classList.remove('show-detail');
  document.querySelectorAll('.pin-wrap').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.station-card').forEach(c => c.classList.remove('active'));

  // Restore scroll
  setTimeout(() => {
    document.getElementById('cardList').scrollTop = cardListScrollTop;
  }, 50);

  // Fly back to overview
  map.flyTo(AMBERG, 14, { duration: 0.8 });
}

document.getElementById('detailBack').addEventListener('click', () => {
  deselectStation();
  if (isMobile()) {
    setSheetState('half');
  }
});

// ── SIDEBAR TOGGLE ──
document.getElementById('sidebarToggle').addEventListener('click', () => {
  const main = document.getElementById('mainContent');
  main.classList.toggle('sidebar-hidden');
  // Leaflet needs a resize event after layout change
  setTimeout(() => { map.invalidateSize(); }, 400);
});

// ── BOTTOM SHEET (Mobile) ──
let sheetState = 'half';

function getSheetTranslateY(state) {
  if (state === 'peek') {
    const sidebar = document.getElementById('sidebar');
    const sidebarHeight = sidebar.offsetHeight || window.innerHeight;
    const peekPx = 80;
    return ((sidebarHeight - peekPx) / sidebarHeight) * 100;
  }
  if (state === 'half') return 55;
  if (state === 'full') return 8;
  return 55;
}

function setSheetState(state) {
  sheetState = state;
  const sidebar = document.getElementById('sidebar');
  sidebar.dataset.sheet = state;
  sidebar.style.transform = 'translateY(' + getSheetTranslateY(state) + '%)';
  setTimeout(() => { map.invalidateSize(); }, 400);
}

function initBottomSheet() {
  const sidebar = document.getElementById('sidebar');
  const handle = document.getElementById('dragHandle');
  const cardList = document.getElementById('cardList');
  const detailViewEl = document.getElementById('detailView');

  setSheetState('half');

  let startY = 0;
  let startTranslateY = 0;
  let isDragging = false;

  function getCurrentTranslateY() {
    const transform = sidebar.style.transform;
    const match = transform.match(/translateY\(([^)]+)%\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  function getScrollableEl() {
    return sidebar.classList.contains('show-detail') ? detailViewEl : cardList;
  }

  function onTouchStart(e) {
    const target = e.target;
    const isHandle = handle.contains(target);
    const isHeader = document.querySelector('.sidebar-header').contains(target);

    if (isHandle || isHeader) {
      startY = e.touches[0].clientY;
      startTranslateY = getCurrentTranslateY();
      isDragging = true;
      sidebar.classList.add('dragging');
      return;
    }

    // In scroll area: record start position, decide in touchmove
    const scrollable = getScrollableEl();
    if (scrollable.contains(target)) {
      startY = e.touches[0].clientY;
      startTranslateY = getCurrentTranslateY();
      isDragging = false;
    }
  }

  function onTouchMove(e) {
    if (isDragging) {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const sidebarHeight = sidebar.offsetHeight || window.innerHeight;
      const deltaPercent = (deltaY / sidebarHeight) * 100;
      const newTranslateY = Math.max(0, Math.min(95, startTranslateY + deltaPercent));
      sidebar.style.transform = 'translateY(' + newTranslateY + '%)';
      return;
    }

    // Check if we should start dragging from scroll area
    const scrollable = getScrollableEl();
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 8 && scrollable.scrollTop <= 0) {
      isDragging = true;
      sidebar.classList.add('dragging');
      startTranslateY = getCurrentTranslateY();
      startY = currentY;
      e.preventDefault();
    }
  }

  function onTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    sidebar.classList.remove('dragging');

    const currentTranslateY = getCurrentTranslateY();
    const dragDelta = currentTranslateY - startTranslateY;

    // States ordered by translateY ascending: full (8%) < half (55%) < peek (~85%)
    // Dragging down = positive delta = increasing translateY = toward peek
    // Dragging up = negative delta = decreasing translateY = toward full
    const statesOrdered = ['full', 'half', 'peek'];
    const currentIdx = statesOrdered.indexOf(sheetState);

    let targetState;

    if (Math.abs(dragDelta) > 15) {
      if (dragDelta > 0) {
        // Dragged down -> toward peek (higher index)
        targetState = statesOrdered[Math.min(currentIdx + 1, statesOrdered.length - 1)];
      } else {
        // Dragged up -> toward full (lower index)
        targetState = statesOrdered[Math.max(currentIdx - 1, 0)];
      }
    } else {
      // Small drag: snap to closest
      let closestState = sheetState;
      let closestDist = Infinity;
      statesOrdered.forEach(state => {
        const stateY = getSheetTranslateY(state);
        const dist = Math.abs(currentTranslateY - stateY);
        if (dist < closestDist) {
          closestDist = dist;
          closestState = state;
        }
      });
      targetState = closestState;
    }

    setSheetState(targetState);
  }

  sidebar.addEventListener('touchstart', onTouchStart, { passive: true });
  sidebar.addEventListener('touchmove', onTouchMove, { passive: false });
  sidebar.addEventListener('touchend', onTouchEnd, { passive: true });
}

// ── RESIZE ──
function onResize() {
  if (isMobile()) {
    map.zoomControl.setPosition('bottomleft');
    const sidebar = document.getElementById('sidebar');
    if (!sidebar.dataset.sheet) {
      initBottomSheet();
    }
  } else {
    map.zoomControl.setPosition('bottomright');
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = '';
    sidebar.dataset.sheet = '';
    sidebar.classList.remove('dragging');
  }
  map.invalidateSize();
}

// ── GO ──
init();
