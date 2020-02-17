'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var TIME_RESPONSE = 10000;

  var setRequest = function (url, method, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        //onError();
        console.log('error');
      }
    });

    xhr.addEventListener('error', function () {
      //onError();
    });

    xhr.addEventListener('timeout', function () {
      //onError();
    });

    xhr.timeout = TIME_RESPONSE;

    xhr.open(method, url);
    xhr.send();

  }

  window.backend = {
    setRequest: setRequest
  };

})();
