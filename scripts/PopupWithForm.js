import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        const inputs = Array.from(this._form.querySelectorAll('.form-input'));
        const values = {};
        inputs.forEach(input => values[input.name] = input.value);
        console.log(values);
        return values;
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