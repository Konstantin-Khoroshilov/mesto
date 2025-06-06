import Popup from "./Popup";
import {popupCaption, popupImage} from "../utils/utils";
export default class PopupWithImage extends Popup {
  open(cardImage, cardTitle) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
    super.open();
  }
  close() {
    popupImage.src = '';
    super.close();
  }
}