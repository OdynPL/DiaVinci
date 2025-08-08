# PowerShell script to update TerminalService.js with translation function calls

$filePath = "c:\diavinci\src\services\TerminalService.js"
$content = Get-Content $filePath -Raw

# Define replacements for hardcoded strings
$replacements = @{
    "this.addLine\('❌ Invalid syntax\. Usage: field <data-model-id> <field-name>', 'error'\)" = "this.addLine(t('invalidSyntaxField'), 'error')"
    "this.addLine\('💡 Type ""help"" to see all available commands\.', 'info'\)" = "this.addLine(t('typeHelpForCommands'), 'info')"
    "this.addLine\('❌ ELEMENT NOT FOUND', 'error'\)" = "this.addLine(t('elementNotFound'), 'error')"
    "this.addLine\('❌ Please provide an element ID\. Usage: inspect <id>', 'error'\)" = "this.addLine(t('provideInspectId'), 'error')"
    "this.addLine\('🔍 DETAILED INSPECTION', 'success'\)" = "this.addLine(t('detailedInspection'), 'success')"
    "this.addLine\('❌ No active project found\. Please ensure the application is fully loaded\.', 'error'\)" = "this.addLine(t('noActiveProject'), 'error')"
    "this.addLine\('📋 All Project Elements', 'info'\)" = "this.addLine(t('allProjectElements'), 'info')"
    "this.addLine\('🔧 PROJECT DEBUG INFO', 'info'\)" = "this.addLine(t('projectDebugInfo'), 'info')"
    "this.addLine\('🔍 Search Results', 'info'\)" = "this.addLine('🔍 Search Results', 'info')"
    "this.addLine\('🟢 Nodes', 'info'\)" = "this.addLine('🟢 Nodes', 'info')"
    "this.addLine\('📝 Text Elements', 'info'\)" = "this.addLine('📝 Text Elements', 'info')"
}

# Apply replacements
foreach ($pattern in $replacements.Keys) {
    $replacement = $replacements[$pattern]
    $content = $content -replace $pattern, $replacement
}

# Write back to file
Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "✅ TerminalService.js updated with translation function calls"
Write-Host "🔧 Manual review recommended for complex string interpolations"
