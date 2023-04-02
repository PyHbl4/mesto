import { Card } from './Card.js';
// const cardTemplateElement = document.getElementById('place-card').content.querySelector('.element');
const cardsContainer = document.getElementById('elements-container');
const buttonCloseEditPopup = document.querySelector('.popup_edit .popup__close-button');
const buttonCloseAddPopup = document.querySelector('.popup_add .popup__close-button');
//const buttonCloseImagePopup = document.querySelector('.image-popup .popup__close-button');
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

function createCard(cardObject) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const likeBtn = cardElement.querySelector('.element__like');
  const cardImg = cardElement.querySelector('.element__image');
  const cardDelBtn = cardElement.querySelector('.element__delete-button');
  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = cardObject.name;
  cardImg.src = cardObject.link;
  cardImg.alt = `фото: ${cardObject.name}`;
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('element__like_active');
  })
  cardImg.addEventListener('click', () => {
    imagePopupImg.src = cardImg.src;
    imagePopupImg.alt = cardImg.alt;
    imagePopupDesc.textContent = cardTitle.textContent;
    openPopup(imagePopupBody);
  })
  cardDelBtn.addEventListener('click', () => {
    cardElement.remove();
  })
  return cardElement;
}
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
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
  elementInputs.forEach(el => el.value = '');
}
function handleFormSubmit(evt) {
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
  const newCard = new Card(newObject, '#place-card');
  cardsContainer.prepend(newCard.generateCard());
  closePopup(popupAdd);
  resetFormInputs(popupAdd);
}
window.addEventListener('DOMContentLoaded', () => {

  for (let i = 0; i < initialCards.length; i++) {
    const element = initialCards[i];
    let card = new Card(element, '#place-card');
    cardsContainer.append(card.generateCard());
  }
  buttonEdit.addEventListener('click', () => {
    validateFormOnOpenPopup(popupEdit);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    openPopup(popupEdit);
  });
  buttonAdd.addEventListener('click', () => {
    validateFormOnOpenPopup(popupAdd);
    openPopup(popupAdd);
  });
  popupEdit.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popupEdit)
    }
  })
  popupAdd.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popupAdd)
    }
  })

  imagePopupBody.addEventListener('click', (evt) => {
    if (evt.target !== imagePopupImg && evt.target !== imagePopupDesc) {
      closePopup(imagePopupBody);
    }
  })
  formBodyEdit.addEventListener('submit', handleFormSubmit);
  formBodyAdd.addEventListener('submit', addFormSubmit);
});