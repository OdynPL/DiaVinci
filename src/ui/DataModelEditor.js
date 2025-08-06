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
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                Model Name
                            </label>
                            <input type="text" 
                                   class="model-name-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                                   value="${this.currentNode.label}" 
                                   placeholder="Enter model name"
                                   maxlength="50"
                                   title="${this.currentNode.label}">
                        </div>
                        <div class="flex-shrink-0">
                            <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                                </svg>
                                Model ID
                            </label>
                            <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg">
                                <div class="px-4 py-2 text-sm text-gray-600 font-mono flex-1 min-w-0">
                                    <span class="truncate block" title="${this.currentNode.id}">${this.currentNode.id}</span>
                                </div>
                                <button class="copy-id-btn px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors" title="Copy ID">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs Navigation -->
                <div class="border-b border-gray-200 flex-shrink-0">
                    <nav class="flex px-6">
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="properties">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Fields
                        </button>
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="json">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                            JSON
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
                            
                            <div class="fields-container pb-6">
                                <!-- Fields will be rendered here -->
                            </div>
                            
                            <!-- Validation Summary -->
                            <div class="validation-summary hidden bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                                <div class="flex items-center mb-2">
                                    <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
                                    </svg>
                                    <h4 class="text-sm font-medium text-red-800">Validation Errors</h4>
                                </div>
                                <div class="validation-errors text-sm text-red-700">
                                    <!-- Validation errors will be listed here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- JSON Tab -->
                    <div class="tab-content hidden" data-tab="json">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                    </svg>
                                    <h3 class="text-lg font-medium text-gray-900">JSON Schema</h3>
                                </div>
                                <div class="flex gap-2">
                                    <button class="import-json-btn bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                                        </svg>
                                        Import JSON
                                    </button>
                                    <button class="copy-json-btn bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                        </svg>
                                        Copy JSON
                                    </button>
                                </div>
                            </div>
                            
                            <div class="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
                                <div class="flex items-center text-sm text-gray-600 mb-2">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    You can edit the JSON below or paste your own schema to import fields
                                </div>
                            </div>
                            
                            <div class="json-container">
                                <textarea class="json-editor w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono text-sm bg-gray-50" 
                                          placeholder="JSON schema will appear here..."
                                          spellcheck="false"></textarea>
                            </div>
                            
                            <div class="json-validation-message mt-2 text-sm hidden"></div>
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
        
        // Initialize validation state
        this.updateSaveButtonState();
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
        
        // Model name input with validation
        this.modal.querySelector('.model-name-input').addEventListener('input', (e) => {
            const newName = e.target.value;
            this.currentNode.setLabel(newName);
            
            // Validate model name
            if (!newName || newName.trim() === '') {
                e.target.classList.add('border-red-500', 'bg-red-50');
                e.target.title = 'Model name is required';
            } else if (newName.length > 50) {
                e.target.classList.add('border-red-500', 'bg-red-50');
                e.target.title = 'Model name cannot exceed 50 characters';
            } else {
                e.target.classList.remove('border-red-500', 'bg-red-50');
                e.target.classList.add('border-gray-300');
                e.target.title = newName;
            }
            
            this.updateSaveButtonState();
        });
        
        // Copy ID button
        this.modal.querySelector('.copy-id-btn').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(this.currentNode.id);
                // Show temporary feedback
                const button = this.modal.querySelector('.copy-id-btn');
                const originalHTML = button.innerHTML;
                button.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                `;
                button.classList.add('text-green-500');
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('text-green-500');
                }, 1500);
            } catch (error) {
                console.error('Failed to copy ID:', error);
            }
        });
        
        // JSON tab event listeners
        this.modal.querySelector('.import-json-btn').addEventListener('click', () => this.importFromJSON());
        this.modal.querySelector('.copy-json-btn').addEventListener('click', () => this.copyJSONToClipboard());
        this.modal.querySelector('.json-editor').addEventListener('input', () => this.validateJSON());
        
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
        
        // Update JSON content when switching to JSON tab
        if (tabName === 'json') {
            this.updateJSONContent();
        }
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
        headerDiv.className = 'field-header bg-gray-50 px-3 py-2 rounded-t-lg border border-gray-200';
        headerDiv.innerHTML = `
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-1">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/>
                        </svg>
                        #
                    </label>
                </div>
                <div class="col-span-4">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        Field Name
                    </label>
                </div>
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        Type
                    </label>
                </div>
                <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-700 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Initial Value
                    </label>
                </div>
                <div class="col-span-3">
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
        fieldsWrapper.className = 'fields-wrapper bg-white border-l border-r border-b border-gray-200 rounded-b-lg sortable-fields';
        
        // Add all field rows
        this.currentNode.fields.forEach((field, index) => {
            const fieldElement = this.createFieldElement(field, index);
            fieldsWrapper.appendChild(fieldElement);
        });
        
        container.appendChild(fieldsWrapper);
        
        // Initialize drag and drop
        this.initializeDragAndDrop(fieldsWrapper);
    }

    /**
     * Create field element
     */
    createFieldElement(field, index) {
        const fieldDiv = document.createElement('div');
        const borderClass = index === 0 ? '' : 'border-t border-gray-200';
        fieldDiv.className = `field-item px-3 py-2 hover:bg-gray-50 transition-all cursor-move ${borderClass} draggable-field`;
        fieldDiv.dataset.fieldId = field.id;
        fieldDiv.dataset.fieldIndex = index;
        fieldDiv.draggable = true;
        
        const typeIcon = this.getTypeIcon(field.type);
        
        fieldDiv.innerHTML = `
            <div class="grid grid-cols-12 gap-3 items-center">
                <div class="col-span-1 flex items-center">
                    <div class="drag-handle flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 cursor-move mr-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                        </svg>
                    </div>
                    <span class="field-number text-xs font-medium text-gray-500 bg-gray-100 px-1 py-1 rounded-full min-w-[20px] text-center">${index + 1}</span>
                </div>
                
                <div class="col-span-4">
                    <input type="text" 
                           class="field-name w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.name}" 
                           placeholder="field_name"
                           maxlength="25"
                           title="${field.name}">
                </div>
                
                <div class="col-span-2">
                    <select class="field-type w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all">
                        ${this.supportedTypes.map(type => 
                            `<option value="${type}" ${field.type === type ? 'selected' : ''}>${this.getTypeIcon(type)} ${type}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    ${this.createInitialValueInput(field)}
                </div>
                
                <div class="col-span-3 flex items-center justify-between gap-2">
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md flex-1">
                        <input type="checkbox" 
                               class="field-required mr-1 text-violet-500 focus:ring-violet-500 rounded" 
                               ${field.required ? 'checked' : ''}>
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="whitespace-nowrap">Required</span>
                    </label>
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md flex-1">
                        <input type="checkbox" 
                               class="field-readonly mr-1 text-violet-500 focus:ring-violet-500 rounded" 
                               ${field.readOnly ? 'checked' : ''}>
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <span class="whitespace-nowrap">Read Only</span>
                    </label>
                    <button class="remove-field-btn text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-all flex-shrink-0">
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
     * Create appropriate input field based on data type
     */
    createInitialValueInput(field) {
        const baseClasses = "field-value w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all";
        
        switch (field.type) {
            case 'Date':
                return `
                    <input type="date" 
                           class="${baseClasses}" 
                           value="${this.formatDateForInput(field.initialValue)}" 
                           placeholder="YYYY-MM-DD">
                `;
                
            case 'Number':
            case 'Currency':
                return `
                    <input type="number" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="0" 
                           step="any">
                `;
                
            case 'Boolean':
                return `
                    <select class="${baseClasses}">
                        <option value="">Select...</option>
                        <option value="true" ${field.initialValue === 'true' ? 'selected' : ''}>True</option>
                        <option value="false" ${field.initialValue === 'false' ? 'selected' : ''}>False</option>
                    </select>
                `;
                
            case 'Email':
                return `
                    <input type="email" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="user@example.com">
                `;
                
            case 'URL':
                return `
                    <input type="url" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="https://example.com">
                `;
                
            case 'Phone':
                return `
                    <input type="tel" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="+1234567890">
                `;
                
            case 'Object':
                return `
                    <textarea class="${baseClasses} h-16 resize-none font-mono text-xs" 
                              placeholder='{"key": "value"}'>${field.initialValue}</textarea>
                `;
                
            case 'Array':
                return `
                    <textarea class="${baseClasses} h-16 resize-none font-mono text-xs" 
                              placeholder='["item1", "item2"]'>${field.initialValue}</textarea>
                `;
                
            case 'Text':
                return `
                    <textarea class="${baseClasses} h-16 resize-none" 
                              placeholder="Long text content...">${field.initialValue}</textarea>
                `;
                
            default: // String and others
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="default value">
                `;
        }
    }

    /**
     * Format date value for HTML date input
     */
    formatDateForInput(dateValue) {
        if (!dateValue) return '';
        
        try {
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) return '';
            
            // Format as YYYY-MM-DD for HTML date input
            return date.toISOString().split('T')[0];
        } catch {
            return '';
        }
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
        
        // Field name change with comprehensive validation
        fieldElement.querySelector('.field-name').addEventListener('input', (e) => {
            const newName = e.target.value.trim();
            this.validateAndUpdateFieldName(e.target, fieldId, newName);
        });
        
        // Field name blur validation (more thorough)
        fieldElement.querySelector('.field-name').addEventListener('blur', (e) => {
            const newName = e.target.value.trim();
            this.validateAndUpdateFieldName(e.target, fieldId, newName, true);
        });
        
        // Field type change with value validation
        fieldElement.querySelector('.field-type').addEventListener('change', (e) => {
            const newType = e.target.value;
            this.updateFieldType(fieldId, newType);
            // Re-render to update input type
            this.renderFields();
        });
        
        // Field value change with type-specific validation
        const valueInput = fieldElement.querySelector('.field-value');
        valueInput.addEventListener('input', (e) => {
            this.validateAndUpdateFieldValue(e.target, fieldId, e.target.value);
        });
        
        valueInput.addEventListener('blur', (e) => {
            this.validateAndUpdateFieldValue(e.target, fieldId, e.target.value, true);
        });
        
        // Required checkbox
        fieldElement.querySelector('.field-required').addEventListener('change', (e) => {
            this.currentNode.updateField(fieldId, { required: e.target.checked });
            this.updateSaveButtonState();
        });
        
        // Read Only checkbox
        fieldElement.querySelector('.field-readonly').addEventListener('change', (e) => {
            this.currentNode.updateField(fieldId, { readOnly: e.target.checked });
            this.updateSaveButtonState();
        });
        
        // Remove field button
        fieldElement.querySelector('.remove-field-btn').addEventListener('click', () => {
            this.removeField(fieldId);
        });
    }

    /**
     * Validate and update field name
     */
    validateAndUpdateFieldName(inputElement, fieldId, newName, showAllErrors = false) {
        const field = this.currentNode.getField(fieldId);
        if (!field) return;
        
        // Create temporary field for validation
        const tempField = { ...field, name: newName };
        const errors = this.currentNode.validateField(tempField);
        
        // Filter errors for name-specific issues
        const nameErrors = errors.filter(error => 
            error.includes('Field name') || error.includes('unique') || error.includes('reserved')
        );
        
        if (nameErrors.length > 0) {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, nameErrors[0]);
        } else {
            inputElement.classList.remove('border-red-500', 'bg-red-50');
            inputElement.classList.add('border-gray-300');
            this.hideFieldValidationError(inputElement);
            
            // Update the field if valid
            try {
                this.currentNode.updateField(fieldId, { name: newName });
            } catch (error) {
                inputElement.classList.add('border-red-500', 'bg-red-50');
                this.showFieldValidationError(inputElement, error.message);
            }
        }
        
        this.updateSaveButtonState();
    }

    /**
     * Validate and update field value
     */
    validateAndUpdateFieldValue(inputElement, fieldId, newValue, showAllErrors = false) {
        const field = this.currentNode.getField(fieldId);
        if (!field) return;
        
        // Validate the value based on field type
        const errors = this.currentNode.validateInitialValue(newValue, field.type);
        
        if (errors.length > 0) {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, errors[0]);
        } else {
            inputElement.classList.remove('border-red-500', 'bg-red-50');
            inputElement.classList.add('border-gray-300');
            this.hideFieldValidationError(inputElement);
            
            // Update the field if valid
            this.currentNode.updateField(fieldId, { initialValue: newValue });
        }
        
        this.updateSaveButtonState();
    }

    /**
     * Update field type and re-validate value
     */
    updateFieldType(fieldId, newType) {
        const field = this.currentNode.getField(fieldId);
        if (!field) return;
        
        // Update the type
        this.currentNode.updateField(fieldId, { type: newType });
        
        // Re-validate the current value with new type
        if (field.initialValue) {
            const errors = this.currentNode.validateInitialValue(field.initialValue, newType);
            if (errors.length > 0) {
                // Clear invalid value for new type
                this.currentNode.updateField(fieldId, { initialValue: '' });
            }
        }
        
        this.updateSaveButtonState();
    }

    /**
     * Update save button state based on validation
     */
    updateSaveButtonState() {
        const saveBtn = this.modal.querySelector('.save-btn');
        const validation = this.currentNode.isValidForSave();
        
        if (validation.valid) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.add('hover:from-violet-600', 'hover:to-purple-700');
            saveBtn.title = '';
            this.hideValidationSummary();
        } else {
            saveBtn.disabled = true;
            saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.remove('hover:from-violet-600', 'hover:to-purple-700');
            saveBtn.title = validation.error || 'Please fix validation errors';
            this.showValidationSummary(validation);
        }
    }

    /**
     * Show validation summary
     */
    showValidationSummary(validation) {
        const summaryDiv = this.modal.querySelector('.validation-summary');
        const errorsDiv = this.modal.querySelector('.validation-errors');
        
        if (!summaryDiv || !errorsDiv) return;
        
        let errorHTML = `<div class="mb-2"><strong>General:</strong> ${validation.error}</div>`;
        
        if (validation.fieldErrors) {
            errorHTML += '<div><strong>Field Errors:</strong></div><ul class="list-disc list-inside ml-4 space-y-1">';
            
            Object.keys(validation.fieldErrors).forEach(fieldId => {
                const field = this.currentNode.getField(fieldId);
                const fieldName = field ? field.name || 'Unnamed Field' : 'Unknown Field';
                const errors = validation.fieldErrors[fieldId];
                
                errors.forEach(error => {
                    errorHTML += `<li><strong>${fieldName}:</strong> ${error}</li>`;
                });
            });
            
            errorHTML += '</ul>';
        }
        
        errorsDiv.innerHTML = errorHTML;
        summaryDiv.classList.remove('hidden');
    }

    /**
     * Hide validation summary
     */
    hideValidationSummary() {
        const summaryDiv = this.modal.querySelector('.validation-summary');
        if (summaryDiv) {
            summaryDiv.classList.add('hidden');
        }
    }

    /**
     * Validate field name uniqueness
     */
    validateFieldNameUniqueness(fieldName, excludeFieldId = null) {
        return this.currentNode.isFieldNameUnique(fieldName, excludeFieldId);
    }

    /**
     * Show field validation error
     */
    showFieldValidationError(inputElement, message) {
        // Remove existing error message
        this.hideFieldValidationError(inputElement);
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error-message absolute z-10 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs mt-1 shadow-sm';
        errorDiv.textContent = message;
        errorDiv.style.top = '100%';
        errorDiv.style.left = '0';
        
        // Position relative to input
        const container = inputElement.parentElement;
        container.style.position = 'relative';
        container.appendChild(errorDiv);
    }

    /**
     * Hide field validation error
     */
    hideFieldValidationError(inputElement) {
        const container = inputElement.parentElement;
        const existingError = container.querySelector('.field-error-message');
        if (existingError) {
            container.removeChild(existingError);
        }
    }

    /**
     * Generate unique field name
     */
    generateUniqueFieldName(baseName = 'field_Name') {
        return this.currentNode.generateUniqueFieldName(baseName);
    }

    /**
     * Add new field
     */
    addField() {
        const uniqueName = this.currentNode.generateUniqueFieldName('field_Name');
        
        const newField = this.currentNode.addField({
            name: uniqueName,
            type: 'String',
            initialValue: '',
            required: false,
            readOnly: false
        });
        
        this.renderFields();
        this.updateSaveButtonState();
    }

    /**
     * Remove field
     */
    removeField(fieldId) {
        this.currentNode.removeField(fieldId);
        this.renderFields();
        this.updateSaveButtonState();
    }

    /**
     * Save changes and close editor
     */
    saveChanges() {
        // Final validation before saving
        const validation = this.currentNode.isValidForSave();
        
        if (!validation.valid) {
            // Show validation error
            alert(`Cannot save: ${validation.error}`);
            
            // If there are field errors, highlight them
            if (validation.fieldErrors) {
                Object.keys(validation.fieldErrors).forEach(fieldId => {
                    const fieldElement = this.modal.querySelector(`[data-field-id="${fieldId}"]`);
                    if (fieldElement) {
                        const nameInput = fieldElement.querySelector('.field-name');
                        const valueInput = fieldElement.querySelector('.field-value');
                        
                        if (nameInput) nameInput.classList.add('border-red-500', 'bg-red-50');
                        if (valueInput) valueInput.classList.add('border-red-500', 'bg-red-50');
                    }
                });
            }
            
            return; // Don't save if validation fails
        }
        
        // Emit event to trigger re-render
        this.eventBus.emit('datamodel.updated', {
            node: this.currentNode
        });
        
        // Close editor
        this.close();
    }

    /**
     * Initialize drag and drop functionality for field reordering
     */
    initializeDragAndDrop(container) {
        let draggedElement = null;
        let draggedIndex = null;
        
        container.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('draggable-field')) {
                draggedElement = e.target;
                draggedIndex = parseInt(e.target.dataset.fieldIndex);
                e.target.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', e.target.outerHTML);
            }
        });
        
        container.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('draggable-field')) {
                e.target.style.opacity = '';
                draggedElement = null;
                draggedIndex = null;
                
                // Remove drag indicators
                container.querySelectorAll('.drag-over').forEach(el => {
                    el.classList.remove('drag-over');
                });
            }
        });
        
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const afterElement = this.getDragAfterElement(container, e.clientY);
            const dragging = container.querySelector('.draggable-field[style*="opacity"]');
            
            if (afterElement == null) {
                container.appendChild(dragging);
            } else {
                container.insertBefore(dragging, afterElement);
            }
        });
        
        container.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('draggable-field') && e.target !== draggedElement) {
                e.target.classList.add('drag-over');
            }
        });
        
        container.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('draggable-field')) {
                e.target.classList.remove('drag-over');
            }
        });
        
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (!draggedElement) return;
            
            // Calculate new index
            const allFields = Array.from(container.querySelectorAll('.draggable-field'));
            const newIndex = allFields.indexOf(draggedElement);
            
            if (newIndex !== -1 && newIndex !== draggedIndex) {
                // Reorder fields in the data model
                this.reorderFields(draggedIndex, newIndex);
            }
            
            // Remove drag indicators
            container.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
        });
        
        // Add CSS for drag over effect
        const style = document.createElement('style');
        style.textContent = `
            .draggable-field.drag-over {
                border-top: 3px solid #8b5cf6 !important;
                background-color: #f3f4f6 !important;
            }
            .draggable-field[style*="opacity"] {
                background-color: #f9fafb !important;
                border: 2px dashed #d1d5db !important;
            }
        `;
        if (!document.head.querySelector('style[data-drag-styles]')) {
            style.setAttribute('data-drag-styles', 'true');
            document.head.appendChild(style);
        }
    }
    
    /**
     * Get the element after which the dragged element should be inserted
     */
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-field:not([style*="opacity"])')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    /**
     * Reorder fields in the data model
     */
    reorderFields(fromIndex, toIndex) {
        if (fromIndex === toIndex) return;
        
        // Create a copy of the fields array
        const fields = [...this.currentNode.fields];
        
        // Remove the field from its current position
        const [movedField] = fields.splice(fromIndex, 1);
        
        // Insert it at the new position
        fields.splice(toIndex, 0, movedField);
        
        // Update the node's fields
        this.currentNode.fields = fields;
        
        // Re-render to update field numbers and maintain state
        this.renderFields();
    }

    /**
     * Generate JSON schema from current fields
     */
    generateJSONSchema() {
        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: `#/datamodel/${this.currentNode.id}`,
            type: "object",
            title: this.currentNode.label || "DataModel",
            description: `Data model schema for ${this.currentNode.label || 'DataModel'}`,
            properties: {},
            required: [],
            additionalProperties: false
        };

        // Validate field names for uniqueness before generating
        const fieldNames = new Set();
        const duplicateFields = [];
        
        this.currentNode.fields.forEach(field => {
            const fieldName = field.name.trim();
            if (!fieldName) return; // Skip empty field names
            
            if (fieldNames.has(fieldName.toLowerCase())) {
                duplicateFields.push(fieldName);
                return;
            }
            fieldNames.add(fieldName.toLowerCase());

            const property = {
                type: this.mapFieldTypeToJSON(field.type),
                description: `${fieldName} field`
            };

            // Add format for special types
            if (field.type === 'Email') {
                property.format = 'email';
            } else if (field.type === 'URL') {
                property.format = 'uri';
            } else if (field.type === 'Date') {
                property.format = 'date-time';
            } else if (field.type === 'Phone') {
                property.pattern = '^[+]?[1-9]?[0-9]{7,15}$';
            }

            // Add default value if provided and valid
            if (field.initialValue && field.initialValue.trim() !== '') {
                try {
                    property.default = this.parseDefaultValue(field.initialValue, field.type);
                } catch (error) {
                    // If parsing fails, add as string with comment
                    property.default = field.initialValue;
                    property.description += ' (default value may need validation)';
                }
            }

            // Add to required array if field is required
            if (field.required) {
                schema.required.push(fieldName);
            }

            // Add readOnly property
            if (field.readOnly) {
                property.readOnly = true;
            }

            schema.properties[fieldName] = property;
        });

        // Add metadata
        schema._metadata = {
            modelId: this.currentNode.id,
            generated: new Date().toISOString(),
            fieldCount: Object.keys(schema.properties).length,
            duplicateFields: duplicateFields.length > 0 ? duplicateFields : undefined
        };

        return schema;
    }

    /**
     * Map internal field types to JSON schema types
     */
    mapFieldTypeToJSON(fieldType) {
        const typeMapping = {
            'String': 'string',
            'Number': 'number',
            'Boolean': 'boolean',
            'Date': 'string',
            'Object': 'object',
            'Array': 'array',
            'Text': 'string',
            'Email': 'string',
            'URL': 'string',
            'Phone': 'string',
            'Currency': 'number'
        };
        return typeMapping[fieldType] || 'string';
    }

    /**
     * Map JSON schema types back to internal field types
     */
    mapJSONTypeToField(jsonType, format = null) {
        if (format) {
            const formatMapping = {
                'email': 'Email',
                'uri': 'URL',
                'date': 'Date',
                'date-time': 'Date'
            };
            if (formatMapping[format]) {
                return formatMapping[format];
            }
        }

        const typeMapping = {
            'string': 'String',
            'number': 'Number',
            'integer': 'Number',
            'boolean': 'Boolean',
            'object': 'Object',
            'array': 'Array'
        };
        return typeMapping[jsonType] || 'String';
    }

    /**
     * Parse default value based on field type
     */
    parseDefaultValue(value, type) {
        try {
            switch (type) {
                case 'Number':
                case 'Currency':
                    return parseFloat(value) || value;
                case 'Boolean':
                    return value.toLowerCase() === 'true';
                case 'Object':
                case 'Array':
                    return JSON.parse(value);
                default:
                    return value;
            }
        } catch (e) {
            return value;
        }
    }

    /**
     * Update JSON content in the editor
     */
    updateJSONContent() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        if (jsonEditor) {
            const schema = this.generateJSONSchema();
            jsonEditor.value = JSON.stringify(schema, null, 2);
            this.clearValidationMessage();
        }
    }

    /**
     * Import fields from JSON schema
     */
    importFromJSON() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        const jsonText = jsonEditor.value.trim();

        if (!jsonText) {
            this.showValidationMessage('Please enter JSON schema to import', 'error');
            return;
        }

        try {
            const schema = JSON.parse(jsonText);
            
            // Enhanced validation
            if (!this.validateJSONSchema(schema)) {
                return; // Error messages are shown in validateJSONSchema
            }

            // Clear existing fields
            this.currentNode.fields = [];

            // Track field names to ensure uniqueness
            const fieldNames = new Set();
            let duplicateCount = 0;

            // Import fields from schema
            Object.entries(schema.properties).forEach(([fieldName, property]) => {
                let finalFieldName = fieldName;
                
                // Ensure unique field names
                if (fieldNames.has(fieldName.toLowerCase())) {
                    duplicateCount++;
                    finalFieldName = `${fieldName}_${duplicateCount}`;
                    while (fieldNames.has(finalFieldName.toLowerCase())) {
                        duplicateCount++;
                        finalFieldName = `${fieldName}_${duplicateCount}`;
                    }
                }
                fieldNames.add(finalFieldName.toLowerCase());

                const fieldType = this.mapJSONTypeToField(property.type, property.format);
                const isRequired = Array.isArray(schema.required) && schema.required.includes(fieldName);
                const isReadOnly = property.readOnly === true;
                
                let initialValue = '';
                if (property.default !== undefined) {
                    try {
                        initialValue = typeof property.default === 'object' 
                            ? JSON.stringify(property.default) 
                            : String(property.default);
                    } catch (error) {
                        initialValue = '';
                    }
                }

                this.currentNode.addField({
                    name: finalFieldName,
                    type: fieldType,
                    initialValue: initialValue,
                    required: isRequired,
                    readOnly: isReadOnly
                });
            });

            // Update model title if provided
            if (schema.title && schema.title !== 'DataModel') {
                this.currentNode.setLabel(schema.title);
                this.modal.querySelector('.model-name-input').value = schema.title;
            }

            const importedCount = Object.keys(schema.properties).length;
            let message = `Successfully imported ${importedCount} fields`;
            if (duplicateCount > 0) {
                message += ` (${duplicateCount} duplicate names were auto-renamed)`;
            }
            
            this.showValidationMessage(message, 'success');
            
            // Switch to Fields tab to see the imported fields
            this.switchTab('properties');
            this.renderFields();

        } catch (error) {
            this.showValidationMessage(`Invalid JSON: ${error.message}`, 'error');
        }
    }

    /**
     * Validate JSON schema structure
     */
    validateJSONSchema(schema) {
        // Check basic structure
        if (typeof schema !== 'object' || schema === null) {
            this.showValidationMessage('Schema must be a valid JSON object', 'error');
            return false;
        }

        if (!schema.properties || typeof schema.properties !== 'object') {
            this.showValidationMessage('Schema must contain a "properties" object', 'error');
            return false;
        }

        if (Object.keys(schema.properties).length === 0) {
            this.showValidationMessage('Schema must contain at least one property', 'error');
            return false;
        }

        // Validate each property
        for (const [fieldName, property] of Object.entries(schema.properties)) {
            if (!fieldName || fieldName.trim() === '') {
                this.showValidationMessage('Field names cannot be empty', 'error');
                return false;
            }

            if (!property.type) {
                this.showValidationMessage(`Field "${fieldName}" must have a type`, 'error');
                return false;
            }

            const validTypes = ['string', 'number', 'integer', 'boolean', 'object', 'array'];
            if (!validTypes.includes(property.type)) {
                this.showValidationMessage(`Field "${fieldName}" has invalid type: ${property.type}`, 'error');
                return false;
            }
        }

        // Validate required array if present
        if (schema.required && !Array.isArray(schema.required)) {
            this.showValidationMessage('"required" must be an array', 'error');
            return false;
        }

        if (schema.required) {
            for (const requiredField of schema.required) {
                if (!schema.properties[requiredField]) {
                    this.showValidationMessage(`Required field "${requiredField}" not found in properties`, 'error');
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Copy JSON to clipboard
     */
    async copyJSONToClipboard() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        
        try {
            await navigator.clipboard.writeText(jsonEditor.value);
            this.showValidationMessage('JSON copied to clipboard', 'success');
        } catch (error) {
            // Fallback for older browsers
            jsonEditor.select();
            document.execCommand('copy');
            this.showValidationMessage('JSON copied to clipboard', 'success');
        }
    }

    /**
     * Validate JSON syntax and schema
     */
    validateJSON() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        const jsonText = jsonEditor.value.trim();

        if (!jsonText) {
            this.clearValidationMessage();
            return;
        }

        try {
            const schema = JSON.parse(jsonText);
            
            // Basic JSON syntax is valid, now validate schema structure
            if (this.validateJSONSchema(schema)) {
                // Additional validation checks
                const warnings = [];
                
                // Check for potential issues
                if (!schema.title) {
                    warnings.push('Missing title');
                }
                
                if (!schema.description) {
                    warnings.push('Missing description');
                }
                
                if (Object.keys(schema.properties).length === 0) {
                    warnings.push('No properties defined');
                }
                
                // Check for duplicate field names (case-insensitive)
                const fieldNames = Object.keys(schema.properties);
                const lowerCaseNames = fieldNames.map(name => name.toLowerCase());
                const duplicates = fieldNames.filter((name, index) => 
                    lowerCaseNames.indexOf(name.toLowerCase()) !== index
                );
                
                if (duplicates.length > 0) {
                    warnings.push(`Duplicate field names: ${duplicates.join(', ')}`);
                }
                
                let message = 'Valid JSON Schema';
                if (warnings.length > 0) {
                    message += ` (Warnings: ${warnings.join(', ')})`;
                }
                
                this.showValidationMessage(message, warnings.length > 0 ? 'warning' : 'success');
            }
            // Error messages are already shown by validateJSONSchema
            
        } catch (error) {
            this.showValidationMessage(`Invalid JSON: ${error.message}`, 'error');
        }
    }

    /**
     * Show validation message
     */
    showValidationMessage(message, type) {
        const messageElement = this.modal.querySelector('.json-validation-message');
        messageElement.textContent = message;
        
        // Remove existing classes
        messageElement.classList.remove('text-red-600', 'text-green-600', 'text-yellow-600');
        
        // Add appropriate class based on type
        if (type === 'error') {
            messageElement.classList.add('text-red-600');
        } else if (type === 'warning') {
            messageElement.classList.add('text-yellow-600');
        } else {
            messageElement.classList.add('text-green-600');
        }
        
        messageElement.className = `json-validation-message mt-2 text-sm ${
            type === 'error' ? 'text-red-600' : 
            type === 'warning' ? 'text-yellow-600' : 
            'text-green-600'
        }`;
        messageElement.classList.remove('hidden');

        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.clearValidationMessage();
            }, 3000);
        }
    }

    /**
     * Clear validation message
     */
    clearValidationMessage() {
        const messageElement = this.modal.querySelector('.json-validation-message');
        messageElement.classList.add('hidden');
    }
}
