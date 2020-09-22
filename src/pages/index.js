import loadErrorImage from '../images/load-error.gif'
import './index.css';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";
import {
  editButton,
  addButton,
  editProfileForm,
  addCardForm,
  popupName,
  popupJob,
  cardsContainer,
  addCardFormSaveButton,
  cardTemplate,
  cardNameInput,
  cardLinkInput,
  avatarEditBlock,
  avatarRenewForm,
  avatar,
  avatarRenewFormInput,
  avatarRenewFormSubmit,
  apiData,
  deleteButtonTemplate,
  itemsToValidate,
  userId,
  deleteCardButton,
  editProfileFormSaveButton,
  cardsLoadingIcon
} from  '../scripts/utils/constants';
import Api from "../scripts/components/Api.js";

//создать экземпляр класса Api
const api = new Api(apiData);

//функция уведомляет пользователя об ошибке, если ответ от сервера не получен
const showError = (buttonSelector, defaultText) => {
  //выдаем сообщение для пользователя в кнопке
  buttonSelector.value = "Произошла ошибка";
  //через пять секунд возращаем кнопку в начальное состояние
  setTimeout(() => {
    buttonSelector.value = defaultText;
  }, 5000);
}


//здесь прописана логика удаления карточки
const handleDeleteClick = (item, itemID) => {
  //создается новый попап, который нужен для подтверждения удаления карточки
  const deletePopup = new PopupWithForm('popup_type_delete-confirmation', (evt) => {
    //здесь обработка события submit
    evt.preventDefault();
    //изменить кнопку, пока ждем ответа от сервера
    deleteCardButton.value = "Удаление..."
    //делаем запрос на сервер для удаления данных карточки
    api.deleteCard(itemID)
      //если получен положительный ответ от сервера
      .then(() => {
        //вернуть кнопку в изначальное состояние
        deleteCardButton.value = "Да"
        //удаляем карточку со страницы
        item.remove();
        //и закрываем попап
        deletePopup.close();
      })
      //если ошибка
      .catch((err) => {
        //выводим ее в консоль
        console.log(err);
        //выдаем сообщение для пользователя в кнопке
        showError (deleteCardButton, "Да");
      });
  });
  //попапу добавляются слушатели событий (подтвердить или закрыть)
  deletePopup.setEventListeners();
  //попап открывается
  deletePopup.open();
}

//здесь прописана логика лайка
const likeHandler = (needSetLike, cardId, likesContainer) => {
  //если нужно поставить лайк
  if(needSetLike) {
    //пока ждем ответ от сервера показываем ...
    likesContainer.textContent = '...';
    //отправить запрос на сервер на добавление лайка
    api.setLike(cardId)
      //если пришел положительный ответ от сервера, взять из ответа кол-во лайков и добавить в карточку на странице
      .then((res)=>{likesContainer.textContent = res.likes.length})
      //если произошла ошибка, вывести ее в консоль
      .catch((err)=>{
        console.log(err);
        likesContainer.textContent = 'упс';
      })
  }
  //если нужно убрать лайк
  else {
    //пока ждем ответ от сервера показываем ...
    likesContainer.textContent = '...';
    //отправить запрос на сервер на удаление лайка
    api.removeLike(cardId)
      //если пришел положительный ответ от сервера, взять из ответа кол-во лайков и добавить в карточку на странице
      .then((res)=>{likesContainer.textContent = res.likes.length})
      //если произошла ошибка, вывести ее в консоль
      .catch((err)=>{
        console.log(err);
        likesContainer.textContent = 'упс';
      })
  }
}

//создать экземпляр класса UserInfo и передать в него селекторы полей страницы, содержащих инф. о пользователе
const user = new UserInfo({userNameSelector: 'profile__name', userJobSelector: 'profile__job'});

//записываем с сервера на страницу имя пользователя, род занятий, аватар
api.getUserInfo()
    .then((data) => {user.setUserInfo(data.name, data.about); avatar.src = data.avatar})
    //в случае ошибки
    .catch((err) => {
      //на странице будет записан текст "Не удалось..."
      user.setUserInfo('Не удалось загрузить имя пользователя', 'не удалось загрузить должность')
      //вместо аватара будет загружена гифка с сообщением об ошибке
      avatar.src = loadErrorImage;
      //текст ошибке будет выведен в консоль
      console.log(err);
    });

