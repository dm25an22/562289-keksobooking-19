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

  for (var i = 0; i < getRandomNumber(1, arr.length - 1); i++) {
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


var renderAdverts = function () {
  var adverts = [];

  for (var i = 0; i < 8; i++) {
    var coordinateY = getRandomNumber(130, 630);
    var coordinateX = getRandomNumber(130, 630); // Подставить ширину карты
    var coordinate = coordinateX + ', ' + coordinateY;

    adverts.push(
        {
          author: {
            avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png', // Исправить повтор изображений
          },

          location: {
            x: coordinateX,
            y: coordinateY,
          },

          offer: {
            title: 'заголовок предложения',
            address: coordinate,
            price: getRandomNumber(1, 5000),
            type: getRandomIndex(offerTypes, 0),
            rooms: getRandomNumber(1, 100),
            guests: getRandomNumber(1, 3),
            checkin: getRandomIndex(records, 0),
            checkout: getRandomIndex(records, 0),
            features: randomArr(features),
            description: 'строка с описанием',
            photos: randomArr(photos),
          },

        });
  }
  return adverts;
};

renderAdverts();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

