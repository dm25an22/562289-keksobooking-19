'use strict';

(function () {

  var pins = document.querySelectorAll('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins')

  mapPinsContainer.addEventListener('click', function (evt) {
    if (evt.target && !evt.target.classList.contains ('.map__pin--main')) {
    console.log('click', evt.target);
  }
  });

})();
