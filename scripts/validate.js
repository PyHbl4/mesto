const validSettings = {
    formSelector: '.form',
    inputSelector: '.form-input',
    submitButtonSelector: '.form-submit',
    inputErrorClass: 'form-input_type_error',
    errorClass: 'error-message_visible',
}

//функция показывает сообщение об ошибке на любом инпуте
const showInputError = (formElement, inputElement, errorMessage, properties) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${properties.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${properties.errorClass}`);
};

//функция скрывает сообщение об ошибке на любом инпуте
const hideInputError = (formElement, inputElement, properties) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${properties.inputErrorClass}`);
    errorElement.classList.remove(`${properties.errorClass}`);
    errorElement.textContent = '';
};

//функция проверки валидности инпутов, выдающая/скрывающая еррор-месседжи
const checkInputValidity = (formElement, inputElement, properties) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, properties);
    } else {
        hideInputError(formElement, inputElement, properties);
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

const validateFormOnOpenPopup = (popup) => {
    const inputList = Array.from(popup.querySelectorAll('.form-input'));
    const formBtn = popup.querySelector('.form-submit');
    const form = popup.querySelector('.form')
    inputList.forEach((inputElement) => {
        if (inputElement.value !== '') {
            checkInputValidity(form, inputElement, validSettings);
        } else {
            hideInputError(form, inputElement, validSettings);
        }
        toggleButtonState(inputList, formBtn);
    });
}

//слушатель инпутов
const setEventListeners = (formElement, properties) => {
    const inputList = Array.from(formElement.querySelectorAll(`${properties.inputSelector}`));
    const buttonElement = formElement.querySelector(`${properties.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, properties);
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
        setEventListeners(formElement, properties);
    });
};

document.addEventListener('DOMContentLoaded', function () {
    enableValidation(validSettings);
})