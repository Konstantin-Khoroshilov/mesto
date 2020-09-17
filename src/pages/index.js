import './index.css';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import cards from '../scripts/utils/initialCards.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfileForm = document.querySelector('[name = "profile"]');
const addCardForm = document.querySelector('[name = "cards-inputter"]');
const popupName = document.querySelector('[name = "profile-name"]');
const popupJob = document.querySelector('[name = "profile-job"]');
const cardsContainer = document.querySelector('.cards__container');
const addCardFormSaveButton = document.querySelector('.popup__save-button_type_cards-inputter');
const cardTemplate = document.querySelector('.template');
const cardNameInput = document.querySelector('[name = "card-name"]');
const cardLinkInput = document.querySelector('[name = "card-link"]');
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
  popupName.value = user.getUserInfo().userName; //записать имя профиля со страницы в соответсвующее поле всплывающего окна
  popupJob.value = user.getUserInfo().userJob; //записать профессию профиля со страницы в соответсвующее поле всплывающего окна
  profileEditorPopup.open(); // отобразить всплывающее окно редактирования профиля
});

const popupCardInputter = new PopupWithForm ('popup_type_cards-inputter', (evt, formValues) => {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы.
  const newCard = new Card(cardTemplate, formValues['card-name'], formValues['card-link'],'', (cardImage, cardTitle)=>{
    popupWithImage.open(cardImage, cardTitle);
  });//создать карточку, используя полученные из формы данные
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
        const card = new Card(cardTemplate, cardItem.name, cardItem.link, cardItem.alt, (cardImage, cardTitle)=>{
          popupWithImage.open(cardImage, cardTitle);
        })
        const cardElement = card.getCard();
        cardsList.addItem(cardElement);
      }
    },
    'cards__container'
);

cardsList.renderItems();


