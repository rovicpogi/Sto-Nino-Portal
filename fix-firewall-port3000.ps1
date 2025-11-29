# PowerShell script to allow port 3000 in Windows Firewall
# Run this as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Windows Firewall - Allow Port 3000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  This script needs to run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host "Adding firewall rule for port 3000..." -ForegroundColor Green

# Remove existing rule if it exists
netsh advfirewall firewall delete rule name="Node.js Server Port 3000" 2>$null

# Add new rule
netsh advfirewall firewall add rule name="Node.js Server Port 3000" dir=in action=allow protocol=TCP localport=3000

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Firewall rule added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Port 3000 is now allowed for incoming connections." -ForegroundColor Cyan
    Write-Host "Your ESP32 should now be able to connect." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Failed to add firewall rule." -ForegroundColor Red
    Write-Host "Try running this script as Administrator." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

