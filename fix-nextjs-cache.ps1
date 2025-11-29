# Quick Fix for Next.js Build Cache Error
Write-Host "Fixing Next.js cache issues..." -ForegroundColor Yellow

# Stop any running Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Cyan
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Remove .next folder
Write-Host "Removing .next folder..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✓ .next folder removed" -ForegroundColor Green
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Cyan
npm cache clean --force 2>&1 | Out-Null
Write-Host "✓ Cache cleared" -ForegroundColor Green

Write-Host "" -ForegroundColor Green
Write-Host "✓ Fix complete! Now run: npm run dev" -ForegroundColor Green
