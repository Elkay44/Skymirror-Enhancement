class Modal {
    constructor(options = {}) {
        this.options = {
            title: options.title || '',
            content: options.content || '',
            type: options.type || 'default',
            size: options.size || 'medium',
            showCloseButton: options.showCloseButton !== false,
            onClose: options.onClose || null,
            ...options
        };

        this.createModal();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = `modal modal-${this.options.type} modal-${this.options.size}`;

        this.modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                ${this.options.title ? `<div class="modal-header">
                    <h3 class="modal-title">${this.options.title}</h3>
                    ${this.options.showCloseButton ? '<button class="modal-close" aria-label="Close"><i class="fas fa-times"></i></button>' : ''}
                </div>` : ''}
                <div class="modal-body">
                    ${this.options.content}
                </div>
                ${this.options.footer ? `<div class="modal-footer">
                    ${this.options.footer}
                </div>` : ''}
            </div>
        `;

        document.body.appendChild(this.modal);

        // Add event listeners
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.close());
        if (this.modal.querySelector('.modal-close')) {
            this.modal.querySelector('.modal-close').addEventListener('click', () => this.close());
        }

        // Show animation
        setTimeout(() => {
            this.modal.style.opacity = '1';
            this.modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }

    close() {
        // Hide animation
        this.modal.style.opacity = '0';
        this.modal.querySelector('.modal-content').style.transform = 'translateY(-20px)';

        // Remove after animation
        setTimeout(() => {
            this.modal.remove();
            if (this.options.onClose) {
                this.options.onClose();
            }
        }, 300);
    }

    static show(options) {
        return new Modal(options);
    }
}

// Add utility functions
window.modal = {
    show: (options) => Modal.show(options),
    alert: (message, title = 'Alert') => Modal.show({
        title,
        content: message,
        type: 'alert',
        footer: '<button class="primary-btn" onclick="modal.close()">OK</button>'
    }),
    confirm: (message, title = 'Confirm', onConfirm) => Modal.show({
        title,
        content: message,
        type: 'confirm',
        footer: `
            <button class="secondary-btn" onclick="modal.close()">Cancel</button>
            <button class="primary-btn" onclick="modal.close(); ${onConfirm}">Confirm</button>
        `
    }),
    custom: (options) => Modal.show(options)
};
