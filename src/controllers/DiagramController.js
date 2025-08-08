/**
 * Main controller coordinating all application components
 */
class DiagramController {
    constructor(canvas, eventBus, canvasRenderer, storageService, exportService, inputService, nodeFactory, dialogFactory, multiSelectionManager, breakPointService, gridService, errorHandler = null, terminalService = null) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.eventBus = eventBus;
        this.canvasRenderer = canvasRenderer;
        this.storageService = storageService;
        this.exportService = exportService;
        this.inputService = inputService;
        this.nodeFactory = nodeFactory;
        this.dialogFactory = dialogFactory;
        this.multiSelectionManager = multiSelectionManager;
        this.breakPointService = breakPointService;
        this.gridService = gridService;
        this.errorHandler = errorHandler;
        
        // Initialize Data Model Editor
        this.dataModelEditor = new DataModelEditor(eventBus);
        
        // Get terminal service for logging and commands
        this.terminalService = terminalService || window.terminalService;
        
        this.currentProject = new Project({name: null});
        this.autoSaveTimeout = null; // For debouncing auto-save
        this.dragState = {
            type: null,
            isDragging: false,
            element: null,
            offset: {x: 0, y: 0},
            pendingDrag: null
        };
        this.transitionDrawing = {
            active: false,
            startNode: null,
            type: 'right',
            hoveredNode: null // Track hovered node during transition drawing
        };
        this.selection = {
            element: null,
            type: null
        };
        
