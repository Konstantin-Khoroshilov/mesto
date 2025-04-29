const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfileForm = document.querySelector('[name = "profile"]');
const addCardForm = document.querySelector('[name = "cards-inputter"]');
const avatarRenewForm = document.querySelector('[name = "avatar-renew"]');
const avatarRenewFormInput = avatarRenewForm.querySelector('[name="avatar-link"]')
const avatarRenewFormSubmit = avatarRenewForm.querySelector('[type="submit"]')
const popupName = document.querySelector('[name = "profile-name"]');
const popupJob = document.querySelector('[name = "profile-job"]');
const cardsContainer = document.querySelector('.cards__container');
const addCardFormSaveButton = document.querySelector('.popup__save-button_type_cards-inputter');
const editProfileFormSaveButton = document.querySelector('.popup__save-button_type_profile-editor');
const avatarEditBlock = document.querySelector('.profile__avatar-edit-block');
const cardTemplate = document.querySelector('.template');
const deleteButtonTemplate = document.querySelector('.delete-button');
const cardNameInput = document.querySelector('[name = "card-name"]');
const cardLinkInput = document.querySelector('[name = "card-link"]');
const avatar = document.querySelector('.profile__avatar');
const deleteCardButton = document.querySelector('.popup__save-button_type_delete-confirmation');
const cardsLoadingIcon = document.querySelector('.cards__loading-icon');
const userId = "1dc379cab30c5da7f6287d30";
const apiData = {
  initialCardsUrl:'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  getUserDataUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  updateUserDataUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  addNewCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  deleteCardUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/cards/',
  setLikeUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/',
  removeLikeUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/',
  updateAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar',
  authorization: 'f45e1c45-8a4a-4b79-8e68-5b3c6639fc71',
}
//элементы для валидации
const itemsToValidate = {
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error-message-container'
};

const defaultImgSrc = '/src/images/default-image.svg';

export {
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
  cardsLoadingIcon,
  defaultImgSrc
}