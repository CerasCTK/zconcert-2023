// Scroll Navbar
const navbarElement = document.getElementById("intro-navbar");

window.onscroll = () => {
  if (window.scrollY !== 0) {
    navbarElement.classList.add("bg-scroll-navbar");
  } else {
    navbarElement.classList.remove("bg-scroll-navbar");
  }
};
