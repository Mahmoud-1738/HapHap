$startupDir = [Environment]::GetFolderPath("Startup")
$startupEntryName = "HapHap-Kiosk-Autostart.cmd"
$startupEntryPath = Join-Path $startupDir $startupEntryName

if (Test-Path $startupEntryPath) {
  Remove-Item $startupEntryPath -Force
  Write-Host "Autostart removed: $startupEntryPath"
  exit 0
}

Write-Host "No autostart entry found at: $startupEntryPath"
