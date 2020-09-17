export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderer = renderer;
    this._initialArray = data;
    this._container = document.querySelector(`.${containerSelector}`);
  }
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
}