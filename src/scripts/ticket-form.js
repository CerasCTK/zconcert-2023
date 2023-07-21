import { Popup } from "./utils/popup/popup-utils";

// The quantity of ticket
window.incrementTicket = (ticketId) => {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  ticketInput.value = ticketCount + 1;
  updateTotalPrice();
};

window.decrementTicket = (ticketId) => {
  const ticketInput = document.getElementById(ticketId);
  const ticketCount = parseInt(ticketInput.value, 10);
  if (ticketCount > 0) {
    ticketInput.value = ticketCount - 1;
    updateTotalPrice();
  }
};

// Calculate total price
const getNumOfTics = (id) => {
  const element = document.getElementById(id);
  return parseInt(element.value);
};

const splitTickets = (numOfTics) => {
  const comboFive = Math.floor(numOfTics / 5);
  numOfTics = numOfTics - comboFive * 5;
  const comboThree = Math.floor(numOfTics / 3);
  const single = numOfTics - comboThree * 3;
  return [single, comboThree, comboFive];
};

const calculatePrice = (numOfTics, ticketPrice) => {
  return numOfTics * ticketPrice;
};

const updateTotalPrice = () => {
  const lotusTickets = getNumOfTics("lotusTickets");
  const jasmineTickets = getNumOfTics("jasmineTickets");
  const irisTickets = getNumOfTics("irisTickets");

  var lotusPrice;
  var jasminePrice;
  var irisPrice;

  if (lotusTickets >= 5 || jasmineTickets >= 5 || irisTickets >= 5) {
    lotusPrice = 389000;
    jasminePrice = 319000;
    irisPrice = 269000;
  } else if (lotusTickets >= 3 || jasmineTickets >= 3 || irisTickets >= 3) {
    lotusPrice = 399000;
    jasminePrice = 329000;
    irisPrice = 279000;
  } else {
    lotusPrice = 409000;
    jasminePrice = 339000;
    irisPrice = 289000;
  }

  const totalLotusPrice = calculatePrice(lotusTickets, lotusPrice);
  const totalJasminePrice = calculatePrice(jasmineTickets, jasminePrice);
  const totalIrisPrice = calculatePrice(irisTickets, irisPrice);

  const totalPrice = totalLotusPrice + totalJasminePrice + totalIrisPrice;
  document.getElementById("totalPrice").innerText =
    totalPrice.toLocaleString() + " VNĐ";
};

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
};

// Popup to show benefit details
const benefitOpener = document.getElementById("benefitOpener");
const benefitContent = document.getElementById("benefitContent");

const benefitPopup = new Popup.PopupBuilder(benefitContent)
  .closeOnClickOutside()
  .build();
benefitOpener.addEventListener("click", (_event) => {
  benefitPopup.show();
});
