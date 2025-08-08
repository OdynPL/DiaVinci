/**
 * Project model representing a complete diagram project
 */
class Project {
    constructor({name, nodes = [], transitions = [], texts = [], nodeCounter = 1, functionCounter = 1, timestamp = null, isPrivate = false, passwordHash = null}) {
        this.name = name;
        this.nodes = nodes;
        this.transitions = transitions;
        this.texts = texts;
        this.nodeCounter = nodeCounter;
        this.functionCounter = functionCounter;
        this.timestamp = timestamp || new Date().toISOString();
        this.version = '1.0';
        this.isPrivate = isPrivate;
        this.passwordHash = passwordHash;
    }

    /**
     * Add a node to the project
     */
    addNode(node) {
        this.nodes.push(node);
        if (node.type === 'node' || node.type === 'datamodel') {
            this.nodeCounter++;
        }
        if (node.type === 'function') {
            this.functionCounter++;
        }
    }

    /**
     * Remove a node and all its transitions
     */
    removeNode(node) {
        this.nodes = this.nodes.filter(n => n !== node);
        this.transitions = this.transitions.filter(tr => tr.from !== node && tr.to !== node);
    }

    /**
     * Add a transition to the project
     */
    addTransition(transition) {
        // Check for duplicate transitions between same nodes
        const existingTransition = this.transitions.find(tr => 
            tr.from === transition.from && tr.to === transition.to
        );
        
        if (existingTransition) {
            Logger.warn(t('duplicateTransitionPrevented'), {
                from: transition.from ? transition.from.id : null,
                to: transition.to ? transition.to.id : null,
                existingLabel: existingTransition.label,
                newLabel: transition.label
            });
            return false; // Return false to indicate transition was not added
        }
        
        this.transitions.push(transition);
        return true; // Return true to indicate successful addition
    }

    /**
     * Remove a transition from the project
     */
    removeTransition(transition) {
        this.transitions = this.transitions.filter(tr => tr !== transition);
    }

    /**
     * Add a text element to the project
     */
    addText(text) {
        this.texts.push(text);
    }

    /**
     * Remove a text element from the project
     */
    removeText(text) {
        this.texts = this.texts.filter(t => t !== text);
    }

    /**
     * Find node by ID
     */
    findNodeById(id) {
        return this.nodes.find(node => node.id === id);
    }

    /**
     * Find node at position
     */
    findNodeAtPosition(x, y) {
        return this.nodes.find(node => node.containsPoint(x, y));
    }

    /**
     * Find text element at position
     */
    findTextAtPosition(x, y, ctx) {
        Logger.debug(t('lookingForTextAtPosition'), { x, y, textsCount: this.texts.length });
        const found = this.texts.find(text => {
            const contains = text.containsPoint(x, y, ctx);
            if (contains) {
                Logger.debug(t('foundTextElement'), { label: text.label, textX: text.x, textY: text.y });
            }
            return contains;
        });
        if (!found) {
            Logger.debug(t('noTextFoundAtPosition'));
        }
        return found;
    }

    /**
     * Find transition near position
     */
    findTransitionNearPosition(x, y) {
        return this.transitions.find(tr => tr.containsPoint(x, y));
    }

    /**
     * Clear all project data
     */
    clear() {
        this.nodes = [];
        this.transitions = [];
        this.texts = [];
        this.nodeCounter = 1;
    }

    /**
     * Update timestamp
     */
    updateTimestamp() {
        this.timestamp = new Date().toISOString();
    }

    /**
     * Get node map for transition deserialization
     */
    getNodeMap() {
        const nodeMap = new Map();
        this.nodes.forEach(node => nodeMap.set(node.id, node));
        return nodeMap;
    }

    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            name: this.name,
            nodes: this.nodes.map(node => node.toJSON()),
            transitions: this.transitions.map(tr => tr.toJSON()),
            texts: this.texts.map(text => text.toJSON()),
            nodeCounter: this.nodeCounter,
            timestamp: this.timestamp,
            version: this.version,
            isPrivate: this.isPrivate || false,
            passwordHash: this.passwordHash || null,
            exported: true
        };
    }

    /**
     * Create Project from plain object
     */
    static fromJSON(data) {
        // First create nodes
        const nodes = (data.nodes || []).map(nodeData => Node.fromJSON(nodeData));
        
        // Create node map for transition references
        const nodeMap = new Map();
        nodes.forEach(node => nodeMap.set(node.id, node));
        
        // Create transitions with node references
        const transitions = (data.transitions || []).map(trData => {
            // Handle old format where transitions have full node objects
            if (trData.from && typeof trData.from === 'object' && trData.from.id) {
                return Transition.fromJSON({
                    fromId: trData.from.id,
                    toId: trData.to.id,
                    label: trData.label,
                    type: trData.type,
                    fromCorner: trData.fromCorner
                }, nodeMap);
            }
            // Handle new format with node IDs
            return Transition.fromJSON(trData, nodeMap);
        });
        
        // Create text elements
        const texts = (data.texts || []).map(textData => TextElement.fromJSON(textData));
        
        return new Project({
            name: data.name,
            nodes,
            transitions,
            texts,
            nodeCounter: data.nodeCounter || 1,
            timestamp: data.timestamp,
            isPrivate: data.isPrivate || false,
            passwordHash: data.passwordHash || null
        });
    }
}
