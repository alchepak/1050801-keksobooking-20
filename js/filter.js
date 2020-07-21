'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');

  var filterByOffer = function (it) {
    return it.offer !== undefined && it.offer !== null;
  };

  var filterByHousingType = function (it) {
    return it.offer.type === housingType.value;
  };

  var filterByPrice = function (it) {
    switch (housingPrice.value) {
      case 'middle':
        return it.offer.price >= 10000 && it.offer.price < 50000;
      case 'low':
        return it.offer.price < 10000;
      case 'high':
        return it.offer.price >= 50000;
    }

    return true;
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

    if (housingPrice.value !== DEFAULT_VALUE) {
      items = items.filter(filterByPrice);
    }

    return items;
  };
})();
