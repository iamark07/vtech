// // gallery section sliders feature code

// let currentIndex = 0;
// let imageElements = [];

// // Function to open lightbox with selected image
// function openLightbox(clickedImage) {
//   imageElements = Array.from(document.querySelectorAll("#gallery-grid img"));
//   currentIndex = imageElements.indexOf(clickedImage);

//   const lightbox = document.getElementById("lightbox");
//   const img = document.getElementById("lightbox-image");
//   img.style.opacity = 0;
//   img.onload = () => {
//     img.style.opacity = 1;
//   };
//   img.src = clickedImage.src;
//   lightbox.classList.remove("hidden");
//   lightbox.classList.add("flex");
// }

// // Close lightbox
// function closeLightbox() {
//   document.getElementById("lightbox").classList.add("hidden");
// }

// // Show previous image
// function prevImage() {
//   if (imageElements.length === 0) return;
//   currentIndex =
//     (currentIndex - 1 + imageElements.length) % imageElements.length;
//   updateLightboxImage();
// }

// // Show next image
// function nextImage() {
//   if (imageElements.length === 0) return;
//   currentIndex = (currentIndex + 1) % imageElements.length;
//   updateLightboxImage();
// }

// // Update the image shown in the lightbox
// function updateLightboxImage() {
//   const img = document.getElementById("lightbox-image");
//   img.style.opacity = 0;
//   setTimeout(() => {
//     img.src = imageElements[currentIndex].src;
//   }, 300);
// }

// // Initialize Lucide Icons
// lucide.createIcons();

// // Mobile Menu Toggle
// const mobileMenuButton = document.getElementById('mobile-menu-button');
// const mobileMenu = document.createElement('div');
// mobileMenu.className = 'fixed inset-0 bg-white z-50 transform translate-x-full transition-transform duration-300 ease-in-out';
// mobileMenu.innerHTML = `
//     <div class="container py-8">
//         <div class="flex justify-between items-center mb-8">
//             <a href="/" class="text-2xl font-bold text-[var(--primary-color)]">VTECH</a>
//             <button class="mobile-close">
//                 <i class="ri-close-line text-2xl"></i>
//             </button>
//         </div>
//         <div class="flex flex-col space-y-4">
//             <a href="#home" class="nav-link text-xl">Home</a>
//             <a href="#courses" class="nav-link text-xl">Courses</a>
//             <a href="#about" class="nav-link text-xl">About</a>
//             <a href="#testimonials" class="nav-link text-xl">Testimonials</a>
//             <a href="#contact" class="nav-link text-xl">Contact</a>
//             <button class="btn-primary w-full">Get Started</button>
//         </div>
//     </div>
// `;

// document.body.appendChild(mobileMenu);

// mobileMenuButton.addEventListener('click', () => {
//     mobileMenu.classList.remove('translate-x-full');
// });

// mobileMenu.querySelector('.mobile-close').addEventListener('click', () => {
//     mobileMenu.classList.add('translate-x-full');
// });

// // Smooth Scroll for Navigation Links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//             // Close mobile menu if open
//             mobileMenu.classList.add('translate-x-full');
//         }
//     });
// });

// // Header Scroll Effect
// const header = document.querySelector('header');
// let lastScroll = 0;

// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
    
//     if (currentScroll <= 0) {
//         header.classList.remove('shadow-md');
//         return;
//     }
    
//     if (currentScroll > lastScroll) {
//         // Scrolling down
//         header.classList.add('shadow-md');
//     } else {
//         // Scrolling up
//         header.classList.remove('shadow-md');
//     }
    
//     lastScroll = currentScroll;
// });

// // Fade Up Animation on Scroll
// const fadeElements = document.querySelectorAll('.fade-up');

// const observerOptions = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.1
// };

// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//             observer.unobserve(entry.target);
//         }
//     });
// }, observerOptions);

// fadeElements.forEach(element => {
//     element.style.opacity = '0';
//     element.style.transform = 'translateY(20px)';
//     element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
//     observer.observe(element);
// });
