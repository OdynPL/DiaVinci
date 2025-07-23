/**
 * Notification service for user feedback
 */
class NotificationService {
    constructor() {
        this.notificationId = 'notification';
    }

    /**
     * Show notification to user
     */
    show(message, type = 'info', duration = 3000) {
        // Remove existing notification if any
        this.hide();
        
        const notification = document.createElement('div');
        notification.id = this.notificationId;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.color = '#fff';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '3000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        this.setNotificationStyle(notification, type);
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        // Auto-hide after duration
        if (duration > 0) {
            setTimeout(() => {
                this.hide();
            }, duration);
        }
    }

    /**
     * Show success notification
     */
    success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    /**
     * Show error notification
     */
    error(message, duration = 3000) {
        this.show(message, 'error', duration);
    }

    /**
     * Show info notification
     */
    info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }

    /**
     * Hide current notification
     */
    hide() {
        const existing = document.getElementById(this.notificationId);
        if (existing) {
            existing.style.opacity = '0';
            setTimeout(() => {
                if (existing.parentNode) {
                    existing.remove();
                }
            }, 300);
        }
    }

    /**
     * Set notification style based on type
     */
    setNotificationStyle(notification, type) {
        switch (type) {
            case 'success':
                notification.style.background = '#27ae60';
                break;
            case 'error':
                notification.style.background = '#e74c3c';
                break;
            default:
                notification.style.background = '#3498db';
        }
    }
}
