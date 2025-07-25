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
        
        Logger.info('InputService initialized');
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
            Logger.error('Error showing node input', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to show node editor');
            }
        }
    }

    /**
     * Show input for text editing
     */
    showTextInput(text) {
        try {
            Logger.debug('showTextInput called', { text: text.label, x: text.x, y: text.y });
            this.hideInput();
            
            const input = this.createInput('text-label-input', '18px');
            input.value = text.label;
            
            const canvasRect = this.canvas.getBoundingClientRect();
            const leftPos = canvasRect.left + text.x - 60;
            const topPos = canvasRect.top + text.y - 22;
            
            Logger.debug('Input positioning', { 
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
            Logger.debug('Input setup completed');
        } catch (error) {
            Logger.error('Error showing text input', error);
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
                const newValue = input.value.trim();
                if (newValue) {
                    if (type === 'node' || type === 'text') {
                        Logger.debug('Setting label', { type, newValue });
                        this.editingElement.setLabel(newValue);
                    } else if (type === 'transition') {
                        Logger.debug('Setting transition label', { newValue });
                        this.editingElement.setLabel(newValue);
                    }
                }
                
                this.eventBus.emit('element.edited', {
                    element: this.editingElement,
                    type: type,
                    newValue: newValue
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
        
        // Remove any existing event listeners before adding new ones
        input.onblur = null;
        input.onkeydown = null;
        
        // Add new event listeners
        input.onblur = handleComplete;
        input.onkeydown = handleKeydown;
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
}
