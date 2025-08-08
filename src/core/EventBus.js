/**
 * Event system for decoupled communication
 */
class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * Subscribe to an event
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    /**
     * Unsubscribe from an event
     */
    off(event, callback) {
        if (!this.listeners.has(event)) return;
        
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    /**
     * Emit an event
     */
    emit(event, ...args) {
        if (!this.listeners.has(event)) return;
        
        this.listeners.get(event).forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                Logger.error(t('errorInEventListener'), error, { event });
            }
        });
    }

    /**
     * Clear all listeners
     */
    clear() {
        this.listeners.clear();
    }
}
