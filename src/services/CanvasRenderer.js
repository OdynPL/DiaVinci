/**
 * Canvas rendering service for drawing diagrams
 */
class CanvasRenderer {
    constructor(canvas, eventBus, errorHandler = null) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        this.selectedElement = null;
        this.selectedType = null;
        Logger.info('CanvasRenderer initialized');
    }

    /**
     * Set selected element for highlighting
     */
    setSelection(element, type) {
        this.selectedElement = element;
        this.selectedType = type;
    }

    /**
     * Render all nodes
     */
    renderNodes(nodes, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        nodes.forEach(node => {
            this.renderNode(node, multiSelectionManager);
        });
    }

    /**
     * Clear selection
     */
    clearSelection() {
        this.selectedElement = null;
        this.selectedType = null;
    }

    /**
     * Render complete project
     */
    render(project, multiSelectionManager = null) {
        try {
            const startTime = performance.now();
            this.clearCanvas();
            this.setBackground();
            
            // Render selection rectangle first (behind elements)
            if (multiSelectionManager && multiSelectionManager.isSelectionActive()) {
                this.renderSelectionRect(multiSelectionManager.getSelectionRect());
            }
            
            this.renderTransitions(project.transitions, multiSelectionManager);
            this.renderNodes(project.nodes, multiSelectionManager);
            this.renderTexts(project.texts, multiSelectionManager);
            
            Logger.performance('Canvas Render', startTime);
        } catch (error) {
            Logger.error('Error rendering canvas', error, { 
                nodesCount: project.nodes.length,
                transitionsCount: project.transitions.length,
                textsCount: project.texts.length
            });
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to render diagram');
            }
        }
    }

    /**
     * Clear canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Set background
     */
    setBackground() {
        this.ctx.fillStyle = '#fafafa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Render transitions
     */
    renderTransitions(transitions, multiSelectionManager = null) {
        transitions.forEach(transition => {
            this.renderTransition(transition, multiSelectionManager);
        });
    }

    /**
     * Render single transition
     */
    renderTransition(transition, multiSelectionManager = null) {
        const {startX, startY, endX, endY} = transition.getConnectionPoints();
        
        // Check highlighting conditions
        const isSingleSelected = this.selectedElement === transition && this.selectedType === 'transition';
        const isMultiSelected = multiSelectionManager && multiSelectionManager.isSelected(transition);
        
        // Highlight if selected
        if (isSingleSelected || isMultiSelected) {
            this.renderTransitionHighlight(transition, startX, startY, endX, endY, isMultiSelected);
        }
        
        // Draw line
        this.renderTransitionLine(transition, startX, startY, endX, endY, isSingleSelected, isMultiSelected);
        
        // Draw arrows
        this.renderTransitionArrows(transition, startX, startY, endX, endY, isSingleSelected, isMultiSelected);
        
        // Draw label
        this.renderTransitionLabel(transition, startX, startY, endX, endY);
    }

    /**
     * Render transition highlight
     */
    renderTransitionHighlight(transition, startX, startY, endX, endY) {
        this.ctx.save();
        this.ctx.beginPath();
        
        if (transition.from.type === 'if' && transition.fromCorner) {
            this.drawIFTransitionPath(startX, startY, endX, endY, transition);
        } else {
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
        }
        
        this.ctx.strokeStyle = '#e6b800';
        this.ctx.lineWidth = 6;
        this.ctx.stroke();
        this.ctx.restore();
    }

    /**
     * Render transition line
     */
    renderTransitionLine(transition, startX, startY, endX, endY) {
        this.ctx.beginPath();
        
        if (transition.from.type === 'if' && transition.fromCorner) {
            this.drawIFTransitionPath(startX, startY, endX, endY, transition);
        } else {
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
        }
        
        const isSelected = this.selectedElement === transition && this.selectedType === 'transition';
        this.ctx.strokeStyle = isSelected ? '#e6b800' : '#888';
        this.ctx.lineWidth = isSelected ? 4 : 2;
        this.ctx.stroke();
    }

    /**
     * Draw IF transition path (robot arm style)
     */
    drawIFTransitionPath(startX, startY, endX, endY, transition) {
        this.ctx.moveTo(startX, startY);
        
        const armLength = 60;
        
        if (transition.label === 'TRUE' && transition.fromCorner === 'left') {
            const cornerX = startX - armLength;
            const cornerY = endY;
            this.ctx.lineTo(cornerX, startY);
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(endX, endY);
        } else if (transition.label === 'FALSE' && transition.fromCorner === 'right') {
            const cornerX = startX + armLength;
            const cornerY = endY;
            this.ctx.lineTo(cornerX, startY);
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(endX, endY);
        } else if (transition.label === 'TRUE' && transition.fromCorner === 'top') {
            const cornerX = endX;
            const cornerY = startY - armLength;
            this.ctx.lineTo(startX, cornerY);
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(endX, endY);
        } else if (transition.label === 'FALSE' && transition.fromCorner === 'bottom') {
            const cornerX = endX;
            const cornerY = startY + armLength;
            this.ctx.lineTo(startX, cornerY);
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(endX, endY);
        } else {
            if (transition.fromCorner === 'top' || transition.fromCorner === 'bottom') {
                const cornerX = startX;
                const cornerY = startY + (transition.fromCorner === 'top' ? -armLength : armLength);
                this.ctx.lineTo(cornerX, cornerY);
                this.ctx.lineTo(endX, cornerY);
                this.ctx.lineTo(endX, endY);
            } else {
                this.ctx.lineTo(endX, endY);
            }
        }
    }

    /**
     * Render transition arrows
     */
    renderTransitionArrows(transition, startX, startY, endX, endY) {
        const arrowLen = 18;
        const isSelected = this.selectedElement === transition && this.selectedType === 'transition';
        
        // Skip arrows for IF transitions
        if (transition.from.type === 'if' && transition.fromCorner) {
            return;
        }
        
        this.ctx.fillStyle = isSelected ? '#e6b800' : '#888';
        
        if (transition.type === 'right') {
            this.drawArrow(endX, endY, Math.atan2(endY - startY, endX - startX), arrowLen);
        } else if (transition.type === 'both') {
            this.drawBothArrows(transition, startX, startY, endX, endY, arrowLen);
        }
    }

    /**
     * Draw single arrow
     */
    drawArrow(tipX, tipY, angle, length) {
        const base1X = tipX - length * Math.cos(angle - Math.PI / 6);
        const base1Y = tipY - length * Math.sin(angle - Math.PI / 6);
        const base2X = tipX - length * Math.cos(angle + Math.PI / 6);
        const base2Y = tipY - length * Math.sin(angle + Math.PI / 6);
        
        this.ctx.beginPath();
        this.ctx.moveTo(tipX, tipY);
        this.ctx.lineTo(base1X, base1Y);
        this.ctx.lineTo(base2X, base2Y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    /**
     * Draw both arrows for bidirectional transitions
     */
    drawBothArrows(transition, startX, startY, endX, endY, arrowLen) {
        const dx = transition.to.x - transition.from.x;
        const dy = transition.to.y - transition.from.y;
        const angle = Math.atan2(dy, dx);
        
        // Calculate proper edge points
        const {properStartX, properStartY, properEndX, properEndY} = 
            this.calculateEdgePoints(transition, angle);
        
        // Right arrow
        this.drawArrow(properEndX, properEndY, angle, arrowLen);
        
        // Left arrow
        this.drawArrow(properStartX, properStartY, angle + Math.PI, arrowLen);
    }

    /**
     * Calculate edge points for arrows
     */
    calculateEdgePoints(transition, angle) {
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        
        // Calculate start point
        let properStartX, properStartY;
        if (transition.from.type === 'start' || transition.from.type === 'stop') {
            const a = transition.from.r * 1.5;
            const b = transition.from.r * 0.8;
            const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
            properStartX = transition.from.x + cosAngle * distance;
            properStartY = transition.from.y + sinAngle * distance;
        } else {
            properStartX = transition.from.x + cosAngle * transition.from.r;
            properStartY = transition.from.y + sinAngle * transition.from.r;
        }
        
        // Calculate end point
        let properEndX, properEndY;
        if (transition.to.type === 'start' || transition.to.type === 'stop') {
            const a = transition.to.r * 1.5;
            const b = transition.to.r * 0.8;
            const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
            properEndX = transition.to.x - cosAngle * distance;
            properEndY = transition.to.y - sinAngle * distance;
        } else {
            properEndX = transition.to.x - cosAngle * transition.to.r;
            properEndY = transition.to.y - sinAngle * transition.to.r;
        }
        
        return {properStartX, properStartY, properEndX, properEndY};
    }

    /**
     * Render transition label
     */
    renderTransitionLabel(transition, startX, startY, endX, endY) {
        if (!transition.label || (transition.from.type === 'if' && transition.fromCorner)) {
            return;
        }
        
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2 - 18;
        
        this.ctx.save();
        this.ctx.translate(midX, midY);
        this.ctx.fillStyle = '#333';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(transition.label, 0, 0);
        this.ctx.restore();
    }

    /**
     * Render single node
     */
    renderNode(node, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        
        // Draw shape
        this.drawNodeShape(node);
        
        // Fill and stroke
        const isSelected = this.selectedElement === node && this.selectedType === 'node';
        const isMultiSelected = multiSelectionManager && multiSelectionManager.isElementSelected(node, 'node');
        
        if (isMultiSelected) {
            this.ctx.fillStyle = '#4A90E2';
            this.ctx.globalAlpha = 0.7;
            this.ctx.fill();
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 3;
            this.ctx.globalAlpha = 1;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = isSelected ? '#ffe066' : node.color;
            this.ctx.fill();
            this.ctx.strokeStyle = isSelected ? '#e6b800' : '#333';
            this.ctx.lineWidth = isSelected ? 4 : 2;
            this.ctx.stroke();
        }
        
        // Draw label
        this.drawNodeLabel(node);
    }

    /**
     * Draw node shape based on type
     */
    drawNodeShape(node) {
        this.ctx.beginPath();
        
        if (node.type === 'start' || node.type === 'stop') {
            this.ctx.ellipse(node.x, node.y, node.r * 1.5, node.r * 0.8, 0, 0, 2 * Math.PI);
        } else if (node.type === 'if') {
            this.ctx.moveTo(node.x, node.y - node.r);
            this.ctx.lineTo(node.x + node.r, node.y);
            this.ctx.lineTo(node.x, node.y + node.r);
            this.ctx.lineTo(node.x - node.r, node.y);
            this.ctx.closePath();
        } else {
            this.ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
        }
    }

    /**
     * Draw node label
     */
    drawNodeLabel(node) {
        if (node.type === 'start' || node.type === 'stop' || node.type === 'if') {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label || 'Node', node.x, node.y);
        } else {
            this.ctx.fillStyle = '#333';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'bottom';
            this.ctx.fillText(node.label || 'Node', node.x, node.y - node.r - 8);
        }
    }

    /**
     * Render text elements
     */
    renderTexts(texts, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        texts.forEach(text => {
            this.renderText(text, multiSelectionManager);
        });
    }

    /**
     * Render single text element
     */
    renderText(text, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        const isSelected = this.selectedElement === text && this.selectedType === 'text';
        const isMultiSelected = multiSelectionManager && multiSelectionManager.isElementSelected(text, 'text');
        
        if (isSelected || isMultiSelected) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(text.x - 60, text.y - 22, 120, 32);
            this.ctx.fillStyle = isMultiSelected ? '#4A90E2' : '#ffe066';
            this.ctx.globalAlpha = isMultiSelected ? 0.3 : 1;
            this.ctx.fill();
            this.ctx.restore();
        }
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text.label, text.x, text.y);
    }

    /**
     * Export canvas content to another canvas context
     */
    exportToCanvas(targetCtx, project, whiteBackground = false) {
        const originalSelected = this.selectedElement;
        const originalType = this.selectedType;
        
        // Clear selection for clean export
        this.clearSelection();
        
        // Render directly to target context without using this.render
        // which might have side effects with this.canvas
        const originalCtx = this.ctx;
        this.ctx = targetCtx;
        
        // Clear target canvas
        targetCtx.clearRect(0, 0, targetCtx.canvas.width, targetCtx.canvas.height);
        
        // Set background if requested
        if (whiteBackground) {
            targetCtx.fillStyle = '#ffffff';
            targetCtx.fillRect(0, 0, targetCtx.canvas.width, targetCtx.canvas.height);
        }
        
        // Render components
        this.renderTransitions(project.transitions);
        this.renderNodes(project.nodes);
        this.renderTexts(project.texts);
        
        // Restore original context
        this.ctx = originalCtx;
        
        // Restore selection
        this.selectedElement = originalSelected;
        this.selectedType = originalType;
    }

    /**
     * Render selection rectangle
     */
    renderSelectionRect(rect) {
        if (!rect) return;
        
        this.ctx.save();
        
        // Selection rectangle background
        this.ctx.fillStyle = 'rgba(74, 144, 226, 0.1)';
        this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        
        // Selection rectangle border
        this.ctx.strokeStyle = '#4A90E2';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        
        this.ctx.restore();
    }
}
