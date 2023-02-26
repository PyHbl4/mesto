window.addEventListener('DOMContentLoaded', () => {
    const cardTemplate = document.getElementById('place-card').content;
    let likeBtns;
    let deleteBtns;
    const cardsContainer = document.getElementById('elements-container');
    let closeButton = document.querySelector('.popup__close-button');
    let editButton = document.querySelector('.profile__edit-button');
    let addButton = document.querySelector('.profile__add-button');
    let profileName = document.querySelector('.profile__title');
    let profileProfession = document.querySelector('.profile__subtitle');
    let popup = document.querySelector('.popup');
    let inputName = document.querySelector('.edit-form__input_type_name');
    let inputProfession = document.querySelector('.edit-form__input_type_profession');
    let inputPlaceName = document.querySelector('.add-form__input_type_name');
    let inputPlaceImgUrl = document.querySelector('.add-form__input_type_image');
    let editFormBody = document.querySelector('.edit-form');
    let addFormBody = document.querySelector('.add-form');
    let cardImages;
    let imagePopupBody = document.querySelector('.image-popup');
    let closeImagePopupBtn = document.querySelector('.image-popup__close-icon');
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
            liked: false
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
            liked: false
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
            liked: false
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
            liked: false
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
            liked: false
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
            liked: false
        }
    ];
    function addCardItemsListeners() { //слушатели, вешающиеся на элементы внутри карт
        deleteBtns = document.querySelectorAll('.element__delete-button'); //переопределяем кнопки удаления
        for (let i = 0; i < deleteBtns.length; i++) { // слушатель удаления
            const element = deleteBtns[i];
            element.addEventListener('click', () => deleteCard(i))
        }
        likeBtns = document.querySelectorAll('.element__like'); // переопределяем кнопки лайков
        for (let i = 0; i < likeBtns.length; i++) { //слушатель лайка
            const element = likeBtns[i];
            element.addEventListener('click', () => {
                initialCards[i].liked = !initialCards[i].liked;
                element.classList.toggle('element__like_active');
            })
        }
        cardImages = document.querySelectorAll('.element__image');
        for (let i = 0; i < cardImages.length; i++) {
            const element = cardImages[i];
            element.addEventListener('click', () => {
                let cardTitle = element.parentNode.querySelector('.element__title').textContent;
                imagePopupBody.querySelector('.image-popup__image').src = element.src;
                imagePopupBody.querySelector('.image-popup__image').alt = element.alt;
                imagePopupBody.querySelector('.image-popup__description').textContent = cardTitle;
                imagePopupBody.classList.add('image-popup_opened');
            })
        }
    }
    function addCards() { // функция добавления карточек. Внутри - слушатели, вешающиеся на элементы внутри карт (обновляются с каждым вызовом)
        cardsContainer.innerHTML = '';
        for (let i = 0; i < initialCards.length; i++) { // цикл вывода карточек из массива
            const element = initialCards[i];
            let cardElement = cardTemplate.cloneNode(true);
            cardElement.querySelector('.element__title').textContent = element.name;
            cardElement.querySelector('.element__image').src = element.link;
            cardElement.querySelector('.element__image').alt = `фото: ${element.name}`;
            if (element.liked) {
                cardElement.querySelector('.element__like').classList.add('element__like_active');
            }
            cardsContainer.append(cardElement);
        }
        addCardItemsListeners();
    }
    function deleteCard(index) {
        initialCards.splice(index, 1);
        addCards();
    }
    function openEditPopup() {
        popup.classList.add('popup_opened');
        popup.querySelector('.edit-form').classList.remove('edit-form_hidden');
        popup.querySelector('.add-form').classList.add('add-form_hidden');
        popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
        inputName.value = profileName.textContent;
        inputProfession.value = profileProfession.textContent;
    }
    function openAddPopup() {
        popup.classList.add('popup_opened');
        popup.querySelector('.edit-form').classList.add('edit-form_hidden');
        popup.querySelector('.add-form').classList.remove('add-form_hidden');
        popup.querySelector('.popup__title').textContent = 'Новое место';
    }
    
    function closePopup() {
        popup.classList.remove('popup_opened');
        popup.querySelector('.edit-form').classList.add('edit-form_hidden');
        popup.querySelector('.add-form').classList.add('add-form_hidden');
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
        let newObject = {
            name: `${inputPlaceName.value}`,
            link: `${inputPlaceImgUrl.value}`,
            liked: false
        }
        initialCards.unshift(newObject);
        addCards();
        closePopup();
    }
    function closeImagePopup() {
        imagePopupBody.classList.remove('image-popup_opened');
    }
    addCards();
    editButton.addEventListener('click', openEditPopup);
    addButton.addEventListener('click', openAddPopup);
    closeButton.addEventListener('click', closePopup);
    closeImagePopupBtn.addEventListener('click', closeImagePopup);
    // window.addEventListener('keyup', function(key) {
    //     if (key.code === 'Escape') {
    //         closePopup();
    //     }
    // })
    editFormBody.addEventListener('submit', handleFormSubmit);
    addFormBody.addEventListener('submit', addFormSubmit);
});