import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../scripts/cardsData.js';
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
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
const formAvatarValidClass = new FormValidator(validSettings, formBodyAvatar);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const popupImage = new PopupWithImage('.image-popup');
popupImage.setEventListeners();

function handleCardClick(src, alt) {
  popupImage.open(src, alt);

}

function createCard(data) {
  const cardElement = new Card(data, "#place-card", () => handleCardClick({ src: data.link, alt: data.name }));
  return cardElement.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    return createCard(data);
  }
}, '#elements-container');

function editFormSubmit(data) {
  userInfo.setUserInfo(data.name, data.profession);
  formEditValidClass.removeValidationErrors();
}

function addFormSubmit(values) {
  cardList.addItem(createCard(values));
  formAddValidClass.removeValidationErrors();
}

function changeFormSubmit(values) {
  formAvatarValidClass.removeValidationErrors();
}

window.addEventListener('DOMContentLoaded', () => {
  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();
  formAvatarValidClass.enableValidation();
  cardList.renderItems();
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