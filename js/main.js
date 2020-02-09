'use strict';

var map = document.querySelector('.map');
/* var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var RECORDS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBERS_OF_PHOTO = 8;

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var getRandomArr = function (arr) {
  var result = [];
  var randomLength = getRandomNumber(0, arr.length);
  var arrCopy = arr.slice(0);

  while (result.length !== randomLength) {
    var randomElement = arrCopy.splice(getRandomNumber(0, arrCopy.length - 1), 1);
    randomElement = randomElement[0];
    result.push(randomElement);
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

  for (var i = 1; i <= NUMBERS_OF_PHOTO; i++) {
    avatarsNumbers.push(i);
  }

  while (result.length !== quantity) {

    var coordinateY = getRandomNumber(130, 630);
    var coordinateX = getRandomNumber(0, mapWidth);
    var coordinate = coordinateX + ', ' + coordinateY;

    var randomAvatar = avatarsNumbers.splice(getRandomNumber(0, avatarsNumbers.length - 1), 1);
    randomAvatar = randomAvatar[0];

    if (randomAvatar <= 9) {
      randomAvatar = 'img/avatars/user' + '0' + randomAvatar + '.png';
    } else {
      randomAvatar = 'img/avatars/user' + randomAvatar + '.png';
    }
    result.push(
        {
          author: {
            avatar: randomAvatar,
          },

          location: {
            x: coordinateX,
            y: coordinateY,
          },

          offer: {
            title: 'Заголовок предложения',
            address: coordinate,
            price: getRandomNumber(1, 5000),
            type: getRandomIndex(OFFER_TYPES, 0),
            rooms: getRandomNumber(1, 3),
            guests: getRandomNumber(1, 3),
            checkin: getRandomIndex(RECORDS, 0),
            checkout: getRandomIndex(RECORDS, 0),
            features: getRandomArr(FEATURES),
            description: 'Строка с описанием',
            photos: getRandomArr(PHOTOS),
          },

        });
  }

  return result;
};*/


// var offers = renderOffers(1);
/* console.log(offers);


 //var map = document.querySelector('.map');
var mapPinsContainer = document.querySelector('.map__pins');
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

getPositionOnMap(pins, offers);*/

/*

/*var mapFiltersContainer = document.querySelector('.map__filters-container');
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

    var wifiIcon = mapCard.querySelector('.popup__feature--wifi');
    wifiIcon.remove();

    var dishwasherIcon = mapCard.querySelector('.popup__feature--dishwasher');
    dishwasherIcon.remove();

    var parkingIcon = mapCard.querySelector('.popup__feature--parking');
    parkingIcon.remove();

    var washerIcon = mapCard.querySelector('.popup__feature--washer');
    washerIcon.remove();

    var elevatorIcon = mapCard.querySelector('.popup__feature--elevator');
    elevatorIcon.remove();

    var conditionerIcon = mapCard.querySelector('.popup__feature--conditioner');
    conditionerIcon.remove();

    if (informations[i].offer.features.length === 0) {
      popupFeaturesContainer.remove();
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

map.insertBefore(renderCards(offers), mapFiltersContainer);*/

var mapPinMain = document.querySelector('.map__pin--main');

var PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
var PIN_MAIN_HEIGTH = mapPinMain.offsetHeight;

var getCoordinatePinMain = function () {
  var y = mapPinMain.offsetTop + (PIN_MAIN_HEIGTH / 2);
  var x = mapPinMain.offsetLeft + (PIN_MAIN_WIDTH / 2);
  return x + ', ' + y;
};

var getCoordinatePinMainActiv = function () {
  var y = mapPinMain.offsetTop + mapPinMain.offsetHeight + 15; // ???
  var x = mapPinMain.offsetLeft + (PIN_MAIN_WIDTH / 2);
  return x + ', ' + y;
};

var setDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
};

var removeDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
};

var activStatus = function (evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    removeDisabled(addFormFieldsets);
    removeDisabled(mapFilters);
    map.classList.remove('map--faded');
    addressInput.value = getCoordinatePinMainActiv();
    addForm.classList.remove('ad-form--disabled');
  }
};


var ENTER_KEY = 'Enter';
var addForm = document.querySelector('.ad-form');
var addFormFieldsets = addForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var addressInput = addForm.querySelector('input[name=address');
addressInput.value = getCoordinatePinMain();


setDisabled(addFormFieldsets);
setDisabled(mapFilters);


mapPinMain.addEventListener('mousedown', function (evt) {
  activStatus(evt);
});

mapPinMain.addEventListener('keydown', function (evt) {
  activStatus(evt);
});

var typeHous = addForm.querySelector('#type');
var pricePerNight = addForm.querySelector('#price');


var prices = {
  bungaloPriceFrom: 0,
  flatPriceFrom: 1000,
  housePriceFrom: 5000,
  palacePriceFrom: 10000
};

typeHous.addEventListener('change', function () {

  switch (typeHous.value) {
    case 'bungalo':
      pricePerNight.min = prices.bungaloPriceFrom;
      pricePerNight.placeholder = prices.bungaloPriceFrom;
      break;

    case 'flat':
      pricePerNight.min = prices.flatPriceFrom;
      pricePerNight.placeholder = 'от ' + prices.flatPriceFrom;
      break;

    case 'house':
      pricePerNight.min = prices.housePriceFrom;
      pricePerNight.placeholder = 'от ' + prices.housePriceFrom;
      break;

    case 'palace':
      pricePerNight.min = prices.palacePriceFrom;
      pricePerNight.placeholder = 'от ' + prices.palacePriceFrom;
      break;
  }

});

var guest = document.querySelector('#capacity');
var rooms = document.querySelector('#room_number');


var guest100 = guest[3];
var guest1 = guest[2];
var guest2 = guest[1];
var guest3 = guest[0];

rooms.addEventListener('change', function () {
  switch (rooms.value) {
    case '1':
      guest3.disabled = true;
      guest2.disabled = true;
      guest1.disabled = false;
      guest1.selected = true;
      guest100.disabled = true;
      break;

    case '2':
      guest3.disabled = true;
      guest2.disabled = false;
      guest1.disabled = false;
      guest2.selected = true;
      guest100.disabled = true;
      break;

    case '3':
      guest3.disabled = false;
      guest2.disabled = false;
      guest1.disabled = false;
      guest3.selected = true;
      guest100.disabled = true;
      break;

    case '100 комнат':
      guest3.disabled = true;
      guest2.disabled = true;
      guest1.disabled = true;
      guest100.disabled = false;
      guest100.selected = true;
      break;
  }

});

var rooms1 = rooms[0];
var rooms2 = rooms[1];
var rooms3 = rooms[2];
var rooms100 = rooms[3];

guest.addEventListener('change', function () {
  switch (guest.value) {
    case '1':
      rooms1.disabled = false;
      rooms2.disabled = false;
      rooms3.disabled = false;
      rooms1.selected = true;
      rooms100.disabled = true;
      break;

    case '2':
      rooms1.disabled = false;
      rooms2.disabled = false;
      rooms3.disabled = true;
      rooms1.selected = true;
      rooms100.disabled = true;
      break;

    case '3':
      rooms1.disabled = false;
      rooms2.disabled = false;
      rooms3.disabled = false;
      rooms1.selected = true;
      rooms100.disabled = true;
      break;

    case 'не для гостей':
      rooms1.disabled = true;
      rooms2.disabled = true;
      rooms3.disabled = true;
      rooms100.selected = true;
      rooms100.disabled = false;
      break;
  }

});
