/**
 * Input management service for inline editing
 */
class InputService {
    constructor(canvas, eventBus, errorHandler = null) {
        this.canvas = canvas;
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        this.activeInput = null;
        this.editingElement = null;
        
        Logger.info(t('inputServiceInitialized'));
    }

    /**
     * Show input for node editing
     */
    showNodeInput(node) {
        try {
            this.hideInput();
            
            const input = this.createInput('node-label-input', '16px');
            input.value = node.label;
            
            const canvasRect = this.canvas.getBoundingClientRect();
            input.style.left = `${canvasRect.left + node.x - 60}px`;
            input.style.top = `${canvasRect.top + node.y - node.r - 32}px`;
            input.style.width = '120px';
            
            this.setupInput(input, node, 'node');
        } catch (error) {
            Logger.error(t('errorShowingNodeInput'), error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, t('failedToShowNodeEditor'));
            }
        }
    }

    /**
     * Show input for text editing
     */
    showTextInput(text) {
        try {
            Logger.debug(t('showTextInputCalled'), { text: text.label, x: text.x, y: text.y });
            this.hideInput();
            
            const input = this.createInput('text-label-input', '18px');
            input.value = text.label;
            
            const canvasRect = this.canvas.getBoundingClientRect();
            const leftPos = canvasRect.left + text.x - 60;
            const topPos = canvasRect.top + text.y - 22;
            
            Logger.debug(t('inputPositioning'), { 
                canvasLeft: canvasRect.left, 
                canvasTop: canvasRect.top,
                textX: text.x, 
                textY: text.y,
                leftPos, 
                topPos 
            });
            
            input.style.left = `${leftPos}px`;
            input.style.top = `${topPos}px`;
            input.style.width = '120px';
            
            this.setupInput(input, text, 'text');
            Logger.debug(t('inputSetupCompleted'));
        } catch (error) {
            Logger.error(t('errorShowingTextInput'), error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to show text editor');
            }
        }
    }

    /**
     * Show input for transition editing
     */
    showTransitionInput(transition) {
        try {
            this.hideInput();
            
            const input = this.createInput('transition-label-input', '16px');
            input.value = transition.label || '';
            
            const canvasRect = this.canvas.getBoundingClientRect();
            const midX = (transition.from.x + transition.to.x) / 2;
            const midY = (transition.from.y + transition.to.y) / 2 - 28;
            input.style.left = `${canvasRect.left + midX - 60}px`;
            input.style.top = `${canvasRect.top + midY - 22}px`;
            input.style.width = '120px';
            
            this.setupInput(input, transition, 'transition');
        } catch (error) {
            Logger.error('Error showing transition input', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to show transition editor');
            }
        }
    }

    /**
     * Create input element
     */
    createInput(id, fontSize) {
        Logger.debug('createInput called', { id, fontSize });
        let input = document.getElementById(id);
        if (!input) {
            Logger.debug('Creating new input element');
            input = document.createElement('input');
            input.type = 'text';
            input.id = id;
            input.style.position = 'absolute';
            input.style.zIndex = '20';
            input.style.textAlign = 'center';
            input.style.padding = '2px 6px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #888';
            input.style.transition = 'border-color 0.2s ease';
            document.body.appendChild(input);
        } else {
            Logger.debug('Reusing existing input element');
        }
        
        input.style.fontSize = fontSize;
        input.style.display = 'block';
        
        Logger.debug('Input element configured', { 
            id: input.id, 
            display: input.style.display,
            position: input.style.position,
            zIndex: input.style.zIndex
        });
        
        return input;
    }

    /**
     * Setup input event handlers
     */
    setupInput(input, element, type) {
        Logger.debug('setupInput called', { type, elementLabel: element.label });
        this.activeInput = input;
        this.editingElement = element;
        
        input.focus();
        if (type === 'node') {
            // For nodes, don't select all text by default
        } else {
            input.select();
        }
        
        const handleComplete = () => {
            Logger.debug('Input completed', { newValue: input.value.trim() });
            if (this.editingElement) {
                const rawValue = input.value.trim();
                
                // Sanitize input based on element type
                const sanitizedValue = InputValidator.sanitize(rawValue, type);
                
                // Validate the sanitized value
                if (!InputValidator.validateLength(sanitizedValue, type)) {
                    const rules = InputValidator.getValidationRules(type);
                    Logger.warn('Input too long, truncating', { 
                        original: rawValue.length, 
                        maxLength: rules.maxLength,
                        type 
                    });
                }
                
                // Only proceed if we have a valid value
                if (sanitizedValue && sanitizedValue !== rawValue) {
                    Logger.info('Input sanitized', { 
                        original: rawValue, 
                        sanitized: sanitizedValue,
                        type 
                    });
                }
                
                if (sanitizedValue) {
                    if (type === 'node' || type === 'text') {
                        Logger.debug('Setting label', { type, newValue: sanitizedValue });
                        const oldLabel = this.editingElement.label;
                        this.editingElement.setLabel(sanitizedValue);
                        
                        // Log element modification if label actually changed
                        if (oldLabel !== sanitizedValue) {
                            Logger.elementModify(type, sanitizedValue, 'label', oldLabel, sanitizedValue);
                        }
                    } else if (type === 'transition') {
                        Logger.debug('Setting transition label', { newValue: sanitizedValue });
                        const oldLabel = this.editingElement.label;
                        this.editingElement.setLabel(sanitizedValue);
                        
                        // Log transition modification if label actually changed
                        if (oldLabel !== sanitizedValue) {
                            Logger.elementModify(type, sanitizedValue, 'label', oldLabel, sanitizedValue);
                        }
                    }
                }
                
                this.eventBus.emit('element.edited', {
                    element: this.editingElement,
                    type: type,
                    newValue: sanitizedValue,
                    originalValue: rawValue
                });
                
                this.editingElement = null;
                this.hideInput();
            }
        };

        const handleKeydown = (ev) => {
            if (ev.key === 'Enter') {
                input.blur();
            } else if (ev.key === 'Escape') {
                this.editingElement = null;
                this.hideInput();
            }
        };

        // Real-time validation feedback
        const handleInput = (ev) => {
            const currentValue = ev.target.value;
            const rules = InputValidator.getValidationRules(type);
            
            // Hide any existing validation tooltip
            this.hideValidationTooltip();
            
            // Visual feedback for length
            if (currentValue.length > rules.maxLength) {
                input.style.borderColor = '#e74c3c';
                input.title = `Maximum ${rules.maxLength} characters allowed`;
                this.showValidationTooltip(input, `Too long! Max ${rules.maxLength} characters`, 'error');
            } else if (!InputValidator.isSafe(currentValue, type)) {
                input.style.borderColor = '#f39c12';
                input.title = `Only ${rules.allowedChars.toLowerCase()} allowed`;
                this.showValidationTooltip(input, 'Some characters are not allowed', 'warning');
            } else {
                input.style.borderColor = '#27ae60';
                input.title = rules.description;
            }
        };
        
        // Remove any existing event listeners before adding new ones
        input.onblur = null;
        input.onkeydown = null;
        input.oninput = null;
        
        // Add new event listeners
        input.onblur = handleComplete;
        input.onkeydown = handleKeydown;
        input.oninput = handleInput;
        
        // Set initial validation state
        const rules = InputValidator.getValidationRules(type);
        input.title = rules.description;
        input.placeholder = `Max ${rules.maxLength} chars`;
        
        // Set max length attribute as additional safeguard
        input.maxLength = rules.maxLength;
    }

    /**
     * Hide active input
     */
    hideInput() {
        if (this.activeInput) {
            Logger.debug('Hiding active input', { inputId: this.activeInput.id });
            this.activeInput.style.display = 'none';
            this.activeInput = null;
        }
        this.editingElement = null;
        this.hideValidationTooltip();
    }

    /**
     * Check if currently editing
     */
    isEditing() {
        return this.editingElement !== null;
    }

    /**
     * Get currently editing element
     */
    getEditingElement() {
        return this.editingElement;
    }

    /**
     * Get active input element
     */
    getActiveInput() {
        return this.activeInput;
    }

    /**
     * Cleanup resources and remove any active inputs
     */
    destroy() {
        this.hideInput();
        
        // Remove any remaining input elements created by this service
        const inputIds = ['node-label-input', 'text-label-input', 'transition-label-input'];
        inputIds.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
        this.activeInput = null;
        this.editingElement = null;
        Logger.info('InputService destroyed');
    }

    /**
     * Show validation tooltip
     */
    showValidationTooltip(input, message, type = 'warning') {
        const tooltip = document.createElement('div');
        tooltip.id = 'validation-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.background = type === 'error' ? '#e74c3c' : '#f39c12';
        tooltip.style.color = 'white';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '25';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.textContent = message;
        
        const rect = input.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
        
        // Remove existing tooltip
        const existing = document.getElementById('validation-tooltip');
        if (existing) existing.remove();
        
        document.body.appendChild(tooltip);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }

    /**
     * Hide validation tooltip
     */
    hideValidationTooltip() {
        const tooltip = document.getElementById('validation-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}
