export default class Card {
    constructor({ data, cardSelector, handleImageClick }) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _getTemplate() {
      const cardTemplate = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card");
      return cardTemplate.cloneNode(true);
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => {
        this._likeButton.classList.toggle("card__like-button_active");
      });
  
      this._deleteButton.addEventListener("click", () => {
        this._cardElement.remove();
        this._cardElement = null;
      });
  
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
    }
  
    generateCard() {
      this._cardElement = this._getTemplate();
      this._cardImage = this._cardElement.querySelector(".card__image");
      this._likeButton = this._cardElement.querySelector(".card__like-button");
      this._deleteButton = this._cardElement.querySelector(".card__delete");
      this._cardTitle = this._cardElement.querySelector(".card__title");
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardTitle.textContent = this._name;
  
      this._setEventListeners();
  
      return this._cardElement;
    }
  }
  