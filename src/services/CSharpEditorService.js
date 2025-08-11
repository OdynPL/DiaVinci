/**
 * C# Editor Service with modern, light theme and function name editing
 */
class CSharpEditorService {
    constructor(eventBus = null) {
        this.eventBus = eventBus;
        this.currentFunctionNode = null;
        this.overlay = null;
        this.editorContainer = null;
        this.editorTextarea = null;
        this.syntaxContainer = null;
        this.dataModelsButton = null;
        this.transitionAddedListener = null;
        this.transitionRemovedListener = null;
    }

    /**
     * Initialize the service
     */
    initialize() {
        console.log('CSharpEditorService initialized');
    }

    /**
     * Open C# editor for function node
     */
    openEditor(functionNode, project = null) {
        this.currentFunctionNode = functionNode;
        this.currentProject = project;
        this.createEditorUI();
        this.createEditor();
        
        // Update counter after creating UI
        this.updateDataModelCounter();
        
        // Listen for transition events to update counter in real-time
        if (this.eventBus) {
            this.transitionAddedListener = () => {
                setTimeout(() => this.updateDataModelCounter(), 100);
            };
            this.transitionRemovedListener = () => {
                setTimeout(() => this.updateDataModelCounter(), 100);
            };
            
            this.eventBus.on('transition.added', this.transitionAddedListener);
            this.eventBus.on('transition.removed', this.transitionRemovedListener);
        }
    }

    /**
     * Create modern, light editor UI overlay
     */
    createEditorUI() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create editor window
        const editorWindow = document.createElement('div');
        editorWindow.style.cssText = `
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            width: 90%;
            height: 80%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            border: 1px solid #e5e7eb;
        `;

        // Create header with function name input
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #8B5CF6, #A78BFA);
            color: white;
            padding: 20px 24px;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e7eb;
        `;

        // Create title container with editable function name
        const titleContainer = document.createElement('div');
        titleContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `;

        const functionIcon = document.createElement('span');
        functionIcon.textContent = '⚡';
        functionIcon.style.cssText = `
            font-size: 20px;
        `;

        const functionNameInput = document.createElement('input');
        functionNameInput.type = 'text';
        functionNameInput.value = this.currentFunctionNode.label;
        functionNameInput.style.cssText = `
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            color: white;
            padding: 8px 12px;
            font-size: 16px;
            font-weight: 600;
            min-width: 500px;
            width: 500px;
        `;
        
        functionNameInput.addEventListener('change', () => {
            this.currentFunctionNode.label = functionNameInput.value;
        });
        
        functionNameInput.addEventListener('input', () => {
            this.currentFunctionNode.label = functionNameInput.value;
        });

        titleContainer.appendChild(functionIcon);
        titleContainer.appendChild(functionNameInput);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 12px;
        `;

        // Data Models button with counter
        const dataModelsButton = document.createElement('button');
        // Initialize with 0 - will be updated later
        dataModelsButton.textContent = `📊 Data Models (0)`;
        dataModelsButton.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        `;
        dataModelsButton.onmouseover = () => {
            dataModelsButton.style.background = 'rgba(255, 255, 255, 0.3)';
        };
        dataModelsButton.onmouseout = () => {
            dataModelsButton.style.background = 'rgba(255, 255, 255, 0.2)';
        };
        dataModelsButton.onclick = () => this.showDataModelsInfo();
        
        // Store reference for updates
        this.dataModelsButton = dataModelsButton;

        // Save button
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾 Save';
        saveButton.style.cssText = `
            background: #10B981;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        `;
        saveButton.onmouseover = () => {
            saveButton.style.background = '#059669';
        };
        saveButton.onmouseout = () => {
            saveButton.style.background = '#10B981';
        };
        saveButton.onclick = () => this.saveCode();

        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close';
        closeButton.style.cssText = `
            background: #EF4444;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        `;
        closeButton.onmouseover = () => {
            closeButton.style.background = '#DC2626';
        };
        closeButton.onmouseout = () => {
            closeButton.style.background = '#EF4444';
        };
        closeButton.onclick = () => this.closeEditor();

        buttonContainer.appendChild(dataModelsButton);
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(closeButton);
        header.appendChild(titleContainer);
        header.appendChild(buttonContainer);

