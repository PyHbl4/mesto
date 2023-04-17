import Popup from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.image-popup__image');
        this._description = this._popup.querySelector('.image-popup__description');
    }

    open({src, alt}) {
        this._image.src = src;
        this._image.alt = alt;
        this._description.textContent = alt;
        super.open();
    }
}