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
      case rooms.value === '1' && guests !== '1':
        rooms.setCustomValidity('В одной комнате может проживать только один гость');
        break;

      case rooms.value === '2' && (guests !== '1' && guests !== '2'):
        rooms.setCustomValidity('В двух комнатах могут продивать не более двух гостей');
        break;

      case rooms.value === '3' && (guests !== '1' && guests !== '2' && guests !== '3'):
        rooms.setCustomValidity('В трёх комнатах могут проживать до трёх человек');
        break;

      case rooms.value === '100' && guests !== 'не для гостей':
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

  var setTimeinSelected = function () {

    switch (true) {
      case timein.value === '12:00':
        timeout[0].selected = true;
        break;

      case timein.value === '13:00':
        timeout[1].selected = true;
        break;

      case timein.value === '14:00':
        timeout[2].selected = true;
        break;
    }

  }

  var setTimeoutSelected = function () {

    switch (true) {
      case timeout.value === '12:00':
        timein[0].selected = true;
        break;

      case timeout.value === '13:00':
        timein[1].selected = true;
        break;

      case timeout.value === '14:00':
        timein[2].selected = true;
        break;
    }

  }

  timein.addEventListener('change', setTimeinSelected);
  timeout.addEventListener('change', setTimeoutSelected);

})();
