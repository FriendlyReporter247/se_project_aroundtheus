import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";
import { config } from "../utils/constants.js";
import PopupDelete from "../components/PopupDelete.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const editAvatarModal = document.querySelector("#edit-profile-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarButton = document.querySelector(".profile__image-edit");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c85ade36-f272-4125-b270-35eee123ded5",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__image",
});

const section = new Section(
  {
    renderer: (data) => {
      return createCard(data);
    },
  },
  ".cards__list"
);

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: ({ title: name, description: about }) => {
    //Set text to saving...
    popupEditProfile.setSubmitButtonText("Saving...");
    api
      .editProfile({
        name,
        about,
      })
      .then((data) => {
        userInfo.setUserinfo({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
        });
        popupEditProfile.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupEditProfile.setSubmitButtonText("Save");
      });
  },
});

popupEditProfile.setEventListeners();

const popupEditProfileAvatar = new PopupWithForm({
  popupSelector: "#edit-profile-avatar-modal",
  handleFormSubmit: (url) => {
    const { avatar } = url;
    //Set text to saving...
    popupEditProfileAvatar.setSubmitButtonText("Saving...");
    api
      .editProfileAvatar({ url: avatar })
      .then((data) => {
        userInfo.setUserinfo({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
        });
        editAvatarForm.reset();
        popupEditProfileAvatar.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupEditProfileAvatar.setSubmitButtonText("Save");
      });
  },
});

popupEditProfileAvatar.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    console.log(formData);
    const { name, link } = formData;
    popupAddCard.setSubmitButtonText("Saving...");
    api
      .addCard({ name, link })
      .then((data) => {
        const card = createCard(data);
        section.addItem(card);
        popupAddCard.close();
        addCardForm.reset();
        addCardFormValidator.resetValidation();
        addCardFormValidator.toggleButtonState();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupAddCard.setSubmitButtonText("Create");
      });
  },
});

const confirmModal = new PopupDelete({
  popupSelector: "#delete-confirmation-modal",
});

confirmModal.setEventListeners();

function createCard(data) {
  const card = new Card({
    data,
    cardSelector: "#card-template",
    handleImageClick: (data) => popupWithImage.open(data),
    handleLikeClick: (card) => {
      api
        .likeCard(card._cardId, !card._isLiked)
        .then((data) => {
          card.toggleLike();
        })
        .catch((err) => console.error(err));
    },
    handleDeleteClick: (cardId) => {
      confirmModal.open();

      confirmModal.setConfirmAction(() => {
        api
          .deleteCard(data._id)
          .then(() => {
            card.removeCard();
            confirmModal.close();
          })
          .catch((err) => console.error(err));
      });
    },
  });
  return card.generateCard();
}

popupAddCard.setEventListeners();

addCardButton.addEventListener("click", () => {
  popupAddCard.open();
});

editProfileButton.addEventListener("click", () => {
  popupEditProfile.open();
  const userData = userInfo.getUserInfo();
  const userName = document.querySelector("#modal-input-type-name");
  const userDescription = document.querySelector(
    "#modal-input-type-description"
  );
  userName.value = userData.userName;
  userDescription.value = userData.userDescription;
  editProfileFormValidator.resetValidation();
});

api
  .loadInitialData()
  .then(([userData, cards]) => {
    userInfo.setUserinfo({
      userName: userData.name,
      userDescription: userData.about,
      userAvatar: userData.avatar,
    });
    section.renderItems(cards);
  })
  .catch((err) => console.error(err));

const editProfileFormValidator = new FormValidator(
  config,
  document.querySelector("#edit-profile-modal .modal__form")
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

editAvatarButton.addEventListener("click", () => {
  popupEditProfileAvatar.open();
});

const editProfileAvatarValidator = new FormValidator(
  config,
  document.querySelector("#edit-profile-avatar-modal .modal__form")
);

editProfileAvatarValidator.enableValidation();
