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
     * Validate field name format
     */
    validateFieldName(fieldName) {
        const errors = [];
        
        if (!fieldName || fieldName.trim() === '') {
            errors.push('Field name is required');
        } else {
            // Check field name format (alphanumeric, underscore, no spaces at start/end)
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(fieldName.trim())) {
                errors.push('Field name must start with letter or underscore, and contain only letters, numbers, and underscores');
            }
            
            // Check length
            if (fieldName.trim().length > 25) {
                errors.push('Field name cannot exceed 25 characters');
            }
            
            // Check reserved words
            const reservedWords = ['id', 'class', 'type', 'new', 'delete', 'return', 'function', 'var', 'let', 'const'];
            if (reservedWords.includes(fieldName.toLowerCase())) {
                errors.push('Field name cannot be a reserved word');
            }
        }
        
        return errors;
    }

    /**
     * Validate initial value based on field type
     */
    validateInitialValue(value, type) {
        const errors = [];
        
        if (!value || value.trim() === '') {
            return errors; // Empty values are allowed
        }
        
        switch (type) {
            case 'Number':
            case 'Currency':
                if (isNaN(value) || isNaN(parseFloat(value))) {
                    errors.push(`Invalid number format: "${value}"`);
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
                errors.push('Field name must be unique');
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
                    throw new Error('Field name cannot be empty');
                }
                
                // Check name format
                const nameErrors = this.validateFieldName(updates.name);
                if (nameErrors.length > 0) {
                    throw new Error(nameErrors[0]);
                }
                
                // Check uniqueness
                if (!this.isFieldNameUnique(updates.name, fieldId)) {
                    throw new Error(`Field name '${updates.name}' is already in use`);
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
        const width = this.r * 3.5;
        const height = Math.max(this.r * 2, this.fields.length * 18 + 50);
        
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
            'URL', 'Phone', 'Currency'
        ];
    }
}
