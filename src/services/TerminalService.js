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
        
        if (!this.terminalPanel || !this.terminalOutput) {
            console.warn('Terminal elements not found in DOM');
            return;
        }

        // Initial welcome message
        this.addLine('Terminal Service initialized successfully.', 'info');
        this.addLine('Canvas drop tracking enabled - all drag & drop operations will be logged here.', 'info');
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

        // Handle resize events for terminal adjustment
        window.addEventListener('resize', () => {
            if (this.isVisible) {
                this.adjustTerminalHeight();
            }
        });
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

        this.isVisible = true;
        this.terminalPanel.classList.remove('hidden');
        this.toggleButton?.classList.add('active');
        
        // Add class to main content for padding adjustment
        const mainContent = document.querySelector('.main-content') || document.body;
        mainContent.classList.add('terminal-open');

        // Auto-scroll to bottom
        this.scrollToBottom();
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
        }
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
        
        const terminalContent = this.terminalOutput.parentElement;
        if (terminalContent) {
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    }

    /**
     * Adjust terminal height based on window size
     */
    adjustTerminalHeight() {
        if (!this.terminalPanel || !this.isVisible) return;

        const vh = window.innerHeight;
        const minHeight = Math.max(150, vh * 0.15); // Minimum 150px or 15vh
        const maxHeight = Math.min(400, vh * 0.4);  // Maximum 400px or 40vh
        
        this.terminalPanel.style.minHeight = `${minHeight}px`;
        this.terminalPanel.style.maxHeight = `${maxHeight}px`;
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
}

// Make TerminalService available globally
window.TerminalService = TerminalService;
