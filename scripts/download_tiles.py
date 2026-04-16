#!/usr/bin/env python3
"""Download CartoDB Positron tiles for Amberg area (offline use)."""
import os, math, time, urllib.request, urllib.error

LAT_MIN, LAT_MAX = 49.385, 49.475
LNG_MIN, LNG_MAX = 11.815, 11.935
ZOOM_MIN, ZOOM_MAX = 13, 18
TILE_URL = "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "offline", "tiles")

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
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; tile-downloader/1.0)"})
                for attempt in range(5):
                    try:
                        with urllib.request.urlopen(req, timeout=15) as resp:
                            with open(fpath, "wb") as f:
                                f.write(resp.read())
                        break
                    except (urllib.error.URLError, ConnectionResetError, OSError) as e:
                        wait = 2 ** attempt
                        print(f"  Retry {attempt+1}/5 for {z}/{x}/{y} ({e}) — waiting {wait}s...")
                        time.sleep(wait)
                else:
                    print(f"  FAILED: {z}/{x}/{y} — skipping")
                time.sleep(0.1)
            count += 1
            if count % 100 == 0:
                print(f"  {count}/{total}...")

print(f"Done! {count} tiles saved to {OUT_DIR}")
