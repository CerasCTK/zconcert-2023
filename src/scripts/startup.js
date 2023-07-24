import { Popup } from "./utils/popup/popup-utils";
import { imgBgPopup } from "./assets";

const startup = document.getElementById("startup");
const startupPopup = new Popup.PopupBuilder(startup)
  .showOnLoad()
  .closeOnClickOutside()
  .build();
startupPopup.wrapper.style.backgroundImage = `url(${imgBgPopup})`;
startupPopup.wrapper.style.backgroundSize = "cover";
startupPopup.wrapper.classList.add("popup-welcome");
