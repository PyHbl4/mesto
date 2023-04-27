import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitCallback = submitCallback;
        this._formButton = this._form.querySelector('.form__submit-button')
        this._formButtonText = this._formButton.textContent;
    }

    _getInputValues() {
        const inputs = Array.from(this._form.querySelectorAll('.form__input'));
        const values = {};
        inputs.forEach(input => values[input.name] = input.value);
        return values;
    }

    setLoadingText(text) {
        this._formButton.textContent = text;
    }

    setOriginalText() {
        this._formButton.textContent = this._formButtonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}