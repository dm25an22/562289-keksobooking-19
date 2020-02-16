'use strict';

(function () {

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');


  var checkSelected = function () {

    switch (true) {
      case rooms.value === '1' && guests.value !== '1':
        rooms.setCustomValidity('В одной комнате может проживать только один гость');
        break;

      case rooms.value === '2' && (guests.value !== '1' && guests.value !== '2'):
        rooms.setCustomValidity('В двух комнатах могут продивать не более двух гостей');
        break;

      case rooms.value === '3' && (guests.value !== '1' && guests.value !== '2' && guests.value !== '3'):
        rooms.setCustomValidity('В трёх комнатах могут проживать до трёх человек');
        break;

      case rooms.value === '100' && guests.value !== 'не для гостей':
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
