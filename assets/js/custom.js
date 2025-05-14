// when screen scoll then add bg on header

window.addEventListener('scroll', function () {
    const header = document.getElementById('site-header');
    if (window.scrollY > 50) {
        header.classList.add('bg-white', 'shadow-md', '!py-3');
    } else {
        header.classList.remove('bg-white', 'shadow-md', '!py-3');
    }
});

// responsive menu bar

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const close_menu = document.querySelectorAll(".close-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("!left-0");
});

close_menu.forEach(close_menu_btn => {
    close_menu_btn.addEventListener("click", () => {
        mobileMenu.classList.toggle("!left-0");
    })
});


function toggleDropdown(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
  }
  

