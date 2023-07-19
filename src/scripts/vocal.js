// Play music when hover to vocal img
const hoverImages = document.querySelectorAll(".hover-image");
const hoverMusics = document.querySelectorAll(".hover-music");

hoverImages.forEach((image, index) => {
  const audio = new Audio(hoverMusics[index].src);

  image.addEventListener("mouseover", async () => {
    await audio.play();
  });

  image.addEventListener("mouseout", () => {
    audio.pause();
    audio.currentTime = 0; // Resets the audio to the beginning
  });
});
