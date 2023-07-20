import "./popup.css";

export class Popup {
  #container;
  #closeButton;
  #wrapper;
  #content;

  #popupContainerClass = "popup-container";
  #popupCloseBtnClass = "popup-close-button";
  #popupWrapperClass = "popup-wrapper";
  #showPopupClass = "popup-show";

  constructor(contentElement) {
    if (!contentElement) throw new Error("Not found content element param");

    this.#content = contentElement;

    this.#initElement();
    this.#replaceToDom();
  }

  get container() {
    return this.#container;
  }

  get closeButton() {
    return this.#closeButton;
  }

  get wrapper() {
    return this.#wrapper;
  }

  get content() {
    return this.#content;
  }

  #initElement = () => {
    this.#wrapper = this.#createWrapper();
    this.#closeButton = this.#createCloseBtn();
    this.#container = this.#createContainer();
  }

  #replaceToDom = () => {
    const currentContentParent = this.#content.parentNode;

    currentContentParent.replaceChild(this.container, this.content);

    this.wrapper.appendChild(this.content);

    this.container.appendChild(this.closeButton);
    this.container.appendChild(this.wrapper);
  }

  #enableWindowScrollEvent = () => {
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  }

  #disableWindowScrollEvent = () => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  }

  #createCloseBtn = () => {
    const button = document.createElement("span");
    button.classList.add(this.#popupCloseBtnClass);
    button.innerHTML = "&times;";

    button.addEventListener("click", (_event) => this.#hidePopup())

    return button;
  }

  #createWrapper = () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this.#popupWrapperClass);
    return wrapper;
  }

  #createContainer = () => {
    const container = document.createElement("div");
    container.classList.add(this.#popupContainerClass);
    return container;
  }

  #showPopup = () => {
    this.container.classList.add(this.#showPopupClass);
    this.#disableWindowScrollEvent();
  }

  #hidePopup = () => {
    if (!this.#isShowing()) return;
    this.container.classList.remove(this.#showPopupClass);
    this.#enableWindowScrollEvent();
  }

  #isShowing = () => {
    return this.container.classList.contains(this.#showPopupClass);
  }

  show = () => {
    if (this.#isShowing()) return;
    this.#showPopup();
  }

  static PopupBuilder = class {
    #popup;

    constructor(contentElement) {
      this.#popup = new Popup(contentElement);
    }

    showOnLoad = () => {
      window.addEventListener("load", () => {
        this.#popup.show();
      })

      return this;
    }

    closeOnClickOutside = () => {
      const popupContainer = this.#popup.container;

      window.addEventListener("click", ({ target }) => {
        if (target === popupContainer) this.#popup.#hidePopup();
      })

      return this;
    }

    build = () => {
      return this.#popup;
    }
  }
}

// static #containerClass = ["ceras-popup-container"];
// static #popupClass = ["ceras-popup"];
//
// static #createContainer = (tagName) => {
//   const containerElement = document.createElement(tagName);
//   PopupUtils.#containerClass.forEach(eachClass => containerElement.classList.add(eachClass));
//   return containerElement;
// }
//
// static #isSetup = (popup) => {
//   if (!popup) return;
//
//   const container = popup.parentNode;
//   return container.classList.contains("ceras-popup-container");
// }
//
// static #isOpen = (popup) => {
//   if (!popup) return false;
//   if (!PopupUtils.#isSetup(popup)) return false;
//
//   const container = popup.parentNode;
//   return container.classList.contains("ceras-popup-container-show");
// }
//
// static #showPopup = (popup) => {
//   if (!popup) return;
//   if (!PopupUtils.#isSetup(popup)) return;
//
//   const container = popup.parentNode;
//   container.classList.add("ceras-popup-container-show");
//
//   const body = document.querySelector("body")
//   body.style.overflow = "hidden";
// }
//
// static #hidePopup = (popup) => {
//   if (!popup) return;
//   if (!PopupUtils.#isSetup(popup)) return;
//   if (!PopupUtils.#isOpen(popup)) return;
//
//   const container = popup.parentNode;
//   container.classList.remove("ceras-popup-container-show");
// }
//
// static $setupEvent = (popup) => {
//   if (!popup) return;
//   if (!PopupUtils.#isSetup(popup)) return;
//
//   // Click outside to close popup
//   window.onclick = (({ target }) => {
//     if (target === popup.parentNode) PopupUtils.#hidePopup(popup);
//   })
// }
//
// static createPopup = (popup) => {
//   if (!popup) return;
//
//   const currentParent = popup.parentNode;
//
//   const container = PopupUtils.#createContainer("div");
//   PopupUtils.#popupClass.forEach(eachClass => popup.classList.add(eachClass));
//
//   currentParent.replaceChild(container, popup);
//   container.appendChild(popup);
//   PopupUtils.$setupEvent(popup);
// }
//
// static linkOpener = (popup, opener, interact = "click") => {
//   if (!popup) return;
//   if (!opener) return;
//
//   if (!PopupUtils.#isSetup(popup)) return;
//
//   opener.addEventListener(interact, (_event) => PopupUtils.#showPopup(popup));
// }