//создать экземпляр класса PopupWithForm - попап для редактирования данных пользователя
const profileEditorPopup = new PopupWithForm ('popup_type_profile-editor', (evt, formValues) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //пока ждем ответ от сервера показываем Сохранение...
  editProfileFormSaveButton.value = 'Сохранение...'
  //отправить на сервер запрос с данными, полученными из попапа
  api.updateUserInfo(formValues['profile-name'], formValues['profile-job'])
    //когда от сервера придет положительный ответ с объектом, содержащим новые данные пользователя,
    .then((data) => {
      //записать имя и должность пользователя из ответа от сервера в соответсвующие поля на странице
      user.setUserInfo(data.name, data.about);
      //вернуть кнопку в исходное состояние
      editProfileFormSaveButton.value = 'Сохранить';
      // спрятать всплывающее окно
      profileEditorPopup.close();
    })
    //в случае ошибки,
    .catch((err) => {
      //вывести её в  консоль
      console.log(err);
      //уведомить пользователя об ошибке через кнопку
      showError(editProfileFormSaveButton, "Сохранить");
    })

});

//устанавливаются слушатели событий (отправка формы, закрытие попапа и т.д.)
profileEditorPopup.setEventListeners(()=>{
  //эта функция обеспечивает очистку форм от результатов валидации при закрыти попапа
  editProfileFormValidation.clearValidation(
    editProfileForm.querySelectorAll('.popup__error-message-container'),
    true,
  )
});
//по клику на кнопку "Редактировать"
editButton.addEventListener('click', () => {
  const {userName, userJob} = user.getUserInfo();
  popupName.value = userName; //записать имя профиля со страницы в соответсвующее поле всплывающего окна
  popupJob.value = userJob; //записать профессию профиля со страницы в соответсвующее поле всплывающего окна
  profileEditorPopup.open(); // отобразить всплывающее окно редактирования профиля
});

//создать экземпляр класса PopupWithForm - попап для редактирования аватара
const avatarEditorPopup = new PopupWithForm ('popup_type_avatar-renew', (evt, formValues) => {
  //здесь логика обработки submit-а
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //пока ждем ответ от сервера поменяем кнопку
  avatarRenewFormSubmit.value = 'Сохранение...'
  //полученный от пользователя url направляется на сервер
  api.updateAvatar(formValues['avatar-link'])
    //если от сервера получен положительный ответ
    .then((res) => {
      //ссылка из ответа от сервера передается аватару на странице
      avatar.src = res.avatar;
      //поля формы очищаются
      avatarRenewFormInput.value = '';
      //кнопка submit отключается и текст кнопки меняется на страндартный
      avatarRenewFormValidation.disableButton(avatarRenewFormSubmit, 'popup__save-button_disabled');
      avatarRenewFormSubmit.value = 'Сохранить';
      //попап закрывается
      avatarEditorPopup.close();
    })
    //если произошла ошибка,
    .catch((err) => {
      //она выводится в консоль
      console.log(err);
      //пользователь уведомляется
      showError(avatarRenewFormSubmit, "Сохранить");
    })
});

//по клику на аватар со страницы
avatarEditBlock.addEventListener('click', () => {
  //открывается форма редактирования аватара
  avatarEditorPopup.open();
});

//устанавливаются слушатели событий (отправка формы, закрытие попапа и т.д.)
avatarEditorPopup.setEventListeners(()=>{
  //эта функция обеспечивает очистку форм от результатов валидации при закрыти попапа
  avatarRenewFormValidation.clearValidation(avatarRenewForm.querySelectorAll('.popup__error-message-container'))
});

//создать экземпляр класса PopupWithForm - попап для добавления новой карточки на страницу
const popupCardInputter = new PopupWithForm ('popup_type_cards-inputter', (evt, formValues) => {
  //здесь обработка события submit
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы.
  //пока ждем ответ от сервера, меняем кнопку
  addCardFormSaveButton.value = 'Сохранение...';
  //после заполнения полей формы и нажатия submit направляется запрос на сервер для сохранения данных карточки
  api.addNewCard(formValues['card-name'], formValues['card-link'])
    .then((data) => {
      //когда получен положительный ответ от сервера и получен объект с данными карточки (data),
      //создать константу с данными для последующей передачи конструктору класса создания карточки
      const newCardData = {
        template: cardTemplate,//шаблон карточки
        deleteButtonTemplate: deleteButtonTemplate,//html код кнопки "удалить"
        //полученные от сервера данные (name, link, likes) записываются в cardData
        cardData: {name: data.name, link: data.link, likes: data.likes, alt: ''},
        //обработчик нажатия на картинку из карточки
        handleCardClick: (cardImage, cardTitle) => {
          //открывает попап просмотра карточки и передает туда картинку и подпись к ней
          popupWithImage.open(cardImage, cardTitle);
        },
        //обработчик нажатия на кнопку delete
        handleDeleteClick: (item) => {
          handleDeleteClick (item, data._id);
        },
        //кнопка удаления карточки нужна
        needDelete: true,
        cardId: data._id,
        likeHandler: (needSetLike, cardId, likesContainer) => {
          likeHandler(needSetLike, cardId, likesContainer);
        },
        isLiked: false
      }

      //создать карточку, используя полученные из формы данные, записанные в newCardData
      const newCard = new Card(newCardData);
      cardsContainer.prepend (newCard.getCard());// добавить новую карточку в контейнер
      cardNameInput.value = '';//очистить поле "Название" во всплывающем окне
      cardLinkInput.value = '';//очистить поле "Ссылка на картинку" во всплывающем окне
      addCardFormValidation.disableButton(addCardFormSaveButton, 'popup__save-button_disabled');//отключить кнопку submit
      addCardFormSaveButton.value = 'Создать';
      popupCardInputter.close();
    })
    .catch((err) => {
      console.log(err)
      //пользователь уведомляется
      showError(addCardFormSaveButton, "Создать");
    })
  });

