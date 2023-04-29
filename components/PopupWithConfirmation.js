import Popup from './Popup.js';
export class PopupSubmit extends Popup {
    constructor(popupSelector, clickButtonCallback) {
        super(popupSelector);
        this._clickButtonCallback = clickButtonCallback;
    }
}