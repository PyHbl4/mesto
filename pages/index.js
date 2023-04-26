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
let userID;
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
const formAvatarValidClass = new FormValidator(validSettings, formBodyAvatar);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const popupImage = new PopupWithImage('.image-popup');
const api = new Api(initialInfo);
let cardList;
popupImage.setEventListeners();

function showErrorMessage(err) {
  console.log(`Что-то пошло не так. Ошибка: ${err}`);
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
  // console.log(data);
  const cardElement = new Card(data, "#place-card", userID, () => handleCardClick({ src: data.link, alt: data.name }), toggleCardLike);
  return cardElement.generateCard();
}

function editFormSubmit(data) {
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
  formEditValidClass.removeValidationErrors();
}

function addFormSubmit(values) {
  api.setNewCard(values)
    .then((result) => {
      cardList.addItem(createCard(result));
      formAddValidClass.removeValidationErrors();
    })
    .catch((err) => {
      showErrorMessage(err);
    })
}

function changeFormSubmit(values) {
  formAvatarValidClass.removeValidationErrors();
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
    })
    .catch((err) => {
      showErrorMessage(err);
    })


  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();
  formAvatarValidClass.enableValidation();
  const formAddCard = new PopupWithForm('.popup_add', addFormSubmit);
  const formEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
  const formChangeAvatar = new PopupWithForm('.popup_change-avatar', changeFormSubmit);
  formAddCard.setEventListeners();
  formEditProfile.setEventListeners();
  formChangeAvatar.setEventListeners();
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