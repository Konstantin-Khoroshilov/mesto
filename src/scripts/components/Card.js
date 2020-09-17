export default class Card {
  constructor (template, text, link, alt = '', handleCardClick) {
    this._text = text;
    this._link = link;
    this._alt = alt;
    this._card = template.content.cloneNode(true);
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__heading');
    this._cardLikeButton = this._card.querySelector('.cards__like-button');
    this._cardDeleteButton = this._card.querySelector('.cards__delete-button');
    this._handleCardClick = handleCardClick;
  }

  _generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._text;
  }

  _toggleClass(element, className) {
    element.classList.toggle(className);
  }

  _removeElement(element) {
    element.remove();
  }

  _openImage() {
    this._handleCardClick(this._cardImage, this._cardTitle);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._toggleClass(evt.target, 'cards__like-button_active');
    });
    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._removeElement(evt.target.parentElement.parentElement);
    });
    this._cardImage.addEventListener('click', () => {
      this._openImage();
    });
  }

  getCard() {
    this._generateCard();
    this._setEventListeners();
    return this._card;
  }
}
