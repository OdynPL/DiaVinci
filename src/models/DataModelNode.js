/**
 * DataModelNode representing data structure with dynamic fields
 * Extends base Node functionality with field management
 */
class DataModelNode extends Node {
    constructor({x, y, r = 40, id = null, label = 'Data Model', color = '#8e44ad', type = 'DataModel', fields = []}) {
        super({x, y, r, id, label, color, type});
        this.fields = fields || []; // Array of {name, type, initialValue, required, readOnly}
        this._fieldCounter = 0; // Counter for generating unique field IDs
    }

    /**
     * Generate unique field ID
     */
    _generateFieldId() {
        return `field_${this.id}_${Date.now()}_${++this._fieldCounter}`;
    }

    /**
     * Validate field name uniqueness (case-insensitive)
     * Returns false for empty names or duplicates
     */
    isFieldNameUnique(fieldName, excludeFieldId = null) {
        // Empty names are not unique (and not valid)
        if (!fieldName || fieldName.trim() === '') return false;
        
        return !this.fields.some(field => 
            field.id !== excludeFieldId && 
            field.name.toLowerCase() === fieldName.toLowerCase()
        );
    }

    /**
     * Validate field name format with enhanced security
     */
    validateFieldName(fieldName) {
        const errors = [];
        
        if (!fieldName || fieldName.trim() === '') {
            errors.push(t('fieldNameRequired'));
        } else {
            // Security check: detect potential XSS/script injection
            if (/<script|javascript:|on\w+\s*=|<iframe|<object|<embed/i.test(fieldName)) {
                errors.push(t('fieldNameDangerous'));
            }
            
            // Check field name format (alphanumeric, underscore, no spaces at start/end)
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(fieldName.trim())) {
                errors.push(t('fieldNameFormat'));
            }
            
            // Check length
            if (fieldName.trim().length > 25) {
                errors.push(t('fieldNameTooLong'));
            }
            
            // Security check: prevent SQL injection patterns
            if (/('|(\\)|;|--|\/\*|\*\/|xp_|sp_|@@|union|select|insert|update|delete|drop|alter|create)/i.test(fieldName)) {
                errors.push(t('fieldNameSqlPatterns'));
            }
            
            // Check reserved words (excluding common database field names like 'id')
            const reservedWords = [
                'class', 'new', 'delete', 'return', 'function', 'var', 'let', 'const',
                'select', 'insert', 'update', 'drop', 'alter', 'create', 'table', 'database',
                'script', 'iframe', 'object', 'embed', 'link', 'meta', 'style'
            ];
            if (reservedWords.includes(fieldName.toLowerCase())) {
                errors.push(t('fieldNameReserved'));
            }
        }
        
        return errors;
    }

