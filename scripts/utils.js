import escapeHandler from "./index.js";
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupImageViewer = document.querySelector('.popup_type_image-viewer');

//функция отображает или скрывает попап добавляя или удаляя класс 'popup_opened'
const displayPopup = (popup) => {
    //если попап не открыт
    if (!popup.classList.contains('popup_opened')) {
        //открыть попап
        popup.classList.add('popup_opened');
        //добавить отработчик события: нажатие клавиши
        document.addEventListener('keydown', escapeHandler);
    }
    //если попап открыт
    else if (popup.classList.contains('popup_opened')) {
        //закрыть попап
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', escapeHandler);
    }
}

export {popupImage, displayPopup, popupImageViewer, popupCaption};