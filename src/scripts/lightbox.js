document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".zoomable");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    lightbox.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });
});
