// Contact Form Handler with EmailJS and Validation
class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact__form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.messageInput = document.getElementById('message');
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    
    // EmailJS Configuration
    // IMPORTANT: Replace these with your actual EmailJS credentials
    this.emailJSConfig = {
      serviceID: 'service_86dqfw4',      // Get from EmailJS dashboard
      templateID: 'template_yeqzew9',    // Get from EmailJS dashboard
      publicKey: 'w8GRgd_J3Euwp_IH0'       // Get from EmailJS dashboard
    };
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    // Add real-time validation
    this.addValidationListeners();
    
    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }
  
  addValidationListeners() {
    // Name validation
    this.nameInput?.addEventListener('blur', () => this.validateName());
    this.nameInput?.addEventListener('input', () => this.clearError(this.nameInput));
    
    // Email validation
    this.emailInput?.addEventListener('blur', () => this.validateEmail());
    this.emailInput?.addEventListener('input', () => this.clearError(this.emailInput));
    
    // Message validation
    this.messageInput?.addEventListener('blur', () => this.validateMessage());
    this.messageInput?.addEventListener('input', () => this.clearError(this.messageInput));
  }
  
  validateName() {
    const name = this.nameInput.value.trim();
    
    if (name === '') {
      this.showError(this.nameInput, 'Name is required');
      return false;
    }
    
    if (name.length < 2) {
      this.showError(this.nameInput, 'Name must be at least 2 characters');
      return false;
    }
    
    this.clearError(this.nameInput);
    return true;
  }
  
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
      this.showError(this.emailInput, 'Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.showError(this.emailInput, 'Sorry, invalid format here');
      return false;
    }
    
    this.clearError(this.emailInput);
    return true;
  }
  
  validateMessage() {
    const message = this.messageInput.value.trim();
    
    if (message === '') {
      this.showError(this.messageInput, 'Message is required');
      return false;
    }
    
    if (message.length < 10) {
      this.showError(this.messageInput, 'Message must be at least 10 characters');
      return false;
    }
    
    this.clearError(this.messageInput);
    return true;
  }
  
  showError(input, message) {
    const control = input.parentElement;
    const errorElement = control.querySelector('.error-message') || this.createErrorElement();
    
    control.classList.add('error');
    errorElement.textContent = message;
    
    if (!control.querySelector('.error-message')) {
      control.appendChild(errorElement);
    }
    
    // Show invalid icon
    const invalidIcon = control.querySelector('.contact__invalid-icon');
    if (invalidIcon) {
      invalidIcon.style.display = 'block';
    }
  }
  
  clearError(input) {
    const control = input.parentElement;
    control.classList.remove('error');
    
    const errorElement = control.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    
    // Hide invalid icon
    const invalidIcon = control.querySelector('.contact__invalid-icon');
    if (invalidIcon) {
      invalidIcon.style.display = 'none';
    }
  }
  
  createErrorElement() {
    const error = document.createElement('span');
    error.className = 'error-message';
    return error;
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isMessageValid = this.validateMessage();
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      this.showToast('Please fix the errors before submitting', 'error');
      return;
    }
    
    // Show Lottie animation immediately
    const animationPromise = this.showLottieAnimation();
    
    // Show loading state
    this.setLoadingState(true);
    
    try {
      // Send email using EmailJS
      await this.sendEmail();
      
      // Wait for animation to complete (4 seconds total)
      await animationPromise;
      
      // Show success message
      this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      // Reset form
      this.form.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      // Wait for animation to complete even on error
      await animationPromise;
      this.showToast('Failed to send message. Please try again or email me directly.', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  showLottieAnimation() {
    return new Promise((resolve) => {
      // Create overlay container
      const overlay = document.createElement('div');
      overlay.className = 'lottie-overlay';
      overlay.innerHTML = `
        <div class="lottie-container" id="lottie-animation"></div>
        <p class="lottie-text">Sending your message...</p>
      `;
      document.body.appendChild(overlay);
      
      // Initialize Lottie animation
      if (typeof lottie !== 'undefined') {
        const animation = lottie.loadAnimation({
          container: document.getElementById('lottie-animation'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: './assets/loading.json'
        });
        
        // Remove after 4 seconds
        setTimeout(() => {
          animation.destroy();
          overlay.classList.add('lottie-overlay--hide');
          setTimeout(() => {
            overlay.remove();
            resolve();
          }, 300);
        }, 4000);
      } else {
        console.error('Lottie library not loaded');
        overlay.remove();
        resolve();
      }
    });
  }
  
  async sendEmail() {
    // Check if EmailJS is configured
    if (this.emailJSConfig.serviceID === 'YOUR_SERVICE_ID') {
      // Simulate email sending for demo
      console.log('EmailJS not configured. Form data:', {
        name: this.nameInput.value,
        email: this.emailInput.value,
        message: this.messageInput.value
      });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return;
    }
    
    // Initialize EmailJS (only once)
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.emailJSConfig.publicKey);
      
      // Send email
      const templateParams = {
        from_name: this.nameInput.value,
        from_email: this.emailInput.value,
        message: this.messageInput.value,
        to_name: 'Jenho Nacilla'
      };
      
      await emailjs.send(
        this.emailJSConfig.serviceID,
        this.emailJSConfig.templateID,
        templateParams
      );
    } else {
      throw new Error('EmailJS library not loaded');
    }
  }
  
  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitButton.disabled = true;
      this.submitButton.textContent = 'Sending...';
      this.submitButton.classList.add('loading');
    } else {
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Send Message';
      this.submitButton.classList.remove('loading');
    }
  }
  
  showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <div class="toast__content">
        <span class="toast__icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="toast__message">${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('toast--show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
