/* Kisan Vision — Article Detail Page
   Pure vanilla JavaScript. No libraries, no frameworks. */

(function () {
  "use strict";

  /* ---------- Mobile hamburger menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    var iconMenu = menuToggle.querySelector(".icon-menu");
    var iconClose = menuToggle.querySelector(".icon-close");

    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("kv-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      if (iconMenu) iconMenu.style.display = isOpen ? "none" : "block";
      if (iconClose) iconClose.style.display = isOpen ? "block" : "none";
    });

    // Close the menu when any link inside it is tapped
    mobileMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && mobileMenu.classList.contains("kv-open")) {
        mobileMenu.classList.remove("kv-open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (iconMenu) iconMenu.style.display = "block";
        if (iconClose) iconClose.style.display = "none";
      }
    });
  }

  /* ---------- Image gallery: thumbnail switching ---------- */
  var mainImage = document.getElementById("mainImage");
  var mainCaption = document.getElementById("mainCaption");
  var thumbs = document.querySelectorAll(".kv-thumb");

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      if (!mainImage || thumb.classList.contains("kv-thumb-active")) return;

      // Fade out, swap, fade back in
      mainImage.classList.add("kv-fading");

      window.setTimeout(function () {
        mainImage.src = thumb.getAttribute("data-src");
        mainImage.alt = thumb.getAttribute("data-alt") || "";
        if (mainCaption) {
          mainCaption.textContent = thumb.getAttribute("data-caption") || "";
        }
        mainImage.classList.remove("kv-fading");
      }, 200);

      // Move the active highlight
      thumbs.forEach(function (t) {
        t.classList.remove("kv-thumb-active");
        t.setAttribute("aria-selected", "false");
      });
      thumb.classList.add("kv-thumb-active");
      thumb.setAttribute("aria-selected", "true");
    });
  });

  /* ---------- Reading progress bar ---------- */
  var progress = document.getElementById("readingProgress");

  function updateProgress() {
    if (!progress) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
