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

    // Set initial history state
    history.replaceState({ section: 0 }, '', `#section-0`);

    // Mouse wheel event
    window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

    // Touch events for mobile swipe
    window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    // Prevent overscroll/pull-to-refresh
    window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Browser back/forward navigation
    window.addEventListener('popstate', (e) => this.handlePopState(e));

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

  handleTouchMove(e) {
    // Prevent all overscroll/pull-to-refresh gestures
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - this.touchStartY;

    // Prevent pull-down (pull-to-refresh) gesture
    if (deltaY > 0) {
      e.preventDefault();
    }
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

  handlePopState(e) {
    // Handle browser back/forward navigation
    const state = e.state;
    if (state && typeof state.section === 'number') {
      this.goToSection(state.section, false);
    }
  }
  
  goToSection(index, pushState = true) {
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

    // Push to history for back/forward navigation
    if (pushState) {
      history.pushState({ section: index }, '', `#section-${index}`);
    }

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

    const sectionNames = ['Home', 'Tech Stack', 'Projects', 'About Me', 'Experience', 'Contact'];

    this.sections.forEach((section, index) => {
      const dotWrapper = document.createElement('div');
      dotWrapper.className = 'fullpage-nav__item';

      const dot = document.createElement('button');
      dot.className = 'fullpage-nav__dot';
      dot.setAttribute('aria-label', `Go to ${sectionNames[index] || `section ${index + 1}`}`);

      const label = document.createElement('span');
      label.className = 'fullpage-nav__label';
      label.textContent = sectionNames[index] || `Section ${index + 1}`;

      if (index === 0) {
        dot.classList.add('active');
        dotWrapper.classList.add('active');
      }

      dot.addEventListener('click', () => this.goToSection(index));
      label.addEventListener('click', () => this.goToSection(index));
      label.style.cursor = 'pointer';
      dotWrapper.appendChild(label);
      dotWrapper.appendChild(dot);
      nav.appendChild(dotWrapper);
    });

    document.body.appendChild(nav);
  }
  
  updateNavigationDots(activeIndex) {
    const items = document.querySelectorAll('.fullpage-nav__item');
    items.forEach((item, index) => {
      const dot = item.querySelector('.fullpage-nav__dot');
      if (index === activeIndex) {
        item.classList.add('active');
        dot.classList.add('active');
      } else {
        item.classList.remove('active');
        dot.classList.remove('active');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.fullPageNav = new FullPageNavigation();
});
