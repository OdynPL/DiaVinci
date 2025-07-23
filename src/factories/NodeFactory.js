/**
 * Node factory for creating different types of nodes
 */
class NodeFactory {
    /**
     * Create a regular node
     */
    static createNode(x, y, nodeCounter) {
        return new Node({
            x, y, r: 30,
            id: Date.now(),
            label: `Node ${nodeCounter}`,
            color: '#b3d1ff',
            type: 'node'
        });
    }

    /**
     * Create a start node
     */
    static createStartNode(x, y) {
        return new Node({
            x, y, r: 30,
            id: Date.now(),
            label: 'START',
            color: '#27ae60',
            type: 'start'
        });
    }

    /**
     * Create a stop node
     */
    static createStopNode(x, y) {
        return new Node({
            x, y, r: 30,
            id: Date.now(),
            label: 'STOP',
            color: '#e74c3c',
            type: 'stop'
        });
    }

    /**
     * Create an IF node with associated TRUE/FALSE nodes
     */
    static createIFNode(x, y) {
        const ifNode = new Node({
            x, y, r: 35,
            id: Date.now(),
            label: 'IF',
            color: '#f39c12',
            type: 'if',
            rotation: 0
        });

        const {trueNode, falseNode} = this.createIFChildren(ifNode, x, y);
        
        return {ifNode, trueNode, falseNode};
    }

    /**
     * Create TRUE/FALSE child nodes for IF node
     */
    static createIFChildren(ifNode, x, y) {
        let trueNode, falseNode;
        
        if (ifNode.rotation === 90) {
            // Vertical orientation
            trueNode = new Node({
                x: x, y: y - 120, r: 30,
                id: Date.now() + 1,
                label: 'TRUE',
                color: '#27ae60',
                type: 'node'
            });
            falseNode = new Node({
                x: x, y: y + 120, r: 30,
                id: Date.now() + 2,
                label: 'FALSE',
                color: '#e74c3c',
                type: 'node'
            });
        } else {
            // Horizontal orientation (default)
            trueNode = new Node({
                x: x - 120, y: y - 60, r: 30,
                id: Date.now() + 1,
                label: 'TRUE',
                color: '#27ae60',
                type: 'node'
            });
            falseNode = new Node({
                x: x + 120, y: y + 60, r: 30,
                id: Date.now() + 2,
                label: 'FALSE',
                color: '#e74c3c',
                type: 'node'
            });
        }
        
        return {trueNode, falseNode};
    }

    /**
     * Create transitions for IF node
     */
    static createIFTransitions(ifNode, trueNode, falseNode) {
        const trueCorner = ifNode.rotation === 90 ? 'top' : 'left';
        const falseCorner = ifNode.rotation === 90 ? 'bottom' : 'right';
        
        const trueTransition = new Transition({
            from: ifNode,
            to: trueNode,
            label: 'TRUE',
            type: 'right',
            fromCorner: trueCorner
        });
        
        const falseTransition = new Transition({
            from: ifNode,
            to: falseNode,
            label: 'FALSE',
            type: 'right',
            fromCorner: falseCorner
        });
        
        return {trueTransition, falseTransition};
    }

    /**
     * Update IF node positioning after rotation
     */
    static updateIFNodePositioning(ifNode, trueTransition, falseTransition) {
        if (!trueTransition || !falseTransition) return;
        
        const trueNode = trueTransition.to;
        const falseNode = falseTransition.to;
        
        if (ifNode.rotation === 90) {
            // Vertical: TRUE on top, FALSE on bottom
            trueNode.x = ifNode.x;
            trueNode.y = ifNode.y - 120;
            falseNode.x = ifNode.x;
            falseNode.y = ifNode.y + 120;
            trueTransition.fromCorner = 'top';
            falseTransition.fromCorner = 'bottom';
        } else {
            // Horizontal: TRUE on left, FALSE on right
            trueNode.x = ifNode.x - 120;
            trueNode.y = ifNode.y - 60;
            falseNode.x = ifNode.x + 120;
            falseNode.y = ifNode.y + 60;
            trueTransition.fromCorner = 'left';
            falseTransition.fromCorner = 'right';
        }
    }
}
