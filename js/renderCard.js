'use strict';

(function () {

  var map = document.querySelector('.map');
  var offers = window.offers;

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content;


  var renderCards = function (informations) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < informations.length; i++) {
      var mapCard = templateCard.querySelector('.map__card').cloneNode(true);

      var popupAvatar = mapCard.querySelector('.popup__avatar');
      popupAvatar.src = informations[i].author.avatar;

      var popupTitle = mapCard.querySelector('.popup__title');
      popupTitle.textContent = informations[i].offer.title;

      var popupTextAddress = mapCard.querySelector('.popup__text--address');
      popupTextAddress.textContent = informations[i].offer.address;

      var popupTextPrice = mapCard.querySelector('.popup__text--price');
      popupTextPrice.textContent = informations[i].offer.price + ' ₽/ночь';

      var popupType = mapCard.querySelector('.popup__type');
      popupType.textContent = informations[i].offer.type;


      var houseTypes = {
        palace: 'Дворец ',
        flat: 'Квартира ',
        house: 'Дом ',
        bungalo: 'Бунгало '
      };

      switch (popupType.textContent) {

        case 'palace':
          popupType.textContent = houseTypes.palace;
          break;

        case 'flat':
          popupType.textContent = houseTypes.flat;
          break;

        case 'house':
          popupType.textContent = houseTypes.house;
          break;

        case 'bungalo':
          popupType.textContent = houseTypes.bungalo;
          break;
      }

      var popupTextCapacity = mapCard.querySelector('.popup__text--capacity');
      popupTextCapacity.textContent = informations[i].offer.rooms + ' комнаты для ' + informations[i].offer.guests + ' гостей';

      var popupTextTime = mapCard.querySelector('.popup__text--time');
      popupTextTime.textContent = 'Заезд после ' + informations[i].offer.checkin + ', выезд до ' + informations[i].offer.checkout;


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

      for (var j = 0; j < informations[i].offer.features.length; j++) {

        switch (informations[i].offer.features[j]) {
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
      popupDescription.textContent = offers[i].offer.description;

      var popupPhotos = mapCard.querySelector('.popup__photos');
      var popupPhoto = mapCard.querySelector('.popup__photo');
      popupPhoto.src = informations[i].offer.photos[0];

      if (informations[i].offer.photos.length === 0) {
        popupPhotos.remove();
      } else if (informations[i].offer.photos.length > 1) {
        for (var k = 1; k < informations[i].offer.photos.length; k++) {
          var popupPhotoClone = popupPhoto.cloneNode(true);
          popupPhotoClone.src = informations[i].offer.photos[k];
          popupPhotos.append(popupPhotoClone);
        }
      }


      fragment.append(mapCard);
    }
    return fragment;
  };

  map.insertBefore(renderCards(offers), mapFiltersContainer);

})();
