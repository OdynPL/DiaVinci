/**
 * Centralized error handling service
 */
class ErrorHandler {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.setupGlobalErrorHandlers();
    }

    /**
     * Setup global error handlers
     */
    setupGlobalErrorHandlers() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            Logger.error(t('unhandledPromiseRejection'), event.reason, {
                promise: event.promise
            });
            this.handleError(event.reason, t('unexpectedErrorOccurred'));
            event.preventDefault();
        });

        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            Logger.error(t('uncaughtError'), event.error, {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
            this.handleError(event.error, t('unexpectedErrorOccurred'));
        });
    }

    /**
     * Handle application errors with user notification
     */
    handleError(error, userMessage = null, context = {}) {
        Logger.error(t('applicationError'), error, context);
        
        if (this.notificationService && userMessage) {
            this.notificationService.error(userMessage);
        }
    }

    /**
     * Handle async operations with proper error handling
     */
    async executeWithErrorHandling(asyncOperation, errorMessage = null) {
        const defaultErrorMessage = errorMessage || t('operationFailed');
        try {
            return await asyncOperation();
        } catch (error) {
            this.handleError(error, defaultErrorMessage);
            throw error; // Re-throw to allow caller to handle
        }
    }

    /**
     * Wrap sync operations with error handling
     */
    executeSync(operation, errorMessage = null, defaultReturn = null) {
        const defaultErrorMessage = errorMessage || t('operationFailed');
        try {
            return operation();
        } catch (error) {
            this.handleError(error, defaultErrorMessage);
            return defaultReturn;
        }
    }

    /**
     * Validate required parameters
     */
    validateRequired(params, requiredFields) {
        const missing = requiredFields.filter(field => 
            params[field] === undefined || params[field] === null
        );
        
        if (missing.length > 0) {
            throw new Error(`${t('missingRequiredParameters')}: ${missing.join(', ')}`);
        }
    }

    /**
     * Safe JSON parsing
     */
    safeJsonParse(jsonString, defaultValue = null) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            Logger.warn(t('failedToParseJson'), { jsonString, error: error.message });
            return defaultValue;
        }
    }

    /**
     * Safe JSON stringify
     */
    safeJsonStringify(object, defaultValue = '{}') {
        try {
            return JSON.stringify(object);
        } catch (error) {
            Logger.warn(t('failedToStringifyJson'), { object, error: error.message });
            return defaultValue;
        }
    }
}
