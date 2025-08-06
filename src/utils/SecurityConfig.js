/**
 * Security Configuration and Content Security Policy
 * Enhanced security measures for Data Model system
 */
class SecurityConfig {
    
    /**
     * Content Security Policy configuration
     */
    static getCSPHeader() {
        return {
            'Content-Security-Policy': [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline'", // Note: 'unsafe-inline' should be removed in production
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob:",
                "font-src 'self'",
                "connect-src 'self'",
                "frame-src 'none'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'"
            ].join('; ')
        };
    }

    /**
     * Security headers for enhanced protection
     */
    static getSecurityHeaders() {
        return {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            ...this.getCSPHeader()
        };
    }

    /**
     * Trusted domains for external resources
     */
    static getTrustedDomains() {
        return [
            'localhost',
            '127.0.0.1',
            // Add other trusted domains here
        ];
    }

    /**
     * Maximum input lengths by type
     */
    static getInputLimits() {
        return {
            fieldName: 25,
            fieldValue: 1000,
            modelName: 50,
            description: 500,
            jsonSchema: 100000, // 100KB
            maxFields: 100,
            maxJsonDepth: 10
        };
    }

    /**
     * Blocked patterns for security
     */
    static getBlockedPatterns() {
        return {
            xss: [
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
                /data:.*script/i
            ],
            sql: [
                /('|(\\)|;|--|\/\*|\*\/)/i,
                /(union.*select|insert.*into|update.*set|delete.*from)/i,
                /(drop.*table|alter.*table|create.*table)/i,
                /(xp_|sp_|@@)/i
            ],
            system: [
                /\.\.\//,  // Path traversal
                /~\//,     // User directory access
                /\/etc\//i, // System files
                /\/proc\//i,
                /\/sys\//i
            ]
        };
    }

    /**
     * Validate input against security patterns
     */
    static validateSecurity(input, type = 'general') {
        const errors = [];
        const patterns = this.getBlockedPatterns();
        
        // Check XSS patterns
        if (patterns.xss.some(pattern => pattern.test(input))) {
            errors.push('Input contains potentially dangerous script content');
        }
        
        // Check SQL injection patterns
        if (patterns.sql.some(pattern => pattern.test(input))) {
            errors.push('Input contains potentially dangerous SQL patterns');
        }
        
        // Check system access patterns
        if (patterns.system.some(pattern => pattern.test(input))) {
            errors.push('Input contains potentially dangerous system access patterns');
        }
        
        // Check input length
        const limits = this.getInputLimits();
        const maxLength = limits[type] || limits.fieldValue;
        if (input.length > maxLength) {
            errors.push(`Input exceeds maximum length of ${maxLength} characters`);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Sanitize input for safe usage
     */
    static sanitizeInput(input) {
        if (!input || typeof input !== 'string') {
            return '';
        }
        
        return input
            // Remove null bytes
            .replace(/\x00/g, '')
            // Remove control characters except tab, newline, carriage return
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
            // Escape HTML entities
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * Create secure random identifier
     */
    static generateSecureId(prefix = 'secure', length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = prefix + '_';
        
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    /**
     * Log security events
     */
    static logSecurityEvent(event, details = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.warn('🚨 SECURITY EVENT:', logEntry);
        
        // In production, send to security monitoring service
        // this.sendToSecurityService(logEntry);
    }

    /**
     * Initialize security measures
     */
    static initialize() {
        // Set up CSP if supported
        if (document.querySelector('meta[http-equiv="Content-Security-Policy"]') === null) {
            const cspMeta = document.createElement('meta');
            cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
            cspMeta.setAttribute('content', this.getCSPHeader()['Content-Security-Policy']);
            document.head.appendChild(cspMeta);
        }
        
        // Monitor for potential security violations
        this.setupSecurityMonitoring();
        
        console.log('🔒 Security configuration initialized');
    }

    /**
     * Set up security event monitoring
     */
    static setupSecurityMonitoring() {
        // Monitor for CSP violations
        document.addEventListener('securitypolicyviolation', (e) => {
            this.logSecurityEvent('CSP_VIOLATION', {
                violatedDirective: e.violatedDirective,
                blockedURI: e.blockedURI,
                originalPolicy: e.originalPolicy
            });
        });
        
        // Monitor for suspicious DOM manipulations
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.tagName === 'SCRIPT' || node.tagName === 'IFRAME') {
                                this.logSecurityEvent('SUSPICIOUS_DOM_MANIPULATION', {
                                    tagName: node.tagName,
                                    src: node.src,
                                    innerHTML: node.innerHTML?.substring(0, 100)
                                });
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
}

// Auto-initialize security when script loads
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        SecurityConfig.initialize();
    });
}
