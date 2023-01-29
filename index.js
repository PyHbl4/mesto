window.addEventListener('DOMContentLoaded', () => {
    let closeButton = document.querySelector('.popup__close-icon');
    let editButton = document.querySelector('.profile__edit-button');
    let profileName = document.querySelector('.profile__title');
    let profileProfession = document.querySelector('.profile__subtitle');
    let popup = document.querySelector('.popup');
    let inputName = document.querySelector('.edit-form__input_type_name');
    let inputProfession = document.querySelector('.edit-form__input_type_profession');
    let formBody = document.querySelector('.edit-form')
    function openPopup() {
        popup.classList.add('popup_opened');
        document.body.style.overflow = 'hidden';
        inputName.value = `${profileName.textContent}`;
        inputProfession.value = `${profileProfession.textContent}`;
    }
    function closePopup() {
        popup.classList.remove('popup_opened');
        document.body.style.overflow = 'auto';
        inputName.value = '';
        inputProfession.value = '';
    }
    editButton.addEventListener('click', openPopup);
    closeButton.addEventListener('click', closePopup);
    window.addEventListener('keyup', function(key) {
        if (key.code === 'Escape') {
            closePopup();
        }
    })
    function handleFormSubmit (evt) {
        evt.preventDefault();
        profileName.textContent = `${inputName.value}`;
        profileProfession.textContent = `${inputProfession.value}`;
        inputName.value = '';
        inputProfession.value = '';
        closePopup();
    }
    formBody.addEventListener('submit', handleFormSubmit); 
});