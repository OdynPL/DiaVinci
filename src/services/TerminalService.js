/**
 * Terminal Service for DiVinci Application
 * Provides terminal console functionality with filtering and export capabilities
 */
class TerminalService {
    constructor() {
        this.isVisible = false;
        this.maxLines = 1000; // Maximum number of lines to keep in terminal
        this.history = [];
        this.filteredHistory = [];
        this.currentTextFilter = '';
        this.currentTypeFilter = 'all';
        this.lastHeight = null; // Store last user-set height
        this.commandHistory = []; // Store command history
        
        this.initializeTerminal();
        this.setupEventListeners();
    }

    /**
     * Initialize terminal elements and state
     */
    initializeTerminal() {
        this.terminalPanel = document.getElementById('terminal-panel');
        this.terminalOutput = document.getElementById('terminal-output');
        this.toggleButton = document.getElementById('terminal-toggle-btn');
        this.clearButton = document.getElementById('terminal-clear-btn');
        this.closeButton = document.getElementById('terminal-close-btn');
        this.exportButton = document.getElementById('terminal-export-btn');
        this.filterTypeSelect = document.getElementById('terminal-filter-type');
        this.filterTextInput = document.getElementById('terminal-filter-text');
        this.commandInput = document.getElementById('terminal-command-input');
        
        if (!this.terminalPanel || !this.terminalOutput) {
            console.warn(t('terminalElementsNotFoundInDOM'));
            return;
        }

        // Initial welcome message
        this.addLine(t('terminalInitialized'), 'info');
        this.addLine(t('canvasDropTracking'), 'info');
        this.addLine(t('typeHelpForCommands'), 'info');
    }

