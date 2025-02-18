import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });
    
    return formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
      super.close();
    super.setEventListeners();
  }


}

export default PopupWithForm;
