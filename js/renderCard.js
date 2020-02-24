'use strict';

(function () {

  var templateCard = document.querySelector('#card').content;


  var renderCard = function (informations) {

    var mapCard = templateCard.querySelector('.map__card').cloneNode(true);

    var popupAvatar = mapCard.querySelector('.popup__avatar');
    popupAvatar.src = informations.author.avatar;

    var popupTitle = mapCard.querySelector('.popup__title');
    popupTitle.textContent = informations.offer.title;

    var popupTextAddress = mapCard.querySelector('.popup__text--address');
    popupTextAddress.textContent = informations.offer.address;

    var popupTextPrice = mapCard.querySelector('.popup__text--price');
    popupTextPrice.textContent = informations.offer.price + ' ₽/ночь';

    var popupType = mapCard.querySelector('.popup__type');
    popupType.textContent = informations.offer.type;


    var houseTypes = {
      palace: 'Дворец ',
      flat: 'Квартира ',
      house: 'Дом ',
      bungalo: 'Бунгало '
    };

    popupType.textContent = houseTypes[informations.offer.type];

    var popupTextCapacity = mapCard.querySelector('.popup__text--capacity');
    popupTextCapacity.textContent = informations.offer.rooms + ' комнаты для ' + informations.offer.guests + ' гостей';

    var popupTextTime = mapCard.querySelector('.popup__text--time');
    popupTextTime.textContent = 'Заезд после ' + informations.offer.checkin + ', выезд до ' + informations.offer.checkout;


    var popupFeaturesContainer = mapCard.querySelector('.popup__features');
    var items = popupFeaturesContainer.querySelectorAll('.popup__feature');

    var wifiIcon = mapCard.querySelector('.popup__feature--wifi');
    var dishwasherIcon = mapCard.querySelector('.popup__feature--dishwasher');
    var parkingIcon = mapCard.querySelector('.popup__feature--parking');
    var washerIcon = mapCard.querySelector('.popup__feature--washer');
    var elevatorIcon = mapCard.querySelector('.popup__feature--elevator');
    var conditionerIcon = mapCard.querySelector('.popup__feature--conditioner');

    for (var t = 0; t < items.length; t++) {
      items[t].remove();
    }

    for (var j = 0; j < informations.offer.features.length; j++) {

      switch (informations.offer.features[j]) {
        case 'wifi':
          popupFeaturesContainer.append(wifiIcon);
          break;

        case 'dishwasher':
          popupFeaturesContainer.append(dishwasherIcon);
          break;

        case 'parking':
          popupFeaturesContainer.append(parkingIcon);
          break;

        case 'washer':
          popupFeaturesContainer.append(washerIcon);
          break;

        case 'elevator':
          popupFeaturesContainer.append(elevatorIcon);
          break;

        case 'conditioner':
          popupFeaturesContainer.append(conditionerIcon);
          break;
      }

    }


    var popupDescription = mapCard.querySelector('.popup__description');
    popupDescription.textContent = informations.offer.description;

    var popupPhotos = mapCard.querySelector('.popup__photos');
    var popupPhoto = mapCard.querySelector('.popup__photo');
    popupPhoto.src = informations.offer.photos[0];

    if (informations.offer.photos.length === 0) {
      popupPhotos.remove();
    } else if (informations.offer.photos.length > 1) {
      for (var k = 1; k < informations.offer.photos.length; k++) {
        var popupPhotoClone = popupPhoto.cloneNode(true);
        popupPhotoClone.src = informations.offer.photos[k];
        popupPhotos.append(popupPhotoClone);
      }
    }

    return mapCard;
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');


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


  var getActiveCard = function (data) {
    var pins = document.querySelectorAll('.map__pin');

    var addClickListener = function (index) {
      pins[index].addEventListener('click', function () {
        openCard(data, index);
      });
    };

    var addPressEnterListener = function (index) {
      pins[index].addEventListener('keydown', function (evt) {
        if (evt.key === window.keysCode.ENTER_KEY) {
          openCard(data, index);
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

    if (mapCard) {
      mapCard.remove();
    }

    document.removeEventListener('keydown', onCardEscPress);
  };

  window.renderCard = {
    getActiveCard: getActiveCard,
    removeCard: removeCard
  };

})();
