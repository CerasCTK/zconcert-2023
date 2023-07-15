// Scroll Navbar
const navbarElement = document.getElementById("intro-navbar");

window.onscroll = () => {
  if (window.scrollY !== 0) {
    navbarElement.classList.add("bg-scroll-navbar");
  } else {
    navbarElement.classList.remove("bg-scroll-navbar");
  }
};

// Show video section History
function toggleVideo(index) {
  var iframe = document.getElementById("video" + index);
  if (iframe.style.display === "none") {
    iframe.style.display = "block";
  } else {
    iframe.style.display = "none";
  }
}

// Play music when hover Vocal img
const hoverImages = document.querySelectorAll(".hover-image");
const hoverMusics = document.querySelectorAll(".hover-music");

hoverImages.forEach((image, index) => {
  image.addEventListener("mouseover", function () {
    hoverMusics[index].play();
  });

  image.addEventListener("mouseout", function () {
    hoverMusics[index].pause();
    hoverMusics[index].currentTime = 0; // Resets the audio to the beginning
  });
});
