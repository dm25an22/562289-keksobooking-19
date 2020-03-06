'use strict';

(function () {

  var onSuccsessLoad = function (data) {
    window.dataArr = data;
    window.isData = true;
  };

  var onErrorLoad = function () {
    window.isData = false;
  };

  window.setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsessLoad, onErrorLoad);

})();
