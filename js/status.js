'use strict';

(function () {

  var map = document.querySelector('.map');

  var mapPinMain = document.querySelector('.map__pin--main');

  var PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var PIN_MAIN_HEIGTH = mapPinMain.offsetHeight;

  var ENTER_KEY = window.keysCode.ENTER_KEY;

  var getCoordinatePinMain = function () {
    var y = mapPinMain.offsetTop + (PIN_MAIN_HEIGTH / 2);
    var x = mapPinMain.offsetLeft + (PIN_MAIN_WIDTH / 2);
    return x + ', ' + y;
  };

  var getCoordinatePinMainActiv = function () {
    var y = mapPinMain.offsetTop + mapPinMain.offsetHeight + 15;
    var x = mapPinMain.offsetLeft + (PIN_MAIN_WIDTH / 2);
    return x + ', ' + y;
  };

  var setDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  window.removeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };


  var activStatus = function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      window.removeDisabled(addFormFieldsets);
      map.classList.remove('map--faded');
      addressInput.value = getCoordinatePinMainActiv();
      addForm.classList.remove('ad-form--disabled');
      window.craeteActivePin();
      mapPinMain.removeEventListener('mousedown', activStatus);
      mapPinMain.removeEventListener('keydown', activStatus);
    }
  };


  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');

  var addressInput = addForm.querySelector('input[name=address');
  addressInput.value = getCoordinatePinMain();


  setDisabled(addFormFieldsets);
  setDisabled(mapFilters);


  mapPinMain.addEventListener('mousedown', activStatus);

  mapPinMain.addEventListener('keydown', activStatus);


})();
