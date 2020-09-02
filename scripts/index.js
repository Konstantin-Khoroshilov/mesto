import Card from './Card.js';
import cards from './initialCards.js';
import FormValidator from './FormValidator.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileEditorCloseButton = document.querySelector('.popup__close-button_type_profile-editor');
const cardsInputterCloseButton = document.querySelector('.popup__close-button_type_cards-inputter');
const imageViewerCloseButton = document.querySelector('.popup__close-button_type_image-viewer');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
const popupProfileEditor = document.querySelector('.popup_type_profile-editor');
const popupCardInputter = document.querySelector('.popup_type_cards-inputter');
const popupImageViewer = document.querySelector('.popup_type_image-viewer');
const editProfileForm = document.querySelector('[name = "profile"]');
const addCardForm = document.querySelector('[name = "cards-inputter"]');
const popupName = document.querySelector('[name = "profile-name"]');
const popupJob = document.querySelector('[name = "profile-job"]');
const cardsContainer = document.querySelector('.cards__container');
const addCardFormSaveButton = document.querySelector('.popup__save-button_type_cards-inputter');
const popupImage = document.querySelector('.popup__image');
const cardTemplate = document.querySelector('.template');

//создать отработчик события
const escapeHandler = (evt) => {
  //если нажата клавиша Escape
  if (evt.key === 'Escape') {
    //закрыть попап
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    //удалить отработчик события
    document.removeEventListener('keydown', escapeHandler);
  }
};

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
  }
}

//функция добавляет начальные карточки. Текст заголовков и ссылки для изображений берёт из массива, передаваемого функции в качестве аргумента
const addInitialCards = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    //создать карточку. Название, ссылку на изображение и alt взять из элемента массива. После создания карточки добавить её в контейнер
    const card = new Card (cardTemplate, cards[i].name, cards[i].link, cards[i].alt);
    cardsContainer.prepend(card.getCard());
  }
}

addInitialCards(cards);

//отработчик формы редактирования профиля
const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;//записать имя профиля из всплывающего окна в соответсвующее поле на странице
  profileJob.textContent = popupJob.value;//записать профессию профиля из всплывающего окна в соответсвующее поле на странице
  displayPopup(popupProfileEditor); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}

//отработчик формы добавления карточки
const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы.
  const cardNameInput = document.querySelector('[name = "card-name"]');
  const cardLinkInput = document.querySelector('[name = "card-link"]');
  const newCardName = cardNameInput.value;//добавляет название карточки, полученное из формы, в переменную
  const newCardLink = cardLinkInput.value;//добавляет url картинки, полученный из формы, в переменную
  const newCard = new Card(cardTemplate, newCardName, newCardLink);//создать карточку, используя полученные из формы данные
  cardsContainer.prepend (newCard.getCard());// добавить новую карточку в контейнер
  cardNameInput.value = '';//очистить поле "Название" во всплывающем окне
  cardLinkInput.value = '';//очистить поле "Ссылка на картинку" во всплывающем окне
  //отключить кнопку submit
  addCardFormSaveButton.disabled = true;
  //добавить кнопке класс отключения
  addCardFormSaveButton.classList.add('popup__save-button_disabled');
  displayPopup(popupCardInputter); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}

//очистить визуальные эффекты валидации
const clearValidation = (errorClass, inputs, errorMessageContainers, enableButton, button, buttonDisableClass) => {
  //удалить для всех инпутов стилизацию под ошибочный инпут
  Array.from(inputs).forEach((input) => {
    input.classList.remove(errorClass);
  });
  //очистить сообщения об ошибке
  Array.from(errorMessageContainers).forEach((errorMessageContainer) => {
    errorMessageContainer.textContent = '';
  });
  //если нужно активировать кнопку
  if (enableButton) {
    //удалить атрибут disabled
    button.disabled = false;
    //удалить стилизацию под выключенную кнопку
    button.classList.remove(buttonDisableClass);
  }
}

// Прикрепляем обработчики к формам:
//обработка формы редактирования профиля:
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
//обработка формы добавления карточки:
addCardForm.addEventListener('submit', addCardFormSubmitHandler);

//по клику на кнопку "Добавить" выполнить displayPopup(), т.е. отобразить всплывающее окно добавления карточки
addButton.addEventListener('click', () => {
  displayPopup(popupCardInputter);
});

//по клику на кнопку "Редактировать" 
editButton.addEventListener('click', () => {
  popupName.value = profileName.textContent; //записать имя профиля со страницы в соответсвующее поле всплывающего окна 
  popupJob.value = profileJob.textContent; //записать профессию профиля со страницы в соответсвующее поле всплывающего окна
  displayPopup(popupProfileEditor); //выполнить displayPopup(), т.е. отобразить всплывающее окно редактирования профиля
});

//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно редактирования профиля без сохранения
profileEditorCloseButton.addEventListener('click', () => {
  displayPopup(popupProfileEditor);
  //очистить визуальные эффекты валидации
  clearValidation(
    'popup__text-input_type_error',
    editProfileForm.querySelectorAll('.popup__text-input'),
    editProfileForm.querySelectorAll('.popup__error-message-container'),
    true,
    editProfileForm.querySelector('.popup__save-button_type_profile-editor'),
    'popup__save-button_disabled'
  );
});

//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно просмотра изображения
imageViewerCloseButton.addEventListener('click', () => {
  displayPopup(popupImageViewer);
});

//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно добавления карточки без сохранения
cardsInputterCloseButton.addEventListener('click', () => {
  displayPopup(popupCardInputter);
  //очистить визуальные эффекты валидации
  clearValidation(
    'popup__text-input_type_error',
    addCardForm.querySelectorAll('.popup__text-input'),
    addCardForm.querySelectorAll('.popup__error-message-container')
  );
});

//каждому попапу добавить слушатель
Array.from(popups).forEach((item) => {
  //по клику на попап (на оверлей) закрыть его
  item.addEventListener('click', (evt) => {
    evt.target.classList.remove('popup_opened');
  });
});

//элементы для валидации
const itemsToValidate = {
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error-message-container'
};

//добавить валидацию формы добавления карточки
const addCardFormValidation = new FormValidator(itemsToValidate, addCardForm);
addCardFormValidation.enableValidation();

//добавть валидацию формы редактирования профиля
const editProfileFormValidation = new FormValidator(itemsToValidate, editProfileForm);
editProfileFormValidation.enableValidation();

export {popupImage, displayPopup, popupImageViewer};
