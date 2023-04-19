import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../scripts/cardsData.js';
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form-input',
  submitButtonSelector: '.form-submit',
  inputErrorClass: 'form-input_type_error',
  errorClass: 'error-message_visible',
}
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.edit-form__input_type_name');
const inputProfession = document.querySelector('.edit-form__input_type_profession');
const formBodyEdit = document.querySelector('.edit-form');
const formBodyAdd = document.querySelector('.add-form');
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
function createCard(data) {
  const cardElement = new Card(data, "#place-card").generateCard();
  return cardElement;
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
window.addEventListener('DOMContentLoaded', () => {
  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();
  cardList.renderItems();
  const imagePopup = new PopupWithImage('.image-popup');
  imagePopup.setEventListeners();
  const formAddCard = new PopupWithForm('.popup_add', addFormSubmit);
  const formEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
  formAddCard.setEventListeners();
  formEditProfile.setEventListeners();
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
});