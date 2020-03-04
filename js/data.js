'use strict';

(function () {
  window.dataArr = [];
  window.isData = false;


  var onSuccsessLoad = function (data) {
    window.dataArr = data;
    window.isData = true;
  };

  var onErrorLoad = function () {
    window.isData = false;
  };

  window.setRequest('https://js.dump.academy/keksobooking/data', 'GET', onSuccsessLoad, onErrorLoad);

})();
