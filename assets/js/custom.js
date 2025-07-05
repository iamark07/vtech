// Mobile menu open/close logic
const menuBtn = document.getElementById("mobile-menu-button");
const menuClose = document.getElementById("mobile-menu-close");
const menuOverlay = document.querySelector(".mobile-menu-overlay");
const menuBar = document.querySelector(".mobile-menu-bar");

function openMenu() {
  menuOverlay.classList.add("active");
  menuBar.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  menuOverlay.classList.remove("active");
  menuBar.classList.remove("active");
  document.body.style.overflow = "";
}
if (menuBtn && menuClose && menuOverlay && menuBar) {
  menuBtn.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
}

// Fixed WhatsApp & Call Button: Move up when at page bottom
(function () {
  var btns = document.getElementById("fixed-contact-btns");
  function adjustFixedBtnPosition() {
    if (!btns) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    // If user is at (or very near) the bottom
    if (scrollY + windowHeight >= docHeight - 2) {
      btns.style.bottom = "65px";
    } else {
      btns.style.bottom = "24px";
    }
  }
  window.addEventListener("scroll", adjustFixedBtnPosition);
  window.addEventListener("resize", adjustFixedBtnPosition);
  // Initial call
  adjustFixedBtnPosition();
})();

// Sticky header and bottom form on scroll
window.addEventListener("scroll", function () {
  var header = document.querySelector(".main-header");
  var bottomForm = document.querySelector(".bottom-inquery-form");
  var mobile_bottom_bar = document.querySelector(".mobile-bottom-bar");
  if (window.scrollY >= 44) {
    if (header) header.classList.add("fixed-header");
    if (bottomForm) bottomForm.classList.add("show-bottom-form");
  } else {
    if (header) header.classList.remove("fixed-header");
    if (bottomForm) bottomForm.classList.remove("show-bottom-form");
  }

  if (window.scrollY >= 170) {
    if (mobile_bottom_bar)
      mobile_bottom_bar.classList.add("show-mobile-bottom-bar");
  } else {
    if (mobile_bottom_bar)
      mobile_bottom_bar.classList.remove("show-mobile-bottom-bar");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const icons = document.querySelectorAll('.mobile-bottom-bar .bottom-bar-icon');
  let current = 0;
  function shakeNextIcon() {
    icons.forEach(icon => icon.classList.remove('ring-shake'));
    icons[current].classList.add('ring-shake');
    setTimeout(() => {
      icons[current].classList.remove('ring-shake');
      current = (current + 1) % icons.length;
      setTimeout(shakeNextIcon, 500); // 1s gap between icons
    }, 700); // shake duration
  }
  if (icons.length) shakeNextIcon();

  // Mobile consultation popup logic
  var mailIcon = document.querySelector('.mobile-bottom-bar .email');
  var modal = document.getElementById('mobile-consultation-modal');
  var closeBtn = document.getElementById('close-mobile-consultation');

  function isMobileWidth() {
    return window.innerWidth <= 1024;
  }

  if (mailIcon && modal && closeBtn) {
    mailIcon.addEventListener('click', function(e) {
      if (isMobileWidth()) {
        e.preventDefault();
        modal.classList.remove('hidden');
      }
    });
    closeBtn.addEventListener('click', function() {
      modal.classList.add('hidden');
    });
    // Optional: close modal on clicking outside the form
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Helper to assign unique IDs if missing
  function ensureInputId(input, prefix) {
    if (!input.id) {
      input.id = prefix + Math.random().toString(36).substr(2, 8);
    }
    return input.id;
  }

  // Validation config for both forms
  function getFormConfig(form) {
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    const select = form.querySelector('select');
    return {
      name: {
        input: name,
        error: name ? name.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return 'Name is required';
          if (value.length < 3) return 'Name must be at least 3 characters';
          if (value.length > 60) return 'Name cannot exceed 60 characters';
          if (/\d/.test(value)) return 'Name cannot contain numbers';
          return '';
        }
      },
      email: {
        input: email,
        error: email ? email.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return 'Email is required';
          if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email';
          return '';
        }
      },
      phone: {
        input: phone,
        error: phone ? phone.nextElementSibling : null,
        validate: (value) => {
          if (!value.trim()) return 'Phone is required';
          if (!/^[6-9][0-9]{9}$/.test(value)) return 'Enter a valid 10-digit phone (starts with 6-9)';
          return '';
        }
      },
      select: {
        input: select,
        error: select ? select.nextElementSibling : null,
        validate: (value) => {
          if (!value) return 'Please select a course';
          return '';
        }
      }
    };
  }

  // Restrict input for name and phone fields
  function restrictNameInput(input) {
    input.addEventListener('keydown', function(e) {
      if (
        e.key.length === 1 &&
        !/[a-zA-Z\s]/.test(e.key) &&
        !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
      ) {
        e.preventDefault();
      }
    });
    input.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });
  }
  function restrictPhoneInput(input) {
    input.addEventListener('keydown', function(e) {
      if (
        e.key.length === 1 &&
        !/[0-9]/.test(e.key) &&
        !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
      ) {
        e.preventDefault();
      }
      if (
        this.value.length >= 10 &&
        !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
      ) {
        e.preventDefault();
      }
    });
    input.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
  }

  // Validate a single input and update its UI
  function validateInput(configKey, configMap) {
    const {input, error, validate} = configMap[configKey];
    if (!input || !error) return false;
    const value = input.value;
    const errorMessage = validate(value);
    if (errorMessage) {
      error.textContent = errorMessage;
      error.style.display = 'block';
      // input.classList.add('border-red-500');
      // input.classList.remove('border-gray-200');
      return false;
    } else {
      error.textContent = '';
      error.style.display = 'none';
      // input.classList.remove('border-red-500');
      // input.classList.add('border-gray-200');
      return true;
    }
  }

  // Validate all inputs and return overall form validity
  function validateForm(configMap) {
    let isValid = true;
    Object.keys(configMap).forEach(key => {
      if (!validateInput(key, configMap)) {
        isValid = false;
      }
    });
    return isValid;
  }

  // Set up real-time validation event listeners
  function setupRealtimeValidation(configMap) {
    Object.entries(configMap).forEach(([key, {input}]) => {
      if (!input) return;
      if (key === 'phone') {
        restrictPhoneInput(input);
        input.addEventListener('input', () => validateInput(key, configMap));
        input.addEventListener('blur', () => validateInput(key, configMap));
      } else if (key === 'name') {
        restrictNameInput(input);
        input.addEventListener('input', () => validateInput(key, configMap));
        input.addEventListener('blur', () => validateInput(key, configMap));
      } else if (key === 'select') {
        input.addEventListener('change', () => validateInput(key, configMap));
        input.addEventListener('blur', () => validateInput(key, configMap));
      } else {
        input.addEventListener('input', () => validateInput(key, configMap));
        input.addEventListener('blur', () => validateInput(key, configMap));
      }
    });
  }

  function showSuccessModal() {
    const modal = document.getElementById('form-success-modal');
    modal.classList.remove('hidden');
    document.getElementById('close-success-modal').onclick = () => modal.classList.add('hidden');
    setTimeout(() => { modal.classList.add('hidden'); }, 4000);
  }

  // Attach validation to all forms handled in this file
  function attachValidationToForm(formSelector, onSuccess) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    const config = getFormConfig(form);
    setupRealtimeValidation(config);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(config)) {
        showSuccessModal();
        form.reset();
        // Remove all error states after reset
        Object.keys(config).forEach(key => {
          if (config[key].error) config[key].error.textContent = '';
          if (config[key].input) {
            // config[key].input.classList.remove('border-red-500');
            // config[key].input.classList.add('border-gray-200');
          }
        });
        if (typeof onSuccess === 'function') onSuccess();
      } else {
        // Focus first invalid field
        const firstInvalid = Object.keys(config).find(key => !validateInput(key, config));
        if (firstInvalid && config[firstInvalid].input) {
          config[firstInvalid].input.focus();
          config[firstInvalid].input.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      }
    });
  }

  // Mobile Consultation Popup Modal
  attachValidationToForm('#mobile-consultation-modal form', function onSuccess() {
    var modal = document.getElementById('mobile-consultation-modal');
    if (modal) modal.classList.add('hidden');
  });
  // Fixed Bottom Consultation Form
  attachValidationToForm('.bottom-inquery-form form');
});