    /**
     * Validate initial value based on field type with enhanced security
     */
    validateInitialValue(value, type) {
        const errors = [];
        
        if (!value || value.trim() === '') {
            return errors; // Empty values are allowed
        }
        
        // Security checks first
        if (typeof value !== 'string') {
            value = String(value);
        }
        
        // Check for XSS patterns
        if (/<script|javascript:|on\w+\s*=|<iframe|<object|<embed|<link|<meta/i.test(value)) {
            errors.push(t('valueDangerousScript'));
            return errors; // Return immediately for security violations
        }
        
        // Check for SQL injection patterns
        if (/('|(\\)|;|--|\/\*|\*\/|xp_|sp_|@@|union.*select|insert.*into|update.*set|delete.*from|drop.*table|alter.*table|create.*table)/i.test(value)) {
            errors.push(t('valueDangerousSql'));
            return errors; // Return immediately for security violations
        }
        
        // Length security check (prevent DoS)
        if (value.length > 1000) {
            errors.push(t('valueTooLong'));
            return errors;
        }
        
        // Type-specific validation
        switch (type) {
            case 'Number':
                if (isNaN(value) || isNaN(parseFloat(value))) {
                    errors.push(`Invalid number format: "${value}"`);
                }
                break;
                
            case 'Currency':
                // Handle currency format like "PLN 23" or just "23"
                const currencyMatch = value.match(/^([A-Z]{3}\s+)?([0-9.]+)$/) || value.match(/^([0-9.]+)(\s+[A-Z]{3})?$/);
                if (!currencyMatch && isNaN(parseFloat(value))) {
                    errors.push(`Invalid currency format: "${value}". Use format like "PLN 23" or "23"`);
                }
                break;
                
            case 'Boolean':
                const boolValues = ['true', 'false', '1', '0', 'yes', 'no'];
                if (!boolValues.includes(value.toLowerCase())) {
                    errors.push(`Boolean value must be one of: ${boolValues.join(', ')}`);
                }
                break;
                
            case 'Date':
                const dateValue = new Date(value);
                if (isNaN(dateValue.getTime())) {
                    errors.push(`Invalid date format: "${value}". Use YYYY-MM-DD or ISO format`);
                }
                break;
                
            case 'Email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push(`Invalid email format: "${value}"`);
                }
                break;
                
            case 'URL':
                try {
                    new URL(value);
                } catch {
                    errors.push(`Invalid URL format: "${value}"`);
                }
                break;
                
            case 'Phone':
                const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
                if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    errors.push(`Invalid phone format: "${value}". Use international format (+1234567890)`);
                }
                break;
                
            case 'Object':
                try {
                    JSON.parse(value);
                } catch {
                    errors.push(`Invalid JSON object format: "${value}"`);
                }
                break;
                
            case 'Array':
                try {
                    const parsed = JSON.parse(value);
                    if (!Array.isArray(parsed)) {
                        errors.push(`Value must be a valid JSON array: "${value}"`);
                    }
                } catch {
                    errors.push(`Invalid JSON array format: "${value}"`);
                }
                break;
            
            // New validations
            case 'UUID':
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                if (!uuidRegex.test(value)) {
                    errors.push(t('invalidUuidFormat', value));
                }
                break;
                
            case 'Password':
                if (value.length < 6) {
                    errors.push(t('passwordTooShort'));
                }
                break;
                
            case 'Color':
                const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                const colorNames = ['red', 'green', 'blue', 'white', 'black', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'grey'];
                if (!colorRegex.test(value) && !colorNames.includes(value.toLowerCase()) && !value.startsWith('rgb') && !value.startsWith('rgba')) {
                    errors.push(t('invalidColorFormat', value));
                }
                break;
                
            case 'File':
            case 'Image':
                // Basic filename validation
                if (!/^[\w\-. ]+\.[a-zA-Z0-9]+$/.test(value) && !value.startsWith('data:') && !value.startsWith('http')) {
                    errors.push(`Invalid file format: "${value}". Use filename with extension, data URL, or HTTP URL`);
                }
                break;
                
            case 'JSON':
                try {
                    JSON.parse(value);
                } catch {
                    errors.push(`Invalid JSON format: "${value}"`);
                }
                break;
                
            case 'Base64':
                const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
                if (!base64Regex.test(value) || value.length % 4 !== 0) {
                    errors.push(`Invalid Base64 format: "${value}"`);
                }
                break;
                
            case 'Integer':
                if (!Number.isInteger(parseFloat(value)) || isNaN(value)) {
                    errors.push(`Invalid integer format: "${value}"`);
                }
                break;
                
            case 'Float':
            case 'Decimal':
                if (isNaN(value) || isNaN(parseFloat(value))) {
                    errors.push(`Invalid decimal format: "${value}"`);
                }
                break;
                
            case 'Percentage':
                const numValue = parseFloat(value.replace('%', ''));
                if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                    errors.push(`Invalid percentage: "${value}". Must be 0-100 or 0%-100%`);
                }
                break;
                
            case 'Duration':
                // Support formats like: 1h 30m, 90min, 2:30, PT1H30M
                const durationRegex = /^(PT)?(\d+[DHMS])*$|^\d+:\d+$|^\d+\s*(h|m|s|min|hour|hours|minute|minutes|second|seconds)(\s*\d+\s*(m|s|min|minute|minutes|second|seconds))*$/i;
                if (!durationRegex.test(value.replace(/\s+/g, ''))) {
                    errors.push(`Invalid duration format: "${value}". Use formats like "1h 30m", "90min", "2:30", or ISO 8601`);
                }
                break;
                
            case 'DateTime':
                const dateTimeValue = new Date(value);
                if (isNaN(dateTimeValue.getTime()) && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
                    errors.push(`Invalid datetime format: "${value}". Use ISO format: YYYY-MM-DDTHH:mm:ss`);
                }
                break;
                
            case 'Time':
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
                if (!timeRegex.test(value)) {
                    errors.push(`Invalid time format: "${value}". Use HH:mm or HH:mm:ss format`);
                }
                break;
                