    /**
     * Setup event listeners for terminal controls
     */
    setupEventListeners() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggle());
        }

        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => this.clear());
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.hide());
        }

        if (this.exportButton) {
            this.exportButton.addEventListener('click', () => this.exportLogs());
        }

        if (this.filterTypeSelect) {
            this.filterTypeSelect.addEventListener('change', (e) => {
                this.currentTypeFilter = e.target.value;
                this.applyFilters();
            });
        }

        if (this.filterTextInput) {
            this.filterTextInput.addEventListener('input', (e) => {
                this.currentTextFilter = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Setup command input
        if (this.commandInput) {
            let historyIndex = -1;
            
            this.commandInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.executeCommand(this.commandInput.value.trim());
                    this.commandInput.value = '';
                    historyIndex = -1; // Reset history index
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.commandHistory.length > 0) {
                        if (historyIndex === -1) {
                            historyIndex = this.commandHistory.length - 1;
                        } else if (historyIndex > 0) {
                            historyIndex--;
                        }
                        this.commandInput.value = this.commandHistory[historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex !== -1) {
                        if (historyIndex < this.commandHistory.length - 1) {
                            historyIndex++;
                            this.commandInput.value = this.commandHistory[historyIndex];
                        } else {
                            historyIndex = -1;
                            this.commandInput.value = '';
                        }
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    this.handleTabCompletion();
                }
            });
        }

        // Setup resize handle functionality
        this.setupResizeHandle();

        // Handle resize events for terminal adjustment
        window.addEventListener('resize', () => {
            if (this.isVisible) {
                this.adjustTerminalHeight();
            }
        });

        // Initialize content height on startup
        setTimeout(() => {
            this.initializeContentHeight();
        }, 100);
        
        // Auto-focus on command input when clicking anywhere in terminal
        if (this.terminalPanel) {
            this.terminalPanel.addEventListener('click', (e) => {
                // Don't interfere with other interactive elements
                if (!e.target.matches('button, input, select, a, .terminal-resize-handle')) {
                    if (this.commandInput && this.isVisible) {
                        this.commandInput.focus();
                        console.log('Terminal clicked - focused command input');
                    }
                }
            });
        }
    }

    /**
     * Initialize terminal content height on startup
     */
    initializeContentHeight() {
        if (!this.terminalPanel) return;
        
        const currentHeight = this.terminalPanel.offsetHeight || 300;
        this.updateTerminalContentHeight(currentHeight);
    }

    /**
     * Toggle terminal visibility
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Show terminal
     */
    show() {
        if (!this.terminalPanel) return;

        console.log('Terminal show() called');
        
        this.isVisible = true;
        this.terminalPanel.classList.remove('hidden');
        this.toggleButton?.classList.add('active');
        
        // Calculate dynamic bottom position based on bottom navigation height
        const bottomNav = document.querySelector('.bottom-nav');
        const bottomNavHeight = bottomNav ? bottomNav.offsetHeight : 60; // Default 60px if not found
        this.terminalPanel.style.bottom = `${bottomNavHeight + 10}px`; // Add 10px gap
        
        console.log('Terminal positioned above bottom nav:', {
            bottomNavHeight,
            terminalBottom: `${bottomNavHeight + 10}px`
        });
        
        // Restore last height if available
        if (this.lastHeight && this.lastHeight > 0) {
            this.terminalPanel.style.height = this.lastHeight + 'px';
            this.updateTerminalContentHeight(this.lastHeight);
        } else {
            // Set default height and update content height accordingly
            const defaultHeight = this.terminalPanel.offsetHeight || 300;
            this.updateTerminalContentHeight(defaultHeight);
        }
        
        // Add class to main content for padding adjustment
        const mainContent = document.querySelector('.main-content') || document.body;
        mainContent.classList.add('terminal-open');

        console.log('Terminal visibility set, calling scrollToBottom...');
        
        // Auto-scroll to bottom immediately
        this.scrollToBottom();
        
        // Auto-scroll to bottom again after DOM updates
        setTimeout(() => {
            console.log('Terminal show() - first delayed scroll');
            this.scrollToBottom();
        }, 50);
        
        // Auto-scroll to bottom one more time to ensure it worked
        setTimeout(() => {
            console.log('Terminal show() - second delayed scroll');
            this.scrollToBottom();
        }, 200);

        // Focus on command input for immediate use
        if (this.commandInput) {
            // Multiple attempts to ensure focus works
            this.commandInput.focus();
            
            setTimeout(() => {
                this.commandInput.focus();
                console.log('Terminal show() - first focus attempt');
            }, 100);
            
            setTimeout(() => {
                this.commandInput.focus();
                console.log('Terminal show() - second focus attempt');
                // One final scroll after focus to ensure command line is visible
                this.scrollToBottom();
            }, 250);
            
            // Final focus attempt after all animations complete
            setTimeout(() => {
                if (this.isVisible) {
                    this.commandInput.focus();
                    console.log('Terminal show() - final focus attempt', {
                        focused: document.activeElement === this.commandInput,
                        commandInputExists: !!this.commandInput
                    });
                }
            }, 500);
        }
    }

    /**
     * Hide terminal
     */
    hide() {
        if (!this.terminalPanel) return;

        this.isVisible = false;
        this.terminalPanel.classList.add('hidden');
        this.toggleButton?.classList.remove('active');
        
        // Remove class from main content
        const mainContent = document.querySelector('.main-content') || document.body;
        mainContent.classList.remove('terminal-open');
    }

    /**
     * Clear terminal content
     */
    clear() {
        if (!this.terminalOutput) return;

        this.terminalOutput.innerHTML = '';
        this.history = [];
        this.filteredHistory = [];
        
        // Auto-scroll to bottom to ensure command line is visible
        if (this.isVisible) {
            setTimeout(() => {
                this.scrollToBottom();
                this.ensureCommandLineVisible();
                
                // Focus on command input after clear
                if (this.commandInput) {
                    this.commandInput.focus();
                    console.log('Clear - refocused command input');
                }
            }, 50);
        }
    }

    /**
     * Export logs to a file
     */
    exportLogs() {
        if (this.history.length === 0) {
            
            return;
        }

        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `diavinci-logs-${timestamp}.log`;
            
            // Create log content
            let logContent = `DiVinci Application Logs\nExported: ${new Date().toLocaleString()}\n`;
            logContent += '='.repeat(50) + '\n\n';
            
            // Use filtered history if filters are active, otherwise use full history
            const logsToExport = this.currentTextFilter || this.currentTypeFilter !== 'all' 
                ? this.filteredHistory 
                : this.history;
            
            logsToExport.forEach(line => {
                logContent += `${line.displayTimestamp} ${this.getTypePrefix(line.type)}${line.message}\n`;
            });
            
            // Create and download file
            const blob = new Blob([logContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addLine(`${t('logsExported')} ${filename} (${logsToExport.length} ${t('entriesCount')})`, 'success');
        } catch (error) {
            this.addLine(`${t('failedToExport')} ${error.message}`, 'error');
        }
    }

    /**
     * Apply current filters to terminal display
     */
    applyFilters() {
        if (!this.terminalOutput) return;

        // Filter history based on current filters
        this.filteredHistory = this.history.filter(line => {
            // Type filter
            if (this.currentTypeFilter !== 'all' && line.type !== this.currentTypeFilter) {
                return false;
            }
            
            // Text filter
            if (this.currentTextFilter && 
                !line.message.toLowerCase().includes(this.currentTextFilter) &&
                !this.getTypePrefix(line.type).toLowerCase().includes(this.currentTextFilter)) {
                return false;
            }
            
            return true;
        });

        // Rebuild display with filtered results
        this.rebuildFilteredDisplay();
    }

    /**
     * Rebuild terminal display with filtered results
     */
    rebuildFilteredDisplay() {
        if (!this.terminalOutput) return;

        this.terminalOutput.innerHTML = '';
        
        const logsToShow = this.currentTextFilter || this.currentTypeFilter !== 'all' 
            ? this.filteredHistory 
            : this.history;

        if (logsToShow.length === 0) {
            const noResultsElement = document.createElement('div');
            noResultsElement.className = 'terminal-line text-gray-500 italic';
            noResultsElement.innerHTML = `
                <span class="text-yellow-600 font-medium">[FILTER]</span> No logs match current filter criteria
            `;
            this.terminalOutput.appendChild(noResultsElement);
        } else {
            logsToShow.forEach(line => {
                const typePrefix = this.getTypePrefix(line.type);
                const lineElement = this.createLineElement(line, typePrefix);
                this.terminalOutput.appendChild(lineElement);
            });
        }

        // Auto-scroll to bottom
        if (this.isVisible) {
            this.scrollToBottom();
        }
    }

    /**
     * Add a line to terminal with timestamp and type
     * @param {string} message - Message to display
     * @param {string} type - Type: 'info', 'warning', 'error', 'debug'
     * @param {boolean} includeTimestamp - Whether to include timestamp
     */
    addLine(message, type = 'info', includeTimestamp = true) {
        if (!this.terminalOutput) return;

        const timestamp = includeTimestamp ? this.getTimestamp() : '';
        const typePrefix = this.getTypePrefix(type);
        
        const line = {
            message,
            type,
            timestamp: new Date().toISOString(),
            displayTimestamp: timestamp
        };

        // Add to history
        this.history.push(line);

        // Trim history if too long
        if (this.history.length > this.maxLines) {
            this.history = this.history.slice(-this.maxLines);
            this.applyFilters(); // Use filtered rebuild instead
            return;
        }

        // Check if line passes current filters
        const passesTypeFilter = this.currentTypeFilter === 'all' || line.type === this.currentTypeFilter;
        const passesTextFilter = !this.currentTextFilter || 
            line.message.toLowerCase().includes(this.currentTextFilter) ||
            typePrefix.toLowerCase().includes(this.currentTextFilter);

        // Only add to display if it passes filters
        if (passesTypeFilter && passesTextFilter) {
            // Remove "no results" message if it exists
            const noResultsMsg = this.terminalOutput.querySelector('.text-gray-500.italic');
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
            
            const lineElement = this.createLineElement(line, typePrefix);
            this.terminalOutput.appendChild(lineElement);
        }

        // Update filtered history
        this.applyFilters();

        // Auto-scroll to bottom if terminal is visible
        if (this.isVisible) {
            this.scrollToBottom();
            this.ensureCommandLineVisible();
        }
    }

    /**
     * Ensure command line is always visible (now it's always visible due to new structure)
     */
    ensureCommandLineVisible() {
        // Command line is now always visible since it's outside the scrollable content area
        // Just scroll the content to bottom to show latest logs
        this.scrollToBottom();
    }

    /**
     * Create a terminal line element
     * @param {Object} line - Line data object
     * @param {string} typePrefix - Formatted type prefix
     * @returns {HTMLElement} Line element
     */
    createLineElement(line, typePrefix) {
        const lineDiv = document.createElement('div');
        lineDiv.className = `terminal-line ${line.type}`;
        
        const content = `${line.displayTimestamp}${typePrefix}${line.message}`;
        lineDiv.textContent = content;
        
        return lineDiv;
    }

    /**
     * Rebuild entire terminal display (used when trimming history)
     */
    rebuildTerminalDisplay() {
        if (!this.terminalOutput) return;

        // Apply filters to rebuilt display
        this.applyFilters();
    }

    /**
     * Get formatted timestamp string
     * @returns {string} Formatted timestamp
     */
    getTimestamp() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}] `;
    }

    /**
     * Get type prefix for different message types
     * @param {string} type - Message type
     * @returns {string} Formatted prefix
     */
    getTypePrefix(type) {
        const prefixes = {
            'info': '[INFO] ',
            'warning': '[WARN] ',
            'error': '[ERROR] ',
            'debug': '[DEBUG] ',
            'success': '[SUCCESS] ',
            'function': '[FUNC] ',
            'canvas-drop': '🎯 ',
            'text-control': '📝 ',
            'element-move': '🔄 ',
            'element-modify': '✏️ '
        };
        return prefixes[type] || '[INFO] ';
    }

    /**
     * Scroll terminal to bottom
     */
    scrollToBottom() {
        if (!this.terminalOutput) return;
        
        // Only need to scroll the terminal-content now, since command line is always visible
        const terminalContent = document.querySelector('.terminal-content');
        
        if (terminalContent) {
            console.log('ScrollToBottom: Scrolling terminal-content to bottom...', {
                scrollHeight: terminalContent.scrollHeight,
                clientHeight: terminalContent.clientHeight,
                scrollTop: terminalContent.scrollTop
            });
            
            // Simple and reliable approach - scroll to maximum
            const maxScroll = terminalContent.scrollHeight - terminalContent.clientHeight;
            terminalContent.scrollTop = maxScroll;
            
            console.log('ScrollToBottom: Scroll completed', {
                scrollTop: terminalContent.scrollTop,
                maxScroll: maxScroll,
                isAtBottom: terminalContent.scrollTop >= maxScroll - 1
            });
            
            // Double check with requestAnimationFrame for reliability
            requestAnimationFrame(() => {
                terminalContent.scrollTop = maxScroll;
                console.log('ScrollToBottom: RAF verification', {
                    scrollTop: terminalContent.scrollTop,
                    isAtBottom: terminalContent.scrollTop >= maxScroll - 1
                });
            });
        } else {
            console.warn(t('scrollToBottomTerminalContentNotFound'));
        }
    }

    /**
     * Adjust terminal height when window is resized
     */
    adjustTerminalHeight() {
        if (!this.terminalPanel || !this.isVisible) return;
        
        const currentHeight = this.terminalPanel.offsetHeight;
        const maxHeight = window.innerHeight * 0.9;
        
        // Adjust if current height exceeds new max height
        if (currentHeight > maxHeight) {
            this.terminalPanel.style.height = maxHeight + 'px';
            this.updateTerminalContentHeight(maxHeight);
            this.lastHeight = maxHeight;
        } else {
            // Just update content height for current terminal height
            this.updateTerminalContentHeight(currentHeight);
        }
    }

    /**
     * Log function execution result
     * @param {string} functionName - Name of the function
     * @param {any} result - Function result
     * @param {number} executionTime - Execution time in ms
     */
    logFunctionResult(functionName, result, executionTime = null) {
        let message = `Function "${functionName}" executed`;
        
        if (executionTime !== null) {
            message += ` in ${executionTime}ms`;
        }
        
        this.addLine(message, 'function');
        
        if (result !== undefined) {
            const resultStr = typeof result === 'object' 
                ? JSON.stringify(result, null, 2) 
                : String(result);
            this.addLine(`Result: ${resultStr}`, 'success');
        }
    }

    /**
     * Log function error
     * @param {string} functionName - Name of the function
     * @param {Error} error - Error object
     */
    logFunctionError(functionName, error) {
        this.addLine(`${t('functionFailed')} "${functionName}": ${error.message}`, 'error');
        
        if (error.stack) {
            // Show stack trace for debugging
            this.addLine(`${t('stackTrace')}: ${error.stack}`, 'debug');
        }
    }

    /**
     * Log data model operations
     * @param {string} operation - Operation description
     * @param {string} modelName - Model name
     * @param {any} data - Additional data
     */
    logDataModelOperation(operation, modelName, data = null) {
        let message = `DataModel "${modelName}": ${operation}`;
        this.addLine(message, 'info');
        
        if (data) {
            const dataStr = typeof data === 'object' 
                ? JSON.stringify(data, null, 2) 
                : String(data);
            this.addLine(`Data: ${dataStr}`, 'debug');
        }
    }

    /**
     * Log system events
     * @param {string} event - Event description
     * @param {string} level - Log level: 'info', 'warning', 'error'
     */
    logSystemEvent(event, level = 'info') {
        this.addLine(`System: ${event}`, level);
    }

    /**
     * Add separator line
     * @param {string} title - Optional title for separator
     */
    addSeparator(title = null) {
        const separator = title 
            ? `--- ${title} ---`
            : '-------------------';
        this.addLine(separator, 'debug', false);
    }

    /**
     * Export terminal history
     * @returns {string} Terminal history as text
     */
    exportHistory() {
        return this.history.map(line => {
            const timestamp = new Date(line.timestamp).toLocaleString();
            const typePrefix = this.getTypePrefix(line.type);
            return `${timestamp} ${typePrefix}${line.message}`;
        }).join('\n');
    }

    /**
     * Get terminal statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        const stats = {
            totalLines: this.history.length,
            visible: this.isVisible,
            typeBreakdown: {}
        };

        // Count lines by type
        this.history.forEach(line => {
            stats.typeBreakdown[line.type] = (stats.typeBreakdown[line.type] || 0) + 1;
        });

        return stats;
    }

    /**
     * Update terminal content height dynamically during resize
     * @param {number} terminalHeight - New height of the terminal panel
     */
    updateTerminalContentHeight(terminalHeight) {
        const terminalContent = this.terminalPanel.querySelector('.terminal-content');
        if (!terminalContent) return;

        // Calculate header height (fixed at 48px) and command line height (responsive)
        const headerHeight = 48;
        const isMobile = window.innerWidth <= 768;
        const commandLineHeight = isMobile ? 54 : 50; // Reduced to match much smaller command line
        const contentHeight = terminalHeight - headerHeight - commandLineHeight;
        
        // Apply new height to content area
        terminalContent.style.height = `${contentHeight}px`;
        
        console.log('UpdateTerminalContentHeight:', {
            terminalHeight,
            headerHeight,
            commandLineHeight,
            contentHeight,
            isMobile
        });
        
        // Ensure content stays scrolled to bottom if it was at bottom
        if (this.isVisible && this.shouldAutoScroll()) {
            this.scrollToBottom();
        }
    }

    /**
     * Check if terminal should auto-scroll to bottom
     * @returns {boolean} True if near bottom of scroll area
     */
    shouldAutoScroll() {
        if (!this.terminalOutput) return true;
        
        const terminalContent = document.querySelector('.terminal-content');
        if (!terminalContent) return true;
        
        const scrollTop = terminalContent.scrollTop;
        const scrollHeight = terminalContent.scrollHeight;
        const clientHeight = terminalContent.clientHeight;
        
        // Consider "near bottom" if within 30px of the bottom
        return (scrollTop + clientHeight >= scrollHeight - 30);
    }

    /**
     * Setup resize handle functionality for terminal
     */
    setupResizeHandle() {
        const resizeHandle = this.terminalPanel.querySelector('.terminal-resize-handle');
        if (!resizeHandle) return;

        let isResizing = false;
        let startY = 0;
        let startHeight = 0;
        let currentHeight = 0;

        // Mouse down event on resize handle
        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startY = e.clientY;
            startHeight = this.terminalPanel.offsetHeight;
            currentHeight = startHeight;
            
            // Add resizing class for visual feedback
            this.terminalPanel.classList.add('resizing');
            
            // Disable transitions during resize for smooth dragging
            this.terminalPanel.style.transition = 'none';
            
            // Prevent text selection during resize
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ns-resize';
            
            e.preventDefault();
        });

        // Mouse move event for resizing
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const deltaY = startY - e.clientY; // Negative because we're resizing from bottom
            const newHeight = startHeight + deltaY;
            
            // Apply constraints
            const minHeight = 150; // Minimum height
            const maxHeight = window.innerHeight * 0.9; // Maximum 90% of viewport height
            
            currentHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
            this.terminalPanel.style.height = currentHeight + 'px';
            
            // Update terminal content height dynamically
            this.updateTerminalContentHeight(currentHeight);
            
            e.preventDefault();
        });

        // Mouse up event to finish resizing
        document.addEventListener('mouseup', () => {
            if (!isResizing) return;

            isResizing = false;
            
            // Remove resizing class
            this.terminalPanel.classList.remove('resizing');
            
            // Re-enable transitions
            this.terminalPanel.style.transition = '';
            
            // Reset cursor and text selection
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            
            // Store the current height for future reference
            this.lastHeight = currentHeight;
        });

        // Touch events for mobile support
        resizeHandle.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            isResizing = true;
            startY = touch.clientY;
            startHeight = this.terminalPanel.offsetHeight;
            currentHeight = startHeight;
            
            this.terminalPanel.classList.add('resizing');
            this.terminalPanel.style.transition = 'none';
            
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isResizing) return;

            const touch = e.touches[0];
            const deltaY = startY - touch.clientY;
            const newHeight = startHeight + deltaY;
            
            const minHeight = 150;
            const maxHeight = window.innerHeight * 0.9;
            
            currentHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
            this.terminalPanel.style.height = currentHeight + 'px';
            
            // Update terminal content height dynamically
            this.updateTerminalContentHeight(currentHeight);
            
            e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            if (!isResizing) return;

            isResizing = false;
            this.terminalPanel.classList.remove('resizing');
            this.terminalPanel.style.transition = '';
            this.lastHeight = currentHeight;
        });
    }

    /**
     * Handle TAB completion for command input
     */
    handleTabCompletion() {
        const currentInput = this.commandInput.value;
        
        // Check for ID.field_name pattern
        if (currentInput.includes('.')) {
            const [idPart, partialField] = currentInput.split('.');
            const id = parseInt(idPart);
            
            if (!isNaN(id)) {
                // Find the element by ID using internal helper method
                const element = this.getElementByIdInternal(id);
                if (element) {
                    const availableFields = this.getAvailableFieldNames(element);
                    const matchingFields = availableFields.filter(field => 
                        field.toLowerCase().startsWith((partialField || '').toLowerCase())
                    );
                    
                    if (matchingFields.length === 1) {
                        // Single match - complete it
                        this.commandInput.value = `${idPart}.${matchingFields[0]}`;
                    } else if (matchingFields.length > 1) {
                        // Multiple matches - show them
                        this.addLine(`${t('availableFields')} ${id} (${element.elementType}):`, 'info');
                        
                        // Group fields by category for better readability
                        const basicFields = matchingFields.filter(f => !f.includes('.'));
                        const nestedFields = matchingFields.filter(f => f.includes('.'));
                        
                        if (basicFields.length > 0) {
                            this.addLine(`   ${t('basicFields')} ${basicFields.slice(0, 8).join(', ')}${basicFields.length > 8 ? '...' : ''}`, 'info');
                        }
                        
                        if (nestedFields.length > 0) {
                            this.addLine(`   ${t('nestedFields')} ${nestedFields.slice(0, 5).join(', ')}${nestedFields.length > 5 ? '...' : ''}`, 'info');
                        }
                        
                        // Find common prefix
                        if (matchingFields.length > 1 && partialField) {
                            let commonPrefix = matchingFields[0];
                            for (let i = 1; i < matchingFields.length; i++) {
                                while (!matchingFields[i].toLowerCase().startsWith(commonPrefix.toLowerCase())) {
                                    commonPrefix = commonPrefix.slice(0, -1);
                                }
                            }
                            
                            // Complete to common prefix if it's longer than current partial field
                            if (commonPrefix.length > (partialField || '').length) {
                                this.commandInput.value = `${idPart}.${commonPrefix}`;
                            }
                        }
                    } else {
                        // No matching fields
                        this.addLine(`${t('noFieldsMatch')} "${partialField}" for element ${id}`, 'warning');
                        this.addLine(`${t('availableFields')}: ${availableFields.slice(0, 10).join(', ')}${availableFields.length > 10 ? '...' : ''}`, 'info');
                    }
                } else {
                    this.addLine(`${t('elementNotFound')} ${id}.`, 'error');
                }
                return;
            }
        }
        
        // Original command completion logic
        const commands = [
            'help', 'clear', 'status', 'export', 'version', 'time', 'history', 'reset',
            'find', 'search', 'inspect', 'list elements', 'list nodes', 'list texts', 'list trans',
            'count', 'stats', 'memory', 'performance', 'validate', 'debug on', 'debug off',
            'debug project', 'debug nodes', 'logs', 'trace', 'errors', 'config', 'backup', 'cleanup', 'ping',
            'fields', 'field', 'models'
        ];
        
        // Find matching commands
        const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
        
        if (matches.length === 1) {
            // Single match - complete it
            this.commandInput.value = matches[0];
            // If command needs parameters, add space
            const paramCommands = ['find', 'search', 'inspect', 'trace', 'logs', 'fields', 'field'];
            if (paramCommands.includes(matches[0])) {
                this.commandInput.value += ' ';
            }
        } else if (matches.length > 1) {
            // Multiple matches - show them
            this.addLine(`${t('availableCompletions')}: ${matches.join(', ')}`, 'info');
            
            // Find common prefix
            let commonPrefix = matches[0];
            for (let i = 1; i < matches.length; i++) {
                while (!matches[i].startsWith(commonPrefix)) {
                    commonPrefix = commonPrefix.slice(0, -1);
                }
            }
            
            // Complete to common prefix if it's longer than current input
            if (commonPrefix.length > currentInput.length) {
                this.commandInput.value = commonPrefix;
            }
        } else if (currentInput.length > 0) {
            // No matches
            this.addLine(`${t('noCommandsMatch')} "${currentInput}"`, 'warning');
        }
    }

    /**
     * Execute a terminal command
     * @param {string} command - The command to execute
     */
    executeCommand(command) {
        if (!command) return;

        // Add to command history
        this.commandHistory.push(command);
        if (this.commandHistory.length > 50) { // Keep only last 50 commands
            this.commandHistory.shift();
        }

        // Log the command
        this.addLine(`>>> ${command}`, 'debug');

        // Process the command
        const cmd = command.toLowerCase();
        
        // Debug: Log processed command
        console.log('ExecuteCommand - Processing command:', { original: command, processed: cmd });
        
        switch (cmd) {
            case 'help':
                
                this.addLine(t('terminalHelpTitle'), 'info');
                this.addLine('═'.repeat(50), 'info');
                
                this.addLine(t('basicCommands'), 'info');
                this.addLine(`   ${t('helpCommand')}`, 'info');
                this.addLine(`   ${t('clearCommand')}`, 'info');
                this.addLine(`   ${t('statusCommand')}`, 'info');
                this.addLine(`   ${t('exportCommand')}`, 'info');
                this.addLine(`   ${t('versionCommand')}`, 'info');
                this.addLine(`   ${t('timeCommand')}`, 'info');
                this.addLine(`   ${t('historyCommand')}`, 'info');
                this.addLine(`   ${t('resetCommand')}`, 'info');
                
                this.addLine(t('searchInspect'), 'info');
                this.addLine(`   ${t('findCommand')}`, 'info');
                this.addLine(`   ${t('searchCommand')}`, 'info');
                this.addLine(`   ${t('inspectCommand')}`, 'info');
                this.addLine(`   ${t('listElementsCommand')}`, 'info');
                this.addLine(`   ${t('listNodesCommand')}`, 'info');
                this.addLine(`   ${t('listTextsCommand')}`, 'info');
                this.addLine(`   ${t('listTransCommand')}`, 'info');
                this.addLine(`   ${t('countCommand')}`, 'info');
                
                this.addLine(t('analyticsCommands'), 'info');
                this.addLine(`   ${t('statsCommand')}`, 'info');
                this.addLine(`   ${t('memoryCommand')}`, 'info');
                this.addLine(`   ${t('performanceCommand')}`, 'info');
                this.addLine(`   ${t('validateCommand')}`, 'info');
                
                this.addLine(t('debuggingCommands'), 'info');
                this.addLine(`   ${t('debugCommand')}`, 'info');
                this.addLine(`   ${t('debugProjectCommand')}`, 'info');
                this.addLine(`   ${t('debugNodesCommand')}`, 'info');
                this.addLine(`   ${t('logsCommand')}`, 'info');
                this.addLine(`   ${t('traceCommand')}`, 'info');
                this.addLine(`   ${t('errorsCommand')}`, 'info');
                
                this.addLine(t('dataModelCommands'), 'info');
                this.addLine(`   ${t('fieldsCommand')}`, 'info');
                this.addLine(`   ${t('fieldCommand')}`, 'info');
                this.addLine(`   ${t('modelsCommand')}`, 'info');
                this.addLine(`   ${t('quickFieldAccess')}`, 'info');
                this.addLine(`                   ${t('tabAutocomplete')}`, 'info');
                
                this.addLine(t('systemCommands'), 'info');
                this.addLine(`   ${t('configCommand')}`, 'info');
                this.addLine(`   ${t('backupCommand')}`, 'info');
                this.addLine(`   ${t('cleanupCommand')}`, 'info');
                this.addLine(`   ${t('pingCommand')}`, 'info');
                this.addLine('═'.repeat(50), 'info');
                break;
            case 'clear':
                this.clear();
                this.addLine(t('terminalClearedByUser'), 'info');
                break;
            case 'status':
                
                this.addLine(t('systemStatus'), 'info');
                this.addLine('─'.repeat(30), 'info');
                this.addLine(`${t('terminalLines')} ${this.history.length}`, 'info');
                this.addLine(`${t('activeFilter')} ${this.currentTypeFilter}`, 'info');
                this.addLine(`${t('terminalVisible')} ${this.isVisible ? t('yes') : t('no')}`, 'info');
                this.addLine(`${t('maxLines')} ${this.maxLines}`, 'info');
                this.addLine(`${t('browser')} ${navigator.userAgent.split(' ')[0]}`, 'info');
                break;
            case 'version':
                
                this.addLine(t('divinciTitle'), 'info');
                this.addLine(t('versionInfo'), 'info');
                this.addLine(t('copyrightInfo'), 'info');
                
                break;
            case 'time':
                const now = new Date();
                this.addLine(`${t('currentTime')} ${now.toLocaleString()}`, 'info');
                break;
            case 'history':
                if (this.commandHistory && this.commandHistory.length > 0) {
                    
                    this.addLine(t('commandHistoryTitle'), 'info');
                    this.addLine('─'.repeat(30), 'info');
                    this.commandHistory.slice(-10).forEach((cmd, index) => {
                        this.addLine(`   ${index + 1}. ${cmd}`, 'info');
                    });
                } else {
                    this.addLine(t('noCommandHistory'), 'warning');
                }
                break;
            case 'export':
                this.exportLogs();
                this.addLine(t('logsExportedSuccess'), 'success');
                break;
            case 'reset':
                this.addLine(t('resetConfirmation'), 'warning');
                break;
            case 'reset confirm':
                this.clear();
                this.addLine(t('resetCompleted'), 'success');
                this.addLine(t('welcomeBackMessage'), 'info');
                break;
            case 'debug on':
                this.addLine(t('debugModeEnabled'), 'success');
                break;
            case 'debug off':
                this.addLine(t('debugModeDisabled'), 'info');
                break;
            case 'models':
                console.log('ExecuteCommand - models case matched');
                this.listDataModels();
                break;
            case 'count':
                this.countElements();
                break;
            case 'stats':
                this.showProjectStats();
                break;
            case 'memory':
                this.showMemoryInfo();
                break;
            case 'performance':
                this.showPerformanceMetrics();
                break;
            case 'validate':
                this.validateProject();
                break;
            case 'config':
                this.showSystemConfig();
                break;
            case 'backup':
                this.createProjectBackup();
                break;
            case 'cleanup':
                this.cleanupTempData();
                break;
            case 'ping':
                this.pingSystem();
                break;
            case 'errors':
                this.showRecentErrors();
                break;
            case 'list elements':
                this.listAllElements();
                break;
            case 'list nodes':
                this.listNodes();
                break;
            case 'list texts':
                this.listTexts();
                break;
            case 'list trans':
            case 'list transitions':
                this.listTransitions();
                break;
            case 'debug project':
                this.debugProject();
                break;
            case 'debug nodes':
                this.debugProjectNodes();
                break;
            default:
                // Check for commands with parameters
                if (cmd.startsWith('find ')) {
                    const id = command.substring(5).trim();
                    this.findElementById(id);
                } else if (cmd.startsWith('search ')) {
                    const searchTerm = command.substring(7).trim();
                    this.searchElementsByText(searchTerm);
                } else if (cmd.startsWith('inspect ')) {
                    const id = command.substring(8).trim();
                    this.inspectElementById(id);
                } else if (cmd.startsWith('trace ')) {
                    const id = command.substring(6).trim();
                    this.traceElementRelationships(id);
                } else if (cmd.startsWith('logs ')) {
                    const type = command.substring(5).trim();
                    this.filterLogsByType(type);
                } else if (cmd.startsWith('fields ')) {
                    const id = command.substring(7).trim();
                    this.listDataModelFields(id);
                } else if (cmd.startsWith('field ')) {
                    const params = command.substring(6).trim().split(' ');
                    if (params.length >= 2) {
                        const id = params[0];
                        const fieldName = params.slice(1).join(' '); // Support field names with spaces
                        this.getDataModelFieldValue(id, fieldName);
                    } else {
                        this.addLine(t('invalidSyntaxField'), 'error');
                    }
                } else if (cmd.includes('.') && /^\d+\.\w+/.test(cmd)) {
                    // Handle ID.field_name syntax for quick field access
                    this.handleQuickFieldAccess(command.trim());
                } else {
                    console.log('ExecuteCommand - Unknown command reached else clause:', { command, cmd });
                    this.addLine(`❌ Unknown command: "${command}"`, 'error');
                    this.addLine(t('typeHelpForCommands'), 'info');
                }
                break;
        }
        
        console.log('ExecuteCommand finished, calling scrollToBottom...');
        
        // Ensure terminal scrolls to bottom and command line remains visible after executing command
        setTimeout(() => {
            console.log('ExecuteCommand - delayed scroll');
            this.scrollToBottom();
            this.ensureCommandLineVisible();
            
            // Ensure focus returns to command input for next command
            if (this.commandInput) {
                this.commandInput.focus();
                console.log('ExecuteCommand - refocused command input');
            }
        }, 100);
    }

    // Handle ID.field_name syntax for quick field access
    handleQuickFieldAccess(command) {
        const [idPart, fieldName] = command.split('.');
        const id = parseInt(idPart);
        
        if (isNaN(id)) {
            this.addLine(t('invalidIdNumber').replace('$1', idPart), 'error');
            return;
        }

        // Find the element by ID using internal helper method
        const element = this.getElementByIdInternal(id);
        if (!element) {
            this.addLine(t('elementNotFoundById').replace('$1', id), 'error');
            return;
        }

        // Check if field exists (including nested field access)
        const fieldValue = this.getNestedFieldValue(element, fieldName);
        if (fieldValue === undefined) {
            this.addLine(`❌ Field "${fieldName}" not found in element ${id}.`, 'error');
            
            // Debug info for DataModel
            if (element.elementType === 'Node' && element.type === 'datamodel' && element.fields) {
                this.addLine(`🔧 DataModel Debug Info:`, 'debug');
                this.addLine(`   Total fields: ${element.fields.length}`, 'debug');
                element.fields.forEach((field, index) => {
                    this.addLine(`   Field ${index}: name="${field.name}", type="${field.type}"`, 'debug');
                });
            }
            
            this.addLine(`💡 Available fields: ${this.getAvailableFieldNames(element).join(', ')}`, 'info');
            return;
        }

        const displayValue = this.formatFieldValue(fieldValue, element.elementType);
        
        this.addLine(`Field Access Result:`);
        this.addLine(`🔸 Element ID: ${id}`);
        this.addLine(`🔸 Element Type: ${element.elementType}`);
        this.addLine(`🔸 Field: ${fieldName}`);
        this.addLine(`🔸 Value: ${displayValue}`);
        
        // Additional info for DataModel field access
        if (element.elementType === 'Node' && element.type === 'datamodel') {
            if (fieldName === 'fields') {
                this.addLine(`💡 This DataModel has ${element.fields.length} fields defined`, 'info');
                if (element.fields.length > 0) {
                    this.addLine(`   Field names: ${element.fields.map(f => f.name).join(', ')}`, 'info');
                }
            } else {
                // Check if this is a direct field name access
                const matchingField = element.fields.find(field => field.name === fieldName);
                if (matchingField) {
                    this.addLine(`💡 Field details:`, 'info');
                    this.addLine(`   Type: ${matchingField.type}`, 'info');
                    this.addLine(`   Required: ${matchingField.required ? 'Yes' : 'No'}`, 'info');
                    this.addLine(`   Read-only: ${matchingField.readOnly ? 'Yes' : 'No'}`, 'info');
                    if (matchingField.initialValue) {
                        this.addLine(`   Initial Value: "${matchingField.initialValue}"`, 'info');
                    }
                }
            }
        }
    }

    // Helper method to get nested field values (e.g., from.id, fields[0].name, lung)
    getNestedFieldValue(obj, fieldPath) {
        if (!fieldPath || !obj) return undefined;
        
        // Handle simple field access
        if (fieldPath in obj) {
            return obj[fieldPath];
        }
        
        // Special handling for DataModel field names
        if (obj.elementType === 'Node' && obj.type === 'datamodel' && obj.fields) {
            // Check if fieldPath matches any field name directly
            const matchingField = obj.fields.find(field => field.name === fieldPath);
            if (matchingField) {
                // Return the field object itself or its initial value
                return matchingField.initialValue !== undefined ? matchingField.initialValue : matchingField;
            }
        }
        
        // Handle array-like access for fields (e.g., fields.0.name would access first field's name)
        const parts = fieldPath.split('.');
        let current = obj;
        
        for (const part of parts) {
            if (current === null || current === undefined) return undefined;
            
            // Handle array index access
            if (/^\d+$/.test(part) && Array.isArray(current)) {
                const index = parseInt(part);
                current = current[index];
            } else if (current.hasOwnProperty && current.hasOwnProperty(part)) {
                current = current[part];
            } else {
                return undefined;
            }
        }
        
        return current;
    }

    // Helper method to get all available field names for autocomplete
    getAvailableFieldNames(element) {
        const baseFields = Object.keys(element).filter(key => key !== 'elementType');
        
        // Add special fields for DataModel nodes
        if (element.elementType === 'Node' && element.type === 'datamodel' && element.fields) {
            // Add the main fields array
            baseFields.push('fields');
            
            // Add individual field names from DataModel by their actual names
            element.fields.forEach((field, index) => {
                // Add direct field name access (e.g., "lung" for language field)
                if (field.name) {
                    baseFields.push(field.name);
                }
                
                // Also add indexed access for detailed field properties
                baseFields.push(`fields.${index}.name`);
                baseFields.push(`fields.${index}.type`);
                baseFields.push(`fields.${index}.initialValue`);
                baseFields.push(`fields.${index}.required`);
                baseFields.push(`fields.${index}.readOnly`);
                baseFields.push(`fields.${index}.id`);
            });
        }
        
        // Add special fields for Transitions
        if (element.elementType === 'Transition') {
            if (element.from) {
                baseFields.push('from.id', 'from.label', 'from.type', 'from.x', 'from.y');
            }
            if (element.to) {
                baseFields.push('to.id', 'to.label', 'to.type', 'to.x', 'to.y');
            }
        }
        
        return baseFields.sort();
    }

    // Helper method to format field values for display
    formatFieldValue(value, elementType) {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length === 0) return '[]';
                if (value.length <= 3) {
                    return `[${value.map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(', ')}]`;
                } else {
                    return `Array(${value.length}) [${value.slice(0, 2).map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(', ')}, ...]`;
                }
            } else {
                // Format objects with limited depth
                try {
                    const jsonStr = JSON.stringify(value, null, 2);
                    if (jsonStr.length > 200) {
                        return jsonStr.substring(0, 197) + '...';
                    }
                    return jsonStr;
                } catch (e) {
                    return '[Object]';
                }
            }
        }
        
        if (typeof value === 'string') {
            if (value.length > 100) {
                return `"${value.substring(0, 97)}..."`;
            }
            return `"${value}"`;
        }
        
        return String(value);
    }

    // Internal helper method to get element by ID without displaying output
    getElementByIdInternal(id) {
        // Get current project from global app or fallback to window.container
        let currentProject = window.app?.diagramController?.currentProject;
        
        // Fallback method if window.app is not available yet
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                // Silent fallback
            }
        }
        
        if (!currentProject) {
            return null;
        }

        // Search in all element types
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        // Try both string and number comparison
        const found = allElements.find(el => {
            return el.id === id || 
                   el.id === parseInt(id) || 
                   el.id === id.toString() ||
                   el.id.toString() === id ||
                   el.id.toString() === id.toString();
        });
        
        return found;
    }

    /**
     * Find element by ID
     */
    findElementById(id) {
        if (!id) {
            this.addLine(t('provideElementId'), 'error');
            return;
        }

        // Get current project from global app or fallback to window.container
        let currentProject = window.app?.diagramController?.currentProject;
        
        // Fallback method if window.app is not available yet
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine(t('noActiveProject'), 'error');
            this.addLine(`${t('debuggingWindowApp')} ${window.app ? t('yes') : t('no')}`, 'debug');
            this.addLine(`${t('debuggingWindowContainer')} ${window.container ? t('yes') : t('no')}`, 'debug');
            return;
        }

        // Debug: Show project contents
        this.addLine(`🔍 Searching in project with ${currentProject.nodes.length} nodes, ${currentProject.texts.length} texts, ${currentProject.transitions.length} transitions`, 'debug');

        // Search in all element types with improved ID handling
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        // Try both string and number comparison
        const found = allElements.find(el => {
            return el.id === id || 
                   el.id === parseInt(id) || 
                   el.id === id.toString() ||
                   el.id.toString() === id ||
                   el.id.toString() === id.toString();
        });
        
        if (found) {
            
            this.addLine(t('elementFound'), 'success');
            this.addLine('─'.repeat(50), 'info');
            this.addLine(`${t('elementType')} ${found.elementType}`, 'info');
            this.addLine(`${t('elementId')} ${found.id}`, 'info');
            this.addLine(`${t('elementLabel')} ${found.label || 'N/A'}`, 'info');
            
            if (found.x !== undefined && found.y !== undefined) {
                this.addLine(`${t('elementPosition')} (${Math.round(found.x)}, ${Math.round(found.y)})`, 'info');
            }
            
            if (found.width !== undefined && found.height !== undefined) {
                this.addLine(`${t('elementSize')} ${Math.round(found.width)}×${Math.round(found.height)}`, 'info');
            }
            
            if (found.color) {
                this.addLine(`${t('elementColor')} ${found.color}`, 'info');
            }
            
            if (found.type && found.elementType === 'Node') {
                this.addLine(`${t('nodeType')} ${found.type}`, 'info');
            }
            
            if (found.elementType === 'Transition') {
                this.addLine(`${t('transitionFrom')} ${found.from?.label || found.from?.id || 'N/A'}`, 'info');
                this.addLine(`${t('transitionTo')} ${found.to?.label || found.to?.id || 'N/A'}`, 'info');
                if (found.style) {
                    this.addLine(`${t('transitionStyle')} ${found.style}`, 'info');
                }
            }
            
            if (found.fields && found.fields.length > 0) {
                this.addLine(t('fieldsAvailable').replace('$1', found.fields.length), 'info');
            }
            
            this.addLine('─'.repeat(50), 'info');
            
            // Show usage tip
            this.addLine(t('useInspectForDetails').replace('$1', found.id), 'info');
        } else {
            
            this.addLine('❌ ELEMENT NOT FOUND', 'error');
            this.addLine('─'.repeat(50), 'error');
            this.addLine(`🔍 Searched ID: "${id}"`, 'error');
            this.addLine(`🔍 Total Elements: ${allElements.length}`, 'error');
            
            // Suggest similar IDs
            const similarIds = allElements.filter(el => 
                el.id.toString().includes(id.toString()) || 
                id.toString().includes(el.id.toString()) ||
                el.label?.toLowerCase().includes(id.toLowerCase()) ||
                id.toLowerCase().includes(el.label?.toLowerCase() || '')
            );
            
            if (similarIds.length > 0) {
                
                this.addLine('🔍 Similar matches found:', 'warning');
                similarIds.slice(0, 5).forEach((el, index) => {
                    this.addLine(`   ${index + 1}. ID: ${el.id} | ${el.elementType}: "${el.label}"`, 'warning');
                });
                
                if (similarIds.length > 5) {
                    this.addLine(`   ... and ${similarIds.length - 5} more matches`, 'warning');
                }
            } else {
                
                this.addLine('💡 Helpful commands:', 'info');
                this.addLine('   • "list elements" - See all available elements', 'info');
                this.addLine('   • "debug project" - Show project structure', 'info');
                
                if (allElements.length > 0) {
                    
                    this.addLine('📋 Available elements (first 3):', 'info');
                    allElements.slice(0, 3).forEach((el, index) => {
                        this.addLine(`   ${index + 1}. ID: ${el.id} | ${el.elementType}: "${el.label}"`, 'info');
                    });
                }
            }
        }
        
        // Auto-scroll to bottom after command
        this.scrollToBottom();
    }

    /**
     * Inspect element by ID with detailed information
     */
    inspectElementById(id) {
        if (!id) {
            this.addLine('❌ Please provide an element ID. Usage: inspect <id>', 'error');
            return;
        }

        // Get current project from global app or fallback to window.container
        let currentProject = window.app?.diagramController?.currentProject;
        
        // Fallback method if window.app is not available yet
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found. Please ensure the application is fully loaded.', 'error');
            return;
        }

        // Search in all element types with improved ID handling
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        // Try both string and number comparison
        const found = allElements.find(el => {
            return el.id === id || 
                   el.id === parseInt(id) || 
                   el.id === id.toString() ||
                   el.id.toString() === id ||
                   el.id.toString() === id.toString();
        });
        
        if (found) {
            
            this.addLine('🔍 DETAILED INSPECTION', 'success');
            this.addLine('─'.repeat(50), 'success');
            this.addLine(`🔸 Type: ${found.elementType}`, 'info');
            this.addLine(`🔸 ID: ${found.id}`, 'info');
            this.addLine(`🔸 Label: ${found.label || 'N/A'}`, 'info');
            
            // Position and dimensions
            if (found.x !== undefined && found.y !== undefined) {
                this.addLine(`🔸 Position: X:${Math.round(found.x)}, Y:${Math.round(found.y)}`, 'info');
            }
            
            if (found.width !== undefined && found.height !== undefined) {
                this.addLine(`🔸 Size: ${Math.round(found.width)} × ${Math.round(found.height)} pixels`, 'info');
            }
            
            // Visual properties
            if (found.color) {
                this.addLine(`🔸 Color: ${found.color}`, 'info');
            }
            
            if (found.backgroundColor) {
                this.addLine(`🔸 Background: ${found.backgroundColor}`, 'info');
            }
            
            if (found.borderColor) {
                this.addLine(`🔸 Border: ${found.borderColor}`, 'info');
            }
            
            // Type-specific information
            if (found.type && found.elementType === 'Node') {
                this.addLine(`🔸 Node Type: ${found.type}`, 'info');
            }
            
            if (found.elementType === 'Transition') {
                
                this.addLine('🔗 Transition Details:', 'info');
                this.addLine(`   • From: ${found.from?.label || found.from?.id || 'Unknown'}`, 'info');
                this.addLine(`   • To: ${found.to?.label || found.to?.id || 'Unknown'}`, 'info');
                
                if (found.style) {
                    this.addLine(`   • Style: ${found.style}`, 'info');
                }
                
                if (found.condition) {
                    this.addLine(`   • Condition: ${found.condition}`, 'info');
                }
            }
            
            // Fields information
            if (found.fields && found.fields.length > 0) {
                
                this.addLine(`📋 Fields (${found.fields.length} total):`, 'info');
                
                found.fields.slice(0, 5).forEach((field, index) => {
                    this.addLine(`   ${index + 1}. ${field.name} (${field.type})`, 'info');
                    
                    if (field.defaultValue !== undefined) {
                        this.addLine(`      └ Default: ${field.defaultValue}`, 'debug');
                    }
                });
                
                if (found.fields.length > 5) {
                    this.addLine(`   ${t('andMoreFields')} ${found.fields.length - 5} ${t('moreFields')}`, 'info');
                    this.addLine(`💡 ${t('useFieldsToSeeAll')} ${found.id}${t('toSeeAllFields')}`, 'info');
                }
            }
            
            // Timestamps
            if (found.createdAt || found.updatedAt) {
                
                this.addLine('⏰ Timestamps', 'info');
                this.addLine('─'.repeat(30), 'info');
                
                if (found.createdAt) {
                    const created = new Date(found.createdAt).toLocaleString();
                    this.addLine(`🔸 Created: ${created}`, 'info');
                }
                
                if (found.updatedAt) {
                    const updated = new Date(found.updatedAt).toLocaleString();
                    this.addLine(`🔸 Modified: ${updated}`, 'info');
                }
            }
            
            // Raw object properties
            
            this.addLine('🔧 All Properties', 'debug');
            this.addLine('─'.repeat(30), 'debug');
            
            // Show all properties in a clean format
            const cleanObject = { ...found };
            delete cleanObject.elementType; // Remove our added property
            
            Object.keys(cleanObject).forEach(key => {
                const value = cleanObject[key];
                let valueStr;
                
                if (value === null) {
                    valueStr = 'null';
                } else if (value === undefined) {
                    valueStr = 'undefined';
                } else if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        valueStr = `Array[${value.length}]`;
                    } else {
                        valueStr = `Object{${Object.keys(value).length}}`;
                    }
                } else if (typeof value === 'string' && value.length > 30) {
                    valueStr = value.substring(0, 27) + '...';
                } else {
                    valueStr = String(value);
                }
                
                this.addLine(`🔸 ${key}: ${valueStr}`, 'debug');
            });
            
            
            this.addLine('📄 JSON Data', 'debug');
            this.addLine('─'.repeat(30), 'debug');
            
            // Display complete JSON without truncation
            const jsonStr = JSON.stringify(cleanObject, null, 2);
            const jsonLines = jsonStr.split('\n');
            
            // Display all JSON lines without limiting
            jsonLines.forEach(line => {
                this.addLine(`   ${line}`, 'debug');
            });
            
            // Usage tips
            
            this.addLine('💡 Quick Actions:', 'info');
            this.addLine(`   • Copy JSON: Use browser dev tools to copy full object`, 'info');
            this.addLine(`   • Find similar: "list elements" to see all available`, 'info');
            this.addLine(`   • Quick find: "find <partial-id>" for fuzzy search`, 'info');
        } else {
            
            this.addLine('❌ Inspection Failed', 'error');
            this.addLine('─'.repeat(30), 'error');
            this.addLine(`🔸 Target ID: "${id}"`, 'error');
            this.addLine(`🔸 Search Type: ${typeof id}`, 'error');
            this.addLine(`🔸 Project Elements: ${allElements.length}`, 'error');
            
            // Enhanced suggestions
            const partialMatches = allElements.filter(el => 
                el.id.toString().includes(id.toString()) || 
                id.toString().includes(el.id.toString())
            );
            
            const labelMatches = allElements.filter(el =>
                el.label?.toLowerCase().includes(id.toLowerCase()) ||
                id.toLowerCase().includes(el.label?.toLowerCase() || '')
            );
            
            if (partialMatches.length > 0) {
                
                this.addLine('🎯 PARTIAL ID MATCHES:', 'warning');
                partialMatches.slice(0, 3).forEach((el, index) => {
                    this.addLine(`   ${index + 1}. ${el.id} (${typeof el.id}) - ${el.elementType}: "${el.label}"`, 'warning');
                });
            }
            
            if (labelMatches.length > 0 && labelMatches.length !== partialMatches.length) {
                
                this.addLine('🏷️  LABEL MATCHES:', 'warning');
                labelMatches.slice(0, 3).forEach((el, index) => {
                    this.addLine(`   ${index + 1}. ${el.id} - "${el.label}" (${el.elementType})`, 'warning');
                });
            }
            
            if (partialMatches.length === 0 && labelMatches.length === 0) {
                
                this.addLine('💡 TROUBLESHOOTING TIPS:', 'info');
                this.addLine('   • Check ID spelling and case sensitivity', 'info');
                this.addLine('   • Use "list elements" for complete element list', 'info');
                this.addLine('   • Try "debug project" for project overview', 'info');
                
                // Show first few available IDs for reference
                if (allElements.length > 0) {
                    
                    this.addLine('📋 SAMPLE AVAILABLE IDs:', 'info');
                    allElements.slice(0, 3).forEach((el, index) => {
                        this.addLine(`   ${index + 1}. ${el.id} (${typeof el.id}) - ${el.elementType}`, 'info');
                    });
                    
                    if (allElements.length > 3) {
                        this.addLine(`   ... and ${allElements.length - 3} more elements`, 'info');
                    }
                }
            }
        }
        
        // Auto-scroll to bottom after command
        this.scrollToBottom();
    }

    /**
     * List all elements with their IDs
     */
    listAllElements() {
        // Get current project from global app or fallback to window.container
        let currentProject = window.app?.diagramController?.currentProject;
        
        // Fallback method if window.app is not available yet
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                // Ignore container resolution errors
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found. Please ensure the application is fully loaded.', 'error');
            return;
        }

        
        this.addLine('📋 All Project Elements', 'info');
        this.addLine('─'.repeat(50), 'info');
        this.addLine(`🔸 Project: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔸 Total Nodes: ${currentProject.nodes.length}`, 'info');
        this.addLine(`🔸 Total Texts: ${currentProject.texts.length}`, 'info');
        this.addLine(`🔸 Total Transitions: ${currentProject.transitions.length}`, 'info');
        
        let totalCount = 0;
        
        // List nodes
        if (currentProject.nodes.length > 0) {
            
            this.addLine(`🔷 Nodes (${currentProject.nodes.length}):`, 'success');
            
            currentProject.nodes.forEach((node, index) => {
                const label = node.label || 'Unnamed';
                const type = node.type || 'Unknown';
                
                this.addLine(`   ${index + 1}. ID: ${node.id} | Type: ${type} | Label: "${label}"`, 'info');
                
                if (node.x !== undefined && node.y !== undefined) {
                    this.addLine(`      └ Position: (${Math.round(node.x)}, ${Math.round(node.y)})`, 'debug');
                }
                
                totalCount++;
            });
        }
        
        // List text elements
        if (currentProject.texts.length > 0) {
            
            this.addLine(`📝 Text Elements (${currentProject.texts.length}):`, 'success');
            
            currentProject.texts.forEach((text, index) => {
                const label = text.label || text.text || 'Unnamed';
                
                this.addLine(`   ${index + 1}. ID: ${text.id} | Label: "${label}"`, 'info');
                
                if (text.x !== undefined && text.y !== undefined) {
                    this.addLine(`      └ Position: (${Math.round(text.x)}, ${Math.round(text.y)})`, 'debug');
                }
                
                totalCount++;
            });
        }
        
        // List transitions
        if (currentProject.transitions.length > 0) {
            
            this.addLine(`🔗 Transitions (${currentProject.transitions.length}):`, 'success');
            
            currentProject.transitions.forEach((transition, index) => {
                const label = transition.label || 'Unnamed';
                const fromLabel = transition.from?.label || transition.from?.id || 'Unknown';
                const toLabel = transition.to?.label || transition.to?.id || 'Unknown';
                
                this.addLine(`   ${index + 1}. ID: ${transition.id} | Label: "${label}"`, 'info');
                this.addLine(`      └ From: ${fromLabel} → To: ${toLabel}`, 'debug');
                
                totalCount++;
            });
        }
        
        
        
        if (totalCount === 0) {
            this.addLine('📭 No elements found in this project', 'warning');
        } else {
            this.addLine(`📊 Summary: ${totalCount} elements total`, 'success');
        }
        
        
        this.addLine('💡 Quick Actions:', 'info');
        this.addLine('   • "find <id>" - Find specific element by ID', 'info');
        this.addLine('   • "inspect <id>" - View detailed element information', 'info');
        this.addLine('   • "search <text>" - Search elements by text content', 'info');
        
        // Auto-scroll to bottom after command
        this.scrollToBottom();
    }

    /**
     * Debug project contents
     */
    debugProject() {
        let currentProject = window.app?.diagramController?.currentProject;
        
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                // Ignore container resolution errors
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('🔧 PROJECT DEBUG INFO', 'info');
        this.addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        this.addLine(`📁 Project Name: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔷 Nodes Count: ${currentProject.nodes.length}`, 'info');
        this.addLine(`📝 Texts Count: ${currentProject.texts.length}`, 'info');
        this.addLine(`🔗 Transitions Count: ${currentProject.transitions.length}`, 'info');
        
        if (currentProject.nodes.length > 0) {
            
            this.addLine('🔷 NODES DETAILS:', 'info');
            currentProject.nodes.forEach((node, index) => {
                this.addLine(`   ${index + 1}. Type: ${node.type || 'node'}, Label: "${node.label}", ID: ${node.id}`, 'info');
            });
        }
        
        if (currentProject.texts.length > 0) {
            
            this.addLine('📝 TEXTS DETAILS:', 'info');
            currentProject.texts.forEach((text, index) => {
                this.addLine(`   ${index + 1}. Label: "${text.label}", ID: ${text.id}`, 'info');
            });
        }
        
        if (currentProject.transitions.length > 0) {
            
            this.addLine('🔗 TRANSITIONS DETAILS:', 'info');
            currentProject.transitions.forEach((transition, index) => {
                this.addLine(`   ${index + 1}. Label: "${transition.label}", ID: ${transition.id}`, 'info');
            });
        }
        
        this.addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        
        this.scrollToBottom();
    }

    /**
     * Search elements by text in label, name or other text fields
     */
    searchElementsByText(searchTerm) {
        if (!searchTerm) {
            this.addLine('❌ Please provide a search term. Usage: search <text>', 'error');
            return;
        }

        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        const searchLower = searchTerm.toLowerCase();
        const matches = allElements.filter(el => {
            return (el.label && el.label.toLowerCase().includes(searchLower)) ||
                   (el.name && el.name.toLowerCase().includes(searchLower)) ||
                   (el.text && el.text.toLowerCase().includes(searchLower)) ||
                   (el.description && el.description.toLowerCase().includes(searchLower));
        });

        
        this.addLine('🔍 Search Results', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`🔸 Search Term: "${searchTerm}"`, 'info');
        this.addLine(`🔸 Total Matches: ${matches.length}`, 'info');

        if (matches.length === 0) {
            
            this.addLine('❌ No Matches Found', 'warning');
            this.addLine('─'.repeat(30), 'warning');
            this.addLine(`🔸 Searched for: "${searchTerm}"`, 'warning');
            this.addLine(`🔸 Total elements: ${allElements.length}`, 'warning');
            
            
            this.addLine('💡 TIP: Try searching with partial terms or check spelling', 'info');
        } else {
            
            this.addLine('✅ Matches Found', 'success');
            this.addLine('─'.repeat(30), 'success');
            
            matches.slice(0, 20).forEach((el, index) => {
                const label = el.label || el.name || el.text || 'N/A';
                
                
                this.addLine(`${index + 1}. Match Details`, 'info');
                this.addLine('─'.repeat(20), 'info');
                this.addLine(`🔸 Type: ${el.elementType}`, 'info');
                this.addLine(`🔸 ID: ${el.id}`, 'info');
                this.addLine(`🔸 Label: ${label}`, 'info');
                
                if (el.x !== undefined && el.y !== undefined) {
                    const pos = `(${Math.round(el.x)}, ${Math.round(el.y)})`;
                    this.addLine(`🔸 Position: ${pos}`, 'info');
                }
                
                if (el.color) {
                    this.addLine(`🔸 Color: ${el.color}`, 'info');
                }
                
                // Show what matched the search
                const matchedFields = [];
                if (el.label && el.label.toLowerCase().includes(searchLower)) matchedFields.push('label');
                if (el.name && el.name.toLowerCase().includes(searchLower)) matchedFields.push('name');
                if (el.text && el.text.toLowerCase().includes(searchLower)) matchedFields.push('text');
                if (el.description && el.description.toLowerCase().includes(searchLower)) matchedFields.push('description');
                
                if (matchedFields.length > 0) {
                    this.addLine(`🔸 Matched in: ${matchedFields.join(', ')}`, 'success');
                }
                
                if (index < matches.length - 1 && index < 19) {
                     // Space between matches
                }
            });
            
            if (matches.length > 20) {
                
                this.addLine('📄 More Results Available', 'warning');
                this.addLine('─'.repeat(30), 'warning');
                this.addLine(`🔸 Showing: 20 of ${matches.length} total matches`, 'warning');
                this.addLine('🔸 Use more specific search terms for fewer results', 'warning');
            }
            
            
            this.addLine('💡 Use "inspect <id>" to view detailed element information', 'info');
        }
        
        this.scrollToBottom();
    }

    /**
     * List only nodes
     */
    listNodes() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine('🟢 Nodes', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`🔸 Project: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔸 Total Nodes: ${currentProject.nodes.length}`, 'info');
        
        if (currentProject.nodes.length === 0) {
            this.addLine('', 'warning');
            this.addLine('⚠️ No Nodes Found', 'warning');
        } else {
            
            
            currentProject.nodes.slice(0, 20).forEach((node, index) => {
                const type = node.type || 'Unknown';
                const label = node.label || 'Unnamed';
                const fieldsCount = node.fields ? node.fields.length : 0;
                
                this.addLine('', 'info');
                this.addLine(`${index + 1}. Node`, 'info');
                this.addLine('─'.repeat(20), 'info');
                this.addLine(`🔸 ID: ${node.id}`, 'info');
                this.addLine(`🔸 Label: ${label}`, 'info');
                this.addLine(`🔸 Type: ${type}`, 'info');
                
                if (fieldsCount > 0) {
                    this.addLine(`🔸 Fields: ${fieldsCount}`, 'info');
                }
                
                if (node.x !== undefined && node.y !== undefined) {
                    const pos = `(${Math.round(node.x)}, ${Math.round(node.y)})`;
                    this.addLine(`🔸 Position: ${pos}`, 'info');
                }
                
                if (node.width !== undefined && node.height !== undefined) {
                    const size = `${Math.round(node.width)}×${Math.round(node.height)}`;
                    this.addLine(`🔸 Size: ${size}`, 'info');
                }
                
                if (node.color) {
                    this.addLine(`🔸 Color: ${node.color}`, 'info');
                }
            });
            
            if (currentProject.nodes.length > 20) {
                this.addLine('', 'warning');
                this.addLine('📄 More Nodes Available', 'warning');
                this.addLine('─'.repeat(30), 'warning');
                this.addLine(`🔸 Showing: 20 of ${currentProject.nodes.length} total nodes`, 'warning');
                this.addLine('🔸 Use "search <text>" to find specific nodes', 'warning');
            }
        }
        
        
        this.addLine('💡 QUICK ACTIONS:', 'info');
        this.addLine('   • "find <id>" - Find specific node by ID', 'info');
        this.addLine('   • "inspect <id>" - View detailed node information', 'info');
        this.addLine('   • "search <text>" - Search nodes by label/name', 'info');
        
        this.scrollToBottom();
    }

    /**
     * List only text elements
     */
    listTexts() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine('📝 Text Elements', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`🔸 Project: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔸 Total Texts: ${currentProject.texts.length}`, 'info');
        
        if (currentProject.texts.length === 0) {
            this.addLine('', 'warning');
            this.addLine('📭 No Text Elements Found', 'warning');
        } else {
            
            
            currentProject.texts.slice(0, 20).forEach((text, index) => {
                const content = text.text || text.label || 'Empty';
                
                this.addLine('', 'info');
                this.addLine(`${index + 1}. Text Element`, 'info');
                this.addLine('─'.repeat(20), 'info');
                this.addLine(`🔸 ID: ${text.id}`, 'info');
                this.addLine(`🔸 Content: ${content}`, 'info');
                
                if (text.label && text.label !== content) {
                    this.addLine(`🔸 Label: ${text.label}`, 'info');
                }
                
                if (text.x !== undefined && text.y !== undefined) {
                    const pos = `(${Math.round(text.x)}, ${Math.round(text.y)})`;
                    this.addLine(`🔸 Position: ${pos}`, 'info');
                }
                
                if (text.color) {
                    this.addLine(`🔸 Color: ${text.color}`, 'info');
                }
                
                if (text.fontSize) {
                    this.addLine(`🔸 Font Size: ${text.fontSize}`, 'info');
                }
            });
            
            if (currentProject.texts.length > 20) {
                this.addLine('', 'warning');
                this.addLine('📄 More Text Elements Available', 'warning');
                this.addLine('─'.repeat(30), 'warning');
                this.addLine(`🔸 Showing: 20 of ${currentProject.texts.length} total texts`, 'warning');
                this.addLine('🔸 Use "search <text>" to find specific elements', 'warning');
            }
        }
        
        
        this.addLine('💡 QUICK ACTIONS:', 'info');
        this.addLine('   • "find <id>" - Find specific text element by ID', 'info');
        this.addLine('   • "inspect <id>" - View detailed text information', 'info');
        this.addLine('   • "search <text>" - Search text elements by content', 'info');
        
        this.scrollToBottom();
    }

    /**
     * List only transitions
     */
    listTransitions() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine('🔗 Transitions', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`🔸 Project: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔸 Total Transitions: ${currentProject.transitions.length}`, 'info');
        
        if (currentProject.transitions.length === 0) {
            this.addLine('', 'warning');
            this.addLine('⚠️ No Transitions Found', 'warning');
        } else {
            
            
            currentProject.transitions.slice(0, 20).forEach((trans, index) => {
                const fromLabel = trans.from?.label || trans.from?.id || 'Unknown';
                const toLabel = trans.to?.label || trans.to?.id || 'Unknown';
                const label = trans.label || 'Unnamed';
                
                this.addLine('', 'info');
                this.addLine(`${index + 1}. Transition`, 'info');
                this.addLine('─'.repeat(20), 'info');
                this.addLine(`🔸 ID: ${trans.id}`, 'info');
                this.addLine(`🔸 Label: ${label}`, 'info');
                this.addLine(`🔸 From: ${fromLabel}`, 'info');
                this.addLine(`🔸 To: ${toLabel}`, 'info');
                
                if (trans.condition) {
                    this.addLine(`🔸 Condition: ${trans.condition}`, 'info');
                }
                
                if (trans.style) {
                    this.addLine(`🔸 Style: ${trans.style}`, 'info');
                }
                
                if (trans.color) {
                    this.addLine(`🔸 Color: ${trans.color}`, 'info');
                }
            });
            
            if (currentProject.transitions.length > 20) {
                this.addLine('', 'warning');
                this.addLine('📄 More Transitions Available', 'warning');
                this.addLine('─'.repeat(30), 'warning');
                this.addLine(`🔸 Showing: 20 of ${currentProject.transitions.length} total transitions`, 'warning');
                this.addLine('🔸 Use "search <text>" to find specific transitions', 'warning');
            }
        }
        
        
        this.addLine('💡 QUICK ACTIONS:', 'info');
        this.addLine('   • "find <id>" - Find specific transition by ID', 'info');
        this.addLine('   • "inspect <id>" - View detailed transition information', 'info');
        this.addLine('   • "trace <node-id>" - Trace connections for a node', 'info');
        
        this.scrollToBottom();
    }

    /**
     * Count all elements
     */
    countElements() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        const nodeCount = currentProject.nodes.length;
        const textCount = currentProject.texts.length;
        const transCount = currentProject.transitions.length;
        const totalCount = nodeCount + textCount + transCount;

        this.addLine('', 'info');
        this.addLine('Element Count', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`Nodes: ${nodeCount} elements`, 'info');
        this.addLine(`Texts: ${textCount} elements`, 'info');
        this.addLine(`Transitions: ${transCount} elements`, 'info');
        this.addLine('', 'success');
        this.addLine(`Total: ${totalCount} elements`, 'success');
        
        this.scrollToBottom();
    }

    /**
     * Show detailed project statistics
     */
    showProjectStats() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        // Calculate detailed statistics
        const nodes = currentProject.nodes || [];
        const texts = currentProject.texts || [];
        const transitions = currentProject.transitions || [];

        // Node statistics
        const nodeTypes = {};
        let totalFields = 0;
        nodes.forEach(node => {
            const type = node.type || 'Unknown';
            nodeTypes[type] = (nodeTypes[type] || 0) + 1;
            if (node.fields) totalFields += node.fields.length;
        });

        // Transition statistics
        const transitionStyles = {};
        transitions.forEach(trans => {
            const style = trans.style || 'default';
            transitionStyles[style] = (transitionStyles[style] || 0) + 1;
        });

        this.addLine('', 'info');
        this.addLine('Project Statistics', 'info');
        this.addLine('─'.repeat(50), 'info');
        
        this.addLine('📦 Nodes', 'info');
        this.addLine(`🔸 Total Nodes: ${nodes.length}`, 'info');
        this.addLine(`🔸 Total Fields: ${totalFields}`, 'info');
        this.addLine(`🔸 Avg Fields/Node: ${nodes.length > 0 ? (totalFields / nodes.length).toFixed(1) : '0'}`, 'info');
        
        if (Object.keys(nodeTypes).length > 0) {
            this.addLine('', 'info');
            this.addLine('🔷 Node Types:', 'info');
            Object.entries(nodeTypes).slice(0, 5).forEach(([type, count]) => {
                this.addLine(`   • ${type}: ${count}`, 'info');
            });
        }
        
        this.addLine('', 'info');
        this.addLine('🔗 Transitions', 'info');
        this.addLine(`🔸 Total Transitions: ${transitions.length}`, 'info');
        
        if (Object.keys(transitionStyles).length > 0) {
            this.addLine('', 'info');
            this.addLine('🔷 Transition Styles:', 'info');
            Object.entries(transitionStyles).slice(0, 5).forEach(([style, count]) => {
                this.addLine(`   • ${style}: ${count}`, 'info');
            });
        }
        
        this.addLine('', 'info');
        this.addLine('📝 Texts', 'info');
        this.addLine(`🔸 Total Text Elements: ${texts.length}`, 'info');
        
        this.addLine('', 'success');
        this.addLine('🎯 Summary', 'success');
        this.addLine(`🔸 Total Elements: ${(nodes.length + texts.length + transitions.length)}`, 'success');
        
        this.scrollToBottom();
    }

    /**
     * Show memory usage information
     */
    showMemoryInfo() {
        this.addLine('', 'info');
        this.addLine('Memory Usage', 'info');
        this.addLine('─'.repeat(30), 'info');

        if (performance.memory) {
            const memory = performance.memory;
            const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
            const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
            const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
            
            this.addLine(`🔹 Used Memory:    ${usedMB} MB`, 'info');
            this.addLine(`🔹 Total Memory:   ${totalMB} MB`, 'info');
            this.addLine(`🔹 Memory Limit:   ${limitMB} MB`, 'info');
            this.addLine(`🔹 Usage:          ${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(1)}%`, 'info');
        } else {
            this.addLine('⚠️ Memory information not available in this browser.', 'warning');
        }
        
        // Terminal memory usage
        
        this.addLine('📊 Terminal Memory:', 'info');
        this.addLine(`🔹 History Lines:  ${this.history.length}`, 'info');
        this.addLine(`🔹 Command History: ${this.commandHistory.length}`, 'info');
        this.addLine(`🔹 Max Lines Limit: ${this.maxLines}`, 'info');
        
        this.scrollToBottom();
    }

    /**
     * Show performance metrics
     */
    showPerformanceMetrics() {
        this.addLine('', 'info');
        this.addLine('Performance Metrics', 'info');
        this.addLine('─'.repeat(30), 'info');

        // Page load performance
        if (performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            this.addLine(`🔹 Page Load Time: ${loadTime}ms`, 'info');
            this.addLine(`🔹 DOM Ready Time: ${domReady}ms`, 'info');
        }

        // Current performance
        this.addLine(`🔹 Current Time:   ${Date.now()}ms`, 'info');
        this.addLine(`🔹 Performance Now: ${performance.now().toFixed(2)}ms`, 'info');
        
        // Browser info
        
        this.addLine('🌐 Browser Info:', 'info');
        this.addLine(`🔹 User Agent: ${navigator.userAgent.substring(0, 40)}...`, 'info');
        this.addLine(`🔹 Platform: ${navigator.platform}`, 'info');
        this.addLine(`🔹 Language: ${navigator.language}`, 'info');
        this.addLine(`🔹 Cores: ${navigator.hardwareConcurrency || 'Unknown'}`, 'info');
        
        this.scrollToBottom();
    }

    /**
     * Validate project integrity
     */
    validateProject() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine('Project Validation', 'info');
        this.addLine('─'.repeat(30), 'info');

        let issues = 0;
        const warnings = [];
        const errors = [];

        // Check for duplicate IDs
        const allIds = [
            ...currentProject.nodes.map(n => n.id),
            ...currentProject.texts.map(t => t.id),
            ...currentProject.transitions.map(tr => tr.id)
        ];
        
        const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
            errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
            issues++;
        }

        // Check for orphaned transitions
        const nodeIds = currentProject.nodes.map(n => n.id);
        currentProject.transitions.forEach(trans => {
            if (trans.from && !nodeIds.includes(trans.from.id)) {
                warnings.push(`Transition ${trans.id} references non-existent source node ${trans.from.id}`);
            }
            if (trans.to && !nodeIds.includes(trans.to.id)) {
                warnings.push(`Transition ${trans.id} references non-existent target node ${trans.to.id}`);
            }
        });

        // Check for empty labels
        const emptyLabels = [
            ...currentProject.nodes.filter(n => !n.label || n.label.trim() === ''),
            ...currentProject.texts.filter(t => !t.text && !t.label)
        ];
        if (emptyLabels.length > 0) {
            warnings.push(`${emptyLabels.length} elements have empty labels`);
        }

        // Display results
        if (errors.length === 0 && warnings.length === 0) {
            this.addLine('✅ Project validation completed successfully!', 'success');
            this.addLine('🎉 No issues found. Project integrity is good.', 'success');
        } else {
            if (errors.length > 0) {
                this.addLine('❌ ERRORS FOUND:', 'error');
                errors.forEach(error => this.addLine(`   • ${error}`, 'error'));
                
            }
            
            if (warnings.length > 0) {
                this.addLine('⚠️ WARNINGS:', 'warning');
                warnings.forEach(warning => this.addLine(`   • ${warning}`, 'warning'));
            }
        }
        
        
        this.addLine(`📊 Validation Summary:`, 'info');
        this.addLine(`   • Errors: ${errors.length}`, errors.length > 0 ? 'error' : 'success');
        this.addLine(`   • Warnings: ${warnings.length}`, warnings.length > 0 ? 'warning' : 'success');
        this.addLine(`   • Total Elements Checked: ${allIds.length}`, 'info');
        
        this.scrollToBottom();
    }

    /**
     * Show system configuration
     */
    showSystemConfig() {
        this.addLine('', 'info');
        this.addLine('System Configuration', 'info');
        this.addLine('─'.repeat(30), 'info');

        // Terminal configuration
        this.addLine('🖥️ Terminal Settings:', 'info');
        this.addLine(`   • Max Lines: ${this.maxLines}`, 'info');
        this.addLine(`   • Visible: ${this.isVisible}`, 'info');
        this.addLine(`   • Current Filter: ${this.currentTypeFilter}`, 'info');
        this.addLine(`   • Text Filter: ${this.currentTextFilter || 'None'}`, 'info');
        
        // Window configuration
        
        this.addLine('🪟 Window Settings:', 'info');
        this.addLine(`   • Width: ${window.innerWidth}px`, 'info');
        this.addLine(`   • Height: ${window.innerHeight}px`, 'info');
        this.addLine(`   • Device Pixel Ratio: ${window.devicePixelRatio}`, 'info');
        this.addLine(`   • Screen: ${screen.width}x${screen.height}`, 'info');
        
        // Application state
        
        this.addLine('📱 Application State:', 'info');
        this.addLine(`   • App Available: ${window.app ? 'Yes' : 'No'}`, 'info');
        this.addLine(`   • Container Available: ${window.container ? 'Yes' : 'No'}`, 'info');
        this.addLine(`   • Local Storage: ${localStorage ? 'Available' : 'Not Available'}`, 'info');
        this.addLine(`   • Session Storage: ${sessionStorage ? 'Available' : 'Not Available'}`, 'info');
        
        this.scrollToBottom();
    }

    /**
     * Create project backup
     */
    createProjectBackup() {
        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `diavinci-backup-${timestamp}.json`;
            
            const backupData = {
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                project: currentProject,
                metadata: {
                    nodeCount: currentProject.nodes.length,
                    textCount: currentProject.texts.length,
                    transitionCount: currentProject.transitions.length,
                    backupSource: 'Terminal Command'
                }
            };
            
            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addLine('✅ Project backup created successfully!', 'success');
            this.addLine(`📄 Filename: ${filename}`, 'info');
            this.addLine(`📊 Elements backed up: ${backupData.metadata.nodeCount + backupData.metadata.textCount + backupData.metadata.transitionCount}`, 'info');
        } catch (error) {
            this.addLine(`❌ Failed to create backup: ${error.message}`, 'error');
        }
        
        this.scrollToBottom();
    }

    /**
     * Clean temporary data
     */
    cleanupTempData() {
        this.addLine('', 'info');
        this.addLine('🧹 Cleanup Operation', 'info');
        this.addLine('─'.repeat(30), 'info');

        let cleaned = 0;

        // Clean old command history
        if (this.commandHistory.length > 20) {
            const removed = this.commandHistory.length - 20;
            this.commandHistory = this.commandHistory.slice(-20);
            this.addLine(`🗑️ Cleaned ${removed} old command entries`, 'info');
            cleaned++;
        }

        // Clean old terminal history
        if (this.history.length > this.maxLines * 0.8) {
            const removed = this.history.length - Math.floor(this.maxLines * 0.8);
            this.history = this.history.slice(-Math.floor(this.maxLines * 0.8));
            this.rebuildTerminalDisplay();
            this.addLine(`🗑️ Cleaned ${removed} old log entries`, 'info');
            cleaned++;
        }

        // Clear any temporary DOM elements
        const tempElements = document.querySelectorAll('[data-temp="true"]');
        if (tempElements.length > 0) {
            tempElements.forEach(el => el.remove());
            this.addLine(`🗑️ Removed ${tempElements.length} temporary DOM elements`, 'info');
            cleaned++;
        }

        if (cleaned === 0) {
            this.addLine('✨ System is already clean. No cleanup needed.', 'success');
        } else {
            this.addLine(`✅ Cleanup completed. ${cleaned} operations performed.`, 'success');
        }
        
        this.scrollToBottom();
    }

    /**
     * Test system responsiveness
     */
    pingSystem() {
        const startTime = performance.now();
        
        this.addLine('📡 Testing system responsiveness...', 'info');
        
        // Test DOM manipulation
        const testDiv = document.createElement('div');
        testDiv.style.display = 'none';
        document.body.appendChild(testDiv);
        document.body.removeChild(testDiv);
        
        // Test project access
        let projectAccessible = false;
        try {
            const currentProject = window.app?.diagramController?.currentProject;
            projectAccessible = !!currentProject;
        } catch (e) {
            projectAccessible = false;
        }
        
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);
        
        this.addLine('', 'success');
        this.addLine('📡 Ping Results', 'success');
        this.addLine('─'.repeat(30), 'success');
        this.addLine(`🔹 Response Time: ${responseTime}ms`, 'info');
        this.addLine(`🔹 DOM Access: ${testDiv ? '✅ OK' : '❌ Failed'}`, 'info');
        this.addLine(`🔹 Project Access: ${projectAccessible ? '✅ OK' : '❌ Failed'}`, 'info');
        this.addLine(`🔹 Terminal State: ${this.isVisible ? '✅ Active' : '⚠️ Hidden'}`, 'info');
        this.addLine(`🔹 Browser: ${navigator.onLine ? '✅ Online' : '❌ Offline'}`, 'info');
        
        if (responseTime < 10) {
            this.addLine('🚀 System performance: Excellent', 'success');
        } else if (responseTime < 50) {
            this.addLine('⚡ System performance: Good', 'info');
        } else {
            this.addLine('⚠️ System performance: Slow', 'warning');
        }
        
        this.scrollToBottom();
    }

    /**
     * Show recent error logs
     */
    showRecentErrors() {
        const errorLogs = this.history.filter(log => log.type === 'error');
        
        this.addLine('', 'error');
        this.addLine('🚨 Recent Errors', 'error');
        this.addLine('─'.repeat(30), 'error');
        
        if (errorLogs.length === 0) {
            this.addLine('✅ No recent errors found. System is running smoothly!', 'success');
        } else {
            this.addLine(`📊 Found ${errorLogs.length} error(s) in terminal history:`, 'warning');
            
            
            errorLogs.slice(-10).forEach((log, index) => {
                const time = new Date(log.timestamp).toLocaleTimeString();
                this.addLine(`${(index + 1).toString().padStart(2)}. [${time}] ${log.message}`, 'error');
            });
            
            if (errorLogs.length > 10) {
                this.addLine(`... and ${errorLogs.length - 10} more errors (showing last 10)`, 'error');
            }
        }
        
        this.scrollToBottom();
    }

    /**
     * Trace element relationships
     */
    traceElementRelationships(id) {
        if (!id) {
            this.addLine('❌ Please provide an element ID. Usage: trace <id>', 'error');
            return;
        }

        let currentProject = window.app?.diagramController?.currentProject;
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        // Find the target element
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        const targetElement = allElements.find(el => 
            el.id === id || el.id === parseInt(id) || el.id.toString() === id
        );

        if (!targetElement) {
            this.addLine(`❌ Element with ID "${id}" not found.`, 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine(`🔍 Tracing Element ${id}`, 'info');
        this.addLine('─'.repeat(30), 'info');

        // Show element info
        this.addLine(`🎯 Target: ${targetElement.elementType} "${targetElement.label || 'Unnamed'}"`, 'success');
        

        // Find incoming transitions (if target is a node)
        if (targetElement.elementType === 'Node') {
            const incomingTransitions = currentProject.transitions.filter(t => 
                t.to && (t.to.id === targetElement.id || t.to.id === parseInt(targetElement.id))
            );
            
            this.addLine(`📥 Incoming Transitions (${incomingTransitions.length}):`, 'info');
            if (incomingTransitions.length === 0) {
                this.addLine('   No incoming transitions found.', 'warning');
            } else {
                incomingTransitions.forEach((trans, index) => {
                    const fromLabel = trans.from?.label || trans.from?.id || 'Unknown';
                    this.addLine(`   ${index + 1}. From: "${fromLabel}" (ID: ${trans.from?.id})`, 'info');
                });
            }

            // Find outgoing transitions
            const outgoingTransitions = currentProject.transitions.filter(t => 
                t.from && (t.from.id === targetElement.id || t.from.id === parseInt(targetElement.id))
            );
            
            
            this.addLine(`📤 Outgoing Transitions (${outgoingTransitions.length}):`, 'info');
            if (outgoingTransitions.length === 0) {
                this.addLine('   No outgoing transitions found.', 'warning');
            } else {
                outgoingTransitions.forEach((trans, index) => {
                    const toLabel = trans.to?.label || trans.to?.id || 'Unknown';
                    this.addLine(`   ${index + 1}. To: "${toLabel}" (ID: ${trans.to?.id})`, 'info');
                });
            }
        }

        // If target is a transition, show source and target
        if (targetElement.elementType === 'Transition') {
            this.addLine('🔗 Transition Details:', 'info');
            this.addLine(`   📤 From: "${targetElement.from?.label || 'Unknown'}" (ID: ${targetElement.from?.id})`, 'info');
            this.addLine(`   📥 To: "${targetElement.to?.label || 'Unknown'}" (ID: ${targetElement.to?.id})`, 'info');
            if (targetElement.condition) {
                this.addLine(`   ⚡ Condition: ${targetElement.condition}`, 'info');
            }
        }

        this.scrollToBottom();
    }

    /**
     * Filter logs by type
     */
    filterLogsByType(type) {
        if (!type) {
            this.addLine('❌ Please specify a log type. Available: info, warning, error, debug, success', 'error');
            return;
        }

        const validTypes = ['info', 'warning', 'error', 'debug', 'success', 'function', 'all'];
        if (!validTypes.includes(type.toLowerCase())) {
            this.addLine(`❌ Invalid log type "${type}". Valid types: ${validTypes.join(', ')}`, 'error');
            return;
        }

        // Update filter
        this.currentTypeFilter = type.toLowerCase();
        if (this.filterTypeSelect) {
            this.filterTypeSelect.value = this.currentTypeFilter;
        }

        // Apply filter
        this.applyFilters();
        
        this.addLine(`✅ Logs filtered by type: "${type}"`, 'success');
        this.addLine(`📊 Showing ${this.filteredHistory.length} of ${this.history.length} total logs`, 'info');
        
        this.scrollToBottom();
    }

    /**
     * List all data model nodes in the project
     */
    listDataModels() {
        console.log('listDataModels() called - starting execution');
        
        let currentProject = window.app?.diagramController?.currentProject;
        
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        // Debug: Show all node types
        console.log('listDataModels() - All nodes:', currentProject.nodes);
        console.log('listDataModels() - Node types found:', currentProject.nodes.map(n => ({ id: n.id, type: n.type, label: n.label })));
        
        // Try multiple possible type names for DataModel
        const dataModels = currentProject.nodes.filter(node => 
            node.type === 'DataModel' || 
            node.type === 'datamodel' || 
            node.type === 'data-model' ||
            node.type === 'Data Model' ||
            (node.label && node.label.toLowerCase().includes('data')) ||
            (node.category && node.category.toLowerCase().includes('data'))
        );
        
        console.log('listDataModels() - Filtered dataModels:', dataModels);

        
        this.addLine('📋 Data Model Nodes', 'info');
        this.addLine('─'.repeat(50), 'info');
        this.addLine(`🔸 Project: ${currentProject.name || 'Untitled'}`, 'info');
        this.addLine(`🔸 Total Data Models: ${dataModels.length}`, 'info');
        
        if (dataModels.length === 0) {
            
            this.addLine('📭 No data models found in this project', 'warning');
        } else {
            
            
            dataModels.forEach((model, index) => {
                const label = model.label || 'Unnamed Data Model';
                const fieldsCount = model.fields ? model.fields.length : 0;
                
                this.addLine(`${index + 1}. Data Model:`, 'info');
                this.addLine(`   • ID: ${model.id}`, 'info');
                this.addLine(`   • Label: ${label}`, 'info');
                this.addLine(`   • Fields: ${fieldsCount} total`, 'info');
                
                if (model.x !== undefined && model.y !== undefined) {
                    this.addLine(`   • Position: (${Math.round(model.x)}, ${Math.round(model.y)})`, 'info');
                }
                
                if (model.color) {
                    this.addLine(`   • Color: ${model.color}`, 'info');
                }
                
                // Show first few field names as preview
                if (fieldsCount > 0) {
                    const fieldNames = model.fields.slice(0, 3).map(f => f.name);
                    this.addLine(`   • Fields preview: ${fieldNames.join(', ')}`, 'success');
                    
                    if (fieldsCount > 3) {
                        this.addLine(`     └ ${t('andMoreFields')} ${fieldsCount - 3} ${t('moreFields')}`, 'success');
                    }
                }
                
                if (index < dataModels.length - 1) {
                     // Space between models
                }
            });
        }
        
        
        this.addLine('💡 Quick Actions:', 'info');
        this.addLine('   • "fields <id>" - List all fields of a data model', 'info');
        this.addLine('   • "field <id> <name>" - Get specific field value', 'info');
        this.addLine('   • "inspect <id>" - View complete data model details', 'info');
        
        this.scrollToBottom();
    }

    /**
     * List all fields of a specific data model
     */
    listDataModelFields(id) {
        if (!id) {
            this.addLine('❌ Please provide a data model ID. Usage: fields <data-model-id>', 'error');
            return;
        }

        let currentProject = window.app?.diagramController?.currentProject;
        
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        // Find the data model by ID - try multiple type variants (listDataModelFields)
        const dataModel = currentProject.nodes.find(node => 
            (node.type === 'DataModel' || 
             node.type === 'datamodel' || 
             node.type === 'data-model' ||
             node.type === 'Data Model' ||
             (node.label && node.label.toLowerCase().includes('data')) ||
             (node.category && node.category.toLowerCase().includes('data'))) &&
            (node.id === id || 
             node.id === parseInt(id) || 
             node.id.toString() === id)
        );
        
        console.log('listDataModelFields() - Searching for ID:', id);
        console.log('listDataModelFields() - Found dataModel:', dataModel);

        if (!dataModel) {
            
            this.addLine('❌ Data Model Not Found', 'error');
            this.addLine('─'.repeat(50), 'error');
            this.addLine(`🔍 Searched ID: "${id}"`, 'error');
            
            // Suggest available data models - use same filter as main search
            const dataModels = currentProject.nodes.filter(node => 
                node.type === 'DataModel' || 
                node.type === 'datamodel' || 
                node.type === 'data-model' ||
                node.type === 'Data Model' ||
                (node.label && node.label.toLowerCase().includes('data')) ||
                (node.category && node.category.toLowerCase().includes('data'))
            );
            if (dataModels.length > 0) {
                
                this.addLine('📋 Available Data Models:', 'info');
                dataModels.slice(0, 5).forEach((model, index) => {
                    this.addLine(`   ${index + 1}. ID: ${model.id} | "${model.label || 'Unnamed'}"`, 'info');
                });
            } else {
                
                this.addLine('⚠️ No data models found in project. Use "models" to see all data models.', 'warning');
            }
            return;
        }

        const fields = dataModel.fields || [];
        const modelLabel = dataModel.label || 'Unnamed Data Model';

        
        this.addLine('📋 Data Model Fields', 'info');
        this.addLine('─'.repeat(50), 'info');
        this.addLine(`🔸 Model ID: ${dataModel.id}`, 'info');
        this.addLine(`🔸 Model Label: ${modelLabel}`, 'info');
        this.addLine(`🔸 Total Fields: ${fields.length}`, 'info');

        if (fields.length === 0) {
            
            this.addLine('📭 No fields found in this data model', 'warning');
        } else {
            
            
            fields.forEach((field, index) => {
                const name = field.name || 'Unnamed Field';
                const type = field.type || 'Unknown';
                const required = field.required ? 'Yes' : 'No';
                const nullable = field.nullable ? 'Yes' : 'No';
                const readOnly = field.readOnly ? 'Yes' : 'No';
                
                this.addLine(`${index + 1}. Field: ${name}`, 'info');
                this.addLine(`   • Type: ${type}`, 'info');
                this.addLine(`   • Required: ${required}`, 'info');
                this.addLine(`   • Nullable: ${nullable}`, 'info');
                this.addLine(`   • Read Only: ${readOnly}`, 'info');
                
                // Show field value if it exists
                if (field.value !== undefined && field.value !== null && field.value !== '') {
                    const value = field.value.toString();
                    this.addLine(`🔸 Value: ${value}`, 'success');
                }
                
                
                // Show additional properties
                if (field.description) {
                    this.addLine(`   • Description: ${field.description}`, 'debug');
                }
                
                if (field.format) {
                    this.addLine(`   • Format: ${field.format}`, 'debug');
                }
                
                if (index < fields.length - 1) {
                     // Space between fields
                }
            });
        }
        
        
        this.addLine('💡 Quick Actions:', 'info');
        this.addLine('   • "field <id> <name>" - Get specific field value', 'info');
        this.addLine('   • "inspect <id>" - View complete data model details', 'info');
        this.addLine('   • "models" - List all data models', 'info');
        
        this.scrollToBottom();
    }

    /**
     * Get the value of a specific field from a data model
     */
    getDataModelFieldValue(id, fieldName) {
        if (!id || !fieldName) {
            this.addLine('❌ Please provide both data model ID and field name. Usage: field <data-model-id> <field-name>', 'error');
            return;
        }

        let currentProject = window.app?.diagramController?.currentProject;
        
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        // Find the data model by ID - try multiple type variants (getDataModelFieldValue)
        const dataModel = currentProject.nodes.find(node => 
            (node.type === 'DataModel' || 
             node.type === 'datamodel' || 
             node.type === 'data-model' ||
             node.type === 'Data Model' ||
             (node.label && node.label.toLowerCase().includes('data')) ||
             (node.category && node.category.toLowerCase().includes('data'))) &&
            (node.id === id || 
             node.id === parseInt(id) || 
             node.id.toString() === id)
        );
        
        console.log('getDataModelFieldValue() - Searching for ID:', id, 'fieldName:', fieldName);
        console.log('getDataModelFieldValue() - Found dataModel:', dataModel);

        if (!dataModel) {
            
            this.addLine('❌ Data Model Not Found', 'error');
            this.addLine('─'.repeat(50), 'error');
            this.addLine(`🔍 Searched ID: "${id}"`, 'error');
            return;
        }

        const fields = dataModel.fields || [];
        
        console.log('getDataModelFieldValue() - fields array:', fields);
        console.log('getDataModelFieldValue() - looking for field name:', fieldName);
        
        // Debug: Show all field names and their properties
        fields.forEach((f, index) => {
            console.log(`Field ${index}:`, {
                name: f.name,
                type: f.type,
                value: f.value,
                hasValue: f.value !== undefined,
                valueType: typeof f.value,
                allProperties: Object.keys(f)
            });
        });
        
        // Find the field by name (case-insensitive)
        const field = fields.find(f => 
            f.name && f.name.toLowerCase() === fieldName.toLowerCase()
        );
        
        console.log('getDataModelFieldValue() - found field:', field);

        if (!field) {
            
            this.addLine('❌ Field Not Found', 'error');
            this.addLine('─'.repeat(50), 'error');
            this.addLine(`🔍 Data Model: "${dataModel.label || 'Unnamed'}"`, 'error');
            this.addLine(`🔍 Field Name: "${fieldName}"`, 'error');
            
            // Suggest similar field names
            const similarFields = fields.filter(f => 
                f.name && (
                    f.name.toLowerCase().includes(fieldName.toLowerCase()) ||
                    fieldName.toLowerCase().includes(f.name.toLowerCase())
                )
            );
            
            if (similarFields.length > 0) {
                
                this.addLine('🔍 Similar field names:', 'warning');
                similarFields.forEach((f, index) => {
                    this.addLine(`   ${index + 1}. "${f.name}" (${f.type})`, 'warning');
                });
            } else if (fields.length > 0) {
                
                this.addLine('📋 Available fields:', 'info');
                fields.slice(0, 5).forEach((f, index) => {
                    this.addLine(`   ${index + 1}. "${f.name}" (${f.type})`, 'info');
                });
                
                if (fields.length > 5) {
                    this.addLine(`   ${t('andMoreFields')} ${fields.length - 5} ${t('moreFields')}`, 'info');
                }
            }
            return;
        }

        // Display field information and value
        const modelLabel = dataModel.label || 'Unnamed Data Model';
        
        // Check for value in multiple possible properties
        let fieldValue = field.value;
        let valueSource = 'value';
        
        if (fieldValue === undefined || fieldValue === null) {
            // Try other possible value properties
            if (field.defaultValue !== undefined && field.defaultValue !== null) {
                fieldValue = field.defaultValue;
                valueSource = 'defaultValue';
            } else if (field.initialValue !== undefined && field.initialValue !== null) {
                fieldValue = field.initialValue;
                valueSource = 'initialValue';
            } else if (field.currentValue !== undefined && field.currentValue !== null) {
                fieldValue = field.currentValue;
                valueSource = 'currentValue';
            } else if (field.data !== undefined && field.data !== null) {
                fieldValue = field.data;
                valueSource = 'data';
            }
        }
        
        const hasValue = fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
        
        console.log('getDataModelFieldValue() - Final value check:', {
            fieldValue,
            valueSource,
            hasValue,
            fieldAllProperties: field
        });
        
        
        this.addLine('💎 Field Value Found', 'success');
        this.addLine('─'.repeat(50), 'success');
        this.addLine(`🔸 Data Model: ${modelLabel}`, 'info');
        this.addLine(`🔸 Model ID: ${dataModel.id}`, 'info');
        this.addLine(`🔸 Field Name: ${field.name}`, 'info');
        this.addLine(`🔸 Field Type: ${field.type}`, 'info');
        
        if (valueSource !== 'value') {
            this.addLine(`🔸 Value Source: ${valueSource}`, 'info');
        }
        
        if (hasValue) {
            
            this.addLine('📄 Field Value:', 'success');
            
            const value = fieldValue; // Use our found value instead of field.value
            const valueType = typeof value;
            
            // Handle different value types
            if (valueType === 'object') {
                // JSON object or array
                try {
                    const jsonStr = JSON.stringify(value, null, 2);
                    const jsonLines = jsonStr.split('\n');
                    
                    jsonLines.forEach(line => {
                        this.addLine(`   ${line}`, 'success');
                    });
                } catch (e) {
                    this.addLine(`   [Object] ${value.toString()}`, 'success');
                }
            } else {
                // Primitive values
                this.addLine(`   ${value}`, 'success');
            }
            
            
            this.addLine(`🔸 Value Type: ${valueType}`, 'info');
            
            if (field.format) {
                this.addLine(`🔸 Format: ${field.format}`, 'info');
            }
        } else {
            
            this.addLine('⚠️ No Value Set', 'warning');
            
            this.addLine('Checked properties: value, defaultValue, initialValue, currentValue, data', 'warning');
            
            // Debug: Show all field properties for debugging
            
            this.addLine('🔧 Debug - All field properties:', 'debug');
            Object.keys(field).forEach(key => {
                const value = field[key];
                const valueStr = value === null ? 'null' : 
                               value === undefined ? 'undefined' :
                               typeof value === 'object' ? '[object]' : 
                               String(value);
                this.addLine(`   ${key}: ${valueStr}`, 'debug');
            });
            
            if (field.required) {
                this.addLine('⚠️ WARNING: This is a required field', 'warning');
            }
            
            if (field.nullable) {
                this.addLine('✅ Field accepts null values', 'info');
            }
        }
        
        // Show field properties
        
        this.addLine('🔧 Field Properties:', 'info');
        this.addLine(`🔸 Required: ${field.required ? 'Yes' : 'No'}`, 'info');
        this.addLine(`🔸 Nullable: ${field.nullable ? 'Yes' : 'No'}`, 'info');
        this.addLine(`🔸 Read Only: ${field.readOnly ? 'Yes' : 'No'}`, 'info');
        
        if (field.description) {
            
            this.addLine('📝 Description:', 'info');
            this.addLine(`   ${field.description}`, 'debug');
        }
        
        
        this.addLine('💡 Quick Actions:', 'info');
        this.addLine(`   • "fields ${dataModel.id}" - List all fields of this model`, 'info');
        this.addLine(`   • "inspect ${dataModel.id}" - View complete model details`, 'info');
        this.addLine('   • "models" - List all data models', 'info');
        
        this.scrollToBottom();
    }

    /**
     * Debug all project nodes and their types
     */
    debugProjectNodes() {
        let currentProject = window.app?.diagramController?.currentProject;
        
        if (!currentProject && window.container) {
            try {
                const diagramController = window.container.resolve('diagramController');
                currentProject = diagramController?.currentProject;
            } catch (e) {
                this.addLine(`🔧 Container resolution error: ${e.message}`, 'debug');
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found.', 'error');
            return;
        }

        this.addLine('', 'info');
        this.addLine('🔧 Debug Project Nodes', 'info');
        this.addLine('─'.repeat(30), 'info');
        this.addLine(`🔸 Total Nodes: ${currentProject.nodes.length}`, 'info');

        if (currentProject.nodes.length === 0) {
            this.addLine('No nodes found in project.', 'warning');
            return;
        }

        currentProject.nodes.forEach((node, index) => {
            this.addLine('', 'debug');
            this.addLine(`Node ${index + 1}`, 'debug');
            this.addLine('─'.repeat(15), 'debug');
            this.addLine(`🔸 ID: ${node.id}`, 'debug');
            this.addLine(`🔸 Type: ${node.type || 'undefined'}`, 'debug');
            this.addLine(`🔸 Label: ${node.label || 'N/A'}`, 'debug');
            
            if (node.category) {
                this.addLine(`🔸 Category: ${node.category}`, 'debug');
            }
            
            if (node.fields && node.fields.length > 0) {
                this.addLine(`🔸 Fields Count: ${node.fields.length}`, 'debug');
            }
            
            // Show all properties
            this.addLine('🔷 All Properties:', 'debug');
            Object.keys(node).forEach(key => {
                const value = node[key];
                const valueStr = (typeof value === 'object' && value !== null) 
                    ? `[${Object.keys(value).join(', ')}]` 
                    : String(value);
                const truncated = valueStr.length > 30 ? valueStr.substring(0, 27) + '...' : valueStr;
                this.addLine(`   • ${key}: ${truncated}`, 'debug');
            });
        });

        this.scrollToBottom();
    }
}

// Make TerminalService available globally
window.TerminalService = TerminalService;
