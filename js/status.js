'use strict';

(function () {

  var map = document.querySelector('.map');

  var mapPinMain = document.querySelector('.map__pin--main');

  var PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var PIN_MAIN_HEIGTH = mapPinMain.offsetHeight;
  var START_COORD_MAIN_PIN_LEFT = mapPinMain.offsetLeft;
  var START_COORD_MAIN_PIN_TOP = mapPinMain.offsetTop;

  var ENTER_KEY = window.keysCode.ENTER_KEY;

  var getCoordinatePinMain = function () {
    var y = mapPinMain.offsetTop + (PIN_MAIN_HEIGTH / 2);
    var x = mapPinMain.offsetLeft + (PIN_MAIN_WIDTH / 2);
    return Math.floor(x) + ', ' + Math.floor(y);
  };

  var setDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  };

  var removeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  };


  window.activStatus = function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      removeDisabled(addFormFieldsets);
      removeDisabled(mapFilters);
      addForm.classList.remove('ad-form--disabled');
      mapPinMain.removeEventListener('mousedown', window.activStatus);
      mapPinMain.removeEventListener('keydown', window.activStatus);
      window.craeteActivePin();
    }
  };


  window.notActiveStatus = function () {
    window.renderCard.removeCard();
    window.renderPin.removePin();
    setDisabled(mapFilters);
    setDisabled(addFormFieldsets);
    map.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    addForm.reset();
    mapFilters.reset();
    mapPinMain.style.left = START_COORD_MAIN_PIN_LEFT + 'px';
    mapPinMain.style.top = START_COORD_MAIN_PIN_TOP + 'px';
    addressInput.value = getCoordinatePinMain();
    window.resetPreviousImg();
    mapPinMain.addEventListener('mousedown', window.activStatus);
    mapPinMain.addEventListener('keydown', window.activStatus);
  };


  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelector('.map__filters');
  var addressInput = addForm.querySelector('input[name=address]');
  addressInput.value = getCoordinatePinMain();

  window.notActiveStatus();

})();
