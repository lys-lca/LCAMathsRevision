@echo off
setlocal
cd /d "%~dp0"

set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if exist "%CODEX_NODE%" (
  "%CODEX_NODE%" tools\update-data-bundle.js
  pause
  exit /b
)

where node >nul 2>nul
if %errorlevel%==0 (
  node tools\update-data-bundle.js
  pause
  exit /b
)

echo Could not find Node.js to update the file-open data bundle.
echo.
echo The web server version will still read the JSON files directly.
echo.
pause