            case 'Timestamp':
                const timestamp = parseInt(value);
                if (isNaN(timestamp) || timestamp < 0) {
                    errors.push(`Invalid timestamp: "${value}". Must be a positive integer`);
                }
                break;
                
            case 'IPv4':
                const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
                if (!ipv4Regex.test(value)) {
                    errors.push(`Invalid IPv4 address: "${value}". Use format: 192.168.1.1`);
                }
                break;
                
            case 'IPv6':
                const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
                if (!ipv6Regex.test(value)) {
                    errors.push(`Invalid IPv6 address: "${value}"`);
                }
                break;
                
            case 'MAC':
                const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                if (!macRegex.test(value)) {
                    errors.push(`Invalid MAC address: "${value}". Use format: XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX`);
                }
                break;
                
            case 'Credit Card':
                const ccRegex = /^[0-9]{13,19}$/;
                const cleanValue = value.replace(/[\s-]/g, '');
                if (!ccRegex.test(cleanValue)) {
                    errors.push(`Invalid credit card number: "${value}". Must be 13-19 digits`);
                }
                break;
                
            case 'IBAN':
                const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
                if (!ibanRegex.test(value.replace(/\s/g, ''))) {
                    errors.push(`Invalid IBAN: "${value}". Use format: CC22BBBBSSSSCCCCCCCCCCCC`);
                }
                break;
                
            case 'Country Code':
                const countryRegex = /^[A-Z]{2}$/;
                if (!countryRegex.test(value)) {
                    errors.push(`Invalid country code: "${value}". Use ISO 3166-1 alpha-2 format (e.g., US, GB, DE)`);
                }
                break;
                
            case 'Language Code':
                const langRegex = /^[a-z]{2}(-[A-Z]{2})?$/;
                if (!langRegex.test(value)) {
                    errors.push(`Invalid language code: "${value}". Use ISO 639-1 format (e.g., en, en-US, de-DE)`);
                }
                break;
                
