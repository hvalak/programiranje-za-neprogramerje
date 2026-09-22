@echo off
chcp 65001 >nul
title Izvoz v PDF - Programiranje za neprogramerje
cd /d "%~dp0"

if not exist "tools\pdf.py" (
    echo.
    echo   Izvoz v PDF se ni pripravljen ^(mejnik M5^).
    echo   Gradivo mora biti najprej dokoncano.
    echo.
    pause
    exit /b 1
)

python "tools\pdf.py"
pause
