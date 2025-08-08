/**
 * C# Code Editor Service - manages built-in code editor for C# functions
 */
class CSharpEditorService {
    constructor() {
        this.editor = null;
        this.currentFunctionNode = null;
        this.isReady = true; // Always ready since we use built-in editor
        this.editorContainer = null;
        this.overlay = null;
        this.textArea = null;
        
        // C# keywords for syntax highlighting
        this.csharpKeywords = [
            'public', 'private', 'protected', 'internal', 'static', 'void', 'int', 'string',
            'bool', 'double', 'float', 'decimal', 'DateTime', 'List', 'Dictionary',
            'if', 'else', 'for', 'foreach', 'while', 'do', 'switch', 'case', 'break',
            'continue', 'return', 'try', 'catch', 'finally', 'throw', 'using', 'namespace',
            'class', 'interface', 'struct', 'enum', 'var', 'const', 'readonly', 'new',
            'this', 'base', 'override', 'virtual', 'abstract', 'sealed', 'async', 'await'
        ];
        
        console.log('C# Editor Service initialized with built-in editor');
    }

    /**
     * Open C# editor for function node
     */
    openEditor(functionNode) {
        this.currentFunctionNode = functionNode;
        this.createEditorUI();
        this.createEditor();
    }

    /**
     * Create editor UI overlay
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
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create editor window
        const editorWindow = document.createElement('div');
        editorWindow.style.cssText = `
            background: #1e1e1e;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            width: 90%;
            height: 80%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
        `;

        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            background: #2d2d30;
            color: white;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #3e3e42;
        `;

        const title = document.createElement('h3');
        title.textContent = `C# Function Editor - ${this.currentFunctionNode.label}`;
        title.style.cssText = `
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 10px;
        `;

        // Data Models button
        const dataModelsButton = document.createElement('button');
        dataModelsButton.textContent = '📊 Data Models';
        dataModelsButton.style.cssText = `
            background: #6f42c1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        dataModelsButton.onclick = () => this.showDataModelsInfo();

        // Save button
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾 Save';
        saveButton.style.cssText = `
            background: #0e639c;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        saveButton.onclick = () => this.saveCode();

        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close';
        closeButton.style.cssText = `
            background: #da3633;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        closeButton.onclick = () => this.closeEditor();

        buttonContainer.appendChild(dataModelsButton);
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(closeButton);
        header.appendChild(title);
        header.appendChild(buttonContainer);

        // Create editor container
        this.editorContainer = document.createElement('div');
        this.editorContainer.style.cssText = `
            flex: 1;
            border-radius: 0 0 8px 8px;
            position: relative;
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
     * Create editor UI overlay
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
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create editor window
        const editorWindow = document.createElement('div');
        editorWindow.style.cssText = `
            background: #1e1e1e;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            width: 90%;
            height: 80%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
        `;

        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            background: #2d2d30;
            color: white;
            padding: 15px 20px;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #3e3e42;
        `;

        const title = document.createElement('h3');
        title.textContent = `C# Function Editor - ${this.currentFunctionNode.label}`;
        title.style.cssText = `
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 10px;
        `;

        // Save button
        const saveButton = document.createElement('button');
        saveButton.textContent = '💾 Save';
        saveButton.style.cssText = `
            background: #0e639c;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        saveButton.onclick = () => this.saveCode();

        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ Close';
        closeButton.style.cssText = `
            background: #da3633;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        closeButton.onclick = () => this.closeEditor();

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(closeButton);
        header.appendChild(title);
        header.appendChild(buttonContainer);

        // Create editor container
        this.editorContainer = document.createElement('div');
        this.editorContainer.style.cssText = `
            flex: 1;
            border-radius: 0 0 8px 8px;
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
     * Create built-in code editor
     */
    createEditor() {
        if (!this.editorContainer) return;

        // Create editor layout
        const editorLayout = document.createElement('div');
        editorLayout.style.cssText = `
            display: flex;
            height: 100%;
        `;

        // Create line numbers panel
        const lineNumbers = document.createElement('div');
        lineNumbers.id = 'line-numbers';
        lineNumbers.style.cssText = `
            background: #252526;
            color: #858585;
            padding: 15px 10px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 20px;
            min-width: 50px;
            text-align: right;
            border-right: 1px solid #3e3e42;
            user-select: none;
        `;

        // Create code editor textarea
        this.textArea = document.createElement('textarea');
        this.textArea.style.cssText = `
            flex: 1;
            background: #1e1e1e;
            color: #d4d4d4;
            border: none;
            padding: 15px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 20px;
            resize: none;
            outline: none;
            white-space: pre;
            overflow-wrap: normal;
            overflow-x: auto;
        `;

        this.textArea.value = this.currentFunctionNode.code || '';

        // Create syntax highlighted overlay
        const syntaxOverlay = document.createElement('div');
        syntaxOverlay.id = 'syntax-overlay';
        syntaxOverlay.style.cssText = `
            position: absolute;
            top: 15px;
            left: 71px;
            pointer-events: none;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 20px;
            white-space: pre;
            z-index: 1;
            color: transparent;
        `;

        // Update line numbers
        const updateLineNumbers = () => {
            const lines = this.textArea.value.split('\n');
            lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('\n');
        };

        // Apply syntax highlighting
        const applySyntaxHighlighting = () => {
            const code = this.textArea.value;
            const highlighted = this.highlightCSharpSyntax(code);
            syntaxOverlay.innerHTML = highlighted;
        };

        // Event listeners
        this.textArea.addEventListener('input', () => {
            updateLineNumbers();
            applySyntaxHighlighting();
            this.currentFunctionNode.setCode(this.textArea.value);
        });

        this.textArea.addEventListener('scroll', () => {
            syntaxOverlay.scrollTop = this.textArea.scrollTop;
            syntaxOverlay.scrollLeft = this.textArea.scrollLeft;
            lineNumbers.scrollTop = this.textArea.scrollTop;
        });

        // Keyboard shortcuts
        this.textArea.addEventListener('keydown', (e) => {
            // Tab key for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.textArea.selectionStart;
                const end = this.textArea.selectionEnd;
                this.textArea.value = this.textArea.value.substring(0, start) + '    ' + this.textArea.value.substring(end);
                this.textArea.selectionStart = this.textArea.selectionEnd = start + 4;
                updateLineNumbers();
                applySyntaxHighlighting();
            }
            
            // Auto-closing brackets
            if (e.key === '{') {
                e.preventDefault();
                const start = this.textArea.selectionStart;
                this.textArea.value = this.textArea.value.substring(0, start) + '{\n    \n}' + this.textArea.value.substring(start);
                this.textArea.selectionStart = this.textArea.selectionEnd = start + 6;
                updateLineNumbers();
                applySyntaxHighlighting();
            }
        });

