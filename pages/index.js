import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialInfo } from '../scripts/initialData.js';
import { Api } from '../components/Api.js';
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form-submit',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error-message_visible',
}
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonChange = document.querySelector('.profile__avatar-button');
const inputName = document.querySelector('.edit-form__input_type_name');
const inputProfession = document.querySelector('.edit-form__input_type_profession');
const formBodyEdit = document.querySelector('.edit-form');
const formBodyAdd = document.querySelector('.add-form');
const formBodyAvatar = document.querySelector('.change-avatar-form');
const formBodyDelete = document.querySelector('.delete-form');
const formAddCard = new PopupWithForm('.popup_add', addFormSubmit);
const formEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
const formChangeAvatar = new PopupWithForm('.popup_change-avatar', changeFormSubmit);
const formDeleteCard = new PopupWithForm('.popup_delete', deleteFormSubmit);
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
const formAvatarValidClass = new FormValidator(validSettings, formBodyAvatar);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar-image');
const popupImage = new PopupWithImage('.image-popup');
const api = new Api(initialInfo);
let cardList;
let userID;

function showErrorMessage(err) {
  console.error(`Что-то пошло не так. Ошибка: ${err}`);
}

function handleCardClick(src, alt) {
  popupImage.open(src, alt);
}

function toggleCardLike(id, method, likeCounter) {
  return api.toggleLike(id, method)
    .then((result) => {
      likeCounter.textContent = result.likes.length;
      return result;
    })
    .catch((err) => {
      showErrorMessage(err);
    })
}

function createCard(data) {
  const cardElement = new Card(data, "#place-card", userID, () => handleCardClick({ src: data.link, alt: data.name }), toggleCardLike, openDeletePopup, formBodyDelete);
  return cardElement.generateCard();
}

function editFormSubmit(data) {
  formEditProfile.setLoadingText('Сохранение...');
  const info = {
    name: data.name,
    about: data.profession
  }
  api.setUserInfo(info)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })
    .catch((err) => {
      showErrorMessage(err);
    })
    .finally(() => {
      formEditProfile.setOriginalText();
    })
  formEditValidClass.removeValidationErrors();
}

function addFormSubmit(values) {
  formAddCard.setLoadingText('Сохранение...');
  api.setNewCard(values)
    .then((result) => {
      cardList.addItem(createCard(result));
      formAddValidClass.removeValidationErrors();
    })
    .catch((err) => {
      showErrorMessage(err);
    })
    .finally(() => {
      formAddCard.setOriginalText();
    })
}

function changeFormSubmit(values) {
  formChangeAvatar.setLoadingText('Сохранение...');
  api.changeAvatar(values).
    then((result) => {
      userInfo.setUserAvatar(result.avatar);
      formAvatarValidClass.removeValidationErrors();
    })
    .catch((err) => {
      showErrorMessage(err);
    })
    .finally(() => {
      formChangeAvatar.setOriginalText();
    })
}

function openDeletePopup(id) {
  formBodyDelete.dataset.imageId = id;
  formDeleteCard.open();
}

function deleteFormSubmit() {
  formDeleteCard.setLoadingText('Удаление...');
  api.deleteCard(formBodyDelete.dataset.imageId)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      showErrorMessage(err);
    })
    .finally(() => {
      formDeleteCard.setOriginalText();
    })
}

window.addEventListener('DOMContentLoaded', () => {
  //generating cards on page...
  api.getInitialCards()
    .then((result) => {
      cardList = new Section({
        items: result,
        renderer: (data) => {
          return createCard(data);
        }
      }, '#elements-container');
      cardList.renderItems();
    })
    .catch((err) => {
      showErrorMessage(err);
    })

  //setting user info on page...
  api.getUserInfo()
    .then((result) => {
      userID = result._id;
      userInfo.setUserInfo(result.name, result.about);
      userInfo.setUserAvatar(result.avatar);
    })
    .catch((err) => {
      showErrorMessage(err);
    })


  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();
  formAvatarValidClass.enableValidation();
  popupImage.setEventListeners();
  formAddCard.setEventListeners();
  formEditProfile.setEventListeners();
  formChangeAvatar.setEventListeners();
  formDeleteCard.setEventListeners();
  buttonEdit.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().name;
    inputProfession.value = userInfo.getUserInfo().info;
    formEditProfile.open();
    formEditValidClass.openingValidation();
  });
  buttonAdd.addEventListener('click', () => {
    formAddCard.open();
    formAddValidClass.openingValidation();
  });

  buttonChange.addEventListener('click', () => {
    formChangeAvatar.open();
    formAvatarValidClass.openingValidation();
  });
});