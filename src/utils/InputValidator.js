/**
 * Input validation and sanitization utility
 */
class InputValidator {
    
    /**
     * Sanitize user input based on type
     */
    static sanitize(input, type = 'text') {
        if (!input || typeof input !== 'string') {
            return '';
        }

        let sanitized = input;

        // Basic HTML/XSS protection
        sanitized = this.escapeHtml(sanitized);
        
        // Remove or replace dangerous characters
        sanitized = this.removeDangerousChars(sanitized);
        
        // Normalize whitespace
        sanitized = this.normalizeWhitespace(sanitized);
        
        // Apply type-specific rules
        switch (type) {
            case 'node':
                sanitized = this.sanitizeNodeLabel(sanitized);
                break;
            case 'transition':
                sanitized = this.sanitizeTransitionLabel(sanitized);
                break;
            case 'text':
                sanitized = this.sanitizeTextLabel(sanitized);
                break;
        }

        return sanitized;
    }

    /**
     * Escape HTML entities to prevent XSS
     */
    static escapeHtml(text) {
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        
        return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
    }

    /**
     * Remove potentially dangerous characters
     */
    static removeDangerousChars(text) {
        // Remove control characters except tab, newline, carriage return
        return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    }

    /**
     * Normalize whitespace
     */
    static normalizeWhitespace(text) {
        return text
            .replace(/\s+/g, ' ')  // Multiple spaces to single space
            .trim();               // Remove leading/trailing whitespace
    }

    /**
     * Sanitize node labels (more restrictive)
     */
    static sanitizeNodeLabel(text) {
        // Max length for nodes
        const maxLength = 50;
        
        // Allow letters, numbers, spaces, basic punctuation
        let sanitized = text.replace(/[^\w\s\-_.,()]/g, '');
        
        // Limit length
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength).trim();
        }
        
        return sanitized;
    }

    /**
     * Sanitize transition labels (moderate restrictions)
     */
    static sanitizeTransitionLabel(text) {
        // Max length for transitions
        const maxLength = 30;
        
        // Allow letters, numbers, spaces, basic punctuation
        let sanitized = text.replace(/[^\w\s\-_.,()!?]/g, '');
        
        // Limit length
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength).trim();
        }
        
        return sanitized;
    }

    /**
     * Sanitize text labels (least restrictive)
     */
    static sanitizeTextLabel(text) {
        // Max length for text elements
        const maxLength = 200;
        
        // Allow most characters except dangerous ones
        let sanitized = text.replace(/[<>]/g, '');
        
        // Limit length
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength).trim();
        }
        
        return sanitized;
    }

    /**
     * Validate input length
     */
    static validateLength(text, type) {
        const maxLengths = {
            'node': 50,
            'transition': 30,
            'text': 200
        };
        
        const maxLength = maxLengths[type] || 100;
        return text.length <= maxLength;
    }

    /**
     * Check if input contains only safe characters
     */
    static isSafe(text, type = 'text') {
        const patterns = {
            'node': /^[\w\s\-_.,()]*$/,
            'transition': /^[\w\s\-_.,()!?]*$/,
            'text': /^[^<>]*$/
        };
        
        const pattern = patterns[type] || patterns.text;
        return pattern.test(text);
    }

    /**
     * Get validation rules for display
     */
    static getValidationRules(type) {
        const rules = {
            'node': {
                maxLength: 50,
                allowedChars: 'Letters, numbers, spaces, basic punctuation',
                description: 'Node labels should be short and descriptive'
            },
            'transition': {
                maxLength: 30,
                allowedChars: 'Letters, numbers, spaces, basic punctuation, !, ?',
                description: 'Transition labels should describe the condition or action'
            },
            'text': {
                maxLength: 200,
                allowedChars: 'Most characters except < and >',
                description: 'Text elements can contain longer descriptions'
            }
        };
        
        return rules[type] || rules.text;
    }
}
