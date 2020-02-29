'use strict';

var map = document.querySelector('.map');

(function () {
  window.dataArr = [];


  var onSuccsessLoad = function (data) {
    window.dataArr = data;

    window.craeteActivePin = function () {
      window.renderPin.getPin(window.dataArr);
      map.classList.remove('map--faded');
    };

  };

  window.setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsessLoad);

})();
