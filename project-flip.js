document.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('[data-flip]');

  flipCards.forEach(card => {
    // Click to flip
    card.addEventListener('click', (e) => {
      // Don't flip if clicking a link
      if (e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      const threshold = 50;

      // Swipe left or right flips the card
      if (Math.abs(diff) > threshold) {
        card.classList.toggle('flipped');
      }
    }, { passive: true });
  });
});
