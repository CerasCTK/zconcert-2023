import { Popup } from "./utils/popup/popup-utils";

const startup = document.getElementById("startup");
const startupPopup = new Popup.PopupBuilder(startup)
  .showOnLoad()
  .closeOnClickOutside()
  .build();

startupPopup.wrapper.style.backgroundImage =
  "url(../assets/img/background/startup.jpg)";
startupPopup.wrapper.style.backgroundSize = "cover";
