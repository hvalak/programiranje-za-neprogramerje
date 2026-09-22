@echo off
chcp 65001 >nul
title Lokalni prikaz - Programiranje za neprogramerje
cd /d "%~dp0"

python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo   Python ni najden. Najprej pozeni namesti.bat
    echo.
    pause
    exit /b 1
)

python "tools\server.py"
pause
