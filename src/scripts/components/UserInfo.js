export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  constructor({userNameSelector, userJobSelector}) {
    this._userNameOnPage = document.querySelector(`.${userNameSelector}`);
    this._userJobOnPage = document.querySelector(`.${userJobSelector}`);
  }
  // возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {
      userName: this._userNameOnPage.textContent,
      userJob: this._userJobOnPage.textContent
    }
  }
  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userName, userJob) {
    this._userNameOnPage.textContent = userName;
    this._userNameOnPage.setAttribute('title', userName);
    this._userJobOnPage.textContent = userJob;
    this._userJobOnPage.setAttribute('title', userJob);
  }
}