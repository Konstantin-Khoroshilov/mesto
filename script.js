let editButton = document.querySelector('.profile__edit-button');//добавить в переменную ссылку на кнопку "Редактировать"
let popupCloseButton = document.querySelector('.popup__close-button');//добавить в переменную ссылку на  кнопку "Закрыть"
let popupSaveButton = document.querySelector('.popup__save-button');//добавить в переменную ссылку на кнопку "Сохранить"
let profileName = document.querySelector('.profile__name');////добавить в переменную ссылку на поле "имя" на странице
let profileJob = document.querySelector('.profile__job');//добавить в переменную ссылку на поле "профессия" на странице
let popup = document.querySelector('.popup');//добавить в переменную ссылку на  всплывающее окно
let formElement = document.querySelector('.popup__container');//добавить в переменную ссылку на форму из всплывающего окна
let popupName = document.querySelector('[name = "profile-name"]');//добавить в переменную ссылку на поле "имя" в всплывающем окне
let popupJob = document.querySelector('[name = "profile-job"]');//добавить в переменную ссылку на поле "профессия" в всплывающем окне

function displayPopup() {
  if(!popup.classList.contains('popup_opened')) {
    popupName.value = profileName.textContent;//записать имя профиля со страницы в соответсвующее поле всплывающего окна
    popupJob.value = profileJob.textContent;//записать профессию профиля со страницы в соответсвующее поле всплывающего окна
    popup.classList.add('popup_opened');//добавить класс popup_opened, т.е. отобразить всплывающее окно
  }
  else {
    popup.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;//записать имя профиля из всплывающего окна в соответсвующее поле на странице
  profileJob.textContent = popupJob.value;//записать профессию профиля из всплывающего окна в соответсвующее поле на странице
  popup.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', displayPopup);//по клику на кнопку "Редактировать" выполнить displayPopup(), т.е. отобразить всплывающее окно
popupCloseButton.addEventListener('click', displayPopup);//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно без сохранения