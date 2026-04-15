# WIFAM v6 Mobile-Optimierung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create v6.html with 3-stage bottom sheet, compact mobile header, and split file structure while keeping v5.html as fallback.

**Architecture:** Extract v5's inline CSS/JS into `css/style.css` and `js/app.js`. Add touch-driven 3-stage bottom sheet for mobile (<768px). Desktop layout stays unchanged. Both v5 and v6 are deployed to GitHub Pages as separate URLs.

**Tech Stack:** Vanilla HTML/CSS/JS, Leaflet.js 1.9.4, no build step, GitHub Pages

---

### Task 1: Create v6.html (HTML skeleton)

**Files:**
- Create: `v6.html`

- [ ] **Step 1: Create v6.html with external CSS/JS references**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <meta name="robots" content="noindex" />
  <title>WIFAM – 35 Jahre Wirtschaftsförderung Amberg</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
<div class="app">

  <!-- HEADER -->
  <header>
    <img src="assets/images/wifam-logo.webp" alt="WifAm - Wirtschaftsförderung Amberg" class="brand-logo" />
    <div class="header-center">
      <div class="jubilee-badge">35 JAHRE</div>
      <div class="jubilee-label">Unsere Spuren<br>in Amberg</div>
    </div>
    <div class="header-right">
      Amberg &amp; Region<br>
      <strong style="color:var(--magenta)">1991 - 2026</strong>
    </div>
  </header>

  <!-- DAS BAND - CD-Gestaltungselement -->
  <div class="das-band">
    <svg viewBox="0 0 1200 34" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-10,28 C150,8 300,32 500,16 C700,0 900,30 1210,12"
            stroke="#c6007e" stroke-width="5" fill="none"
            opacity="0.55" stroke-linecap="round" />
      <path d="M-10,22 C200,34 400,6 600,22 C800,38 1000,8 1210,20"
            stroke="#c6007e" stroke-width="3" fill="none"
            opacity="0.35" stroke-linecap="round" />
    </svg>
  </div>

  <!-- MAIN -->
  <div class="main-content" id="mainContent">

    <!-- SIDEBAR / BOTTOM-SHEET -->
    <div class="sidebar" id="sidebar">
      <!-- Drag handle (mobile only, visible via CSS) -->
      <div class="drag-handle" id="dragHandle">
        <div class="drag-handle-bar"></div>
      </div>

      <div class="sidebar-header">
        <div class="sidebar-title">35 Jahre: Unsere Stationen</div>
        <div class="sidebar-subtitle">
          <span class="counter-pill"><span id="counterNum">0</span> Stationen</span>
        </div>
        <div class="onboarding-hint" id="onboardingHint">Tippen Sie auf eine Station, um mehr zu erfahren</div>
        <div class="filter-row" id="filterRow"></div>
      </div>

      <div class="sidebar-views">
        <!-- Card List -->
        <div class="card-list-view" id="cardList"></div>

        <!-- Detail -->
        <div class="detail-view" id="detailView">
          <div class="detail-back" id="detailBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Alle Stationen
          </div>
          <div id="detailImgWrap"></div>
          <div class="detail-cat-strip" id="detailStrip"></div>
          <div class="detail-body">
            <div class="detail-badge" id="detailBadge">
              <div class="detail-badge-dot" id="detailBadgeDot"></div>
              <span id="detailBadgeText"></span>
            </div>
            <h2 class="detail-title" id="detailTitle"></h2>
            <div class="detail-subtitle" id="detailSubtitle"></div>
            <div class="detail-year" id="detailYear"></div>
            <div class="detail-divider"></div>
            <p class="detail-text" id="detailText"></p>
            <div class="detail-facts" id="detailFacts" style="display:none">
              <div class="detail-section-label">Kennzahlen</div>
              <div id="detailFactsContent"></div>
            </div>
            <div class="detail-partners" id="detailPartners" style="display:none">
              <div class="detail-section-label">Partner</div>
              <div id="detailPartnersContent"></div>
            </div>
            <div class="detail-tags" id="detailTags"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <div class="map-container">
      <div id="map"></div>
      <!-- WIFAM Eck -->
      <div class="wifam-eck"></div>
    </div>
  </div>

  <!-- SIDEBAR TOGGLE (desktop only, hidden on mobile via CSS) -->
  <button class="sidebar-toggle" id="sidebarToggle" title="Sidebar ein-/ausblenden">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>

