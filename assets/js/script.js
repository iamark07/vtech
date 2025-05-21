// gallery section sliders feature code

let currentIndex = 0;
let imageElements = [];

// Function to open lightbox with selected image
function openLightbox(clickedImage) {
  imageElements = Array.from(document.querySelectorAll("#gallery-grid img"));
  currentIndex = imageElements.indexOf(clickedImage);

  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-image");
  img.style.opacity = 0;
  img.onload = () => {
    img.style.opacity = 1;
  };
  img.src = clickedImage.src;
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
}

// Close lightbox
function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

// Show previous image
function prevImage() {
  if (imageElements.length === 0) return;
  currentIndex =
    (currentIndex - 1 + imageElements.length) % imageElements.length;
  updateLightboxImage();
}

// Show next image
function nextImage() {
  if (imageElements.length === 0) return;
  currentIndex = (currentIndex + 1) % imageElements.length;
  updateLightboxImage();
}

// Update the image shown in the lightbox
function updateLightboxImage() {
  const img = document.getElementById("lightbox-image");
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = imageElements[currentIndex].src;
  }, 300);
}
