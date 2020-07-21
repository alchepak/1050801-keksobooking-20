'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var adverts = [];

  var onGetDataSuccess = function (items) {
    adverts = items.slice();
    window.data.updateAdverts();
    window.form.changeInputsState(filtersForm, false);
  };

  var onGetDataError = function (message) {
    window.message.show(false, message);
    window.page.reset();
  };

  window.data = {
    getAdverts: function () {
      window.request.load(onGetDataSuccess, onGetDataError);
    },
    updateAdverts: function () {
      var filteredAdverts = window.filter(adverts);
      window.map.renderAdverts(filteredAdverts);
    }
  };
})();
