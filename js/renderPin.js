'use strict';

(function () {

  var templatePin = document.querySelector('#pin').content;

  window.renderPinElement = function (data) {

    var mapPin = templatePin.querySelector('.map__pin').cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPinImg.src = data.author.avatar;
    mapPinImg.alt = data.offer.title;

    return mapPin;
  };

})();
