/**
 * Node model representing diagram nodes
 */
class Node {
    static _idCounter = 0; // Static counter for unique IDs
    
    constructor({x, y, r = 30, id = null, label = 'Node', color = '#b3d1ff', type = 'node', rotation = 0}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id || this._generateUniqueId();
        this.label = label;
        this.color = color;
        this.type = type; // 'node', 'start', 'stop', 'if'
        this.rotation = rotation; // 0 (horizontal), 90 (vertical) for IF nodes
    }

    /**
     * Generate truly unique ID
     */
    _generateUniqueId() {
        const timestamp = Date.now();
        const counter = ++Node._idCounter;
        const random = Math.floor(Math.random() * 1000);
        return `${this.type || 'node'}_${timestamp}_${counter}_${random}`;
    }

    /**
     * Check if point is inside this node
     */
    containsPoint(x, y) {
        if (this.type === 'start' || this.type === 'stop') {
            // Check ellipse collision for start/stop nodes
            const dx = (x - this.x) / (this.r * 1.5);
            const dy = (y - this.y) / (this.r * 0.8);
            return (dx * dx + dy * dy) <= 1;
        } else if (this.type === 'if') {
            // Check diamond collision for if nodes
            const dx = Math.abs(x - this.x);
            const dy = Math.abs(y - this.y);
            return (dx / this.r + dy / this.r) <= 1;
        } else {
            // Check circle collision for regular nodes
            return Math.hypot(this.x - x, this.y - y) < this.r;
        }
    }

    /**
     * Move node to new position
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Update node label
     */
    setLabel(label) {
        this.label = label;
    }

    /**
     * Update node color
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * Toggle rotation for IF nodes (rotate 90 degrees clockwise)
     */
    toggleRotation() {
        if (this.type === 'if') {
            this.rotation = (this.rotation + 90) % 360;
        }
    }

    /**
     * Rotate IF node counter-clockwise (90 degrees)
     */
    rotateCounterClockwise() {
        if (this.type === 'if') {
            this.rotation = (this.rotation - 90 + 360) % 360;
        }
    }

    /**
     * Create a copy of this node
     */
    clone() {
        return new Node({
            x: this.x,
            y: this.y,
            r: this.r,
            id: this.id,
            label: this.label,
            color: this.color,
            type: this.type,
            rotation: this.rotation
        });
    }

    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            r: this.r,
            id: this.id,
            label: this.label,
            color: this.color,
            type: this.type,
            rotation: this.rotation
        };
    }

    /**
     * Create Node from plain object
     */
    static fromJSON(data) {
        // Handle different node types
        if (data.type === 'datamodel' && typeof DataModelNode !== 'undefined') {
            return DataModelNode.fromJSON(data);
        }
        return new Node(data);
    }
}
