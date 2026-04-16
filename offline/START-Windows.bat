@echo off
title WIFAM Jubilaeumskarte
cd /d "%~dp0"
echo Starte WIFAM Karte...
echo Browser oeffnet sich gleich automatisch.
echo.
echo Zum Beenden: dieses Fenster schliessen.
echo.
start http://localhost:8080/v6-offline.html
python -m http.server 8080
