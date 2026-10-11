@echo off
title ApnaWeb Lead Platform (Port 3000)
cd /d "%~dp0"

echo ===================================================
echo   Starting ApnaWeb Platform on Port 3000...
echo ===================================================
echo.
echo URL: http://localhost:3000/
echo.

node server.js
pause
