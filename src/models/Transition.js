/**
 * Transition model representing connections between nodes
 */
class Transition {
    constructor({from, to, label = 'relation', type = 'right', fromCorner = null, style = 'straight', breakPoints = []}) {
        this.from = from; // Node instance
        this.to = to; // Node instance
        this.label = label;
        this.type = type; // 'right', 'both', 'line'
        this.fromCorner = fromCorner; // 'top', 'bottom', 'left', 'right' for IF nodes
        this.style = style; // 'straight', 'curved'
        this.breakPoints = breakPoints; // Array of {x, y} points for line breaks
    }

    /**
     * Check if point is near this transition line
     */
    containsPoint(x, y) {
        return this.calculateDistanceFromPoint(x, y) < 10 || this.containsLabelPoint(x, y);
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
        const {startX, startY, endX, endY} = this.getConnectionPoints();
        return this.pointToSegmentDistance(px, py, startX, startY, endX, endY);
    }

    /**
     * Get start and end points for drawing
     */
    getConnectionPoints() {
        let startX, startY, endX, endY;

        // Calculate start point
        if (this.from.type === 'if' && this.fromCorner) {
            const corners = this.getIFNodeCorners(this.from);
            const corner = corners[this.fromCorner];
            startX = corner.x;
            startY = corner.y;
        } else {
            startX = this.from.x;
            startY = this.from.y;
        }

        // Calculate end point
        if (this.from.type === 'if' && this.fromCorner && (this.label === 'TRUE' || this.label === 'FALSE')) {
            // Special handling for IF transitions
            const {x, y} = this.calculateIFEndPoint();
            endX = x;
            endY = y;
        } else {
            const {x, y} = this.calculateStandardEndPoint(startX, startY);
            endX = x;
            endY = y;
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
     * Calculate end point for IF transitions
     */
    calculateIFEndPoint() {
        if (this.label === 'TRUE' && this.fromCorner === 'left') {
            return {x: this.to.x - this.to.r, y: this.to.y};
        } else if (this.label === 'FALSE' && this.fromCorner === 'right') {
            return {x: this.to.x - this.to.r, y: this.to.y};
        } else if (this.label === 'TRUE' && this.fromCorner === 'top') {
            return {x: this.to.x, y: this.to.y - this.to.r};
        } else if (this.label === 'FALSE' && this.fromCorner === 'bottom') {
            return {x: this.to.x, y: this.to.y + this.to.r};
        }
        
        // Fallback
        const {startX, startY} = this.getConnectionPoints();
        return this.calculateStandardEndPoint(startX, startY);
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
        this.style = this.style === 'straight' ? 'curved' : 'straight';
        Logger.debug('Transition style toggled', { style: this.style, label: this.label });
    }

    /**
     * Add break point at given position
     */
    addBreakPoint(x, y) {
        // Find the best position to insert the break point
        const insertIndex = this.findBreakPointInsertIndex(x, y);
        this.breakPoints.splice(insertIndex, 0, {x, y});
        Logger.debug('Break point added', { x, y, totalPoints: this.breakPoints.length });
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
            Logger.debug('Break point removed', { index: closestIndex, remainingPoints: this.breakPoints.length });
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
        Logger.debug('All break points cleared', { label: this.label });
    }
}
