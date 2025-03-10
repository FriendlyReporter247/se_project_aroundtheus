import Popup from "./Popup.js";

class PopupDelete extends Popup {
  setConfirmAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }
}

export default PopupDelete;
