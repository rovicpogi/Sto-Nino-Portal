# PowerShell script to update student RFID card
# Usage: .\update-rfid.ps1 -Email "Rovicdg18@gmail.com" -RfidCard "326e2ab"

param(
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [Parameter(Mandatory=$true)]
    [string]$RfidCard
)

$body = @{
    email = $Email
    rfidCard = $RfidCard
} | ConvertTo-Json

# Use your Vercel deployment URL or localhost for development
$url = "https://migrate-eight.vercel.app/api/students/update-rfid"
# For local development, use: $url = "http://localhost:3000/api/students/update-rfid"

try {
    Write-Host "Updating RFID card for $Email..." -ForegroundColor Yellow
    
    $response = Invoke-WebRequest -Uri $url -Method POST -Body $body -ContentType "application/json"
    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host "✓ RFID card updated successfully!" -ForegroundColor Green
        Write-Host "Student: $($result.student.name)" -ForegroundColor Cyan
        Write-Host "RFID Card: $RfidCard" -ForegroundColor Cyan
    } else {
        Write-Host "✗ Error: $($result.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error updating RFID card: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

