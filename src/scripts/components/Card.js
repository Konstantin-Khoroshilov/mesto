import defaultCardImage from '../../images/default-image.svg';

export default class Card {
  constructor({ template, deleteButtonTemplate, cardData, handleCardClick, handleDeleteClick, needDelete, cardId, likeHandler, isLiked }) {
    this._text = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.alt;
    this._card = template.content.cloneNode(true);
    this._deleteButtonTemplate = deleteButtonTemplate.content.cloneNode(true);
    this._deleteButton = this._deleteButtonTemplate.querySelector('.cards__delete-button');
    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__heading');
    this._cardLikeButton = this._card.querySelector('.cards__like-button');
    this._likesContainer = this._card.querySelector('.cards__likes-number');
    this._figure = this._card.querySelector('.cards__card');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = cardData.likes;
    this._needDelete = needDelete;
    this._cardId = cardId;
    this._likeHandler = likeHandler;
    this._isLiked = isLiked;
  }

  _generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._text;
    this._cardTitle.setAttribute('title', this._text);
    this._likesContainer.textContent = this._likes.length;
    if (this._needDelete) {
      this._figure.append(this._deleteButtonTemplate);
    }
    if (this._isLiked) {
      this._cardLikeButton.classList.add('cards__like-button_active');
    }
  }

  _toggleClass(element, className) {
    element.classList.toggle(className);
  }

  _openImage() {
    this._handleCardClick(this._cardImage, this._cardTitle);
  }

  _setEventListeners() {
    if (this._needDelete) {
      this._deleteButton.addEventListener('click', (evt) => {
        this._handleDeleteClick(evt.target.parentElement.parentElement);
      });
    }

    this._cardLikeButton.addEventListener('click', () => {
      if (!this._isLiked) {
        this._likeHandler(true, this._cardId, this._likesContainer, this._cardLikeButton);
        this._isLiked = true;
      }
      else {
        this._likeHandler(false, this._cardId, this._likesContainer, this._cardLikeButton);
        this._isLiked = false;
      }
    });

    this._cardImage.addEventListener('click', () => {
      this._openImage();
    });

    this._cardImage.onerror = () => {
      this._cardImage.src = defaultCardImage;
    };
  }

  getCard() {
    this._generateCard();
    this._setEventListeners();
    return this._card;
  }
}
