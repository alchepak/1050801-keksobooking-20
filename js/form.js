'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var titleInput = document.querySelector('#title');
  var addressInput = document.querySelector('#address');
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');

  var onCheckTitleValue = function () {
    var titleLength = titleInput.value.length;

    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Добавьте ещё символов: ' + (MIN_TITLE_LENGTH - titleLength));
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние символы: ' + (titleLength - MAX_TITLE_LENGTH));
    } else {
      titleInput.setCustomValidity('');
    }
  };

  roomNumberInput.addEventListener('input', function () {
    window.form.checkCapacityValue();
  });

  capacityInput.addEventListener('input', function () {
    window.form.checkCapacityValue();
  });

  titleInput.addEventListener('invalid', onCheckTitleValue);
  titleInput.addEventListener('input', onCheckTitleValue);

  window.form = {
    changeFormInputsState: function (form, isDisabled) {
      var formInputs = form.querySelectorAll('input, select, fieldset');
      for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].disabled = isDisabled;
      }
    },
    checkCapacityValue: function () {
      var roomsCount = parseInt(roomNumberInput.value, 10);
      var capacityCount = parseInt(capacityInput.value, 10);

      if (roomsCount === 100 && capacityCount > 0) {
        capacityInput.setCustomValidity('100 комнат не для гостей');
      } else if (roomsCount < 100 && capacityCount === 0) {
        capacityInput.setCustomValidity('Укажите количество мест');
      } else if (roomsCount < 100 && capacityCount > roomsCount) {
        capacityInput.setCustomValidity('Только для гостей, но не более ' + roomsCount);
      } else {
        capacityInput.setCustomValidity('');
      }
    },
    setCurrentAddress: function (isPageActive) {
      var position = window.mainPin.getPosition(isPageActive);
      addressInput.value = position.x + ', ' + position.y;
    }
  };
})();
