import {popupImage, displayPopup, popupImageViewer} from './index.js'

//создать и экспортировать класс для добавления карточек на страницу
export default class Card {
  //коструктор принимает на вход шаблон карточки, название карточки, ссылку на изображение и alt
  constructor (template, text, link, alt = '') {
    this._text = text;
    this._link = link;
    this._alt = alt;
    this._card = template.content.cloneNode(true);
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__heading');
    this._cardLikeButton = this._card.querySelector('.cards__like-button');
    this._cardDeleteButton = this._card.querySelector('.cards__delete-button');
  }
  //медод добавляет в скопированный шаблон карточки ссылку на картинку, alt и название карточки
  _generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._text;
  }
  //метод добавляет слушатели событий
  _setEventListeners() {
    //нажатие на кнопку лайка
    this._cardLikeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like-button_active');
    });
    //нажатие на кнопку удаления карточки
    this._cardDeleteButton.addEventListener('click', (evt) => {
      evt.target.parentElement.parentElement.remove();
    });
    //нажатие на картинку
    this._cardImage.addEventListener('click', () => {
      popupImage.src = this._cardImage.src;
      popupImage.alt = this._cardImage.alt;
      document.querySelector('.popup__caption').textContent = this._cardTitle.textContent;
      displayPopup(popupImageViewer);
    });
  }
  //метод возвращает готовую карточку
  getCard() {
    this._generateCard();
    this._setEventListeners();
    return this._card;
  }
}
