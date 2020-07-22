'use strict';

(function () {
  var FILE_TYPES = ['image/png', 'image/jpeg'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var avatarInput = document.querySelector('#avatar');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var imageFrame = document.querySelector('div.ad-form__photo');
  var imagesInput = document.querySelector('#images');

  var checkFileType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.type === it;
    });
  };

  var showPreview = function (file, preview) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var onAvatarChoose = function () {
    var file = avatarInput.files[0];
    var isTypeValid = checkFileType(file);

    if (isTypeValid) {
      showPreview(file, avatar);
    }
  };

  var onImageChoose = function () {
    var file = imagesInput.files[0];
    var isTypeValid = checkFileType(file);

    if (isTypeValid) {
      var img = document.createElement('img');
      img.classList.add('ad-form__photo');
      imageFrame.before(img);

      showPreview(file, img);
    }
  };

  avatarInput.addEventListener('change', onAvatarChoose);
  imagesInput.addEventListener('change', onImageChoose);

  window.image = {
    reset: function () {
      var images = document.querySelectorAll('img.ad-form__photo');
      Array.from(images).forEach(function (it) {
        it.remove();
      });

      avatar.src = DEFAULT_AVATAR;
    }
  };
})();
