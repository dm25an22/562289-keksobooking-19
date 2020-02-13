'use strict';

(function () {

  var mapPinsContainer = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content;
  var offers = window.offers;

  window.renderPin = function () {
    var createPinElement = function (informations) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < informations.length; i++) {
        var mapPin = templatePin.querySelector('.map__pin').cloneNode(true);
        var mapPinImg = mapPin.querySelector('img');

        mapPinImg.src = informations[i].author.avatar;
        mapPinImg.alt = informations[i].offer.title;
        fragment.append(mapPin);
      }

      return fragment;
    };

    mapPinsContainer.append(createPinElement(offers));


    var mapPinWidth = mapPinsContainer.lastChild.offsetWidth;
    var mapPinHeight = mapPinsContainer.lastChild.offsetHeight;
    var pins = mapPinsContainer.querySelectorAll('.map__pin');


    var getPositionOnMap = function (marks, informations) {
      for (var i = 0; i < marks.length - 1; i++) {

        marks[i + 1].style.left = informations[i].location.x - (mapPinWidth / 2) + 'px';
        marks[i + 1].style.top = informations[i].location.y - mapPinHeight + 'px';
      }
    };

    getPositionOnMap(pins, offers);

  };

})();
