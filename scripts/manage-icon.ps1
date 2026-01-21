param (
    [Parameter(Mandatory=$true)]
    [string]$SourcePath
)

$ProjectRoot = Resolve-Path "$PSScriptRoot\.."
$IconsDir = Join-Path $ProjectRoot "public\icons"

# Ensure icons directory exists
if (-not (Test-Path $IconsDir)) {
    New-Item -ItemType Directory -Force -Path $IconsDir | Out-Null
    Write-Host "Created directory: $IconsDir" -ForegroundColor Cyan
}

# Get filename and target path
$FileName = Split-Path $SourcePath -Leaf
$DestPath = Join-Path $IconsDir $FileName

# Copy file
Copy-Item -Path $SourcePath -Destination $DestPath -Force
Write-Host "Successfully copied icon to: $DestPath" -ForegroundColor Green

# Output configuration hint
Write-Host "`nTo use this icon, update data/links.json with:" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host """icon"": ""/icons/$FileName""" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray
