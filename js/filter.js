'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var SMALL_PRICE = 10000;
  var BIG_PRICE = 50000;
  var MAX_ITEMS_COUNT = 5;

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
      case 'low':
        return it.offer.price < SMALL_PRICE;
      case 'middle':
        return it.offer.price >= SMALL_PRICE && it.offer.price < BIG_PRICE;
      case 'high':
        return it.offer.price >= BIG_PRICE;
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
    window.util.debounce(window.data.updateAdverts);
  });

  window.filter = function (data) {
    var items = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (filterByOffer(item) && filterByHousingType(item) && filterByPrice(item) && filterByRoomsCount(item) && filterByGuestsCount(item) && filterByFeatures(item)) {
        items.push(item);

        if (items.length === MAX_ITEMS_COUNT) {
          break;
        }
      }
    }

    return items;
  };
})();
