// Play music when hover to vocal img
const hoverImages = document.querySelectorAll(".hover-image");
const hoverMusics = document.querySelectorAll(".hover-music");

let playingIndex = -1;

hoverImages.forEach((image, index) => {

  image.addEventListener("mouseover", async () => {
    await hoverMusics[index].play();
    image.classList.add("playing-music");
    playingIndex = index;
  });

  image.addEventListener("touchstart", async () => {
    await hoverMusics[index].play();
    image.classList.add("playing-music");
    playingIndex = index;
  })

  image.addEventListener("mouseout", () => {
    hoverMusics[index].pause();
    hoverMusics[index].currentTime = 0; // Resets the audio to the beginning
    playingIndex = -1;
    image.classList.remove("playing-music");
  });
});

window.addEventListener("touchstart", ({ target }) => {
  if (target.classList.contains("hover-image")) return;
  if (playingIndex === -1) return;
  hoverImages[playingIndex].classList.remove("playing-music");
  hoverMusics[playingIndex].pause();
  hoverMusics[playingIndex].currentTime = 0;
  playingIndex = -1;
});
