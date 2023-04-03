import { imagePopupBody } from './index.js';
import { openPopup, imagePopupImg, imagePopupDesc } from './index.js';
export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._imgLink = data.link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _deleteCard() {
        this._element.remove();
    }

    _openImagePopup() {
        imagePopupImg.src = this._imgLink;
        imagePopupImg.alt = `фото: ${this._name}`;
        imagePopupDesc.textContent = this._name;
        openPopup(imagePopupBody);
    }

    _like(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openImagePopup();
        })

        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._like(evt);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._imgLink;
        this._element.querySelector('.element__image').alt = `фото: ${this._name}`;
        this._setEventListeners();
        return this._element;
    }

}