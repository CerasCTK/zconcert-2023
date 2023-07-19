// Scroll Navbar
const navbarElement = document.getElementById("intro-navbar");

window.onscroll = () => {
  if (window.scrollY !== 0) {
    navbarElement.classList.add("bg-scroll-navbar");
  } else {
    navbarElement.classList.remove("bg-scroll-navbar");
  }
};

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

// The quantity of ticket
function incrementTicket(ticketId) {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  ticketInput.value = ticketCount + 1;
  updateTotalPrice();
}

function decrementTicket(ticketId) {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  if (ticketCount > 0) {
    ticketInput.value = ticketCount - 1;
    updateTotalPrice();
  }
}

// Calculate total price
function updateTotalPrice() {
  const lotusSinglePrice = 369000;
  const jasmineSinglePrice = 329000;
  const irisSinglePrice = 289000;

  const lotusCombo3Price = 359000;
  const jasmineCombo3Price = 319000;
  const irisCombo3Price = 279000;

  const lotusCombo5Price = 349000;
  const jasmineCombo5Price = 309000;
  const irisCombo5Price = 269000;

  const lotusTickets = parseInt(
    document.getElementById("lotusTickets").value,
    10
  );
  const jasmineTickets = parseInt(
    document.getElementById("jasmineTickets").value,
    10
  );
  const irisTickets = parseInt(
    document.getElementById("irisTickets").value,
    10
  );

  const totalLotusPrice =
    Math.floor(lotusTickets / 3) * lotusCombo3Price * 3 +
    (lotusTickets % 3) * lotusSinglePrice;

  const totalJasminePrice =
    Math.floor(jasmineTickets / 3) * jasmineCombo3Price * 3 +
    (jasmineTickets % 3) * jasmineSinglePrice;

  const totalIrisPrice =
    Math.floor(irisTickets / 3) * irisCombo3Price * 3 +
    (irisTickets % 3) * irisSinglePrice;

  const totalPrice = totalLotusPrice + totalJasminePrice + totalIrisPrice;
  document.getElementById("totalPrice").innerText =
    totalPrice.toLocaleString("en-US") + " VNĐ";
}

// Call updateTotalPrice() on page load in case tickets are pre-filled
window.addEventListener("load", updateTotalPrice);
