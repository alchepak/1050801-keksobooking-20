'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var priceListMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var titleInput = document.querySelector('#title');
  var addressInput = document.querySelector('#address');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

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

  var onTypeChange = function (evt) {
    priceInput.min = priceListMap[evt.target.value];
    priceInput.placeholder = priceListMap[evt.target.value];
  };

  var onCheckPriceValue = function () {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Значение должно быть больше ' + priceInput.min);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Значение должно быть меньше ' + priceInput.max);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  titleInput.addEventListener('invalid', onCheckTitleValue);
  titleInput.addEventListener('input', onCheckTitleValue);
  typeSelect.addEventListener('change', onTypeChange);
  priceInput.addEventListener('invalid', onCheckPriceValue);
  priceInput.addEventListener('input', onCheckPriceValue);

  roomNumberSelect.addEventListener('change', function () {
    window.form.checkCapacityValue();
  });

  capacitySelect.addEventListener('change', function () {
    window.form.checkCapacityValue();
  });

  window.form = {
    changeFormInputsState: function (form, isDisabled) {
      var formInputs = form.querySelectorAll('input, select, fieldset');
      for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].disabled = isDisabled;
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
    },
    setCurrentAddress: function (isPageActive) {
      var position = window.mainPin.getPosition(isPageActive);
      addressInput.value = position.x + ', ' + position.y;
    }
  };
})();
