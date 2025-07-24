/**
 * Grid and Smart Guides Service
 * Provides grid display, snap functionality, and smart alignment guides
 */
class GridService {
    constructor(canvas, eventBus, errorHandler = null) {
        this.canvas = canvas;
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        
        // Grid settings
        this.gridSize = 20; // Grid cell size in pixels
        this.gridVisible = false;
        this.snapEnabled = false;
        this.snapTolerance = 10; // Pixels
        
        // Rulers settings
        this.rulersVisible = false;
        this.dpi = 96; // Default screen DPI
        this.pixelsPerCm = this.dpi / 2.54; // ~37.8 pixels per cm
        this.pixelsPerMm = this.pixelsPerCm / 10; // ~3.78 pixels per mm
        
        // Smart guides settings
        this.guidesEnabled = true;
        this.guideTolerance = 5; // Pixels for guide activation
        this.activeGuides = [];
        
        // Grid overlay canvas
        this.gridCanvas = null;
        this.gridCtx = null;
        
        // Rulers overlay canvases
        this.horizontalRulerCanvas = null;
        this.verticalRulerCanvas = null;
        this.horizontalRulerCtx = null;
        this.verticalRulerCtx = null;
        
        this.setupGridCanvas();
        this.setupRulersCanvas();
        Logger.info('GridService initialized');
    }

    /**
     * Setup grid overlay canvas
     */
    setupGridCanvas() {
        this.gridCanvas = document.createElement('canvas');
        this.gridCanvas.className = 'grid-overlay';
        this.gridCtx = this.gridCanvas.getContext('2d');
        
        // Position overlay over main canvas
        const canvasContainer = this.canvas.parentElement;
        canvasContainer.style.position = 'relative';
        canvasContainer.appendChild(this.gridCanvas);
        
        // Match main canvas size
        this.updateGridCanvasSize();
    }

    /**
     * Setup rulers overlay canvases
     */
    setupRulersCanvas() {
        const canvasContainer = this.canvas.parentElement;
        
        // Horizontal ruler (top)
        this.horizontalRulerCanvas = document.createElement('canvas');
        this.horizontalRulerCanvas.className = 'rulers-overlay horizontal';
        this.horizontalRulerCtx = this.horizontalRulerCanvas.getContext('2d');
        canvasContainer.appendChild(this.horizontalRulerCanvas);
        
        // Vertical ruler (left)
        this.verticalRulerCanvas = document.createElement('canvas');
        this.verticalRulerCanvas.className = 'rulers-overlay vertical';
        this.verticalRulerCtx = this.verticalRulerCanvas.getContext('2d');
        canvasContainer.appendChild(this.verticalRulerCanvas);
        
        // Initially hidden
        this.horizontalRulerCanvas.style.display = 'none';
        this.verticalRulerCanvas.style.display = 'none';
        
        this.updateRulersCanvasSize();
    }

    /**
     * Update grid canvas size to match main canvas
     */
    updateGridCanvasSize() {
        if (this.gridCanvas && this.canvas) {
            // Get the actual displayed size of the main canvas
            const rect = this.canvas.getBoundingClientRect();
            
            // Set the internal canvas dimensions to match the main canvas
            this.gridCanvas.width = this.canvas.width;
            this.gridCanvas.height = this.canvas.height;
            
            // Set the display dimensions to match the actual displayed size
            this.gridCanvas.style.width = rect.width + 'px';
            this.gridCanvas.style.height = rect.height + 'px';
            this.gridCanvas.style.maxWidth = '100%';
            
            if (this.gridVisible) {
                this.drawGrid();
            }
        }
        
        // Also update rulers
        this.updateRulersCanvasSize();
    }

    /**
     * Update rulers canvas size to match main canvas
     */
    updateRulersCanvasSize() {
        if (this.horizontalRulerCanvas && this.verticalRulerCanvas && this.canvas) {
            // Get the actual displayed size of the main canvas
            const rect = this.canvas.getBoundingClientRect();
            
            // Account for container padding (p-3 = 12px)
            const paddingOffset = 12;
            
            // Horizontal ruler
            this.horizontalRulerCanvas.width = this.canvas.width;
            this.horizontalRulerCanvas.height = 25;
            this.horizontalRulerCanvas.style.width = rect.width + 'px';
            this.horizontalRulerCanvas.style.height = '25px';
            
            // Vertical ruler  
            this.verticalRulerCanvas.width = 25;
            this.verticalRulerCanvas.height = this.canvas.height;
            this.verticalRulerCanvas.style.width = '25px';
            this.verticalRulerCanvas.style.height = rect.height + 'px';
            
            if (this.rulersVisible) {
                this.drawRulers();
            }
        }
    }

