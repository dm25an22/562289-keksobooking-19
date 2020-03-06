'use strict';

(function () {

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
    document.addEventListener('keydown', onCardEscPress);
    popupClose.addEventListener('click', removeCard);
    popupClose.addEventListener('keydown', onCardEnterPress);
  };

  var removeActiveClassPin = function (pinsArr) {
    for (var index = 0; index < pinsArr.length; index++) {
      if (pinsArr[index].classList.contains('map__pin--active')) {
        pinsArr[index].classList.remove('map__pin--active');
        break;
      }
    }
  };

  var getActiveCard = function (data) {
    var pins = document.querySelectorAll('.map__pin');

    var addClickListener = function (index) {
      pins[index].addEventListener('click', function () {
        openCard(data, index);
        removeActiveClassPin(pins);
        pins[index].classList.add('map__pin--active');
      });
    };

    var addPressEnterListener = function (index) {
      pins[index].addEventListener('keydown', function (evt) {
        if (evt.key === window.keysCode.ENTER_KEY) {
          openCard(data, index);
          removeActiveClassPin(pins);
          pins[index].classList.add('map__pin--active');
        }
      });
    };

    for (var i = 1; i < pins.length; i++) {
      addClickListener(i);
      addPressEnterListener(i);
    }

  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.keysCode.ESC_KEY) {
      removeCard();
    }
  };

  var onCardEnterPress = function (evt) {
    if (evt.key === window.keysCode.ENTER_KEY) {
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

    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    getActiveCard: getActiveCard,
    removeCard: removeCard
  };

})();
