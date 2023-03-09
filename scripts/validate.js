const validSettings = {
    formSelector: '.form',
    inputSelector: '.form-input',
    submitButtonSelector: '.form-submit',
    inputErrorClass: 'form-input_type_error',
    errorClass: 'error-message_visible',
}

//функция показывает сообщение об ошибке на любом инпуте
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${validSettings.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${validSettings.errorClass}`);
};

//функция скрывает сообщение об ошибке на любом инпуте
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validSettings.inputErrorClass}`);
    errorElement.classList.remove(`${validSettings.errorClass}`);
    errorElement.textContent = '';
};

//функция проверки валидности инпутов, выдающая/скрывающая еррор-месседжи
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//переключатель классов кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "true");
    } else {
        buttonElement.removeAttribute("disabled");
    }
}

//слушатель инпутов
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`${validSettings.inputSelector}`));
    const buttonElement = formElement.querySelector(`${validSettings.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function enableValidation(properties) {
    const formList = Array.from(document.querySelectorAll(`${properties.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

document.addEventListener('DOMContentLoaded', function () {
    enableValidation(validSettings);
})