'use strict';

(function () {

  var mapPinsContainer = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content;


  var renderPinElement = function (data) {

    var mapPin = templatePin.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPin;
  };


  var getPositionOnMap = function (marks, data, PinWidth, PinHeight) {
    for (var i = 0; i < marks.length - 1; i++) {

      marks[i + 1].style.left = data[i].location.x - (PinWidth / 2) + 'px';
      marks[i + 1].style.top = data[i].location.y - PinHeight + 'px';
    }
  };

  var createCoord = function (data) {
    var pins = mapPinsContainer.querySelectorAll('.map__pin');
    var mapPinWidth = mapPinsContainer.lastChild.offsetWidth;
    var mapPinHeight = mapPinsContainer.lastChild.offsetHeight;

    getPositionOnMap(pins, data, mapPinWidth, mapPinHeight);
  };

  window.createElementWhithCoord = function (data) {
    var fragment = document.createDocumentFragment();

    for (var t = 0; t < window.QUANTITY_PINS; t++) {
      fragment.append(renderPinElement(data[t]));
    }

    mapPinsContainer.append(fragment);

    createCoord(data);
  };

})();
