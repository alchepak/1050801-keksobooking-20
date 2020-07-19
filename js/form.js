'use strict';

(function () {
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
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var onTypeChange = function (evt) {
    priceInput.min = priceListMap[evt.target.value];
    priceInput.placeholder = priceListMap[evt.target.value];
  };

  titleInput.addEventListener('invalid', function (evt) {
    window.validation.checkTitleValue(evt.target);
  });

  titleInput.addEventListener('input', function (evt) {
    window.validation.checkTitleValue(evt.target);
  });

  typeSelect.addEventListener('change', onTypeChange);

  priceInput.addEventListener('invalid', function (evt) {
    window.validation.checkPriceValue(evt.target);
  });

  priceInput.addEventListener('input', function (evt) {
    window.validation.checkPriceValue(evt.target);
  });

  timeInSelect.addEventListener('change', function (evt) {
    timeOutSelect.value = evt.target.value;
  });

  timeOutSelect.addEventListener('change', function (evt) {
    timeInSelect.value = evt.target.value;
  });

  roomNumberSelect.addEventListener('change', function () {
    window.validation.checkCapacityValue();
  });

  capacitySelect.addEventListener('change', function () {
    window.validation.checkCapacityValue();
  });

  window.form = {
    changeFormInputsState: function (form, isDisabled) {
      var formInputs = form.querySelectorAll('input, select, fieldset');
      for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].disabled = isDisabled;
      }
    },
    setCurrentAddress: function (isPageActive) {
      var position = window.mainPin.getPosition(isPageActive);
      addressInput.value = position.x + ', ' + position.y;
    }
  };
})();
