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
  cardLinkInput
}