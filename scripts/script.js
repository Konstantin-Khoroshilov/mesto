const editButton = document.querySelector('.profile__edit-button');//добавить в константу ссылку на кнопку "Редактировать"
const popupCloseButton = document.querySelector('.popup__close-button');//добавить в константу ссылку на  кнопку "Закрыть"
const popupSaveButton = document.querySelector('.popup__save-button');//добавить в константу ссылку на кнопку "Сохранить"
const profileName = document.querySelector('.profile__name');////добавить в константу ссылку на поле "имя" на странице
const profileJob = document.querySelector('.profile__job');//добавить в константу ссылку на поле "профессия" на странице
const popup = document.querySelector('.popup');//добавить в константу ссылку на  всплывающее окно
const formElement = document.querySelector('.popup__container');//добавить в константу ссылку на форму из всплывающего окна
const popupName = document.querySelector('[name = "profile-name"]');//добавить в константу ссылку на поле "имя" в всплывающем окне
const popupJob = document.querySelector('[name = "profile-job"]');//добавить в константу ссылку на поле "профессия" в всплывающем окне
const elementsContainer = document.querySelector('.elements__container');//добавить в константу ссылку на контейнер с карточками
  
const displayPopup = () => {
  if(!popup.classList.contains('popup_opened')) {
    popupName.value = profileName.textContent;//записать имя профиля со страницы в соответсвующее поле всплывающего окна
    popupJob.value = profileJob.textContent;//записать профессию профиля со страницы в соответсвующее поле всплывающего окна
    popup.classList.add('popup_opened');//добавить класс popup_opened, т.е. отобразить всплывающее окно
  }
  else {
    popup.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
  }
}

const formSubmitHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;//записать имя профиля из всплывающего окна в соответсвующее поле на странице
  profileJob.textContent = popupJob.value;//записать профессию профиля из всплывающего окна в соответсвующее поле на странице
  displayPopup(); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', displayPopup);//по клику на кнопку "Редактировать" выполнить displayPopup(), т.е. отобразить всплывающее окно
popupCloseButton.addEventListener('click', displayPopup);//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно без сохранения

//массив с названиями мест и ссылками на изображения
const cards = [
  {
    name: 'Река Лена',
    link: './images/lena.jpg'
  },
  {
    name: 'Республика Дагестан',
    link: './images/dagestan.jpg'
  },
  {
    name: 'Брянская область',
    link: './images/bryanskaya-oblast.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.png'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsk.png'
  }
];

//функция добавляет новую карточку из шаблона в контейнер
const addCard = (name, link) => {
  const templateItem = document.querySelector('.template').content.cloneNode(true);//создать новую карточку клонируя шаблон
  const templateImage = templateItem.querySelector('.elements__image');//записать в константу ссылку на изображение новой карточки
  const temlateTitle = templateItem.querySelector('.elements__heading');//записать в константу ссылку на заголовок новой карточки
  templateImage.src = link; //записать в src изображения новой карточки ссылку, переданную при вызове функции
  temlateTitle.textContent = name;//записать в заголовок новой карточки текст, переданный при вызове функции
  elementsContainer.prepend(templateItem);//добавить новую карточку в контейнер с карточками
}

//функция добавляет карточки по шаблону, текст заголовков и ссылки для изображений берёт из массива, передаваемого функии в качестве аргумента
const addInitialCards = (cards) => {
  for (i = 0; i < cards.length; i++) {
    addCard(cards[i].name, cards[i].link);//
  }
}

addInitialCards(cards);