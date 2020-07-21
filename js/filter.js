'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var filterByOffer = function (it) {
    return it.offer !== undefined && it.offer !== null;
  };

  var filterByHousingType = function (it) {
    return housingType.value === DEFAULT_VALUE || it.offer.type === housingType.value;
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

  var filterByRoomsCount = function (it) {
    return housingRooms.value === DEFAULT_VALUE || it.offer.rooms === +housingRooms.value;
  };

  var filterByGuestsCount = function (it) {
    return housingGuests.value === DEFAULT_VALUE || it.offer.guests === +housingGuests.value;
  };

  var filterByFeatures = function (it) {
    var features = filtersForm.querySelectorAll('input[name=features]:checked');
    for (var i = 0; i < features.length; i++) {
      if (!it.offer.features.includes(features[i].value)) {
        return false;
      }
    }

    return true;
  };

  filtersForm.addEventListener('change', function () {
    window.data.updateAdverts();
  });

  window.filter = function (data) {
    var items = data.slice();
    items = items.filter(filterByOffer)
      .filter(filterByHousingType)
      .filter(filterByPrice)
      .filter(filterByRoomsCount)
      .filter(filterByGuestsCount)
      .filter(filterByFeatures);

    return items;
  };
})();
