export class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
        this._buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        if (this._formElement.checkValidity()) {
            this._buttonSubmitElement.removeAttribute('disabled');
        } else {
            this._buttonSubmitElement.setAttribute('disabled', 'true');
        }
    }

    openingValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
        this._buttonSubmitElement.setAttribute('disabled', 'true');
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    }
}