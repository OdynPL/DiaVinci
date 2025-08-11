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
        dataModelsButton.textContent = `📊 ${window.t ? window.t('dataModels') : 'Data Models'} (0)`;
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
        saveButton.textContent = `💾 ${window.t ? window.t('save') : 'Save'}`;
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

        // Help button
        const helpButton = document.createElement('button');
        helpButton.textContent = `❓ ${window.t ? window.t('help') : 'Help'}`;
        helpButton.style.cssText = `
            background: #6366F1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
        `;
        helpButton.onmouseover = () => {
            helpButton.style.background = '#4F46E5';
        };
        helpButton.onmouseout = () => {
            helpButton.style.background = '#6366F1';
        };
        helpButton.onclick = () => this.showDataModelsHelp();

        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = `✕ ${window.t ? window.t('close') : 'Close'}`;
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

        buttonContainer.appendChild(helpButton);
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

        // Set initial code with Data Models integration
        const initialCode = this.currentFunctionNode.code || this.generateInitialCodeWithDataModels();
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
        this.dataModelsButton.textContent = `📊 ${window.t ? window.t('dataModels') : 'Data Models'} (${connectedModelsCount})`;
    }

    /**
     * Show data models information
     */
    showDataModelsInfo() {
        if (!this.currentProject) {
            this.showStyledAlert('No project loaded.', 'warning');
            return;
        }

        // Update counter first
        this.updateDataModelCounter();

        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        
        if (connectedModels.length === 0) {
            this.showDataModelsGuide();
            return;
        }

        this.showDataModelsModal(connectedModels);
    }

    /**
     * Show beautiful data models modal
     */
    showDataModelsModal(connectedModels) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 11000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease-out;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            transform: scale(0.9);
            animation: modalIn 0.3s ease-out forwards;
        `;

        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.textContent = `📊 ${window.t ? window.t('connectedDataModels') : 'Connected Data Models'} (${connectedModels.length})`;
        title.style.cssText = `
            margin: 0;
            font-size: 20px;
            font-weight: 600;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        `;
        closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.onclick = () => document.body.removeChild(modalOverlay);

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Create content area
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 24px;
            max-height: 60vh;
            overflow-y: auto;
        `;

        // Create models list
        connectedModels.forEach((model, index) => {
            const modelCard = document.createElement('div');
            modelCard.style.cssText = `
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 16px;
                transition: all 0.2s;
            `;
            modelCard.onmouseover = () => {
                modelCard.style.background = '#f1f5f9';
                modelCard.style.borderColor = '#cbd5e1';
                modelCard.style.transform = 'translateY(-2px)';
                modelCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            };
            modelCard.onmouseout = () => {
                modelCard.style.background = '#f8fafc';
                modelCard.style.borderColor = '#e2e8f0';
                modelCard.style.transform = 'translateY(0)';
                modelCard.style.boxShadow = 'none';
            };

            // Model header
            const modelHeader = document.createElement('div');
            modelHeader.style.cssText = `
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            `;

            const modelIcon = document.createElement('div');
            modelIcon.innerHTML = '🗃️';
            modelIcon.style.cssText = `
                font-size: 24px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #8B5CF6, #A78BFA);
                border-radius: 10px;
            `;

            const modelInfo = document.createElement('div');
            modelInfo.style.cssText = `
                flex: 1;
            `;

            const modelName = document.createElement('h3');
            modelName.textContent = model.label;
            modelName.style.cssText = `
                margin: 0 0 8px 0;
                font-size: 18px;
                font-weight: 600;
                color: #1e293b;
            `;

            // Create ID container with copy functionality
            const idContainer = document.createElement('div');
            idContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
                background: #f1f5f9;
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                margin-bottom: 4px;
            `;

            const modelIdLabel = document.createElement('span');
            modelIdLabel.textContent = 'ID:';
            modelIdLabel.style.cssText = `
                font-size: 11px;
                color: #64748b;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            `;

            const modelIdValue = document.createElement('span');
            const fullId = (model.id || 'no-id').toString();
            modelIdValue.textContent = fullId;
            modelIdValue.style.cssText = `
                font-size: 11px;
                color: #1e293b;
                font-family: 'Courier New', monospace;
                flex: 1;
                word-break: break-all;
                line-height: 1.3;
            `;

            const copyButton = document.createElement('button');
            copyButton.innerHTML = '📋';
            copyButton.title = window.t ? window.t('copyIdToClipboard') : 'Copy ID to clipboard';
            copyButton.style.cssText = `
                background: #3b82f6;
                color: white;
                border: none;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            `;

            // Copy functionality
            copyButton.onclick = async () => {
                try {
                    await navigator.clipboard.writeText(fullId);
                    
                    // Visual feedback
                    const originalContent = copyButton.innerHTML;
                    const originalBg = copyButton.style.background;
                    
                    copyButton.innerHTML = '✅';
                    copyButton.style.background = '#10b981';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = originalContent;
                        copyButton.style.background = originalBg;
                    }, 1500);
                    
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = fullId;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Visual feedback
                    const originalContent = copyButton.innerHTML;
                    const originalBg = copyButton.style.background;
                    
                    copyButton.innerHTML = '✅';
                    copyButton.style.background = '#10b981';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = originalContent;
                        copyButton.style.background = originalBg;
                    }, 1500);
                }
            };

            copyButton.onmouseover = () => {
                copyButton.style.background = '#2563eb';
                copyButton.style.transform = 'scale(1.1)';
            };
            copyButton.onmouseout = () => {
                copyButton.style.background = '#3b82f6';
                copyButton.style.transform = 'scale(1)';
            };

            idContainer.appendChild(modelIdLabel);
            idContainer.appendChild(modelIdValue);
            idContainer.appendChild(copyButton);

            modelInfo.appendChild(modelName);
            modelInfo.appendChild(idContainer);
            modelHeader.appendChild(modelIcon);
            modelHeader.appendChild(modelInfo);

            // Fields section
            if (model.fields && model.fields.length > 0) {
                const fieldsHeader = document.createElement('h4');
                fieldsHeader.textContent = `${window.t ? window.t('fieldsCount') : 'Fields'} (${model.fields.length}):`;
                fieldsHeader.style.cssText = `
                    margin: 16px 0 8px 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #475569;
                `;

                const fieldsList = document.createElement('div');
                fieldsList.style.cssText = `
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 8px;
                `;

                model.fields.forEach(field => {
                    const fieldTag = document.createElement('span');
                    fieldTag.textContent = `${field.name}: ${field.type}`;
                    fieldTag.style.cssText = `
                        background: #e0e7ff;
                        color: #3730a3;
                        padding: 4px 8px;
                        border-radius: 6px;
                        font-size: 12px;
                        font-family: monospace;
                        display: inline-block;
                    `;
                    fieldsList.appendChild(fieldTag);
                });

                modelCard.appendChild(modelHeader);
                modelCard.appendChild(fieldsHeader);
                modelCard.appendChild(fieldsList);
            } else {
                const noFields = document.createElement('p');
                noFields.textContent = window.t ? window.t('noFieldsDefined') : 'No fields defined';
                noFields.style.cssText = `
                    margin: 16px 0 0 0;
                    font-size: 14px;
                    color: #9ca3af;
                    font-style: italic;
                `;
                modelCard.appendChild(modelHeader);
                modelCard.appendChild(noFields);
            }

            content.appendChild(modelCard);
        });

        // Create footer
        const footer = document.createElement('div');
        footer.style.cssText = `
            background: #f8fafc;
            padding: 24px;
            border-top: 1px solid #e2e8f0;
        `;

        // Create usage instructions
        const usageTitle = document.createElement('h3');
        usageTitle.textContent = `🚀 ${window.t ? window.t('howToUseDataModels') : 'How to use Data Models in your C# code:'}`;
        usageTitle.style.cssText = `
            margin: 0 0 16px 0;
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            text-align: center;
        `;

        const instructionsContainer = document.createElement('div');
        instructionsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-bottom: 20px;
        `;

        // Create code examples for each model
        connectedModels.slice(0, 2).forEach((model, index) => { // Show max 2 examples
            const className = model.label.replace(/\s+/g, '');
            const variableName = className.charAt(0).toLowerCase() + className.slice(1);
            
            const exampleCard = document.createElement('div');
            exampleCard.style.cssText = `
                background: #1e293b;
                border-radius: 8px;
                padding: 16px;
                border-left: 4px solid #3b82f6;
            `;

            const exampleTitle = document.createElement('div');
            exampleTitle.textContent = `${index + 1}. Using ${model.label}:`;
            exampleTitle.style.cssText = `
                color: #94a3b8;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 8px;
            `;

            const codeExample = document.createElement('pre');
            let code = `var ${variableName} = new ${className}();\n`;
            
            if (model.fields && model.fields.length > 0) {
                const field = model.fields[0];
                const exampleValue = this.getExampleValue(field.type);
                code += `${variableName}.${field.name} = ${exampleValue};`;
            }

            codeExample.textContent = code;
            codeExample.style.cssText = `
                color: #e2e8f0;
                font-family: 'Fira Code', monospace;
                font-size: 11px;
                line-height: 1.4;
                margin: 0;
                overflow-x: auto;
            `;

            exampleCard.appendChild(exampleTitle);
            exampleCard.appendChild(codeExample);
            instructionsContainer.appendChild(exampleCard);
        });

        // General tips
        const tipsContainer = document.createElement('div');
        tipsContainer.style.cssText = `
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 8px;
            padding: 16px;
            color: white;
            text-align: center;
        `;

        const tipsText = document.createElement('div');
        tipsText.innerHTML = `
            <strong>💡 Pro Tips:</strong><br>
            • All connected Data Models are automatically available as C# classes<br>
            • Use IntelliSense (Ctrl+Space) to see available properties<br>
            • Classes are generated with proper C# naming conventions
        `;
        tipsText.style.cssText = `
            font-size: 13px;
            line-height: 1.5;
        `;

        tipsContainer.appendChild(tipsText);

        footer.appendChild(usageTitle);
        footer.appendChild(instructionsContainer);
        footer.appendChild(tipsContainer);

        // Assemble modal
        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        modalOverlay.appendChild(modal);

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalIn {
                from { transform: scale(0.9) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modalOverlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        document.body.appendChild(modalOverlay);
    }

    /**
     * Show guide for connecting data models
     */
    showDataModelsGuide() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 11000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease-out;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 90%;
            max-width: 500px;
            overflow: hidden;
            transform: scale(0.9);
            animation: modalIn 0.3s ease-out forwards;
        `;

        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #f59e0b, #f97316);
            color: white;
            padding: 24px;
            text-align: center;
        `;

        const icon = document.createElement('div');
        icon.innerHTML = '🔗';
        icon.style.cssText = `
            font-size: 48px;
            margin-bottom: 12px;
        `;

        const title = document.createElement('h2');
        title.textContent = window.t ? window.t('noConnectedModels') : 'No Data Models Connected';
        title.style.cssText = `
            margin: 0;
            font-size: 20px;
            font-weight: 600;
        `;

        header.appendChild(icon);
        header.appendChild(title);

        // Create content
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 24px;
        `;

        const steps = [
            { icon: '🗃️', title: window.t ? window.t('connectModelsInstructions1') : 'Create a Data Model', desc: window.t ? window.t('connectModelsInstructions1Desc') : 'Add a Data Model node to your diagram' },
            { icon: '🔗', title: window.t ? window.t('connectModelsInstructions2') : 'Draw Connection', desc: window.t ? window.t('connectModelsInstructions2Desc') : 'Draw a transition from Data Model to Function or vice versa' },
            { icon: '📊', title: window.t ? window.t('connectModelsInstructions3') : 'See Counter Update', desc: window.t ? window.t('connectModelsInstructions3Desc') : 'The counter will increase automatically' }
        ];

        steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.style.cssText = `
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 20px;
                padding: 16px;
                background: #f8fafc;
                border-radius: 10px;
                border-left: 4px solid #3b82f6;
            `;

            const stepIcon = document.createElement('div');
            stepIcon.innerHTML = step.icon;
            stepIcon.style.cssText = `
                font-size: 32px;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            `;

            const stepContent = document.createElement('div');
            stepContent.style.cssText = `
                flex: 1;
            `;

            const stepTitle = document.createElement('h3');
            stepTitle.textContent = `${index + 1}. ${step.title}`;
            stepTitle.style.cssText = `
                margin: 0 0 4px 0;
                font-size: 16px;
                font-weight: 600;
                color: #1e293b;
            `;

            const stepDesc = document.createElement('p');
            stepDesc.textContent = step.desc;
            stepDesc.style.cssText = `
                margin: 0;
                font-size: 14px;
                color: #64748b;
            `;

            stepContent.appendChild(stepTitle);
            stepContent.appendChild(stepDesc);
            stepDiv.appendChild(stepIcon);
            stepDiv.appendChild(stepContent);
            content.appendChild(stepDiv);
        });

        // Create footer with close button
        const footer = document.createElement('div');
        footer.style.cssText = `
            background: #f8fafc;
            padding: 20px 24px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        `;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Got it!';
        closeButton.style.cssText = `
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        `;
        closeButton.onmouseover = () => closeButton.style.background = '#2563eb';
        closeButton.onmouseout = () => closeButton.style.background = '#3b82f6';
        closeButton.onclick = () => document.body.removeChild(modalOverlay);

        footer.appendChild(closeButton);

        // Assemble modal
        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        modalOverlay.appendChild(modal);

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modalOverlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        document.body.appendChild(modalOverlay);
    }

    /**
     * Show styled alert message
     */
    showStyledAlert(message, type = 'info') {
        const colors = {
            info: { bg: '#3b82f6', light: '#dbeafe' },
            warning: { bg: '#f59e0b', light: '#fef3c7' },
            error: { bg: '#ef4444', light: '#fee2e2' },
            success: { bg: '#10b981', light: '#d1fae5' }
        };

        const color = colors[type] || colors.info;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 11000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const alert = document.createElement('div');
        alert.style.cssText = `
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            padding: 24px;
            max-width: 400px;
            text-align: center;
        `;

        const icon = document.createElement('div');
        icon.style.cssText = `
            width: 60px;
            height: 60px;
            background: ${color.bg};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin: 0 auto 16px auto;
            color: white;
        `;
        icon.textContent = type === 'warning' ? '⚠️' : type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

        const text = document.createElement('p');
        text.textContent = message;
        text.style.cssText = `
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #374151;
            line-height: 1.5;
        `;

        const button = document.createElement('button');
        button.textContent = 'OK';
        button.style.cssText = `
            background: ${color.bg};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        `;
        button.onclick = () => document.body.removeChild(overlay);

        alert.appendChild(icon);
        alert.appendChild(text);
        alert.appendChild(button);
        overlay.appendChild(alert);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });

        document.body.appendChild(overlay);
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

    /**
     * Generate initial code with Data Models integration examples
     */
    generateInitialCodeWithDataModels() {
        if (!this.currentProject) {
            return 'public void Execute()\n{\n    // Your code here\n    Console.WriteLine("Hello World!");\n}';
        }

        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        
        if (connectedModels.length === 0) {
            return `public void Execute()
{
    // Your code here
    // 💡 Tip: Connect Data Models to access their classes automatically!
    Console.WriteLine("Hello World!");
}`;
        }

        // Generate code with connected Data Models examples
        let code = `public void Execute()
{
    // 🗃️ Connected Data Models (${connectedModels.length}):
`;

        connectedModels.forEach((model, index) => {
            const className = model.label.replace(/\s+/g, ''); // Remove spaces for class name
            const variableName = className.charAt(0).toLowerCase() + className.slice(1);
            
            code += `    // ${index + 1}. ${model.label}\n`;
            code += `    var ${variableName} = new ${className}();\n`;
            
            if (model.fields && model.fields.length > 0) {
                // Show examples of setting fields
                const firstField = model.fields[0];
                const fieldName = firstField.name;
                const exampleValue = this.getExampleValue(firstField.type);
                
                code += `    ${variableName}.${fieldName} = ${exampleValue}; // ${firstField.type}\n`;
                
                if (model.fields.length > 1) {
                    code += `    // ... and ${model.fields.length - 1} more field${model.fields.length > 2 ? 's' : ''}\n`;
                }
            }
            code += `\n`;
        });

        code += `    // Your business logic here
    Console.WriteLine($"Processing {connectedModels.length} data model${connectedModels.length !== 1 ? 's' : ''}");
}`;

        return code;
    }

    /**
     * Show Data Models help and usage instructions
     */
    showDataModelsHelp() {
        if (!this.currentProject) {
            this.showStyledAlert('No project loaded.', 'warning');
            return;
        }

        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 11000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease-out;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 90%;
            max-width: 700px;
            max-height: 85vh;
            overflow: hidden;
            transform: scale(0.9);
            animation: modalIn 0.3s ease-out forwards;
        `;

        // Create header
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.innerHTML = `❓ ${window.t ? window.t('helpTitle') : 'How to Use Data Models in C# Functions'}`;
        title.style.cssText = `
            margin: 0;
            font-size: 20px;
            font-weight: 600;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        `;
        closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.onclick = () => document.body.removeChild(modalOverlay);

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Create content area
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 24px;
            max-height: 60vh;
            overflow-y: auto;
        `;

        // Step 1: Connection
        const step1 = this.createHelpStep(
            `1. ${window.t ? window.t('connectDataModels') : 'Connect Data Models'}`,
            '🔗',
            window.t ? window.t('connectDataModelsDesc') : 'Draw transitions between Data Model nodes and this Function component',
            `// No connected models yet
public void Execute() {
    // Connect Data Models first!
    Console.WriteLine("Hello World!");
}`
        );

        // Step 2: Usage (if models are connected)
        let step2Content = '';
        if (connectedModels.length > 0) {
            const model = connectedModels[0];
            const className = model.label.replace(/\s+/g, '');
            const variableName = className.charAt(0).toLowerCase() + className.slice(1);
            
            step2Content = `// ${connectedModels.length} model${connectedModels.length !== 1 ? 's' : ''} connected!
var ${variableName} = new ${className}();`;
            
            if (model.fields && model.fields.length > 0) {
                const field = model.fields[0];
                const exampleValue = this.getExampleValue(field.type);
                step2Content += `\n${variableName}.${field.name} = ${exampleValue};`;
            }
        } else {
            step2Content = `// After connecting models:
var userModel = new UserModel();
userModel.Name = "John Doe";
userModel.Email = "john@example.com";`;
        }

        const step2 = this.createHelpStep(
            `2. ${window.t ? window.t('useInCode') : 'Use in Your Code'}`,
            '💻',
            window.t ? window.t('useInCodeDesc') : 'Access connected Data Models as C# classes with IntelliSense support',
            step2Content
        );

        // Step 3: IntelliSense
        const step3 = this.createHelpStep(
            `3. ${window.t ? window.t('intelliSenseSupport') : 'IntelliSense Support'}`,
            '⚡',
            window.t ? window.t('intelliSenseSupportDesc') : 'All model properties are available with auto-completion',
            `// Type "userModel." to see:
userModel.Name     // string
userModel.Email    // string
userModel.Age      // int
userModel.IsActive // bool`
        );

        // Tips section
        const tipsSection = document.createElement('div');
        tipsSection.style.cssText = `
            background: linear-gradient(135deg, #f59e0b, #f97316);
            border-radius: 12px;
            padding: 20px;
            margin-top: 24px;
            color: white;
        `;

        const tipsTitle = document.createElement('h3');
        tipsTitle.innerHTML = `💡 ${window.t ? window.t('proTips') : 'Pro Tips'}`;
        tipsTitle.style.cssText = `
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: 600;
        `;

        const tipsList = document.createElement('ul');
        tipsList.innerHTML = `
            <li>${window.t ? window.t('proTip1') : 'Connected models automatically become C# classes'}</li>
            <li>${window.t ? window.t('proTip2') : 'Field types are converted to proper C# types (string, int, DateTime, etc.)'}</li>
            <li>${window.t ? window.t('proTip3') : 'Use Ctrl+Space for IntelliSense in the code editor'}</li>
            <li>${window.t ? window.t('proTip4') : 'Changes to Data Model fields update automatically in your code'}</li>
            <li>${window.t ? window.t('proTip5') : 'Click "📊 Data Models" to see all connected models and their details'}</li>
        `;
        tipsList.style.cssText = `
            margin: 0;
            padding-left: 20px;
            line-height: 1.6;
        `;

        tipsSection.appendChild(tipsTitle);
        tipsSection.appendChild(tipsList);

        content.appendChild(step1);
        content.appendChild(step2);
        content.appendChild(step3);
        content.appendChild(tipsSection);

        // Create footer
        const footer = document.createElement('div');
        footer.style.cssText = `
            background: #f8fafc;
            padding: 20px 24px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        `;

        const footerButtons = document.createElement('div');
        footerButtons.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
        `;

        const dataModelsBtn = document.createElement('button');
        dataModelsBtn.textContent = `📊 ${window.t ? window.t('viewConnectedModels') : 'View Connected Models'}`;
        dataModelsBtn.style.cssText = `
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        `;
        dataModelsBtn.onmouseover = () => dataModelsBtn.style.background = '#2563eb';
        dataModelsBtn.onmouseout = () => dataModelsBtn.style.background = '#3b82f6';
        dataModelsBtn.onclick = () => {
            document.body.removeChild(modalOverlay);
            this.showDataModelsInfo();
        };

        const gotItBtn = document.createElement('button');
        gotItBtn.textContent = window.t ? window.t('gotIt') : 'Got it!';
        gotItBtn.style.cssText = `
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        `;
        gotItBtn.onmouseover = () => gotItBtn.style.background = '#059669';
        gotItBtn.onmouseout = () => gotItBtn.style.background = '#10b981';
        gotItBtn.onclick = () => document.body.removeChild(modalOverlay);

        footerButtons.appendChild(dataModelsBtn);
        footerButtons.appendChild(gotItBtn);
        footer.appendChild(footerButtons);

        // Assemble modal
        modal.appendChild(header);
        modal.appendChild(content);
        modal.appendChild(footer);
        modalOverlay.appendChild(modal);

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalIn {
                from { transform: scale(0.9) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modalOverlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        document.body.appendChild(modalOverlay);
    }

    /**
     * Create a help step element
     */
    createHelpStep(title, icon, description, codeExample) {
        const stepContainer = document.createElement('div');
        stepContainer.style.cssText = `
            margin-bottom: 24px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
        `;

        // Step header
        const stepHeader = document.createElement('div');
        stepHeader.style.cssText = `
            background: #f8fafc;
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 12px;
        `;

        const stepIcon = document.createElement('div');
        stepIcon.innerHTML = icon;
        stepIcon.style.cssText = `
            font-size: 24px;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const stepInfo = document.createElement('div');
        stepInfo.style.cssText = `
            flex: 1;
        `;

        const stepTitle = document.createElement('h3');
        stepTitle.textContent = title;
        stepTitle.style.cssText = `
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        `;

        const stepDesc = document.createElement('p');
        stepDesc.textContent = description;
        stepDesc.style.cssText = `
            margin: 0;
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        `;

        stepInfo.appendChild(stepTitle);
        stepInfo.appendChild(stepDesc);
        stepHeader.appendChild(stepIcon);
        stepHeader.appendChild(stepInfo);

        // Code example
        const codeContainer = document.createElement('div');
        codeContainer.style.cssText = `
            background: #1e293b;
            padding: 16px 20px;
        `;

        const codeBlock = document.createElement('pre');
        codeBlock.textContent = codeExample;
        codeBlock.style.cssText = `
            margin: 0;
            color: #e2e8f0;
            font-family: 'Fira Code', monospace;
            font-size: 13px;
            line-height: 1.5;
            overflow-x: auto;
        `;

        codeContainer.appendChild(codeBlock);
        stepContainer.appendChild(stepHeader);
        stepContainer.appendChild(codeContainer);

        return stepContainer;
    }

    /**
     * Get example value for a field type
     */
    getExampleValue(fieldType) {
        const examples = {
            'string': '"Example Text"',
            'text': '"Long text content..."',
            'number': '42',
            'int': '100',
            'decimal': '99.99m',
            'float': '3.14f',
            'boolean': 'true',
            'bool': 'false',
            'date': 'DateTime.Now',
            'datetime': 'DateTime.Now',
            'list': 'new List<string> { "item1", "item2" }',
            'array': 'new string[] { "value1", "value2" }'
        };
        
        return examples[fieldType.toLowerCase()] || '"DefaultValue"';
    }
}
