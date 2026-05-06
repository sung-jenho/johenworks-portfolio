// Smooth Scroll to Sections
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle all anchor links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        e.preventDefault();
        
        // Get target section index
        const targetId = href.substring(1);
        const sections = document.querySelectorAll('.fullpage-section');
        
        // Find which section contains the target element
        let targetIndex = -1;
        sections.forEach((section, index) => {
          const targetElement = section.querySelector(`#${targetId}`);
          if (targetElement) {
            targetIndex = index;
          }
        });
        
        // If target found, navigate to that section
        if (targetIndex !== -1 && window.fullPageNav) {
          window.fullPageNav.goToSection(targetIndex);
        }
      });
    });
  }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
});