//кнопке "добавить" устанавливается слушаетель, который открывает форму добавления карточки
addButton.addEventListener('click', () => {popupCardInputter.open();});
popupCardInputter.setEventListeners(()=>{
  //очистить визуальные эффекты валидации
  addCardFormValidation.clearValidation(
    addCardForm.querySelectorAll('.popup__error-message-container')
  )
});

//создать экземпляр класса PopupWithImage - попап для просмотра изображения
const popupWithImage = new PopupWithImage('popup_type_image-viewer');
popupWithImage.setEventListeners();

//добавить валидацию формы добавления карточки
const addCardFormValidation = new FormValidator(itemsToValidate, addCardForm);
addCardFormValidation.enableValidation();

//добавить валидацию формы редактирования профиля
const editProfileFormValidation = new FormValidator(itemsToValidate, editProfileForm);
editProfileFormValidation.enableValidation();

//добавить валидацию формы редактирования аватара
const avatarRenewFormValidation = new FormValidator(itemsToValidate, avatarRenewForm);
avatarRenewFormValidation.enableValidation();

//загружаем с сервера начальные карточки
api.getInitialCards()
    .then((data) => {
      const cardsList = new Section({
        data: data,
        renderer: (cardItem) => {
          //данные для загрузки карточек с сервера
          const initialCardsData = {
            template: cardTemplate,
            deleteButtonTemplate: deleteButtonTemplate,
            cardData: cardItem,//это объект, здесь лежат: название карточки, ссылка на картинку, кол-во лайков
            handleCardClick: (cardImage, cardTitle) => {
              popupWithImage.open(cardImage, cardTitle);
            },
            handleDeleteClick: false,//по умолчанию не нужно обрабатывать нажатие кнопки удаления карточки
            needDelete: false,//по умолчанию кнопка удаления не нужна
            cardId: cardItem._id,
            likeHandler: (needSetLike, cardId, likesContainer) => {
              likeHandler(needSetLike, cardId, likesContainer);
            },
            //лайкнул ли пользователь текущую карточку ранее?
            isLiked: false//по умолчанию кнопка не лайкнута
          }
          //если id владельца карточки совпадает с id пользователя, добавить кнопку удаления и добавить обработчик этой кнопки
          //чтобы пользователь мог удалить свою карточку
          if(cardItem.owner._id == userId){
            initialCardsData.needDelete = true;
            initialCardsData.handleDeleteClick = (item) => {handleDeleteClick(item, cardItem._id)}
          }
          //если пользователь ранее ставил лайк карточке, она сформируется "лайкнутой"
          if (cardItem.likes != []) {
            //если среди id пользователей, лайкнувших карточку, найдётся id текущего пользователя
            if(cardItem.likes.some((like) => {
              return like._id == userId;
            })){
              //при создании карточки параметр isLiked в конструктор передается со значением true
              initialCardsData.isLiked = true;
            }
          }
          const card = new Card(initialCardsData);
          const cardElement = card.getCard();
          cardsList.addItem(cardElement);
        }
      },
      'cards__container'
      );
      cardsLoadingIcon.style.display = 'none';
      cardsList.renderItems();
    })
    .catch((err) => {
      console.log(err);
      cardsLoadingIcon.style.display = 'none';
      cardsContainer.parentElement.style.color = '#ffffff';
      cardsContainer.parentElement.textContent = 'Не удалось загрузить содержимое страницы.';
    });
