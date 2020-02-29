'use strict';

(function () {

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

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');


  var checkSelected = function () {

    switch (true) {
      case rooms.value === '1' && guests.value !== '1':
        rooms.setCustomValidity('В одной комнате может проживать только один гость');
        break;

      case rooms.value === '2' && (guests.value !== '1' && guests.value !== '2'):
        rooms.setCustomValidity('В двух комнатах могут проживать не более двух гостей');
        break;

      case rooms.value === '3' && (guests.value !== '1' && guests.value !== '2' && guests.value !== '3'):
        rooms.setCustomValidity('В трёх комнатах могут проживать до трёх человек');
        break;

      case rooms.value === '100' && guests.value !== '0':
        rooms.setCustomValidity('Не для гостей');
        break;

      default:
        rooms.setCustomValidity('');
        break;
    }

  };

  rooms.addEventListener('change', checkSelected);
  guests.addEventListener('change', checkSelected);

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');


  var setTimeSelected = function (evt) {
    if (evt.target === timein) {
      timeout.value = timein.value;
    }

    if (evt.target === timeout) {
      timein.value = timeout.value;
    }
  };

  timein.addEventListener('change', setTimeSelected);
  timeout.addEventListener('change', setTimeSelected);


  var main = document.querySelector('main');

  var successTempale = document.querySelector('#success').content;
  var successTempaleClone = successTempale.querySelector('.success').cloneNode(true);

  var onSuccsessSend = function () {
    main.append(successTempaleClone);

    var removeSuccessMessage = function (evt) {
      if (evt.target.matches('.success')) {
        successTempaleClone.remove();
        window.notActiveStatus();
        document.removeEventListener('click', removeSuccessMessage);
      }
    };

    var removeSuccsessEsc = function (evt) {
      if (evt.key === window.keysCode.ESC_KEY) {
        successTempaleClone.remove();
        window.notActiveStatus();
      }
      document.removeEventListener('keydown', removeSuccsessEsc);
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', removeSuccsessEsc);

  };

  var error = document.querySelector('#error').content;
  var errorClone = error.querySelector('.error').cloneNode(true);


  var onErrorSend = function () {
    main.append(errorClone);

    var errorButton = document.querySelector('.error__button');

    var removeErrorMessage = function (evt) {
      if (evt.target.matches('.error')) {
        errorClone.remove();
        errorClone.removeEventListener('click', removeErrorMessage);
      }
      if (evt.target.matches('.error__button')) {
        errorClone.remove();
        errorButton.removeEventListener('click', removeErrorMessage);
      }
    };

    var removeErrorMessageEsc = function (evt) {

      if (evt.key === window.keysCode.ESC_KEY) {
        errorClone.remove();
      }
      document.removeEventListener('keydown', removeErrorMessageEsc);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', removeErrorMessageEsc);
  };

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.setRequest('https://js.dump.academy/keksobooking', 'POST', onSuccsessSend, formData, onErrorSend);
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.notActiveStatus();
  });

})();
