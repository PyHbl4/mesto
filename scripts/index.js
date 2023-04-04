import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form-input',
  submitButtonSelector: '.form-submit',
  inputErrorClass: 'form-input_type_error',
  errorClass: 'error-message_visible',
}
const cardsContainer = document.getElementById('elements-container');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const inputName = document.querySelector('.edit-form__input_type_name');
const inputProfession = document.querySelector('.edit-form__input_type_profession');
const inputPlaceName = document.querySelector('.add-form__input_type_name');
const inputPlaceImgUrl = document.querySelector('.add-form__input_type_image');
const formBodyEdit = document.querySelector('.edit-form');
const formBodyAdd = document.querySelector('.add-form');
const formEditValidClass = new FormValidator(validSettings, formBodyEdit);
const formAddValidClass = new FormValidator(validSettings, formBodyAdd);
export const imagePopupBody = document.querySelector('.image-popup');
export const imagePopupImg = imagePopupBody.querySelector('.image-popup__image');
export const imagePopupDesc = imagePopupBody.querySelector('.image-popup__description');
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


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
      resetFormInputs(openedPopup);
    }
  }
}
export function openPopup(element) {
  element.classList.add('popup_opened');
  window.addEventListener('keydown', closeByEsc);
}
function closePopup(element) {
  element.classList.remove('popup_opened');
  window.removeEventListener('keydown', closeByEsc);
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
function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEdit);
  resetFormInputs(popupEdit);
}
function addFormSubmit(evt) {
  evt.preventDefault();
  const newObject = {
    name: `${inputPlaceName.value}`,
    link: `${inputPlaceImgUrl.value}`
  }
  cardsContainer.prepend(addCard(newObject, '#place-card'));
  closePopup(popupAdd);
  resetFormInputs(popupAdd);
}
function addCard(cardObject, selector) {
  let card = new Card(cardObject, selector);
  return card.generateCard();
}
window.addEventListener('DOMContentLoaded', () => {
  formEditValidClass.enableValidation();
  formAddValidClass.enableValidation();
  for (let i = 0; i < initialCards.length; i++) {
    const element = initialCards[i];
    cardsContainer.append(addCard(element, '#place-card'));
  }
  buttonEdit.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    openPopup(popupEdit);
    formEditValidClass.openingValidation();
  });
  buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    formAddValidClass.openingValidation();
  });
  popupEdit.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popupEdit)
      resetFormInputs(popupEdit);
    }
  })
  popupAdd.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popupAdd);
      resetFormInputs(popupAdd);
    }
  })
  imagePopupBody.addEventListener('click', (evt) => {
    if (evt.target !== imagePopupImg && evt.target !== imagePopupDesc) {
      closePopup(imagePopupBody);
    }
  })
  formBodyEdit.addEventListener('submit', editFormSubmit);
  formBodyAdd.addEventListener('submit', addFormSubmit);
});