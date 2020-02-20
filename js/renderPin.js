'use strict';

(function () {

  var mapPinsContainer = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content;


  window.renderPinElement = function (data) {

    var mapPin = templatePin.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPin;
  };


  window.getPositionOnMap = function (data) {
    var pins = mapPinsContainer.querySelectorAll('.map__pin');
    var mapPinWidth = mapPinsContainer.lastChild.offsetWidth;
    var mapPinHeight = mapPinsContainer.lastChild.offsetHeight;

    for (var i = 0; i < pins.length - 1; i++) {

      pins[i + 1].style.left = data[i].location.x - (mapPinWidth / 2) + 'px';
      pins[i + 1].style.top = data[i].location.y - mapPinHeight + 'px';
    }
  };

})();
