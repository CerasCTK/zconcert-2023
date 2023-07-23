import { Popup } from "./utils/popup/popup-utils";

const startup = document.getElementById("startup");
new Popup.PopupBuilder(startup).showOnLoad().closeOnClickOutside().build();