        Logger.info(t('diagramControllerInitialized'));
        this.initialize();
    }

    /**
     * Initialize controller
     */
    initialize() {
        this.setupEventListeners();
        this.loadAutoSave();
        this.render();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Canvas events
        this.canvas.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.canvas.addEventListener('drop', (e) => this.handleDrop(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e));

        // Keyboard events
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Language change listener - re-render canvas when language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });

        // Event bus events
        this.eventBus.on('element.edited', (data) => this.handleElementEdited(data));
        this.eventBus.on('drag.started', (data) => this.handleDragStarted(data));
        this.eventBus.on('transition.mode', (data) => this.handleTransitionMode(data));
        this.eventBus.on('breakpoint.moved', (data) => this.handleBreakPointMoved(data));
        this.eventBus.on('breakpoints.moved', (data) => this.handleBreakPointsMoved(data));
        this.eventBus.on('datamodel.updated', (data) => this.handleDataModelUpdated(data));
    }

    /**
     * Handle drag over canvas
     */
    handleDragOver(e) {
        e.preventDefault();
    }

    /**
     * Handle drop on canvas
     */
    handleDrop(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Apply grid snap if enabled
        if (this.gridService) {
            const snapped = this.gridService.snapToGrid(x, y);
            x = snapped.x;
            y = snapped.y;
        }
        
        // Log canvas drop with position
        Logger.canvasDrop(this.dragState.type, { x, y });
        
        this.createElement(this.dragState.type, x, y);
        this.dragState.type = null;
    }

    /**
     * Create element based on type
     */
    createElement(type, x, y) {
        switch (type) {
            case 'node':
                this.createNode(x, y);
                break;
            case 'start':
                this.createStartNode(x, y);
                break;
            case 'stop':
                this.createStopNode(x, y);
                break;
            case 'if':
                this.createIFNode(x, y);
                break;
            case 'datamodel':
                this.createDataModelNode(x, y);
                break;
            case 'text':
                this.createText(x, y);
                break;
            case 'transition':
                this.startTransitionDrawing();
                break;
        }
        
        // Trigger auto-save after creating element
        this.triggerAutoSave();
    }

    /**
     * Create regular node
     */
    createNode(x, y) {
        const node = NodeFactory.createNode(x, y, this.currentProject.nodeCounter);
        this.currentProject.addNode(node);
        this.render();
    }

    /**
     * Create start node
     */
    createStartNode(x, y) {
        const node = NodeFactory.createStartNode(x, y);
        this.currentProject.addNode(node);
        this.render();
    }

    /**
     * Create stop node
     */
    createStopNode(x, y) {
        const node = NodeFactory.createStopNode(x, y);
        this.currentProject.addNode(node);
        this.render();
    }

    /**
     * Create IF node with children
     */
    createIFNode(x, y) {
        Logger.debug(t('creatingIfNode'), { x, y });
        
        const {ifNode, trueNode, falseNode} = NodeFactory.createIFNode(x, y);
        
        Logger.debug(t('createdIfNodes'), { 
            ifNode: { id: ifNode.id, x: ifNode.x, y: ifNode.y, rotation: ifNode.rotation },
            trueNode: { id: trueNode.id, x: trueNode.x, y: trueNode.y },
            falseNode: { id: falseNode.id, x: falseNode.x, y: falseNode.y }
        });
        
        // Add nodes first
        this.currentProject.addNode(ifNode);
        this.currentProject.addNode(trueNode);
        this.currentProject.addNode(falseNode);
        
        // Create transitions after nodes are added
        const {trueTransition, falseTransition} = NodeFactory.createIFTransitions(ifNode, trueNode, falseNode);
        
        Logger.debug(t('createdIfTransitions'), { 
            trueTransition: { 
                id: trueTransition.id, 
                label: trueTransition.label, 
                fromCorner: trueTransition.fromCorner,
                from: trueTransition.from ? trueTransition.from.id : null,
                to: trueTransition.to ? trueTransition.to.id : null
            },
            falseTransition: { 
                id: falseTransition.id, 
                label: falseTransition.label, 
                fromCorner: falseTransition.fromCorner,
                from: falseTransition.from ? falseTransition.from.id : null,
                to: falseTransition.to ? falseTransition.to.id : null
            }
        });
        
        this.currentProject.addTransition(trueTransition);
        this.currentProject.addTransition(falseTransition);
        
        this.render();
    }

    /**
     * Create Data Model node
     */
    createDataModelNode(x, y) {
        const node = NodeFactory.createDataModelNode(x, y);
        this.currentProject.addNode(node);
        this.render();
        
        // Auto-open the field editor
        setTimeout(() => {
            this.openDataModelEditor(node);
        }, 100);
    }

    /**
     * Open Data Model Editor
     */
    openDataModelEditor(node) {
        if (!node || node.type !== 'datamodel') {
            Logger.error(t('invalidNodeForDataModelEditor'), { node });
            return;
        }
        
        this.dataModelEditor.open(node);
    }

    /**
     * Create text element
     */
    createText(x, y) {
        const text = new TextElement({x, y, label: 'placeholder1'});
        this.currentProject.addText(text);
        
        // Log text control creation
        Logger.textControl(t('created'), text, { x, y });
        
        this.render();
    }

    /**
     * Start transition drawing mode
     */
    startTransitionDrawing() {
        this.transitionDrawing.active = true;
        this.showTransitionInfo(true, 'start');
        
        // Change cursor to indicate transition drawing mode
        this.canvas.style.cursor = 'crosshair';
        this.canvas.classList.add('transition-drawing-mode');
        
        Logger.info('Transition drawing mode started');
    }

    /**
     * Cancel transition drawing mode
     */
    cancelTransitionDrawing() {
        this.transitionDrawing.active = false;
        this.transitionDrawing.startNode = null;
        this.transitionDrawing.hoveredNode = null;
        this.transitionDrawing.mouseX = null;
        this.transitionDrawing.mouseY = null;
        this.showTransitionInfo(false);
        
        // Restore normal cursor and styling
        this.canvas.style.cursor = 'default';
        this.canvas.classList.remove('transition-drawing-mode');
        
        // Clear any selection from the start node
        this.clearSelection();
        this.render();
        
        Logger.info('Transition drawing cancelled');
    }

    /**
     * Finish transition drawing mode
     */
    finishTransitionDrawing() {
        this.transitionDrawing.active = false;
        this.transitionDrawing.startNode = null;
        this.transitionDrawing.hoveredNode = null;
        this.transitionDrawing.mouseX = null;
        this.transitionDrawing.mouseY = null;
        this.showTransitionInfo(false);
        
        // Restore normal cursor and styling
        this.canvas.style.cursor = 'default';
        this.canvas.classList.remove('transition-drawing-mode');
        
        // Clear selection
        this.clearSelection();
        this.render();
        
        Logger.info('Transition drawing completed');
    }

    /**
     * Handle mouse down
     */
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        Logger.debug('Mouse down at', { x, y, ctrlKey: e.ctrlKey });

        // If we're currently editing and click somewhere else, complete the edit
        if (this.inputService.isEditing()) {
            const editingElement = this.inputService.getEditingElement();
            Logger.debug('Currently editing - completing edit', { element: editingElement });
            
            // Force blur on active input to trigger save
            const activeInput = this.inputService.getActiveInput();
            if (activeInput) {
                activeInput.blur();
            }
            
            // Small delay to allow blur event to complete before continuing
            setTimeout(() => {
                this.handleMouseDownInternal(e, x, y);
            }, 10);
            return;
        }
        
        this.handleMouseDownInternal(e, x, y);
    }

    /**
     * Internal mouse down handling after edit completion
     */
    handleMouseDownInternal(e, x, y) {
        Logger.debug('Mouse down internal', { x, y, ctrlKey: e.ctrlKey });

        // Check if starting multi-selection (click on empty space with Ctrl)
        if (e.ctrlKey) {
            // Find element at position
            const node = this.currentProject.findNodeAtPosition(x, y);
            if (node) {
                Logger.debug('Ctrl+click on node');
                this.multiSelectionManager.toggleElementSelection(node, 'node');
                this.render();
                return;
            }

            const text = this.currentProject.findTextAtPosition(x, y, this.ctx);
            if (text) {
                Logger.debug('Ctrl+click on text');
                this.multiSelectionManager.toggleElementSelection(text, 'text');
                this.render();
                return;
            }

            // Check for break point Ctrl+click
            const breakPointHit = this.breakPointService.findBreakPointAtPosition(this.currentProject.transitions, x, y);
            if (breakPointHit) {
                Logger.debug('Ctrl+click on break point - add transition to selection');
                this.multiSelectionManager.toggleElementSelection(breakPointHit.transition, 'transition');
                this.render();
                return;
            }

            const transition = this.currentProject.findTransitionNearPosition(x, y);
            if (transition) {
                Logger.debug('Ctrl+click on transition');
                this.multiSelectionManager.toggleElementSelection(transition, 'transition');
                this.render();
                return;
            }
        }

        // Check if we're clicking on a multi-selected element for group drag
        const clickedNode = this.currentProject.findNodeAtPosition(x, y);
        if (clickedNode && this.multiSelectionManager.isElementSelected(clickedNode, 'node')) {
            Logger.debug('Group drag start - node');
            this.startGroupDragging(x, y);
            return;
        }

        const clickedText = this.currentProject.findTextAtPosition(x, y, this.ctx);
        if (clickedText && this.multiSelectionManager.isElementSelected(clickedText, 'text')) {
            Logger.debug('Group drag start - text');
            this.startGroupDragging(x, y);
            return;
        }

        // Standard single element handling
        const node = this.currentProject.findNodeAtPosition(x, y);
        if (node) {
            Logger.debug('Single click on node - start dragging');
            this.multiSelectionManager.clearSelection();
            this.startDragging(node, 'node', x, y);
            return;
        }

        const text = this.currentProject.findTextAtPosition(x, y, this.ctx);
        if (text) {
            Logger.debug('Single click on text - start dragging');
            this.multiSelectionManager.clearSelection();
            this.startDragging(text, 'text', x, y);
            return;
        }

        // Check for break point click
        const breakPointHit = this.breakPointService.findBreakPointAtPosition(this.currentProject.transitions, x, y);
        if (breakPointHit) {
            Logger.debug('Single click on break point - start dragging');
            this.multiSelectionManager.clearSelection();
            this.startDraggingBreakPoint(breakPointHit, x, y);
            return;
        }

        const transition = this.currentProject.findTransitionNearPosition(x, y);
        if (transition) {
            Logger.debug('Single click on transition');
            this.multiSelectionManager.clearSelection();
            this.setSelection(transition, 'transition');
            // Don't start dragging immediately - wait for mouse move
            this.dragState.pendingDrag = {
                element: transition,
                type: 'transition',
                startX: x,
                startY: y
            };
            return;
        }

        Logger.debug('Click on empty space - start rectangle selection');
        // Start selection rectangle
        this.multiSelectionManager.startSelection(x, y);
        this.clearSelection();
        this.inputService.hideInput(); // Hide input when clicking on empty space
    }

    /**
     * Start dragging element
     */
    startDragging(element, type, x, y) {
        Logger.debug('Start dragging', { type, x, y, elementX: element.x, elementY: element.y });
        this.dragState.isDragging = true;
        this.dragState.element = element;
        this.dragState.type = type;
        this.dragState.offset.x = x - element.x;
        this.dragState.offset.y = y - element.y;
        
        // Store initial position for break point updates
        this.dragState.initialPosition = {
            x: element.x,
            y: element.y
        };
        
        this.setSelection(element, type);
    }

    /**
     * Start group dragging for multi-selected elements
     */
    startGroupDragging(x, y) {
        this.multiSelectionManager.startGroupDrag(x, y);
    }

    /**
     * Start dragging break point
     */
    startDraggingBreakPoint(breakPointHit, x, y) {
        Logger.debug('Start dragging break point', { 
            transition: breakPointHit.transition.label, 
            index: breakPointHit.breakPointIndex, 
            x, y 
        });
        
        this.dragState.isDragging = true;
        this.dragState.element = breakPointHit.breakPoint;
        this.dragState.type = 'breakpoint';
        this.dragState.breakPointData = breakPointHit;
        this.dragState.offset.x = x - breakPointHit.breakPoint.x;
        this.dragState.offset.y = y - breakPointHit.breakPoint.y;
        
        // Select the transition containing this break point
        this.setSelection(breakPointHit.transition, 'transition');
    }

    /**
     * Start dragging transition (moves all break points together)
     */
    startDraggingTransition(transition, x, y) {
        Logger.debug('Start dragging transition', { 
            transition: transition.label, 
            breakPointsCount: transition.breakPoints.length,
            x, y 
        });
        
        this.dragState.isDragging = true;
        this.dragState.element = transition;
        this.dragState.type = 'transition';
        this.dragState.offset.x = x;
        this.dragState.offset.y = y;
        
        // Store initial positions of all break points for relative movement
        this.dragState.initialBreakPoints = transition.breakPoints.map(bp => ({
            x: bp.x,
            y: bp.y
        }));
    }

    /**
     * Handle mouse move
     */
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Handle transition drawing mode - show preview and highlight nodes
        if (this.transitionDrawing.active) {
            const hoveredNode = this.currentProject.findNodeAtPosition(x, y);
            
            // Update hovered node if changed
            if (this.transitionDrawing.hoveredNode !== hoveredNode) {
                this.transitionDrawing.hoveredNode = hoveredNode;
                this.render(); // Re-render to show/hide highlighting
            }
            
            // Store mouse position for preview line
            this.transitionDrawing.mouseX = x;
            this.transitionDrawing.mouseY = y;
            this.render();
            return;
        }

        // Check for pending drag - start dragging if mouse moved enough
        if (this.dragState.pendingDrag) {
            const deltaX = Math.abs(x - this.dragState.pendingDrag.startX);
            const deltaY = Math.abs(y - this.dragState.pendingDrag.startY);
            const dragThreshold = 5; // pixels
            
            if (deltaX > dragThreshold || deltaY > dragThreshold) {
                const { element, type } = this.dragState.pendingDrag;
                if (type === 'transition') {
                    this.startDraggingTransition(element, this.dragState.pendingDrag.startX, this.dragState.pendingDrag.startY);
                }
                this.dragState.pendingDrag = null;
            }
            return;
        }

        // Handle selection rectangle
        if (this.multiSelectionManager.isSelecting()) {
            this.multiSelectionManager.updateSelection(x, y);
            this.render();
            return;
        }

        // Handle group dragging
        if (this.multiSelectionManager.isGroupDragging()) {
            this.multiSelectionManager.updateGroupDrag(x, y);
            this.render();
            return;
        }

        // Handle single element dragging
        if (!this.dragState.isDragging || !this.dragState.element) return;

        const newX = x - this.dragState.offset.x;
        const newY = y - this.dragState.offset.y;

        // Handle break point dragging
        if (this.dragState.type === 'breakpoint') {
            const { transition, breakPointIndex } = this.dragState.breakPointData;
            const canvasBounds = { width: this.canvas.width, height: this.canvas.height };
            const validatedPos = this.breakPointService.validateBreakPointPosition(newX, newY, canvasBounds);
            
            this.breakPointService.moveBreakPoint(transition, breakPointIndex, validatedPos.x, validatedPos.y);
        } else if (this.dragState.type === 'transition') {
            // Handle transition dragging - move all break points together
            const deltaX = x - this.dragState.offset.x;
            const deltaY = y - this.dragState.offset.y;
            
            this.dragState.element.breakPoints.forEach((breakPoint, index) => {
                const initialBp = this.dragState.initialBreakPoints[index];
                if (initialBp) {
                    const canvasBounds = { width: this.canvas.width, height: this.canvas.height };
                    const validatedPos = this.breakPointService.validateBreakPointPosition(
                        initialBp.x + deltaX, 
                        initialBp.y + deltaY, 
                        canvasBounds
                    );
                    breakPoint.x = validatedPos.x;
                    breakPoint.y = validatedPos.y;
                }
            });
        } else {
            // Handle regular element dragging
            const oldX = this.dragState.element.x;
            const oldY = this.dragState.element.y;
            
            let targetX = newX;
            let targetY = newY;
            
            // Apply grid snap if enabled
            if (this.gridService) {
                const snapped = this.gridService.snapToGrid(newX, newY);
                targetX = snapped.x;
                targetY = snapped.y;
                
                // Find smart guides for alignment
                if (this.dragState.type === 'node' || this.dragState.type === 'text') {
                    const allElements = [
                        ...this.currentProject.nodes,
                        ...this.currentProject.texts
                    ];
                    
                    const guideResult = this.gridService.findSmartGuides(
                        this.dragState.element,
                        allElements,
                        targetX,
                        targetY
                    );
                    
                    if (guideResult.guides.length > 0) {
                        targetX = guideResult.snapX;
                        targetY = guideResult.snapY;
                        this.gridService.showSmartGuides(guideResult.guides);
                    } else {
                        this.gridService.clearSmartGuides();
                    }
                }
            }
            
            this.dragState.element.moveTo(targetX, targetY);

            // Update break points if moving a node
            if (this.dragState.type === 'node') {
                const deltaX = this.dragState.element.x - oldX;
                const deltaY = this.dragState.element.y - oldY;
                
                this.breakPointService.updateBreakPointsForMovedNode(
                    this.dragState.element,
                    this.currentProject.transitions,
                    deltaX,
                    deltaY
                );
            }

            // Update IF node connections if moving IF node
            if (this.dragState.element.type === 'if') {
                this.updateIFNodeConnections(this.dragState.element);
            }
        }

        this.render();
    }

    /**
     * Handle mouse up
     */
    handleMouseUp(e) {
        let wasModified = false;
        
        // End selection rectangle
        if (this.multiSelectionManager.isSelecting()) {
            this.multiSelectionManager.endSelection(this.currentProject);
            this.render();
        }

        // End group dragging
        if (this.multiSelectionManager.isGroupDragging()) {
            this.multiSelectionManager.endGroupDrag();
            wasModified = true;
        }

        // End single element dragging and log movement
        if (this.dragState.isDragging && this.dragState.element && this.dragState.initialPosition) {
            const element = this.dragState.element;
            const initialPos = this.dragState.initialPosition;
            const currentPos = { x: element.x, y: element.y };
            
            // Check if element actually moved
            const deltaX = Math.abs(currentPos.x - initialPos.x);
            const deltaY = Math.abs(currentPos.y - initialPos.y);
            const moveThreshold = 2; // pixels
            
            if (deltaX > moveThreshold || deltaY > moveThreshold) {
                // Log element movement
                const elementLabel = element.label || element.id || 'Unknown';
                Logger.elementMove(this.dragState.type, elementLabel, initialPos, currentPos);
            }
            
            wasModified = true;
        }
        
        // Clear smart guides when dragging ends
        if (this.gridService) {
            this.gridService.clearSmartGuides();
        }
        
        this.dragState.isDragging = false;
        this.dragState.element = null;
        this.dragState.type = null;
        this.dragState.breakPointData = null;
        this.dragState.pendingDrag = null; // Clear pending drag state
        this.dragState.initialPosition = null; // Clear initial position
        
        // Trigger auto-save if elements were moved
        if (wasModified) {
            this.triggerAutoSave();
        }
    }

    /**
     * Handle canvas click
     */
    handleClick(e) {
        if (!this.transitionDrawing.active) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const node = this.currentProject.findNodeAtPosition(x, y);

        // If clicking outside any node, cancel transition drawing
        if (!node) {
            this.cancelTransitionDrawing();
            return;
        }

        if (!this.transitionDrawing.startNode) {
            // First node selection
            this.transitionDrawing.startNode = node;
            this.showTransitionInfo(true, 'waiting');
            
            // Highlight selected start node
            this.setSelection(node, 'node');
            this.render();
            
            Logger.debug('Transition start node selected', { nodeId: node.id, nodeType: node.type });
            
        } else if (this.transitionDrawing.startNode !== node) {
            // Second node selection - create transition
            // Additional validation before attempting to create transition
            if (!this.transitionDrawing.startNode) {
                Logger.error('StartNode is null when trying to create transition');
                this.cancelTransitionDrawing();
                return;
            }
            
            const transitionCreated = this.createTransition(this.transitionDrawing.startNode, node);
            
            if (transitionCreated) {
                Logger.info('Transition created successfully', { 
                    from: this.transitionDrawing.startNode.id, 
                    to: node.id 
                });
            } else {
                Logger.warn('Transition creation failed or duplicate detected', {
                    from: this.transitionDrawing.startNode ? this.transitionDrawing.startNode.id : 'null',
                    to: node.id
                });
            }
            
            // Always finish transition drawing regardless of success
            this.finishTransitionDrawing();
            
        } else {
            // Clicking the same node - cancel transition drawing
            this.cancelTransitionDrawing();
            Logger.debug('Transition cancelled - same node clicked twice');
        }
    }

    /**
     * Create transition between nodes
     */
    createTransition(fromNode, toNode) {
        // Validate nodes before creating transition
        if (!fromNode || !toNode) {
            Logger.error('Cannot create transition - invalid nodes', { fromNode, toNode });
            return false;
        }
        
        // Check for duplicate transition
        const existingTransition = this.currentProject.transitions.find(tr => 
            tr.from === fromNode && tr.to === toNode
        );
        
        if (existingTransition) {
            Logger.warn('Transition already exists between these nodes', {
                from: fromNode.id,
                to: toNode.id,
                existingLabel: existingTransition.label
            });
            return false;
        }
        
        const transition = new Transition({
            from: fromNode,
            to: toNode,
            label: 'relation',
            type: this.transitionDrawing.type
        });
        
        const added = this.currentProject.addTransition(transition);
        if (added) {
            this.render();
            // Trigger auto-save after creating transition
            this.triggerAutoSave();
            Logger.info('Transition created successfully', {
                from: fromNode.id,
                to: toNode.id,
                label: transition.label
            });
        }
        
        return added;
    }

    /**
     * Handle double click for editing
     */
    handleDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        Logger.debug('Double click at', { x, y });

        const node = this.currentProject.findNodeAtPosition(x, y);
        if (node) {
            Logger.debug('Double click on node', { label: node.label, type: node.type });
            
            // Special handling for DataModelNode
            if (node.type === 'datamodel') {
                this.openDataModelEditor(node);
                this.setSelection(node, 'node');
                return;
            }
            
            this.inputService.showNodeInput(node);
            this.setSelection(node, 'node');
            return;
        }

        const text = this.currentProject.findTextAtPosition(x, y, this.ctx);
        if (text) {
            Logger.debug('Double click on text', { label: text.label });
            this.inputService.showTextInput(text);
            this.setSelection(text, 'text');
            return;
        }

        const transition = this.currentProject.findTransitionNearPosition(x, y);
        if (transition) {
            Logger.debug('Double click on transition', { label: transition.label });
            this.inputService.showTransitionInput(transition);
            this.setSelection(transition, 'transition');
        }
    }

    /**
     * Handle context menu
     */
    handleContextMenu(e) {
        e.preventDefault();
        
        // If in transition drawing mode, cancel it on right click
        if (this.transitionDrawing.active) {
            this.cancelTransitionDrawing();
            return; // Don't show context menu
        }
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check for transition first
        const transition = this.currentProject.findTransitionNearPosition(x, y);
        if (transition) {
            this.showTransitionOptions(transition, e.clientX, e.clientY, x, y);
            return;
        }
        
        // Check for text element
        const text = this.currentProject.findTextAtPosition(x, y, this.ctx);
        if (text) {
            this.showTextElementOptions(text, e.clientX, e.clientY);
            return;
        }
        
        // Check for node
        const node = this.currentProject.findNodeAtPosition(x, y);
        if (node) {
            if (node.type === 'if') {
                this.showIFOptions(node, e.clientX, e.clientY);
            } else if (node.type === 'datamodel') {
                // Data models get extended options with ID
                this.showDataModelOptions(node, e.clientX, e.clientY);
            } else {
                this.showNodeOptions(node, e.clientX, e.clientY);
            }
        }
    }

    /**
     * Handle keyboard events
     */
    handleKeyDown(e) {
        // Handle Delete key for selected elements
        if (e.key === 'Delete' && this.selection.element) {
            this.deleteSelectedElement();
            return;
        }
        
        // Handle Escape key for canceling transition drawing
        if (e.key === 'Escape' && this.transitionDrawing.active) {
            this.cancelTransitionDrawing();
            return;
        }
        
        // Handle Escape key for canceling other operations
        if (e.key === 'Escape') {
            // Cancel any active input editing
            if (this.inputService.isEditing()) {
                this.inputService.hideInput();
            }
            
            // Clear multi-selection
            if (this.multiSelectionManager.hasSelection()) {
                this.multiSelectionManager.clearSelection();
                this.clearSelection();
                this.render();
            }
        }
    }

    /**
     * Delete selected element
     */
    deleteSelectedElement() {
        const {element, type} = this.selection;
        
        if (type === 'node') {
            if (element.type === 'if') {
                // For IF nodes, remove the IF node and its associated TRUE/FALSE nodes
                this.removeIFNodeWithChildren(element);
            } else {
                this.currentProject.removeNode(element);
            }
        } else if (type === 'text') {
            this.currentProject.removeText(element);
        } else if (type === 'transition') {
            // Prevent deletion of IF transitions
            if (element.from.type === 'if' && element.fromCorner) {
                return;
            }
            this.currentProject.removeTransition(element);
        }
        
        this.clearSelection();
        this.render();
        
        // Trigger auto-save after deleting element
        this.triggerAutoSave();
    }

    /**
     * Remove IF node with its TRUE/FALSE children
     */
    removeIFNodeWithChildren(ifNode) {
        // Find outgoing transitions from the IF node
        const outgoingTransitions = this.currentProject.transitions.filter(tr => tr.from === ifNode);
        
        // Find TRUE/FALSE nodes connected to this IF node
        const connectedNodes = outgoingTransitions.map(tr => tr.to);
        
        // Remove the IF node itself
        this.currentProject.removeNode(ifNode);
        
        // Remove connected TRUE/FALSE nodes that are part of this IF structure
        connectedNodes.forEach(node => {
            if (node && (node.label === 'Step1' || node.label === 'Step2')) {
                // Check if this node is only connected to the IF node we're removing
                const otherConnections = this.currentProject.transitions.filter(tr => 
                    (tr.from === node || tr.to === node) && tr.from !== ifNode && tr.to !== ifNode
                );
                
                // If no other connections, it's safe to remove this TRUE/FALSE node
                if (otherConnections.length === 0) {
                    this.currentProject.removeNode(node);
                }
            }
        });
    }

    /**
     * Set current selection
     */
    setSelection(element, type) {
        this.selection.element = element;
        this.selection.type = type;
        this.canvasRenderer.setSelection(element, type);
        this.eventBus.emit('selection.changed', {element, type});
        this.render();
    }

    /**
     * Clear current selection
     */
    clearSelection() {
        this.selection.element = null;
        this.selection.type = null;
        this.canvasRenderer.clearSelection();
        this.eventBus.emit('selection.changed', {element: null, type: null});
        this.render();
    }

    /**
     * Show color picker for node
     */
    showColorPicker(node, x, y) {
        try {
            console.log('showColorPicker called with:', {node, x, y});
            
            if (!DialogFactory || typeof DialogFactory.createColorPicker !== 'function') {
                console.error('DialogFactory.createColorPicker is not available');
                if (this.terminalService) {
                    this.terminalService.addLine('❌ Color picker not available', 'error');
                }
                return;
            }
            
            DialogFactory.createColorPicker(node, x, y, (color) => {
                console.log('Color selected:', color, 'for node:', node);
                
                if (!node || typeof node.setColor !== 'function') {
                    console.error('Node or setColor method not available:', node);
                    return;
                }
                
                node.setColor(color);
                this.render();
                
                if (this.terminalService) {
                    this.terminalService.addLine(`🎨 Changed color of ${node.label} to ${color}`, 'success');
                }
            });
        } catch (error) {
            console.error('Error in showColorPicker:', error);
            if (this.terminalService) {
                this.terminalService.addLine(`❌ Error changing color: ${error.message}`, 'error');
            }
        }
    }

    /**
     * Show IF node options
     */
    showIFOptions(node, x, y) {
        const options = [
            {
                text: `${t('nodeId')}: ${node.id}`,
                action: () => this.copyToClipboard(node.id),
                className: 'context-menu-info'
            },
            {
                text: `${t('label')}: ${node.label}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: `${t('rotation')}: ${node.rotation}°`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: '──────────',
                action: null,
                className: 'context-menu-separator'
            },
            {
                text: t('copyIdToClipboard'),
                action: () => this.copyToClipboard(node.id)
            },
            {
                text: t('showInTerminal'),
                action: () => this.showElementInTerminal(node)
            },
            {
                text: t('rotateClockwise'),
                action: () => this.rotateIFNode(node)
            },
            {
                text: t('rotateCounterClockwise'),
                action: () => this.rotateIFNodeCounterClockwise(node)
            },
            {
                text: t('changeColor'),
                action: () => this.showColorPicker(node, x, y)
            }
        ];

        DialogFactory.createIFOptionsMenu(node, x, y, options);
    }

    /**
     * Rotate IF node counter-clockwise (90 degrees)
     */
    rotateIFNodeCounterClockwise(ifNode) {
        Logger.debug('Rotating IF node counter-clockwise', { 
            ifNodeId: ifNode.id, 
            currentRotation: ifNode.rotation
        });
        
        ifNode.rotateCounterClockwise();
        
        const allIFTransitions = this.currentProject.transitions.filter(tr => tr.from === ifNode);
        const trueTransition = allIFTransitions.find(tr => tr.label === 'Step1');
        const falseTransition = allIFTransitions.find(tr => tr.label === 'Step2');
        
        Logger.debug('Found transitions for counter-clockwise rotation', { 
            trueTransition: trueTransition ? trueTransition.label : null,
            falseTransition: falseTransition ? falseTransition.label : null,
            newRotation: ifNode.rotation
        });
        
        if (trueTransition && falseTransition) {
            NodeFactory.updateIFNodePositioning(ifNode, trueTransition, falseTransition);
        } else {
            Logger.error('Missing transitions for IF counter-clockwise rotation', { 
                ifNodeId: ifNode.id,
                foundTransitions: allIFTransitions.map(tr => tr.label)
            });
        }
        
        this.render();
    }

    /**
     * Show transition style options
     */
    showTransitionOptions(transition, screenX, screenY, canvasX, canvasY) {
        // Block options for IF transitions - they must stay as robot arms
        if (transition.from.type === 'if' && (transition.label === 'Step1' || transition.label === 'Step2')) {
            Logger.debug('Blocking options for IF transition - robot arms cannot be modified', {
                label: transition.label,
                fromType: transition.from.type
            });
            return; // No options for IF transitions
        }
        
        const options = [
            {
                text: `${t('transitionId')}: ${transition.id}`,
                action: () => this.copyToClipboard(transition.id),
                className: 'context-menu-info'
            },
            {
                text: `${t('label')}: ${transition.label}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: `${t('style')}: ${transition.style}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: '──────────',
                action: null,
                className: 'context-menu-separator'
            },
            {
                text: t('copyIdToClipboard'),
                action: () => this.copyToClipboard(transition.id)
            },
            {
                text: t('showInTerminal'),
                action: () => this.showElementInTerminal(transition)
            },
            {
                text: transition.style === 'straight' ? t('convertToCurved') : t('convertToStraight'),
                action: () => this.toggleTransitionStyle(transition)
            },
            {
                text: 'Add Break Point',
                action: () => this.addTransitionBreakPoint(transition, canvasX, canvasY)
            }
        ];

        // Add remove break point option if there are break points near click
        if (transition.isNearBreakPoint(canvasX, canvasY)) {
            options.push({
                text: 'Remove Break Point',
                action: () => this.removeTransitionBreakPoint(transition, canvasX, canvasY)
            });
        }

        // Add clear all break points if there are any
        if (transition.breakPoints.length > 0) {
            options.push({
                text: 'Clear All Break Points',
                action: () => this.clearTransitionBreakPoints(transition)
            });
        }

        DialogFactory.createContextMenu(screenX, screenY, options);
    }

    /**
     * Show regular node options with ID display
     */
    showNodeOptions(node, x, y) {
        const options = [
            {
                text: `${t('nodeId')}: ${node.id}`,
                action: () => this.copyToClipboard(node.id),
                className: 'context-menu-info'
            },
            {
                text: `${t('type')}: ${node.type}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: `${t('label')}: ${node.label}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: '──────────',
                action: null,
                className: 'context-menu-separator'
            },
            {
                text: t('copyIdToClipboard'),
                action: () => this.copyToClipboard(node.id)
            },
            {
                text: t('showInTerminal'),
                action: () => this.showElementInTerminal(node)
            },
            {
                text: t('changeColor'),
                action: () => this.showColorPicker(node, x, y)
            }
        ];

        DialogFactory.createContextMenu(x, y, options);
    }

    /**
     * Show text element options with ID display
     */
    showTextElementOptions(text, x, y) {
        const options = [
            {
                text: `${t('textId')}: ${text.id}`,
                action: () => this.copyToClipboard(text.id),
                className: 'context-menu-info'
            },
            {
                text: `${t('label')}: ${text.label}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: `${t('position')}: (${Math.round(text.x)}, ${Math.round(text.y)})`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: '──────────',
                action: null,
                className: 'context-menu-separator'
            },
            {
                text: t('copyIdToClipboard'),
                action: () => this.copyToClipboard(text.id)
            },
            {
                text: t('showInTerminal'),
                action: () => this.showElementInTerminal(text)
            }
        ];

        DialogFactory.createContextMenu(x, y, options);
    }

    /**
     * Show data model options with ID display and edit functionality
     */
    showDataModelOptions(node, x, y) {
        const options = [
            {
                text: `${t('dataModelId')}: ${node.id}`,
                action: () => this.copyToClipboard(node.id),
                className: 'context-menu-info'
            },
            {
                text: `${t('label')}: ${node.label}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: `${t('fields')}: ${node.fields ? node.fields.length : 0}`,
                action: null,
                className: 'context-menu-info'
            },
            {
                text: '──────────',
                action: null,
                className: 'context-menu-separator'
            },
            {
                text: t('copyIdToClipboard'),
                action: () => this.copyToClipboard(node.id)
            },
            {
                text: t('showInTerminal'),
                action: () => this.showElementInTerminal(node)
            },
            {
                text: t('editDataModel'),
                action: () => this.openDataModelEditor(node)
            },
            {
                text: t('changeColor'),
                action: () => this.showColorPicker(node, x, y)
            }
        ];

        DialogFactory.createContextMenu(x, y, options);
    }

    /**
     * Open data model editor
     */
    openDataModelEditor(node) {
        if (this.dataModelEditor) {
            this.dataModelEditor.open(node);
        } else {
            console.warn('Data model editor not available');
            if (this.terminalService) {
                this.terminalService.addLine('❌ Data model editor not available', 'error');
            }
        }
    }

    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            console.log('copyToClipboard called with:', text);
            
            if (!navigator.clipboard) {
                console.warn('Clipboard API not available, using fallback');
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            } else {
                await navigator.clipboard.writeText(text);
            }
            
            if (this.terminalService) {
                this.terminalService.addLine(`📋 Copied to clipboard: ${text}`, 'success');
            }
            
            console.log('Successfully copied to clipboard:', text);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            if (this.terminalService) {
                this.terminalService.addLine(`❌ Failed to copy to clipboard: ${error.message}`, 'error');
            }
        }
    }

    /**
     * Show element details in terminal
     */
    showElementInTerminal(element) {
        if (!this.terminalService) {
            console.warn('Terminal service not available');
            return;
        }
        
        // Ensure terminal is visible
        if (!this.terminalService.isVisible) {
            this.terminalService.toggle();
        }
        
        this.terminalService.addLine('═══ ELEMENT DETAILS ═══', 'info');
        this.terminalService.addLine(`🔹 ID: ${element.id}`, 'info');
        this.terminalService.addLine(`🔹 Type: ${element.type || element.constructor.name}`, 'info');
        this.terminalService.addLine(`🔹 Label: ${element.label}`, 'info');
        
        if (element.x !== undefined && element.y !== undefined) {
            this.terminalService.addLine(`🔹 Position: (${Math.round(element.x)}, ${Math.round(element.y)})`, 'info');
        }
        
        if (element.color) {
            this.terminalService.addLine(`🔹 Color: ${element.color}`, 'info');
        }
        
        if (element.type === 'DataModel' && element.fields) {
            this.terminalService.addLine(`🔹 Fields: ${element.fields.length}`, 'info');
            element.fields.forEach((field, index) => {
                this.terminalService.addLine(`  ${index + 1}. ${field.name} (${field.type})`, 'info');
            });
        }
        
        if (element.from && element.to) { // Transition
            this.terminalService.addLine(`🔹 From: ${element.from.id}`, 'info');
            this.terminalService.addLine(`🔹 To: ${element.to.id}`, 'info');
            this.terminalService.addLine(`🔹 Style: ${element.style}`, 'info');
        }
        
        // Auto-scroll terminal to show new content
        this.terminalService.scrollToBottom();
    }

    /**
     * Rotate IF node
     */
    rotateIFNode(ifNode) {
        Logger.debug('Rotating IF node', { 
            ifNodeId: ifNode.id, 
            currentRotation: ifNode.rotation,
            allTransitions: this.currentProject.transitions.filter(tr => tr.from === ifNode).map(tr => ({id: tr.id, label: tr.label}))
        });
        
        ifNode.toggleRotation();
        
        const allIFTransitions = this.currentProject.transitions.filter(tr => tr.from === ifNode);
        const trueTransition = allIFTransitions.find(tr => tr.label === 'Step1');
        const falseTransition = allIFTransitions.find(tr => tr.label === 'Step2');
        
        Logger.debug('Found transitions for rotation', { 
            trueTransition: trueTransition ? trueTransition.label : null,
            falseTransition: falseTransition ? falseTransition.label : null,
            newRotation: ifNode.rotation
        });
        
        if (trueTransition && falseTransition) {
            NodeFactory.updateIFNodePositioning(ifNode, trueTransition, falseTransition);
        } else {
            Logger.error('Missing transitions for IF rotation', { 
                ifNodeId: ifNode.id,
                foundTransitions: allIFTransitions.map(tr => tr.label)
            });
        }
        
        this.render();
    }

    /**
     * Update IF node connections when moving
     */
    updateIFNodeConnections(ifNode) {
        const outgoingTransitions = this.currentProject.transitions.filter(tr => tr.from === ifNode);
        
        if (outgoingTransitions.length >= 2) {
            const step1Transition = outgoingTransitions.find(tr => tr.label === 'Step1');
            const step2Transition = outgoingTransitions.find(tr => tr.label === 'Step2');
            
            if (step1Transition && step2Transition) {
                // Use the same rotation logic as NodeFactory
                NodeFactory.updateIFNodePositioning(ifNode, step1Transition, step2Transition);
            }
        }
    }

    /**
     * Toggle transition style between straight and curved
     */
    toggleTransitionStyle(transition) {
        transition.toggleStyle();
        this.triggerAutoSave();
        this.render();
        Logger.info('Transition style toggled', { 
            style: transition.style, 
            label: transition.label 
        });
    }

    /**
     * Add break point to transition
     */
    addTransitionBreakPoint(transition, x, y) {
        transition.addBreakPoint(x, y);
        this.triggerAutoSave();
        this.render();
        Logger.info('Break point added to transition', { 
            x, y, 
            totalPoints: transition.breakPoints.length,
            label: transition.label 
        });
    }

    /**
     * Remove break point from transition
     */
    removeTransitionBreakPoint(transition, x, y) {
        const removed = transition.removeBreakPoint(x, y);
        if (removed) {
            this.triggerAutoSave();
            this.render();
            Logger.info('Break point removed from transition', { 
                x, y, 
                remainingPoints: transition.breakPoints.length,
                label: transition.label 
            });
        }
    }

    /**
     * Clear all break points from transition
     */
    clearTransitionBreakPoints(transition) {
        const previousCount = transition.breakPoints.length;
        transition.clearBreakPoints();
        this.triggerAutoSave();
        this.render();
        Logger.info('All break points cleared from transition', { 
            previousCount,
            label: transition.label 
        });
    }

    /**
     * Show transition info
     */
    showTransitionInfo(show, phase = 'start') {
        let info = document.getElementById('transition-info');
        if (!info) {
            info = document.createElement('div');
            info.id = 'transition-info';
            info.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-weight: 600;
                z-index: 1000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                max-width: 280px;
            `;
            document.body.appendChild(info);
            
            // Add CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                #transition-info {
                    animation: slideInRight 0.3s ease-out;
                }
            `;
            document.head.appendChild(style);
        }
        
        if (show) {
            const messages = {
                start: {
                    title: '🔗 Kliknij pierwszy węzeł',
                    subtitle: 'Rozpocznij rysowanie relacji'
                },
                waiting: {
                    title: '🎯 Kliknij węzeł docelowy',
                    subtitle: 'Zakończ rysowanie relacji'
                }
            };
            
            const message = messages[phase] || messages.start;
            
            info.innerHTML = `
                <div style="font-size: 16px; margin-bottom: 6px;">
                    ${message.title}
                </div>
                <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">
                    ${message.subtitle}
                </div>
                <div style="font-size: 11px; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 6px;">
                    ESC lub prawy klik - anuluj
                </div>
            `;
            info.style.display = 'block';
        } else {
            info.style.display = 'none';
        }
    }

    /**
     * Handle element edited event
     */
    handleElementEdited(data) {
        Logger.debug('Element edited event received', { type: data.type, newValue: data.newValue });
        this.render();
        
        // Trigger auto-save after editing element
        this.triggerAutoSave();
    }

    /**
     * Handle data model updated event
     */
    handleDataModelUpdated(data) {
        Logger.debug('Data model updated event received', { node: data.node });
        this.render();
        
        // Trigger auto-save after editing data model
        this.triggerAutoSave();
    }

    /**
     * Handle drag started event
     */
    handleDragStarted(data) {
        this.dragState.type = data.type;
        if (data.transitionType) {
            this.transitionDrawing.type = data.transitionType;
        }
    }

    /**
     * Handle break point moved event
     */
    handleBreakPointMoved(data) {
        Logger.debug('Break point moved event received', data);
        this.render();
        this.triggerAutoSave();
    }

    /**
     * Handle multiple break points moved event
     */
    handleBreakPointsMoved(data) {
        Logger.debug('Multiple break points moved event received', data);
        this.render();
        this.triggerAutoSave();
    }

    /**
     * Handle transition mode event
     */
    handleTransitionMode(data) {
        this.transitionDrawing.type = data.type;
    }

    /**
     * Render current state
     */
    render() {
        // Pass transition drawing state to renderer for preview effects
        const transitionDrawingState = this.transitionDrawing.active ? this.transitionDrawing : null;
        this.canvasRenderer.render(this.currentProject, this.multiSelectionManager, transitionDrawingState);
        
        // Don't hide input during editing - removed this.inputService.hideInput();
        this.autoSave();
    }

    /**
     * Load project
     */
    loadProject(project) {
        this.currentProject = project;
        this.clearSelection();
        this.render();
        this.eventBus.emit('project.loaded', project);
    }

    /**
     * Create new project
     */
    newProject() {
        this.currentProject = new Project({name: null});
        this.clearSelection();
        this.transitionDrawing.active = false;
        this.showTransitionInfo(false);
        this.inputService.hideInput();
        this.render();
        this.eventBus.emit('project.created');
    }

    /**
     * Clear project
     */
    clearProject() {
        this.currentProject.clear();
        this.clearSelection();
        this.transitionDrawing.active = false;
        this.showTransitionInfo(false);
        this.inputService.hideInput();
        this.render();
        this.eventBus.emit('project.cleared');
    }

    /**
     * Auto-save current state
     */
    autoSave() {
        // Auto-save to temporary storage
        this.storageService.autoSave(this.currentProject);
        
        // If project has a name, also save to named project
        if (this.currentProject.name) {
            this.storageService.saveProject(this.currentProject);
            Logger.debug('Auto-saved to named project', { projectName: this.currentProject.name });
        }
    }

    /**
     * Trigger auto-save after any modification
     */
    triggerAutoSave() {
        // Debounce auto-save to prevent excessive saves
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        this.autoSaveTimeout = setTimeout(() => {
            this.autoSave();
            Logger.debug('Auto-save triggered after modification');
        }, 500); // Wait 500ms after last change
    }

    /**
     * Load auto-saved state
     */
    loadAutoSave() {
        const autoSavedProject = this.storageService.loadAutoSave();
        if (autoSavedProject) {
            this.loadProject(autoSavedProject);
        }
    }

    /**
     * Get current project
     */
    getCurrentProject() {
        return this.currentProject;
    }

    /**
     * Get current selection
     */
    getCurrentSelection() {
        return this.selection;
    }

    /**
     * Export project as image
     */
    async exportAsImage(whiteBackground = true) {
        return await this.exportService.exportAsImage(this.currentProject, whiteBackground);
    }

    /**
     * Export project as file
     */
    exportAsFile() {
        return this.storageService.exportProject(this.currentProject);
    }

    /**
     * Set project name and trigger auto-save to named project
     */
    setProjectName(name) {
        if (name && name.trim()) {
            this.currentProject.name = name.trim();
            this.currentProject.timestamp = new Date().toISOString();
            Logger.info('Project name set', { projectName: this.currentProject.name });
            
            // Immediately save to named project
            this.storageService.saveProject(this.currentProject);
            
            // Also update auto-save
            this.triggerAutoSave();
            
            return true;
        }
        return false;
    }

    /**
     * Get current project name
     */
    getProjectName() {
        return this.currentProject.name;
    }

    /**
     * Check if current project has a name (is saved)
     */
    isProjectNamed() {
        return this.currentProject.name && this.currentProject.name.trim() !== '';
    }

    /**
     * Cleanup resources and event listeners
     */
    destroy() {
        // Clear any pending auto-save timeout
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
            this.autoSaveTimeout = null;
        }

        // Remove window event listeners
        window.removeEventListener('keydown', (e) => this.handleKeyDown(e));

        // Remove canvas event listeners
        if (this.canvas) {
            this.canvas.removeEventListener('dragover', (e) => this.handleDragOver(e));
            this.canvas.removeEventListener('drop', (e) => this.handleDrop(e));
            this.canvas.removeEventListener('mousedown', (e) => this.handleMouseDown(e));
            this.canvas.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
            this.canvas.removeEventListener('mouseup', (e) => this.handleMouseUp(e));
            this.canvas.removeEventListener('click', (e) => this.handleClick(e));
            this.canvas.removeEventListener('dblclick', (e) => this.handleDoubleClick(e));
            this.canvas.removeEventListener('contextmenu', (e) => this.handleContextMenu(e));
        }

        // Cleanup services
        if (this.inputService && this.inputService.destroy) {
            this.inputService.destroy();
        }
        if (this.gridService && this.gridService.destroy) {
            this.gridService.destroy();
        }

        Logger.info('DiagramController destroyed');
    }
}
