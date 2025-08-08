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
        
        // Node labels
        nodeStart: "START",
        nodeStop: "STOP",
        nodeIf: "IF",
        nodeDefault: "Node",
        labelTrue: "TRUE",
        labelFalse: "FALSE",
        labelStep1: "Step1",
        labelStep2: "Step2",
        
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
        
        // InputService translations
        inputServiceInitialized: "InputService initialized",
        errorShowingNodeInput: "Error showing node input",
        failedToShowNodeEditor: "Failed to show node editor",
        showTextInputCalled: "showTextInput called",
        inputPositioning: "Input positioning",
        inputSetupCompleted: "Input setup completed",
        errorShowingTextInput: "Error showing text input",
        
        // GridService translations
        gridServiceInitialized: "GridService initialized",
        rulersToggled: "Rulers toggled",
        gridToggled: "Grid toggled",
        gridSizeChanged: "Grid size changed",
        gridSnapChanged: "Grid snap changed",
        smartGuidesChanged: "Smart guides changed",
        gridServiceDestroyed: "GridService destroyed",
        
        // MultiSelectionManager translations
        multiSelectionManagerInitialized: "MultiSelectionManager initialized",
        selectionRectangleStarted: "Selection rectangle started",
        errorStartingSelection: "Error starting selection",
        failedToStartSelection: "Failed to start selection",
        endSelectionCalled: "endSelection called",
        selectionRect: "Selection rect",
        nodeSelected: "Node selected",
        textSelected: "Text selected",
        transitionSelected: "Transition selected",
        selectionRectangleDeactivated: "Selection rectangle deactivated",
        multiSelectionCompleted: "Multi-selection completed",
        errorEndingSelection: "Error ending selection",
        failedToCompleteSelection: "Failed to complete selection",
        errorCheckingElementInRect: "Error checking element in rect",
        errorCheckingTextInRect: "Error checking text in rect",
        errorCheckingTransitionInRect: "Error checking transition in rect",
        groupDragStarted: "Group drag started",
        errorStartingGroupDrag: "Error starting group drag",
        failedToStartGroupDrag: "Failed to start group drag",
        groupDragCompleted: "Group drag completed",
        elementDeselected: "Element deselected",
        elementSelected: "Element selected",
        selectionCleared: "Selection cleared",
        
        // BreakPointService translations
        breakPointServiceInitialized: "BreakPointService initialized",
        errorFindingBreakPointAtPosition: "Error finding break point at position",
        failedToFindBreakPoint: "Failed to find break point",
        breakPointMoved: "Break point moved",
        errorMovingBreakPoint: "Error moving break point",
        failedToMoveBreakPoint: "Failed to move break point",
        multipleBreakPointsMoved: "Multiple break points moved",
        errorMovingMultipleBreakPoints: "Error moving multiple break points",
        failedToMoveBreakPoints: "Failed to move break points",
        errorGettingSelectedBreakPoints: "Error getting selected break points",
        breakPointsUpdatedForNodeMovement: "Break points updated for node movement",
        errorUpdatingBreakPointsForMovedNode: "Error updating break points for moved node",
        failedToUpdateBreakPoints: "Failed to update break points",
        breakPointsUpdatedForGroupNodeMovement: "Break points updated for group node movement",
        errorUpdatingBreakPointsForMovedNodes: "Error updating break points for moved nodes",
        
        // EventBus and DiagramController translations
        errorInEventListener: "Error in event listener",
        diagramControllerInitialized: "DiagramController initialized",
        transitionDrawingModeStarted: "Transition drawing mode started",
        transitionDrawingCancelled: "Transition drawing cancelled",
        transitionDrawingCompleted: "Transition drawing completed",
        mouseDownAt: "Mouse down at",
        currentlyEditingCompletingEdit: "Currently editing - completing edit",
        
        // Transition model translations
        transitionMissingFromOrToNode: "Transition missing from or to node",
        transitionNodesMissingCoordinates: "Transition nodes missing coordinates",
        blockedStyleToggleForIFTransition: "Blocked style toggle for IF transition - robot arms cannot be modified",
        transitionStyleToggled: "Transition style toggled",
        blockedBreakPointForIFTransition: "Blocked break point for IF transition - robot arms cannot be modified",
        breakPointAdded: "Break point added",
        breakPointRemoved: "Break point removed",
        allBreakPointsCleared: "All break points cleared",
        
        // Project model translations
        duplicateTransitionPrevented: "Duplicate transition prevented",
        lookingForTextAtPosition: "Looking for text at position",
        foundTextElement: "Found text element",
        noTextFoundAtPosition: "No text found at position",
        
        // InputService translations
        errorShowingTransitionInput: "Error showing transition input",
        createInputCalled: "createInput called",
        creatingNewInputElement: "Creating new input element",
        reusingExistingInputElement: "Reusing existing input element",
        inputElementConfigured: "Input element configured",
        setupInputCalled: "setupInput called",
        inputCompleted: "Input completed",
        inputTooLongTruncating: "Input too long, truncating",
        inputSanitized: "Input sanitized",
        settingLabel: "Setting label",
        settingTransitionLabel: "Setting transition label",
        hidingActiveInput: "Hiding active input",
        inputServiceDestroyed: "InputService destroyed",
        
        // ExportService translations
        errorInFallbackExport: "Error in fallback export",
        
        // DiagramController debug translations
        mouseDownInternal: "Mouse down internal",
        ctrlClickOnNode: "Ctrl+click on node",
        ctrlClickOnText: "Ctrl+click on text",
        ctrlClickOnBreakPoint: "Ctrl+click on break point - add transition to selection",
        ctrlClickOnTransition: "Ctrl+click on transition",
        groupDragStartNode: "Group drag start - node",
        groupDragStartText: "Group drag start - text",
        singleClickOnNodeStartDragging: "Single click on node - start dragging",
        singleClickOnTextStartDragging: "Single click on text - start dragging",
        singleClickOnBreakPointStartDragging: "Single click on break point - start dragging",
        singleClickOnTransition: "Single click on transition",
        clickOnEmptySpaceStartRectangleSelection: "Click on empty space - start rectangle selection",
        startDragging: "Start dragging",
        startDraggingBreakPoint: "Start dragging break point",
        startDraggingTransition: "Start dragging transition",
        transitionStartNodeSelected: "Transition start node selected",
        transitionCancelledSameNodeClicked: "Transition cancelled - same node clicked twice",
        doubleClickAt: "Double click at",
        doubleClickOnNode: "Double click on node",
        doubleClickOnText: "Double click on text",
        doubleClickOnTransition: "Double click on transition",
        rotatingIfNodeCounterClockwise: "Rotating IF node counter-clockwise",
        foundTransitionsForCounterClockwiseRotation: "Found transitions for counter-clockwise rotation",
        missingTransitionsForIfCounterClockwiseRotation: "Missing transitions for IF counter-clockwise rotation",
        blockingOptionsForIfTransition: "Blocking options for IF transition - robot arms cannot be modified",
        rotatingIfNode: "Rotating IF node",
        foundTransitionsForRotation: "Found transitions for rotation",
        missingTransitionsForIfRotation: "Missing transitions for IF rotation",
        transitionStyleToggled: "Transition style toggled",
        breakPointAddedToTransition: "Break point added to transition",
        breakPointRemovedFromTransition: "Break point removed from transition",
        allBreakPointsClearedFromTransition: "All break points cleared from transition",
        startNodeIsNull: "StartNode is null when trying to create transition",
        transitionCreatedSuccessfully: "Transition created successfully",
        transitionCreationFailedOrDuplicate: "Transition creation failed or duplicate detected",
        cannotCreateTransitionInvalidNodes: "Cannot create transition - invalid nodes",
        transitionAlreadyExistsBetweenNodes: "Transition already exists between these nodes",
        
        // Additional DiagramController debug translations
        startDraggingBreakPoint: "Start dragging break point",
        elementEditedEventReceived: "Element edited event received",
        dataModelUpdatedEventReceived: "Data model updated event received",
        breakPointMovedEventReceived: "Break point moved event received",
        multipleBreakPointsMovedEventReceived: "Multiple break points moved event received",
        autoSavedToNamedProject: "Auto-saved to named project",
        autoSaveTriggeredAfterModification: "Auto-save triggered after modification",
        
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
        
        // Language switcher
        selectLanguage: "Select Language",
        
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
        terminalHelpTitle: "đzŽz DIAVINCI TERMINAL - Available Commands",
        basicCommands: "BASIC COMMANDS:",
        helpCommand: "help          - Show this help message",
        clearCommand: "clear         - Clear terminal output", 
        statusCommand: "status        - Show system status",
        exportCommand: "export        - Export logs to file",
        versionCommand: "version       - Show application version",
        timeCommand: "time          - Show current time",
        historyCommand: "history       - Show command history",
        resetCommand: "reset         - Reset application state",
        searchInspect: "SEARCH & INSPECT:",
        findCommand: "find <id>     - Find element by ID",
        searchCommand: "search <text> - Search elements by label/name",
        inspectCommand: "inspect <id>  - Show detailed element info",
        listElementsCommand: "list elements - List all elements with IDs",
        listNodesCommand: "list nodes    - List only nodes",
        listTextsCommand: "list texts    - List only text elements",
        listTransCommand: "list trans    - List only transitions",
        countCommand: "count         - Count all project elements",
        analyticsCommands: "đz“Š ANALYTICS:",
        statsCommand: "stats         - Show detailed project stats",
        memoryCommand: "memory        - Show memory usage info",
        performanceCommand: "performance   - Show performance metrics",
        validateCommand: "validate      - Validate project integrity",
        debuggingCommands: "đz› ď¸z DEBUGGING:",
        debugCommand: "debug on/off  - Toggle debug logging",
        debugProjectCommand: "debug project - Show project debug info",
        debugNodesCommand: "debug nodes   - Show all nodes with types",
        logsCommand: "logs <type>   - Filter logs by type",
        traceCommand: "trace <id>    - Trace element relationships",
        errorsCommand: "errors        - Show recent error logs",
        dataModelCommands: "đz“‹ DATA MODEL:",
        fieldsCommand: "fields <id>   - List all fields of data model",
        fieldCommand: "field <id> <name> - Get field value from model",
        modelsCommand: "models        - List all data model nodes",
        quickFieldAccess: "ID.field_name - Quick field access (e.g., 123.name)",
        tabAutocomplete: " Use TAB after dot for autocomplete",
        systemCommands: "âš™ď¸z SYSTEM:",
        configCommand: "config        - Show system configuration",
        backupCommand: "backup        - Create project backup",
        cleanupCommand: "cleanup       - Clean temporary data",
        pingCommand: "ping          - Test system responsiveness",
        logsExported: "Logs exported to",
        entriesCount: "entries",
        failedToExport: "Failed to export logs:",
        functionFailed: "Function failed:",
        stackTrace: "Stack trace:",
        availableFields: " Available fields for element",
        basicFields: "Basic:",
        nestedFields: "Nested:",
        noFieldsMatch: "âťs No fields match",
        elementNotFound: "âťs Element with ID not found.",
        availableCompletions: " Available completions:",
        noCommandsMatch: "âťs No commands match",
        moreFields: "more fields",
        andMoreFields: "... and",
        useFieldsToSeeAll: "Use \"fields",
        toSeeAllFields: "\" to see all fields",
        field: "field",
        fields: "fields",
        
        // Terminal command messages
        terminalClearedByUser: "Terminal cleared by user command.",
        systemStatus: "⚡ System Status:",
        terminalLines: "🔹 Terminal lines:",
        activeFilter: "🔹 Active filter:",
        terminalVisible: "🔹 Terminal visible:",
        maxLines: "🔹 Max lines:",
        browser: "🔹 Browser:",
        yes: "Yes",
        no: "No",
        divinciTitle: "🎨 DIAVINCI - Data Flow Designer",
        versionInfo: "📦 Version 1.0.0",
        copyrightInfo: "© 2025 DiAVinci Development",
        currentTime: "🕐 Current time:",
        commandHistoryTitle: "📚 Command History (last 10):",
        noCommandHistory: "❌ No command history available.",
        logsExportedSuccess: "📄 Logs exported successfully to download folder.",
        resetConfirmation: "⚠️  Are you sure you want to reset? Type \"reset confirm\" to proceed.",
        resetCompleted: "🔄 Application state reset completed.",
        welcomeBackMessage: "Welcome back to DiAVinci Terminal!",
        debugModeEnabled: "🐛 Debug mode enabled - verbose logging activated.",
        debugModeDisabled: "🔇 Debug mode disabled - normal logging restored.",
        typeHelpForCommands: "💡 Type \"help\" to see all available commands.",
        invalidSyntaxField: "❌ Invalid syntax. Usage: field <data-model-id> <field-name>",
        invalidIdNumber: "❌ Invalid ID: \"$1\". Must be a number.",
        elementNotFoundById: "❌ Element with ID $1 not found.",
        provideElementId: "❌ Please provide an element ID. Usage: find <id>",
        noActiveProject: "❌ No active project found. Please ensure the application is fully loaded.",
        debuggingWindowApp: "🔧 Debugging: window.app available?",
        debuggingWindowContainer: "🔧 Debugging: window.container available?",
        searchingInProject: "🔍 Searching in project with $1 nodes, $2 texts, $3 transitions",
        elementFound: "✅ ELEMENT FOUND",
        elementType: "🔹 Type:",
        elementId: "🔹 ID:",
        elementLabel: "🔹 Label:",
        elementPosition: "🔹 Position:",
        elementSize: "🔹 Size:",
        elementColor: "🔹 Color:",
        nodeType: "🔹 Node Type:",
        transitionFrom: "🔹 From:",
        transitionTo: "🔹 To:",
        transitionStyle: "🔹 Style:",
        fieldsAvailable: "🔹 Fields: $1 fields available",
        useInspectForDetails: "💡 Use \"inspect $1\" for more details",
        elementNotFound: "❌ ELEMENT NOT FOUND",
        searchedId: "🔍 Searched ID:",
        totalElements: "🔍 Total Elements:",
        similarMatchesFound: "🔍 Similar matches found:",
        moreMatches: "... and $1 more matches",
        helpfulCommands: "💡 Helpful commands:",
        listElementsHelp: "   • \"list elements\" - See all available elements",
        debugProjectHelp: "   • \"debug project\" - Show project structure",
        availableElementsFirst3: "📋 Available elements (first 3):",
        provideFindId: "❌ Please provide an element ID. Usage: find <id>",
        provideInspectId: "❌ Please provide an element ID. Usage: inspect <id>",
        detailedInspection: "🔍 DETAILED INSPECTION",
        positionCoords: "🔸 Position: X:$1, Y:$2",
        sizePixels: "🔸 Size: $1 × $2 pixels",
        background: "🔸 Background:",
        border: "🔸 Border:",
        transitionDetails: "🔗 Transition Details:",
        transitionFromTo: "   • From: $1",
        transitionToFrom: "   • To: $1",
        styleInfo: "   • Style: $1",
        conditionInfo: "   • Condition: $1",
        fieldsTotal: "📋 Fields ($1 total):",
        fieldDefault: "      └ Default: $1",
        timestamps: "⏰ Timestamps",
        created: "🔸 Created: $1",
        modified: "🔸 Modified: $1",
        allProperties: "🔧 All Properties",
        jsonData: "📄 JSON Data",
        quickActions: "💡 Quick Actions:",
        copyJsonTip: "   • Copy JSON: Use browser dev tools to copy full object",
        findSimilarTip: "   • Find similar: \"list elements\" to see all available",
        quickFindTip: "   • Quick find: \"find <partial-id>\" for fuzzy search",
        inspectionFailed: "❌ Inspection Failed",
        targetId: "🔸 Target ID:",
        searchType: "🔸 Search Type:",
        projectElements: "🔸 Project Elements:",
        partialIdMatches: "🎯 PARTIAL ID MATCHES:",
        labelMatches: "🏷️  LABEL MATCHES:",
        troubleshootingTips: "💡 TROUBLESHOOTING TIPS:",
        checkIdSpelling: "   • Check ID spelling and case sensitivity",
        useListElements: "   • Use \"list elements\" for complete element list",
        tryDebugProject: "   • Try \"debug project\" for project overview",
        sampleAvailableIds: "📋 SAMPLE AVAILABLE IDs:",
        andMoreElements: "   ... and $1 more elements",
        allProjectElements: "📋 All Project Elements",
        projectName: "🔸 Project:",
        totalNodes: "🔸 Total Nodes:",
        totalTexts: "🔸 Total Texts:",
        totalTransitions: "🔸 Total Transitions:",
        nodes: "Nodes",
        textElements: "📝 Text Elements ($1):",
        transitions: "🔗 Transitions ($1):",
        positionDebug: "      └ Position: ($1, $2)",
        transitionConnection: "      └ From: $1 → To: $2",
        noElementsFound: "📭 No elements found in this project",
        summaryTotal: "📊 Summary: $1 elements total",
        findSpecificElement: "   • \"find <id>\" - Find specific element by ID",
        viewDetailedElement: "   • \"inspect <id>\" - View detailed element information",
        searchElementsByText: "   • \"search <text>\" - Search elements by text content",
        projectDebugInfo: "🔧 PROJECT DEBUG INFO",
        nodesCount: "🔷 Nodes Count:",
        textsCount: "📝 Texts Count:",
        transitionsCount: "🔗 Transitions Count:",
        nodesDetails: "🔷 NODES DETAILS:",
        textsDetails: "📝 TEXTS DETAILS:",
        transitionsDetails: "🔗 TRANSITIONS DETAILS:",
        typeLabel: "Type: $1, Label: \"$2\", ID: $3",
        
        // DataModelNode validation messages
        fieldNameRequired: "Field name is required",
        fieldNameDangerous: "Field name contains potentially dangerous content",
        fieldNameFormat: "Field name must start with letter or underscore, and contain only letters, numbers, and underscores",
        fieldNameTooLong: "Field name cannot exceed 25 characters",
        fieldNameSqlPatterns: "Field name contains potentially dangerous SQL patterns",
        fieldNameReserved: "Field name cannot be a reserved word",
        valueDangerousScript: "Value contains potentially dangerous script content",
        valueDangerousSql: "Value contains potentially dangerous SQL patterns",
        valueTooLong: "Value is too long (maximum 1000 characters)",
        fieldNameMustBeUnique: "Field name must be unique",
        fieldNameCannotBeEmpty: "Field name cannot be empty",
        fieldNameAlreadyInUse: "Field name '$1' is already in use",
        
        // Validation error messages
        invalidUuidFormat: "Invalid UUID format: '$1'. Use format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        passwordTooShort: "Password must be at least 6 characters long",
        invalidColorFormat: "Invalid color format: '$1'. Use hex (#ff0000), color name, or rgb/rgba",
        
        // DataModelEditor validation messages
        securityViolation: "Security violation",
        pleaseFixValidationErrors: "Please fix validation errors",
        invalidJsonSchemaStructure: "Invalid JSON schema structure",
        invalidJsonSyntax: "Invalid JSON syntax",
        jsonError: "JSON Error",
        generalError: "General",
        fieldErrors: "Field Errors",
        validJsonSchema: "Valid JSON Schema",
        warnings: "Warnings",
        missingTitle: "Missing title",
        missingDescription: "Missing description",
        noPropertiesDefined: "No properties defined",
        duplicateFieldNames: "Duplicate field names",
        
        // SecurityConfig validation messages
        inputContainsDangerousScript: "Input contains potentially dangerous script content",
        inputContainsDangerousSQL: "Input contains potentially dangerous SQL patterns",
        inputContainsDangerousSystem: "Input contains potentially dangerous system access patterns",
        inputExceedsMaxLength: "Input exceeds maximum length of $1 characters",
        
        // InputValidator validation messages
        inputContainsDangerousScriptPatterns: "Input contains potentially dangerous script patterns",
        inputExceedsMaxLength100KB: "Input exceeds maximum length of 100KB",
        inputContainsUnsafeCharacters: "Input contains unsafe characters",
        
        // DataModelNode validation messages
        modelNameRequired: "Model name is required",
        modelNameTooLong: "Model name cannot exceed 50 characters", 
        modelMustHaveField: "Model must have at least one field",
        fixFieldValidationErrors: "Please fix field validation errors before saving",
        
        // DataModelNode value validation messages
        invalidNumberFormat: "Invalid number format: \"$1\"",
        invalidCurrencyFormat: "Invalid currency format: \"$1\". Use format like \"PLN 23\" or \"23\"",
        booleanValueRequired: "Boolean value must be one of: $1",
        invalidDateFormat: "Invalid date format: \"$1\". Use YYYY-MM-DD or ISO format",
        invalidEmailFormat: "Invalid email format: \"$1\"",
        invalidUrlFormat: "Invalid URL format: \"$1\"",
        invalidPhoneFormat: "Invalid phone format: \"$1\". Use international format (+1234567890)",
        invalidJsonObjectFormat: "Invalid JSON object format: \"$1\"",
        invalidJsonArrayFormat: "Invalid JSON array format: \"$1\"",
        valueNotValidJsonArray: "Value must be a valid JSON array: \"$1\"",
        invalidFileFormat: "Invalid file format: \"$1\". Use filename with extension, data URL, or HTTP URL",
        invalidJsonFormat: "Invalid JSON format: \"$1\"",
        invalidBase64Format: "Invalid Base64 format: \"$1\"",
        invalidIntegerFormat: "Invalid integer format: \"$1\"",
        invalidDecimalFormat: "Invalid decimal format: \"$1\"",
        invalidPercentageFormat: "Invalid percentage: \"$1\". Must be 0-100 or 0%-100%",
        invalidDurationFormat: "Invalid duration format: \"$1\". Use formats like \"1h 30m\", \"90min\", \"2:30\", or ISO 8601",
        invalidDateTimeFormat: "Invalid datetime format: \"$1\". Use ISO format: YYYY-MM-DDTHH:mm:ss",
        invalidTimeFormat: "Invalid time format: \"$1\". Use HH:mm or HH:mm:ss format",
        invalidTimestampFormat: "Invalid timestamp: \"$1\". Must be a positive integer",
        invalidIpv4Format: "Invalid IPv4 address: \"$1\". Use format: 192.168.1.1",
        invalidIpv6Format: "Invalid IPv6 address: \"$1\"",
        invalidMacFormat: "Invalid MAC address: \"$1\". Use format: XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX",
        invalidCreditCardFormat: "Invalid credit card number: \"$1\". Must be 13-19 digits",
        invalidIbanFormat: "Invalid IBAN: \"$1\". Use format: CC22BBBBSSSSCCCCCCCCCCCC",
        invalidCountryCodeFormat: "Invalid country code: \"$1\". Use ISO 3166-1 alpha-2 format (e.g., US, GB, DE)",
        invalidLanguageCodeFormat: "Invalid language code: \"$1\". Use ISO 639-1 format (e.g., en, en-US, de-DE)",
        invalidTimezoneFormat: "Invalid timezone: \"$1\". Use IANA timezone format (e.g., America/New_York, Europe/London)",
        
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
        invalidFile: "Invalid file format",
        
        // Application initialization
        appInitializedSuccessfully: "DiaVinci application initialized successfully!",
        errorInitializingApplication: "Error initializing application",
        errorStartingApplication: "Error starting application. Please refresh the page.",
        
        // Error handling
        unhandledPromiseRejection: "Unhandled promise rejection",
        uncaughtError: "Uncaught error",
        unexpectedErrorOccurred: "Unexpected error occurred",
        applicationError: "Application error",
        operationFailed: "Operation failed",
        missingRequiredParameters: "Missing required parameters",
        failedToParseJson: "Failed to parse JSON",
        failedToStringifyJson: "Failed to stringify JSON",
        
        // Logger messages
        droppedElement: "Dropped",
        atPosition: "at position",
        canvasDrop: "Canvas Drop",
        textControl: "Text control",
        movedElement: "Moved",
        fromPosition: "from",
        toPosition: "to",
        fromPositionShort: "From",
        toPositionShort: "to",
        modifiedElement: "Modified",
        changedFrom: "changed from",
        changedTo: "to",
        elementMove: "Element Move",
        elementModify: "Element Modify",
        performance: "Performance",
        userAction: "User Action",
        
        // Storage Service messages
        storageServiceInitialized: "StorageService initialized",
        failedToSaveProject: "Failed to save project",
        projectSavedSuccessfully: "Project saved successfully",
        errorSavingProject: "Error saving project",
        projectNotFound: "Project not found",
        errorLoadingProject: "Error loading project",
        errorGettingProjects: "Error getting projects", 
        errorDeletingProject: "Error deleting project",
        errorClearingProjects: "Error clearing projects",
        autoSaveCompleted: "Auto-save completed",
        untitled: "Untitled",
        autoSaveFailed: "Auto-save failed",
        failedToLoadAutoSave: "Failed to load auto-save",
        errorExportingProject: "Error exporting project",
        invalidProjectFileFormat: "Invalid project file format",
        errorReadingFile: "Error reading file",
        
        // Canvas Renderer messages
        canvasRendererInitialized: "CanvasRenderer initialized",
        invalidNodeDetected: "Invalid node detected",
        canvasRender: "Canvas Render",
        errorRenderingCanvas: "Error rendering canvas",
        invalidTransitionDetected: "Invalid transition detected",
        invalidConnectionPoints: "Invalid connection points",
        errorRenderingTransition: "Error rendering transition",
        errorRenderingNode: "Error rendering node", 
        invalidTextElementDetected: "Invalid text element detected",
        errorRenderingText: "Error rendering text",
        failedToRenderDiagram: "Failed to render diagram",
        
        // Terminal Service messages
        terminalElementsNotFoundInDOM: "Terminal elements not found in DOM",
        scrollToBottomTerminalContentNotFound: "ScrollToBottom: Terminal content element not found",
        unknownCommand: "Unknown command",
        invalidSyntax: "Invalid syntax",
        elementNotFound: "Element not found",
        invalidId: "Invalid ID",
        fieldNotFound: "Field not found",
        noElementsFound: "No elements found in this project",
        invalidLogType: "Invalid log type",
        
        // Export Service messages
        exportServiceInitialized: "ExportService initialized",
        exportImageStarted: "Export Image Started",
        noProjectProvidedForExport: "No project provided for export",
        failedToGet2DContextForExportCanvas: "Failed to get 2D context for export canvas",
        exportCanvasCreated: "Export canvas created",
        fileSystemAccessApiFailed: "File System Access API failed, falling back",
        exportCancelledByUser: "Export cancelled by user",
        usingFallbackSaveMethod: "Using fallback save method",
        exportImage: "Export Image",
        imageExportCompleted: "Image export completed",
        failedToExportImage: "Failed to export image",
        
        // UI Controller messages
        exportImageError: "Export image error",
        exportError: "Export error",
        
        // System configuration messages
        systemConfiguration: "System Configuration",
        terminalSettings: "🖥️ Terminal Settings:",
        maxLines: "Max Lines:",
        visible: "Visible:",
        currentFilter: "Current Filter:",
        textFilter: "Text Filter:",
        none: "None",
        windowSettings: "🪟 Window Settings:",
        width: "Width:",
        height: "Height:",
        devicePixelRatio: "Device Pixel Ratio:",
        screen: "Screen:",
        applicationState: "📱 Application State:",
        appAvailable: "App Available:",
        containerAvailable: "Container Available:",
        localStorage: "Local Storage:",
        sessionStorage: "Session Storage:",
        available: "Available",
        notAvailable: "Not Available",
        
        // Backup messages
        projectBackupCreated: "✅ Project backup created successfully!",
        filename: "📄 Filename:",
        elementsBackedUp: "📊 Elements backed up:",
        failedToCreateBackup: "❌ Failed to create backup:",
        
        // Cleanup messages
        cleanupOperation: "🧹 Cleanup Operation",
        cleanedOldCommands: "🗑️ Cleaned $1 old command entries",
        cleanedOldLogs: "🗑️ Cleaned $1 old log entries",
        removedTempElements: "🗑️ Removed $1 temporary DOM elements",
        systemAlreadyClean: "✨ System is already clean. No cleanup needed.",
        cleanupCompleted: "✅ Cleanup completed. $1 operations performed.",
        
        // Ping messages
        testingResponsiveness: "📡 Testing system responsiveness...",
        pingResults: "📡 Ping Results",
        responseTime: "🔹 Response Time:",
        domAccess: "🔹 DOM Access:",
        projectAccess: "🔹 Project Access:",
        terminalState: "🔹 Terminal State:",
        browserStatus: "🔹 Browser:",
        ok: "✅ OK",
        failed: "❌ Failed",
        active: "✅ Active",
        hidden: "⚠️ Hidden",
        online: "✅ Online",
        offline: "❌ Offline",
        performanceExcellent: "🚀 System performance: Excellent",
        performanceGood: "⚡ System performance: Good",
        performanceSlow: "⚠️ System performance: Slow",
        
        // Error logs messages
        recentErrors: "🚨 Recent Errors",
        noRecentErrors: "✅ No recent errors found. System is running smoothly!",
        foundErrors: "📊 Found $1 error(s) in terminal history:",
        andMoreErrors: "... and $1 more errors (showing last 10)",
        
        // Memory info messages
        memoryUsage: "Memory Usage",
        usedMemory: "🔹 Used Memory:",
        totalMemory: "🔹 Total Memory:",
        memoryLimit: "🔹 Memory Limit:",
        usage: "🔹 Usage:",
        memoryNotAvailable: "⚠️ Memory information not available in this browser.",
        terminalMemory: "📊 Terminal Memory:",
        historyLines: "🔹 History Lines:",
        commandHistory: "🔹 Command History:",
        maxLinesLimit: "🔹 Max Lines Limit:",
        
        // Performance metrics messages
        performanceMetrics: "Performance Metrics",
        pageLoadTime: "🔹 Page Load Time:",
        domReadyTime: "🔹 DOM Ready Time:",
        currentTime: "🔹 Current Time:",
        performanceNow: "🔹 Performance Now:",
        browserInfo: "🌐 Browser Info:",
        userAgent: "🔹 User Agent:",
        platform: "🔹 Platform:",
        language: "🔹 Language:",
        cores: "🔹 Cores:",
        unknown: "Unknown",
        
        // Project validation messages
        projectValidation: "Project Validation",
        projectValidationSuccess: "✅ Project validation completed successfully!",
        noIssuesFound: "🎉 No issues found. Project integrity is good.",
        errorsFound: "❌ ERRORS FOUND:",
        warnings: "⚠️ WARNINGS:",
        validationSummary: "📊 Validation Summary:",
        errors: "Errors:",
        totalElementsChecked: "Total Elements Checked:",
        duplicateIds: "Duplicate IDs found:",
        orphanedTransition: "Transition $1 references non-existent source node $2",
        orphanedTransitionTarget: "Transition $1 references non-existent target node $2",
        emptyLabelsWarning: "$1 elements have empty labels"
    },
    
    pl: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Komponenty",
        nodes: "Wezly",
        texts: "Teksty",
        transitions: "Przejscia",
        
        // Node types
        process: "Proces",
        start: "Start",
        stop: "Stop",
        decision: "Decyzja",
        data: "Dane",
        dataModel: "Model Danych",
        singleWay: "Droga Pojedyncza",
        dualWay: "Droga Podwojna",
        line: "Linia",
        
        // Bottom navigation
        newProject: "Nowy Projekt",
        saveProject: "Zapisz Projekt",
        loadProject: "Wczytaj Projekt",
        exportImage: "Eksportuj Obraz",
        exportFile: "Eksportuj Plik",
        importFile: "Importuj Plik",
        removeSelected: "Usun Zaznaczone",
        save: "Zapisz",
        load: "Wczytaj",
        clear: "Wyczysc Wszystko",
        
        // Export options
        exportOptions: "Opcje Eksportu",
        whiteBackground: "Biale Tlo",
        transparentBackground: "Przezroczyste Tlo",
        
        // Save dialog
        saveProjectTitle: "Zapisz Projekt",
        projectName: "Nazwa Projektu",
        save: "Zapisz",
        cancel: "Anuluj",
        enterProjectName: "Wprowadz nazwe projektu...",
        saveAsPrivate: "Zapisz jako projekt prywatny",
        projectNameRequired: "Nazwa projektu jest wymagana",
        passwordRequired: "Haslo jest wymagane dla projektow prywatnych",
        projectPassword: "Haslo Projektu",
        enterPasswordPlaceholder: "Wprowadz haslo dla projektu prywatnego...",
        rememberPassword: "Zapamietaj to haslo - nie mozna go odzyskac!",
        
        // Project status messages
        publicProjectSaved: "Projekt publiczny zapisany pomyslnie!",
        privateProjectSaved: "Projekt prywatny zapisany pomyslnie!",
        publicProjectLoaded: "Projekt publiczny wczytany pomyslnie!",
        privateProjectLoaded: "Projekt prywatny wczytany pomyslnie!",
        newPublicProject: "Nowy projekt publiczny utworzony i zapisany!",
        newPrivateProject: "Nowy projekt prywatny utworzony i zapisany!",
        
        // Dialog titles and actions
        loadProjectTitle: "Wczytaj Projekt",
        createNewProjectTitle: "Utworz Nowy Projekt", 
        deleteProjectTitle: "Usun Projekt",
        deleteAllProjectsTitle: "Usun Wszystkie Projekty",
        clearCurrentProjectTitle: "Wyczysc Obecny Projekt",
        close: "Zamknij",
        load: "Wczytaj",
        delete: "Usun",
        createProject: "Utworz Projekt",
        deleteProjectConfirm: "Czy na pewno chcesz usunac projekt",
        actionCannotBeUndone: "Ta akcja nie moze zostac cofnieta.",
        
        // Password dialog
        enterPasswordTitle: "Wprowadz Haslo",
        enterPasswordMessage: "Prosze wprowadzic haslo dla projektu:",
        enterPasswordPlaceholder2: "Wprowadz haslo...",
        unlock: "Odblokuj",
        passwordCannotBeEmpty: "Haslo nie moze byc puste",
        incorrectPassword: "Nieprawidlowe haslo. Sprobuj ponownie.",
        confirm: "Potwierdz",
        
        // Load dialog
        noProjectsFound: "Nie znaleziono zapisanych projektow",
        noProjectsMatchingSearch: "Nie znaleziono projektow pasujacych do wyszukiwania",
        clearAllProjectsConfirm: "Czy na pewno chcesz usunac <strong>WSZYSTKIE</strong> zapisane projekty i wyczyscic plotno?<br><br><strong>Ta akcja nie moze zostac cofnieta!</strong>",
        createFirstDiagram: "Utworz swoj pierwszy diagram, aby rozpoczac",
        
        // UI Controls and buttons
        clearCanvas: "Wyczysc Plotno",
        clearCanvasConfirm: "Czy na pewno chcesz wyczyscic wszystkie elementy z plotna?<br><br><strong>Ta akcja nie moze zostac cofnieta.</strong>",
        canvasClearedSuccessfully: "Plotno wyczyszczone pomyslnie!",
        allProjectsClearedSuccessfully: "Wszystkie projekty i plotno wyczyszczone pomyslnie!",
        whiteBackground: "biale tlo",
        transparentBackground: "przezroczyste tlo", 
        imageExportedSuccessfully: "Obraz wyeksportowany pomyslnie z",
        projectExportedSuccessfully: "Projekt wyeksportowany pomyslnie!",
        noContentToExport: "Brak tresci do eksportu. Prosze najpierw utworzyc elementy.",
        showGrid: "Pokaz Siatke",
        hideGrid: "Ukryj Siatke",
        showRulers: "Pokaz Linijki", 
        hideRulers: "Ukryj Linijki",
        noProjectLoaded: "Brak Wczytanego Projektu",
        
        // Error messages and dialogs
        failedToExport: "Nie udalo sie wyeksportowac projektu. Sprobuj ponownie.",
        errorExportingImage: "Blad podczas eksportowania obrazu. Sprobuj ponownie.",
        errorExportingProject: "Blad podczas eksportowania projektu. Sprobuj ponownie.",
        errorImportingProject: "Blad podczas importowania projektu. Sprawdz format pliku.",
        incorrectPasswordImportCancelled: "Nieprawidlowe haslo. Import anulowany.",
        importCancelled: "Import anulowany.",
        clearCurrentProjectConfirm: "Tworzenie nowego projektu wyczysci biezace plotno.<br><br>Czy chcesz kontynuowac?",
        
        // Export dialog
        exportProject: "Eksportuj Projekt",
        exportAsLcpFile: "Eksportuj jako plik .lcp",
        exportImageMenu: "Eksportuj Obraz",
        whiteBackgroundBtn: "Biale Tlo",
        transparentBackgroundBtn: "Przezroczyste Tlo",
        
        custom: "Niestandardowy",
        private: "PRYWATNY",
        public: "PUBLICZNY",
        makeProjectPrivate: "Ustaw ten projekt jako prywatny",
        page: "Strona",
        of: "z",
        
        // Data Model Editor
        fieldSpecificErrors: "Bledy specyficzne dla pol:",
        unnamedField: "Pole bez nazwy",
        unknownField: "Nieznane pole",
        pleaseFixErrors: "Prosze naprawic te bledy przed zapisaniem.",
        
        // Context Menu
        nodeId: "ID Wezla",
        textId: "ID Tekstu",
        transitionId: "ID Przejscia", 
        dataModelId: "ID Modelu Danych",
        type: "Typ",
        label: "Etykieta",
        position: "Pozycja",
        rotation: "Obrot",
        fields: "Pola",
        style: "Styl",
        copyIdToClipboard: "Kopiuj ID do schowka",
        showInTerminal: "Pokaz w terminalu",
        changeColor: "Zmien kolor",
        editDataModel: "Edytuj model danych",
        rotateClockwise: "Obroc w prawo",
        rotateCounterClockwise: "Obroc w lewo",
        convertToCurved: "Konwertuj na zakrzywione",
        convertToStraight: "Konwertuj na proste",
        
        // Data Model Editor specific
        clickAddFieldToStart: "Kliknij \"Dodaj Pole\" aby rozpoczac prace z modelem danych",
        fieldNamePlaceholder: "Nazwa pola...",
        selectFieldType: "Wybierz typ pola...",
        initialValuePlaceholder: "Wartosc poczatkowa...",
        deleteField: "Usun pole",
        moveUp: "Przenies w gore",
        moveDown: "Przenies w dol", 
        duplicateField: "Duplikuj pole",
        stringType: "Tekst",
        numberType: "Liczba",
        booleanType: "Wartosc logiczna",
        dateType: "Data",
        emailType: "Email",
        urlType: "URL",
        phoneType: "Telefon",
        currencyType: "Waluta",
        countryCodeType: "Kod kraju",
        languageCodeType: "Kod jezyka",
        creditCardType: "Karta kredytowa",
        
        // Node labels
        nodeStart: "START",
        nodeStop: "STOP",
        nodeIf: "JESLI",
        nodeDefault: "Wezel",
        labelTrue: "PRAWDA",
        labelFalse: "FALSZ",
        labelStep1: "Krok1",
        labelStep2: "Krok2",
        
        // Data Model Editor placeholders
        enterModelName: "Wprowadz nazwe modelu",
        jsonSchemaWillAppear: "Schemat JSON pojawi sie tutaj...",
        describeModel: "Opisz co reprezentuje ten model...",
        fieldNamePlaceholder2: "nazwa_pola",
        
        // Data Model Editor interface
        editDataModel: "Edytuj Model Danych",
        defineFieldsAndStructure: "Zdefiniuj pola i strukture dla twojego modelu danych",
        modelName: "Nazwa Modelu",
        modelId: "ID Modelu",
        copyId: "Kopiuj ID",
        jsonSchema: "Schemat JSON",
        acceptJson: "Zaakceptuj JSON",
        copyJson: "Kopiuj JSON",
        jsonEditInstructions: "Mozesz edytowac JSON ponizej lub wkleic wlasny schemat i kliknac \"Zaakceptuj JSON\" aby zastosowac zmiany",
        modelSettings: "Ustawienia Modelu",
        description: "Opis",
        validationRules: "Reguly Walidacji",
        modelType: "Typ Modelu",
        requireAllFields: "Wymagaj wszystkie pola",
        enableValidation: "Wlacz walidacje",
        allowNullValues: "Zezwol na wartosci null",
        entity: "Encja",
        dataTransferObject: "Obiekt Transferu Danych",
        viewModel: "Model Widoku",
        document: "Dokument",
        validationErrors: "Bledy Walidacji",
        saveChanges: "Zapisz Zmiany",
        options: "Opcje",
        noFieldsDefinedYet: "Nie zdefiniowano jeszcze zadnych pol",
        selectValue: "Wybierz...",
        selectCountry: "Wybierz kraj...",
        selectLanguage: "Wybierz jezyk...",
        selectTimezone: "Wybierz strefe czasowa...",
        
        // Validation messages
        validationErrorsInModel: "W tym modelu wystepuja bledy walidacji:",
        sureToCloseWithoutSaving: "Czy na pewno chcesz zamknac bez zapisywania? Wszystkie zmiany zostana utracone.",
        modelNameRequired: "Nazwa modelu jest wymagana",
        modelNameTooLong: "Nazwa modelu nie moze przekraczac 50 znakow",
        securityViolation: "Naruszenie bezpieczenstwa:",
        
        // JSON validation messages
        errorGeneratingJson: "Blad podczas generowania JSON:",
        pleaseEnterJsonSchema: "Prosze wprowadzic schemat JSON do zaakceptowania",
        jsonTooLarge: "Zawartosc JSON jest zbyt duza. Maksymalny rozmiar to 100KB",
        jsonTooDeep: "Struktura JSON jest zbyt gleboka. Maksymalna glebokosc to 10 poziomow",
        tooManyProperties: "Zbyt wiele wlasciwosci. Maksimum to 100 pol na model",
        invalidJson: "Nieprawidlowy JSON:",
        jsonDangerousScript: "JSON zawiera potencjalnie niebezpieczna zawartosc skryptu",
        jsonDangerousSQL: "Wartosci tekstowe JSON zawieraja potencjalnie niebezpieczne wzorce SQL",
        schemaMustBeObject: "Schemat musi byc prawidlowym obiektem JSON",
        schemaMustHaveProperties: "Schemat musi zawierac obiekt \"properties\"",
        schemaMinimumOneProperty: "Schemat musi zawierac przynajmniej jedna wlasciwosc",
        fieldNamesCannotBeEmpty: "Nazwy pol nie moga byc puste",
        fieldMustHaveType: "musi miec typ",
        fieldInvalidType: "ma nieprawidlowy typ:",
        requiredMustBeArray: "\"required\" musi byc tablica",
        requiredFieldNotFound: "Wymagane pole \"${field}\" nie znalezione we wlasciwosciach",
        jsonAutoSynchronized: "JSON automatycznie zsynchronizowany z polami",
        jsonCopiedToClipboard: "JSON skopiowany do schowka",
        
        // Boolean values
        trueValue: "Prawda",
        falseValue: "Falsz",
        
        // Load projects
        loadProjectTitle: "Wczytaj Projekt",
        recentProjects: "Ostatnie Projekty",
        searchProjects: "Szukaj projektow...",
        noProjectsFound: "Nie znaleziono projektow",
        projectCreated: "Utworzony",
        projectModified: "Zmodyfikowany",
        load: "Wczytaj",
        delete: "Usun",
        
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
        initialValue: "Wartosc Poczatkowa",
        
        // Terminal
        terminal: "Terminal",
        terminalToggle: "Przelacz Terminal",
        terminalClear: "Wyczysc Terminal",
        terminalClose: "Zamknij Terminal",
        terminalExport: "Eksportuj Logi",
        
        // InputService translations
        inputServiceInitialized: "InputService zainicjalizowany",
        errorShowingNodeInput: "Blad podczas pokazywania wejscia wezla",
        failedToShowNodeEditor: "Nie udalo sie pokazac edytora wezla",
        showTextInputCalled: "showTextInput wywolane",
        inputPositioning: "Pozycjonowanie wejscia",
        inputSetupCompleted: "Konfiguracja wejscia zakonczona",
        errorShowingTextInput: "Blad podczas pokazywania wejscia tekstowego",
        
        // GridService translations
        gridServiceInitialized: "GridService zainicjalizowany",
        rulersToggled: "Linijki przelaczone",
        gridToggled: "Siatka przelaczona",
        gridSizeChanged: "Rozmiar siatki zmieniony",
        gridSnapChanged: "Przyciaganie siatki zmienione",
        smartGuidesChanged: "Inteligentne prowadnice zmienione",
        gridServiceDestroyed: "GridService zniszczony",
        
        // MultiSelectionManager translations
        multiSelectionManagerInitialized: "MultiSelectionManager zainicjalizowany",
        selectionRectangleStarted: "Prostokat zaznaczenia rozpoczety",
        errorStartingSelection: "Blad podczas rozpoczynania zaznaczenia",
        failedToStartSelection: "Nie udalo sie rozpoczac zaznaczenia",
        endSelectionCalled: "endSelection wywolane",
        selectionRect: "Prostokat zaznaczenia",
        nodeSelected: "Wezel zaznaczony",
        textSelected: "Tekst zaznaczony",
        transitionSelected: "Przejscie zaznaczone",
        selectionRectangleDeactivated: "Prostokat zaznaczenia deaktywowany",
        multiSelectionCompleted: "Wieloselekcja zakonczona",
        errorEndingSelection: "Blad podczas konczenia zaznaczenia",
        failedToCompleteSelection: "Nie udalo sie zakonczyc zaznaczenia",
        errorCheckingElementInRect: "Blad podczas sprawdzania elementu w prostokacie",
        errorCheckingTextInRect: "Blad podczas sprawdzania tekstu w prostokacie",
        errorCheckingTransitionInRect: "Blad podczas sprawdzania przejscia w prostokacie",
        groupDragStarted: "Grupowe przeciÄ…ganie rozpoczÄ™te",
        errorStartingGroupDrag: "Bladd podczas rozpoczynania grupowego przeciÄ…gania",
        failedToStartGroupDrag: "Nie udalo sie rozpoczÄ…Ä‡ grupowego przeciÄ…gania",
        groupDragCompleted: "Grupowe przeciÄ…ganie zakonczone",
        elementDeselected: "Element odznaczony",
        elementSelected: "Element zaznaczony",
        selectionCleared: "Zaznaczenie wyczyszczone",
        
        // BreakPointService translations
        breakPointServiceInitialized: "BreakPointService zainicjalizowany",
        errorFindingBreakPointAtPosition: "Blad podczas wyszukiwania punktu przerwania na pozycji",
        failedToFindBreakPoint: "Nie udalo sie znalesc punktu przerwania",
        breakPointMoved: "Punkt przerwania przeniesiony",
        errorMovingBreakPoint: "Blad podczas przenoszenia punktu przerwania",
        failedToMoveBreakPoint: "Nie udalo sie przeniesc punktu przerwania",
        multipleBreakPointsMoved: "Wiele punktĂlw przerwania przeniesionych",
        errorMovingMultipleBreakPoints: "Blad podczas przenoszenia wielu punktĂlw przerwania",
        failedToMoveBreakPoints: "Nie udalo sie przeniesc punktĂlw przerwania",
        errorGettingSelectedBreakPoints: "Blad podczas pobierania zaznaczonych punktĂlw przerwania",
        breakPointsUpdatedForNodeMovement: "Punkty przerwania zaktualizowane dla ruchu wezla",
        errorUpdatingBreakPointsForMovedNode: "Blad podczas aktualizacji punktĂlw przerwania dla przeniesionego wezla",
        failedToUpdateBreakPoints: "Nie udalo sie zaktualizowaÄ‡ punktĂlw przerwania",
        breakPointsUpdatedForGroupNodeMovement: "Punkty przerwania zaktualizowane dla grupowego ruchu wÄ™zĹ‚Ălw",
        errorUpdatingBreakPointsForMovedNodes: "Blad podczas aktualizacji punktĂlw przerwania dla przeniesionych wÄ™zĹ‚Ălw",
        
        // EventBus and DiagramController translations
        errorInEventListener: "Blad w nasluchiwaczu zdarzen",
        diagramControllerInitialized: "DiagramController zainicjalizowany",
        transitionDrawingModeStarted: "Tryb rysowania przejscia rozpoczety",
        transitionDrawingCancelled: "Rysowanie przejscia anulowane",
        transitionDrawingCompleted: "Rysowanie przejscia zakonczone",
        mouseDownAt: "Mysz nacisnieta na",
        currentlyEditingCompletingEdit: "Obecnie edytowane - koĹ„czenie edycji",
        
        // Transition model translations
        transitionMissingFromOrToNode: "Przejscie brakuje wezla prawidlowego lub docelowego",
        transitionNodesMissingCoordinates: "Wezlom przejscia brakuje wspolrzednych",
        blockedStyleToggleForIFTransition: "Zablokowano zmianÄ™ stylu dla przejscia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        transitionStyleToggled: "Styl przejscia przelaczony",
        blockedBreakPointForIFTransition: "Zablokowano punkt przerwania dla przejscia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        breakPointAdded: "Punkt przerwania dodany",
        breakPointRemoved: "Punkt przerwania usuniÄ™ty",
        allBreakPointsCleared: "Wszystkie punkty przerwania wyczyszczone",
        
        // Project model translations
        duplicateTransitionPrevented: "ZapobieĹĽono duplikatowi przejscia",
        lookingForTextAtPosition: "Szukanie tekstu na pozycji",
        foundTextElement: "Znaleziono element tekstowy",
        noTextFoundAtPosition: "Nie znaleziono tekstu na pozycji",
        
        // InputService translations
        errorShowingTransitionInput: "Blad podczas pokazywania wprowadzania przejscia",
        createInputCalled: "createInput wywolane",
        creatingNewInputElement: "Tworzenie nowego elementu wprowadzania",
        reusingExistingInputElement: "Ponowne uĹĽycie istniejÄ…cego elementu wprowadzania",
        inputElementConfigured: "Element wprowadzania skonfigurowany",
        setupInputCalled: "setupInput wywolane",
        inputCompleted: "Wprowadzanie zakonczone",
        inputTooLongTruncating: "Wprowadzanie zbyt dlugie, skracanie",
        inputSanitized: "Wprowadzanie oczyszczone",
        settingLabel: "Ustawianie etykiety",
        settingTransitionLabel: "Ustawianie etykiety przejscia",
        hidingActiveInput: "Ukrywanie aktywnego wprowadzania",
        inputServiceDestroyed: "InputService zniszczone",
        
        // ExportService translations
        errorInFallbackExport: "Blad w eksporcie zapasowym",
        
        // DiagramController debug translations
        mouseDownInternal: "Wewnetrzne nacisniecie myszy",
        ctrlClickOnNode: "Ctrl+klik na wezel",
        ctrlClickOnText: "Ctrl+klik na tekst",
        ctrlClickOnBreakPoint: "Ctrl+klik na punkt przerwania - dodaj Przejscie do selekcji",
        ctrlClickOnTransition: "Ctrl+klik na Przejscie",
        groupDragStartNode: "Start przeciÄ…gania grupy - wezel",
        groupDragStartText: "Start przeciÄ…gania grupy - tekst",
        singleClickOnNodeStartDragging: "Pojedynczy klik na wezel - start przeciÄ…gania",
        singleClickOnTextStartDragging: "Pojedynczy klik na tekst - start przeciÄ…gania",
        singleClickOnBreakPointStartDragging: "Pojedynczy klik na punkt przerwania - start przeciÄ…gania",
        singleClickOnTransition: "Pojedynczy klik na Przejscie",
        clickOnEmptySpaceStartRectangleSelection: "Klik na pustÄ… przestrzeĹ„ - start prostokÄ…tnej selekcji",
        startDragging: "Start przeciÄ…gania",
        startDraggingBreakPoint: "Start przeciÄ…gania punktu przerwania",
        startDraggingTransition: "Start przeciÄ…gania przejscia",
        transitionStartNodeSelected: "Wybrano wezel startowy przejscia",
        transitionCancelledSameNodeClicked: "Przejscie anulowane - ten sam wezel klikniÄ™ty dwukrotnie",
        doubleClickAt: "PodwĂljny klik na",
        doubleClickOnNode: "PodwĂljny klik na wezel",
        doubleClickOnText: "PodwĂljny klik na tekst",
        doubleClickOnTransition: "PodwĂljny klik na Przejscie",
        rotatingIfNodeCounterClockwise: "Obracanie wezla IF przeciwnie do ruchu wskazĂlwek zegara",
        foundTransitionsForCounterClockwiseRotation: "Znaleziono przejscia dla obrotu przeciwnego do ruchu wskazĂlwek",
        missingTransitionsForIfCounterClockwiseRotation: "BrakujÄ…ce przejscia dla obrotu IF przeciwnego do ruchu wskazĂlwek",
        blockingOptionsForIfTransition: "Blokowanie opcji dla przejscia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        rotatingIfNode: "Obracanie wezla IF",
        foundTransitionsForRotation: "Znaleziono przejscia dla obrotu",
        missingTransitionsForIfRotation: "BrakujÄ…ce przejscia dla obrotu IF",
        transitionStyleToggled: "Przelaczono styl przejscia",
        breakPointAddedToTransition: "Dodano punkt przerwania do przejscia",
        breakPointRemovedFromTransition: "UsuniÄ™to punkt przerwania z przejscia",
        allBreakPointsClearedFromTransition: "Wszystkie punkty przerwania usuniÄ™te z przejscia",
        startNodeIsNull: "StartNode jest null podczas prĂlby utworzenia przejscia",
        transitionCreatedSuccessfully: "Przejscie utworzone pomyslnie",
        transitionCreationFailedOrDuplicate: "Utworzenie przejscia nie powiodlo sie lub wykryto duplikat",
        cannotCreateTransitionInvalidNodes: "Nie mozna utworzyÄ‡ przejscia - nieprawidlowe wezly",
        transitionAlreadyExistsBetweenNodes: "Przejscie juĹĽ istnieje miÄ™dzy tymi wezlami",
        
        // Additional DiagramController debug translations
        startDraggingBreakPoint: "Start przeciÄ…gania punktu przerwania",
        elementEditedEventReceived: "Otrzymano zdarzenie edycji elementu",
        dataModelUpdatedEventReceived: "Otrzymano zdarzenie aktualizacji modelu danych",
        breakPointMovedEventReceived: "Otrzymano zdarzenie przesuniÄ™cia punktu przerwania",
        multipleBreakPointsMovedEventReceived: "Otrzymano zdarzenie przesuniÄ™cia wielu punktĂlw przerwania",
        autoSavedToNamedProject: "Auto-zapisano do nazwanego projektu",
        autoSaveTriggeredAfterModification: "Auto-zapis uruchomiony po modyfikacji",
        
        // Terminal filter options
        allMessages: "Wszystkie Wiadomosci",
        errorsOnly: "Tylko Bledy",
        warningsOnly: "Tylko Ostrzezenia", 
        infoOnly: "Tylko Informacje",
        debugOnly: "Tylko Debug",
        canvasDrops: "Upuszczenia na Plotno",
        textControls: "Kontrolki Tekstu",
        elementMoves: "Przesuniecia Elementów",
        elementModifications: "Modyfikacje Elementów",
        
        // Language switcher
        selectLanguage: "Wybierz Jezyk",
        
        // Common
        yes: "Tak",
        no: "Nie",
        ok: "OK",
        close: "Zamknij",
        edit: "Edytuj",
        remove: "Usun",
        duplicate: "Duplikuj",
        search: "Szukaj",
        filterText: "Filtruj tekst...",
        
        // Tooltips
        englishFlag: "Angielski",
        polishFlag: "Polski",
        basicNodeTooltip: "Podstawowy wezel - przeciagnij na kanwe aby dodac element procesu",
        textElementTooltip: "Element tekstowy - dodaje etykiety i opisy do diagramu",
        startPointTooltip: "Punkt startowy procesu - oznacza poczÄ…tek diagramu",
        endPointTooltip: "Punkt koncowy procesu - oznacza zakoĹ„czenie diagramu",
        logicalConditionTooltip: "Warunek logiczny - umozliwia rozgalezienie procesu na podstawie decyzji",
        dataModelTooltip: "Model danych - definiuje strukturÄ™ danych z polami i typami",
        singleConnectionTooltip: "Polaczenie jednostronne - tworzy strzalka w jednym kierunku",
        dualConnectionTooltip: "Polaczenie dwustronne - tworzy strzalki w obu kierunkach",
        straightLineTooltip: "Prosta linia - laczy elementy bez strzalki",
        toggleGridTooltip: "Wlacz/Wylacz siatke pomocnicza na kanwie",
        toggleRulersTooltip: "Wlacz/Wylacz linijki pomiarowe na kanwie",
        canvasTooltip: "Kanwa do rysowania - przeciagnij komponenty z lewego panelu, kliknij aby zaznaczyc, dwuklik aby edytowac",
        clearAllProjectsTooltip: "Usun wszystkie zapisane projekty z listy",
        searchProjectsTooltip: "Wpisz nazwe projektu aby go znalezc na liscie",
        toggleTerminalTooltip: "Pokaz/ukryj terminal konsoli",
        removeSelectedTooltip: "Usun zaznaczone elementy z diagramu",
        newProjectTooltip: "UtwĂlrz nowy projekt - czysci kanwe i rozpoczyna od zera",
        saveProjectTooltip: "Zapisz aktualny projekt w przegladarce",
        loadProjectTooltip: "Wczytaj zapisany projekt z pliku",
        clearCanvasTooltip: "Wczytaj cala kanwe - usun wszystkie elementy",
        exportImageTooltip: "Eksportuj diagram jako obraz PNG",
        exportFileTooltip: "Eksportuj projekt jako plik JSON",
        importFileTooltip: "Importuj projekt z pliku JSON",
        resizeTerminalTooltip: "Przeciagnij aby zmienic wysokosc terminala",
        filterMessagesByTextTooltip: "Filtruj wiadomosci wedlug tekstu",
        filterMessagesByTypeTooltip: "Filtruj wiadomosci wedlug typu",
        exportLogsTooltip: "Eksportuj logi do pliku",
        clearTerminalTooltip: "Wczytaj terminal",
        closeTerminalTooltip: "Zamknij terminal",
        enterCommandTooltip: "Wpisz komende i nacisnij Enter",
        typeCommandPlaceholder: "Wpisz komende...",
        
        // Terminal messages
        terminalInitialized: "Serwis terminala zostal pomyslnie zainicjalizowany.",
        canvasDropTracking: "Sledzenie upuszczania na plotno wlaczone - wszystkie operacje przeciagnij i upusc beda tutaj logowane.",
        typeHelpForCommands: "Wpisz \"help\" aby zobaczyc Dostepne komendy.",
        terminalHelpTitle: "TERMINAL DIAVINCI - Dostepne Komendy",
        basicCommands: "PODSTAWOWE KOMENDY:",
        helpCommand: "help          - Pokaz tam wiadomosci pomocy",
        clearCommand: "clear         - Wczytaj output terminala",
        statusCommand: "status        - Pokaz status systemu",
        exportCommand: "export        - Eksportuj logi do pliku",
        versionCommand: "version       - Pokaz wersje aplikacji",
        timeCommand: "time          - Pokaz aktualny czas",
        historyCommand: "history       - Pokaz historiÄ™ komend",
        resetCommand: "reset         - Resetuj stan aplikacji",
        searchInspect: "SZUKANIE I INSPEKCJA:",
        findCommand: "find <id>     - ZnajdĹş element po ID",
        searchCommand: "search <text> - Szukaj elementĂlw po etykiecie/nazwie",
        inspectCommand: "inspect <id>  - Pokaz szczegolowe info o elemencie",
        listElementsCommand: "list elements - Listuj wszystkie elementy z ID",
        listNodesCommand: "list nodes    - Listuj tylko wezly",
        listTextsCommand: "list texts    - Listuj tylko elementy tekstowe",
        listTransCommand: "list trans    - Listuj tylko przejscia",
        countCommand: "count         - Policz wszystkie elementy projektu",
        analyticsCommands: "ANALITYKA:",
        statsCommand: "stats         - Pokaz szczegolowe statystyki projektu",
        memoryCommand: "memory        - Pokaz informacje o uĹĽyciu pamiÄ™ci",
        performanceCommand: "performance   - Pokaz metryki wydajnosci",
        validateCommand: "validate      - Zwaliduj integralnosc projektu",
        debuggingCommands: "DEBUGOWANIE:",
        debugCommand: "debug on/off  - Przelacz logowanie debug",
        debugProjectCommand: "debug project - Pokaz info debug projektu",
        debugNodesCommand: "debug nodes   - Pokaz wszystkie wezly z typami",
        logsCommand: "logs <type>   - Filtruj logi po typie",
        traceCommand: "trace <id>    - Sledz relacje elementu",
        errorsCommand: "errors        - Pokaz ostatnie logi bledow",
        dataModelCommands: "MODEL DANYCH:",
        fieldsCommand: "fields <id>   - Listuj wszystkie pola modelu danych",
        fieldCommand: "field <id> <name> - Pobierz wartosci pola z modelu",
        modelsCommand: "models        - Listuj wszystkie wezly modelu danych",
        quickFieldAccess: "ID.nazwa_pola - Szybki dostep do pola (np. 123.name)",
        tabAutocomplete: "Uzyj TAB po kropce dla autouzupelniania",
        systemCommands: "SYSTEM:",
        configCommand: "config        - Pokaz konfiguracje systemu",
        backupCommand: "backup        - Utworz kopie zapasowa projektu",
        cleanupCommand: "cleanup       - Oczysc dane tymczasowe",
        pingCommand: "ping          - Testuj responsywnosc systemu",
        logsExported: "Logi wyeksportowane do",
        entriesCount: "wpisów",
        failedToExport: "Nie udalo sie wyeksportowac logow:",
        functionFailed: "Funkcja nie powiodla sie:",
        stackTrace: "Slad stosu:",
        availableFields: "Dostepne pola dla elementu",
        basicFields: "Podstawowe:",
        nestedFields: "Zagniezdzone:",
        noFieldsMatch: "Zadne pola nie pasuja do",
        elementNotFound: "Element o ID nie zostal znaleziony.",
        availableCompletions: "Dostepne uzupelnienia:",
        noCommandsMatch: "Zadne komendy nie pasuja do",
        moreFields: "Wiecej pol",
        andMoreFields: "... i",
        useFieldsToSeeAll: "Uzyj \"fields",
        toSeeAllFields: "\" aby zobaczyc wszystkie pola",
        field: "pole",
        fields: "pola",
        
        // Terminal command messages
        terminalClearedByUser: "Terminal wyczyszczony przez uzytkownika.",
        systemStatus: "⚡ Status Systemu:",
        terminalLines: "🔹 Linie terminala:",
        activeFilter: "🔹 Aktywny filtr:",
        terminalVisible: "🔹 Terminal widoczny:",
        maxLines: "🔹 Maksymalne linie:",
        browser: "🔹 Przegladarka:",
        yes: "Tak",
        no: "Nie",
        divinciTitle: "🎨 DIAVINCI - Projektant Przeplywu Danych",
        versionInfo: "📦 Wersja 1.0.0",
        copyrightInfo: "© 2025 DiAVinci Development",
        currentTime: "🕐 Aktualny czas:",
        commandHistoryTitle: "📚 Historia Polecen (ostatnie 10):",
        noCommandHistory: "❌ Brak dostepnej historii polecen.",
        logsExportedSuccess: "📄 Logi pomyslnie wyeksportowane do folderu pobran.",
        resetConfirmation: "⚠️  Czy jestes pewien, ze chcesz zresetowac? Wpisz \"reset confirm\" aby kontynuowac.",
        resetCompleted: "🔄 Resetowanie stanu aplikacji zakonczone.",
        welcomeBackMessage: "Witaj z powrotem w Terminalu DiAVinci!",
        debugModeEnabled: "🐛 Tryb debugowania wlaczony - aktywowano szczegolowe logowanie.",
        debugModeDisabled: "🔇 Tryb debugowania wylaczony - przywrocono normalne logowanie.",
        typeHelpForCommands: "💡 Wpisz \"help\" aby zobaczyc wszystkie dostepne polecenia.",
        invalidSyntaxField: "❌ Niepoprawna skladnia. Uzycie: field <data-model-id> <field-name>",
        invalidIdNumber: "❌ Niepoprawne ID: \"$1\". Musi byc liczba.",
        elementNotFoundById: "❌ Element o ID $1 nie zostal znaleziony.",
        provideElementId: "❌ Prosze podac ID elementu. Uzycie: find <id>",
        noActiveProject: "❌ Nie znaleziono aktywnego projektu. Upewnij sie, ze aplikacja jest w pelni zaladowana.",
        debuggingWindowApp: "🔧 Debugowanie: window.app dostepne?",
        debuggingWindowContainer: "🔧 Debugowanie: window.container dostepne?",
        searchingInProject: "🔍 Wyszukiwanie w projekcie z $1 wezlami, $2 tekstami, $3 przejsciami",
        elementFound: "✅ ELEMENT ZNALEZIONY",
        elementType: "🔹 Typ:",
        elementId: "🔹 ID:",
        elementLabel: "🔹 Etykieta:",
        elementPosition: "🔹 Pozycja:",
        elementSize: "🔹 Rozmiar:",
        elementColor: "🔹 Kolor:",
        nodeType: "🔹 Typ Wezla:",
        transitionFrom: "🔹 Z:",
        transitionTo: "🔹 Do:",
        transitionStyle: "🔹 Styl:",
        fieldsAvailable: "🔹 Pola: $1 pol dostepnych",
        useInspectForDetails: "💡 Uzyj \"inspect $1\" dla wiecej szczegolow",
        elementNotFound: "❌ ELEMENT NIE ZNALEZIONY",
        searchedId: "🔍 Wyszukiwane ID:",
        totalElements: "🔍 Calkowita liczba elementow:",
        similarMatchesFound: "🔍 Znaleziono podobne dopasowania:",
        moreMatches: "... i $1 wiecej dopasiowan",
        helpfulCommands: "💡 Pomocne polecenia:",
        listElementsHelp: "   • \"list elements\" - Zobacz wszystkie dostepne elementy",
        debugProjectHelp: "   • \"debug project\" - Pokaz strukture projektu",
        availableElementsFirst3: "📋 Dostepne elementy (pierwsze 3):",
        provideFindId: "❌ Prosze podac ID elementu. Uzycie: find <id>",
        provideInspectId: "❌ Prosze podac ID elementu. Uzycie: inspect <id>",
        detailedInspection: "🔍 SZCZEGOLOWA INSPEKCJA",
        positionCoords: "🔸 Pozycja: X:$1, Y:$2",
        sizePixels: "🔸 Rozmiar: $1 × $2 pikseli",
        background: "🔸 Tlo:",
        border: "🔸 Obramowanie:",
        transitionDetails: "🔗 Szczegoly Przejscia:",
        transitionFromTo: "   • Z: $1",
        transitionToFrom: "   • Do: $1",
        styleInfo: "   • Styl: $1",
        conditionInfo: "   • Warunek: $1",
        fieldsTotal: "📋 Pola ($1 calkowicie):",
        fieldDefault: "      └ Domyslne: $1",
        timestamps: "⏰ Znaczniki Czasu",
        created: "🔸 Utworzono: $1",
        modified: "🔸 Zmodyfikowano: $1",
        allProperties: "🔧 Wszystkie Wlasciwosci",
        jsonData: "📄 Dane JSON",
        quickActions: "💡 Szybkie Akcje:",
        copyJsonTip: "   • Kopiuj JSON: Uzyj narzedzi programisty przegladarki",
        findSimilarTip: "   • Znajdz podobne: \"list elements\" aby zobaczyc wszystkie",
        quickFindTip: "   • Szybkie znajdowanie: \"find <czesc-id>\" dla rozmytego wyszukiwania",
        inspectionFailed: "❌ Inspekcja Nieudana",
        targetId: "🔸 Docelowe ID:",
        searchType: "🔸 Typ Wyszukiwania:",
        projectElements: "🔸 Elementy Projektu:",
        partialIdMatches: "🎯 CZESCIOWE DOPASOWANIA ID:",
        labelMatches: "🏷️  DOPASOWANIA ETYKIET:",
        troubleshootingTips: "💡 WSKAZOWKI ROZWIAZYWANIA PROBLEMOW:",
        checkIdSpelling: "   • Sprawdz pisownie ID i rozroznianie wielkosci liter",
        useListElements: "   • Uzyj \"list elements\" dla pelnej listy elementow",
        tryDebugProject: "   • Sprobuj \"debug project\" dla przegladu projektu",
        sampleAvailableIds: "📋 PRZYKLADOWE DOSTEPNE ID:",
        andMoreElements: "   ... i $1 wiecej elementow",
        allProjectElements: "📋 Wszystkie Elementy Projektu",
        projectName: "🔸 Projekt:",
        totalNodes: "🔸 Calkowite Wezly:",
        totalTexts: "🔸 Calkowite Teksty:",
        totalTransitions: "🔸 Calkowite Przejscia:",
        nodes: "Wezly",
        textElements: "📝 Elementy Tekstowe ($1):",
        transitions: "🔗 Przejscia ($1):",
        positionDebug: "      └ Pozycja: ($1, $2)",
        transitionConnection: "      └ Z: $1 → Do: $2",
        noElementsFound: "📭 Nie znaleziono elementow w tym projekcie",
        summaryTotal: "📊 Podsumowanie: $1 elementow calkowicie",
        findSpecificElement: "   • \"find <id>\" - Znajdz konkretny element po ID",
        viewDetailedElement: "   • \"inspect <id>\" - Zobacz szczegolowe informacje o elemencie",
        searchElementsByText: "   • \"search <text>\" - Wyszukaj elementy po tresci tekstowej",
        projectDebugInfo: "🔧 INFORMACJE DEBUGOWE PROJEKTU",
        nodesCount: "🔷 Liczba Wezlow:",
        textsCount: "📝 Liczba Tekstow:",
        transitionsCount: "🔗 Liczba Przejsc:",
        nodesDetails: "🔷 SZCZEGOLY WEZLOW:",
        textsDetails: "📝 SZCZEGOLY TEKSTOW:",
        transitionsDetails: "🔗 SZCZEGOLY PRZEJSC:",
        typeLabel: "Typ: $1, Etykieta: \"$2\", ID: $3",
        
        // DataModelNode validation messages
        fieldNameRequired: "Nazwa pola jest wymagana",
        fieldNameDangerous: "Nazwa pola zawiera potencjalnie niebezpieczna tresc",
        fieldNameFormat: "Nazwa pola musi zaczynac sie od litery lub podkreslenia i zawierac tylko litery, cyfry i podkreslenia",
        fieldNameTooLong: "Nazwa pola nie moze przekraczac 25 znakow",
        fieldNameSqlPatterns: "Nazwa pola zawiera potencjalnie niebezpieczne wzorce SQL",
        fieldNameReserved: "Nazwa pola nie moze byc slowem zastrzezonym",
        valueDangerousScript: "Wartosc zawiera potencjalnie niebezpieczna tresc skryptu",
        valueDangerousSql: "Wartosc zawiera potencjalnie niebezpieczne wzorce SQL",
        valueTooLong: "Wartosc jest za dluga (maksymalnie 1000 znakow)",
        fieldNameMustBeUnique: "Nazwa pola musi byc unikalna",
        fieldNameCannotBeEmpty: "Nazwa pola nie moze byc pusta",
        fieldNameAlreadyInUse: "Nazwa pola '$1' jest juz uzywana",
        
        // Validation error messages
        invalidUuidFormat: "Nieprawidlowy format UUID: '$1'. Uzyj formatu: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        passwordTooShort: "Haslo musi miec co najmniej 6 znakow",
        invalidColorFormat: "Nieprawidlowy format koloru: '$1'. Uzyj hex (#ff0000), nazwy koloru lub rgb/rgba",
        
        // DataModelEditor validation messages
        securityViolation: "Naruszenie bezpieczenstwa",
        pleaseFixValidationErrors: "Prosze naprawic bledy walidacji",
        invalidJsonSchemaStructure: "Nieprawidlowa struktura schematu JSON",
        invalidJsonSyntax: "Nieprawidlowa skladnia JSON",
        jsonError: "Blad JSON",
        generalError: "Ogolny",
        fieldErrors: "Bledy pol",
        validJsonSchema: "Prawidlowy schemat JSON",
        warnings: "Ostrzezenia",
        missingTitle: "Brakuje tytulu",
        missingDescription: "Brakuje opisu",
        noPropertiesDefined: "Nie zdefiniowano wlasciwosci",
        duplicateFieldNames: "Duplikaty nazw pol",
        
        // SecurityConfig validation messages
        inputContainsDangerousScript: "Wejscie zawiera potencjalnie niebezpieczna tresc skryptu",
        inputContainsDangerousSQL: "Wejscie zawiera potencjalnie niebezpieczne wzorce SQL",
        inputContainsDangerousSystem: "Wejscie zawiera potencjalnie niebezpieczne wzorce dostepu do systemu",
        inputExceedsMaxLength: "Wejscie przekracza maksymalna dlugosc $1 znakow",
        
        // InputValidator validation messages
        inputContainsDangerousScriptPatterns: "Wejscie zawiera potencjalnie niebezpieczne wzorce skryptu",
        inputExceedsMaxLength100KB: "Wejscie przekracza maksymalna dlugosc 100KB",
        inputContainsUnsafeCharacters: "Wejscie zawiera niebezpieczne znaki",
        
        // DataModelNode validation messages
        modelNameRequired: "Nazwa modelu jest wymagana",
        modelNameTooLong: "Nazwa modelu nie moze przekraczac 50 znakow",
        modelMustHaveField: "Model musi miec co najmniej jedno pole",
        fixFieldValidationErrors: "Napraw bledy walidacji pol przed zapisaniem",
        
        // DataModelNode value validation messages
        invalidNumberFormat: "Nieprawidlowy format liczby: \"$1\"",
        invalidCurrencyFormat: "Nieprawidlowy format waluty: \"$1\". Uzyj formatu jak \"PLN 23\" lub \"23\"",
        booleanValueRequired: "Wartosc logiczna musi byc jedna z: $1",
        invalidDateFormat: "Nieprawidlowy format daty: \"$1\". Uzyj YYYY-MM-DD lub format ISO",
        invalidEmailFormat: "Nieprawidlowy format email: \"$1\"",
        invalidUrlFormat: "Nieprawidlowy format URL: \"$1\"",
        invalidPhoneFormat: "Nieprawidlowy format telefonu: \"$1\". Uzyj format miedzynarodowy (+1234567890)",
        invalidJsonObjectFormat: "Nieprawidlowy format obiektu JSON: \"$1\"",
        invalidJsonArrayFormat: "Nieprawidlowy format tablicy JSON: \"$1\"",
        valueNotValidJsonArray: "Wartosc musi byc prawidlowa tablica JSON: \"$1\"",
        invalidFileFormat: "Nieprawidlowy format pliku: \"$1\". Uzyj nazwy pliku z rozszerzeniem, data URL lub HTTP URL",
        invalidJsonFormat: "Nieprawidlowy format JSON: \"$1\"",
        invalidBase64Format: "Nieprawidlowy format Base64: \"$1\"",
        invalidIntegerFormat: "Nieprawidlowy format liczby calkowitej: \"$1\"",
        invalidDecimalFormat: "Nieprawidlowy format liczby dziesietnej: \"$1\"",
        invalidPercentageFormat: "Nieprawidlowy procent: \"$1\". Musi byc 0-100 lub 0%-100%",
        invalidDurationFormat: "Nieprawidlowy format czasu trwania: \"$1\". Uzyj formatow jak \"1h 30m\", \"90min\", \"2:30\" lub ISO 8601",
        invalidDateTimeFormat: "Nieprawidlowy format daty i czasu: \"$1\". Uzyj format ISO: YYYY-MM-DDTHH:mm:ss",
        invalidTimeFormat: "Nieprawidlowy format czasu: \"$1\". Uzyj format HH:mm lub HH:mm:ss",
        invalidTimestampFormat: "Nieprawidlowy timestamp: \"$1\". Musi byc liczba dodatnia",
        invalidIpv4Format: "Nieprawidlowy adres IPv4: \"$1\". Uzyj format: 192.168.1.1",
        invalidIpv6Format: "Nieprawidlowy adres IPv6: \"$1\"",
        invalidMacFormat: "Nieprawidlowy adres MAC: \"$1\". Uzyj format: XX:XX:XX:XX:XX:XX lub XX-XX-XX-XX-XX-XX",
        invalidCreditCardFormat: "Nieprawidlowy numer karty kredytowej: \"$1\". Musi miec 13-19 cyfr",
        invalidIbanFormat: "Nieprawidlowy IBAN: \"$1\". Uzyj format: CC22BBBBSSSSCCCCCCCCCCCC",
        invalidCountryCodeFormat: "Nieprawidlowy kod kraju: \"$1\". Uzyj format ISO 3166-1 alpha-2 (np. US, GB, DE)",
        invalidLanguageCodeFormat: "Nieprawidlowy kod jezyka: \"$1\". Uzyj format ISO 639-1 (np. en, en-US, de-DE)",
        invalidTimezoneFormat: "Nieprawidlowa strefa czasowa: \"$1\". Uzyj format IANA (np. America/New_York, Europe/London)",
        
        // Messages
        projectSaved: "Projekt zapisany pomyslnie",
        projectLoaded: "Projekt wczytany pomyslnie",
        projectDeleted: "Projekt usuniety pomyslnie",
        imageExported: "Obraz wyeksportowany pomyslnie",
        fileExported: "Plik wyeksportowany pomyslnie",
        fileImported: "Plik zaimportowany pomyslnie",
        
        // Errors
        errorSaving: "Blad podczas zapisywania projektu",
        errorLoading: "Blad podczas wczytywania projektu",
        errorDeleting: "Blad podczas usuwania projektu",
        errorExporting: "Blad podczas eksportowania",
        errorImporting: "Blad podczas importowania pliku",
        invalidFile: "nieprawidlowy format pliku",
        
        // Application initialization
        appInitializedSuccessfully: "Aplikacja DiaVinci zostala pomyslnie zainicjalizowana!",
        errorInitializingApplication: "Blad podczas inicjalizacji aplikacji",
        errorStartingApplication: "Blad uruchamiania aplikacji. Prosze odswiezyc strone.",
        
        // Error handling
        unhandledPromiseRejection: "Nieobslugiwane odrzucenie obietnicy",
        uncaughtError: "Nieprzechwycony Blad",
        unexpectedErrorOccurred: "Wystapil nieoczekiwany Blad",
        applicationError: "Blad aplikacji",
        operationFailed: "Operacja nie powiodla sie",
        missingRequiredParameters: "Brakuje wymaganych parametrĂlw",
        failedToParseJson: "Nie udalo sie sparsowaÄ‡ JSON",
        failedToStringifyJson: "Nie udalo sie przeksztalcic JSON",
        
        // Logger messages
        droppedElement: "Upuszczono",
        atPosition: "na pozycji",
        canvasDrop: "Upuszczenie na Plotno",
        textControl: "Kontrolka tekstu",
        movedElement: "Przeniesiono",
        fromPosition: "z",
        toPosition: "do",
        fromPositionShort: "Z",
        toPositionShort: "do",
        modifiedElement: "Zmodyfikowano",
        changedFrom: "zmieniono z",
        changedTo: "na",
        elementMove: "Przeniesienie Elementu",
        elementModify: "Modyfikacja Elementu",
        performance: "Wydajnosc",
        userAction: "Akcja Uzytkownika",
        
        // Storage Service messages
        storageServiceInitialized: "StorageService zainicjalizowany",
        failedToSaveProject: "Nie udalo sie zapisaÄ‡ projektu",
        projectSavedSuccessfully: "Projekt zapisany pomyslnie",
        errorSavingProject: "Blad podczas zapisywania projektu",
        projectNotFound: "Projekt nie zostal znaleziony",
        errorLoadingProject: "Blad podczas wczytywania projektu",
        errorGettingProjects: "Blad podczas pobierania projektĂlw",
        errorDeletingProject: "Blad podczas usuwania projektu",
        errorClearingProjects: "Blad podczas czyszczenia projektĂlw",
        autoSaveCompleted: "Autozapis zakonczony",
        untitled: "Bez tytulu",
        autoSaveFailed: "Autozapis nie powiodlo sie",
        failedToLoadAutoSave: "Nie udalo sie wczytaÄ‡ autozapisu",
        errorExportingProject: "Blad podczas eksportowania projektu",
        invalidProjectFileFormat: "Nieprawidlowy format pliku projektu",
        errorReadingFile: "Blad podczas odczytu pliku",
        
        // Canvas Renderer messages
        canvasRendererInitialized: "CanvasRenderer zainicjalizowany",
        invalidNodeDetected: "Wykryto nieprawidlowy wezel",
        canvasRender: "Renderowanie Plotna",
        errorRenderingCanvas: "Blad podczas renderowania Plotna",
        invalidTransitionDetected: "Wykryto nieprawidlowe Przejscie",
        invalidConnectionPoints: "nieprawidlowe punkty polaczenia",
        errorRenderingTransition: "Blad podczas renderowania przejscia",
        errorRenderingNode: "Blad podczas renderowania wezla",
        invalidTextElementDetected: "Wykryto nieprawidlowy element tekstowy",
        errorRenderingText: "Blad podczas renderowania tekstu",
        failedToRenderDiagram: "Nie udalo sie renderowaÄ‡ diagramu",
        
        // Terminal Service messages
        terminalElementsNotFoundInDOM: "Elementy terminala nie zostaly znalezione w DOM",
        scrollToBottomTerminalContentNotFound: "ScrollToBottom: Element zawartosci terminala nie zostal znaleziony",
        unknownCommand: "Nieznana komenda",
        invalidSyntax: "Nieprawidlowa skladnia",
        elementNotFound: "Element nie zostal znaleziony",
        invalidId: "nieprawidlowe ID",
        fieldNotFound: "Pole nie zostalo znalezione",
        noElementsFound: "Nie znaleziono elementĂlw w tym projekcie",
        invalidLogType: "nieprawidlowy typ logu",
        
        // Export Service messages
        exportServiceInitialized: "ExportService zainicjalizowany",
        exportImageStarted: "RozpoczÄ™to eksport obrazu",
        noProjectProvidedForExport: "Nie podano projektu do eksportu",
        failedToGet2DContextForExportCanvas: "Nie udalo sie uzyskaÄ‡ kontekstu 2D dla kanwy eksportu",
        exportCanvasCreated: "Kanwa eksportu utworzona",
        fileSystemAccessApiFailed: "API dostampu do systemu plikĂlw nie powiodlo sie, Przelaczanie na zapasowa metode",
        exportCancelledByUser: "Eksport anulowany przez Uzytkownika",
        usingFallbackSaveMethod: "Uzywanie zapasowej metody zapisu",
        exportImage: "Eksport Obrazu",
        imageExportCompleted: "Eksport obrazu zakonczony",
        failedToExportImage: "Nie udalo sie wyeksportowac obrazu",
        
        // UI Controller messages
        exportImageError: "Blad eksportu obrazu",
        exportError: "Blad eksportu",
        
        // System configuration messages
        systemConfiguration: "Konfiguracja Systemu",
        terminalSettings: "🖥️ Ustawienia Terminala:",
        maxLines: "Maksymalne Linie:",
        visible: "Widoczny:",
        currentFilter: "Aktualny Filtr:",
        textFilter: "Filtr Tekstowy:",
        none: "Brak",
        windowSettings: "🪟 Ustawienia Okna:",
        width: "Szerokosc:",
        height: "Wysokosc:",
        devicePixelRatio: "Stosunek Pikseli Urzadzenia:",
        screen: "Ekran:",
        applicationState: "📱 Stan Aplikacji:",
        appAvailable: "Aplikacja Dostepna:",
        containerAvailable: "Kontener Dostepny:",
        localStorage: "Pamiec Lokalna:",
        sessionStorage: "Pamiec Sesji:",
        available: "Dostepne",
        notAvailable: "Niedostepne",
        
        // Backup messages
        projectBackupCreated: "✅ Kopia zapasowa projektu utworzona pomyslnie!",
        filename: "📄 Nazwa pliku:",
        elementsBackedUp: "📊 Elementy w kopii zapasowej:",
        failedToCreateBackup: "❌ Nie udalo sie utworzyc kopii zapasowej:",
        
        // Cleanup messages
        cleanupOperation: "🧹 Operacja Czyszczenia",
        cleanedOldCommands: "🗑️ Wyczyszczono $1 starych wpisow komend",
        cleanedOldLogs: "🗑️ Wyczyszczono $1 starych wpisow logow",
        removedTempElements: "🗑️ Usunieto $1 tymczasowych elementow DOM",
        systemAlreadyClean: "✨ System jest juz czysty. Czyszczenie nie jest potrzebne.",
        cleanupCompleted: "✅ Czyszczenie zakonczone. Wykonano $1 operacji.",
        
        // Ping messages
        testingResponsiveness: "📡 Testowanie responsywnosci systemu...",
        pingResults: "📡 Wyniki Ping",
        responseTime: "🔹 Czas Odpowiedzi:",
        domAccess: "🔹 Dostep DOM:",
        projectAccess: "🔹 Dostep Projekt:",
        terminalState: "🔹 Stan Terminal:",
        browserStatus: "🔹 Przegladarka:",
        ok: "✅ OK",
        failed: "❌ Nieudane",
        active: "✅ Aktywny",
        hidden: "⚠️ Ukryty",
        online: "✅ Online",
        offline: "❌ Offline",
        performanceExcellent: "🚀 Wydajnosc systemu: Doskonala",
        performanceGood: "⚡ Wydajnosc systemu: Dobra",
        performanceSlow: "⚠️ Wydajnosc systemu: Wolna",
        
        // Error logs messages
        recentErrors: "🚨 Ostatnie Bledy",
        noRecentErrors: "✅ Nie znaleziono ostatnich bledow. System dziala sprawnie!",
        foundErrors: "📊 Znaleziono $1 blad(ow) w historii terminala:",
        andMoreErrors: "... i $1 wiecej bledow (pokazano ostatnie 10)",
        
        // Memory info messages
        memoryUsage: "Zuzycie Pamieci",
        usedMemory: "🔹 Uzywana Pamiec:",
        totalMemory: "🔹 Calkowita Pamiec:",
        memoryLimit: "🔹 Limit Pamieci:",
        usage: "🔹 Zuzycie:",
        memoryNotAvailable: "⚠️ Informacje o pamieci niedostepne w tej przegladarce.",
        terminalMemory: "📊 Pamiec Terminala:",
        historyLines: "🔹 Linie Historii:",
        commandHistory: "🔹 Historia Polecen:",
        maxLinesLimit: "🔹 Limit Maksymalnych Linii:",
        
        // Performance metrics messages
        performanceMetrics: "Metryki Wydajnosci",
        pageLoadTime: "🔹 Czas Ladowania Strony:",
        domReadyTime: "🔹 Czas Gotowosci DOM:",
        currentTime: "🔹 Aktualny Czas:",
        performanceNow: "🔹 Wydajnosc Teraz:",
        browserInfo: "🌐 Informacje o Przegladarce:",
        userAgent: "🔹 User Agent:",
        platform: "🔹 Platforma:",
        language: "🔹 Jezyk:",
        cores: "🔹 Rdzenie:",
        unknown: "Nieznane",
        
        // Project validation messages
        projectValidation: "Walidacja Projektu",
        projectValidationSuccess: "✅ Walidacja projektu zakonczona pomyslnie!",
        noIssuesFound: "🎉 Nie znaleziono problemow. Integralnosc projektu jest dobra.",
        errorsFound: "❌ ZNALEZIONO BLEDY:",
        warnings: "⚠️ OSTRZEZENIA:",
        validationSummary: "📊 Podsumowanie Walidacji:",
        errors: "Bledy:",
        totalElementsChecked: "Calkowite Elementy Sprawdzone:",
        duplicateIds: "Znaleziono duplikaty ID:",
        orphanedTransition: "Przejscie $1 odwoluje sie do nieistniejacego wezla zrodlowego $2",
        orphanedTransitionTarget: "Przejscie $1 odwoluje sie do nieistniejacego wezla docelowego $2",
        emptyLabelsWarning: "$1 elementow ma puste etykiety"
    },
    
    de: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Komponenten",
        nodes: "Knoten",
        texts: "Texte", 
        transitions: "ĂsbergĂ¤nge",
        
        // Node types
        process: "Prozess",
        start: "Start",
        stop: "Stopp", 
        decision: "Entscheidung",
        data: "Daten",
        dataModel: "Datenmodell",
        singleWay: "Einweg",
        dualWay: "Zweiweg", 
        line: "Linie",
        
        // Bottom navigation
        newProject: "Neues Projekt",
        saveProject: "Projekt Speichern",
        loadProject: "Projekt Laden",
        exportImage: "Bild Exportieren",
        exportFile: "Datei Exportieren",
        importFile: "Datei Importieren",
        removeSelected: "Ausgewählte Entfernen",
        save: "Speichern",
        load: "Laden", 
        clear: "Alles Löschen",
        
        // Export options
        exportOptions: "Export-Optionen",
        whiteBackground: "Weißer Hintergrund",
        transparentBackground: "Transparenter Hintergrund",
        
        // Save dialog
        saveProjectTitle: "Projekt Speichern",
        projectName: "Projektname",
        save: "Speichern",
        cancel: "Abbrechen",
        enterProjectName: "Projektname eingeben...",
        saveAsPrivate: "Als privates Projekt speichern",
        projectNameRequired: "Projektname ist erforderlich",
        passwordRequired: "Passwort ist für private Projekte erforderlich",
        projectPassword: "Projekt-Passwort",
        enterPasswordPlaceholder: "Passwort für privates Projekt eingeben...",
        rememberPassword: "Merken Sie sich dieses Passwort - es kann nicht wiederhergestellt werden!",
        
        // Project status messages
        publicProjectSaved: "Öffentliches Projekt erfolgreich gespeichert!",
        privateProjectSaved: "Privates Projekt erfolgreich gespeichert!",
        publicProjectLoaded: "Öffentliches Projekt erfolgreich geladen!",
        privateProjectLoaded: "Privates Projekt erfolgreich geladen!",
        newPublicProject: "Neues öffentliches Projekt erstellt und gespeichert!",
        newPrivateProject: "Neues privates Projekt erstellt und gespeichert!",
        
        // Dialog titles and actions
        loadProjectTitle: "Projekt Laden", 
        createNewProjectTitle: "Neues Projekt Erstellen",
        deleteProjectTitle: "Projekt Löschen",
        deleteAllProjectsTitle: "Alle Projekte Löschen",
        clearCurrentProjectTitle: "Aktuelles Projekt Löschen",
        close: "Schließen",
        load: "Laden",
        delete: "Löschen",
        createProject: "Projekt Erstellen",
        projectNameRequired: "Projektname ist erforderlich",
        rememberPassword: "Merken Sie sich dieses Passwort - es kann nicht wiederhergestellt werden!",
        deleteProjectConfirm: "Sind Sie sicher, dass Sie das Projekt löschen möchten",
        actionCannotBeUndone: "Diese Aktion kann nicht rückgängig gemacht werden.",
        
        // Password dialog
        enterPasswordTitle: "Passwort Eingeben",
        enterPasswordMessage: "Bitte geben Sie das Passwort für das Projekt ein:",
        enterPasswordPlaceholder2: "Passwort eingeben...",
        unlock: "Entsperren",
        passwordCannotBeEmpty: "Passwort darf nicht leer sein",
        incorrectPassword: "Falsches Passwort. Bitte versuchen Sie es erneut.",
        confirm: "Bestätigen",
        
        // Load dialog
        noProjectsFound: "Keine gespeicherten Projekte gefunden",
        noProjectsMatchingSearch: "Keine Projekte gefunden, die Ihrer Suche entsprechen",
        clearAllProjectsConfirm: "Sind Sie sicher, dass Sie <strong>ALLE</strong> gespeicherten Projekte löschen und die Leinwand löschen möchten?<br><br><strong>Diese Aktion kann nicht rückgängig gemacht werden!</strong>",
        createFirstDiagram: "Erstellen Sie Ihr erstes Diagramm, um zu beginnen",
        
        // UI Controls and buttons
        clearCanvas: "Leinwand Löschen",
        clearCanvasConfirm: "Sind Sie sicher, dass Sie alle Elemente von der Leinwand entfernen möchten?<br><br><strong>Diese Aktion kann nicht rückgängig gemacht werden.</strong>",
        canvasClearedSuccessfully: "Leinwand erfolgreich gelöscht!",
        allProjectsClearedSuccessfully: "Alle Projekte und Leinwand erfolgreich gelöscht!",
        whiteBackground: "weißer Hintergrund", 
        transparentBackground: "transparenter Hintergrund",
        imageExportedSuccessfully: "Bild erfolgreich exportiert mit",
        projectExportedSuccessfully: "Projekt erfolgreich exportiert!",
        noContentToExport: "Kein Inhalt zum Exportieren. Bitte erstellen Sie zuerst einige Elemente.",
        showGrid: "Raster Anzeigen",
        hideGrid: "Raster Ausblenden", 
        showRulers: "Lineale Anzeigen",
        hideRulers: "Lineale Ausblenden",
        noProjectLoaded: "Kein Projekt Geladen",
        
        // Error messages and dialogs
        failedToExport: "Export des Projekts fehlgeschlagen. Bitte versuchen Sie es erneut.",
        errorExportingImage: "Fehler beim Exportieren des Bildes. Bitte versuchen Sie es erneut.",
        errorExportingProject: "Fehler beim Exportieren des Projekts. Bitte versuchen Sie es erneut.",
        errorImportingProject: "Fehler beim Importieren des Projekts. Bitte überprüfen Sie das Dateiformat.",
        incorrectPasswordImportCancelled: "Falsches Passwort. Import abgebrochen.",
        importCancelled: "Import abgebrochen.",
        clearCurrentProjectConfirm: "Ein neues Projekt zu erstellen wird die aktuelle Leinwand löschen.<br><br>Möchten Sie fortfahren?",
        
        // Export dialog
        exportProject: "Projekt Exportieren",
        exportAsLcpFile: "Als .lcp-Datei Exportieren",
        exportImageMenu: "Bild Exportieren",
        whiteBackgroundBtn: "Weißer Hintergrund",
        transparentBackgroundBtn: "Transparenter Hintergrund",
        
        custom: "Benutzerdefiniert",
        private: "PRIVAT",
        public: "ÖFFENTLICH",
        makeProjectPrivate: "Dieses Projekt privat machen",
        page: "Seite",
        of: "von",
        
        // Data Model Editor
        fieldSpecificErrors: "Feldspezifische Fehler:",
        unnamedField: "Unbenanntes Feld",
        unknownField: "Unbekanntes Feld",
        pleaseFixErrors: "Bitte beheben Sie diese Fehler vor dem Speichern.",
        
        // Context Menu
        nodeId: "Knoten-ID",
        textId: "Text-ID", 
        transitionId: "Übergang-ID",
        dataModelId: "Datenmodell-ID",
        type: "Typ",
        label: "Bezeichnung",
        position: "Position",
        rotation: "Drehung",
        fields: "Felder",
        style: "Stil",
        copyIdToClipboard: "ID in Zwischenablage kopieren",
        showInTerminal: "Im Terminal anzeigen",
        changeColor: "Farbe ändern",
        editDataModel: "Datenmodell bearbeiten",
        rotateClockwise: "Im Uhrzeigersinn drehen",
        rotateCounterClockwise: "Gegen den Uhrzeigersinn drehen",
        convertToCurved: "In Kurve umwandeln",
        convertToStraight: "In Gerade umwandeln",
        
        terminal: "Terminal",
        
        // Recent Projects
        recentProjects: "Letzte Projekte",
        searchProjects: "Projekte suchen...",
        
        // Search and filters
        search: "Suchen",
        filterText: "Text filtern",
        allMessages: "Alle Nachrichten",
        errorsOnly: "Nur Fehler",
        warningsOnly: "Nur Warnungen",
        infoOnly: "Nur Info",
        debugOnly: "Nur Debug",
        canvasDrops: "Canvas-Drops",
        textControls: "Text-Steuerelemente",
        elementMoves: "Element-Bewegungen",
        elementModifications: "Element-Änderungen",
        terminalExport: "Exportieren",
        terminalClear: "Löschen",
        
        // Data Model Editor specific
        clickAddFieldToStart: "Klicken Sie auf \"Feld Hinzufügen\", um mit Ihrem Datenmodell zu beginnen",
        fieldNamePlaceholder: "Feldname...",
        selectFieldType: "Feldtyp auswählen...",
        initialValuePlaceholder: "Anfangswert...",
        deleteField: "Feld löschen",
        moveUp: "Nach oben verschieben",
        moveDown: "Nach unten verschieben",
        duplicateField: "Feld duplizieren",
        stringType: "String",
        numberType: "Zahl", 
        booleanType: "Boolean",
        dateType: "Datum",
        emailType: "E-Mail",
        urlType: "URL",
        phoneType: "Telefon",
        currencyType: "Währung",
        countryCodeType: "Ländercode",
        languageCodeType: "Sprachcode",
        creditCardType: "Kreditkarte",
        
        // Node labels
        nodeStart: "START",
        nodeStop: "STOPP",
        nodeIf: "WENN",
        nodeDefault: "Knoten",
        labelTrue: "WAHR",
        labelFalse: "FALSCH",
        labelStep1: "Schritt1",
        labelStep2: "Schritt2",
        
        // Data Model Editor placeholders
        enterModelName: "Modellname eingeben",
        jsonSchemaWillAppear: "JSON-Schema wird hier erscheinen...",
        describeModel: "Beschreiben Sie, was dieses Modell darstellt...",
        fieldNamePlaceholder2: "feldname",
        
        // Data Model Editor interface
        editDataModel: "Datenmodell Bearbeiten",
        defineFieldsAndStructure: "Felder und Struktur für Ihr Datenmodell definieren",
        modelName: "Modellname",
        modelId: "Modell-ID",
        copyId: "ID Kopieren",
        jsonSchema: "JSON-Schema",
        acceptJson: "JSON Akzeptieren",
        copyJson: "JSON Kopieren",
        jsonEditInstructions: "Sie können das JSON unten bearbeiten oder Ihr eigenes Schema einfügen und auf \"JSON Akzeptieren\" klicken, um die Änderungen anzuwenden",
        modelSettings: "Modelleinstellungen",
        description: "Beschreibung",
        validationRules: "Validierungsregeln",
        modelType: "Modelltyp",
        requireAllFields: "Alle Felder erforderlich",
        enableValidation: "Validierung aktivieren",
        allowNullValues: "Null-Werte erlauben",
        entity: "Entität",
        dataTransferObject: "Datenübertragungsobjekt",
        viewModel: "View-Modell",
        document: "Dokument",
        validationErrors: "Validierungsfehler",
        saveChanges: "Änderungen Speichern",
        options: "Optionen",
        noFieldsDefinedYet: "Noch keine Felder definiert",
        selectValue: "Auswählen...",
        selectCountry: "Land auswählen...",
        selectLanguage: "Sprache auswählen...",
        selectTimezone: "Zeitzone auswählen...",
        
        // Validation messages
        validationErrorsInModel: "Es gibt Validierungsfehler in diesem Modell:",
        sureToCloseWithoutSaving: "Sind Sie sicher, dass Sie ohne Speichern schließen möchten? Alle Änderungen gehen verloren.",
        modelNameRequired: "Modellname ist erforderlich",
        modelNameTooLong: "Modellname darf 50 Zeichen nicht überschreiten",
        securityViolation: "Sicherheitsverletzung:",
        
        // JSON validation messages
        errorGeneratingJson: "Fehler beim Generieren von JSON:",
        pleaseEnterJsonSchema: "Bitte geben Sie ein JSON-Schema ein, um es zu akzeptieren",
        jsonTooLarge: "JSON-Inhalt zu groß. Maximale Größe ist 100KB",
        jsonTooDeep: "JSON-Struktur zu tief. Maximale Tiefe ist 10 Ebenen",
        tooManyProperties: "Zu viele Eigenschaften. Maximum sind 100 Felder pro Modell",
        invalidJson: "Ungültiges JSON:",
        jsonDangerousScript: "JSON enthält potenziell gefährlichen Skriptinhalt",
        jsonDangerousSQL: "JSON-String-Werte enthalten potenziell gefährliche SQL-Muster",
        schemaMustBeObject: "Schema muss ein gültiges JSON-Objekt sein",
        schemaMustHaveProperties: "Schema muss ein \"properties\"-Objekt enthalten",
        schemaMinimumOneProperty: "Schema muss mindestens eine Eigenschaft enthalten",
        fieldNamesCannotBeEmpty: "Feldnamen dürfen nicht leer sein",
        fieldMustHaveType: "muss einen Typ haben",
        fieldInvalidType: "hat ungültigen Typ:",
        requiredMustBeArray: "\"required\" muss ein Array sein",
        requiredFieldNotFound: "Erforderliches Feld \"${field}\" nicht in Eigenschaften gefunden",
        jsonAutoSynchronized: "JSON automatisch mit Feldern synchronisiert",
        jsonCopiedToClipboard: "JSON in Zwischenablage kopiert",
        
        // Boolean values
        trueValue: "Wahr",
        falseValue: "Falsch",
        
        // Load projects
        loadProjectTitle: "Projekt Laden",
        recentProjects: "Letzte Projekte",
        searchProjects: "Projekte suchen...",
        noProjectsFound: "Keine Projekte gefunden",
        projectCreated: "Erstellt",
        projectModified: "Geändert",
        load: "Laden",
        delete: "Löschen",
        
        // Data Model
        dataModelEditor: "Datenmodell-Editor",
        fields: "Felder",
        json: "JSON",
        settings: "Einstellungen",
        addField: "Feld Hinzufügen",
        fieldName: "Feldname",
        fieldType: "Feldtyp",
        required: "Erforderlich",
        nullable: "Nullable",
        readOnly: "Nur Lesen",
        initialValue: "Anfangswert",
        
        // Terminal
        terminal: "Terminal",
        terminalToggle: "Terminal Umschalten",
        textControls: "Text-Steuerelemente",
        elementMoves: "Element-Bewegungen",
        elementModifications: "Element-Änderungen",
        terminalExport: "Exportieren",
        terminalClear: "Löschen",
        
        // Export options
        exportOptions: "Export-Optionen",
        whiteBackground: "WeiĂzer Hintergrund",
        transparentBackground: "Transparenter Hintergrund",
        
        // Save dialog
        saveProjectTitle: "Projekt Speichern",
        projectName: "Projektname",
        save: "Speichern",
        cancel: "Abbrechen",
        enterProjectName: "Projektname eingeben...",
        saveAsPrivate: "Als privates Projekt speichern",
        projectNameRequired: "Projektname ist erforderlich",
        passwordRequired: "Passwort ist fĂĽr private Projekte erforderlich",
        projectPassword: "Projekt-Passwort",
        enterPassword: "Passwort eingeben...",
        confirmPassword: "Passwort bestĂ¤tigen",
        passwordsDoNotMatch: "PasswĂ¶rter stimmen nicht ĂĽberein",
        
        // Load dialog
        loadProjectTitle: "Projekt Laden",
        selectProject: "Projekt auswĂ¤hlen",
        projectList: "Projektliste",
        noProjectsFound: "Keine Projekte gefunden",
        enterPasswordForProject: "Passwort fĂĽr Projekt eingeben",
        incorrectPassword: "Falsches Passwort",
        
        // Import/Export
        importSuccess: "Datei erfolgreich importiert",
        importError: "Fehler beim Importieren der Datei",
        exportSuccess: "Datei erfolgreich exportiert",
        exportError: "Fehler beim Exportieren der Datei",
        invalidFileFormat: "UngĂĽltiges Dateiformat",
        fileNotSelected: "Keine Datei ausgewĂ¤hlt",
        
        // Canvas operations
        zoomIn: "VergrĂ¶Ăzern",
        zoomOut: "Verkleinern",
        resetZoom: "Zoom zurĂĽcksetzen",
        fitToScreen: "An Bildschirm anpassen",
        
        // Node operations
        editNode: "Knoten bearbeiten",
        deleteNode: "Knoten lĂ¶schen",
        duplicateNode: "Knoten duplizieren",
        nodeText: "Knotentext",
        nodeColor: "Knotenfarbe",
        
        // Transition operations
        editTransition: "Ăsbergang bearbeiten",
        deleteTransition: "Ăsbergang lĂ¶schen",
        transitionText: "Ăsbergangstext",
        transitionColor: "Ăsbergangsfarbe",
        
        // Grid operations
        showGrid: "Raster anzeigen",
        hideGrid: "Raster ausblenden",
        snapToGrid: "Am Raster ausrichten",
        gridSize: "RastergrĂ¶Ăze",
        
        // Validation messages
        invalidNodeType: "UngĂĽltiger Knotentyp",
        nodeOutOfBounds: "Knoten auĂzerhalb der Grenzen",
        invalidTransition: "UngĂĽltiger Ăsbergang",
        circularDependency: "ZirkulĂ¤re AbhĂ¤ngigkeit erkannt",
        
        // Error messages
        genericError: "Ein unerwarteter Fehler ist aufgetreten",
        networkError: "Netzwerkfehler",
        fileReadError: "Fehler beim Lesen der Datei",
        fileWriteError: "Fehler beim Schreiben der Datei",
        storageError: "Speicherfehler",
        renderError: "Render-Fehler",
        
        // Success messages
        projectSaved: "Projekt gespeichert",
        projectLoaded: "Projekt geladen",
        changesSaved: "Ă„nderungen gespeichert",
        operationCompleted: "Operation abgeschlossen",
        
        // UI elements
        yes: "Ja",
        no: "Nein",
        ok: "OK",
        apply: "Anwenden",
        reset: "ZurĂĽcksetzen",
        close: "SchlieĂzen",
        back: "ZurĂĽck",
        next: "Weiter",
        finish: "Fertig",
        
        // Tooltips
        selectLanguage: "Sprache auswĂ¤hlen",
        dragToMove: "Zum Bewegen ziehen",
        clickToEdit: "Zum Bearbeiten klicken",
        doubleClickToEdit: "Doppelklick zum Bearbeiten",
        rightClickForOptions: "Rechtsklick fĂĽr Optionen",
        
        // Context menu
        contextMenu: "KontextmenĂĽ",
        copy: "Kopieren",
        paste: "EinfĂĽgen",
        cut: "Ausschneiden",
        undo: "RĂĽckgĂ¤ngig",
        redo: "Wiederholen",
        selectAll: "Alles auswĂ¤hlen",
        
        // Multi-selection
        multipleItemsSelected: "Mehrere Elemente ausgewĂ¤hlt",
        selectionCleared: "Auswahl aufgehoben",
        itemsDeleted: "Elemente gelĂ¶scht",
        
        // Terminal messages
        terminalReady: "Terminal bereit",
        commandExecuted: "Befehl ausgefĂĽhrt",
        commandFailed: "Befehl fehlgeschlagen",
        
        // Storage messages
        storageQuotaExceeded: "Speicherplatz ĂĽberschritten",
        storageFull: "Speicher voll",
        dataCorrupted: "Daten beschĂ¤digt",
        backupCreated: "Backup erstellt",
        backupRestored: "Backup wiederhergestellt",
        
        // Validation
        required: "Erforderlich",
        invalid: "UngĂĽltig",
        tooShort: "Zu kurz",
        tooLong: "Zu lang",
        mustBeNumber: "Muss eine Zahl sein",
        mustBeEmail: "Muss eine E-Mail-Adresse sein",
        
        // Auto-save
        autoSaveEnabled: "Automatisches Speichern aktiviert",
        autoSaveDisabled: "Automatisches Speichern deaktiviert",
        autoSaving: "Automatisches Speichern...",
        
        // Debug messages
        debugMode: "Debug-Modus",
        debugEnabled: "Debug aktiviert",
        debugDisabled: "Debug deaktiviert",
        debugInfo: "Debug-Info",
        
        // Performance
        performanceOptimized: "Leistung optimiert",
        memoryUsage: "Speicherverbrauch",
        renderTime: "Render-Zeit",
        
        // Accessibility
        accessibilityMode: "Barrierefreiheitsmodus",
        highContrast: "Hoher Kontrast",
        largeText: "GroĂzer Text",
        screenReader: "Bildschirmleser",
        
        // Keyboard shortcuts
        keyboardShortcuts: "TastenkĂĽrzel",
        shortcut: "KĂĽrzel",
        action: "Aktion",
        
        // Help and support
        help: "Hilfe",
        documentation: "Dokumentation",
        support: "Support",
        feedback: "Feedback",
        reportBug: "Fehler melden",
        
        // Version info
        version: "Version",
        build: "Build",
        lastUpdate: "Letztes Update",
        
        // Logger messages
        log: "Protokoll",
        logLevel: "Protokollstufe",
        logMessage: "Protokollnachricht",
        logError: "Protokollfehler",
        logWarning: "Protokollwarnung",
        logInfo: "Protokollinfo",
        logDebug: "Protokoll-Debug",
        logTrace: "Protokoll-Trace",
        
        // Event system
        eventFired: "Ereignis ausgelĂ¶st",
        eventHandled: "Ereignis behandelt",
        eventError: "Ereignisfehler",
        
        // Canvas renderer
        canvasInitialized: "Canvas initialisiert",
        canvasCleared: "Canvas geleert",
        canvasRendered: "Canvas gerendert",
        renderingStarted: "Rendering gestartet",
        renderingCompleted: "Rendering abgeschlossen",
        
        // Input service
        inputProcessed: "Eingabe verarbeitet",
        keyPressed: "Taste gedrĂĽckt",
        mouseClicked: "Maus geklickt",
        dragStarted: "Ziehen gestartet",
        dragEnded: "Ziehen beendet",
        
        // Grid service
        gridEnabled: "Raster aktiviert",
        gridDisabled: "Raster deaktiviert",
        snapEnabled: "Ausrichtung aktiviert",
        snapDisabled: "Ausrichtung deaktiviert",
        
        // Export service
        exportStarted: "Export gestartet",
        exportCompleted: "Export abgeschlossen",
        exportFailed: "Export fehlgeschlagen",
        canvasNotFound: "Canvas nicht gefunden",
        canvasEmpty: "Canvas ist leer",
        exportCancelled: "Export abgebrochen",
        
        // Terminal service
        terminalInitialized: "Terminal initialisiert",
        commandAdded: "Befehl hinzugefĂĽgt",
        historyCleared: "Verlauf geleert",
        commandNotFound: "Befehl nicht gefunden",
        
        // Breakpoint service
        breakpointAdded: "Haltepunkt hinzugefĂĽgt",
        breakpointRemoved: "Haltepunkt entfernt",
        breakpointHit: "Haltepunkt erreicht",
        
        // Storage service with auto-save
        autoSaved: "Automatisch gespeichert",
        
        // More storage and export messages
        savedToIndexedDB: "In IndexedDB gespeichert",
        loadedFromIndexedDB: "Aus IndexedDB geladen",
        indexedDBError: "IndexedDB-Fehler",
        localStorageFallback: "LocalStorage-Fallback",
        creatingExportCanvas: "Export-Canvas wird erstellt",
        settingExportCanvasSize: "Export-Canvas-GrĂ¶Ăze wird gesetzt",
        noElementsToExport: "Keine Elemente zum Exportieren",
        renderingElementsForExport: "Elemente fĂĽr Export werden gerendert",
        failedToGet2DContextForExportCanvas: "2D-Kontext fĂĽr Export-Canvas konnte nicht abgerufen werden",
        exportCanvasCreated: "Export-Canvas erstellt",
        fileSystemAccessApiFailed: "Dateisystem-Zugriffs-API fehlgeschlagen, wechsle zur Fallback-Methode",
        exportCancelledByUser: "Export vom Benutzer abgebrochen",
        usingFallbackSaveMethod: "Verwende Fallback-Speichermethode",
        exportImage: "Bild Exportieren",
        imageExportCompleted: "Bildexport abgeschlossen",
        failedToExportImage: "Bildexport fehlgeschlagen",
        
        // UI Controller messages
        exportImageError: "Bildexport-Fehler",
        exportError: "Export-Fehler",
        
        // InputService translations
        inputServiceInitialized: "InputService initialisiert",
        errorShowingNodeInput: "Fehler beim Anzeigen der Knoten-Eingabe",
        failedToShowNodeEditor: "Knoten-Editor konnte nicht angezeigt werden",
        showTextInputCalled: "showTextInput aufgerufen",
        inputPositioning: "Eingabe-Positionierung",
        inputSetupCompleted: "Eingabe-Setup abgeschlossen",
        
        // System configuration translations
        systemConfigTitle: "Systemkonfiguration",
        canvasSettings: "Canvas-Einstellungen",
        width: "Breite",
        height: "Höhe",
        backgroundColor: "Hintergrundfarbe",
        zoom: "Zoom",
        gridEnabled: "Raster aktiviert",
        snapToGrid: "Am Raster ausrichten",
        gridSize: "Rastergröße",
        applicationSettings: "Anwendungseinstellungen",
        version: "Version",
        language: "Sprache",
        autoSave: "Automatisches Speichern",
        autoSaveInterval: "Auto-Speicher-Intervall",
        saveFormat: "Speicherformat",
        performanceSettings: "Leistungseinstellungen",
        maxUndoSteps: "Max. Rückgängig-Schritte",
        renderQuality: "Renderqualität",
        enableAnimations: "Animationen aktivieren",
        cacheSize: "Cache-Größe",
        memoryUsage: "Speicherverbrauch",
        storageInfo: "Speicherinformationen",
        localStorageUsed: "Lokaler Speicher verwendet",
        sessionStorageUsed: "Sitzungsspeicher verwendet",
        totalStorageLimit: "Gesamtspeicherlimit",
        availableStorage: "Verfügbarer Speicher",
        
        // Project backup translations
        backupSuccess: "Projekt-Backup erfolgreich erstellt",
        backupError: "Fehler beim Erstellen des Backups",
        backupCreated: "Backup erstellt",
        backupTimestamp: "Backup-Zeitstempel",
        backupSize: "Backup-Größe",
        backupLocation: "Backup-Speicherort",
        
        // Cleanup translations
        cleanupStarted: "Bereinigung gestartet",
        cleanupCompleted: "Bereinigung abgeschlossen",
        tempFilesRemoved: "Temporäre Dateien entfernt",
        cacheCleared: "Cache geleert",
        oldBackupsRemoved: "Alte Backups entfernt",
        memoryFreed: "Speicher freigegeben",
        
        // Ping translations
        pingStarted: "Ping-Test gestartet",
        pingCompleted: "Ping-Test abgeschlossen",
        pingSuccess: "Ping erfolgreich",
        pingFailed: "Ping fehlgeschlagen",
        serverResponse: "Serverantwort",
        responseTime: "Antwortzeit",
        
        // Error log translations
        errorLogTitle: "Fehlerprotokoll",
        noRecentErrors: "Keine aktuellen Fehler gefunden",
        errorCount: "Fehleranzahl",
        lastError: "Letzter Fehler",
        errorType: "Fehlertyp",
        errorMessage: "Fehlermeldung",
        errorTimestamp: "Fehler-Zeitstempel",
        
        // Memory info translations
        memoryInfoTitle: "Speicherinformationen",
        totalMemory: "Gesamtspeicher",
        usedMemory: "Verwendeter Speicher",
        freeMemory: "Freier Speicher",
        memoryPercentage: "Speicher-Prozentsatz",
        javascriptHeap: "JavaScript-Heap",
        heapUsed: "Heap verwendet",
        heapTotal: "Heap gesamt",
        heapLimit: "Heap-Limit",
        
        // Performance metrics translations
        performanceTitle: "Leistungsmetriken",
        frameRate: "Bildrate",
        renderTime: "Renderzeit",
        averageRenderTime: "Durchschnittliche Renderzeit",
        lastRenderTime: "Letzte Renderzeit",
        canvasOperations: "Canvas-Operationen",
        drawCalls: "Zeichenaufrufe",
        nodeCount: "Knotenanzahl",
        transitionCount: "Übergangsanzahl",
        
        // Project validation translations
        validationStarted: "Validierung gestartet",
        validationCompleted: "Validierung abgeschlossen",
        projectValid: "Projekt ist gültig",
        validationErrors: "Validierungsfehler",
        orphanedNodes: "Verwaiste Knoten",
        invalidTransitions: "Ungültige Übergänge",
        missingConnections: "Fehlende Verbindungen",
        duplicateIds: "Doppelte IDs",
        errorShowingTextInput: "Fehler beim Anzeigen der Text-Eingabe",
        
        // GridService translations
        gridServiceInitialized: "GridService initialisiert",
        rulersToggled: "Lineale umgeschaltet",
        gridToggled: "Raster umgeschaltet",
        gridSizeChanged: "Rastergröße geändert",
        gridSnapChanged: "Raster-Einrasten geändert",
        smartGuidesChanged: "Intelligente Hilfslinien geändert",
        gridServiceDestroyed: "GridService zerstört",
        
        // MultiSelectionManager translations
        multiSelectionManagerInitialized: "MultiSelectionManager initialisiert",
        selectionRectangleStarted: "Auswahlrechteck gestartet",
        errorStartingSelection: "Fehler beim Starten der Auswahl",
        failedToStartSelection: "Auswahl konnte nicht gestartet werden",
        endSelectionCalled: "endSelection aufgerufen",
        selectionRect: "Auswahlrechteck",
        nodeSelected: "Knoten ausgewählt",
        textSelected: "Text ausgewählt",
        transitionSelected: "Übergang ausgewählt",
        selectionRectangleDeactivated: "Auswahlrechteck deaktiviert",
        multiSelectionCompleted: "Mehrfachauswahl abgeschlossen",
        errorEndingSelection: "Fehler beim Beenden der Auswahl",
        failedToCompleteSelection: "Auswahl konnte nicht abgeschlossen werden",
        errorCheckingElementInRect: "Fehler beim Überprüfen des Elements im Rechteck",
        errorCheckingTextInRect: "Fehler beim Überprüfen des Textes im Rechteck",
        errorCheckingTransitionInRect: "Fehler beim Überprüfen des Übergangs im Rechteck",
        groupDragStarted: "Gruppenziehen gestartet",
        errorStartingGroupDrag: "Fehler beim Starten des Gruppenziehens",
        failedToStartGroupDrag: "Gruppenziehen konnte nicht gestartet werden",
        groupDragCompleted: "Gruppenziehen abgeschlossen",
        elementDeselected: "Element abgewählt",
        elementSelected: "Element ausgewählt",
        selectionCleared: "Auswahl gelöscht",
        
        // BreakPointService translations
        breakPointServiceInitialized: "BreakPointService initialisiert",
        errorFindingBreakPointAtPosition: "Fehler beim Finden des Haltepunkts an Position",
        failedToFindBreakPoint: "Haltepunkt konnte nicht gefunden werden",
        breakPointMoved: "Haltepunkt verschoben",
        errorMovingBreakPoint: "Fehler beim Verschieben des Haltepunkts",
        failedToMoveBreakPoint: "Haltepunkt konnte nicht verschoben werden",
        multipleBreakPointsMoved: "Mehrere Haltepunkte verschoben",
        errorMovingMultipleBreakPoints: "Fehler beim Verschieben mehrerer Haltepunkte",
        failedToMoveBreakPoints: "Haltepunkte konnten nicht verschoben werden",
        errorGettingSelectedBreakPoints: "Fehler beim Abrufen ausgewählter Haltepunkte",
        breakPointsUpdatedForNodeMovement: "Haltepunkte für Knotenbewegung aktualisiert",
        errorUpdatingBreakPointsForMovedNode: "Fehler beim Aktualisieren der Haltepunkte für verschobenen Knoten",
        failedToUpdateBreakPoints: "Haltepunkte konnten nicht aktualisiert werden",
        breakPointsUpdatedForGroupNodeMovement: "Haltepunkte für Gruppenknotenbewegung aktualisiert",
        errorUpdatingBreakPointsForMovedNodes: "Fehler beim Aktualisieren der Haltepunkte für verschobene Knoten",
        
        // EventBus and DiagramController translations
        errorInEventListener: "Fehler im Event-Listener",
        diagramControllerInitialized: "DiagramController initialisiert",
        transitionDrawingModeStarted: "Übergangs-Zeichnungsmodus gestartet",
        transitionDrawingCancelled: "Übergangs-Zeichnung abgebrochen",
        transitionDrawingCompleted: "Übergangs-Zeichnung abgeschlossen",
        mouseDownAt: "Mausklick bei",
        currentlyEditingCompletingEdit: "Aktuell bearbeitet - Bearbeitung abschließen",
        
        // Transition model translations
        transitionMissingFromOrToNode: "Übergang fehlt Von- oder Zu-Knoten",
        transitionNodesMissingCoordinates: "Übergangsknoten fehlen Koordinaten",
        blockedStyleToggleForIFTransition: "Stil-Umschaltung für IF-Übergang blockiert - Roboterarme können nicht modifiziert werden",
        transitionStyleToggled: "Übergangsstil umgeschaltet",
        blockedBreakPointForIFTransition: "Haltepunkt für IF-Übergang blockiert - Roboterarme können nicht modifiziert werden",
        breakPointAdded: "Haltepunkt hinzugefügt",
        breakPointRemoved: "Haltepunkt entfernt",
        allBreakPointsCleared: "Alle Haltepunkte gelöscht",
        
        // Project model translations
        duplicateTransitionPrevented: "Duplikat-Übergang verhindert",
        lookingForTextAtPosition: "Suche nach Text an Position",
        foundTextElement: "Text-Element gefunden",
        noTextFoundAtPosition: "Kein Text an Position gefunden",
        
        // InputService translations
        errorShowingTransitionInput: "Fehler beim Anzeigen der Übergangs-Eingabe",
        createInputCalled: "createInput aufgerufen",
        creatingNewInputElement: "Neues Eingabe-Element erstellen",
        reusingExistingInputElement: "Vorhandenes Eingabe-Element wiederverwenden",
        inputElementConfigured: "Eingabe-Element konfiguriert",
        setupInputCalled: "setupInput aufgerufen",
        inputCompleted: "Eingabe abgeschlossen",
        inputTooLongTruncating: "Eingabe zu lang, kürzen",
        inputSanitized: "Eingabe bereinigt",
        settingLabel: "Bezeichnung setzen",
        settingTransitionLabel: "Übergangs-Bezeichnung setzen",
        hidingActiveInput: "Aktive Eingabe verbergen",
        inputServiceDestroyed: "InputService zerstört",
        
        // ExportService translations
        errorInFallbackExport: "Fehler im Fallback-Export",
        
        // DiagramController debug translations
        mouseDownInternal: "Interne Maus-Betätigung",
        ctrlClickOnNode: "Strg+Klick auf Knoten",
        ctrlClickOnText: "Strg+Klick auf Text",
        ctrlClickOnBreakPoint: "Strg+Klick auf Haltepunkt - Übergang zur Auswahl hinzufügen",
        ctrlClickOnTransition: "Strg+Klick auf Übergang",
        groupDragStartNode: "Gruppenziehen Start - Knoten",
        groupDragStartText: "Gruppenziehen Start - Text",
        singleClickOnNodeStartDragging: "Einzelklick auf Knoten - Ziehen starten",
        singleClickOnTextStartDragging: "Einzelklick auf Text - Ziehen starten",
        singleClickOnBreakPointStartDragging: "Einzelklick auf Haltepunkt - Ziehen starten",
        singleClickOnTransition: "Einzelklick auf Übergang",
        clickOnEmptySpaceStartRectangleSelection: "Klick auf leeren Raum - Rechteckauswahl starten",
        startDragging: "Ziehen starten",
        startDraggingBreakPoint: "Haltepunkt ziehen starten",
        startDraggingTransition: "Übergang ziehen starten",
        transitionStartNodeSelected: "Übergangs-Startknoten ausgewählt",
        transitionCancelledSameNodeClicked: "Übergang abgebrochen - derselbe Knoten zweimal angeklickt",
        doubleClickAt: "Doppelklick bei",
        doubleClickOnNode: "Doppelklick auf Knoten",
        doubleClickOnText: "Doppelklick auf Text",
        doubleClickOnTransition: "Doppelklick auf Übergang",
        rotatingIfNodeCounterClockwise: "IF-Knoten gegen Uhrzeigersinn drehen",
        foundTransitionsForCounterClockwiseRotation: "Übergänge für Gegen-Uhrzeigersinn-Drehung gefunden",
        missingTransitionsForIfCounterClockwiseRotation: "Fehlende Übergänge für IF-Gegen-Uhrzeigersinn-Drehung",
        blockingOptionsForIfTransition: "Blockiere Optionen für IF-Übergang - Roboterarme können nicht modifiziert werden",
        rotatingIfNode: "IF-Knoten drehen",
        foundTransitionsForRotation: "Übergänge für Drehung gefunden",
        missingTransitionsForIfRotation: "Fehlende Übergänge für IF-Drehung",
        transitionStyleToggled: "Übergangsstil umgeschaltet",
        breakPointAddedToTransition: "Haltepunkt zu Übergang hinzugefügt",
        breakPointRemovedFromTransition: "Haltepunkt von Übergang entfernt",
        allBreakPointsClearedFromTransition: "Alle Haltepunkte von Übergang gelöscht",
        startNodeIsNull: "StartNode ist null beim Versuch, Übergang zu erstellen",
        transitionCreatedSuccessfully: "Übergang erfolgreich erstellt",
        transitionCreationFailedOrDuplicate: "Übergangs-Erstellung fehlgeschlagen oder Duplikat erkannt",
        cannotCreateTransitionInvalidNodes: "Übergang kann nicht erstellt werden - ungültige Knoten",
        transitionAlreadyExistsBetweenNodes: "Übergang existiert bereits zwischen diesen Knoten",
        
        // Additional DiagramController debug translations
        startDraggingBreakPoint: "Haltepunkt ziehen starten",
        elementEditedEventReceived: "Element-bearbeitet-Event erhalten",
        dataModelUpdatedEventReceived: "Datenmodell-aktualisiert-Event erhalten",
        breakPointMovedEventReceived: "Haltepunkt-verschoben-Event erhalten",
        multipleBreakPointsMovedEventReceived: "Mehrere-Haltepunkte-verschoben-Event erhalten",
        autoSavedToNamedProject: "Auto-gespeichert zu benanntem Projekt",
        autoSaveTriggeredAfterModification: "Auto-Speichern nach Änderung ausgelöst",
        
        terminalClear: "Terminal Löschen",
        terminalClose: "Terminal Schließen",
        terminalExport: "Logs Exportieren",
        
        // Language switcher
        selectLanguage: "Sprache Auswählen",
        
        // Common
        yes: "Ja",
        no: "Nein",
        ok: "OK",
        close: "Schließen",
        edit: "Bearbeiten",
        remove: "Entfernen",
        duplicate: "Duplizieren",
        search: "Suchen",
        filterText: "Text filtern...",
        
        // Tooltips
        englishFlag: "Englisch",
        polishFlag: "Polnisch",
        basicNodeTooltip: "Basis-Knoten - auf Leinwand ziehen, um Prozess-Element hinzuzufügen",
        textElementTooltip: "Text-Element - fügt Bezeichnungen und Beschreibungen zum Diagramm hinzu",
        startPointTooltip: "Prozess-Startpunkt - markiert den Anfang des Diagramms",
        endPointTooltip: "Prozess-Endpunkt - markiert das Ende des Diagramms",
        logicalConditionTooltip: "Logische Bedingung - ermöglicht Prozess-Verzweigung basierend auf Entscheidung",
        dataModelTooltip: "Datenmodell - definiert Datenstruktur mit Feldern und Typen",
        singleConnectionTooltip: "Einfache Verbindung - erstellt Pfeil in eine Richtung",
        dualConnectionTooltip: "Doppelte Verbindung - erstellt Pfeile in beide Richtungen",
        straightLineTooltip: "Gerade Linie - verbindet Elemente ohne Pfeil",
        toggleGridTooltip: "Hilfsraster auf Leinwand aktivieren/deaktivieren",
        toggleRulersTooltip: "Messlineale auf Leinwand aktivieren/deaktivieren", 
        canvasTooltip: "Zeichen-Leinwand - Komponenten aus linkem Panel ziehen, klicken zum Auswählen, doppelklicken zum Bearbeiten",
        clearAllProjectsTooltip: "Alle gespeicherten Projekte aus Liste entfernen",
        searchProjectsTooltip: "Projektname eingeben, um ihn in der Liste zu finden",
        toggleTerminalTooltip: "Konsolen-Terminal anzeigen/verbergen",
        removeSelectedTooltip: "Ausgewählte Elemente aus Diagramm entfernen",
        newProjectTooltip: "Neues Projekt erstellen - löscht Leinwand und startet von vorn",
        saveProjectTooltip: "Aktuelles Projekt im Browser speichern",
        loadProjectTooltip: "Gespeichertes Projekt aus Datei laden",
        clearCanvasTooltip: "Gesamte Leinwand löschen - alle Elemente entfernen",
        exportImageTooltip: "Diagramm als PNG-Bild exportieren",
        exportFileTooltip: "Projekt als JSON-Datei exportieren",
        importFileTooltip: "Projekt aus JSON-Datei importieren",
        resizeTerminalTooltip: "Ziehen, um Terminal-Höhe zu ändern",
        filterMessagesByTextTooltip: "Nachrichten nach Text filtern",
        filterMessagesByTypeTooltip: "Nachrichten nach Typ filtern",
        exportLogsTooltip: "Logs in Datei exportieren",
        clearTerminalTooltip: "Terminal löschen",
        closeTerminalTooltip: "Terminal schließen",
        enterCommandTooltip: "Befehl eingeben und Enter drücken",
        typeCommandPlaceholder: "Befehl eingeben...",
        
        // Terminal messages
        terminalInitialized: "Terminal-Service erfolgreich initialisiert.",
        canvasDropTracking: "Canvas-Drop-Tracking aktiviert - alle Drag & Drop-Operationen werden hier protokolliert.",
        typeHelpForCommands: "Geben Sie \"help\" für verfügbare Befehle ein.",
        terminalHelpTitle: "🎯 DIAVINCI TERMINAL - Verfügbare Befehle",
        basicCommands: "🔧 GRUNDLEGENDE BEFEHLE:",
        helpCommand: "help          - Diese Hilfenachricht anzeigen",
        clearCommand: "clear         - Terminal-Ausgabe löschen", 
        statusCommand: "status        - Systemstatus anzeigen",
        exportCommand: "export        - Logs in Datei exportieren",
        versionCommand: "version       - Anwendungsversion anzeigen",
        timeCommand: "time          - Aktuelle Zeit anzeigen",
        historyCommand: "history       - Befehlshistorie anzeigen",
        resetCommand: "reset         - Anwendungszustand zurücksetzen",
        searchInspect: "🔍 SUCHEN & INSPIZIEREN:",
        findCommand: "find <id>     - Element nach ID finden",
        searchCommand: "search <text> - Elemente nach Bezeichnung/Name suchen",
        inspectCommand: "inspect <id>  - Detaillierte Element-Info anzeigen",
        listElementsCommand: "list elements - Alle Elemente mit IDs auflisten",
        listNodesCommand: "list nodes    - Nur Knoten auflisten",
        listTextsCommand: "list texts    - Nur Text-Elemente auflisten",
        listTransCommand: "list trans    - Nur Übergänge auflisten",
        countCommand: "count         - Alle Projekt-Elemente zählen",
        analyticsCommands: "📊 ANALYTIK:",
        statsCommand: "stats         - Detaillierte Projekt-Statistiken anzeigen",
        memoryCommand: "memory        - Speicherverbrauch-Info anzeigen",
        performanceCommand: "performance   - Leistungsmetriken anzeigen",
        validateCommand: "validate      - Projekt-Integrität validieren",
        debuggingCommands: "🛠️ DEBUGGING:",
        debugCommand: "debug on/off  - Debug-Protokollierung umschalten",
        debugProjectCommand: "debug project - Projekt-Debug-Info anzeigen",
        debugNodesCommand: "debug nodes   - Alle Knoten mit Typen anzeigen",
        logsCommand: "logs <type>   - Logs nach Typ filtern",
        traceCommand: "trace <id>    - Element-Beziehungen verfolgen",
        errorsCommand: "errors        - Aktuelle Fehler-Logs anzeigen",
        dataModelCommands: "📋 DATENMODELL:",
        fieldsCommand: "fields <id>   - Alle Felder des Datenmodells auflisten",
        fieldCommand: "field <id> <name> - Feldwert aus Modell abrufen",
        modelsCommand: "models        - Alle Datenmodell-Knoten auflisten",
        quickFieldAccess: "ID.feldname - Schneller Feldzugriff (z.B. 123.name)",
        tabAutocomplete: "💡 Verwenden Sie TAB nach Punkt für Autovervollständigung",
        systemCommands: "⚙️ SYSTEM:",
        configCommand: "config        - Systemkonfiguration anzeigen",
        backupCommand: "backup        - Projekt-Backup erstellen",
        cleanupCommand: "cleanup       - Temporäre Daten bereinigen",
        pingCommand: "ping          - System-Reaktionsfähigkeit testen",
        logsExported: "Logs exportiert nach",
        entriesCount: "Einträge",
        failedToExport: "Export von Logs fehlgeschlagen:",
        functionFailed: "Funktion fehlgeschlagen:",
        stackTrace: "Stack-Trace:",
        availableFields: "💡 Verfügbare Felder für Element",
        basicFields: "Grundlegend:",
        nestedFields: "Verschachtelt:",
        noFieldsMatch: "⚠️ Keine Felder entsprechen",
        elementNotFound: "⚠️ Element mit ID nicht gefunden.",
        availableCompletions: "💡 Verfügbare Vervollständigungen:",
        noCommandsMatch: "⚠️ Keine Befehle entsprechen",
        moreFields: "weitere Felder",
        andMoreFields: "... und",
        useFieldsToSeeAll: "Verwenden Sie \"fields",
        toSeeAllFields: "\" um alle Felder zu sehen",
        field: "Feld",
        fields: "Felder",
        
        // Terminal command messages
        terminalClearedByUser: "Terminal durch Benutzerbefehl gelöscht.",
        systemStatus: "⚡ Systemstatus:",
        terminalLines: "🔹 Terminal-Zeilen:",
        activeFilter: "🔹 Aktiver Filter:",
        terminalVisible: "🔹 Terminal sichtbar:",
        maxLines: "🔹 Maximale Zeilen:",
        browser: "🔹 Browser:",
        yes: "Ja",
        no: "Nein",
        divinciTitle: "🎨 DIAVINCI - Datenfluss-Designer",
        versionInfo: "📦 Version 1.0.0",
        copyrightInfo: "© 2025 DiAVinci Development",
        currentTime: "🕐 Aktuelle Zeit:",
        commandHistoryTitle: "📚 Befehlshistorie (letzte 10):",
        noCommandHistory: "❌ Keine Befehlshistorie verfügbar.",
        logsExportedSuccess: "📄 Logs erfolgreich in Download-Ordner exportiert.",
        resetConfirmation: "⚠️  Sind Sie sicher, dass Sie zurücksetzen möchten? Geben Sie \"reset confirm\" ein, um fortzufahren.",
        resetCompleted: "🔄 Anwendungsstatus-Reset abgeschlossen.",
        welcomeBackMessage: "Willkommen zurück im DiAVinci Terminal!",
        debugModeEnabled: "🐛 Debug-Modus aktiviert - ausführliche Protokollierung aktiviert.",
        debugModeDisabled: "🔇 Debug-Modus deaktiviert - normale Protokollierung wiederhergestellt.",
        typeHelpForCommands: "💡 Geben Sie \"help\" ein, um alle verfügbaren Befehle zu sehen.",
        invalidSyntaxField: "❌ Ungültige Syntax. Verwendung: field <data-model-id> <field-name>",
        invalidIdNumber: "❌ Ungültige ID: \"$1\". Muss eine Zahl sein.",
        elementNotFoundById: "❌ Element mit ID $1 nicht gefunden.",
        provideElementId: "❌ Bitte geben Sie eine Element-ID an. Verwendung: find <id>",
        noActiveProject: "❌ Kein aktives Projekt gefunden. Stellen Sie sicher, dass die Anwendung vollständig geladen ist.",
        debuggingWindowApp: "🔧 Debugging: window.app verfügbar?",
        debuggingWindowContainer: "🔧 Debugging: window.container verfügbar?",
        searchingInProject: "🔍 Suche in Projekt mit $1 Knoten, $2 Texten, $3 Übergängen",
        elementFound: "✅ ELEMENT GEFUNDEN",
        elementType: "🔹 Typ:",
        elementId: "🔹 ID:",
        elementLabel: "🔹 Bezeichnung:",
        elementPosition: "🔹 Position:",
        elementSize: "🔹 Größe:",
        elementColor: "🔹 Farbe:",
        nodeType: "🔹 Knotentyp:",
        transitionFrom: "🔹 Von:",
        transitionTo: "🔹 Nach:",
        transitionStyle: "🔹 Stil:",
        fieldsAvailable: "🔹 Felder: $1 Felder verfügbar",
        useInspectForDetails: "💡 Verwenden Sie \"inspect $1\" für weitere Details",
        elementNotFound: "❌ ELEMENT NICHT GEFUNDEN",
        searchedId: "🔍 Gesuchte ID:",
        totalElements: "🔍 Gesamte Elemente:",
        similarMatchesFound: "🔍 Ähnliche Übereinstimmungen gefunden:",
        moreMatches: "... und $1 weitere Übereinstimmungen",
        helpfulCommands: "💡 Hilfreiche Befehle:",
        listElementsHelp: "   • \"list elements\" - Alle verfügbaren Elemente anzeigen",
        debugProjectHelp: "   • \"debug project\" - Projektstruktur anzeigen",
        availableElementsFirst3: "📋 Verfügbare Elemente (erste 3):",
        provideFindId: "❌ Bitte geben Sie eine Element-ID an. Verwendung: find <id>",
        provideInspectId: "❌ Bitte geben Sie eine Element-ID an. Verwendung: inspect <id>",
        detailedInspection: "🔍 DETAILLIERTE INSPEKTION",
        positionCoords: "🔸 Position: X:$1, Y:$2",
        sizePixels: "🔸 Größe: $1 × $2 Pixel",
        background: "🔸 Hintergrund:",
        border: "🔸 Rahmen:",
        transitionDetails: "🔗 Übergangsdetails:",
        transitionFromTo: "   • Von: $1",
        transitionToFrom: "   • Nach: $1",
        styleInfo: "   • Stil: $1",
        conditionInfo: "   • Bedingung: $1",
        fieldsTotal: "📋 Felder ($1 insgesamt):",
        fieldDefault: "      └ Standard: $1",
        timestamps: "⏰ Zeitstempel",
        created: "🔸 Erstellt: $1",
        modified: "🔸 Geändert: $1",
        allProperties: "🔧 Alle Eigenschaften",
        jsonData: "📄 JSON-Daten",
        quickActions: "💡 Schnelle Aktionen:",
        copyJsonTip: "   • JSON kopieren: Verwenden Sie Browser-Entwicklertools",
        findSimilarTip: "   • Ähnliche finden: \"list elements\" um alle zu sehen",
        quickFindTip: "   • Schnellsuche: \"find <teil-id>\" für unscharfe Suche",
        inspectionFailed: "❌ Inspektion Fehlgeschlagen",
        targetId: "🔸 Ziel-ID:",
        searchType: "🔸 Suchtyp:",
        projectElements: "🔸 Projektelemente:",
        partialIdMatches: "🎯 TEILWEISE ID-ÜBEREINSTIMMUNGEN:",
        labelMatches: "🏷️  BEZEICHNUNGSÜBEREINSTIMMUNGEN:",
        troubleshootingTips: "💡 FEHLERBEHEBUNGSTIPPS:",
        checkIdSpelling: "   • ID-Schreibweise und Groß-/Kleinschreibung prüfen",
        useListElements: "   • \"list elements\" für vollständige Elementliste verwenden",
        tryDebugProject: "   • \"debug project\" für Projektübersicht versuchen",
        sampleAvailableIds: "📋 BEISPIEL VERFÜGBARE IDs:",
        andMoreElements: "   ... und $1 weitere Elemente",
        allProjectElements: "📋 Alle Projektelemente",
        projectName: "🔸 Projekt:",
        totalNodes: "🔸 Gesamte Knoten:",
        totalTexts: "🔸 Gesamte Texte:",
        totalTransitions: "🔸 Gesamte Übergänge:",
        nodes: "Knoten",
        textElements: "📝 Textelemente ($1):",
        transitions: "🔗 Übergänge ($1):",
        positionDebug: "      └ Position: ($1, $2)",
        transitionConnection: "      └ Von: $1 → Nach: $2",
        noElementsFound: "📭 Keine Elemente in diesem Projekt gefunden",
        summaryTotal: "📊 Zusammenfassung: $1 Elemente insgesamt",
        findSpecificElement: "   • \"find <id>\" - Bestimmtes Element nach ID finden",
        viewDetailedElement: "   • \"inspect <id>\" - Detaillierte Elementinformationen anzeigen",
        searchElementsByText: "   • \"search <text>\" - Elemente nach Textinhalt suchen",
        projectDebugInfo: "🔧 PROJEKT-DEBUG-INFORMATIONEN",
        nodesCount: "🔷 Knotenanzahl:",
        textsCount: "📝 Textanzahl:",
        transitionsCount: "🔗 Übergangsanzahl:",
        nodesDetails: "🔷 KNOTENDETAILS:",
        textsDetails: "📝 TEXTDETAILS:",
        transitionsDetails: "🔗 ÜBERGANGSDETAILS:",
        typeLabel: "Typ: $1, Bezeichnung: \"$2\", ID: $3",
        
        // DataModelNode validation messages
        fieldNameRequired: "Feldname ist erforderlich",
        fieldNameDangerous: "Feldname enthält potenziell gefährlichen Inhalt",
        fieldNameFormat: "Feldname muss mit Buchstabe oder Unterstrich beginnen und darf nur Buchstaben, Zahlen und Unterstriche enthalten",
        fieldNameTooLong: "Feldname darf 25 Zeichen nicht überschreiten",
        fieldNameSqlPatterns: "Feldname enthält potenziell gefährliche SQL-Muster",
        fieldNameReserved: "Feldname darf kein reserviertes Wort sein",
        valueDangerousScript: "Wert enthält potenziell gefährlichen Skript-Inhalt",
        valueDangerousSql: "Wert enthält potenziell gefährliche SQL-Muster",
        valueTooLong: "Wert ist zu lang (maximal 1000 Zeichen)",
        fieldNameMustBeUnique: "Feldname muss eindeutig sein",
        fieldNameCannotBeEmpty: "Feldname darf nicht leer sein",
        fieldNameAlreadyInUse: "Feldname '$1' wird bereits verwendet",
        
        // Validation error messages
        invalidUuidFormat: "Ungültiges UUID-Format: '$1'. Verwenden Sie Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein",
        invalidColorFormat: "Ungültiges Farbformat: '$1'. Verwenden Sie Hex (#ff0000), Farbname oder rgb/rgba",
        
        // DataModelEditor validation messages
        securityViolation: "Sicherheitsverletzung",
        pleaseFixValidationErrors: "Bitte beheben Sie die Validierungsfehler",
        invalidJsonSchemaStructure: "Ungültige JSON-Schema-Struktur",
        invalidJsonSyntax: "Ungültige JSON-Syntax",
        jsonError: "JSON-Fehler",
        generalError: "Allgemein",
        fieldErrors: "Feldfehler",
        validJsonSchema: "Gültiges JSON-Schema",
        warnings: "Warnungen",
        missingTitle: "Titel fehlt",
        missingDescription: "Beschreibung fehlt",
        noPropertiesDefined: "Keine Eigenschaften definiert",
        duplicateFieldNames: "Doppelte Feldnamen",
        
        // SecurityConfig validation messages
        inputContainsDangerousScript: "Eingabe enthält potenziell gefährlichen Skript-Inhalt",
        inputContainsDangerousSQL: "Eingabe enthält potenziell gefährliche SQL-Muster",
        inputContainsDangerousSystem: "Eingabe enthält potenziell gefährliche Systemzugriffsmuster",
        inputExceedsMaxLength: "Eingabe überschreitet maximale Länge von $1 Zeichen",
        
        // InputValidator validation messages
        inputContainsDangerousScriptPatterns: "Eingabe enthält potenziell gefährliche Skript-Muster",
        inputExceedsMaxLength100KB: "Eingabe überschreitet maximale Länge von 100KB",
        inputContainsUnsafeCharacters: "Eingabe enthält unsichere Zeichen",
        
        // DataModelNode validation messages
        modelNameRequired: "Modellname ist erforderlich",
        modelNameTooLong: "Modellname darf 50 Zeichen nicht überschreiten",
        modelMustHaveField: "Modell muss mindestens ein Feld haben",
        fixFieldValidationErrors: "Bitte beheben Sie Feldvalidierungsfehler vor dem Speichern",
        
        // DataModelNode value validation messages
        invalidNumberFormat: "Ungültiges Zahlenformat: \"$1\"",
        invalidCurrencyFormat: "Ungültiges Währungsformat: \"$1\". Verwenden Sie Format wie \"EUR 23\" oder \"23\"",
        booleanValueRequired: "Boolean-Wert muss einer von folgenden sein: $1",
        invalidDateFormat: "Ungültiges Datumsformat: \"$1\". Verwenden Sie YYYY-MM-DD oder ISO-Format",
        invalidEmailFormat: "Ungültiges E-Mail-Format: \"$1\"",
        invalidUrlFormat: "Ungültiges URL-Format: \"$1\"",
        invalidPhoneFormat: "Ungültiges Telefonformat: \"$1\". Verwenden Sie internationales Format (+1234567890)",
        invalidJsonObjectFormat: "Ungültiges JSON-Objektformat: \"$1\"",
        invalidJsonArrayFormat: "Ungültiges JSON-Array-Format: \"$1\"",
        valueNotValidJsonArray: "Wert muss ein gültiges JSON-Array sein: \"$1\"",
        invalidFileFormat: "Ungültiges Dateiformat: \"$1\". Verwenden Sie Dateiname mit Erweiterung, Data-URL oder HTTP-URL",
        invalidJsonFormat: "Ungültiges JSON-Format: \"$1\"",
        invalidBase64Format: "Ungültiges Base64-Format: \"$1\"",
        invalidIntegerFormat: "Ungültiges Ganzzahl-Format: \"$1\"",
        invalidDecimalFormat: "Ungültiges Dezimalformat: \"$1\"",
        invalidPercentageFormat: "Ungültiger Prozentsatz: \"$1\". Muss 0-100 oder 0%-100% sein",
        invalidDurationFormat: "Ungültiges Dauerformat: \"$1\". Verwenden Sie Formate wie \"1h 30m\", \"90min\", \"2:30\" oder ISO 8601",
        invalidDateTimeFormat: "Ungültiges Datum-Zeit-Format: \"$1\". Verwenden Sie ISO-Format: YYYY-MM-DDTHH:mm:ss",
        invalidTimeFormat: "Ungültiges Zeitformat: \"$1\". Verwenden Sie HH:mm oder HH:mm:ss Format",
        invalidTimestampFormat: "Ungültiger Zeitstempel: \"$1\". Muss eine positive Ganzzahl sein",
        invalidIpv4Format: "Ungültige IPv4-Adresse: \"$1\". Verwenden Sie Format: 192.168.1.1",
        invalidIpv6Format: "Ungültige IPv6-Adresse: \"$1\"",
        invalidMacFormat: "Ungültige MAC-Adresse: \"$1\". Verwenden Sie Format: XX:XX:XX:XX:XX:XX oder XX-XX-XX-XX-XX-XX",
        invalidCreditCardFormat: "Ungültige Kreditkartennummer: \"$1\". Muss 13-19 Ziffern haben",
        invalidIbanFormat: "Ungültige IBAN: \"$1\". Verwenden Sie Format: CC22BBBBSSSSCCCCCCCCCCCC",
        invalidCountryCodeFormat: "Ungültiger Ländercode: \"$1\". Verwenden Sie ISO 3166-1 alpha-2 Format (z.B. US, GB, DE)",
        invalidLanguageCodeFormat: "Ungültiger Sprachcode: \"$1\". Verwenden Sie ISO 639-1 Format (z.B. en, en-US, de-DE)",
        invalidTimezoneFormat: "Ungültige Zeitzone: \"$1\". Verwenden Sie IANA Zeitzonenformat (z.B. America/New_York, Europe/London)",
        
        // Messages
        projectSaved: "Projekt erfolgreich gespeichert",
        projectLoaded: "Projekt erfolgreich geladen",
        projectDeleted: "Projekt erfolgreich gelöscht",
        imageExported: "Bild erfolgreich exportiert",
        fileExported: "Datei erfolgreich exportiert",
        fileImported: "Datei erfolgreich importiert",
        
        // Errors
        errorSaving: "Fehler beim Speichern des Projekts",
        errorLoading: "Fehler beim Laden des Projekts",
        errorDeleting: "Fehler beim Löschen des Projekts",
        errorExporting: "Fehler beim Exportieren",
        errorImporting: "Fehler beim Importieren der Datei",
        invalidFile: "Ungültiges Dateiformat",
        
        // Application initialization
        appInitializedSuccessfully: "DiaVinci-Anwendung erfolgreich initialisiert!",
        errorInitializingApplication: "Fehler beim Initialisieren der Anwendung",
        errorStartingApplication: "Fehler beim Starten der Anwendung. Bitte aktualisieren Sie die Seite.",
        
        // Error handling
        unhandledPromiseRejection: "Unbehandelte Promise-Verwerfung",
        uncaughtError: "Nicht abgefangener Fehler",
        unexpectedErrorOccurred: "Unerwarteter Fehler aufgetreten",
        applicationError: "Anwendungsfehler",
        operationFailed: "Operation fehlgeschlagen",
        missingRequiredParameters: "Erforderliche Parameter fehlen",
        failedToParseJson: "JSON konnte nicht geparst werden",
        failedToStringifyJson: "JSON konnte nicht stringifiziert werden",
        
        // Logger messages
        droppedElement: "Abgelegt",
        atPosition: "an Position",
        canvasDrop: "Canvas-Ablage",
        textControl: "Text-Steuerung",
        movedElement: "Verschoben",
        fromPosition: "von",
        toPosition: "zu",
        fromPositionShort: "Von",
        toPositionShort: "zu",
        modifiedElement: "Geändert",
        changedFrom: "geändert von",
        changedTo: "zu",
        elementMove: "Element-Bewegung",
        elementModify: "Element-Änderung",
        performance: "Leistung",
        userAction: "Benutzer-Aktion",
        
        // Storage Service messages
        storageServiceInitialized: "StorageService initialisiert",
        failedToSaveProject: "Projekt konnte nicht gespeichert werden",
        projectSavedSuccessfully: "Projekt erfolgreich gespeichert",
        errorSavingProject: "Fehler beim Speichern des Projekts",
        projectNotFound: "Projekt nicht gefunden",
        errorLoadingProject: "Fehler beim Laden des Projekts",
        errorGettingProjects: "Fehler beim Abrufen der Projekte", 
        errorDeletingProject: "Fehler beim Löschen des Projekts",
        errorClearingProjects: "Fehler beim Löschen der Projekte",
        autoSaveCompleted: "Auto-Speichern abgeschlossen",
        untitled: "Unbenannt",
        autoSaveFailed: "Auto-Speichern fehlgeschlagen",
        failedToLoadAutoSave: "Auto-Speichern konnte nicht geladen werden",
        errorExportingProject: "Fehler beim Exportieren des Projekts",
        invalidProjectFileFormat: "Ungültiges Projekt-Dateiformat",
        errorReadingFile: "Fehler beim Lesen der Datei",
        
        // Canvas Renderer messages
        canvasRendererInitialized: "CanvasRenderer initialisiert",
        invalidNodeDetected: "Ungültiger Knoten erkannt",
        canvasRender: "Canvas-Rendering",
        errorRenderingCanvas: "Fehler beim Rendern der Canvas",
        invalidTransitionDetected: "Ungültiger Übergang erkannt",
        invalidConnectionPoints: "Ungültige Verbindungspunkte",
        errorRenderingTransition: "Fehler beim Rendern des Übergangs",
        errorRenderingNode: "Fehler beim Rendern des Knotens", 
        invalidTextElementDetected: "Ungültiges Text-Element erkannt",
        errorRenderingText: "Fehler beim Rendern des Textes",
        failedToRenderDiagram: "Diagramm konnte nicht gerendert werden",
        
        // Terminal Service messages
        terminalElementsNotFoundInDOM: "Terminal-Elemente im DOM nicht gefunden",
        scrollToBottomTerminalContentNotFound: "ScrollToBottom: Terminal-Inhaltselement nicht gefunden",
        unknownCommand: "Unbekannter Befehl",
        invalidSyntax: "Ungültige Syntax",
        elementNotFound: "Element nicht gefunden",
        invalidId: "Ungültige ID",
        fieldNotFound: "Feld nicht gefunden",
        noElementsFound: "Keine Elemente in diesem Projekt gefunden",
        invalidLogType: "Ungültiger Log-Typ",
        
        // Export Service messages
        exportServiceInitialized: "ExportService initialisiert",
        exportImageStarted: "Bild-Export gestartet",
        noProjectProvidedForExport: "Kein Projekt für Export bereitgestellt",
        failedToGet2DContextForExportCanvas: "2D-Kontext für Export-Canvas konnte nicht abgerufen werden",
        exportCanvasCreated: "Export-Canvas erstellt",
        fileSystemAccessApiFailed: "Dateisystem-Zugriffs-API fehlgeschlagen, wechsle zu Fallback",
        exportCancelledByUser: "Export vom Benutzer abgebrochen",
        usingFallbackSaveMethod: "Verwende Fallback-Speichermethode",
        exportImage: "Bild Exportieren",
        imageExportCompleted: "Bild-Export abgeschlossen",
        failedToExportImage: "Bild-Export fehlgeschlagen"
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

