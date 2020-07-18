'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var adverts = [];

  var onGetDataSuccess = function (items) {
    adverts = items.slice();
    window.data.updateAdverts();
    window.form.changeFormInputsState(filtersForm, false);
  };

  var onGetDataError = function (message) {
    var template = document.querySelector('#error').content;
    var error = template.querySelector('.error');
    var block = error.cloneNode(true);
    block.querySelector('.error__message').textContent = message;
    document.body.appendChild(block);
  };

  window.data = {
    getAdverts: function () {
      window.load(onGetDataSuccess, onGetDataError);
    },
    updateAdverts: function () {
      var filteredAdverts = window.filter(adverts);
      window.map.renderAdverts(filteredAdverts);
    }
  };
})();
