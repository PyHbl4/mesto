import Popup from './Popup.js';
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.button = this._popup.querySelector('.submit-button');
        this._buttonText = this.button.textContent;
    }

    setAnotherText(text) {
        this.button.textContent = text;
    }

    setOriginalText() {
        this.button.textContent = this._buttonText;
    }

    close() {
        super.close();
        this.setOriginalText();
    }
}