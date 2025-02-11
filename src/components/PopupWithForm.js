import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, popupSelector }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = this._element.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputElement) => {
      formValues[inputElement.name] = inputElement.value;
    });

    return formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    this.close();
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
export default PopupWithForm;
