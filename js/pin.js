'use strict';

(function () {

  var QUANTITY_PINS = 5;
  var mapPinsContainer = document.querySelector('.map__pins');

  var getPositionOnMap = function (data) {
    var pins = mapPinsContainer.querySelectorAll('.map__pin');
    var mapPinWidth = mapPinsContainer.lastChild.offsetWidth;
    var mapPinHeight = mapPinsContainer.lastChild.offsetHeight;

    for (var i = 0; i < pins.length - 1; i++) {

      pins[i + 1].style.left = data[i].location.x - (mapPinWidth / 2) + 'px';
      pins[i + 1].style.top = data[i].location.y - mapPinHeight + 'px';
    }
  };

  var removePin = function () {
    var pins = mapPinsContainer.querySelectorAll('.map__pin');
    for (var k = 1; k < pins.length; k++) {
      pins[k].remove();
    }
  };

  var getPin = function (data) {
    var fragmentPin = document.createDocumentFragment();
    var takeNumber = data.length > QUANTITY_PINS ? QUANTITY_PINS : data.length;

    removePin();

    for (var i = 0; i < takeNumber; i++) {
      if (data[i].offer !== undefined) {
        fragmentPin.append(window.renderPinElement(data[i]));
      }
    }

    mapPinsContainer.append(fragmentPin);

    getPositionOnMap(data);
    window.card.getActiveCard(data);
  };

  window.pin = {
    getPin: getPin,
    removePin: removePin
  };

})();
