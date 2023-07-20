import {Popup} from "./utils/popup/popup-utils";

const benefitBtn = document.getElementById("benefitOpener");
const benefitPopupContent = document.getElementById("benefitDialog");

const benefitPopup = new Popup.PopupBuilder(benefitPopupContent).closeOnClickOutside().build();
benefitBtn.addEventListener("click", () => {
  benefitPopup.show();
})

const zHis2022Btn = document.getElementById("zHis2022Opener");
const zHis2022Content = document.getElementById("zHis2022");

const zHis2022Popup = new Popup.PopupBuilder(zHis2022Content).closeOnClickOutside().build();
zHis2022Btn.addEventListener("click", () => {
  zHis2022Popup.show();
})

const startupPopup = new Popup.PopupBuilder(document.getElementById("startupPopup")).showOnLoad().closeOnClickOutside().build();