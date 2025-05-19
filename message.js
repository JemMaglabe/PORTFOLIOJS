// Form validation and interactive features
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('input, textarea');
    const submitButton = document.querySelector('button[type="submit"]');
    const resetButton = document.querySelector('button[type="reset"]');

    // Add floating label effect
    inputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                wrapper.classList.remove('focused');
            }
        });

        // Add validation status icons
        const icon = document.createElement('span');
        icon.className = 'validation-icon';
        wrapper.appendChild(icon);
    });

    // Real-time validation
    const validateInput = (input) => {
        const wrapper = input.closest('.input-wrapper');
        
        if (input.type === 'text' && input.placeholder.includes('Name')) {
            const isValid = /^[a-zA-Z\s]{2,}$/.test(input.value);
            wrapper.classList.toggle('valid', isValid);
            wrapper.classList.toggle('invalid', !isValid && input.value !== '');
        }
        
        else if (input.type === 'text' && input.placeholder.includes('Email')) {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            wrapper.classList.toggle('valid', isValid);
            wrapper.classList.toggle('invalid', !isValid && input.value !== '');
        }
        
        else if (input.type === 'number') {
            const isValid = /^\d{10,}$/.test(input.value);
            wrapper.classList.toggle('valid', isValid);
            wrapper.classList.toggle('invalid', !isValid && input.value !== '');
        }
        
        else if (input.type === 'date') {
            const date = new Date(input.value);
            const isValid = date instanceof Date && !isNaN(date);
            wrapper.classList.toggle('valid', isValid);
            wrapper.classList.toggle('invalid', !isValid && input.value !== '');
        }
        
        else if (input.tagName.toLowerCase() === 'textarea') {
            const isValid = input.value.length >= 10;
            wrapper.classList.toggle('valid', isValid);
            wrapper.classList.toggle('invalid', !isValid && input.value !== '');
        }
    };

    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (input.closest('.input-wrapper').classList.contains('invalid')) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loader"></span> Sending...';

        try {
            // Simulate sending (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Message sent successfully!', 'success');
            form.reset();
            inputs.forEach(input => {
                input.closest('.input-wrapper').classList.remove('focused', 'valid');
            });
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });

    // Reset button animation
    resetButton.addEventListener('click', () => {
        inputs.forEach(input => {
            input.closest('.input-wrapper').classList.remove('focused', 'valid', 'invalid');
        });
        showNotification('Form reset!', 'info');
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add parallax effect to background
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
}); 