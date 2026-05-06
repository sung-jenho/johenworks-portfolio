// Animated Skills Progress Bars
class SkillsAnimation {
  constructor() {
    this.skillItems = document.querySelectorAll('.skills__item');
    this.animated = false;
    
    // IMMEDIATELY set all bars to 0% on page load
    this.resetBars();
    
    this.init();
  }
  
  resetBars() {
    console.log('🔄 Resetting all progress bars to 0%');
    this.skillItems.forEach((item) => {
      const progressBar = item.querySelector('.skills__progress');
      if (progressBar) {
        progressBar.style.transform = 'scaleX(0) translateZ(0)';
      }
    });
  }
  
  init() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.6, // Trigger when 60% of section is visible
        rootMargin: '-150px 0px -150px 0px' // Only trigger when section is well within viewport
      }
    );
    
    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
      console.log('👀 Observing skills section');
      this.observer.observe(skillsSection);
    }
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animated) {
        console.log('🎨 Skills animation triggered!');
        this.animateSkills();
        this.animated = true;
      }
    });
  }
  
  animateSkills() {
    console.log('⏰ Starting animation in 1.5 seconds...');
    
    // Prevent any scroll/layout shifts during animation
    const skillsSection = document.querySelector('.skills');
    const body = document.body;
    
    // Lock scroll position
    body.style.overflow = 'hidden';
    
    // Set ALL bars to 0% initially
    this.skillItems.forEach((item) => {
      const progressBar = item.querySelector('.skills__progress');
      progressBar.style.transform = 'scaleX(0) translateZ(0)';
    });
    
    // 1.5 second delay so user can see the 0% state clearly
    setTimeout(() => {
      console.log('🚀 ALL BARS ANIMATING NOW FROM 0%!');
      
      // Animate ALL bars at the SAME TIME
      this.skillItems.forEach((item) => {
        const progressBar = item.querySelector('.skills__progress');
        const progress = progressBar.getAttribute('data-progress');
        
        console.log(`📊 ${item.querySelector('.skills__title').textContent}: 0% → ${progress}%`);
        
        // Add animate class
        item.classList.add('animate');
        
        // Force browser to apply the scaleX(0) before animating
        void progressBar.offsetHeight;
        
        // Start animation to target - ALL AT ONCE
        requestAnimationFrame(() => {
          const scaleValue = progress / 100;
          progressBar.style.transform = `scaleX(${scaleValue}) translateZ(0)`;
        });
        
      });
      
      // Re-enable scroll after animation completes
      setTimeout(() => {
        body.style.overflow = '';
        console.log('✅ Animation complete - scroll re-enabled');
      }, 4000);
    }, 1500);
  }
  
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SkillsAnimation();
});
