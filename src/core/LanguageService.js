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
        terminalHelpTitle: "đźŽŻ DIAVINCI TERMINAL - Available Commands",
        basicCommands: "đź”§ BASIC COMMANDS:",
        helpCommand: "help          - Show this help message",
        clearCommand: "clear         - Clear terminal output", 
        statusCommand: "status        - Show system status",
        exportCommand: "export        - Export logs to file",
        versionCommand: "version       - Show application version",
        timeCommand: "time          - Show current time",
        historyCommand: "history       - Show command history",
        resetCommand: "reset         - Reset application state",
        searchInspect: "đź”Ť SEARCH & INSPECT:",
        findCommand: "find <id>     - Find element by ID",
        searchCommand: "search <text> - Search elements by label/name",
        inspectCommand: "inspect <id>  - Show detailed element info",
        listElementsCommand: "list elements - List all elements with IDs",
        listNodesCommand: "list nodes    - List only nodes",
        listTextsCommand: "list texts    - List only text elements",
        listTransCommand: "list trans    - List only transitions",
        countCommand: "count         - Count all project elements",
        analyticsCommands: "đź“Š ANALYTICS:",
        statsCommand: "stats         - Show detailed project stats",
        memoryCommand: "memory        - Show memory usage info",
        performanceCommand: "performance   - Show performance metrics",
        validateCommand: "validate      - Validate project integrity",
        debuggingCommands: "đź› ď¸Ź DEBUGGING:",
        debugCommand: "debug on/off  - Toggle debug logging",
        debugProjectCommand: "debug project - Show project debug info",
        debugNodesCommand: "debug nodes   - Show all nodes with types",
        logsCommand: "logs <type>   - Filter logs by type",
        traceCommand: "trace <id>    - Trace element relationships",
        errorsCommand: "errors        - Show recent error logs",
        dataModelCommands: "đź“‹ DATA MODEL:",
        fieldsCommand: "fields <id>   - List all fields of data model",
        fieldCommand: "field <id> <name> - Get field value from model",
        modelsCommand: "models        - List all data model nodes",
        quickFieldAccess: "ID.field_name - Quick field access (e.g., 123.name)",
        tabAutocomplete: "đź’ˇ Use TAB after dot for autocomplete",
        systemCommands: "âš™ď¸Ź SYSTEM:",
        configCommand: "config        - Show system configuration",
        backupCommand: "backup        - Create project backup",
        cleanupCommand: "cleanup       - Clean temporary data",
        pingCommand: "ping          - Test system responsiveness",
        logsExported: "Logs exported to",
        entriesCount: "entries",
        failedToExport: "Failed to export logs:",
        functionFailed: "Function failed:",
        stackTrace: "Stack trace:",
        availableFields: "đź’ˇ Available fields for element",
        basicFields: "Basic:",
        nestedFields: "Nested:",
        noFieldsMatch: "âťŚ No fields match",
        elementNotFound: "âťŚ Element with ID not found.",
        availableCompletions: "đź’ˇ Available completions:",
        noCommandsMatch: "âťŚ No commands match",
        moreFields: "more fields",
        andMoreFields: "... and",
        useFieldsToSeeAll: "Use \"fields",
        toSeeAllFields: "\" to see all fields",
        field: "field",
        fields: "fields",
        
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
        exportError: "Export error"
    },
    
    pl: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Komponenty",
        nodes: "WÄ™zĹ‚y",
        texts: "Teksty",
        transitions: "PrzejĹ›cia",
        
        // Node types
        process: "Proces",
        start: "Start",
        stop: "Stop",
        decision: "Decyzja",
        data: "Dane",
        dataModel: "Model Danych",
        singleWay: "Droga Pojedyncza",
        dualWay: "Droga PodwĂłjna",
        line: "Linia",
        
        // Bottom navigation
        newProject: "Nowy Projekt",
        saveProject: "Zapisz Projekt",
        loadProject: "Wczytaj Projekt",
        exportImage: "Eksportuj Obraz",
        exportFile: "Eksportuj Plik",
        importFile: "Importuj Plik",
        removeSelected: "UsuĹ„ Zaznaczone",
        save: "Zapisz",
        load: "Wczytaj",
        clear: "WyczyĹ›Ä‡ Wszystko",
        
        // Export options
        exportOptions: "Opcje Eksportu",
        whiteBackground: "BiaĹ‚e TĹ‚o",
        transparentBackground: "Przezroczyste TĹ‚o",
        
        // Save dialog
        saveProjectTitle: "Zapisz Projekt",
        projectName: "Nazwa Projektu",
        save: "Zapisz",
        cancel: "Anuluj",
        enterProjectName: "WprowadĹş nazwÄ™ projektu...",
        saveAsPrivate: "Zapisz jako projekt prywatny",
        projectNameRequired: "Nazwa projektu jest wymagana",
        passwordRequired: "HasĹ‚o jest wymagane dla projektĂłw prywatnych",
        projectPassword: "HasĹ‚o Projektu",
        enterPasswordPlaceholder: "WprowadĹş hasĹ‚o dla projektu prywatnego...",
        rememberPassword: "ZapamiÄ™taj to hasĹ‚o - nie moĹĽna go odzyskaÄ‡!",
        
        // Project status messages
        publicProjectSaved: "Projekt publiczny zapisany pomyĹ›lnie!",
        privateProjectSaved: "Projekt prywatny zapisany pomyĹ›lnie!",
        publicProjectLoaded: "Projekt publiczny wczytany pomyĹ›lnie!",
        privateProjectLoaded: "Projekt prywatny wczytany pomyĹ›lnie!",
        newPublicProject: "Nowy projekt publiczny utworzony i zapisany!",
        newPrivateProject: "Nowy projekt prywatny utworzony i zapisany!",
        
        // Dialog titles and actions
        loadProjectTitle: "Wczytaj Projekt",
        createNewProjectTitle: "UtwĂłrz Nowy Projekt", 
        deleteProjectTitle: "UsuĹ„ Projekt",
        deleteAllProjectsTitle: "UsuĹ„ Wszystkie Projekty",
        clearCurrentProjectTitle: "WyczyĹ›Ä‡ Obecny Projekt",
        close: "Zamknij",
        load: "Wczytaj",
        delete: "UsuĹ„",
        createProject: "UtwĂłrz Projekt",
        deleteProjectConfirm: "Czy na pewno chcesz usunÄ…Ä‡ projekt",
        actionCannotBeUndone: "Ta akcja nie moĹĽe zostaÄ‡ cofniÄ™ta.",
        
        // Password dialog
        enterPasswordTitle: "WprowadĹş HasĹ‚o",
        enterPasswordMessage: "ProszÄ™ wprowadziÄ‡ hasĹ‚o dla projektu:",
        enterPasswordPlaceholder2: "WprowadĹş hasĹ‚o...",
        unlock: "Odblokuj",
        passwordCannotBeEmpty: "HasĹ‚o nie moĹĽe byÄ‡ puste",
        incorrectPassword: "NieprawidĹ‚owe hasĹ‚o. SprĂłbuj ponownie.",
        confirm: "PotwierdĹş",
        
        // Load dialog
        noProjectsFound: "Nie znaleziono zapisanych projektĂłw",
        noProjectsMatchingSearch: "Nie znaleziono projektĂłw pasujÄ…cych do wyszukiwania",
        clearAllProjectsConfirm: "Czy na pewno chcesz usunÄ…Ä‡ <strong>WSZYSTKIE</strong> zapisane projekty i wyczyĹ›ciÄ‡ pĹ‚Ăłtno?<br><br><strong>Ta akcja nie moĹĽe zostaÄ‡ cofniÄ™ta!</strong>",
        createFirstDiagram: "UtwĂłrz swĂłj pierwszy diagram, aby rozpoczÄ…Ä‡",
        
        // UI Controls and buttons
        clearCanvas: "WyczyĹ›Ä‡ PĹ‚Ăłtno",
        clearCanvasConfirm: "Czy na pewno chcesz wyczyĹ›ciÄ‡ wszystkie elementy z pĹ‚Ăłtna?<br><br><strong>Ta akcja nie moĹĽe zostaÄ‡ cofniÄ™ta.</strong>",
        canvasClearedSuccessfully: "PĹ‚Ăłtno wyczyszczone pomyĹ›lnie!",
        allProjectsClearedSuccessfully: "Wszystkie projekty i pĹ‚Ăłtno wyczyszczone pomyĹ›lnie!",
        whiteBackground: "biaĹ‚e tĹ‚o",
        transparentBackground: "przezroczyste tĹ‚o", 
        imageExportedSuccessfully: "Obraz wyeksportowany pomyĹ›lnie z",
        projectExportedSuccessfully: "Projekt wyeksportowany pomyĹ›lnie!",
        noContentToExport: "Brak treĹ›ci do eksportu. ProszÄ™ najpierw utworzyÄ‡ elementy.",
        showGrid: "PokaĹĽ SiatkÄ™",
        hideGrid: "Ukryj SiatkÄ™",
        showRulers: "PokaĹĽ Linijki", 
        hideRulers: "Ukryj Linijki",
        noProjectLoaded: "Brak Wczytanego Projektu",
        
        // Error messages and dialogs
        failedToExport: "Nie udaĹ‚o siÄ™ wyeksportowaÄ‡ projektu. SprĂłbuj ponownie.",
        errorExportingImage: "BĹ‚Ä…d podczas eksportowania obrazu. SprĂłbuj ponownie.",
        errorExportingProject: "BĹ‚Ä…d podczas eksportowania projektu. SprĂłbuj ponownie.",
        errorImportingProject: "BĹ‚Ä…d podczas importowania projektu. SprawdĹş format pliku.",
        incorrectPasswordImportCancelled: "NieprawidĹ‚owe hasĹ‚o. Import anulowany.",
        importCancelled: "Import anulowany.",
        clearCurrentProjectConfirm: "Tworzenie nowego projektu wyczyĹ›ci bieĹĽÄ…ce pĹ‚Ăłtno.<br><br>Czy chcesz kontynuowaÄ‡?",
        
        // Export dialog
        exportProject: "Eksportuj Projekt",
        exportAsLcpFile: "Eksportuj jako plik .lcp",
        exportImageMenu: "Eksportuj Obraz",
        whiteBackgroundBtn: "BiaĹ‚e TĹ‚o",
        transparentBackgroundBtn: "Przezroczyste TĹ‚o",
        
        custom: "Niestandardowy",
        private: "PRYWATNY",
        public: "PUBLICZNY",
        makeProjectPrivate: "Ustaw ten projekt jako prywatny",
        page: "Strona",
        of: "z",
        
        // Data Model Editor
        fieldSpecificErrors: "BĹ‚Ä™dy specyficzne dla pĂłl:",
        unnamedField: "Pole bez nazwy",
        unknownField: "Nieznane pole",
        pleaseFixErrors: "ProszÄ™ naprawiÄ‡ te bĹ‚Ä™dy przed zapisaniem.",
        
        // Context Menu
        nodeId: "ID WÄ™zĹ‚a",
        textId: "ID Tekstu",
        transitionId: "ID PrzejĹ›cia", 
        dataModelId: "ID Modelu Danych",
        type: "Typ",
        label: "Etykieta",
        position: "Pozycja",
        rotation: "ObrĂłt",
        fields: "Pola",
        style: "Styl",
        copyIdToClipboard: "Kopiuj ID do schowka",
        showInTerminal: "PokaĹĽ w terminalu",
        changeColor: "ZmieĹ„ kolor",
        editDataModel: "Edytuj model danych",
        rotateClockwise: "ObrĂłÄ‡ w prawo",
        rotateCounterClockwise: "ObrĂłÄ‡ w lewo",
        convertToCurved: "Konwertuj na zakrzywione",
        convertToStraight: "Konwertuj na proste",
        
        // Data Model Editor specific
        clickAddFieldToStart: "Kliknij \"Dodaj Pole\" aby rozpoczÄ…Ä‡ pracÄ™ z modelem danych",
        fieldNamePlaceholder: "Nazwa pola...",
        selectFieldType: "Wybierz typ pola...",
        initialValuePlaceholder: "WartoĹ›Ä‡ poczÄ…tkowa...",
        deleteField: "UsuĹ„ pole",
        moveUp: "PrzenieĹ› w gĂłrÄ™",
        moveDown: "PrzenieĹ› w dĂłĹ‚", 
        duplicateField: "Duplikuj pole",
        stringType: "Tekst",
        numberType: "Liczba",
        booleanType: "WartoĹ›Ä‡ logiczna",
        dateType: "Data",
        emailType: "Email",
        urlType: "URL",
        phoneType: "Telefon",
        currencyType: "Waluta",
        countryCodeType: "Kod kraju",
        languageCodeType: "Kod jÄ™zyka",
        creditCardType: "Karta kredytowa",
        
        // Node labels
        nodeStart: "START",
        nodeStop: "STOP",
        nodeIf: "JEĹšLI",
        nodeDefault: "WÄ™zeĹ‚",
        labelTrue: "PRAWDA",
        labelFalse: "FAĹSZ",
        labelStep1: "Krok1",
        labelStep2: "Krok2",
        
        // Data Model Editor placeholders
        enterModelName: "WprowadĹş nazwÄ™ modelu",
        jsonSchemaWillAppear: "Schemat JSON pojawi siÄ™ tutaj...",
        describeModel: "Opisz co reprezentuje ten model...",
        fieldNamePlaceholder2: "nazwa_pola",
        
        // Data Model Editor interface
        editDataModel: "Edytuj Model Danych",
        defineFieldsAndStructure: "Zdefiniuj pola i strukturÄ™ dla twojego modelu danych",
        modelName: "Nazwa Modelu",
        modelId: "ID Modelu",
        copyId: "Kopiuj ID",
        jsonSchema: "Schemat JSON",
        acceptJson: "Zaakceptuj JSON",
        copyJson: "Kopiuj JSON",
        jsonEditInstructions: "MoĹĽesz edytowaÄ‡ JSON poniĹĽej lub wkleiÄ‡ wĹ‚asny schemat i kliknÄ…Ä‡ \"Zaakceptuj JSON\" aby zastosowaÄ‡ zmiany",
        modelSettings: "Ustawienia Modelu",
        description: "Opis",
        validationRules: "ReguĹ‚y Walidacji",
        modelType: "Typ Modelu",
        requireAllFields: "Wymagaj wszystkie pola",
        enableValidation: "WĹ‚Ä…cz walidacjÄ™",
        allowNullValues: "ZezwĂłl na wartoĹ›ci null",
        entity: "Encja",
        dataTransferObject: "Obiekt Transferu Danych",
        viewModel: "Model Widoku",
        document: "Dokument",
        validationErrors: "BĹ‚Ä™dy Walidacji",
        saveChanges: "Zapisz Zmiany",
        options: "Opcje",
        noFieldsDefinedYet: "Nie zdefiniowano jeszcze ĹĽadnych pĂłl",
        selectValue: "Wybierz...",
        selectCountry: "Wybierz kraj...",
        selectLanguage: "Wybierz jÄ™zyk...",
        selectTimezone: "Wybierz strefÄ™ czasowÄ…...",
        
        // Validation messages
        validationErrorsInModel: "W tym modelu wystÄ™pujÄ… bĹ‚Ä™dy walidacji:",
        sureToCloseWithoutSaving: "Czy na pewno chcesz zamknÄ…Ä‡ bez zapisywania? Wszystkie zmiany zostanÄ… utracone.",
        modelNameRequired: "Nazwa modelu jest wymagana",
        modelNameTooLong: "Nazwa modelu nie moĹĽe przekraczaÄ‡ 50 znakĂłw",
        securityViolation: "Naruszenie bezpieczeĹ„stwa:",
        
        // JSON validation messages
        errorGeneratingJson: "BĹ‚Ä…d podczas generowania JSON:",
        pleaseEnterJsonSchema: "ProszÄ™ wprowadziÄ‡ schemat JSON do zaakceptowania",
        jsonTooLarge: "ZawartoĹ›Ä‡ JSON jest zbyt duĹĽa. Maksymalny rozmiar to 100KB",
        jsonTooDeep: "Struktura JSON jest zbyt gĹ‚Ä™boka. Maksymalna gĹ‚Ä™bokoĹ›Ä‡ to 10 poziomĂłw",
        tooManyProperties: "Zbyt wiele wĹ‚aĹ›ciwoĹ›ci. Maksimum to 100 pĂłl na model",
        invalidJson: "NieprawidĹ‚owy JSON:",
        jsonDangerousScript: "JSON zawiera potencjalnie niebezpiecznÄ… zawartoĹ›Ä‡ skryptu",
        jsonDangerousSQL: "WartoĹ›ci tekstowe JSON zawierajÄ… potencjalnie niebezpieczne wzorce SQL",
        schemaMustBeObject: "Schemat musi byÄ‡ prawidĹ‚owym obiektem JSON",
        schemaMustHaveProperties: "Schemat musi zawieraÄ‡ obiekt \"properties\"",
        schemaMinimumOneProperty: "Schemat musi zawieraÄ‡ przynajmniej jednÄ… wĹ‚aĹ›ciwoĹ›Ä‡",
        fieldNamesCannotBeEmpty: "Nazwy pĂłl nie mogÄ… byÄ‡ puste",
        fieldMustHaveType: "musi mieÄ‡ typ",
        fieldInvalidType: "ma nieprawidĹ‚owy typ:",
        requiredMustBeArray: "\"required\" musi byÄ‡ tablicÄ…",
        requiredFieldNotFound: "Wymagane pole \"${field}\" nie znalezione we wĹ‚aĹ›ciwoĹ›ciach",
        jsonAutoSynchronized: "JSON automatycznie zsynchronizowany z polami",
        jsonCopiedToClipboard: "JSON skopiowany do schowka",
        
        // Boolean values
        trueValue: "Prawda",
        falseValue: "FaĹ‚sz",
        
        // Load projects
        loadProjectTitle: "Wczytaj Projekt",
        recentProjects: "Ostatnie Projekty",
        searchProjects: "Szukaj projektĂłw...",
        noProjectsFound: "Nie znaleziono projektĂłw",
        projectCreated: "Utworzony",
        projectModified: "Zmodyfikowany",
        load: "Wczytaj",
        delete: "UsuĹ„",
        
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
        initialValue: "WartoĹ›Ä‡ PoczÄ…tkowa",
        
        // Terminal
        terminal: "Terminal",
        terminalToggle: "PrzeĹ‚Ä…cz Terminal",
        terminalClear: "WyczyĹ›Ä‡ Terminal",
        terminalClose: "Zamknij Terminal",
        terminalExport: "Eksportuj Logi",
        
        // InputService translations
        inputServiceInitialized: "InputService zainicjalizowany",
        errorShowingNodeInput: "BĹ‚Ä…d podczas pokazywania wejĹ›cia wÄ™zĹ‚a",
        failedToShowNodeEditor: "Nie udaĹ‚o siÄ™ pokazaÄ‡ edytora wÄ™zĹ‚a",
        showTextInputCalled: "showTextInput wywoĹ‚ane",
        inputPositioning: "Pozycjonowanie wejĹ›cia",
        inputSetupCompleted: "Konfiguracja wejĹ›cia zakoĹ„czona",
        errorShowingTextInput: "BĹ‚Ä…d podczas pokazywania wejĹ›cia tekstowego",
        
        // GridService translations
        gridServiceInitialized: "GridService zainicjalizowany",
        rulersToggled: "Linijki przeĹ‚Ä…czone",
        gridToggled: "Siatka przeĹ‚Ä…czona",
        gridSizeChanged: "Rozmiar siatki zmieniony",
        gridSnapChanged: "PrzyciÄ…ganie siatki zmienione",
        smartGuidesChanged: "Inteligentne prowadnice zmienione",
        gridServiceDestroyed: "GridService zniszczony",
        
        // MultiSelectionManager translations
        multiSelectionManagerInitialized: "MultiSelectionManager zainicjalizowany",
        selectionRectangleStarted: "ProstokÄ…t zaznaczenia rozpoczÄ™ty",
        errorStartingSelection: "BĹ‚Ä…d podczas rozpoczynania zaznaczenia",
        failedToStartSelection: "Nie udaĹ‚o siÄ™ rozpoczÄ…Ä‡ zaznaczenia",
        endSelectionCalled: "endSelection wywoĹ‚ane",
        selectionRect: "ProstokÄ…t zaznaczenia",
        nodeSelected: "WÄ™zeĹ‚ zaznaczony",
        textSelected: "Tekst zaznaczony",
        transitionSelected: "PrzejĹ›cie zaznaczone",
        selectionRectangleDeactivated: "ProstokÄ…t zaznaczenia deaktywowany",
        multiSelectionCompleted: "WieloselekĂ§ja zakoĹ„czona",
        errorEndingSelection: "BĹ‚Ä…d podczas koĹ„czenia zaznaczenia",
        failedToCompleteSelection: "Nie udaĹ‚o siÄ™ zakoĹ„czyÄ‡ zaznaczenia",
        errorCheckingElementInRect: "BĹ‚Ä…d podczas sprawdzania elementu w prostokÄ…cie",
        errorCheckingTextInRect: "BĹ‚Ä…d podczas sprawdzania tekstu w prostokÄ…cie",
        errorCheckingTransitionInRect: "BĹ‚Ä…d podczas sprawdzania przejĹ›cia w prostokÄ…cie",
        groupDragStarted: "Grupowe przeciÄ…ganie rozpoczÄ™te",
        errorStartingGroupDrag: "BĹ‚Ä…d podczas rozpoczynania grupowego przeciÄ…gania",
        failedToStartGroupDrag: "Nie udaĹ‚o siÄ™ rozpoczÄ…Ä‡ grupowego przeciÄ…gania",
        groupDragCompleted: "Grupowe przeciÄ…ganie zakoĹ„czone",
        elementDeselected: "Element odznaczony",
        elementSelected: "Element zaznaczony",
        selectionCleared: "Zaznaczenie wyczyszczone",
        
        // BreakPointService translations
        breakPointServiceInitialized: "BreakPointService zainicjalizowany",
        errorFindingBreakPointAtPosition: "BĹ‚Ä…d podczas wyszukiwania punktu przerwania na pozycji",
        failedToFindBreakPoint: "Nie udaĹ‚o siÄ™ znaleĹşÄ‡ punktu przerwania",
        breakPointMoved: "Punkt przerwania przeniesiony",
        errorMovingBreakPoint: "BĹ‚Ä…d podczas przenoszenia punktu przerwania",
        failedToMoveBreakPoint: "Nie udaĹ‚o siÄ™ przenieĹ›Ä‡ punktu przerwania",
        multipleBreakPointsMoved: "Wiele punktĂłw przerwania przeniesionych",
        errorMovingMultipleBreakPoints: "BĹ‚Ä…d podczas przenoszenia wielu punktĂłw przerwania",
        failedToMoveBreakPoints: "Nie udaĹ‚o siÄ™ przenieĹ›Ä‡ punktĂłw przerwania",
        errorGettingSelectedBreakPoints: "BĹ‚Ä…d podczas pobierania zaznaczonych punktĂłw przerwania",
        breakPointsUpdatedForNodeMovement: "Punkty przerwania zaktualizowane dla ruchu wÄ™zĹ‚a",
        errorUpdatingBreakPointsForMovedNode: "BĹ‚Ä…d podczas aktualizacji punktĂłw przerwania dla przeniesionego wÄ™zĹ‚a",
        failedToUpdateBreakPoints: "Nie udaĹ‚o siÄ™ zaktualizowaÄ‡ punktĂłw przerwania",
        breakPointsUpdatedForGroupNodeMovement: "Punkty przerwania zaktualizowane dla grupowego ruchu wÄ™zĹ‚Ăłw",
        errorUpdatingBreakPointsForMovedNodes: "BĹ‚Ä…d podczas aktualizacji punktĂłw przerwania dla przeniesionych wÄ™zĹ‚Ăłw",
        
        // EventBus and DiagramController translations
        errorInEventListener: "BĹ‚Ä…d w nasĹ‚uchiwaczu zdarzeĹ„",
        diagramControllerInitialized: "DiagramController zainicjalizowany",
        transitionDrawingModeStarted: "Tryb rysowania przejĹ›Ä‡ rozpoczÄ™ty",
        transitionDrawingCancelled: "Rysowanie przejĹ›Ä‡ anulowane",
        transitionDrawingCompleted: "Rysowanie przejĹ›Ä‡ zakoĹ„czone",
        mouseDownAt: "Mysz naciĹ›niÄ™ta na",
        currentlyEditingCompletingEdit: "Obecnie edytowane - koĹ„czenie edycji",
        
        // Transition model translations
        transitionMissingFromOrToNode: "PrzejĹ›cie brakuje wÄ™zĹ‚a ĹşrĂłdĹ‚owego lub docelowego",
        transitionNodesMissingCoordinates: "WÄ™zĹ‚om przejĹ›cia brakuje wspĂłĹ‚rzÄ™dnych",
        blockedStyleToggleForIFTransition: "Zablokowano zmianÄ™ stylu dla przejĹ›cia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        transitionStyleToggled: "Styl przejĹ›cia przeĹ‚Ä…czony",
        blockedBreakPointForIFTransition: "Zablokowano punkt przerwania dla przejĹ›cia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        breakPointAdded: "Punkt przerwania dodany",
        breakPointRemoved: "Punkt przerwania usuniÄ™ty",
        allBreakPointsCleared: "Wszystkie punkty przerwania wyczyszczone",
        
        // Project model translations
        duplicateTransitionPrevented: "ZapobieĹĽono duplikatowi przejĹ›cia",
        lookingForTextAtPosition: "Szukanie tekstu na pozycji",
        foundTextElement: "Znaleziono element tekstowy",
        noTextFoundAtPosition: "Nie znaleziono tekstu na pozycji",
        
        // InputService translations
        errorShowingTransitionInput: "BĹ‚Ä…d podczas pokazywania wprowadzania przejĹ›cia",
        createInputCalled: "createInput wywoĹ‚ane",
        creatingNewInputElement: "Tworzenie nowego elementu wprowadzania",
        reusingExistingInputElement: "Ponowne uĹĽycie istniejÄ…cego elementu wprowadzania",
        inputElementConfigured: "Element wprowadzania skonfigurowany",
        setupInputCalled: "setupInput wywoĹ‚ane",
        inputCompleted: "Wprowadzanie zakoĹ„czone",
        inputTooLongTruncating: "Wprowadzanie zbyt dĹ‚ugie, skracanie",
        inputSanitized: "Wprowadzanie oczyszczone",
        settingLabel: "Ustawianie etykiety",
        settingTransitionLabel: "Ustawianie etykiety przejĹ›cia",
        hidingActiveInput: "Ukrywanie aktywnego wprowadzania",
        inputServiceDestroyed: "InputService zniszczone",
        
        // ExportService translations
        errorInFallbackExport: "BĹ‚Ä…d w eksporcie zapasowym",
        
        // DiagramController debug translations
        mouseDownInternal: "WewnÄ™trzne naciĹ›niÄ™cie myszy",
        ctrlClickOnNode: "Ctrl+klik na wÄ™zeĹ‚",
        ctrlClickOnText: "Ctrl+klik na tekst",
        ctrlClickOnBreakPoint: "Ctrl+klik na punkt przerwania - dodaj przejĹ›cie do selekcji",
        ctrlClickOnTransition: "Ctrl+klik na przejĹ›cie",
        groupDragStartNode: "Start przeciÄ…gania grupy - wÄ™zeĹ‚",
        groupDragStartText: "Start przeciÄ…gania grupy - tekst",
        singleClickOnNodeStartDragging: "Pojedynczy klik na wÄ™zeĹ‚ - start przeciÄ…gania",
        singleClickOnTextStartDragging: "Pojedynczy klik na tekst - start przeciÄ…gania",
        singleClickOnBreakPointStartDragging: "Pojedynczy klik na punkt przerwania - start przeciÄ…gania",
        singleClickOnTransition: "Pojedynczy klik na przejĹ›cie",
        clickOnEmptySpaceStartRectangleSelection: "Klik na pustÄ… przestrzeĹ„ - start prostokÄ…tnej selekcji",
        startDragging: "Start przeciÄ…gania",
        startDraggingBreakPoint: "Start przeciÄ…gania punktu przerwania",
        startDraggingTransition: "Start przeciÄ…gania przejĹ›cia",
        transitionStartNodeSelected: "Wybrano wÄ™zeĹ‚ startowy przejĹ›cia",
        transitionCancelledSameNodeClicked: "PrzejĹ›cie anulowane - ten sam wÄ™zeĹ‚ klikniÄ™ty dwukrotnie",
        doubleClickAt: "PodwĂłjny klik na",
        doubleClickOnNode: "PodwĂłjny klik na wÄ™zeĹ‚",
        doubleClickOnText: "PodwĂłjny klik na tekst",
        doubleClickOnTransition: "PodwĂłjny klik na przejĹ›cie",
        rotatingIfNodeCounterClockwise: "Obracanie wÄ™zĹ‚a IF przeciwnie do ruchu wskazĂłwek zegara",
        foundTransitionsForCounterClockwiseRotation: "Znaleziono przejĹ›cia dla obrotu przeciwnego do ruchu wskazĂłwek",
        missingTransitionsForIfCounterClockwiseRotation: "BrakujÄ…ce przejĹ›cia dla obrotu IF przeciwnego do ruchu wskazĂłwek",
        blockingOptionsForIfTransition: "Blokowanie opcji dla przejĹ›cia IF - ramiona robota nie mogÄ… byÄ‡ modyfikowane",
        rotatingIfNode: "Obracanie wÄ™zĹ‚a IF",
        foundTransitionsForRotation: "Znaleziono przejĹ›cia dla obrotu",
        missingTransitionsForIfRotation: "BrakujÄ…ce przejĹ›cia dla obrotu IF",
        transitionStyleToggled: "PrzeĹ‚Ä…czono styl przejĹ›cia",
        breakPointAddedToTransition: "Dodano punkt przerwania do przejĹ›cia",
        breakPointRemovedFromTransition: "UsuniÄ™to punkt przerwania z przejĹ›cia",
        allBreakPointsClearedFromTransition: "Wszystkie punkty przerwania usuniÄ™te z przejĹ›cia",
        startNodeIsNull: "StartNode jest null podczas prĂłby utworzenia przejĹ›cia",
        transitionCreatedSuccessfully: "PrzejĹ›cie utworzone pomyĹ›lnie",
        transitionCreationFailedOrDuplicate: "Utworzenie przejĹ›cia nie powiodĹ‚o siÄ™ lub wykryto duplikat",
        cannotCreateTransitionInvalidNodes: "Nie moĹĽna utworzyÄ‡ przejĹ›cia - nieprawidĹ‚owe wÄ™zĹ‚y",
        transitionAlreadyExistsBetweenNodes: "PrzejĹ›cie juĹĽ istnieje miÄ™dzy tymi wÄ™zĹ‚ami",
        
        // Additional DiagramController debug translations
        startDraggingBreakPoint: "Start przeciÄ…gania punktu przerwania",
        elementEditedEventReceived: "Otrzymano zdarzenie edycji elementu",
        dataModelUpdatedEventReceived: "Otrzymano zdarzenie aktualizacji modelu danych",
        breakPointMovedEventReceived: "Otrzymano zdarzenie przesuniÄ™cia punktu przerwania",
        multipleBreakPointsMovedEventReceived: "Otrzymano zdarzenie przesuniÄ™cia wielu punktĂłw przerwania",
        autoSavedToNamedProject: "Auto-zapisano do nazwanego projektu",
        autoSaveTriggeredAfterModification: "Auto-zapis uruchomiony po modyfikacji",
        
        // Terminal filter options
        allMessages: "Wszystkie WiadomoĹ›ci",
        errorsOnly: "Tylko BĹ‚Ä™dy",
        warningsOnly: "Tylko OstrzeĹĽenia", 
        infoOnly: "Tylko Informacje",
        debugOnly: "Tylko Debug",
        canvasDrops: "Upuszczenia na PĹ‚Ăłtno",
        textControls: "Kontrolki Tekstu",
        elementMoves: "PrzesuniÄ™cia ElementĂłw",
        elementModifications: "Modyfikacje ElementĂłw",
        
        // Language switcher
        selectLanguage: "Wybierz JÄ™zyk",
        
        // Common
        yes: "Tak",
        no: "Nie",
        ok: "OK",
        close: "Zamknij",
        edit: "Edytuj",
        remove: "UsuĹ„",
        duplicate: "Duplikuj",
        search: "Szukaj",
        filterText: "Filtruj tekst...",
        
        // Tooltips
        englishFlag: "Angielski",
        polishFlag: "Polski",
        basicNodeTooltip: "Podstawowy wÄ™zeĹ‚ - przeciÄ…gnij na kanwÄ™ aby dodaÄ‡ element procesu",
        textElementTooltip: "Element tekstowy - dodaje etykiety i opisy do diagramu",
        startPointTooltip: "Punkt startowy procesu - oznacza poczÄ…tek diagramu",
        endPointTooltip: "Punkt koĹ„cowy procesu - oznacza zakoĹ„czenie diagramu",
        logicalConditionTooltip: "Warunek logiczny - umoĹĽliwia rozgaĹ‚Ä™zienie procesu na podstawie decyzji",
        dataModelTooltip: "Model danych - definiuje strukturÄ™ danych z polami i typami",
        singleConnectionTooltip: "PoĹ‚Ä…czenie jednostronne - tworzy strzaĹ‚kÄ™ w jednym kierunku",
        dualConnectionTooltip: "PoĹ‚Ä…czenie dwustronne - tworzy strzaĹ‚ki w obu kierunkach",
        straightLineTooltip: "Prosta linia - Ĺ‚Ä…czy elementy bez strzaĹ‚ki",
        toggleGridTooltip: "WĹ‚Ä…cz/wyĹ‚Ä…cz siatkÄ™ pomocniczÄ… na kanwie",
        toggleRulersTooltip: "WĹ‚Ä…cz/wyĹ‚Ä…cz linijki pomiarowe na kanwie",
        canvasTooltip: "Kanwa do rysowania - przeciÄ…gnij komponenty z lewego panelu, kliknij aby zaznaczyÄ‡, dwuklik aby edytowaÄ‡",
        clearAllProjectsTooltip: "UsuĹ„ wszystkie zapisane projekty z listy",
        searchProjectsTooltip: "Wpisz nazwÄ™ projektu aby go znaleĹşÄ‡ na liĹ›cie",
        toggleTerminalTooltip: "PokaĹĽ/ukryj terminal konsoli",
        removeSelectedTooltip: "UsuĹ„ zaznaczone elementy z diagramu",
        newProjectTooltip: "UtwĂłrz nowy projekt - czyĹ›ci kanwÄ™ i rozpoczyna od zera",
        saveProjectTooltip: "Zapisz aktualny projekt w przeglÄ…darce",
        loadProjectTooltip: "Wczytaj zapisany projekt z pliku",
        clearCanvasTooltip: "WyczyĹ›Ä‡ caĹ‚Ä… kanwÄ™ - usuĹ„ wszystkie elementy",
        exportImageTooltip: "Eksportuj diagram jako obraz PNG",
        exportFileTooltip: "Eksportuj projekt jako plik JSON",
        importFileTooltip: "Importuj projekt z pliku JSON",
        resizeTerminalTooltip: "PrzeciÄ…gnij aby zmieniÄ‡ wysokoĹ›Ä‡ terminala",
        filterMessagesByTextTooltip: "Filtruj wiadomoĹ›ci wedĹ‚ug tekstu",
        filterMessagesByTypeTooltip: "Filtruj wiadomoĹ›ci wedĹ‚ug typu",
        exportLogsTooltip: "Eksportuj logi do pliku",
        clearTerminalTooltip: "WyczyĹ›Ä‡ terminal",
        closeTerminalTooltip: "Zamknij terminal",
        enterCommandTooltip: "Wpisz komendÄ™ i naciĹ›nij Enter",
        typeCommandPlaceholder: "Wpisz komendÄ™...",
        
        // Terminal messages
        terminalInitialized: "Serwis terminala zostaĹ‚ pomyĹ›lnie zainicjalizowany.",
        canvasDropTracking: "Ĺšledzenie upuszczania na pĹ‚Ăłtno wĹ‚Ä…czone - wszystkie operacje przeciÄ…gnij i upuĹ›Ä‡ bÄ™dÄ… tutaj logowane.",
        typeHelpForCommands: "Wpisz \"help\" aby zobaczyÄ‡ dostÄ™pne komendy.",
        terminalHelpTitle: "đźŽŻ TERMINAL DIAVINCI - DostÄ™pne Komendy",
        basicCommands: "đź”§ PODSTAWOWE KOMENDY:",
        helpCommand: "help          - PokaĹĽ tÄ™ wiadomoĹ›Ä‡ pomocy",
        clearCommand: "clear         - WyczyĹ›Ä‡ output terminala",
        statusCommand: "status        - PokaĹĽ status systemu",
        exportCommand: "export        - Eksportuj logi do pliku",
        versionCommand: "version       - PokaĹĽ wersjÄ™ aplikacji",
        timeCommand: "time          - PokaĹĽ aktualny czas",
        historyCommand: "history       - PokaĹĽ historiÄ™ komend",
        resetCommand: "reset         - Resetuj stan aplikacji",
        searchInspect: "đź”Ť SZUKANIE I INSPEKCJA:",
        findCommand: "find <id>     - ZnajdĹş element po ID",
        searchCommand: "search <text> - Szukaj elementĂłw po etykiecie/nazwie",
        inspectCommand: "inspect <id>  - PokaĹĽ szczegĂłĹ‚owe info o elemencie",
        listElementsCommand: "list elements - Listuj wszystkie elementy z ID",
        listNodesCommand: "list nodes    - Listuj tylko wÄ™zĹ‚y",
        listTextsCommand: "list texts    - Listuj tylko elementy tekstowe",
        listTransCommand: "list trans    - Listuj tylko przejĹ›cia",
        countCommand: "count         - Policz wszystkie elementy projektu",
        analyticsCommands: "đź“Š ANALITYKA:",
        statsCommand: "stats         - PokaĹĽ szczegĂłĹ‚owe statystyki projektu",
        memoryCommand: "memory        - PokaĹĽ informacje o uĹĽyciu pamiÄ™ci",
        performanceCommand: "performance   - PokaĹĽ metryki wydajnoĹ›ci",
        validateCommand: "validate      - Zwaliduj integralnoĹ›Ä‡ projektu",
        debuggingCommands: "đź› ď¸Ź DEBUGOWANIE:",
        debugCommand: "debug on/off  - PrzeĹ‚Ä…cz logowanie debug",
        debugProjectCommand: "debug project - PokaĹĽ info debug projektu",
        debugNodesCommand: "debug nodes   - PokaĹĽ wszystkie wÄ™zĹ‚y z typami",
        logsCommand: "logs <type>   - Filtruj logi po typie",
        traceCommand: "trace <id>    - ĹšledĹş relacje elementu",
        errorsCommand: "errors        - PokaĹĽ ostatnie logi bĹ‚Ä™dĂłw",
        dataModelCommands: "đź“‹ MODEL DANYCH:",
        fieldsCommand: "fields <id>   - Listuj wszystkie pola modelu danych",
        fieldCommand: "field <id> <name> - Pobierz wartoĹ›Ä‡ pola z modelu",
        modelsCommand: "models        - Listuj wszystkie wÄ™zĹ‚y modelu danych",
        quickFieldAccess: "ID.nazwa_pola - Szybki dostÄ™p do pola (np. 123.name)",
        tabAutocomplete: "đź’ˇ UĹĽyj TAB po kropce dla autouzupeĹ‚niania",
        systemCommands: "âš™ď¸Ź SYSTEM:",
        configCommand: "config        - PokaĹĽ konfiguracjÄ™ systemu",
        backupCommand: "backup        - UtwĂłrz kopiÄ™ zapasowÄ… projektu",
        cleanupCommand: "cleanup       - OczyĹ›Ä‡ dane tymczasowe",
        pingCommand: "ping          - Testuj responsywnoĹ›Ä‡ systemu",
        logsExported: "Logi wyeksportowane do",
        entriesCount: "wpisĂłw",
        failedToExport: "Nie udaĹ‚o siÄ™ wyeksportowaÄ‡ logĂłw:",
        functionFailed: "Funkcja nie powiodĹ‚a siÄ™:",
        stackTrace: "Ĺšlad stosu:",
        availableFields: "đź’ˇ DostÄ™pne pola dla elementu",
        basicFields: "Podstawowe:",
        nestedFields: "ZagnieĹĽdĹĽone:",
        noFieldsMatch: "âťŚ Ĺ»adne pola nie pasujÄ… do",
        elementNotFound: "âťŚ Element o ID nie zostaĹ‚ znaleziony.",
        availableCompletions: "đź’ˇ DostÄ™pne uzupeĹ‚nienia:",
        noCommandsMatch: "âťŚ Ĺ»adne komendy nie pasujÄ… do",
        moreFields: "wiÄ™cej pĂłl",
        andMoreFields: "... i",
        useFieldsToSeeAll: "UĹĽyj \"fields",
        toSeeAllFields: "\" aby zobaczyÄ‡ wszystkie pola",
        field: "pole",
        fields: "pola",
        
        // DataModelNode validation messages
        fieldNameRequired: "Nazwa pola jest wymagana",
        fieldNameDangerous: "Nazwa pola zawiera potencjalnie niebezpiecznÄ… treĹ›Ä‡",
        fieldNameFormat: "Nazwa pola musi zaczynaÄ‡ siÄ™ od litery lub podkreĹ›lenia i zawieraÄ‡ tylko litery, cyfry i podkreĹ›lenia",
        fieldNameTooLong: "Nazwa pola nie moĹĽe przekraczaÄ‡ 25 znakĂłw",
        fieldNameSqlPatterns: "Nazwa pola zawiera potencjalnie niebezpieczne wzorce SQL",
        fieldNameReserved: "Nazwa pola nie moĹĽe byÄ‡ sĹ‚owem zastrzeĹĽonym",
        valueDangerousScript: "WartoĹ›Ä‡ zawiera potencjalnie niebezpiecznÄ… treĹ›Ä‡ skryptu",
        valueDangerousSql: "WartoĹ›Ä‡ zawiera potencjalnie niebezpieczne wzorce SQL",
        valueTooLong: "WartoĹ›Ä‡ jest za dĹ‚uga (maksymalnie 1000 znakĂłw)",
        fieldNameMustBeUnique: "Nazwa pola musi byÄ‡ unikalna",
        fieldNameCannotBeEmpty: "Nazwa pola nie moĹĽe byÄ‡ pusta",
        fieldNameAlreadyInUse: "Nazwa pola '$1' jest juĹĽ uĹĽywana",
        
        // Validation error messages
        invalidUuidFormat: "NieprawidĹ‚owy format UUID: '$1'. UĹĽyj formatu: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        passwordTooShort: "HasĹ‚o musi mieÄ‡ co najmniej 6 znakĂłw",
        invalidColorFormat: "NieprawidĹ‚owy format koloru: '$1'. UĹĽyj hex (#ff0000), nazwy koloru lub rgb/rgba",
        
        // Messages
        projectSaved: "Projekt zapisany pomyĹ›lnie",
        projectLoaded: "Projekt wczytany pomyĹ›lnie",
        projectDeleted: "Projekt usuniÄ™ty pomyĹ›lnie",
        imageExported: "Obraz wyeksportowany pomyĹ›lnie",
        fileExported: "Plik wyeksportowany pomyĹ›lnie",
        fileImported: "Plik zaimportowany pomyĹ›lnie",
        
        // Errors
        errorSaving: "BĹ‚Ä…d podczas zapisywania projektu",
        errorLoading: "BĹ‚Ä…d podczas wczytywania projektu",
        errorDeleting: "BĹ‚Ä…d podczas usuwania projektu",
        errorExporting: "BĹ‚Ä…d podczas eksportowania",
        errorImporting: "BĹ‚Ä…d podczas importowania pliku",
        invalidFile: "NieprawidĹ‚owy format pliku",
        
        // Application initialization
        appInitializedSuccessfully: "Aplikacja DiaVinci zostaĹ‚a pomyĹ›lnie zainicjalizowana!",
        errorInitializingApplication: "BĹ‚Ä…d podczas inicjalizacji aplikacji",
        errorStartingApplication: "BĹ‚Ä…d uruchamiania aplikacji. ProszÄ™ odĹ›wieĹĽyÄ‡ stronÄ™.",
        
        // Error handling
        unhandledPromiseRejection: "NieobsĹ‚ugiwane odrzucenie obietnicy",
        uncaughtError: "Nieprzechwycony bĹ‚Ä…d",
        unexpectedErrorOccurred: "WystÄ…piĹ‚ nieoczekiwany bĹ‚Ä…d",
        applicationError: "BĹ‚Ä…d aplikacji",
        operationFailed: "Operacja nie powiodĹ‚a siÄ™",
        missingRequiredParameters: "Brakuje wymaganych parametrĂłw",
        failedToParseJson: "Nie udaĹ‚o siÄ™ sparsowaÄ‡ JSON",
        failedToStringifyJson: "Nie udaĹ‚o siÄ™ przeksztaĹ‚ciÄ‡ JSON",
        
        // Logger messages
        droppedElement: "Upuszczono",
        atPosition: "na pozycji",
        canvasDrop: "Upuszczenie na PĹ‚Ăłtno",
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
        performance: "WydajnoĹ›Ä‡",
        userAction: "Akcja UĹĽytkownika",
        
        // Storage Service messages
        storageServiceInitialized: "StorageService zainicjalizowany",
        failedToSaveProject: "Nie udaĹ‚o siÄ™ zapisaÄ‡ projektu",
        projectSavedSuccessfully: "Projekt zapisany pomyĹ›lnie",
        errorSavingProject: "BĹ‚Ä…d podczas zapisywania projektu",
        projectNotFound: "Projekt nie zostaĹ‚ znaleziony",
        errorLoadingProject: "BĹ‚Ä…d podczas wczytywania projektu",
        errorGettingProjects: "BĹ‚Ä…d podczas pobierania projektĂłw",
        errorDeletingProject: "BĹ‚Ä…d podczas usuwania projektu",
        errorClearingProjects: "BĹ‚Ä…d podczas czyszczenia projektĂłw",
        autoSaveCompleted: "Autozapis zakoĹ„czony",
        untitled: "Bez tytuĹ‚u",
        autoSaveFailed: "Autozapis nie powiĂłdĹ‚ siÄ™",
        failedToLoadAutoSave: "Nie udaĹ‚o siÄ™ wczytaÄ‡ autozapisu",
        errorExportingProject: "BĹ‚Ä…d podczas eksportowania projektu",
        invalidProjectFileFormat: "NieprawidĹ‚owy format pliku projektu",
        errorReadingFile: "BĹ‚Ä…d podczas odczytu pliku",
        
        // Canvas Renderer messages
        canvasRendererInitialized: "CanvasRenderer zainicjalizowany",
        invalidNodeDetected: "Wykryto nieprawidĹ‚owy wÄ™zeĹ‚",
        canvasRender: "Renderowanie PĹ‚Ăłtna",
        errorRenderingCanvas: "BĹ‚Ä…d podczas renderowania pĹ‚Ăłtna",
        invalidTransitionDetected: "Wykryto nieprawidĹ‚owe przejĹ›cie",
        invalidConnectionPoints: "NieprawidĹ‚owe punkty poĹ‚Ä…czenia",
        errorRenderingTransition: "BĹ‚Ä…d podczas renderowania przejĹ›cia",
        errorRenderingNode: "BĹ‚Ä…d podczas renderowania wÄ™zĹ‚a",
        invalidTextElementDetected: "Wykryto nieprawidĹ‚owy element tekstowy",
        errorRenderingText: "BĹ‚Ä…d podczas renderowania tekstu",
        failedToRenderDiagram: "Nie udaĹ‚o siÄ™ renderowaÄ‡ diagramu",
        
        // Terminal Service messages
        terminalElementsNotFoundInDOM: "Elementy terminala nie zostaĹ‚y znalezione w DOM",
        scrollToBottomTerminalContentNotFound: "ScrollToBottom: Element zawartoĹ›ci terminala nie zostaĹ‚ znaleziony",
        unknownCommand: "Nieznana komenda",
        invalidSyntax: "NieprawidĹ‚owa skĹ‚adnia",
        elementNotFound: "Element nie zostaĹ‚ znaleziony",
        invalidId: "NieprawidĹ‚owe ID",
        fieldNotFound: "Pole nie zostaĹ‚o znalezione",
        noElementsFound: "Nie znaleziono elementĂłw w tym projekcie",
        invalidLogType: "NieprawidĹ‚owy typ logu",
        
        // Export Service messages
        exportServiceInitialized: "ExportService zainicjalizowany",
        exportImageStarted: "RozpoczÄ™to eksport obrazu",
        noProjectProvidedForExport: "Nie podano projektu do eksportu",
        failedToGet2DContextForExportCanvas: "Nie udaĹ‚o siÄ™ uzyskaÄ‡ kontekstu 2D dla kanwy eksportu",
        exportCanvasCreated: "Kanwa eksportu utworzona",
        fileSystemAccessApiFailed: "API dostÄ™pu do systemu plikĂłw nie powiodĹ‚o siÄ™, przeĹ‚Ä…czanie na zapasowÄ… metodÄ™",
        exportCancelledByUser: "Eksport anulowany przez uĹĽytkownika",
        usingFallbackSaveMethod: "UĹĽywanie zapasowej metody zapisu",
        exportImage: "Eksport Obrazu",
        imageExportCompleted: "Eksport obrazu zakoĹ„czony",
        failedToExportImage: "Nie udaĹ‚o siÄ™ wyeksportowaÄ‡ obrazu",
        
        // UI Controller messages
        exportImageError: "BĹ‚Ä…d eksportu obrazu",
        exportError: "BĹ‚Ä…d eksportu"
    },
    
    de: {
        // Navigation
        title: "DiaVinci",
        
        // Components
        components: "Komponenten",
        nodes: "Knoten",
        texts: "Texte", 
        transitions: "ĂśbergĂ¤nge",
        
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
        removeSelected: "AusgewĂ¤hlte Entfernen",
        save: "Speichern",
        load: "Laden", 
        clear: "Alles LĂ¶schen",
        
        // Export options
        exportOptions: "Export-Optionen",
        whiteBackground: "WeiĂźer Hintergrund",
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
        zoomIn: "VergrĂ¶Ăźern",
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
        editTransition: "Ăśbergang bearbeiten",
        deleteTransition: "Ăśbergang lĂ¶schen",
        transitionText: "Ăśbergangstext",
        transitionColor: "Ăśbergangsfarbe",
        
        // Grid operations
        showGrid: "Raster anzeigen",
        hideGrid: "Raster ausblenden",
        snapToGrid: "Am Raster ausrichten",
        gridSize: "RastergrĂ¶Ăźe",
        
        // Validation messages
        invalidNodeType: "UngĂĽltiger Knotentyp",
        nodeOutOfBounds: "Knoten auĂźerhalb der Grenzen",
        invalidTransition: "UngĂĽltiger Ăśbergang",
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
        close: "SchlieĂźen",
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
        largeText: "GroĂźer Text",
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
        settingExportCanvasSize: "Export-Canvas-GrĂ¶Ăźe wird gesetzt",
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
        exportError: "Export-Fehler"
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

