'use strict';

(function () {
  
  var QUANTITY_PINS = 5;
  var housingTypeSelect = document.querySelector('#housing-type');

  housingTypeSelect.addEventListener('change', function () {
    var dataFilter = [];

    dataFilter = window.dataArr.slice().filter(function (it) {
      return it.offer.type === housingTypeSelect.value;
    });

    if (housingTypeSelect.value === 'any') {
      dataFilter = window.functions.getArrRandomElements(QUANTITY_PINS, dataArr);
    }

    window.renderCard.removeCard();
    window.renderPin.getPin(dataFilter);
  });

})();
