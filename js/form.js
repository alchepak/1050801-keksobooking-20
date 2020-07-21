'use strict';

(function () {
  var priceListMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var addressInput = adForm.querySelector('#address');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');

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

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.reset();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(adForm);

    var onSubmitSuccess = function () {
      window.page.reset();
      window.message.show(true);
    };

    var onSubmitFailure = function (message) {
      window.message.show(false, message);
    };

    window.request.upload(data, onSubmitSuccess, onSubmitFailure);
  });

  window.form = {
    changeInputsState: function (form, isDisabled) {
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
