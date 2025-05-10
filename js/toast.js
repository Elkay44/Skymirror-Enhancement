class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 
                              'fa-info-circle'}"></i>
            </div>
            <div class="toast-content">${message}</div>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.container.appendChild(toast);

        // Add animation
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';

        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.close(toast);
        });

        // Auto close after duration
        setTimeout(() => {
            this.close(toast);
        }, duration);
    }

    close(toast) {
        toast.style.transform = 'translateY(-100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            toast.remove();
            if (this.container.children.length === 0) {
                this.container.remove();
            }
        }, 300);
    }
}

// Export as singleton
const toast = new Toast();

// Add utility functions
window.toast = {
    success: (message, duration = 3000) => toast.show(message, 'success', duration),
    error: (message, duration = 3000) => toast.show(message, 'error', duration),
    warning: (message, duration = 3000) => toast.show(message, 'warning', duration),
    info: (message, duration = 3000) => toast.show(message, 'info', duration)
};
