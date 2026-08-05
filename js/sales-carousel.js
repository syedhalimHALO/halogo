document.addEventListener('DOMContentLoaded', () => {
  const salesStories = document.querySelectorAll('[data-sales-story]');
  if (!salesStories.length) return;

  salesStories.forEach((story) => {
    const track = story.querySelector('[data-sales-track]');
    const slides = Array.from(story.querySelectorAll('.biz-sales-slide'));
    const dots = Array.from(story.querySelectorAll('[data-sales-dot]'));
    const prev = story.querySelector('[data-sales-prev]');
    const next = story.querySelector('[data-sales-next]');
    const current = story.querySelector('[data-sales-current]');
    const total = story.querySelector('[data-sales-total]');
    const progress = story.querySelector('[data-sales-progress]');
    const intervalDelay = Number(story.dataset.autoplay || 5000);
    let active = 0;
    let autoplay = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const render = () => {
      track.style.transform = `translateX(-${active * 100}%)`;
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === active));
      dots.forEach((dot, index) => {
        const isActive = index === active;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
      if (current) current.textContent = String(active + 1).padStart(2, '0');
      if (total) total.textContent = String(slides.length).padStart(2, '0');
      if (progress) progress.style.width = `${((active + 1) / slides.length) * 100}%`;
    };

    const goTo = (index) => {
      active = (index + slides.length) % slides.length;
      render();
    };

    const startAutoplay = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || slides.length < 2) return;
      stopAutoplay();
      autoplay = window.setInterval(() => goTo(active + 1), intervalDelay);
    };

    const stopAutoplay = () => {
      if (autoplay) {
        window.clearInterval(autoplay);
        autoplay = null;
      }
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goTo(index);
        startAutoplay();
      });
    });

    prev?.addEventListener('click', () => {
      goTo(active - 1);
      startAutoplay();
    });

    next?.addEventListener('click', () => {
      goTo(active + 1);
      startAutoplay();
    });

    story.addEventListener('mouseenter', stopAutoplay);
    story.addEventListener('mouseleave', startAutoplay);
    story.addEventListener('focusin', stopAutoplay);
    story.addEventListener('focusout', startAutoplay);

    story.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    story.addEventListener('touchend', (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) goTo(active + 1);
        else goTo(active - 1);
        startAutoplay();
      }
    }, { passive: true });

    render();
    startAutoplay();
  });
});
