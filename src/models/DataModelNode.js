/**
 * DataModelNode representing data structure with dynamic fields
 * Extends base Node functionality with field management
 */
class DataModelNode extends Node {
    constructor({x, y, r = 40, id = null, label = 'Data Model', color = '#8e44ad', type = 'datamodel', fields = []}) {
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
     */
    isFieldNameUnique(fieldName, excludeFieldId = null) {
        if (!fieldName || fieldName.trim() === '') return false;
        
        return !this.fields.some(field => 
            field.id !== excludeFieldId && 
            field.name.toLowerCase() === fieldName.toLowerCase()
        );
    }

    /**
     * Generate unique field name
     */
    generateUniqueFieldName(baseName = 'field') {
        let counter = 0;
        let fieldName = baseName;
        
        while (!this.isFieldNameUnique(fieldName)) {
            counter++;
            fieldName = `${baseName}_${counter}`;
        }
        
        return fieldName;
    }

    /**
     * Add a new field to the data model
     */
    addField(field) {
        // Ensure unique field name
        let fieldName = field.name || 'field';
        if (!this.isFieldNameUnique(fieldName)) {
            fieldName = this.generateUniqueFieldName(fieldName);
        }

        const newField = {
            id: this._generateFieldId(),
            name: fieldName,
            type: field.type || 'String',
            initialValue: field.initialValue || '',
            required: field.required || false,
            readOnly: field.readOnly || false
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
            // If updating name, ensure uniqueness
            if (updates.name !== undefined) {
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
        const height = Math.max(this.r * 2, this.fields.length * 18 + 45);
        
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
