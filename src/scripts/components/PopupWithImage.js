import Popup from "./Popup";
import {popupCaption, popupImage} from "../utils/utils";
export default class PopupWithImage extends Popup {
  constructor(_popup) {
    super(_popup);
  }
  open(cardImage, cardTitle) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._eventEsc);
  }
}