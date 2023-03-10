# Проект: Место

## Описание проекта:

Лэндинг с карточками российских мест, привлекательных для путешествий и возможностью редактировать данные "профиля"

## Использованные технологии:

HTML|CSS|JS(functions, DOM, events)

## Ссылка на GH-pages:

 [Mesto](https://pyhbl4.github.io/mesto/)


## Примечания:

~~Немного отошел от ТЗ в той части, где указывалось, как именно нужно скрывать попап-блок со страницы. Сделал плавное появление/скрытие блока через прозрачность + z-index. Также, реализовал закрытие попапа через клавишу Escape на клавиатуре и "заморозил" скроллинг страницы при открытом попапе с формой.~~
Осознал, убрал, не повторится.

### UPD_1
В процессе рефакторинга выявил неприятный баг, а именно: если открыть форму, сделать поле (или поля) невалидным(-и) и закрыть поп-ап, при следующем открытии под полями висят ошибки. Особенно это напрягает в форме редактирования данных, где, исходя из ТЗ, форма по-умолчанию имеет валидные поля при открытии (информация подгружается в инпуты). Проблему решил, немного усложнив функцию открытия поп-апов:
```function openPopup(element) {
    element.classList.add('popup_opened');
    window.addEventListener('keydown', closeByEsc);
    const form = element.querySelector('.form');
    if (form) {
      const inputList = Array.from(element.querySelectorAll('.form-input'));
      const formBtn = element.querySelector('.form-submit');
      inputList.forEach((inputElement) => {
        if (inputElement.value !== '') {
          checkInputValidity(form, inputElement, validSettings);
          toggleButtonState(inputList, formBtn);
        } else {
          hideInputError(form, inputElement, validSettings);
        }
      });
    }
  }
```
### UPD_2

Профиксил еще один баг, указанный ревьюером. Вынес функционал валидации формы при открытии в отдельную функцию (спасибо, ревьюер) и запустил в обработчиках открытия поп-апов с формами + немного ее допилил.

```
const validateFormOnOpenPopup = (popup) => {
    const inputList = Array.from(popup.querySelectorAll('.form-input'));
    const formBtn = popup.querySelector('.form-submit');
    const form = popup.querySelector('.form')
    inputList.forEach((inputElement) => {
        if (inputElement.value !== '') {
            checkInputValidity(form, inputElement, validSettings);
        } else {
            hideInputError(form, inputElement, validSettings);
        }
        toggleButtonState(inputList, formBtn);
    });
}
```
