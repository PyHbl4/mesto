export class Card {
    constructor(data, templateSelector, myID, handleCardClick, toggleCardLike, openDeletePopup, submitform) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._imgLink = data.link;
        this._handleCardClick = handleCardClick;
        this._toggleCardLike = toggleCardLike;
        this._openDeletePopup = openDeletePopup;
        this._submitform = submitform;
        this._countOfLikes = data.likes.length;
        this._ownerID = data.owner._id;
        this._myID = myID;
        this._cardId = data._id;
        this._likesArray = data.likes;
    }

    _isLikedByMe() {
        this._isLiked = this._likesArray.some(user => user._id === this._myID);
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
        if (this._myID !== this._ownerID) {
            this._cardDeletButton.remove();
        }
        this._cardLikeButton = cardElement.querySelector('.element__like');
        this._cardLikesCount = cardElement.querySelector('.element__likes-count');
        this._cardLikeButton.setAttribute('data-id', this._cardId);
        return cardElement;
    }

    _deleteCard() {
        this._element.remove();
    }

    _like(evt) {
        if (this._isLiked) {
            this._toggleCardLike(this._cardId, "DELETE", this._cardLikesCount);
            this._isLiked = !this._isLiked;
            evt.target.classList.remove('element__like_active');
        } else {
            this._toggleCardLike(this._cardId, "PUT", this._cardLikesCount);
            this._isLiked = !this._isLiked;
            evt.target.classList.add('element__like_active');
        }
    }

    _setEventListeners() {
        this._cardDeletButton.addEventListener('click', () => {
            this._openDeletePopup(this._cardId);
            this._submitform.addEventListener('submit', this._deleteCard.bind(this))
        });

        this._submitform.removeEventListener('submit', this._deleteCard)

        this._cardImage.addEventListener('click', this._handleCardClick)

        this._cardLikeButton.addEventListener('click', (evt) => {
            this._like(evt);
        })
    }

    generateCard() {
        this._isLikedByMe();
        this._element = this._getTemplate();
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._imgLink;
        this._cardImage.alt = `фото: ${this._name}`;
        this._cardLikesCount.textContent = this._countOfLikes;
        if (this._isLiked) {
            this._cardLikeButton.classList.add('element__like_active');
        }
        this._setEventListeners();
        return this._element;
    }

}