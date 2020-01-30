'use strict';

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var records = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var randomArr = function (arr) {
  var result = [];
  var randomLength = getRandomNumber(0, arr.length - 1);

  while (randomLength !== result.length) {
    var randomFeatures = arr[getRandomNumber(0, arr.length - 1)];

    if (result.indexOf(randomFeatures) === -1) {
      result.push(randomFeatures);
    }
  }
  return result;
};


var getRandomIndex = function (arr, min) {
  return arr[getRandomNumber(min, arr.length - 1)];
};

var mapWidth = document.querySelector('.map__overlay').offsetWidth;


var renderOffers = function (quantity) {
  var result = [];
  var avatarsNumbers = [];

  while (result.length !== quantity && avatarsNumbers.length !== quantity) {

    var coordinateY = getRandomNumber(130, 630);
    var coordinateX = getRandomNumber(0, mapWidth);
    var coordinate = coordinateX + ', ' + coordinateY;

    var randomAvatar = getRandomNumber(1, 8);
    var iconAvatar;

    if (avatarsNumbers.indexOf(randomAvatar) === -1) {
      avatarsNumbers.push(randomAvatar);

      if (randomAvatar <= 9) {
        iconAvatar = 'img/avatars/user' + '0' + randomAvatar + '.png';
      } else {
        iconAvatar = 'img/avatars/user' + randomAvatar + '.png';
      }


      result.push(
          {
            author: {
              avatar: iconAvatar,
            },

            location: {
              x: coordinateX,
              y: coordinateY,
            },

            offer: {
              title: 'Заголовок предложения',
              address: coordinate,
              price: getRandomNumber(1, 5000),
              type: getRandomIndex(offerTypes, 0),
              rooms: getRandomNumber(1, 3),
              guests: getRandomNumber(1, 3),
              checkin: getRandomIndex(records, 0),
              checkout: getRandomIndex(records, 0),
              features: randomArr(features),
              description: 'строка с описанием',
              photos: randomArr(photos),
            },

          });
    }
  }
  return result;
};

var offers = renderOffers(6);

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');
var templatePin = document.querySelector('#pin').content;


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

mapPins.append(createPinElement(offers));

var mapPinWidth = mapPins.lastChild.offsetWidth;
var mapPinHeight = mapPins.lastChild.offsetHeight;
var pins = mapPins.querySelectorAll('.map__pin');


var getPositionOnMap = function (marks, informations) {
  for (var i = 1; i < marks.length; i++) {
    marks[i].style.left = informations[i - 1].location.x - (mapPinWidth / 2) + 'px';
    marks[i].style.top = informations[i - 1].location.y - mapPinHeight + 'px';
  }
};

getPositionOnMap(pins, offers);

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

    if (popupType.textContent === 'palace') {
      popupType.textContent = 'Дворец ';
    } else if (popupType.textContent === 'flat') {
      popupType.textContent = 'Квартира  ';
    } else if (popupType.textContent === 'house') {
      popupType.textContent = 'Дом  ';
    } else if (popupType.textContent === 'bungalo') {
      popupType.textContent = 'Бунгало   ';
    }

    var popupTextCapacity = mapCard.querySelector('.popup__text--capacity');
    popupTextCapacity.textContent = informations[i].offer.rooms + ' комнаты для ' + informations[i].offer.guests + ' гостей';

    var popupTextTime = mapCard.querySelector('.popup__text--time');
    popupTextTime.textContent = 'Заезд после ' + informations[i].offer.checkin + ', выезд до ' + informations[i].offer.checkout;

    var popupFeatures = mapCard.querySelector('.popup__features'); // Bug
    if (informations[i].offer.features.length === 0) {
      popupFeatures.classList.add('hidden');
    }

    var popupDescription = mapCard.querySelector('.popup__description');
    popupDescription.textContent = offers[i].offer.description;

    var popupPhotos = mapCard.querySelector('.popup__photos');
    var popupPhoto = mapCard.querySelector('.popup__photo'); // Bug
    popupPhoto.src = informations[i].offer.photos;

    if (informations[i].offer.photos.length === 0) {
      popupPhotos.classList.add('hidden');
    }


    fragment.append(mapCard);
  }
  return fragment;
}

map.insertBefore(renderCards(offers), mapFiltersContainer);