</div>

<script src="js/app.js"></script>
</body>
</html>
```

Key differences from v5.html:
- No inline `<style>` or `<script>` -- external `css/style.css` and `js/app.js`
- New `.drag-handle` element inside sidebar (first child)
- Sidebar toggle button moved outside main-content for easier mobile hiding

- [ ] **Step 2: Verify v6.html is valid HTML**

Open `v6.html` in browser. Expect: blank page (no CSS/JS yet), but no console errors except missing files.

- [ ] **Step 3: Commit**

```bash
git add v6.html
git commit -m "feat: add v6.html skeleton with external CSS/JS references"
```

---

### Task 2: Extract CSS into css/style.css (Desktop styles)

**Files:**
- Create: `css/style.css`
- Reference: `v5.html:13-548` (all `<style>` content)

- [ ] **Step 1: Create css/ directory and style.css**

Extract all CSS from v5.html lines 14-548 into `css/style.css`. This is a direct copy of the CSS content between the `<style>` tags, with these changes:

1. Copy everything from v5.html `<style>` to `</style>` verbatim
2. Remove the entire `@media (max-width: 768px)` block (lines 518-548) -- this will be rewritten
3. Add new styles for `.drag-handle` (hidden on desktop)
4. Add placeholder comment for mobile styles

The file structure should be:
```css
/* ══════════════════════════════════════
   WIFAM v6 – Styles
   ══════════════════════════════════════ */

/* ── CSS CUSTOM PROPERTIES ── */
:root { /* ... copied from v5 ... */ }

/* ── RESET ── */
*, *::before, *::after { /* ... */ }
html, body { /* ... */ }
.app { /* ... */ }

/* ── HEADER ── */
/* ... all header styles from v5 ... */

/* ── DAS BAND ── */
/* ... all band styles from v5 ... */

/* ── MAIN LAYOUT ── */
/* ... all main-content, sidebar styles from v5 ... */

/* ── DRAG HANDLE (mobile only) ── */
.drag-handle {
  display: none; /* hidden on desktop */
}

/* ── FILTER CHIPS ── */
/* ... all chip styles from v5 ... */

/* ── CARD LIST VIEW ── */
/* ... all card-list, station-card styles from v5 ... */

/* ── DETAIL VIEW ── */
/* ... all detail styles from v5 ... */

/* ── MAP ── */
/* ... all map styles from v5 ... */

/* ── CUSTOM MARKER ── */
/* ... all pin styles from v5 ... */

/* ── SIDEBAR TOGGLE ── */
/* ... all toggle styles from v5 ... */

/* ── WIFAM ECK ── */
/* ... all wifam-eck styles from v5 ... */

/* ── COUNTER ── */
/* ... all counter styles from v5 ... */

/* ══════════════════════════════════════
   RESPONSIVE – Mobile (< 768px)
   ══════════════════════════════════════ */
/* Added in Task 3 */
```

- [ ] **Step 2: Verify desktop layout matches v5**

Open `v6.html` in a desktop browser (>768px wide). Compare side by side with `v5.html`. They should look identical except for the invisible drag handle.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: extract desktop CSS from v5 into css/style.css"
```

---

### Task 3: Add mobile CSS (compact header + bottom sheet layout)

**Files:**
- Modify: `css/style.css` (append mobile styles)

- [ ] **Step 1: Add mobile media query block at end of style.css**

Append the following to `css/style.css`:

```css
/* ══════════════════════════════════════
   RESPONSIVE – Mobile (< 768px)
   ══════════════════════════════════════ */
@media (max-width: 768px) {

  /* ── COMPACT HEADER ── */
  header {
    height: 36px;
    padding: 0 0.75rem;
  }
  .brand-logo {
    height: 28px;
  }
  .header-center {
    position: static;
    transform: none;
    margin-left: 0.5rem;
  }
  .jubilee-badge {
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
  }
  .jubilee-label,
  .header-right {
    display: none;
  }

  /* ── BAND: hidden on mobile ── */
  .das-band {
    display: none;
  }

  /* ── APP LAYOUT: map takes full screen ── */
  .app {
    grid-template-rows: auto 1fr;
  }

  /* ── MAIN: single column, map fills space ── */
  .main-content {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    position: relative;
  }
  .map-container {
    grid-row: 1;
    grid-column: 1;
  }

  /* ── SIDEBAR TOGGLE: hidden on mobile ── */
  .sidebar-toggle {
    display: none;
  }

  /* ── SIDEBAR as BOTTOM SHEET ── */
  .sidebar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    height: auto;
    z-index: 800;
    border-right: none;
    border-top: 1px solid var(--border);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
    transform: translateY(0);
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    overflow: hidden;
  }
  .sidebar.dragging {
    transition: none;
  }

  /* ── DRAG HANDLE ── */
  .drag-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 4px;
    cursor: grab;
    touch-action: none;
    flex-shrink: 0;
  }
  .drag-handle-bar {
    width: 36px;
    height: 4px;
    background: var(--grey-mid);
    border-radius: 2px;
  }

  /* ── SHEET STATES (controlled via data-sheet attribute) ── */

  /* Peek: only drag handle + title + counter visible */
  .sidebar[data-sheet="peek"] {
    transform: translateY(calc(100% - 80px));
  }
  .sidebar[data-sheet="peek"] .filter-row,
  .sidebar[data-sheet="peek"] .onboarding-hint,
  .sidebar[data-sheet="peek"] .sidebar-views {
    opacity: 0;
    pointer-events: none;
  }

  /* Half: filters + card list */
  .sidebar[data-sheet="half"] {
    transform: translateY(55%);
  }

  /* Full: detail view, nearly fullscreen */
  .sidebar[data-sheet="full"] {
    transform: translateY(8%);
  }

  /* ── SIDEBAR HEADER adjustments ── */
  .sidebar-header {
    padding: 0.5rem 1rem 0.5rem;
  }

  /* ── SIDEBAR VIEWS: fill remaining space ── */
  .sidebar-views {
    height: calc(100vh - 36px);
    overflow: hidden;
  }
  .card-list-view,
  .detail-view {
    height: 100%;
  }

  /* ── FILTER CHIPS: larger touch targets ── */
  .chip {
    min-height: 44px;
    padding: 0.5rem 0.9rem;
    font-size: 0.72rem;
  }

  /* ── DETAIL BACK: larger tap area ── */
  .detail-back {
    min-height: 44px;
    padding: 1rem;
  }

  /* ── ZOOM CONTROLS: larger, left side ── */
  .leaflet-control-zoom a {
    width: 48px !important;
    height: 48px !important;
    line-height: 48px !important;
    font-size: 1.4rem !important;
  }

  /* ── WIFAM ECK ── */
  .wifam-eck {
    border-width: 0 0 80px 80px;
  }
}
```

- [ ] **Step 2: Verify mobile layout in DevTools**

Open `v6.html`, toggle Chrome DevTools to mobile view (e.g. iPhone 14, 390x844). Expect:
- Compact 36px header with small logo + badge
- No band visible
- Map takes full background
- Sidebar appears as bottom sheet (not yet interactive -- no JS yet)

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add mobile CSS with compact header and bottom sheet layout"
```

---

### Task 4: Extract JS into js/app.js (core logic from v5)

**Files:**
- Create: `js/app.js`
- Reference: `v5.html:642-928` (all `<script>` content)

- [ ] **Step 1: Create js/ directory and app.js with core logic**

Extract all JS from v5.html lines 642-928 into `js/app.js`, restructured into logical sections. Replace the mobile-unaware sidebar toggle and add a bottom sheet state system.

```javascript
/* ══════════════════════════════════════
   WIFAM v6 – App Logic
   ══════════════════════════════════════ */

// ── CONFIG ──
const CATS = {
  bauobjekte:    { label: "Bauobjekte",     color: "#691340", icon: "assets/icons/Bauobjekte_rund_RGB.svg",    emoji: "\u{1F3D7}\uFE0F" },
  baubetreuung:  { label: "Baubetreuung",   color: "#5B7BB3", icon: "assets/icons/Baubetreuung_rund_RGB.svg",  emoji: "\u{1F4CB}" },
  erschliessung: { label: "Erschlie\u00dfung", color: "#3D8B6E", icon: "assets/icons/Erschliessung_rund_RGB.svg", emoji: "\u{1F6E4}\uFE0F" },
  events:        { label: "Events",         color: "#eb7d27", icon: "assets/icons/Events_rund_RGB.svg",        emoji: "\u{1F389}" },
  ereignisse:    { label: "Ereignisse",     color: "#9B59B6", icon: "assets/icons/News_rund_RGB.svg",          emoji: "\u{2B50}" },
  projekte:      { label: "Projekte",       color: "#4a90a4", icon: "assets/icons/StartUps_rund_RGB.svg",      emoji: "\u{1F680}" }
};