    /**
     * Toggle rulers visibility
     */
    toggleRulers() {
        this.rulersVisible = !this.rulersVisible;
        
        if (this.rulersVisible) {
            this.horizontalRulerCanvas.style.display = 'block';
            this.verticalRulerCanvas.style.display = 'block';
            this.drawRulers();
        } else {
            this.horizontalRulerCanvas.style.display = 'none';
            this.verticalRulerCanvas.style.display = 'none';
        }
        
        this.eventBus.emit('rulers.toggled', {
            visible: this.rulersVisible
        });
        
        Logger.userAction('Rulers toggled', { 
            visible: this.rulersVisible
        });
    }

    /**
     * Draw rulers with cm and mm markings
     */
    drawRulers() {
        if (!this.rulersVisible) return;
        
        this.drawHorizontalRuler();
        this.drawVerticalRuler();
    }

    /**
     * Draw horizontal ruler (top)
     */
    drawHorizontalRuler() {
        if (!this.horizontalRulerCtx) return;
        
        const ctx = this.horizontalRulerCtx;
        const width = this.horizontalRulerCanvas.width;
        const height = this.horizontalRulerCanvas.height;
        
        // Clear and set background
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, width, height);
        
        // Set text properties
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        
        // Draw cm markings
        for (let x = 0; x <= width; x += this.pixelsPerCm) {
            const cm = Math.round(x / this.pixelsPerCm);
            
            // Major tick for cm
            ctx.beginPath();
            ctx.moveTo(x + 0.5, height - 10);
            ctx.lineTo(x + 0.5, height);
            ctx.stroke();
            
            // Label every cm
            if (cm % 1 === 0 && x > 0) {
                ctx.fillText(`${cm}cm`, x, height - 12);
            }
        }
        
