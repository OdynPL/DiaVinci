/**
 * DataModelNode representing data structure with dynamic fields
 * Extends base Node functionality with field management
 */
class DataModelNode extends Node {
    constructor({x, y, r = 40, id = null, label = 'Data Model', color = '#8e44ad', type = 'datamodel', fields = []}) {
        super({x, y, r, id, label, color, type});
        this.fields = fields || []; // Array of {name, type, initialValue, required, readOnly}
    }

    /**
     * Add a new field to the data model
     */
    addField(field) {
        const newField = {
            id: Date.now() + Math.random(),
            name: field.name || 'field',
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
            fields: this.fields
        };
    }

    /**
     * Create DataModelNode from plain object
     */
    static fromJSON(data) {
        return new DataModelNode(data);
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
