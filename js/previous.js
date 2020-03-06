'use strict';

(function () {

  var COLOR_DROP_ZONA = '#999999';
  var COLOR_DROP_ZONA_HOVER = '#ff5635';

  var onDragenter = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  var onDragoverAvatar = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZoneAvatar.style.color = COLOR_DROP_ZONA_HOVER;
  };

  var onDragleaveAvatar = function () {
    dropZoneAvatar.style.color = COLOR_DROP_ZONA;
  };

  var onDropAvatar = function (evt) {
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
  dropZoneAvatar.addEventListener('dragenter', onDragenter, false);
  dropZoneAvatar.addEventListener('dragover', onDragoverAvatar, false);
  dropZoneAvatar.addEventListener('dragleave', onDragleaveAvatar, false);
  dropZoneAvatar.addEventListener('drop', onDropAvatar, false);

  var fileChooserApartment = document.querySelector('.ad-form__upload input[type=file]');
  var previewApartment = document.querySelector('.ad-form__photo');
  var container = document.querySelector('.ad-form__photo-container');

  var onDragoverApartament = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dropZoneApartament.style.color = COLOR_DROP_ZONA_HOVER;
  };

  var onDropApartament = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var dt = evt.dataTransfer;
    var files = dt.files;
    handleFilesApartament(files);
    dropZoneApartament.style.color = COLOR_DROP_ZONA;
  };

  var onDragleaveAparament = function () {
    dropZoneApartament.style.color = COLOR_DROP_ZONA;
  };

  var handleFilesApartament = function (files) {
    previewApartment.remove();

    Array.from(files).forEach(function (it) {
      var file = it;
      var reader = new FileReader();

      reader.addEventListener('load', function (evt) {
        var clonePreviewApartment = previewApartment.cloneNode(true);

        var closeButton = clonePreviewApartment.querySelector('span');
        closeButton.classList.remove('hidden');
        closeButton.classList.add('ad-form__photo--remove');

        var removePreviousImg = function () {
          clonePreviewApartment.remove();
          closeButton.removeEventListener('click', removePreviousImg);
        };

        closeButton.addEventListener('click', removePreviousImg);

        var newImg = document.createElement('img');
        newImg.setAttribute('width', 70);
        newImg.setAttribute('height', 70);
        newImg.style.borderRadius = 'inherit';
        newImg.src = evt.target.result;
        clonePreviewApartment.append(newImg);
        container.append(clonePreviewApartment);
      });
      reader.readAsDataURL(file);
    });
  };


  fileChooserApartment.addEventListener('change', function () {
    handleFilesApartament(fileChooserApartment.files);
  });

  var dropZoneApartament = document.querySelector('.ad-form__drop-zone');

  dropZoneApartament.addEventListener('dragenter', onDragenter, false);
  dropZoneApartament.addEventListener('dragover', onDragoverApartament, false);
  dropZoneApartament.addEventListener('dragleave', onDropApartament, false);
  dropZoneApartament.addEventListener('drop', onDragleaveAparament, false);

  var resetPreviousImg = function () {
    var previewApartments = document.querySelectorAll('.ad-form__photo');
    previewAvatar.src = 'img/muffin-grey.svg';
    previewApartments.forEach(function (it) {
      it.remove();
    });
    container.append(previewApartment);
    dropZoneAvatar.removeEventListener('drop', onDropAvatar, false);
    dropZoneApartament.removeEventListener('drop', onDropApartament, false);
  };

  var activePreviuosImg = function () {
    dropZoneAvatar.addEventListener('drop', onDropAvatar, false);
    dropZoneApartament.addEventListener('drop', onDropApartament, false);
  };

  window.previous = {
    resetPreviousImg: resetPreviousImg,
    activePreviuosImg: activePreviuosImg
  };

})();
