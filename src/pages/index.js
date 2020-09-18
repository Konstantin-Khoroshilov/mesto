import './index.css';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import cards from '../scripts/utils/initialCards.js';
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
  cardLinkInput
} from  '../scripts/utils/constants';

const user = new UserInfo({userNameSelector: 'profile__name', userJobSelector: 'profile__job'});

const profileEditorPopup = new PopupWithForm ('popup_type_profile-editor', (evt, formValues) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //записать имя и должность профиля из всплывающего окна в соответсвующее поле на странице
  user.setUserInfo(formValues['profile-name'], formValues['profile-job']);
  profileEditorPopup.close();// спрятать всплывающее окно
});

profileEditorPopup.setEventListeners(()=>{
  //очистить визуальные эффекты валидации
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

const popupCardInputter = new PopupWithForm ('popup_type_cards-inputter', (evt, formValues) => {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы.
  //создать карточку, используя полученные из формы данные
  const newCard = new Card(
    cardTemplate,
    {name: formValues['card-name'], link: formValues['card-link'],alt: ''},
    (cardImage, cardTitle)=>{
      popupWithImage.open(cardImage, cardTitle);
    }
  );
  cardsContainer.prepend (newCard.getCard());// добавить новую карточку в контейнер
  cardNameInput.value = '';//очистить поле "Название" во всплывающем окне
  cardLinkInput.value = '';//очистить поле "Ссылка на картинку" во всплывающем окне
  addCardFormValidation.disableButton(addCardFormSaveButton, 'popup__save-button_disabled');//отключить кнопку submit
  popupCardInputter.close();
});

addButton.addEventListener('click', () => {popupCardInputter.open();});
popupCardInputter.setEventListeners(()=>{
  //очистить визуальные эффекты валидации
  addCardFormValidation.clearValidation(
    addCardForm.querySelectorAll('.popup__error-message-container')
  )});

const popupWithImage = new PopupWithImage('popup_type_image-viewer');
popupWithImage.setEventListeners();

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

//добавить валидацию формы редактирования профиля
const editProfileFormValidation = new FormValidator(itemsToValidate, editProfileForm);
editProfileFormValidation.enableValidation();


const cardsList = new Section({
      data: cards,
      renderer: (cardItem) => {
        const card = new Card(cardTemplate, cardItem, (cardImage, cardTitle)=>{
          popupWithImage.open(cardImage, cardTitle);
        })
        const cardElement = card.getCard();
        cardsList.addItem(cardElement);
      }
    },
    'cards__container'
);

cardsList.renderItems();


