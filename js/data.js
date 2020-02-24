'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  window.dataArr = [];

  var onSuccsess = function (data) {
    window.dataArr = data;

    window.craeteActivePin = function () {
      window.renderPin.getPin(window.dataArr);
    };

    window.removeDisabled(mapFilters);

  };

  window.setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsess);

})();
