import { Popup } from "./utils/popup/popup-utils";

// Setup for history 2020
const his20Img = document.getElementById("his20Img");
const his20Content = document.getElementById("his20Content");
const his20Popup = new Popup.PopupBuilder(his20Content)
  .closeOnClickOutside()
  .build();
his20Img.addEventListener("click", (_event) => {
  his20Popup.show();
});

// Setup for history 2022
const his22Img = document.getElementById("his22Img");
const his22Content = document.getElementById("his22Content");
const his22Popup = new Popup.PopupBuilder(his22Content)
  .closeOnClickOutside()
  .build();
his22Img.addEventListener("click", (_event) => {
  his22Popup.show();
});

// Setup for history 2023
const his23Img = document.getElementById("his23Img");
const his23Content = document.getElementById("his23Content");
const his23Popup = new Popup.PopupBuilder(his23Content)
  .closeOnClickOutside()
  .build();
his23Img.addEventListener("click", (_event) => {
  his23Popup.show();
});

his20Popup.wrapper.classList.add("popup-history");
his22Popup.wrapper.classList.add("popup-history");
his23Popup.wrapper.classList.add("popup-history");
