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
  };

  // Basic information
  const fullNameInput = document.getElementById("fullName");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const emailInput = document.getElementById("email");
  const facebookInput = document.getElementById("facebook");

  // Ticket order
  const lotusInput = document.getElementById("lotusTickets");
  const jasmineInput  = document.getElementById("jasmineTickets");
  const irisInput = document.getElementById("irisTickets");

  // Total price
  const totalPrice = document.getElementById("totalPriceNum");

  // Register ticket form
  const orderTicketForm = document.getElementById("orderTicketForm");

  // Popup to show benefit details
  const benefitOpener = document.getElementById("benefitOpener");
  const benefitContent = document.getElementById("benefitContent");

  // Popup when customer click submit button
  const loading = document.getElementById("submit-loading");
  const success = document.getElementById("submit-success");
  const failure = document.getElementById("submit-failure");

  // Banking QR element
  const qrElement = document.getElementById("banking-qr");
  const qrImgElement =  document.getElementById("banking-qr-image");

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

    updateQrImage();
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
    totalPrice.innerText = calculateTotalPrice().toLocaleString();
  };

  // Call updateTotalPrice() on page load in case tickets are pre-filled
  window.addEventListener("load", () => {
    updateTotalPrice();
  });

  const generateBankingInfo = () => {
    let info= "";
    const space = "%20"

    const fullName = fullNameInput.value;
    const phoneNumber =  phoneNumberInput.value;

    const lotus = getNumOfTics(lotusInput);
    const jasmine = getNumOfTics(jasmineInput);
    const iris = getNumOfTics(irisInput);

    if (!fullName) return "";
    if (!phoneNumber) return "";
    if (!lotus && !jasmine && !iris) return "";

    info += fullName + space + phoneNumber + space;

    if (lotus !== 0) info += "l" + lotus + space;
    if (jasmine !== 0) info += "j" + jasmine + space;
    if (iris !== 0) info += "i" + iris + space;

    // Remove space char at last
    info = info.slice(0, -space.length);

    return info;
  }

  const updateQrImage = () => {
    qrImgElement.src = `https://img.vietqr.io/image/MB-0852362511-compact2.png?amount=${calculateTotalPrice()}&addInfo=${generateBankingInfo()}&accountName=ZConcert2023`;
  }

  // Show QR code when click to banking radio button
  window.handleChange = ({ value }) => {
    if (!value) return;
    if (value === "banking") qrElement.classList.add("show");
    else qrElement.classList.remove("show");
  };

  // Setup benefit popup
  const benefitPopup = new Popup.PopupBuilder(benefitContent)
    .closeOnClickOutside()
    .build();
  benefitOpener.addEventListener("click", (_event) => {
    benefitPopup.show();
  });

  // Setup loading, success, failure popup
  const loadingPopup = new Popup.PopupBuilder(loading).hideCloseButton().build();
  const successPopup = new Popup.PopupBuilder(success).hideCloseButton().build();
  const failurePopup = new Popup.PopupBuilder(failure).hideCloseButton().build();

  orderTicketForm.addEventListener("submit", (event) => {
    event.preventDefault();

    loadingPopup.show();

    const fullName = fullNameInput.value;
    const phoneNumber = phoneNumberInput.value;
    const email = emailInput.value;
    const facebook = facebookInput.value;

    const lotus = getNumOfTics(lotusInput);
    const jasmine = getNumOfTics(jasmineInput);
    const iris = getNumOfTics(irisInput);
    if (lotus === 0 && jasmine === 0 && iris === 0) return;

    const total = calculateTotalPrice(lotus, jasmine, iris);

    const payment = document.querySelector("input[name=\"payment\"]:checked");
    if (!payment) return;
    const paymentMethod = payment.value;

    const newRow = createData(fullName, phoneNumber, email, facebook, lotus, jasmine, iris, total, paymentMethod);
    writeToSheet(newRow, {}, registerSuccess, registerFailure);
  });

  const registerSuccess = (_result) => {
    loadingPopup.hide();
    successPopup.show();
    setTimeout(() => {
      successPopup.hide();

      // Refresh page
    }, 2000);
  };

  const registerFailure = (_error) => {
    loadingPopup.hide();
    failurePopup.show();
    setTimeout(() => {
      failurePopup.hide();

      // Refresh page
    }, 2000);
  };
}());