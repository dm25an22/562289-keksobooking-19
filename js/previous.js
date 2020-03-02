'use strict';

(function () {
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.avatar__preview');
  var fileChooserApartment = document.querySelector('.ad-form__upload input[type=file]');
  var previewApartment = document.querySelector('.ad-form__photo');
  var container = document.querySelector('.ad-form__photo-container');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  });


  fileChooserApartment.addEventListener('change', function () {
    previewApartment.remove();
    var files = fileChooserApartment.files;
    for (var index = 0; index < files.length; index++) {
      var file = files[index];
      var reader = new FileReader();

      reader.addEventListener('load', function (evt) {
        var clonePreviewApartment = previewApartment.cloneNode(true);
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

  });

})();
