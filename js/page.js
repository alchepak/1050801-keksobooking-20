'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');

  window.page = {
    activate: function () {
      if (map.classList.contains('map--faded')) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        window.form.changeInputsState(adForm, false);
        window.form.setCurrentAddress(true);
        window.validation.checkCapacityValue();

        window.data.getAdverts();
      }
    },
    reset: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      adForm.reset();
      filtersForm.reset();

      window.mainPin.reset();
      window.map.removeAdverts();
      window.card.close();

      window.form.changeInputsState(adForm, true);
      window.form.changeInputsState(filtersForm, true);
      window.form.setCurrentAddress(false);
    }
  };
})();
