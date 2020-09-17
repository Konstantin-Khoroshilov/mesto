import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(_popup, submitHandler) {
    super(_popup);
    this._submitHandler = submitHandler;
  }
  //собирает данные всех полей формы
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll('.popup__text-input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  //метод должен добавлять отработчик закрытия формы и сабмита формы
  setEventListeners(clearValidationHandler) {
    this._clearValidationHandler = clearValidationHandler;
    this._popup.querySelector('.popup__close-button').addEventListener('click',()=>{
      this.close.bind(this)(this._clearValidationHandler);
    });
    this._popup.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')) {
        this.close.bind(this)(this._clearValidationHandler);
      }
    });
    this._popup.addEventListener('submit', (evt) => {
      this._submitHandler(evt, this._getInputValues());
    });
  }
  //должен закрывать и сбрасывать форму
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._eventEsc);
    this._clearValidationHandler();
  }
  _handleEscClose(evt) {
    //если нажата клавиша Escape
    if (evt.key === 'Escape') {
      //закрыть попап и очистить валидацию
      this.close(this._clearValidationHandler);
    }
  }
}