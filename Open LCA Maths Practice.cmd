@echo off
setlocal
cd /d "%~dp0"

set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if exist "%CODEX_NODE%" (
  start "" http://127.0.0.1:4173/
  "%CODEX_NODE%" server.js
  exit /b
)

where node >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:4173/
  node server.js
  exit /b
)

where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:4173/
  py -3 -m http.server 4173 --bind 127.0.0.1
  exit /b
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://127.0.0.1:4173/
  python -m http.server 4173 --bind 127.0.0.1
  exit /b
)

echo Could not find Node.js or Python to run the local preview.
echo.
echo Open this folder in Codex and ask it to start the local preview,
echo or install Node.js from https://nodejs.org/
echo.
pause
