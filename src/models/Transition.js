/**
 * Transition model representing connections between nodes
 */
class Transition {
    static _idCounter = 0; // Static counter for unique IDs
    
    constructor({from, to, label = null, type = 'right', fromCorner = null, style = 'straight', breakPoints = [], id = null}) {
        this.from = from; // Node instance
        this.to = to; // Node instance
        this.label = label || (typeof window !== 'undefined' && window.t ? window.t('defaultTransitionLabel') : 'relation');
        this.type = type; // 'right', 'both', 'line'
        this.fromCorner = fromCorner; // 'top', 'bottom', 'left', 'right' for IF nodes
        this.style = style; // 'straight', 'curved'
        this.breakPoints = breakPoints; // Array of {x, y} points for line breaks
        this.id = id || this._generateUniqueId();
    }

    /**
     * Generate truly unique ID
     */
    _generateUniqueId() {
        const timestamp = Date.now();
        const counter = ++Transition._idCounter;
        const random = Math.floor(Math.random() * 1000);
        return `transition_${timestamp}_${counter}_${random}`;
    }

    /**
     * Check if point is near this transition line
     */
    containsPoint(x, y) {
        return this.calculateDistanceFromPoint(x, y) < 15 || this.containsLabelPoint(x, y); // Increased from 10 to 15
    }

    /**
     * Check if point is within transition label area
     */
    containsLabelPoint(x, y) {
        if (!this.label || (this.from.type === 'if' && this.fromCorner)) {
            return false;
        }
        
        const {startX, startY, endX, endY} = this.getConnectionPoints();
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2 - 18;
        
        // Check if point is within label rectangle (approximate text bounds)
        const labelWidth = this.label.length * 8 + 10; // approximate width based on characters
        const labelHeight = 20;
        
        return x >= midX - labelWidth/2 && x <= midX + labelWidth/2 &&
               y >= midY - labelHeight && y <= midY + 5;
    }

    /**
     * Calculate distance from point to transition line
     */
    calculateDistanceFromPoint(px, py) {
        if (this.breakPoints && this.breakPoints.length > 0) {
            // Calculate distance from point to path with break points
            const pathPoints = this.getPathPoints();
            let minDistance = Infinity;
            
            for (let i = 0; i < pathPoints.length - 1; i++) {
                const start = pathPoints[i];
                const end = pathPoints[i + 1];
                const distance = this.pointToSegmentDistance(px, py, start.x, start.y, end.x, end.y);
                minDistance = Math.min(minDistance, distance);
            }
            
            return minDistance;
        } else {
            // Simple line without break points
            const {startX, startY, endX, endY} = this.getConnectionPoints();
            return this.pointToSegmentDistance(px, py, startX, startY, endX, endY);
        }
    }

    /**
     * Get start and end points for drawing
     */
    getConnectionPoints() {
        // Validate that we have valid from and to nodes
        if (!this.from || !this.to) {
            Logger.error(t('transitionMissingFromOrToNode'), { from: this.from, to: this.to, transition: this });
            return { startX: 0, startY: 0, endX: 0, endY: 0 };
        }
        
        if (this.from.x === undefined || this.from.y === undefined || this.to.x === undefined || this.to.y === undefined) {
            Logger.error(t('transitionNodesMissingCoordinates'), { 
                from: { x: this.from.x, y: this.from.y, id: this.from.id },
                to: { x: this.to.x, y: this.to.y, id: this.to.id },
                transition: this 
            });
            return { startX: 0, startY: 0, endX: 0, endY: 0 };
        }
        
        let startX, startY, endX, endY;

        // Calculate end point first to get proper angle
        if (this.from.type === 'if' && this.fromCorner && (this.label === 'Step1' || this.label === 'Step2')) {
            // For IF to Step transitions, calculate proper angle-based end point
            // First get preliminary start point for angle calculation
            const corners = this.getIFNodeCorners(this.from);
            const corner = corners[this.fromCorner];
            const prelimStartX = corner ? corner.x : this.from.x;
            const prelimStartY = corner ? corner.y : this.from.y;
            
            // Use standard calculation for proper edge intersection
            const {x, y} = this.calculateStandardEndPoint(prelimStartX, prelimStartY);
            endX = x;
            endY = y;
        } else {
            // Calculate preliminary start point for angle calculation
            const prelimStartX = this.from.type === 'if' && this.fromCorner ? 
                this.getIFNodeCorners(this.from)[this.fromCorner].x : this.from.x;
            const prelimStartY = this.from.type === 'if' && this.fromCorner ? 
                this.getIFNodeCorners(this.from)[this.fromCorner].y : this.from.y;
            
            const {x, y} = this.calculateStandardEndPoint(prelimStartX, prelimStartY);
            endX = x;
            endY = y;
        }

        // Calculate start point based on end point
        if (this.from.type === 'if' && this.fromCorner) {
            const corners = this.getIFNodeCorners(this.from);
            const corner = corners[this.fromCorner];
            if (corner) {
                startX = corner.x;
                startY = corner.y;
            } else {
                // Fallback to center if corner is invalid
                startX = this.from.x;
                startY = this.from.y;
            }
        } else {
            const {x, y} = this.calculateStandardStartPoint(endX, endY);
            startX = x;
            startY = y;
        }

        return {startX, startY, endX, endY};
    }

    /**
     * Get corner positions for IF node
     */
    getIFNodeCorners(ifNode) {
        return {
            top: {x: ifNode.x, y: ifNode.y - ifNode.r},
            bottom: {x: ifNode.x, y: ifNode.y + ifNode.r},
            left: {x: ifNode.x - ifNode.r, y: ifNode.y},
            right: {x: ifNode.x + ifNode.r, y: ifNode.y}
        };
    }

