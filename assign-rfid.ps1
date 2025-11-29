# PowerShell script to assign RFID card to a student
# Usage: .\assign-rfid.ps1 -StudentEmail "student@email.com" -RfidCard "326E2AB"
#    OR: .\assign-rfid.ps1 -StudentId "SNPA-2024-001" -RfidCard "326E2AB"

param(
    [string]$StudentEmail = "",
    [string]$StudentId = "",
    [string]$RfidCard = "326E2AB"
)

$serverURL = "https://migrate-eight.vercel.app/api/students/update-rfid"

if ([string]::IsNullOrEmpty($StudentEmail) -and [string]::IsNullOrEmpty($StudentId)) {
    Write-Host "ERROR: You must provide either -StudentEmail or -StudentId" -ForegroundColor Red
    Write-Host ""
    Write-Host "Usage examples:" -ForegroundColor Yellow
    Write-Host "  .\assign-rfid.ps1 -StudentEmail `"rovicdg18@gmail.com`" -RfidCard `"326E2AB`""
    Write-Host "  .\assign-rfid.ps1 -StudentId `"SNPA-2024-001`" -RfidCard `"326E2AB`""
    exit 1
}

# Build request body
$body = @{
    rfidCard = $RfidCard
}

if (-not [string]::IsNullOrEmpty($StudentEmail)) {
    $body.email = $StudentEmail
    Write-Host "Assigning RFID $RfidCard to student with email: $StudentEmail" -ForegroundColor Cyan
} else {
    $body.studentId = $StudentId
    Write-Host "Assigning RFID $RfidCard to student with ID: $StudentId" -ForegroundColor Cyan
}

$jsonBody = $body | ConvertTo-Json

Write-Host "Sending request to: $serverURL" -ForegroundColor Cyan
Write-Host "Request body: $jsonBody" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri $serverURL -Method POST -Body $jsonBody -ContentType "application/json" -ErrorAction Stop
    
    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host ""
        Write-Host "SUCCESS! RFID card assigned!" -ForegroundColor Green
        Write-Host "Student: $($result.student.first_name) $($result.student.last_name)" -ForegroundColor Green
        Write-Host "Email: $($result.student.email)" -ForegroundColor Green
        Write-Host "RFID: $RfidCard" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now scan this RFID card and it should work!" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "ERROR: $($result.error)" -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        $errorJson = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "Server error: $($errorJson.error)" -ForegroundColor Red
    }
}

