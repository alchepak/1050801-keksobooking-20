'use strict';

(function () {
  var SIMILAR_ADV_COUNT = 8;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.form.changeFormInputsState(adForm, false);
      window.form.changeFormInputsState(filtersForm, false);
      window.form.setCurrentAddress(true);
      window.form.checkCapacityValue();

      var mocks = window.map.buildAdverts(SIMILAR_ADV_COUNT);
      window.map.createPins(mocks);
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    window.util.isMouseDown(evt, activatePage);
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterPress(evt, activatePage);
  });

  window.form.changeFormInputsState(adForm, true);
  window.form.changeFormInputsState(filtersForm, true);
  window.form.setCurrentAddress(false);
})();