// Update language button states and current flag
function updateLanguageButtons() {
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');
    
    // Update the current flag and language text in the dropdown button (always use SVG)
    if (currentFlag) {
        if (currentLanguage === 'en') {
            currentFlag.src = 'Resources/flags/gb-round.svg';
            currentFlag.alt = 'EN';
        } else if (currentLanguage === 'pl') {
            currentFlag.src = 'Resources/flags/pl-round.svg';
            currentFlag.alt = 'PL';
        } else if (currentLanguage === 'de') {
            currentFlag.src = 'Resources/flags/de-round.svg';
            currentFlag.alt = 'DE';
        }
    }
    
    // Update the language code text
    if (currentLang) {
        if (currentLanguage === 'en') {
            currentLang.textContent = 'EN';
        } else if (currentLanguage === 'pl') {
            currentLang.textContent = 'PL';
        } else if (currentLanguage === 'de') {
            currentLang.textContent = 'DE';
        }
    }
}

// Initialize language system
function initializeLanguage() {
    // Get stored language
    currentLanguage = getStoredLanguage();
    
    // Check if emoji flags are supported, if not use SVG fallback
    checkEmojiFlagSupport();
    
    // Setup language switcher dropdown
    const dropdownBtn = document.getElementById('language-dropdown-btn');
    const dropdown = document.getElementById('language-dropdown');
    const enBtn = document.getElementById('lang-en');
    const plBtn = document.getElementById('lang-pl');
    const currentFlag = document.getElementById('current-flag');
    
    // Toggle dropdown on button click
    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }
    
    // Language selection handlers
    if (enBtn) {
        enBtn.addEventListener('click', () => {
            switchLanguage('en');
            dropdown.classList.add('hidden');
        });
    }
    
    if (plBtn) {
        plBtn.addEventListener('click', () => {
            switchLanguage('pl');
            dropdown.classList.add('hidden');
        });
    }
    
    const deBtn = document.getElementById('lang-de');
    if (deBtn) {
        deBtn.addEventListener('click', () => {
            switchLanguage('de');
            dropdown.classList.add('hidden');
        });
    }
    
    // Initial translation update
    updateTranslations();
    
    // Update language buttons after setup (using SVG flags)
    updateLanguageButtons();
}

// Check if emoji flags are supported and provide fallback
function checkEmojiFlagSupport() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 1;
    
    // Try to draw GB flag emoji
    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText('', 0, 0);
    
    // If the emoji is not supported, it will render as two separate characters
    // In that case, we'll use SVG flags
    const imageData = ctx.getImageData(0, 0, 1, 1).data;
    const isMonochrome = imageData[0] === imageData[1] && imageData[1] === imageData[2];
    
    if (isMonochrome) {
        // Emoji flags not supported, use SVG fallback
        document.body.classList.add('no-emoji-flags');
        
        // Replace emoji with SVG images in dropdown options - now handled by CSS classes
    }
    
    // Update the main dropdown button flag after determining emoji support
    updateLanguageButtons();
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

