/**
 * DataModelEditor - Editor for managing fields in DataModelNode
 * Enhanced with security validations and input sanitization
 */
class DataModelEditor {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentNode = null;
        this.isOpen = false;
        this.modal = null;
        this.activeTab = 'properties'; // Default active tab
        this.supportedTypes = DataModelNode.getSupportedTypes();
        
        // Load InputValidator for security
        this.loadInputValidator();
    }

    /**
     * Load InputValidator utility for security
     */
    async loadInputValidator() {
        try {
            // InputValidator should be available globally
            if (typeof InputValidator === 'undefined') {
                console.warn('InputValidator not found - security features may be limited');
                this.inputValidator = null;
            } else {
                this.inputValidator = InputValidator;
            }
        } catch (error) {
            console.error('Failed to load InputValidator:', error);
            this.inputValidator = null;
        }
    }

    /**
     * Secure input validation and sanitization
     */
    validateAndSanitizeInput(text, type = 'fieldValue', fieldType = 'String') {
        if (!this.inputValidator) {
            // Fallback basic validation if InputValidator not available
            return {
                valid: true,
                errors: [],
                sanitized: text ? String(text).substring(0, 500) : '',
                needsSanitization: false
            };
        }
        
        return this.inputValidator.validateDataModelInput(text, type, fieldType);
    }

    /**
     * Get currency options for dropdown
     */
    getCurrencyOptions() {
        return [
            { code: 'USD', symbol: '$', name: 'US Dollar' },
            { code: 'EUR', symbol: '€', name: 'Euro' },
            { code: 'GBP', symbol: '£', name: 'British Pound' },
            { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
            { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
            { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
            { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
            { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
            { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
            { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
            { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
            { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
            { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
            { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
            { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
            { code: 'KRW', symbol: '₩', name: 'South Korean Won' }
        ];
    }

    /**
     * Get country code options for dropdown
     */
    getCountryCodeOptions() {
        return [
            { code: 'US', name: 'United States' },
            { code: 'GB', name: 'United Kingdom' },
            { code: 'DE', name: 'Germany' },
            { code: 'FR', name: 'France' },
            { code: 'IT', name: 'Italy' },
            { code: 'ES', name: 'Spain' },
            { code: 'PL', name: 'Poland' },
            { code: 'NL', name: 'Netherlands' },
            { code: 'BE', name: 'Belgium' },
            { code: 'CH', name: 'Switzerland' },
            { code: 'AT', name: 'Austria' },
            { code: 'SE', name: 'Sweden' },
            { code: 'NO', name: 'Norway' },
            { code: 'DK', name: 'Denmark' },
            { code: 'FI', name: 'Finland' },
            { code: 'JP', name: 'Japan' },
            { code: 'CN', name: 'China' },
            { code: 'IN', name: 'India' },
            { code: 'AU', name: 'Australia' },
            { code: 'CA', name: 'Canada' },
            { code: 'BR', name: 'Brazil' },
            { code: 'RU', name: 'Russia' },
            { code: 'KR', name: 'South Korea' }
        ];
    }

    /**
     * Get language code options for dropdown
     */
    getLanguageCodeOptions() {
        return [
            { code: 'en-US', name: 'English (US)' },
            { code: 'en-GB', name: 'English (UK)' },
            { code: 'de-DE', name: 'German' },
            { code: 'fr-FR', name: 'French' },
            { code: 'it-IT', name: 'Italian' },
            { code: 'es-ES', name: 'Spanish' },
            { code: 'pl-PL', name: 'Polish' },
            { code: 'nl-NL', name: 'Dutch' },
            { code: 'sv-SE', name: 'Swedish' },
            { code: 'no-NO', name: 'Norwegian' },
            { code: 'da-DK', name: 'Danish' },
            { code: 'fi-FI', name: 'Finnish' },
            { code: 'ja-JP', name: 'Japanese' },
            { code: 'zh-CN', name: 'Chinese (Simplified)' },
            { code: 'zh-TW', name: 'Chinese (Traditional)' },
            { code: 'ko-KR', name: 'Korean' },
            { code: 'pt-BR', name: 'Portuguese (Brazil)' },
            { code: 'pt-PT', name: 'Portuguese (Portugal)' },
            { code: 'ru-RU', name: 'Russian' },
            { code: 'ar-SA', name: 'Arabic' },
            { code: 'hi-IN', name: 'Hindi' }
        ];
    }

    /**
     * Get timezone options for dropdown
     */
    getTimezoneOptions() {
        return [
            { zone: 'UTC', name: 'UTC (Coordinated Universal Time)' },
            { zone: 'America/New_York', name: 'Eastern Time (US & Canada)' },
            { zone: 'America/Chicago', name: 'Central Time (US & Canada)' },
            { zone: 'America/Denver', name: 'Mountain Time (US & Canada)' },
            { zone: 'America/Los_Angeles', name: 'Pacific Time (US & Canada)' },
            { zone: 'Europe/London', name: 'London (GMT/BST)' },
            { zone: 'Europe/Paris', name: 'Paris (CET/CEST)' },
            { zone: 'Europe/Berlin', name: 'Berlin (CET/CEST)' },
            { zone: 'Europe/Rome', name: 'Rome (CET/CEST)' },
            { zone: 'Europe/Madrid', name: 'Madrid (CET/CEST)' },
            { zone: 'Europe/Warsaw', name: 'Warsaw (CET/CEST)' },
            { zone: 'Europe/Amsterdam', name: 'Amsterdam (CET/CEST)' },
            { zone: 'Europe/Stockholm', name: 'Stockholm (CET/CEST)' },
            { zone: 'Europe/Oslo', name: 'Oslo (CET/CEST)' },
            { zone: 'Europe/Copenhagen', name: 'Copenhagen (CET/CEST)' },
            { zone: 'Europe/Helsinki', name: 'Helsinki (EET/EEST)' },
            { zone: 'Europe/Moscow', name: 'Moscow (MSK)' },
            { zone: 'Asia/Tokyo', name: 'Tokyo (JST)' },
            { zone: 'Asia/Shanghai', name: 'Shanghai (CST)' },
            { zone: 'Asia/Kolkata', name: 'India Standard Time' },
            { zone: 'Asia/Dubai', name: 'Dubai (GST)' },
            { zone: 'Australia/Sydney', name: 'Sydney (AEST/AEDT)' },
            { zone: 'Australia/Melbourne', name: 'Melbourne (AEST/AEDT)' },
            { zone: 'Pacific/Auckland', name: 'Auckland (NZST/NZDT)' },
            { zone: 'America/Sao_Paulo', name: 'São Paulo (BRT)' },
            { zone: 'America/Toronto', name: 'Toronto (EST/EDT)' },
            { zone: 'America/Vancouver', name: 'Vancouver (PST/PDT)' }
        ];
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
        // Ensure Fields tab is always the default when opening
        this.activeTab = 'properties';
        this.createModal();
        this.renderFields();
    }

    /**
     * Close the editor
     */
    close() {
        // Check if there are unsaved changes with validation errors
        const validation = this.currentNode.isValidForSave();
        if (!validation.valid) {
            const shouldClose = confirm(`There are validation errors in this model:\n\n${validation.error}\n\nAre you sure you want to close without saving? All changes will be lost.`);
            if (!shouldClose) {
                return; // Don't close if user wants to fix errors
            }
        }
        
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
            <div class="bg-white rounded-xl shadow-2xl max-w-[95vw] min-w-[800px] w-full mx-4 max-h-[95vh] overflow-hidden border border-gray-200 flex flex-col">
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
                    <button class="close-btn text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg" 
                            title="Zamknij edytor bez zapisywania zmian">
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
                                   placeholder="${t('enterModelName')}"
                                   maxlength="50"
                                   title="Wprowadź nazwę modelu danych (maks. 50 znaków)">
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
                                data-tab="properties" title="Zarządzaj polami i właściwościami modelu danych">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Fields
                        </button>
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="json" title="Podgląd i edycja schematu JSON modelu danych">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                            JSON
                        </button>
                        <button class="tab-btn px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none" 
                                data-tab="settings" title="Ustawienia globalne i opcje modelu danych">
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
                                <button class="add-field-btn bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm"
                                        title="Dodaj nowe pole do modelu danych">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    ${t('addField')}
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
                                    <button class="import-json-btn bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm"
                                            title="Zastosuj wprowadzone zmiany w schemacie JSON">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                        Accept JSON
                                    </button>
                                    <button class="copy-json-btn bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center shadow-md hover:shadow-lg text-sm"
                                            title="Skopiuj schemat JSON do schowka">
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
                                    You can edit the JSON below or paste your own schema and click "Accept JSON" to apply changes
                                </div>
                            </div>
                            
                            <div class="json-container relative">
                                <div class="absolute left-0 top-0 bottom-0 w-14 bg-gray-100 border-r border-gray-300 rounded-l-lg flex flex-col text-xs text-gray-500 font-mono overflow-hidden">
                                    <div class="json-line-numbers flex-1 p-2 pt-3 text-right pr-2 leading-5">
                                        <div class="line-number" style="height: 20px; line-height: 20px;">1</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">2</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">3</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">4</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">5</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">6</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">7</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">8</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">9</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">10</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">11</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">12</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">13</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">14</div>
                                        <div class="line-number" style="height: 20px; line-height: 20px;">15</div>
                                    </div>
                                </div>
                                <textarea class="json-editor w-full h-96 pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono text-sm bg-gray-50" 
                                          placeholder="${t('jsonSchemaWillAppear')}"
                                          spellcheck="false"
                                          style="line-height: 20px; font-size: 13px;"
                                          title="Edytuj schemat JSON modelu danych - można go zaimportować lub skopiować"></textarea>
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
                                              placeholder="${t('describeModel')}"
                                              title="Opisz co ten model reprezentuje"></textarea>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Validation Rules</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded"
                                                   title="Ustaw wszystkie pola jako wymagane">
                                            <span class="text-sm text-gray-700">Require all fields</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded"
                                                   title="Włącz walidację wprowadzanych danych">
                                            <span class="text-sm text-gray-700">Enable validation</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" class="mr-2 text-violet-500 focus:ring-violet-500 rounded"
                                                   title="Zezwól na wartości puste (null) we wszystkich polach">
                                            <span class="text-sm text-gray-700">Allow null values</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Model Type</label>
                                    <select class="model-type w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                            title="Wybierz typ modelu danych">
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
                <div class="w-full flex items-center justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0">
                    <button class="cancel-btn px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Anuluj zmiany i zamknij edytor">
                        Cancel
                    </button>
                    <button class="save-btn px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                            title="Zapisz wszystkie zmiany w modelu danych">
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
        // Close button - with validation check
        this.modal.querySelector('.close-btn').addEventListener('click', () => this.close());
        this.modal.querySelector('.cancel-btn').addEventListener('click', () => this.close());
        
        // Click outside to close - only on the backdrop, not the modal content - with validation check
        this.modal.addEventListener('click', (e) => {
            // Only close if clicking directly on the modal backdrop, not on child elements
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Add field button
        this.modal.querySelector('.add-field-btn').addEventListener('click', () => this.addField());
        
        // Save button - enhanced validation
        this.modal.querySelector('.save-btn').addEventListener('click', () => this.saveChanges());
        
        // Model name input with security validation
        this.modal.querySelector('.model-name-input').addEventListener('input', (e) => {
            const rawName = e.target.value;
            
            // Security validation first
            const securityValidation = this.validateAndSanitizeInput(rawName, 'modelName');
            
            if (!securityValidation.valid) {
                e.target.classList.add('border-red-500', 'bg-red-50');
                e.target.title = 'Security violation: ' + securityValidation.errors.join(', ');
                this.updateSaveButtonState();
                return;
            }
            
            const newName = securityValidation.sanitized;
            
            // Update input with sanitized value if needed
            if (securityValidation.needsSanitization) {
                console.warn('Model name was sanitized:', { original: rawName, sanitized: newName });
                e.target.value = newName;
            }
            
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
        
        // Model name blur validation
        this.modal.querySelector('.model-name-input').addEventListener('blur', (e) => {
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
        this.modal.querySelector('.json-editor').addEventListener('input', (e) => {
            // Clear previous error highlighting when user starts typing
            this.clearErrorHighlighting();
            this.validateJSON();
            this.updateJSONLineNumbers(e.target);
            this.updateSaveButtonState(); // Update save button when JSON changes
        });
        
        // Add real-time JSON sync on blur (when user finishes editing)
        this.modal.querySelector('.json-editor').addEventListener('blur', (e) => {
            this.attemptJSONSync(e.target.value);
        });
        
        // Initialize JSON line numbers
        const jsonEditor = this.modal.querySelector('.json-editor');
        this.updateJSONLineNumbers(jsonEditor);
        
        // Tab switching
        this.modal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });
        
        // Initialize tabs
        this.switchTab(this.activeTab);
        
        // Escape key to close - with validation check
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
            // Also validate the current JSON immediately
            setTimeout(() => {
                this.validateJSON();
            }, 50);
        }
        
        // When switching from JSON tab, attempt to sync changes
        if (this.activeTab === 'json' && tabName !== 'json') {
            const jsonEditor = this.modal.querySelector('.json-editor');
            this.attemptJSONSync(jsonEditor.value);
        }
        
        // Update validation state when switching tabs
        this.updateSaveButtonState();
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
                    <p class="text-sm mt-2">${t('clickAddFieldToStart')}</p>
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
        
        // Update validation state after rendering
        this.updateSaveButtonState();
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
            <div class="grid grid-cols-12 gap-4 items-center">
                <div class="col-span-1 flex items-center">
                    <div class="drag-handle flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 cursor-move mr-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                        </svg>
                    </div>
                    <span class="field-number text-xs font-medium text-gray-500 bg-gray-100 px-1 py-1 rounded-full min-w-[20px] text-center">${index + 1}</span>
                </div>
                
                <div class="col-span-3">
                    <input type="text" 
                           class="field-name w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                           value="${field.name}" 
                           placeholder="${t('fieldNamePlaceholder2')}"
                           maxlength="25"
                           title="Nazwa pola (maks. 25 znaków) - używaj snake_case lub camelCase">
                </div>
                
                <div class="col-span-2">
                    <select class="field-type w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            title="Wybierz typ danych dla tego pola">
                        ${this.supportedTypes.map(type => 
                            `<option value="${type}" ${field.type === type ? 'selected' : ''}>${this.getTypeIcon(type)} ${this.translateFieldType(type)}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="col-span-2">
                    ${this.createInitialValueInput(field)}
                </div>
                
                <div class="col-span-4 flex items-center justify-between gap-2">
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md flex-1">
                        <input type="checkbox" 
                               class="field-required mr-2 text-violet-500 focus:ring-violet-500 rounded flex-shrink-0" 
                               ${field.required ? 'checked' : ''}
                               title="Oznacz to pole jako wymagane"">
                        <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="whitespace-nowrap text-xs">Required</span>
                    </label>
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md flex-1">
                        <input type="checkbox" 
                               class="field-nullable mr-2 text-blue-500 focus:ring-blue-500 rounded flex-shrink-0" 
                               ${field.nullable === true ? 'checked' : ''}
                               title="Pozwól na wartości puste (null) w tym polu">
                        <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                        </svg>
                        <span class="whitespace-nowrap text-xs">Nullable</span>
                    </label>
                    <label class="flex items-center text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded-md flex-1">
                        <input type="checkbox" 
                               class="field-readonly mr-2 text-amber-500 focus:ring-amber-500 rounded flex-shrink-0" 
                               ${field.readOnly ? 'checked' : ''}
                               title="Ustaw to pole jako tylko do odczytu">
                        <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <span class="whitespace-nowrap text-xs">Read Only</span>
                    </label>
                    <button class="remove-field-btn text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-all flex-shrink-0"
                            title="Usuń to pole z modelu danych">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;        // Setup field event listeners
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
                
            case 'DateTime':
            case 'Timestamp':
                return `
                    <input type="datetime-local" 
                           class="${baseClasses}" 
                           value="${this.formatDateTimeForInput(field.initialValue)}" 
                           placeholder="YYYY-MM-DDTHH:MM">
                `;
                
            case 'Time':
                return `
                    <input type="time" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="HH:MM">
                `;
                
            case 'Number':
            case 'Float':
            case 'Decimal':
                return `
                    <input type="number" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="0.00" 
                           step="any">
                `;
                
            case 'Currency':
                const currencies = this.getCurrencyOptions();
                const parsedValue = this.parseCurrencyValue(field.initialValue);
                return `
                    <div class="field-value flex gap-2">
                        <select class="currency-selector w-24 px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                title="Wybierz walutę dla wartości pieniężnej">
                            <option value="">¤</option>
                            ${currencies.map(curr => 
                                `<option value="${curr.code}" ${parsedValue.currency === curr.code ? 'selected' : ''}>${curr.symbol} ${curr.code}</option>`
                            ).join('')}
                        </select>
                        <input type="number" 
                               class="currency-amount flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" 
                               value="${parsedValue.amount}" 
                               placeholder="0.00" 
                               step="0.01">
                    </div>
                `;
                
            case 'Integer':
                return `
                    <input type="number" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="0" 
                           step="1">
                `;
                
            case 'Percentage':
                const percentValue = parseFloat(field.initialValue) || 0;
                return `
                    <div class="field-value">
                        <div class="flex items-center gap-3">
                            <input type="range" 
                                   class="percentage-slider flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                                   min="0" max="100" step="0.1"
                                   value="${percentValue}" 
                                   style="background: linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${percentValue}%, #e5e7eb ${percentValue}%, #e5e7eb 100%);">
                            <input type="number" 
                                   class="percentage-input w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" 
                                   value="${percentValue}" 
                                   min="0" max="100" step="0.1"
                                   placeholder="0-100">
                            <span class="text-sm text-gray-500 font-medium">%</span>
                        </div>
                    </div>
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
                
            case 'UUID':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="550e8400-e29b-41d4-a716-446655440000">
                `;
                
            case 'Password':
                return `
                    <input type="password" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="••••••••">
                `;
                
            case 'Color':
                return `
                    <input type="color" 
                           class="${baseClasses}" 
                           value="${field.initialValue || '#000000'}" 
                           placeholder="#000000">
                `;
                
            case 'IPv4':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="192.168.1.1">
                `;
                
            case 'IPv6':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="2001:0db8:85a3:0000:0000:8a2e:0370:7334">
                `;
                
            case 'MAC':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="00:1B:44:11:3A:B7">
                `;
                
            case 'Credit Card':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="4111-1111-1111-1111">
                `;
                
            case 'IBAN':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="GB29 NWBK 6016 1331 9268 19">
                `;
                
            case 'Country Code':
                const countries = this.getCountryCodeOptions();
                return `
                    <select class="country-selector w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            title="Wybierz kraj lub region">
                        <option value="">Select country...</option>
                        ${countries.map(country => 
                            `<option value="${country.code}" ${field.initialValue === country.code ? 'selected' : ''}>${country.code} - ${country.name}</option>`
                        ).join('')}
                    </select>
                `;
                
            case 'Language Code':
                const languages = this.getLanguageCodeOptions();
                return `
                    <select class="language-selector w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            title="Wybierz język lub lokalizację">
                        <option value="">Select language...</option>
                        ${languages.map(lang => 
                            `<option value="${lang.code}" ${field.initialValue === lang.code ? 'selected' : ''}>${lang.code} - ${lang.name}</option>`
                        ).join('')}
                    </select>
                `;
                
            case 'Timezone':
                const timezones = this.getTimezoneOptions();
                return `
                    <select class="timezone-selector w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            title="Wybierz strefę czasową">
                        <option value="">Select timezone...</option>
                        ${timezones.map(tz => 
                            `<option value="${tz.zone}" ${field.initialValue === tz.zone ? 'selected' : ''}>${tz.zone} - ${tz.name}</option>`
                        ).join('')}
                    </select>
                `;
                
            case 'Duration':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="PT15M (15 minutes)">
                `;
                
            case 'Base64':
                return `
                    <textarea class="${baseClasses} h-16 resize-none font-mono text-xs" 
                              placeholder="SGVsbG8gV29ybGQ=">${field.initialValue}</textarea>
                `;
                
            case 'Object':
            case 'JSON':
                return `
                    <div class="relative">
                        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 border-r border-gray-300 rounded-l-md flex flex-col text-xs text-gray-500 font-mono overflow-hidden">
                            <div class="line-numbers flex-1 p-1">
                                <div class="line-number">1</div>
                                <div class="line-number">2</div>
                                <div class="line-number">3</div>
                                <div class="line-number">4</div>
                            </div>
                        </div>
                        <textarea class="${baseClasses} h-16 resize-none font-mono text-xs pl-14" 
                                  placeholder='{"key": "value"}'
                                  data-field-type="${field.type}">${field.initialValue}</textarea>
                    </div>
                `;
                
            case 'Array':
                return `
                    <div class="relative">
                        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 border-r border-gray-300 rounded-l-md flex flex-col text-xs text-gray-500 font-mono overflow-hidden">
                            <div class="line-numbers flex-1 p-1">
                                <div class="line-number">1</div>
                                <div class="line-number">2</div>
                                <div class="line-number">3</div>
                                <div class="line-number">4</div>
                            </div>
                        </div>
                        <textarea class="${baseClasses} h-16 resize-none font-mono text-xs pl-14" 
                                  placeholder='["item1", "item2"]'
                                  data-field-type="Array">${field.initialValue}</textarea>
                    </div>
                `;
                
            case 'Text':
            case 'HTML':
            case 'XML':
            case 'Markdown':
                return `
                    <textarea class="${baseClasses} h-16 resize-none" 
                              placeholder="${field.type === 'HTML' ? '<p>HTML content...</p>' : 
                                          field.type === 'XML' ? '<?xml version="1.0"?><root></root>' :
                                          field.type === 'Markdown' ? '# Markdown content...' :
                                          'Long text content...'}">${field.initialValue}</textarea>
                `;
                
            case 'Binary':
            case 'File':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="Binary data or file path">
                `;
                
            case 'Image':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="data:image/png;base64,iVBOR...">
                `;
                
            case 'Enum':
                return `
                    <input type="text" 
                           class="${baseClasses}" 
                           value="${field.initialValue}" 
                           placeholder="option1,option2,option3">
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
     * Format datetime value for HTML datetime-local input
     */
    formatDateTimeForInput(dateTimeValue) {
        if (!dateTimeValue) return '';
        
        try {
            const date = new Date(dateTimeValue);
            if (isNaN(date.getTime())) return '';
            
            // Format as YYYY-MM-DDTHH:mm for HTML datetime-local input
            return date.toISOString().slice(0, 16);
        } catch {
            return '';
        }
    }

    /**
     * Parse currency value from string format like "USD 100.50" or "100.50"
     */
    parseCurrencyValue(value) {
        if (!value) return { currency: '', amount: '' };
        
        const str = value.toString().trim();
        
        // Try to match "CURRENCY AMOUNT" format
        const match = str.match(/^([A-Z]{3})\s+([0-9.]+)$/);
        if (match) {
            return { currency: match[1], amount: match[2] };
        }
        
        // Try to match "AMOUNT CURRENCY" format
        const reverseMatch = str.match(/^([0-9.]+)\s+([A-Z]{3})$/);
        if (reverseMatch) {
            return { currency: reverseMatch[2], amount: reverseMatch[1] };
        }
        
        // Check if it's just a number
        if (/^[0-9.]+$/.test(str)) {
            return { currency: '', amount: str };
        }
        
        // Default fallback
        return { currency: '', amount: str };
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
            'Currency': '💰',
            // New type icons
            'UUID': '🔑',
            'Password': '🔒',
            'Color': '🎨',
            'File': '📁',
            'Image': '🖼️',
            'JSON': '📋',
            'Base64': '📊',
            'Enum': '📝',
            'Integer': '🔢',
            'Float': '💯',
            'Decimal': '💯',
            'Percentage': '📊',
            'Duration': '⏱️',
            'DateTime': '📅',
            'Time': '🕐',
            'Timestamp': '⏰',
            'Binary': '💾',
            'HTML': '🌐',
            'XML': '📄',
            'Markdown': '📝',
            'IPv4': '🌐',
            'IPv6': '🌐',
            'MAC': '🖥️',
            'Credit Card': '💳',
            'IBAN': '🏦',
            'Country Code': '🌍',
            'Language Code': '🗣️',
            'Timezone': '🌍'
        };
        return icons[type] || '📝';
    }

    /**
     * Translate field type for display
     */
    translateFieldType(type) {
        const typeMap = {
            'String': t('stringType'),
            'Number': t('numberType'),
            'Boolean': t('booleanType'),
            'Date': t('dateType'),
            'Email': t('emailType'),
            'URL': t('urlType'),
            'Phone': t('phoneType'),
            'Currency': t('currencyType'),
            'Country Code': t('countryCodeType'),
            'Language Code': t('languageCodeType'),
            'Credit Card': t('creditCardType')
        };
        return typeMap[type] || type;
    }

    /**
     * Setup event listeners for field element
     */
    setupFieldEventListeners(fieldElement, field) {
        const fieldId = field.id;
        
        // Field name change with comprehensive validation
        const fieldNameInput = fieldElement.querySelector('.field-name');
        if (fieldNameInput) {
            fieldNameInput.addEventListener('input', (e) => {
                const newName = e.target.value.trim();
                this.validateAndUpdateFieldName(e.target, fieldId, newName);
            });
            
            // Field name blur validation (more thorough)
            fieldNameInput.addEventListener('blur', (e) => {
                const newName = e.target.value.trim();
                
                // If field name is empty on blur, restore the original name
                if (!newName || newName === '') {
                    const originalField = this.currentNode.getField(fieldId);
                    if (originalField) {
                        e.target.value = originalField.name; // Restore original name
                        e.target.classList.remove('border-red-500', 'bg-red-50');
                        e.target.classList.add('border-gray-300');
                        this.hideFieldValidationError(e.target);
                        this.updateSaveButtonState();
                    }
                } else {
                    this.validateAndUpdateFieldName(e.target, fieldId, newName, true);
                }
            });
        }
        
        // Field type change with value validation
        const fieldTypeSelect = fieldElement.querySelector('.field-type');
        if (fieldTypeSelect) {
            fieldTypeSelect.addEventListener('change', (e) => {
                const newType = e.target.value;
                this.updateFieldType(fieldId, newType);
                // Re-render to update input type
                this.renderFields();
            });
        }
        
        // Field value change with type-specific validation
        const valueInput = fieldElement.querySelector('.field-value');
        if (valueInput) {
            // For special input types (Currency, Country Code, Language Code, Timezone, Percentage), don't add generic listeners
            const fieldType = field.type;
            if (!['Currency', 'Country Code', 'Language Code', 'Timezone', 'Percentage'].includes(fieldType)) {
                const actualInput = valueInput.querySelector('input, textarea, select') || valueInput;
                if (actualInput && actualInput.addEventListener) {
                    actualInput.addEventListener('input', (e) => {
                        this.validateAndUpdateFieldValue(e.target, fieldId, e.target.value);
                        
                        // Update line numbers for JSON fields
                        if (e.target.hasAttribute('data-field-type') && 
                            (e.target.getAttribute('data-field-type') === 'Object' || e.target.getAttribute('data-field-type') === 'Array')) {
                            this.updateLineNumbers(e.target);
                        }
                    });
                    
                    actualInput.addEventListener('blur', (e) => {
                        this.validateAndUpdateFieldValue(e.target, fieldId, e.target.value, true);
                    });
                }
            }
            
            // Initialize line numbers for JSON fields
            const jsonInput = valueInput.querySelector('textarea[data-field-type]');
            if (jsonInput && jsonInput.hasAttribute('data-field-type') && 
                (jsonInput.getAttribute('data-field-type') === 'Object' || jsonInput.getAttribute('data-field-type') === 'Array')) {
                this.updateLineNumbers(jsonInput);
            }
        }
        
        // Required checkbox
        const requiredCheckbox = fieldElement.querySelector('.field-required');
        if (requiredCheckbox) {
            requiredCheckbox.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { required: e.target.checked });
                this.updateSaveButtonState();
            });
        }
        
        // Nullable checkbox
        const nullableCheckbox = fieldElement.querySelector('.field-nullable');
        if (nullableCheckbox) {
            nullableCheckbox.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { nullable: e.target.checked });
                this.updateSaveButtonState();
            });
        }
        
        // Read Only checkbox
        const readOnlyCheckbox = fieldElement.querySelector('.field-readonly');
        if (readOnlyCheckbox) {
            readOnlyCheckbox.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { readOnly: e.target.checked });
                this.updateSaveButtonState();
            });
        }
        
        // Remove field button
        const removeButton = fieldElement.querySelector('.remove-field-btn');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                this.removeField(fieldId);
            });
        }

        // Special handling for Currency fields
        const currencySelector = fieldElement.querySelector('.currency-selector');
        const currencyAmount = fieldElement.querySelector('.currency-amount');
        if (currencySelector && currencyAmount) {
            const updateCurrencyValue = () => {
                const currency = currencySelector.value;
                const amount = currencyAmount.value;
                const combinedValue = currency && amount ? `${currency} ${amount}` : amount;
                this.currentNode.updateField(fieldId, { initialValue: combinedValue });
                this.updateSaveButtonState();
            };
            
            currencySelector.addEventListener('change', updateCurrencyValue);
            currencyAmount.addEventListener('input', updateCurrencyValue);
        }

        // Special handling for Country Code fields
        const countrySelector = fieldElement.querySelector('.country-selector');
        if (countrySelector) {
            countrySelector.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { initialValue: e.target.value });
                this.updateSaveButtonState();
            });
        }

        // Special handling for Language Code fields
        const languageSelector = fieldElement.querySelector('.language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { initialValue: e.target.value });
                this.updateSaveButtonState();
            });
        }

        // Special handling for Timezone fields
        const timezoneSelector = fieldElement.querySelector('.timezone-selector');
        if (timezoneSelector) {
            timezoneSelector.addEventListener('change', (e) => {
                this.currentNode.updateField(fieldId, { initialValue: e.target.value });
                this.updateSaveButtonState();
            });
        }

        // Special handling for Percentage fields
        const percentageSlider = fieldElement.querySelector('.percentage-slider');
        const percentageInput = fieldElement.querySelector('.percentage-input');
        if (percentageSlider && percentageInput) {
            const updatePercentageValue = (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const value = parseFloat(percentageSlider.value);
                percentageInput.value = value;
                this.currentNode.updateField(fieldId, { initialValue: value.toString() });
                this.updateSaveButtonState();
                
                // Update slider visual background
                percentageSlider.style.background = `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
            };
            
            const updateSliderFromInput = (e) => {
                e.stopPropagation(); // Prevent event bubbling
                let value = parseFloat(percentageInput.value) || 0;
                value = Math.max(0, Math.min(100, value)); // Clamp between 0-100
                percentageSlider.value = value;
                percentageInput.value = value;
                this.currentNode.updateField(fieldId, { initialValue: value.toString() });
                this.updateSaveButtonState();
                
                // Update slider visual background
                percentageSlider.style.background = `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
            };
            
            // Add event listeners with stopPropagation
            percentageSlider.addEventListener('input', updatePercentageValue);
            percentageSlider.addEventListener('mousedown', (e) => e.stopPropagation());
            percentageSlider.addEventListener('click', (e) => e.stopPropagation());
            percentageInput.addEventListener('input', updateSliderFromInput);
            percentageInput.addEventListener('blur', updateSliderFromInput);
            percentageInput.addEventListener('mousedown', (e) => e.stopPropagation());
            percentageInput.addEventListener('click', (e) => e.stopPropagation());
        }
    }

    /**
     * Validate and update field name with security checks
     */
    validateAndUpdateFieldName(inputElement, fieldId, newName, showAllErrors = false) {
        const field = this.currentNode.getField(fieldId);
        if (!field) return;
        
        // Security validation first
        const securityValidation = this.validateAndSanitizeInput(newName, 'fieldName');
        
        if (!securityValidation.valid) {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, 'Security violation: ' + securityValidation.errors.join(', '));
            this.updateSaveButtonState();
            return;
        }
        
        // Use sanitized value
        const sanitizedName = securityValidation.sanitized;
        
        // Show warning if sanitization occurred
        if (securityValidation.needsSanitization) {
            console.warn('Field name was sanitized:', { original: newName, sanitized: sanitizedName });
            inputElement.value = sanitizedName; // Update UI with sanitized value
        }
        
        // Check if name is empty first
        if (!sanitizedName || sanitizedName.trim() === '') {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, 'Field name is required');
            this.updateSaveButtonState();
            return;
        }
        
        // Create temporary field for validation
        const tempField = { ...field, name: sanitizedName };
        const errors = this.currentNode.validateField(tempField);
        
        // Filter errors for name-specific issues
        const nameErrors = errors.filter(error => 
            error.includes('Field name') || error.includes('unique') || error.includes('reserved') || 
            error.includes('format') || error.includes('letter') || error.includes('underscore')
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
                this.currentNode.updateField(fieldId, { name: sanitizedName });
            } catch (error) {
                inputElement.classList.add('border-red-500', 'bg-red-50');
                this.showFieldValidationError(inputElement, error.message);
            }
        }
        
        this.updateSaveButtonState();
    }

    /**
     * Validate and update field value with security checks
     */
    validateAndUpdateFieldValue(inputElement, fieldId, newValue, showAllErrors = false) {
        const field = this.currentNode.getField(fieldId);
        if (!field) return;
        
        // Security validation first
        const securityValidation = this.validateAndSanitizeInput(newValue, 'fieldValue', field.type);
        
        if (!securityValidation.valid) {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, 'Security violation: ' + securityValidation.errors.join(', '));
            this.updateSaveButtonState();
            return;
        }
        
        // Use sanitized value
        const sanitizedValue = securityValidation.sanitized;
        
        // Show warning if sanitization occurred
        if (securityValidation.needsSanitization) {
            console.warn('Field value was sanitized:', { 
                fieldName: field.name,
                fieldType: field.type,
                original: newValue, 
                sanitized: sanitizedValue 
            });
            inputElement.value = sanitizedValue; // Update UI with sanitized value
        }
        
        // Validate the value based on field type
        const errors = this.currentNode.validateInitialValue(sanitizedValue, field.type);
        
        if (errors.length > 0) {
            inputElement.classList.add('border-red-500', 'bg-red-50');
            inputElement.classList.remove('border-gray-300');
            this.showFieldValidationError(inputElement, errors[0]);
        } else {
            inputElement.classList.remove('border-red-500', 'bg-red-50');
            inputElement.classList.add('border-gray-300');
            this.hideFieldValidationError(inputElement);
            
            // Update the field if valid
            this.currentNode.updateField(fieldId, { initialValue: sanitizedValue });
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
        
        // Also check JSON validation if JSON tab has content
        const jsonValidation = this.validateCurrentJSON();
        
        if (validation.valid && jsonValidation.valid) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.add('hover:from-violet-600', 'hover:to-purple-700');
            saveBtn.title = '';
            this.hideValidationSummary();
        } else {
            saveBtn.disabled = true;
            saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.remove('hover:from-violet-600', 'hover:to-purple-700');
            
            // Show appropriate error message
            let errorMessage = validation.error || 'Please fix validation errors';
            if (!jsonValidation.valid) {
                errorMessage = jsonValidation.error;
            }
            
            saveBtn.title = errorMessage;
            this.showValidationSummary(validation, jsonValidation);
        }
    }

    /**
     * Validate current JSON content for save validation
     */
    validateCurrentJSON() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        const jsonText = jsonEditor.value.trim();
        
        // If JSON is empty, it's valid (no JSON to validate)
        if (!jsonText) {
            return { valid: true };
        }
        
        try {
            const schema = JSON.parse(jsonText);
            
            // Basic JSON syntax is valid, now validate schema structure
            if (this.validateJSONSchema(schema)) {
                return { valid: true };
            } else {
                return { 
                    valid: false, 
                    error: 'Invalid JSON schema structure' 
                };
            }
        } catch (error) {
            return { 
                valid: false, 
                error: `Invalid JSON syntax: ${error.message}` 
            };
        }
    }

    /**
     * Show validation summary
     */
    showValidationSummary(validation, jsonValidation = null) {
        const summaryDiv = this.modal.querySelector('.validation-summary');
        const errorsDiv = this.modal.querySelector('.validation-errors');
        
        if (!summaryDiv || !errorsDiv) return;
        
        let errorHTML = '';
        
        // Add JSON validation errors first (highest priority)
        if (jsonValidation && !jsonValidation.valid) {
            errorHTML += `<div class="mb-2"><strong>JSON Error:</strong> ${jsonValidation.error}</div>`;
        }
        
        // Add general model validation errors
        if (!validation.valid) {
            errorHTML += `<div class="mb-2"><strong>General:</strong> ${validation.error}</div>`;
        }
        
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
     * Update line numbers for JSON textareas
     */
    updateLineNumbers(textarea) {
        const lineNumbersContainer = textarea.parentElement.querySelector('.line-numbers');
        if (!lineNumbersContainer) return;
        
        const lines = textarea.value.split('\n');
        const lineCount = Math.max(lines.length, 4); // Minimum 4 lines
        
        // Generate line numbers
        let lineNumbersHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersHTML += `<div class="line-number">${i}</div>`;
        }
        
        lineNumbersContainer.innerHTML = lineNumbersHTML;
        
        // Adjust line numbers container height to match textarea
        const textareaHeight = textarea.scrollHeight;
        lineNumbersContainer.style.height = `${textareaHeight}px`;
    }

    /**
     * Update line numbers for JSON tab textarea
     */
    updateJSONLineNumbers(textarea) {
        const lineNumbersContainer = textarea.parentElement.querySelector('.json-line-numbers');
        if (!lineNumbersContainer) return;
        
        const lines = textarea.value.split('\n');
        const lineCount = Math.max(lines.length, 15); // Minimum 15 lines for JSON
        
        // Generate line numbers with proper alignment and spacing
        let lineNumbersHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersHTML += `<div class="line-number" style="height: 20px; line-height: 20px; text-align: right; padding-right: 4px;">${i}</div>`;
        }
        
        lineNumbersContainer.innerHTML = lineNumbersHTML;
        
        // Sync scrolling between line numbers and textarea
        textarea.removeEventListener('scroll', this._scrollHandler);
        this._scrollHandler = () => {
            lineNumbersContainer.scrollTop = textarea.scrollTop;
        };
        textarea.addEventListener('scroll', this._scrollHandler);
        
        // Also sync line height and font size exactly
        const textareaStyles = window.getComputedStyle(textarea);
        lineNumbersContainer.style.fontSize = textareaStyles.fontSize;
        lineNumbersContainer.style.lineHeight = textareaStyles.lineHeight;
        lineNumbersContainer.style.fontFamily = textareaStyles.fontFamily;
    }

    /**
     * Validate field name uniqueness
     */
    validateFieldNameUniqueness(fieldName, excludeFieldId = null) {
        return this.currentNode.isFieldNameUnique(fieldName, excludeFieldId);
    }

    /**
     * Safely set HTML content to prevent XSS
     */
    safeSetInnerHTML(element, htmlContent) {
        if (!element) return;
        
        // Only use innerHTML for static, trusted template content
        // For dynamic content, use textContent or createElement
        element.innerHTML = htmlContent;
    }

    /**
     * Create safe HTML element with attributes
     */
    createSafeElement(tagName, attributes = {}, textContent = '') {
        const element = document.createElement(tagName);
        
        // Set safe attributes
        for (const [key, value] of Object.entries(attributes)) {
            // Validate attribute names (only allow standard HTML attributes)
            if (/^[a-zA-Z\-]+$/.test(key)) {
                element.setAttribute(key, String(value));
            }
        }
        
        // Set text content safely
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    }

    /**
     * Show field validation error with safe content
     */
    showFieldValidationError(inputElement, message) {
        // Remove existing error message
        this.hideFieldValidationError(inputElement);
        
        // Create error message element safely
        const errorDiv = this.createSafeElement('div', {
            'class': 'field-error-message absolute z-10 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs mt-1 shadow-sm'
        }, message); // Use textContent instead of innerHTML
        
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
            readOnly: false,
            nullable: false // Default to non-nullable
        });

        // Log to terminal if available
        if (window.terminalService) {
            window.terminalService.logDataModelOperation(
                `Field "${uniqueName}" added`, 
                this.currentNode.label || 'Unnamed Model',
                { fieldType: 'String', fieldId: newField.id }
            );
        }
        
        this.renderFields();
        this.updateSaveButtonState();
    }

    /**
     * Remove field
     */
    removeField(fieldId) {
        const field = this.currentNode.getField(fieldId);
        const fieldName = field ? field.name : 'Unknown Field';
        
        this.currentNode.removeField(fieldId);

        // Log to terminal if available
        if (window.terminalService) {
            window.terminalService.logDataModelOperation(
                `Field "${fieldName}" removed`, 
                this.currentNode.label || 'Unnamed Model',
                { fieldId }
            );
        }
        
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
            // Show detailed validation error in a better format
            let errorMessage = `Cannot save model due to validation errors:\n\n`;
            errorMessage += `❌ ${validation.error}\n\n`;
            
            // If there are field errors, show them
            if (validation.fieldErrors) {
                errorMessage += `${t('fieldSpecificErrors')}\n`;
                Object.keys(validation.fieldErrors).forEach(fieldId => {
                    const field = this.currentNode.getField(fieldId);
                    const fieldName = field ? field.name || t('unnamedField') : t('unknownField');
                    const errors = validation.fieldErrors[fieldId];
                    
                    errorMessage += `\n🔸 ${fieldName}:\n`;
                    errors.forEach(error => {
                        errorMessage += `   • ${error}\n`;
                    });
                });
                
                errorMessage += `\n${t('pleaseFixErrors')}`;
            }
            
            alert(errorMessage);

            // Log validation errors to terminal if available
            if (window.terminalService) {
                window.terminalService.logDataModelOperation(
                    'Model validation failed', 
                    this.currentNode.label || 'Unnamed Model'
                );
                window.terminalService.addLine(`Validation error: ${validation.error}`, 'error');
                
                if (validation.fieldErrors) {
                    Object.keys(validation.fieldErrors).forEach(fieldId => {
                        const field = this.currentNode.getField(fieldId);
                        const fieldName = field ? field.name || 'Unnamed Field' : 'Unknown Field';
                        const errors = validation.fieldErrors[fieldId];
                        
                        errors.forEach(error => {
                            window.terminalService.addLine(`Field "${fieldName}": ${error}`, 'error');
                        });
                    });
                }
            }
            
            // Highlight all fields with errors
            if (validation.fieldErrors) {
                Object.keys(validation.fieldErrors).forEach(fieldId => {
                    const fieldElement = this.modal.querySelector(`[data-field-id="${fieldId}"]`);
                    if (fieldElement) {
                        const nameInput = fieldElement.querySelector('.field-name');
                        const valueInput = fieldElement.querySelector('.field-value');
                        
                        if (nameInput) {
                            nameInput.classList.add('border-red-500', 'bg-red-50');
                            nameInput.focus(); // Focus on first error field
                        }
                        if (valueInput) valueInput.classList.add('border-red-500', 'bg-red-50');
                    }
                });
            }
            
            // Show validation summary
            this.showValidationSummary(validation);
            
            return; // Don't save if validation fails
        }
        
        // All validation passed - save and close
        this.eventBus.emit('datamodel.updated', {
            node: this.currentNode
        });

        // Log to terminal if available
        if (window.terminalService) {
            window.terminalService.logDataModelOperation(
                'Model saved successfully', 
                this.currentNode.label || 'Unnamed Model',
                {
                    fieldCount: this.currentNode.fields.length,
                    modelId: this.currentNode.id
                }
            );
        }
        
        // Force close without validation check since we've already validated
        this.forceClose();
    }

    /**
     * Force close without validation (used after successful save)
     */
    forceClose() {
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

            // Handle nullable fields - create array of types including null
            if (field.nullable === true) {
                // If field is nullable, allow null values
                property.type = [property.type, 'null'];
            }

            // Add format for special types
            if (field.type === 'Email') {
                property.format = 'email';
            } else if (field.type === 'URL') {
                property.format = 'uri';
            } else if (field.type === 'Date') {
                property.format = 'date';
            } else if (field.type === 'DateTime') {
                property.format = 'date-time';
            } else if (field.type === 'Time') {
                property.format = 'time';
            } else if (field.type === 'Phone') {
                property.format = 'phone';
                property.pattern = '^[+]?[1-9]?[0-9]{7,15}$';
            } else if (field.type === 'Currency') {
                property.format = 'currency';
            } else if (field.type === 'UUID') {
                property.format = 'uuid';
            } else if (field.type === 'Password') {
                property.format = 'password';
            } else if (field.type === 'Color') {
                property.format = 'color';
            } else if (field.type === 'Base64') {
                property.format = 'base64';
            } else if (field.type === 'Binary') {
                property.format = 'binary';
            } else if (field.type === 'Decimal') {
                property.format = 'decimal';
            } else if (field.type === 'Duration') {
                property.format = 'duration';
            } else if (field.type === 'HTML') {
                property.format = 'html';
            } else if (field.type === 'XML') {
                property.format = 'xml';
            } else if (field.type === 'Markdown') {
                property.format = 'markdown';
            } else if (field.type === 'IPv4') {
                property.format = 'ipv4';
            } else if (field.type === 'IPv6') {
                property.format = 'ipv6';
            } else if (field.type === 'MAC') {
                property.format = 'mac';
            } else if (field.type === 'Credit Card') {
                property.format = 'credit-card';
            } else if (field.type === 'IBAN') {
                property.format = 'iban';
            } else if (field.type === 'Country Code') {
                property.format = 'country-code';
            } else if (field.type === 'Language Code') {
                property.format = 'language-code';
            } else if (field.type === 'Timezone') {
                property.format = 'timezone';
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

            // Add nullable information to description
            if (field.nullable === true) {
                property.description += ' (nullable)';
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
            'Integer': 'integer',
            'Float': 'number',
            'Decimal': 'number',
            'Boolean': 'boolean',
            'Date': 'string',
            'DateTime': 'string',
            'Time': 'string',
            'Timestamp': 'string',
            'Object': 'object',
            'Array': 'array',
            'Text': 'string',
            'Email': 'string',
            'URL': 'string',
            'Phone': 'string',
            'Currency': 'number',
            'UUID': 'string',
            'Password': 'string',
            'Color': 'string',
            'File': 'string',
            'Image': 'string',
            'JSON': 'object',
            'Base64': 'string',
            'Enum': 'string',
            'Percentage': 'number',
            'Duration': 'string',
            'Binary': 'string',
            'HTML': 'string',
            'XML': 'string',
            'Markdown': 'string',
            'IPv4': 'string',
            'IPv6': 'string',
            'MAC': 'string',
            'Credit Card': 'string',
            'IBAN': 'string',
            'Country Code': 'string',
            'Language Code': 'string',
            'Timezone': 'string'
        };
        return typeMapping[fieldType] || 'string';
    }

    /**
     * Map JSON schema types back to internal field types
     */
    mapJSONTypeToField(jsonType, format = null) {
        // Handle array types (for nullable fields)
        if (Array.isArray(jsonType)) {
            // Find the non-null type in the array
            const mainType = jsonType.find(type => type !== 'null');
            if (!mainType) {
                return 'String'; // Default if only null type
            }
            return this.mapJSONTypeToField(mainType, format);
        }
        
        // Handle format-specific mappings first
        if (format) {
            const formatMapping = {
                'email': 'Email',
                'uri': 'URL',
                'url': 'URL',
                'date': 'Date',
                'date-time': 'DateTime',
                'time': 'Time',
                'phone': 'Phone',
                'currency': 'Currency',
                'uuid': 'UUID',
                'password': 'Password',
                'color': 'Color',
                'binary': 'Binary',
                'base64': 'Base64',
                'decimal': 'Decimal',
                'duration': 'Duration',
                'html': 'HTML',
                'xml': 'XML',
                'markdown': 'Markdown',
                'ipv4': 'IPv4',
                'ipv6': 'IPv6',
                'mac': 'MAC',
                'credit-card': 'Credit Card',
                'iban': 'IBAN',
                'country-code': 'Country Code',
                'language-code': 'Language Code',
                'timezone': 'Timezone'
            };
            if (formatMapping[format]) {
                return formatMapping[format];
            }
        }

        // Handle standard type mappings
        const typeMapping = {
            'string': 'String',
            'number': 'Number',
            'integer': 'Integer',
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
                case 'Float':
                case 'Decimal':
                case 'Percentage':
                    return parseFloat(value) || value;
                case 'Currency':
                    // Handle currency format like "USD 100.50"
                    const parsed = this.parseCurrencyValue(value);
                    if (parsed.currency && parsed.amount) {
                        return `${parsed.currency} ${parsed.amount}`;
                    }
                    return parseFloat(parsed.amount) || value;
                case 'Integer':
                    return parseInt(value) || value;
                case 'Boolean':
                    return value.toLowerCase() === 'true';
                case 'Object':
                case 'Array':
                case 'JSON':
                    return JSON.parse(value);
                case 'Date':
                case 'DateTime':
                case 'Time':
                case 'Timestamp':
                    // Return as string for proper date formatting
                    return value;
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
            try {
                const schema = this.generateJSONSchema();
                const jsonString = JSON.stringify(schema, null, 2);
                
                // Only update if content has actually changed to avoid cursor jumping
                if (jsonEditor.value !== jsonString) {
                    jsonEditor.value = jsonString;
                }
                
                this.clearValidationMessage();
                
                // Update line numbers for the JSON content
                this.updateJSONLineNumbers(jsonEditor);
            } catch (error) {
                console.error('Error updating JSON content:', error);
                this.showValidationMessage(`Error generating JSON: ${error.message}`, 'error');
            }
        }
    }

    /**
     * Import fields from JSON schema with security validation
     */
    importFromJSON() {
        const jsonEditor = this.modal.querySelector('.json-editor');
        const jsonText = jsonEditor.value.trim();

        if (!jsonText) {
            this.showValidationMessage('Please enter JSON schema to accept', 'error');
            return;
        }

        // Security check for JSON content size (prevent DoS)
        if (jsonText.length > 100000) { // 100KB limit
            this.showValidationMessage('JSON content too large. Maximum size is 100KB', 'error');
            return;
        }

        // Security validation of JSON content - use specialized validation for JSON
        if (!this.validateJSONContentSecurity(jsonText)) {
            return;
        }

        try {
            const schema = JSON.parse(jsonText);
            
            // Security check for object depth (prevent stack overflow)
            if (!this.validateJSONDepth(schema, 0, 10)) {
                this.showValidationMessage('JSON structure too deep. Maximum depth is 10 levels', 'error');
                return;
            }
            
            // Enhanced validation
            if (!this.validateJSONSchema(schema)) {
                return; // Error messages are shown in validateJSONSchema
            }

            // Security check for number of properties (prevent resource exhaustion)
            if (Object.keys(schema.properties).length > 100) {
                this.showValidationMessage('Too many properties. Maximum is 100 fields per model', 'error');
                return;
            }

            // Clear existing fields ONLY after successful validation
            this.currentNode.fields = [];

            // Track field names to ensure uniqueness
            const fieldNames = new Set();
            let duplicateCount = 0;

            // Import fields from schema with security validation
            Object.entries(schema.properties).forEach(([fieldName, property]) => {
                // Basic security validation for field name (more permissive for JSON import)
                if (this.containsDangerousContent(fieldName)) {
                    console.warn(`Skipping field with potentially dangerous name: ${fieldName}`);
                    return;
                }
                
                // Sanitize field name to make it valid (convert to valid identifier)
                let finalFieldName = this.sanitizeFieldNameForImport(fieldName);
                
                // Ensure unique field names
                if (fieldNames.has(finalFieldName.toLowerCase())) {
                    duplicateCount++;
                    finalFieldName = `${finalFieldName}_${duplicateCount}`;
                    while (fieldNames.has(finalFieldName.toLowerCase())) {
                        duplicateCount++;
                        finalFieldName = `${finalFieldName}_${duplicateCount}`;
                    }
                }
                fieldNames.add(finalFieldName.toLowerCase());

                const fieldType = this.mapJSONTypeToField(property.type, property.format);
                const isRequired = Array.isArray(schema.required) && schema.required.includes(fieldName);
                const isReadOnly = property.readOnly === true;
                const isNullable = Array.isArray(property.type) && property.type.includes('null');
                
                let initialValue = '';
                if (property.default !== undefined) {
                    try {
                        const rawValue = typeof property.default === 'object' 
                            ? JSON.stringify(property.default) 
                            : String(property.default);
                        
                        // Basic security check for initial value (more permissive for JSON import)
                        if (this.containsDangerousContent(rawValue)) {
                            console.warn(`Initial value sanitized for field ${finalFieldName}: contains dangerous content`);
                            initialValue = '';
                        } else {
                            initialValue = rawValue.length > 500 ? rawValue.substring(0, 500) : rawValue;
                        }
                    } catch (error) {
                        initialValue = '';
                    }
                }

                // Use addField method which ensures proper validation
                this.currentNode.addField({
                    name: finalFieldName,
                    type: fieldType,
                    initialValue: initialValue,
                    required: isRequired,
                    readOnly: isReadOnly,
                    nullable: isNullable
                });
            });

            // Security validation for model title
            if (schema.title && schema.title !== 'DataModel') {
                const titleValidation = this.validateAndSanitizeInput(schema.title, 'modelName');
                if (titleValidation.valid) {
                    this.currentNode.setLabel(titleValidation.sanitized);
                    this.modal.querySelector('.model-name-input').value = titleValidation.sanitized;
                }
            }

            const importedCount = Object.keys(schema.properties).length;
            let message = `Successfully accepted ${importedCount} fields from JSON`;
            if (duplicateCount > 0) {
                message += ` (${duplicateCount} duplicate names were auto-renamed)`;
            }
            
            this.showValidationMessage(message, 'success');
            
            // Switch to Fields tab to see the imported fields
            this.switchTab('properties');
            this.renderFields();
            
            // Validate after import and update JSON to reflect any changes
            this.updateSaveButtonState();
            
            // Update JSON content to show the cleaned/processed schema
            setTimeout(() => {
                this.updateJSONContent();
            }, 100);

        } catch (error) {
            this.showValidationMessage(`Invalid JSON: ${error.message}`, 'error');
        }
    }

    /**
     * Validate JSON object depth to prevent stack overflow
     */
    validateJSONDepth(obj, currentDepth, maxDepth) {
        if (currentDepth > maxDepth) {
            return false;
        }
        
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (!this.validateJSONDepth(obj[key], currentDepth + 1, maxDepth)) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    /**
     * Specialized security validation for JSON content
     */
    validateJSONContentSecurity(jsonText) {
        // Check for obviously malicious script tags and javascript URLs
        const dangerousPatterns = [
            /<script[^>]*>/i,
            /javascript\s*:/i,
            /<iframe[^>]*>/i,
            /<object[^>]*>/i,
            /<embed[^>]*>/i,
            /on\w+\s*=\s*['"]/i, // Event handlers like onclick=
            /expression\s*\(/i,  // CSS expressions
            /vbscript\s*:/i,
            /data\s*:\s*text\/html/i
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(jsonText)) {
                this.showValidationMessage('JSON contains potentially dangerous script content', 'error');
                return false;
            }
        }

        // Check for SQL injection only in string values, not JSON structure
        // Allow legitimate JSON keywords like "select", "insert" etc. in property names
        const sqlInStringValues = /["']\s*[^"']*\s*('|(\\)|;|--|\/\*|\*\/|xp_|sp_|@@|union\s+select|insert\s+into|update\s+set|delete\s+from|drop\s+table)[^"']*\s*["']/i;
        if (sqlInStringValues.test(jsonText)) {
            this.showValidationMessage('JSON string values contain potentially dangerous SQL patterns', 'error');
            return false;
        }

        return true;
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

            // Handle both single types and array types (for nullable fields)
            const validTypes = ['string', 'number', 'integer', 'boolean', 'object', 'array', 'null'];
            let propertyTypes = Array.isArray(property.type) ? property.type : [property.type];
            
            for (const propType of propertyTypes) {
                if (!validTypes.includes(propType)) {
                    this.showValidationMessage(`Field "${fieldName}" has invalid type: ${propType}`, 'error');
                    return false;
                }
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
     * Attempt to automatically sync JSON changes with fields (non-destructive)
     */
    attemptJSONSync(jsonText) {
        if (!jsonText || jsonText.trim() === '') {
            return; // Don't sync empty JSON
        }

        try {
            const schema = JSON.parse(jsonText);
            
            // Only sync if the schema is valid
            if (this.validateJSONSchema(schema)) {
                // Check if this is a simple change (same number of properties, similar structure)
                const currentFieldCount = this.currentNode.fields.length;
                const schemaFieldCount = Object.keys(schema.properties || {}).length;
                
                // Only auto-sync if the change seems safe (similar field count, or adding fields)
                if (schemaFieldCount >= currentFieldCount && schemaFieldCount <= currentFieldCount + 3) {
                    // Silently sync without clearing existing fields first
                    this.performSafeJSONSync(schema);
                }
            }
        } catch (error) {
            // Invalid JSON - don't attempt sync
            return;
        }
    }

    /**
     * Perform safe JSON sync that preserves existing data when possible
     */
    performSafeJSONSync(schema) {
        try {
            // Create a map of existing fields by name for preservation
            const existingFieldsMap = new Map();
            this.currentNode.fields.forEach(field => {
                existingFieldsMap.set(field.name.toLowerCase(), field);
            });

            // Track new fields to add
            const newFields = [];
            const fieldNames = new Set();

            // Process schema properties
            Object.entries(schema.properties).forEach(([fieldName, property]) => {
                const lowerName = fieldName.toLowerCase();
                fieldNames.add(lowerName);

                const existingField = existingFieldsMap.get(lowerName);
                
                if (existingField) {
                    // Update existing field with new properties from JSON
                    const fieldType = this.mapJSONTypeToField(property.type, property.format);
                    const isRequired = Array.isArray(schema.required) && schema.required.includes(fieldName);
                    const isReadOnly = property.readOnly === true;
                    const isNullable = Array.isArray(property.type) && property.type.includes('null');
                    
                    // Only update if there are actual changes
                    if (existingField.type !== fieldType || 
                        existingField.required !== isRequired || 
                        existingField.readOnly !== isReadOnly || 
                        existingField.nullable !== isNullable) {
                        
                        this.currentNode.updateField(existingField.id, {
                            type: fieldType,
                            required: isRequired,
                            readOnly: isReadOnly,
                            nullable: isNullable
                        });
                    }
                } else {
                    // This is a new field - add it
                    const fieldType = this.mapJSONTypeToField(property.type, property.format);
                    const isRequired = Array.isArray(schema.required) && schema.required.includes(fieldName);
                    const isReadOnly = property.readOnly === true;
                    const isNullable = Array.isArray(property.type) && property.type.includes('null');
                    
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

                    newFields.push({
                        name: fieldName,
                        type: fieldType,
                        initialValue: initialValue,
                        required: isRequired,
                        readOnly: isReadOnly,
                        nullable: isNullable
                    });
                }
            });

            // Add new fields
            newFields.forEach(fieldData => {
                this.currentNode.addField(fieldData);
            });

            // Remove fields that are no longer in the schema
            const fieldsToRemove = this.currentNode.fields.filter(field => 
                !fieldNames.has(field.name.toLowerCase())
            );

            fieldsToRemove.forEach(field => {
                this.currentNode.removeField(field.id);
            });

            // Update model title if provided
            if (schema.title && schema.title !== 'DataModel') {
                this.currentNode.setLabel(schema.title);
                this.modal.querySelector('.model-name-input').value = schema.title;
            }

            // Refresh the fields view
            this.renderFields();
            this.updateSaveButtonState();

            // Show subtle notification about auto-sync
            this.showValidationMessage('JSON automatically synchronized with fields', 'success');

        } catch (error) {
            console.warn('Safe JSON sync failed:', error);
        }
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
            let errorMessage = `Invalid JSON: ${error.message}`;
            
            // Clear any previous error highlighting
            this.clearErrorHighlighting();
            
            // Try to extract position information from different error formats
            let position = null;
            
            // Try to find position in the error message
            const positionMatch = error.message.match(/at position (\d+)/i);
            if (positionMatch) {
                position = parseInt(positionMatch[1]);
            }
            
            // Alternative patterns for position
            if (!position) {
                const lineColMatch = error.message.match(/line (\d+) column (\d+)/i);
                if (lineColMatch) {
                    const errorLine = parseInt(lineColMatch[1]);
                    const errorCol = parseInt(lineColMatch[2]);
                    // Convert line/column back to position
                    const lines = jsonText.split('\n');
                    position = 0;
                    for (let i = 0; i < errorLine - 1 && i < lines.length; i++) {
                        position += lines[i].length + 1; // +1 for newline
                    }
                    position += errorCol - 1;
                }
            }
            
            if (position !== null) {
                const lineInfo = this.getLineFromPosition(jsonText, position);
                
                // Remove redundant position info from error message
                const cleanErrorMessage = error.message.replace(/at position \d+/i, '').replace(/line \d+ column \d+/i, '').trim();
                errorMessage = `Invalid JSON: ${cleanErrorMessage} (line ${lineInfo.line}, column ${lineInfo.column})`;
                
                // Highlight the error line
                this.highlightErrorLine(jsonEditor, lineInfo.line);
            }
            
            this.showValidationMessage(errorMessage, 'error');
        }
    }

    /**
     * Get line and column from character position in text
     */
    getLineFromPosition(text, position) {
        // Ensure position doesn't exceed text length
        const safePosition = Math.min(position, text.length);
        
        // Get text up to the error position
        const textUpToPosition = text.substring(0, safePosition);
        
        // Count actual newline characters to get line number
        const newlineCount = (textUpToPosition.match(/\n/g) || []).length;
        const line = newlineCount + 1; // 1-based line numbering
        
        // Find the start of the current line
        const lastNewlineIndex = textUpToPosition.lastIndexOf('\n');
        const currentLineStart = lastNewlineIndex + 1;
        const column = safePosition - currentLineStart + 1; // 1-based column numbering
        
        return { line, column };
    }

    /**
     * Test line position calculation
     */
    testLineCalculation() {
        const testText = `{
  "name": "test",
  "value": 123
  "error": "here"
}`;
        console.log('=== JSON Line Position Test ===');
        console.log('Test text with line numbers:');
        testText.split('\n').forEach((line, index) => {
            console.log(`${index + 1}: ${line}`);
        });
        
        // Test actual JSON parsing error
        try {
            JSON.parse(testText);
        } catch (error) {
            console.log('\nActual JSON error:', error.message);
            const positionMatch = error.message.match(/at position (\d+)/);
            if (positionMatch) {
                const errorPosition = parseInt(positionMatch[1]);
                console.log('Error position from JSON.parse:', errorPosition);
                
                // Show character at error position
                const charAtError = testText[errorPosition] || 'END_OF_TEXT';
                console.log('Character at error position:', charAtError);
                
                const errorResult = this.getLineFromPosition(testText, errorPosition);
                console.log('Calculated line/column:', errorResult);
                
                // Verify by manually checking
                const lines = testText.split('\n');
                console.log(`Line ${errorResult.line} content: "${lines[errorResult.line - 1]}"`);
                console.log(`Character at column ${errorResult.column}: "${lines[errorResult.line - 1][errorResult.column - 1] || 'END_OF_LINE'}"`);
            }
        }
    }

    /**
     * Highlight error line in JSON editor
     */
    highlightErrorLine(textarea, errorLine) {
        // Remove any previous error highlighting
        this.clearErrorHighlighting();
        
        // Add error highlighting to the specific line number
        const lineNumbersContainer = textarea.parentElement.querySelector('.json-line-numbers');
        if (lineNumbersContainer) {
            const lineNumbers = lineNumbersContainer.querySelectorAll('.line-number');
            if (lineNumbers[errorLine - 1]) {
                lineNumbers[errorLine - 1].classList.add('error-line');
                lineNumbers[errorLine - 1].style.backgroundColor = '#fef2f2';
                lineNumbers[errorLine - 1].style.color = '#dc2626';
                lineNumbers[errorLine - 1].style.fontWeight = 'bold';
                lineNumbers[errorLine - 1].style.borderLeft = '3px solid #dc2626';
            }
        }
        
        // Also highlight the actual text line in the textarea
        this.highlightTextAreaLine(textarea, errorLine);
        
        // Store error line for clearing later
        this.currentErrorLine = errorLine;
    }

    /**
     * Highlight the actual line in textarea with red lines above and below
     */
    highlightTextAreaLine(textarea, errorLine) {
        const lines = textarea.value.split('\n');
        if (errorLine <= lines.length) {
            // Create or update overlay for line highlighting
            let overlay = textarea.parentElement.querySelector('.line-error-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'line-error-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                    white-space: pre-wrap;
                    z-index: 1;
                    overflow: hidden;
                    padding: 12px 4px 12px 56px;
                    box-sizing: border-box;
                `;
                textarea.parentElement.style.position = 'relative';
                textarea.parentElement.appendChild(overlay);
            }
            
            // Get textarea styles for exact alignment
            const textareaStyles = window.getComputedStyle(textarea);
            const lineHeight = parseInt(textareaStyles.lineHeight) || 20;
            const paddingTop = parseInt(textareaStyles.paddingTop) || 12;
            
            // Calculate line position (0-based for calculations)
            const lineIndex = errorLine - 1;
            const topOffset = paddingTop + (lineIndex * lineHeight);
            
            // Sync overlay scroll with textarea
            overlay.scrollTop = textarea.scrollTop;
            
            // Create red lines above and below the error line
            overlay.innerHTML = `
                <!-- Line above error -->
                <div style="
                    position: absolute;
                    top: ${topOffset - textarea.scrollTop}px;
                    left: 56px;
                    right: 16px;
                    height: 2px;
                    background-color: #dc2626;
                    border-radius: 1px;
                    box-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
                    z-index: 2;
                "></div>
                <!-- Line below error -->
                <div style="
                    position: absolute;
                    top: ${topOffset + lineHeight - 2 - textarea.scrollTop}px;
                    left: 56px;
                    right: 16px;
                    height: 2px;
                    background-color: #dc2626;
                    border-radius: 1px;
                    box-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
                    z-index: 2;
                "></div>
                <!-- Background highlight for the line -->
                <div style="
                    position: absolute;
                    top: ${topOffset - textarea.scrollTop}px;
                    left: 56px;
                    right: 16px;
                    height: ${lineHeight}px;
                    background-color: rgba(220, 38, 38, 0.05);
                    border-left: 3px solid #dc2626;
                    border-radius: 2px;
                    z-index: 1;
                "></div>
            `;
            
            // Store the error line info for scroll synchronization
            this.errorLineInfo = { errorLine, lineHeight, paddingTop };
            
            // Add scroll listener to keep highlighting in sync
            textarea.removeEventListener('scroll', this._errorScrollHandler);
            this._errorScrollHandler = () => {
                this.updateErrorHighlightPosition(textarea, overlay);
            };
            textarea.addEventListener('scroll', this._errorScrollHandler);
        }
    }

    /**
     * Update error highlight position when scrolling
     */
    updateErrorHighlightPosition(textarea, overlay) {
        if (!this.errorLineInfo) return;
        
        const { errorLine, lineHeight, paddingTop } = this.errorLineInfo;
        const lineIndex = errorLine - 1;
        const topOffset = paddingTop + (lineIndex * lineHeight);
        
        // Update overlay content with new scroll position
        overlay.innerHTML = `
            <!-- Line above error -->
            <div style="
                position: absolute;
                top: ${topOffset - textarea.scrollTop}px;
                left: 56px;
                right: 16px;
                height: 2px;
                background-color: #dc2626;
                border-radius: 1px;
                box-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
                z-index: 2;
            "></div>
            <!-- Line below error -->
            <div style="
                position: absolute;
                top: ${topOffset + lineHeight - 2 - textarea.scrollTop}px;
                left: 56px;
                right: 16px;
                height: 2px;
                background-color: #dc2626;
                border-radius: 1px;
                box-shadow: 0 1px 2px rgba(220, 38, 38, 0.3);
                z-index: 2;
            "></div>
            <!-- Background highlight for the line -->
            <div style="
                position: absolute;
                top: ${topOffset - textarea.scrollTop}px;
                left: 56px;
                right: 16px;
                height: ${lineHeight}px;
                background-color: rgba(220, 38, 38, 0.05);
                border-left: 3px solid #dc2626;
                border-radius: 2px;
                z-index: 1;
            "></div>
        `;
    }

    /**
     * Clear error line highlighting
     */
    clearErrorHighlighting() {
        // Check if modal exists
        if (!this.modal) {
            return;
        }
        
        const lineNumbersContainer = this.modal.querySelector('.json-line-numbers');
        if (lineNumbersContainer) {
            const errorLines = lineNumbersContainer.querySelectorAll('.error-line');
            errorLines.forEach(line => {
                line.classList.remove('error-line');
                line.style.backgroundColor = '';
                line.style.color = '';
                line.style.fontWeight = '';
                line.style.borderLeft = '';
            });
        }
        
        // Clear textarea line highlighting
        const overlay = this.modal.querySelector('.line-error-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Remove scroll listener for error highlighting
        const jsonEditor = this.modal.querySelector('.json-editor');
        if (jsonEditor && this._errorScrollHandler) {
            jsonEditor.removeEventListener('scroll', this._errorScrollHandler);
            this._errorScrollHandler = null;
        }
        
        // Clear error line info
        this.errorLineInfo = null;
        this.currentErrorLine = null;
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
        // Check if modal exists
        if (!this.modal) {
            return;
        }
        
        const messageElement = this.modal.querySelector('.json-validation-message');
        if (messageElement) {
            messageElement.classList.add('hidden');
        }
        
        // Also clear error line highlighting
        this.clearErrorHighlighting();
    }

    /**
     * Debug function to check component state
     */
    debugState() {
        console.log('=== DataModelEditor Debug State ===');
        console.log('Current Node:', this.currentNode);
        console.log('Fields Count:', this.currentNode ? this.currentNode.fields.length : 0);
        console.log('Fields:', this.currentNode ? this.currentNode.fields : []);
        console.log('Active Tab:', this.activeTab);
        console.log('Is Open:', this.isOpen);
        
        const jsonEditor = this.modal?.querySelector('.json-editor');
        if (jsonEditor) {
            console.log('JSON Content Length:', jsonEditor.value.length);
            console.log('JSON Valid:', this.validateCurrentJSON().valid);
        }
        
        const validation = this.currentNode ? this.currentNode.isValidForSave() : null;
        console.log('Save Validation:', validation);
        console.log('========================');
        
        return {
            node: this.currentNode,
            fieldsCount: this.currentNode ? this.currentNode.fields.length : 0,
            activeTab: this.activeTab,
            isOpen: this.isOpen,
            validation: validation
        };
    }

    /**
     * Check if content contains obviously dangerous patterns
     */
    containsDangerousContent(text) {
        const dangerousPatterns = [
            /<script[^>]*>/i,
            /javascript\s*:/i,
            /<iframe[^>]*>/i,
            /on\w+\s*=\s*['"]/i,
            /expression\s*\(/i,
            /vbscript\s*:/i
        ];
        
        return dangerousPatterns.some(pattern => pattern.test(text));
    }

    /**
     * Sanitize field name for JSON import (more permissive than runtime validation)
     */
    sanitizeFieldNameForImport(fieldName) {
        // Convert to valid JavaScript identifier
        let sanitized = fieldName
            .replace(/[^a-zA-Z0-9_$]/g, '_') // Replace invalid chars with underscore
            .replace(/^[0-9]/, '_$&'); // Prefix numbers with underscore
        
        // Ensure it's not empty
        if (!sanitized || sanitized === '_') {
            sanitized = 'imported_field';
        }
        
        // Limit length
        if (sanitized.length > 25) {
            sanitized = sanitized.substring(0, 25);
        }
        
        return sanitized;
    }
}
