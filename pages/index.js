import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialInfo, validSettings, buttonEdit, buttonAdd, buttonChange, inputName, inputProfession, formBodyEdit, formBodyAdd, formBodyAvatar, formBodyDelete } from '../utils/constants.js';
import { Api } from '../components/Api.js';
window.addEventListener('DOMContentLoaded', () => {
  const formAddCard = new PopupWithForm('.popup_add', addFormSubmit);
  const formEditProfile = new PopupWithForm('.popup_edit', editFormSubmit);
  const formChangeAvatar = new PopupWithForm('.popup_change-avatar', changeFormSubmit);
  const formDeleteCard = new PopupWithConfirmation('.delete-popup');
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
  //<размещаем инфу с сервера на странице>
  function createCard(data) {
    const cardElement = new Card(data, "#place-card", userID, () => handleCardClick({ src: data.link, alt: data.name }), toggleCardLike, openSubmitPopup, closeSubmitPopup, initDeleteCard, showDeleteErr, formDeleteCard.button);
    return cardElement.generateCard();
  }
  function getInitialCards() {
    return api.getInitialCards()
      .then((result) => {
        const cardResult = result;
        return cardResult;
      })
      .catch((err) => {
        return err;
      })
  }
  function getUserInfo() {
    return api.getUserInfo()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      })
  }
  const setInfoInPage = Promise.all([getInitialCards(), getUserInfo()])
  setInfoInPage.then(([cardResult, user]) => {
    userID = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    cardList = new Section({
      items: cardResult,
      renderer: (data) => {
        return createCard(data);
      }
    }, '#elements-container');
    cardList.renderItems();
  }).catch((err) => {
    showErrorMessage(err);
  })
  //</размещаем инфу с сервера на странице>
  // <размещаем инфу о пользователе по сабмиту формы>
  function getProfileInfo(data) {
    const info = {
      name: data.name,
      about: data.profession
    }
    return api.setUserInfo(info);
  }
  function editFormSubmit(data) {
    const setInfo = Promise.resolve(getProfileInfo(data));
    formEditProfile.setAnotherText('Сохранение...');
    setInfo
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        formEditProfile.close();
        formEditProfile.setOriginalText();
        formEditValidClass.removeValidationErrors();
      })
      .catch((err) => {
        formEditProfile.setAnotherText('Ошибка!');
        showErrorMessage(err);
      })
  }
  // </размещаем инфу о пользователе по сабмиту формы>
  //<добавляем новую карточку в DOM>
  function addCardRequest(values) {
    return api.setNewCard(values);
  }
  function addFormSubmit(values) {
    const request = Promise.resolve(addCardRequest(values));
    formAddCard.setAnotherText('Сохранение...');
    request
      .then((result) => {
        cardList.addItem(createCard(result));
        formAddValidClass.removeValidationErrors();
        formAddCard.close();
      })
      .catch((err) => {
        formAddCard.setAnotherText('Ошибка!');
        showErrorMessage(err);
      });
  }
  //</добавляем новую карточку в DOM>
  //<обработка лайка>
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
  //</обработка лайка>
  //<открытие попапа с изображением>
  function handleCardClick(src, alt) {
    popupImage.open(src, alt);
  }
  //</открытие попапа с изображением>
  //<изменение аватара>
  function changeAvatarRequest(data) {
    return api.changeAvatar(data);
  }
  function changeFormSubmit(values) {
    const request = Promise.resolve(changeAvatarRequest(values))
    formChangeAvatar.setAnotherText('Сохранение...');
    request
      .then((result) => {
        userInfo.setUserAvatar(result.avatar);
        formAvatarValidClass.removeValidationErrors();
        formChangeAvatar.close();
      })
      .catch((err) => {
        formChangeAvatar.setAnotherText('Ошибка!');
        showErrorMessage(err);
      });
  }
  //</изменение аватара>
  //<функционал удаления карточки>
  function openSubmitPopup() {
    formDeleteCard.open();
  }

  function closeSubmitPopup() {
    formDeleteCard.close();
  }

  function showDeleteErr() {
    formDeleteCard.setAnotherText('Ошибка!');
  }

  function initDeleteCard() {
    formDeleteCard.setAnotherText('Удаление...');
    return api.deleteCard(formDeleteCard.button.dataset.cardId);
  }
  //</функционал удаления карточки>
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