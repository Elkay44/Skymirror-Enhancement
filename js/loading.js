class LoadingManager {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'loading-overlay';
        this.spinner = document.createElement('div');
        this.spinner.className = 'loading-spinner';
        this.overlay.appendChild(this.spinner);
        this.overlay.style.display = 'none';
    }

    show() {
        document.body.appendChild(this.overlay);
        this.overlay.style.display = 'flex';
    }

    hide() {
        this.overlay.style.display = 'none';
        setTimeout(() => {
            this.overlay.remove();
        }, 300);
    }
}

// Export as singleton
const loading = new LoadingManager();

// Add utility functions
window.loading = {
    show: () => loading.show(),
    hide: () => loading.hide()
};
