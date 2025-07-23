/**
 * Multi-selection manager for group operations
 */
class MultiSelectionManager {
    constructor(eventBus, errorHandler = null) {
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        
        // Selection rectangle state
        this.selectionRect = {
            active: false,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        };
        
        // Selected elements
        this.selectedElements = new Set();
        
        // Group drag state
        this.groupDrag = {
            active: false,
            startX: 0,
            startY: 0,
            initialPositions: new Map()
        };
        
        Logger.info('MultiSelectionManager initialized');
    }

    /**
     * Start selection rectangle
     */
    startSelection(x, y) {
        try {
            this.selectionRect.active = true;
            this.selectionRect.startX = x;
            this.selectionRect.startY = y;
            this.selectionRect.endX = x;
            this.selectionRect.endY = y;
            
            Logger.debug('Selection rectangle started', { x, y });
        } catch (error) {
            Logger.error('Error starting selection', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to start selection');
            }
        }
    }

    /**
     * Update selection rectangle
     */
    updateSelection(x, y) {
        if (!this.selectionRect.active) return;
        
        this.selectionRect.endX = x;
        this.selectionRect.endY = y;
    }

    /**
     * End selection rectangle and select elements
     */
    endSelection(project) {
        try {
            Logger.debug('endSelection called', { active: this.selectionRect.active, project: !!project });
            
            if (!this.selectionRect.active) return;

            const rect = this.getNormalizedRect();
            Logger.debug('Selection rect', rect);
            
            this.selectedElements.clear();

            // Check nodes
            if (project && project.nodes) {
                project.nodes.forEach(node => {
                    if (this.isElementInRect(node, rect)) {
                        this.selectedElements.add(node);
                        Logger.debug('Node selected', { x: node.x, y: node.y });
                    }
                });
            }

            // Check text elements
            if (project && project.texts) {
                project.texts.forEach(text => {
                    if (this.isTextInRect(text, rect)) {
                        this.selectedElements.add(text);
                        Logger.debug('Text selected', { x: text.x, y: text.y });
                    }
                });
            }

            // Check transitions
            if (project && project.transitions) {
                project.transitions.forEach(transition => {
                    if (this.isTransitionInRect(transition, rect)) {
                        this.selectedElements.add(transition);
                        Logger.debug('Transition selected');
                    }
                });
            }

            // Bardzo ważne - ustawiamy to PRZED resztą operacji
            this.selectionRect.active = false;
            Logger.debug('Selection rectangle deactivated');
            
            Logger.userAction('Multi-selection completed', { 
                count: this.selectedElements.size,
                rect: rect
            });
            
            if (this.eventBus && typeof this.eventBus.emit === 'function') {
                this.eventBus.emit('multiselection.changed', {
                    elements: Array.from(this.selectedElements),
                    count: this.selectedElements.size
                });
            }
            
        } catch (error) {
            // Upewniamy się, że selection rectangle jest zawsze wyłączany nawet przy błędzie
            this.selectionRect.active = false;
            Logger.error('Error ending selection', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to complete selection');
            }
        }
    }

    /**
     * Get normalized rectangle (handle negative dimensions)
     */
    getNormalizedRect() {
        const minX = Math.min(this.selectionRect.startX, this.selectionRect.endX);
        const maxX = Math.max(this.selectionRect.startX, this.selectionRect.endX);
        const minY = Math.min(this.selectionRect.startY, this.selectionRect.endY);
        const maxY = Math.max(this.selectionRect.startY, this.selectionRect.endY);
        
        return { minX, maxX, minY, maxY };
    }

    /**
     * Check if node is in selection rectangle
     */
    isElementInRect(element, rect) {
        try {
            if (!element || typeof element.x !== 'number' || typeof element.y !== 'number') {
                return false;
            }
            
            const r = element.r || 20; // Default radius if not defined
            const elementLeft = element.x - r;
            const elementRight = element.x + r;
            const elementTop = element.y - r;
            const elementBottom = element.y + r;
            
            return elementLeft < rect.maxX && elementRight > rect.minX &&
                   elementTop < rect.maxY && elementBottom > rect.minY;
        } catch (error) {
            Logger.error('Error checking element in rect', error);
            return false;
        }
    }

    /**
     * Check if text element is in selection rectangle
     */
    isTextInRect(text, rect) {
        try {
            if (!text || typeof text.x !== 'number' || typeof text.y !== 'number') {
                return false;
            }
            
            const textWidth = 120; // Approximate text width
            const textHeight = 32; // Approximate text height
            const elementLeft = text.x - textWidth / 2;
            const elementRight = text.x + textWidth / 2;
            const elementTop = text.y - textHeight / 2;
            const elementBottom = text.y + textHeight / 2;
            
            return elementLeft < rect.maxX && elementRight > rect.minX &&
                   elementTop < rect.maxY && elementBottom > rect.minY;
        } catch (error) {
            Logger.error('Error checking text in rect', error);
            return false;
        }
    }

    /**
     * Check if transition is in selection rectangle
     */
    isTransitionInRect(transition, rect) {
        try {
            if (!transition || typeof transition.getConnectionPoints !== 'function') {
                return false;
            }
            
            const points = transition.getConnectionPoints();
            if (!points) return false;
            
            // Check if any part of the transition line intersects with rectangle
            const startInRect = points.startX >= rect.minX && points.startX <= rect.maxX &&
                               points.startY >= rect.minY && points.startY <= rect.maxY;
            const endInRect = points.endX >= rect.minX && points.endX <= rect.maxX &&
                             points.endY >= rect.minY && points.endY <= rect.maxY;
            
            return startInRect || endInRect;
        } catch (error) {
            Logger.error('Error checking transition in rect', error);
            return false;
        }
    }

