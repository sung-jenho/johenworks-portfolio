// Full-page scroll navigation with swipe support
class FullPageNavigation {
  constructor() {
    this.sections = document.querySelectorAll('.fullpage-section');
    this.currentSection = 0;
    this.isAnimating = false;
    this.touchStartY = 0;
    this.touchEndY = 0;
    
    this.init();
  }
  
  init() {
    // Set initial section as active
    this.sections[0].classList.add('active');
    
    // Mouse wheel event
    window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    
    // Touch events for mobile swipe
    window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Navigation dots click
    this.createNavigationDots();
    
    // Prevent default scroll
    document.body.style.overflow = 'hidden';
  }
  
  handleWheel(e) {
    e.preventDefault();
    
    if (this.isAnimating) return;
    
    if (e.deltaY > 0) {
      // Scroll down
      this.goToSection(this.currentSection + 1);
    } else {
      // Scroll up
      this.goToSection(this.currentSection - 1);
    }
  }
  
  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
  }
  
  handleTouchEnd(e) {
    this.touchEndY = e.changedTouches[0].clientY;
    this.handleSwipe();
  }
  
  handleSwipe() {
    if (this.isAnimating) return;
    
    const swipeDistance = this.touchStartY - this.touchEndY;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe up - go to next section
        this.goToSection(this.currentSection + 1);
      } else {
        // Swipe down - go to previous section
        this.goToSection(this.currentSection - 1);
      }
    }
  }
  
  handleKeyboard(e) {
    if (this.isAnimating) return;
    
    switch(e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        this.goToSection(this.currentSection + 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        this.goToSection(this.currentSection - 1);
        break;
      case 'Home':
        e.preventDefault();
        this.goToSection(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSection(this.sections.length - 1);
        break;
    }
  }
  
  goToSection(index) {
    // Validate index
    if (index < 0 || index >= this.sections.length || index === this.currentSection) {
      return;
    }
    
    this.isAnimating = true;
    
    // Remove active class from all sections
    this.sections.forEach((section, i) => {
      section.classList.remove('active');
      
      // Add 'previous' class to sections before the target index
      if (i < index) {
        section.classList.add('previous');
      } else {
        section.classList.remove('previous');
      }
    });
    
    // Add active class to new section
    this.sections[index].classList.add('active');
    this.sections[index].classList.remove('previous');
    
    // Update navigation dots
    this.updateNavigationDots(index);
    
    // Update current section
    this.currentSection = index;
    
    // Reset animation lock after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 1200);
  }
  
  createNavigationDots() {
    const nav = document.createElement('nav');
    nav.className = 'fullpage-nav';
    
    this.sections.forEach((section, index) => {
      const dot = document.createElement('button');
      dot.className = 'fullpage-nav__dot';
      dot.setAttribute('aria-label', `Go to section ${index + 1}`);
      
      if (index === 0) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => this.goToSection(index));
      nav.appendChild(dot);
    });
    
    document.body.appendChild(nav);
  }
  
  updateNavigationDots(activeIndex) {
    const dots = document.querySelectorAll('.fullpage-nav__dot');
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.fullPageNav = new FullPageNavigation();
});