            case 'Timezone':
                // Basic timezone validation
                try {
                    Intl.DateTimeFormat(undefined, {timeZone: value});
                } catch {
                    errors.push(`Invalid timezone: "${value}". Use IANA timezone format (e.g., America/New_York, Europe/London)`);
                }
                break;
        }
        
        return errors;
    }

    /**
     * Validate entire field
     */
    validateField(field) {
        const errors = [];
        
        // Validate field name format first
        const nameErrors = this.validateFieldName(field.name);
        errors.push(...nameErrors);
        
        // Check name uniqueness only if name is not empty
        if (field.name && field.name.trim() !== '') {
            if (!this.isFieldNameUnique(field.name, field.id)) {
                errors.push(t('fieldNameMustBeUnique'));
            }
        }
        
        // Validate initial value
        if (field.initialValue && field.initialValue.trim() !== '') {
            const valueErrors = this.validateInitialValue(field.initialValue, field.type);
            errors.push(...valueErrors);
        }
        
        // Required field cannot have empty initial value if we're enforcing defaults
        if (field.required && (!field.initialValue || field.initialValue.trim() === '')) {
            // This is a warning, not an error - required fields can have empty defaults
            // errors.push('Required fields should have a default value');
        }
        
        return errors;
    }

    /**
     * Validate all fields in the model
     */
    validateAllFields() {
        const allErrors = {};
        let hasErrors = false;
        
        this.fields.forEach(field => {
            const fieldErrors = this.validateField(field);
            if (fieldErrors.length > 0) {
                allErrors[field.id] = fieldErrors;
                hasErrors = true;
            }
        });
        
        return {
            hasErrors,
            errors: allErrors
        };
    }

    /**
     * Check if model is valid for saving
     */
    isValidForSave() {
        // Model name validation
        if (!this.label || this.label.trim() === '') {
            return {
                valid: false,
                error: 'Model name is required'
            };
        }
        
        if (this.label.length > 50) {
            return {
                valid: false,
                error: 'Model name cannot exceed 50 characters'
            };
        }
        
        // Must have at least one field
        if (this.fields.length === 0) {
            return {
                valid: false,
                error: 'Model must have at least one field'
            };
        }
        
        // All fields must be valid
        const validation = this.validateAllFields();
        if (validation.hasErrors) {
            return {
                valid: false,
                error: 'Please fix field validation errors before saving',
                fieldErrors: validation.errors
            };
        }
        
        return { valid: true };
    }

    /**
     * Generate unique field name
     */
    generateUniqueFieldName(baseName = 'field_Name') {
        let counter = 1;
        let fieldName = `${baseName}${counter}`;
        
        while (!this.isFieldNameUnique(fieldName)) {
            counter++;
            fieldName = `${baseName}${counter}`;
        }
        
        return fieldName;
    }

    /**
     * Add a new field to the data model
     */
    addField(field) {
        // Ensure unique field name
        let fieldName = field.name || 'field_Name1';
        if (!this.isFieldNameUnique(fieldName)) {
            // If the provided name is not unique, generate a new one from base
            fieldName = this.generateUniqueFieldName('field_Name');
        }

        const newField = {
            id: this._generateFieldId(),
            name: fieldName,
            type: field.type || 'String',
            initialValue: field.initialValue || '',
            required: field.required || false,
            readOnly: field.readOnly || false,
            nullable: field.nullable !== undefined ? field.nullable : false // Default to non-nullable
        };
        this.fields.push(newField);
        return newField;
    }

    /**
     * Update an existing field
     */
    updateField(fieldId, updates) {
        const fieldIndex = this.fields.findIndex(f => f.id === fieldId);
        if (fieldIndex !== -1) {
            // If updating name, validate it
            if (updates.name !== undefined) {
                // Check if name is empty
                if (!updates.name || updates.name.trim() === '') {
                    throw new Error(t('fieldNameCannotBeEmpty'));
                }
                
                // Check name format
                const nameErrors = this.validateFieldName(updates.name);
                if (nameErrors.length > 0) {
                    throw new Error(nameErrors[0]);
                }
                
                // Check uniqueness
                if (!this.isFieldNameUnique(updates.name, fieldId)) {
                    throw new Error(t('fieldNameAlreadyInUse', updates.name));
                }
            }
            
            this.fields[fieldIndex] = {...this.fields[fieldIndex], ...updates};
            return this.fields[fieldIndex];
        }
        return null;
    }

    /**
     * Remove a field from the data model
     */
    removeField(fieldId) {
        this.fields = this.fields.filter(f => f.id !== fieldId);
    }

    /**
     * Get field by ID
     */
    getField(fieldId) {
        return this.fields.find(f => f.id === fieldId);
    }

    /**
     * Get all fields
     */
    getAllFields() {
        return [...this.fields];
    }

    /**
     * Check if DataModelNode contains point (override for larger size)
     */
    containsPoint(x, y) {
        // DataModel nodes are rectangular for better field display
        const width = this.r * 4.5; // Increased from 3.5 to 4.5
        const visibleFieldsCount = Math.min(this.fields.length, 10);
        const additionalHeight = this.fields.length > 10 ? 18 : 0; // Extra height for "and X more" text
        const height = Math.max(this.r * 2, visibleFieldsCount * 18 + 50 + additionalHeight);
        
        return (
            x >= this.x - width/2 &&
            x <= this.x + width/2 &&
            y >= this.y - height/2 &&
            y <= this.y + height/2
        );
    }

    /**
     * Clone the DataModelNode
     */
    clone() {
        return new DataModelNode({
            x: this.x,
            y: this.y,
            r: this.r,
            id: this.id,
            label: this.label,
            color: this.color,
            type: this.type,
            fields: this.fields.map(field => ({...field}))
        });
    }

    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
            id: this.id,
            label: this.label,
            color: this.color,
            type: this.type,
            fields: this.fields,
            _fieldCounter: this._fieldCounter
        };
    }

    /**
     * Create DataModelNode from plain object
     */
    static fromJSON(data) {
        const node = new DataModelNode(data);
        node._fieldCounter = data._fieldCounter || 0;
        return node;
    }

    /**
     * Get supported data types
     */
    static getSupportedTypes() {
        return [
            'String', 'Number', 'Boolean', 'Date', 
            'Object', 'Array', 'Text', 'Email', 
            'URL', 'Phone', 'Currency',
            // New types
            'UUID', 'Password', 'Color', 'File',
            'Image', 'JSON', 'Base64', 'Enum',
            'Integer', 'Float', 'Decimal', 'Percentage',
            'Duration', 'DateTime', 'Time', 'Timestamp',
            'Binary', 'HTML', 'XML', 'Markdown',
            'IPv4', 'IPv6', 'MAC', 'Credit Card',
            'IBAN', 'Country Code', 'Language Code', 'Timezone'
        ];
    }
}