        // Draw mm markings (smaller ticks)
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= width; x += this.pixelsPerMm) {
            const mm = Math.round(x / this.pixelsPerMm);
            
            // Minor tick for mm (every 5mm)
            if (mm % 5 === 0 && mm % 10 !== 0) {
                ctx.beginPath();
                ctx.moveTo(x + 0.5, height - 5);
                ctx.lineTo(x + 0.5, height);
                ctx.stroke();
            }
        }
        
        // Border
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height - 1);
        ctx.lineTo(width, height - 1);
        ctx.stroke();
    }

    /**
     * Draw vertical ruler (left)
     */
    drawVerticalRuler() {
        if (!this.verticalRulerCtx) return;
        
        const ctx = this.verticalRulerCtx;
        const width = this.verticalRulerCanvas.width;
        const height = this.verticalRulerCanvas.height;
        
        // Clear and set background
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, width, height);
        
        // Set text properties
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        
        // Draw cm markings
        for (let y = 0; y <= height; y += this.pixelsPerCm) {
            const cm = Math.round(y / this.pixelsPerCm);
            
            // Major tick for cm
            ctx.beginPath();
            ctx.moveTo(width - 10, y + 0.5);
            ctx.lineTo(width, y + 0.5);
            ctx.stroke();
            
            // Label every cm (rotated text)
            if (cm % 1 === 0 && y > 0) {
                ctx.save();
                ctx.translate(width - 12, y);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(`${cm}cm`, 0, 0);
                ctx.restore();
            }
        }
        
        // Draw mm markings (smaller ticks)
        ctx.lineWidth = 0.5;
        for (let y = 0; y <= height; y += this.pixelsPerMm) {
            const mm = Math.round(y / this.pixelsPerMm);
            
            // Minor tick for mm (every 5mm)
            if (mm % 5 === 0 && mm % 10 !== 0) {
                ctx.beginPath();
                ctx.moveTo(width - 5, y + 0.5);
                ctx.lineTo(width, y + 0.5);
                ctx.stroke();
            }
        }
        
        // Border
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width - 1, 0);
        ctx.lineTo(width - 1, height);
        ctx.stroke();
    }

    /**
     * Toggle grid visibility
     */
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        this.snapEnabled = this.gridVisible; // Enable snap with grid
        
        if (this.gridVisible) {
            this.drawGrid();
        } else {
            this.clearGrid();
        }
        
        this.eventBus.emit('grid.toggled', {
            visible: this.gridVisible,
            snapEnabled: this.snapEnabled
        });
        
        Logger.userAction('Grid toggled', { 
            visible: this.gridVisible, 
            snapEnabled: this.snapEnabled 
        });
    }

    /**
     * Draw grid on overlay canvas
     */
    drawGrid() {
        if (!this.gridCtx || !this.gridVisible) return;
        
        this.gridCtx.clearRect(0, 0, this.gridCanvas.width, this.gridCanvas.height);
        
        // More visible grid lines
        this.gridCtx.strokeStyle = '#d1d5db'; // Darker gray
        this.gridCtx.lineWidth = 1; // Thicker lines
        this.gridCtx.globalAlpha = 0.8; // More opaque
        
        // Draw vertical lines
        for (let x = 0; x <= this.gridCanvas.width; x += this.gridSize) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(x + 0.5, 0); // +0.5 for crisp lines
            this.gridCtx.lineTo(x + 0.5, this.gridCanvas.height);
            this.gridCtx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y <= this.gridCanvas.height; y += this.gridSize) {
            this.gridCtx.beginPath();
            this.gridCtx.moveTo(0, y + 0.5); // +0.5 for crisp lines
            this.gridCtx.lineTo(this.gridCanvas.width, y + 0.5);
            this.gridCtx.stroke();
        }
        
        this.gridCtx.globalAlpha = 1;
    }

    /**
     * Clear grid overlay
     */
    clearGrid() {
        if (this.gridCtx) {
            this.gridCtx.clearRect(0, 0, this.gridCanvas.width, this.gridCanvas.height);
        }
    }

    /**
     * Snap coordinates to grid
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Object} - Snapped coordinates {x, y}
     */
    snapToGrid(x, y) {
        if (!this.snapEnabled) {
            return { x, y };
        }
        
        const snappedX = Math.round(x / this.gridSize) * this.gridSize;
        const snappedY = Math.round(y / this.gridSize) * this.gridSize;
        
        // Only snap if within tolerance
        const deltaX = Math.abs(x - snappedX);
        const deltaY = Math.abs(y - snappedY);
        
        return {
            x: deltaX <= this.snapTolerance ? snappedX : x,
            y: deltaY <= this.snapTolerance ? snappedY : y,
            snapped: deltaX <= this.snapTolerance || deltaY <= this.snapTolerance
        };
    }

    /**
     * Find smart guide positions for element alignment
     * @param {Object} movingElement - Element being moved
     * @param {Array} allElements - All other elements to align with
     * @param {number} x - Current X position
     * @param {number} y - Current Y position
     * @returns {Object} - Guide information
     */
    findSmartGuides(movingElement, allElements, x, y) {
        if (!this.guidesEnabled) {
            return { guides: [], snapX: x, snapY: y };
        }
        
        const guides = [];
        let snapX = x;
        let snapY = y;
        
        // Get moving element bounds
        const movingBounds = this.getElementBounds(movingElement, x, y);
        
        allElements.forEach(element => {
            if (element === movingElement) return;
            
            const elementBounds = this.getElementBounds(element, element.x, element.y);
            
            // Check for horizontal alignment
            const horizontalAlignments = [
                { type: 'left', value: elementBounds.left },
                { type: 'center', value: elementBounds.centerX },
                { type: 'right', value: elementBounds.right }
            ];
            
            horizontalAlignments.forEach(alignment => {
                const alignmentX = alignment.value - (movingBounds.centerX - x);
                const distance = Math.abs(x - alignmentX);
                
                if (distance <= this.guideTolerance) {
                    guides.push({
                        type: 'vertical',
                        position: alignment.value,
                        alignment: alignment.type
                    });
                    snapX = alignmentX;
                }
            });
            
            // Check for vertical alignment
            const verticalAlignments = [
                { type: 'top', value: elementBounds.top },
                { type: 'middle', value: elementBounds.centerY },
                { type: 'bottom', value: elementBounds.bottom }
            ];
            
            verticalAlignments.forEach(alignment => {
                const alignmentY = alignment.value - (movingBounds.centerY - y);
                const distance = Math.abs(y - alignmentY);
                
                if (distance <= this.guideTolerance) {
                    guides.push({
                        type: 'horizontal',
                        position: alignment.value,
                        alignment: alignment.type
                    });
                    snapY = alignmentY;
                }
            });
        });
        
        return { guides, snapX, snapY };
    }

    /**
     * Get element bounds for alignment calculations
     * @param {Object} element - Element to get bounds for
     * @param {number} x - X position
     * @param {number} y - Y position
     * @returns {Object} - Element bounds
     */
    getElementBounds(element, x, y) {
        let width = 80; // Default width
        let height = 40; // Default height
        
        // Adjust for different element types
        if (element.type === 'if') {
            width = 80;
            height = 80;
        } else if (element.type === 'start' || element.type === 'stop') {
            width = 80;
            height = 40;
        } else if (element.width && element.height) {
            width = element.width;
            height = element.height;
        }
        
        return {
            left: x - width / 2,
            right: x + width / 2,
            top: y - height / 2,
            bottom: y + height / 2,
            centerX: x,
            centerY: y,
            width,
            height
        };
    }

    /**
     * Show smart guides on canvas
     * @param {Array} guides - Guide information
     */
    showSmartGuides(guides) {
        this.clearSmartGuides();
        
        guides.forEach(guide => {
            const guideLine = document.createElement('div');
            guideLine.className = `smart-guide ${guide.type}`;
            
            if (guide.type === 'horizontal') {
                guideLine.style.top = `${guide.position}px`;
                guideLine.style.left = '0px';
            } else {
                guideLine.style.left = `${guide.position}px`;
                guideLine.style.top = '0px';
            }
            
            this.canvas.parentElement.appendChild(guideLine);
            this.activeGuides.push(guideLine);
        });
    }

    /**
     * Clear smart guides
     */
    clearSmartGuides() {
        this.activeGuides.forEach(guide => {
            if (guide.parentElement) {
                guide.parentElement.removeChild(guide);
            }
        });
        this.activeGuides = [];
    }

    /**
     * Set grid size
     * @param {number} size - New grid size in pixels
     */
    setGridSize(size) {
        this.gridSize = size;
        if (this.gridVisible) {
            this.drawGrid();
        }
        
        Logger.debug('Grid size changed', { size });
    }

    /**
     * Enable/disable snap functionality
     * @param {boolean} enabled - Enable snap
     */
    setSnapEnabled(enabled) {
        this.snapEnabled = enabled;
        
        this.eventBus.emit('grid.snap.changed', { enabled });
        Logger.debug('Grid snap changed', { enabled });
    }

    /**
     * Enable/disable smart guides
     * @param {boolean} enabled - Enable guides
     */
    setGuidesEnabled(enabled) {
        this.guidesEnabled = enabled;
        if (!enabled) {
            this.clearSmartGuides();
        }
        
        Logger.debug('Smart guides changed', { enabled });
    }

    /**
     * Get current grid state
     * @returns {Object} - Grid state
     */
    getState() {
        return {
            gridVisible: this.gridVisible,
            snapEnabled: this.snapEnabled,
            guidesEnabled: this.guidesEnabled,
            gridSize: this.gridSize,
            rulersVisible: this.rulersVisible
        };
    }

    /**
     * Cleanup resources
     */
    destroy() {
        this.clearSmartGuides();
        if (this.gridCanvas && this.gridCanvas.parentElement) {
            this.gridCanvas.parentElement.removeChild(this.gridCanvas);
        }
        if (this.horizontalRulerCanvas && this.horizontalRulerCanvas.parentElement) {
            this.horizontalRulerCanvas.parentElement.removeChild(this.horizontalRulerCanvas);
        }
        if (this.verticalRulerCanvas && this.verticalRulerCanvas.parentElement) {
            this.verticalRulerCanvas.parentElement.removeChild(this.verticalRulerCanvas);
        }
        
        Logger.info('GridService destroyed');
    }
}
