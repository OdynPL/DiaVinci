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
            rotation: 90  // Start in vertical position with arms down
        });

        const {trueNode, falseNode} = this.createIFChildren(ifNode, x, y);
        
        return {ifNode, trueNode, falseNode};
    }

    /**
     * Create TRUE/FALSE child nodes for IF node
     */
    static createIFChildren(ifNode, x, y) {
        const FIXED_DISTANCE = 120; // Fixed distance - never changes
        
        // Create based on IF default rotation (90° - vertical with arms down)
        // Apply the rotation transformation immediately during creation
        const defaultRotation = 90; // IF starts in vertical position
        const angleRad = (defaultRotation * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        
        // Base positions for 0° (horizontal: Step1 left, Step2 right)
        const baseStep1X = -FIXED_DISTANCE;
        const baseStep1Y = 0;
        const baseStep2X = FIXED_DISTANCE;
        const baseStep2Y = 0;
        
        // Apply 90° rotation for default vertical position
        const step1X = x + (baseStep1X * cos - baseStep1Y * sin);
        const step1Y = y + (baseStep1X * sin + baseStep1Y * cos);
        const step2X = x + (baseStep2X * cos - baseStep2Y * sin);
        const step2Y = y + (baseStep2X * sin + baseStep2Y * cos);
        
        const trueNode = new Node({
            x: step1X, 
            y: step1Y,
            r: 30,
            id: Date.now() + 1,
            label: 'Step1',
            color: '#27ae60',
            type: 'node'
        });
        
        const falseNode = new Node({
            x: step2X, 
            y: step2Y,
            r: 30,
            id: Date.now() + 2,
            label: 'Step2',
            color: '#e74c3c',
            type: 'node'
        });
        
        return {trueNode, falseNode};
    }

    /**
     * Create transitions for IF node
     */
    static createIFTransitions(ifNode, trueNode, falseNode) {
        // Always start with default horizontal corners
        // Rotation will update corners appropriately
        const corners = this.getRotatedCorners(ifNode.rotation);
        
        const trueTransition = new Transition({
            from: ifNode,
            to: trueNode,
            label: 'Step1',
            type: 'right',
            fromCorner: corners.step1
        });
        
        const falseTransition = new Transition({
            from: ifNode,
            to: falseNode,
            label: 'Step2',
            type: 'right',
            fromCorner: corners.step2
        });
        
        return {trueTransition, falseTransition};
    }

    /**
     * Update IF node positioning - rotate whole structure like letter "C"
     */
    static updateIFNodePositioning(ifNode, trueTransition, falseTransition) {
        if (!trueTransition || !falseTransition) return;
        
        const trueNode = trueTransition.to;
        const falseNode = falseTransition.to;
        const FIXED_DISTANCE = 120; // Fixed distance - NEVER changes
        
        // Rotate the whole IF structure like letter "C" 
        // Calculate rotated positions around IF center
        const angleRad = (ifNode.rotation * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        
        // Default positions (0°: Step1 left, Step2 right)
        const defaultStep1X = -FIXED_DISTANCE;
        const defaultStep1Y = 0;
        const defaultStep2X = FIXED_DISTANCE;
        const defaultStep2Y = 0;
        
        // Apply rotation transformation - whole structure rotates together
        trueNode.x = ifNode.x + (defaultStep1X * cos - defaultStep1Y * sin);
        trueNode.y = ifNode.y + (defaultStep1X * sin + defaultStep1Y * cos);
        falseNode.x = ifNode.x + (defaultStep2X * cos - defaultStep2Y * sin);
        falseNode.y = ifNode.y + (defaultStep2X * sin + defaultStep2Y * cos);
        
        // Update robot arm corners based on rotation
        const corners = this.getRotatedCorners(ifNode.rotation);
        trueTransition.fromCorner = corners.step1;
        falseTransition.fromCorner = corners.step2;
    }

    /**
     * Create a Data Model node
     */
    static createDataModelNode(x, y) {
        return new DataModelNode({
            x, y, r: 40,
            id: Date.now(),
            label: 'Data Model',
            color: '#8e44ad',
            type: 'datamodel',
            fields: [
                {
                    id: Date.now() + '_field_1',
                    name: 'id',
                    type: 'Integer',
                    initialValue: '',
                    required: true,
                    readOnly: false,
                    nullable: false
                }
            ]
        });
    }

    /**
     * Get appropriate corners for each rotation - like rotating letter "C"
     */
    static getRotatedCorners(rotation) {
        switch (rotation) {
            case 0:   return { step1: 'left', step2: 'right' };    // Horizontal: Step1 left, Step2 right
            case 90:  return { step1: 'top', step2: 'bottom' };    // Vertical: Step1 top, Step2 bottom  
            case 180: return { step1: 'right', step2: 'left' };    // Horizontal flipped: Step1 right, Step2 left
            case 270: return { step1: 'bottom', step2: 'top' };    // Vertical flipped: Step1 bottom, Step2 top
            default:  return { step1: 'left', step2: 'right' };
        }
    }
}