const AMBERG = [49.4430, 11.8650];
const BOUNDS = L.latLngBounds(L.latLng(49.385, 11.815), L.latLng(49.475, 11.935));
const MOBILE_BP = 768;

// ── STATE ──
let markers = [];
let activeFilter = new Set(Object.keys(CATS));
let leafletMarkers = [];
let selectedStation = null;
let cardListScrollTop = 0;
let map;

// ── HELPERS ──
function isMobile() {
  return window.innerWidth < MOBILE_BP;
}

// ── INIT ──
async function init() {
  try {
    const resp = await fetch('data/markers.json');
    markers = await resp.json();
  } catch (e) {
    console.error('Failed to load markers:', e);
    return;
  }

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

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(map);

  map.zoomControl.setPosition(isMobile() ? 'bottomleft' : 'bottomright');

  const sidebar = document.getElementById('sidebar');
  L.DomEvent.disableScrollPropagation(sidebar);

  map.on('click', onMapClick);

  addMarkers();

  // Setup bottom sheet for mobile
  if (isMobile()) {
    initBottomSheet();
  }

  // Setup sidebar toggle for desktop
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    const main = document.getElementById('mainContent');
    main.classList.toggle('sidebar-hidden');
    setTimeout(() => { map.invalidateSize(); }, 400);
  });

  // Handle resize (e.g. rotate device)
  window.addEventListener('resize', onResize);
}

// ── FILTER CHIPS ──
function buildFilterChips() {
  const row = document.getElementById('filterRow');
  row.innerHTML = '';
  const counts = {};
  markers.filter(m => m.visible !== false).forEach(m => { counts[m.cat] = (counts[m.cat] || 0) + 1; });

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
        '<div class="card-title">' + (data.subtitle || data.title) + '</div>' +
        '<div class="card-subtitle">' + data.title + '</div>' +
      '</div>' +
      thumbHTML;

    card.addEventListener('click', () => selectStation(data));
    list.appendChild(card);
  });

  document.getElementById('counterNum').innerHTML = visible.length + ' <span style="color:var(--grey-text);font-weight:400">von ' + totalVisible + '</span>';
}

// ── MAP MARKERS ──
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
  leafletMarkers.forEach(m => map.removeLayer(m.layer));
  leafletMarkers = [];

  const visible = markers.filter(m => m.visible !== false && activeFilter.has(m.cat));

  visible.forEach(data => {
    const layer = L.marker([data.lat, data.lng], {
      icon: createIcon(data),
      riseOnHover: true
    }).addTo(map);

    layer.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      selectStation(data);
    });
    leafletMarkers.push({ layer, data });
  });
}

// ── SELECT / DESELECT STATION ──
function selectStation(data) {
  const cat = CATS[data.cat] || CATS.bauobjekte;
  selectedStation = data;

  cardListScrollTop = document.getElementById('cardList').scrollTop;

  // Hide onboarding hint
  const hint = document.getElementById('onboardingHint');
  if (hint && !hint.classList.contains('hidden')) hint.classList.add('hidden');

  // Desktop: open sidebar if hidden
  if (!isMobile()) {
    const main = document.getElementById('mainContent');
    if (main.classList.contains('sidebar-hidden')) {
      main.classList.remove('sidebar-hidden');
      setTimeout(() => { map.invalidateSize(); }, 400);
    }
  }

  // Highlight card
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

  // Populate detail view
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
  document.getElementById('detailView').scrollTop = 0;

  // Mobile: sheet to full
  if (isMobile()) {
    setSheetState('full');
  }

  // Fly to station
  map.flyTo([data.lat, data.lng], Math.max(map.getZoom(), 16), { duration: 1.2, easeLinearity: 0.25 });
}

