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
  };

  #replaceToDom = () => {
    const currentContentParent = this.#content.parentNode;

    currentContentParent.replaceChild(this.container, this.content);

    this.wrapper.appendChild(this.content);

    this.container.appendChild(this.closeButton);
    this.container.appendChild(this.wrapper);
  };

  #enableWindowScrollEvent = () => {
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  };

  #disableWindowScrollEvent = () => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  };

  #createCloseBtn = () => {
    const button = document.createElement("span");
    button.classList.add(this.#popupCloseBtnClass);
    button.innerHTML = "&times;";

    button.addEventListener("click", (_event) => this.#hidePopup());

    return button;
  };

  #createWrapper = () => {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this.#popupWrapperClass);
    return wrapper;
  };

  #createContainer = () => {
    const container = document.createElement("div");
    container.classList.add(this.#popupContainerClass);
    return container;
  };

  #showPopup = () => {
    this.container.classList.add(this.#showPopupClass);
    this.#disableWindowScrollEvent();
  };

  #hidePopup = () => {
    if (!this.#isShowing()) return;
    this.container.classList.remove(this.#showPopupClass);
    this.#enableWindowScrollEvent();
  };

  #isShowing = () => {
    return this.container.classList.contains(this.#showPopupClass);
  };

  show = () => {
    if (this.#isShowing()) return;
    this.#showPopup();
  };

  static PopupBuilder = class {
    #popup;

    constructor(contentElement) {
      this.#popup = new Popup(contentElement);
    }

    showOnLoad = () => {
      window.addEventListener("load", () => {
        this.#popup.show();
      });

      return this;
    };

    closeOnClickOutside = () => {
      const popupContainer = this.#popup.container;

      window.addEventListener("click", ({ target }) => {
        if (target === popupContainer) this.#popup.#hidePopup();
      });

      return this;
    };

    build = () => {
      return this.#popup;
    };
  };
}
