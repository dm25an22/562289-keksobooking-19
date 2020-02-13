'use strict';

(function () {

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var RECORDS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var NUMBERS_OF_PHOTO = 8;

  var getRandomNumber = window.functions.getRandomNumber;
  var getRandomArr = window.functions.getRandomArr;
  var getRandomIndex = window.functions.getRandomIndex;
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
  };


  window.offers = renderOffers(1);

})();
