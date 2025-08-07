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
        singleWay: "Single Way",
        dualWay: "Dual Way", 
        line: "Line",
        
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
        enterProjectName: "Enter project name...",
        saveAsPrivate: "Save as private project",
        projectNameRequired: "Project name is required",
        passwordRequired: "Password is required for private projects",
        projectPassword: "Project Password",
        enterPasswordPlaceholder: "Enter password for private project...",
        rememberPassword: "Remember this password - it cannot be recovered!",
        
        // Project status messages
        publicProjectSaved: "Public project saved successfully!",
        privateProjectSaved: "Private project saved successfully!",
        publicProjectLoaded: "Public project loaded successfully!",
        privateProjectLoaded: "Private project loaded successfully!",
        newPublicProject: "New public project created and saved!",
        newPrivateProject: "New private project created and saved!",
        
        // Dialog titles and actions
        loadProjectTitle: "Load Project", 
        createNewProjectTitle: "Create New Project",
        deleteProjectTitle: "Delete Project",
        deleteAllProjectsTitle: "Delete All Projects",
        clearCurrentProjectTitle: "Clear Current Project",
        close: "Close",
        load: "Load",
        delete: "Delete",
        createProject: "Create Project",
        projectNameRequired: "Project name is required",
        rememberPassword: "Remember this password - it cannot be recovered!",
        deleteProjectConfirm: "Are you sure you want to delete project",
        actionCannotBeUndone: "This action cannot be undone.",
        
        // Password dialog
        enterPasswordTitle: "Enter Password",
        enterPasswordMessage: "Please enter the password for project:",
        enterPasswordPlaceholder2: "Enter password...",
        unlock: "Unlock",
        passwordCannotBeEmpty: "Password cannot be empty",
        incorrectPassword: "Incorrect password. Please try again.",
        confirm: "Confirm",
        
        // Load dialog
        noProjectsFound: "No saved projects found",
        noProjectsMatchingSearch: "No projects found matching your search",
        clearAllProjectsConfirm: "Are you sure you want to delete <strong>ALL</strong> saved projects and clear the canvas?<br><br><strong>This action cannot be undone!</strong>",
        createFirstDiagram: "Create your first diagram to get started",
        
        // UI Controls and buttons
        clearCanvas: "Clear Canvas",
        clearCanvasConfirm: "Are you sure you want to clear all elements from the canvas?<br><br><strong>This action cannot be undone.</strong>",
        canvasClearedSuccessfully: "Canvas cleared successfully!",
        allProjectsClearedSuccessfully: "All projects and canvas cleared successfully!",
        whiteBackground: "white background", 
        transparentBackground: "transparent background",
        imageExportedSuccessfully: "Image exported successfully with",
        projectExportedSuccessfully: "Project exported successfully!",
        noContentToExport: "No content to export. Please create some elements first.",
        showGrid: "Show Grid",
        hideGrid: "Hide Grid", 
        showRulers: "Show Rulers",
        hideRulers: "Hide Rulers",
        noProjectLoaded: "No Project Loaded",
        
        // Error messages and dialogs
        failedToExport: "Failed to export project. Please try again.",
        errorExportingImage: "Error exporting image. Please try again.",
        errorExportingProject: "Error exporting project. Please try again.",
        errorImportingProject: "Error importing project. Please check the file format.",
        incorrectPasswordImportCancelled: "Incorrect password. Import cancelled.",
        importCancelled: "Import cancelled.",
        clearCurrentProjectConfirm: "Creating a new project will clear the current canvas.<br><br>Do you want to continue?",
        
        // Export dialog
        exportProject: "Export Project",
        exportAsLcpFile: "Export as .lcp File",
        exportImageMenu: "Export Image",
        whiteBackgroundBtn: "White Background",
        transparentBackgroundBtn: "Transparent Background",
        
        custom: "Custom",
        private: "PRIVATE",
        public: "PUBLIC",
        makeProjectPrivate: "Make this project private",
        page: "Page",
        of: "of",
        
        // Data Model Editor
        fieldSpecificErrors: "Field-specific errors:",
        unnamedField: "Unnamed Field",
        unknownField: "Unknown Field",
        pleaseFixErrors: "Please fix these errors before saving.",
        
        // Context Menu
        nodeId: "Node ID",
        textId: "Text ID", 
        transitionId: "Transition ID",
        dataModelId: "Data Model ID",
        type: "Type",
        label: "Label",
        position: "Position",
        rotation: "Rotation",
        fields: "Fields",
        style: "Style",
        copyIdToClipboard: "Copy ID to Clipboard",
        showInTerminal: "Show in Terminal",
        changeColor: "Change Color",
        editDataModel: "Edit Data Model",
        rotateClockwise: "Rotate Clockwise",
        rotateCounterClockwise: "Rotate Counter-Clockwise",
        convertToCurved: "Convert to Curved",
        convertToStraight: "Convert to Straight",
        
        // Data Model Editor specific
        clickAddFieldToStart: "Click \"Add Field\" to get started with your data model",
        fieldNamePlaceholder: "Field name...",
        selectFieldType: "Select field type...",
        initialValuePlaceholder: "Initial value...",
        deleteField: "Delete field",
        moveUp: "Move up",
        moveDown: "Move down",
        duplicateField: "Duplicate field",
        stringType: "String",
        numberType: "Number", 
        booleanType: "Boolean",
        dateType: "Date",
        emailType: "Email",
        urlType: "URL",
        phoneType: "Phone",
        currencyType: "Currency",
        countryCodeType: "Country Code",
        languageCodeType: "Language Code",
        creditCardType: "Credit Card",
        
        // Data Model Editor placeholders
        enterModelName: "Enter model name",
        jsonSchemaWillAppear: "JSON schema will appear here...",
        describeModel: "Describe what this model represents...",
        fieldNamePlaceholder2: "field_name",
        
        // Data Model Editor interface
        editDataModel: "Edit Data Model",
        defineFieldsAndStructure: "Define fields and structure for your data model",
        modelName: "Model Name",
        modelId: "Model ID",
        copyId: "Copy ID",
        jsonSchema: "JSON Schema",
        acceptJson: "Accept JSON",
        copyJson: "Copy JSON",
        jsonEditInstructions: "You can edit the JSON below or paste your own schema and click \"Accept JSON\" to apply changes",
        modelSettings: "Model Settings",
        description: "Description",
        validationRules: "Validation Rules",
        modelType: "Model Type",
        requireAllFields: "Require all fields",
        enableValidation: "Enable validation",
        allowNullValues: "Allow null values",
        entity: "Entity",
        dataTransferObject: "Data Transfer Object",
        viewModel: "View Model",
        document: "Document",
        validationErrors: "Validation Errors",
        saveChanges: "Save Changes",
        options: "Options",
        noFieldsDefinedYet: "No fields defined yet",
        selectValue: "Select...",
        selectCountry: "Select country...",
        selectLanguage: "Select language...",
        selectTimezone: "Select timezone...",
        
        // Validation messages
        validationErrorsInModel: "There are validation errors in this model:",
        sureToCloseWithoutSaving: "Are you sure you want to close without saving? All changes will be lost.",
        modelNameRequired: "Model name is required",
        modelNameTooLong: "Model name cannot exceed 50 characters",
        securityViolation: "Security violation:",
        
        // JSON validation messages
        errorGeneratingJson: "Error generating JSON:",
        pleaseEnterJsonSchema: "Please enter JSON schema to accept",
        jsonTooLarge: "JSON content too large. Maximum size is 100KB",
        jsonTooDeep: "JSON structure too deep. Maximum depth is 10 levels",
        tooManyProperties: "Too many properties. Maximum is 100 fields per model",
        invalidJson: "Invalid JSON:",
        jsonDangerousScript: "JSON contains potentially dangerous script content",
        jsonDangerousSQL: "JSON string values contain potentially dangerous SQL patterns",
        schemaMustBeObject: "Schema must be a valid JSON object",
        schemaMustHaveProperties: "Schema must contain a \"properties\" object",
        schemaMinimumOneProperty: "Schema must contain at least one property",
        fieldNamesCannotBeEmpty: "Field names cannot be empty",
        fieldMustHaveType: "must have a type",
        fieldInvalidType: "has invalid type:",
        requiredMustBeArray: "\"required\" must be an array",
        requiredFieldNotFound: "Required field \"${field}\" not found in properties",
        jsonAutoSynchronized: "JSON automatically synchronized with fields",
        jsonCopiedToClipboard: "JSON copied to clipboard",
        
        // Boolean values
        trueValue: "True",
        falseValue: "False",
        
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
        
        // Terminal filter options
        allMessages: "All Messages",
        errorsOnly: "Errors Only", 
        warningsOnly: "Warnings Only",
        infoOnly: "Info Only",
        debugOnly: "Debug Only",
        canvasDrops: "Canvas Drops",
        textControls: "Text Controls", 
        elementMoves: "Element Moves",
        elementModifications: "Element Modifications",
        
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
        
        // Tooltips
        englishFlag: "English",
        polishFlag: "Polish", 
        basicNodeTooltip: "Basic node - drag to canvas to add process element",
        textElementTooltip: "Text element - adds labels and descriptions to diagram",
        startPointTooltip: "Process start point - marks the beginning of diagram",
        endPointTooltip: "Process end point - marks the end of diagram",
        logicalConditionTooltip: "Logical condition - enables process branching based on decision",
        dataModelTooltip: "Data model - defines data structure with fields and types",
        singleConnectionTooltip: "Single connection - creates arrow in one direction",
        dualConnectionTooltip: "Dual connection - creates arrows in both directions",
        straightLineTooltip: "Straight line - connects elements without arrow",
        toggleGridTooltip: "Enable/disable helper grid on canvas",
        toggleRulersTooltip: "Enable/disable measurement rulers on canvas", 
        canvasTooltip: "Drawing canvas - drag components from left panel, click to select, double-click to edit",
        clearAllProjectsTooltip: "Remove all saved projects from list",
        searchProjectsTooltip: "Type project name to find it in the list",
        toggleTerminalTooltip: "Show/hide console terminal",
        removeSelectedTooltip: "Remove selected elements from diagram",
        newProjectTooltip: "Create new project - clears canvas and starts from scratch",
        saveProjectTooltip: "Save current project in browser",
        loadProjectTooltip: "Load saved project from file",
        clearCanvasTooltip: "Clear entire canvas - remove all elements",
        exportImageTooltip: "Export diagram as PNG image",
        exportFileTooltip: "Export project as JSON file",
        importFileTooltip: "Import project from JSON file",
        resizeTerminalTooltip: "Drag to change terminal height",
        filterMessagesByTextTooltip: "Filter messages by text",
        filterMessagesByTypeTooltip: "Filter messages by type",
        exportLogsTooltip: "Export logs to file",
        clearTerminalTooltip: "Clear terminal",
        closeTerminalTooltip: "Close terminal",
        enterCommandTooltip: "Type command and press Enter",
        typeCommandPlaceholder: "Type command...",
        
        // Terminal messages
        terminalInitialized: "Terminal Service initialized successfully.",
        canvasDropTracking: "Canvas drop tracking enabled - all drag & drop operations will be logged here.",
        typeHelpForCommands: "Type \"help\" for available commands.",
        terminalHelpTitle: "🎯 DIAVINCI TERMINAL - Available Commands",
        basicCommands: "🔧 BASIC COMMANDS:",
        helpCommand: "help          - Show this help message",
        clearCommand: "clear         - Clear terminal output", 
        statusCommand: "status        - Show system status",
        exportCommand: "export        - Export logs to file",
        versionCommand: "version       - Show application version",
        timeCommand: "time          - Show current time",
        historyCommand: "history       - Show command history",
        resetCommand: "reset         - Reset application state",
        searchInspect: "🔍 SEARCH & INSPECT:",
        findCommand: "find <id>     - Find element by ID",
        searchCommand: "search <text> - Search elements by label/name",
        inspectCommand: "inspect <id>  - Show detailed element info",
        listElementsCommand: "list elements - List all elements with IDs",
        listNodesCommand: "list nodes    - List only nodes",
        listTextsCommand: "list texts    - List only text elements",
        listTransCommand: "list trans    - List only transitions",
        countCommand: "count         - Count all project elements",
        analyticsCommands: "📊 ANALYTICS:",
        statsCommand: "stats         - Show detailed project stats",
        memoryCommand: "memory        - Show memory usage info",
        performanceCommand: "performance   - Show performance metrics",
        validateCommand: "validate      - Validate project integrity",
        debuggingCommands: "🛠️ DEBUGGING:",
        debugCommand: "debug on/off  - Toggle debug logging",
        debugProjectCommand: "debug project - Show project debug info",
        debugNodesCommand: "debug nodes   - Show all nodes with types",
        logsCommand: "logs <type>   - Filter logs by type",
        traceCommand: "trace <id>    - Trace element relationships",
        errorsCommand: "errors        - Show recent error logs",
        dataModelCommands: "📋 DATA MODEL:",
        fieldsCommand: "fields <id>   - List all fields of data model",
        fieldCommand: "field <id> <name> - Get field value from model",
        modelsCommand: "models        - List all data model nodes",
        quickFieldAccess: "ID.field_name - Quick field access (e.g., 123.name)",
        tabAutocomplete: "💡 Use TAB after dot for autocomplete",
        systemCommands: "⚙️ SYSTEM:",
        configCommand: "config        - Show system configuration",
        backupCommand: "backup        - Create project backup",
        cleanupCommand: "cleanup       - Clean temporary data",
        pingCommand: "ping          - Test system responsiveness",
        logsExported: "Logs exported to",
        entriesCount: "entries",
        failedToExport: "Failed to export logs:",
        functionFailed: "Function failed:",
        stackTrace: "Stack trace:",
        availableFields: "💡 Available fields for element",
        basicFields: "Basic:",
        nestedFields: "Nested:",
        noFieldsMatch: "❌ No fields match",
        elementNotFound: "❌ Element with ID not found.",
        availableCompletions: "💡 Available completions:",
        noCommandsMatch: "❌ No commands match",
        moreFields: "more fields",
        andMoreFields: "... and",
        useFieldsToSeeAll: "Use \"fields",
        toSeeAllFields: "\" to see all fields",
        
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
        singleWay: "Droga Pojedyncza",
        dualWay: "Droga Podwójna",
        line: "Linia",
        
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
        enterProjectName: "Wprowadź nazwę projektu...",
        saveAsPrivate: "Zapisz jako projekt prywatny",
        projectNameRequired: "Nazwa projektu jest wymagana",
        passwordRequired: "Hasło jest wymagane dla projektów prywatnych",
        projectPassword: "Hasło Projektu",
        enterPasswordPlaceholder: "Wprowadź hasło dla projektu prywatnego...",
        rememberPassword: "Zapamiętaj to hasło - nie można go odzyskać!",
        
        // Project status messages
        publicProjectSaved: "Projekt publiczny zapisany pomyślnie!",
        privateProjectSaved: "Projekt prywatny zapisany pomyślnie!",
        publicProjectLoaded: "Projekt publiczny wczytany pomyślnie!",
        privateProjectLoaded: "Projekt prywatny wczytany pomyślnie!",
        newPublicProject: "Nowy projekt publiczny utworzony i zapisany!",
        newPrivateProject: "Nowy projekt prywatny utworzony i zapisany!",
        
        // Dialog titles and actions
        loadProjectTitle: "Wczytaj Projekt",
        createNewProjectTitle: "Utwórz Nowy Projekt", 
        deleteProjectTitle: "Usuń Projekt",
        deleteAllProjectsTitle: "Usuń Wszystkie Projekty",
        clearCurrentProjectTitle: "Wyczyść Obecny Projekt",
        close: "Zamknij",
        load: "Wczytaj",
        delete: "Usuń",
        createProject: "Utwórz Projekt",
        deleteProjectConfirm: "Czy na pewno chcesz usunąć projekt",
        actionCannotBeUndone: "Ta akcja nie może zostać cofnięta.",
        
        // Password dialog
        enterPasswordTitle: "Wprowadź Hasło",
        enterPasswordMessage: "Proszę wprowadzić hasło dla projektu:",
        enterPasswordPlaceholder2: "Wprowadź hasło...",
        unlock: "Odblokuj",
        passwordCannotBeEmpty: "Hasło nie może być puste",
        incorrectPassword: "Nieprawidłowe hasło. Spróbuj ponownie.",
        confirm: "Potwierdź",
        
        // Load dialog
        noProjectsFound: "Nie znaleziono zapisanych projektów",
        noProjectsMatchingSearch: "Nie znaleziono projektów pasujących do wyszukiwania",
        clearAllProjectsConfirm: "Czy na pewno chcesz usunąć <strong>WSZYSTKIE</strong> zapisane projekty i wyczyścić płótno?<br><br><strong>Ta akcja nie może zostać cofnięta!</strong>",
        createFirstDiagram: "Utwórz swój pierwszy diagram, aby rozpocząć",
        
        // UI Controls and buttons
        clearCanvas: "Wyczyść Płótno",
        clearCanvasConfirm: "Czy na pewno chcesz wyczyścić wszystkie elementy z płótna?<br><br><strong>Ta akcja nie może zostać cofnięta.</strong>",
        canvasClearedSuccessfully: "Płótno wyczyszczone pomyślnie!",
        allProjectsClearedSuccessfully: "Wszystkie projekty i płótno wyczyszczone pomyślnie!",
        whiteBackground: "białe tło",
        transparentBackground: "przezroczyste tło", 
        imageExportedSuccessfully: "Obraz wyeksportowany pomyślnie z",
        projectExportedSuccessfully: "Projekt wyeksportowany pomyślnie!",
        noContentToExport: "Brak treści do eksportu. Proszę najpierw utworzyć elementy.",
        showGrid: "Pokaż Siatkę",
        hideGrid: "Ukryj Siatkę",
        showRulers: "Pokaż Linijki", 
        hideRulers: "Ukryj Linijki",
        noProjectLoaded: "Brak Wczytanego Projektu",
        
        // Error messages and dialogs
        failedToExport: "Nie udało się wyeksportować projektu. Spróbuj ponownie.",
        errorExportingImage: "Błąd podczas eksportowania obrazu. Spróbuj ponownie.",
        errorExportingProject: "Błąd podczas eksportowania projektu. Spróbuj ponownie.",
        errorImportingProject: "Błąd podczas importowania projektu. Sprawdź format pliku.",
        incorrectPasswordImportCancelled: "Nieprawidłowe hasło. Import anulowany.",
        importCancelled: "Import anulowany.",
        clearCurrentProjectConfirm: "Tworzenie nowego projektu wyczyści bieżące płótno.<br><br>Czy chcesz kontynuować?",
        
        // Export dialog
        exportProject: "Eksportuj Projekt",
        exportAsLcpFile: "Eksportuj jako plik .lcp",
        exportImageMenu: "Eksportuj Obraz",
        whiteBackgroundBtn: "Białe Tło",
        transparentBackgroundBtn: "Przezroczyste Tło",
        
        custom: "Niestandardowy",
        private: "PRYWATNY",
        public: "PUBLICZNY",
        makeProjectPrivate: "Ustaw ten projekt jako prywatny",
        page: "Strona",
        of: "z",
        
        // Data Model Editor
        fieldSpecificErrors: "Błędy specyficzne dla pól:",
        unnamedField: "Pole bez nazwy",
        unknownField: "Nieznane pole",
        pleaseFixErrors: "Proszę naprawić te błędy przed zapisaniem.",
        
        // Context Menu
        nodeId: "ID Węzła",
        textId: "ID Tekstu",
        transitionId: "ID Przejścia", 
        dataModelId: "ID Modelu Danych",
        type: "Typ",
        label: "Etykieta",
        position: "Pozycja",
        rotation: "Obrót",
        fields: "Pola",
        style: "Styl",
        copyIdToClipboard: "Kopiuj ID do schowka",
        showInTerminal: "Pokaż w terminalu",
        changeColor: "Zmień kolor",
        editDataModel: "Edytuj model danych",
        rotateClockwise: "Obróć w prawo",
        rotateCounterClockwise: "Obróć w lewo",
        convertToCurved: "Konwertuj na zakrzywione",
        convertToStraight: "Konwertuj na proste",
        
        // Data Model Editor specific
        clickAddFieldToStart: "Kliknij \"Dodaj Pole\" aby rozpocząć pracę z modelem danych",
        fieldNamePlaceholder: "Nazwa pola...",
        selectFieldType: "Wybierz typ pola...",
        initialValuePlaceholder: "Wartość początkowa...",
        deleteField: "Usuń pole",
        moveUp: "Przenieś w górę",
        moveDown: "Przenieś w dół", 
        duplicateField: "Duplikuj pole",
        stringType: "Tekst",
        numberType: "Liczba",
        booleanType: "Wartość logiczna",
        dateType: "Data",
        emailType: "Email",
        urlType: "URL",
        phoneType: "Telefon",
        currencyType: "Waluta",
        countryCodeType: "Kod kraju",
        languageCodeType: "Kod języka",
        creditCardType: "Karta kredytowa",
        
        // Data Model Editor placeholders
        enterModelName: "Wprowadź nazwę modelu",
        jsonSchemaWillAppear: "Schemat JSON pojawi się tutaj...",
        describeModel: "Opisz co reprezentuje ten model...",
        fieldNamePlaceholder2: "nazwa_pola",
        
        // Data Model Editor interface
        editDataModel: "Edytuj Model Danych",
        defineFieldsAndStructure: "Zdefiniuj pola i strukturę dla twojego modelu danych",
        modelName: "Nazwa Modelu",
        modelId: "ID Modelu",
        copyId: "Kopiuj ID",
        jsonSchema: "Schemat JSON",
        acceptJson: "Zaakceptuj JSON",
        copyJson: "Kopiuj JSON",
        jsonEditInstructions: "Możesz edytować JSON poniżej lub wkleić własny schemat i kliknąć \"Zaakceptuj JSON\" aby zastosować zmiany",
        modelSettings: "Ustawienia Modelu",
        description: "Opis",
        validationRules: "Reguły Walidacji",
        modelType: "Typ Modelu",
        requireAllFields: "Wymagaj wszystkie pola",
        enableValidation: "Włącz walidację",
        allowNullValues: "Zezwól na wartości null",
        entity: "Encja",
        dataTransferObject: "Obiekt Transferu Danych",
        viewModel: "Model Widoku",
        document: "Dokument",
        validationErrors: "Błędy Walidacji",
        saveChanges: "Zapisz Zmiany",
        options: "Opcje",
        noFieldsDefinedYet: "Nie zdefiniowano jeszcze żadnych pól",
        selectValue: "Wybierz...",
        selectCountry: "Wybierz kraj...",
        selectLanguage: "Wybierz język...",
        selectTimezone: "Wybierz strefę czasową...",
        
        // Validation messages
        validationErrorsInModel: "W tym modelu występują błędy walidacji:",
        sureToCloseWithoutSaving: "Czy na pewno chcesz zamknąć bez zapisywania? Wszystkie zmiany zostaną utracone.",
        modelNameRequired: "Nazwa modelu jest wymagana",
        modelNameTooLong: "Nazwa modelu nie może przekraczać 50 znaków",
        securityViolation: "Naruszenie bezpieczeństwa:",
        
        // JSON validation messages
        errorGeneratingJson: "Błąd podczas generowania JSON:",
        pleaseEnterJsonSchema: "Proszę wprowadzić schemat JSON do zaakceptowania",
        jsonTooLarge: "Zawartość JSON jest zbyt duża. Maksymalny rozmiar to 100KB",
        jsonTooDeep: "Struktura JSON jest zbyt głęboka. Maksymalna głębokość to 10 poziomów",
        tooManyProperties: "Zbyt wiele właściwości. Maksimum to 100 pól na model",
        invalidJson: "Nieprawidłowy JSON:",
        jsonDangerousScript: "JSON zawiera potencjalnie niebezpieczną zawartość skryptu",
        jsonDangerousSQL: "Wartości tekstowe JSON zawierają potencjalnie niebezpieczne wzorce SQL",
        schemaMustBeObject: "Schemat musi być prawidłowym obiektem JSON",
        schemaMustHaveProperties: "Schemat musi zawierać obiekt \"properties\"",
        schemaMinimumOneProperty: "Schemat musi zawierać przynajmniej jedną właściwość",
        fieldNamesCannotBeEmpty: "Nazwy pól nie mogą być puste",
        fieldMustHaveType: "musi mieć typ",
        fieldInvalidType: "ma nieprawidłowy typ:",
        requiredMustBeArray: "\"required\" musi być tablicą",
        requiredFieldNotFound: "Wymagane pole \"${field}\" nie znalezione we właściwościach",
        jsonAutoSynchronized: "JSON automatycznie zsynchronizowany z polami",
        jsonCopiedToClipboard: "JSON skopiowany do schowka",
        
        // Boolean values
        trueValue: "Prawda",
        falseValue: "Fałsz",
        
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
        
        // Terminal filter options
        allMessages: "Wszystkie Wiadomości",
        errorsOnly: "Tylko Błędy",
        warningsOnly: "Tylko Ostrzeżenia", 
        infoOnly: "Tylko Informacje",
        debugOnly: "Tylko Debug",
        canvasDrops: "Upuszczenia na Płótno",
        textControls: "Kontrolki Tekstu",
        elementMoves: "Przesunięcia Elementów",
        elementModifications: "Modyfikacje Elementów",
        
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
        
        // Tooltips
        englishFlag: "Angielski",
        polishFlag: "Polski",
        basicNodeTooltip: "Podstawowy węzeł - przeciągnij na kanwę aby dodać element procesu",
        textElementTooltip: "Element tekstowy - dodaje etykiety i opisy do diagramu",
        startPointTooltip: "Punkt startowy procesu - oznacza początek diagramu",
        endPointTooltip: "Punkt końcowy procesu - oznacza zakończenie diagramu",
        logicalConditionTooltip: "Warunek logiczny - umożliwia rozgałęzienie procesu na podstawie decyzji",
        dataModelTooltip: "Model danych - definiuje strukturę danych z polami i typami",
        singleConnectionTooltip: "Połączenie jednostronne - tworzy strzałkę w jednym kierunku",
        dualConnectionTooltip: "Połączenie dwustronne - tworzy strzałki w obu kierunkach",
        straightLineTooltip: "Prosta linia - łączy elementy bez strzałki",
        toggleGridTooltip: "Włącz/wyłącz siatkę pomocniczą na kanwie",
        toggleRulersTooltip: "Włącz/wyłącz linijki pomiarowe na kanwie",
        canvasTooltip: "Kanwa do rysowania - przeciągnij komponenty z lewego panelu, kliknij aby zaznaczyć, dwuklik aby edytować",
        clearAllProjectsTooltip: "Usuń wszystkie zapisane projekty z listy",
        searchProjectsTooltip: "Wpisz nazwę projektu aby go znaleźć na liście",
        toggleTerminalTooltip: "Pokaż/ukryj terminal konsoli",
        removeSelectedTooltip: "Usuń zaznaczone elementy z diagramu",
        newProjectTooltip: "Utwórz nowy projekt - czyści kanwę i rozpoczyna od zera",
        saveProjectTooltip: "Zapisz aktualny projekt w przeglądarce",
        loadProjectTooltip: "Wczytaj zapisany projekt z pliku",
        clearCanvasTooltip: "Wyczyść całą kanwę - usuń wszystkie elementy",
        exportImageTooltip: "Eksportuj diagram jako obraz PNG",
        exportFileTooltip: "Eksportuj projekt jako plik JSON",
        importFileTooltip: "Importuj projekt z pliku JSON",
        resizeTerminalTooltip: "Przeciągnij aby zmienić wysokość terminala",
        filterMessagesByTextTooltip: "Filtruj wiadomości według tekstu",
        filterMessagesByTypeTooltip: "Filtruj wiadomości według typu",
        exportLogsTooltip: "Eksportuj logi do pliku",
        clearTerminalTooltip: "Wyczyść terminal",
        closeTerminalTooltip: "Zamknij terminal",
        enterCommandTooltip: "Wpisz komendę i naciśnij Enter",
        typeCommandPlaceholder: "Wpisz komendę...",
        
        // Terminal messages
        terminalInitialized: "Serwis terminala został pomyślnie zainicjalizowany.",
        canvasDropTracking: "Śledzenie upuszczania na płótno włączone - wszystkie operacje przeciągnij i upuść będą tutaj logowane.",
        typeHelpForCommands: "Wpisz \"help\" aby zobaczyć dostępne komendy.",
        terminalHelpTitle: "🎯 TERMINAL DIAVINCI - Dostępne Komendy",
        basicCommands: "🔧 PODSTAWOWE KOMENDY:",
        helpCommand: "help          - Pokaż tę wiadomość pomocy",
        clearCommand: "clear         - Wyczyść output terminala",
        statusCommand: "status        - Pokaż status systemu",
        exportCommand: "export        - Eksportuj logi do pliku",
        versionCommand: "version       - Pokaż wersję aplikacji",
        timeCommand: "time          - Pokaż aktualny czas",
        historyCommand: "history       - Pokaż historię komend",
        resetCommand: "reset         - Resetuj stan aplikacji",
        searchInspect: "🔍 SZUKANIE I INSPEKCJA:",
        findCommand: "find <id>     - Znajdź element po ID",
        searchCommand: "search <text> - Szukaj elementów po etykiecie/nazwie",
        inspectCommand: "inspect <id>  - Pokaż szczegółowe info o elemencie",
        listElementsCommand: "list elements - Listuj wszystkie elementy z ID",
        listNodesCommand: "list nodes    - Listuj tylko węzły",
        listTextsCommand: "list texts    - Listuj tylko elementy tekstowe",
        listTransCommand: "list trans    - Listuj tylko przejścia",
        countCommand: "count         - Policz wszystkie elementy projektu",
        analyticsCommands: "📊 ANALITYKA:",
        statsCommand: "stats         - Pokaż szczegółowe statystyki projektu",
        memoryCommand: "memory        - Pokaż informacje o użyciu pamięci",
        performanceCommand: "performance   - Pokaż metryki wydajności",
        validateCommand: "validate      - Zwaliduj integralność projektu",
        debuggingCommands: "🛠️ DEBUGOWANIE:",
        debugCommand: "debug on/off  - Przełącz logowanie debug",
        debugProjectCommand: "debug project - Pokaż info debug projektu",
        debugNodesCommand: "debug nodes   - Pokaż wszystkie węzły z typami",
        logsCommand: "logs <type>   - Filtruj logi po typie",
        traceCommand: "trace <id>    - Śledź relacje elementu",
        errorsCommand: "errors        - Pokaż ostatnie logi błędów",
        dataModelCommands: "📋 MODEL DANYCH:",
        fieldsCommand: "fields <id>   - Listuj wszystkie pola modelu danych",
        fieldCommand: "field <id> <name> - Pobierz wartość pola z modelu",
        modelsCommand: "models        - Listuj wszystkie węzły modelu danych",
        quickFieldAccess: "ID.nazwa_pola - Szybki dostęp do pola (np. 123.name)",
        tabAutocomplete: "💡 Użyj TAB po kropce dla autouzupełniania",
        systemCommands: "⚙️ SYSTEM:",
        configCommand: "config        - Pokaż konfigurację systemu",
        backupCommand: "backup        - Utwórz kopię zapasową projektu",
        cleanupCommand: "cleanup       - Oczyść dane tymczasowe",
        pingCommand: "ping          - Testuj responsywność systemu",
        logsExported: "Logi wyeksportowane do",
        entriesCount: "wpisów",
        failedToExport: "Nie udało się wyeksportować logów:",
        functionFailed: "Funkcja nie powiodła się:",
        stackTrace: "Ślad stosu:",
        availableFields: "💡 Dostępne pola dla elementu",
        basicFields: "Podstawowe:",
        nestedFields: "Zagnieżdżone:",
        noFieldsMatch: "❌ Żadne pola nie pasują do",
        elementNotFound: "❌ Element o ID nie został znaleziony.",
        availableCompletions: "💡 Dostępne uzupełnienia:",
        noCommandsMatch: "❌ Żadne komendy nie pasują do",
        moreFields: "więcej pól",
        andMoreFields: "... i",
        useFieldsToSeeAll: "Użyj \"fields",
        toSeeAllFields: "\" aby zobaczyć wszystkie pola",
        
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
    
    // Update all elements with data-translate-title attribute
    const titleElements = document.querySelectorAll('[data-translate-title]');
    titleElements.forEach(element => {
        const key = element.getAttribute('data-translate-title');
        const translatedText = t(key);
        element.title = translatedText;
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
    
    // Check if emoji flags are supported, if not use SVG fallback
    checkEmojiFlagSupport();
    
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

// Check if emoji flags are supported and provide fallback
function checkEmojiFlagSupport() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 1;
    
    // Try to draw US flag emoji
    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText('🇺🇸', 0, 0);
    
    // If the emoji is not supported, it will render as two separate characters
    // In that case, we'll use SVG flags
    const imageData = ctx.getImageData(0, 0, 1, 1).data;
    const isMonochrome = imageData[0] === imageData[1] && imageData[1] === imageData[2];
    
    if (isMonochrome) {
        // Emoji flags not supported, use SVG fallback
        document.body.classList.add('no-emoji-flags');
        
        // Replace emoji with SVG images
        const enFlag = document.querySelector('#lang-en .flag-icon');
        const plFlag = document.querySelector('#lang-pl .flag-icon');
        
        if (enFlag) {
            enFlag.innerHTML = '<img src="Resources/flags/us.svg" alt="EN" width="20" height="15" style="vertical-align: middle;">';
        }
        
        if (plFlag) {
            plFlag.innerHTML = '<img src="Resources/flags/pl.svg" alt="PL" width="20" height="15" style="vertical-align: middle;">';
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}

// Export LanguageService object for global access
window.LanguageService = {
    t: t,
    switchLanguage: switchLanguage,
    getCurrentLanguage: () => currentLanguage,
    init: initializeLanguage
};

// Make t() available globally for convenience
window.t = t;
