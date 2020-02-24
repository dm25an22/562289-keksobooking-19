'use strict';

(function () {


  var SUCCESS_CODE = 200;

  window.setRequest = function (url, method, onLoad) {

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


})();
