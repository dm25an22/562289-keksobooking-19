'use strict';

(function () {

  var SUCCESS_CODE = 200;

  var setRequest = function (url, method, onLoad) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      }
    });

    xhr.open(method, url);
    xhr.send();

  };

  window.QUANTITY_PINS = 1;

  var createElementWhithCoord = window.createElementWhithCoord;
  var createCard = window.createCard;

  var onSuccsess = function (data) {

    window.craeteActivePin = function () {
      createElementWhithCoord(data);
    };

    createCard(data);

  };

  setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsess);

})();
