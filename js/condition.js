'use strict';

(function () {
  var ENTER_KEY = window.keysCode.ENTER_KEY;

  var mapPinMain = document.querySelector('.map__pin--main');

  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeigth = mapPinMain.offsetHeight;
  var startCoordMainPinLeft = mapPinMain.offsetLeft;
  var startCoordMainPinTop = mapPinMain.offsetTop;

  var map = document.querySelector('.map');

  var getCoordinatePinMain = function () {
    var y = mapPinMain.offsetTop + (pinMainHeigth / 2);
    var x = mapPinMain.offsetLeft + (pinMainWidth / 2);
    return Math.floor(x) + ', ' + Math.floor(y);
  };

  var setDisabled = function (arr) {
    Array.from(arr).forEach(function (it) {
      it.disabled = true;
    });
  };

  var removeDisabled = function (arr) {
    Array.from(arr).forEach(function (it) {
      it.disabled = false;
    });
  };

  var getMixedArray = function (arr) {
    var j; var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      removeDisabled(addFormFieldsets);
      window.previous.activePreviuosImg();
      addForm.classList.remove('ad-form--disabled');
      mapPinMain.removeEventListener('mousedown', onMainPinClick);
      mapPinMain.removeEventListener('keydown', onMainPinClick);
      map.classList.remove('map--faded');

      if (window.isData) {
        window.pin.getPin(getMixedArray(window.dataArr));
        removeDisabled(mapFilters);
      } else {
        window.form.getErrorMessage();
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
    mapPinMain.style.left = startCoordMainPinLeft + 'px';
    mapPinMain.style.top = startCoordMainPinTop + 'px';
    addressInput.value = getCoordinatePinMain();
    window.previous.resetPreviousImg();
    mapPinMain.addEventListener('mousedown', onMainPinClick);
    mapPinMain.addEventListener('keydown', onMainPinClick);
  };


  var addForm = document.querySelector('.ad-form');
  var addFormFieldsets = addForm.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var addressInput = addForm.querySelector('input[name=address]');
  addressInput.value = getCoordinatePinMain();

  notActiveStatus();

  window.condition = {
    notActiveStatus: notActiveStatus,
    getMixedArray: getMixedArray
  };

})();