function deselectStation() {
  if (!selectedStation) return;
  selectedStation = null;

  document.getElementById('sidebar').classList.remove('show-detail');
  document.querySelectorAll('.pin-wrap').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.station-card').forEach(c => c.classList.remove('active'));

  setTimeout(() => {
    document.getElementById('cardList').scrollTop = cardListScrollTop;
  }, 50);

  map.flyTo(AMBERG, 14, { duration: 0.8 });
}

function onMapClick() {
  if (selectedStation) {
    deselectStation();
  }
  // Mobile: minimize to peek
  if (isMobile()) {
    setSheetState('peek');
  }
}

document.getElementById('detailBack').addEventListener('click', () => {
  deselectStation();
  // Mobile: go back to half (list view)
  if (isMobile()) {
    setSheetState('half');
  }
});

// ── BOTTOM SHEET (Mobile) ──
// Sheet states: 'peek' (80px), 'half' (45%), 'full' (92%)
let sheetState = 'half';
const SHEET_STATES = ['peek', 'half', 'full'];
// translateY percentages for each state (of sidebar height)
// peek: show 80px from bottom, half: show 45%, full: show 92%
const SHEET_POSITIONS = {
  peek: null,  // calculated dynamically based on sidebar height
  half: 55,    // translateY(55%) -> top 45% visible
  full: 8      // translateY(8%) -> top 92% visible
};

function getSheetTranslateY(state) {
  if (state === 'peek') {
    // Show exactly 80px from the bottom of the sidebar
    const sidebar = document.getElementById('sidebar');
    const sidebarHeight = sidebar.offsetHeight || window.innerHeight;
    const peekPx = 80;
    const peekPercent = ((sidebarHeight - peekPx) / sidebarHeight) * 100;
    return peekPercent;
  }
  return SHEET_POSITIONS[state];
}

function setSheetState(state) {
  sheetState = state;
  const sidebar = document.getElementById('sidebar');
  sidebar.dataset.sheet = state;
  const translateY = getSheetTranslateY(state);
  sidebar.style.transform = 'translateY(' + translateY + '%)';
  // Let map know about layout change
  setTimeout(() => { map.invalidateSize(); }, 400);
}

