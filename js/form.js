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

})();
