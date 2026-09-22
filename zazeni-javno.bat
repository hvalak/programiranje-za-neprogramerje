@echo off
chcp 65001 >nul
title Javni prikaz - Programiranje za neprogramerje
cd /d "%~dp0"

python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo   Python ni najden. Najprej pozeni namesti.bat
    echo.
    pause
    exit /b 1
)

if not exist "assets\bin\cloudflared.exe" (
    echo.
    echo   Manjka cloudflared.exe - najprej pozeni namesti.bat
    echo   ^(za pregled brez spleta uporabi zazeni-lokalno.bat^)
    echo.
    pause
    exit /b 1
)

echo.
echo   OPOZORILO: stran bo javno dostopna vsakomur, ki dobi naslov.
echo   Naslov deluje samo, dokler je to okno odprto.
echo.

python "tools\tunnel.py"
pause
