'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');

  var filterByOffer = function (it) {
    return it.offer !== undefined && it.offer !== null;
  };

  var filterByHousingType = function (it) {
    return it.offer.type === housingType.value;
  };

  filtersForm.addEventListener('change', function () {
    window.data.updateAdverts();
  });

  window.filter = function (data) {
    var items = data.slice();
    items = items.filter(filterByOffer);

    if (housingType.value !== DEFAULT_VALUE) {
      items = items.filter(filterByHousingType);
    }

    return items;
  };
})();
