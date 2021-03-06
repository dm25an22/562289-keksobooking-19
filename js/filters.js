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

  var getMixedArray = window.condition.getMixedArray;

  var checkAvailability = function (arr, val) {
    return arr.some(function (element) {
      return val === element;
    });
  };

  var onFilterChange = window.debounce(function (filter) {
    window.card.removeCard();
    window.pin.getPin(filter);
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

    housingFeatures.forEach(function (it) {
      if (it.checked) {
        dataFilter = dataFilter.filter(function (item) {
          return checkAvailability(item.offer.features, it.value);
        });
      }
    });

    onFilterChange(getMixedArray(dataFilter));
  });

})();
