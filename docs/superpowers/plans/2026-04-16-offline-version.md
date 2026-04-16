# WIFAM Offline-Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a fully offline-capable version of the WIFAM Jubiläumskarte that runs from a USB stick without internet.

**Architecture:** Copy the existing v6 app into an `offline/` directory, bundle all external dependencies locally (Leaflet, MarkerCluster, Montserrat font, map tiles), embed markers.json data directly into the JS to avoid `fetch()` CORS issues with `file://`, and pre-download CartoDB Positron tiles for the Amberg area (zoom 13-18).

**Tech Stack:** Same vanilla HTML/CSS/JS stack, Leaflet 1.9.4, MarkerCluster 1.5.3, Montserrat font (WOFF2), pre-rendered PNG map tiles.

---

### Task 1: Download external JS/CSS/Font dependencies

**Files:**
- Create: `offline/lib/leaflet.min.js`
- Create: `offline/lib/leaflet.min.css`
- Create: `offline/lib/leaflet.markercluster.js`
- Create: `offline/lib/MarkerCluster.css`
- Create: `offline/lib/MarkerCluster.Default.css`
- Create: `offline/lib/images/` (Leaflet marker images referenced by leaflet.css)
- Create: `offline/lib/montserrat.css` (local @font-face declarations)
- Create: `offline/lib/fonts/` (Montserrat WOFF2 files)

- [ ] **Step 1: Create offline directory structure**

```bash
mkdir -p offline/lib/images offline/lib/fonts
```

- [ ] **Step 2: Download Leaflet 1.9.4 JS + CSS + marker images**

```bash
cd offline/lib
curl -L -o leaflet.min.js "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
curl -L -o leaflet.min.css "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
# Leaflet CSS references images/ subdirectory
curl -L -o images/marker-icon.png "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png"
curl -L -o images/marker-icon-2x.png "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png"
curl -L -o images/marker-shadow.png "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
curl -L -o images/layers.png "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers.png"
curl -L -o images/layers-2x.png "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers-2x.png"
```

- [ ] **Step 3: Download MarkerCluster plugin**

```bash
cd offline/lib
curl -L -o leaflet.markercluster.js "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"
curl -L -o MarkerCluster.css "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"
curl -L -o MarkerCluster.Default.css "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"
```

- [ ] **Step 4: Download Montserrat font (weights 400,500,600,700,800) as WOFF2**

Download the 5 weight variants from Google Fonts and create a local `montserrat.css` with `@font-face` declarations pointing to `fonts/` subdirectory.

```bash
cd offline/lib
# Download WOFF2 files from Google Fonts CDN
curl -L -o fonts/montserrat-400.woff2 "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2"
curl -L -o fonts/montserrat-500.woff2 "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXo.woff2"
curl -L -o fonts/montserrat-600.woff2 "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu16Hw5aXo.woff2"
curl -L -o fonts/montserrat-700.woff2 "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM6Hw5aXo.woff2"
curl -L -o fonts/montserrat-800.woff2 "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvk6Hw5aXo.woff2"
```

Create `montserrat.css`:
```css
@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 400; font-display: swap; src: url('fonts/montserrat-400.woff2') format('woff2'); }
@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 500; font-display: swap; src: url('fonts/montserrat-500.woff2') format('woff2'); }
@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 600; font-display: swap; src: url('fonts/montserrat-600.woff2') format('woff2'); }
@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 700; font-display: swap; src: url('fonts/montserrat-700.woff2') format('woff2'); }
@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 800; font-display: swap; src: url('fonts/montserrat-800.woff2') format('woff2'); }
```

- [ ] **Step 5: Commit**

```bash
git add offline/lib/
git commit -m "feat(offline): add local Leaflet, MarkerCluster, Montserrat font"
```

---

### Task 2: Download map tiles for Amberg area

**Files:**
- Create: `offline/tiles/{z}/{x}/{y}.png` (CartoDB Positron tiles, zoom 13-18)
- Create: `scripts/download_tiles.py` (tile download script)

The BOUNDS are SW(49.385, 11.815) to NE(49.475, 11.935). We need tiles for zoom levels 13-18.

- [ ] **Step 1: Create tile download script**

Create `scripts/download_tiles.py`:
```python
#!/usr/bin/env python3
"""Download CartoDB Positron tiles for Amberg area (offline use)."""
import os, math, time, urllib.request

LAT_MIN, LAT_MAX = 49.385, 49.475
LNG_MIN, LNG_MAX = 11.815, 11.935
ZOOM_MIN, ZOOM_MAX = 13, 18
TILE_URL = "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "offline", "tiles")

def deg2tile(lat, lng, zoom):
    lat_rad = math.radians(lat)
    n = 2 ** zoom
    x = int((lng + 180) / 360 * n)
    y = int((1 - math.asinh(math.tan(lat_rad)) / math.pi) / 2 * n)
    return x, y

total = 0
for z in range(ZOOM_MIN, ZOOM_MAX + 1):
    x_min, y_max = deg2tile(LAT_MIN, LNG_MIN, z)
    x_max, y_min = deg2tile(LAT_MAX, LNG_MAX, z)
    for x in range(x_min, x_max + 1):
        for y in range(y_min, y_max + 1):
            total += 1

print(f"Downloading {total} tiles (zoom {ZOOM_MIN}-{ZOOM_MAX})...")
count = 0
for z in range(ZOOM_MIN, ZOOM_MAX + 1):
    x_min, y_max = deg2tile(LAT_MIN, LNG_MIN, z)
    x_max, y_min = deg2tile(LAT_MAX, LNG_MAX, z)
    for x in range(x_min, x_max + 1):
        for y in range(y_min, y_max + 1):
            path = os.path.join(OUT_DIR, str(z), str(x))
            os.makedirs(path, exist_ok=True)
            fpath = os.path.join(path, f"{y}.png")
            if not os.path.exists(fpath):
                url = TILE_URL.replace("{z}", str(z)).replace("{x}", str(x)).replace("{y}", str(y))
                urllib.request.urlretrieve(url, fpath)
                time.sleep(0.05)  # Be nice to the tile server
            count += 1
            if count % 100 == 0:
                print(f"  {count}/{total}...")

print(f"Done! {count} tiles saved to {OUT_DIR}")
```

- [ ] **Step 2: Run the tile download script**

```bash
python3 scripts/download_tiles.py
```

Expected: ~2000-4000 tiles downloaded to `offline/tiles/`, ~30-50 MB total.

- [ ] **Step 3: Verify tiles exist**

```bash
find offline/tiles -name "*.png" | wc -l
du -sh offline/tiles
```

- [ ] **Step 4: Commit**

```bash
git add scripts/download_tiles.py
# Don't commit tiles to git (too large) - add to .gitignore
echo "offline/tiles/" >> .gitignore
git add .gitignore
git commit -m "feat(offline): add tile download script, ignore tiles in git"
```

---

### Task 3: Create offline HTML + JS with embedded data and local paths

**Files:**
- Create: `offline/v6-offline.html` (copy of v6.html with local paths)
- Create: `offline/js/app-offline.js` (copy of app.js with embedded markers + local tile path)
- Copy: `offline/css/style.css` (unchanged copy)
- Copy: `offline/assets/` (symlink or copy of images + icons)

- [ ] **Step 1: Copy static assets**

```bash
cp -r css offline/css
cp -r assets offline/assets
cp -r data offline/data  # keep as backup
```

- [ ] **Step 2: Create offline HTML**

Copy `v6.html` to `offline/v6-offline.html` with these changes in `<head>`:
```html
<!-- Replace CDN links with local -->
<link rel="stylesheet" href="lib/leaflet.min.css" />
<link rel="stylesheet" href="lib/MarkerCluster.css" />
<link rel="stylesheet" href="lib/MarkerCluster.Default.css" />
<script src="lib/leaflet.min.js"></script>
<script src="lib/leaflet.markercluster.js"></script>
<link rel="stylesheet" href="lib/montserrat.css" />
<!-- Local CSS -->
<link rel="stylesheet" href="css/style.css" />
```

And change the script tag at the bottom:
```html
<script src="js/app-offline.js"></script>
```

- [ ] **Step 3: Create offline JS**

Copy `js/app.js` to `offline/js/app-offline.js` with two changes:

**Change 1** — Replace the `fetch()` call (lines 30-37) with embedded data:
```javascript
// ── INIT ──
async function init() {
  markers = MARKERS_DATA;

  buildFilterChips();
  // ... rest unchanged
```

And add at the top of the file, after the CATS config:
```javascript
const MARKERS_DATA = [ /* full contents of markers.json pasted here */ ];
```

**Change 2** — Replace the tile URL (line 54) with local tile path:
```javascript
L.tileLayer('tiles/{z}/{x}/{y}.png', {
    attribution: '&copy; OSM &copy; CARTO (offline)',
    maxZoom: 18
}).addTo(map);
```

Remove `subdomains: 'abcd'` since local tiles don't use subdomains.

- [ ] **Step 4: Commit**

```bash
git add offline/v6-offline.html offline/js/ offline/css/ offline/assets/
git commit -m "feat(offline): create offline version with embedded data + local tiles"
```

---

### Task 4: Test offline version

- [ ] **Step 1: Test in browser via file://**

```bash
open offline/v6-offline.html
```

Verify:
- Map tiles render for Amberg area
- All markers appear
- Filter chips work
- Detail view opens when clicking a station
- Images load correctly
- Font (Montserrat) renders correctly

- [ ] **Step 2: Test without internet**

Disable WiFi/network and reload the page. Everything should still work.

- [ ] **Step 3: Check total size**

```bash
du -sh offline/
```

Expected: ~50-70 MB total (tiles ~30-50 MB + images ~13 MB + libs ~1 MB).

- [ ] **Step 4: Final commit if any fixes were needed**

---

### Task 5: Create USB-ready ZIP

- [ ] **Step 1: Create a zip for the USB stick**

```bash
cd /path/to/WIFAM
zip -r WIFAM-offline.zip offline/
```

- [ ] **Step 2: Verify zip**

```bash
ls -lh WIFAM-offline.zip
```

The customer unzips this on a USB stick and opens `offline/v6-offline.html` in any browser.
