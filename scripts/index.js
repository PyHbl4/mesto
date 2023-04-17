import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form-input',
  submitButtonSelector: '.form-submit',
  inputErrorClass: 'form-input_type_error',
  errorClass: 'error-message_visible',
}
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const inputName = document.querySelector('.edit-form__input_type_name');
const inputProfession = document.querySelector('.edit-form__input_type_profession');
const formBodyEdit = document.querySelector('.edit-form');
const formBodyAdd = document.querySelector('.add-form');
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function openPopup(element) {
  element.classList.add('popup_opened');
  window.addEventListener('keydown', closeByEsc);
}

function resetFormInputs(element) {
  const elementInputs = Array.from(element.querySelectorAll('.form-input'));
  const errorMessages = Array.from(element.querySelectorAll('.error-message_visible'))
  if (elementInputs.length > 0) {
    elementInputs.forEach(el => el.value = '');
  }
  if (errorMessages.length > 0) {
    errorMessages.forEach(el => el.textContent = '');
  }
}
function editFormSubmit(data) {
  profileName.textContent = data.name;
  resetFormInputs(popupEdit);
}
function addFormSubmit(values) {
  const newObject = [values];
  const newCard = new Section({
    items: newObject,
    renderer: (data) => {
      const card = new Card(data, "#place-card");
      const cardElement = card.generateCard();
      return cardElement;
    }
  }, '#elements-container');
  newCard.addItem();
  resetFormInputs(popupAdd);
}

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, "#place-card");
    const cardElement = card.generateCard();
    return cardElement;
  }
}, '#elements-container');

window.addEventListener('DOMContentLoaded', () => {
  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();

  cardList.renderItems();

  const imagePopup = new PopupWithImage('.image-popup');
  imagePopup.setEventListeners();

  const formAdd = new PopupWithForm('.popup_add', addFormSubmit);
  const formEdit = new PopupWithForm('.popup_edit', editFormSubmit);
  formAdd.setEventListeners();
  formEdit.setEventListeners();

  buttonEdit.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    formEdit.open();
    formEditValidClass.openingValidation();
  });
  buttonAdd.addEventListener('click', () => {
    formAdd.open();
    formAddValidClass.openingValidation();
  });
  //СТАРОЕ ОТКРЫТИЕ ПОП-АПОВ С ФОРМАМИ

  popupEdit.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      formEdit.close();
      resetFormInputs(popupEdit);
    }
  })
  popupAdd.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      formAdd.close();
      resetFormInputs(popupAdd);
    }
  })

  // formBodyEdit.addEventListener('submit', editFormSubmit);
  // formBodyAdd.addEventListener('submit', addFormSubmit);
});