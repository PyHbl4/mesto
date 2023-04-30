export class Card {
    constructor(data, templateSelector, myID, handleCardClick, toggleCardLike, openSubmitPopup, closeSubmitPopup, initDeleteCard, showDeleteErr, submitButton) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._imgLink = data.link;
        this._handleCardClick = handleCardClick;
        this._toggleCardLike = toggleCardLike;
        this._initDeleteCard = initDeleteCard;
        this._openSubmitPopup = openSubmitPopup;
        this._closeSubmitPopup = closeSubmitPopup;
        this._submitButton = submitButton;
        this._showDeleteErr = showDeleteErr;
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
        this._cardDeleteButton = cardElement.querySelector('.element__delete-button');
        if (this._myID !== this._ownerID) {
            this._cardDeleteButton.remove();
        }
        this._cardLikeButton = cardElement.querySelector('.element__like');
        this._cardLikesCount = cardElement.querySelector('.element__likes-count');
        return cardElement;
    }

    _deleteCard() {
        Promise.resolve(this._initDeleteCard())
            .then((res) => {
                if (res.message === "Пост удалён") {
                    this._element.remove();
                    this._closeSubmitPopup();
                } else {
                    this._showDeleteErr();
                }
            })
            .catch((err) => {
                this._showDeleteErr();
            });
    }

    _like(evt) {
        let isLiked = this._isLiked;
        if (isLiked) {
            const like = Promise.resolve(this._toggleCardLike(this._cardId, "DELETE", this._cardLikesCount));
            like.then((res) => {
                if (res) {
                    evt.target.classList.remove('element__like_active');
                    isLiked = !isLiked;
                } else {
                    console.log('Ошибка выполнения запроса');
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this._isLiked = isLiked;
            })
        } else {
            const like = Promise.resolve(this._toggleCardLike(this._cardId, "PUT", this._cardLikesCount));
            like.then((res) => {
                if (res) {
                    evt.target.classList.add('element__like_active');
                    isLiked = !isLiked;
                } else {
                    console.log('Ошибка выполнения запроса');
                }
            })
                .finally(() => {
                    this._isLiked = isLiked;
                })
        }
    }

    _setEventListeners() {
        this._cardDeleteButton.addEventListener('click', () => {
            this._submitButton.dataset.cardId = this._cardId;
            this._openSubmitPopup();
            this._submitButton.onclick = this._deleteCard.bind(this);
        });

        this._cardImage.addEventListener('click', this._handleCardClick);

        this._cardLikeButton.addEventListener('click', (evt) => {
            this._like(evt);
        });
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