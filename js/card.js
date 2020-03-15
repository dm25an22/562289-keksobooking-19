'use strict';

(function () {

  var ENTER_KEY = window.keysCode.ESC_KEY;

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var renderCard = window.renderCard;

  var getCard = function (obdj) {
    map.insertBefore(renderCard(obdj), mapFiltersContainer);
  };

  var openCard = function (data, index) {
    removeCard();
    getCard(data[index - 1]);

    var popupClose = document.querySelector('.popup__close');
    document.addEventListener('keydown', onDocumentCardEscPress);
    popupClose.addEventListener('click', onPopupCloseClick);
    popupClose.addEventListener('keydown', onCardEnterPress);
  };

  var removeActiveClassPin = function (pinsArr) {
    pinsArr.forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
  };

  var getActiveCard = function (data) {
    var pins = document.querySelectorAll('.map__pin');

    var onPinClick = function (index) {
      pins[index].addEventListener('click', function () {
        openCard(data, index);
        removeActiveClassPin(pins);
        pins[index].classList.add('map__pin--active');
      });
    };

    var onPinEnterPress = function (index) {
      pins[index].addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          openCard(data, index);
          removeActiveClassPin(pins);
          pins[index].classList.add('map__pin--active');
        }
      });
    };

    Array.from(pins).slice(1).forEach(function (it, i) {
      var index = i + 1;
      onPinClick(index);
      onPinEnterPress(index);
    });

  };

  var onDocumentCardEscPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      removeCard();
    }
  };

  var onCardEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      removeCard();
    }
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    var pins = document.querySelectorAll('.map__pin');

    if (mapCard) {
      mapCard.remove();
      removeActiveClassPin(pins);
    }

    document.removeEventListener('keydown', onDocumentCardEscPress);
  };

  var onPopupCloseClick = removeCard;

  window.card = {
    getActiveCard: getActiveCard,
    removeCard: removeCard
  };

})();
