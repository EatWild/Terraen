//burgermenu
const menuIkon = document.querySelector(".menuikon");
const HeaderMenu = document.querySelector(".headermenu");

menuIkon.addEventListener("click", menuClicked);
function menuClicked() {
  menuIkon.classList.toggle("menuopen");
  HeaderMenu.classList.toggle("menuopen");
}
