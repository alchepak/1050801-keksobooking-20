'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  window.validation = {
    checkTitleValue: function (input) {
      var length = input.value.length;

      if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else if (length < MIN_TITLE_LENGTH) {
        input.setCustomValidity('Добавьте ещё символов: ' + (MIN_TITLE_LENGTH - length));
      } else if (length > MAX_TITLE_LENGTH) {
        input.setCustomValidity('Удалите лишние символы: ' + (length - MAX_TITLE_LENGTH));
      } else {
        input.setCustomValidity('');
      }
    },
    checkPriceValue: function (input) {
      if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else if (input.validity.rangeUnderflow) {
        input.setCustomValidity('Значение должно быть больше ' + input.min);
      } else if (input.validity.rangeOverflow) {
        input.setCustomValidity('Значение должно быть меньше ' + input.max);
      } else {
        input.setCustomValidity('');
      }
    },
    checkCapacityValue: function () {
      var roomsCount = parseInt(roomNumberSelect.value, 10);
      var capacityCount = parseInt(capacitySelect.value, 10);

      if (roomsCount === 100 && capacityCount > 0) {
        capacitySelect.setCustomValidity('100 комнат не для гостей');
      } else if (roomsCount < 100 && capacityCount === 0) {
        capacitySelect.setCustomValidity('Укажите количество мест');
      } else if (roomsCount < 100 && capacityCount > roomsCount) {
        capacitySelect.setCustomValidity('Только для гостей, но не более ' + roomsCount);
      } else {
        capacitySelect.setCustomValidity('');
      }
    }
  };

})();
