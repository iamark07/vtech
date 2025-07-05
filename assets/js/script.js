// Header shadow on scroll > 100px
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});

// Hero Image & Text Slider
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const textSlides = document.querySelectorAll(".hero-text-slide");
  let current = 0;
  let timer = null;
  const interval = 4000;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });
    if (textSlides.length) {
      textSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === idx);
      });
    }
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
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
    // No navigation, no dots, no text overlay
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
          {
            selector: ".about-counter-students",
            target: 10000,
            duration: 3500,
          },
          { selector: ".about-counter-placement", target: 100, duration: 2500 },
          { selector: ".about-counter-years", target: 15, duration: 2500 },
          {
            selector: ".about-counter-rating",
            target: 4.9,
            duration: 2500,
            decimal: true,
          },
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
                  el.textContent = (progress * (end - start) + start).toFixed(
                    1
                  );
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
  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 16,
    nav: true,
    dots: true,
    autoplay: true,
    navText: [
      '<i class="ri-arrow-left-s-line"></i>',
      '<i class="ri-arrow-right-s-line"></i>',
    ],
    responsive: {
      0: { items: 1 },
      700: { items: 2 },
      1024: { items: 3 },
    },
  });
});

// Highlights Owl Carousel
$(document).ready(function () {
  var $carousel = $(".highlights-carousel").owlCarousel({
    loop: true,
    margin: 8,
    responsiveClass: true,
    autoplay: false,
    autoplayTimeout: 3500,
    smartSpeed: 600,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1280: { items: 3 },
      1400: { items: 4 },
    },
  });
  // Custom nav
  $(".highlights-nav-prev").click(function () {
    $carousel.trigger("prev.owl.carousel");
  });
  $(".highlights-nav-next").click(function () {
    $carousel.trigger("next.owl.carousel");
  });
});

document.querySelectorAll(".batch-cat-pill").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Nav active state
    document
      .querySelectorAll(".batch-cat-pill")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    // Category logic
    const cat = this.getAttribute("data-category");
    document.querySelectorAll(".batch-card-premium").forEach((card) => {
      if (cat === "all") {
        card.classList.remove("batch-card-hide");
      } else if (card.classList.contains("batch-cat-" + cat)) {
        card.classList.remove("batch-card-hide");
      } else {
        card.classList.add("batch-card-hide");
      }
    });
  });
});


// start your journey section form validation
document.addEventListener("DOMContentLoaded", function () {
  // Helper to assign unique IDs if missing
  function ensureInputId(input, prefix) {
    if (!input.id) {
      input.id = prefix + Math.random().toString(36).substr(2, 8);
    }
    return input.id;
  }

  // Validation config for the form
  function getFormConfig(form) {
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    const select = form.querySelector("select");
    return {
      name: {
        input: name,
        error: name ? name.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return "Name is required";
          if (value.length < 3) return "Name must be at least 3 characters";
          if (value.length > 60) return "Name cannot exceed 60 characters";
          if (/\d/.test(value)) return "Name cannot contain numbers";
          return "";
        },
      },
      email: {
        input: email,
        error: email ? email.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return "Email is required";
          if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
          return "";
        },
      },
      phone: {
        input: phone,
        error: phone ? phone.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return "Phone is required";
          if (!/^[6-9][0-9]{9}$/.test(value))
            return "Enter a valid 10-digit phone (starts with 6-9)";
          return "";
        },
      },
      select: {
        input: select,
        error: select ? select.nextElementSibling : null,
        validate: (value) => {
          if (!value) return "Please select a course";
          return "";
        },
      },
    };
  }

  // Restrict input for name and phone fields
  function restrictNameInput(input) {
    input.addEventListener("keydown", function (e) {
      if (
        e.key.length === 1 &&
        !/[a-zA-Z\s]/.test(e.key) &&
        !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }
    });
    input.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });
  }
  function restrictPhoneInput(input) {
    input.addEventListener("keydown", function (e) {
      if (
        e.key.length === 1 &&
        !/[0-9]/.test(e.key) &&
        !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }
      if (
        this.value.length >= 10 &&
        !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }
    });
    input.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  }

  // Validate a single input and update its UI
  function validateInput(configKey, configMap) {
    const { input, error, validate } = configMap[configKey];
    if (!input || !error) return false;
    const value = input.value;
    const errorMessage = validate(value);
    if (errorMessage) {
      error.textContent = errorMessage;
      error.style.display = "block";
      // input.classList.add('border-red-500');
      // input.classList.remove('border-gray-200');
      return false;
    } else {
      error.textContent = "";
      error.style.display = "none";
      // input.classList.remove('border-red-500');
      // input.classList.add('border-gray-200');
      return true;
    }
  }

  // Validate all inputs and return overall form validity
  function validateForm(configMap) {
    let isValid = true;
    Object.keys(configMap).forEach((key) => {
      if (!validateInput(key, configMap)) {
        isValid = false;
      }
    });
    return isValid;
  }

  // Set up real-time validation event listeners
  function setupRealtimeValidation(configMap) {
    Object.entries(configMap).forEach(([key, { input }]) => {
      if (!input) return;
      if (key === "phone") {
        restrictPhoneInput(input);
        input.addEventListener("input", () => validateInput(key, configMap));
        input.addEventListener("blur", () => validateInput(key, configMap));
      } else if (key === "name") {
        restrictNameInput(input);
        input.addEventListener("input", () => validateInput(key, configMap));
        input.addEventListener("blur", () => validateInput(key, configMap));
      } else if (key === "select") {
        input.addEventListener("change", () => validateInput(key, configMap));
        input.addEventListener("blur", () => validateInput(key, configMap));
      } else {
        input.addEventListener("input", () => validateInput(key, configMap));
        input.addEventListener("blur", () => validateInput(key, configMap));
      }
    });
  }

  function showSuccessModal() {
    const modal = document.getElementById("form-success-modal");
    modal.classList.remove("hidden");
    document.getElementById("close-success-modal").onclick = () =>
      modal.classList.add("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 4000);
  }

  // Attach validation to Start Your Journey form
  function attachValidationToForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    const config = getFormConfig(form);
    setupRealtimeValidation(config);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(config)) {
        showSuccessModal();
        form.reset();
        // Remove all error states after reset
        Object.keys(config).forEach((key) => {
          if (config[key].error) config[key].error.textContent = "";
          if (config[key].input) {
            // config[key].input.classList.remove('border-red-500');
            // config[key].input.classList.add('border-gray-200');
          }
        });
      } else {
        // Focus first invalid field
        const firstInvalid = Object.keys(config).find(
          (key) => !validateInput(key, config)
        );
        if (firstInvalid && config[firstInvalid].input) {
          config[firstInvalid].input.focus();
          config[firstInvalid].input.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    });
  }

  // Start Your Journey form
  attachValidationToForm(".start-your-journey-section form");
});
