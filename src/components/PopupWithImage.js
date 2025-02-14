import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__caption");
  }

  open({ link, name }) {
    this._image.src = link;
    this._caption.textContent = name;
    this._image.alt = name;
    super.open();
  }

}

export default PopupWithImage;
