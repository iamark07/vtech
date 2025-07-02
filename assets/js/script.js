// Header shadow on scroll > 100px
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});

// Hero Image Slider
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const nextBtn = document.querySelector(".hero-slider-next");
  const prevBtn = document.querySelector(".hero-slider-prev");
  const dots = document.querySelectorAll(".hero-slider-dot");
  let current = 0;
  let timer = null;
  const interval = 4000;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
      if (dots[i]) dots[i].classList.toggle("active", i === idx);
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
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        nextSlide();
        stopAuto();
        startAuto();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prevSlide();
        stopAuto();
        startAuto();
      });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goToSlide(i);
        stopAuto();
        startAuto();
      });
    });
    document
      .querySelector(".hero-slider")
      .addEventListener("mouseenter", stopAuto);
    document
      .querySelector(".hero-slider")
      .addEventListener("mouseleave", startAuto);
  }
})();

// ======= About Section Counter Animation =======
(function () {
  // Helper to animate a number
  function animateCounter(el, target, duration) {
    let start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    window.requestAnimationFrame(step);
  }

  // Set up observer
  const aboutSection = document.getElementById("about-vtech");
  if (!aboutSection) return;

  let hasAnimated = false;
  const observer = new window.IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        // Find all highlight numbers
        const counters = [
          { selector: ".about-counter-students", target: 10000, duration: 3500 },
          { selector: ".about-counter-placement", target: 100, duration: 2500 },
          { selector: ".about-counter-years", target: 15, duration: 2500 },
          { selector: ".about-counter-rating", target: 4.9, duration: 2500, decimal: true },
        ];
        counters.forEach((item, idx) => {
          const el = aboutSection.querySelector(item.selector);
          if (el) {
            setTimeout(() => {
              if (item.decimal) {
                // Animate decimal rating
                let start = 0,
                  end = item.target,
                  duration = item.duration;
                let startTimestamp = null;
                function stepDecimal(ts) {
                  if (!startTimestamp) startTimestamp = ts;
                  const progress = Math.min(
                    (ts - startTimestamp) / duration,
                    1
                  );
                  el.textContent = (progress * (end - start) + start).toFixed(1);
                  if (progress < 1) {
                    window.requestAnimationFrame(stepDecimal);
                  } else {
                    el.textContent = end.toFixed(1);
                  }
                }
                window.requestAnimationFrame(stepDecimal);
              } else {
                animateCounter(el, item.target, item.duration);
              }
            }, idx * 400);
          }
        });
      }
    },
    { threshold: 0.6 }
  );
  observer.observe(aboutSection);
})();

// ======= Testimonials Owl Carousel =======
$(document).ready(function () {
  $('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 16,
    nav: true,
    dots: true,
    autoplay: true,
    navText: [
      '<i class="ri-arrow-left-s-line"></i>',
      '<i class="ri-arrow-right-s-line"></i>'
    ],
    responsive: {
      0: { items: 1 },
      700: { items: 2 },
      1024: { items: 3 }
    }
  });
});
