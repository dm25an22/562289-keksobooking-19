'use strict';

(function () {

  var formFilter = document.querySelector('.map__filters');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var prices = {
    middleMin: 10000,
    middleMax: 50000,
    low: 10000,
    high: 50000
  };

  var checkAvailability = function (arr, val) {
    return arr.some(function (element) {
      return val === element;
    });
  };

  var onChangeFilter = window.debounce(function (filter) {
    window.renderCard.removeCard();
    window.renderPin.getPin(filter);
  });


  formFilter.addEventListener('change', function () {
    var dataFilter = window.dataArr.slice();

    if (housingType.value !== 'any') {
      dataFilter = dataFilter.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }

    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {
        case 'middle':
          dataFilter = dataFilter.filter(function (it) {
            return it.offer.price >= prices.middleMin && it.offer.price <= prices.middleMax;
          });
          break;
        case 'low':
          dataFilter = dataFilter.filter(function (it) {
            return it.offer.price <= prices.low;
          });
          break;
        case 'high':
          dataFilter = dataFilter.filter(function (it) {
            return it.offer.price >= prices.high;
          });
          break;
      }
    }

    if (housingRooms.value !== 'any') {
      dataFilter = dataFilter.filter(function (it) {
        return it.offer.rooms === parseInt(housingRooms.value, 10);
      });
    }

    if (housingGuests.value !== 'any') {
      dataFilter = dataFilter.filter(function (it) {
        return it.offer.guests === parseInt(housingGuests.value, 10);
      });
    }

    for (var index = 0; index < housingFeatures.length; index++) {
      if (housingFeatures[index].checked) {
        dataFilter = dataFilter.filter(function (ite) {
          return checkAvailability(ite.offer.features, housingFeatures[index].value);
        });
      }
    }

    onChangeFilter(dataFilter);
  });

})();
