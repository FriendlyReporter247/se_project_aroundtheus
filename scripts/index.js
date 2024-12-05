/* -------------------------------------------------------------------------- */
/*                           constants and elements                           */
/* -------------------------------------------------------------------------- */

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

const modals = document.querySelectorAll(".modal");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Edit Profile
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileTitleInput = editProfileModal.querySelector(
  "#modal__input_type_name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  "#modal__input_type_description"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const likeButtons = document.querySelectorAll(".card__like-button");

// Add Card
const addCardModal = document.querySelector("#add-card-modal");
const cardNameInput = addCardModal.querySelector("#modal__input_type_title");
const cardLinkInput = addCardModal.querySelector("#modal__input_type_url");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const addCardFormElements = addCardModal.querySelector(".modal__form");

// Image Modal

const profileAddCardBtn = document.querySelector(".profile__add-card-button");

const profileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = document.querySelector(".modal__close");
const profileEditForm = document.querySelector(".profile__edit-form");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function handleAddCardSubmit(event) {
  event.preventDefault();
  renderCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    cardsList
  );
  closeModal(addCardModal);
  addCardFormElements.reset();
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
}

function openModal(modal) {
  modal.classList.add("modal_open");
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editProfileModal);
}

function handleCardDelete(event) {
  const cardElement = event.target.closest(".card");
  if (cardElement) {
    cardElement.remove();
  }
}

function handlePreviewImage(data) {
  imageModalImage.src = data.link;
  imageModalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(imageModal);
}

function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  console.log(cardImage, cardTitle);

  cardImage.addEventListener("click", () => {
    handlePreviewImage(data);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", (event) => {
    handleCardDelete(event);
  });

  return cardElement;
}

function renderCard(data, wrap) {
  console.log(data);
  wrap.prepend(getCardElement(data));
}

/* -------------------------------------------------------------------------- */
/*                              events listeners                              */
/* -------------------------------------------------------------------------- */

profileAddCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElements.addEventListener("submit", handleAddCardSubmit);



/* -------------------------------------------------------------------------- */
/*                               initialization                               */
/* -------------------------------------------------------------------------- */

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

initialCards.forEach((data) => {
  renderCard(data, cardsList);
});


