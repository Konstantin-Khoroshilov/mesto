const editButton = document.querySelector('.profile__edit-button');//добавить в константу ссылку на кнопку "Редактировать профиль"
const addButton = document.querySelector('.profile__add-button');//добавить в константу ссылку на кнопку "Добавить карточку"
const profileEditorCloseButton = document.querySelector('.popup__close-button_type_profile-editor');//добавить в константу ссылку на  кнопку "Закрыть"
const cardsInputterCloseButton = document.querySelector('.popup__close-button_type_cards-inputter');//добавить в константу ссылку на  кнопку "Закрыть"
const imageViewerCloseButton = document.querySelector('.popup__close-button_type_image-viewer');//добавить в константу ссылку на  кнопку "Закрыть"
const profileEditorSaveButton = document.querySelector('.popup__save-button_type_profile-editor');//добавить в константу ссылку на кнопку "Сохранить"
const cardsInputterSaveButton = document.querySelector('.popup__save-button_type_cards-inputter');//добавить в константу ссылку на кнопку "Сохранить"
const profileName = document.querySelector('.profile__name');////добавить в константу ссылку на поле "имя" на странице
const profileJob = document.querySelector('.profile__job');//добавить в константу ссылку на поле "профессия" на странице
const popupProfileEditor = document.querySelector('.popup_type_profile-editor');//добавить в константу ссылку на  всплывающее окно редактирования профиля
const popupCardInputter = document.querySelector('.popup_type_cards-inputter');//добавить в константу ссылку на  всплывающее окно добавления карточки
const popupImageViewer = document.querySelector('.popup_type_image-viewer');//добавить в константу ссылку на  всплывающее окно просмотра изображения
const editProfileForm = document.querySelector('[name = "profile"]');//добавить в константу ссылку на форму из всплывающего окна редактирования профиля
const addCardForm = document.querySelector('[name = "cards-inputter"]');//добавить в константу ссылку на форму из всплывающего окна добавления карточки
const popupName = document.querySelector('[name = "profile-name"]');//добавить в константу ссылку на поле "имя" в всплывающем окне
const popupJob = document.querySelector('[name = "profile-job"]');//добавить в константу ссылку на поле "профессия" в всплывающем окне
const elementsContainer = document.querySelector('.elements__container');//добавить в константу ссылку на контейнер с карточками

const displayPopup = (evt) => {
  if(evt.target.className === 'profile__edit-button' && !popupProfileEditor.classList.contains('popup_opened')) {
    popupName.value = profileName.textContent;//записать имя профиля со страницы в соответсвующее поле всплывающего окна
    popupJob.value = profileJob.textContent;//записать профессию профиля со страницы в соответсвующее поле всплывающего окна
    popupProfileEditor.classList.add('popup_opened');//добавить класс popup_opened, т.е. отобразить всплывающее окно
  }
  
  else if (evt.target.className === 'profile__add-button' && !popupCardInputter.classList.contains('popup_opened')) {
    popupCardInputter.classList.add('popup_opened');//добавить класс popup_opened, т.е. отобразить всплывающее окно
  }
  
  else if (evt.target.className === 'elements__image' && !popupImageViewer.classList.contains('popup_opened')) {
    popupImageViewer.classList.add('popup_opened');//добавить класс popup_opened, т.е. отобразить всплывающее окно
  }
  
  else {
    popupProfileEditor.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
    popupCardInputter.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
    popupImageViewer.classList.remove('popup_opened'); //удалить класс popup_opened, т.е. спрятать всплывающее окно
  }
}

//массив с названиями мест и ссылками на изображения
const cards = [
  {
    name: 'Казань',
    link: './images/kazan.jpg'
  },
  {
    name: 'Республика Дагестан',
    link: './images/dagestan.jpg'
  },
  {
    name: 'Мурманская область',
    link: './images/murmanskaya-oblast.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombai.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsk.jpg'
  }
];

