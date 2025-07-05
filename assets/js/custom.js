// Mobile menu open/close logic
const menuBtn = document.getElementById('mobile-menu-button');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.querySelector('.mobile-menu-overlay');
const menuBar = document.querySelector('.mobile-menu-bar');

function openMenu() {
  menuOverlay.classList.add('active');
  menuBar.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  menuOverlay.classList.remove('active');
  menuBar.classList.remove('active');
  document.body.style.overflow = '';
}
if (menuBtn && menuClose && menuOverlay && menuBar) {
  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
}

// Fixed WhatsApp & Call Button: Move up when at page bottom
(function() {
  var btns = document.getElementById('fixed-contact-btns');
  function adjustFixedBtnPosition() {
    if (!btns) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    // If user is at (or very near) the bottom
    if (scrollY + windowHeight >= docHeight - 2) {
      btns.style.bottom = '65px';
    } else {
      btns.style.bottom = '24px';
    }
  }
  window.addEventListener('scroll', adjustFixedBtnPosition);
  window.addEventListener('resize', adjustFixedBtnPosition);
  // Initial call
  adjustFixedBtnPosition();
})();

// Sticky header and bottom form on scroll
window.addEventListener('scroll', function() {
  var header = document.querySelector('.main-header');
  var bottomForm = document.querySelector('.bottom-inquery-form');
  var mobile_bottom_bar = document.querySelector('.mobile-bottom-bar');
  if (window.scrollY >= 44) {
    if(header) header.classList.add('fixed-header');
    if(bottomForm) bottomForm.classList.add('show-bottom-form');

  } else {
    if(header) header.classList.remove('fixed-header');
    if(bottomForm) bottomForm.classList.remove('show-bottom-form');
  }

  if (window.scrollY >= 170) {
    if(mobile_bottom_bar) mobile_bottom_bar.classList.add('show-mobile-bottom-bar');
  }
  else{
    if(mobile_bottom_bar) mobile_bottom_bar.classList.remove('show-mobile-bottom-bar');
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