function initBottomSheet() {
  const sidebar = document.getElementById('sidebar');
  const handle = document.getElementById('dragHandle');

  // Set initial state
  setSheetState('half');

  let startY = 0;
  let startTranslateY = 0;
  let isDragging = false;

  function getCurrentTranslateY() {
    const transform = sidebar.style.transform;
    const match = transform.match(/translateY\(([^)]+)%\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  function onTouchStart(e) {
    // Only drag from handle area or top of sidebar
    startY = e.touches[0].clientY;
    startTranslateY = getCurrentTranslateY();
    isDragging = true;
    sidebar.classList.add('dragging');
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    const sidebarHeight = sidebar.offsetHeight || window.innerHeight;
    const deltaPercent = (deltaY / sidebarHeight) * 100;
    const newTranslateY = Math.max(0, Math.min(95, startTranslateY + deltaPercent));

    sidebar.style.transform = 'translateY(' + newTranslateY + '%)';
  }

  function onTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    sidebar.classList.remove('dragging');

    const currentTranslateY = getCurrentTranslateY();

    // Find closest snap point
    let closestState = 'half';
    let closestDist = Infinity;

    SHEET_STATES.forEach(state => {
      const stateY = getSheetTranslateY(state);
      const dist = Math.abs(currentTranslateY - stateY);
      if (dist < closestDist) {
        closestDist = dist;
        closestState = state;
      }
    });

    // Check velocity / threshold: if dragged >30% toward next state, snap there
    const dragDelta = currentTranslateY - startTranslateY;
    const currentIdx = SHEET_STATES.indexOf(sheetState);

    if (dragDelta > 15 && currentIdx < SHEET_STATES.length - 1) {
      // Dragged down significantly -> go to smaller state (higher translateY = more hidden)
      // Wait -- down means higher translateY means more hidden = peek direction
      closestState = SHEET_STATES[Math.min(currentIdx + 1, SHEET_STATES.length - 1)];
      // Actually: peek has highest translateY, full has lowest
      // Dragging DOWN = increasing translateY = toward peek
      closestState = SHEET_STATES[Math.max(currentIdx - 1, 0)];
      // Let me reconsider: SHEET_STATES = ['peek','half','full']
      // peek translateY ~= 85%, half = 55%, full = 8%
      // Dragging down (positive deltaY) increases translateY -> toward peek
      // So dragging down from 'half' should go to 'peek'
      // peek is index 0, half is 1, full is 2
      // Higher translateY = more hidden = peek (index 0)
      closestState = SHEET_STATES[Math.max(currentIdx - 1, 0)];
    } else if (dragDelta < -15 && currentIdx > 0) {
      // Dragged up = decreasing translateY = toward full
      closestState = SHEET_STATES[Math.min(currentIdx + 1, SHEET_STATES.length - 1)];
    }

    setSheetState(closestState);
  }

  handle.addEventListener('touchstart', onTouchStart, { passive: true });
  handle.addEventListener('touchmove', onTouchMove, { passive: false });
  handle.addEventListener('touchend', onTouchEnd, { passive: true });

  // Also allow drag from sidebar header
  const header = document.querySelector('.sidebar-header');
  header.addEventListener('touchstart', onTouchStart, { passive: true });
  header.addEventListener('touchmove', onTouchMove, { passive: false });
  header.addEventListener('touchend', onTouchEnd, { passive: true });
}

// ── RESIZE HANDLER ──
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
```

- [ ] **Step 2: Verify v6 works on desktop**

Open `v6.html` in desktop browser. Check:
- Map loads with markers
- Filter chips work
- Click station -> detail view opens in sidebar
- Sidebar toggle works
- Back button works

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: extract JS into app.js with bottom sheet touch handler"
```

---

### Task 5: Fix bottom sheet drag logic

**Files:**
- Modify: `js/app.js` (bottom sheet touch handler)

The drag direction logic in Task 4 has a subtle issue: the snap direction calculation is confusing because peek has the highest translateY but is index 0 in SHEET_STATES. Let's simplify by reordering the states array by translateY value.

- [ ] **Step 1: Replace the snap logic in onTouchEnd**

In `js/app.js`, replace the `onTouchEnd` function:

```javascript
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
      // Significant drag: snap in drag direction
      if (dragDelta > 0) {
        // Dragged down -> next higher translateY state (toward peek)
        targetState = statesOrdered[Math.min(currentIdx + 1, statesOrdered.length - 1)];
      } else {
        // Dragged up -> next lower translateY state (toward full)
        targetState = statesOrdered[Math.max(currentIdx - 1, 0)];
      }
    } else {
      // Small drag: snap to closest state
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
```

- [ ] **Step 2: Test on mobile (DevTools or real device)**

In Chrome DevTools mobile view:
1. Drag handle down -> sheet moves to peek (only 80px visible)
2. Drag handle up from peek -> sheet moves to half
3. Drag handle up from half -> sheet moves to full
4. Tap a marker -> sheet goes to full with detail
5. Tap "Alle Stationen" -> sheet goes to half
6. Tap map background -> sheet goes to peek

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "fix: simplify bottom sheet snap direction logic"
```

---

### Task 6: Handle scroll vs. drag conflict in card list

**Files:**
- Modify: `js/app.js` (initBottomSheet function)

When the card list is scrollable in half state, we need to distinguish between: "user wants to scroll the list" vs "user wants to drag the sheet down". Rule: if the list is scrolled to top and user swipes down, drag the sheet. Otherwise, let the list scroll.

- [ ] **Step 1: Add scroll-aware drag logic to initBottomSheet**

In `js/app.js`, replace the `onTouchStart` function inside `initBottomSheet` and add scroll detection:

```javascript
  // Reference to the scrollable content area
  const cardList = document.getElementById('cardList');
  const detailViewEl = document.getElementById('detailView');

  function getScrollableEl() {
    return sidebar.classList.contains('show-detail') ? detailViewEl : cardList;
  }

  function onTouchStart(e) {
    const target = e.target;
    const isHandle = handle.contains(target);
    const isHeader = document.querySelector('.sidebar-header').contains(target);
    const scrollable = getScrollableEl();
    const isInScrollArea = scrollable.contains(target);

    // Always allow drag from handle/header
    if (isHandle || isHeader) {
      startY = e.touches[0].clientY;
      startTranslateY = getCurrentTranslateY();
      isDragging = true;
      sidebar.classList.add('dragging');
      return;
    }

    // In scroll area: only start drag if scrolled to top and swiping down
    if (isInScrollArea) {
      startY = e.touches[0].clientY;
      startTranslateY = getCurrentTranslateY();
      // Don't set isDragging yet -- wait for touchmove to decide
      isDragging = false;
    }
  }

  let scrollDragPending = false;

  function onTouchMove(e) {
    // If dragging from handle/header, proceed as normal
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

    // Swiping down and list is at top -> start sheet drag
    if (deltaY > 8 && scrollable.scrollTop <= 0) {
      isDragging = true;
      sidebar.classList.add('dragging');
      startTranslateY = getCurrentTranslateY();
      startY = currentY;
      e.preventDefault();
    }
  }
```

Also update the event listeners at the bottom of `initBottomSheet` -- remove the separate header listeners and instead listen on the whole sidebar:

```javascript
  // Listen on entire sidebar for touch events
  sidebar.addEventListener('touchstart', onTouchStart, { passive: true });
  sidebar.addEventListener('touchmove', onTouchMove, { passive: false });
  sidebar.addEventListener('touchend', onTouchEnd, { passive: true });
```

Remove the old handle-only and header-only listeners.

- [ ] **Step 2: Test scroll vs. drag behavior**

In mobile DevTools:
1. Half state: scroll card list up/down -> list scrolls, sheet stays
2. Half state: scroll list to top, then swipe down -> sheet goes to peek
3. Full state (detail): scroll detail text -> content scrolls
4. Full state: scroll to top of detail, swipe down -> sheet goes to half
5. Drag handle always drags the sheet regardless of scroll position

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: scroll-aware drag - list scrolls internally, sheet drags from top"
```

---

### Task 7: Final polish and verification

**Files:**
- Modify: `css/style.css` (minor adjustments)
- Modify: `js/app.js` (minor adjustments)

- [ ] **Step 1: Add safe area padding for notched phones**

At the top of the mobile media query in `css/style.css`, add:

```css
  /* ── SAFE AREA for notched devices ── */
  .sidebar[data-sheet="full"] {
    padding-top: env(safe-area-inset-top, 0);
  }
```

- [ ] **Step 2: Ensure attribution is minimal on mobile**

Add to mobile media query in `css/style.css`:

```css
  .leaflet-control-attribution {
    font-size: 0 !important;
    padding: 2px 4px !important;
    max-width: 30px;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0.5;
    transition: all 0.2s;
  }
  .leaflet-control-attribution:active {
    font-size: 0.5rem !important;
    max-width: 300px;
    opacity: 1;
  }
```

- [ ] **Step 3: Test complete flow on mobile DevTools**

Full test in Chrome DevTools (iPhone 14 / Pixel 7):
1. Page loads -> compact header (36px), no band, map fills screen, sheet at half
2. Filter chips are at least 44px tall, easy to tap
3. Tap a chip -> filters update, card list updates
4. Drag sheet to peek -> only handle + title visible, map ~85% of screen
5. Drag sheet to half -> list visible
6. Tap a station card -> sheet goes to full, detail shows, map flies to marker
7. Scroll detail text -> scrolls internally
8. Tap "Alle Stationen" -> back to half, map flies to overview
9. Tap map background -> sheet to peek
10. Tap a marker on map -> sheet to full with that station's detail
11. Zoom buttons are 48px, positioned bottom-left

- [ ] **Step 4: Test on desktop**

Open `v6.html` at >768px width:
1. Layout identical to v5: sidebar left, map right
2. No drag handle visible
3. Toggle sidebar works
4. All station interactions work as before

- [ ] **Step 5: Commit**

```bash
git add css/style.css js/app.js
git commit -m "feat: mobile polish - safe areas, attribution, touch targets"
```

---

### Task 8: Push to GitHub Pages

**Files:**
- No new files

- [ ] **Step 1: Verify both files exist**

```bash
ls -la v5.html v6.html css/style.css js/app.js
```

All four files must exist.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

- [ ] **Step 3: Verify both URLs are live**

Wait ~1 minute for GitHub Pages deployment, then verify:
- `https://sfleischmann-3steps2.github.io/WIFAM/v5.html` -- unchanged, works
- `https://sfleischmann-3steps2.github.io/WIFAM/v6.html` -- new mobile-optimized version

- [ ] **Step 4: Test v6 on actual phone**

Open v6 URL on a real phone. Check the 3-stage bottom sheet, compact header, and touch interactions.
