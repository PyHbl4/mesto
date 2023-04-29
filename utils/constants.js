export const initialInfo = {
    apiUrl: 'https://mesto.nomoreparties.co/v1',
    cohort: '/cohort-64',
    token: 'a7c3f1ef-90a8-4cfe-beac-9f368d375108',
    pathToCards: '/cards',
    pathToMyCard: '/users/me',
    pathToMyAvatar: '/avatar'
};
export const validSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form-submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'error-message_visible',
}
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonChange = document.querySelector('.profile__avatar-button');
export const inputName = document.getElementById('edit-name');
export const inputProfession = document.getElementById('edit-profession');
export const formBodyEdit = document.querySelector('.edit-form');
export const formBodyAdd = document.querySelector('.add-form');
export const formBodyAvatar = document.querySelector('.change-avatar-form');
export const formBodyDelete = document.querySelector('.delete-form');