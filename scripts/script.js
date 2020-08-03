const editButton = document.querySelector('.profile__edit-button');//добавить в константу ссылку на кнопку "Редактировать профиль"
const addButton = document.querySelector('.profile__add-button');//добавить в константу ссылку на кнопку "Добавить карточку"
const profileEditorCloseButton = document.querySelector('.popup__close-button_type_profile-editor');//добавить в константу ссылку на  кнопку "Закрыть"
const cardsInputterCloseButton = document.querySelector('.popup__close-button_type_cards-inputter');//добавить в константу ссылку на  кнопку "Закрыть"
const imageViewerCloseButton = document.querySelector('.popup__close-button_type_image-viewer');//добавить в константу ссылку на  кнопку "Закрыть"
const profileName = document.querySelector('.profile__name');////добавить в константу ссылку на поле "имя" на странице
const profileJob = document.querySelector('.profile__job');//добавить в константу ссылку на поле "профессия" на странице
const popupProfileEditor = document.querySelector('.popup_type_profile-editor');//добавить в константу ссылку на  всплывающее окно редактирования профиля
const popupCardInputter = document.querySelector('.popup_type_cards-inputter');//добавить в константу ссылку на  всплывающее окно добавления карточки
const popupImageViewer = document.querySelector('.popup_type_image-viewer');//добавить в константу ссылку на  всплывающее окно просмотра изображения
const editProfileForm = document.querySelector('[name = "profile"]');//добавить в константу ссылку на форму из всплывающего окна редактирования профиля
const addCardForm = document.querySelector('[name = "cards-inputter"]');//добавить в константу ссылку на форму из всплывающего окна добавления карточки
const popupName = document.querySelector('[name = "profile-name"]');//добавить в константу ссылку на поле "имя" в всплывающем окне
const popupJob = document.querySelector('[name = "profile-job"]');//добавить в константу ссылку на поле "профессия" в всплывающем окне
const cardsContainer = document.querySelector('.cards__container');//добавить в константу ссылку на контейнер с карточками
//массив с названиями мест и ссылками на изображения
const cards = [
  {
    name: 'Казань',
    link: './images/kazan.jpg',
    alt: 'Большой покрытый зеленью холм на берегу водоёма'
  },
  {
    name: 'Республика Дагестан',
    link: './images/dagestan.jpg',
    alt: 'Вершина горы в облаках на фоне закатного неба'
  },
  {
    name: 'Мурманская область',
    link: './images/murmanskaya-oblast.jpg',
    alt: 'Вид с вершины снежной горы на водную гладь и холмы у подножия'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg',
    alt: 'Холмистая местность с далёкой вершиной на фоне'
  },
  {
    name: 'Домбай',
    link: './images/dombai.jpg',
    alt: 'Хвойная рощица на холме'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsk.jpg',
    alt: 'Покрытые снегом горы с зелёными соснами на фоне голубого неба'
  }
];

//функция отображает или скрывает попап добавляя или удаляя класс 'popup_opened'
const displayPopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

//функция создаёт новую карточку из шаблона
const createCard = (name, link, alt = '') => {
  const card = document.querySelector('.template').content.cloneNode(true);//создать новую карточку клонируя шаблон
  const cardImage = card.querySelector('.cards__image');//записать в константу ссылку на изображение новой карточки
  const cardName = card.querySelector('.cards__heading');//записать в константу ссылку на заголовок новой карточки
  const cardLikeButton = card.querySelector('.cards__like-button');//записать в константу ссылку на кнопку лайк
  const cardDeleteButton = card.querySelector('.cards__delete-button');//записать в константу ссылку на кнопку удалить
  cardImage.src = link; //записать в src изображения новой карточки ссылку, переданную при вызове функции
  cardImage.alt = alt; //записать в alt изображения карточки описание изображения, переданное при вызове функции
  cardName.textContent = name;//записать в заголовок новой карточки текст, переданный при вызове функции
  //добавляет обработчик события кнопке лайка
  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like-button_active');//по нажатию кнопки добавляет/удаляет класс с фоновым изображением
  });
  //добавляет обработчик события кнопке удалить
  cardDeleteButton.addEventListener('click', (evt) => {
    evt.target.parentElement.parentElement.remove();//по нажатию кнопки удаляет карточку
  });
  //добавляет обработчик события картинке из карточки
  cardImage.addEventListener('click', () => {
    document.querySelector('.popup__image').src = cardImage.src;//передает изображение из карточки во всплывающее окно
    document.querySelector('.popup__image').alt = cardImage.alt;//передает alt изображения из карточки во всплывающее окно
    document.querySelector('.popup__caption').textContent = cardName.textContent;//передает подпись к изображению из карточки во всплывающее окно
    displayPopup(popupImageViewer);//отображает всплывающее окно просмотра изображений
  });
  return card;
}

//функция добавляет начальные карточки. Текст заголовков и ссылки для изображений берёт из массива, передаваемого функции в качестве аргумента
const addInitialCards = (cards) => {
  for (i = 0; i < cards.length; i++) {
    //создать карточку. Название, ссылку на изображение и alt взять из элемента массива. После создания карточки добавить её в контейнер
    cardsContainer.prepend(createCard(cards[i].name, cards[i].link, cards[i].alt));
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
  let newCardName = document.querySelector('[name = "add-card-name"]').value;//добавляет название карточки, полученное из формы, в переменную
  let newCardLink = document.querySelector('[name = "add-card-link"]').value;//добавляет url картинки, полученный из формы, в переменную
  //если не заполнить название карточки, в карточке будет написано "Пустота"
  if(newCardName === '') {
    newCardName = 'Пустота';
  }
  //если не указать адрес ссылки, переменной будет передана ссылка на "изображение пустоты"
  if (newCardLink === '') {
    newCardLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT77b6udxRDnUUT9msjmIO-wPbkMRt8cYNIIg&usqp=CAU';
  }
  const newCard = createCard(newCardName, newCardLink);//создать карточку, используя полученные из формы данные
  cardsContainer.prepend (newCard);// добавить новую карточку в контейнер
  document.querySelector('[name = "add-card-name"]').value = '';//очистить поле "Название" во всплывающем окне
  document.querySelector('[name = "add-card-link"]').value = '';//очистить поле "Ссылка на картинку" во всплывающем окне
  displayPopup(popupCardInputter); //удалить класс popup_opened, т.е. спрятать всплывающее окно
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
});

//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно просмотра изображения
imageViewerCloseButton.addEventListener('click', () => {
  displayPopup(popupImageViewer);
});

//по клику на кнопку "Закрыть" выполнить displayPopup(), т.е.  спрятать всплывающее окно добавления карточки без сохранения
cardsInputterCloseButton.addEventListener('click', () => {
  displayPopup(popupCardInputter);
});
