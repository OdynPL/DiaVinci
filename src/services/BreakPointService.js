/**
 * Service for managing transition break points
 * Follows Single Responsibility Principle - handles only break point operations
 */
class BreakPointService {
    constructor(eventBus, errorHandler = null) {
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        
        Logger.info('BreakPointService initialized');
    }

    /**
     * Find break point near given position
     * @param {Array} transitions - All transitions to search
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} threshold - Detection threshold (default 15px)
     * @returns {Object|null} - {transition, breakPointIndex, breakPoint} or null
     */
    findBreakPointAtPosition(transitions, x, y, threshold = 15) {
        try {
            for (const transition of transitions) {
                if (!transition.breakPoints || transition.breakPoints.length === 0) {
                    continue;
                }

                for (let i = 0; i < transition.breakPoints.length; i++) {
                    const point = transition.breakPoints[i];
                    const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
                    
                    if (distance < threshold) {
                        return {
                            transition,
                            breakPointIndex: i,
                            breakPoint: point
                        };
                    }
                }
            }
            
            return null;
        } catch (error) {
            Logger.error('Error finding break point at position', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to find break point');
            }
            return null;
        }
    }

    /**
     * Move break point to new position
     * @param {Object} transition - Transition containing the break point
     * @param {number} breakPointIndex - Index of break point to move
     * @param {number} newX - New X coordinate
     * @param {number} newY - New Y coordinate
     */
    moveBreakPoint(transition, breakPointIndex, newX, newY) {
        try {
            if (!transition.breakPoints || breakPointIndex < 0 || breakPointIndex >= transition.breakPoints.length) {
                throw new Error('Invalid break point index');
            }

            const oldPosition = { ...transition.breakPoints[breakPointIndex] };
            transition.breakPoints[breakPointIndex].x = newX;
            transition.breakPoints[breakPointIndex].y = newY;

            Logger.debug('Break point moved', {
                transition: transition.label,
                index: breakPointIndex,
                from: oldPosition,
                to: { x: newX, y: newY }
            });

            // Emit event for auto-save and rendering
            this.eventBus.emit('breakpoint.moved', {
                transition,
                breakPointIndex,
                oldPosition,
                newPosition: { x: newX, y: newY }
            });

        } catch (error) {
            Logger.error('Error moving break point', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to move break point');
            }
        }
    }

    /**
     * Calculate offset for multiple break points being moved together
     * @param {Array} breakPointRefs - Array of {transition, breakPointIndex} objects
     * @param {number} deltaX - X offset
     * @param {number} deltaY - Y offset
     */
    moveMultipleBreakPoints(breakPointRefs, deltaX, deltaY) {
        try {
            const movedBreakPoints = [];

            for (const ref of breakPointRefs) {
                const { transition, breakPointIndex } = ref;
                
                if (!transition.breakPoints || breakPointIndex < 0 || breakPointIndex >= transition.breakPoints.length) {
                    continue;
                }

                const breakPoint = transition.breakPoints[breakPointIndex];
                const oldPosition = { ...breakPoint };
                
                breakPoint.x += deltaX;
                breakPoint.y += deltaY;

                movedBreakPoints.push({
                    transition,
                    breakPointIndex,
                    oldPosition,
                    newPosition: { ...breakPoint }
                });
            }

            if (movedBreakPoints.length > 0) {
                Logger.debug('Multiple break points moved', {
                    count: movedBreakPoints.length,
                    delta: { deltaX, deltaY }
                });

                // Emit event for auto-save and rendering
                this.eventBus.emit('breakpoints.moved', {
                    movedBreakPoints,
                    delta: { deltaX, deltaY }
                });
            }

        } catch (error) {
            Logger.error('Error moving multiple break points', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to move break points');
            }
        }
    }

