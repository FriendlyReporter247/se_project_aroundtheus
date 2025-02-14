import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";


const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-card-button");

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
});

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
    return createCard(data);
    },
  },
  ".cards__list"
);
section.renderItems();

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserinfo({
      userName: formData.title,
      userDescription: formData.description,
    });
    popupEditProfile.close();
  },
});

popupEditProfile.setEventListeners();


const popupAddCard = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const card = createCard(formData);
    section.addItem(card);
    popupAddCard.close();
  },
  
});


function createCard(data) {
  const card = new Card({
    data,
    cardSelector: "#card-template",
    handleImageClick: (data) => popupWithImage.open(data),
  });
    return card.generateCard();
  }
  


popupAddCard.setEventListeners();

addCardButton.addEventListener("click", () => {
  popupAddCard.open();
});

editProfileButton.addEventListener("click", () => {
  popupEditProfile.open();
});

const editProfileFormValidator = new FormValidator(
  config,
  document.querySelector("#edit-profile-modal .modal__form")
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  config,
  document.querySelector("#add-card-modal .modal__form")
);
addCardFormValidator.enableValidation();
