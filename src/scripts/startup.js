import { Popup } from "./utils/popup/popup-utils";

import startupImg from "../assets/img/background/startup.jpg";

const startup = document.getElementById("startup");
const startupPopup = new Popup.PopupBuilder(startup)
  .showOnLoad()
  .closeOnClickOutside()
  .build();

startupPopup.wrapper.style.backgroundImage = `url(${startupImg})`;
startupPopup.wrapper.style.backgroundSize = "cover";
