window.addEventListener('DOMContentLoaded', () => {
    const cardTemplateElement = document.getElementById('place-card').content.querySelector('.element');
    const cardsContainer = document.getElementById('elements-container');
    const buttonsClose = document.querySelectorAll('.popup__close-button');
    const buttonEdit = document.querySelector('.profile__edit-button');
    const buttonAdd = document.querySelector('.profile__add-button');
    const profileName = document.querySelector('.profile__title');
    const profileProfession = document.querySelector('.profile__subtitle');
    const popupEdit = document.querySelector('.popup_edit');
    const popupAdd = document.querySelector('.popup_add');
    const inputName = document.querySelector('.edit-form__input_type_name');
    const inputProfession = document.querySelector('.edit-form__input_type_profession');
    const inputPlaceName = document.querySelector('.add-form__input_type_name');
    const inputPlaceImgUrl = document.querySelector('.add-form__input_type_image');
    const formBodyEdit = document.querySelector('.edit-form');
    const formBodyAdd = document.querySelector('.add-form');
    const imagePopupBody = document.querySelector('.image-popup');
    const imagePopupImg = imagePopupBody.querySelector('.image-popup__image');
    const imagePopupDesc = imagePopupBody.querySelector('.image-popup__description');
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Екатеринбург',
            link: 'http://s1.fotokto.ru/photo/full/181/1815420.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Каракол',
            link: 'http://s1.fotokto.ru/photo/full/276/2760112.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

    function createCard(cardObject) {
        const cardElement = cardTemplateElement.cloneNode(true);
        const likeBtn = cardElement.querySelector('.element__like');
        const cardImg = cardElement.querySelector('.element__image');
        const cardDelBtn = cardElement.querySelector('.element__delete-button');
        const cardTitle = cardElement.querySelector('.element__title');
        cardTitle.textContent = cardObject.name;
        cardImg.src = cardObject.link;
        cardImg.alt = `фото: ${cardObject.name}`;
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('element__like_active');
        })
        cardImg.addEventListener('click', () => {
            imagePopupImg.src = cardImg.src;
            imagePopupImg.alt = cardImg.alt;
            imagePopupDesc.textContent = cardTitle.textContent;
            openPopup('image');
        })
        cardDelBtn.addEventListener('click', () => {
            cardElement.remove();
        })
        return cardElement;
    }
    function openPopup(type) {
        if (type === 'edit') {
            popupEdit.classList.add('popup_opened');
            inputName.value = profileName.textContent;
            inputProfession.value = profileProfession.textContent;
        } else if (type === 'add') {
            popupAdd.classList.add('popup_opened');
        } else if (type === 'image') {
            imagePopupBody.classList.add('popup_opened');
        }
    }
    function closePopup() {
        imagePopupBody.classList.remove('popup_opened');
        popupAdd.classList.remove('popup_opened');
        popupEdit.classList.remove('popup_opened');
        inputName.value = '';
        inputProfession.value = '';
        inputPlaceImgUrl.value = '';
        inputPlaceName.value = '';
    }
    function handleFormSubmit(evt) {
        evt.preventDefault();
        profileName.textContent = inputName.value;
        profileProfession.textContent = inputProfession.value;
        inputName.value = '';
        inputProfession.value = '';
        closePopup();
    }
    function addFormSubmit(evt) {
        evt.preventDefault();
        const newObject = {
            name: `${inputPlaceName.value}`,
            link: `${inputPlaceImgUrl.value}`
        }
        cardsContainer.prepend(createCard(newObject));
        closePopup();
    }
    for (let i = 0; i < initialCards.length; i++) {
        const element = initialCards[i];
        cardsContainer.append(createCard(element));
    }
    buttonEdit.addEventListener('click', () => { openPopup('edit') });
    buttonAdd.addEventListener('click', () => { openPopup('add') });
    for (let i = 0; i < buttonsClose.length; i++) {
        const element = buttonsClose[i];
        element.addEventListener('click', closePopup);
    }
    formBodyEdit.addEventListener('submit', handleFormSubmit);
    formBodyAdd.addEventListener('submit', addFormSubmit);
});