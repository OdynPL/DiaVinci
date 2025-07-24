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
            if (node && node.x !== undefined && node.y !== undefined && node.r !== undefined) {
                this.renderNode(node, multiSelectionManager);
            } else {
                Logger.error('Invalid node detected', null, { node });
            }
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
            if (transition && transition.from && transition.to) {
                this.renderTransition(transition, multiSelectionManager);
            } else {
                Logger.error('Invalid transition detected', null, { transition });
            }
        });
    }

    /**
     * Render single transition
     */
    renderTransition(transition, multiSelectionManager = null) {
        try {
            const {startX, startY, endX, endY} = transition.getConnectionPoints();
            
            // Validate connection points
            if (isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)) {
                Logger.error('Invalid connection points', null, { 
                    startX, startY, endX, endY, 
                    transition: {
                        id: transition.id,
                        label: transition.label,
                        fromCorner: transition.fromCorner,
                        from: transition.from ? {id: transition.from.id, type: transition.from.type, x: transition.from.x, y: transition.from.y, rotation: transition.from.rotation} : null,
                        to: transition.to ? {id: transition.to.id, type: transition.to.type, x: transition.to.x, y: transition.to.y} : null
                    }
                });
                return;
            }
            
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
        
        } catch (error) {
            Logger.error('Error rendering transition', error, { 
                transition: {
                    id: transition.id,
                    label: transition.label,
                    fromCorner: transition.fromCorner,
                    from: transition.from ? {id: transition.from.id, type: transition.from.type, x: transition.from.x, y: transition.from.y, rotation: transition.from.rotation} : null,
                    to: transition.to ? {id: transition.to.id, type: transition.to.type, x: transition.to.x, y: transition.to.y} : null
                }
            });
        }
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
            this.drawTransitionPath(transition, startX, startY, endX, endY);
        }
        
        this.ctx.strokeStyle = '#e6b800';
        this.ctx.lineWidth = 7; // Increased from 6 to 7
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
            this.drawTransitionPath(transition, startX, startY, endX, endY);
        }
        
        const isSelected = this.selectedElement === transition && this.selectedType === 'transition';
        this.ctx.strokeStyle = isSelected ? '#e6b800' : '#888';
        this.ctx.lineWidth = isSelected ? 5 : 3; // Increased from 4:2 to 5:3
        this.ctx.stroke();

        // Draw break points if any
        if (transition.breakPoints && transition.breakPoints.length > 0) {
            this.drawBreakPoints(transition.breakPoints, isSelected);
        }
    }

    /**
     * Draw transition path based on style and break points
     */
    drawTransitionPath(transition, startX, startY, endX, endY) {
        if (transition.breakPoints && transition.breakPoints.length > 0) {
            // Draw path with break points
            const points = transition.getPathPoints();
            this.ctx.moveTo(points[0].x, points[0].y);
            
            if (transition.style === 'curved') {
                this.drawCurvedPath(points);
            } else {
                // Straight lines between break points
                for (let i = 1; i < points.length; i++) {
                    this.ctx.lineTo(points[i].x, points[i].y);
                }
            }
        } else {
            // Simple path without break points
            if (transition.style === 'curved') {
                this.drawSimpleCurve(startX, startY, endX, endY);
            } else {
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
            }
        }
    }

    /**
     * Draw curved path through multiple points
     */
    drawCurvedPath(points) {
        if (points.length < 2) {
            return;
        }

        if (points.length === 2) {
            // Just two points - draw simple curve
            this.drawSimpleCurve(points[0].x, points[0].y, points[1].x, points[1].y);
            return;
        }

        // For multiple points, draw smooth curves between each segment
        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];
            
            if (i === 0) {
                // First segment - move to start
                this.ctx.moveTo(startPoint.x, startPoint.y);
            }
            
            // Draw quadratic curve for each segment
            const midX = (startPoint.x + endPoint.x) / 2;
            const midY = (startPoint.y + endPoint.y) / 2;
            
            // Calculate perpendicular offset for curve
            const dx = endPoint.x - startPoint.x;
            const dy = endPoint.y - startPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const curvature = Math.min(distance * 0.15, 30); // Smaller curvature for segments
            
            // Perpendicular vector for curve offset
            const perpX = -dy / distance * curvature;
            const perpY = dx / distance * curvature;
            
            const controlX = midX + perpX;
            const controlY = midY + perpY;
            
            this.ctx.quadraticCurveTo(controlX, controlY, endPoint.x, endPoint.y);
        }
    }

    /**
     * Draw simple curved line between two points
     */
    drawSimpleCurve(startX, startY, endX, endY) {
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        
        // Calculate perpendicular offset for curve
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const curvature = Math.min(distance * 0.2, 50); // Limit curve amount
        
        // Perpendicular vector for curve offset
        const perpX = -dy / distance * curvature;
        const perpY = dx / distance * curvature;
        
        const controlX = midX + perpX;
        const controlY = midY + perpY;
        
        this.ctx.moveTo(startX, startY);
        this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    }

    /**
     * Draw break points as small circles
     */
    drawBreakPoints(breakPoints, isSelected) {
        this.ctx.save();
        
        breakPoints.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fillStyle = isSelected ? '#e6b800' : '#666';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        
        this.ctx.restore();
    }

    /**
     * Draw IF transition path (robot arm style) - always L-shaped
     */
    drawIFTransitionPath(startX, startY, endX, endY, transition) {
        this.ctx.moveTo(startX, startY);
        
        const armLength = 60;
        const targetCenterX = transition.to.x;
        const targetCenterY = transition.to.y;
        
        // Always draw L-shaped robot arm regardless of rotation
        // Calculate the corner position based on actual target position
        let cornerX, cornerY;
        
        if (transition.fromCorner === 'left' || transition.fromCorner === 'right') {
            // Horizontal first, then vertical
            if (transition.fromCorner === 'left') {
                cornerX = startX - armLength;
            } else {
                cornerX = startX + armLength;
            }
            cornerY = startY;
            
            // Draw: start -> horizontal -> vertical -> target
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(cornerX, targetCenterY);
            this.ctx.lineTo(endX, endY);
            
        } else if (transition.fromCorner === 'top' || transition.fromCorner === 'bottom') {
            // Vertical first, then horizontal
            cornerX = startX;
            if (transition.fromCorner === 'top') {
                cornerY = startY - armLength;
            } else {
                cornerY = startY + armLength;
            }
            
            // Draw: start -> vertical -> horizontal -> target
            this.ctx.lineTo(cornerX, cornerY);
            this.ctx.lineTo(targetCenterX, cornerY);
            this.ctx.lineTo(endX, endY);
            
        } else {
            // Fallback - straight line
            this.ctx.lineTo(endX, endY);
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
        
        // Get path points (including break points) for proper arrow direction
        const pathPoints = transition.getPathPoints();
        
        if (transition.type === 'right') {
            // Calculate arrow position at 90% of path and its angle
            const {x, y, angle} = this.getArrowPositionAndAngle(pathPoints, 0.9, transition.style);
            this.drawArrow(x, y, angle, arrowLen);
        } else if (transition.type === 'both') {
            this.drawBothArrowsOnPath(transition, pathPoints, arrowLen);
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
     * Draw both arrows for bidirectional transitions with break points
     */
    drawBothArrowsWithBreakPoints(transition, pathPoints, arrowLen) {
        if (pathPoints.length < 2) {
            return;
        }
        
        const firstPoint = pathPoints[0];
        const secondPoint = pathPoints[1];
        const lastPoint = pathPoints[pathPoints.length - 1];
        const secondLastPoint = pathPoints[pathPoints.length - 2];
        
        // Use general angle for edge point calculation (like original)
        const dx = transition.to.x - transition.from.x;
        const dy = transition.to.y - transition.from.y;
        const generalAngle = Math.atan2(dy, dx);
        
        // Calculate proper edge points using general angle
        const {properStartX, properStartY, properEndX, properEndY} = 
            this.calculateEdgePoints(transition, generalAngle);
        
        // Calculate specific angles for arrow directions based on path segments
        const endAngle = Math.atan2(lastPoint.y - secondLastPoint.y, lastPoint.x - secondLastPoint.x);
        const startAngle = Math.atan2(secondPoint.y - firstPoint.y, firstPoint.x - secondPoint.x);
        
        // Right arrow (at end) - use end segment angle
        this.drawArrow(properEndX, properEndY, endAngle, arrowLen);
        
        // Left arrow (at start) - use start segment angle reversed
        this.drawArrow(properStartX, properStartY, startAngle + Math.PI, arrowLen);
    }

    /**
     * Draw both arrows on path at specific positions
     */
    drawBothArrowsOnPath(transition, pathPoints, arrowLen) {
        if (pathPoints.length < 2) {
            return;
        }
        
        // Calculate arrow positions at 10% and 90% of path
        const arrow1 = this.getArrowPositionAndAngle(pathPoints, 0.1, transition.style);
        const arrow2 = this.getArrowPositionAndAngle(pathPoints, 0.9, transition.style);
        
        // Draw arrows pointing in opposite directions
        this.drawArrow(arrow1.x, arrow1.y, arrow1.angle + Math.PI, arrowLen); // Start arrow (reversed)
        this.drawArrow(arrow2.x, arrow2.y, arrow2.angle, arrowLen); // End arrow
    }

    /**
     * Get arrow position and angle at specific point along path
     */
    getArrowPositionAndAngle(pathPoints, t, style) {
        if (pathPoints.length < 2) {
            const point = pathPoints[0] || {x: 0, y: 0};
            return {x: point.x, y: point.y, angle: 0};
        }

        if (style === 'curved') {
            return this.getArrowOnCurvedPath(pathPoints, t);
        } else {
            return this.getArrowOnStraightPath(pathPoints, t);
        }
    }

    /**
     * Get arrow position and angle on straight path
     */
    getArrowOnStraightPath(pathPoints, t) {
        // Calculate total path length
        let totalLength = 0;
        const segments = [];
        
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const start = pathPoints[i];
            const end = pathPoints[i + 1];
            const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
            segments.push({start, end, length});
            totalLength += length;
        }
        
        // Find target distance
        const targetDistance = totalLength * t;
        
        // Find which segment contains the target point
        let currentDistance = 0;
        for (const segment of segments) {
            if (currentDistance + segment.length >= targetDistance) {
                // Found the segment
                const segmentT = (targetDistance - currentDistance) / segment.length;
                const x = segment.start.x + (segment.end.x - segment.start.x) * segmentT;
                const y = segment.start.y + (segment.end.y - segment.start.y) * segmentT;
                const angle = Math.atan2(segment.end.y - segment.start.y, segment.end.x - segment.start.x);
                
                return {x, y, angle};
            }
            currentDistance += segment.length;
        }
        
        // Fallback to last point
        const lastSegment = segments[segments.length - 1];
        return {
            x: lastSegment.end.x,
            y: lastSegment.end.y,
            angle: Math.atan2(lastSegment.end.y - lastSegment.start.y, lastSegment.end.x - lastSegment.start.x)
        };
    }

    /**
     * Get arrow position and angle on curved path
     */
    getArrowOnCurvedPath(pathPoints, t) {
        if (pathPoints.length === 2) {
            // Simple curve between two points
            return this.getArrowOnSimpleCurve(pathPoints[0], pathPoints[1], t);
        } else {
            // Multiple segments - find the appropriate segment and calculate
            return this.getArrowOnMultiSegmentCurve(pathPoints, t);
        }
    }

    /**
     * Get arrow position and angle on simple quadratic curve
     */
    getArrowOnSimpleCurve(startPoint, endPoint, t) {
        // Calculate control point (same logic as drawSimpleCurve)
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;
        
        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const curvature = Math.min(distance * 0.2, 50);
        
        const perpX = -dy / distance * curvature;
        const perpY = dx / distance * curvature;
        
        const controlX = midX + perpX;
        const controlY = midY + perpY;
        
        // Calculate point on quadratic Bezier curve: P(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const ut2 = 2 * u * t;
        
        const x = uu * startPoint.x + ut2 * controlX + tt * endPoint.x;
        const y = uu * startPoint.y + ut2 * controlY + tt * endPoint.y;
        
        // Calculate tangent vector (derivative): P'(t) = 2(1-t)(P₁-P₀) + 2t(P₂-P₁)
        const tangentX = 2 * u * (controlX - startPoint.x) + 2 * t * (endPoint.x - controlX);
        const tangentY = 2 * u * (controlY - startPoint.y) + 2 * t * (endPoint.y - controlY);
        
        const angle = Math.atan2(tangentY, tangentX);
        
        return {x, y, angle};
    }

    /**
     * Get arrow position and angle on multi-segment curve
     */
    getArrowOnMultiSegmentCurve(pathPoints, t) {
        // For multi-segment curves, calculate total "curve length" approximately
        // and find which segment contains the target point
        
        let totalLength = 0;
        const segments = [];
        
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const start = pathPoints[i];
            const end = pathPoints[i + 1];
            
            // Approximate curve length (using straight line as approximation for now)
            const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
            segments.push({start, end, length, startDistance: totalLength});
            totalLength += length;
        }
        
        const targetDistance = totalLength * t;
        
        // Find which segment contains the target point
        for (const segment of segments) {
            if (segment.startDistance + segment.length >= targetDistance) {
                const segmentT = (targetDistance - segment.startDistance) / segment.length;
                return this.getArrowOnSimpleCurve(segment.start, segment.end, segmentT);
            }
        }
        
        // Fallback to last segment
        const lastSegment = segments[segments.length - 1];
        return this.getArrowOnSimpleCurve(lastSegment.start, lastSegment.end, 1.0);
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
        // Special handling for IF transition labels - show them as small editable labels
        if (transition.from.type === 'if' && transition.fromCorner && (transition.label === 'Step1' || transition.label === 'Step2')) {
            this.renderIFTransitionLabel(transition, startX, startY, endX, endY);
            return;
        }
        
        if (!transition.label || (transition.from.type === 'if' && transition.fromCorner)) {
            return;
        }
        
        let midX, midY;
        
        // Calculate label position based on transition path
        if (transition.breakPoints && transition.breakPoints.length > 0) {
            // For transitions with break points, use the middle point of the path
            const pathPoints = transition.getPathPoints();
            const midIndex = Math.floor(pathPoints.length / 2);
            
            if (pathPoints.length % 2 === 0) {
                // Even number of points - interpolate between middle two
                const p1 = pathPoints[midIndex - 1];
                const p2 = pathPoints[midIndex];
                midX = (p1.x + p2.x) / 2;
                midY = (p1.y + p2.y) / 2 - 18;
            } else {
                // Odd number of points - use the middle point
                const midPoint = pathPoints[midIndex];
                midX = midPoint.x;
                midY = midPoint.y - 18;
            }
        } else {
            // For simple transitions, use the traditional midpoint
            midX = (startX + endX) / 2;
            midY = (startY + endY) / 2 - 18;
        }
        
        this.ctx.save();
        this.ctx.translate(midX, midY);
        this.ctx.fillStyle = '#333';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        
        // Add background for better visibility
        const textWidth = this.ctx.measureText(transition.label).width;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillRect(-textWidth/2 - 2, -15, textWidth + 4, 16);
        
        // Draw the text
        this.ctx.fillStyle = '#333';
        this.ctx.fillText(transition.label, 0, 0);
        this.ctx.restore();
    }

    /**
     * Render label for IF transition (TRUE/FALSE)
     */
    renderIFTransitionLabel(transition, startX, startY, endX, endY) {
        let labelX, labelY;
        
        // Position label near the start of the transition
        if (transition.fromCorner === 'left') {
            labelX = startX - 25;
            labelY = startY - 15;
        } else if (transition.fromCorner === 'right') {
            labelX = startX + 25;
            labelY = startY - 15;
        } else if (transition.fromCorner === 'top') {
            labelX = startX;
            labelY = startY - 25;
        } else if (transition.fromCorner === 'bottom') {
            labelX = startX;
            labelY = startY + 25;
        } else {
            return; // No position available
        }
        
        this.ctx.save();
        this.ctx.fillStyle = '#666';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Display TRUE for Step1, FALSE for Step2
        const displayLabel = transition.label === 'Step1' ? 'TRUE' : 'FALSE';
        
        // Add small background for better visibility
        const textWidth = this.ctx.measureText(displayLabel).width;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(labelX - textWidth/2 - 3, labelY - 8, textWidth + 6, 16);
        
        // Draw the text
        this.ctx.fillStyle = '#666';
        this.ctx.fillText(displayLabel, labelX, labelY);
        this.ctx.restore();
    }

    /**
     * Render single node
     */
    renderNode(node, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        
        try {
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
        } catch (error) {
            Logger.error('Error rendering node', error, { node });
        }
    }

    /**
     * Draw node shape based on type
     */
    drawNodeShape(node) {
        this.ctx.beginPath();
        
        if (node.type === 'start' || node.type === 'stop') {
            this.ctx.ellipse(node.x, node.y, node.r * 1.5, node.r * 0.8, 0, 0, 2 * Math.PI);
        } else if (node.type === 'if') {
            // Rotate the diamond based on node rotation like letter "C"
            this.ctx.save();
            this.ctx.translate(node.x, node.y);
            this.ctx.rotate((node.rotation || 0) * Math.PI / 180);
            this.ctx.translate(-node.x, -node.y);
            
            this.ctx.moveTo(node.x, node.y - node.r);
            this.ctx.lineTo(node.x + node.r, node.y);
            this.ctx.lineTo(node.x, node.y + node.r);
            this.ctx.lineTo(node.x - node.r, node.y);
            this.ctx.closePath();
            
            this.ctx.restore();
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
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label || 'Node', node.x, node.y);
        } else {
            // For regular nodes, check if they're TRUE/FALSE nodes and render white text inside
            if (node.label === 'Step1' || node.label === 'Step2') {
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '18px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(node.label, node.x, node.y);
            } else {
                this.ctx.fillStyle = '#333';
                this.ctx.font = '18px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'bottom';
                this.ctx.fillText(node.label || 'Node', node.x, node.y - node.r - 8);
            }
        }
    }

    /**
     * Render text elements
     */
    renderTexts(texts, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        texts.forEach(text => {
            if (text && text.x !== undefined && text.y !== undefined) {
                this.renderText(text, multiSelectionManager);
            } else {
                Logger.error('Invalid text element detected', null, { text });
            }
        });
    }

    /**
     * Render single text element
     */
    renderText(text, multiSelectionManager) {
        multiSelectionManager = multiSelectionManager || null;
        
        try {
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
        } catch (error) {
            Logger.error('Error rendering text', error, { text });
        }
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
