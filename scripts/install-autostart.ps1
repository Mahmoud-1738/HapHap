param(
  [string]$AppUrl = "http://localhost/web/HapHap/dist/",
  [int]$DelaySeconds = 20
)

$ErrorActionPreference = "Stop"

$startupDir = [Environment]::GetFolderPath("Startup")
$startupEntryName = "HapHap-Kiosk-Autostart.cmd"
$startupEntryPath = Join-Path $startupDir $startupEntryName
$launcherPath = Join-Path $PSScriptRoot "start-kiosk.cmd"

if (-not (Test-Path $launcherPath)) {
  Write-Error "Launcher not found at $launcherPath"
  exit 1
}

$startupContent = @"
@echo off
call "$launcherPath" "$AppUrl" "$DelaySeconds"
exit /b %errorlevel%
"@

try {
  Set-Content -Path $startupEntryPath -Value $startupContent -Encoding Ascii
  Write-Host "Autostart installed for current user."
  Write-Host "Startup entry: $startupEntryPath"
  Write-Host "URL: $AppUrl"
  Write-Host "Boot delay: $DelaySeconds seconds"
} catch {
  Write-Error "Failed to create startup entry at $startupEntryPath. $($_.Exception.Message)"
  exit 1
}
