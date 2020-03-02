'use strict';

(function () {

  var COLOR_DROP_ZONA = '#999999';
  var COLOR_DROP_ZONA_HOVER = '#ff5635';

  var dragenter = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  var dragoverAvatar = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZoneAvatar.style.color = COLOR_DROP_ZONA_HOVER;
  };

  var dragleaveAvatar = function () {
    dropZoneAvatar.style.color = COLOR_DROP_ZONA;
  };

  var dropAvatar = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var dt = evt.dataTransfer;
    var files = dt.files[0];
    handleFilesAvatar(files);
    dropZoneAvatar.style.color = COLOR_DROP_ZONA;
  };


  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.avatar__preview');

  var handleFilesAvatar = function (files) {
    var file = files;
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  fileChooserAvatar.addEventListener('change', function () {
    handleFilesAvatar(fileChooserAvatar.files[0]);
  });

  var dropZoneAvatar = document.querySelector('.ad-form-header__drop-zone');
  dropZoneAvatar.addEventListener('dragenter', dragenter, false);
  dropZoneAvatar.addEventListener('dragover', dragoverAvatar, false);
  dropZoneAvatar.addEventListener('dragleave', dragleaveAvatar, false);
  dropZoneAvatar.addEventListener('drop', dropAvatar, false);

  var fileChooserApartment = document.querySelector('.ad-form__upload input[type=file]');
  var previewApartment = document.querySelector('.ad-form__photo');
  var container = document.querySelector('.ad-form__photo-container');

  var dragoverApartament = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZoneApartament.style.color = COLOR_DROP_ZONA_HOVER;
  };

  var dropApartament = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var dt = evt.dataTransfer;
    var files = dt.files;
    handleFilesApartament(files);
    dropZoneApartament.style.color = COLOR_DROP_ZONA;
  };

  var dragleaveAparament = function () {
    dropZoneApartament.style.color = COLOR_DROP_ZONA;
  };

  var handleFilesApartament = function (files) {
    previewApartment.remove();
    for (var index = 0; index < files.length; index++) {
      var file = files[index];
      var reader = new FileReader();

      reader.addEventListener('load', function (evt) {
        var clonePreviewApartment = previewApartment.cloneNode(true);
        var span = clonePreviewApartment.querySelector('span');
        span.classList.remove('hidden');
        span.classList.add('ad-form__photo--remove');
        span.addEventListener('click', function () {
          clonePreviewApartment.remove();
        });
        var newImg = document.createElement('img');
        newImg.setAttribute('width', 70);
        newImg.setAttribute('height', 70);
        newImg.style.borderRadius = 'inherit';
        newImg.src = evt.target.result;
        clonePreviewApartment.append(newImg);
        container.append(clonePreviewApartment);
      });
      reader.readAsDataURL(file);
    }
  };


  fileChooserApartment.addEventListener('change', function () {
    handleFilesApartament(fileChooserApartment.files);
  });

  var dropZoneApartament = document.querySelector('.ad-form__drop-zone');

  dropZoneApartament.addEventListener('dragenter', dragenter, false);
  dropZoneApartament.addEventListener('dragover', dragoverApartament, false);
  dropZoneApartament.addEventListener('dragleave', dragleaveAparament, false);
  dropZoneApartament.addEventListener('drop', dropApartament, false);

  window.resetPreviousImg = function () {
    var previewApartments = document.querySelectorAll('.ad-form__photo');
    previewAvatar.src = 'img/muffin-grey.svg';
    previewApartments.forEach(function (it) {
      it.remove();
    });
    container.append(previewApartment);
  };

})();
