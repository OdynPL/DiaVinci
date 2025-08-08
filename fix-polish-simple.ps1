# Simple Polish character replacement script
param(
    [string]$FilePath = "src\core\LanguageService.js"
)

Write-Host "Fixing Polish characters in: $FilePath" -ForegroundColor Green

if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

# Read file content
$content = Get-Content -Path $FilePath -Raw -Encoding UTF8

# Create backup
$backupPath = "$FilePath.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $FilePath $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Cyan

Write-Host "Original file size: $($content.Length) characters"

# Simple character replacements - avoiding problematic Unicode in script
$content = $content -replace 'ą', 'a'
$content = $content -replace 'Ą', 'A'
$content = $content -replace 'ć', 'c'
$content = $content -replace 'Ć', 'C'
$content = $content -replace 'ę', 'e'
$content = $content -replace 'Ę', 'E'
$content = $content -replace 'ł', 'l'
$content = $content -replace 'Ł', 'L'
$content = $content -replace 'ń', 'n'
$content = $content -replace 'Ń', 'N'
$content = $content -replace 'ó', 'o'
$content = $content -replace 'Ó', 'O'
$content = $content -replace 'ś', 's'
$content = $content -replace 'Ś', 'S'
$content = $content -replace 'ź', 'z'
$content = $content -replace 'Ź', 'Z'
$content = $content -replace 'ż', 'z'
$content = $content -replace 'Ż', 'Z'

# Fix specific problematic sequences
$content = $content -replace 'możesz', 'mozesz'
$content = $content -replace 'Możesz', 'Mozesz'
$content = $content -replace 'kliknąć', 'kliknac'
$content = $content -replace 'zawierać', 'zawierac'
$content = $content -replace 'właściwości', 'wlasciwosci'
$content = $content -replace 'właściwość', 'wlasciwosc'
$content = $content -replace 'błędy', 'bledy'
$content = $content -replace 'Błędy', 'Bledy'
$content = $content -replace 'błąd', 'blad'
$content = $content -replace 'Błąd', 'Blad'
$content = $content -replace 'płótno', 'plotno'
$content = $content -replace 'Płótno', 'Plotno'
$content = $content -replace 'główny', 'glowny'
$content = $content -replace 'główna', 'glowna'
$content = $content -replace 'następny', 'nastepny'
$content = $content -replace 'następne', 'nastepne'
$content = $content -replace 'następna', 'nastepna'
$content = $content -replace 'później', 'pozniej'
$content = $content -replace 'większy', 'wiekszy'
$content = $content -replace 'większa', 'wieksza'
$content = $content -replace 'większe', 'wieksze'
$content = $content -replace 'więcej', 'wiecej'
$content = $content -replace 'więc', 'wiec'

# Save the corrected file
$content | Set-Content -Path $FilePath -Encoding UTF8 -NoNewline

Write-Host "File updated successfully!" -ForegroundColor Green
Write-Host "New file size: $($content.Length) characters"
Write-Host "Done!" -ForegroundColor Green
