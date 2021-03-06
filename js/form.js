'use strict';

(function () {

  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;

  var titleIput = document.querySelector('#title');

  titleIput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_LENGTH_TITLE) {
      target.style.borderColor = 'red';
      target.setCustomValidity('Минимальная длина заголовка ' + MIN_LENGTH_TITLE + ' символовов \n' + '(сейчас вы используете ' + target.value.length + ' символов)');
    } else if (target.value.length > MAX_LENGTH_TITLE) {
      target.style.borderColor = 'red';
      titleIput.setCustomValidity('Максимальная длина заголовка ' + MAX_LENGTH_TITLE + '(сейчас вы используете ' + target.value.length + ' символов)');
    } else {
      target.style.borderColor = 'white';
      target.setCustomValidity('');
    }
  });

  var typeHous = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  var prices = {
    bungaloPriceFrom: 0,
    flatPriceFrom: 1000,
    housePriceFrom: 5000,
    palacePriceFrom: 10000
  };

  typeHous.addEventListener('change', function () {

    switch (typeHous.value) {
      case 'bungalo':
        pricePerNight.min = prices.bungaloPriceFrom;
        pricePerNight.placeholder = prices.bungaloPriceFrom;
        break;

      case 'flat':
        pricePerNight.min = prices.flatPriceFrom;
        pricePerNight.placeholder = 'от ' + prices.flatPriceFrom;
        break;

      case 'house':
        pricePerNight.min = prices.housePriceFrom;
        pricePerNight.placeholder = 'от ' + prices.housePriceFrom;
        break;

      case 'palace':
        pricePerNight.min = prices.palacePriceFrom;
        pricePerNight.placeholder = 'от ' + prices.palacePriceFrom;
        break;
    }

  });

  pricePerNight.addEventListener('input', function () {
    if (pricePerNight.checkValidity() === false) {
      pricePerNight.style.borderColor = 'red';
      if (pricePerNight.validity.badInput) {
        pricePerNight.setCustomValidity('Пожалуйста,введите число');
      } else if (pricePerNight.validity.rangeUnderflow) {
        pricePerNight.setCustomValidity('Пожалуйста,введите число не менее ' + pricePerNight.min);
      } else if (pricePerNight.validity.rangeOverflow) {
        pricePerNight.setCustomValidity('Пожалуйста,введите число не более ' + pricePerNight.max);
      } else {
        pricePerNight.setCustomValidity('');
        pricePerNight.style.borderColor = 'white';
      }
    }
  });

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');


  var onRoomsGuestsChange = function () {

    switch (true) {
      case rooms.value === '1' && guests.value !== '1':
        rooms.setCustomValidity('В одной комнате может проживать только один гость');
        rooms.style.borderColor = 'red';
        break;

      case rooms.value === '2' && (guests.value !== '1' && guests.value !== '2'):
        rooms.setCustomValidity('В двух комнатах могут проживать не более двух гостей');
        rooms.style.borderColor = 'red';
        break;

      case rooms.value === '3' && (guests.value !== '1' && guests.value !== '2' && guests.value !== '3'):
        rooms.setCustomValidity('В трёх комнатах могут проживать до трёх человек');
        rooms.style.borderColor = 'red';
        break;

      case rooms.value === '100' && guests.value !== '0':
        rooms.setCustomValidity('Не для гостей');
        rooms.style.borderColor = 'red';
        break;

      default:
        rooms.setCustomValidity('');
        rooms.style.borderColor = 'white';
        break;
    }

  };

  rooms.addEventListener('change', onRoomsGuestsChange);
  guests.addEventListener('change', onRoomsGuestsChange);


  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');


  var onTimeChange = function (evt) {
    if (evt.target === timein) {
      timeout.value = timein.value;
    }

    if (evt.target === timeout) {
      timein.value = timeout.value;
    }
  };

  timein.addEventListener('change', onTimeChange);
  timeout.addEventListener('change', onTimeChange);


  var main = document.querySelector('main');

  var successTempale = document.querySelector('#success').content;
  var successTempaleClone = successTempale.querySelector('.success').cloneNode(true);
  var notActiveStatus = window.condition.notActiveStatus;

  var onDocumentRemoveSuccessMessegaClick = function (evt) {
    if (evt.target.matches('.success')) {
      successTempaleClone.remove();
      notActiveStatus();
      document.removeEventListener('click', onDocumentRemoveSuccessMessegaClick);
    }
  };

  var onDocumentRemoveSuccessMessagePressEsc = function (evt) {
    if (evt.key === window.keysCode.ESC_KEY) {
      successTempaleClone.remove();
      notActiveStatus();
    }
    document.removeEventListener('keydown', onDocumentRemoveSuccessMessagePressEsc);
  };

  var onSuccsessSend = function () {
    main.append(successTempaleClone);

    document.addEventListener('click', onDocumentRemoveSuccessMessegaClick);
    document.addEventListener('keydown', onDocumentRemoveSuccessMessagePressEsc);

  };

  var error = document.querySelector('#error').content;
  var errorClone = error.querySelector('.error').cloneNode(true);

  var onErrorMessageButtonClick = function (evt) {
    var errorButton = document.querySelector('.error__button');

    if (evt.target.matches('.error')) {
      errorClone.remove();
      errorClone.removeEventListener('click', onErrorMessageButtonClick);
    }
    if (evt.target.matches('.error__button')) {
      errorClone.remove();
      errorButton.removeEventListener('click', onErrorMessageButtonClick);
    }
  };

  var onDocumentRemoveErrorMessagePressEsc = function (evt) {

    if (evt.key === window.keysCode.ESC_KEY) {
      errorClone.remove();
    }
    document.removeEventListener('keydown', onDocumentRemoveErrorMessagePressEsc);
  };

  var onErrorSend = function () {
    main.append(errorClone);

    document.addEventListener('click', onErrorMessageButtonClick);
    document.addEventListener('keydown', onDocumentRemoveErrorMessagePressEsc);
  };

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);

    window.setRequest('https://js.dump.academy/keksobooking', 'POST', onSuccsessSend, onErrorSend, formData);
  });

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function (evt) {
    window.previous.resetPreviousImg();
    evt.preventDefault();
    notActiveStatus();
  });

  var getErrorMessage = function () {
    errorClone.querySelector('.error__message').innerHTML = 'Данные объявлений не были загружены <br> Попробуйте перезагрузить страницу';
    main.append(errorClone);

    document.addEventListener('click', onErrorMessageButtonClick);
    document.addEventListener('keydown', onDocumentRemoveErrorMessagePressEsc);
  };

  window.form = {
    getErrorMessage: getErrorMessage
  };

})();
