const menuBtn = document.querySelector(".header__btn");
const overlay = document.querySelector(".overlay");
const headerMenu = document.querySelector(".header__menu");
let menuOpen = false;

menuBtn.addEventListener("click", function () {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    overlay.classList.remove("fade-out");
    overlay.classList.add("fade-in");
    headerMenu.classList.remove("fade-out");
    headerMenu.classList.add("fade-in");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");
    headerMenu.classList.remove("fade-in");
    headerMenu.classList.add("fade-out");
    setTimeout(fade, 400);

    function fade() {
      headerMenu.classList.remove("fade-out");
    }
    menuOpen = false;
  }
});

overlay.addEventListener("click", function () {
  menuBtn.classList.remove("open");
  overlay.classList.remove("fade-in");
  overlay.classList.add("fade-out");
  headerMenu.classList.remove("fade-in");
  headerMenu.classList.add("fade-out");
  menuOpen = false;
});
