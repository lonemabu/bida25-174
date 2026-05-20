var toggle = document.getElementById("navToggle");
var links  = document.querySelector(".nav-links");
var overlay = document.getElementById("navOverlay");

toggle.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

function openMenu() {
  var isOpen = links.classList.toggle("nav-open");
  toggle.innerHTML  = isOpen ? "&#10005;" : "&#9776;";
  overlay.classList.toggle("nav-overlay-show", isOpen);
  document.body.classList.toggle("nav-body-lock", isOpen);
}

function closeMenu() {
  links.classList.remove("nav-open");
  overlay.classList.remove("nav-overlay-show");
  document.body.classList.remove("nav-body-lock");
  toggle.innerHTML = "&#9776;";
}