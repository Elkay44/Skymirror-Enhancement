class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.init();
    }

    init() {
        // Add validation classes
        this.form.classList.add('form-validation');

        // Add validation to form elements
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });

        // Validate on submit
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
                toast.error('Please fix the errors in the form');
            }
        });
    }

    validateField(field) {
        const type = field.getAttribute('type') || field.tagName.toLowerCase();
        const required = field.hasAttribute('required');
        const pattern = field.getAttribute('pattern');
        const min = field.getAttribute('min');
        const max = field.getAttribute('max');
        const minLength = field.getAttribute('minlength');
        const maxLength = field.getAttribute('maxlength');

        let isValid = true;
        let message = '';

        // Required validation
        if (required && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }

        // Pattern validation
        if (isValid && pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(field.value)) {
                isValid = false;
                message = field.getAttribute('pattern-message') || 'Invalid format';
            }
        }

        // Min/max validation
        if (isValid && (min || max)) {
            const value = parseFloat(field.value);
            const minValue = min ? parseFloat(min) : -Infinity;
            const maxValue = max ? parseFloat(max) : Infinity;

            if (value < minValue || value > maxValue) {
                isValid = false;
                message = `Value must be between ${minValue} and ${maxValue}`;
            }
        }

        // Length validation
        if (isValid && (minLength || maxLength)) {
            const length = field.value.length;
            const minLengthValue = minLength ? parseInt(minLength) : 0;
            const maxLengthValue = maxLength ? parseInt(maxLength) : Infinity;

            if (length < minLengthValue || length > maxLengthValue) {
                isValid = false;
                message = `Length must be between ${minLengthValue} and ${maxLengthValue} characters`;
            }
        }

        // Update field state
        this.updateFieldState(field, isValid, message);

        // Update form state
        this.validateForm();
    }

    updateFieldState(field, isValid, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error') || 
            document.createElement('div');

        if (!errorElement.classList.contains('form-error')) {
            errorElement.className = 'form-error';
            formGroup.appendChild(errorElement);
        }

        if (isValid) {
            formGroup.classList.remove('error');
            errorElement.style.display = 'none';
        } else {
            formGroup.classList.add('error');
            errorElement.style.display = 'block';
            errorElement.textContent = message;
        }
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    static init() {
        document.querySelectorAll('form[data-validation]').forEach(form => {
            new FormValidator(form);
        });
    }
}

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', () => {
    FormValidator.init();
});
