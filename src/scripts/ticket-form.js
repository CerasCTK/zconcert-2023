// The quantity of ticket
window.incrementTicket = (ticketId) => {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  ticketInput.value = ticketCount + 1;
  updateTotalPrice();
}

window.decrementTicket = (ticketId) => {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  if (ticketCount > 0) {
    ticketInput.value = ticketCount - 1;
    updateTotalPrice();
  }
}

// Calculate total price
const getNumOfTics = (id) => {
  const element = document.getElementById(id);
  return parseInt(element.value);
}

const splitTickets = (numOfTics) => {
  const comboFive = Math.floor(numOfTics / 5);
  numOfTics = numOfTics - comboFive * 5;
  const comboThree = Math.floor(numOfTics / 3);
  const single = numOfTics - comboThree * 3;
  return [single, comboThree, comboFive];
}

const calculatePrice = (numOfTics, ticketPrice) => {
  const splitTics = splitTickets(numOfTics);

  return splitTics.reduce((accumulator, currentValue, currentIndex) => {
    return accumulator + currentValue * ticketPrice[currentIndex];
  }, 0);
}

const updateTotalPrice = () => {
  const lotusPrice = [369000, 359000 * 3, 349000 * 5]; // Single price | Combo 3 price | Combo 5 price
  const jasminePrice = [329000, 319000 * 3, 309000 * 5];
  const irisPrice = [289000, 279000 * 3, 269000 * 5];

  const lotusTickets = getNumOfTics("lotusTickets");
  const jasmineTickets = getNumOfTics("jasmineTickets")
  const irisTickets = getNumOfTics("irisTickets");

  const totalLotusPrice =  calculatePrice(lotusTickets, lotusPrice);
  const totalJasminePrice = calculatePrice(jasmineTickets, jasminePrice);
  const totalIrisPrice = calculatePrice(irisTickets, irisPrice);

  const totalPrice = totalLotusPrice + totalJasminePrice + totalIrisPrice;
  document.getElementById("totalPrice").innerText =
    totalPrice.toLocaleString() + " VNĐ";
}

// Call updateTotalPrice() on page load in case tickets are pre-filled
window.addEventListener("load", () => {
  updateTotalPrice();
});

// Show QR code when click to banking radio button
const imageBankingEle = document.getElementById("banking-qr");
window.handleChange = ({ value }) => {
  if (!value) return;
  if (value === "banking") imageBankingEle.classList.add("show");
  else imageBankingEle.classList.remove("show");
}