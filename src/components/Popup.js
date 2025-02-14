class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keyup", this._handleEscUp);
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keyup", this._handleEscUp);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
