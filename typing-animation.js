// Typing Animation for Hero Headline
class TypingAnimation {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = options.typingSpeed || 100;
    this.deletingSpeed = options.deletingSpeed || 50;
    this.pauseEnd = options.pauseEnd || 2000;
    this.pauseStart = options.pauseStart || 500;
    
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      // Remove character
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      // Add character
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    // Determine typing speed
    let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
    
    // Check if word is complete
    if (!this.isDeleting && this.charIndex === currentText.length) {
      // Pause at end of word
      typeSpeed = this.pauseEnd;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      // Move to next word
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = this.pauseStart;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement) {
    const texts = [
      'Software Developer',
      'UI/UX Designer',
      'Automation Specialist',
      'AI Engineer'
    ];
    
    new TypingAnimation(typingElement, texts, {
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseEnd: 2000,
      pauseStart: 500
    });
  }
});