    /**
     * Calculate standard end point
     */
    calculateStandardEndPoint(startX, startY) {
        const dx = this.to.x - startX;
        const dy = this.to.y - startY;
        const angle = Math.atan2(dy, dx);

        if (this.to.type === 'start' || this.to.type === 'stop') {
            const a = this.to.r * 1.5;
            const b = this.to.r * 0.8;
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
            return {
                x: this.to.x - cosAngle * distance,
                y: this.to.y - sinAngle * distance
            };
        } else {
            return {
                x: this.to.x - Math.cos(angle) * this.to.r,
                y: this.to.y - Math.sin(angle) * this.to.r
            };
        }
    }

    /**
     * Calculate standard start point
     */
    calculateStandardStartPoint(endX, endY) {
        const dx = endX - this.from.x;
        const dy = endY - this.from.y;
        const angle = Math.atan2(dy, dx);

        if (this.from.type === 'start' || this.from.type === 'stop') {
            const a = this.from.r * 1.5;
            const b = this.from.r * 0.8;
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
            return {
                x: this.from.x + cosAngle * distance,
                y: this.from.y + sinAngle * distance
            };
        } else {
            return {
                x: this.from.x + Math.cos(angle) * this.from.r,
                y: this.from.y + Math.sin(angle) * this.from.r
            };
        }
    }

    /**
     * Calculate distance from point to line segment
     */
    pointToSegmentDistance(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;
        if (len_sq !== 0) param = dot / len_sq;
        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Update transition label
     */
    setLabel(label) {
        this.label = label;
    }

    /**
     * Get translated display label
     */
    getDisplayLabel() {
        if (this.label === 'relation' && typeof window !== 'undefined' && window.t) {
            return window.t('defaultTransitionLabel');
        }
        return this.label;
    }

    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            fromId: this.from.id,
            toId: this.to.id,
            label: this.label,
            type: this.type,
            fromCorner: this.fromCorner,
            style: this.style,
            breakPoints: this.breakPoints
        };
    }

    /**
     * Create Transition from plain object (requires node lookup)
     */
    static fromJSON(data, nodeMap) {
        const fromNode = nodeMap.get(data.fromId);
        const toNode = nodeMap.get(data.toId);
        
        if (!fromNode || !toNode) {
            throw new Error(`Cannot create transition: missing nodes ${data.fromId} -> ${data.toId}`);
        }

        return new Transition({
            from: fromNode,
            to: toNode,
            label: data.label,
            type: data.type,
            fromCorner: data.fromCorner,
            style: data.style || 'straight',
            breakPoints: data.breakPoints || []
        });
    }

    /**
     * Toggle between straight and curved style
     */
    toggleStyle() {
        // Block style changes for IF transitions - they must stay as robot arms
        if (this.from.type === 'if' && (this.label === 'Step1' || this.label === 'Step2')) {
            Logger.debug(t('blockedStyleToggleForIFTransition'), {
                label: this.label,
                fromType: this.from.type
            });
            return;
        }
        
        this.style = this.style === 'straight' ? 'curved' : 'straight';
        Logger.debug(t('transitionStyleToggled'), { style: this.style, label: this.label });
    }

    /**
     * Add break point at given position
     */
    addBreakPoint(x, y) {
        // Block break points for IF transitions - they must stay as robot arms
        if (this.from.type === 'if' && (this.label === 'Step1' || this.label === 'Step2')) {
            Logger.debug(t('blockedBreakPointForIFTransition'), {
                label: this.label,
                fromType: this.from.type
            });
            return;
        }
        
        // Find the best position to insert the break point
        const insertIndex = this.findBreakPointInsertIndex(x, y);
        this.breakPoints.splice(insertIndex, 0, {x, y});
        Logger.debug(t('breakPointAdded'), { x, y, totalPoints: this.breakPoints.length });
    }

    /**
     * Find best index to insert break point
     */
    findBreakPointInsertIndex(x, y) {
        if (this.breakPoints.length === 0) {
            return 0;
        }

        const {startX, startY, endX, endY} = this.getConnectionPoints();
        const points = [{x: startX, y: startY}, ...this.breakPoints, {x: endX, y: endY}];
        
        let minDistance = Infinity;
        let bestIndex = 0;
        
        for (let i = 0; i < points.length - 1; i++) {
            const segmentDistance = this.pointToSegmentDistance(
                x, y, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y
            );
            
            if (segmentDistance < minDistance) {
                minDistance = segmentDistance;
                bestIndex = i;
            }
        }
        
        return bestIndex;
    }

    /**
     * Remove break point closest to given position
     */
    removeBreakPoint(x, y) {
        if (this.breakPoints.length === 0) return false;
        
        let minDistance = Infinity;
        let closestIndex = -1;
        
        this.breakPoints.forEach((point, index) => {
            const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        
        if (closestIndex !== -1 && minDistance < 15) {
            this.breakPoints.splice(closestIndex, 1);
            Logger.debug(t('breakPointRemoved'), { index: closestIndex, remainingPoints: this.breakPoints.length });
            return true;
        }
        
        return false;
    }

    /**
     * Get all path points including break points
     */
    getPathPoints() {
        const {startX, startY, endX, endY} = this.getConnectionPoints();
        return [
            {x: startX, y: startY},
            ...this.breakPoints,
            {x: endX, y: endY}
        ];
    }

    /**
     * Check if point is near any break point
     */
    isNearBreakPoint(x, y, threshold = 15) {
        return this.breakPoints.some(point => {
            const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            return distance < threshold;
        });
    }

    /**
     * Clear all break points
     */
    clearBreakPoints() {
        this.breakPoints = [];
        Logger.debug(t('allBreakPointsCleared'), { label: this.label });
    }
}