//функция добавляет новую карточку из шаблона в контейнер
const addCard = (name, link) => {
  const templateItem = document.querySelector('.template').content.cloneNode(true);//создать новую карточку клонируя шаблон
  const templateImage = templateItem.querySelector('.elements__image');//записать в константу ссылку на изображение новой карточки
  const temlateTitle = templateItem.querySelector('.elements__heading');//записать в константу ссылку на заголовок новой карточки
  const likeButton = templateItem.querySelector('.elements__like-button');//записать в константу ссылку на кнопку лайк
  const deleteButton = templateItem.querySelector('.elements__delete-button');//записать в константу ссылку на кнопку удалить
  templateImage.src = link; //записать в src изображения новой карточки ссылку, переданную при вызове функции
  temlateTitle.textContent = name;//записать в заголовок новой карточки текст, переданный при вызове функции
  //добавляет обработчик события кнопке лайка
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like-button_active');//по нажатию кнопки добавляет/удаляет класс с фоновым изображением
  });
  //добавляет обработчик события кнопке удалить
  deleteButton.addEventListener('click', (evt) => {
    evt.target.parentElement.parentElement.remove();//по нажатию кнопки удаляет карточку
  });
  //добавляет обработчик события при нажатии на картинку из карточки
  templateImage.addEventListener('click', (evt) => {
    document.querySelector('.popup__image').src = templateImage.src;//передает изображение из карточки во всплывающее окно
    document.querySelector('.popup__caption').textContent = temlateTitle.textContent;//передает подпись к изображению из карточки во всплывающее окно
    displayPopup(evt);//отображает всплывающее окно
  });
  
  elementsContainer.prepend(templateItem);//добавить новую карточку в контейнер с карточками
}

//функция добавляет карточки по шаблону. Текст заголовков и ссылки для изображений берёт из массива, передаваемого функции в качестве аргумента
const addInitialCards = (cards) => {
  for (i = 0; i < cards.length; i++) {
    addCard(cards[i].name, cards[i].link);//передает функции addCard имя и ссылку из массива
  }
}

addInitialCards(cards);

//отработчик формы редактирования профиля
const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupName.value;//записать имя профиля из всплывающего окна в соответсвующее поле на странице
  profileJob.textContent = popupJob.value;//записать профессию профиля из всплывающего окна в соответсвующее поле на странице
  displayPopup(evt); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}
//отработчик формы добавления карточки
const addCardFormSubmitHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let addCardFormName = document.querySelector('[name = "add-card-name"]').value;//добавляет название места, полученное из формы, в переменную
  let addCardFormLink = document.querySelector('[name = "add-card-link"]').value;//добавляет url картинки, полученный из формы, в переменную
  //если не заполнить название карточки, в карточке будет написано "Пустота"
  if(addCardFormName === '') {
    addCardFormName = 'Пустота';
  }
  //если не указать адрес ссылки, переменной будет передана ссылка на "изображение пустоты"
  if (addCardFormLink === ''){
    addCardFormLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT77b6udxRDnUUT9msjmIO-wPbkMRt8cYNIIg&usqp=CAU';
  }
  addCard(addCardFormName, addCardFormLink);//вызывает функцию добавления карточки
  document.querySelector('[name = "add-card-name"]').value = '';//очищает поле "Название" во всплывающем окне
  document.querySelector('[name = "add-card-link"]').value = '';//очищает поле "Ссылка на картинку" во всплывающем окне
  displayPopup(evt); //удалить класс popup_opened, т.е. спрятать всплывающее окно
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);

addButton.addEventListener('click', displayPopup);//по клику на кнопку "Редактировать" выполнить displayPopup(), т.е. отобразить всплывающее окно
editButton.addEventListener('click', displayPopup);//по клику на кнопку "Редактировать" выполнить displayPopup(), т.е. отобразить всплывающее окно
profileEditorCloseButton.addEventListener('click', displayPopup);//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно без сохранения
imageViewerCloseButton.addEventListener('click', displayPopup);//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно без сохранения
cardsInputterCloseButton.addEventListener('click', displayPopup);//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно без сохранения
