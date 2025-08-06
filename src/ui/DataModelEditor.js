/**
 * DataModelEditor - Editor for managing fields in DataModelNode
 */
class DataModelEditor {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentNode = null;
        this.isOpen = false;
        this.modal = null;
        this.supportedTypes = DataModelNode.getSupportedTypes();
    }

    /**
     * Open editor for a data model node
     */
    open(node) {
        if (!node || node.type !== 'datamodel') {
            Logger.error('Invalid node for data model editor', { node });
            return;
        }

        this.currentNode = node;
        this.isOpen = true;
        this.createModal();
        this.renderFields();
    }

    /**
     * Close the editor
     */
    close() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
        
        // Remove escape key listener
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
        
        this.currentNode = null;
        this.isOpen = false;
    }

    /**
     * Create the modal dialog
     */
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        this.modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-hidden border border-gray-200">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                <rect x="2" y="4" width="20" height="16" stroke="currentColor" stroke-width="2" fill="none" rx="2"/>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900">Edit Data Model</h2>
                            <p class="text-sm text-gray-500">Define fields and structure for your data model</p>
                        </div>
                    </div>
                    <button class="close-btn text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                    <!-- Model Name -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            Model Name
                        </label>
                        <input type="text" 
                               class="model-name-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                               value="${this.currentNode.label}" 
                               placeholder="Enter model name">
                    </div>
                    
                    <!-- Fields Section -->
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <h3 class="text-lg font-medium text-gray-900">Fields</h3>
                                <span class="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${this.currentNode.fields.length}</span>
                            </div>
                            <button class="add-field-btn bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all flex items-center shadow-md hover:shadow-lg">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                Add Field
                            </button>
                        </div>
                        
                        <div class="fields-container space-y-3">
                            <!-- Fields will be rendered here -->
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
                    <button class="cancel-btn px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button class="save-btn px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        this.setupEventListeners();
    }

    /**
     * Setup event listeners for the modal
     */
    setupEventListeners() {
        // Close button
        this.modal.querySelector('.close-btn').addEventListener('click', () => this.close());
        this.modal.querySelector('.cancel-btn').addEventListener('click', () => this.close());
        
        // Click outside to close - only on the backdrop, not the modal content
        this.modal.addEventListener('click', (e) => {
            // Only close if clicking directly on the modal backdrop, not on child elements
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Add field button
        this.modal.querySelector('.add-field-btn').addEventListener('click', () => this.addField());
        
        // Save button
        this.modal.querySelector('.save-btn').addEventListener('click', () => this.saveChanges());
        
        // Model name input
        this.modal.querySelector('.model-name-input').addEventListener('input', (e) => {
            this.currentNode.setLabel(e.target.value);
        });
        
        // Escape key to close
        this.escapeHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    /**
     * Render all fields
     */
    renderFields() {
        const container = this.modal.querySelector('.fields-container');
        container.innerHTML = '';
        
        if (this.currentNode.fields.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-lg font-medium">No fields defined yet</p>
                    <p class="text-sm mt-2">Click "Add Field" to get started with your data model</p>
                </div>
            `;
            return;
        }
        
        this.currentNode.fields.forEach((field, index) => {
            const fieldElement = this.createFieldElement(field, index);
            container.appendChild(fieldElement);
        });
    }

    /**
     * Create field element
     */
    createFieldElement(field, index) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'field-item bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all';
        fieldDiv.dataset.fieldId = field.id;
        
        const typeIcon = this.getTypeIcon(field.type);
        
        fieldDiv.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        Field Name
                    </label>
                    <input type="text" 
                           class="field-name w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.name}" 
                           placeholder="field_name">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span class="mr-2">${typeIcon}</span>
                        Type
                    </label>
                    <select class="field-type w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all">
                        ${this.supportedTypes.map(type => 
                            `<option value="${type}" ${field.type === type ? 'selected' : ''}>${this.getTypeIcon(type)} ${type}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Initial Value
                    </label>
                    <input type="text" 
                           class="field-value w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.initialValue}" 
                           placeholder="default value">
                </div>
                
                <div class="flex items-center justify-between">
                    <label class="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                        <input type="checkbox" 
                               class="field-list mr-2 text-violet-500 focus:ring-violet-500 rounded" 
                               ${field.isList ? 'checked' : ''}>
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        Is List
                    </label>
                    <button class="remove-field-btn text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all ml-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Setup field event listeners
        this.setupFieldEventListeners(fieldDiv, field);
        
        return fieldDiv;
    }

    /**
     * Get icon for data type (same as in CanvasRenderer)
     */
    getTypeIcon(type) {
        const icons = {
            'String': '📝',
            'Number': '🔢',
            'Boolean': '☑️',
            'Date': '📅',
            'Object': '📦',
            'Array': '📋',
            'Text': '📄',
            'Email': '📧',
            'URL': '🔗',
            'Phone': '📞',
            'Currency': '💰'
        };
        return icons[type] || '📝';
    }

    /**
     * Setup event listeners for field element
     */
    setupFieldEventListeners(fieldElement, field) {
        const fieldId = field.id;
        
        // Field name change
        fieldElement.querySelector('.field-name').addEventListener('input', (e) => {
            this.currentNode.updateField(fieldId, { name: e.target.value });
        });
        
        // Field type change
        fieldElement.querySelector('.field-type').addEventListener('change', (e) => {
            this.currentNode.updateField(fieldId, { type: e.target.value });
        });
        
        // Field value change
        fieldElement.querySelector('.field-value').addEventListener('input', (e) => {
            this.currentNode.updateField(fieldId, { initialValue: e.target.value });
        });
        
        // Is list checkbox
        fieldElement.querySelector('.field-list').addEventListener('change', (e) => {
            this.currentNode.updateField(fieldId, { isList: e.target.checked });
        });
        
        // Remove field button
        fieldElement.querySelector('.remove-field-btn').addEventListener('click', () => {
            this.removeField(fieldId);
        });
    }

    /**
     * Add new field
     */
    addField() {
        const newField = this.currentNode.addField({
            name: `field_${this.currentNode.fields.length}`,
            type: 'String',
            initialValue: '',
            isList: false
        });
        
        this.renderFields();
    }

    /**
     * Remove field
     */
    removeField(fieldId) {
        this.currentNode.removeField(fieldId);
        this.renderFields();
    }

    /**
     * Save changes and close editor
     */
    saveChanges() {
        // Emit event to trigger re-render
        this.eventBus.emit('datamodel.updated', {
            node: this.currentNode
        });
        
        // Close editor
        this.close();
    }
}
