import { Popup } from "./utils/popup/popup-utils";
import { createData, writeToSheet } from "./utils/google-sheet/google-sheet";

(function () {
// Ticket price
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
  }

// Basic information
  const fullNameInput = document.getElementById("fullName");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const emailInput = document.getElementById("email");
  const facebookInput = document.getElementById("facebook");

// Ticket order
  const lotusInput = document.getElementById("lotusTickets");
  const jasmineInput  = document.getElementById("jasmineTickets");
  const irisInput = document.getElementById("irisTickets");


// Total
  const totalPrice = document.getElementById("totalPriceNum");

// Popup to show benefit details
  const benefitOpener = document.getElementById("benefitOpener");
  const benefitContent = document.getElementById("benefitContent");

// Utils
  const getNumOfTics = (ticketInput) => {
    return parseInt(ticketInput.value);
  };

  const getPerTicPrice = (numOfTics, ticketPrice) => {
    if (numOfTics >= 5) return ticketPrice.combo5;
    if (numOfTics >= 3) return ticketPrice.combo3;
    if (numOfTics >= 1) return ticketPrice.single;
    else return 0;
  }

// Event update quantity of ticket
  window.updateQuantity = (ticket, handle) => {
    switch (ticket) {
      case "lotus":
        handle(lotusInput);
        break;
      case "jasmine":
        handle(jasmineInput);
        break;
      case "iris":
        handle(irisInput);
        break;
      default:
        break;
    }

    updateTotalPrice();
  }

  window.increment = (ticketInput) => {
    const currentValue = getNumOfTics(ticketInput);
    ticketInput.value = currentValue + 1;
  }

  window.decrement = (ticketInput) => {
    const currentValue = getNumOfTics(ticketInput);
    if (currentValue === 0) return;
    ticketInput.value = currentValue - 1;
  }

  const calculateTotalPrice = () => {
    const numOfLotus = getNumOfTics(lotusInput);
    const numOfJasmine = getNumOfTics(jasmineInput);
    const numOfIris = getNumOfTics(irisInput);

    const totalLotusPrice = numOfLotus * getPerTicPrice(numOfLotus, lotusPrice);
    const totalJasminePrice = numOfJasmine * getPerTicPrice(numOfJasmine, jasminePrice);
    const totalIrisPrice = numOfIris * getPerTicPrice(numOfIris, irisPrice);

    return totalLotusPrice + totalJasminePrice + totalIrisPrice;
  }

  const updateTotalPrice = () => {
    document.getElementById("totalPriceNum").innerText = calculateTotalPrice().toLocaleString();
  };

// Call updateTotalPrice() on page load in case tickets are pre-filled
  window.addEventListener("load", () => {
    updateTotalPrice();
  });

// Show QR code when click to banking radio button

  window.handleChange = ({ value }) => {
    const imageBankingEle = document.getElementById("banking-qr");
    if (!value) return;
    if (value === "banking") {
      // generateQrCode(imageBankingEle);
      imageBankingEle.classList.add("show");
    }
    else imageBankingEle.classList.remove("show");
  };

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

    const payment = form.querySelector("input[name=\"payment\"]:checked");
    if (!payment) return;
    const paymentMethod = payment.value;

    const newRow = createData(fullName, phoneNumber, email, facebook, lotus, jasmine, iris, total, paymentMethod);
    writeToSheet(newRow, {}, registerSuccess, registerFailure);
  });

  const registerSuccess = (result) => {
    console.log(result);
  }

  const registerFailure = (error) => {
    console.log(error);
  }
}())