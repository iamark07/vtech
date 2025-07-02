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
