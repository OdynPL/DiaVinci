// Language translations for DiaVinci
const translations = {
    en: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Components",
        nodes: "Nodes",
        texts: "Texts", 
        transitions: "Transitions",
        
        // Node types
        process: "Process",
        start: "Start",
        stop: "Stop", 
        decision: "Decision",
        data: "Data",
        dataModel: "Data Model",
        
        // Bottom navigation
        newProject: "New Project",
        saveProject: "Save Project",
        loadProject: "Load Project",
        exportImage: "Export Image",
        exportFile: "Export File",
        importFile: "Import File",
        removeSelected: "Remove Selected",
        save: "Save",
        load: "Load", 
        clear: "Clear All",
        
        // Export options
        exportOptions: "Export Options",
        whiteBackground: "White Background",
        transparentBackground: "Transparent Background",
        
        // Save dialog
        saveProjectTitle: "Save Project",
        projectName: "Project Name",
        save: "Save",
        cancel: "Cancel",
        
        // Load projects
        loadProjectTitle: "Load Project",
        recentProjects: "Recent Projects",
        searchProjects: "Search projects...",
        noProjectsFound: "No projects found",
        projectCreated: "Created",
        projectModified: "Modified",
        load: "Load",
        delete: "Delete",
        
        // Data Model
        dataModelEditor: "Data Model Editor",
        fields: "Fields",
        json: "JSON",
        settings: "Settings",
        addField: "Add Field",
        fieldName: "Field Name",
        fieldType: "Field Type",
        required: "Required",
        nullable: "Nullable",
        readOnly: "Read Only",
        initialValue: "Initial Value",
        
        // Terminal
        terminal: "Terminal",
        terminalToggle: "Toggle Terminal",
        terminalClear: "Clear Terminal",
        terminalClose: "Close Terminal",
        terminalExport: "Export Logs",
        
        // Common
        yes: "Yes",
        no: "No",
        ok: "OK",
        close: "Close",
        edit: "Edit",
        remove: "Remove",
        duplicate: "Duplicate",
        search: "Search",
        filterText: "Filter text...",
        
        // Messages
        projectSaved: "Project saved successfully",
        projectLoaded: "Project loaded successfully",
        projectDeleted: "Project deleted successfully",
        imageExported: "Image exported successfully",
        fileExported: "File exported successfully",
        fileImported: "File imported successfully",
        
        // Errors
        errorSaving: "Error saving project",
        errorLoading: "Error loading project",
        errorDeleting: "Error deleting project",
        errorExporting: "Error exporting",
        errorImporting: "Error importing file",
        invalidFile: "Invalid file format"
    },
    
    pl: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Komponenty",
        nodes: "Węzły",
        texts: "Teksty",
        transitions: "Przejścia",
        
        // Node types
        process: "Proces",
        start: "Start",
        stop: "Stop",
        decision: "Decyzja",
        data: "Dane",
        dataModel: "Model Danych",
        
        // Bottom navigation
        newProject: "Nowy Projekt",
        saveProject: "Zapisz Projekt",
        loadProject: "Wczytaj Projekt",
        exportImage: "Eksportuj Obraz",
        exportFile: "Eksportuj Plik",
        importFile: "Importuj Plik",
        removeSelected: "Usuń Zaznaczone",
        save: "Zapisz",
        load: "Wczytaj",
        clear: "Wyczyść Wszystko",
        
        // Export options
        exportOptions: "Opcje Eksportu",
        whiteBackground: "Białe Tło",
        transparentBackground: "Przezroczyste Tło",
        
        // Save dialog
        saveProjectTitle: "Zapisz Projekt",
        projectName: "Nazwa Projektu",
        save: "Zapisz",
        cancel: "Anuluj",
        
        // Load projects
        loadProjectTitle: "Wczytaj Projekt",
        recentProjects: "Ostatnie Projekty",
        searchProjects: "Szukaj projektów...",
        noProjectsFound: "Nie znaleziono projektów",
        projectCreated: "Utworzony",
        projectModified: "Zmodyfikowany",
        load: "Wczytaj",
        delete: "Usuń",
        
        // Data Model
        dataModelEditor: "Edytor Modelu Danych",
        fields: "Pola",
        json: "JSON",
        settings: "Ustawienia",
        addField: "Dodaj Pole",
        fieldName: "Nazwa Pola",
        fieldType: "Typ Pola",
        required: "Wymagane",
        nullable: "Nullable",
        readOnly: "Tylko do Odczytu",
        initialValue: "Wartość Początkowa",
        
        // Terminal
        terminal: "Terminal",
        terminalToggle: "Przełącz Terminal",
        terminalClear: "Wyczyść Terminal",
        terminalClose: "Zamknij Terminal",
        terminalExport: "Eksportuj Logi",
        
        // Common
        yes: "Tak",
        no: "Nie",
        ok: "OK",
        close: "Zamknij",
        edit: "Edytuj",
        remove: "Usuń",
        duplicate: "Duplikuj",
        search: "Szukaj",
        filterText: "Filtruj tekst...",
        
        // Messages
        projectSaved: "Projekt zapisany pomyślnie",
        projectLoaded: "Projekt wczytany pomyślnie",
        projectDeleted: "Projekt usunięty pomyślnie",
        imageExported: "Obraz wyeksportowany pomyślnie",
        fileExported: "Plik wyeksportowany pomyślnie",
        fileImported: "Plik zaimportowany pomyślnie",
        
        // Errors
        errorSaving: "Błąd podczas zapisywania projektu",
        errorLoading: "Błąd podczas wczytywania projektu",
        errorDeleting: "Błąd podczas usuwania projektu",
        errorExporting: "Błąd podczas eksportowania",
        errorImporting: "Błąd podczas importowania pliku",
        invalidFile: "Nieprawidłowy format pliku"
    }
};

// Current language (default: English)
let currentLanguage = 'en';

// Translation function
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            // Fallback to English if translation not found
            value = translations['en'];
            for (const fallbackKey of keys) {
                if (value && typeof value === 'object') {
                    value = value[fallbackKey];
                } else {
                    break;
                }
            }
            break;
        }
    }
    
    return value || key;
}

// Get language from localStorage or default to English
function getStoredLanguage() {
    return localStorage.getItem('diavinci-language') || 'en';
}

// Save language to localStorage
function saveLanguage(lang) {
    localStorage.setItem('diavinci-language', lang);
}

// Update all translatable elements
function updateTranslations() {
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translatedText = t(key);
        
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
            element.placeholder = translatedText;
        } else {
            element.textContent = translatedText;
        }
    });
    
    // Update document title
    document.title = t('title');
    
    // Update language attribute
    document.documentElement.lang = currentLanguage;
}

// Switch language
function switchLanguage(lang) {
    if (lang !== currentLanguage && translations[lang]) {
        currentLanguage = lang;
        saveLanguage(lang);
        updateTranslations();
        updateLanguageButtons();
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }
}

// Update language button states
function updateLanguageButtons() {
    const buttons = document.querySelectorAll('.language-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `lang-${currentLanguage}`) {
            btn.classList.add('active');
        }
    });
}

// Initialize language system
function initializeLanguage() {
    // Get stored language
    currentLanguage = getStoredLanguage();
    
    // Setup language switcher buttons
    const enBtn = document.getElementById('lang-en');
    const plBtn = document.getElementById('lang-pl');
    
    if (enBtn) {
        enBtn.addEventListener('click', () => switchLanguage('en'));
    }
    
    if (plBtn) {
        plBtn.addEventListener('click', () => switchLanguage('pl'));
    }
    
    // Initial translation update
    updateTranslations();
    updateLanguageButtons();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}