        // Assemble editor
        this.editorContainer.style.position = 'relative';
        editorLayout.appendChild(lineNumbers);
        editorLayout.appendChild(this.textArea);
        this.editorContainer.appendChild(editorLayout);
        this.editorContainer.appendChild(syntaxOverlay);

        // Initial setup
        updateLineNumbers();
        applySyntaxHighlighting();
        this.textArea.focus();
    }

    /**
     * Highlight C# syntax
     */
    highlightCSharpSyntax(code) {
        let highlighted = code;
        
        // Escape HTML
        highlighted = highlighted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // Highlight keywords
        this.csharpKeywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #569cd6;">${keyword}</span>`);
        });
        
        // Highlight strings
        highlighted = highlighted.replace(/"([^"\\]|\\.)*"/g, '<span style="color: #ce9178;">$&</span>');
        highlighted = highlighted.replace(/'([^'\\]|\\.)*'/g, '<span style="color: #ce9178;">$&</span>');
        
        // Highlight comments
        highlighted = highlighted.replace(/\/\/.*$/gm, '<span style="color: #6a9955;">$&</span>');
        highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a9955;">$&</span>');
        
        // Highlight numbers
        highlighted = highlighted.replace(/\b\d+(\.\d+)?\b/g, '<span style="color: #b5cea8;">$&</span>');
        
        // Highlight class names (PascalCase words)
        highlighted = highlighted.replace(/\b[A-Z][a-zA-Z0-9]*\b/g, '<span style="color: #4ec9b0;">$&</span>');
        
        return highlighted;
    }

    /**
     * Show data models information panel
     */
    showDataModelsInfo() {
        if (!this.currentFunctionNode.dataModelReferences || this.currentFunctionNode.dataModelReferences.length === 0) {
            alert('No Data Models found in this project.\n\nAdd Data Model components to the diagram to use them in your C# code.');
            return;
        }

        let info = 'Available Data Models:\n\n';
        this.currentFunctionNode.dataModelReferences.forEach((model, index) => {
            info += `${index + 1}. ${model.label}\n`;
            if (model.fields && model.fields.length > 0) {
                model.fields.forEach(field => {
                    const csharpType = this.convertToCSharpType(field.type);
                    info += `   • ${csharpType} ${field.name}\n`;
                });
            }
            info += '\n';
        });

        info += '\nYou can use these classes in your C# code:\n';
        info += 'Example: var user = new User();\n';
        info += 'Example: user.Name = "John Doe";';

        alert(info);
    }

    /**
     * Convert data model field types to C# types
     */
    convertToCSharpType(fieldType) {
        const typeMap = {
            'string': 'string',
            'text': 'string',
            'number': 'int',
            'decimal': 'decimal',
            'float': 'float',
            'boolean': 'bool',
            'date': 'DateTime',
            'datetime': 'DateTime',
            'list': 'List<string>',
            'array': 'string[]'
        };
        
        return typeMap[fieldType.toLowerCase()] || 'object';
    }

    /**
     * Save code and close editor
     */
    saveCode() {
        if (this.textArea && this.currentFunctionNode) {
            const code = this.textArea.value;
            this.currentFunctionNode.setCode(code);
            
            // Validate code
            const validation = this.currentFunctionNode.validateCode();
            if (!validation.isValid) {
                alert('Code validation warnings:\n' + validation.errors.join('\n'));
            }
            
            console.log('C# code saved for function:', this.currentFunctionNode.label);
        }
        this.closeEditor();
    }

    /**
     * Close editor
     */
    closeEditor() {
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
        
        this.editorContainer = null;
        this.textArea = null;
        this.currentFunctionNode = null;
    }

    /**
     * Update data model references for IntelliSense
     */
    updateDataModelReferences(functionNode, dataModels) {
        functionNode.dataModelReferences = dataModels.map(dm => ({
            id: dm.id,
            label: dm.label,
            fields: dm.fields || []
        }));
    }

    /**
     * Check if editor is ready
     */
    isReady() {
        return true; // Built-in editor is always ready
    }

    /**
     * Get current editor instance
     */
    getEditor() {
        return this.textArea;
    }

    /**
     * Cleanup resources
     */
    destroy() {
        this.closeEditor();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSharpEditorService;
}
