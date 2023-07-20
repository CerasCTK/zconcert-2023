import {Popup} from "./utils/popup/popup-utils";

const benefitBtn = document.getElementById("benefitOpener");
const benefitPopupContent = document.getElementById("benefitDialog");

const benefitPopup = new Popup.PopupBuilder(benefitPopupContent).closeOnClickOutside().build();
benefitBtn.addEventListener("click", () => {
  benefitPopup.show();
})