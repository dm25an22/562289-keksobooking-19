'use strict';

(function () {
  var QUANTITY_PINS = 1;
  var mapPinsContainer = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');


  var getPin = function (data) {
    var fragmentPin = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_PINS; i++) {
      fragmentPin.append(window.renderPinElement(data[i]));
    }

    mapPinsContainer.append(fragmentPin);

    window.getPositionOnMap(data);
  };


  var getCard = function (data) {
    var fragmentCard = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_PINS; i++) {
      fragmentCard.append(window.renderCard(data[i]));
    }

    map.insertBefore(fragmentCard, mapFiltersContainer);

  };


  var onSuccsess = function (data) {

    window.craeteActivePin = function () {
      getPin(data);
    };

    getCard(data);

  };


  window.setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsess);

})();
