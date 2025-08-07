# Language Switcher - DiaVinci

## 🌐 Overview

DiaVinci now includes a built-in language switcher that allows users to toggle between English and Polish interface languages.

## 📍 Location

The language switcher is located in the top navigation bar, on the right side next to the DiaVinci logo.

## 🎛️ Features

### Visual Design
- **Flag Icons**: 🇺🇸 (English) and 🇵🇱 (Polish) for instant recognition
- **Modern UI**: Styled toggle buttons with smooth transitions
- **Active State**: Currently selected language is highlighted in blue
- **Responsive**: Adapts to mobile and desktop screen sizes

### Functionality
- **Default Language**: English (EN)
- **Persistent Storage**: Selected language is saved in browser localStorage
- **Real-time Updates**: Interface updates immediately when language is switched
- **Comprehensive Coverage**: Translates all major UI elements

## 🔧 Technical Implementation

### Language Service
- **File**: `src/core/LanguageService.js`
- **Global Functions**: `t()` for translations, `switchLanguage()` for language changes
- **Event System**: Triggers `languageChanged` event for other components
- **Fallback System**: Falls back to English if translation is missing

### Translation Keys
Uses `data-translate` attributes in HTML elements:
```html
<span data-translate="components">Components</span>
```

### Supported Elements
- Navigation components
- Button labels  
- Placeholder text
- Form labels
- Terminal interface
- Data model editor

## 📋 Translated Interface Elements

### Main Navigation
- **Components**: "Components" / "Komponenty"
- **Nodes**: "Nodes" / "Węzły"
- **Texts**: "Texts" / "Teksty" 
- **Transitions**: "Transitions" / "Przejścia"

### Node Types
- **Process**: "Process" / "Proces"
- **Start**: "Start" / "Start"
- **Stop**: "Stop" / "Stop"
- **Decision**: "Decision" / "Decyzja"
- **Data Model**: "Data Model" / "Model Danych"

### Bottom Navigation
- **New Project**: "New Project" / "Nowy Projekt"
- **Save**: "Save" / "Zapisz"
- **Load**: "Load" / "Wczytaj"
- **Export Image**: "Export Image" / "Eksportuj Obraz"
- **Export File**: "Export File" / "Eksportuj Plik"
- **Import File**: "Import File" / "Importuj Plik"
- **Remove Selected**: "Remove Selected" / "Usuń Zaznaczone"
- **Clear All**: "Clear All" / "Wyczyść Wszystko"

### Project Management
- **Recent Projects**: "Recent Projects" / "Ostatnie Projekty"
- **Search Projects**: "Search projects..." / "Szukaj projektów..."
- **Project Name**: "Project Name" / "Nazwa Projektu"

### Terminal Interface
- **Terminal**: "Terminal" / "Terminal"
- **Search**: "Search" / "Szukaj"
- **Filter text**: "Filter text..." / "Filtruj tekst..."

### Data Model Editor
- **Fields**: "Fields" / "Pola"
- **JSON**: "JSON" / "JSON"
- **Settings**: "Settings" / "Ustawienia"
- **Add Field**: "Add Field" / "Dodaj Pole"
- **Field Name**: "Field Name" / "Nazwa Pola"
- **Field Type**: "Field Type" / "Typ Pola"
- **Required**: "Required" / "Wymagane"
- **Read Only**: "Read Only" / "Tylko do Odczytu"

## 🚀 Usage

### Switching Languages
1. Look for the language switcher in the top-right corner
2. Click on the desired language button (🇺🇸 EN or 🇵🇱 PL)
3. Interface updates immediately to the selected language

### Persistence
- Selected language is automatically saved to browser localStorage
- Language preference persists between browser sessions
- Default language is English for new users

## 🛠️ Developer Guide

### Adding New Translations

1. **Add to Translation Object**:
```javascript
// In src/core/LanguageService.js
en: {
    newKey: "English Text"
},
pl: {
    newKey: "Polish Text"
}
```

2. **Add HTML Attribute**:
```html
<element data-translate="newKey">Default Text</element>
```

3. **Update Dynamically** (if needed):
```javascript
// Listen for language changes
window.addEventListener('languageChanged', (event) => {
    console.log('Language changed to:', event.detail.language);
    // Update dynamic content
});
```

### Translation Function
```javascript
// Use the global t() function
const translatedText = t('components'); // Returns "Components" or "Komponenty"
```

## 🎯 Future Enhancements

### Planned Features
- **More Languages**: German, French, Spanish support
- **RTL Support**: Right-to-left language support
- **Dynamic Loading**: Load translations from external files
- **Pluralization**: Smart plural form handling
- **Date/Number Formatting**: Locale-specific formatting

### Technical Improvements
- **Translation Management**: Web-based translation editor
- **Missing Translation Detection**: Automatic detection of untranslated strings
- **Translation Validation**: Ensure all keys have translations
- **Performance**: Lazy loading of translation files

## 📊 Browser Support

The language switcher works in all modern browsers:
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🔒 Security & Privacy

- **No External Calls**: All translations are stored locally
- **No Data Collection**: Language preference is stored only in browser
- **Privacy Friendly**: No tracking or analytics for language usage

---

**Live Demo**: [https://odynpl.github.io/DiaVinci/](https://odynpl.github.io/DiaVinci/)
