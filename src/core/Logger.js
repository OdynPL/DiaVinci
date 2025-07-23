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
            console.error(`[DiaVinci ERROR] ${message}`, {
                error: error ? {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                } : null,
                context,
                timestamp: new Date().toISOString()
            });
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
