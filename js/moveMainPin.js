'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');

  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeigth = mapPinMain.offsetHeight;

  var addressInput = document.querySelector('input[name=address');
  var mapOver = document.querySelector('.map__overlay');
  var pseudoAfterHeight = window.getComputedStyle(mapPinMain, ':after').height;
  pseudoAfterHeight = parseInt(pseudoAfterHeight, 10);

  var getCoordinatePinMainActiv = function () {
    var y = mapPinMain.offsetTop + pinMainHeigth + pseudoAfterHeight;
    var x = mapPinMain.offsetLeft + (pinMainWidth / 2);
    return Math.floor(x) + ', ' + Math.floor(y);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {

    var shift = {
      x: evt.clientX - mapPinMain.getBoundingClientRect().left,
      y: evt.clientY - mapPinMain.getBoundingClientRect().top
    };

    var onMouseMove = function (evtMove) {
      var newLeft = evtMove.clientX - shift.x - mapOver.getBoundingClientRect().left;
      var newTop = evtMove.clientY - shift.y - mapOver.getBoundingClientRect().top;

      var topEdge = 130 - (pinMainHeigth + pseudoAfterHeight);
      if (newTop < topEdge) {
        newTop = topEdge;
      }

      var bottomEdge = 630 - (pinMainHeigth + pseudoAfterHeight);
      if (newTop > bottomEdge) {
        newTop = bottomEdge;
      }

      var leftEdge = 1 - (mapPinMain.offsetWidth / 2);
      if (newLeft < leftEdge) {
        newLeft = leftEdge;
      }

      var rightEdge = mapOver.offsetWidth - mapPinMain.offsetWidth / 2;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      mapPinMain.style.left = newLeft + 'px';
      mapPinMain.style.top = newTop + 'px';

      addressInput.value = getCoordinatePinMainActiv();
    };

    var onMouseUp = function () {
      addressInput.value = getCoordinatePinMainActiv();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
