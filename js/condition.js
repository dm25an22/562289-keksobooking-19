'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');

  var PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
  var PIN_MAIN_HEIGTH = mapPinMain.offsetHeight;
  var START_COORD_MAIN_PIN_LEFT = mapPinMain.offsetLeft;
  var START_COORD_MAIN_PIN_TOP = mapPinMain.offsetTop;
  var ENTER_KEY = window.keysCode.ENTER_KEY;

  var map = document.querySelector('.map');

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

  var onActivStatus = function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      removeDisabled(addFormFieldsets);
      window.previous.activePreviuosImg();
      addForm.classList.remove('ad-form--disabled');
      mapPinMain.removeEventListener('mousedown', onActivStatus);
      mapPinMain.removeEventListener('keydown', onActivStatus);
      map.classList.remove('map--faded');

      if (window.isData) {
        window.pin.getPin(window.dataArr);
        removeDisabled(mapFilters);
      } else {
        window.form.onClickErrorLoad();
      }
    }
  };

  var notActiveStatus = function () {
    window.card.removeCard();
    window.pin.removePin();
    setDisabled(mapFilters);
    setDisabled(addFormFieldsets);
    map.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    addForm.reset();
    mapFilters.reset();
    mapPinMain.style.left = START_COORD_MAIN_PIN_LEFT + 'px';
    mapPinMain.style.top = START_COORD_MAIN_PIN_TOP + 'px';
    addressInput.value = getCoordinatePinMain();
    window.previous.resetPreviousImg();
    mapPinMain.addEventListener('mousedown', onActivStatus);
    mapPinMain.addEventListener('keydown', onActivStatus);
  };


  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var addressInput = addForm.querySelector('input[name=address]');
  addressInput.value = getCoordinatePinMain();

  notActiveStatus();

  window.condition = {
    onActivStatus: onActivStatus,
    notActiveStatus: notActiveStatus
  };

})();
