import { Popup } from "./utils/popup/popup-utils";
import { createData, writeToSheet } from "./utils/google-sheet/google-sheet";

const lotusPrice = {
  single: 409000,
  combo3: 399000,
  combo5: 389000,
};

const jasminePrice = {
  single: 339000,
  combo3: 329000,
  combo5: 319000,
};

const irisPrice = {
  single: 289000,
  combo3: 279000,
  combo5: 269000,
};

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

const getPerTicPrice = (numOfTics, ticketPrice) => {
  if (numOfTics >= 5) return ticketPrice.combo5;
  if (numOfTics >= 3) return ticketPrice.combo3;
  if (numOfTics >= 1) return ticketPrice.single;
  else return 0;
};

const calculateTotalPrice = (numOfLotus, numOfJasmine, numOfIris) => {
  const totalLotusPrice = numOfLotus * getPerTicPrice(numOfLotus, lotusPrice);
  const totalJasminePrice =
    numOfJasmine * getPerTicPrice(numOfJasmine, jasminePrice);
  const totalIrisPrice = numOfIris * getPerTicPrice(numOfIris, irisPrice);

  return totalLotusPrice + totalJasminePrice + totalIrisPrice;
};

const updateTotalPrice = () => {
  const numOfLotus = getNumOfTics("lotusTickets");
  const numOfJasmine = getNumOfTics("jasmineTickets");
  const numOfIris = getNumOfTics("irisTickets");

  const totalLotusPrice = numOfLotus * getPerTicPrice(numOfLotus, lotusPrice);
  const totalJasminePrice =
    numOfJasmine * getPerTicPrice(numOfJasmine, jasminePrice);
  const totalIrisPrice = numOfIris * getPerTicPrice(numOfIris, irisPrice);

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

const orderTicketForm = document.getElementById("orderTicketForm");

orderTicketForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;

  const fullName = form.querySelector("input#fullName").value;
  const phoneNumber = form.querySelector("input#phoneNumber").value;
  const email = form.querySelector("input#email").value;
  const facebook = form.querySelector("input#facebook").value;

  const lotus = form.querySelector("input#lotusTickets").value;
  const jasmine = form.querySelector("input#jasmineTickets").value;
  const iris = form.querySelector("input#irisTickets").value;
  if (lotus === 0 && jasmine === 0 && iris === 0) return;

  const total = calculateTotalPrice(lotus, jasmine, iris);

  const payment = form.querySelector('input[name="payment"]:checked');
  if (!payment) return;
  const paymentMethod = payment.value;

  const newRow = createData(
    fullName,
    phoneNumber,
    email,
    facebook,
    lotus,
    jasmine,
    iris,
    total,
    paymentMethod
  );
  writeToSheet(newRow, {}, registerSuccess, registerFailure);
});

const registerSuccess = (result) => {
  console.log(result);
};

const registerFailure = (error) => {
  console.log(error);
};
