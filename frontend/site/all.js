// Home-page interactions for the bundled Kisan Vision static site.
(function () {
  "use strict";

  var menuButton = document.getElementById("menuButton");
  var mainNav = document.getElementById("mainNav");
  if (menuButton && mainNav) {
    menuButton.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      menuButton.textContent = mainNav.classList.contains("open") ? "×" : "☰";
    });
  }

  var input = document.getElementById("cropInput");
  var uploadButton = document.getElementById("uploadButton");
  if (input && uploadButton) {
    uploadButton.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function () {
      if (input.files && input.files.length) {
        window.location.href = "detectdisease.html";
      }
    });
  }
}());
