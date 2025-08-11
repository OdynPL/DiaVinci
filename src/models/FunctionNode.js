/**
 * Function Node Model - represents a node with C# code editor
 */
class FunctionNode {
    constructor(options = {}) {
        this.id = options.id || 'function_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        this.type = 'function';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 80;
        this.height = options.height || 110;
        this.label = options.label || 'Function';
        this.color = options.color || '#8B5CF6';
        
        // C# code content
        this.code = options.hasOwnProperty('code') ? options.code : 
            'public void Execute()\n{\n    // Your code here\n    Console.WriteLine("Hello World!");\n}';
        this.language = 'csharp';
        
        // Data Model references and imports
        this.dataModelReferences = options.dataModelReferences || [];
        this.usings = options.usings || ['System', 'System.Collections.Generic'];
        
        // Function metadata
        this.returnType = options.returnType || 'void';
        this.parameters = options.parameters || [];
        this.isAsync = options.isAsync || false;
        
        // Editor state
        this.isEditorOpen = false;
        this.lastEditTime = null;
    }

    /**
     * Move the function node to new position
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Set the color of the function node
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * Update the C# code content
     */
    setCode(code) {
        this.code = code;
        this.lastEditTime = new Date();
    }

    /**
     * Update code (alias for setCode for compatibility)
     */
    updateCode(code) {
        this.setCode(code);
    }

    /**
     * Add a data model reference for IntelliSense
     */
    addDataModelReference(dataModelNode) {
        if (!this.dataModelReferences.find(ref => ref.id === dataModelNode.id)) {
            this.dataModelReferences.push({
                id: dataModelNode.id,
                label: dataModelNode.label,
                fields: dataModelNode.fields || []
            });
        }
    }

    /**
     * Remove a data model reference
     */
    removeDataModelReference(dataModelId) {
        this.dataModelReferences = this.dataModelReferences.filter(ref => ref.id !== dataModelId);
    }

    /**
     * Get connected Data Models via transitions from project (both directions)
     */
    getConnectedDataModels(project) {
        if (!project) return [];
        
        const connectedDataModels = [];
        
        // Check incoming transitions (DataModel -> Function)
        const incomingTransitions = project.transitions.filter(transition => transition.to === this);
        incomingTransitions.forEach(transition => {
            if (transition.from && transition.from.type === 'datamodel') {
                connectedDataModels.push(transition.from);
            }
        });
        
        // Check outgoing transitions (Function -> DataModel)  
        const outgoingTransitions = project.transitions.filter(transition => transition.from === this);
        outgoingTransitions.forEach(transition => {
            if (transition.to && transition.to.type === 'datamodel') {
                // Check if not already added (avoid duplicates)
                if (!connectedDataModels.find(model => model.id === transition.to.id)) {
                    connectedDataModels.push(transition.to);
                }
            }
        });
        
        // Debug logging
        console.log(`Function ${this.label} connected models:`, {
            incomingCount: incomingTransitions.filter(t => t.from && t.from.type === 'datamodel').length,
            outgoingCount: outgoingTransitions.filter(t => t.to && t.to.type === 'datamodel').length,
            totalConnected: connectedDataModels.length,
            modelIds: connectedDataModels.map(m => `${m.label}(${(m.id || 'no-id').toString().substring(0,8)})`)
        });
        
        return connectedDataModels;
    }

    /**
     * Get count of connected Data Models
     */
    getDataModelCounter(project) {
        return this.getConnectedDataModels(project).length;
    }

    /**
     * Update data model references based on connections
     */
    updateDataModelReferences(project) {
        const connectedModels = this.getConnectedDataModels(project);
        this.dataModelReferences = connectedModels.map(model => ({
            id: model.id,
            label: model.label,
            fields: model.fields || []
        }));
    }

    /**
     * Generate C# class structure with data model imports
     */
    generateFullCode() {
        let fullCode = '';
        
        // Add usings
        this.usings.forEach(using => {
            fullCode += `using ${using};\n`;
        });
        
        // Add data model classes
        if (this.dataModelReferences.length > 0) {
            fullCode += '\n// Data Model Classes\n';
            this.dataModelReferences.forEach(model => {
                fullCode += this.generateDataModelClass(model);
            });
        }
        
        // Add main function class
        fullCode += '\n// Function Implementation\n';
        fullCode += 'public class FunctionExecutor\n{\n';
        
        // Add user code
        const indentedCode = this.code.split('\n').map(line => '    ' + line).join('\n');
        fullCode += indentedCode + '\n';
        
        fullCode += '}\n';
        
        return fullCode;
    }

    /**
     * Generate C# class from data model
     */
    generateDataModelClass(model) {
        let classCode = `public class ${model.label}\n{\n`;
        
        if (model.fields && model.fields.length > 0) {
            model.fields.forEach(field => {
                const csharpType = this.convertToCSharpType(field.type);
                classCode += `    public ${csharpType} ${field.name} { get; set; }\n`;
            });
        }
        
        classCode += '}\n\n';
        return classCode;
    }

    /**
     * Convert data model field types to C# types
     */
    convertToCSharpType(fieldType) {
        const typeMap = {
            'string': 'string',
            'text': 'string',
            'number': 'int',
            'decimal': 'decimal',
            'float': 'float',
            'boolean': 'bool',
            'date': 'DateTime',
            'datetime': 'DateTime',
            'list': 'List<string>',
            'array': 'string[]'
        };
        
        return typeMap[fieldType.toLowerCase()] || 'object';
    }

    /**
     * Check if a point is within the function node bounds
     */
    containsPoint(x, y) {
        const width = this.width || 160;
        const height = this.height || 120;
        const left = this.x - width/2;
        const right = this.x + width/2;
        const top = this.y - height/2;
        const bottom = this.y + height/2;
        
        return x >= left && x <= right && y >= top && y <= bottom;
    }

    /**
     * Get function signature for display
     */
    getFunctionSignature() {
        const asyncPrefix = this.isAsync ? 'async ' : '';
        const params = this.parameters.map(p => `${p.type} ${p.name}`).join(', ');
        return `${asyncPrefix}${this.returnType} ${this.label}(${params})`;
    }

    /**
     * Validate C# code syntax (basic validation)
     */
    validateCode() {
        const errors = [];
        
        // Basic syntax checks
        if (!this.code.trim()) {
            errors.push('Function code cannot be empty');
        }
        
        // Check for balanced braces
        const openBraces = (this.code.match(/\{/g) || []).length;
        const closeBraces = (this.code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            errors.push('Unbalanced braces in code');
        }
        
        // Check for basic C# keywords
        if (!this.code.includes('public') && !this.code.includes('private') && !this.code.includes('internal')) {
            errors.push('Function should have an access modifier');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Export function node data
     */
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            label: this.label,
            color: this.color,
            code: this.code,
            language: this.language,
            dataModelReferences: this.dataModelReferences,
            usings: this.usings,
            returnType: this.returnType,
            parameters: this.parameters,
            isAsync: this.isAsync,
            lastEditTime: this.lastEditTime
        };
    }

    /**
     * Create function node from JSON data
     */
    static fromJSON(data) {
        return new FunctionNode(data);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FunctionNode;
}