        // Create editor container
        this.editorContainer = document.createElement('div');
        this.editorContainer.style.cssText = `
            flex: 1;
            border-radius: 0 0 12px 12px;
            background: #fafafa;
        `;

        editorWindow.appendChild(header);
        editorWindow.appendChild(this.editorContainer);
        this.overlay.appendChild(editorWindow);
        document.body.appendChild(this.overlay);

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeEditor();
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeEditor();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    /**
     * Create modern light-themed code editor
     */
    createEditor() {
        if (!this.editorContainer) return;

        // Create editor layout
        const editorLayout = document.createElement('div');
        editorLayout.style.cssText = `
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border-radius: 0 0 12px 12px;
        `;

        // Create toolbar
        const toolbar = document.createElement('div');
        toolbar.style.cssText = `
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: #6c757d;
        `;

        const languageLabel = document.createElement('span');
        languageLabel.textContent = '🔧 C# Function';
        languageLabel.style.cssText = `
            font-weight: 500;
            color: #8B5CF6;
        `;

        toolbar.appendChild(languageLabel);

        // Create editor area
        const editorArea = document.createElement('div');
        editorArea.style.cssText = `
            flex: 1;
            display: flex;
            background: #ffffff;
            position: relative;
        `;

        // Create line numbers
        const lineNumbers = document.createElement('div');
        lineNumbers.style.cssText = `
            background: #f8f9fa;
            color: #8E9199;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.6;
            padding: 16px 8px;
            text-align: right;
            user-select: none;
            border-right: 1px solid #e9ecef;
            min-width: 60px;
            width: 60px;
            flex-shrink: 0;
            position: relative;
            z-index: 3;
        `;

        // Create syntax highlighting container
        this.syntaxContainer = document.createElement('div');
        this.syntaxContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 60px;
            right: 0;
            bottom: 0;
            padding: 16px;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            color: transparent;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
            display: none;
        `;

        // Create textarea for editing
        this.editorTextarea = document.createElement('textarea');
        this.editorTextarea.style.cssText = `
            position: absolute;
            top: 0;
            left: 60px;
            right: 0;
            bottom: 0;
            padding: 16px;
            border: none;
            outline: none;
            resize: none;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.6;
            background: transparent;
            color: #374151;
            z-index: 2;
            white-space: pre-wrap;
            overflow-y: auto;
        `;

        // Set initial code
        const initialCode = this.currentFunctionNode.code || 
            'public void Execute()\n{\n    // Your code here\n    Console.WriteLine("Hello World!");\n}';
        this.editorTextarea.value = initialCode;

        // Store line numbers reference before updating
        this.lineNumbers = lineNumbers;

        // Update line numbers and syntax highlighting
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();

        // Event listeners
        this.editorTextarea.addEventListener('input', () => {
            this.updateLineNumbers();
            this.updateSyntaxHighlighting();
        });

        this.editorTextarea.addEventListener('scroll', () => {
            this.syntaxContainer.scrollTop = this.editorTextarea.scrollTop;
            lineNumbers.scrollTop = this.editorTextarea.scrollTop;
        });

        // Assemble editor
        editorArea.appendChild(lineNumbers);
        editorArea.appendChild(this.syntaxContainer);
        editorArea.appendChild(this.editorTextarea);

        editorLayout.appendChild(toolbar);
        editorLayout.appendChild(editorArea);
        this.editorContainer.appendChild(editorLayout);

        // Focus the editor
        setTimeout(() => {
            this.editorTextarea.focus();
        }, 100);
    }

    /**
     * Update line numbers
     */
    updateLineNumbers() {
        if (!this.lineNumbers || !this.editorTextarea) return;

        const lines = this.editorTextarea.value.split('\n');
        const lineNumbersHtml = lines.map((_, index) => 
            `<div style="padding: 0 8px;">${index + 1}</div>`
        ).join('');
        
        this.lineNumbers.innerHTML = lineNumbersHtml;
    }

    /**
     * Update syntax highlighting for C#
     */
    updateSyntaxHighlighting() {
        if (!this.syntaxContainer || !this.editorTextarea) return;

        let code = this.editorTextarea.value;
        
        // C# syntax highlighting
        code = this.highlightCSharpSyntax(code);
        
        this.syntaxContainer.innerHTML = code;
    }

    /**
     * Highlight C# syntax
     */
    highlightCSharpSyntax(code) {
        // Keywords
        const keywords = ['public', 'private', 'protected', 'internal', 'static', 'void', 'int', 'string', 'bool', 'double', 'float', 'char', 'var', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'new', 'this', 'base', 'class', 'interface', 'namespace', 'using', 'try', 'catch', 'finally', 'throw', 'async', 'await'];
        
        // Apply highlighting
        let highlighted = code;
        
        // Keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #7C3AED; font-weight: bold;">${keyword}</span>`);
        });
        
        // Strings
        highlighted = highlighted.replace(/"([^"\\]|\\.)*"/g, '<span style="color: #059669;">$&</span>');
        
        // Comments
        highlighted = highlighted.replace(/\/\/.*$/gm, '<span style="color: #6B7280; font-style: italic;">$&</span>');
        highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6B7280; font-style: italic;">$&</span>');
        
        // Methods/Functions
        highlighted = highlighted.replace(/\b(\w+)(?=\s*\()/g, '<span style="color: #DC2626; font-weight: normal;">$1</span>');
        
        // Numbers (only standalone numbers, not in function names)
        highlighted = highlighted.replace(/\b\d+(\.\d+)?\b/g, '<span style="color: #EA580C;">$&</span>');
        
        return highlighted;
    }

    /**
     * Update Data Model counter in editor header
     */
    updateDataModelCounter() {
        if (!this.dataModelsButton || !this.currentProject || !this.currentFunctionNode) return;
        
        const connectedModelsCount = this.currentFunctionNode.getDataModelCounter(this.currentProject);
        this.dataModelsButton.textContent = `📊 Data Models (${connectedModelsCount})`;
    }

    /**
     * Show data models information
     */
    showDataModelsInfo() {
        if (!this.currentProject) {
            alert('No project loaded.');
            return;
        }

        // Update counter first
        this.updateDataModelCounter();

        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        
        if (connectedModels.length === 0) {
            alert('No Data Models connected.\n\nTo connect Data Models:\n1. Create a Data Model node\n2. Draw a transition from the Data Model to this Function\n3. The counter will increase automatically');
            return;
        }

        let message = `Connected Data Models (${connectedModels.length}):\n\n`;
        connectedModels.forEach((model, index) => {
            message += `${index + 1}. ${model.label} (ID: ${model.id})\n`;
            if (model.fields && model.fields.length > 0) {
                message += `   Fields: ${model.fields.map(f => f.name).join(', ')}\n`;
            }
        });
        
        message += '\nThese Data Models are available for IntelliSense in your C# code.';
        alert(message);
    }

    /**
     * Save the code and function name
     */
    saveCode() {
        if (this.currentFunctionNode && this.editorTextarea) {
            // Save code
            this.currentFunctionNode.updateCode(this.editorTextarea.value);
            this.currentFunctionNode.lastEditTime = new Date();
            
            // Save function name from input field
            const nameInput = this.overlay.querySelector('input[type="text"]');
            if (nameInput && nameInput.value.trim()) {
                this.currentFunctionNode.label = nameInput.value.trim();
                this.currentFunctionNode.name = nameInput.value.trim();
            }
            
            console.log('Code and function name saved successfully');
            console.log('Function name:', this.currentFunctionNode.label);
            
            // Show success feedback
            const buttons = this.overlay.querySelectorAll('button');
            let saveBtn = null;
            buttons.forEach(btn => {
                if (btn.textContent.includes('Save')) {
                    saveBtn = btn;
                }
            });
            
            if (saveBtn) {
                const originalText = saveBtn.textContent;
                saveBtn.textContent = '✅ Saved';
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                }, 1500);
            }
        }
    }

    /**
     * Close the editor
     */
    closeEditor() {
        // Remove event listeners
        if (this.eventBus) {
            if (this.transitionAddedListener) {
                this.eventBus.off('transition.added', this.transitionAddedListener);
            }
            if (this.transitionRemovedListener) {
                this.eventBus.off('transition.removed', this.transitionRemovedListener);
            }
        }
        
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
            this.editorContainer = null;
            this.editorTextarea = null;
            this.syntaxContainer = null;
            this.dataModelsButton = null;
            this.currentFunctionNode = null;
            this.transitionAddedListener = null;
            this.transitionRemovedListener = null;
        }
    }
}
