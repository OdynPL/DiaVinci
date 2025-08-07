/**
 * Enhanced logging service for better error tracking and debugging
 */
class Logger {
    static logLevel = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };

    static currentLevel = Logger.logLevel.DEBUG;
    static terminalService = null;

    /**
     * Set terminal service for log forwarding
     */
    static setTerminalService(terminalService) {
        Logger.terminalService = terminalService;
    }

    /**
     * Set logging level
     */
    static setLevel(level) {
        Logger.currentLevel = level;
    }

    /**
     * Log error with context
     */
    static error(message, error = null, context = {}) {
        if (Logger.currentLevel >= Logger.logLevel.ERROR) {
            const logData = {
                error: error ? {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                } : null,
                context,
                timestamp: new Date().toISOString()
            };
            
            console.error(`[DiaVinci ERROR] ${message}`, logData);
            
            // Forward to terminal
            if (Logger.terminalService) {
                Logger.terminalService.addLine(`ERROR: ${message}`, 'error');
                if (error) {
                    Logger.terminalService.addLine(`  └─ ${error.message}`, 'error');
                }
            }
        }
    }

    /**
     * Log warning
     */
    static warn(message, context = {}) {
        if (Logger.currentLevel >= Logger.logLevel.WARN) {
            console.warn(`[DiaVinci WARN] ${message}`, {
                context,
                timestamp: new Date().toISOString()
            });
            
            // Forward to terminal
            if (Logger.terminalService) {
                Logger.terminalService.addLine(`WARNING: ${message}`, 'warning');
            }
        }
    }

    /**
     * Log info
     */
    static info(message, context = {}) {
        if (Logger.currentLevel >= Logger.logLevel.INFO) {
            console.info(`[DiaVinci INFO] ${message}`, {
                context,
                timestamp: new Date().toISOString()
            });
            
            // Forward to terminal
            if (Logger.terminalService) {
                Logger.terminalService.addLine(`INFO: ${message}`, 'info');
            }
        }
    }

    /**
     * Log debug
     */
    static debug(message, context = {}) {
        if (Logger.currentLevel >= Logger.logLevel.DEBUG) {
            console.debug(`[DiaVinci DEBUG] ${message}`, {
                context,
                timestamp: new Date().toISOString()
            });
            
            // Forward to terminal
            if (Logger.terminalService) {
                Logger.terminalService.addLine(`DEBUG: ${message}`, 'debug');
            }
        }
    }

    /**
     * Log canvas element drop with position
     */
    static canvasDrop(elementType, position, elementData = {}) {
        const message = `Dropped ${elementType} at position (X: ${position.x}, Y: ${position.y})`;
        Logger.info(message, { elementType, position, elementData });
        
        // Special canvas drop logging to terminal
        if (Logger.terminalService) {
            Logger.terminalService.addLine(`🎯 CANVAS DROP: ${elementType} → (X: ${position.x}, Y: ${position.y})`, 'canvas-drop');
        }
    }

    /**
     * Log text control creation
     */
    static textControl(action, textElement, position) {
        const message = `Text control ${action}: "${textElement.label}" at (X: ${position.x}, Y: ${position.y})`;
        Logger.info(message, { action, textElement: textElement.label, position });
        
        if (Logger.terminalService) {
            Logger.terminalService.addLine(`📝 TEXT CONTROL: ${action.toUpperCase()} "${textElement.label}" → (X: ${position.x}, Y: ${position.y})`, 'text-control');
        }
    }

    /**
     * Log element movement from one position to another
     */
    static elementMove(elementType, elementLabel, fromPosition, toPosition) {
        const message = `Moved ${elementType} "${elementLabel}" from (X: ${fromPosition.x}, Y: ${fromPosition.y}) to (X: ${toPosition.x}, Y: ${toPosition.y})`;
        Logger.info(message, { elementType, elementLabel, fromPosition, toPosition });
        
        if (Logger.terminalService) {
            Logger.terminalService.addLine(`🔄 ELEMENT MOVE: ${elementType.toUpperCase()} "${elementLabel}" → From (X: ${fromPosition.x}, Y: ${fromPosition.y}) to (X: ${toPosition.x}, Y: ${toPosition.y})`, 'element-move');
        }
    }

    /**
     * Log element modification (label change, property change, etc.)
     */
    static elementModify(elementType, elementLabel, modification, oldValue, newValue) {
        const message = `Modified ${elementType} "${elementLabel}": ${modification} changed from "${oldValue}" to "${newValue}"`;
        Logger.info(message, { elementType, elementLabel, modification, oldValue, newValue });
        
        if (Logger.terminalService) {
            Logger.terminalService.addLine(`✏️ ELEMENT MODIFY: ${elementType.toUpperCase()} "${elementLabel}" → ${modification}: "${oldValue}" → "${newValue}"`, 'element-modify');
        }
    }

    /**
     * Log performance measurement
     */
    static performance(label, startTime) {
        const duration = performance.now() - startTime;
        Logger.debug(`Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` });
    }

    /**
     * Log user action for debugging
     */
    static userAction(action, details = {}) {
        Logger.info(`User Action: ${action}`, details);
    }
}