    /**
     * Check if any break points are selected in multi-selection
     * @param {Set} selectedElements - Currently selected elements
     * @param {Array} transitions - All transitions to check
     * @returns {Array} - Array of {transition, breakPointIndex} for selected break points
     */
    getSelectedBreakPoints(selectedElements, transitions) {
        try {
            const selectedBreakPoints = [];

            // For now, we'll implement this as part of transition selection
            // Each selected transition contributes all its break points
            for (const element of selectedElements) {
                if (element.breakPoints && element.breakPoints.length > 0) {
                    for (let i = 0; i < element.breakPoints.length; i++) {
                        selectedBreakPoints.push({
                            transition: element,
                            breakPointIndex: i
                        });
                    }
                }
            }

            return selectedBreakPoints;
        } catch (error) {
            Logger.error('Error getting selected break points', error);
            return [];
        }
    }

    /**
     * Validate break point position to ensure it's within reasonable bounds
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {Object} canvasBounds - Canvas boundaries {width, height}
     * @returns {Object} - Validated {x, y} coordinates
     */
    validateBreakPointPosition(x, y, canvasBounds) {
        const margin = 10; // Keep break points at least 10px from edges
        
        return {
            x: Math.max(margin, Math.min(canvasBounds.width - margin, x)),
            y: Math.max(margin, Math.min(canvasBounds.height - margin, y))
        };
    }

    /**
     * Update break points when connected nodes move
     * @param {Object} movedNode - The node that was moved
     * @param {Array} transitions - All transitions to check
     * @param {number} deltaX - X movement
     * @param {number} deltaY - Y movement
     */
    updateBreakPointsForMovedNode(movedNode, transitions, deltaX, deltaY) {
        try {
            const affectedTransitions = transitions.filter(tr => 
                tr.from === movedNode || tr.to === movedNode
            );

            affectedTransitions.forEach(transition => {
                if (transition.breakPoints && transition.breakPoints.length > 0) {
                    // Move break points with the connected node
                    transition.breakPoints.forEach(point => {
                        point.x += deltaX;
                        point.y += deltaY;
                    });

                    Logger.debug('Break points updated for node movement', {
                        nodeId: movedNode.id,
                        transitionLabel: transition.label,
                        breakPointsCount: transition.breakPoints.length,
                        delta: { deltaX, deltaY }
                    });
                }
            });

            if (affectedTransitions.length > 0) {
                this.eventBus.emit('breakpoints.node.moved', {
                    movedNode,
                    affectedTransitions,
                    delta: { deltaX, deltaY }
                });
            }

        } catch (error) {
            Logger.error('Error updating break points for moved node', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to update break points');
            }
        }
    }

    /**
     * Update break points for multiple moved nodes (group drag)
     * @param {Array} movedNodes - Array of moved nodes
     * @param {Array} transitions - All transitions to check  
     * @param {number} deltaX - X movement
     * @param {number} deltaY - Y movement
     */
    updateBreakPointsForMovedNodes(movedNodes, transitions, deltaX, deltaY) {
        try {
            const affectedTransitions = new Set();
            
            movedNodes.forEach(node => {
                transitions.forEach(tr => {
                    if (tr.from === node || tr.to === node) {
                        affectedTransitions.add(tr);
                    }
                });
            });

            Array.from(affectedTransitions).forEach(transition => {
                if (transition.breakPoints && transition.breakPoints.length > 0) {
                    transition.breakPoints.forEach(point => {
                        point.x += deltaX;
                        point.y += deltaY;
                    });
                }
            });

            if (affectedTransitions.size > 0) {
                Logger.debug('Break points updated for group node movement', {
                    movedNodesCount: movedNodes.length,
                    affectedTransitionsCount: affectedTransitions.size,
                    delta: { deltaX, deltaY }
                });

                this.eventBus.emit('breakpoints.nodes.moved', {
                    movedNodes,
                    affectedTransitions: Array.from(affectedTransitions),
                    delta: { deltaX, deltaY }
                });
            }

        } catch (error) {
            Logger.error('Error updating break points for moved nodes', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to update break points');
            }
        }
    }
}
