# Simple Polish character replacement using hex codes
$FilePath = "src\core\LanguageService.js"

Write-Host "Fixing Polish characters in: $FilePath" -ForegroundColor Green

if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

# Read file as bytes to avoid encoding issues
$bytes = [System.IO.File]::ReadAllBytes($FilePath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Create backup
$backupPath = "$FilePath.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $FilePath $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Cyan

Write-Host "Original file size: $($content.Length) characters"

# Character mappings using Unicode code points
$replacements = @{
    # Polish characters
    [char]0x0105 = 'a'  # ą
    [char]0x0104 = 'A'  # Ą
    [char]0x0107 = 'c'  # ć
    [char]0x0106 = 'C'  # Ć
    [char]0x0119 = 'e'  # ę
    [char]0x0118 = 'E'  # Ę
    [char]0x0142 = 'l'  # ł
    [char]0x0141 = 'L'  # Ł
    [char]0x0144 = 'n'  # ń
    [char]0x0143 = 'N'  # Ń
    [char]0x00F3 = 'o'  # ó
    [char]0x00D3 = 'O'  # Ó
    [char]0x015B = 's'  # ś
    [char]0x015A = 'S'  # Ś
    [char]0x017A = 'z'  # ź
    [char]0x0179 = 'Z'  # Ź
    [char]0x017C = 'z'  # ż
    [char]0x017B = 'Z'  # Ż
}

$changeCount = 0
foreach ($char in $replacements.Keys) {
    $replacement = $replacements[$char]
    $oldContent = $content
    $content = $content.Replace($char, $replacement)
    if ($content -ne $oldContent) {
        $count = ($oldContent.Length - $oldContent.Replace($char, '').Length)
        Write-Host "Replaced $count occurrences of '$char' with '$replacement'" -ForegroundColor Yellow
        $changeCount += $count
    }
}

# Additional problematic character sequences (manually encoded)
$content = $content -replace 'FAĹSZ', 'FALSZ'
$content = $content -replace 'możesz', 'mozesz'
$content = $content -replace 'Możesz', 'Mozesz'
$content = $content -replace 'kliknąć', 'kliknac'
$content = $content -replace 'zastosować', 'zastosowac'
$content = $content -replace 'właściwości', 'wlasciwosci'
$content = $content -replace 'właściwość', 'wlasciwosc'

# Save the corrected file
[System.IO.File]::WriteAllText($FilePath, $content, [System.Text.Encoding]::UTF8)

Write-Host "File updated successfully!" -ForegroundColor Green
Write-Host "Total changes made: $changeCount" -ForegroundColor Cyan
Write-Host "New file size: $($content.Length) characters"
Write-Host "Done!" -ForegroundColor Green
