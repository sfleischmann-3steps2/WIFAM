#!/bin/bash
# WIFAM Jubiläumskarte – Offline-Starter (macOS)
cd "$(dirname "$0")"
echo "Starte WIFAM Karte..."
echo "Browser öffnet sich gleich automatisch."
echo ""
echo "Zum Beenden: dieses Fenster schließen oder Ctrl+C drücken."
echo ""
open "http://localhost:8080/v6-offline.html"
python3 -m http.server 8080
