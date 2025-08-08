# Skrypt do usuwania polskich znaków diakrytycznych z pliku LanguageService.js
param(
    [string]$FilePath = "src\core\LanguageService.js"
)

Write-Host "Fixing Polish characters in: $FilePath" -ForegroundColor Green

# Sprawdź czy plik istnieje
if (-not (Test-Path $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

# Wczytaj zawartość pliku
$content = Get-Content -Path $FilePath -Raw -Encoding UTF8

# Mapa polskich znaków na standardowe znaki ASCII
$polishChars = @{
    'Ą' = 'A'
    'ą' = 'a'
    'Ć' = 'C'
    'ć' = 'c'
    'Ę' = 'E'
    'ę' = 'e'
    'Ł' = 'L'
    'ł' = 'l'
    'Ń' = 'N'
    'ń' = 'n'
    'Ó' = 'O'
    'ó' = 'o'
    'Ś' = 'S'
    'ś' = 's'
    'Ź' = 'Z'
    'ź' = 'z'
    'Ż' = 'Z'
    'ż' = 'z'
}

Write-Host "Original file size: $($content.Length) characters"

# Zlicz znalezione znaki przed zamianą
$foundChars = @{}
foreach ($char in $polishChars.Keys) {
    $count = ([regex]::Matches($content, [regex]::Escape($char))).Count
    if ($count -gt 0) {
        $foundChars[$char] = $count
        Write-Host "Found $count occurrences of: '$char'" -ForegroundColor Yellow
    }
}

# Wykonaj zamiany
$originalContent = $content
foreach ($polishChar in $polishChars.Keys) {
    $replacement = $polishChars[$polishChar]
    $content = $content -replace [regex]::Escape($polishChar), $replacement
}

# Dodatkowe regex do usunięcia pozostałych problematycznych znaków
$additionalReplacements = @{
    'Ĺ‚' = 'l'
    'Ä…' = 'a'
    'Ă³' = 'o'
    'ĹĽ' = 'n'
    'Ä™' = 'e'
    'Ĺ›' = 's'
    'Ä‡' = 'c'
}

foreach ($pattern in $additionalReplacements.Keys) {
    $replacement = $additionalReplacements[$pattern]
    $content = $content -replace $pattern, $replacement
}

# Sprawdź czy wprowadzono zmiany
if ($content -eq $originalContent) {
    Write-Host "No changes needed - file is already clean!" -ForegroundColor Green
} else {
    # Utwórz kopię zapasową
    $backupPath = "$FilePath.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Copy-Item $FilePath $backupPath
    Write-Host "Backup created: $backupPath" -ForegroundColor Cyan
    
    # Zapisz poprawiony plik
    $content | Set-Content -Path $FilePath -Encoding UTF8 -NoNewline
    
    Write-Host "File updated successfully!" -ForegroundColor Green
    Write-Host "New file size: $($content.Length) characters"
    
    # Pokaż statystyki zmian
    Write-Host "`nChanges made:" -ForegroundColor Cyan
    foreach ($char in $foundChars.Keys) {
        $count = $foundChars[$char]
        $replacement = $polishChars[$char]
        Write-Host "  '$char' -> '$replacement' ($count times)" -ForegroundColor White
    }
}

Write-Host "Done!" -ForegroundColor Green
