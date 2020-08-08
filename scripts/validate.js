//проверяет на валидность переданный инпут
const isValid = (input) => {
  return input.validity.valid;
}

//добавить сообщение об ошибке в контейнер для ошибки
const showErrorMessage = (messageContainer, message) => {
  messageContainer.textContent = message;
}

//проверить валидность поля и
const toggleErrorClass = (input, className) => {
  //если ввод неверный
  if (!isValid(input)) {
    //выделить поле как некорректное
    input.classList.add(className);
  }
  else {
    //иначе убрать выделение
    input.classList.remove(className);
  }
}

//проверить валидность поля и
const toggleErrorMessage = (input) => {
  //если ввод неверный
  if (!isValid (input)) {
    //добавить сообщение об ошибке ввода в соответствующий инпуту контейнер для ошибки
    showErrorMessage(document.querySelector(`#${input.name}-error-container`), input.validationMessage);
  }
  //если ввод верный
  else {
    //удалить сообщение об ошибке
    showErrorMessage(document.querySelector(`#${input.name}-error-container`), '');
  }
}

//вернуть true, если хотя бы один инпут в текущей форме заполнен неверно
const hasInvalidInput = (evt, elements) => {
  //собрать все инпуты текущей формы в константу
  const inputs = Array.from(evt.currentTarget.querySelectorAll(elements));
  //вернуть true, если перебор массива даст хоть один true
  return inputs.some((input) => {
    //вернуть true, если инпут невалидный
    return !isValid (input);
  });
}

//отключить или включить кнопку submit
const toggleSubmitButton = (hasInvalidInput, submitButton, className) => {
  //Если хоть одно поле невалидно
  if (hasInvalidInput) {
    //отключить кнопку submit
    submitButton.disabled = true;
    //добавить кнопке класс отключения
    submitButton.classList.add(className);
  }
  //если все поля валидны
  else {
    //включить кнопку submit
    submitButton.disabled = false;
    //удалить класс отключения
    submitButton.classList.remove(className);
  }
}

//включить валидацию полей в формах
const enableValidation = (params) => {
  Array.from(document.querySelectorAll(params.formSelector)).forEach((form) => {
    form.addEventListener('input', (evt) => {
      const submitButton = evt.currentTarget.querySelector(params.submitButtonSelector);
      if(evt.target.classList.contains(params.inputSelector.slice(1))) {
        toggleErrorClass(evt.target, params.inputErrorClass);
        toggleErrorMessage(evt.target);
        toggleSubmitButton(hasInvalidInput(evt, params.inputSelector), submitButton, params.inactiveButtonClass);
      };
    });
  });
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error-message-container'
});
