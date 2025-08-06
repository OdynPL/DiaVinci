/**
 * DataModelEditor - Editor for managing fields in DataModelNode
 */
class DataModelEditor {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentNode = null;
        this.isOpen = false;
        this.modal = null;
        this.activeTab = 'properties'; // Default active tab
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
            <div class="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[95vh] overflow-hidden border border-gray-200 flex flex-col">
                <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50 flex-shrink-0">
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
                
                <!-- Model Name Section -->
                <div class="px-6 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
                    <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        Model Name
                    </label>
                    <input type="text" 
                           class="model-name-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${this.currentNode.label}" 
                           placeholder="Enter model name">
                </div>

                <!-- Tabs Navigation -->
                <div class="border-b border-gray-200 flex-shrink-0">
                    <nav class="flex px-6">
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="properties">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Properties
                        </button>
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="settings">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            Settings
                        </button>
                    </nav>
                </div>
                
                <!-- Tab Content - Scrollable -->
                <div class="flex-1 overflow-y-auto min-h-0">
                    <!-- Properties Tab -->
                    <div class="tab-content" data-tab="properties">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4 sticky top-0 bg-white py-2 border-b border-gray-100">
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    <h3 class="text-lg font-medium text-gray-900">Fields</h3>
                                    <span class="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full field-count">${this.currentNode.fields.length}</span>
                                </div>
                                <button class="add-field-btn bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add Field
                                </button>
                            </div>
                            
                            <div class="fields-container space-y-3 pb-6">
                                <!-- Fields will be rendered here -->
                            </div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div class="tab-content hidden" data-tab="settings">
                        <div class="p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Model Settings</h3>
                            
                            <div class="space-y-6 pb-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea class="model-description w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                                              rows="3" 
                                              placeholder="Describe what this model represents..."></textarea>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Validation Rules</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded">
                                            <span class="text-sm text-gray-700">Require all fields</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded">
                                            <span class="text-sm text-gray-700">Enable validation</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded">
                                            <span class="text-sm text-gray-700">Allow null values</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Model Type</label>
                                    <select class="model-type w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all">
                                        <option value="entity">Entity</option>
                                        <option value="dto">Data Transfer Object</option>
                                        <option value="view">View Model</option>
                                        <option value="document">Document</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Fixed Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0">
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
        
        // Tab switching
        this.modal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });
        
        // Initialize tabs
        this.switchTab(this.activeTab);
        
        // Escape key to close
        this.escapeHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    /**
     * Switch between tabs
     */
    switchTab(tabName) {
        this.activeTab = tabName;
        
        // Update tab buttons
        this.modal.querySelectorAll('.tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabName;
            if (isActive) {
                btn.classList.add('border-violet-500', 'text-violet-600');
                btn.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700');
            } else {
                btn.classList.remove('border-violet-500', 'text-violet-600');
                btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700');
            }
        });
        
        // Update tab content
        this.modal.querySelectorAll('.tab-content').forEach(content => {
            const isActive = content.dataset.tab === tabName;
            if (isActive) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    /**
     * Render all fields
     */
    renderFields() {
        const container = this.modal.querySelector('.fields-container');
        container.innerHTML = '';
        
        // Update field count
        const fieldCount = this.modal.querySelector('.field-count');
        if (fieldCount) {
            fieldCount.textContent = this.currentNode.fields.length;
        }
        
        if (this.currentNode.fields.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="font-medium">No fields defined yet</p>
                    <p class="text-sm mt-2">Click "Add Field" to get started with your data model</p>
                </div>
            `;
            return;
        }

        // Add header row once at the top
        const headerDiv = document.createElement('div');
        headerDiv.className = 'field-header bg-gray-50 p-3 rounded-t-lg border border-gray-200 border-b-0';
        headerDiv.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                <div class="sm:col-span-1">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        Field Name
                    </label>
                </div>
                <div class="sm:col-span-1">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        Type
                    </label>
                </div>
                <div class="sm:col-span-1 lg:col-span-1">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Initial Value
                    </label>
                </div>
                <div class="sm:col-span-1 lg:col-span-1 xl:col-span-1">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                        </svg>
                        Options
                    </label>
                </div>
            </div>
        `;
        container.appendChild(headerDiv);

        // Create fields container with unified border
        const fieldsWrapper = document.createElement('div');
        fieldsWrapper.className = 'fields-wrapper bg-white border border-gray-200 border-t-0 rounded-b-lg';
        
        // Add all field rows
        this.currentNode.fields.forEach((field, index) => {
            const fieldElement = this.createFieldElement(field, index);
            fieldsWrapper.appendChild(fieldElement);
        });
        
        container.appendChild(fieldsWrapper);
    }

    /**
     * Create field element
     */
    createFieldElement(field, index) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = `field-item p-3 hover:bg-gray-50 transition-all ${index > 0 ? 'border-t border-gray-200' : ''}`;
        fieldDiv.dataset.fieldId = field.id;
        
        const typeIcon = this.getTypeIcon(field.type);
        
        fieldDiv.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-center">
                <div class="sm:col-span-1">
                    <input type="text" 
                           class="field-name w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.name}" 
                           placeholder="field_name">
                </div>
                
                <div class="sm:col-span-1">
                    <select class="field-type w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all">
                        ${this.supportedTypes.map(type => 
                            `<option value="${type}" ${field.type === type ? 'selected' : ''}>${this.getTypeIcon(type)} ${type}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="sm:col-span-1 lg:col-span-1">
                    <input type="text" 
                           class="field-value w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.initialValue}" 
                           placeholder="default value">
                </div>
                
                <div class="sm:col-span-1 lg:col-span-1 xl:col-span-1 flex items-center justify-between">
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-2 rounded-md">
                        <input type="checkbox" 
                               class="field-list mr-2 text-violet-500 focus:ring-violet-500 rounded" 
                               ${field.isList ? 'checked' : ''}>
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        List
                    </label>
                    <button class="remove-field-btn text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-all ml-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
