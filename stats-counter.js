// Animated Stats Counter
class StatsCounter {
  constructor() {
    this.statsSection = document.querySelector('.stats');
    this.statsNumbers = document.querySelectorAll('.stats__number');
    this.animated = false;
    
    this.init();
  }
  
  init() {
    if (!this.statsSection || this.statsNumbers.length === 0) return;
    
    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );
    
    // Observe stats section
    this.observer.observe(this.statsSection);
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animated) {
        this.animateCounters();
        this.animated = true;
      }
    });
  }
  
  animateCounters() {
    this.statsNumbers.forEach((stat, index) => {
      const target = parseInt(stat.getAttribute('data-target'));
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const delay = index * 150; // Stagger animation
      
      setTimeout(() => {
        this.countUp(stat, target, suffix, duration);
      }, delay);
    });
  }
  
  countUp(element, target, suffix, duration) {
    const startTime = performance.now();
    const startValue = 0;
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(startValue + (target - startValue) * easeOutCubic);
      element.textContent = currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Animation complete - add pulse effect
        element.classList.add('stats__number--complete');
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StatsCounter();
});
