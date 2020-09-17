export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`.${popupSelector}`);
    this._eventEsc = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    //если нажата клавиша Escape
    if (evt.key === 'Escape') {
      //закрыть попап
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._eventEsc);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._eventEsc);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')) {
        this.close.bind(this)();
      }
    });
  }
}