    /**
     * Start group drag operation
     */
    startGroupDrag(x, y) {
        try {
            if (this.selectedElements.size === 0) return false;

            this.groupDrag.active = true;
            this.groupDrag.startX = x;
            this.groupDrag.startY = y;
            this.groupDrag.initialPositions.clear();

            // Store initial positions
            this.selectedElements.forEach(element => {
                this.groupDrag.initialPositions.set(element, {
                    x: element.x,
                    y: element.y
                });
            });

            Logger.userAction('Group drag started', { 
                elementsCount: this.selectedElements.size 
            });
            
            return true;
        } catch (error) {
            Logger.error('Error starting group drag', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to start group drag');
            }
            return false;
        }
    }

    /**
     * Update group drag positions
     */
    updateGroupDrag(x, y) {
        if (!this.groupDrag.active) return;

        const deltaX = x - this.groupDrag.startX;
        const deltaY = y - this.groupDrag.startY;

        this.selectedElements.forEach(element => {
            const initialPos = this.groupDrag.initialPositions.get(element);
            if (initialPos) {
                element.x = initialPos.x + deltaX;
                element.y = initialPos.y + deltaY;
            }
        });
    }

    /**
     * End group drag operation
     */
    endGroupDrag() {
        if (!this.groupDrag.active) return;

        this.groupDrag.active = false;
        
        Logger.userAction('Group drag completed', { 
            elementsCount: this.selectedElements.size 
        });
        
        this.eventBus.emit('elements.moved', {
            elements: Array.from(this.selectedElements)
        });
    }

    /**
     * Clear selection
     */
    clearSelection() {
        this.selectedElements.clear();
        this.selectionRect.active = false;
        this.groupDrag.active = false;
        
        this.eventBus.emit('multiselection.changed', {
            elements: [],
            count: 0
        });
    }

    /**
     * Add element to selection
     */
    addToSelection(element) {
        this.selectedElements.add(element);
        this.eventBus.emit('multiselection.changed', {
            elements: Array.from(this.selectedElements),
            count: this.selectedElements.size
        });
    }

    /**
     * Remove element from selection
     */
    removeFromSelection(element) {
        this.selectedElements.delete(element);
        this.eventBus.emit('multiselection.changed', {
            elements: Array.from(this.selectedElements),
            count: this.selectedElements.size
        });
    }

    /**
     * Check if element is selected
     */
    isSelected(element) {
        return this.selectedElements.has(element);
    }

    /**
     * Get selection rectangle for rendering
     */
    getSelectionRect() {
        if (!this.selectionRect.active) return null;
        
        const rect = this.getNormalizedRect();
        return {
            x: rect.minX,
            y: rect.minY,
            width: rect.maxX - rect.minX,
            height: rect.maxY - rect.minY
        };
    }

    /**
     * Get selected elements count
     */
    getSelectionCount() {
        return this.selectedElements.size;
    }

    /**
     * Get selected elements
     */
    getSelectedElements() {
        return Array.from(this.selectedElements);
    }

    /**
     * Check if group drag is active
     */
    isGroupDragActive() {
        return this.groupDrag.active;
    }

    /**
     * Check if selection rectangle is active
     */
    isSelectionActive() {
        return this.selectionRect.active;
    }

    /**
     * Check if currently selecting (alias for compatibility)
     */
    isSelecting() {
        return this.selectionRect.active;
    }

    /**
     * Check if group dragging (alias for compatibility)
     */
    isGroupDragging() {
        return this.groupDrag.active;
    }

    /**
     * Check if element is selected
     */
    isElementSelected(element, type) {
        return this.selectedElements.has(element);
    }

    /**
     * Get selection rectangle for rendering
     */
    getSelectionRect() {
        if (!this.selectionRect.active) return null;
        
        const x = Math.min(this.selectionRect.startX, this.selectionRect.endX);
        const y = Math.min(this.selectionRect.startY, this.selectionRect.endY);
        const width = Math.abs(this.selectionRect.endX - this.selectionRect.startX);
        const height = Math.abs(this.selectionRect.endY - this.selectionRect.startY);
        
        return { x, y, width, height };
    }

    /**
     * Toggle element selection
     */
    toggleElementSelection(element, type) {
        if (this.selectedElements.has(element)) {
            this.selectedElements.delete(element);
            Logger.userAction('Element deselected', { type, element: element.id || element.label });
        } else {
            this.selectedElements.add(element);
            Logger.userAction('Element selected', { type, element: element.id || element.label });
        }
        
        if (this.eventBus) {
            this.eventBus.emit('multiselection.changed', {
                elements: Array.from(this.selectedElements),
                count: this.selectedElements.size
            });
        }
    }

    /**
     * Clear all selections
     */
    clearSelection() {
        const hadSelection = this.selectedElements.size > 0;
        this.selectedElements.clear();
        
        if (hadSelection) {
            Logger.userAction('Selection cleared');
            if (this.eventBus) {
                this.eventBus.emit('multiselection.changed', {
                    elements: [],
                    count: 0
                });
            }
        }
    }
}
