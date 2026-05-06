// Page Loading Animation
class PageLoader {
  constructor() {
    this.loader = null;
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.createLoader();
        this.setupListeners();
      });
    } else {
      this.createLoader();
      this.setupListeners();
    }
  }
  
  setupListeners() {
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      this.hideLoader();
    });
    
    // Fallback: Hide after 5 seconds even if not fully loaded
    setTimeout(() => {
      if (this.loader && this.loader.classList.contains('page-loader--active')) {
        this.hideLoader();
      }
    }, 5000);
  }
  
  createLoader() {
    this.loader = document.createElement('div');
    this.loader.className = 'page-loader page-loader--active';
    this.loader.innerHTML = `
      <div class="page-loader__content">
        <div class="page-loader__spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <div class="page-loader__text">
          <span class="loader-letter">J</span>
          <span class="loader-letter">O</span>
          <span class="loader-letter">H</span>
          <span class="loader-letter">E</span>
          <span class="loader-letter">N</span>
          <span class="loader-letter">W</span>
          <span class="loader-letter">O</span>
          <span class="loader-letter">R</span>
          <span class="loader-letter">K</span>
          <span class="loader-letter">S</span>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.loader);
  }
  
  hideLoader() {
    if (!this.loader) return;
    
    // Fade out loader
    this.loader.classList.add('page-loader--hidden');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.loader && this.loader.parentNode) {
        this.loader.remove();
      }
    }, 600);
  }
}

// Initialize page loader immediately
new PageLoader();
