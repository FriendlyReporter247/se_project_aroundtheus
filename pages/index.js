/* -------------------------------------------------------------------------- */
/*                           constants and elements                           */
/* -------------------------------------------------------------------------- */

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const modals = document.querySelectorAll(".modal");

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

const editProfileModal = document.querySelector("#edit-profile-modal");
const profileTitleInput = editProfileModal.querySelector(
  "#modal-input-type-name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  "#modal-input-type-description"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardNameInput = addCardModal.querySelector("#modal-input-type-title");
const cardLinkInput = addCardModal.querySelector("#modal-input-type-url");

const cardsList = document.querySelector(".cards__list");
const profileAddCardBtn = document.querySelector(".profile__add-card-button");

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", handleKeyDown);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleKeyDown);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editProfileModal);
}

function handleImageClick({ name, link }) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  modalCaption.textContent = name;

  openModal(imageModal);
}

function createCard(data) {
  const card = new Card({
    data,
    cardSelector: "#card-template",
    handleImageClick,
  });
  return card.generateCard();
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal.modal_open");
    if (modal) {
      closeModal(modal);
    }
  }
}

function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

initialCards.forEach((data) => {
  cardsList.append(createCard(data));
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: cardNameInput.value, link: cardLinkInput.value };
  cardsList.prepend(createCard(cardData));
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
  closeModal(addCardModal);
  
});

editProfileButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

profileAddCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});
