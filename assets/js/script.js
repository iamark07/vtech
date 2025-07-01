// Header shadow on scroll > 100px
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
});

// Hero Image Slider
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const nextBtn = document.querySelector('.hero-slider-next');
  const prevBtn = document.querySelector('.hero-slider-prev');
  const dots = document.querySelectorAll('.hero-slider-dot');
  let current = 0;
  let timer = null;
  const interval = 4000;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      if (dots[i]) dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function goToSlide(idx) {
    showSlide(idx);
  }

  function startAuto() {
    timer = setInterval(nextSlide, interval);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  if (slides.length > 0) {
    showSlide(0);
    startAuto();
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAuto(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAuto(); startAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); stopAuto(); startAuto(); });
    });
    document.querySelector('.hero-slider').addEventListener('mouseenter', stopAuto);
    document.querySelector('.hero-slider').addEventListener('mouseleave', startAuto);
  }
})();
