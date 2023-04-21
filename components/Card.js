export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._imgLink = data.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        this._cardImage = cardElement.querySelector('.element__image');
        this._cardTitle = cardElement.querySelector('.element__title');
        this._cardDeletButton = cardElement.querySelector('.element__delete-button');
        this._cardLikeButton = cardElement.querySelector('.element__like');
        return cardElement;
    }

    _deleteCard() {
        this._element.remove();
    }

    _like(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._cardDeletButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', this._handleCardClick)

        this._cardLikeButton.addEventListener('click', (evt) => {
            this._like(evt);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._imgLink;
        this._cardImage.alt = `фото: ${this._name}`;
        this._setEventListeners();
        return this._element;
    }

}