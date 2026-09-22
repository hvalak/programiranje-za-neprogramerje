@echo off
chcp 65001 >nul
title Namestitev - Programiranje za neprogramerje
cd /d "%~dp0"

echo.
echo ================================================================
echo   NAMESTITEV
echo ================================================================
echo.

echo [1/3] Preverjam Python ...
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo   NAPAKA: Python ni najden.
    echo   Namesti ga z https://www.python.org/downloads/
    echo   Pri namestitvi obvezno obkljukaj "Add Python to PATH".
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('python --version') do echo       OK - %%v

echo.
echo [2/3] Pripravljam mape ...
if not exist "assets\bin" mkdir "assets\bin"
echo       OK

echo.
echo [3/3] Prenasam cloudflared (za javni naslov) ...
if exist "assets\bin\cloudflared.exe" (
    echo       Ze namescen - preskakujem.
) else (
    curl -L --fail --silent --show-error -o "assets\bin\cloudflared.exe" "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
    if errorlevel 1 (
        echo.
        echo       OPOZORILO: prenos ni uspel ^(ni interneta ali je blokiran^).
        echo       Lokalni prikaz bo deloval, javni naslov pa ne.
        if exist "assets\bin\cloudflared.exe" del "assets\bin\cloudflared.exe"
    ) else (
        echo       OK
    )
)

echo.
echo ================================================================
echo   KONCANO
echo.
echo   Za pregled na svojem racunalniku:  zazeni-lokalno.bat
echo   Za prikaz drugim prek spleta:      zazeni-javno.bat
echo ================================================================
echo.
pause
