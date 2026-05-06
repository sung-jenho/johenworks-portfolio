// Custom Cursor with Trailing Particles
class CursorTrail {
  constructor() {
    this.cursor = null;
    this.cursorDot = null;
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.particleCount = 15;
    this.isHovering = false;
    
    this.init();
  }
  
  init() {
    // Create custom cursor elements
    this.createCursor();
    
    // Create particle trail
    this.createParticles();
    
    // Add event listeners
    this.addEventListeners();
    
    // Start animation loop
    this.animate();
  }
  
  createCursor() {
    // Main cursor circle
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    // Cursor dot (center)
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(this.cursorDot);
  }
  
  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      document.body.appendChild(particle);
      
      this.particles.push({
        element: particle,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        speed: 0.1 + (i * 0.01)
      });
    }
  }
  
  addEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Detect hoverable elements
    const hoverElements = document.querySelectorAll('a, button, .projects__item, input, textarea');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.isHovering = true;
        this.cursor.classList.add('cursor-hover');
        this.cursorDot.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.cursor.classList.remove('cursor-hover');
        this.cursorDot.classList.remove('cursor-hover');
      });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.style.cursor = 'none';
    });
  }
  
  animate() {
    // Smooth cursor movement with easing
    this.cursorX += (this.mouseX - this.cursorX) * 0.15;
    this.cursorY += (this.mouseY - this.cursorY) * 0.15;
    
    // Update main cursor position
    this.cursor.style.left = `${this.cursorX}px`;
    this.cursor.style.top = `${this.cursorY}px`;
    
    // Update cursor dot position (faster)
    this.cursorDot.style.left = `${this.mouseX}px`;
    this.cursorDot.style.top = `${this.mouseY}px`;
    
    // Update particles with trailing effect
    this.particles.forEach((particle, index) => {
      if (index === 0) {
        particle.targetX = this.cursorX;
        particle.targetY = this.cursorY;
      } else {
        particle.targetX = this.particles[index - 1].x;
        particle.targetY = this.particles[index - 1].y;
      }
      
      // Smooth particle movement
      particle.x += (particle.targetX - particle.x) * particle.speed;
      particle.y += (particle.targetY - particle.y) * particle.speed;
      
      // Update particle position
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
      
      // Fade out particles based on distance from cursor
      const distance = Math.sqrt(
        Math.pow(particle.x - this.cursorX, 2) + 
        Math.pow(particle.y - this.cursorY, 2)
      );
      const opacity = Math.max(0, 1 - (distance / 100));
      particle.element.style.opacity = opacity * 0.6;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize cursor trail when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only enable on desktop (not touch devices)
  if (!('ontouchstart' in window)) {
    new CursorTrail();
  }
});
