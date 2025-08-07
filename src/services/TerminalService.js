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
            console.warn('Terminal elements not found in DOM');
            return;
        }

        // Initial welcome message
        this.addLine('Terminal Service initialized successfully.', 'info');
        this.addLine('Canvas drop tracking enabled - all drag & drop operations will be logged here.', 'info');
        this.addLine('Type "help" for available commands.', 'info');
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
            this.addLine('No logs to export', 'warning');
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
            
            this.addLine(`Logs exported to ${filename} (${logsToExport.length} entries)`, 'success');
        } catch (error) {
            this.addLine(`Failed to export logs: ${error.message}`, 'error');
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
            console.warn('ScrollToBottom: Terminal content element not found');
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
        this.addLine(`Function "${functionName}" failed: ${error.message}`, 'error');
        
        if (error.stack) {
            // Show stack trace for debugging
            this.addLine(`Stack trace: ${error.stack}`, 'debug');
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
        
        switch (cmd) {
            case 'help':
                this.addLine('╔══════════════════════════════════════════════════╗', 'info');
                this.addLine('║                 DIAVINCI TERMINAL                ║', 'info');
                this.addLine('║                Available Commands                ║', 'info');
                this.addLine('╠══════════════════════════════════════════════════╣', 'info');
                this.addLine('║ help          - Show this help message          ║', 'info');
                this.addLine('║ clear         - Clear terminal output           ║', 'info');
                this.addLine('║ status        - Show system status              ║', 'info');
                this.addLine('║ export        - Export logs to file             ║', 'info');
                this.addLine('║ version       - Show application version        ║', 'info');
                this.addLine('║ debug on/off  - Toggle debug logging            ║', 'info');
                this.addLine('║ history       - Show command history            ║', 'info');
                this.addLine('║ time          - Show current time               ║', 'info');
                this.addLine('║ reset         - Reset application state         ║', 'info');
                this.addLine('║ find <id>     - Find element by ID              ║', 'info');
                this.addLine('║ list elements - List all elements with IDs      ║', 'info');
                this.addLine('║ inspect <id>  - Show detailed element info      ║', 'info');
                this.addLine('║ debug project - Show project debug info         ║', 'info');
                this.addLine('╚══════════════════════════════════════════════════╝', 'info');
                break;
            case 'clear':
                this.clear();
                this.addLine('Terminal cleared by user command.', 'info');
                break;
            case 'status':
                this.addLine('═══ SYSTEM STATUS ═══', 'info');
                this.addLine(`🔹 Terminal lines: ${this.history.length}`, 'info');
                this.addLine(`🔹 Active filter: ${this.currentTypeFilter}`, 'info');
                this.addLine(`🔹 Terminal visible: ${this.isVisible ? 'Yes' : 'No'}`, 'info');
                this.addLine(`🔹 Max lines: ${this.maxLines}`, 'info');
                this.addLine(`🔹 Browser: ${navigator.userAgent.split(' ')[0]}`, 'info');
                break;
            case 'version':
                this.addLine('╔══════════════════════════════════════════════════╗', 'info');
                this.addLine('║                   DIAVINCI                      ║', 'info');
                this.addLine('║              Data Flow Designer                 ║', 'info');
                this.addLine('║                 Version 1.0.0                   ║', 'info');
                this.addLine('║         © 2025 DiAVinci Development             ║', 'info');
                this.addLine('╚══════════════════════════════════════════════════╝', 'info');
                break;
            case 'time':
                const now = new Date();
                this.addLine(`🕐 Current time: ${now.toLocaleString()}`, 'info');
                break;
            case 'history':
                if (this.commandHistory && this.commandHistory.length > 0) {
                    this.addLine('═══ COMMAND HISTORY ═══', 'info');
                    this.commandHistory.slice(-10).forEach((cmd, index) => {
                        this.addLine(`${index + 1}. ${cmd}`, 'info');
                    });
                } else {
                    this.addLine('No command history available.', 'warning');
                }
                break;
            case 'export':
                this.exportLogs();
                this.addLine('📄 Logs exported successfully to download folder.', 'success');
                break;
            case 'reset':
                this.addLine('⚠️  Are you sure you want to reset? Type "reset confirm" to proceed.', 'warning');
                break;
            case 'reset confirm':
                this.clear();
                this.addLine('🔄 Application state reset completed.', 'success');
                this.addLine('Welcome back to DiAVinci Terminal!', 'info');
                break;
            case 'debug on':
                this.addLine('🐛 Debug mode enabled - verbose logging activated.', 'success');
                break;
            case 'debug off':
                this.addLine('🔇 Debug mode disabled - normal logging restored.', 'info');
                break;
            default:
                // Check for commands with parameters
                if (cmd.startsWith('find ')) {
                    const id = command.substring(5).trim();
                    this.findElementById(id);
                } else if (cmd.startsWith('inspect ')) {
                    const id = command.substring(8).trim();
                    this.inspectElementById(id);
                } else if (cmd === 'list elements') {
                    this.listAllElements();
                } else if (cmd === 'debug project') {
                    this.debugProject();
                } else {
                    this.addLine(`❌ Unknown command: "${command}"`, 'error');
                    this.addLine('💡 Type "help" to see all available commands.', 'info');
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

    /**
     * Find element by ID
     */
    findElementById(id) {
        if (!id) {
            this.addLine('❌ Please provide an element ID. Usage: find <id>', 'error');
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
                // Ignore container resolution errors
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found. Please ensure the application is fully loaded.', 'error');
            return;
        }

        // Debug: Show project contents
        this.addLine(`🔍 Searching in project with ${currentProject.nodes.length} nodes, ${currentProject.texts.length} texts, ${currentProject.transitions.length} transitions`, 'debug');

        // Search in all element types
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        // Debug: Show all IDs
        this.addLine(`🔍 Available IDs: ${allElements.map(el => el.id).join(', ')}`, 'debug');
        this.addLine(`🔍 Looking for ID: "${id}"`, 'debug');

        const found = allElements.find(el => el.id === id);
        
        if (found) {
            this.addLine('✅ Element found!', 'success');
            this.addLine(`🔹 Type: ${found.elementType}`, 'info');
            this.addLine(`🔹 ID: ${found.id}`, 'info');
            this.addLine(`🔹 Label: ${found.label}`, 'info');
            
            if (found.x !== undefined && found.y !== undefined) {
                this.addLine(`🔹 Position: (${Math.round(found.x)}, ${Math.round(found.y)})`, 'info');
            }
            
            if (found.color) {
                this.addLine(`🔹 Color: ${found.color}`, 'info');
            }
        } else {
            this.addLine(`❌ Element with ID "${id}" not found.`, 'error');
            this.addLine('💡 Use "list elements" to see all available elements.', 'info');
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
                // Ignore container resolution errors
            }
        }
        
        if (!currentProject) {
            this.addLine('❌ No active project found. Please ensure the application is fully loaded.', 'error');
            return;
        }

        // Search in all element types
        const allElements = [
            ...currentProject.nodes.map(n => ({...n, elementType: 'Node'})),
            ...currentProject.texts.map(t => ({...t, elementType: 'Text'})),
            ...currentProject.transitions.map(tr => ({...tr, elementType: 'Transition'}))
        ];

        const found = allElements.find(el => el.id === id);
        
        if (found) {
            this.addLine('╔══════════════════════════════════════════════════╗', 'info');
            this.addLine('║                ELEMENT INSPECTION               ║', 'info');
            this.addLine('╠══════════════════════════════════════════════════╣', 'info');
            this.addLine(`║ Type: ${found.elementType.padEnd(42)} ║`, 'info');
            this.addLine(`║ ID: ${found.id.padEnd(44)} ║`, 'info');
            this.addLine(`║ Label: ${found.label.padEnd(41)} ║`, 'info');
            
            if (found.x !== undefined && found.y !== undefined) {
                const pos = `(${Math.round(found.x)}, ${Math.round(found.y)})`;
                this.addLine(`║ Position: ${pos.padEnd(38)} ║`, 'info');
            }
            
            if (found.color) {
                this.addLine(`║ Color: ${found.color.padEnd(41)} ║`, 'info');
            }
            
            if (found.type) {
                this.addLine(`║ Node Type: ${found.type.padEnd(37)} ║`, 'info');
            }
            
            if (found.elementType === 'Transition') {
                this.addLine(`║ From: ${found.from?.id?.padEnd(42) || 'N/A'} ║`, 'info');
                this.addLine(`║ To: ${found.to?.id?.padEnd(44) || 'N/A'} ║`, 'info');
                this.addLine(`║ Style: ${found.style?.padEnd(41) || 'N/A'} ║`, 'info');
            }
            
            if (found.fields && found.fields.length > 0) {
                this.addLine(`║ Fields: ${found.fields.length.toString().padEnd(40)} ║`, 'info');
                this.addLine('╠══════════════════════════════════════════════════╣', 'info');
                found.fields.forEach((field, index) => {
                    const fieldInfo = `${index + 1}. ${field.name} (${field.type})`;
                    this.addLine(`║ ${fieldInfo.padEnd(47)} ║`, 'info');
                });
            }
            
            this.addLine('╚══════════════════════════════════════════════════╝', 'info');
        } else {
            this.addLine(`❌ Element with ID "${id}" not found.`, 'error');
            this.addLine('💡 Use "list elements" to see all available elements.', 'info');
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

        this.addLine('╔══════════════════════════════════════════════════╗', 'info');
        this.addLine('║                 ALL ELEMENTS                     ║', 'info');
        this.addLine('╚══════════════════════════════════════════════════╝', 'info');
        
        let totalCount = 0;
        
        // List nodes
        if (currentProject.nodes.length > 0) {
            this.addLine('🔷 NODES:', 'info');
            currentProject.nodes.forEach((node, index) => {
                const nodeInfo = `${index + 1}. ${node.label} (${node.type}) - ID: ${node.id}`;
                this.addLine(`   ${nodeInfo}`, 'info');
                totalCount++;
            });
            this.addLine('', 'info');
        }
        
        // List text elements
        if (currentProject.texts.length > 0) {
            this.addLine('📝 TEXT ELEMENTS:', 'info');
            currentProject.texts.forEach((text, index) => {
                const textInfo = `${index + 1}. "${text.label}" - ID: ${text.id}`;
                this.addLine(`   ${textInfo}`, 'info');
                totalCount++;
            });
            this.addLine('', 'info');
        }
        
        // List transitions
        if (currentProject.transitions.length > 0) {
            this.addLine('🔗 TRANSITIONS:', 'info');
            currentProject.transitions.forEach((transition, index) => {
                const transInfo = `${index + 1}. ${transition.label} (${transition.from?.label || 'Unknown'} → ${transition.to?.label || 'Unknown'}) - ID: ${transition.id}`;
                this.addLine(`   ${transInfo}`, 'info');
                totalCount++;
            });
            this.addLine('', 'info');
        }
        
        if (totalCount === 0) {
            this.addLine('📭 No elements found in current project.', 'warning');
        } else {
            this.addLine(`📊 Total elements: ${totalCount}`, 'success');
        }
        
        this.addLine('💡 Use "find <id>" or "inspect <id>" for detailed information.', 'info');
        
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
            this.addLine('', 'info');
            this.addLine('🔷 NODES DETAILS:', 'info');
            currentProject.nodes.forEach((node, index) => {
                this.addLine(`   ${index + 1}. Type: ${node.type || 'node'}, Label: "${node.label}", ID: ${node.id}`, 'info');
            });
        }
        
        if (currentProject.texts.length > 0) {
            this.addLine('', 'info');
            this.addLine('📝 TEXTS DETAILS:', 'info');
            currentProject.texts.forEach((text, index) => {
                this.addLine(`   ${index + 1}. Label: "${text.label}", ID: ${text.id}`, 'info');
            });
        }
        
        if (currentProject.transitions.length > 0) {
            this.addLine('', 'info');
            this.addLine('🔗 TRANSITIONS DETAILS:', 'info');
            currentProject.transitions.forEach((transition, index) => {
                this.addLine(`   ${index + 1}. Label: "${transition.label}", ID: ${transition.id}`, 'info');
            });
        }
        
        this.addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
        
        this.scrollToBottom();
    }
}

// Make TerminalService available globally
window.TerminalService = TerminalService;
