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
            'text': 200,
            'fieldName': 25,  // Data Model field names
            'fieldValue': 500, // Data Model field values
            'modelName': 50,   // Data Model names
            'json': 100000    // JSON content - 100KB
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
            'text': /^[^<>]*$/,
            'fieldName': /^[a-zA-Z_][a-zA-Z0-9_]*$/, // Data Model field names - strict
            'fieldValue': /^[^<>'"&]*$/, // Data Model values - no HTML/script chars
            'modelName': /^[\w\s\-_.,()]*$/, // Data Model names
            'json': /^[\s\S]*$/ // JSON content - allow everything (will be validated separately)
        };
        
        const pattern = patterns[type] || patterns.text;
        return pattern.test(text);
    }

    /**
     * Sanitize Data Model field names (extra strict)
     */
    static sanitizeFieldName(text) {
        // Most restrictive sanitization for field names
        const maxLength = 25;
        
        // Allow only alphanumeric, underscore, starting with letter or underscore
        let sanitized = text.replace(/[^\w]/g, '');
        
        // Ensure starts with letter or underscore
        if (sanitized && !/^[a-zA-Z_]/.test(sanitized)) {
            sanitized = '_' + sanitized;
        }
        
        // Limit length
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength);
        }
        
        return sanitized;
    }

    /**
     * Sanitize Data Model field values
     */
    static sanitizeFieldValue(text, fieldType = 'String') {
        const maxLength = 500;
        
        // Remove potentially dangerous characters
        let sanitized = text.replace(/[<>'"&]/g, '');
        
        // Remove control characters except tab, newline, carriage return
        sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        
        // Type-specific sanitization
        switch (fieldType) {
            case 'Email':
                sanitized = sanitized.replace(/[^\w@.-]/g, '');
                break;
            case 'URL':
                sanitized = sanitized.replace(/[^\w:\/?.#\-=&]/g, '');
                break;
            case 'Phone':
                sanitized = sanitized.replace(/[^\d+\-\s()]/g, '');
                break;
            case 'Number':
            case 'Integer':
            case 'Float':
            case 'Decimal':
                sanitized = sanitized.replace(/[^\d.-]/g, '');
                break;
            case 'Boolean':
                sanitized = sanitized.toLowerCase().replace(/[^a-z01]/g, '');
                break;
        }
        
        // Limit length
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength);
        }
        
        return sanitized;
    }

    /**
     * Detect and prevent SQL injection patterns
     */
    static detectSQLInjection(text) {
        const sqlPatterns = [
            /('|(\\)|;|--|\/\*|\*\/|xp_|sp_|@@|char|nchar|varchar|nvarchar|alter|begin|cast|create|cursor|declare|delete|drop|exec|execute|fetch|insert|kill|open|select|sys|sysobjects|syscolumns|table|update)/i,
            /(union|script|javascript|vbscript|onload|onerror|onclick)/i,
            /(\<|\>|%3c|%3e|%3C|%3E)/i
        ];
        
        return sqlPatterns.some(pattern => pattern.test(text));
    }

    /**
     * Detect and prevent XSS patterns
     */
    static detectXSS(text) {
        const xssPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /<link/i,
            /<meta/i,
            /expression\s*\(/i,
            /vbscript:/i,
            /data:/i
        ];
        
        return xssPatterns.some(pattern => pattern.test(text));
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
            },
            'fieldName': {
                maxLength: 25,
                allowedChars: 'Letters, numbers, underscore (must start with letter or underscore)',
                description: 'Field names must be valid identifiers'
            },
            'fieldValue': {
                maxLength: 500,
                allowedChars: 'Most characters except HTML/script tags',
                description: 'Field values with security validation'
            },
            'modelName': {
                maxLength: 50,
                allowedChars: 'Letters, numbers, spaces, basic punctuation',
                description: 'Model names should be descriptive'
            },
            'json': {
                maxLength: 100000,
                allowedChars: 'Valid JSON syntax (will be parsed and validated)',
                description: 'JSON content with structure validation'
            }
        };
        
        return rules[type] || rules.text;
    }

    /**
     * Comprehensive security validation for Data Model inputs
     */
    static validateDataModelInput(text, type = 'fieldValue', fieldType = 'String') {
        const errors = [];
        
        if (!text || typeof text !== 'string') {
            return { valid: true, errors: [], sanitized: '' };
        }
        
        // For JSON content, use more permissive validation
        if (type === 'json' || text.length > 1000) {
            // Only check for obviously dangerous script content in JSON
            if (/<script[^>]*>|javascript\s*:|on\w+\s*=\s*['"]|<iframe[^>]*>/i.test(text)) {
                errors.push('Input contains potentially dangerous script patterns');
            }
            
            // Allow longer content for JSON
            if (text.length > 100000) { // 100KB limit for JSON
                errors.push('Input exceeds maximum length of 100KB');
            }
        } else {
            // Standard validation for regular inputs
            
            // Check for SQL injection
            if (this.detectSQLInjection(text)) {
                errors.push('Input contains potentially dangerous SQL patterns');
            }
            
            // Check for XSS
            if (this.detectXSS(text)) {
                errors.push('Input contains potentially dangerous script patterns');
            }
            
            // Check length
            if (!this.validateLength(text, type)) {
                const rules = this.getValidationRules(type);
                errors.push(`Input exceeds maximum length of ${rules.maxLength} characters`);
            }
            
            // Check safe characters
            if (!this.isSafe(text, type)) {
                errors.push('Input contains unsafe characters');
            }
        }
        
        // Sanitize the input
        let sanitized;
        if (type === 'fieldName') {
            sanitized = this.sanitizeFieldName(text);
        } else if (type === 'fieldValue') {
            sanitized = this.sanitizeFieldValue(text, fieldType);
        } else if (type === 'json') {
            // Minimal sanitization for JSON - only remove null bytes
            sanitized = text.replace(/\x00/g, '');
        } else {
            sanitized = this.sanitize(text, type);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors,
            sanitized: sanitized,
            needsSanitization: sanitized !== text
        };
    }

    /**
     * Safe HTML content setter to prevent XSS
     */
    static setSafeContent(element, content, useTextContent = true) {
        if (!element) return;
        
        if (useTextContent) {
            element.textContent = content;
        } else {
            // Only use innerHTML for trusted, pre-sanitized content
            const sanitized = this.escapeHtml(content);
            element.innerHTML = sanitized;
        }
    }

    /**
     * Create safe HTML attributes
     */
    static createSafeAttributes(attributes) {
        const safeAttrs = {};
        
        for (const [key, value] of Object.entries(attributes)) {
            // Sanitize attribute names and values
            const safeKey = key.replace(/[^a-zA-Z\-]/g, '');
            const safeValue = this.escapeHtml(String(value));
            
            if (safeKey && safeValue) {
                safeAttrs[safeKey] = safeValue;
            }
        }
        
        return safeAttrs;
    }
}
