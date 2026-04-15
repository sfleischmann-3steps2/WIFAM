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

  // CartoDB Positron - clean, reduced, editorial style
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
    subdomains: 'abcd'
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
