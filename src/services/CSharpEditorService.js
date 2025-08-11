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
            width: 95%;
            height: 85%;
            max-width: 1400px;
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
            min-width: 350px;
            width: 350px;
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
            gap: 8px;
            flex-wrap: wrap;
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

        // Format button
        const formatButton = document.createElement('button');
        formatButton.textContent = `🎨 ${window.t ? window.t('format') : 'Format'}`;
        formatButton.style.cssText = `
            background: #8B5CF6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            margin-left: 8px;
            transition: all 0.2s;
        `;
        formatButton.title = window.t ? window.t('formatCodeTooltip') : 'Auto-format C# code with proper indentation';
        formatButton.onmouseover = () => {
            formatButton.style.background = '#7C3AED';
        };
        formatButton.onmouseout = () => {
            formatButton.style.background = '#8B5CF6';
        };
        formatButton.onclick = () => {
            this.autoFormatCode();
            this.showStyledAlert(window.t ? window.t('codeFormatted') : 'Code formatted successfully! 🎨', 'success');
        };

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
        buttonContainer.appendChild(formatButton);
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
            color: #1f2937;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
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
            color: rgba(30, 41, 59, 0.1);
            caret-color: #3b82f6;
            z-index: 2;
            overflow: auto;
            tab-size: 4;
        `;

        // Set initial code with Data Models integration
        const initialCode = this.currentFunctionNode.code || this.generateInitialCodeWithDataModels();
        this.editorTextarea.value = initialCode;

        // Store line numbers reference before updating
        this.lineNumbers = lineNumbers;

        // Auto-format the initial code
        setTimeout(() => {
            this.autoFormatCode();
        }, 100);

        // Update line numbers and syntax highlighting
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();

        // Event listeners
        this.editorTextarea.addEventListener('input', (e) => {
            this.updateLineNumbers();
            this.updateSyntaxHighlighting();
            this.checkForAutoFormat(e);
        });

        this.editorTextarea.addEventListener('scroll', () => {
            this.syntaxContainer.scrollTop = this.editorTextarea.scrollTop;
            lineNumbers.scrollTop = this.editorTextarea.scrollTop;
        });

        // Tab support and IntelliSense
        this.editorTextarea.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        // IntelliSense popup management
        this.editorTextarea.addEventListener('keyup', (e) => {
            this.handleIntelliSense(e);
        });

        this.editorTextarea.addEventListener('blur', () => {
            this.hideIntelliSense();
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
     * Format C# code with proper indentation and structure
     */
    formatCSharpCode(code) {
        if (!code || code.trim() === '') return code;
        
        const lines = code.split('\n');
        const formattedLines = [];
        let indentLevel = 0;
        let inStringLiteral = false;
        let inComment = false;
        let inMultiLineComment = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            
            // Skip empty lines but preserve them
            if (line === '') {
                formattedLines.push('');
                continue;
            }
            
            // Handle multi-line comments
            if (line.includes('/*')) {
                inMultiLineComment = true;
            }
            if (inMultiLineComment) {
                formattedLines.push('    '.repeat(indentLevel) + line);
                if (line.includes('*/')) {
                    inMultiLineComment = false;
                }
                continue;
            }
            
            // Handle single-line comments
            if (line.startsWith('//')) {
                formattedLines.push('    '.repeat(indentLevel) + line);
                continue;
            }
            
            // Handle closing braces - decrease indent before adding line
            if (line.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
                formattedLines.push('    '.repeat(indentLevel) + line);
                continue;
            }
            
            // Add current line with proper indentation
            formattedLines.push('    '.repeat(indentLevel) + line);
            
            // Increase indent for opening braces and control structures
            if (line.endsWith('{') || 
                line.endsWith(':') ||
                /^\s*(if|else|for|foreach|while|do|switch|case|try|catch|finally|using)\b/.test(line)) {
                
                if (line.endsWith('{')) {
                    indentLevel++;
                }
            }
            
            // Handle special cases for switch statements
            if (line.includes('case ') || line.includes('default:')) {
                indentLevel++;
            }
            if (line.includes('break;') && i + 1 < lines.length && 
                (lines[i + 1].trim().includes('case ') || lines[i + 1].trim().includes('default:') || lines[i + 1].trim() === '}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
        }
        
        return formattedLines.join('\n');
    }

    /**
     * Auto-format the current code
     */
    autoFormatCode() {
        if (!this.editorTextarea) return;
        
        const originalCode = this.editorTextarea.value;
        const cursorPosition = this.editorTextarea.selectionStart;
        
        // Format the code
        const formattedCode = this.formatCSharpCode(originalCode);
        
        // Update the editor
        this.editorTextarea.value = formattedCode;
        
        // Try to preserve cursor position roughly
        const newCursorPosition = Math.min(cursorPosition, formattedCode.length);
        this.editorTextarea.selectionStart = newCursorPosition;
        this.editorTextarea.selectionEnd = newCursorPosition;
        
        // Update display
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();
        
        // Save the formatted code
        if (this.currentFunctionNode) {
            this.currentFunctionNode.code = formattedCode;
        }
        
        console.log('🎨 Code auto-formatted');
    }

    /**
     * Highlight C# syntax with advanced patterns
     */
    highlightCSharpSyntax(code) {
        let highlighted = code;
        
        // C# Keywords with different categories
        const basicTypes = ['void', 'int', 'string', 'bool', 'double', 'float', 'char', 'byte', 'sbyte', 'short', 'ushort', 'uint', 'long', 'ulong', 'decimal', 'object'];
        const complexTypes = ['DateTime', 'TimeSpan', 'Guid', 'List', 'Dictionary', 'Array', 'IEnumerable', 'Task'];
        const controlFlow = ['if', 'else', 'for', 'foreach', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'goto', 'return'];
        const modifiers = ['public', 'private', 'protected', 'internal', 'static', 'readonly', 'const', 'override', 'virtual', 'abstract', 'sealed', 'async'];
        const specialKeywords = ['var', 'new', 'this', 'base', 'null', 'true', 'false'];
        const contextualKeywords = ['class', 'interface', 'namespace', 'using', 'try', 'catch', 'finally', 'throw', 'await'];
        
        // 1. Multi-line comments
        highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6B7280; font-style: italic;">$&</span>');
        
        // 2. Single-line comments
        highlighted = highlighted.replace(/\/\/.*$/gm, '<span style="color: #6B7280; font-style: italic;">$&</span>');
        
        // 3. Strings (various types)
        highlighted = highlighted.replace(/"([^"\\]|\\.)*"/g, '<span style="color: #059669; font-weight: 500;">$&</span>');
        highlighted = highlighted.replace(/'([^'\\]|\\.)*'/g, '<span style="color: #059669; font-weight: 500;">$&</span>');
        highlighted = highlighted.replace(/@"([^"]|"")*"/g, '<span style="color: #059669; font-weight: 500;">$&</span>');
        
        // 4. Numbers
        highlighted = highlighted.replace(/\b0x[0-9A-Fa-f]+\b/g, '<span style="color: #7C2D12;">$&</span>');
        highlighted = highlighted.replace(/\b\d+(\.\d+)?[fFdDmM]?\b/g, '<span style="color: #EA580C;">$&</span>');
        
        // 5. Keywords by category with better colors
        
        // Basic types - keep black but bold for visibility
        basicTypes.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #1f2937; font-weight: bold;">${keyword}</span>`);
        });
        
        // Complex types - blue
        complexTypes.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #0284C7; font-weight: 600;">${keyword}</span>`);
        });
        
        // Control flow - red
        controlFlow.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #DC2626; font-weight: bold;">${keyword}</span>`);
        });
        
        // Modifiers - purple
        modifiers.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #7C3AED; font-weight: bold;">${keyword}</span>`);
        });
        
        // Special keywords like var, new, this - orange/amber
        specialKeywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #D97706; font-weight: bold;">${keyword}</span>`);
        });
        
        // Contextual keywords - dark purple
        contextualKeywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #6B21A8; font-weight: bold;">${keyword}</span>`);
        });
        
        // 6. Brackets only - dark color for visibility  
        highlighted = highlighted.replace(/([{}[\]()])/g, '<span style="color: #1f2937; font-weight: bold;">$1</span>');
        
        // 7. Method calls
        highlighted = highlighted.replace(/\b(\w+)(?=\s*\()/g, '<span style="color: #BE185D; font-weight: 500;">$1</span>');
        
        // 8. Properties after dot
        highlighted = highlighted.replace(/\.(\w+)(?!\s*\()/g, '.<span style="color: #059669; font-weight: 500;">$1</span>');
        
        // Finally escape remaining HTML chars
        highlighted = highlighted.replace(/&(?!amp;|lt;|gt;|#\d+;|#x[0-9a-fA-F]+;|\w+;)/g, '&amp;');
        
        return highlighted;
    }

    /**
     * Handle keydown events for Tab support and special keys
     */
    handleKeydown(e) {
        // Tab handling for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.editorTextarea.selectionStart;
            const end = this.editorTextarea.selectionEnd;
            const value = this.editorTextarea.value;
            
            if (e.shiftKey) {
                // Shift+Tab: Remove indentation
                this.handleUnindent(start, end);
            } else {
                // Tab: Add indentation
                this.handleIndent(start, end);
            }
            return;
        }

        // Enter for auto-formatting
        if (e.key === 'Enter') {
            setTimeout(() => {
                this.handleAutoIndent();
            }, 0);
        }

        // IntelliSense trigger on Ctrl+Space
        if (e.ctrlKey && e.key === ' ') {
            e.preventDefault();
            this.showIntelliSense();
        }

        // Escape to hide IntelliSense
        if (e.key === 'Escape') {
            this.hideIntelliSense();
        }
    }

    /**
     * Handle indentation (Tab)
     */
    handleIndent(start, end) {
        const value = this.editorTextarea.value;
        const selectedText = value.substring(start, end);
        
        if (selectedText.includes('\n')) {
            // Multi-line selection: indent each line
            const lines = selectedText.split('\n');
            const indentedLines = lines.map(line => '    ' + line);
            const newText = indentedLines.join('\n');
            
            this.editorTextarea.value = value.substring(0, start) + newText + value.substring(end);
            this.editorTextarea.selectionStart = start;
            this.editorTextarea.selectionEnd = start + newText.length;
        } else {
            // Single line or cursor: insert tab
            this.editorTextarea.value = value.substring(0, start) + '    ' + value.substring(end);
            this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = start + 4;
        }
        
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();
    }

    /**
     * Handle unindentation (Shift+Tab)
     */
    handleUnindent(start, end) {
        const value = this.editorTextarea.value;
        const selectedText = value.substring(start, end);
        
        if (selectedText.includes('\n')) {
            // Multi-line selection: unindent each line
            const lines = selectedText.split('\n');
            const unindentedLines = lines.map(line => {
                if (line.startsWith('    ')) {
                    return line.substring(4);
                } else if (line.startsWith('\t')) {
                    return line.substring(1);
                }
                return line;
            });
            const newText = unindentedLines.join('\n');
            
            this.editorTextarea.value = value.substring(0, start) + newText + value.substring(end);
            this.editorTextarea.selectionStart = start;
            this.editorTextarea.selectionEnd = start + newText.length;
        } else {
            // Single line: remove indentation at cursor
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineText = value.substring(lineStart, value.indexOf('\n', start));
            
            if (lineText.startsWith('    ')) {
                this.editorTextarea.value = value.substring(0, lineStart) + lineText.substring(4) + value.substring(lineStart + lineText.length);
                this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = start - 4;
            } else if (lineText.startsWith('\t')) {
                this.editorTextarea.value = value.substring(0, lineStart) + lineText.substring(1) + value.substring(lineStart + lineText.length);
                this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = start - 1;
            }
        }
        
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();
    }

    /**
     * Handle auto-indentation after Enter
     */
    handleAutoIndent() {
        const start = this.editorTextarea.selectionStart;
        const value = this.editorTextarea.value;
        
        // Find current line start
        const lineStart = value.lastIndexOf('\n', start - 2) + 1;
        const currentLineEnd = value.indexOf('\n', start - 1);
        const currentLine = value.substring(lineStart, currentLineEnd === -1 ? value.length : currentLineEnd);
        
        // Calculate indentation
        const indentMatch = currentLine.match(/^(\s*)/);
        let indent = indentMatch ? indentMatch[1] : '';
        
        // Add extra indentation for certain patterns
        if (currentLine.trim().endsWith('{') || currentLine.trim().endsWith(':')) {
            indent += '    ';
        }
        
        // Insert indentation
        if (indent) {
            this.editorTextarea.value = value.substring(0, start) + indent + value.substring(start);
            this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = start + indent.length;
            
            this.updateLineNumbers();
            this.updateSyntaxHighlighting();
        }
    }

    /**
     * Check for auto-formatting triggers
     */
    checkForAutoFormat(e) {
        const value = this.editorTextarea.value;
        const cursor = this.editorTextarea.selectionStart;
        
        // Auto-format on closing brace
        if (e.inputType === 'insertText' && e.data === '}') {
            setTimeout(() => {
                this.autoFormatClosingBrace(cursor - 1);
            }, 0);
        }
    }

    /**
     * Auto-format closing brace indentation
     */
    autoFormatClosingBrace(bracePosition) {
        const value = this.editorTextarea.value;
        const lineStart = value.lastIndexOf('\n', bracePosition - 1) + 1;
        const lineEnd = value.indexOf('\n', bracePosition);
        const line = value.substring(lineStart, lineEnd === -1 ? value.length : lineEnd);
        
        // Check if line only contains whitespace and the closing brace
        if (line.trim() === '}') {
            // Find matching opening brace indentation
            let braceCount = 1;
            let pos = bracePosition - 1;
            
            while (pos >= 0 && braceCount > 0) {
                if (value[pos] === '}') braceCount++;
                if (value[pos] === '{') braceCount--;
                pos--;
            }
            
            if (braceCount === 0) {
                // Found matching opening brace
                const openLineStart = value.lastIndexOf('\n', pos) + 1;
                const openLineEnd = value.indexOf('\n', pos + 1);
                const openLine = value.substring(openLineStart, openLineEnd === -1 ? value.length : openLineEnd);
                const openIndent = openLine.match(/^(\s*)/)[1];
                
                // Replace current line with proper indentation
                const newLine = openIndent + '}';
                this.editorTextarea.value = value.substring(0, lineStart) + newLine + value.substring(lineEnd === -1 ? value.length : lineEnd);
                this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = lineStart + newLine.length;
                
                this.updateLineNumbers();
                this.updateSyntaxHighlighting();
            }
        }
    }

    /**
     * Handle IntelliSense triggers
     */
    handleIntelliSense(e) {
        // Show IntelliSense on dot after identifier
        if (e.key === '.') {
            setTimeout(() => {
                this.showIntelliSense();
            }, 100);
        }
        
        // Hide IntelliSense on certain keys
        if (['Escape', 'Enter', ' '].includes(e.key)) {
            this.hideIntelliSense();
        }
    }

    /**
     * Show IntelliSense suggestions
     */
    showIntelliSense() {
        if (!this.currentProject) return;
        
        const cursor = this.editorTextarea.selectionStart;
        const value = this.editorTextarea.value;
        const beforeCursor = value.substring(0, cursor);
        
        // Check if we're after a dot
        const dotMatch = beforeCursor.match(/(\w+)\.$/);
        if (!dotMatch) {
            console.log('IntelliSense: No dot pattern found, cursor position:', cursor, 'before cursor:', beforeCursor.slice(-20));
            return;
        }
        
        const variableName = dotMatch[1];
        console.log('IntelliSense: Detected variable name:', variableName);
        
        const suggestions = this.getIntelliSenseSuggestions(variableName);
        
        if (suggestions.length > 0) {
            console.log('IntelliSense: Showing popup with', suggestions.length, 'suggestions');
            this.showIntelliSensePopup(suggestions, cursor);
        } else {
            console.log('IntelliSense: No suggestions found for variable:', variableName);
        }
    }

    /**
     * Get IntelliSense suggestions based on context
     */
    getIntelliSenseSuggestions(variableName) {
        const suggestions = [];
        
        // Get connected Data Models
        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        console.log('IntelliSense: Connected models:', connectedModels.map(m => ({
            label: m.label,
            fieldsCount: m.fields ? m.fields.length : 0,
            fields: m.fields || []
        })));
        
        // Check if variable matches a Data Model
        const matchingModel = connectedModels.find(model => {
            const modelName = model.label.toLowerCase();
            const varName = variableName.toLowerCase();
            const modelNameNoSpaces = model.label.replace(/\s+/g, '').toLowerCase();
            
            return modelName === varName || 
                   modelNameNoSpaces === varName ||
                   modelName.includes(varName) ||
                   varName.includes(modelName);
        });
        
        console.log('IntelliSense: Variable name:', variableName, 'Matching model:', matchingModel ? matchingModel.label : 'none');
        
        if (matchingModel && matchingModel.fields && Array.isArray(matchingModel.fields)) {
            // Add properties from Data Model fields
            matchingModel.fields.forEach(field => {
                suggestions.push({
                    text: field.name,
                    type: field.type || 'string',
                    description: `${field.type || 'string'} property from ${matchingModel.label}${field.required ? ' (required)' : ''}`
                });
            });
            
            console.log('IntelliSense: Added fields:', matchingModel.fields.map(f => f.name));
        }
        
        // Add common C# suggestions only if we found a matching model
        if (matchingModel) {
            const commonSuggestions = [
                { text: 'ToString()', type: 'method', description: 'Returns a string representation' },
                { text: 'Equals()', type: 'method', description: 'Determines equality' },
                { text: 'GetHashCode()', type: 'method', description: 'Returns hash code' },
                { text: 'GetType()', type: 'method', description: 'Gets the Type of the current instance' }
            ];
            
            suggestions.push(...commonSuggestions);
        }
        
        console.log('IntelliSense: Total suggestions:', suggestions.length);
        return suggestions;
    }

    /**
     * Show IntelliSense popup
     */
    showIntelliSensePopup(suggestions, cursor) {
        this.hideIntelliSense(); // Remove existing popup
        
        // Calculate position
        const textareaRect = this.editorTextarea.getBoundingClientRect();
        const textBeforeCursor = this.editorTextarea.value.substring(0, cursor);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines[lines.length - 1];
        const lineHeight = 22; // Line height in pixels
        
        // Create popup
        this.intelliSensePopup = document.createElement('div');
        this.intelliSensePopup.style.cssText = `
            position: absolute;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 13px;
            min-width: 250px;
        `;
        
        // Position popup
        const top = (lines.length - 1) * lineHeight + 35;
        const left = Math.min(currentLine.length * 8.5 + 70, textareaRect.width - 270);
        this.intelliSensePopup.style.top = `${top}px`;
        this.intelliSensePopup.style.left = `${left}px`;
        
        // Add suggestions
        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f9;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background 0.1s;
            `;
            
            if (index === 0) {
                item.style.background = '#f8fafc';
            }
            
            item.onmouseover = () => {
                // Clear other selections
                Array.from(this.intelliSensePopup.children).forEach(child => {
                    child.style.background = 'white';
                });
                item.style.background = '#f8fafc';
            };
            
            item.onclick = () => {
                this.insertIntelliSenseSuggestion(suggestion.text, cursor);
                this.hideIntelliSense();
            };
            
            // Type icon
            const typeIcon = document.createElement('span');
            typeIcon.textContent = suggestion.type === 'method' ? '⚙️' : '📝';
            typeIcon.style.cssText = 'font-size: 12px;';
            
            // Suggestion text
            const textSpan = document.createElement('span');
            textSpan.textContent = suggestion.text;
            textSpan.style.cssText = 'font-weight: 600; color: #1e293b;';
            
            // Type badge
            const typeBadge = document.createElement('span');
            typeBadge.textContent = suggestion.type;
            typeBadge.style.cssText = `
                background: #e2e8f0;
                color: #64748b;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-left: auto;
            `;
            
            item.appendChild(typeIcon);
            item.appendChild(textSpan);
            item.appendChild(typeBadge);
            this.intelliSensePopup.appendChild(item);
        });
        
        // Add to editor container
        this.editorContainer.appendChild(this.intelliSensePopup);
        
        // Handle keyboard navigation
        this.intelliSenseIndex = 0;
        this.intelliSenseSuggestions = suggestions;
    }

    /**
     * Insert IntelliSense suggestion
     */
    insertIntelliSenseSuggestion(text, cursorPos) {
        const value = this.editorTextarea.value;
        this.editorTextarea.value = value.substring(0, cursorPos) + text + value.substring(cursorPos);
        this.editorTextarea.selectionStart = this.editorTextarea.selectionEnd = cursorPos + text.length;
        
        this.updateLineNumbers();
        this.updateSyntaxHighlighting();
        this.editorTextarea.focus();
    }

    /**
     * Hide IntelliSense popup
     */
    hideIntelliSense() {
        if (this.intelliSensePopup) {
            this.intelliSensePopup.remove();
            this.intelliSensePopup = null;
            this.intelliSenseIndex = -1;
            this.intelliSenseSuggestions = [];
        }
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
            padding: 20px 24px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        `;

        const footerText = document.createElement('p');
        footerText.innerHTML = `💡 <strong>Tip:</strong> ${window.t ? window.t('tipDataModelsAvailable') : 'These Data Models are available for IntelliSense in your C# code.'}`;
        footerText.style.cssText = `
            margin: 0;
            font-size: 14px;
            color: #64748b;
        `;

        footer.appendChild(footerText);

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
            // Auto-format code before saving
            console.log('🎨 Auto-formatting code before save...');
            this.autoFormatCode();
            
            // Save code
            this.currentFunctionNode.updateCode(this.editorTextarea.value);
            this.currentFunctionNode.lastEditTime = new Date();
            
            // Save function name from input field
            const nameInput = this.overlay.querySelector('input[type="text"]');
            if (nameInput && nameInput.value.trim()) {
                this.currentFunctionNode.label = nameInput.value.trim();
                this.currentFunctionNode.name = nameInput.value.trim();
            }
            
            console.log('✅ Code formatted and saved successfully');
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
            return `using System;
using System.Collections.Generic;
using System.Linq;

public void Execute()
{
    // Your code here
    // 💡 Tip: Connect Data Models to get IntelliSense support!
    Console.WriteLine("Hello World!");
}`;
        }

        const connectedModels = this.currentFunctionNode.getConnectedDataModels(this.currentProject);
        
        if (connectedModels.length === 0) {
            return `using System;
using System.Collections.Generic;
using System.Linq;

public void Execute()
{
    // Your code here
    // 💡 Tip: Connect Data Models to access their properties with IntelliSense!
    // 🔗 Draw connections from this Function to Data Models to see examples
    
    Console.WriteLine("Hello World!");
}`;
        }

        // Generate code with connected Data Models examples
        let code = `using System;
using System.Collections.Generic;
using System.Linq;

public void Execute()
{
    // 🗃️ Connected Data Models (${connectedModels.length}):
    // ✨ IntelliSense enabled! Type variable name + dot to see properties
    
`;

        connectedModels.forEach((model, index) => {
            const className = model.label.replace(/\s+/g, ''); // Remove spaces for class name
            const variableName = className.charAt(0).toLowerCase() + className.slice(1);
            
            code += `    // ${index + 1}. ${model.label} Data Model\n`;
            code += `    var ${variableName} = new ${className}()\n    {\n`;
            
            if (model.schema && model.schema.properties) {
                // Show examples using schema properties
                const properties = Object.keys(model.schema.properties);
                const maxProps = Math.min(3, properties.length); // Show up to 3 properties
                
                properties.slice(0, maxProps).forEach((propName, propIndex) => {
                    const property = model.schema.properties[propName];
                    const exampleValue = this.getExampleValueForSchema(property.type, propName);
                    const comma = propIndex < maxProps - 1 ? ',' : '';
                    
                    code += `        ${propName} = ${exampleValue}${comma} // ${property.type || 'object'}\n`;
                });
                
                if (properties.length > 3) {
                    code += `        // ... and ${properties.length - 3} more properties\n`;
                }
            } else if (model.fields && model.fields.length > 0) {
                // Fallback to fields
                const maxFields = Math.min(3, model.fields.length);
                model.fields.slice(0, maxFields).forEach((field, fieldIndex) => {
                    const exampleValue = this.getExampleValue(field.type);
                    const comma = fieldIndex < maxFields - 1 ? ',' : '';
                    
                    code += `        ${field.name} = ${exampleValue}${comma} // ${field.type}\n`;
                });
                
                if (model.fields.length > 3) {
                    code += `        // ... and ${model.fields.length - 3} more fields\n`;
                }
            } else {
                code += `        // Configure properties here - use dot notation for IntelliSense\n`;
            }
            
            code += `    };\n\n`;
            
            // Add usage examples
            if (model.schema && model.schema.properties) {
                const firstProp = Object.keys(model.schema.properties)[0];
                if (firstProp) {
                    code += `    // IntelliSense example: ${variableName}. <- Type dot to see all properties!\n`;
                    code += `    Console.WriteLine($"${model.label}: {${variableName}.${firstProp}}");\n\n`;
                }
            }
        });

        code += `    // 🚀 Your business logic here
    // Use Ctrl+Space for IntelliSense suggestions
    // Use Tab for auto-completion after typing a dot
    
    var results = ProcessData(${connectedModels.map(m => {
            const className = m.label.replace(/\s+/g, '');
            return className.charAt(0).toLowerCase() + className.slice(1);
        }).join(', ')});
    
    Console.WriteLine($"Processed {connectedModels.length} data model${connectedModels.length !== 1 ? 's' : ''} successfully!");
}

private dynamic ProcessData(${connectedModels.map(m => {
            const className = m.label.replace(/\s+/g, '');
            return `${className} ${className.charAt(0).toLowerCase() + className.slice(1)}`;
        }).join(', ')})
{
    // Implement your data processing logic here
    return new { Status = "Success", Timestamp = DateTime.Now };
}`;

        return code;
    }

    /**
     * Get example value for schema-based properties
     */
    getExampleValueForSchema(type, propName) {
        const lowerPropName = propName.toLowerCase();
        
        switch (type) {
            case 'string':
                if (lowerPropName.includes('email')) return '"user@example.com"';
                if (lowerPropName.includes('name')) return '"John Doe"';
                if (lowerPropName.includes('phone')) return '"+1-234-567-8900"';
                if (lowerPropName.includes('address')) return '"123 Main St"';
                if (lowerPropName.includes('id')) return '"ABC123"';
                return '"Sample text"';
            
            case 'number':
            case 'integer':
                if (lowerPropName.includes('age')) return '25';
                if (lowerPropName.includes('price') || lowerPropName.includes('cost') || lowerPropName.includes('amount')) return '99.99m';
                if (lowerPropName.includes('quantity') || lowerPropName.includes('count')) return '10';
                return '42';
            
            case 'boolean':
                if (lowerPropName.includes('active') || lowerPropName.includes('enabled')) return 'true';
                if (lowerPropName.includes('deleted') || lowerPropName.includes('hidden')) return 'false';
                return 'true';
            
            case 'array':
                return 'new List<string> { "item1", "item2" }';
            
            case 'object':
                return 'new { }';
            
            default:
                return 'null';
        }
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
