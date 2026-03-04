@echo off
setlocal

set "APP_URL=http://localhost/web/HapHap/dist/"
set "BOOT_DELAY_SECONDS=20"
set "EDGE_EXE="

if not "%~1"=="" set "APP_URL=%~1"
if not "%~2"=="" set "BOOT_DELAY_SECONDS=%~2"

if %BOOT_DELAY_SECONDS% GTR 0 (
  timeout /t %BOOT_DELAY_SECONDS% /nobreak >nul
)

for %%P in (
  "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
  "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) do (
  if exist "%%~P" (
    set "EDGE_EXE=%%~P"
  )
)

if not defined EDGE_EXE (
  for /f "delims=" %%P in ('where msedge 2^>nul') do (
    if not defined EDGE_EXE (
      set "EDGE_EXE=%%~P"
    )
  )
)

if not defined EDGE_EXE (
  echo Microsoft Edge could not be found. Install Edge or update scripts\start-kiosk.cmd.
  exit /b 1
)

start "" "%EDGE_EXE%" --kiosk "%APP_URL%" --edge-kiosk-type=fullscreen --kiosk-printing --no-first-run
exit /b 0
