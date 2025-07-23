/**
 * Text model representing text elements
 */
class TextElement {
    constructor({x, y, label = 'Text', id = null}) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.id = id || Date.now();
    }

    /**
     * Check if point is inside this text element
     */
    containsPoint(x, y, ctx) {
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const width = ctx.measureText(this.label).width;
        return (
            x >= this.x - width / 2 - 8 &&
            x <= this.x + width / 2 + 8 &&
            y >= this.y - 16 &&
            y <= this.y + 16
        );
    }

    /**
     * Move text element to new position
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Update text label
     */
    setLabel(label) {
        this.label = label;
    }

    /**
     * Create a copy of this text element
     */
    clone() {
        return new TextElement({
            x: this.x,
            y: this.y,
            label: this.label,
            id: this.id
        });
    }

    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            label: this.label,
            id: this.id
        };
    }

    /**
     * Create TextElement from plain object
     */
    static fromJSON(data) {
        return new TextElement(data);
    }
}
