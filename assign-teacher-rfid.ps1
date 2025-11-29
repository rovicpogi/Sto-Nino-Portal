# PowerShell script to assign RFID card to teacher named "rovic"
# Usage: .\assign-teacher-rfid.ps1

$teacherName = "rovic"
$rfidCard = "73FCBC38"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Assigning RFID to Teacher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Teacher Name: $teacherName" -ForegroundColor Yellow
Write-Host "RFID Card: $rfidCard" -ForegroundColor Yellow
Write-Host ""

try {
    $body = @{
        teacherName = $teacherName
        rfidCard = $rfidCard
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
    }

    Write-Host "Sending request to API..." -ForegroundColor Cyan
    
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/update-teacher-rfid" -Method POST -Body $body -Headers $headers -UseBasicParsing
    
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    if ($result.success) {
        Write-Host "✅ SUCCESS!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Teacher: $($result.teacherName)" -ForegroundColor White
        Write-Host "RFID Card: $($result.rfidCard)" -ForegroundColor White
        Write-Host "Message: $($result.message)" -ForegroundColor White
    } else {
        Write-Host "❌ ERROR" -ForegroundColor Red
        Write-Host ""
        Write-Host "Error: $($result.error)" -ForegroundColor Red
        if ($result.hint) {
            Write-Host "Hint: $($result.hint)" -ForegroundColor Yellow
        }
        if ($result.availableTeachers) {
            Write-Host ""
            Write-Host "Available teachers (first 10):" -ForegroundColor Yellow
            $result.availableTeachers | ForEach-Object {
                Write-Host "  - $($_.name) (Email: $($_.email), ID: $($_.id))" -ForegroundColor White
            }
        }
    }
    Write-Host "========================================" -ForegroundColor Cyan
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ REQUEST FAILED" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure:" -ForegroundColor Yellow
    Write-Host "  1. Next.js dev server is running (npm run dev)" -ForegroundColor White
    Write-Host "  2. Server is accessible at http://localhost:3000" -ForegroundColor White
    Write-Host "========================================" -ForegroundColor Red
}

