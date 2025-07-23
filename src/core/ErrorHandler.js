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
            Logger.error('Unhandled promise rejection', event.reason, {
                promise: event.promise
            });
            this.handleError(event.reason, 'Unexpected error occurred');
            event.preventDefault();
        });

        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            Logger.error('Uncaught error', event.error, {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
            this.handleError(event.error, 'Unexpected error occurred');
        });
    }

    /**
     * Handle application errors with user notification
     */
    handleError(error, userMessage = null, context = {}) {
        Logger.error('Application error', error, context);
        
        if (this.notificationService && userMessage) {
            this.notificationService.error(userMessage);
        }
    }

    /**
     * Handle async operations with proper error handling
     */
    async executeWithErrorHandling(asyncOperation, errorMessage = 'Operation failed') {
        try {
            return await asyncOperation();
        } catch (error) {
            this.handleError(error, errorMessage);
            throw error; // Re-throw to allow caller to handle
        }
    }

    /**
     * Wrap sync operations with error handling
     */
    executeSync(operation, errorMessage = 'Operation failed', defaultReturn = null) {
        try {
            return operation();
        } catch (error) {
            this.handleError(error, errorMessage);
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
            throw new Error(`Missing required parameters: ${missing.join(', ')}`);
        }
    }

    /**
     * Safe JSON parsing
     */
    safeJsonParse(jsonString, defaultValue = null) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            Logger.warn('Failed to parse JSON', { jsonString, error: error.message });
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
            Logger.warn('Failed to stringify JSON', { object, error: error.message });
            return defaultValue;
        }
    }
}
