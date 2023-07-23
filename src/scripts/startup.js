import { Popup } from "./utils/popup/popup-utils";

const startup = document.getElementById("startup");
const startupPopup = new Popup.PopupBuilder(startup)
  .showOnLoad()
  .closeOnClickOutside()
  .build();
