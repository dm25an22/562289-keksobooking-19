'use strict';

(function () {

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');


  var checkSelected = function () {

    switch (true) {
      case rooms.value === '1' && guests !== '1':
        rooms.setCustomValidity('В одной комнате может проживать только один гость');
        break;

      case rooms.value === '2' && (guests !== '1' && guests !== '2'):
        rooms.setCustomValidity('В двух комнатах могут продивать не более двух гостей');
        break;

      case rooms.value === '3' && (guests !== '1' && guests !== '2' && guests !== '3'):
        rooms.setCustomValidity('В трёх комнатах могут проживать до трёх человек');
        break;

      case rooms.value === '100' && guests !== 'не для гостей':
        rooms.setCustomValidity('Не для гостей');
        break;

      default:
        rooms.setCustomValidity('');
        break;
    }

  };

  rooms.addEventListener('change', checkSelected);
  guests.addEventListener('change', checkSelected);

})();
